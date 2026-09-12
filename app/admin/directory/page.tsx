"use client";
import {useEffect,useMemo,useState} from "react";

type Item={id:string;kind:"team"|"partner";name:string;role?:string;category?:string;bio?:string;imageUrl?:string;logoUrl?:string;featured?:boolean;sortOrder:number};

const blank={kind:"team" as const,name:"",role:"",category:"",bio:"",imageUrl:"",logoUrl:"",featured:false,sortOrder:1};

export default function DirectoryAdmin(){
 const [items,setItems]=useState<Item[]>([]);
 const [kind,setKind]=useState<"team"|"partner">("team");
 const [form,setForm]=useState({...blank});
 const [loading,setLoading]=useState(true);
 const [message,setMessage]=useState("");

 async function load(){setLoading(true);const r=await fetch("/api/admin/directory");const d=await r.json();if(r.ok)setItems(d);else setMessage(d.error||"Unable to load directory");setLoading(false)}
 useEffect(()=>{load()},[]);
 const filtered=useMemo(()=>items.filter(x=>x.kind===kind),[items,kind]);

 async function seed(){
   const r=await fetch("/api/admin/directory",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({seed:true})});
   const d=await r.json();setMessage(r.ok?`Imported ${d.created} legacy records.`:d.message||d.error||"Import failed");await load();
 }
 async function add(e:React.FormEvent){
   e.preventDefault();
   const payload={...form,kind,sortOrder:Number(form.sortOrder)};
   const r=await fetch("/api/admin/directory",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
   const d=await r.json();if(r.ok){setItems(x=>[...x,d]);setForm({...blank,kind});setMessage("Record added.");}else setMessage(d.error||"Could not add record");
 }
 async function remove(id:string){
   if(!confirm("Remove this record from the website?")) return;
   const r=await fetch("/api/admin/directory?id="+encodeURIComponent(id),{method:"DELETE"});
   if(r.ok){setItems(x=>x.filter(i=>i.id!==id));setMessage("Record removed.");}
 }

 return <main className="admin-content">
   <div className="admin-kicker">CONTENT / PEOPLE & PARTNERS</div>
   <div className="admin-page-title"><div><h1>Team & Partners</h1><p>Manage the people and collaborations shown on the public website. Changes are database-backed.</p></div><button className="admin-primary" onClick={seed}>Import legacy MFSYS records</button></div>
   {message&&<div className="status-pill" style={{marginBottom:18}}>{message}</div>}
   <div className="admin-panels">
     <section className="admin-panel">
       <div className="panel-head"><div><span className="admin-kicker">ADD RECORD</span><h2>{kind==="team"?"Team member":"Partner / collaboration"}</h2></div>
         <select value={kind} onChange={e=>{const k=e.target.value as "team"|"partner";setKind(k);setForm({...blank,kind:k})}}><option value="team">Team</option><option value="partner">Partner</option></select>
       </div>
       <form className="directory-form" onSubmit={add}>
         <label className="editor-field full">Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
         {kind==="team"&&<label className="editor-field">Role<input value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/></label>}
         <label className="editor-field">Category<input value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/></label>
         <label className="editor-field full">Description / bio<textarea rows={3} value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}/></label>
         <label className="editor-field">{kind==="team"?"Photo URL":"Logo URL"}<input value={kind==="team"?form.imageUrl:form.logoUrl} onChange={e=>setForm({...form,[kind==="team"?"imageUrl":"logoUrl"]:e.target.value})} placeholder="https://..."/></label>
         <label className="editor-field">Sort order<input type="number" value={form.sortOrder} onChange={e=>setForm({...form,sortOrder:Number(e.target.value)})}/></label>
         {kind==="team"&&<label className="editor-field">Featured<select value={String(form.featured)} onChange={e=>setForm({...form,featured:e.target.value==="true"})}><option value="false">No</option><option value="true">Yes</option></select></label>}
         <div className="editor-actions full"><button className="admin-primary" type="submit">Add to database</button></div>
       </form>
     </section>
     <section className="admin-panel">
       <div className="panel-head"><div><span className="admin-kicker">LIVE DIRECTORY</span><h2>{kind==="team"?"Team members":"Partners"}</h2></div><span className="status-pill">{filtered.length} records</span></div>
       {loading?<p>Loading…</p>:<div className="admin-table">{filtered.map(x=><div className="admin-row" key={x.id}><div><strong>{x.name}</strong><small>{x.role||x.category||"—"}</small></div><span className="status-pill">{x.featured?"Featured":"Published"}</span><button onClick={()=>remove(x.id)}>Remove</button></div>)}</div>}
     </section>
   </div>
 </main>
}
