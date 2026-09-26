import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";
import { productData } from "../../../lib/product-data";

export const metadata: Metadata = {
  title: "ShariahOne | MFSYS",
  description: "A Shariah-compliant banking platform for Islamic products, contracts and profit distribution.",
  alternates: { canonical: "/products/shariahone" },
};

export default function Page(){
  const product=productData.find((item)=>item.name==="ShariahOne")!;
  return <ProductPage product={product}/>;
}
