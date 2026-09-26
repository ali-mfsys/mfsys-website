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
    <div className="dbx-device-laptop"><div className="dbx-laptop-top"><strong>CiiHive</strong><span>Search...</span><i>◉</i></div><div className="dbx-dashboard"><aside>Dashboard<br/>Customers<br/>Loans<br/>Deposits<br/>Payments<br/>Accounting<br/>Reports</aside><div><div className="dbx-metrics"><b>12,548<small>Total Customers</small></b><b>8,732<small>Active Loans</small></b><b>18.4M<small>Total Deposits</small></b></div><div className="dbx-chart">Portfolio Growth <div className="dbx-chart-line"/></div></div></div></div>
   </div></div>
  </div></section>

  <section id="architecture" className="dbx-architecture container section">
   <div className="dbx-section-intro"><div><div className="eyebrow">THE CIIHIVE DIGITAL BANKING CORE</div><h2>One intelligence core.<br/><span>Every banking capability connected.</span></h2></div><p>Explore the platform by selecting a capability. Each module connects to the same digital core, data layer and enterprise foundation.</p></div>
   <div className="dbx-platform">
    <aside className="dbx-side dbx-side-left"><div className="dbx-side-title">Channels & Customers</div>{channels.map((x,i)=><button key={x} onClick={()=>setActive((i%8)+1)}><span>{["▯","▱","▥","♙","▦"][i]}</span>{x}</button>)}<div className="dbx-side-card"><strong>Languages</strong><p>Multilingual UI<br/><small>English, Urdu, Arabic and more</small></p></div></aside>
    <div className="dbx-core-layout">
     <div key={selected.id} className={"dbx-selected dbx-selected-"+selected.color} aria-live="polite">
      <div className="dbx-selected-copy"><div className="dbx-selected-kicker"><span className={"dbx-dot dbx-dot-"+selected.color}></span><small>SELECTED CAPABILITY</small><b>{String(selected.id).padStart(2,"0")} / 08</b></div><h3>{selected.title}</h3><p>{selected.description}</p></div>
      <ul>{selected.features.map(f=><li key={f}>{f}</li>)}</ul>
     </div>
     <div className="dbx-module-grid">{modules.map(m=><button key={m.id} className={"dbx-module dbx-"+m.color+(active===m.id?" is-active":"")} onClick={()=>setActive(m.id)}><span className="dbx-module-num">{String(m.id).padStart(2,"0")}</span><span className="dbx-module-icon">{m.icon}</span><strong>{m.title}</strong><p>{m.description}</p><div className="dbx-feature-preview">{m.features.slice(0,3).map(f=><span key={f}>• {f}</span>)}</div></button>)}</div>
     <div className="dbx-core"><div className="dbx-core-ring"><span>Customers</span><span>Accounts</span><span>Products</span><span>Transactions</span><span>Ledger</span><span>Data</span></div><div className="dbx-core-center"><small>MFSYS</small><b>CiiHive</b><strong>Digital Banking Core</strong><em>Single Banking System of Record</em></div></div>
    </div>
    <aside className="dbx-side dbx-side-right"><div className="dbx-side-title">Supported Institutions</div>{institutions.map((x,i)=><button key={x} onClick={()=>setActive(((i+3)%8)+1)}><span>{["◒","◈","▥","♙","⌘","◫"][i]}</span>{x}</button>)}<div className="dbx-side-card"><strong>Multi-Currency</strong><p>USD · EUR · GBP · PKR</p></div></aside>
   </div>
  </section>

  <section className="dbx-foundation"><div className="container"><div className="eyebrow">ENTERPRISE PLATFORM FOUNDATION</div><h2>Built for resilience, security and scale.</h2><div className="dbx-foundation-grid">{foundations.map((x,i)=><div key={x}><span>{["☁","API","⌘","▤","◇","♙","⌕","◉"][i]}</span><strong>{x}</strong></div>)}</div></div></section>

  <section className="dbx-impact container section"><div className="eyebrow">WHY CIIHIVE</div><h2>Designed to connect the whole banking operation.</h2><div className="dbx-impact-grid">{[["One platform","Core banking, digital channels, lending, payments, accounting and reporting in one connected ecosystem."],["Intelligence at the core","AI-assisted credit, portfolio intelligence and data-driven decision support across workflows."],["Ready to integrate","API-first architecture connects fintechs, payment providers, channels and enterprise systems."],["Built for inclusive growth","A flexible foundation for microfinance, cooperatives, fintechs and other emerging-market institutions."]].map(([t,d])=><article key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section>

  <section className="dbx-final-cta"><div className="container"><div><div className="eyebrow">MFSYS DIGITAL BANKING</div><h2>See how CiiHive can fit your institution.</h2><p>Let’s explore your current architecture, priorities and digital banking roadmap.</p></div><Link href="/contact" className="dbx-btn dbx-btn-primary">Request a Demo →</Link></div></section>
 </div>;
}
