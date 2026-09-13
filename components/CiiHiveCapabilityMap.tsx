export default function CiiHiveCapabilityMap(){
 const groups=[
  ["CUSTOMER & CHANNELS","360° customer profile","Digital onboarding • KYC/AML • biometrics","Mobile • tablet • web • branch • agent","Customer service & engagement"],
  ["LENDING & FINANCE","Loan origination & servicing","Individual • group • business lending","Credit scoring • limits • collateral","Flexible schedules • collections"],
  ["DEPOSITS & TRANSACTIONS","Savings • checking • term deposits","Recurring & fixed deposits","Cash & non-cash transactions","Transfers • controls • authorizations"],
  ["OPERATIONS & CONTROL","General ledger & sub-ledgers","Product & workflow management","Financial & regulatory reporting","Auditability & operational controls"],
  ["INTELLIGENCE & RISK","AI credit scoring","Real-time analytics","Risk & portfolio insight","IFRS 9 integration"],
  ["OPEN ECOSYSTEM","Open APIs & events","Identity & payment infrastructure","Insurance • agriculture • fintech integrations","Secure real-time data exchange"]
 ];
 return <section className="ciihive-map-section">
  <div className="container">
   <div className="eyebrow">CIIHIVE CAPABILITY MAP</div>
   <div className="ciihive-map-head"><div><h2>One core. A complete financial-services operating foundation.</h2><p>Built around the capabilities shown in the CiiHive platform overview: customers, lending, deposits, transactions, accounting, digital channels, intelligence and ecosystem integration.</p></div><div className="ciihive-badge"><strong>Cloud-native</strong><span>Cloud-agnostic · API-first · Componentized</span></div></div>
   <div className="ciihive-map">
    <div className="ciihive-orbit orbit-a"/><div className="ciihive-orbit orbit-b"/>
    <div className="ciihive-core"><span>MFSYS</span><strong>CiiHive</strong><small>DIGITAL CORE</small></div>
    {groups.map((g,i)=><article className={"ciihive-node node-"+(i+1)} key={g[0]}>
      <div className="ciihive-node-index">0{i+1}</div><div className="ciihive-node-title">{g[0]}</div><h3>{g[1]}</h3>
      <ul>{g.slice(2).map(x=><li key={x}>{x}</li>)}</ul>
    </article>)}
   </div>
   <div className="ciihive-principles">{["Real-time processing","Open integration","Configurable products","Multi-entity & multi-currency","Multilingual & multi-time-zone","Security by design"].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong></div>)}</div>
  </div>
 </section>
}