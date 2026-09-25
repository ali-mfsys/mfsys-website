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
  "Digital Banking Solution": "/menu-assets/icons/icon-banking.svg",
  "Digital Loan Origination System (LOS)": "/menu-assets/icons/icon-los.svg",
  "Islamic Finance": "/menu-assets/icons/icon-islamic-finance.svg",
  "AI-Based Credit Intelligence": "/menu-assets/icons/icon-ai-credit.svg",
  "AI-Enabled Mobile Lending": "/menu-assets/icons/icon-mobile-lending.svg",
  "Digital Wallet & Payment": "/menu-assets/icons/icon-wallet.svg",
  "Agri Finance & Supply Chain": "/menu-assets/icons/icon-agriculture.svg",
  "Climate & Carbon": "/menu-assets/icons/icon-climate.svg",
  "Logistics & Supply Chain": "/menu-assets/icons/icon-logistics.svg",
  "Agentic AI Enterprise Automation": "/menu-assets/icons/icon-agentic-ai.svg",
  "AI & Digital Transformation Consulting": "/menu-assets/icons/icon-consulting.svg",
  CiiHive: "/menu-assets/icons/icon-ciihive.svg",
  LoanLeaf: "/menu-assets/icons/icon-agriculture.svg",
  mConnect: "/menu-assets/icons/icon-data.svg",
  "Smart Mudarabah": "/menu-assets/icons/icon-islamic-finance.svg",
  DigitalKisaan: "/menu-assets/icons/icon-agriculture.svg",
  LoanIQ: "/menu-assets/icons/icon-ai-credit.svg",
  Zaroraat24: "/menu-assets/icons/icon-wallet.svg",
  XchangeCarbon: "/menu-assets/icons/icon-climate.svg",
  CargoGuard: "/menu-assets/icons/icon-logistics.svg",
  "IFRS9 Impairment Solution": "/menu-assets/icons/icon-analytics.svg",
  "Data Analytics & Insights": "/menu-assets/icons/icon-data.svg",
  "AI for Financial Inclusion": "/menu-assets/icons/icon-ai-credit.svg",
  "Emerging Technologies": "/menu-assets/icons/icon-innovation.svg",
  "Innovation Lab": "/menu-assets/icons/icon-innovation.svg",
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
      <span className="mfsys-editorial-icon"><img src={iconMap[name] || "/menu-assets/icons/icon-innovation.svg"} alt="" /></span>
      <span className="mfsys-editorial-item-copy"><strong>{item[0]}</strong><small>{item[1]}</small></span>
      <span className="mfsys-editorial-arrow">›</span>
    </Link>
  );
}

function AssetVisual({ src, className }: { src: string; className: string }) {
  return <div className={`mfsys-editorial-art ${className}`} aria-hidden="true"><img src={src} alt="" /></div>;
}
function SolutionsVisual() { return <AssetVisual src="/menu-assets/graphics/solutions-hero.svg" className="mfsys-art-solutions" />; }
function ProductVisual() { return <AssetVisual src="/menu-assets/graphics/products-hero.svg" className="mfsys-art-products" />; }
function IndustryVisual() { return <AssetVisual src="/menu-assets/graphics/solutions-hero.svg" className="mfsys-art-industries" />; }
function AiVisual() { return <AssetVisual src="/menu-assets/graphics/ai-innovation-hero.svg" className="mfsys-art-ai" />; }}