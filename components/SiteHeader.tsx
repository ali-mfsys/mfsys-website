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
const productMap=new Map(products.map(x=>[x[0],x]));

function GroupLink({name,kind,onNavigate}:{name:string;kind:"solution"|"product";onNavigate:()=>void}){
 const item=kind==="solution"?solutionMap.get(name):productMap.get(name);
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
     {open==="solutions"&&<div className="mfsys-mega mfsys-mega--solutions" role="menu">
      <div className="mfsys-mega__intro"><span className="mfsys-mega__eyebrow">MFSYS SOLUTIONS</span><strong>Technology built around real-world challenges.</strong><p>Intelligent platforms for financial services, digital economies and sustainable enterprises.</p><Link className="mfsys-mega__explore" href="/solutions" onClick={closeAll}>Explore all solutions <span>→</span></Link></div>
      <div className="mfsys-mega__body">{solutionGroups.map(g=><div className="mfsys-mega__group" key={g.title}><span className="mfsys-mega__group-title">{g.title}</span>{g.items.map(name=><GroupLink key={name} name={name} kind="solution" onNavigate={closeAll}/>)}</div>)}</div>
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
