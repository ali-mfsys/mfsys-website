import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {verifySession} from "../../../../lib/auth";
import {insightEntries} from "../../../../lib/insight-content";
import {buildInsightEntry,insightDraftSchema,validateInsightCollection} from "../../../../lib/insights-authoring";
import type {InsightEntry} from "../../../../lib/insight-content";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const REPO="ali-mfsys/mfsys-website";
const API="https://api.github.com/repos/"+REPO;
const CONTENT_PATH="content/insights/entries.json";

function noStore<T>(payload:T,status=200){
 return NextResponse.json(payload,{status,headers:{"Cache-Control":"private, no-store"}});
}
async function authorized(){
 return verifySession((await cookies()).get("mfsys_admin_session")?.value);
}

/** Only a short-lived, server-side token may propose changes. No browser token exposure. */
async function github<T>(path:string,method:"GET"|"POST"|"PUT",token:string,body?:unknown):Promise<T>{
 const res=await fetch(API+path,{
  method,cache:"no-store",signal:AbortSignal.timeout(20000),
  headers:{"Authorization":"Bearer "+token,"Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28",
   ...(body===undefined?{}:{"Content-Type":"application/json"})},
  ...(body===undefined?{}:{body:JSON.stringify(body)})
 });
 if(!res.ok)throw new Error("GitHub request failed with status "+res.status+" at "+method+" "+path.split("?")[0]);
 return await res.json() as T;
}

export async function GET(){
 const session=await authorized();
 if(!session)return noStore({error:"Unauthorized"},401);
 return noStore(insightEntries.map(x=>({
  id:x.id,slug:x.section+"/"+x.id,url:"/insights/"+x.section+"/"+x.id,
  title:x.title,type:x.section.toUpperCase().replace("-"," "),excerpt:x.summary,status:"PUBLISHED",date:x.date
 })));
}

export async function POST(request:Request){
 const session=await authorized();
 if(!session)return noStore({error:"Unauthorized"},401);
 if(!["SUPER_ADMIN","ADMIN","EDITOR","AUTHOR"].includes(session.role))return noStore({error:"Not allowed to propose content"},403);
 const origin=request.headers.get("origin");
 if(!origin||origin!==new URL(request.url).origin)return noStore({error:"Origin verification failed"},403);
 if(Number(request.headers.get("content-length")||0)>40000)return noStore({error:"Draft is too large"},413);
 const token=process.env.GITHUB_CONTENT_TOKEN;
 if(!token)return noStore({error:"Git publishing is not configured. An administrator must set the GITHUB_CONTENT_TOKEN secret with Contents: write and Pull requests: write access."},503);
 let json:unknown;
 try{json=await request.json()}catch{return noStore({error:"Invalid JSON body"},400)}
 const parsed=insightDraftSchema.safeParse(json);
 if(!parsed.success)return noStore({error:"Invalid editorial draft",fields:parsed.error.flatten().fieldErrors},400);
 let entry:InsightEntry;
 try{entry=buildInsightEntry(parsed.data)}catch(e){return noStore({error:e instanceof Error?e.message:"Invalid draft"},400)}

 try{
  // Read current published content from main, so this PR cannot silently drop
  // content introduced by another editor since the site was last deployed.
  const file=await github<{content:string;sha:string;encoding:string}>(
   "/contents/"+CONTENT_PATH+"?ref=main","GET",token);
  if(file.encoding!=="base64")throw new Error("Unexpected GitHub file encoding");
  const existing=JSON.parse(Buffer.from(file.content.replace(/\s/g,""),"base64").toString("utf8")) as InsightEntry[];
  validateInsightCollection(existing);
  if(existing.some(x=>x.id===entry.id))
   return noStore({error:"An insight with this URL slug already exists. Please choose a different title."},409);
  const next=[entry,...existing];
  validateInsightCollection(next);

  const base=await github<{object:{sha:string}}>("/git/ref/heads/main","GET",token);
  const branch="insights/draft-"+Date.now()+"-"+entry.id.slice(0,35);
  await github("/git/refs","POST",token,{ref:"refs/heads/"+branch,sha:base.object.sha});
  await github("/contents/"+CONTENT_PATH,"PUT",token,{
   message:"content: propose "+entry.section+" insight — "+entry.title.slice(0,70),
   branch,sha:file.sha,content:Buffer.from(JSON.stringify(next,null,2)+"\n","utf8").toString("base64")
  });
  const reviewNotes=[
   "## MFSYS editorial review",
   "**Draft submitted by:** "+session.email,
   "**Section:** "+entry.section,
   "**Proposed URL:** /insights/"+entry.section+"/"+entry.id,
   "**Source:** "+(entry.source||"Original MFSYS editorial draft"),
   "",
   "### Before merging",
   "- [ ] Verify facts, source date and that original publications are attributed.",
   "- [ ] Confirm MFSYS client/product claims and any permissions to publish.",
   "- [ ] Review content for originality, tone, confidential data and copyright.",
   "- [ ] Review headline, SEO intent, internal links, spelling and readability.",
   "- [ ] Confirm CI is green and no existing articles were removed.",
   "",
   "**Publication:** Merging this pull request makes this article public on the next successful production deployment. The source repository and pull request are publicly visible. No automatic merge or publication is permitted."
  ];
  const pr=await github<{number:number;html_url:string}>("/pulls","POST",token,{
   title:"Editorial draft: "+entry.title,head:branch,base:"main",draft:true,body:reviewNotes.join("\n")
  });
  return noStore({ok:true,publication:"AWAITING_EDITORIAL_APPROVAL",title:entry.title,slug:entry.id,
   section:entry.section,proposedUrl:"/insights/"+entry.section+"/"+entry.id,
   pullRequest:{number:pr.number,url:pr.html_url}},201);
 }catch(e){
  // Do not expose GitHub credentials, raw provider responses or file contents.
  console.error("Insights draft submission failed:",e instanceof Error?e.message:"Unknown error");
  return noStore({error:"Could not create the draft pull request. No website content was published. Contact the repository administrator."},502);
 }
}
