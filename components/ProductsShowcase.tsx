"use client";
import Link from "next/link";
import {products} from "../lib/site-data";

const productMeta=[
  ["CiiHive","CORE BANKING","AI-native digital core banking for institutions serving millions.","/products/ciihive","01"],
  ["LoanLeaf","LENDING","Digital loan origination, workflow and intelligent decisioning.","/products/loanleaf","02"],
  ["Smart Mudarabah","ISLAMIC FINANCE","End-to-end digital Mudarabah management built around Shariah-aligned workflows.","/products/smart-mudarabah","03"],
  ["CargoGuard","LOGISTICS","Real-time freight visibility, tracking, compliance and operational control.","/products/cargoguard","04"],
  ["XchangeCarbon","CLIMATE","Digital carbon marketplace, MRV and climate ecosystem infrastructure.","/products/xchangecarbon","05"],
  ["IFRS9 Impairment Solution","RISK & COMPLIANCE","ECL, PD, LGD and lifetime estimation for modern financial institutions.","/products/ifrs9","06"],
];

export default function ProductsShowcase(){
 return <section className="products-showcase">
  <div className="container">
   <div className="products-head">
    <div>
      <div className="eyebrow">MFSYS PRODUCTS</div>
      <h2>Purpose-built intelligence.<br/><span>Ready for the real world.</span></h2>
    </div>
    <div className="products-head-copy">
      <p>MFSYS products turn deep domain expertise into intelligent, scalable platforms. Each product is designed to solve a specific operational challenge while connecting into a broader digital ecosystem.</p>
      <Link className="text-link" href="/products">Explore the product portfolio →</Link>
    </div>
   </div>
   <div className="product-feature">
    <div className="product-feature-number">01</div>
    <div className="product-feature-copy">
      <span className="product-kicker">AI-NATIVE DIGITAL CORE BANKING</span>
      <h3>CiiHive</h3>
      <p>A cloud-native core banking platform designed to bring digital onboarding, lending, mobile banking, AI credit intelligence and IFRS 9 capabilities into one connected operating core.</p>
      <div className="product-tags"><span>Core Banking</span><span>AI Credit</span><span>Mobile Banking</span><span>IFRS 9</span></div>
      <Link className="btn btn-primary" href="/products/ciihive">Explore CiiHive →</Link>
    </div>
    <div className="product-feature-visual" aria-hidden="true">
      <div className="product-ring ring-one"/><div className="product-ring ring-two"/><div className="product-ring ring-three"/>
      <div className="product-node node-center"><b>CIH</b><small>INTELLIGENCE CORE</small></div>
      <div className="product-node node-a">AI</div><div className="product-node node-b">RISK</div><div className="product-node node-c">DATA</div><div className="product-node node-d">MOBILE</div>
      <div className="product-scan"/>
    </div>
   </div>
   <div className="product-grid">
    {productMeta.slice(1).map(([name,kicker,desc,href,num])=><Link className="product-card" href={href} key={name}>
      <span className="product-card-num">{num}</span><span className="product-kicker">{kicker}</span>
      <h3>{name}</h3><p>{desc}</p><span className="product-card-arrow">Explore product ↗</span>
    </Link>)}
   </div>
  </div>
 </section>;
}