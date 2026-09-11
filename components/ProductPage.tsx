import Link from "next/link";
import {Product} from "../lib/product-data";
export default function ProductPage({product}:{product:Product}){
 return <main id="main">
  <section className="product-hero"><div className="container product-hero-inner"><div className="eyebrow">{product.eyebrow}</div><h1>{product.name}</h1><p className="product-tagline">{product.tagline}</p><p className="product-description">{product.description}</p><Link className="btn btn-primary" href="/contact">Discuss this solution →</Link></div></section>
  <section className="container section"><div className="eyebrow">CAPABILITIES</div><h2>Built for the work that matters.</h2><div className="cap-grid">{product.capabilities.map(x=><div className="cap" key={x}><span>+</span><strong>{x}</strong></div>)}</div></section>
  <section className="product-dark"><div className="container section"><div className="eyebrow">BUSINESS OUTCOMES</div><h2>Technology that creates measurable value.</h2><div className="outcome-grid">{product.outcomes.map(x=><div key={x}><strong>{x}</strong></div>)}</div></div></section>
  <section className="container section"><div className="two-col"><div><div className="eyebrow">ARCHITECTURE</div><h2>Enterprise-ready by design.</h2><p>Designed to integrate with existing technology ecosystems while providing a secure foundation for future growth.</p></div><div className="arch-list">{product.architecture.map(x=><div className="arch-item" key={x}>{x}<span>↗</span></div>)}</div></div></section>
  <section className="container section"><div className="cta-panel"><div className="eyebrow">MFSYS TECHNOLOGIES</div><h2>Ready to move from digital to intelligent?</h2><Link className="btn" href="/contact">Talk to our team →</Link></div></section>
 </main>
}