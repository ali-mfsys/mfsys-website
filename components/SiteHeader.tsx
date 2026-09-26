"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {solutions,products,industries} from "../lib/site-data";
import BrandLogo from "./BrandLogo";

type MenuName="solutions"|"products"|"industries";
const solutionGroups=[
 {title:"Financial Services",items:["Digital Banking Solution","Digital Loan Origination System (LOS)","Islamic Finance"]},
 {title:"Intelligence & Digital",items:["AI-Based Credit Intelligence","AI-Enabled Mobile Lending","Digital Wallet & Payment"]},
 {title:"Sector & Enterprise",items:["Agri Finance & Supply Chain","Climate & Carbon","Logistics & Supply Chain","Agentic AI Enterprise Automation","AI & Digital Transformation Consulting"]}
];
const productGroups=[
 {title:"Core Platform",items:["CiiHive","mConnect"]},
 {title:"Lending & Finance",items:["LoanLeaf","Smart Mudarabah","LoanIQ","DigitalKisaan"]},
 {title:"Climate & Logistics",items:["XchangeCarbon","CargoGuard","IFRS9 Impairment Solution"]}
];
const solutionMap=new Map(solutions.map(x=>[x[0],x]));
const productMap=new Map(products.map(x=>[x[0],x]));const iconMap: Record<string, string> = {
 "Digital Banking Solution": "/menu-assets/icons/icon-banking.svg",
 "Digital Loan Origination System (LOS)": "/menu-assets/icons/icon-los.svg",
 "Islamic Finance": "/menu-assets/icons/icon-islamic-finance.svg",
 "AI-Based Credit Intelligence": "/menu-assets/icons/icon-ai-credit.svg",
 "AI-Enabled Mobile Lending": "/menu-assets/icons/icon-mobile-lending.svg",
 "Digital Wallet & Payment": "/menu-assets/icons/icon-wallet.svg",
 "Agri Finance & Supply Chain": "/menu-assets/icons/icon-agriculture.svg",
 "Climate & Carbon": "/menu-assets/icons/icon-climate.svg",
 "Logistics & Supply Chain": "/menu-assets/icons/icon-logistics.svg",
 "Agentic AI Enterprise Automation": "/menu-assets/icons/icon-agentic-ai.svg",
 "AI & Digital Transformation Consulting": "/menu-assets/icons/icon-consulting.svg",
};

function GroupLink({name,kind,onNavigate,featured=false}:{name:string;kind:"solution"|"product";onNavigate:()=>void;featured?:boolean}){
 const item=kind==="solution"?solutions.find(x=>x[0]===name):products.find(x=>x[0]===name);
 if(!item)return null;
 return <Link href={item[2]} className={`mfsys-editorial-item${featured?" is-featured":""}`} onClick={onNavigate}>
  <span className="mfsys-editorial-icon"><img src={iconMap[name] || "/menu-assets/icons/icon-innovation.svg"} alt="" /></span>
  <span className="mfsys-editorial-item-copy"><strong>{item[0]}</strong><small>{item[1]}</small></span>
  <span className="mfsys-editorial-arrow">›</span>
 </Link>;
}

function SolutionsVisual(){return <div className="mfsys-editorial-art mfsys-art-solutions" aria-hidden="true"><img src="/menu-assets/graphics/solutions-hero.svg" alt="" /></div>}


function GroupLink({name,kind,onNavigate}:{name:string;kind:"solution"|"product";onNavigate:()=>void}){
 const item=kind==="solution"?solutions.find(x=>x[0]===name):products.find(x=>x[0]===name);
 if(!item)return null;
 return <Link className="mfsys-mega__item" href={item[2]} role="menuitem" onClick={onNavigate}><span className="mfsys-mega__item-mark" aria-hidden="true">↗</span><span><strong>{item[0]}</strong><small>{item[1]}</small></span></Link>;
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
  document.addEventListener("pointerdown",close);document.addEventListener("keydown",onKey);
  return()=>{document.removeEventListener("pointerdown",close);document.removeEventListener("keydown",onKey)};
 },[]);
 const closeAll=()=>{setOpen(null);setMobileOpen(false);setMobileSection(null)};
 const toggleMobileSection=(s:MenuName)=>setMobileSection(v=>v===s?null:s);
 return <header className="site-header">
  <div className="utility-bar"><div className="container utility-inner">
   <div className="utility-left"><span>◉</span><span>Global Presence</span><i/><span>12+ Countries</span><i/><span>30+ Financial Institutions</span></div>
   <div className="utility-right"><Link href="/careers" onClick={closeAll}>Careers</Link><Link href="/insights" onClick={closeAll}>News</Link><Link href="/insights" onClick={closeAll}>Resources</Link><Link href="/contact" onClick={closeAll}>Contact</Link><span aria-hidden="true">⌕</span></div>
  </div></div>
  <div className="container nav-wrap">
   <Link className="brand" href="/" onClick={closeAll} aria-label="MFSYS home"><BrandLogo className="brand-logo" alt="MFSYS Technologies Limited"/></Link>
   <button className="menu-toggle" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={()=>setMobileOpen(v=>!v)}>{mobileOpen?"Close":"Menu"}</button>
   <nav ref={navRef} className="primary-nav" aria-label="Primary">
    <div className="nav-menu"><button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="solutions"} onClick={()=>setOpen(open==="solutions"?null:"solutions")}>Solutions <span aria-hidden="true">⌄</span></button>
     {open==="solutions"&&<div id="solutions-menu" className="mfsys-editorial-mega solutions-menu" role="menu">
      <section className="editorial-intro">
       <div className="editorial-art-wrap"><SolutionsVisual/><div className="art-lake"/><div className="art-network"><i>DATA</i><i>AI</i><i>CORE BANKING</i><i>RISK</i><i>PAYMENTS</i><i>CLOUD</i><i>API</i></div><div className="art-scanline"/></div>
       <div className="editorial-copy"><span className="editorial-eyebrow">MFSYS SOLUTIONS —</span><h2>Technology built for intelligent financial ecosystems.</h2><p>Digital solutions for financial inclusion, sustainable growth and more resilient communities.</p><Link href="/solutions" onClick={closeAll}>Explore All Solutions <b>→</b></Link></div>
       <div className="editorial-proof"><span><b>12+</b>Countries</span><span><b>30+</b>Financial Institutions</span><span><b>100+</b>Professionals</span></div>
      </section>
      <section className="editorial-solution-columns">
       {solutionGroups.map((group,groupIndex)=><div className="editorial-group" key={group.title}><h3>{group.title}</h3>{group.items.map(name=><GroupLink key={name} name={name} kind="solution" featured={groupIndex===0&&name==="Digital Banking Solution"} onNavigate={closeAll}/>)}</div>)}
       <div className="editorial-impact"><img src="/menu-assets/graphics/impact-mountains.svg" alt="" /><div className="impact-copy"><span>OUR IMPACT</span><strong>Building more inclusive, resilient and sustainable economies.</strong><Link href="/about" onClick={closeAll}>Our Impact →</Link></div></div>
      </section>
     </div>}
    </div>
    <div className="nav-menu"><button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="products"} onClick={()=>setOpen(open==="products"?null:"products")}>Products <span aria-hidden="true">⌄</span></button>
     {open==="products"&&<div className="mfsys-mega mfsys-mega--products" role="menu">
      <div className="mfsys-mega__intro"><span className="mfsys-mega__eyebrow">MFSYS PRODUCTS</span><strong>Purpose-built platforms. Ready for scale.</strong><p>Products engineered around banking, lending, climate and connected enterprise ecosystems.</p><Link className="mfsys-mega__explore" href="/products" onClick={closeAll}>Explore all products <span>→</span></Link></div>
      <div className="mfsys-mega__body">{productGroups.map(g=><div className="mfsys-mega__group" key={g.title}><span className="mfsys-mega__group-title">{g.title}</span>{g.items.map(name=><GroupLink key={name} name={name} kind="product" onNavigate={closeAll}/>)}</div>)}</div>
      <Link href="/products/ciihive" className="mfsys-mega__featured" onClick={closeAll}><span className="mfsys-mega__featured-kicker">FEATURED PLATFORM</span><strong>CiiHive</strong><p>AI-native digital banking core for modern financial institutions.</p><span>Explore CiiHive →</span></Link>
     </div>}
    </div>
    <div className="nav-menu"><button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="industries"} onClick={()=>setOpen(open==="industries"?null:"industries")}>Industries <span aria-hidden="true">⌄</span></button>
     {open==="industries"&&<div className="mfsys-mega mfsys-mega--industries" role="menu">
      <div className="mfsys-mega__intro"><span className="mfsys-mega__eyebrow">INDUSTRY EXPERTISE</span><strong>Domain knowledge meets digital execution.</strong><p>Technology designed around the institutions, ecosystems and operating realities we serve.</p><Link className="mfsys-mega__explore" href="/industries" onClick={closeAll}>Explore industries <span>→</span></Link></div>
      <div className="mfsys-mega__industry-grid">{industries.map((name,i)=><Link className="mfsys-mega__industry" key={name} href="/industries" role="menuitem" onClick={closeAll}><span>0{i+1}</span><strong>{name}</strong><em>Explore sector →</em></Link>)}</div>
     </div>}
    </div>
    <Link href="/ai-innovation" onClick={closeAll}>AI & Innovation</Link><Link href="/insights" onClick={closeAll}>Insights</Link><Link href="/about" onClick={closeAll}>About MFSYS</Link><Link className="nav-cta" href="/contact" onClick={closeAll}>Get in Touch <span>→</span></Link>
   </nav>
   <div id="mobile-navigation" className={mobileOpen?"mfsys-mobile-nav is-open":"mfsys-mobile-nav"} aria-hidden={!mobileOpen}>
    {(["solutions","products","industries"] as MenuName[]).map(section=>{const label=section[0].toUpperCase()+section.slice(1);return <div className="mfsys-mobile-section" key={section}><button type="button" onClick={()=>toggleMobileSection(section)} aria-expanded={mobileSection===section}>{label}<span>{mobileSection===section?"−":"+"}</span></button>{mobileSection===section&&<div className="mfsys-mobile-links">{section==="solutions"&&solutions.map(x=><Link key={x[0]} href={x[2]} onClick={closeAll}>{x[0]}</Link>)}{section==="products"&&products.map(x=><Link key={x[0]} href={x[2]} onClick={closeAll}>{x[0]}</Link>)}{section==="industries"&&industries.map(x=><Link key={x} href="/industries" onClick={closeAll}>{x}</Link>)}</div>}</div>})}
    <Link href="/ai-innovation" onClick={closeAll}>AI & Innovation</Link><Link href="/insights" onClick={closeAll}>Insights</Link><Link href="/about" onClick={closeAll}>About MFSYS</Link><Link className="mfsys-mobile-cta" href="/contact" onClick={closeAll}>Get in Touch →</Link>
   </div>
  </div>
 </header>;
}
