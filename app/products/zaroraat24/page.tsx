import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";import {productData} from "../../../lib/product-data";
export const metadata: Metadata = { title: "Zaroraat24 | MFSYS", description: "A digital experience designed to connect customers with essential financial products and services.", alternates: { canonical: "/products/zaroraat24" }, openGraph: { title: "Zaroraat24 | MFSYS", description: "A digital experience designed to connect customers with essential financial products and services.", url: "https://mfsys.ca/products/zaroraat24" } };

export default function Page(){return <ProductPage product={productData.find(x=>x.name==="Zaroraat24")!}/>}