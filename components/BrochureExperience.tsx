import Link from "next/link";

type Experience = "digitalkisaan" | "xchangecarbon";
const content = {
 digitalkisaan: {
  eyebrow:"AGRI FINANCE & SUPPLY CHAIN · DIGITALKISAAN",
  title:"Digital rails for village agriculture cooperatives.",
  intro:"One connected management information system for cooperative governance, farmer and household records, community finance, inventory, accounting and oversight — from village to division.",
  stats:[["11","Integrated modules"],["34","Built-in reports"],["21","Configurable master lists"],["4","Stakeholder tiers"]],
  heading:"Eleven modules. One cooperative.",
  modules:[
   ["VAC Dashboard","Live KPIs, maps and alerts"],["VAC Governance","Registration, boards, meetings, audits and renewals"],["Monitoring & Evaluation","Outreach, finance and impact reporting"],
   ["Farmer’s Data","Households, land, crops, trees and value chains"],["Savings & Shares","Share purchases, transfers and inquiries"],["Revolving Fund","Applications, approvals, disbursements and recoveries"],
   ["Credit Management","Internal lending and external borrowing records"],["Accounting & Finance","Four-level chart of accounts, GL and financial statements"],["Inventory Management","Purchases, sales, stock and fixed assets"],
   ["User Management","Organization and VAC accounts"],["Master Configuration","21 configurable reference lists"],["Permission Management","Role-based view and edit rights"]
  ],
  processTitle:"Community lending, fully accounted for.",
  steps:["Apply","Approve","Disburse","Repay","Track"],
  processCopy:"Revolving funds and internal lending follow a connected approval and repayment process. Transactions post to the cooperative’s books, while managers monitor amounts disbursed, recovered and outstanding.",
  audienceTitle:"One platform. Four stakeholder tiers.",
  audience:[["VAC staff","Cooperative operations and data entry"],["GBRSP & ETI-GB","Programme monitoring and reporting"],["Cooperative Department & financial institutions","Regulatory and support oversight"],["Agriculture Department, fintech & insurers","Controlled, role-based access"]],
  proof:"Developed for Village Agriculture Cooperatives with the Gilgit-Baltistan Rural Support Programme and Economic Transformation Initiative. The brochure reports deployment for 160 agriculture cooperatives across Gilgit-Baltistan.",
  foot:"34 built-in reports drill down from division, district, tehsil, union council and village to VAC and individual farmer."
 },
 xchangecarbon: {
  eyebrow:"CLIMATE & CARBON · XCHANGECARBON",
  title:"Where verified climate action becomes tradable value.",
  intro:"A carbon credit marketplace, project registry and settlement experience that connects green project developers, buyers, offsetters and traders — from the first field survey to the retirement certificate.",
  stats:[["3","Participant groups"],["7","Traceable lifecycle steps"],["2","Mobile roles: developer and auditor"],["1","Connected marketplace"]],
  heading:"One venue. Every step of the credit lifecycle.",
  modules:[
   ["Project registry","Project location, area, survey and evidence in one record"],["Digital MRV","Structured field evidence, species, land cover and carbon estimates"],["Independent verification","Auditor work queues, checklists and documented decisions"],
   ["Credit issuance","Serialized units with a traceable ledger history"],["Marketplace listings","Fixed-price offers and timed auctions"],["Settlement","Transaction records and portfolio visibility"],
   ["Portfolio analytics","Holdings, offset rates and project selling rates"],["Credit retirement","Retirement certificates identify the project and claimant"],["Role-based access","Distinct experiences for developers, auditors, buyers and traders"]
  ],
  processTitle:"From a field survey to a retired credit.",
  steps:["Register","Upload evidence","Calculate CO₂e","Validate","Issue","Trade","Retire"],
  processCopy:"Developers capture project coordinates, area, tree species and counts on mobile. Independent auditors review the evidence; approved credits can be issued, listed, traded and retired with a traceable record.",
  audienceTitle:"Built for the entire carbon market.",
  audience:[["Project developers","Communities, farmers, forestry bodies and NGOs"],["Buyers & offsetters","Organizations and individuals seeking traceable credits"],["Traders & investors","Explore opportunities across projects and markets"],["Independent auditors","Verify claims with evidence and structured checklists"]],
  proof:"MFSYS has supported community awareness and project development in Gilgit-Baltistan, including workshops with 110 participants at Karakoram International University, 49 at a Gilgit conference and 28 at a Skardu training session, as reported in the brochure.",
  foot:"Blockchain-backed audit history records registration, verification, issuance, transfer and retirement. Credit claims remain subject to applicable independent verification and standards."
 }
} as const;
export default function BrochureExperience({kind}:{kind:Experience}){
 const d=content[kind];
 return <main id="main">
  <section className="product-hero"><div className="container product-hero-inner"><div className="eyebrow">{d.eyebrow}</div><h1>{d.title}</h1><p className="product-description">{d.intro}</p><Link className="btn btn-primary" href="/contact">Explore this solution →</Link></div></section>
  <section className="container section"><div className="outcome-grid">{d.stats.map(([number,label])=><div key={label}><div className="eyebrow">{label}</div><h2>{number}</h2></div>)}</div></section>
  <section className="container section"><div className="eyebrow">CONNECTED CAPABILITIES</div><h2>{d.heading}</h2><div className="cap-grid">{d.modules.map(([title,detail])=><div className="cap" key={title}><span>+</span><div><strong>{title}</strong><p>{detail}</p></div></div>)}</div></section>
  <section className="product-dark"><div className="container section"><div className="eyebrow">HOW IT WORKS</div><h2>{d.processTitle}</h2><p>{d.processCopy}</p><div className="cap-grid">{d.steps.map((step,i)=><div className="cap" key={step}><span>{String(i+1).padStart(2,"0")}</span><strong>{step}</strong></div>)}</div></div></section>
  <section className="container section"><div className="eyebrow">PARTICIPANTS & OVERSIGHT</div><h2>{d.audienceTitle}</h2><div className="cap-grid">{d.audience.map(([title,detail])=><div className="cap" key={title}><span>+</span><div><strong>{title}</strong><p>{detail}</p></div></div>)}</div><p>{d.foot}</p></section>
  <section className="container section"><div className="cta-panel"><div className="eyebrow">MFSYS · EXPERIENCE IN THE FIELD</div><h2>Built around real operating needs.</h2><p>{d.proof}</p><Link className="btn" href="/contact">Talk to our team →</Link></div></section>
 </main>
}