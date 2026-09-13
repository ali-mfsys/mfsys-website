"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {sectorStory} from "../../lib/sector-story";

const orbitLabels=[
  ["Financial Inclusion","Banking & Microfinance","top"],
  ["Climate Solutions","Carbon & Sustainability","left"],
  ["AI & Innovation","Decision Intelligence","right"],
  ["Digital Communities","Inclusive Ecosystems","bottom-left"],
  ["Sustainable Growth","Data & Impact","bottom-right"],
];

export default function HeroNarrative(){
 const [i,setI]=useState(0);
 useEffect(()=>{const id=setInterval(()=>setI(x=>(x+1)%sectorStory.length),7000);return()=>clearInterval(id)},[]);
 const s=sectorStory[i];
 return <section className="hero" aria-labelledby="hero-title">
  <div className="hero-visual" aria-hidden="true">
   <div className="hero-grid"/>
   <div className="hero-glow"/>
   <div className="hero-orbit hero-orbit-a"/>
   <div className="hero-orbit hero-orbit-b"/>
   <div className="hero-orbit hero-orbit-c"/>
   <div className="hero-core">
    <strong>MFSYS</strong>
    <span>INTELLIGENCE<br/>FOR IMPACT</span>
   </div>
   {orbitLabels.map(([title,sub,pos])=><div className={"orbit-label "+pos} key={title}><b>{title}</b><small>{sub}</small></div>)}
   <div className="hero-particle p1"/><div className="hero-particle p2"/><div className="hero-particle p3"/><div className="hero-particle p4"/>
  </div>
  <div className="hero-overlay" aria-hidden="true"/>
  <div className="container hero-content">
   <div className="eyebrow">{s.eyebrow}</div>
   <h1 id="hero-title">Intelligence for <span>Inclusive Finance</span></h1>
   <p>{s.text}</p>
   <div className="hero-actions">
    <Link className="btn btn-primary" href={s.href}>Explore MFSYS →</Link>
    <a className="btn hero-video-btn" href="#intelligence-flow"><span className="play">▶</span> Watch Video</a>
   </div>
   <div className="hero-dots" role="tablist" aria-label="MFSYS sectors">
    {sectorStory.map((x,n)=><button key={x.eyebrow} aria-label={x.eyebrow} aria-selected={n===i} onClick={()=>setI(n)}>{String(n+1).padStart(2,"0")}</button>)}
   </div>
   <div className="hero-signature">PEOPLE <i/> TECHNOLOGY <i/> A MORE INCLUSIVE TOMORROW</div>
  </div>
 </section>;
}