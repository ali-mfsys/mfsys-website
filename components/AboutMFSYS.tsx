import Link from "next/link";

export default function AboutMFSYS(){
 const pillars=[
  ["01","PEOPLE","Deep domain expertise","Banking, microfinance, development finance and technology leadership shape every solution we build."],
  ["02","TECHNOLOGY","Engineering for scale","Cloud-native, API-first and AI-enabled platforms designed for reliability, security and continuous evolution."],
  ["03","IMPACT","Technology with purpose","We build systems that expand access, strengthen institutions and make complex ecosystems more connected."],
 ];
 return <section className="about-mfsys">
  <div className="container">
   <div className="about-intro">
    <div><div className="eyebrow">ABOUT MFSYS</div><h2>Technology built from <span>experience.</span><br/>Intelligence built for impact.</h2></div>
    <div><p>MFSYS is a technology-driven social enterprise combining more than two decades of experience in enterprise software, financial services, digital transformation and emerging technologies.</p><p>We work with institutions operating in complex markets where technology must be practical, resilient and capable of creating measurable value.</p><Link className="text-link" href="/about">Discover MFSYS →</Link></div>
   </div>
   <div className="about-pillars">
    {pillars.map(x=><article key={x[0]}><span>{x[0]}</span><div className="about-pillar-line"/><small>{x[1]}</small><h3>{x[2]}</h3><p>{x[3]}</p></article>)}
   </div>
   <div className="about-bottom">
    <div className="about-quote">“<span>People</span> + <span>Technology</span> = a more inclusive tomorrow.”</div>
    <div className="about-metrics"><div><strong>23+</strong><small>years of technology experience</small></div><div><strong>40%</strong><small>female workforce</small></div><div><strong>12+</strong><small>countries reached</small></div></div>
   </div>
  </div>
 </section>;
}