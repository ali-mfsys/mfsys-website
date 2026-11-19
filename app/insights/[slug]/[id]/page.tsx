import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {insightEntries,insightSections} from "../../../../lib/insight-content";
import {canonicalUrl,safeJsonLd,SITE_URL} from "../../../../lib/seo";
import s from "../../../../components/InsightsExperience.module.css";

export function generateStaticParams(){return insightEntries.map(x=>({slug:x.section,id:x.id}));}

export async function generateMetadata({params}:{params:Promise<{slug:string;id:string}>}):Promise<Metadata>{
 const {slug,id}=await params;
 const entry=insightEntries.find(x=>x.section===slug&&x.id===id);
 if(!entry)return {};
 const path="/insights/"+slug+"/"+id;
 return {title:entry.title+" | MFSYS Insights",description:entry.summary,
  alternates:{canonical:path},
  openGraph:{type:"article",title:entry.title,description:entry.summary,url:canonicalUrl(path),images:["/opengraph-image"]},
  twitter:{card:"summary_large_image"}};
}

function EditorialBody({body}:{body:string}){
 const blocks=body.split(/\r?\n\s*\r?\n/g).map(x=>x.trim()).filter(Boolean);
 return <div className={s.editorialBody}>
  {blocks.map((part,i)=>{
   if(/^#{2,3}\s/.test(part)){
    const text=part.replace(/^#{2,3}\s+/,"");
    return <h2 key={i}>{text}</h2>;
   }
   const lines=part.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
   if(lines.length&&lines.every(line=>/^[-*]\s+/.test(line)))
    return <ul key={i}>{lines.map((line,j)=><li key={j}>{line.replace(/^[-*]\s+/,"")}</li>)}</ul>;
   return <p key={i}>{part}</p>;
  })}
 </div>;
}

export default async function Page({params}:{params:Promise<{slug:string;id:string}>}){
 const {slug,id}=await params;
 const x=insightEntries.find(x=>x.section===slug&&x.id===id);
 if(!x)notFound();
 const group=insightSections.find(y=>y.slug===slug)!;
 const path="/insights/"+slug+"/"+id;
 const article={
  "@context":"https://schema.org","@type":"Article",
  headline:x.title,description:x.summary,
  mainEntityOfPage:canonicalUrl(path),inLanguage:"en",
  author:{"@id":SITE_URL+"/#organization"},
  publisher:{"@id":SITE_URL+"/#organization"},
  ...(x.publishedAt?{datePublished:x.publishedAt}:{}),
  ...(x.updatedAt?{dateModified:x.updatedAt}:{})
 };
 return <main id="main" className={s.page}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(article)}}/>
  <section className={s.articleHero}><div className={s.articleWrap}>
   <Link href={"/insights/"+slug} className={s.back}>← {group.name}</Link>
   <span className={s.eyebrow}>{x.kind.toUpperCase()} / {x.category.toUpperCase()}</span>
   <h1>{x.title}</h1>
   <p>{x.summary}</p>
   <div className={s.articleMeta}>{x.date} <span>·</span> {x.reading} <span>·</span> {x.kind}</div>
  </div></section>
  <section className={s.articleBody}><div className={s.articleWrap}>
   <div className={s.takeaway}><span>THE KEY TAKEAWAY</span><h2>{x.takeaway}</h2></div>
   {x.body?<EditorialBody body={x.body}/>:
    <><span className={s.kicker}>WHAT FINANCIAL LEADERS SHOULD CONSIDER</span>
     <div className={s.articlePoints}>{x.points.map((point,i)=><article key={point}>
      <span>{String(i+1).padStart(2,"0")}</span><p>{point}</p>
     </article>)}</div></>}
   {x.source&&<div className={s.sourceBox}>
    <strong>Original source & further reading</strong>
    <p>This MFSYS summary interprets an external publication. Read the publisher's full work for methodology, qualifications and detailed evidence.</p>
    <a href={x.source} target="_blank" rel="noopener noreferrer">{x.sourceName} ↗</a>
   </div>}
   {x.kind==="MFSYS implementation"&&<div className={s.sourceBox}>
    <strong>Project experience note</strong><p>This is a scope-and-lessons profile, not a quantified customer testimonial. No unverified commercial or performance results are claimed. Client-approved metrics and quotations can be added after validation.</p>
   </div>}
   {x.kind==="MFSYS perspective"&&<div className={s.sourceBox}>
    <strong>Editorial perspective</strong><p>This is an original MFSYS viewpoint, not a commissioned research study or a claim of measured customer outcomes. Recommendations should be adapted to each institution's requirements and regulatory context.</p>
   </div>}
   <div className={s.articleNext}>
    <h2>Turn these insights into a practical roadmap.</h2>
    <p>MFSYS works with financial institutions on core banking, digital lending, integration and AI-enabled financial technology.</p>
    <Link href="/contact" className={s.cta}>Discuss your priorities ↗</Link>
    <Link href={"/insights/"+slug} className={s.more}>More {group.name} →</Link>
   </div>
  </div></section>
 </main>;
}
