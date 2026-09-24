"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "INTELLIGENCE FOR IMPACT",
    title: <>Technology for a <span>More Inclusive World</span></>,
    text: "MFSYS builds AI-powered, cloud-native solutions for financial inclusion, sustainable development and smarter supply chains across emerging markets.",
    primary: "Our Solutions",
    href: "/solutions",
    signature: "FINANCIAL INCLUSION",
  },
  {
    eyebrow: "DIGITAL FINANCIAL SERVICES",
    title: <>Intelligent Banking for <span>Inclusive Growth</span></>,
    text: "Modern core banking, digital lending, payments and AI-powered credit intelligence help financial institutions serve more people with greater speed and confidence.",
    primary: "Explore Digital Banking",
    href: "/solutions/digital-banking",
    signature: "BANKING  •  LENDING  •  PAYMENTS",
  },
  {
    eyebrow: "AI & CREDIT INTELLIGENCE",
    title: <>Turn Data into <span>Better Decisions</span></>,
    text: "From AI-based credit scoring to automated risk assessment, MFSYS transforms complex data into practical intelligence for smarter financial decisions.",
    primary: "Explore AI & Innovation",
    href: "/ai-innovation",
    signature: "AI  •  CREDIT  •  RISK INTELLIGENCE",
  },
  {
    eyebrow: "CLIMATE & SUSTAINABILITY",
    title: <>Technology for a <span>Climate-Ready Future</span></>,
    text: "Digital platforms for carbon markets, climate finance and sustainable enterprises connect measurable environmental impact with transparent digital ecosystems.",
    primary: "Explore Climate Solutions",
    href: "/solutions/climate-carbon",
    signature: "CLIMATE  •  CARBON  •  SUSTAINABLE FINANCE",
  },
  {
    eyebrow: "CONNECTED ECOSYSTEMS",
    title: <>One Intelligence Core. <span>Connected Impact.</span></>,
    text: "We connect institutions, businesses, communities and supply chains through secure platforms designed to make complex ecosystems simpler, smarter and more resilient.",
    primary: "Discover MFSYS",
    href: "/about",
    signature: "ECOSYSTEMS  •  AUTOMATION  •  IMPACT",
  },
];

export default function HeroNarrative(){
 const [active, setActive] = useState(0);

 useEffect(() => {
  const timer = window.setInterval(() => {
   setActive((current) => (current + 1) % slides.length);
  }, 7000);
  return () => window.clearInterval(timer);
 }, []);

 const slide = slides[active];

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
   <div className="hero-slide" key={active}>
    <div className="eyebrow">{slide.eyebrow}</div>
    <h1 id="hero-title">{slide.title}</h1>
    <p>{slide.text}</p>
    <div className="hero-actions">
     <Link className="btn btn-orange" href={slide.href}>{slide.primary} <span>→</span></Link>
     <a className="btn hero-video-btn" href="#intelligence-flow"><span className="play">▶</span> Watch Video</a>
    </div>
   </div>
   <div className="hero-dots" role="tablist" aria-label="MFSYS homepage hero navigation">
    {slides.map((item, index) => (
      <button
       key={item.eyebrow}
       type="button"
       role="tab"
       aria-label={`Hero panel ${index + 1}: ${item.eyebrow}`}
       aria-selected={active === index}
       onClick={() => setActive(index)}
      >{String(index + 1).padStart(2, "0")}</button>
    ))}
   </div>
   <div className="hero-signature">{slide.signature} <i/> MFSYS TECHNOLOGIES <i/> INTELLIGENCE FOR IMPACT</div>
  </div>
 </section>;
}
