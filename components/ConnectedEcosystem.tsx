import Link from "next/link";
import type { ReactNode } from "react";
import s from "./ConnectedEcosystem.module.css";

type SolutionIconName = "bank" | "lending" | "payments" | "islamic" | "ai" | "agriculture" | "risk" | "integration";

function SolutionIcon({name}:{name:SolutionIconName}){
 const paths:Record<SolutionIconName,ReactNode>={
  bank:<><path d="m3 10 9-6 9 6M4 10h16M6 10v9m4-9v9m4-9v9m4-9v9M3 21h18"/></>,
  lending:<><path d="M3 16h5l3 2h5l5-5a2 2 0 0 0-3-2l-3 2h-5"/><path d="M3 12h5l3 2h4"/><circle cx="16" cy="6" r="3"/><path d="M16 4v4m-2-2h4"/></>,
  payments:<><path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/></>,
  islamic:<><path d="M12 3v18M5 7h14M7 7l-4 8h8L7 7Zm10 0-4 8h8l-4-8ZM8 21h8"/></>,
  ai:<><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5Zm0 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5ZM8 10l3 2-3 2m8-4-3 2 3 2"/></>,
  agriculture:<><path d="M12 21V10M12 15C6 15 4 11 4 6c5 0 8 2 8 9Zm0-3c0-6 3-8 8-8 0 5-2 8-8 8ZM6 21h12"/></>,
  risk:<><path d="M12 3 4 6v6c0 5 3 8 8 10 5-2 8-5 8-10V6l-8-3Z"/><path d="m8 12 3 3 5-6"/></>,
  integration:<><rect x="2" y="3" width="7" height="6" rx="1"/><rect x="15" y="3" width="7" height="6" rx="1"/><rect x="8" y="16" width="8" height="6" rx="1"/><path d="M5.5 9v4h13V9M12 13v3"/></>
 };
 return <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const solutions:{n:string;eyebrow:string;title:string;description:string;products:string;href:string;icon:SolutionIconName;wide?:boolean}[]=[
 {n:"02",eyebrow:"BETTER LENDING JOURNEYS",title:"Digital Lending",description:"Help lending teams move from application to approval with clearer decisions and less paperwork.",products:"LoanLeaf · LoanIQ",href:"/products/loanleaf",icon:"lending"},
 {n:"03",eyebrow:"EASIER EVERYDAY TRANSACTIONS",title:"Payments & Digital Channels",description:"Let people bank, pay and transfer through the channels that work for them.",products:"mConnect · Digital Wallet",href:"/products/mconnect",icon:"payments"},
 {n:"04",eyebrow:"FAITH-ALIGNED FINANCE",title:"Islamic Finance",description:"Manage Shariah-governed financing, investments and profit-sharing with care and transparency.",products:"ShariahOne · Smart Mudarabah",href:"/products/shariahone",icon:"islamic"},
 {n:"05",eyebrow:"CONFIDENT CREDIT DECISIONS",title:"AI & Credit Intelligence",description:"Give credit teams useful insights to assess risk and make responsible decisions.",products:"AI Credit Intelligence",href:"/products/loaniq",icon:"ai"},
 {n:"06",eyebrow:"STRONGER RURAL ECONOMIES",title:"Agriculture & Rural Finance",description:"Support farmers, cooperatives and the financial institutions that serve rural communities.",products:"DigitalKisaan",href:"/products/digitalkisaan",icon:"agriculture"},
 {n:"07",eyebrow:"VISIBILITY & ACCOUNTABILITY",title:"Risk, Compliance & Reporting",description:"Turn complex risk and financial information into reporting teams can work with.",products:"IFRS 9 · Analytics",href:"/products/ifrs9",icon:"risk"},
 {n:"08",eyebrow:"SYSTEMS THAT WORK TOGETHER",title:"Integration & Automation",description:"Bring your core, channels and partner services into one smoother workflow.",products:"mConnect · Agentic AI",href:"/products/mconnect",icon:"integration",wide:true}
];

export default function ConnectedEcosystem(){
 return <section className={s.section} id="connected-ecosystem" aria-labelledby="connected-heading">
  <div className={s.wrap}>
   <div className={s.topline}>
    <span className={s.kicker}>THE MFSYS CONNECTED ECOSYSTEM</span>
    <span className={s.topNote}>TECHNOLOGY THAT SERVES PEOPLE</span>
   </div>
   <div className={s.intro}>
    <h2 id="connected-heading">One Connected Ecosystem.<br/><em>Powering Digital Finance.</em></h2>
    <p>Behind every account is a person, a business or a community. We connect the banking tools and everyday workflows that help financial institutions serve them better.</p>
   </div>

   <Link href="/solutions/digital-banking" className={s.feature}>
    <div className={s.featureBody}>
     <div className={s.featureMeta}><span className={s.featureNumber}>01</span><span>FEATURED SOLUTION / CORE BANKING</span></div>
     <h3>One banking core.<br/>More room to serve.</h3>
     <p>CiiHive and Glaxity bring customers, accounts, lending, deposits and daily operations together—giving banking teams a clearer view of the people they serve.</p>
     <div className={s.productTags}><span>CiiHive</span><span>Glaxity</span></div>
     <span className={s.featureAction}>Explore Core Banking <span aria-hidden="true">→</span></span>
    </div>
    <div className={s.featurePhoto}>
     <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=82" alt="Colleagues collaborating around a table in a bright office" loading="lazy" decoding="async"/>
     <span className={s.photoCorner}>BUILT FOR PEOPLE AT WORK</span>
    </div>
   </Link>

   <div className={s.sectionHead}>
    <div><span className={s.kicker}>BEYOND THE CORE</span><h3>More ways to move forward.</h3></div>
    <p>Explore the connected tools that support your teams, simplify everyday work and improve the customer experience.</p>
   </div>

   <div className={s.cards}>
    {solutions.map(item=><Link key={item.n} href={item.href} data-tone={item.icon} className={item.wide?s.card+" "+s.cardWide:s.card}>
     <div className={s.cardMain}>
      <div className={s.cardTop}><span className={s.cardIcon}><SolutionIcon name={item.icon}/></span><span className={s.cardNumber}>{item.n} / 08</span></div>
      <span className={s.cardEyebrow}>{item.eyebrow}</span>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      <span className={s.cardFoot}><strong>{item.products}</strong><span aria-hidden="true">↗</span></span>
     </div>
     {item.wide&&<div className={s.simpleFlow} aria-hidden="true"><span>Core banking</span><i>→</i><span>mConnect</span><i>→</i><span>Connected channels</span></div>}
    </Link>)}
   </div>

   <div className={s.peopleBand}>
    <div className={s.peoplePhoto}>
     <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1250&q=82" alt="A customer using a phone to pay at a small business counter" loading="lazy" decoding="async"/>
    </div>
    <div className={s.peopleCopy}>
     <span className={s.kicker}>WHY CONNECTION MATTERS</span>
     <h3>Behind every transaction is a person.</h3>
     <p>A teller helping a customer. A borrower applying for credit. A small business receiving a payment. The best technology makes these everyday moments simpler, clearer and more dependable.</p>
     <div className={s.actions}><Link href="/contact">Talk to our team <span aria-hidden="true">↗</span></Link><Link href="/solutions">See all solutions <span aria-hidden="true">→</span></Link></div>
     <small>Photography is illustrative and does not depict a specific MFSYS client engagement.</small>
    </div>
   </div>
  </div>
 </section>;
}
