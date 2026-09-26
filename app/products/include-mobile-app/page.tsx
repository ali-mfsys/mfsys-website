import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";
import { productData } from "../../../lib/product-data";

export const metadata: Metadata = {
  title: "Include Mobile App | MFSYS",
  description: "Full mobile banking for customers to manage their financial lives from their mobile device.",
  alternates: { canonical: "/products/include-mobile-app" },
};

export default function Page(){
  const product=productData.find((item)=>item.name==="Include Mobile App")!;
  return <ProductPage product={product}/>;
}
