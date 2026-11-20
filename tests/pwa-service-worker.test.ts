import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import {runInNewContext} from "node:vm";
import {describe,expect,it,vi} from "vitest";

type SWHandler=(event:any)=>void;

function harness(){
 const script=readFileSync(resolve(process.cwd(),"public/sw.js"),"utf8");
 const handlers=new Map<string,SWHandler>();
 const fetchMock=vi.fn();
 const cacheAdd=vi.fn(async (_url:string)=>{});
 const cacheDelete=vi.fn(async (_key:string)=>true);
 const cacheMatch=vi.fn(async (_url:string)=>new Response("Connection interrupted",{status:200}));
 const cacheKeys=vi.fn(async()=>["another-application-cache","mfsys-pwa-v1","mfsys-pwa-v2"]);
 const self={
  location:{origin:"https://mfsys.net"},
  skipWaiting:vi.fn(async()=>{}),
  clients:{claim:vi.fn(async()=>{})},
  addEventListener:(kind:string,handler:SWHandler)=>handlers.set(kind,handler)
 };
 const caches={
  open:vi.fn(async()=>({add:cacheAdd})),
  keys:cacheKeys,
  delete:cacheDelete,
  match:cacheMatch
 };
 runInNewContext(script,{
  self,caches,fetch:fetchMock,URL,Response,
  setTimeout:(callback:()=>void)=>{callback();return 0;}
 });
 const visit=async(path:string,mode="navigate")=>{
  let responded:Promise<Response>|undefined;
  const event={
   request:{
    method:"GET",
    mode,
    url:"https://mfsys.net"+path,
    signal:{aborted:false}
   },
   respondWith:(response:Promise<Response>)=>{responded=response;}
  };
  handlers.get("fetch")!(event);
  return responded;
 };
 const activate=async()=>{
  let task:Promise<unknown>|undefined;
  handlers.get("activate")!({waitUntil:(p:Promise<unknown>)=>{task=p;}});
  await task;
 };
 const install=async()=>{
  let task:Promise<unknown>|undefined;
  handlers.get("install")!({waitUntil:(p:Promise<unknown>)=>{task=p;}});
  await task;
 };
 return {self,caches,fetchMock,cacheAdd,cacheDelete,cacheMatch,visit,activate,install};
}

describe("MFSYS PWA service worker",()=>{
 it("does not intercept Next.js assets, admin routes, APIs or RSC fetches",async()=>{
  const sw=harness();
  expect(await sw.visit("/admin/insights")).toBeUndefined();
  expect(await sw.visit("/api/admin/login")).toBeUndefined();
  expect(await sw.visit("/_next/static/chunks/app.js","no-cors")).toBeUndefined();
  expect(await sw.visit("/solutions?x=y","cors")).toBeUndefined();
  expect(sw.fetchMock).not.toHaveBeenCalled();
 });
 it("returns the real network response without caching HTML or HTTP errors",async()=>{
  const sw=harness();
  sw.fetchMock.mockResolvedValueOnce(new Response("temporary server error",{status:503}));
  const response=await (await sw.visit("/solutions"))!;
  expect(response.status).toBe(503);
  expect(sw.fetchMock).toHaveBeenCalledTimes(1);
  expect(sw.cacheMatch).not.toHaveBeenCalled();
 });
 it("retries a transient navigation network failure before showing fallback",async()=>{
  const sw=harness();
  sw.fetchMock.mockRejectedValueOnce(new TypeError("temporary connection drop"))
   .mockResolvedValueOnce(new Response("real MFSYS page",{status:200}));
  const response=await (await sw.visit("/about"))!;
  expect(await response.text()).toBe("real MFSYS page");
  expect(sw.fetchMock).toHaveBeenCalledTimes(2);
  expect(sw.cacheMatch).not.toHaveBeenCalled();
 });
 it("only uses offline fallback after both navigation requests reject",async()=>{
  const sw=harness();
  sw.fetchMock.mockRejectedValue(new TypeError("network unavailable"));
  const response=await (await sw.visit("/products"))!;
  expect(await response.text()).toBe("Connection interrupted");
  expect(sw.fetchMock).toHaveBeenCalledTimes(2);
  expect(sw.cacheMatch).toHaveBeenCalledWith("/offline");
 });
 it("removes only prior MFSYS PWA caches, not other applications' caches",async()=>{
  const sw=harness();
  await sw.activate();
  expect(sw.cacheDelete).toHaveBeenCalledTimes(1);
  expect(sw.cacheDelete).toHaveBeenCalledWith("mfsys-pwa-v1");
  expect(sw.self.clients.claim).toHaveBeenCalled();
 });
 it("pre-caches only the fallback page, not a potentially stale homepage",async()=>{
  const sw=harness();
  await sw.install();
  expect(sw.caches.open).toHaveBeenCalledWith("mfsys-pwa-v2");
  expect(sw.cacheAdd).toHaveBeenCalledTimes(1);
  expect(sw.cacheAdd).toHaveBeenCalledWith("/offline");
  expect(sw.self.skipWaiting).toHaveBeenCalled();
 });
});
