import Link from "next/link";
import type { ReactNode } from "react";
type SolutionIconName = "bank" | "lending" | "payments" | "islamic" | "ai" | "agriculture" | "risk" | "integration";
function SolutionIcon({name}:{name:SolutionIconName}) {
 const paths:Record<SolutionIconName,React.ReactNode>={
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
const solutions=[
["02","Digital Lending","Digitize loan origination, approvals and servicing.","LoanLeaf · LoanIQ","/solutions/loan-origination"
["03","Payments & Digital Channels","Connect wallets, mobile banking, remittances and payment networks.","mConnect · Digital Wallet","/solutions/payments"
["04","Islamic Finance","Digitize Shariah-compliant financing workflows.","Smart Mudarabah · Zaroorat24","/solutions/islamic-finance"
["05","AI & Credit Intelligence","Support smarter credit decisions through scoring and analytics.","AI Credit Intelligence","/solutions/ai-credit"
["06","Agriculture & Rural Finance","Enable farmer financing and rural value chains.","DigitalKisaan","/solutions/agri-finance"
["07","Risk, Compliance & Reporting","Support expected credit losses, portfolio risk and reporting.","IFRS 9 · Analytics","/products/ifrs9"
["08","Integration & Automation","Connect banking systems, digital channels and workflows.","mConnect · Agentic AI","/solutions/agentic-ai"
];
export default function ConnectedEcosystem(){return <section className="connected-ecosystem" aria-labelledby="connected-heading"><div className="container">
<div className="eyebrow">THE MFSYS CONNECTED ECOSYSTEM</div>
<div className="connected-intro"><h2 id="connected-heading">One Connected Ecosystem.<br/><em>Powering Digital Finance.</em></h2><p>From core banking and digital lending to payments, Islamic finance and AI-powered intelligence, MFSYS helps financial institutions modernize, grow and serve more customers.</p></div>
<div className="connected-grid">
<Link href="/solutions/digital-banking" className="connected-feature"><span className="connected-index">01 / FEATURED SOLUTION</span><span className="connected-glyph"><SolutionIcon name="bank"/></span><h3>Digital Core Banking</h3><p>Modern, scalable banking technology for microfinance banks, MFIs, NBFCs, SACCOs, cooperatives, credit unions and fintechs.</p><b className="connected-product">CiiHive · Glaxity</b><span className="connected-feature-link">Explore Core Banking ↗</span><div className="connected-visual" aria-hidden="true"><div className="connected-screen"><small>CORE BANKING OPERATIONS</small><strong>Accounts · Deposits · Loans</strong><div className="connected-dashboard-metrics"><span>Customer accounts</span><span>Loan portfolio</span><span>Deposits</span></div><div className="connected-chart">{[38,54,45,76,61,90,72,100].map((n,i)=><i key={i} style={{height:n+"%"}}/>)}</div><small>TRANSACTIONS · PORTFOLIO · REPORTING</small></div></div></Link>
{solutions.map(([n,title,desc,products,href,icon])=><Link href={href} className={"connected-card connected-card--"+icon} key={n}><span className="connected-card-top"><span className="connected-symbol">{<SolutionIcon name={icon as SolutionIconName}/> }</span><span className="connected-index">{n}</span></span><h3>{title}</h3><p>{desc}</p><span className="connected-card-foot"><b>{products}</b><span>↗</span></span></Link>)}
</div>
<div className="connected-bottom"><div><strong>Modernize your core. Digitize your operations. Expand financial inclusion.</strong><p>Our wider expertise spans agriculture, climate, logistics, development finance and enterprise AI.</p></div><div className="connected-actions"><Link href="/contact">Schedule a Demo ↗</Link><Link href="/solutions">Explore Our Solutions →</Link></div></div>
</div></section>}
