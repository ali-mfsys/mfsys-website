import {createHmac,timingSafeEqual} from "node:crypto";

export type Session={
 email:string;
 role:"SUPER_ADMIN"|"ADMIN"|"EDITOR"|"AUTHOR";
 exp:number;
};
const ISSUER="mfsys-content-studio";
const secret=()=>process.env.AUTH_SECRET??"";
const b64=(value:string)=>Buffer.from(value,"utf8").toString("base64url");
const unb64=(value:string)=>Buffer.from(value,"base64url").toString("utf8");

function secureCompare(a:Buffer,b:Buffer){
 return a.length===b.length&&timingSafeEqual(a,b);
}

export function signSession(session:Session){
 if(secret().length<32)throw new Error("Admin session signing is not configured");
 const payload=b64(JSON.stringify({...session,iss:ISSUER}));
 const signature=createHmac("sha256",secret()).update(payload).digest("base64url");
 return payload+"."+signature;
}

export function verifySession(token?:string):Session|null{
 try{
  if(!token||secret().length<32)return null;
  const parts=token.split(".");
  if(parts.length!==2||parts[0].length>2500||parts[1].length>200)return null;
  const [payload,signature]=parts;
  const expected=createHmac("sha256",secret()).update(payload).digest("base64url");
  if(!secureCompare(Buffer.from(signature),Buffer.from(expected)))return null;
  const parsed=JSON.parse(unb64(payload)) as Session&{iss?:string};
  if(parsed.iss!==ISSUER||typeof parsed.email!=="string"||!parsed.email.includes("@")||
    !["SUPER_ADMIN","ADMIN","EDITOR","AUTHOR"].includes(parsed.role)||
    typeof parsed.exp!=="number"||!Number.isFinite(parsed.exp)||parsed.exp<=Date.now()||
    parsed.exp>Date.now()+5*60*60*1000)return null;
  return {email:parsed.email,role:parsed.role,exp:parsed.exp};
 }catch{return null;}
}

/** RFC 8018 PBKDF2-HMAC-SHA256 for Cloudflare Workers at higher iteration counts.
 * Cloudflare WebCrypto refuses PBKDF2 above 100,000 iterations, while our
 * existing credentials were securely created at 310,000. Preserve these
 * password hashes instead of resetting or silently lowering their cost.
 * The only admin login endpoint is rate-limited at the Cloudflare edge.
 */
export function derivePbkdf2Sha256Compat(password:string,salt:string,iterations:number):Buffer{
 if(!Number.isInteger(iterations)||iterations<1||iterations>1000000)throw Error("Unsupported PBKDF2 cost");
 const key=Buffer.from(password,"utf8");
 const initial=Buffer.alloc(Buffer.byteLength(salt,"utf8")+4);
 initial.write(salt,0,"utf8");
 initial.writeUInt32BE(1,initial.length-4); // PBKDF2 block index 1 (32-byte output)
 let u=createHmac("sha256",key).update(initial).digest();
 const output=Buffer.from(u);
 for(let i=1;i<iterations;i++){
  u=createHmac("sha256",key).update(u).digest();
  for(let j=0;j<32;j++)output[j]^=u[j];
 }
 return output;
}

/** Verify credentials using the same algorithm and cost used at setup time.
 * Standard WebCrypto is preferred for <=100k; Node-compatible HMAC primitives
 * provide an exact PBKDF2 implementation above Cloudflare's native cap.
 */
export async function verifyPassword(password:string){
 try{
  const parts=(process.env.ADMIN_PASSWORD_HASH??"").split("$");
  if(parts.length!==3){console.error("[mfsys-editor-auth] password hash configuration invalid");return false;}
  const [salt,rawIterations,rawExpected]=parts;
  const iterations=Number(rawIterations);
  if(!salt||salt.length<16||!Number.isInteger(iterations)||iterations<200000||iterations>1000000)return false;
  const expected=Buffer.from(rawExpected,"base64url");
  if(expected.length!==32)return false;
  let derived:Buffer;
  if(iterations>100000){
   derived=derivePbkdf2Sha256Compat(password,salt,iterations);
  }else{
   const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveBits"]);
   const bits=await crypto.subtle.deriveBits({
    name:"PBKDF2",salt:new TextEncoder().encode(salt),iterations,hash:"SHA-256"
   },key,256);
   derived=Buffer.from(bits);
  }
  return secureCompare(derived,expected);
 }catch(e){
  // Diagnostic metadata only; never reveal password, salt or hash values.
  console.error("[mfsys-editor-auth] password verification exception",e instanceof Error?e.name:"unknown");
  return false;
 }
}

function decodeBase32(value:string):Buffer|null{
 if(!/^[A-Z2-7]{20,80}$/.test(value))return null;
 const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
 let carry=0,bits=0;
 const bytes:number[]=[];
 for(const ch of value){
  carry=(carry<<5)|chars.indexOf(ch);
  bits+=5;
  if(bits>=8){bits-=8;bytes.push((carry>>bits)&255);carry&=(1<<bits)-1;}
 }
 return Buffer.from(bytes);
}

/** RFC 6238 TOTP, six digits, thirty seconds, one step of clock tolerance. */
export function verifyTotp(code:string,secretBase32:string,now=Date.now()){
 if(!/^[0-9]{6}$/.test(code))return false;
 const key=decodeBase32(secretBase32);
 if(!key||key.length<16)return false;
 for(const offset of [-1,0,1]){
  const counter=Math.floor(now/30000)+offset;
  if(counter<0)continue;
  const data=Buffer.alloc(8);
  data.writeBigUInt64BE(BigInt(counter));
  const digest=createHmac("sha1",key).update(data).digest();
  const pointer=digest[digest.length-1]&15;
  const value=(digest.readUInt32BE(pointer)&0x7fffffff)%1000000;
  const expected=String(value).padStart(6,"0");
  if(secureCompare(Buffer.from(code),Buffer.from(expected)))return true;
 }
 return false;
}
