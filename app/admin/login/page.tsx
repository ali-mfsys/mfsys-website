"use client";
import {FormEvent,useState} from "react";
import {useRouter} from "next/navigation";

export default function Login(){
 const router=useRouter();
 const [error,setError]=useState("");
 const [busy,setBusy]=useState(false);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setError("");setBusy(true);
  // React clears event.currentTarget after the event dispatch. Capture the
  // actual form element before awaiting the login network request.
  const submittedForm=event.currentTarget;
  const form=new FormData(submittedForm);
  try{
   const response=await fetch("/api/admin/login",{
    method:"POST",credentials:"same-origin",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
     email:String(form.get("email")||""),
     password:String(form.get("password")||""),
     code:String(form.get("code")||"")
    })
   });
   if(!response.ok){
    if(response.status===503)throw Error("Editorial sign-in has not been activated. Contact your MFSYS website administrator.");
    throw Error("The email, password or authenticator code was not accepted.");
   }
   // Discard the form and force the next server request to re-evaluate its session.
   submittedForm.reset();
   router.replace("/admin/insights");
   router.refresh();
  }catch(e){setError(e instanceof Error?e.message:"Sign-in is unavailable");}
  finally{setBusy(false);}
 }
 return <main className="admin-login">
  <div className="login-card">
   <div className="admin-kicker">MFSYS CONTENT STUDIO</div>
   <h1>Sign in</h1>
   <p>Secure access for approved MFSYS administrators and editors.</p>
   <form onSubmit={submit}>
    <label>Email<input name="email" type="email" autoComplete="username" required maxLength={254}/></label>
    <label>Password<input name="password" type="password" autoComplete="current-password" minLength={12} maxLength={256} required/></label>
    <label>Authenticator code<input name="code" type="text" inputMode="numeric" pattern="[0-9]{6}" autoComplete="one-time-code" minLength={6} maxLength={6} placeholder="6-digit code" required/></label>
    {error&&<div role="alert" className="login-error">{error}</div>}
    <button className="admin-primary" disabled={busy}>{busy?"Verifying…":"Sign in securely →"}</button>
   </form>
   <small>Two-factor authentication is required. No sensitive credentials are stored in the website source code.</small>
  </div>
 </main>;
}
