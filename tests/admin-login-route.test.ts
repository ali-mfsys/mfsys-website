import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";

vi.mock("../lib/auth",()=>({
  signSession:vi.fn(()=>"mocked-safe-session-token"),
  verifyPassword:vi.fn(async(password:string)=>password==="a very long test passphrase"),
  verifyTotp:vi.fn((code:string)=>code==="654321")
}));
import {POST} from "../app/api/admin/login/route";
const env=()=>{
 vi.stubEnv("ADMIN_EMAIL","editor@example.org");
 vi.stubEnv("ADMIN_PASSWORD_HASH","nonempty-test-value");
 vi.stubEnv("ADMIN_TOTP_SECRET","nonempty-test-totp");
 vi.stubEnv("AUTH_SECRET","x".repeat(64));
};
const req=(data:unknown,origin="https://mfsys.net")=>new Request("https://mfsys.net/api/admin/login",{
 method:"POST",
 headers:{"origin":origin,"content-type":"application/json"},
 body:JSON.stringify(data)
});
const good={
 email:"editor@example.org",
 password:"a very long test passphrase",
 code:"654321"
};
beforeEach(()=>{env();vi.spyOn(console,"warn").mockImplementation(()=>{});});
afterEach(()=>{vi.restoreAllMocks();vi.unstubAllEnvs();});

describe("MFSYS editorial login route",()=>{
 it("does not authenticate without server-side credentials",async()=>{
  vi.stubEnv("ADMIN_TOTP_SECRET","");
  const r=await POST(req(good));
  expect(r.status).toBe(503);
  expect(r.headers.get("set-cookie")).toBeNull();
 });
 it("rejects cross-site login requests",async()=>{
  const r=await POST(req(good,"https://other.example.org"));
  expect(r.status).toBe(403);
  expect(r.headers.get("set-cookie")).toBeNull();
 });
 it("rejects incorrect factors with a generic message and no session",async()=>{
  const r=await POST(req({...good,password:"not-a-real-password"}));
  expect(r.status).toBe(401);
  expect(await r.json()).toEqual({error:"Invalid credentials"});
  expect(r.headers.get("set-cookie")).toBeNull();
 });
 it("normalizes email and authenticator whitespace while keeping the password unchanged",async()=>{
  const r=await POST(req({...good,email:" EDITOR@example.org ",code:"654321 "}));
  expect(r.status).toBe(200);
  const cookie=r.headers.get("set-cookie")||"";
  expect(cookie).toContain("mfsys_admin_session=");
  expect(cookie).toContain("HttpOnly");
  expect(cookie).toContain("SameSite=strict");
 });
});
