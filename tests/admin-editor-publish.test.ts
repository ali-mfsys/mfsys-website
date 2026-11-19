import {afterEach,describe,expect,it,vi} from "vitest";
import {insightEntries} from "../lib/insight-content";

vi.mock("next/headers",()=>({
 cookies:async()=>({get:()=>({value:"mock-admin-session"})})
}));
vi.mock("../lib/auth",()=>({
 verifySession:()=>({email:"editor@example.org",role:"EDITOR",exp:Date.now()+3600000})
}));

import {POST} from "../app/api/admin/insights/route";

const draft={
 title:"Digital Loan Origination for Cooperative Financial Institutions",
 type:"ARTICLE",
 category:"Credit Unions & SACCOs",
 excerpt:"An original guide explaining credit application handoffs and approval workflow patterns at cooperative lenders.",
 takeaway:"Build lending software around real customer and compliance workflows.",
 body:"Loan officers and branch staff need traceable borrower applications with practical approval responsibilities.\n\n## Loan workflows and approvals\n\nEach institution should document eligibility criteria, identity evidence, credit decisions, exceptional cases and the handoff to the financial system of record. Controlled processes protect both the institution and the borrower.",
 sourceUrl:"",
 sourceName:""
};

const response=(body:unknown,status=200)=>new Response(JSON.stringify(body),{
 status,headers:{"Content-Type":"application/json"}
});
const request=(body:unknown,origin="https://mfsys.net")=>new Request("https://mfsys.net/api/admin/insights",{
 method:"POST",headers:{"Origin":origin,"Content-Type":"application/json"},body:JSON.stringify(body)
});

afterEach(()=>{vi.unstubAllGlobals();vi.unstubAllEnvs();});

describe("admin Git-backed editorial publishing",()=>{
 it("fails closed if the publishing token is missing",async()=>{
  vi.stubEnv("GITHUB_CONTENT_TOKEN","");
  const r=await POST(request(draft));
  expect(r.status).toBe(503);
  expect((await r.json()).error).toContain("not configured");
 });
 it("rejects a cross-origin draft without contacting GitHub",async()=>{
  vi.stubEnv("GITHUB_CONTENT_TOKEN","test-token");
  const spy=vi.fn();
  vi.stubGlobal("fetch",spy);
  const r=await POST(request(draft,"https://malicious.example"));
  expect(r.status).toBe(403);
  expect(spy).not.toHaveBeenCalled();
 });
 it("creates a reviewable draft PR while preserving the published content",async()=>{
  vi.stubEnv("GITHUB_CONTENT_TOKEN","test-token");
  const calls:{method:string;path:string;body?:any}[]=[];
  const fetchMock=vi.fn(async(url:string,init?:RequestInit)=>{
   const path=new URL(url).pathname;
   const method=init?.method||"GET";
   const body=init?.body?JSON.parse(String(init.body)):undefined;
   calls.push({method,path,body});
   if(method==="GET"&&path.endsWith("/contents/content/insights/entries.json"))
    return response({content:Buffer.from(JSON.stringify(insightEntries)).toString("base64"),encoding:"base64",sha:"abc-source-blob"});
   if(method==="GET"&&path.endsWith("/git/ref/heads/main"))
    return response({object:{sha:"abc-commit-sha"}});
   if(method==="POST"&&path.endsWith("/git/refs"))return response({ref:body.ref});
   if(method==="PUT"&&path.endsWith("/contents/content/insights/entries.json"))return response({content:{sha:"new-blob"}});
   if(method==="POST"&&path.endsWith("/pulls"))
    return response({number:25,html_url:"https://github.com/ali-mfsys/mfsys-website/pull/25"});
   throw Error("Unexpected GitHub call: "+method+" "+path);
  });
  vi.stubGlobal("fetch",fetchMock);

  const res=await POST(request(draft));
  expect(res.status).toBe(201);
  const body=await res.json();
  expect(body.publication).toBe("AWAITING_EDITORIAL_APPROVAL");
  expect(body.pullRequest.number).toBe(25);
  const put=calls.find(x=>x.method==="PUT")!;
  const contents=JSON.parse(Buffer.from(put.body.content,"base64").toString("utf8"));
  expect(contents).toHaveLength(insightEntries.length+1);
  expect(contents[0].section).toBe("articles");
  expect(contents.slice(1).map((x:any)=>x.id)).toEqual(insightEntries.map(x=>x.id));
  const pr=calls.find(x=>x.path.endsWith("/pulls"))!;
  expect(pr.body.draft).toBe(true);
  expect(pr.body.base).toBe("main");
  expect(calls.every(x=>!x.path.includes("/deploy"))).toBe(true);
 });
});
