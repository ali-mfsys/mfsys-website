"use client";
import {useState} from "react";
import Link from "next/link";

const challenges=[
 {id:"01",label:"Modernize Banking",title:"A connected digital core for the next generation of financial services.",text:"Replace fragmented systems with cloud-native banking infrastructure that connects core operations, digital channels, lending, risk and intelligence.",cap:["Digital Core Banking","Digital Onboarding","Mobile Banking","AI Credit Intelligence"],product:"CiiHive",href:"/products/ciihive"},
 {id:"02",label:"Lend Smarter",title:"Move from rules-based lending to intelligent decisions.",text:"Accelerate origination and improve portfolio quality with digital workflows, alternative data and explainable AI-assisted credit decisioning.",cap:["Loan Origination","AI Credit Scoring","Risk Analytics","Portfolio Intelligence"],product:"LoanLeaf + LoanIQ",href:"/products/loanleaf"},
 {id:"03",label:"Enable Islamic Finance",title:"Digitize Shariah-aligned financing without losing the human connection.",text:"Bring Mudarabah structures, workflows, controls and reporting into a modern digital operating environment.",cap:["Mudarabah Management","Digital Workflows","Profit Sharing","Compliance & Reporting"],product:"Smart Mudarabah",href:"/products/smart-mudarabah"},
 {id:"04",label:"Connect Value Chains",title:"Turn fragmented agricultural ecosystems into connected digital networks.",text:"Connect farmers, cooperatives, buyers and financial institutions with data-driven value-chain finance and digital operations.",cap:["Farmer & Coop Platforms","Value Chain Finance","Digital Identity","Data & Analytics"],product:"DigitalKisaan",href:"/products/digitalkisaan"},
 {id:"05",label:"Build Climate Intelligence",title:"Make climate data actionable, measurable and investable.",text:"Digitize project registration, MRV, carbon-credit computation and marketplace workflows for the emerging climate economy.",cap:["MRV","Carbon Credits","Climate Data","Digital Marketplace"],product:"XchangeCarbon",href:"/products/xchangecarbon"},
 {id:"06",label:"See Every Shipment",title:"Bring intelligence and control to freight operations.",text:"Connect brokers, carriers and drivers through real-time tracking, compliance, digital documents and operational visibility.",cap:["Load Booking","GPS Tracking","Driver KYC","POD & Compliance"],product:"CargoGuard",href:"/products/cargoguard"},
];

export default function SolutionsChallenge(){
 const [active,setActive]=useState(0);
 const item=challenges[active];
 return <section className="solutions-challenge">
  <div className="container">
   <div className="solutions-challenge-head">
    <div><div className="eyebrow">SOLUTIONS BY CHALLENGE</div><h2>Technology starts with the problem.<br/><span>Intelligence solves it.</span></h2></div>
    <p>MFSYS combines deep domain knowledge with modern engineering to solve complex challenges across financial services, climate, agriculture and connected enterprise operations.</p>
   </div>
   <div className="challenge-layout">
    <div className="challenge-nav" role="tablist" aria-label="MFSYS solutions by challenge">
     {challenges.map((x,i)=><button key={x.id} className={i===active?"active":""} onClick={()=>setActive(i)} role="tab" aria-selected={i===active}>
       <span>{x.id}</span><strong>{x.label}</strong><i>→</i>
     </button>)}
    </div>
    <article className="challenge-panel">
      <div className="challenge-panel-glow"/>
      <div className="challenge-number">{item.id}</div>
      <div className="challenge-kicker">MFSYS SOLUTION</div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <div className="capability-list">{item.cap.map((x,i)=><div key={x}><span>0{i+1}</span>{x}</div>)}</div>
      <div className="challenge-footer"><div><small>POWERED BY</small><strong>{item.product}</strong></div><Link className="btn btn-primary" href={item.href}>Explore solution →</Link></div>
    </article>
   </div>
  </div>
 </section>;
}