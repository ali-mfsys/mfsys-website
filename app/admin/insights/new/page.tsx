"use client";
import {FormEvent,useRef,useState} from "react";
import Link from "next/link";

type Analysis={score:number;wordCount:number;keywordMentions:number;recommendations:string[];suggestedDescription:string};
type DraftSuccess={title:string;proposedUrl:string;pullRequest:{number:number;url:string}};
type InsightKind="RESEARCH"|"CASE STUDY"|"ARTICLE"|"REPORT"|"NEWS";
const sourceRequired:InsightKind[]=["RESEARCH","REPORT","NEWS"];

export default function NewInsight(){
 const formRef=useRef<HTMLFormElement>(null);
 const [kind,setKind]=useState<InsightKind>("ARTICLE");
 const [analysis,setAnalysis]=useState<Analysis|null>(null);
 const [busy,setBusy]=useState<"save"|"analyze"|null>(null);
 const [message,setMessage]=useState("");
 const [saved,setSaved]=useState<DraftSuccess|null>(null);
 const getFields=()=>formRef.current?new FormData(formRef.current):null;

 async function analyze(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setBusy("analyze");setMessage("");
  const f=getFields();if(!f){setBusy(null);return}
  try{
   const res=await fetch("/api/admin/ai/seo",{method:"POST",credentials:"same-origin",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({title:f.get("title"),content:f.get("body"),focusKeyword:f.get("keyword"),type:f.get("type")})
   });
   const data=await res.json();
   if(!res.ok)throw Error(data.error||"SEO analysis failed");
   setAnalysis(data.analysis??null);
  }catch(e){setMessage(e instanceof Error?e.message:"Could not analyze the draft");}
  finally{setBusy(null);}
 }

 async function saveDraft(){
  if(!formRef.current||!formRef.current.reportValidity())return;
  setMessage("");setSaved(null);setBusy("save");
  const f=getFields();if(!f){setBusy(null);return;}
  const draft=Object.fromEntries(["title","type","category","excerpt","takeaway","body","sourceUrl","sourceName"].map(k=>[k,String(f.get(k)||"")]));
  try{
   const res=await fetch("/api/admin/insights",{
    method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},
    body:JSON.stringify(draft)
   });
   const data=await res.json();
   if(!res.ok){
    const reasons=data.fields?Object.values(data.fields as Record<string,string[]>).flat().filter(Boolean).join(" "):"";
    throw Error(reasons||data.error||"Failed to submit draft");
   }
   setSaved(data as DraftSuccess);
  }catch(e){setMessage(e instanceof Error?e.message:"Could not save this draft");}
  finally{setBusy(null);}
 }

 return <main className="admin-content">
  <div className="admin-kicker">CONTENT / INSIGHTS / NEW</div>
  <h1>Create an Insight draft</h1>
  <p className="admin-intro">News, research, reports and articles share one Git-managed publishing source. Drafts require an approved pull request before appearing on MFSYS.</p>
  <div className="admin-panel" style={{marginBottom:17,padding:"16px 20px",background:"#f4f8fb"}}>
   <strong>Publication safety</strong>
   <p style={{fontSize:13,lineHeight:1.65,margin:"7px 0 0"}}>Saving creates a GitHub draft pull request. It does <strong>not</strong> publish content. This GitHub repository is public, so draft text and review comments are publicly visible—do not include confidential material. An authorized editor must review, approve and merge the change after CI passes.</p>
  </div>
  <form ref={formRef} className="admin-panel editor-form" onSubmit={analyze}>
   <label className="editor-field">Title
    <input name="title" placeholder="A specific, factual headline" minLength={12} maxLength={220} required/>
   </label>
   <label className="editor-field">Content type
    <select name="type" value={kind} onChange={e=>setKind(e.target.value as InsightKind)}>
     <option value="ARTICLE">Article / Blog</option><option value="RESEARCH">Research brief</option>
     <option value="REPORT">Report summary</option><option value="NEWS">News update</option>
     <option value="CASE STUDY">Case study</option>
    </select>
   </label>
   <label className="editor-field">Category
    <input name="category" placeholder="e.g. Microfinance, Credit Unions & SACCOs" minLength={3} maxLength={90} required/>
   </label>
   <label className="editor-field">Primary SEO keyword (for analysis only)
    <input name="keyword" placeholder="e.g. core banking modernization" maxLength={120}/>
   </label>
   <label className="editor-field">Summary / search description
    <textarea name="excerpt" rows={3} placeholder="An accurate 2–3 sentence summary" minLength={40} maxLength={500} required/>
   </label>
   <label className="editor-field">Key takeaway
    <textarea name="takeaway" rows={2} placeholder="The most important practical conclusion for a financial institution" minLength={15} maxLength={270} required/>
   </label>
   <label className="editor-field">Article body
    <textarea name="body" rows={16} placeholder={"Write original text here. Use a blank line between paragraphs, ## for headings and - for bullets.\n\nInclude evidence and implementation context, not generic keyword repetitions."} minLength={120} maxLength={30000} required/>
   </label>
   <label className="editor-field">Original source URL {sourceRequired.includes(kind)?"(required)":"(optional)"}
    <input name="sourceUrl" type="url" placeholder="https://publisher.example/article" required={sourceRequired.includes(kind)} maxLength={1800}/>
   </label>
   <label className="editor-field">Source publication / publisher
    <input name="sourceName" placeholder="e.g. CGAP, BIS or IFSB" maxLength={150} required={sourceRequired.includes(kind)}/>
   </label>
   <div className="editor-actions">
    <button type="button" onClick={saveDraft} className="admin-primary" disabled={busy!==null}>
     {busy==="save"?"Creating draft pull request…":"Save draft for review →"}
    </button>
    <button type="submit" className="admin-secondary" disabled={busy!==null}>
     {busy==="analyze"?"Checking content…":"Check SEO basics"}
    </button>
    <Link href="/admin/insights" className="admin-secondary">Back to published Insights</Link>
   </div>
   {message&&<div role="alert" className="login-error" style={{marginTop:14}}>{message}</div>}
   {saved&&<div className="ai-review" role="status" style={{marginTop:16}}>
    <strong>Draft pull request created — publication pending approval</strong>
    <p>{saved.title}</p>
    <a href={saved.pullRequest.url} target="_blank" rel="noopener noreferrer" style={{fontWeight:850}}>
     Open draft PR #{saved.pullRequest.number} for editorial review ↗
    </a>
    <p style={{fontSize:12}}>Proposed URL after review and deployment: {saved.proposedUrl}</p>
   </div>}
   {analysis&&<section className="ai-review">
    <div><strong>SEO basic checks (heuristic, not a ranking score)</strong><span className="ai-score">{analysis.score}/100</span></div>
    <p>{analysis.wordCount} words · {analysis.keywordMentions} focus-keyword mentions</p>
    {analysis.recommendations.map(x=><div className="ai-rec" key={x}>↗ {x}</div>)}
    <div className="ai-suggestion"><strong>Draft search description</strong><p>{analysis.suggestedDescription}</p></div>
   </section>}
  </form>
 </main>;
}
