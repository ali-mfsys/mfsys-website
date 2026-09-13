import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";
import {productData} from "../../../lib/product-data";
export const metadata: Metadata={title:"mConnect Integration Suite | MFSYS",description:"Secure middleware and integration for core banking, digital channels, identity, payment infrastructure and third-party financial services.",alternates:{canonical:"/products/mconnect"}};
export default function Page(){
 const product=productData.find(x=>x.name==="mConnect")!;
 return <main id="main"><ProductPage product={product}/><section className="integration-flow-section"><div className="container"><div className="eyebrow">mCONNECT INTEGRATION FABRIC</div><h2>Connect the financial ecosystem without exposing the core.</h2><p>mConnect provides a controlled integration layer between core systems, channels, identity services, payment infrastructure and third-party applications.</p><div className="integration-flow">{["Mobile & Web","mConnect API Layer","Core Banking","Identity & KYC","Payment Switches","Fintech & Partners"].map((x,i)=><div className={"integration-step s"+i} key={x}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong>{i<5&&<i>→</i>}</div>)}</div></div></section></main>
}