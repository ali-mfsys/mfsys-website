import type { Metadata } from "next";
import ProductsExperience from "../../components/ProductsExperience";
import { products as staticProducts } from "../../lib/site-data";
import { getPublishedProducts } from "../../lib/product-cms";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Products | MFSYS", description: "Explore MFSYS enterprise technology products for digital banking, lending, Islamic finance, climate, agriculture and logistics.", alternates: { canonical: "/products" }, openGraph: { title: "Products | MFSYS", description: "Explore MFSYS enterprise technology products for digital banking, lending, Islamic finance, climate, agriculture and logistics.", url: "https://mfsys.ca/products" } };
const categoryBySlug:Record<string,string> = Object.fromEntries(staticProducts.map(([, , href, category])=>[href.replace("/products/",""),category]));
export default async function Page(){
 const cmsProducts=await getPublishedProducts();
 const items=cmsProducts.length?cmsProducts.map(p=>({name:p.name,description:p.tagline||p.description,href:`/products/${p.slug}`,category:categoryBySlug[p.slug]||"Digital Finance"})):staticProducts.map(([name,description,href,category])=>({name,description,href,category}));
 return <ProductsExperience products={items}/>;
}
