import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Page Not Found | MFSYS", description: "The requested MFSYS page could not be found.", robots: { index: false, follow: false }, alternates: { canonical: null } };
export default function NotFound(){return <main id="main" className="container section"><div className="eyebrow">404</div><h1>Page not found.</h1><p>The page you’re looking for doesn’t exist or may have moved.</p><Link className="btn btn-primary" href="/">Return to MFSYS →</Link></main>}
