import {z} from "zod";
import type {InsightEntry,InsightSlug} from "./insight-content";

/** One format is used by the admin form, GitHub PR drafts and public Insights pages. */
export const insightDraftSchema=z.object({
 title:z.string().trim().min(12).max(220),
 type:z.enum(["RESEARCH","CASE STUDY","ARTICLE","REPORT","NEWS"]),
 category:z.string().trim().min(3).max(90),
 excerpt:z.string().trim().min(40).max(500),
 takeaway:z.string().trim().min(15).max(270),
 body:z.string().trim().min(120).max(30000),
 sourceUrl:z.string().trim().max(1800).optional().default(""),
 sourceName:z.string().trim().max(150).optional().default("")
}).superRefine((input,ctx)=>{
 const needsSource=["RESEARCH","REPORT","NEWS"].includes(input.type);
 if(needsSource&&!input.sourceUrl){
  ctx.addIssue({code:"custom",path:["sourceUrl"],message:"News, research and report drafts require an original source URL."});
 }
 if(input.sourceUrl){
  try{const url=new URL(input.sourceUrl);if(url.protocol!=="https:"||!url.hostname.includes("."))throw Error("Invalid source");
  }catch{ctx.addIssue({code:"custom",path:["sourceUrl"],message:"Use a valid HTTPS source URL."});}
  if(!input.sourceName)ctx.addIssue({code:"custom",path:["sourceName"],message:"Provide the original publisher name."});
 }
});
export type InsightDraftInput=z.input<typeof insightDraftSchema>;
const sectionFor:Record<z.infer<typeof insightDraftSchema>["type"],InsightSlug>={
 RESEARCH:"research","CASE STUDY":"case-studies",ARTICLE:"articles",REPORT:"reports",NEWS:"news"
};
const kindFor:Record<z.infer<typeof insightDraftSchema>["type"],InsightEntry["kind"]>={
 RESEARCH:"External research","CASE STUDY":"MFSYS implementation",ARTICLE:"MFSYS perspective",
 REPORT:"External research",NEWS:"Industry update"
};
export function insightSlug(title:string){
 return title.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase()
  .replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,78).replace(/-$/,"");
}
/** Pure function: easier to test and share with future scheduled agent jobs. */
export function buildInsightEntry(input:InsightDraftInput,now=new Date()):InsightEntry{
 const values=insightDraftSchema.parse(input);
 const id=insightSlug(values.title);
 if(id.length<4)throw Error("Title must generate a unique URL slug with at least four Latin letters or digits.");
 const words=values.body.split(/\s+/).filter(Boolean).length;
 const points=values.body.split(/\r?\n/).filter(line=>/^\s*[-*]\s+\S/.test(line))
  .map(line=>line.replace(/^\s*[-*]\s+/,"").trim()).slice(0,9);
 const date=new Intl.DateTimeFormat("en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(now);
 return {
  id,section:sectionFor[values.type],title:values.title,category:values.category,
  date,reading:Math.max(1,Math.ceil(words/220))+" min read",kind:kindFor[values.type],
  summary:values.excerpt,takeaway:values.takeaway,points,body:values.body,
  ...(values.sourceUrl?{source:values.sourceUrl,sourceName:values.sourceName}:{}),
 };
}
export function validateInsightCollection(rows:InsightEntry[]){
 const paths=new Set<string>(),ids=new Set<string>();
 for(const row of rows){
  if(!row.id||!row.section||!row.title||!row.summary||!row.takeaway||!Array.isArray(row.points))throw Error("Insight content is incomplete.");
  if(!/^[a-z0-9-]+$/.test(row.id))throw Error("An Insight has an invalid slug.");
  const path=row.section+"/"+row.id;
  if(paths.has(path)||ids.has(row.id))throw Error("An Insight URL or ID is duplicated: "+path);
  paths.add(path);ids.add(row.id);
 }
 return true;
}
