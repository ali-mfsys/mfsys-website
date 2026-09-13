"use client";
import {FormEvent,useState} from "react";
import Link from "next/link";


export default function Page(){
 const [sent,setSent]=useState(false);
 const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const form=e.currentTarget;const data=new FormData(form);const subject=encodeURIComponent(`MFSYS enquiry — ${data.get("organization")||data.get("name")||"Website"}`);const body=encodeURIComponent(`Name: ${data.get("name")}\nWork email: ${data.get("email")}\nOrganization: ${data.get("organization")}\nType: ${data.get("type")}\n\nChallenge:\n${data.get("message")}`);window.location.href=`mailto:info@mfsys.ca?subject=${subject}&body=${body}`;setSent(true)};
 return <main id="main"><section className="contact-hero"><div className="container"><div className="eyebrow">CONTACT MFSYS</div><h1>Let’s shape what<br/><span>comes next.</span></h1><p>Tell us about your institution, challenge or transformation ambition. We’ll connect you with the right MFSYS team.</p></div></section>
 <section className="container section contact-grid">
  <div className="contact-form-wrap"><div className="contact-kicker">START A CONVERSATION</div><h2>What are you looking to build?</h2>
   {sent?<div className="contact-success"><strong>Thank you.</strong><p>Your message has been captured. A member of the MFSYS team will follow up.</p><button className="btn btn-primary" onClick={()=>setSent(false)}>Send another message</button></div>:<form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Name<input required name="name" autoComplete="name"/></label><label>Work email<input required type="email" name="email" autoComplete="email"/></label></div>
    <div className="form-row"><label>Organization<input name="organization" autoComplete="organization"/></label><label>What best describes you?<select name="type" defaultValue=""><option value="" disabled>Select one</option><option>Financial institution</option><option>Fintech / technology company</option><option>Development organization</option><option>Logistics / enterprise</option><option>Climate / sustainability</option><option>Other</option></select></label></div>
    <label>What challenge can we help solve?<textarea required rows={6} name="message" placeholder="Tell us briefly about your challenge, opportunity or project."/></label>
    <button className="btn btn-primary" type="submit">Start a conversation →</button>
   </form>}
  </div>
  <aside className="contact-aside"><div className="eyebrow">WHY MFSYS</div><h2>Domain expertise.<br/>Intelligence.<br/><span>Impact.</span></h2><p>For product inquiries, transformation engagements, partnerships and global opportunities, start with a conversation.</p><div className="contact-locations"><div><strong>CANADA</strong><span>Toronto</span></div><div><strong>PAKISTAN</strong><span>Islamabad</span></div><div><strong>AUSTRALIA</strong><span>Melbourne</span></div></div><a className="contact-email" href="mailto:info@mfsys.ca">info@mfsys.ca →</a><Link href="/case-studies" className="text-link">See our work →</Link></aside>
 </section></main>
}