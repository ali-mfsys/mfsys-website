import Link from "next/link";
import s from "./SolutionSeoLanding.module.css";
import {breadcrumbSchema,serviceSchema,safeJsonLd} from "../lib/seo";

export type SeoSolution={
 slug:string;eyebrow:string;title:string;subtitle:string;audience:string[];
 introTitle:string;intro:string[];whatTitle:string;
 capabilities:ReadonlyArray<{title:string;text:string}>;
 steps:ReadonlyArray<{title:string;text:string}>;
 outcomes:ReadonlyArray<{title:string;text:string}>;
 questions:ReadonlyArray<{question:string;answer:string}>;
 related:ReadonlyArray<{name:string;href:string;description:string}>;
 scopeNote:string;
};
export default function SolutionSeoLanding({data:d}:{data:SeoSolution}){
 const schema={"@context":"https://schema.org","@graph":[serviceSchema({
  name:d.title,description:d.subtitle,path:"/solutions/"+d.slug,audience:d.audience
 }),breadcrumbSchema([{name:"Home",path:"/"},{name:"Solutions",path:"/solutions"},{name:d.title,path:"/solutions/"+d.slug}])]};
 return <main id="main" className={s.page}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(schema)}}/>
  <section className={s.hero}>
   <div className={s.wrap}>
    <nav className={s.breadcrumb} aria-label="Breadcrumb"><Link href="/">MFSYS</Link><span aria-hidden="true">/</span><Link href="/solutions">Solutions</Link><span aria-hidden="true">/</span><span>{d.title}</span></nav>
    <div className={s.heroGrid}>
     <div><span className={s.eyebrow}>{d.eyebrow}</span><h1>{d.title}</h1><p>{d.subtitle}</p>
      <div className={s.buttons}><Link href="/contact" className={s.primary}>Discuss your requirements <span aria-hidden="true">↗</span></Link><a href="#capabilities" className={s.secondary}>Explore capabilities <span aria-hidden="true">↓</span></a></div>
     </div>
     <aside className={s.audience}><span className={s.eyebrow}>DESIGNED AROUND YOUR INSTITUTION</span><h2>Built for real operations.</h2><p>Start with the workflows your people rely on. Integrate the systems you already have. Introduce change at a pace your team can support.</p><div>{d.audience.map(x=><span key={x}>{x}</span>)}</div></aside>
    </div>
   </div>
  </section>
  <section className={s.section}>
   <div className={s.wrap+" "+s.overview}><div><span className={s.eyebrow}>THE OPPORTUNITY</span><h2>{d.introTitle}</h2></div><div>{d.intro.map(x=><p key={x}>{x}</p>)}</div></div>
  </section>
  <section className={s.section+" "+s.soft} id="capabilities">
   <div className={s.wrap}><div className={s.sectionHeader}><span className={s.eyebrow}>CORE CAPABILITIES</span><h2>{d.whatTitle}</h2><p>Each capability should be configured to the institution's policies, customer journeys, operating model and regulatory environment.</p></div><div className={s.grid}>{d.capabilities.map((x,i)=><article key={x.title} className={s.capability}><span className={s.number}>{String(i+1).padStart(2,"0")}</span><h3>{x.title}</h3><p>{x.text}</p></article>)}</div></div>
  </section>
  <section className={s.section+" "+s.workflow}>
   <div className={s.wrap}><div className={s.sectionHeader}><span className={s.eyebrow}>HOW THE WORKFLOWS CONNECT</span><h2>From the first step to a complete record.</h2><p>Keep the hand-offs between teams visible, controlled and easy to review.</p></div><div className={s.steps}>{d.steps.map((x,i)=><article key={x.title}><span>{String(i+1).padStart(2,"0")}</span><h3>{x.title}</h3><p>{x.text}</p></article>)}</div></div>
  </section>
  <section className={s.section}>
   <div className={s.wrap}><div className={s.sectionHeader}><span className={s.eyebrow}>BUSINESS VALUE</span><h2>What better systems make possible.</h2></div><div className={s.outcomes}>{d.outcomes.map(x=><article key={x.title}><h3>{x.title}</h3><p>{x.text}</p></article>)}</div></div>
  </section>
  <section className={s.section+" "+s.soft}>
   <div className={s.wrap+" "+s.relatedLayout}><div><span className={s.eyebrow}>THE CONNECTED MFSYS ECOSYSTEM</span><h2>Works better together.</h2><p>Explore related MFSYS platforms and services that may support your implementation. Actual modules and integrations depend on the agreed project scope.</p></div><div className={s.related}>{d.related.map(x=><Link key={x.href} href={x.href}><strong>{x.name}</strong><span>{x.description}</span><b aria-hidden="true">↗</b></Link>)}</div></div>
  </section>
  <section className={s.section}>
   <div className={s.wrap+" "+s.faqLayout}><div><span className={s.eyebrow}>COMMON QUESTIONS</span><h2>Useful answers before you begin.</h2><p className={s.scope}>{d.scopeNote}</p></div><div className={s.faq}>{d.questions.map(q=><details key={q.question}><summary>{q.question}</summary><p>{q.answer}</p></details>)}</div></div>
  </section>
  <section className={s.cta}><div className={s.wrap+" "+s.ctaRow}><div><span className={s.eyebrow}>LET'S TALK</span><h2>Tell us what needs to work better.</h2><p>We can review your existing environment, priority workflows and integration needs, then recommend a practical approach.</p></div><Link href="/contact">Speak with MFSYS <span aria-hidden="true">↗</span></Link></div></section>
 </main>;
}
