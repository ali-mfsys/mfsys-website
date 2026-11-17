import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function SiteFooter(){
 const columns: Array<[string,string[],string[]]>=[
  ["SOLUTIONS",["Digital Core Banking","Loan Origination","Islamic Finance","AI Credit Intelligence","Mobile Lending","Digital Wallet & Payments"],["/solutions/digital-banking","/products/loanleaf","/products/shariahone","/products/loaniq","/products/zaroraat24","/products/include-mobile-app"]],
  ["MORE SOLUTIONS",["Agri Finance & Supply Chain","Climate & Carbon","Logistics & Supply Chain","Risk & Compliance","Explore All Solutions"],["/products/digitalkisaan","/products/xchangecarbon","/products/cargoguard","/solutions/risk-compliance","/solutions"]],
  ["COMPANY",["About MFSYS","Global Presence","Partners & Ecosystem","People & Culture","AI & Innovation","Case Studies","Insights","Careers","Contact"],["/about","/global-presence","/partners","/people","/ai-innovation","/insights/case-studies","/insights","/careers","/contact"]]
 ];
 return <footer className="site-footer">
  <div className="container">
   <div className="footer-top">
    <div className="footer-brand"><BrandLogo className="footer-logo" alt="MFSYS — Intelligence for Impact"/><p>Building Smarter Financial Futures.</p><div className="footer-social"><a href="https://www.linkedin.com/company/mfsys" target="_blank" rel="noopener noreferrer" aria-label="MFSYS Technologies official LinkedIn company page">LinkedIn ↗</a></div></div>
    {columns.map(([title,labels,hrefs])=><div className="footer-column" key={title}><h3>{title}</h3>{labels.map((x,i)=><Link href={hrefs[i]} key={x}>{x}</Link>)}</div>)}
    <div className="footer-contact"><h3>LET'S TALK</h3><a href="mailto:info@mfsys.ca">info@mfsys.ca</a><a href="tel:+16479607418">+1 647 960 7418</a><p>Toronto · Islamabad · Melbourne</p></div>
   </div>
   <div className="footer-bottom"><span>© 2026 MFSYS Technologies. All rights reserved.</span><div><Link href="/contact">Contact us about privacy, terms or security</Link></div></div>
  </div>
 </footer>
}