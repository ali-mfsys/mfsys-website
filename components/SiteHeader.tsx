"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {solutions,products} from "../lib/site-data";

export default function SiteHeader(){
  const [open,setOpen]=useState<"solutions"|"products"|null>(null);
  const [mobileOpen,setMobileOpen]=useState(false);
  const navRef=useRef<HTMLElement>(null);

  useEffect(()=>{
    const close=(e:MouseEvent)=>{
      if(navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(null);setMobileOpen(false)}};
    document.addEventListener("mousedown",close);
    document.addEventListener("keydown",onKey);
    return()=>{
      document.removeEventListener("mousedown",close);
      document.removeEventListener("keydown",onKey);
    };
  },[]);

  const closeAll=()=>{setOpen(null);setMobileOpen(false)};

  return <header className="site-header">
    <div className="container nav-wrap">
      <Link className="brand" href="/" onClick={closeAll} aria-label="MFSYS home">
        <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40" role="img"><path d="M7 30V10h6l7 10 7-10h6v20h-6V20l-7 10-7-10v10z" fill="currentColor"/></svg></span>
        <span className="brand-copy"><span>MFSYS</span><small>INTELLIGENCE FOR IMPACT</small></span>
      </Link>

      <button className="menu-toggle" aria-expanded={mobileOpen} aria-controls="primary-nav" onClick={()=>setMobileOpen(v=>!v)}>
        {mobileOpen?"Close":"Menu"}
      </button>

      <nav ref={navRef} id="primary-nav" className={mobileOpen?"primary-nav open":"primary-nav"} aria-label="Primary">
        <div className="nav-menu">
          <button className="nav-menu-trigger" aria-expanded={open==="solutions"} aria-controls="solutions-menu" onClick={()=>setOpen(open==="solutions"?null:"solutions")}>Solutions</button>
          {open==="solutions"&&<div id="solutions-menu" className="mega" role="menu">
            <div className="mega-intro"><strong>Solutions</strong><p>Intelligent platforms for financial services, digital economies and sustainable enterprises.</p></div>
            <div className="mega-grid">{solutions.map(x=><Link key={x[0]} href={x[2]} role="menuitem" onClick={closeAll}>{x[0]}</Link>)}</div>
          </div>}
        </div>
        <div className="nav-menu">
          <button className="nav-menu-trigger" aria-expanded={open==="products"} aria-controls="products-menu" onClick={()=>setOpen(open==="products"?null:"products")}>Products</button>
          {open==="products"&&<div id="products-menu" className="mega" role="menu">
            <div className="mega-intro"><strong>Products</strong><p>Purpose-built technology engineered around real-world financial and enterprise challenges.</p></div>
            <div className="mega-grid">{products.map(x=><Link key={x[0]} href={x[2]} role="menuitem" onClick={closeAll}>{x[0]}</Link>)}</div>
          </div>}
        </div>
        <Link href="/industries" onClick={closeAll}>Industries</Link>
        <Link href="/ai-innovation" onClick={closeAll}>AI & Innovation</Link>
        <Link href="/insights" onClick={closeAll}>Insights</Link>
        <Link href="/about" onClick={closeAll}>About MFSYS</Link>
        <Link className="nav-cta" href="/contact" onClick={closeAll}>Contact</Link>
      </nav>
    </div>
  </header>;
}