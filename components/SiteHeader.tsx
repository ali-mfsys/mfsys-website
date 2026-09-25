"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { solutions, products, industries } from "../lib/site-data";
import BrandLogo from "./BrandLogo";

type MenuName = "solutions" | "products" | "industries" | "ai";

const solutionGroups = [
  { title: "Financial Services", items: ["Digital Banking Solution", "Digital Loan Origination System (LOS)", "Islamic Finance"] },
  { title: "Intelligence & Digital", items: ["AI-Based Credit Intelligence", "AI-Enabled Mobile Lending", "Digital Wallet & Payment"] },
  { title: "Sector & Enterprise", items: ["Agri Finance & Supply Chain", "Climate & Carbon", "Logistics & Supply Chain", "Agentic AI Enterprise Automation", "AI & Digital Transformation Consulting"] },
] as const;

const productItems = ["CiiHive", "LoanLeaf", "mConnect", "Smart Mudarabah", "DigitalKisaan", "LoanIQ", "Zaroraat24", "XchangeCarbon", "CargoGuard", "IFRS9 Impairment Solution"] as const;

const aiItems = [
  ["AI-Based Credit Intelligence", "Explainable scoring and risk intelligence"],
  ["Agentic AI Enterprise Automation", "AI agents and workflow automation"],
  ["Data Analytics & Insights", "Advanced analytics for better decisions"],
  ["AI for Financial Inclusion", "Responsible and inclusive AI solutions"],
  ["Emerging Technologies", "Blockchain, open finance and digital identity"],
  ["Innovation Lab", "Co-creating solutions for real-world impact"],
] as const;

const iconMap: Record<string, string> = {
  "Digital Banking Solution": "⌂", "Digital Loan Origination System (LOS)": "▤", "Islamic Finance": "☪",
  "AI-Based Credit Intelligence": "◈", "AI-Enabled Mobile Lending": "▣", "Digital Wallet & Payment": "▰",
  "Agri Finance & Supply Chain": "⌁", "Climate & Carbon": "✦", "Logistics & Supply Chain": "▣",
  "Agentic AI Enterprise Automation": "⚙", "AI & Digital Transformation Consulting": "⌁",
  CiiHive: "⌘", LoanLeaf: "⌁", mConnect: "⇄", "Smart Mudarabah": "☪", DigitalKisaan: "⌁", LoanIQ: "◈",
  Zaroraat24: "▣", XchangeCarbon: "✦", CargoGuard: "▣", "IFRS9 Impairment Solution": "▥",
};

function findItem(name: string, kind: "solution" | "product") {
  const source = kind === "solution" ? solutions : products;
  return source.find((x) => x[0] === name);
}

function MenuItem({ name, kind, onNavigate, featured = false }: { name: string; kind: "solution" | "product"; onNavigate: () => void; featured?: boolean }) {
  const item = findItem(name, kind);
  if (!item) return null;
  return (
    <Link href={item[2]} className={`mfsys-editorial-item${featured ? " is-featured" : ""}`} onClick={onNavigate}>
      <span className="mfsys-editorial-icon">{iconMap[name] || "↗"}</span>
      <span className="mfsys-editorial-item-copy"><strong>{item[0]}</strong><small>{item[1]}</small></span>
      <span className="mfsys-editorial-arrow">›</span>
    </Link>
  );
}

function SolutionsVisual() {
  return <div className="mfsys-editorial-art mfsys-art-solutions" aria-hidden="true"><div className="art-sun"/><div className="art-mountain art-mountain-a"/><div className="art-mountain art-mountain-b"/><div className="art-lake"/><div className="art-network"><i>AI</i><i>DATA</i><i>CORE BANKING</i><i>RISK</i><i>CLOUD</i><i>PAYMENTS</i><i>API</i></div><div className="art-scanline"/></div>;
}
function ProductVisual() {
  return <div className="mfsys-editorial-art mfsys-art-products" aria-hidden="true"><div className="art-product-glow"/><div className="art-dashboard"><header><b>CiiHive</b><span>Digital Core Banking</span></header><div className="art-metric-row"><i/><i/><i/></div><div className="art-bars"><i/><i/><i/><i/><i/><i/><i/></div><div className="art-donut"/><div className="art-mini-cards"><i/><i/><i/></div></div><div className="art-data-node">API<br/><small>OPEN</small></div><div className="art-data-node node-two">AI<br/><small>RISK</small></div></div>;
}
function IndustryVisual() {
  return <div className="mfsys-editorial-art mfsys-art-industries" aria-hidden="true"><div className="art-mountain art-mountain-a"/><div className="art-mountain art-mountain-b"/><div className="art-lake"/><div className="art-industry-network"><i>FINANCE</i><i>DATA</i><i>IDENTITY</i><i>PAYMENTS</i><i>CLIMATE</i></div></div>;
}
function AiVisual() {
  return <div className="mfsys-editorial-art mfsys-art-ai" aria-hidden="true"><div className="art-ai-grid"/><div className="art-ai-core">AI</div>{["DATA", "CREDIT", "AUTOMATION", "INSIGHTS", "OPEN FINANCE", "RISK"].map((x, i) => <i key={x} className={`art-ai-node n${i}`}>{x}</i>)}<div className="art-ai-hand"/></div>;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuName | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuName | null>(null);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => { setOpen(null); setMobileOpen(false); setMobileSection(null); }, [pathname]);
  useEffect(() => {
    const close = (e: PointerEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMobileOpen(false); setMobileSection(null); } };
    document.addEventListener("pointerdown", close); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", key); };
  }, []);
  const closeAll = () => { setOpen(null); setMobileOpen(false); setMobileSection(null); };
  const toggle = (name: MenuName) => setOpen((v) => v === name ? null : name);
  const mobileToggle = (name: MenuName) => setMobileSection((v) => v === name ? null : name);

  return <header className="site-header">
    <div className="utility-bar"><div className="container utility-inner"><div className="utility-left"><span>◉</span><span>Global Presence</span><i/><span>12+ Countries</span><i/><span>30+ Financial Institutions</span></div><div className="utility-right"><Link href="/careers" onClick={closeAll}>Careers</Link><Link href="/insights" onClick={closeAll}>News</Link><Link href="/insights" onClick={closeAll}>Resources</Link><Link href="/contact" onClick={closeAll}>Contact</Link><span>⌕</span></div></div></div>
    <div className="container nav-wrap">
      <Link className="brand" href="/" onClick={closeAll}><BrandLogo className="brand-logo" alt="MFSYS Technologies Limited"/></Link>
      <button className="menu-toggle" aria-expanded={mobileOpen} onClick={() => setMobileOpen(v => !v)}>{mobileOpen ? "Close" : "Menu"}</button>
      <nav ref={navRef} className="primary-nav mfsys-editorial-nav" aria-label="Primary">
        <div className="nav-menu"><button className="nav-menu-trigger" aria-expanded={open === "solutions"} onClick={() => toggle("solutions")}>Solutions <span>⌄</span></button>{open === "solutions" && <div className="mfsys-editorial-mega solutions-menu">
          <section className="editorial-intro solutions-intro"><div className="editorial-art-wrap"><SolutionsVisual/></div><div className="editorial-copy"><span className="editorial-eyebrow">MFSYS SOLUTIONS</span><h2>Technology built for intelligent financial ecosystems.</h2><p>Digital solutions for financial inclusion, sustainable growth and more resilient communities.</p><Link href="/solutions" onClick={closeAll}>Explore All Solutions <b>→</b></Link></div><div className="editorial-proof"><span><b>12+</b>Countries</span><span><b>30+</b>Financial Institutions</span><span><b>100+</b>Professionals</span></div></section>
          <section className="editorial-solution-columns">{solutionGroups.map(group => <div className="editorial-group" key={group.title}><h3>{group.title}</h3>{group.items.map((name, i) => <MenuItem key={name} name={name} kind="solution" featured={i === 0 && group.title === "Financial Services"} onNavigate={closeAll}/>)}</div>)}</section>
          <aside className="editorial-impact"><div className="impact-rings"/><div className="impact-copy"><span>OUR IMPACT</span><strong>Building more inclusive, resilient and sustainable economies.</strong><Link href="/about" onClick={closeAll}>Our Impact →</Link></div></aside>
        </div>}</div>

        <div className="nav-menu"><button className="nav-menu-trigger" aria-expanded={open === "products"} onClick={() => toggle("products")}>Products <span>⌄</span></button>{open === "products" && <div className="mfsys-editorial-mega products-menu">
          <section className="editorial-intro products-intro"><div className="editorial-art-wrap"><ProductVisual/></div><div className="editorial-copy"><span className="editorial-eyebrow">OUR PRODUCTS</span><h2>Purpose-built products for real-world impact.</h2><p>Scalable, cloud-native platforms trusted by financial institutions across multiple markets.</p><Link href="/products" onClick={closeAll}>Explore All Products <b>→</b></Link></div><div className="editorial-proof"><span><b>30+</b>Financial Institutions</span><span><b>12+</b>Countries</span><span><b>100+</b>Professionals</span></div></section>
          <section className="editorial-product-list"><h3>PRODUCT SUITE</h3>{productItems.map((name, i) => <MenuItem key={name} name={name} kind="product" featured={i === 0} onNavigate={closeAll}/>)}</section>
          <Link className="editorial-featured-product" href="/products/ciihive" onClick={closeAll}><span>FEATURED PRODUCT</span><h2>CiiHive</h2><b>Digital Core Banking Solution</b><p>A modern, scalable and intelligent core banking platform for financial inclusion.</p><em>Learn More →</em><div className="featured-screen"><div/><div/><div/></div></Link>
        </div>}</div>

        <div className="nav-menu"><button className="nav-menu-trigger" aria-expanded={open === "industries"} onClick={() => toggle("industries")}>Industries <span>⌄</span></button>{open === "industries" && <div className="mfsys-editorial-mega industries-menu">
          <section className="editorial-intro industries-intro"><div className="editorial-art-wrap"><IndustryVisual/></div><div className="editorial-copy"><span className="editorial-eyebrow">OUR INDUSTRIES</span><h2>Digital solutions for a more inclusive and sustainable world.</h2><p>Enabling financial inclusion, climate resilience and smarter supply chains across key sectors.</p><Link href="/industries" onClick={closeAll}>Explore All Industries <b>→</b></Link></div><div className="editorial-proof"><span><b>30+</b>Financial Institutions</span><span><b>12+</b>Countries</span><span><b>100+</b>Professionals</span></span></div></section>
          <section className="industry-cards">{industries.slice(0, 6).map((name, i) => <Link href="/industries" className={`industry-card industry-card-${i}`} key={name} onClick={closeAll}><div className="industry-card-art"><span>0{i+1}</span><i/></div><div><strong>{name}</strong><small>{["Inclusive and digital financial services","Shariah-compliant banking and finance","Finance for farmers and value chains","Carbon markets and climate resilience","Connected and efficient supply chains","Digital solutions for greater impact"][i]}</small></div><em>›</em></Link>)}</section>
        </div>}</div>

        <div className="nav-menu"><button className="nav-menu-trigger" aria-expanded={open === "ai"} onClick={() => toggle("ai")}>AI & Innovation <span>⌄</span></button>{open === "ai" && <div className="mfsys-editorial-mega ai-menu">
          <section className="editorial-intro ai-intro"><div className="editorial-art-wrap"><AiVisual/></div><div className="editorial-copy"><span className="editorial-eyebrow">AI & INNOVATION</span><h2>Smarter intelligence for greater impact.</h2><p>Harnessing AI, data and emerging technologies to build more inclusive, resilient and sustainable financial ecosystems.</p><Link href="/ai-innovation" onClick={closeAll}>Explore AI & Innovation <b>→</b></Link></div></section>
          <section className="ai-list">{aiItems.map(([name, desc]) => <Link href="/ai-innovation" key={name} onClick={closeAll}><span>{iconMap[name] || "◈"}</span><div><strong>{name}</strong><small>{desc}</small></div><em>›</em></Link>)}</section>
          <aside className="ai-callout"><span>OUR APPROACH</span><strong>Turning innovation into measurable impact.</strong><Link href="/ai-innovation" onClick={closeAll}>Our Approach →</Link></aside>
        </div>}</div>

        <Link href="/insights" onClick={closeAll}>Insights</Link><Link href="/about" onClick={closeAll}>About MFSYS</Link><Link className="nav-cta" href="/contact" onClick={closeAll}>Get in Touch <span>→</span></Link>
      </nav>
      <div className={`mfsys-editorial-mobile${mobileOpen ? " is-open" : ""}`}><div className="mobile-scroll">{(["solutions","products","industries","ai"] as MenuName[]).map(section => { const label = section === "ai" ? "AI & Innovation" : section[0].toUpperCase()+section.slice(1); return <div key={section}><button onClick={() => mobileToggle(section)}>{label}<span>{mobileSection === section ? "−" : "+"}</span></button>{mobileSection === section && <div>{section === "solutions" && solutions.map(x => <Link key={x[0]} href={x[2]} onClick={closeAll}>{x[0]}</Link>)}{section === "products" && products.map(x => <Link key={x[0]} href={x[2]} onClick={closeAll}>{x[0]}</Link>)}{section === "industries" && industries.map(x => <Link key={x} href="/industries" onClick={closeAll}>{x}</Link>)}{section === "ai" && aiItems.map(x => <Link key={x[0]} href="/ai-innovation" onClick={closeAll}>{x[0]}</Link>)}</div>}</div>})}<Link href="/insights" onClick={closeAll}>Insights</Link><Link href="/about" onClick={closeAll}>About MFSYS</Link><Link className="mobile-cta" href="/contact" onClick={closeAll}>Get in Touch →</Link></div></div>
    </div>
  </header>;
}