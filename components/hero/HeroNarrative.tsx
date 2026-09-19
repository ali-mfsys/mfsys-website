"use client";
import Link from "next/link";

export default function HeroNarrative(){
 return <section className="hero" aria-labelledby="hero-title">
  <div className="hero-video-wrap" aria-hidden="true"><video className="hero-video" autoPlay muted loop playsInline preload="metadata"><source src="/mfsys-hero-bg-15s.mp4" type="video/mp4" /></video></div>
  <div className="hero-visual" aria-hidden="true">
   <div className="hero-grid"/><div className="hero-glow"/>
   <div className="hero-orbit hero-orbit-a"/><div className="hero-orbit hero-orbit-b"/><div className="hero-orbit hero-orbit-c"/>
   <div className="hero-core"><strong>MFSYS</strong><span>INTELLIGENCE<br/>FOR IMPACT</span></div>
   <div className="hero-particle p1"/><div className="hero-particle p2"/><div className="hero-particle p3"/><div className="hero-particle p4"/>
  </div>
  <div className="hero-overlay" aria-hidden="true"/>
  <div className="container hero-content">
   <div className="eyebrow">INTELLIGENCE FOR IMPACT</div>
   <h1 id="hero-title">Technology for a <span>More Inclusive World</span></h1>
   <p>MFSYS builds AI-powered, cloud-native solutions for financial inclusion, sustainable development and smarter supply chains across emerging markets.</p>
   <div className="hero-actions">
    <Link className="btn btn-orange" href="/solutions">Our Solutions <span>→</span></Link>
    <a className="btn hero-video-btn" href="#intelligence-flow"><span className="play">▶</span> Watch Video</a>
   </div>
   <div className="hero-dots" role="tablist" aria-label="MFSYS homepage navigation">
    <button aria-label="Hero panel 1" aria-selected="true">01</button>
    <button aria-label="Hero panel 2" aria-selected="false">02</button>
    <button aria-label="Hero panel 3" aria-selected="false">03</button>
    <button aria-label="Hero panel 4" aria-selected="false">04</button>
   </div>
   <div className="hero-signature">FINANCIAL INCLUSION <i/> SUSTAINABLE DEVELOPMENT <i/> SMARTER SUPPLY CHAINS</div>
  </div>
 </section>;
}