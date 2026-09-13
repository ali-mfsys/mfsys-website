import Link from "next/link";

const cases=[
 {num:"01",client:"Financial Services",region:"Pakistan",title:"Modernizing the digital core for inclusive finance",text:"A cloud-native banking platform connecting core operations, digital channels, lending, risk and reporting for institutions serving underserved markets.",stats:["Core banking","Digital channels","AI credit"],href:"/products/ciihive"},
 {num:"02",client:"Freight & Logistics",region:"North America",title:"Making freight operations visible from booking to proof of delivery",text:"Connected digital workflows for load booking, dispatch, GPS tracking, driver verification, geofencing and proof of delivery.",stats:["Real-time tracking","Driver KYC","POD"],href:"/products/cargoguard"},
 {num:"03",client:"Climate & Sustainability",region:"Pakistan",title:"Building digital infrastructure for the carbon economy",text:"A connected climate ecosystem spanning green-project registration, MRV, carbon-credit computation and digital marketplace workflows.",stats:["MRV","Carbon marketplace","Climate data"],href:"/products/xchangecarbon"},
 {num:"04",client:"Development Finance",region:"Gilgit-Baltistan",title:"Connecting farmers, cooperatives and finance",text:"Digital platforms that bring producer organizations, value chains and financial services together to improve access, visibility and decision-making.",stats:["Cooperatives","Value chains","Digital finance"],href:"/products/digitalkisaan"},
];
export default function ImpactCases(){
 return <section className="impact-cases">
  <div className="container">
   <div className="impact-head">
    <div><div className="eyebrow">GLOBAL IMPACT</div><h2>Built for complexity.<br/><span>Proven in the real world.</span></h2></div>
    <div><p>From financial institutions to freight networks and emerging climate markets, MFSYS delivers technology where reliability, scale and local context matter.</p><Link className="text-link" href="/case-studies">View case studies →</Link></div>
   </div>
   <div className="impact-grid">
    {cases.map((c,i)=><Link href={c.href} className={i===0?"impact-card impact-feature":"impact-card"} key={c.num}>
      <div className="impact-card-top"><span>{c.num}</span><small>{c.client} · {c.region}</small></div>
      <div className="impact-visual"><div className="impact-lines"/><div className="impact-globe"/><strong>{i===0?"FINANCE":i===1?"FREIGHT":i===2?"CLIMATE":"VALUE CHAIN"}</strong></div>
      <div className="impact-body"><h3>{c.title}</h3><p>{c.text}</p><div className="impact-stats">{c.stats.map(s=><span key={s}>{s}</span>)}</div><b>Explore impact ↗</b></div>
    </Link>)}
   </div>
   <div className="impact-proof"><div><strong>12+</strong><span>countries</span></div><div><strong>30+</strong><span>financial institutions</span></div><div><strong>100+</strong><span>professionals</span></div><div><strong>18+</strong><span>years average leadership experience</span></div></div>
  </div>
 </section>