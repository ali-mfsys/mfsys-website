import Link from "next/link";
const solutions=[
["02","Digital Lending","Digitize loan origination, approvals and servicing.","LoanLeaf · LoanIQ","/solutions/loan-origination"],
["03","Payments & Digital Channels","Connect wallets, mobile banking, remittances and payment networks.","mConnect · Digital Wallet","/solutions/payments"],
["04","Islamic Finance","Digitize Shariah-compliant financing workflows.","Smart Mudarabah · Zaroorat24","/solutions/islamic-finance"],
["05","AI & Credit Intelligence","Support smarter credit decisions through scoring and analytics.","AI Credit Intelligence","/solutions/ai-credit"],
["06","Agriculture & Rural Finance","Enable farmer financing and rural value chains.","DigitalKisaan","/solutions/agri-finance"],
["07","Risk, Compliance & Reporting","Support expected credit losses, portfolio risk and reporting.","IFRS 9 · Analytics","/products/ifrs9"],
["08","Integration & Automation","Connect banking systems, digital channels and workflows.","mConnect · Agentic AI","/solutions/agentic-ai"]
];
export default function ConnectedEcosystem(){return <section className="connected-ecosystem" aria-labelledby="connected-heading"><div className="container">
<div className="eyebrow">THE MFSYS CONNECTED ECOSYSTEM</div>
<div className="connected-intro"><h2 id="connected-heading">One Connected Ecosystem.<br/><em>Powering Digital Finance.</em></h2><p>From core banking and digital lending to payments, Islamic finance and AI-powered intelligence, MFSYS helps financial institutions modernize, grow and serve more customers.</p></div>
<div className="connected-grid">
<Link href="/solutions/digital-banking" className="connected-feature"><span className="connected-index">01 / FEATURED SOLUTION</span><span className="connected-glyph">▥</span><h3>Digital Core Banking</h3><p>Modern, scalable banking technology for microfinance banks, MFIs, NBFCs, SACCOs, cooperatives, credit unions and fintechs.</p><b className="connected-product">CiiHive · Glaxity</b><span className="connected-feature-link">Explore Core Banking ↗</span><div className="connected-visual" aria-hidden="true"><div className="connected-screen"><small>CORE BANKING OPERATIONS</small><strong>Accounts · Deposits · Loans</strong><div className="connected-chart">{[38,54,45,76,61,90,72,100].map((n,i)=><i key={i} style={{height:n+"%"}}/>)}</div><small>TRANSACTIONS · PORTFOLIO · REPORTING</small></div></div></Link>
{solutions.map(([n,title,desc,products,href])=><Link href={href} className="connected-card" key={n}><span className="connected-card-top"><span className="connected-symbol">{["↗","⇄","◇","✦","❋","▤","⤳"][Number(n)-2] }</span><span className="connected-index">{n}</span></span><h3>{title}</h3><p>{desc}</p><span className="connected-card-foot"><b>{products}</b><span>↗</span></span></Link>)}
</div>
<div className="connected-bottom"><div><strong>Modernize your core. Digitize your operations. Expand financial inclusion.</strong><p>Our wider expertise spans agriculture, climate, logistics, development finance and enterprise AI.</p></div><div className="connected-actions"><Link href="/contact">Schedule a Demo ↗</Link><Link href="/solutions">Explore Our Solutions →</Link></div></div>
</div></section>}
