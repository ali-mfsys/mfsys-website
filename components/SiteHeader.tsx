"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {solutions,products,industries} from "../lib/site-data";
import BrandLogo from "./BrandLogo";

type MenuName="solutions"|"products"|"industries"|"aiInnovation"|"insights";
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
];const aiInnovationItems=[
 {name:"AI-Based Credit Intelligence",description:"Explainable scoring and risk models",icon:"/menu-assets/icons/icon-ai-credit.svg"},
 {name:"Agentic AI Enterprise Automation",description:"AI agents and workflow automation",icon:"/menu-assets/icons/icon-agentic-ai.svg"},
 {name:"Data Analytics & Insights",description:"Advanced analytics for better decisions",icon:"/menu-assets/icons/icon-consulting.svg"},
 {name:"AI for Financial Inclusion",description:"Responsible and inclusive AI solutions",icon:"/menu-assets/icons/icon-mobile-lending.svg"},
 {name:"Emerging Technologies",description:"Blockchain, open finance and digital identity",icon:"/menu-assets/icons/icon-agentic-ai.svg"},
 {name:"Innovation Lab",description:"Co-creating solutions for real-world impact",icon:"/menu-assets/icons/icon-consulting.svg"}
];const insightItems=[
 {name:"Research",description:"Curated MFSYS thinking and knowledge",icon:"/menu-assets/icons/icon-consulting.svg"},
 {name:"Case Studies",description:"Real-world solutions, results and lessons",icon:"/menu-assets/icons/icon-banking.svg"},
 {name:"Articles",description:"Perspectives on technology, finance and impact",icon:"/menu-assets/icons/icon-consulting.svg"},
 {name:"Reports",description:"Research, analysis and industry insights",icon:"/menu-assets/icons/icon-ai-credit.svg"},
 {name:"News",description:"MFSYS updates, announcements and developments",icon:"/menu-assets/icons/icon-climate.svg"}
];


const solutionMap=new Map(solutions.map(x=>[x[0],x]));
const industryGroups=[
 {title:"Financial Services",items:["Microfinance & Banking","Islamic Finance"]},
 {title:"Agriculture & Climate",items:["Agriculture & Rural Development","Climate & Carbon"]},
 {title:"Infrastructure & Development",items:["Logistics & Supply Chain","Government & Development"]}
];
const industryDescriptions:Record<string,string>={
 "Microfinance & Banking":"Inclusive and digital financial services",
 "Islamic Finance":"Shariah-compliant banking and finance",
 "Agriculture & Rural Development":"Finance for farmers and value chains",
 "Climate & Carbon":"Carbon markets and climate resilience",
 "Logistics & Supply Chain":"Connected and efficient supply chains",
 "Government & Development":"Digital solutions for greater impact"
};

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

const industryCardData:Record<string,{image:string;icon:string}>={
 "Microfinance & Banking":{image:"/menu-assets/graphics/microfinance-banking-custom.svg",icon:"/menu-assets/icons/icon-banking.svg"},
 "Islamic Finance":{image:"/menu-assets/graphics/islamic-finance-custom.svg",icon:"/menu-assets/icons/icon-islamic-finance.svg"},
 "Agriculture & Rural Development":{image:"/menu-assets/graphics/agriculture-rural-development.jpg",icon:"/menu-assets/icons/icon-agriculture.svg"},
 "Climate & Carbon":{image:"/menu-assets/graphics/climate-carbon.jpg",icon:"/menu-assets/icons/icon-climate.svg"},
 "Logistics & Supply Chain":{image:"/menu-assets/graphics/logistics-supply-chain.jpg",icon:"/menu-assets/icons/icon-logistics.svg"},
 "Government & Development":{image:"/menu-assets/graphics/government-development.jpg",icon:"/menu-assets/icons/icon-consulting.svg"}
};

function IndustryCard({name,onNavigate}:{name:string;onNavigate:()=>void}){
 const data=industryCardData[name];
 if(!data)return null;
 return <Link href="/industries" className="industry-card" onClick={onNavigate}>
  <div className={`industry-card-image${data.image?"":" industry-card-image--no-image"}`}>
   {data.image&&<img src={data.image} alt="" />}
  </div>
  <div className="industry-card-body">
   <span className="industry-card-icon"><img src={data.icon} alt="" /></span>
   <div className="industry-card-copy">
    <strong>{name}</strong>
    <small>{industryDescriptions[name]}</small>
   </div>
   <span className="industry-card-arrow">›</span>
  </div>
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
      <section className="solutions-list">
       {solutionGroups.flatMap(group=>group.items).map(name=><GroupLink key={name} name={name} kind="solution" featured={name==="Digital Banking Solution"} onNavigate={closeAll}/>)}
      </section>
     </div>}
    </div>
    <div className="nav-menu"><button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="products"} onClick={()=>setOpen(open==="products"?null:"products")}>Products <span aria-hidden="true">⌄</span></button>
     {open==="products"&&<div className="mfsys-editorial-mega products-menu" role="menu">
      <section className="products-list">
       {productGroups.flatMap(group=>group.items).map(name=><GroupLink key={name} name={name} kind="product" featured={name==="CiiHive"} onNavigate={closeAll}/>)}
      </section>
     </div>}
    </div>
    <div className="nav-menu"><button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="aiInnovation"} onClick={()=>setOpen(open==="aiInnovation"?null:"aiInnovation")}>AI & Innovation <span aria-hidden="true">⌄</span></button>
     {open==="aiInnovation"&&<div className="mfsys-editorial-mega ai-innovation-menu" role="menu">
      <section className="ai-innovation-list">
       {aiInnovationItems.map(item=><Link key={item.name} href="/ai-innovation" className="mfsys-editorial-item" onClick={closeAll}>
        <span className="mfsys-editorial-icon"><img src={item.icon} alt="" /></span>
        <span className="mfsys-editorial-item-copy"><strong>{item.name}</strong><small>{item.description}</small></span>
        <span className="mfsys-editorial-arrow">›</span>
       </Link>)}
      </section>
     </div>}
    </div>
    <div className="nav-menu"><button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="insights"} onClick={()=>setOpen(open==="insights"?null:"insights")}>Insights <span aria-hidden="true">⌄</span></button>
     {open==="insights"&&<div className="mfsys-editorial-mega insights-menu" role="menu">
      <section className="insights-list">
       {insightItems.map(item=><Link key={item.name} href="/insights" className="mfsys-editorial-item" onClick={closeAll}>
        <span className="mfsys-editorial-icon"><img src={item.icon} alt="" /></span>
        <span className="mfsys-editorial-item-copy"><strong>{item.name}</strong><small>{item.description}</small></span>
        <span className="mfsys-editorial-arrow">›</span>
       </Link>)}
      </section>
     </div>}
    </div>
    <div className="nav-menu"><button className="nav-menu-trigger" aria-haspopup="true" aria-expanded={open==="industries"} onClick={()=>setOpen(open==="industries"?null:"industries")}>Industries <span aria-hidden="true">⌄</span></button>
     {open==="industries"&&<div className="mfsys-industries-mega" role="menu">
      <section className="industries-card-grid">
       {industryGroups.flatMap(group=>group.items).map(name=><IndustryCard key={name} name={name} onNavigate={closeAll}/>)}
      </section>
     </div>}
    </div><Link href="/about" onClick={closeAll}>About MFSYS</Link><Link className="nav-cta" href="/contact" onClick={closeAll}>Get in Touch <span>→</span></Link>
   </nav>
   <div id="mobile-navigation" className={mobileOpen?"mfsys-mobile-nav is-open":"mfsys-mobile-nav"} aria-hidden={!mobileOpen}>
    {(["solutions","products","industries"] as MenuName[]).map(section=>{const label=section[0].toUpperCase()+section.slice(1);return <div className="mfsys-mobile-section" key={section}><button type="button" onClick={()=>toggleMobileSection(section)} aria-expanded={mobileSection===section}>{label}<span>{mobileSection===section?"−":"+"}</span></button>{mobileSection===section&&<div className="mfsys-mobile-links">{section==="solutions"&&solutions.map(x=><Link key={x[0]} href={x[2]} onClick={closeAll}>{x[0]}</Link>)}{section==="products"&&productGroups.map(group=><div className="mfsys-mobile-product-group" key={group.title}><strong>{group.title}</strong>{group.items.map(name=>{const item=products.find(x=>x[0]===name);return item?<Link key={name} href={item[2]} onClick={closeAll}>{name}</Link>:null})}</div>)}{section==="industries"&&industryGroups.map(group=><div className="mfsys-mobile-product-group" key={group.title}><strong>{group.title}</strong>{group.items.map(name=><Link key={name} href="/industries" onClick={closeAll}>{name}</Link>)}</div>)}</div>}</div>})}
    <Link href="/ai-innovation" onClick={closeAll}>AI & Innovation</Link><Link href="/insights" onClick={closeAll}>Insights</Link><Link href="/about" onClick={closeAll}>About MFSYS</Link><Link className="mfsys-mobile-cta" href="/contact" onClick={closeAll}>Get in Touch →</Link>
   </div>
  </div>
 </header>;
}
