import type {Metadata} from "next";
import {notFound} from "next/navigation";
import IndustriesExperience from "../../../components/IndustriesExperience";
import {industryPages} from "../../../lib/industry-content";
import {breadcrumbSchema,canonicalUrl,safeJsonLd,SITE_URL} from "../../../lib/seo";

const seoBySlug:Record<string,{title:string;description:string}>={
 "microfinance-banking":{
  title:"Microfinance, SACCO & Credit Union Banking Software | MFSYS",
  description:"Core banking, digital lending and financial technology for microfinance banks, MFIs, SACCOs, credit unions, NBFCs, cooperative banks and fintechs."
 },
 "islamic-finance":{
  title:"Islamic Banking Software, Mudarabah & Shariah Finance | MFSYS",
  description:"Explore ShariahOne, Smart Mudarabah and MFSYS Islamic finance technology for Islamic banking products, contracts, governance and profit-sharing workflows."
 },
 "agriculture-rural-development":{
  title:"Agriculture, Cooperative & Rural Finance Software | MFSYS",
  description:"Technology for farmer cooperatives, rural financial services, savings groups, revolving funds, inventory management and development programme reporting."
 },
 "climate-carbon":{
  title:"Carbon Market & Climate Finance Technology | MFSYS",
  description:"Digital climate platforms for carbon project registration, monitoring, reporting, verification and transparent marketplace workflows."
 },
 "logistics-supply-chain":{
  title:"Logistics, Freight Tracking & Supply Chain Software | MFSYS",
  description:"Freight operations, driver identity verification, GPS shipment tracking, proof of delivery and logistics integration software from MFSYS."
 },
 "government-development":{
  title:"Government Digital Transformation & Development Systems | MFSYS",
  description:"Digital public services, system modernization, enterprise architecture, programme information systems and implementation advisory from MFSYS."
 }
};
export function generateStaticParams(){return industryPages.map(x=>({slug:x.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 const item=industryPages.find(x=>x.slug===slug);if(!item)return {};
 const seo=seoBySlug[slug]||{title:item.name+" | MFSYS",description:item.lead};
 const path="/industries/"+slug;
 return {title:seo.title,description:seo.description,alternates:{canonical:path},
  openGraph:{type:"website",title:seo.title,description:seo.description,url:canonicalUrl(path),images:["/opengraph-image"]},
  twitter:{card:"summary_large_image"}};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const item=industryPages.find(x=>x.slug===slug);if(!item)notFound();
 const path="/industries/"+slug;
 const schema={"@context":"https://schema.org","@graph":[
  {"@type":"CollectionPage","@id":canonicalUrl(path)+"#webpage",name:seoBySlug[slug]?.title||item.name,
   url:canonicalUrl(path),description:seoBySlug[slug]?.description||item.lead,
   isPartOf:{"@id":SITE_URL+"/#website"},publisher:{"@id":SITE_URL+"/#organization"}},
  breadcrumbSchema([{name:"Home",path:"/"},{name:"Industries",path:"/industries"},{name:item.name,path}])
 ]};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(schema)}}/><IndustriesExperience slug={slug}/></>;
}
