import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";import {productData} from "../../../lib/product-data";
export const metadata: Metadata = { title: "DigitalKisaan | MFSYS", description: "A digital platform connecting farmers, cooperatives, finance and agricultural ecosystems.", alternates: { canonical: "/products/digitalkisaan" }, openGraph: { title: "DigitalKisaan | MFSYS", description: "A digital platform connecting farmers, cooperatives, finance and agricultural ecosystems.", url: "https://mfsys.ca/products/digitalkisaan" } };

export default function Page(){return <ProductPage product={productData.find(x=>x.name==="DigitalKisaan")!}/>}