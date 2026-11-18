/** Canonical public identity used across the MFSYS Next.js application. */
export const SITE_URL="https://mfsys.net" as const;
export const seoDefaults={
 siteName:"MFSYS Technologies",
 defaultTitle:"Core Banking, Microfinance & Digital Financial Solutions | MFSYS",
 defaultDescription:"Core banking, microfinance, digital banking, loan origination, Islamic finance and AI integration from MFSYS Technologies.",
 twitterCard:"summary_large_image"
};
export const canonicalUrl=(path:string)=>SITE_URL+(path.startsWith("/")?path:"/"+path);
export function jsonLd(type:string,name:string,url:string,description?:string){return{"@context":"https://schema.org","@type":type,name,url,description};}
/** Escape HTML-significant characters before writing a trusted JSON-LD object to a script element. */
export function safeJsonLd(data:unknown){return JSON.stringify(data).replace(/</g,"\\u003c");}
export function breadcrumbSchema(entries:ReadonlyArray<{name:string;path:string}>){
 return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:entries.map((x,i)=>({"@type":"ListItem",position:i+1,name:x.name,item:canonicalUrl(x.path)}))};
}
export function serviceSchema(details:{name:string;description:string;path:string;audience?:readonly string[]}){
 return {"@context":"https://schema.org","@type":"Service","@id":canonicalUrl(details.path)+"#service",
 name:details.name,description:details.description,url:canonicalUrl(details.path),
 provider:{"@id":SITE_URL+"/#organization"},serviceType:details.name,
 ...(details.audience?.length?{audience:{"@type":"BusinessAudience",audienceType:details.audience.join(", ")}}:{})};
}
export function softwareSchema(details:{name:string;description:string;path:string;category?:"FinanceApplication"|"BusinessApplication"}){
 return {"@context":"https://schema.org","@type":"SoftwareApplication","@id":canonicalUrl(details.path)+"#software",
 name:details.name,description:details.description,url:canonicalUrl(details.path),
 applicationCategory:details.category??"FinanceApplication",
 publisher:{"@id":SITE_URL+"/#organization"}};
}
