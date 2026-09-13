import Link from "next/link";

export default function FinalCTA(){
 return <section className="final-cta">
  <div className="final-cta-grid"/>
  <div className="container final-cta-inner">
   <div className="eyebrow">START A CONVERSATION</div>
   <h2>Ready to turn complexity<br/><span>into intelligence?</span></h2>
   <p>Tell us what you're trying to solve. We'll bring the domain expertise, technology and practical thinking to help shape what comes next.</p>
   <div className="final-actions"><Link className="btn btn-primary" href="/contact">Talk to MFSYS →</Link><Link className="btn final-secondary" href="/products">Explore our products</Link></div>
   <div className="final-signature"><span>PEOPLE</span><i/> <span>TECHNOLOGY</span><i/> <span>IMPACT</span></div>
  </div>
 </section>
}