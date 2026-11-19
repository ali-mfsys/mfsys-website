import {describe,expect,it,afterEach,vi} from "vitest";
import {pbkdf2Sync} from "node:crypto";
import {signSession,verifySession,verifyPassword,verifyTotp} from "../lib/auth";

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
  expect(verifySession(payload+"."+signature.slice(0,-1)+"A")).toBeNull();
  const expired=signSession({email:"admin@example.com",role:"SUPER_ADMIN",exp:Date.now()-1000});
  expect(verifySession(expired)).toBeNull();
  const excessivelyLong=signSession({email:"admin@example.com",role:"SUPER_ADMIN",exp:Date.now()+6*60*60*1000});
  expect(verifySession(excessivelyLong)).toBeNull();
 });
});

describe("admin password and authenticator verification",()=>{
 it("matches the generated PBKDF2-SHA256 hash using asynchronous WebCrypto",async()=>{
  const salt="example-long-random-salt-safely-tested";
  const iterations=310000;
  const secret="a secure test passphrase 12345";
  const hash=pbkdf2Sync(secret,salt,iterations,32,"sha256").toString("base64url");
  vi.stubEnv("ADMIN_PASSWORD_HASH",salt+"$"+iterations+"$"+hash);
  expect(await verifyPassword(secret)).toBe(true);
  expect(await verifyPassword("incorrect password")).toBe(false);
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
