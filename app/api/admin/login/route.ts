import {NextResponse} from "next/server";
import {z} from "zod";
import {getEditorialSecret,missingEditorialSecrets} from "../../../../lib/editorial-secrets";
import {isSupportedAdminPasswordHash,signSession,verifyPassword,verifyTotp} from "../../../../lib/auth";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const input=z.object({
 email:z.string().trim().email().max(254),
 password:z.string().min(12).max(256),
 code:z.string().trim().regex(/^\d{6}$/)
});
const reply=(data:unknown,status=200)=>NextResponse.json(data,{
 status,headers:{"Cache-Control":"private, no-store","Pragma":"no-cache"}
});

export async function POST(request:Request){
 const origin=request.headers.get("origin");
 // Browser login is same-origin only; no API token login or cross-site form submissions.
 if(!origin||origin!==new URL(request.url).origin)return reply({error:"Origin not permitted"},403);
 if(!request.headers.get("content-type")?.startsWith("application/json"))
  return reply({error:"Unsupported request format"},415);
 if(Number(request.headers.get("content-length")||0)>2048)
  return reply({error:"Request too large"},413);

 const email=getEditorialSecret("ADMIN_EMAIL").trim().toLowerCase();
 const hash=getEditorialSecret("ADMIN_PASSWORD_HASH");
 const otpSecret=getEditorialSecret("ADMIN_TOTP_SECRET");
 const missing=missingEditorialSecrets(["ADMIN_EMAIL","ADMIN_PASSWORD_HASH","ADMIN_TOTP_SECRET","AUTH_SECRET"]);
 if(missing.length||getEditorialSecret("AUTH_SECRET").length<32){
  // Name-only diagnostics; NEVER log or return the values of bindings.
  console.error("[mfsys-editor-auth] runtime binding unavailable:",missing.length?missing.join(","):"AUTH_SECRET too short");
  return reply({error:"Secure editorial sign-in has not been activated"},503);
 }
 if(!isSupportedAdminPasswordHash()){
  // The legacy verifier caused Worker CPU-limit errors; never invoke it.
  console.warn("[mfsys-editor-auth] local password-hash upgrade required");
  return reply({error:"A one-time Content Studio password-hash upgrade is required"},503);
 }

 let data:unknown;
 try{data=await request.json()}catch{return reply({error:"Invalid credentials"},401)}
 const parsed=input.safeParse(data);
 if(!parsed.success){console.warn("[mfsys-editor-auth] rejected: invalid input format");return reply({error:"Invalid credentials"},401);}

 const {email:requestedEmail,password,code}=parsed.data;
 const validEmail=requestedEmail.toLowerCase()===email;
 // Password and authenticator factors are evaluated independently. Never tell
 // callers which factor failed or publish the configured administrator address.
 const validPassword=validEmail&&await verifyPassword(password);
 const validOtp=verifyTotp(code,otpSecret);
 if(!validEmail||!validPassword||!validOtp){
  // Cloudflare logs are restricted to administrators. Never log submitted
  // credentials, the admin email, authenticator codes or stored secret values.
  const reason=!validEmail?"email-not-matched":!validPassword?"password-not-matched":"authenticator-not-matched";
  console.warn("[mfsys-editor-auth] rejected: "+reason);
  return reply({error:"Invalid credentials"},401);
 }

 const response=reply({ok:true,redirect:"/admin/insights"});
 response.cookies.set("mfsys_admin_session",signSession({
  email:requestedEmail.toLowerCase(),role:"SUPER_ADMIN",exp:Date.now()+4*60*60*1000
 }),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:4*60*60});
 return response;
}
