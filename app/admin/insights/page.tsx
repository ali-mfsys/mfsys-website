"use client";
import Link from "next/link";
import {useEffect,useState} from "react";

type PublishedInsight={
 id:string;slug:string;url:string;title:string;type:string;excerpt?:string;
 status:"PUBLISHED";date:string
};
export default function Insights(){
 const [items,setItems]=useState<PublishedInsight[]>([]);
 const [message,setMessage]=useState("");
 useEffect(()=>{
  const controller=new AbortController();
  fetch("/api/admin/insights",{credentials:"same-origin",cache:"no-store",signal:controller.signal})
   .then(async r=>{const data=await r.json();if(!r.ok)throw Error(data.error||"Unable to load Insights");return data})
   .then(data=>{if(Array.isArray(data))setItems(data)})
   .catch(e=>{if(e.name!=="AbortError")setMessage(e instanceof Error?e.message:"Unable to load Insights")});
  return()=>controller.abort();
 },[]);
 return <main className="admin-content">
  <div className="admin-kicker">CONTENT / INSIGHTS</div>
  <div className="admin-page-title"><div><h1>Published Insights</h1><p>One canonical, Git-managed library across Research, Case Studies, Articles, Reports and News.</p></div>
   <Link className="admin-primary" href="/admin/insights/new">+ New draft</Link>
  </div>
  <div className="admin-panel" style={{padding:"15px 20px",marginBottom:18}}>
   <strong>Editorial workflow:</strong> Submit a new article through the editor, review its GitHub draft pull request, approve and merge it after automated tests pass.
   The live site and sitemap use the same versioned content file. This list shows published entries, not unmerged drafts.
  </div>
  {message&&<div role="alert" className="status-pill">{message}</div>}
  {items.length>0?<div className="admin-table">
   {items.map(i=><div className="admin-row" key={i.slug}>
    <div><strong>{i.title}</strong><small>{i.type} · {i.url}</small></div>
    <span className="status-pill">{i.status}</span>
    <Link href={i.url} target="_blank">View public page ↗</Link>
   </div>)}
  </div>:!message?<div className="empty-state"><div className="empty-icon">✦</div><h2>Loading the published library…</h2></div>:null}
 </main>;
}