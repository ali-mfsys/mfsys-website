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
 {name:"Microfinance & Banking",description:"Inclusive and digital financial services",image:"/menu-assets/graphics/microfinance-banking.jpg",icon:"/menu-assets/icons/icon-banking.svg"},
 {name:"Islamic Finance",description:"Shariah-compliant banking and finance",image:"/menu-assets/graphics/islamic-finance-menu.jpg",icon:"/menu-assets/icons/icon-islamic-finance.svg"},
 {name:"Agriculture & Rural Development",description:"Finance for farmers and value chains",image:"/menu-assets/graphics/agriculture-rural-development.jpg",icon:"/menu-assets/icons/icon-agriculture.svg"},
 {name:"Climate & Carbon",description:"Carbon markets and climate resilience",image:"/menu-assets/graphics/climate-carbon-menu.jpg",icon:"/menu-assets/icons/icon-climate.svg"},
 {name:"Logistics & Supply Chain",description:"Connected and efficient supply chains",image:"/menu-assets/graphics/logistics-supply-chain.jpg",icon:"/menu-assets/icons/icon-logistics.svg"},
 {name:"Government & Development",description:"Digital solutions for greater impact",image:"/menu-assets/graphics/government-development.jpg",icon:"/menu-assets/icons/icon-consulting.svg"}
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
       <div className="mfsys-industries-visual" aria-hidden="true">
        <img src="/menu-assets/graphics/impact-mountains-menu.jpg" alt="" />
        <div className="mfsys-industries-visual-wash"/>
        <div className="mfsys-industries-network"><i className="network-node n1">⌂</i><i className="network-node n2">◌</i><i className="network-node n3">▦</i><i className="network-node n4">⌁</i><i className="network-node n5">▣</i></div>
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
        <div className="mfsys-industry-image"><img src={item.image} alt="" /><span className="mfsys-industry-icon"><img src={item.icon} alt="" /></span></div>
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
