"use client";
import {useMemo,useState} from "react";
import type {DirectoryItem} from "../lib/directory-data";

function initials(name:string){
  return name.split(" ").filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase();
}

function safeExternal(url?:string){
  if(!url) return undefined;
  return /^https:\/\//i.test(url) ? url : undefined;
}

export default function DirectoryClient({team,partners,full=false}:{team:DirectoryItem[];partners:DirectoryItem[];full?:boolean}){
  const categories=["All",...Array.from(new Set(team.map(x=>x.category).filter(Boolean) as string[]))];
  const [selected,setSelected]=useState<DirectoryItem|null>(null);
  const [category,setCategory]=useState("All");
  const filtered=useMemo(
    ()=>[...team].filter(x=>category==="All"||x.category===category).sort((a,b)=>a.sortOrder-b.sortOrder),
    [category,team]
  );
  const featured=full?filtered.filter(x=>x.featured):filtered.filter(x=>x.featured).slice(0,2);
  const rest=full?filtered.filter(x=>!featured.includes(x)):filtered.filter(x=>!featured.includes(x)).slice(0,10);
  const featuredPartners=partners.filter(x=>x.logoUrl).slice(0,8);

  return <>
    <section className="team-section">
      <div className="container">
        <div className="team-head">
          <div>
            <div className="eyebrow">PEOPLE & CULTURE</div>
            <h2>{full?"Meet the people behind MFSYS.":"People who turn complex challenges into practical technology."}</h2>
          </div>
          <div className="team-summary"><strong>{team.length}+</strong><span>people, disciplines and delivery capabilities</span></div>
          <p>{full?"Explore our multidisciplinary team and discover the expertise behind our products, platforms and client delivery.":"MFSYS brings business, financial services and technology expertise together across disciplines."}</p>
        </div>

        <div className="team-filter" role="tablist" aria-label="Team filters">
          {categories.map(x=><button key={x} className={category===x?"active":""} aria-selected={category===x} role="tab" onClick={()=>setCategory(x)}>{x}</button>)}
        </div>

        <div className="team-rail">
          {featured.map(x=><button className="team-card team-feature team-card-button" key={x.id} onClick={()=>setSelected(x)} aria-label={`View profile for ${x.name}`}>
            {x.imageUrl?<img className="team-photo" src={x.imageUrl} alt={x.name} loading="lazy"/>:<div className="team-placeholder" aria-hidden="true">{initials(x.name)}</div>}
            <div className="team-meta"><span className="team-accent">FEATURED / {x.category}</span><h3>{x.name}</h3><p>{x.role}</p></div>
          </button>)}
          {rest.map(x=><button className="team-card team-card-button" key={x.id} onClick={()=>setSelected(x)} aria-label={`View profile for ${x.name}`}>
            {x.imageUrl?<img className="team-photo" src={x.imageUrl} alt={x.name} loading="lazy"/>:<div className="team-placeholder" aria-hidden="true">{initials(x.name)}</div>}
            <div className="team-meta"><span className="team-accent">{x.category}</span><h3>{x.name}</h3><p>{x.role}</p></div>
          </button>)}
        </div>

        {!full&&<><div className="directory-note"><span>DATABASE-DRIVEN DIRECTORY</span><strong>Profiles can be added, edited, reordered or removed from the MFSYS admin workspace.</strong></div><div style={{marginTop:24}}><a className="btn" href="/about/team">Meet the full MFSYS team →</a></div></>}
      </div>
    </section>

    <section className="partners">
      <div className="container">
        <div className="partners-head">
          <div><div className="eyebrow">PARTNERS & TECHNOLOGY ECOSYSTEM</div><h2>Relationships and platforms that extend our impact.</h2></div>
          <p>Our ecosystem combines financial institutions, development organizations and technology platforms. Partner records are managed independently from the codebase.</p>
        </div>

        {featuredPartners.length>0&&<div className="partner-logo-rail" aria-label="Technology partners">
          {featuredPartners.map(x=>{
            const href=safeExternal(x.website);
            const content=<><div className="partner-logo">{x.logoUrl?<img src={x.logoUrl} alt={x.name} loading="lazy"/>:initials(x.name)}</div><span>{x.name}</span></>;
            return href?<a key={x.id} href={href} target="_blank" rel="noreferrer" className="partner-logo-chip">{content}</a>:<div key={x.id} className="partner-logo-chip">{content}</div>;
          })}
        </div>}

        <div className="partner-grid">
          {partners.map(x=>{
            const href=safeExternal(x.website);
            const content=<><div className="partner-logo">{x.logoUrl?<img src={x.logoUrl} alt={x.name} loading="lazy"/>:initials(x.name)}</div><div><span className="partner-category">{x.category}</span><h3>{x.name}</h3><p>{x.bio||"MFSYS ecosystem relationship."}</p>{href&&<span className="partner-link">Visit partner ↗</span>}</div></>;
            return href?<a className="partner-card" key={x.id} href={href} target="_blank" rel="noreferrer">{content}</a>:<div className="partner-card" key={x.id}>{content}</div>;
          })}
        </div>
      </div>
    </section>

    {selected&&<div className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onClick={()=>setSelected(null)}>
      <div className="profile-card" onClick={e=>e.stopPropagation()}>
        <button className="profile-close" onClick={()=>setSelected(null)} aria-label="Close profile">×</button>
        <div className="profile-avatar">{selected.imageUrl?<img src={selected.imageUrl} alt="" />:initials(selected.name)}</div>
        <div className="eyebrow">{selected.category||"MFSYS"}</div>
        <h2 id="profile-title">{selected.name}</h2>
        {selected.role&&<strong>{selected.role}</strong>}
        {selected.bio&&<p>{selected.bio}</p>}
      </div>
    </div>}
  </>;
}
