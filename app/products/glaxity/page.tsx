import ProductSeoJsonLd from "../../../components/ProductSeoJsonLd";
import type {Metadata} from "next";
import GlaxityExperience from "../../../components/GlaxityExperience";
export const metadata:Metadata={title:"Glaxity Core Banking Software for MFIs & Banks | MFSYS",description:"Glaxity is cloud-native core banking software for microfinance banks, SACCOs, credit unions, NBFCs and fintechs, evolved from MFSYS CiiHive.",alternates:{canonical:"/products/glaxity"},openGraph:{title:"Glaxity — Banking Evolved | MFSYS",description:"The next generation of CiiHive: cloud-native, connected and AI-enabled core banking.",url:"https://mfsys.net/products/glaxity"}};
export default function Page(){return <><ProductSeoJsonLd path="/products/glaxity"/><GlaxityExperience/></>}
