import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";import {productData} from "../../../lib/product-data";
export const metadata: Metadata = { title: "Smart Mudarabah | MFSYS", description: "An end-to-end digital platform for structuring, managing, monitoring and reporting Mudarabah-based financing.", alternates: { canonical: "/products/smart-mudarabah" }, openGraph: { title: "Smart Mudarabah | MFSYS", description: "An end-to-end digital platform for structuring, managing, monitoring and reporting Mudarabah-based financing.", url: "https://mfsys.ca/products/smart-mudarabah" } };

export default function Page(){return <ProductPage product={productData.find(x=>x.name==="Smart Mudarabah")!}/>}