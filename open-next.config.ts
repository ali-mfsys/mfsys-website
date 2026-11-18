import {defineCloudflareConfig} from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// MFSYS pages are pre-rendered at build time. The "dummy" cache throws when
// Next.js reads the response cache, which caused intermittent HTTP 500s on
// page navigation and RSC prefetch requests.
//
// Static assets cache serves those build-time entries through the existing
// ASSETS binding. It does not support ISR/on-demand revalidation; if the site
// begins using revalidation, migrate to an R2-backed cache and queue.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
