"use client";

import Link from "next/link";
import { useState } from "react";

type Module = { id:number; title:string; color:string; description:string; features:string[]; icon:string };

const modules: Module[] = [
{ id:1,title:"Customer & CRM",color:"blue",icon:"◉",description:"A complete customer view from onboarding through relationship management.",features:["Customer 360° View","Registration, Onboarding & KYC","Customer Relationship Management","Consent & Data Privacy","Customer Segmentation"]},
{ id:2,title:"Loan Origination & Credit Management",color:"orange",icon:"↗",description:"Digital lending workflows with intelligent credit assessment and controlled approvals.",features:["Digital Loan Origination (LoanLeaf)","AI-Based Credit Scoring","Credit Committee & Approval Workflow","Loan Management & Collections","Islamic Finance / Mudarabah Products"]},
{ id:3,title:"Deposits & Accounts",color:"teal",icon:"▣",description:"Flexible account and deposit products with lifecycle and profit management.",features:["Current & Savings Accounts","Term Deposits / Certificates","Flexible Deposit Products","Account Life-Cycle Management","Interest / Profit Calculation"]},
{ id:4,title:"Payments & Transactions",color:"violet",icon:"▤",description:"Connected transaction processing across domestic and integrated payment channels.",features:["Payment Hub (Domestic)","Real-Time Transaction Processing","Internal Fund Transfers","Card / ATM Integration","Clearing & Settlement"]},
{ id:5,title:"General Ledger & Accounting",color:"green",icon:"▤",description:"An integrated financial backbone for accounting, branches, currencies and sub-ledgers.",features:["Fully Integrated General Ledger","Auto Accounting & Posting","Multi-Currency Support","Multi-Branch & Multi-Entity","Financial Statements (IFRS / Local)"]},
{ id:6,title:"Reporting & Business Intelligence",color:"gold",icon:"▥",description:"Turn operational data into regulatory, management and portfolio intelligence.",features:["360° Reporting (Financial & Operational)","Regulatory Reports","MIS & Dashboards","Data Analytics & Insights","Ad-hoc Report Builder"]},
{ id:7,title:"Risk, Compliance & Security",color:"red",icon:"◇",description:"Embedded controls for impairment, AML, fraud, audit and access governance.",features:["IFRS 9 – Impairment & ECL","AML / CFT","Fraud Detection & Monitoring","Limits & Rules Management","Audit Trail & Regulatory Reporting"]},
{ id:8,title:"Operations & Workflow",color:"purple",icon:"⚙",description:"Orchestrate products, rules, documents and operational workflows.",features:["Workflow & BPM","Product Management","Form / Rules Designer","Auto Accounting Matrix","Instrument & Document Management"]}
];

const channels=["Mobile Banking","Internet Banking","Branch / Teller","Agent Banking","Corporate Banking"];
const institutions=["Microfinance Banks","Fintechs","NBFCs","SACOs","Cooperatives","Credit Unions"];
const foundations=["Cloud-Native Microservices","API-First & Open APIs","Event-Driven Integration","High Availability & Scalability","Cybersecurity & Data Encryption","IAM / RBAC","Observability & Monitoring","Backup & Disaster Recovery"];
const orbitNodes=[
 {id:1,name:"Customers",detail:"CRM & KYC",glyph:"◉"},
 {id:2,name:"Lending",detail:"Origination & servicing",glyph:"↗"},
 {id:3,name:"Accounts",detail:"Savings & deposits",glyph:"▣"},
 {id:4,name:"Payments",detail:"Transfers & channels",glyph:"⇄"},
 {id:5,name:"Ledger",detail:"Automated accounting",glyph:"▤"},
 {id:6,name:"Intelligence",detail:"Reporting & insights",glyph:"▥"},
];
const bankingJourney=[
 {num:"01",name:"Connect",tag:"Customer channels",detail:"Mobile, web, branches and agent banking"},
 {num:"02",name:"Understand",tag:"Customer & KYC",detail:"A unified customer profile and onboarding"},
 {num:"03",name:"Operate",tag:"Products & decisions",detail:"Loans, deposits and banking products"},
 {num:"04",name:"Transact",tag:"Payments & ledger",detail:"Controlled transactions and accounting"},
 {num:"05",name:"Learn",tag:"Insight & oversight",detail:"Reports, risk controls and analytics"},
];


export default function DigitalBankingExperience(){
 const [active,setActive]=useState(2);
 const selected=modules.find(m=>m.id===active) ?? modules[1];
 return <div className="dbx">
  <section className="dbx-hero"><div className="dbx-hero-inner container">
   <div className="dbx-breadcrumb">Home <span>›</span> Solutions <span>›</span> Digital Banking Solution</div>
   <div className="dbx-hero-grid"><div className="dbx-hero-copy">
    <div className="eyebrow">DIGITAL BANKING PLATFORM</div><h1>Digital Banking <span>Solution</span></h1>
    <p className="dbx-lead">A complete, integrated and scalable banking system for modern financial institutions.</p>
    <p className="dbx-audience">Microfinance Banks <i>•</i> Fintechs <i>•</i> NBFCs <i>•</i> SACOs <i>•</i> Cooperatives <i>•</i> Credit Unions</p>
    <div className="dbx-traits">{["Cloud-Native","Secure","API-Driven","Modular","Scalable"].map(x=><span key={x}>{x}</span>)}</div>
    <div className="dbx-actions"><Link href="/contact" className="dbx-btn dbx-btn-primary">Request a Demo →</Link><a href="#architecture" className="dbx-btn dbx-btn-ghost">Explore the Platform ↓</a></div>
   </div>
   <div className="dbx-hero-visual" aria-hidden="true">
    <div className="dbx-device-phone"><div className="dbx-screen"><small>Good Morning</small><strong>Available Balance</strong><b>$125,430</b><div className="dbx-mini-row"><span>Send</span><span>Pay</span><span>Top Up</span></div></div></div>
    <div className="dbx-device-laptop"><div className="dbx-laptop-top"><strong>Glaxity</strong><span>Search...</span><i>◉</i></div><div className="dbx-dashboard"><aside>Dashboard<br/>Customers<br/>Loans<br/>Deposits<br/>Payments<br/>Accounting<br/>Reports</aside><div><div className="dbx-metrics"><b>12,548<small>Total Customers</small></b><b>8,732<small>Active Loans</small></b><b>18.4M<small>Total Deposits</small></b></div><div className="dbx-chart">Portfolio Growth <div className="dbx-chart-line"/></div></div></div></div>
   </div></div>
  </div></section>

  <section id="architecture" className="dbx-architecture container section">
   <div className="dbx-section-intro">
    <div><div className="eyebrow">THE GLAXITY CORE BANKING ECOSYSTEM</div><h2>One connected core.<br/><span>Every banking capability in focus.</span></h2></div>
    <p>Explore how the modules fit together. Choose a capability in the map or the cards below to see its role in the platform—without losing sight of the whole banking operation.</p>
   </div>
   <div className="dbx-v2-board">
    <div className="dbx-v2-board-head"><span>PLATFORM BLUEPRINT / 01</span><span>SELECT A CAPABILITY TO EXPLORE <span aria-hidden="true">↘</span></span></div>
    <div className="dbx-v2-network" aria-label="Glaxity digital core connected to six banking capabilities">
     <div className="dbx-v2-node-column">{orbitNodes.slice(0,3).map(n=><button type="button" key={n.id} className="dbx-v2-node" aria-pressed={active===n.id} onClick={()=>setActive(n.id)}><span className="dbx-v2-node-icon" aria-hidden="true">{n.glyph}</span><span><strong>{n.name}</strong><small>{n.detail}</small></span><span className="dbx-v2-node-arrow" aria-hidden="true">→</span></button>)}</div>
     <div className="dbx-v2-hub-area">
      <div className="dbx-v2-orbit dbx-v2-orbit-one" aria-hidden="true"/><div className="dbx-v2-orbit dbx-v2-orbit-two" aria-hidden="true"/>
      <div className="dbx-v2-hub" role="img" aria-label="Glaxity, the connected digital banking core and single banking system of record"><small>THE CONNECTED CORE</small><strong>Glaxity</strong><span>Digital Banking Core</span><em>Single System of Record</em></div>
      <div className="dbx-v2-hub-caption">API-FIRST · MODULAR · CLOUD-NATIVE</div>
     </div>
     <div className="dbx-v2-node-column">{orbitNodes.slice(3).map(n=><button type="button" key={n.id} className="dbx-v2-node" aria-pressed={active===n.id} onClick={()=>setActive(n.id)}><span className="dbx-v2-node-icon" aria-hidden="true">{n.glyph}</span><span><strong>{n.name}</strong><small>{n.detail}</small></span><span className="dbx-v2-node-arrow" aria-hidden="true">↗</span></button>)}</div>
    </div>
    <div className="dbx-v2-board-footer"><span><b>01</b> Digital channels</span><span aria-hidden="true">→</span><span><b>02</b> Connected banking core</span><span aria-hidden="true">→</span><span><b>03</b> Partners & insight</span></div>
   </div>
   <div className="dbx-v2-capabilities-head"><div><span className="eyebrow">EIGHT CONNECTED CAPABILITIES</span><h3>Explore the building blocks.</h3></div><p>Tap any card to explore its features in the spotlight below.</p></div>
   <div className="dbx-v2-module-grid">{modules.map(m=><button key={m.id} type="button" aria-pressed={active===m.id} className={"dbx-v2-module dbx-"+m.color+(active===m.id?" is-active":"")} onClick={()=>setActive(m.id)}><span className="dbx-v2-module-top"><span className="dbx-v2-module-icon" aria-hidden="true">{m.icon}</span><span>{String(m.id).padStart(2,"0")} / 08</span></span><strong>{m.title}</strong><p>{m.description}</p><span className="dbx-v2-module-cta">Explore capability <span aria-hidden="true">↗</span></span></button>)}</div>
   <div key={selected.id} className={"dbx-v2-selected dbx-selected-"+selected.color} aria-live="polite">
    <div><span className="dbx-v2-selected-label">SELECTED CAPABILITY / {String(selected.id).padStart(2,"0")} OF 08</span><h3>{selected.title}</h3><p>{selected.description}</p></div>
    <ul>{selected.features.map(f=><li key={f}>{f}</li>)}</ul>
   </div>
   <div className="dbx-v2-context">
    <div><span>CONNECTED CHANNELS</span><div>{channels.map(c=><span key={c}>{c}</span>)}</div></div>
    <div><span>DESIGNED FOR</span><div>{institutions.map(inst=><span key={inst}>{inst}</span>)}</div></div>
   </div>
   <p className="dbx-v2-diagram-note">Conceptual product architecture. Modules, local integrations, currency support and AI capabilities are scoped to each implementation.</p>
  </section>
  <section className="dbx-v2-journey-band" aria-labelledby="dbx-journey-title">
   <div className="container">
    <div className="dbx-v2-journey-head"><span className="eyebrow">HOW DIGITAL BANKING CONNECTS</span><h2 id="dbx-journey-title">From first interaction to <span>trusted financial insight.</span></h2><p>Follow one end-to-end journey across the platform. Each stage connects through controlled services and an auditable banking record.</p></div>
    <div className="dbx-v2-journey">{bankingJourney.map(step=><article key={step.num}><span className="dbx-v2-journey-num">{step.num} / 05</span><strong>{step.name}</strong><span className="dbx-v2-journey-tag">{step.tag}</span><p>{step.detail}</p></article>)}</div>
    <div className="dbx-v2-journey-base"><span>SECURE APIS & INTEGRATION</span><span>ROLE-BASED CONTROL & AUDIT TRAIL</span><span>UNIFIED REPORTING</span></div>
   </div>
  </section>
  <section className="dbx-v2-workspace" aria-labelledby="dbx-workspace-title">
   <div className="container">
    <div className="dbx-v2-workspace-intro"><div><span className="eyebrow">A CLEARER OPERATIONS VIEW</span><h2 id="dbx-workspace-title">Clarity across the banking day.</h2></div><p>From customer relationships to lending approvals and financial reporting, the platform is designed around a single connected operational view.</p></div>
    <div className="dbx-v2-ui" role="img" aria-label="Illustrative operations dashboard with customer and lending work queues, reporting charts and ledger controls. Not a real customer deployment or production data.">
     <div className="dbx-v2-ui-top"><span><i/> <b>GLAXITY</b> / OPERATIONS</span><span>Illustrative interface concept</span></div>
     <div className="dbx-v2-ui-content"><div className="dbx-v2-ui-sidebar"><strong>Overview</strong><span>Customers</span><span>Lending</span><span>Accounts</span><span>Transactions</span><span>Reporting</span></div><div className="dbx-v2-ui-main">
      <div className="dbx-v2-ui-welcome"><div><small>OPERATIONS DASHBOARD</small><strong>Banking at a glance</strong></div><span>● &nbsp; Connected</span></div>
      <div className="dbx-v2-ui-metrics"><article><small>Customer onboarding</small><strong>In review</strong><span>KYB & KYC workflows</span></article><article><small>Credit approvals</small><strong>Controlled</strong><span>Maker-checker decisions</span></article><article><small>Ledger operations</small><strong>Balanced</strong><span>Automated postings</span></article></div>
      <div className="dbx-v2-ui-bottom"><div className="dbx-v2-ui-chart"><div><strong>Portfolio intelligence</strong><small>Illustrative activity</small></div><div className="dbx-v2-ui-bars">{[40,52,47,68,62,82,73,91,79,96].map((n,i)=><i key={i} style={{height:n+"%"}}/>)}</div></div><div className="dbx-v2-ui-checks"><strong>Control checkpoints</strong><div><span>Identity verification</span><b>Verified</b></div><div><span>Approval workflow</span><b>Reviewed</b></div><div><span>General ledger</span><b>Balanced</b></div><div><span>Management reports</span><b>Ready</b></div></div></div>
     </div></div>
    </div>
    <p className="dbx-v2-diagram-note">Illustrative design mockup only. It demonstrates intended workflow experiences, not real-time operational data or a released customer interface.</p>
   </div>
  </section>
  <section className="dbx-foundation"><div className="container"><div className="eyebrow">ENTERPRISE PLATFORM FOUNDATION</div><h2>Built for resilience, security and scale.</h2><div className="dbx-foundation-grid">{foundations.map((x,i)=><div key={x}><span>{["☁","API","⌘","▤","◇","♙","⌕","◉"][i]}</span><strong>{x}</strong></div>)}</div></div></section>

  <section className="dbx-impact container section"><div className="eyebrow">WHY GLAXITY</div><h2>Designed to connect the whole banking operation.</h2><div className="dbx-impact-grid">{[["One platform","Core banking, digital channels, lending, payments, accounting and reporting in one connected ecosystem."],["Intelligence at the core","AI-assisted credit, portfolio intelligence and data-driven decision support across workflows."],["Ready to integrate","API-first architecture connects fintechs, payment providers, channels and enterprise systems."],["Built for inclusive growth","A flexible foundation for microfinance, cooperatives, fintechs and other emerging-market institutions."]].map(([t,d])=><article key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section>

  <section className="container section" aria-labelledby="banking-platforms"><div className="eyebrow">ONE EVOLVING CORE BANKING PLATFORM</div><h2 id="banking-platforms">CiiHive experience. Glaxity innovation.</h2><p style={{maxWidth:850,lineHeight:1.8}}>Glaxity is the next generation of CiiHive, modernized with an upgraded technology stack, cloud-native multi-tenant architecture and AI-enabled capabilities. Historical CiiHive deployments remain part of MFSYS's implementation experience.</p><div style={{marginTop:28,padding:30,borderRadius:18,background:"linear-gradient(120deg,#e6f4ff,#eefaf5,#f5efff)",borderTop:"5px solid #2575c7"}}><div className="eyebrow">MFSYS FLAGSHIP CORE BANKING</div><h3 style={{fontSize:32}}>Glaxity — Banking evolved</h3><p>Explore modern core banking for microfinance institutions, cooperatives, credit unions, fintechs and financial services providers.</p><Link href="/products/glaxity" className="btn btn-primary">Explore Glaxity →</Link></div></section>

  <section style={{background:"#f7faf9",padding:"77px 0"}} aria-labelledby="digital-banking-software-guide"><div className="container"><div className="eyebrow">DIGITAL BANKING SOFTWARE / INSTITUTIONAL GUIDE</div><h2 id="digital-banking-software-guide" style={{fontSize:"clamp(29px,3.5vw,44px)",maxWidth:890,letterSpacing:"-.035em"}}>Digital banking, mobile channels and core banking: what connects them?</h2><p style={{maxWidth:920,lineHeight:1.85,color:"#4c687a"}}>Digital banking is the customer experience of using accounts, payments, savings and loans through secure electronic channels. The core banking system keeps the authoritative transaction record; a mobile or web app makes permitted services accessible; and a middleware layer coordinates integration with external payment, identity and partner systems.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:15,marginTop:27}}>{[
 ["Core banking software","Customer records, loan and deposit products, account balances, controlled posting and accounting.","/products/glaxity"],
 ["Mobile banking channels","Digital onboarding, account views, transfers, statements, alerts and customer support.","/solutions/mobile-banking"],
 ["Lending & loan origination","Application capture, underwriting, maker-checker review and handoff to core banking.","/products/loanleaf"],
 ["Payment & integration services","Banking interfaces, payment networks, partner APIs, status updates and reconciliation.","/products/mconnect"]
].map(([title,body,href])=><article key={title} style={{background:"#fff",border:"1px solid #dae5e7",padding:25,borderRadius:13}}><h3 style={{fontSize:19,margin:"0 0 11px"}}>{title}</h3><p style={{color:"#607889",fontSize:13,lineHeight:1.75}}>{body}</p><Link href={href} style={{fontWeight:850,color:"#197ba0",fontSize:12}}>Explore capability ↗</Link></article>)}</div><p style={{marginTop:25,fontSize:14,lineHeight:1.7}}>Evaluating a new CBS? <Link href="/insights/guides/core-banking-systems" style={{fontWeight:850,color:"#18749c"}}>Read the core banking systems buyer guide ↗</Link></p></div></section><section className="dbx-final-cta"><div className="container"><div><div className="eyebrow">MFSYS DIGITAL BANKING</div><h2>See how Glaxity can fit your institution.</h2><p>Let’s explore your current architecture, priorities and digital banking roadmap.</p></div><Link href="/contact" className="dbx-btn dbx-btn-primary">Request a Demo →</Link></div></section>
 </div>;
}
