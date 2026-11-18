import type {Metadata} from "next";
import Link from "next/link";
import {breadcrumbSchema,safeJsonLd,canonicalUrl} from "../../../lib/seo";

const title="CiiHive Core Banking Software & the Evolution to Glaxity | MFSYS";
const description="Learn about MFSYS CiiHive core banking for microfinance banks, SACCOs, credit unions, cooperatives and NBFCs—and its evolution into the Glaxity platform.";
export const metadata:Metadata={
 title,description,alternates:{canonical:"/products/ciihive"},
 robots:{index:true,follow:true},
 openGraph:{title,description,url:canonicalUrl("/products/ciihive"),images:["/opengraph-image"]},
 twitter:{card:"summary_large_image"}
};
const schema=breadcrumbSchema([{name:"Home",path:"/"},{name:"Products",path:"/products"},{name:"CiiHive Core Banking",path:"/products/ciihive"}]);
const overview=[
 {title:"Customers & relationships",text:"Customer records, onboarding workflows, know-your-customer processes and relationship visibility."},
 {title:"Credit & lending",text:"Loan products, disbursement, schedules, repayments and connected loan origination workflows."},
 {title:"Deposits & savings",text:"Savings, term deposits, certificates and account lifecycle services for institutions serving members and customers."},
 {title:"General ledger & reporting",text:"Transaction accounting, ledger controls, portfolio and operational reporting."},
 {title:"Banking channels & integration",text:"Connections to mobile or online services, transaction switches and partner platforms through agreed APIs and middleware."},
 {title:"Institutional controls",text:"Role-based access, approvals, audit histories and configuration for regulated financial operations."}
];
export default function Page(){return <main id="main">
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(schema)}}/>
 <section style={{background:"linear-gradient(130deg,#092238,#174a65)",color:"#fff",padding:"86px 24px"}}>
  <div style={{maxWidth:1100,margin:"auto"}}>
   <span style={{color:"#99d6da",letterSpacing:2,fontSize:12,fontWeight:850}}>MFSYS / CORE BANKING PLATFORMS</span>
   <h1 style={{fontSize:"clamp(42px,6vw,76px)",lineHeight:1.08,letterSpacing:"-.055em",maxWidth:930,margin:"23px 0"}}>CiiHive Core Banking.<br/><span style={{color:"#a9dceb"}}>The foundation of Glaxity.</span></h1>
   <p style={{maxWidth:850,fontSize:18,lineHeight:1.75,color:"#d5e5f0"}}>CiiHive is the MFSYS core banking technology foundation designed around the everyday needs of microfinance institutions and other member-serving financial organisations. Glaxity is the next generation of this technology, with a modern cloud-native and AI-enabled architecture.</p>
   <div style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:29}}><Link href="/products/glaxity" style={{padding:"14px 20px",borderRadius:8,background:"#f5bb72",color:"#10334c",fontWeight:850,textDecoration:"none"}}>Explore Glaxity ↗</Link><Link href="/contact" style={{padding:"14px 20px",borderRadius:8,color:"white",border:"1px solid #a2c4d2",fontWeight:850,textDecoration:"none"}}>Discuss your banking requirements ↗</Link></div>
  </div>
 </section>
 <section style={{maxWidth:1100,margin:"auto",padding:"75px 24px"}}>
  <h2 style={{fontSize:"clamp(30px,4vw,46px)",letterSpacing:"-.045em",color:"#173d56"}}>Banking functions built around institutional realities.</h2>
  <p style={{lineHeight:1.75,maxWidth:900,color:"#5e7382"}}>Core banking brings customers, financial products and accounting into a reliable system of record. These functional areas illustrate MFSYS's CiiHive domain and are relevant when planning a migration or modernisation.</p>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14,marginTop:28}}>{overview.map(x=><article key={x.title} style={{padding:23,border:"1px solid #dbe6eb",borderRadius:12,background:"#fafcfc"}}><h3 style={{fontSize:19,color:"#153b55",margin:"0 0 11px"}}>{x.title}</h3><p style={{fontSize:14,color:"#5e7481",lineHeight:1.7,margin:0}}>{x.text}</p></article>)}</div>
 </section>
 <section style={{background:"#eef5f5",padding:"70px 24px"}}><div style={{maxWidth:1100,margin:"auto",display:"grid",gap:20}}>
  <h2 style={{fontSize:"clamp(30px,4vw,44px)",color:"#153b55",letterSpacing:"-.04em",margin:0}}>CiiHive and Glaxity: continuity with a modern foundation.</h2>
  <p style={{fontSize:16,lineHeight:1.8,color:"#58707a",maxWidth:900}}>CiiHive reflects MFSYS's established core banking and financial inclusion experience. Glaxity builds on that knowledge with an upgraded technology stack designed for modular deployment, connected digital channels and scalable financial operations. Existing deployments and historical project references should be considered separately from the capabilities and commercial scope of a new Glaxity implementation.</p>
  <p style={{fontSize:15,lineHeight:1.8,color:"#58707a",maxWidth:850}}>Whether your institution is a microfinance bank, credit union, SACCO, cooperative, NBFC or fintech, the right modernisation path depends on products, reporting, data migration, integrations and local regulatory requirements.</p>
  <div style={{display:"flex",flexWrap:"wrap",gap:19}}><Link href="/solutions/digital-banking" style={{color:"#126b99",fontWeight:850}}>Explore Digital Core Banking →</Link><Link href="/industries/microfinance-banking" style={{color:"#126b99",fontWeight:850}}>Banking for SACCOs & MFIs →</Link><Link href="/products/glaxity" style={{color:"#126b99",fontWeight:850}}>Discover Glaxity →</Link></div>
 </div></section>
 </main>}
