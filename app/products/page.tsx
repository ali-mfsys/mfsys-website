import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import CardGrid from "../../components/CardGrid";
import { products as staticProducts } from "../../lib/site-data";
import { getPublishedProducts } from "../../lib/product-cms";

export const dynamic = "force-dynamic";


export const metadata: Metadata = { title: "Products | MFSYS", description: "Explore MFSYS enterprise technology products for digital banking, lending, Islamic finance, climate, agriculture and logistics.", alternates: { canonical: "/products" }, openGraph: { title: "Products | MFSYS", description: "Explore MFSYS enterprise technology products for digital banking, lending, Islamic finance, climate, agriculture and logistics.", url: "https://mfsys.ca/products" } };

export default async function Page(){
  const cmsProducts=await getPublishedProducts();
  const items=cmsProducts.map(p=>[p.name,p.tagline,`/products/${p.slug}`] as const);
  const products=items.length?items:staticProducts;
  return <main id="main">
    <PageHero eyebrow="PRODUCTS" title="Purpose-built platforms. Intelligence at the core." text="A portfolio of enterprise products designed for financial inclusion, sustainable growth and connected operations."/>
    <section className="container section"><CardGrid items={products}/></section>
  </main>
}
