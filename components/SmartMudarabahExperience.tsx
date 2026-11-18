"use client";

import Link from "next/link";
import {useState} from "react";
import s from "./SmartMudarabahExperience.module.css";

type Surface = "investor" | "advisor" | "operations";

const components = [
 {number:"01 / INVESTMENT",symbol:"◇",title:"Mudarabah investment management",description:"A connected treasury and investor-management platform, from digital KYB and mandate capture to placement, daily profit allocation and investor reporting.",features:["Investor and advisor mobile experiences","Pool, treasury deals and liquidity","Reconciliation and PSR distribution","Statements and regulatory outputs"]},
 {number:"02 / FINANCING",symbol:"↗",title:"Digital Islamic lending",description:"Bring the borrower journey, credit assessment, Shariah-aligned financing and servicing together, with mobile journeys and flexible human approvals.",features:["Borrower and loan-officer applications","Origination, servicing and collections","Employee financing with HR verification","Rules-based and AI-assisted decisions"]},
 {number:"03 / FINANCIAL CONTROL",symbol:"▤",title:"One financial control layer",description:"A unified accounting backbone links investment and financing events to balanced vouchers, subsidiary ledgers and governed financial reporting.",features:["Automated double-entry general ledger","Continuous sub-ledger reconciliation","Maker-checker and segregation of duties","Audit trails and management insight"]}
] as const;

const flow = [
 ["01","Investor onboarding","Corporate KYB, mandate and profit-sharing terms"],
 ["02","Funds confirmed","Receipt, bank credit and investor declaration reconciled"],
 ["03","Treasury placement","Approved counterparty and Shariah-eligible instrument"],
 ["04","Controlled execution","Maker-checker approval and bank instruction"],
 ["05","Profit calculation","Net distributable result and agreed PSR allocation"],
 ["06","Post & report","Investor statements, sub-ledgers and audit records"]
] as const;

const surfaces = [
 {id:"investor" as Surface,num:"01",name:"Investor mobile app",body:"Self-service onboarding, fund confirmation, portfolio positions, profit visibility and statements."},
 {id:"advisor" as Surface,num:"02",name:"Advisor & treasury app",body:"Capture deals, check counterparty eligibility, calculate expected profit and route for approval."},
 {id:"operations" as Surface,num:"03",name:"Operations control centre",body:"Manage the investor book, treasury, reconciliation, PSR allocation, subsidiary ledgers and regulatory reports."}
];

const shariahControls=[
 ["Approved instruments, by design","An eligibility engine checks configured counterparties, instruments and Shariah Board rulings before a deal can proceed."],
 ["Profit-sharing rules you can trace","The PSR engine applies contract-specific ratios to distributable profit, creates investor allocations and keeps calculation evidence."],
 ["Purification with a visible trail","Incidental non-compliant income can be identified, segregated and handled according to the institution’s approved methodology."],
 ["Shariah governance, inside the workflow","Versioned approvals, oversight records, review queues and decision trails support the institution’s Shariah supervisory process."]
] as const;

const integrations=[
 ["IDENTITY","KYC, KYB & NADRA","Verification and compliance screening through approved service integrations."],
 ["TREASURY","Banks & counterparties","Pool transfers, bank instructions, settlement and transaction matching."],
 ["CREDIT","Bureaux & scoring","Risk checks, configurable decisioning and assisted case review."],
 ["EMPLOYERS","HR & payroll","Employment, salary, tenure and deduction feeds for employee financing."],
 ["PAYMENTS","Wallets & RAAST","Configured bank and payment integrations for disbursement and collections."],
 ["FINANCE","Core systems & GL","Financial event posting, subsidiary ledgers and financial consolidation."],
 ["GOVERNANCE","Shariah review","Approved product registers, decision records and purification workflows."],
 ["REPORTING","Regulatory outputs","Structured reporting for applicable local regulator and tax requirements."]
] as const;

const roadmap=[
 ["01","Discover & align","Map products, investors, contracts, policies and Shariah methodologies; agree the integration blueprint."],
 ["02","Configure & demonstrate","Develop vertical workflows in iterative releases, validating real user journeys as they emerge."],
 ["03","Integrate & assure","Rehearse treasury, KYC, lending, accounting and reconciliation; verify security and exception paths."],
 ["04","Pilot & operate","Train teams, complete acceptance testing, run controlled go-live and support the operating transition."]
] as const;

export default function SmartMudarabahExperience(){
 const [surface,setSurface]=useState<Surface>("investor");
 return <main id="main" className={s.page}>
  <section className={s.hero} aria-labelledby="smm-title">
   <div className={s.wrap}>
    <div className={s.heroGrid}>
     <div>
      <span className={s.kicker}>MFSYS / ISLAMIC FINANCE TECHNOLOGY</span>
      <h1 id="smm-title">Smart Mudarabah.<br/><em>Principled finance. Connected intelligence.</em></h1>
      <p className={s.heroLead}>From investment pools and treasury placements to digital Islamic lending and automated accounting, one connected platform helps institutions manage every transaction with clarity, control and Shariah-governed workflows.</p>
      <div className={s.buttons}><Link className={s.buttonPrimary} href="/contact">Request a solution walkthrough <span aria-hidden="true">↗</span></Link><a className={s.buttonGhost} href="#platform">Explore the platform <span aria-hidden="true">↓</span></a></div>
      <div className={s.heroChips}><span>SHARIAH-GOVERNED</span><span>API-FIRST</span><span>INVESTOR TO GENERAL LEDGER</span></div>
     </div>
     <div className={s.heroArt}>
      <div className={s.floatCard+" "+s.floatTwo}><span aria-hidden="true">✓</span><div><strong>Shariah checks</strong><small>Approval controls in the transaction path</small></div></div>
      <div className={s.dashboard} role="img" aria-label="Illustrative investor management and treasury dashboard with profit allocation chart, investor ledger and reconciliation status">
       <div className={s.dashBar}><i/><i/><i/><strong>Smart Mudarabah / Operations</strong></div>
       <div className={s.dashBody}>
        <div className={s.dashHeading}><span>INVESTMENT & TREASURY OVERVIEW</span><b>● Illustrative dashboard</b></div>
        <div className={s.dashTiles}><div className={s.dashTile}><small>Investor portfolio</small><strong>Live</strong></div><div className={s.dashTile}><small>Bank reconciliation</small><strong>Matched</strong></div><div className={s.dashTile}><small>Profit sharing</small><strong>PSR</strong></div></div>
        <div className={s.dashLower}><div className={s.chartBox}><strong>Profit allocation activity</strong><p>Illustrative trend visualization</p><div className={s.bars}><i/><i/><i/><i/><i/><i/><i/><i/></div></div><div className={s.ledgerBox}><strong>Control checkpoints</strong><div className={s.ledgerLine}><span>Investor KYC</span><b>Verified</b></div><div className={s.ledgerLine}><span>Treasury approval</span><b>Reviewed</b></div><div className={s.ledgerLine}><span>GL posting</span><b>Balanced</b></div></div></div>
       </div>
      </div>
      <div className={s.floatCard+" "+s.floatOne}><span aria-hidden="true">↗</span><div><strong>Source to ledger</strong><small>Traceable financial events</small></div></div>
      <div className={s.heroCaption}>Illustrative interface concept · Not live financial data</div>
     </div>
    </div>
    <div className={s.signature}><span>MUDARABAH INVESTMENT MANAGEMENT</span><span>ISLAMIC DIGITAL LENDING</span><span>AUTOMATED FINANCIAL CONTROL</span></div>
   </div>
  </section>

  <nav className={s.anchorNav} aria-label="On-page solution navigation"><div className={s.wrap+" "+s.anchorRow}>
   <a href="#platform">Platform</a><a href="#investment">Investment journey</a><a href="#experiences">Digital experiences</a><a href="#shariah">Shariah governance</a><a href="#lending">Lending</a><a href="#finance">Financial control</a><a href="#architecture">Architecture</a><a href="#delivery">Delivery</a>
  </div></nav>

  <div className={s.stats}><div className={s.wrap+" "+s.statGrid}>
   <div><strong>ONE ECOSYSTEM</strong><span>Investment, lending and accounting connected</span></div>
   <div><strong>THREE CORE COMPONENTS</strong><span>Modular adoption with one financial record</span></div>
   <div><strong>ROLE-LED EXPERIENCES</strong><span>Investor, advisor, officer and operations interfaces</span></div>
   <div><strong>CONTROL BY DESIGN</strong><span>Shariah, approvals, reconciliation and audit</span></div>
  </div></div>

  <section className={s.section+" "+s.soft} id="platform">
   <div className={s.wrap}>
    <div className={s.heading}><span className={s.kicker}>THE BUSINESS CASE</span><h2>Beyond digitisation.<br/><em>Re-engineered around trust.</em></h2><p>When investor transfers, treasury placements, profit allocations and loan transactions depend on disconnected files or manual steps, every new customer adds complexity. Smart Mudarabah brings the activity into a governed flow.</p></div>
    <div className={s.introGrid}>
     <div className={s.problem}><h3>Fragmented operations</h3><p>Transfers confirmed through calls, emails and spreadsheets</p><p>Manual daily profit calculations and investor statements</p><p>Disconnected investment, lending and accounting records</p><p>Compliance dependent on individual checks</p></div>
     <div className={s.answer}><h3>Connected by Smart Mudarabah</h3><p>Structured transfer confirmation and exception reconciliation</p><p>Contract-aware profit calculation and automatic allocation</p><p>Shared operational data, sub-ledgers and balanced GL entries</p><p>Policy and Shariah controls embedded at each decision</p></div>
    </div>
    <div style={{height:38}}/>
    <div className={s.heading}><span className={s.kicker}>ONE CONNECTED FINANCIAL PLATFORM</span><h2>Three capabilities.<br/><em>One operational truth.</em></h2><p>Each component can be phased according to institutional priorities while sharing customers, transactions, controls and reporting.</p></div>
    <div className={s.trio}>{components.map(c=><article key={c.number} className={s.trioCard}><span className={s.trioNum}>{c.number}</span><span className={s.trioIcon} aria-hidden="true">{c.symbol}</span><h3>{c.title}</h3><p>{c.description}</p><ul>{c.features.map(f=><li key={f}>{f}</li>)}</ul></article>)}</div>
   </div>
  </section>

  <section className={s.section+" "+s.flowSection} id="investment">
   <div className={s.wrap}>
    <div className={s.heading+" "+s.darkHeading}><span className={s.kicker}>INVESTMENT OPERATIONS / THE COMPLETE LOOP</span><h2>From investor capital to <em>transparent profit allocation.</em></h2><p>An end-to-end operating model connects the people, records and controls behind every investment transaction — without making the investor wait for a manual statement.</p></div>
    <div className={s.flowGrid}>{flow.map(([n,t,d])=><div className={s.flowStep} key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></div>)}</div>
    <p className={s.flowHint}>Flows are configurable to an institution’s approved products, mandates, settlement processes and Shariah rulings.</p>
   </div>
  </section>

  <section className={s.section} id="experiences">
   <div className={s.wrap}>
    <div className={s.heading}><span className={s.kicker}>ROLE-BASED DIGITAL EXPERIENCES</span><h2>Right information.<br/><em>Right person. Right moment.</em></h2><p>Investors want confidence, advisors need a complete view of their deals, and operations teams need controls they can rely on. Explore how the platform addresses each role.</p></div>
    <div className={s.surfaces}>
     <div><div className={s.surfaceTabs} role="tablist" aria-label="Explore Smart Mudarabah user experiences">
      {surfaces.map(item=><button key={item.id} type="button" className={s.surfaceTab} role="tab" id={"sm-"+item.id} aria-controls="smm-surface-preview" aria-selected={surface===item.id} onClick={()=>setSurface(item.id)}><b>{item.num}</b><span><strong>{item.name}</strong><small>{item.body}</small></span></button>)}
     </div><p className={s.surfaceInfo}>Switch between the views to see representative interface concepts. These visuals demonstrate proposed workflow experiences rather than a client production environment.</p></div>
     <div className={s.surfacePreview} id="smm-surface-preview" role="tabpanel" aria-labelledby={"sm-"+surface}>
      {surface==="investor"?<div className={s.phone}><div className={s.phoneTop}><span>◈ SMART MUDARABAH</span><span>● ● ●</span></div><small className={s.phoneLead}>Welcome back</small><h3>Your investments</h3><div className={s.phoneBalance}><small>Investment portfolio</small><strong>Capital & profit</strong><span>Transparent, up-to-date position</span></div><div className={s.phoneRow}><span>Active placements</span><b>View</b></div><div className={s.phoneRow}><span>Daily profit allocation</span><b>View</b></div><div className={s.phoneRow}><span>Transfer confirmations</span><b>Matched</b></div><div className={s.phoneRow}><span>Statements</span><b>Download</b></div><div className={s.phoneAction}>Explore portfolio →</div></div>:
      <div className={s.previewPanel}><small>{surface==="advisor"?"ADVISOR & TREASURY WORKSPACE":"OPERATIONS & RECONCILIATION"}</small><h3>{surface==="advisor"?"Treasury deal review":"Daily controls overview"}</h3><p>{surface==="advisor"?"Every deal carries an eligibility result, expected profit and a dual-authorisation path.":"A clear view of payments, allocations, exceptions and the state of the subsidiary ledgers."}</p>
       {(surface==="advisor"?[["Instrument eligibility","Shariah-approved"],["Expected profit","Calculated"],["Maker review","Recorded"],["Checker authorisation","Required"]]:[["Investor transfer matching","Reconciled"],["Profit-sharing calculation","Prepared"],["Sub-ledger balances","In balance"],["Regulatory reporting","Available"]]).map(([a,b])=><div className={s.previewRow} key={a}><span>{a}</span><b>{b}</b></div>)}
       <div className={s.previewFooter}>{surface==="advisor"?"Maker → Checker → Execution":"Source event → Posting → Reporting"}</div>
      </div>}
      <div className={s.previewTag}>INTERACTIVE / ILLUSTRATIVE UI</div>
     </div>
    </div>
   </div>
  </section>

  <section className={s.section+" "+s.shariah} id="shariah">
   <div className={s.wrap}>
    <div className={s.heading}><span className={s.kicker}>SHARIAH COMPLIANCE, ENGINEERED</span><h2>Governance belongs in the <em>transaction path.</em></h2><p>Shariah compliance cannot be an after-the-fact checklist. Smart Mudarabah is designed to apply approved business rules before the institution commits funds, with evidence for supervision and audit.</p></div>
    <div className={s.shariahGrid}>
     <div className={s.shariahVisual} role="img" aria-label="Three illustrative Shariah accounting outcomes: profit, commercial loss, and negligence or misconduct, each treated under applicable contract and approved governance rules">
      <div className={s.shariahTop}>Investment outcome · contract-aware treatment</div>
      <div className={s.outcomes}>
       <div className={s.outcome}><strong>01 / Profit realised</strong><p>Allocate eligible distributable profit using the mutually agreed profit-sharing ratio (PSR).</p></div>
       <div className={s.outcome}><strong>02 / Commercial loss</strong><p>Apply capital-loss treatment according to the contract and applicable Shariah rulings.</p></div>
       <div className={s.outcome}><strong>03 / Negligence or misconduct</strong><p>Route exceptions and responsibility determinations through the institution’s approved governance process.</p></div>
      </div>
     </div>
     <div className={s.shariahBullets}>{shariahControls.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
    </div>
   </div>
  </section>

  <section className={s.section}>
   <div className={s.wrap}><div className={s.heading}><span className={s.kicker}>AUTOMATED DAILY OPERATIONS</span><h2>Two critical workflows.<br/><em>One disciplined operating day.</em></h2><p>Reconciliation ensures capital is correctly identified. Distribution ensures income is allocated and recorded according to approved policies and agreed terms.</p></div>
    <div className={s.workflowCards}>
     <article className={s.workflowCard}><span className={s.kicker}>01 / RECONCILIATION</span><h3>Three-way matching</h3><p>Investor declaration, transfer confirmation and bank credit are matched by reference. Unresolved items move into a review queue rather than being silently accepted.</p><div className={s.workflowNodes}><span>Investor declaration</span><span>Transfer evidence</span><span>Bank credit</span></div><div className={s.workflowResult}>↓ &nbsp; Match engine → Recognise funds or create exception</div></article>
     <article className={s.workflowCard}><span className={s.kicker}>02 / PROFIT DISTRIBUTION</span><h3>From gross result to ledgers</h3><p>Calculate distributable profit after approved adjustments, apply the contract-specific PSR and allocate the relevant amounts to investor and Mudarib records.</p><div className={s.workflowNodes}><span>Income & costs</span><span>Distributable result</span><span>Agreed PSR</span></div><div className={s.workflowResult}>↓ &nbsp; Allocation engine → Investor statements & GL posting</div></article>
    </div>
   </div>
  </section>

  <section className={s.section+" "+s.lending} id="lending">
   <div className={s.wrap}>
    <div className={s.heading+" "+s.darkHeading}><span className={s.kicker}>DIGITAL ISLAMIC LENDING</span><h2>Investment and financing.<br/><em>Finally, one ecosystem.</em></h2><p>A digital lending suite extends the investment platform with borrower journeys, loan-officer workflows, Shariah-aligned products and a common operational ledger.</p></div>
    <div className={s.loanGrid}>
     <article className={s.loanCard}><span className={s.kicker}>BORROWER TO SERVICING</span><h3>Apply, verify, decide, serve.</h3><p>Onboarding and eKYC lead to configurable eligibility checks. Qualified cases can move through straight-through processing; exceptions go to an officer for documented review.</p><div className={s.loanSteps}><span>Application</span><i>→</i><span>eKYC</span><i>→</i><span>Decision</span><i>→</i><span>Disbursement</span><i>→</i><span>Servicing</span></div></article>
     <article className={s.loanCard}><span className={s.kicker}>EMPLOYEE FINANCING</span><h3>Financing verified at the source.</h3><p>Subject to integration access, employment and salary information can be verified through an employer HR or payroll connection. Affordability, tenure and repayment deductions inform institution-defined financing rules.</p><div className={s.loanSteps}><span>Employee ID</span><i>→</i><span>HR / Payroll</span><i>→</i><span>Eligibility</span><i>→</i><span>Approval</span></div></article>
     <div className={s.loanPhoto} role="img" aria-label="Islamic finance architectural imagery used to illustrate trust and institution-led financing"><span>SHARIAH-ALIGNED FINANCING</span></div>
     <article className={s.loanCard}><span className={s.kicker}>THE CONNECTED SUITE</span><h3>Purpose-built for every role.</h3><p>Borrower app · Officer app · Credit decisioning · Murabaha, Ijarah and Diminishing Musharakah product support · Servicing and collections · Employer registry · Connected wallets and banks.</p><p>Approvals, profit recognition and contracts follow the institution’s configured policies and independent Shariah governance.</p></article>
    </div>
   </div>
  </section>

  <section className={s.section} id="finance">
   <div className={s.wrap}>
    <div className={s.heading}><span className={s.kicker}>THE FINANCIAL BACKBONE</span><h2>Every transaction tells its story.<br/><em>Every entry balances.</em></h2><p>The financial-control layer translates investment and financing activity into validated double-entry postings, with a complete trail from the originating event to the financial statements.</p></div>
    <div className={s.glBox} role="img" aria-label="Financial architecture: investment and lending source modules feed an event-based accounting engine, which validates and posts to investor or loan sub-ledgers, general ledger, and reporting">
     <div className={s.glSource}><div>◈ &nbsp; Mudarabah investment</div><div>↗ &nbsp; Islamic digital lending</div></div><div className={s.glArrow}>↓</div>
     <div className={s.glPill}>Event-based accounting & rules engine<small>Map → validate → balance → approve where required → post</small></div><div className={s.glArrow}>↓</div>
     <div className={s.glOut}><span>Investor & loan sub-ledgers</span><span>General ledger & control accounts</span><span>Statements, MIS & audit trail</span></div>
     <div className={s.glFoot}><span>✓ Atomic posting</span><span>✓ No duplicate vouchers</span><span>✓ Maker-checker</span><span>✓ Continuous reconciliation</span><span>↳ Exceptions to a controlled review queue</span></div>
    </div>
   </div>
  </section>

  <section className={s.section+" "+s.integration} id="architecture">
   <div className={s.wrap}>
    <div className={s.heading}><span className={s.kicker}>CLOUD-NATIVE & API-FIRST</span><h2>Open to the ecosystem.<br/><em>Governed at the core.</em></h2><p>Secure channels connect through an API and workflow layer to investment, lending, Shariah and accounting services. Managed integrations keep identity verification, external financial networks and reporting systems in step.</p></div>
    <div className={s.connectGrid}>{integrations.map(([group,title,desc])=><article key={title}><span>{group}</span><h3>{title}</h3><p>{desc}</p></article>)}</div>
    <p className={s.fineprint}>Integration availability depends on institutional permissions, third-party contracts and local regulations. Examples are derived from the MFSYS solution design; they are not claims of active integrations for every deployment.</p>
   </div>
  </section>

  <section className={s.section+" "+s.soft} id="delivery">
   <div className={s.wrap}>
    <div className={s.heading}><span className={s.kicker}>DELIVER WITH CONFIDENCE</span><h2>A controlled journey from<br/><em>design to adoption.</em></h2><p>We prioritise the workflows that touch money — Shariah rules, investment reconciliation, profit allocation and sub-ledger integrity — with working demonstrations, documented quality gates and user sign-off.</p></div>
    <div className={s.roadmap}>{roadmap.map(([num,title,body])=><article className={s.roadItem} key={num}><span>PHASE {num}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    <p className={s.fineprint}>Scope, dependencies, timelines and support arrangements are defined for each implementation; third-party integrations and regulatory approvals must be confirmed during discovery.</p>
    <div className={s.heading} style={{marginTop:80}}><span className={s.kicker}>COMMON QUESTIONS</span><h2>Designed for the realities<br/><em>of Islamic finance.</em></h2></div>
    <div className={s.faq}>
     <details><summary>How does Smart Mudarabah differ from ShariahOne?</summary><p>Smart Mudarabah focuses on the integrated Mudarabah investment and treasury lifecycle, digital lending and their financial controls. ShariahOne is the broader Islamic finance platform covering multiple contract and product structures.</p></details>
     <details><summary>Can we adopt investment management separately from lending?</summary><p>The solution architecture allows a phased rollout of investment management, lending and financial control, with scope and integration milestones agreed for each engagement.</p></details>
     <details><summary>Can profit-sharing ratios and policies differ by mandate?</summary><p>Yes. The design supports contract-specific mandates, configurable profit-sharing ratios and Shariah-reviewed calculation and distribution rules.</p></details>
     <details><summary>Does the platform itself certify Shariah compliance?</summary><p>No software substitutes for an institution’s Shariah Supervisory Board or applicable regulatory approvals. The platform helps apply approved rules and retain evidence of their enforcement.</p></details>
    </div>
   </div>
  </section>

  <section className={s.close}>
   <div className={s.wrap+" "+s.closeGrid}>
    <div><span className={s.kicker} style={{color:"#93e3d8"}}>MFSYS / BUILDING SMARTER FINANCIAL FUTURES</span><h2>Better investment journeys. <br/>More confident financial operations.</h2><p>Explore a connected Islamic finance operating model with digital touchpoints, institution-led Shariah governance and accounting controls built for scale.</p></div>
    <div className={s.closeLinks}><Link href="/contact">Discuss Smart Mudarabah ↗</Link><Link href="/products/shariahone">Explore ShariahOne →</Link></div>
   </div>
  </section>
 </main>;
}
