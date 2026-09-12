import type {MetadataRoute} from "next";
import {products,solutions} from "../lib/site-data";

const base="https://mfsys.ca";

export default function sitemap():MetadataRoute.Sitemap{
  const now=new Date();
  const routes=["/","/about","/industries","/ai-innovation","/insights","/products","/solutions","/contact"];
  return [
    ...routes.map((path)=>({url:`${base}${path}`,lastModified:now,changeFrequency:path==="/"?"weekly":"monthly" as const,priority:path==="/"?1:.7})),
    ...products.map(([, ,path])=>({url:`${base}${path}`,lastModified:now,changeFrequency:"monthly" as const,priority:.7})),
    ...solutions.map(([, ,path])=>({url:`${base}${path}`,lastModified:now,changeFrequency:"monthly" as const,priority:.65}))
  ];
}
