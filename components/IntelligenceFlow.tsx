"use client";
import {useState} from "react";
import type {ReactNode} from "react";
import styles from "./IntelligenceFlow.module.css";

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
const [active,setActive]=useState(0);
const selected=stages[active];
return <section id="intelligence-flow" className={styles.section} aria-labelledby="intelligence-heading"><div className="container">
<div className={styles.intro}><div><div className="eyebrow">THE MFSYS INTELLIGENCE ENGINE</div><h2 id="intelligence-heading">Data becomes intelligence.<br/><span>Intelligence becomes impact.</span></h2></div><p>MFSYS connects financial data, AI-driven insights, intelligent decisions and digital execution to help institutions operate efficiently, manage risk and expand financial inclusion.</p></div>
<div className={styles.engine}>
<div className={styles.engineTop}><div><span className={styles.overline}>INTELLIGENCE-TO-IMPACT ENGINE</span><h3>From insight to action. From action to outcomes.</h3></div><span className={styles.live}>CONNECTED INTELLIGENCE</span></div>
<div className={styles.stages} role="group" aria-label="Explore five intelligence stages">{stages.map((stage,i)=><button key={stage.number} type="button" className={styles.stage+" "+styles["stage"+i]+(active===i?" "+styles.selected:"")} onClick={()=>setActive(i)} aria-pressed={active===i} aria-controls="intelligence-detail"><span className={styles.stageNumber}>{stage.number}</span><span className={styles.stageIcon}><StageIcon name={stage.icon}/></span><span className={styles.stageLabel}>{stage.label}</span><span className={styles.stageVerb}>{stage.verb}</span></button>)}</div>
<div className={styles.feedback}><span className={styles.feedbackArrow} aria-hidden="true">↶</span><span>Continuous learning, measurement and improvement</span></div>
<div id="intelligence-detail" className={styles.detail} aria-live="polite"><div className={styles.detailText}><span className={styles.detailNumber}>STAGE {selected.number} / 05</span><h4>{selected.label}</h4><p>{selected.desc}</p></div><div className={styles.detailSide}><div><span>BUSINESS APPLICATION</span><strong>{selected.example}</strong></div><div><span>MFSYS CAPABILITIES</span><strong>{selected.products}</strong></div></div></div>
</div>
<div className={styles.note}>Connecting banking, lending and digital finance capabilities with data-driven decisions and measurable business outcomes.</div>
</div></section>;
}
