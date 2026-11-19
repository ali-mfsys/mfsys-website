import type {Metadata} from "next";
import {notFound} from "next/navigation";
import SearchGuideExperience from "../../../../components/SearchGuideExperience";
import {searchGuides} from "../../../../lib/search-guides";
import {canonicalUrl} from "../../../../lib/seo";

export function generateStaticParams(){return searchGuides.map(g=>({slug:g.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 const g=searchGuides.find(x=>x.slug===slug);
 if(!g)return {};
 const path="/insights/guides/"+slug;
 return {title:g.metaTitle,description:g.description,alternates:{canonical:path},
  openGraph:{type:"article",title:g.metaTitle,description:g.description,url:canonicalUrl(path),images:["/opengraph-image"],publishedTime:"2026-11-18",modifiedTime:"2026-11-18"},
  twitter:{card:"summary_large_image"}};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const g=searchGuides.find(x=>x.slug===slug);
 if(!g)notFound();
 return <SearchGuideExperience guide={g}/>;
}
