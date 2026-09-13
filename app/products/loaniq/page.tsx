import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";import {productData} from "../../../lib/product-data";
export const metadata: Metadata = { title: "LoanIQ | MFSYS", description: "AI-enabled lending intelligence supporting risk assessment, decisioning and portfolio insight.", alternates: { canonical: "/products/loaniq" }, openGraph: { title: "LoanIQ | MFSYS", description: "AI-enabled lending intelligence supporting risk assessment, decisioning and portfolio insight.", url: "https://mfsys.ca/products/loaniq" } };

export default function Page(){return <ProductPage product={productData.find(x=>x.name==="LoanIQ")!}/>}