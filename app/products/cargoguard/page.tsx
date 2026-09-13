import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";import {productData} from "../../../lib/product-data";
export const metadata: Metadata = { title: "CargoGuard | MFSYS", description: "A SaaS logistics platform for load booking, dispatch, tracking, proof of delivery and driver compliance.", alternates: { canonical: "/products/cargoguard" }, openGraph: { title: "CargoGuard | MFSYS", description: "A SaaS logistics platform for load booking, dispatch, tracking, proof of delivery and driver compliance.", url: "https://mfsys.ca/products/cargoguard" } };

export default function Page(){return <ProductPage product={productData.find(x=>x.name==="CargoGuard")!}/>}