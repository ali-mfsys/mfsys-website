"use client";
import {useEffect,useState} from "react";
import {sectorStory} from "../../lib/sector-story";

export default function HeroNarrative(){
 const [i,setI]=useState(0);
 useEffect(()=>{const id=setInterval(()=>setI(x=>(x+1)%sectorStory.length),7000);return()=>clearInterval(id)},[]);
 const s=sectorStory[i];
 return <section className="hero" aria-labelledby="hero-title">
  <div className="hero-visual" aria-hidden="true"><div className="hero-grid"/><div className="hero-orbit hero-orbit-a"/><div className="hero-orbit hero-orbit-b"/><div className="hero-core">MFSYS<span>AI</span></div><div className="hero-particle p1"/><div className="hero-particle p2"/><div className="hero-particle p3"/></div>
  <div className="hero-overlay" aria-hidden="true"/>
  <div className="container hero-content">
   <div className="eyebrow">{s.eyebrow}</div><h1 id="hero-title">{s.title}</h1><p>{s.text}</p>
   <a className="btn btn-primary" href={s.href}>Explore MFSYS →</a>
   <div className="hero-dots" role="tablist" aria-label="MFSYS sectors">{sectorStory.map((x,n)=><button key={x.eyebrow} aria-label={x.eyebrow} aria-selected={n===i} onClick={()=>setI(n)}>{String(n+1).padStart(2,"0")}</button>)}</div>
  </div>
 </section>;
}