import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";import {productData} from "../../../lib/product-data";
export const metadata: Metadata = { title: "IFRS9 Impairment Solution | MFSYS", description: "An impairment platform supporting PD, LGD, lifetime estimation and expected credit loss calculations for IFRS 9.", alternates: { canonical: "/products/ifrs9" }, openGraph: { title: "IFRS9 Impairment Solution | MFSYS", description: "An impairment platform supporting PD, LGD, lifetime estimation and expected credit loss calculations for IFRS 9.", url: "https://mfsys.ca/products/ifrs9" } };

export default function Page(){const product=productData.find(x=>x.name==="IFRS9 Impairment Solution")!;return <ProductPage product={product}/>}