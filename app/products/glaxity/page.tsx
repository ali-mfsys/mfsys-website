import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";
import { productData } from "../../../lib/product-data";

export const metadata: Metadata = {
  title: "Glaxity | MFSYS",
  description: "Cloud-native, multi-tenant core banking for microfinance and banking institutions.",
  alternates: { canonical: "/products/glaxity" },
};

export default function Page(){
  const product=productData.find((item)=>item.name==="Glaxity")!;
  return <ProductPage product={product}/>;
}
