#!/usr/bin/env node
/**
 * Local-only, interactive MFSYS Content Studio credential bootstrap.
 * Run from the repository on your own computer after "npx wrangler login".
 * No password, API token or signing key is written to a file or git history.
 */
import {randomBytes,pbkdf2Sync,createHmac,timingSafeEqual} from "node:crypto";
import {spawnSync} from "node:child_process";
import {createInterface} from "node:readline/promises";
import {stdin,stdout} from "node:process";

const WORKER="mfsys-website";
const ITERATIONS=310000;

function requireTerminal(){
 if(!stdin.isTTY||!stdout.isTTY){
  throw Error("Run this interactive setup in a local terminal; do not use GitHub Actions, CI or a public shell.");
 }
}

function hideInput(label){
 return new Promise((resolve,reject)=>{
  stdout.write(label);
  const bytes=[];
  const previous=stdin.isRaw;
  stdin.setRawMode(true);stdin.resume();
  const cleanup=()=>{
   stdin.removeListener("data",handler);
   stdin.setRawMode(Boolean(previous));
   stdout.write("\n");
  };
  const handler=(buf)=>{
   for(const b of buf){
    if(b===13||b===10){cleanup();resolve(Buffer.from(bytes).toString("utf8"));return;}
    if(b===3){cleanup();reject(Error("Setup cancelled"));return;}
    if(b===8||b===127){bytes.pop();continue;}
    if(b>=32)bytes.push(b);
   }
  };
  stdin.on("data",handler);
 });
}

function base32(bytes){
 const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
 let data=0,bits=0,out="";
 for(const x of bytes){
  data=(data<<8)|x;bits+=8;
  while(bits>=5){bits-=5;out+=chars[(data>>bits)&31];data&=(1<<bits)-1;}
 }
 if(bits)out+=chars[(data<<(5-bits))&31];
 return out;
}

function expectedCode(key,step){
 const b=Buffer.alloc(8);b.writeBigUInt64BE(BigInt(step));
 const h=createHmac("sha1",key).update(b).digest();
 return String((h.readUInt32BE(h[19]&15)&0x7fffffff)%1000000).padStart(6,"0");
}

function verifyLocalOtp(code,key,now=Date.now()){
 if(!/^\d{6}$/.test(code))return false;
 const n=Math.floor(now/30000);
 return [n-1,n,n+1].some(step=>step>=0&&timingSafeEqual(Buffer.from(code),Buffer.from(expectedCode(key,step))));
}

function runWrangler(args,input){
 const cmd=process.platform==="win32"?"npx.cmd":"npx";
 const r=spawnSync(cmd,["wrangler",...args],{
  encoding:"utf8",input,stdio:input===undefined?"inherit":["pipe","inherit","inherit"],
  windowsHide:true,shell:process.platform==="win32",timeout:90000
 });
 if(r.error)throw Error("Wrangler failed to start: "+r.error.message);
 if(r.status!==0)throw Error("Wrangler failed; check your Cloudflare login and permissions.");
}

async function main(){
 requireTerminal();
 stdout.write("\nMFSYS Secure Editorial Activation\n");
 stdout.write("This stores five secrets in Cloudflare Workers. Values never appear in source code.\n");
 stdout.write("All editorial drafts in the public GitHub repository remain publicly visible.\n\n");
 runWrangler(["whoami"]);

 const rl=createInterface({input:stdin,output:stdout});
 const adminEmail=(await rl.question("Authorized MFSYS admin email: ")).trim().toLowerCase();
 rl.close();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail))throw Error("Valid admin email is required.");
 const password=await hideInput("Choose a new admin passphrase (at least 16 characters; hidden): ");
 if(password.length<16||password.length>256)throw Error("Passphrase must contain 16–256 characters.");
 const check=await hideInput("Confirm admin passphrase (hidden): ");
 if(password!==check)throw Error("Passphrases did not match.");
 const githubToken=await hideInput("Fine-grained GitHub token for ali-mfsys/mfsys-website (hidden): ");
 if(githubToken.length<25||githubToken.includes("\n"))throw Error("GitHub token appears invalid.");

 // Keep all secret material in memory, never write a .env file.
 const signingKey=randomBytes(48).toString("base64url");
 const salt=randomBytes(18).toString("base64url");
 const pwHash=pbkdf2Sync(password,salt,ITERATIONS,32,"sha256").toString("base64url");
 const otpKey=randomBytes(20);
 const otpSecret=base32(otpKey);
 const otpIssuer="MFSYS Content Studio";
 const enrollment="otpauth://totp/"+encodeURIComponent(otpIssuer+":"+adminEmail)+"?secret="+otpSecret+
  "&issuer="+encodeURIComponent(otpIssuer)+"&algorithm=SHA1&digits=6&period=30";
 stdout.write("\nAuthenticator setup (LOCAL TERMINAL ONLY — do not share or screenshot):\n");
 stdout.write("In Microsoft Authenticator, Google Authenticator, 1Password or equivalent, add a TIME-BASED account manually:\n");
 stdout.write("Account: "+adminEmail+"\nIssuer: "+otpIssuer+"\nSecret key: "+otpSecret+"\n");
 stdout.write("Alternatively, add the account using this enrollment URI:\n"+enrollment+"\n\n");
 const code=await hideInput("Enter a fresh 6-digit authenticator code to verify setup (hidden): ");
 if(!verifyLocalOtp(code,otpKey))throw Error("Authenticator verification failed. Check clock synchronisation and try again.");

 stdout.write("\nAuthenticator confirmed. Installing secret names in Cloudflare…\n");
 const secrets=[
  ["AUTH_SECRET",signingKey],["ADMIN_EMAIL",adminEmail],
  ["ADMIN_PASSWORD_HASH",[salt,String(ITERATIONS),pwHash].join("$")],
  ["ADMIN_TOTP_SECRET",otpSecret],["GITHUB_CONTENT_TOKEN",githubToken]
 ];
 for(const [name,value] of secrets){
  stdout.write("Configuring "+name+"…\n");
  runWrangler(["secret","put",name,"--name",WORKER],value+"\n");
 }
 stdout.write("\nInstalled. Open https://mfsys.net/admin/login and sign in using your email, passphrase and authenticator code.\n");
 stdout.write("Next test: create one nonconfidential editorial draft, verify the GitHub PR is opened and manually approve publication.\n");
 stdout.write("If any secret install failed, rerun this tool before attempting a login; partial setups are intentionally not usable.\n");
}
main().catch(err=>{console.error("\nSetup could not complete:",err.message);process.exitCode=1;});
