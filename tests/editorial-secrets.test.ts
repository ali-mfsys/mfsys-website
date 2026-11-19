import {beforeEach,afterEach,describe,expect,it,vi} from "vitest";
const workerBindings:{current:Record<string,string>|null}={current:null};
vi.mock("@opennextjs/cloudflare",()=>({
 getCloudflareContext:()=>{
  if(!workerBindings.current)throw new Error("No Cloudflare worker context in Node.js");
  return {env:workerBindings.current};
 }
}));
import {getEditorialSecret,missingEditorialSecrets} from "../lib/editorial-secrets";
beforeEach(()=>{workerBindings.current=null;});
afterEach(()=>{workerBindings.current=null;vi.unstubAllEnvs();});

describe("Cloudflare Content Studio runtime bindings",()=>{
 it("prefers runtime Cloudflare secrets over build-time process environment",()=>{
  vi.stubEnv("AUTH_SECRET","build-placeholder");
  workerBindings.current={AUTH_SECRET:"actual-deployment-secret"};
  expect(getEditorialSecret("AUTH_SECRET")).toBe("actual-deployment-secret");
  expect(missingEditorialSecrets(["AUTH_SECRET"])).toEqual([]);
 });
 it("preserves local Node.js development and test fallback",()=>{
  vi.stubEnv("ADMIN_EMAIL","local-admin@example.org");
  expect(getEditorialSecret("ADMIN_EMAIL")).toBe("local-admin@example.org");
 });
 it("fails closed when neither source provides a secret",()=>{
  vi.stubEnv("ADMIN_TOTP_SECRET","");
  expect(getEditorialSecret("ADMIN_TOTP_SECRET")).toBe("");
  expect(missingEditorialSecrets(["ADMIN_TOTP_SECRET"])).toEqual(["ADMIN_TOTP_SECRET"]);
 });
 it("detects only secret names and never prints values to diagnostic outputs",()=>{
  workerBindings.current={ADMIN_EMAIL:"private@example.org",AUTH_SECRET:"long-secret"};
  expect(missingEditorialSecrets(["ADMIN_EMAIL","ADMIN_PASSWORD_HASH","AUTH_SECRET"])).toEqual(["ADMIN_PASSWORD_HASH"]);
 });
});
