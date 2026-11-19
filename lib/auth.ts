import {createHmac,scryptSync,timingSafeEqual} from "node:crypto";
import {getEditorialSecret} from "./editorial-secrets";

export type Session={
 email:string;
 role:"SUPER_ADMIN"|"ADMIN"|"EDITOR"|"AUTHOR";
 exp:number;
};
const ISSUER="mfsys-content-studio";
const secret=()=>getEditorialSecret("AUTH_SECRET");
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

/**
 * The Worker verifies scrypt hashes using a native memory-hard KDF.
 * Do NOT reintroduce the old 310,000-round JS PBKDF2 loop here: Cloudflare
 * terminated requests with "Worker exceeded CPU time limit".
 *
 * Format: scrypt$N$r$p$base64url-salt$base64url-derived-key
 * This remains server-side; only its nonsecret format identifier is inspected.
 */
export function isSupportedAdminPasswordHash(){
 return getEditorialSecret("ADMIN_PASSWORD_HASH").startsWith("scrypt$");
}

export async function verifyPassword(password:string){
 try{
  const parts=getEditorialSecret("ADMIN_PASSWORD_HASH").split("$");
  if(parts.length!==6||parts[0]!=="scrypt"){
   // Fail closed while a legacy hash is migrated using the local-only script.
   console.warn("[mfsys-editor-auth] unsupported password hash format");
   return false;
  }
  const [,rawN,rawR,rawP,saltEncoded,hashEncoded]=parts;
  const N=Number(rawN),r=Number(rawR),p=Number(rawP);
  if(N!==16384||r!==8||p!==1||password.length<12||password.length>256)return false;
  const salt=Buffer.from(saltEncoded,"base64url");
  const expected=Buffer.from(hashEncoded,"base64url");
  if(salt.length<16||expected.length!==32)return false;
  // Uses workerd's native node:crypto implementation, not a JS HMAC loop.
  const derived=scryptSync(password,salt,expected.length,{
   N,r,p,maxmem:64*1024*1024
  });
  return secureCompare(derived,expected);
 }catch(e){
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
