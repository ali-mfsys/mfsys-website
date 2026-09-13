import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";import {productData} from "../../../lib/product-data";
export const metadata: Metadata = { title: "XchangeCarbon | MFSYS", description: "A digital carbon ecosystem connecting green projects, MRV, carbon-credit computation and marketplace participants.", alternates: { canonical: "/products/xchangecarbon" }, openGraph: { title: "XchangeCarbon | MFSYS", description: "A digital carbon ecosystem connecting green projects, MRV, carbon-credit computation and marketplace participants.", url: "https://mfsys.ca/products/xchangecarbon" } };

export default function Page(){return <ProductPage product={productData.find(x=>x.name==="XchangeCarbon")!}/>}