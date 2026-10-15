"use client";
import {useState} from "react";
import type {ReactNode} from "react";
// Stable, scoped global class names avoid missing CSS-module assets in edge previews.
const styles = {"section":"mfsys-intel-section","intro":"mfsys-intel-intro","journey":"mfsys-intel-journey","journeyHeader":"mfsys-intel-journeyHeader","kicker":"mfsys-intel-kicker","exampleLabel":"mfsys-intel-exampleLabel","stepper":"mfsys-intel-stepper","step":"mfsys-intel-step","active":"mfsys-intel-active","stepIcon":"mfsys-intel-stepIcon","stepNumber":"mfsys-intel-stepNumber","stepName":"mfsys-intel-stepName","story":"mfsys-intel-story","storyMain":"mfsys-intel-storyMain","storyStep":"mfsys-intel-storyStep","outcome":"mfsys-intel-outcome","storyAside":"mfsys-intel-storyAside","asideEyebrow":"mfsys-intel-asideEyebrow","products":"mfsys-intel-products","controls":"mfsys-intel-controls","note":"mfsys-intel-note"};

type IconName="database"|"brain"|"decision"|"workflow"|"impact";
const stages=[
{number:"01",label:"UNIFIED DATA",verb:"Connect",icon:"database" as IconName,desc:"Unify customer, account, transaction, lending and third-party data across financial systems.",products:"CiiHive · Glaxity · mConnect",example:"Connected banking and customer information"},
{number:"02",label:"AI & INTELLIGENCE",verb:"Analyze",icon:"brain" as IconName,desc:"Turn operational and financial data into actionable insights, predictive indicators and portfolio intelligence.",products:"AI Credit Intelligence · Analytics",example:"Portfolio insights and customer intelligence"},
{number:"03",label:"INTELLIGENT DECISIONS",verb:"Decide",icon:"decision" as IconName,desc:"Support credit assessment, eligibility checks, risk evaluation and configurable approval decisions.",products:"LoanLeaf · LoanIQ",example:"Credit assessment and approval workflows"},
{number:"04",label:"DIGITAL EXECUTION",verb:"Execute",icon:"workflow" as IconName,desc:"Connect decisions to lending, disbursement, payment, notification and banking workflows.",products:"CiiHive · mConnect · Smart Mudarabah",example:"Connected loan and payment operations"},
{number:"05",label:"MEASURABLE IMPACT",verb:"Optimize",icon:"impact" as IconName,desc:"Monitor turnaround times, portfolio quality, operational performance and financial inclusion outcomes.",products:"IFRS 9 · Reporting & Analytics",example:"Performance measurement and improvement"}
];
function StageIcon({name}:{name:IconName}){
const paths:Record<IconName,ReactNode>={
database:<><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></>,
brain:<><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5Zm0 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5Z"/><path d="m8 10 3 2-3 2m8-4-3 2 3 2"/></>,
decision:<><path d="M12 3v6m0 0-6 5m6-5 6 5"/><rect x="8" y="2" width="8" height="5" rx="1"/><rect x="2" y="15" width="8" height="6" rx="1"/><rect x="14" y="15" width="8" height="6" rx="1"/></>,
workflow:<><rect x="2" y="3" width="7" height="6" rx="1"/><rect x="15" y="3" width="7" height="6" rx="1"/><rect x="8" y="16" width="8" height="6" rx="1"/><path d="M5.5 9v4h13V9M12 13v3"/></>,
impact:<><path d="M3 19h18M5 16l5-5 4 3 6-8M16 6h4v4"/><path d="M5 20V9m5 11v-5m5 5v-4m5 4v-7"/></>
};
return <svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
export default function IntelligenceFlow(){
const [active,setActive]=useState(2);
const selected=stages[active];
const outcomes=[
{heading:"A connected view of every customer",detail:"Bring together customer profiles, accounts, transactions, repayment histories and relevant external information.",result:"Customer and financial data become easier to access and understand"},
{heading:"Turn information into useful insights",detail:"Analyze repayment patterns, portfolio trends and customer behavior to identify opportunities and potential risks.",result:"Patterns, trends and risk indicators become visible"},
{heading:"Make informed credit decisions",detail:"Support lending decisions with configurable policies, scoring rules, eligibility checks and approval workflows.",result:"Credit applications can be assessed consistently"},
{heading:"From approval to execution",detail:"Connect approved decisions with banking operations, loan processing, payments and customer communications.",result:"Approved workflows move into digital operations"},
{heading:"Understand the business impact",detail:"Monitor processing times, portfolio performance, operational efficiency and customer outreach.",result:"Business performance informs continuous improvement"}
];
const current=outcomes[active];
return <section id="intelligence-flow" className={styles.section} aria-labelledby="intelligence-heading"><div className="container">
<div className={styles.intro}><div><div className="eyebrow">THE MFSYS INTELLIGENCE ENGINE</div><h2 id="intelligence-heading">Data becomes intelligence.<br/><span>Intelligence becomes impact.</span></h2></div><p>See how MFSYS connects banking data, intelligent decisions and digital operations to help financial institutions serve customers more efficiently.</p></div>
<div className={styles.journey}>
<div className={styles.journeyHeader}><div><span className={styles.kicker}>INTELLIGENCE IN ACTION</span><h3>From financial data to better business outcomes.</h3><p>Explore a microfinance lending journey, one step at a time.</p></div><span className={styles.exampleLabel}>EXAMPLE · MICROFINANCE LENDING</span></div>
<div className={styles.stepper} role="group" aria-label="Explore the five stages of a lending journey">{stages.map((stage,i)=><button type="button" key={stage.number} className={styles.step+" "+styles["step"+i]+(active===i?" "+styles.active:"")} onClick={()=>setActive(i)} aria-pressed={active===i} aria-controls="intelligence-detail"><span className={styles.stepIcon}><StageIcon name={stage.icon}/></span><span className={styles.stepNumber}>STEP {stage.number}</span><span className={styles.stepName}>{["Connect","Analyze","Decide","Execute","Improve"][i]}</span></button>)}</div>
<div id="intelligence-detail" className={styles.story} aria-live="polite"><div className={styles.storyMain}><span className={styles.storyStep}>STEP {selected.number} OF 05</span><h4>{current.heading}</h4><p>{current.detail}</p><div className={styles.outcome}><span aria-hidden="true">✓</span><span>{current.result}</span></div></div><aside className={styles.storyAside}><span className={styles.asideEyebrow}>IN PRACTICE</span><h5>Microfinance loan application</h5><p>{selected.example}</p><div className={styles.products}><span>MFSYS SOLUTIONS</span><strong>{selected.products}</strong></div></aside></div>
<div className={styles.controls}><button type="button" onClick={()=>setActive(v=>Math.max(0,v-1))} disabled={active===0}>← Previous stage</button><span aria-label={`Stage ${active+1} of 5`}>{active+1} / 5</span><button type="button" onClick={()=>setActive(v=>Math.min(4,v+1))} disabled={active===4}>Next stage →</button></div>
</div><p className={styles.note}>Illustrative customer journey. Available automation, analytics and AI capabilities depend on product configuration and integrations.</p>
</div></section>;
}