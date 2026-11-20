import Link from "next/link";

export default function OfflinePage(){
  return (
    <main className="pwa-offline-page">
      <div className="pwa-offline-card">
        <span className="pwa-offline-eyebrow">MFSYS TECHNOLOGIES</span>
        <h1>Connection interrupted</h1>
        <p>We couldn’t load this page just now. Your connection may have been interrupted, or the website may be temporarily unavailable. Please try again.</p>
        <div className="pwa-offline-actions">
          <a href="">Try this page again</a>
          <Link href="/">Return to MFSYS</Link>
        </div>
      </div>
    </main>
  );
}
