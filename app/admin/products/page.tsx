"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product={
  id:string; slug:string; name:string; tagline:string; description:string;
  capabilities:string[]; status:"DRAFT"|"REVIEW"|"APPROVED"|"PUBLISHED"|"ARCHIVED";
};

const blank={slug:"",name:"",tagline:"",description:"",capabilities:"",status:"DRAFT" as Product["status"]};

export default function Products(){
  const [items,setItems]=useState<Product[]>([]);
  const [form,setForm]=useState(blank);
  const [editing,setEditing]=useState<Product|null>(null);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");

  async function load(){
    const r=await fetch("/api/admin/products");
    const d=await r.json();
    if(r.ok)setItems(d); else setMessage(d.error||"Unable to load products");
  }
  useEffect(()=>{load()},[]);

  function edit(p:Product){
    setEditing(p);
    setForm({slug:p.slug,name:p.name,tagline:p.tagline,description:p.description,capabilities:p.capabilities.join("\n"),status:p.status});
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function reset(){setEditing(null);setForm(blank)}

  async function save(e:React.FormEvent){
    e.preventDefault(); setBusy(true);
    const payload={...form,capabilities:form.capabilities.split("\n").map(x=>x.trim()).filter(Boolean)};
    const r=await fetch("/api/admin/products",{method:editing?"PATCH":"POST",headers:{"content-type":"application/json"},body:JSON.stringify(editing?{...payload,id:editing.id}:payload)});
    const d=await r.json();
    setMessage(r.ok?(editing?"Product updated.":"Product created."):(d.error||"Save failed"));
    if(r.ok){reset();await load()}
    setBusy(false);
  }

  async function seed(){
    setBusy(true);
    const r=await fetch("/api/admin/products",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({seed:true})});
    const d=await r.json();
    setMessage(r.ok?`Imported ${d.created} products.`:d.message||d.error||"Import failed");
    await load(); setBusy(false);
  }

  async function remove(id:string){
    if(!confirm("Remove this product from the CMS catalogue?"))return;
    const r=await fetch("/api/admin/products?id="+encodeURIComponent(id),{method:"DELETE"});
    if(r.ok){setItems(x=>x.filter(p=>p.id!==id));setMessage("Product removed.")}else setMessage("Could not remove product.");
  }

  return <main className="admin-content">
    <div className="admin-kicker">CONTENT / PRODUCTS</div>
    <div className="admin-page-title">
      <div><h1>Product Catalogue</h1><p>Database-backed products with controlled publishing status and editable capabilities.</p></div>
      <button className="admin-primary" onClick={seed} disabled={busy}>Import current MFSYS catalogue</button>
    </div>
    {message&&<div className="status-pill" style={{marginBottom:18}}>{message}</div>}

    <section className="admin-panel">
      <div className="panel-head"><div><span className="admin-kicker">{editing?"EDIT PRODUCT":"ADD PRODUCT"}</span><h2>{editing?editing.name:"Create a product record"}</h2></div>{editing&&<button className="admin-secondary" onClick={reset}>Cancel</button>}</div>
      <form className="directory-form" onSubmit={save}>
        <label className="editor-field">Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
        <label className="editor-field">Slug<input required pattern="[a-z0-9-]+" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})}/></label>
        <label className="editor-field full">Tagline<input required value={form.tagline} onChange={e=>setForm({...form,tagline:e.target.value})}/></label>
        <label className="editor-field full">Description<textarea required rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>
        <label className="editor-field full">Capabilities <small>One capability per line</small><textarea rows={7} value={form.capabilities} onChange={e=>setForm({...form,capabilities:e.target.value})}/></label>
        <label className="editor-field">Status<select value={form.status} onChange={e=>setForm({...form,status:e.target.value as Product["status"]})}>{["DRAFT","REVIEW","APPROVED","PUBLISHED","ARCHIVED"].map(x=><option key={x}>{x}</option>)}</select></label>
        <div className="editor-actions full"><button className="admin-primary" disabled={busy}>{busy?"Saving…":editing?"Save changes":"Add to database"}</button></div>
      </form>
    </section>

    <section className="admin-panel" style={{marginTop:20}}>
      <div className="panel-head"><div><span className="admin-kicker">CATALOGUE</span><h2>{items.length} products</h2></div></div>
      <div className="admin-table">{items.map(p=><div className="admin-row" key={p.id}>
        <div><strong>{p.name}</strong><small>{p.tagline}</small></div>
        <span className="status-pill">{p.status}</span>
        <Link href={`/products/${p.slug}`}>Preview ↗</Link>
        <button onClick={()=>edit(p)}>Edit</button>
        <button onClick={()=>remove(p.id)}>Remove</button>
      </div>)}</div>
    </section>
  </main>
}
