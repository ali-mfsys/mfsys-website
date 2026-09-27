import {NextResponse} from "next/server";

const ASSET_BASE = "https://media.githubusercontent.com/media/ali-mfsys/mfsys-website/4371c06746b90d7b093727846bc6c11f02f5c0d6/raw/public/menu-assets/graphics/";
const ALLOWED: Record<string,string> = {
  "microfinance-banking.jpg": "microfinance-banking.jpg",
  "islamic-finance-menu.jpg": "islamic-finance-menu.jpg",
  "agriculture-rural-development.jpg": "agriculture-rural-development.jpg",
  "climate-carbon-menu.jpg": "climate-carbon-menu.jpg",
  "logistics-supply-chain.jpg": "logistics-supply-chain.jpg",
  "government-development.jpg": "government-development.jpg",
  "impact-mountains-menu.jpg": "impact-mountains-menu.jpg",
};

export async function GET(_request: Request, {params}: {params: Promise<{name: string}>}) {
  const {name} = await params;
  const file = ALLOWED[name];
  if (!file) return new NextResponse("Not found", {status:404});
  const upstream = await fetch(ASSET_BASE + file, {cf: {cacheTtl: 86400, cacheEverything: true}} as RequestInit);
  if (!upstream.ok || !upstream.body) return new NextResponse("Asset unavailable", {status:502});
  return new NextResponse(upstream.body, {
    status:200,
    headers:{
      "Content-Type": upstream.headers.get("content-type") || "image/jpeg",
      "Cache-Control":"public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      "X-Content-Type-Options":"nosniff",
    },
  });
}
