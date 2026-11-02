import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "../../../components/PageHero";
import { solutions } from "../../../lib/site-data";
import type { Metadata } from "next";
import DigitalBankingExperience from "../../../components/DigitalBankingExperience";
import IslamicFinanceExperience from "../../../components/IslamicFinanceExperience";

const details: Record<string, {eyebrow:string; intro:string; capabilities:string[]; outcomes:string[]}> = {
  "digital-banking": { eyebrow:"DIGITAL BANKING", intro:"Modern, cloud-native banking technology that connects core operations, digital channels, data and intelligence in one scalable ecosystem.", capabilities:["Core banking and account management","Digital onboarding, KYC and customer 360","Mobile and web banking channels","Workflow, API and ecosystem integration"], outcomes:["Faster digital transformation","Lower operational complexity","Consistent customer experience"] },
  "loan-origination": { eyebrow:"LENDING & ORIGINATION", intro:"LoanLeaf connects onboarding, eKYC, weighted credit scoring, field verification, multi-level approvals and CiiHive disbursement in a controlled workflow.", capabilities:["Customer onboarding and CPR-assisted eKYC","Weighted credit scoring and field inspections","Compliance, credit manager and executive approval gates","New, repeat and top-up loans with CiiHive disbursement"], outcomes:["Shorter turnaround time","Better credit governance","Improved borrower experience"] },
  "islamic-finance": { eyebrow:"ISLAMIC FINANCE", intro:"Digital infrastructure for Shariah-aligned financing, including Mudarabah workflows, governance, contracts, profit allocation and reporting.", capabilities:["Digital Mudarabah lifecycle","Shariah-aligned product configuration","Partner, investor and beneficiary workflows","Profit calculation and reporting"], outcomes:["Transparent financing operations","Stronger governance","Scalable Islamic finance delivery"] },
  "agri-finance": { eyebrow:"AGRI FINANCE & SUPPLY CHAIN", intro:"Connected finance and value-chain technology for farmers, cooperatives, aggregators and financial institutions.", capabilities:["Farmer and cooperative onboarding","Value-chain relationship management","Digital financing workflows","Field data and portfolio intelligence"], outcomes:["Greater financial inclusion","Better supply-chain visibility","Data-driven agricultural finance"] },
  "ai-credit": { eyebrow:"AI CREDIT INTELLIGENCE", intro:"Explainable AI and risk intelligence that turns customer, behavioural and portfolio data into actionable credit decisions.", capabilities:["AI-based credit scoring","Probability and risk modelling","Explainable decision factors","Portfolio monitoring and early warning"], outcomes:["More consistent decisions","Responsible lending controls","Earlier risk intervention"] },
  "mobile-lending": { eyebrow:"AI-ENABLED MOBILE LENDING", intro:"Zaroorat24 brings transparent borrowing choices, bilingual onboarding, identity verification, informed consent, credit decisions and repayments into a borrower-first mobile journey.", capabilities:["English and Urdu registration and mobile verification","Loan calculators, APR, fees and repayment schedules","CNIC and liveness checks with informed data permissions","Payout, loan dashboard and repayment guidance"], outcomes:["Faster access to finance","Lower acquisition cost","Improved borrower engagement"] },
  "payments": { eyebrow:"DIGITAL WALLET & PAYMENT", intro:"Connected payment experiences for wallets, transaction processing, integrations and digital financial ecosystems.", capabilities:["Wallet and account experiences","Payment and transaction orchestration","API and partner integration","Fraud, limits and audit controls"], outcomes:["Reliable transaction journeys","Easier ecosystem connectivity","Stronger operational control"] },
  "climate-carbon": { eyebrow:"CLIMATE & CARBON", intro:"Digital climate infrastructure for project registration, measurement, reporting, verification and carbon-market workflows.", capabilities:["Climate project registration","MRV and impact data","Carbon credit calculation","Marketplace and transaction workflows"], outcomes:["Trusted climate data","Transparent carbon operations","Scalable climate-finance ecosystems"] },
  "logistics": { eyebrow:"LOGISTICS & SUPPLY CHAIN", intro:"Connected freight technology that brings booking, dispatch, tracking, compliance and proof of delivery into one operational view.", capabilities:["Load booking and dispatch","GPS tracking and geofencing","Driver KYC and compliance","Proof of delivery and exception management"], outcomes:["Greater shipment visibility","Reduced operational risk","Faster exception resolution"] },
  "agentic-ai": { eyebrow:"AGENTIC AI", intro:"AI agents and workflow automation for repetitive, high-value enterprise processes with governance and human oversight.", capabilities:["Task-specific AI agents","Workflow orchestration","Human-in-the-loop approvals","Audit and performance monitoring"], outcomes:["Higher team productivity","Faster process execution","Controlled AI adoption"] },
  "ai-transformation": { eyebrow:"AI & DIGITAL TRANSFORMATION", intro:"Strategy, architecture and implementation services that help organizations turn AI and digital transformation into measurable business outcomes.", capabilities:["AI readiness and strategy","Enterprise architecture","Data and integration roadmaps","Implementation and change enablement"], outcomes:["Clear transformation priorities","Modern technology foundations","Sustainable adoption"] }
};

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const match=solutions.find(([, , path])=>path.endsWith("/"+slug));
  const detail=details[slug];
  if(!match || !detail) return {};
  return {
    title: match[0]+" | MFSYS",
    description: detail.intro,
    alternates: {canonical: "/solutions/"+slug},
    openGraph: {title: match[0]+" | MFSYS", description: detail.intro, url: "https://mfsys.ca/solutions/"+slug}
  };
}

export function generateStaticParams(){ return solutions.map(([, , path])=>({slug:path.split("/").pop()!})); }

export default async function SolutionDetail({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const match=solutions.find(([, , path])=>path.endsWith("/"+slug));
  const detail=details[slug];
  if(!match || !detail) notFound();
  if(slug === "digital-banking") return <main id="main"><DigitalBankingExperience /></main>;
  if(slug === "islamic-finance") return <main id="main"><IslamicFinanceExperience /></main>;
  return <main id="main">
    <PageHero eyebrow={detail.eyebrow} title={match[0]} text={detail.intro}/>
    <section className="container section solution-detail">
      <div className="solution-detail-grid">
        <div><div className="eyebrow">CAPABILITIES</div><h2>Designed around the workflow.</h2><div className="detail-list">{detail.capabilities.map(x=><div className="detail-item" key={x}><span>+</span><p>{x}</p></div>)}</div></div>
        <aside className="solution-outcomes"><div className="eyebrow">BUSINESS OUTCOMES</div><h3>Built for measurable impact.</h3>{detail.outcomes.map(x=><div className="outcome" key={x}>{x}</div>)}</aside>
      </div>
      {(slug === "loan-origination" || slug === "mobile-lending") && <div style={{margin:"35px 0",padding:"26px",borderRadius:16,background:"#f1f5fa"}}><div className="eyebrow">EXPLORE THE PRODUCT</div><h2>{slug === "loan-origination" ? "LoanLeaf — connected loan origination" : "Zaroorat24 — borrower-first digital lending"}</h2><p>{slug === "loan-origination" ? "A lender-facing workflow for onboarding, verification, decisions and disbursement." : "A customer-facing journey for loan selection, consent, application and repayment."}</p><Link className="btn btn-primary" href={slug === "loan-origination" ? "/products/loanleaf" : "/products/zaroraat24"}>Explore {slug === "loan-origination" ? "LoanLeaf" : "Zaroorat24"} →</Link>{slug === "mobile-lending" && <p style={{marginTop:14}}>For institutional origination and approval workflows, see <Link href="/products/loanleaf">LoanLeaf</Link>.</p>}</div>}
      <div className="solution-cta"><div><div className="eyebrow">MFSYS</div><h2>Let’s design the right solution for your organization.</h2></div><Link className="nav-cta" href="/contact">Talk to MFSYS →</Link></div>
    </section>
  </main>;
}