"use client";
import {useMemo,useState} from "react";
import type {DirectoryItem} from "../lib/directory-data";

function initials(name:string){return name.split(" ").filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase()}

export default function DirectoryClient({team,partners}:{team:DirectoryItem[];partners:DirectoryItem[]}){
  const categories=["All",...Array.from(new Set(team.map(x=>x.category).filter(Boolean) as string[]))];
  const [category,setCategory]=useState("All");
  const filtered=useMemo(()=>category==="All"?team:team.filter(x=>x.category===category),[category,team]);
  const featured=filtered.filter(x=>x.featured).slice(0,2);
  const rest=filtered.filter(x=>!featured.includes(x)).slice(0,8);

  return <>
    <section className="team-section">
      <div className="container">
        <div className="team-head"><div><div className="eyebrow">PEOPLE & CULTURE</div><h2>People who turn complex challenges into practical technology.</h2></div><p>MFSYS brings business, financial services and technology expertise together across disciplines.</p></div>
        <div className="team-filter" role="tablist" aria-label="Team filters">{categories.map(x=><button key={x} className={category===x?"active":""} onClick={()=>setCategory(x)}>{x}</button>)}</div>
        <div className="team-rail">
          {featured.map(x=><article className="team-card team-feature" key={x.id}>
            {x.imageUrl?<img className="team-photo" src={x.imageUrl} alt={x.name}/>:<div className="team-placeholder" aria-hidden="true">{initials(x.name)}</div>}
            <div className="team-meta"><h3>{x.name}</h3><p>{x.role}</p></div>
          </article>)}
          {rest.map(x=><article className="team-card" key={x.id}>
            {x.imageUrl?<img className="team-photo" src={x.imageUrl} alt={x.name}/>:<div className="team-placeholder" aria-hidden="true">{initials(x.name)}</div>}
            <div className="team-meta"><h3>{x.name}</h3><p>{x.role}</p></div>
          </article>)}
        </div>
        <div style={{marginTop:24}}><a className="btn" href="/about">Meet the full MFSYS team →</a></div>
      </div>
    </section>

    <section className="partners">
      <div className="container">
        <div className="eyebrow">PARTNERS & COLLABORATIONS</div>
        <h2>Relationships that extend our impact.</h2>
        <div className="partner-grid">
          {partners.map(x=><article className="partner-card" key={x.id}>
            <div className="partner-logo">{x.logoUrl?<img src={x.logoUrl} alt={x.name}/>:initials(x.name)}</div>
            <div><h3>{x.name}</h3><p>{x.bio||x.category}</p></div>
          </article>)}
        </div>
      </div>
    </section>
  </>;
}
