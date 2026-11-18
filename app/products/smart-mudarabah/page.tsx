import type {Metadata} from "next";
import SmartMudarabahExperience from "../../../components/SmartMudarabahExperience";

export const metadata:Metadata={
 title:"Smart Mudarabah | Investment, Islamic Lending & Financial Control | MFSYS",
 description:"An integrated Shariah-governed platform for Mudarabah investment operations, treasury, digital Islamic lending, profit distribution and automated financial control.",
 alternates:{canonical:"/products/smart-mudarabah"},
 openGraph:{
  title:"Smart Mudarabah — Principled Finance, Connected Intelligence | MFSYS",
  description:"From investor onboarding and treasury operations to Shariah-governed lending, profit sharing and the general ledger — discover Smart Mudarabah.",
  url:"https://mfsys.net/products/smart-mudarabah"
 }
};

export default function Page(){return <SmartMudarabahExperience/>;}
