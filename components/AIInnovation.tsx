"use client";
import {useState} from "react";
import Link from "next/link";

const capabilities=[
 ["01","AI CREDIT INTELLIGENCE","Assess","Transform financial and alternative data into explainable credit insights, probability of default and decision support.","AI scoring","Risk intelligence","Explainable decisions"],
 ["02","PREDICTIVE RISK","Predict","Anticipate portfolio behaviour with data-driven risk models, early-warning signals and forward-looking analytics.","PD / LGD","ECL & IFRS 9","Portfolio analytics"],
 ["03","AGENTIC AI","Orchestrate","Move beyond chatbots with intelligent agents that can reason across workflows, systems and enterprise data.","AI agents","Workflow automation","Human-in-the-loop"],
 ["04","INTELLIGENT AUTOMATION","Execute","Connect decisions to action through automated workflows, approvals, alerts and operational processes.","Process automation","Decision workflows","Digital operations"],
];

export default function AIInnovation(){
 const [active,setActive]=useState(0); const c=capabilities[active];
 return <section className="ai-innovation">
  <div className="container">
   <div className="ai-head">
    <div><div className="eyebrow">AI & INNOVATION</div><h2>AI is not an add-on.<br/><span>It is the intelligence layer.</span></h2></div>
    <p>MFSYS treats AI as an intelligence layer across the enterprise—helping institutions capture better data, assess risk, predict outcomes, support decisions and automate action while keeping people accountable for important decisions.</p>
   </div>
   <div className="ai-engine">
    <div className="ai-engine-copy">
      <div className="ai-engine-kicker">THE MFSYS AI DECISION ENGINE</div>
      <h3>From data to <span>better decisions.</span></h3>
      <p>Our approach combines domain expertise, machine intelligence and responsible human oversight. The goal is practical AI: explainable where decisions matter, measurable where outcomes matter, and designed to work with the systems institutions already use.</p>
      <div className="ai-sequence">
       {["DATA","ANALYZE","PREDICT","DECIDE","ACT","IMPACT"].map((x,i)=><div key={x} className="ai-sequence-step"><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span>{i<5&&<i>→</i>}</div>)}
      </div>
      <Link className="btn btn-primary" href="/ai-innovation">Discover the MFSYS intelligence layer →</Link>
    </div>
    <div className="ai-visual" aria-hidden="true">
      <div className="ai-grid-lines"/>
      <div className="ai-orbit ai-orbit-1"/><div className="ai-orbit ai-orbit-2"/><div className="ai-orbit ai-orbit-3"/>
      <div className="ai-core"><span>AI</span><small>DECISION<br/>INTELLIGENCE</small></div>
      <div className="ai-node ai-n1">DATA</div><div className="ai-node ai-n2">RISK</div><div className="ai-node ai-n3">PREDICT</div><div className="ai-node ai-n4">ACT</div>
      <div className="ai-pulse"/>
    </div>
   </div>
   <div className="ai-capabilities">
    <div className="ai-cap-nav">
     {capabilities.map((x,i)=><button key={x[0]} className={i===active?"active":""} onClick={()=>setActive(i)}><span>{x[0]}</span><strong>{x[1]}</strong><em>→</em></button>)}
    </div>
    <article className="ai-cap-panel">
      <span className="ai-cap-number">{c[0]}</span><div className="ai-cap-kicker">{c[1]}</div><h4>{c[2]}</h4><p>{c[3]}</p>
      <div className="ai-cap-tags">{c[4].split("|").map(x=><span key={x}>{x}</span>)}{c[5].split("|").map(x=><span key={x}>{x}</span>)}{c[6].split("|").map(x=><span key={x}>{x}</span>)}</div>
    </article>
   </div>
  </div>
 </section>
}