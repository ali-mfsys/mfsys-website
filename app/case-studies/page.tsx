import type { Metadata } from "next";
import Link from "next/link";

const cases=[
["Financial Services","Pakistan","Modernizing the digital core for inclusive finance","Cloud-native core banking, digital channels, lending and intelligence for institutions serving underserved markets.","CiiHive"],
["Freight & Logistics","North America","Making freight operations visible from booking to proof of delivery","Connected workflows spanning booking, dispatch, GPS tracking, driver verification, compliance and POD.","CargoGuard"],
["Climate & Sustainability","Pakistan","Building digital infrastructure for the carbon economy","Project registration, MRV, carbon-credit computation and marketplace workflows in one connected ecosystem.","XchangeCarbon"],
["Development Finance","Gilgit-Baltistan","Connecting farmers, cooperatives and finance","Digital platforms connecting producer organizations, value chains and financial services for better decisions.","DigitalKisaan"]
];


export const metadata: Metadata = { title: "Case Studies | MFSYS", description: "Explore selected MFSYS technology implementations across financial services, logistics, climate and development finance.", alternates: { canonical: "/case-studies" }, openGraph: { title: "Case Studies | MFSYS", description: "Explore selected MFSYS technology implementations across financial services, logistics, climate and development finance.", url: "https://mfsys.ca/case-studies" } };

export default function CaseStudies(){
 return <main id="main">
  <section className="container section case-page-head"><div className="eyebrow">GLOBAL IMPACT</div><h1>Built for complexity.<br/><span>Proven in the real world.</span></h1><p>MFSYS technology is deployed where reliability, domain knowledge and local context matter. Explore selected stories across financial services, freight, climate and development.</p></section>
  <section className="container case-page-grid">{cases.map((c,i)=><article className="case-page-card" key={c[0]}><div className="case-page-num">0{i+1}</div><div className="case-page-meta">{c[0]} · {c[1]}</div><h2>{c[2]}</h2><p>{c[3]}</p><div className="case-page-product">POWERED BY <strong>{c[4]}</strong></div></article>)}</section>
  <section className="container section"><div className="solution-cta"><div><div className="eyebrow">YOUR CHALLENGE</div><h2>Let’s build what comes next.</h2></div><Link className="nav-cta" href="/contact">Talk to MFSYS →</Link></div></section>
 </main>;
}