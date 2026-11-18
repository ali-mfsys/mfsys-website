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
 return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

/* Scalable, decorative vector artwork. The card titles and labels remain live, accessible text. */
function CardScene({name}:{name:SolutionIconName}){
 return <svg className={s.scene} viewBox="0 0 230 210" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="120" cy="178" rx="98" ry="22" fill="currentColor" opacity=".13"/>
  {name==="lending"&&<>
   <rect x="60" y="31" width="115" height="145" rx="15" fill="#073F4F" stroke="currentColor" strokeWidth="3" transform="rotate(9 60 31)"/>
   <rect x="34" y="46" width="116" height="139" rx="14" fill="#0A6867" stroke="#82FFF1" strokeWidth="2.5" transform="rotate(-8 34 46)"/>
   <path d="M59 83h64m-64 18h48m-48 18h58" stroke="#ABFFF7" strokeOpacity=".65" strokeWidth="6" strokeLinecap="round"/>
   <circle cx="149" cy="135" r="37" fill="#21BCA4" stroke="#C4FFF0" strokeWidth="4"/><path d="m129 135 15 14 27-28" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  </>}
  {name==="payments"&&<>
   <g transform="rotate(9 132 98)"><rect x="95" y="20" width="99" height="167" rx="18" fill="#082647" stroke="#9EEBFF" strokeWidth="4"/><rect x="105" y="39" width="79" height="128" rx="9" fill="#0C6EA5"/><path d="M134 81q20-19 39 0m-30 7q11-10 21 0m-17 8q6-5 12 0" stroke="#B6F4FF" strokeWidth="5" strokeLinecap="round"/><rect x="124" y="124" width="47" height="13" rx="6" fill="#74D8FF" opacity=".7"/></g>
   <g transform="rotate(-12 78 137)"><rect x="16" y="105" width="128" height="77" rx="12" fill="#238FD7" stroke="#9EEBFF" strokeWidth="3"/><path d="M18 130h125" stroke="#A1ECFF" strokeWidth="11"/><circle cx="42" cy="159" r="8" fill="#B5F2FF"/></g>
  </>}
  {name==="islamic"&&<>
   <path d="M22 181h187" stroke="#FFDE9D" strokeWidth="4" strokeLinecap="round"/>
   <path d="M54 181v-50h122v50" fill="#C49448" stroke="#FFE1A6" strokeWidth="3"/>
   <path d="M75 130c2-46 27-69 40-73 28 15 37 43 41 73H75Z" fill="#E8B864" stroke="#FFE9B5" strokeWidth="3"/>
   <path d="M112 56a19 19 0 0 1-8-29 21 21 0 1 0 26 23 20 20 0 0 1-18 6Z" fill="#FFE8AA"/>
   <path d="M99 181v-30a17 17 0 0 1 34 0v30" fill="#704B2F"/><path d="M29 181V92m18 89V92m-18-4h18M31 89l6-24 7 24M185 181V89m18 92V89m-18-4h18m-17 1 7-25 7 25" fill="#E7BA70" stroke="#FFE6AF" strokeWidth="3"/>
   <path d="M69 152h15m64 0h15" stroke="#FFF0C9" strokeWidth="6" strokeLinecap="round"/>
  </>}
  {name==="ai"&&<>
   <g transform="rotate(-16 115 115)"><rect x="55" y="43" width="118" height="115" rx="22" fill="#5C40C1" stroke="#E9D8FF" strokeWidth="4"/><rect x="72" y="60" width="84" height="80" rx="16" fill="#7957E1" stroke="#CDB7FF" strokeWidth="3"/>
   <path d="M55 70H30m25 25H30m25 25H30m143-50h25m-25 25h25m-25 25h25M83 43V21m31 22V21m32 22V21M83 158v23m31-23v23m32-23v23" stroke="#BEABFF" strokeWidth="5" strokeLinecap="round"/>
   <path d="M106 93q-13-10-20 3-4 10 4 15-3 11 9 13 8 1 14-7V89m0 0q13-12 23 0 7 9-2 16 6 13-6 19-8 3-15-7" stroke="#F0E4FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
   </g>
  </>}
  {name==="agriculture"&&<>
   <circle cx="166" cy="49" r="25" fill="#D2FEAC" opacity=".7"/>
   <path d="M0 127Q69 83 118 116q50 28 112-18v112H0V127Z" fill="#63BB6F" opacity=".77"/>
   <path d="M0 156q90-41 155-11 30 12 75-4v70H0v-55Z" fill="#177546"/>
   <path d="M0 194Q94 141 230 194m-230-8q80-45 230-11M0 207q98-33 230-14" stroke="#BAF3A0" strokeWidth="3" opacity=".55"/>
   <path d="M46 166v-39l25-12 29 12v39" fill="#2B8E53" stroke="#B5F5B4" strokeWidth="3"/><path d="M39 145h68" stroke="#B5F5B4" strokeWidth="4"/>
   <path d="M140 114V55m0 33q-38 0-37-29 36 0 37 29Zm0-17q3-32 30-35-2 34-30 35Z" fill="#91E59E" stroke="#D5FFD3" strokeWidth="3"/>
  </>}
  {name==="risk"&&<>
   <rect x="45" y="27" width="146" height="147" rx="17" fill="#743D36" stroke="#FFD6A5" strokeWidth="3" transform="rotate(7 45 27)"/>
   <rect x="24" y="55" width="158" height="125" rx="13" fill="#91513D" stroke="#FFCB94" strokeWidth="3"/>
   <path d="M45 149V96m30 53V117m30 32V88m30 61V105" stroke="#FFD59B" strokeWidth="14" strokeLinecap="round"/>
   <path d="M45 78h78m-78 8h49" stroke="#FFE8BC" strokeWidth="4" strokeLinecap="round" opacity=".6"/>
   <circle cx="169" cy="107" r="37" fill="#D07B48" stroke="#FFDBA2" strokeWidth="4"/>
   <path d="M169 74v33l25 22" stroke="#FFF0D0" strokeWidth="11" strokeLinecap="round"/><path d="M169 107h36" stroke="#FFF3D0" strokeWidth="3"/>
  </>}
  {name==="integration"&&<>
   <path d="M110 55 37 19m73 36 74-36M110 128 38 163m72-35 74 35" stroke="#B9F2FF" strokeWidth="3" opacity=".72" strokeDasharray="7 7"/>
   <g fill="#105B86" stroke="#ABEEFF" strokeWidth="3"><rect x="78" y="56" width="66" height="72" rx="13"/><rect x="12" y="8" width="54" height="42" rx="10"/><rect x="163" y="8" width="54" height="42" rx="10"/><rect x="12" y="148" width="54" height="42" rx="10"/><rect x="163" y="148" width="54" height="42" rx="10"/></g>
   <path d="M91 83h40m-40 13h40m-40 13h40" stroke="#76D9FF" strokeWidth="5" strokeLinecap="round"/>
   <path d="M34 19v20m-10-10h20M176 26h28m-14-10v20M24 164h31m-16-10v20m131-10h32m-16-9v19" stroke="#C4F7FF" strokeWidth="4" strokeLinecap="round"/>
   <circle cx="111" cy="92" r="33" fill="#157DAD" stroke="#D4F9FF" strokeWidth="3"/><path d="M96 92h30m-15-15v30" stroke="#F3FEFF" strokeWidth="5" strokeLinecap="round"/>
  </>}
 </svg>;
}

function BankBuilding(){
 return <svg className={s.temple} viewBox="0 0 260 220" fill="none" aria-hidden="true">
  <path d="M24 74 130 15l107 59-7 17H31L24 74Z" fill="#3B9EE6" stroke="#C5EEFF" strokeWidth="5" strokeLinejoin="round"/>
  <path d="m60 79 70-39 72 39" stroke="#E4F7FF" strokeWidth="6" strokeLinecap="round"/>
  <path d="M39 97h186v14H39V97Zm-3 95h190v13H36v-13Z" fill="#B1E8FF" stroke="#E8FCFF" strokeWidth="2"/>
  {[56,98,140,182].map(n=><g key={n}><rect x={n} y="113" width="23" height="79" rx="4" fill="#78C4ED" stroke="#E4F7FF" strokeWidth="3"/><path d={"M"+n+" 115h23M"+n+" 190h23"} stroke="#2373AB" strokeWidth="6"/></g>)}
  <path d="M18 207h223" stroke="#B6F8FF" strokeWidth="6" strokeLinecap="round"/>
 </svg>;
}

const solutions:{n:string;title:string;description:string;products:string;href:string;icon:SolutionIconName}[]=[
 {n:"02",title:"Digital Lending",description:"Digitize loan origination, approvals and servicing.",products:"LoanLeaf · LoanIQ",href:"/products/loanleaf",icon:"lending"},
 {n:"03",title:"Payments & Digital Channels",description:"Connect wallets, mobile banking, remittances and payment networks.",products:"mConnect · Digital Wallet",href:"/products/mconnect",icon:"payments"},
 {n:"04",title:"Islamic Finance",description:"Connect Islamic financing products, Shariah governance, contracts and asset-based transactions.",products:"ShariahOne · Smart Mudarabah",href:"/products/shariahone",icon:"islamic"},
 {n:"05",title:"AI & Credit Intelligence",description:"Support smarter credit decisions through scoring and analytics.",products:"AI Credit Intelligence",href:"/products/loaniq",icon:"ai"},
 {n:"06",title:"Agriculture & Rural Finance",description:"Enable farmer financing and rural value chains.",products:"DigitalKisaan",href:"/products/digitalkisaan",icon:"agriculture"},
 {n:"07",title:"Risk, Compliance & Reporting",description:"Support expected credit losses, portfolio risk and reporting.",products:"IFRS 9 · Analytics",href:"/products/ifrs9",icon:"risk"},
 {n:"08",title:"Integration & Automation",description:"Connect banking systems, digital channels and workflows.",products:"mConnect · Agentic AI",href:"/products/mconnect",icon:"integration"}
];

export default function ConnectedEcosystem(){
 return <section className={s.section} aria-labelledby="connected-heading" id="connected-ecosystem">
  <div className={s.wrap}>
   <div className={s.eyebrow}>THE MFSYS CONNECTED ECOSYSTEM</div>
   <div className={s.intro}>
    <h2 id="connected-heading">One Connected Ecosystem.<br/><em>Powering Digital Finance.</em></h2>
    <p>From core banking and digital lending to payments, Islamic finance and AI-powered intelligence, MFSYS helps financial institutions modernize, grow and serve more customers.</p>
   </div>
   <div className={s.grid}>
    <Link href="/solutions/digital-banking" className={s.feature}>
     <div className={s.featureCopy}>
      <span className={s.featureLabel}>01 / FEATURED SOLUTION</span>
      <span className={s.featureIcon}><SolutionIcon name="bank"/></span>
      <h3>Digital Core Banking</h3>
      <p>Modern, scalable banking technology for microfinance banks, MFIs, NBFCs, SACCOs, cooperatives, credit unions and fintechs.</p>
      <span className={s.product}>Glaxity · Next generation of CiiHive</span>
      <span className={s.featureCta}>Explore Core Banking <span aria-hidden="true">→</span></span>
     </div>
     <div className={s.featureArt} aria-hidden="true">
      <BankBuilding/>
      <div className={s.device}>
       <div className={s.deviceTop}><span>◈ &nbsp; MFSYS</span><small>DASHBOARD</small></div>
       <div className={s.deviceLine}>CORE BANKING OPERATIONS</div>
       <strong className={s.deviceTitle}>Accounts · Deposits · Loans</strong>
       <div className={s.deviceTiles}><span>Accounts</span><span>Portfolio</span><span>Deposits</span></div>
       <div className={s.deviceChart}>{[34,49,42,74,61,82,70,96].map((n,i)=><i key={i} style={{height:n+"%"}}/>)}</div>
       <small className={s.deviceBottom}>TRANSACTIONS · PORTFOLIO · REPORTING</small>
      </div>
     </div>
     <span className={s.featureHint}>CLOUD-NATIVE · API-FIRST · CONNECTED</span>
    </Link>
    {solutions.map(item=><Link key={item.n} href={item.href} data-tone={item.icon} className={s.card}>
     <div className={s.cardTop}><span className={s.cardIcon}><SolutionIcon name={item.icon}/></span><span className={s.cardNumber}>{item.n}</span></div>
     <div className={s.cardCopy}><h3>{item.title}</h3><p>{item.description}</p></div>
     <CardScene name={item.icon}/>
     <span className={s.cardFoot}><span>{item.products}</span><span aria-hidden="true">→</span></span>
    </Link>)}
   </div>
   <div className={s.bottom}>
    <div><strong>Modernize your core. Digitize operations. Expand financial inclusion.</strong><p>Our wider expertise spans agriculture, climate, logistics, development finance and enterprise AI.</p></div>
    <div className={s.actions}><Link href="/contact">Schedule a Demo ↗</Link><Link href="/solutions">Explore Our Solutions →</Link></div>
   </div>
  </div>
 </section>;
}
