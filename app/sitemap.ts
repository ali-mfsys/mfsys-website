import type { MetadataRoute } from "next";
import { products, solutions } from "../lib/site-data";


export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = "https://mfsys.ca";
  const routes = ["/", "/about", "/industries", "/ai-innovation", "/insights", "/products", "/solutions", "/case-studies", "/contact"];

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
