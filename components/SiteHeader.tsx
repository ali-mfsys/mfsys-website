"use client";
import Link from "next/link";
const industryVisualThemes:Record<string,{a:string;b:string;c:string;kind:string}>={
 banking:{a:"#0B2D5B",b:"#1E66FF",c:"#7FD7FF",kind:"banking"},
 islamic:{a:"#073B3A",b:"#11B26B",c:"#C7F5DF",kind:"islamic"},
 agriculture:{a:"#244A2B",b:"#6FAF55",c:"#E6C66A",kind:"agriculture"},
 climate:{a:"#123B5A",b:"#11B26B",c:"#8ED9FF",kind:"climate"},
 logistics:{a:"#26364A",b:"#FF6A00",c:"#FFD18A",kind:"logistics"},
 government:{a:"#243B68",b:"#6E8FCB",c:"#E4ECFF",kind:"government"}
};
function IndustryVisual({kind,intro=false}:{kind:string;intro?:boolean}){
 const t=industryVisualThemes[kind]||industryVisualThemes.banking;
 return <svg className="mfsys-industry-svg" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><linearGradient id={kind+"g"} x1="0" y1="0" x2="1" y2="1"><stop stopColor={t.a}/><stop offset=".55" stopColor={t.b}/><stop offset="1" stopColor={t.c}/></linearGradient><linearGradient id={kind+"w"} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff" stopOpacity=".08"/><stop offset="1" stopColor="#031F32" stopOpacity=".62"/></linearGradient></defs>
  <rect width="400" height="220" fill={"url(#"+kind+"g)"}/><rect width="400" height="220" fill={"url(#"+kind+"w)"}/>
  <g opacity=".34" fill="none" stroke="#fff" strokeWidth="1">{Array.from({length:7},(_,i)=><path key={i} d={"M0 "+(35+i*28)+"H400"}/>)}{Array.from({length:9},(_,i)=><path key={"v"+i} d={"M"+(20+i*48)+" 0V220"}/>)}</g>
  {kind==="banking"&&<g fill="none" stroke="#fff" strokeWidth="4" opacity=".9"><path d="M65 150h270M82 150V105h236v45M68 105l132-58 132 58M108 150v-45M152 150v-45M200 150v-45M248 150v-45M292 150v-45"/></g>}
  {kind==="islamic"&&<g fill="none" stroke="#fff" strokeWidth="3" opacity=".9"><path d="M75 150h250M105 150v-45h190v45M105 105l95-48 95 48M170 105v-35M230 105V70"/><path d="M184 72a16 16 0 0 1 32 0v33h-32z"/></g>}
  {kind==="agriculture"&&<g fill="none" stroke="#fff" strokeWidth="3" opacity=".9"><path d="M0 174Q90 112 180 166T400 140"/><path d="M200 178V92M200 118q-42-28-62-4M200 132q45-28 72-2M200 98q-25-34-18-50M200 112q28-38 52-39"/></g>}
  {kind==="climate"&&<g fill="none" stroke="#fff" strokeWidth="4" opacity=".9"><path d="M72 166h256M105 166l25-82h20l25 82M130 84l10-27 10 27M205 166l18-105 18 105M223 61l10-26 10 26"/><circle cx="316" cy="48" r="23" fill="none"/><path d="M316 25v46M293 48h46"/></g>}
  {kind==="logistics"&&<g fill="none" stroke="#fff" strokeWidth="4" opacity=".9"><path d="M60 148h280M80 148V94h155v54M235 148v-35h52l28 35M108 148a22 22 0 1 0 44 0M267 148a22 22 0 1 0 44 0"/><path d="M92 94h88v54"/></g>}
  {kind==="government"&&<g fill="none" stroke="#fff" strokeWidth="4" opacity=".9"><path d="M70 160h260M88 160v-60h224v60M78 100l122-52 122 52M120 160v-60M160 160v-60M200 160v-60M240 160v-60M280 160v-60"/></g>}
  {intro&&<g fill="none" stroke="#fff" strokeWidth="2" opacity=".7"><circle cx="320" cy="55" r="7"/><circle cx="355" cy="105" r="7"/><circle cx="290" cy="120" r="7"/><path d="M320 55l35 50-65 15 30-65"/></g>}
 </svg>;
}

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
 {title:"Core Banking Platform",items:["CiiHive","Glaxity","mConnect"]},
 {title:"Digital Finance",items:["LoanLeaf","Include Mobile App","Zaroorat24"]},
 {title:"Islamic Finance",items:["ShariahOne","Smart Mudarba"]},
 {title:"AI & Credit Scoring",items:["LoanIQ"]},
 {title:"Compliance and Risk",items:["IFRS9"]},
 {title:"Digital Agriculture",items:["DigitalKisaan"]},
 {title:"Climate Solutions",items:["XchangeCarbon"]},
 {title:"Logistic Solutions",items:["CargoGuard"]}
];
const solutionMap=new Map(solutions.map(x=>[x[0],x]));
const industryMenuItems=[
 {name:"Microfinance & Banking",description:"Inclusive and digital financial services",icon:"/menu-assets/icons/icon-banking.svg",visual:"banking"},
 {name:"Islamic Finance",description:"Shariah-compliant banking and finance",icon:"/menu-assets/icons/icon-islamic-finance.svg",visual:"islamic"},
 {name:"Agriculture & Rural Development",description:"Finance for farmers and value chains",icon:"/menu-assets/icons/icon-agriculture.svg",visual:"agriculture"},
 {name:"Climate & Carbon",description:"Carbon markets and climate resilience",icon:"/menu-assets/icons/icon-climate.svg",visual:"climate"},
 {name:"Logistics & Supply Chain",description:"Connected and efficient supply chains",icon:"/menu-assets/icons/icon-logistics.svg",visual:"logistics"},
 {name:"Government & Development",description:"Digital solutions for greater impact",icon:"/menu-assets/icons/icon-consulting.svg",visual:"government"}
];

const productMap=new Map(products.map(x=>[x[0],x]));const productIconMap: Record<string, string> = {
 "CiiHive": "/menu-assets/icons/icon-banking.svg",
 "mConnect": "/menu-assets/icons/icon-consulting.svg",
 "Glaxity": "/menu-assets/icons/icon-banking.svg",
 "LoanLeaf": "/menu-assets/icons/icon-los.svg",
 "Smart Mudarba": "/menu-assets/icons/icon-islamic-finance.svg",
 "DigitalKisaan": "/menu-assets/icons/icon-agriculture.svg",
 "LoanIQ": "/menu-assets/icons/icon-ai-credit.svg",
 "Zaroorat24": "/menu-assets/icons/icon-wallet.svg",
 "Include Mobile App": "/menu-assets/icons/icon-mobile-lending.svg",
 "ShariahOne": "/menu-assets/icons/icon-islamic-finance.svg",
 "XchangeCarbon": "/menu-assets/icons/icon-climate.svg",
 "CargoGuard": "/menu-assets/icons/icon-logistics.svg",
 "IFRS9": "/menu-assets/icons/icon-consulting.svg",
};

const iconMap: Record<string, string> = {
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
  <span className="mfsys-editorial-icon"><img src={(kind==="product"?productIconMap[name]:iconMap[name]) || "/menu-assets/icons/icon-innovation.svg"} alt="" /></span>
  <span className="mfsys-editorial-item-copy"><strong>{item[0]}</strong><small>{item[1]}</small></span>
  <span className="mfsys-editorial-arrow">›</span>
 </Link>;
}

function SolutionsVisual(){return <div className="mfsys-editorial-art mfsys-art-solutions" aria-hidden="true"><img src="/menu-assets/graphics/solutions-tech-editorial.jpg" alt="" /></div>}



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
      </section>
      <div className="editorial-impact"><img src="/menu-assets/graphics/impact-tech-farmer.jpg" alt="" /><div className="impact-copy"><span>OUR IMPACT</span><strong>Building more inclusive, resilient and sustainable economies.</strong><Link href="/about" onClick={closeAll}>Our Impact →</Link></div></div>
     </div>}
    </div>
    <div className="nav-menu"><button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="products"} onClick={()=>setOpen(open==="products"?null:"products")}>Products <span aria-hidden="true">⌄</span></button>
     {open==="products"&&<div className="mfsys-editorial-mega products-menu" role="menu">
      <section className="editorial-intro product-editorial-intro">
       <div className="product-editorial-visual" aria-hidden="true">
        <img src="/menu-assets/graphics/products-editorial-banking.jpg" alt="" />
       </div>
       <div className="editorial-copy">
        <span className="editorial-eyebrow">OUR PRODUCTS —</span>
        <h2>Purpose-built products for real-world impact.</h2>
        <p>Scalable, cloud-native platforms trusted by 30+ financial institutions across 12 countries.</p>
        <Link href="/products" onClick={closeAll}>Explore All Products <b>→</b></Link>
       </div>
       <div className="editorial-proof"><span><b>13</b>Products</span><span><b>30+</b>Financial Institutions</span><span><b>12+</b>Countries</span></div>
      </section>
      <section className="editorial-solution-columns product-suite-columns">
       {productGroups.map(group=><div className="editorial-group" key={group.title}><h3>{group.title}</h3>{group.items.map(name=><GroupLink key={name} name={name} kind="product" featured={name==="CiiHive"} onNavigate={closeAll}/>)}</div>)}
      </section>
      <Link href="/products/ciihive" className="editorial-impact product-featured" onClick={closeAll}>
       <div className="product-featured-visual" aria-hidden="true">
        <img src="/menu-assets/graphics/ciihive-devices-menu.jpg" alt="" />
       </div>
       <div className="impact-copy product-featured-copy">
        <span>FEATURED PRODUCT</span>
        <strong>CiiHive</strong>
        <b>Digital Core Banking Solution</b>
        <p>A purpose-built core banking system for microfinance banks, SACOs, MFIs, NBFCs, fintechs and cooperatives.</p>
        <em>Learn More →</em>
       </div>
      </Link>
     </div>}
    </div>
    <div className="nav-menu"><button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="industries"} onClick={()=>setOpen(open==="industries"?null:"industries")}>Industries <span aria-hidden="true">⌄</span></button>
     {open==="industries"&&<div className="mfsys-industries-menu" role="menu">
      <section className="mfsys-industries-intro">
       <div className="mfsys-industries-visual"><IndustryVisual kind="banking" intro/><div className="mfsys-industries-network"><i className="network-node n1">⌂</i><i className="network-node n2">◌</i><i className="network-node n3">▦</i><i className="network-node n4">⌁</i><i className="network-node n5">▣</i></div>
       </div>
       <div className="mfsys-industries-intro-copy">
        <span className="mfsys-industries-eyebrow">OUR INDUSTRIES <b>—</b></span>
        <h2>Digital solutions<br/>for a more inclusive<br/>and sustainable world.</h2>
        <p>Enabling financial inclusion, climate resilience and smarter supply chains across key sectors.</p>
        <Link href="/industries" onClick={closeAll}>Explore All Industries <b>→</b></Link>
       </div>
      </section>
      <section className="mfsys-industries-grid" aria-label="Industries">
       {industryMenuItems.map((item,i)=><Link className="mfsys-industry-card" key={item.name} href="/industries" role="menuitem" onClick={closeAll}>
        <div className="mfsys-industry-image"><IndustryVisual kind={item.visual}/><span className="mfsys-industry-icon"><img src={item.icon} alt="" /></span></div>
        <div className="mfsys-industry-copy"><strong>{item.name}</strong><p>{item.description}</p><span className="mfsys-industry-arrow">›</span></div>
       </Link>)}
      </section>
     </div>}
    </div>
    <Link href="/ai-innovation" onClick={closeAll}>AI & Innovation</Link><Link href="/insights" onClick={closeAll}>Insights</Link><Link href="/about" onClick={closeAll}>About MFSYS</Link><Link className="nav-cta" href="/contact" onClick={closeAll}>Get in Touch <span>→</span></Link>
   </nav>
   <div id="mobile-navigation" className={mobileOpen?"mfsys-mobile-nav is-open":"mfsys-mobile-nav"} aria-hidden={!mobileOpen}>
    {(["solutions","products","industries"] as MenuName[]).map(section=>{const label=section[0].toUpperCase()+section.slice(1);return <div className="mfsys-mobile-section" key={section}><button type="button" onClick={()=>toggleMobileSection(section)} aria-expanded={mobileSection===section}>{label}<span>{mobileSection===section?"−":"+"}</span></button>{mobileSection===section&&<div className="mfsys-mobile-links">{section==="solutions"&&solutions.map(x=><Link key={x[0]} href={x[2]} onClick={closeAll}>{x[0]}</Link>)}{section==="products"&&productGroups.map(group=><div className="mfsys-mobile-product-group" key={group.title}><strong>{group.title}</strong>{group.items.map(name=>{const item=products.find(x=>x[0]===name);return item?<Link key={name} href={item[2]} onClick={closeAll}>{name}</Link>:null})}</div>)}{section==="industries"&&industryMenuItems.map(x=><Link key={x.name} href="/industries" onClick={closeAll}>{x.name}</Link>)}</div>}</div>})}
    <Link href="/ai-innovation" onClick={closeAll}>AI & Innovation</Link><Link href="/insights" onClick={closeAll}>Insights</Link><Link href="/about" onClick={closeAll}>About MFSYS</Link><Link className="mfsys-mobile-cta" href="/contact" onClick={closeAll}>Get in Touch →</Link>
   </div>
  </div>
 </header>;
}
