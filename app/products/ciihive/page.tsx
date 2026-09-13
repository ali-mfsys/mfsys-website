import type { Metadata } from "next";
import ProductPage from "../../../components/ProductPage";
import CiiHiveArchitecture from "../../../components/CiiHiveArchitecture";
import CiiHiveCapabilityMap from "../../../components/CiiHiveCapabilityMap";
import {productData} from "../../../lib/product-data";

export const metadata: Metadata = {
  title: "CiiHive Digital Core Banking | MFSYS",
  description: "CiiHive is a cloud-native, cloud-agnostic digital core banking platform for banks, microfinance institutions, credit unions, fintechs and specialized financial-service providers.",
  alternates: { canonical: "/products/ciihive" },
  openGraph: { title: "CiiHive Digital Core Banking | MFSYS", description: "A configurable digital core for modern financial services, with banking, lending, deposits, digital channels, analytics and open integration.", url: "https://mfsys.ca/products/ciihive" }
};

export default function Page(){
  const product=productData.find(x=>x.name==="CiiHive")!;
  return <><ProductPage product={product}/><CiiHiveCapabilityMap/><CiiHiveArchitecture/></>;
}