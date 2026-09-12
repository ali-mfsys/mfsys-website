"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {solutions,products} from "../lib/site-data";

export default function SiteHeader(){
  const pathname=usePathname();
  const [open,setOpen]=useState<"solutions"|"products"|null>(null);
  const [mobileOpen,setMobileOpen]=useState(false);
  const navRef=useRef<HTMLElement>(null);

  // Navigation is intentionally self-closing: selecting any destination,
  // changing route, pressing Escape, or clicking outside dismisses overlays.
  useEffect(()=>{
    setOpen(null);
    setMobileOpen(false);
  },[pathname]);

  useEffect(()=>{
    const close=(e:PointerEvent)=>{
      if(navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey=(e:KeyboardEvent)=>{
      if(e.key==="Escape"){setOpen(null);setMobileOpen(false)}
    };
    document.addEventListener("pointerdown",close);
    document.addEventListener("keydown",onKey);
    return()=>{
      document.removeEventListener("pointerdown",close);
      document.removeEventListener("keydown",onKey);
    };
  },[]);

  const closeAll=()=>{setOpen(null);setMobileOpen(false)};

  return <header className="site-header">
    <div className="container nav-wrap">
      <Link className="brand" href="/" onClick={closeAll} aria-label="MFSYS home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 44 44" role="img">
            <path d="M6 31V12h5.5l8.5 11 8.5-11H34v19h-5V20l-9 11-9-11v11z" fill="currentColor"/>
            <circle cx="36" cy="8" r="3" fill="var(--orange)"/>
          </svg>
        </span>
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
