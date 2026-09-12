"use client";
import {useEffect,useMemo,useState} from "react";

type Asset={id:string;filename:string;url:string;alt:string;type:"IMAGE"|"VIDEO"|"DOCUMENT";createdAt:string};
type Collection="ALL"|"BRAND"|"PEOPLE"|"PARTNERS"|"PRODUCTS"|"LOCATIONS"|"CAMPAIGNS";

const blank={filename:"",url:"",alt:"",type:"IMAGE" as Asset["type"]};
const collections:Collection[]=["ALL","BRAND","PEOPLE","PARTNERS","PRODUCTS","LOCATIONS","CAMPAIGNS"];

function collectionFor(a:Asset):Exclude<Collection,"ALL">{
 const s=(a.filename+" "+a.alt+" "+a.url).toLowerCase();
 if(/logo|mfsys|brand|icon/.test(s))return "BRAND";
 if(/team|ali-|karim|coo|ceo|cto|manager|engineer|bilal|awais|abbas|naeem|sumbal|akhtar/.test(s))return "PEOPLE";
 if(/partner|microsoft|red-hat|aws|sap|ibm|mongodb|angular/.test(s))return "PARTNERS";
 if(/ciihive|cargoguard|carboncap|loanleaf|digitalkisan|mconnect|product/.test(s))return "PRODUCTS";
 if(/map|islamabad|gilgit|toronto|canada|pakistan|office|location/.test(s))return "LOCATIONS";
 return "CAMPAIGNS";
}

export default function Media(){
 const [items,setItems]=useState<Asset[]>([]),[form,setForm]=useState(blank),[open,setOpen]=useState(false),[editing,setEditing]=useState<Asset|null>(null);
 const [filter,setFilter]=useState<Collection>("ALL"),[type,setType]=useState("ALL"),[query,setQuery]=useState(""),[message,setMessage]=useState(""),[copied,setCopied]=useState("");
 async function load(){const r=await fetch("/api/admin/media");const d=await r.json();if(r.ok)setItems(d);else setMessage(d.error||"Unable to load media");}
 useEffect(()=>{load()},[]);
 async function save(e:React.FormEvent){e.preventDefault();const r=await fetch("/api/admin/media",{method:editing?"PATCH":"POST",headers:{"content-type":"application/json"},body:JSON.stringify(editing?{...form,id:editing.id}:form)});const d=await r.json();if(r.ok){setMessage(editing?"Media asset updated.":"Media asset added.");setForm(blank);setEditing(null);setOpen(false);load()}else setMessage(d.error||"Could not save asset");}
 async function remove(id:string){if(!confirm("Remove this media record?"))return;const r=await fetch("/api/admin/media?id="+id,{method:"DELETE"});if(r.ok){setItems(x=>x.filter(a=>a.id!==id));setMessage("Media asset removed.")}}
 async function copy(url:string,id:string){await navigator.clipboard.writeText(url);setCopied(id);setTimeout(()=>setCopied(""),1600)}
 const shown=useMemo(()=>items.filter(a=>(filter==="ALL"||collectionFor(a)===filter)&&(type==="ALL"||a.type===type)&&((a.filename+" "+a.alt).toLowerCase().includes(query.toLowerCase()))),[items,filter,type,query]);
 return <main className="admin-content">
  <div className="admin-kicker">CONTENT / MEDIA</div>
  <div className="admin-page-title"><div><h1>Media Library</h1><p>One reusable source of truth for MFSYS brand, people, partners, products and campaign assets.</p></div><button className="admin-primary" onClick={()=>{setEditing(null);setForm(blank);setOpen(true)}}>+ Add media</button></div>
  <div className="media-library-summary"><div><strong>{items.length}</strong><span>Total assets</span></div><div><strong>{items.filter(a=>a.type==="IMAGE").length}</strong><span>Images</span></div><div><strong>{new Set(items.map(collectionFor)).size}</strong><span>Collections</span></div><div className="media-library-note"><b>Brand governance</b><span>Use descriptive filenames and meaningful alt text so assets remain reusable and accessible.</span></div></div>
  {message&&<div className="media-toast">{message}</div>}
  <div className="media-toolbar">
   <div className="media-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search assets, filenames or alt text…" /></div>
   <div className="media-filters">{collections.map(x=><button key={x} className={filter===x?"active":""} onClick={()=>setFilter(x)}>{x}</button>)}</div>
   <select className="media-type-filter" value={type} onChange={e=>setType(e.target.value)}><option>ALL</option><option>IMAGE</option><option>VIDEO</option><option>DOCUMENT</option></select>
  </div>
  <div className="media-collection-strip">{collections.filter(x=>x!=="ALL").map(x=><button key={x} className={filter===x?"selected":""} onClick={()=>setFilter(x)}><span className={"collection-dot "+x.toLowerCase()}></span><b>{x[0]+x.slice(1).toLowerCase()}</b><small>{items.filter(a=>collectionFor(a)===x).length} assets</small></button>)}</div>
  <div className="media-library-grid">
   {shown.map(a=><article className="media-asset-card" key={a.id}>
    <div className="media-asset-preview">{a.type==="IMAGE"?<img src={a.url} alt={a.alt}/>:<div className="media-asset-icon">{a.type==="VIDEO"?"▶":"DOC"}</div>}<span className="media-asset-type">{a.type}</span></div>
    <div className="media-asset-body"><div className="media-asset-meta"><span>{collectionFor(a)}</span><small>{new Date(a.createdAt).toLocaleDateString()}</small></div><strong title={a.filename}>{a.filename}</strong><p>{a.alt}</p></div>
    <div className="media-asset-actions"><button onClick={()=>copy(a.url,a.id)}>{copied===a.id?"Copied ✓":"Copy URL"}</button><a href={a.url} target="_blank" rel="noreferrer">Open ↗</a><button onClick={()=>{setEditing(a);setForm({filename:a.filename,url:a.url,alt:a.alt,type:a.type});setOpen(true)}}>Edit</button><button className="danger" onClick={()=>remove(a.id)}>Remove</button></div>
   </article>)}
  </div>
  {!shown.length&&<div className="empty-state"><div className="empty-icon">↑</div><h2>No assets found</h2><p>Try another search or collection, or add a reusable MFSYS asset.</p></div>}
  {open&&<div className="modal"><form className="modal-card media-modal" onSubmit={save}><div className="modal-kicker">MEDIA ASSET</div><h2>{editing?"Edit media asset":"Add media asset"}</h2><p>Store the canonical asset URL and accessibility metadata. Collections are assigned automatically from the asset naming.</p><label className="editor-field">Asset URL<input required type="url" value={form.url} onChange={e=>setForm({...form,url:e.target.value})}/></label><label className="editor-field">Filename<input required value={form.filename} onChange={e=>setForm({...form,filename:e.target.value})}/></label><label className="editor-field">Type<select value={form.type} onChange={e=>setForm({...form,type:e.target.value as Asset["type"]})}><option>IMAGE</option><option>VIDEO</option><option>DOCUMENT</option></select></label><label className="editor-field">Alt text<input required value={form.alt} onChange={e=>setForm({...form,alt:e.target.value})}/></label><div className="editor-actions"><button type="button" className="admin-secondary" onClick={()=>{setOpen(false);setEditing(null);setForm(blank)}}>Cancel</button><button className="admin-primary">{editing?"Save changes":"Add asset"}</button></div></form></div>}
 </main>
}
