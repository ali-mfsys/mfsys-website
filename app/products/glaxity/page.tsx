import ProductSeoJsonLd from "../../../components/ProductSeoJsonLd";
import type {Metadata} from "next";
import GlaxityExperience from "../../../components/GlaxityExperience";
export const metadata:Metadata={title:"Glaxity | Next-Generation AI-Enabled Core Banking | MFSYS",description:"Meet Glaxity, the AI-enabled next generation of CiiHive. Cloud-native core banking with an upgraded technology stack, connected services and modern architecture.",alternates:{canonical:"/products/glaxity"},openGraph:{title:"Glaxity — Banking Evolved | MFSYS",description:"The next generation of CiiHive: cloud-native, connected and AI-enabled core banking.",url:"https://mfsys.net/products/glaxity"}};
export default function Page(){return <><ProductSeoJsonLd path="/products/glaxity"/><GlaxityExperience/></>}
