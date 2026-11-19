import {describe,expect,it,afterEach,vi} from "vitest";
import {randomBytes,scryptSync} from "node:crypto";
import {signSession,verifySession,verifyPassword,verifyTotp,isSupportedAdminPasswordHash} from "../lib/auth";

afterEach(()=>vi.unstubAllEnvs());

describe("Content Studio signed admin sessions",()=>{
 it("rejects missing secret and does not issue weak sessions",()=>{
  vi.stubEnv("AUTH_SECRET","");
  expect(()=>signSession({email:"admin@example.com",role:"SUPER_ADMIN",exp:Date.now()+3600000})).toThrow("not configured");
  expect(verifySession("token.signature")).toBeNull();
 });
 it("signs valid, expiring sessions and rejects tampering",()=>{
  vi.stubEnv("AUTH_SECRET","n".repeat(64));
  const good=signSession({email:"admin@example.com",role:"SUPER_ADMIN",exp:Date.now()+3600000});
  expect(verifySession(good)?.email).toBe("admin@example.com");
  const [payload,signature]=good.split(".");
  const alteredLast=signature.endsWith("A")?"B":"A";
  expect(verifySession(payload+"."+signature.slice(0,-1)+alteredLast)).toBeNull();
  const expired=signSession({email:"admin@example.com",role:"SUPER_ADMIN",exp:Date.now()-1000});
  expect(verifySession(expired)).toBeNull();
  const excessivelyLong=signSession({email:"admin@example.com",role:"SUPER_ADMIN",exp:Date.now()+6*60*60*1000});
  expect(verifySession(excessivelyLong)).toBeNull();
 });
});

describe("admin password and authenticator verification",()=>{
 it("matches securely generated native scrypt password verifiers",async()=>{
  const salt=randomBytes(24);
  const password="a secure example passphrase 12345";
  const native=scryptSync(password,salt,32,{N:16384,r:8,p:1,maxmem:64*1024*1024});
  vi.stubEnv("ADMIN_PASSWORD_HASH",["scrypt",16384,8,1,salt.toString("base64url"),native.toString("base64url")].join("$"));
  expect(isSupportedAdminPasswordHash()).toBe(true);
  expect(await verifyPassword(password)).toBe(true);
  expect(await verifyPassword("incorrect password")).toBe(false);
 });
 it("fails closed on old CPU-exhausting password hashes, without computing them",async()=>{
  vi.stubEnv("ADMIN_PASSWORD_HASH","long-legacy-salt$310000$legacy-derived-value");
  expect(isSupportedAdminPasswordHash()).toBe(false);
  expect(await verifyPassword("sample password")).toBe(false);
 });
 it("rejects malformed, empty or weak password hashes",async()=>{
  vi.stubEnv("ADMIN_PASSWORD_HASH","");
  expect(await verifyPassword("whatever")).toBe(false);
  vi.stubEnv("ADMIN_PASSWORD_HASH","short$100$abc");
  expect(await verifyPassword("whatever")).toBe(false);
 });
 it("verifies standard RFC 6238 six-digit TOTP with clock tolerance",()=>{
  // RFC 6238 SHA1 key "12345678901234567890", 59s => 94287082 (eight digits).
  // The six-digit authenticator representation is 287082.
  const base32="GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ";
  expect(verifyTotp("287082",base32,59000)).toBe(true);
  expect(verifyTotp("287082",base32,89000)).toBe(true);
  expect(verifyTotp("287082",base32,150000)).toBe(false);
  expect(verifyTotp("287083",base32,59000)).toBe(false);
  expect(verifyTotp("287082","SHORT",59000)).toBe(false);
  expect(verifyTotp("12345",base32,59000)).toBe(false);
 });
});
