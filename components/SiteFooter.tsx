import Link from "next/link";

export default function SiteFooter(){
 const columns=[
  ["SOLUTIONS",["Core Banking","Digital Lending","Islamic Finance","Climate & Carbon","Digital Agriculture","Logistics"],["/solutions/core-banking","/solutions/lending","/solutions/islamic-finance","/solutions/climate","/solutions/agriculture","/solutions/logistics"]],
  ["PRODUCTS",["CiiHive","LoanLeaf","Smart Mudarabah","CargoGuard","XchangeCarbon","IFRS9"],["/products/ciihive","/products/loanleaf","/products/smart-mudarabah","/products/cargoguard","/products/xchangecarbon","/products/ifrs9"]],
  ["COMPANY",["About MFSYS","AI & Innovation","Case Studies","Insights","Careers","Contact"],["/about","/ai-innovation","/case-studies","/insights","/careers","/contact"]],
 ];
 return <footer className="site-footer">
  <div className="container">
   <div className="footer-top">
    <div className="footer-brand"><img className="footer-logo" src="/mfsys-logo.svg" alt="MFSYS — Intelligence for Impact" width="180" height="70"/><p>Intelligent technology for financial services, digital economies and sustainable enterprises.</p><div className="footer-social"><a href="https://www.linkedin.com/company/mfsys" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div>
    {columns.map(([title,labels,hrefs])=><div className="footer-column" key={title}><h3>{title}</h3>{labels.map((x,i)=><Link href={hrefs[i]} key={x}>{x}</Link>)}</div>)}
    <div className="footer-contact"><h3>LET'S TALK</h3><a href="mailto:info@mfsys.ca">info@mfsys.ca</a><a href="tel:+16479607418">+1 647 960 7418</a><p>Toronto · Islamabad · Melbourne</p></div>
   </div>
   <div className="footer-bottom"><span>© 2026 MFSYS Technologies. All rights reserved.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/security">Security</Link></div></div>
  </div>
 </footer>
}