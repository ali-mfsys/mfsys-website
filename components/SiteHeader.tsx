'use client';
import Link from "next/link";
import {useState} from "react";
import {solutions,products} from "../lib/site-data";
export default function SiteHeader(){
 const [open,setOpen]=useState(false);
 return <header className="site-header"><div className="container nav-wrap">
  <Link className="brand" href="/"><span>MFSYS</span><small>INTELLIGENCE FOR IMPACT</small></Link>
  <button className="menu-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={()=>setOpen(!open)}>{open?"Close":"Menu"}</button>
  <nav id="primary-nav" className={open?"primary-nav open":"primary-nav"} aria-label="Primary">
   <details><summary>Solutions</summary><div className="mega"><div><strong>Solutions</strong><p>Intelligent platforms for financial services and digital economies.</p></div><div className="mega-grid">{solutions.map(x=><Link key={x[0]} href={x[2]} onClick={()=>setOpen(false)}>{x[0]}</Link>)}</div></div></details>
   <details><summary>Products</summary><div className="mega"><div><strong>Products</strong><p>Purpose-built technology engineered for impact.</p></div><div className="mega-grid">{products.map(x=><Link key={x[0]} href={x[2]} onClick={()=>setOpen(false)}>{x[0]}</Link>)}</div></div></details>
   <Link href="/industries">Industries</Link><Link href="/ai-innovation">AI & Innovation</Link><Link href="/insights">Insights</Link><Link href="/about">About MFSYS</Link><Link className="nav-cta" href="/contact">Contact</Link>
  </nav>
 </div></header>
}