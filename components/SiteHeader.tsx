"use client";

import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {solutions,products,industries} from "../lib/site-data";
import BrandLogo from "./BrandLogo";

type MenuName="solutions"|"products"|"industries"|"ai";

const solutionGroups=[
 {title:"Financial Services",items:["Digital Banking Solution","Digital Loan Origination System (LOS)","Islamic Finance"]},
 {title:"Intelligence & Digital",items:["AI-Based Credit Intelligence","AI-Enabled Mobile Lending","Digital Wallet & Payment"]},
 {title:"Sector & Enterprise",items:["Agri Finance & Supply Chain","Climate & Carbon","Logistics & Supply Chain","Agentic AI Enterprise Automation","AI & Digital Transformation Consulting"]}
] as const;

const productGroups=[
 {title:"Core Platform",items:["CiiHive","mConnect"]},
 {title:"Lending & Finance",items:["LoanLeaf","Smart Mudarabah","DigitalKisaan","LoanIQ"]},
 {title:"Climate & Logistics",items:["Zaroraat24","XchangeCarbon","CargoGuard","IFRS9 Impairment Solution"]}
] as const;

const aiItems=[
 ["AI-Based Credit Intelligence","Explainable scoring and risk intelligence"],
 ["Agentic AI Enterprise Automation","AI agents and workflow automation"],
 ["Data Analytics & Insights","Advanced analytics for better decisions"],
 ["AI for Financial Inclusion","Responsible and inclusive AI solutions"],
 ["Emerging Technologies","Blockchain, open finance and digital identity"],
 ["Innovation Lab","Co-creating solutions for real-world impact"]
] as const;

function TechLandscape(){
 return <div className="mfsys-visual mfsys-visual--landscape" aria-hidden="true">
  <div className="mfsys-visual-glow"/>
  <div className="mfsys-landscape-grid"/>
  <div className="mfsys-mountain mfsys-mountain-a"/>
  <div className="mfsys-mountain mfsys-mountain-b"/>
  <div className="mfsys-lake"/>
  <div className="mfsys-network">
   {["AI","DATA","API","CORE BANKING","RISK","CLOUD","PAYMENTS"].map((x,i)=><span key={x} className={"mfsys-node mfsys-node-"+i}>{x}</span>)}
  </div>
  <div className="mfsys-chart"><i/><i/><i/><i/><i/></div>
 </div>;
}

function ProductVisual(){
 return <div className="mfsys-visual mfsys-visual--product" aria-hidden="true">
  <div className="mfsys-product-orbit"/>
  <div className="mfsys-dashboard">
   <div className="mfsys-dashboard-top"><b>CiiHive</b><span>Digital Core</span><i/></div>
   <div className="mfsys-dashboard-metrics"><span/><span/><span/></div>
   <div className="mfsys-dashboard-chart"><i/><i/><i/><i/><i/><i/></div>
   <div className="mfsys-dashboard-grid"><span/><span/><span/><span/></div>
  </div>
  <div className="mfsys-chip"><b>API</b><small>OPEN</small></div>
  <div className="mfsys-chip mfsys-chip--orange"><b>AI</b><small>RISK</small></div>
 </div>;
}

function IndustryVisual(){
 return <div className="mfsys-visual mfsys-visual--industry" aria-hidden="true">
  <div className="mfsys-industry-map"/>
  {[
   ["01","MICROFINANCE","mfsys-industry-card--blue"],
   ["02","ISLAMIC FINANCE","mfsys-industry-card--orange"],
   ["03","AGRI FINANCE","mfsys-industry-card--green"],
   ["04","CLIMATE & CARBON","mfsys-industry-card--teal"],
   ["05","LOGISTICS","mfsys-industry-card--blue"],
   ["06","GOVERNMENT","mfsys-industry-card--navy"]
  ].map(([n,t,c])=><div key={n} className={"mfsys-industry-card "+c}><small>{n}</small><strong>{t}</strong><i/></div>)}
 </div>;
}

function AiVisual(){
 return <div className="mfsys-visual mfsys-visual--ai" aria-hidden="true">
  <div className="mfsys-ai-core">AI</div>
  {["DATA","CREDIT","AUTOMATION","INSIGHTS","OPEN FINANCE","RISK"].map((x,i)=><span key={x} className={"mfsys-ai-node mfsys-ai-node-"+i}>{x}</span>)}
  <div className="mfsys-ai-lines"/>
 </div>;
}

function GroupLink({name,kind,onNavigate}:{name:string;kind:"solution"|"product";onNavigate:()=>void}){
 const item=kind==="solution"?solutions.find(x=>x[0]===name):products.find(x=>x[0]===name);
 if(!item)return null;
 return <Link className="mfsys-v2-item" href={item[2]} role="menuitem" onClick={onNavigate}>
  <span className="mfsys-v2-icon" aria-hidden="true">↗</span>
  <span><strong>{item[0]}</strong><small>{item[1]}</small></span>
  <em aria-hidden="true">›</em>
 </Link>;
}

export default function SiteHeader(){
 const pathname=usePathname();
 const [open,setOpen]=useState<MenuName|null>(null);
 const [mobileOpen,setMobileOpen]=useState(false);
 const [mobileSection,setMobileSection]=useState<MenuName|null>(null);
 const navRef=useRef<HTMLElement>(null);

 useEffect(()=>{setOpen(null);setMobileOpen(false);setMobileSection(null)},[pathname]);

 useEffect(()=>{
  const close=(e:PointerEvent)=>{if(navRef.current&&!navRef.current.contains(e.target as Node))setOpen(null)};
  const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(null);setMobileSection(null);setMobileOpen(false)}};
  document.addEventListener("pointerdown",close);
  document.addEventListener("keydown",onKey);
  return()=>{document.removeEventListener("pointerdown",close);document.removeEventListener("keydown",onKey)};
 },[]);

 const closeAll=()=>{setOpen(null);setMobileOpen(false);setMobileSection(null)};
 const toggle=(name:MenuName)=>setOpen(open===name?null:name);
 const toggleMobile=(name:MenuName)=>setMobileSection(v=>v===name?null:name);

 return <header className="site-header">
  <div className="utility-bar"><div className="container utility-inner">
   <div className="utility-left"><span>◉</span><span>Global Presence</span><i/><span>12+ Countries</span><i/><span>30+ Financial Institutions</span></div>
   <div className="utility-right"><Link href="/careers" onClick={closeAll}>Careers</Link><Link href="/insights" onClick={closeAll}>News</Link><Link href="/insights" onClick={closeAll}>Resources</Link><Link href="/contact" onClick={closeAll}>Contact</Link><span aria-hidden="true">⌕</span></div>
  </div></div>

  <div className="container nav-wrap">
   <Link className="brand" href="/" onClick={closeAll} aria-label="MFSYS home"><BrandLogo className="brand-logo" alt="MFSYS Technologies Limited"/></Link>

   <button className="menu-toggle" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={()=>setMobileOpen(v=>!v)}>{mobileOpen?"Close":"Menu"}</button>

   <nav ref={navRef} className="primary-nav mfsys-v2-nav" aria-label="Primary">
    <div className="nav-menu">
     <button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="solutions"} onClick={()=>toggle("solutions")}>Solutions <span aria-hidden="true">⌄</span></button>
     {open==="solutions"&&<div className="mfsys-v2-mega mfsys-v2-mega--solutions" role="menu">
      <div className="mfsys-v2-visual-panel">
       <TechLandscape/>
       <div className="mfsys-v2-visual-copy"><span>MFSYS SOLUTIONS</span><strong>Technology built for intelligent financial ecosystems.</strong><p>Digital solutions for financial inclusion, sustainable growth and more resilient communities.</p><Link href="/solutions" onClick={closeAll}>Explore All Solutions <b>→</b></Link></div>
       <div className="mfsys-v2-proof"><span><b>12+</b> Countries</span><span><b>30+</b> Financial Institutions</span><span><b>100+</b> Professionals</span></div>
      </div>
      <div className="mfsys-v2-columns">
       {solutionGroups.map(g=><div className="mfsys-v2-group" key={g.title}><span className="mfsys-v2-group-title">{g.title}</span>{g.items.map(name=><GroupLink key={name} name={name} kind="solution" onNavigate={closeAll}/>)}</div>)}
      </div>
      <div className="mfsys-v2-impact"><div><span>OUR IMPACT</span><strong>Building more inclusive, resilient and sustainable economies.</strong><Link href="/about" onClick={closeAll}>Our Impact →</Link></div><div className="mfsys-impact-globe" aria-hidden="true"/></div>
     </div>}
    </div>

    <div className="nav-menu">
     <button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="products"} onClick={()=>toggle("products")}>Products <span aria-hidden="true">⌄</span></button>
     {open==="products"&&<div className="mfsys-v2-mega mfsys-v2-mega--products" role="menu">
      <div className="mfsys-v2-visual-panel">
       <ProductVisual/>
       <div className="mfsys-v2-visual-copy"><span>OUR PRODUCTS</span><strong>Purpose-built platforms for real-world impact.</strong><p>Scalable, cloud-native products trusted across financial, climate and connected enterprise ecosystems.</p><Link href="/products" onClick={closeAll}>Explore All Products <b>→</b></Link></div>
      </div>
      <div className="mfsys-v2-columns mfsys-v2-product-columns">
       {productGroups.map(g=><div className="mfsys-v2-group" key={g.title}><span className="mfsys-v2-group-title">{g.title}</span>{g.items.map(name=><GroupLink key={name} name={name} kind="product" onNavigate={closeAll}/>)}</div>)}
      </div>
      <Link href="/products/ciihive" className="mfsys-v2-featured" onClick={closeAll}><span>FEATURED PLATFORM</span><strong>CiiHive</strong><b>Digital Core Banking Solution</b><p>A modern, scalable and intelligent core banking platform for financial inclusion.</p><em>Explore CiiHive →</em><div className="mfsys-mini-screen"><i/><i/><i/><i/></div></Link>
     </div>}
    </div>

    <div className="nav-menu">
     <button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="industries"} onClick={()=>toggle("industries")}>Industries <span aria-hidden="true">⌄</span></button>
     {open==="industries"&&<div className="mfsys-v2-mega mfsys-v2-mega--industries" role="menu">
      <div className="mfsys-v2-visual-panel">
       <IndustryVisual/>
       <div className="mfsys-v2-visual-copy"><span>OUR INDUSTRIES</span><strong>Digital solutions for a more inclusive and sustainable world.</strong><p>Enabling financial inclusion, climate resilience and smarter supply chains across key sectors.</p><Link href="/industries" onClick={closeAll}>Explore All Industries <b>→</b></Link></div>
      </div>
      <div className="mfsys-v2-industry-grid">{industries.map((name,i)=><Link className="mfsys-v2-industry-card" key={name} href="/industries" role="menuitem" onClick={closeAll}><span>0{i+1}</span><strong>{name}</strong><small>Digital solutions & technology</small><em>Explore →</em></Link>)}</div>
     </div>}
    </div>

    <div className="nav-menu">
     <button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="ai"} onClick={()=>toggle("ai")}>AI & Innovation <span aria-hidden="true">⌄</span></button>
     {open==="ai"&&<div className="mfsys-v2-mega mfsys-v2-mega--ai" role="menu">
      <div className="mfsys-v2-visual-panel">
       <AiVisual/>
       <div className="mfsys-v2-visual-copy"><span>AI & INNOVATION</span><strong>Smarter intelligence for greater impact.</strong><p>Harnessing AI, data and emerging technologies to build more inclusive, resilient and sustainable financial ecosystems.</p><Link href="/ai-innovation" onClick={closeAll}>Explore AI & Innovation <b>→</b></Link></div>
      </div>
      <div className="mfsys-v2-ai-list">{aiItems.map(([name,desc],i)=><Link key={name} href="/ai-innovation" className="mfsys-v2-ai-item" onClick={closeAll}><span>0{i+1}</span><strong>{name}</strong><small>{desc}</small><em>→</em></Link>)}</div>
      <div className="mfsys-v2-ai-callout"><span>OUR APPROACH</span><strong>Turning innovation into measurable impact.</strong><Link href="/ai-innovation" onClick={closeAll}>Explore →</Link></div>
     </div>}
    </div>

    <Link href="/insights" onClick={closeAll}>Insights</Link><Link href="/about" onClick={closeAll}>About MFSYS</Link><Link className="nav-cta" href="/contact" onClick={closeAll}>Get in Touch <span>→</span></Link>
   </nav>

   <div id="mobile-navigation" className={mobileOpen?"mfsys-mobile-nav is-open":"mfsys-mobile-nav"} aria-hidden={!mobileOpen}>
    {(["solutions","products","industries","ai"] as MenuName[]).map(section=>{
      const label=section==="ai"?"AI & Innovation":section[0].toUpperCase()+section.slice(1);
      return <div className="mfsys-mobile-section" key={section}><button type="button" onClick={()=>toggleMobile(section)} aria-expanded={mobileSection===section}>{label}<span>{mobileSection===section?"−":"+"}</span></button>{mobileSection===section&&<div className="mfsys-mobile-links">
       {section==="solutions"&&solutions.map(x=><Link key={x[0]} href={x[2]} onClick={closeAll}>{x[0]}</Link>)}
       {section==="products"&&products.map(x=><Link key={x[0]} href={x[2]} onClick={closeAll}>{x[0]}</Link>)}
       {section==="industries"&&industries.map(x=><Link key={x} href="/industries" onClick={closeAll}>{x}</Link>)}
       {section==="ai"&&aiItems.map(x=><Link key={x[0]} href="/ai-innovation" onClick={closeAll}>{x[0]}</Link>)}
      </div>}</div>
    })}
    <Link href="/insights" onClick={closeAll}>Insights</Link><Link href="/about" onClick={closeAll}>About MFSYS</Link><Link className="mfsys-mobile-cta" href="/contact" onClick={closeAll}>Get in Touch →</Link>
   </div>
  </div>
 </header>;
}
