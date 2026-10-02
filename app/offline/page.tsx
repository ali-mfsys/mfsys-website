import Link from "next/link";

export default function OfflinePage(){
  return (
    <main className="pwa-offline-page">
      <div className="pwa-offline-card">
        <span className="pwa-offline-eyebrow">MFSYS TECHNOLOGIES</span>
        <h1>You’re offline</h1>
        <p>The page you requested is not available in the current offline cache. Reconnect to the internet and try again.</p>
        <Link href="/">Return to MFSYS</Link>
      </div>
    </main>
  );
}
