/**
 * MFSYS PWA offline navigation support.
 *
 * Normal navigation and Next.js assets must use the network and standard HTTP
 * caching. A single rejected network request is not proof the visitor is
 * offline, so retry transient failures before displaying a neutral fallback.
 * Do not cache HTML, RSC payloads, API responses, admin pages or JS bundles:
 * keeping those across Next.js deployments can break subsequent navigation.
 */
const CACHE_PREFIX = "mfsys-pwa-";
const CACHE_NAME = "mfsys-pwa-v2";
const OFFLINE_URL = "/offline";
const RETRY_DELAY_MS = 350;

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.add(OFFLINE_URL);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) =>
      key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME
    ).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || request.mode !== "navigate") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Private pages and programmatic traffic must never enter the offline cache.
  if (url.pathname === OFFLINE_URL ||
      url.pathname === "/admin" || url.pathname.startsWith("/admin/") ||
      url.pathname.startsWith("/api/") ||
      url.pathname.startsWith("/_next/")) return;

  event.respondWith((async () => {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        // Return real server responses (including 404/500) unchanged; an
        // HTTP error is NOT an offline condition.
        return await fetch(request);
      } catch (error) {
        if (request.signal?.aborted) throw error;
        if (attempt === 0) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        }
      }
    }

    // Only a persistent network rejection gets the pre-cached fallback.
    // Never save failed navigation documents as successful HTML.
    const fallback = await caches.match(OFFLINE_URL);
    return fallback || Response.error();
  })());
});
