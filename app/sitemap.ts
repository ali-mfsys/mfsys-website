import type { MetadataRoute } from "next";
import { products, solutions } from "../lib/site-data";


export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = "https://mfsys.ca";
  const routes = ["/", "/about", "/global-presence", "/partners", "/people", "/careers", "/industries", "/ai-innovation", "/insights", "/products", "/solutions", "/insights/case-studies", "/insights/news", "/insights/articles", "/insights/research", "/insights/reports", "/contact"];

  return [
    ...routes.map((path): MetadataRoute.Sitemap[number] => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
    })),
    ...products.map(([, , path]): MetadataRoute.Sitemap[number] => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...solutions.map(([, , path]): MetadataRoute.Sitemap[number] => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    })),
  ];
}
