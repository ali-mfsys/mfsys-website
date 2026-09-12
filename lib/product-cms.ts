import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { products as productTable } from "./db/schema";
import { productData, type Product } from "./product-data";

export type CmsProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
  status: string;
};

function slugFromHref(href: string) {
  return href.replace(/^\/products\//, "");
}

function fallbackProducts(): CmsProduct[] {
  return productData.map((p, i) => ({
    id: `legacy-${i}`,
    slug: slugFromHref(p.href),
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    capabilities: p.capabilities,
    status: "PUBLISHED",
  }));
}

export async function getPublishedProducts(): Promise<CmsProduct[]> {
  try {
    const rows = await getDb()
      .select()
      .from(productTable)
      .where(eq(productTable.status, "PUBLISHED"));
    if (rows.length) {
      return rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        tagline: row.tagline,
        description: row.description,
        capabilities: Array.isArray(row.capabilities) ? row.capabilities as string[] : [],
        status: row.status,
      }));
    }
  } catch {
    // Public site remains available if the CMS database is temporarily unavailable.
  }
  return fallbackProducts();
}

export async function seedProducts() {
  const db = getDb();
  const existing = await db.select({ id: productTable.id }).from(productTable).limit(1);
  if (existing.length) return { created: 0, message: "Product catalogue already contains records." };

  const rows = productData.map((p) => ({
    slug: slugFromHref(p.href),
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    capabilities: p.capabilities,
    status: "PUBLISHED" as const,
  }));
  await db.insert(productTable).values(rows);
  return { created: rows.length };
}
