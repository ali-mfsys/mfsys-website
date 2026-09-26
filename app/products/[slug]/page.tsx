import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "../../../components/ProductPage";
import { productData } from "../../../lib/product-data";

type Params = { slug: string };

export function generateStaticParams(){\n  return productData.filter((product) => ["Glaxity","Include Mobile App","ShariahOne"].includes(product.name)).map((product) => ({slug: product.href.split("/").pop()!}));\n}\n\nfunction getProduct(slug: string){
  return productData.find((product) => product.href === `/products/${slug}`);
}

export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
  const {slug}=await params;
  const product=getProduct(slug);
  if(!product) return {};
  return {
    title: `${product.name} | MFSYS`,
    description: product.description,
    alternates: { canonical: product.href },
  };
}

export default async function Page({params}:{params:Promise<Params>}){
  const {slug}=await params;
  const product=getProduct(slug);
  if(!product) notFound();
  return <ProductPage product={product}/>;
}
