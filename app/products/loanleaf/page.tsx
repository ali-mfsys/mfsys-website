import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";import {productData} from "../../../lib/product-data";
export const metadata: Metadata = { title: "LoanLeaf | MFSYS", description: "A configurable loan origination platform that digitizes application, verification, credit assessment, approval and disbursement workflows.", alternates: { canonical: "/products/loanleaf" }, openGraph: { title: "LoanLeaf | MFSYS", description: "A configurable loan origination platform that digitizes application, verification, credit assessment, approval and disbursement workflows.", url: "https://mfsys.ca/products/loanleaf" } };

export default function Page(){return <ProductPage product={productData.find(x=>x.name==="LoanLeaf")!}/>}