import PageHero from "../../components/PageHero";
import CardGrid from "../../components/CardGrid";
import { products as staticProducts } from "../../lib/site-data";
import { getPublishedProducts } from "../../lib/product-cms";

export const dynamic = "force-dynamic";

export default async function Page(){
  const cmsProducts=await getPublishedProducts();
  const items=cmsProducts.map(p=>[p.name,p.tagline,`/products/${p.slug}`] as const);
  const products=items.length?items:staticProducts;
  return <main id="main">
    <PageHero eyebrow="PRODUCTS" title="Purpose-built platforms. Intelligence at the core." text="A portfolio of enterprise products designed for financial inclusion, sustainable growth and connected operations."/>
    <section className="container section"><CardGrid items={products}/></section>
  </main>
}
