import type {MetadataRoute} from "next";
import {SITE_URL} from "../lib/seo";
import {products} from "../lib/site-data";
import {industryPages} from "../lib/industry-content";
import {insightEntries,insightSections} from "../lib/insight-content";

/** Public, indexable destinations only; omit aliases, admin, offline and redirects. */
const staticPaths=[
 "/","/about","/global-presence","/partners","/people","/careers","/industries",
 "/ai-innovation","/insights","/products","/solutions","/contact","/case-studies",
 "/solutions/digital-banking","/solutions/islamic-finance",
 "/solutions/agentic-ai","/solutions/ai-transformation",
 "/solutions/mobile-banking","/solutions/collection-management-system",
 "/solutions/enterprise-software-development",
 "/products/ifrs16","/products/ciihive"
];
const aiPaths=["data-analytics","financial-inclusion","emerging-technologies","innovation-lab"].map(x=>"/ai-innovation/"+x);

export default function sitemap():MetadataRoute.Sitemap{
 const paths=new Set<string>([
  ...staticPaths,...products.map(([, , path])=>path),
  ...industryPages.map(x=>"/industries/"+x.slug),
  ...insightSections.map(x=>"/insights/"+x.slug),
  ...insightEntries.map(x=>"/insights/"+x.section+"/"+x.id),
  ...aiPaths
 ]);
 return [...paths].sort().map(path=>({
  url:SITE_URL+(path==="/"?"/":path),
  changeFrequency:path==="/insights/news"?"weekly":"monthly",
  priority:path==="/"?1:path.startsWith("/products/")||path.startsWith("/solutions/")||path.startsWith("/industries/")?0.8:0.65
 }));
}
