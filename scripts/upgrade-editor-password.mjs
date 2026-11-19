#!/usr/bin/env node
/**
 * One-time, local-only password-hash migration for Content Studio.
 * This updates ADMIN_PASSWORD_HASH on the existing Cloudflare Worker.
 * It NEVER touches AUTH_SECRET, ADMIN_EMAIL, ADMIN_TOTP_SECRET or GitHub token.
 * Run interactively from an authorised local Windows/macOS/Linux terminal.
 */
import {randomBytes,scryptSync,timingSafeEqual} from "node:crypto";
import {spawnSync} from "node:child_process";
import {stdin,stdout} from "node:process";

const WORKER="mfsys-website",N=16384,R=8,P=1;
if(!stdin.isTTY||!stdout.isTTY){
 console.error("Run this only from a private interactive terminal, not a script or CI.");
 process.exit(1);
}
function hidden(label){
 return new Promise((resolve,reject)=>{
  stdout.write(label);
  const data=[];
  const previous=stdin.isRaw;
  stdin.setRawMode(true);
  stdin.resume();
  function finish(){
   stdin.off("data",handler);
   stdin.setRawMode(Boolean(previous));
   stdout.write("\n");
  }
  function handler(buffer){
   for(const byte of buffer){
    if(byte===13||byte===10){finish();resolve(Buffer.from(data).toString("utf8"));return;}
    if(byte===3){finish();reject(Error("Cancelled"));return;}
    if(byte===8||byte===127){data.pop();continue;}
    if(byte>=32)data.push(byte);
   }
  }
  stdin.on("data",handler);
 });
}
function wranglerPut(secret){
 const cmd=process.platform==="win32"?"npx.cmd":"npx";
 const result=spawnSync(cmd,["wrangler","secret","put","ADMIN_PASSWORD_HASH","--name",WORKER],{
  encoding:"utf8",input:secret+"\n",
  stdio:["pipe","inherit","inherit"],windowsHide:true,
  shell:process.platform==="win32",timeout:90000
 });
 if(result.error||result.status!==0)
  throw Error("Cloudflare rejected the update. Check 'npx.cmd wrangler whoami' and try again.");
}
try{
 stdout.write("\nMFSYS Content Studio — one-time password-verifier repair\n");
 stdout.write("Only the ADMIN_PASSWORD_HASH Worker secret will change.\n");
 stdout.write("The administrator email, GitHub token and Microsoft Authenticator stay unchanged.\n");
 stdout.write("Run only after pulling the latest approved MFSYS website code.\n\n");
 const password=await hidden("Enter your Content Studio password (hidden, minimum 16 characters): ");
 if(password.length<16||password.length>256)throw Error("Password must contain 16–256 characters.");
 const confirmation=await hidden("Re-enter the same password (hidden): ");
 if(!timingSafeEqual(Buffer.from(password),Buffer.from(confirmation)))
  throw Error("Passwords did not match. Nothing was changed.");
 const salt=randomBytes(24);
 const key=scryptSync(password,salt,32,{N,r:R,p:P,maxmem:64*1024*1024});
 const value=["scrypt",N,R,P,salt.toString("base64url"),key.toString("base64url")].join("$");
 stdout.write("\nApplying the new Worker-compatible password verifier…\n");
 wranglerPut(value);
 stdout.write("\nSuccess. Password-verifier upgrade installed.\n");
 stdout.write("You can sign in with your existing password and your existing Microsoft Authenticator account.\n");
 stdout.write("No other Cloudflare secret was changed.\n");
}catch(err){
 console.error("\nUpgrade unsuccessful:",err instanceof Error?err.message:"unknown error");
 process.exitCode=1;
}
