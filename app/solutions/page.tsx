import type { Metadata } from "next";
import SolutionsLanding from "../../components/SolutionsLanding";
export const metadata: Metadata = { title: "Solutions | MFSYS Technologies", description: "Explore connected MFSYS solutions for digital banking, lending, Islamic finance, AI, agriculture, climate and logistics.", alternates: { canonical: "/solutions" }, openGraph: { title: "Solutions | MFSYS Technologies", description: "Technology that moves industries forward. Explore modern banking, digital lending and connected industry solutions.", url: "https://mfsys.ca/solutions" } };
export default function Page(){return <main id="main"><SolutionsLanding/></main>}
