import "./globals.css";
import type {Metadata} from "next";
import LiveChatLauncher from "../components/LiveChatLauncher";
import ServiceWorker from "../components/ServiceWorker";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import {SITE_URL, safeJsonLd} from "../lib/seo";

const homeTitle="Core Banking, Microfinance & Digital Banking | MFSYS";
const homeDescription="MFSYS builds core banking, microfinance, digital lending, mobile banking, payments, Islamic finance and AI software for banks, SACCOs, credit unions and NBFCs.";

export const metadata:Metadata={
 metadataBase:new URL(SITE_URL),
 title:{default:homeTitle,template:"%s"},
 description:homeDescription,
 applicationName:"MFSYS Technologies",
 alternates:{canonical:"/"},
 manifest:"/manifest.webmanifest",
 icons:{icon:"/icon.svg"},
 appleWebApp:{capable:true,title:"MFSYS",statusBarStyle:"default"},
 robots:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1},
 openGraph:{
  type:"website",locale:"en_US",siteName:"MFSYS Technologies",url:SITE_URL,
  title:homeTitle,description:homeDescription,
  images:[{url:"/opengraph-image",width:1200,height:630,alt:"MFSYS Technologies — Building Smarter Financial Futures"}]
 },
 twitter:{card:"summary_large_image",title:homeTitle,description:homeDescription,images:["/opengraph-image"]}
};

const identity={"@context":"https://schema.org","@graph":[
 {"@type":"Organization","@id":SITE_URL+"/#organization",name:"MFSYS Technologies",sameAs:["https://www.linkedin.com/company/mfsys"],alternateName:["MFSYS Technologies Limited","MFSYS Technologies (Pvt) Ltd","MFSYS"],url:SITE_URL,
  logo:{"@type":"ImageObject",url:SITE_URL+"/brand/mfsys-logo.svg"},
  description:"Enterprise software company specializing in core banking, microfinance technology, loan origination, digital financial services, Islamic finance, integration and digital transformation.",
  email:"info@mfsys.ca",
  contactPoint:[{"@type":"ContactPoint",contactType:"sales",email:"info@mfsys.ca",url:SITE_URL+"/contact",availableLanguage:["en"]}],
  location:[{"@type":"Place",name:"MFSYS Islamabad",address:{"@type":"PostalAddress",addressLocality:"Islamabad",addressCountry:"PK"}},{"@type":"Place",name:"MFSYS Toronto",address:{"@type":"PostalAddress",addressLocality:"Toronto",addressCountry:"CA"}}],
  knowsAbout:["Microfinance core banking","Digital banking","Loan origination systems","Loan management","Mobile banking","SACCO and credit union banking software","NBFC software","Islamic finance","Mudarabah","Financial middleware","Credit risk and IFRS 9","Enterprise software development","AI integration"]
 },
 {"@type":"WebSite","@id":SITE_URL+"/#website",name:"MFSYS Technologies",url:SITE_URL,inLanguage:"en",publisher:{"@id":SITE_URL+"/#organization"},description:homeDescription}
]};

export default function Layout({children}:{children:React.ReactNode}){
 return <html lang="en"><body>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(identity)}}/>
  <ServiceWorker/>
  <a className="skip" href="#main">Skip to content</a>
  <SiteHeader/>{children}<SiteFooter/><LiveChatLauncher/>
 </body></html>;
}