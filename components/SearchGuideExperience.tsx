import Link from "next/link";
import type {SearchGuide} from "../lib/search-guides";
import {breadcrumbSchema,canonicalUrl,SITE_URL,safeJsonLd} from "../lib/seo";
import s from "./SearchGuideExperience.module.css";

export default function SearchGuideExperience({guide:g}:{guide:SearchGuide}){
 const path="/insights/guides/"+g.slug;
 const schema={"@context":"https://schema.org","@graph":[
  {"@type":"Article","@id":canonicalUrl(path)+"#article",headline:g.title,
    description:g.description,mainEntityOfPage:canonicalUrl(path),
    datePublished:"2026-11-18",dateModified:"2026-11-18",
    author:{"@id":SITE_URL+"/#organization"},publisher:{"@id":SITE_URL+"/#organization"},
    inLanguage:"en",about:g.kicker.replace(" / "," — ")},
  breadcrumbSchema([{name:"Home",path:"/"},{name:"Insights",path:"/insights"},{name:"Guides",path:"/insights"},{name:g.title,path}])
 ]};
 return <main id="main" className={s.page}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(schema)}}/>
  <section className={s.hero}><div className={s.wrap}>
   <nav aria-label="Breadcrumb" className={s.crumb}><Link href="/">MFSYS</Link><span aria-hidden="true">/</span><Link href="/insights">Insights</Link><span aria-hidden="true">/</span><span>Expert guide</span></nav>
   <div className={s.heroGrid}>
    <div><span className={s.kicker}>{g.kicker}</span><h1>{g.title}</h1><p>{g.lead}</p>
      <div className={s.heroActions}><a href="#guide-explained">Explore the guide <span aria-hidden="true">↓</span></a><Link href="/contact">Discuss with MFSYS <span aria-hidden="true">↗</span></Link></div>
    </div>
    <div className={s.heroVisual} aria-label="Illustrative connected enterprise technology architecture">
      <div className={s.diagramLabel}>A CONNECTED VIEW</div>
      <div className={s.visualNode}><span>01</span><strong>People & institutions</strong><small>Customers · Teams · Partners</small></div>
      <div className={s.connector}><span aria-hidden="true">↓</span></div>
      <div className={s.visualNode+" "+s.visualMiddle}><span>02</span><strong>Products & processes</strong><small>Policy · Technology · Controls</small></div>
      <div className={s.connector}><span aria-hidden="true">↓</span></div>
      <div className={s.visualNode}><span>03</span><strong>Information & outcomes</strong><small>Accounting · Evidence · Insight</small></div>
      <small className={s.diagramNote}>Illustrative information flow, not a product screenshot</small>
    </div>
   </div>
  </div></section>

  <section className={s.section} id="guide-explained"><div className={s.wrap+" "+s.introGrid}>
   <div><span className={s.kicker}>THE BIG PICTURE</span><h2>What institutions need to understand.</h2><div className={s.quicklinks}><a href="#concepts">Key concepts ↓</a><a href="#workflow">How it works ↓</a><a href="#questions">Common questions ↓</a></div></div>
   <div className={s.prose}>{g.introduction.map(x=><p key={x}>{x}</p>)}</div>
  </div></section>

  <section className={s.section+" "+s.soft} id="concepts"><div className={s.wrap}>
   <header className={s.head}><span className={s.kicker}>KEY DISTINCTIONS</span><h2>Similar words. Different responsibilities.</h2><p>Understanding the underlying model helps avoid costly mistakes in product selection, integration and governance.</p></header>
   <div className={s.distinctions}>{g.distinctions.map((x,i)=><article key={x.title}><span className={s.index}>{String(i+1).padStart(2,"0")}</span><h3>{x.title}</h3><p>{x.body}</p></article>)}</div>
  </div></section>

  <section className={s.section+" "+s.dark} id="workflow"><div className={s.wrap}>
   <header className={s.head}><span className={s.kicker}>PROCESS MAP</span><h2>A clearer picture of the complete journey.</h2><p>The steps below represent a conceptual operating model and should be adapted to an institution's approved policies.</p></header>
   <div className={s.steps}>{g.steps.map((step,i)=><article key={step.title}><span className={s.number}>{String(i+1).padStart(2,"0")}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
  </div></section>

  <section className={s.section} id="capabilities"><div className={s.wrap}>
   <header className={s.head}><span className={s.kicker}>CAPABILITY GUIDE</span><h2>What an effective solution needs to address.</h2></header>
   <div className={s.capabilities}>{g.capabilities.map(x=><article key={x.title}><div className={s.capIcon} aria-hidden="true">◆</div><div><h3>{x.title}</h3><p>{x.body}</p></div></article>)}</div>
  </div></section>

  <section className={s.section+" "+s.soft} id="evaluation"><div className={s.wrap}>
   <header className={s.head}><span className={s.kicker}>EVALUATION CHECKLIST</span><h2>Questions to settle before implementation.</h2><p>These considerations turn a broad technology ambition into something teams can design, evaluate and implement.</p></header>
   <div className={s.checks}>{g.checks.map((x,i)=><article key={x.title}><span>{String(i+1).padStart(2,"0")}</span><h3>{x.title}</h3><p>{x.body}</p></article>)}</div>
  </div></section>

  <section className={s.section} id="questions"><div className={s.wrap+" "+s.faqGrid}>
   <div><span className={s.kicker}>COMMON QUESTIONS</span><h2>Answers that help the next decision.</h2></div>
   <div>{g.faqs.map(q=><details key={q.q} className={s.faq}><summary>{q.q}</summary><p>{q.a}</p></details>)}</div>
  </div></section>

  <section className={s.section+" "+s.soft}><div className={s.wrap+" "+s.relatedGrid}>
   <div><span className={s.kicker}>EXPLORE MFSYS</span><h2>From understanding to implementation.</h2><p className={s.copy}>MFSYS works on the products, integration and operating processes behind these questions. Explore the relevant platforms and confirm the scope for your institution.</p></div>
   <div className={s.related}>{g.related.map(x=><Link key={x.href} href={x.href}><strong>{x.name}</strong><span>{x.body}</span><b aria-hidden="true">↗</b></Link>)}</div>
  </div></section>

  <section className={s.references}><div className={s.wrap+" "+s.refGrid}>
   <div><h2>Further reading & important limitations</h2><p>{g.caution}</p></div>
   <div><h3>References and background</h3><ul>{g.sources.map(x=><li key={x.url}><a href={x.url} target="_blank" rel="noopener noreferrer">{x.name} <span aria-hidden="true">↗</span></a></li>)}</ul></div>
  </div></section>
  <section className={s.cta}><div className={s.wrap+" "+s.ctaInner}><div><span className={s.kicker}>BUILDING SMARTER FINANCIAL FUTURES</span><h2>Have a specific institutional challenge?</h2><p>Talk to MFSYS about the systems, approvals, people and integrations behind your plans.</p></div><Link href="/contact">Speak with our team ↗</Link></div></section>
 </main>
}
