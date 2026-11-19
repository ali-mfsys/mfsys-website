import {getCloudflareContext} from "@opennextjs/cloudflare";

/**
 * Runtime-only secret resolver for Next.js on Cloudflare Workers.
 *
 * Cloudflare's Worker binding is authoritative. Next.js/OpenNext may rewrite
 * direct process.env.SECRET_NAME references at build time, so dynamic
 * process.env lookups are a fallback for local Node development only.
 *
 * Never return or log binding values to the browser.
 */
export type EditorialSecretName=
 | "AUTH_SECRET"
 | "ADMIN_EMAIL"
 | "ADMIN_PASSWORD_HASH"
 | "ADMIN_TOTP_SECRET"
 | "GITHUB_CONTENT_TOKEN";

export function getEditorialSecret(name:EditorialSecretName):string{
 try{
  const bindings=getCloudflareContext().env as unknown as
    Partial<Record<EditorialSecretName,unknown>>;
  const value=bindings?.[name];
  if(typeof value==="string"&&value.length>0)return value;
 }catch{
  // The Cloudflare request context does not exist during local Node.js tests.
 }
 const fallback=process.env[name];
 return typeof fallback==="string"?fallback:"";
}

/** No secrets or values. Only names may be included in restricted server logs. */
export function missingEditorialSecrets(names:readonly EditorialSecretName[]):EditorialSecretName[]{
 return names.filter(name=>!getEditorialSecret(name));
}
