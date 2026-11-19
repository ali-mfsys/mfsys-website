export type SearchGuide={
 slug:string;
 title:string;
 metaTitle:string;
 description:string;
 kicker:string;
 lead:string;
 introduction:readonly string[];
 distinctions:{title:string;body:string}[];
 steps:{title:string;body:string}[];
 capabilities:{title:string;body:string}[];
 checks:{title:string;body:string}[];
 faqs:{q:string;a:string}[];
 related:{name:string;href:string;body:string}[];
 sources:{name:string;url:string}[];
 caution:string;
};
export const searchGuides:SearchGuide[]=[
{
 slug:"core-banking-systems",
 title:"Core Banking Systems: A Practical Guide for Banks, MFIs & Credit Unions",
 metaTitle:"Core Banking Systems & Software: Buyer Guide | MFSYS",
 description:"What is a core banking system? Compare core banking software, digital channels, cloud architecture, loan management and migration for banks, SACCOs and credit unions.",
 kicker:"BANKING SYSTEMS / PRACTICAL BUYER GUIDE",
 lead:"A core banking system should make the institution's accounts, products, transactions and accounting dependable. The best buying decision starts with the institution's operating model, not a vendor feature checklist.",
 introduction:[
  "A core banking system (CBS) is the operational system of record for a financial institution. It maintains customer and account information, processes financial events, applies product rules and supports accounting, controls and financial reporting. Mobile apps, websites, branches and payment services rely on the core, but those customer channels are not the core itself.",
  "For a microfinance bank, the distinction matters when a borrower makes a repayment, a field officer originates a loan or a branch opens a savings account. The core must produce an accurate balance and traceable posting regardless of which channel was used.",
  "For credit unions, SACCOs and cooperatives, the same foundation may need member records, savings and shares, community-specific loan products, multiple approval levels and reporting suited to the institution's governance. Every jurisdiction imposes its own regulatory and consumer-protection requirements."
 ],
 distinctions:[
  {title:"Core banking vs digital banking",body:"Core banking manages authoritative accounts, transactions, products and ledgers. Digital banking provides customer channels such as mobile, web and agency experiences. One can modernise without replacing both at once."},
  {title:"Core banking vs loan origination",body:"A loan origination system captures applications, identity checks, underwriting and approvals before disbursement. The core or loan-management system services the approved facility, repayment schedule, financial balance and postings."},
  {title:"Cloud-native vs merely hosted",body:"A cloud-hosted monolith and a modular cloud-native platform are not identical. Evaluate service boundaries, scaling, tenancy isolation, release controls, disaster recovery and API maturity rather than relying on a label."}
 ],
 steps:[
  {title:"Capture a financial event",body:"An authorised channel submits an instruction with identity, account and transaction context."},
  {title:"Apply product and risk rules",body:"The core validates permissions, limits, dates, fees and institution-specific policies."},
  {title:"Post the accounting result",body:"Balanced ledger entries and account-level records are committed with transaction controls."},
  {title:"Connect external services",body:"Payment rails, mobile channels, identity providers and middleware exchange status and evidence."},
  {title:"Reconcile and explain",body:"Operations teams investigate exceptions, account balances, reports and audit trails."}
 ],
 capabilities:[
  {title:"Customer and member lifecycle",body:"Onboarding, KYC and relationship data, configurable identity checks, access roles and record changes."},
  {title:"Accounts, savings and deposits",body:"Current and savings accounts, deposit products, accrual or profit rules, fees, mandates, and lifecycle events."},
  {title:"Lending and loan servicing",body:"Disbursement, amortisation, schedules, arrears, repayments, restructuring and product-specific accounting."},
  {title:"General ledger and finance",body:"Double-entry posting, branch or entity books, subledgers, financial statements, reconciliations and period controls."},
  {title:"APIs and channel connectivity",body:"Secure integrations with wallets, payment switches, online banking, loan origination, data services and reporting."},
  {title:"Institutional supervision",body:"Maker-checker approvals, audit evidence, role-based permissions, reporting and resilience requirements."}
 ],
 checks:[
  {title:"Map the institution before choosing software",body:"Document account types, loan contracts, expected volumes, branch processes, approval responsibilities, regional regulations and required customer channels."},
  {title:"Separate mandatory and optional features",body:"Identify non-negotiable accounting and regulatory functions, then prioritise future channels and AI opportunities without promising day-one delivery."},
  {title:"Verify migration and coexistence",body:"Evaluate data profiling, reconciliation totals, trial migrations, cutover plans, rollback readiness and the ability to operate alongside existing systems during transition."},
  {title:"Demand measurable acceptance criteria",body:"Test representative transaction volumes, exception handling, access permissions, reports, period close and disaster recovery against signed-off scenarios."}
 ],
 faqs:[
  {q:"What is the difference between a core banking platform and banking software?",a:"Banking software is a broad category encompassing the core, loan origination, mobile apps, payments, compliance and analytics. Core banking is the system of record for essential account, transaction and accounting functions."},
  {q:"Can a SACCO or credit union use a microfinance core banking system?",a:"A shared technology foundation may support each, but member shares, savings rules, dividend or interest treatment, governance, reporting and regulatory differences require careful product configuration and validation."},
  {q:"What should an institution ask during a core banking demo?",a:"Request end-to-end tests: onboarding a customer or member, opening an account, originating a loan, posting a repayment, handling an exception and tracing the result into the general ledger and reports."},
  {q:"Does cloud-native banking automatically mean lower cost or regulatory compliance?",a:"No. Total cost depends on hosting, operations, integration, licensing and migration. Regulatory compliance depends on configuration, institutional policies and the applicable jurisdiction."}
 ],
 related:[
  {name:"Glaxity Core Banking",href:"/products/glaxity",body:"Explore MFSYS's next-generation cloud-native core banking platform."},
  {name:"CiiHive heritage",href:"/products/ciihive",body:"Understand how the established CiiHive platform relates to Glaxity."},
  {name:"LoanLeaf loan origination",href:"/products/loanleaf",body:"Connect application, underwriting and decision workflows to the core."},
  {name:"Microfinance & SACCO solutions",href:"/industries/microfinance-banking",body:"See how banking requirements change across member-based institutions."}
 ],
 sources:[
  {name:"Bank for International Settlements — Core principles for banking supervision",url:"https://www.bis.org/bcbs/publ/d573.htm"},
  {name:"MFSYS — Digital banking system architecture",url:"https://mfsys.net/solutions/digital-banking"}
 ],
 caution:"This is a vendor-independent evaluation framework with examples from the MFSYS domain. Product specifications, hosting models, release readiness and regulatory support must be confirmed for each implementation."
},
{
 slug:"ai-in-banking",
 title:"AI in Banking: Practical Uses, Integration Architecture & Controls",
 metaTitle:"AI in Banking: Uses, Risks & Integration | MFSYS",
 description:"Explore AI in banking for credit decisions, loan operations, fraud review and conversational reporting. Learn the data, security and governance needed for responsible adoption.",
 kicker:"AI IN BANKING / PRACTICAL IMPLEMENTATION",
 lead:"Artificial intelligence can help bank staff find information, review exceptions and understand portfolios faster. In regulated finance, useful automation must preserve accuracy, traceability and human accountability.",
 introduction:[
  "AI in banking is more than an automated chatbot. It can include predictive models that estimate risk, document-processing systems that extract information, and generative AI that helps authorised staff navigate policies or ask questions about portfolio data.",
  "A promising use case is conversational reporting: a credit manager asks which loans are more than 30 days overdue. A governed assistant identifies approved data fields, queries a trusted reporting source, returns the requested columns and shows where the numbers came from. It should not invent balances or bypass the institution's normal access rules.",
  "The practical starting point is to choose a narrow problem and assess data quality, permissible use, failure modes and staff review. The objective is improved operational decisions—not unsupervised approvals."
 ],
 distinctions:[
  {title:"Predictive AI",body:"Models estimate risk or patterns using appropriate, validated information. Examples include early delinquency indicators or transaction anomalies, subject to fairness, drift and performance testing."},
  {title:"Generative AI and knowledge retrieval",body:"Language models can summarise procedures, retrieve approved policy passages or translate an authorised question into a structured report. Grounded sources and response verification are essential."},
  {title:"Workflow automation",body:"Traditional rules and event-driven systems remain important. AI can help classify information, but final postings, permissions and approvals should continue through deterministic institutional controls."}
 ],
 steps:[
  {title:"Connect approved information",body:"Read controlled core banking, loan origination and policy data through permitted interfaces."},
  {title:"Apply data and access governance",body:"Validate records, protect personal information and enforce each user's permitted scope."},
  {title:"Retrieve or calculate",body:"Use structured queries, trusted documents or validated models rather than generating financial amounts."},
  {title:"Review material decisions",body:"Present evidence and uncertainty, and route credit, compliance or payment decisions to authorised people."},
  {title:"Monitor and audit",body:"Record data provenance, model versions, user activity, errors and changing performance."}
 ],
 capabilities:[
  {title:"Conversational portfolio reporting",body:"Generate permission-aware arrears, disbursement and portfolio reports from verified sources, with the ability to check every amount against the system of record."},
  {title:"Credit assessment support",body:"Surface affordability indicators and documented risk factors for an officer or credit committee; avoid automatic, unexplained loan rejection."},
  {title:"Document and application handling",body:"Extract fields from identity documents or loan files, compare them with existing records and send exceptions for manual verification."},
  {title:"Collections and customer engagement",body:"Support compliant case prioritisation, reminders and supervisor review while respecting customer-protection, consent and hardship policies."},
  {title:"Risk alerts and financial crime reviews",body:"Assist analysts with anomaly triage, evidence gathering and investigations. Alerts remain hypotheses until verified."},
  {title:"Staff knowledge assistants",body:"Retrieve approved policies, procedures, technical manuals and branch guidance with citations, access checks and content version controls."}
 ],
 checks:[
  {title:"Start with a measurable question",body:"Choose a pilot such as an arrears report or a policy knowledge assistant. Define accuracy, latency, review effort and user acceptance before integrating a model."},
  {title:"Keep financial calculations in controlled systems",body:"Use an approved SQL or service layer for loan balances, accrual, due dates and regulatory measures. Let the assistant explain, not invent, the results."},
  {title:"Design for confidentiality",body:"Review consent, data residency, retention, identity, vendor processing terms, prompt leakage and role-based access before connecting customer information."},
  {title:"Test safety, drift and human hand-off",body:"Evaluate wrong answers, hallucinations, bias, escalation paths and auditability. Make it easy for an authorised user to challenge or correct outputs."}
 ],
 faqs:[
  {q:"How can AI be integrated into an existing core banking system?",a:"An API or controlled reporting layer can expose approved records and workflows. AI then performs retrieval, explanation or triage while the core remains authoritative for balances and postings. Integration depends on vendor interfaces and data permissions."},
  {q:"What is RAG in banking?",a:"Retrieval-augmented generation (RAG) retrieves approved source information—such as policies or documentation—before producing a response. It can improve grounding but does not by itself guarantee accuracy, enforce user permissions or validate ledger balances."},
  {q:"Can generative AI automatically approve or reject loans?",a:"Automated credit decisions raise significant fairness, explainability and regulatory concerns. Banks should define approval authority, validate models and retain appropriate human oversight in line with local requirements."},
  {q:"How do we measure the value of a banking AI pilot?",a:"Compare a real baseline with verified measures such as report preparation time, manual exception workload, error rates, staff adoption and the percentage of outputs requiring correction."}
 ],
 related:[
  {name:"AI & Innovation",href:"/ai-innovation",body:"Explore MFSYS's AI and data-intelligence capabilities."},
  {name:"AI integration & enterprise engineering",href:"/solutions/enterprise-software-development",body:"Discuss architecture, security and system integration."},
  {name:"LoanIQ credit intelligence",href:"/products/loaniq",body:"Understand policy-aware credit decision-support concepts."},
  {name:"Glaxity Core Banking",href:"/products/glaxity",body:"Connect intelligence to the banking system of record."}
 ],
 sources:[
  {name:"Bank for International Settlements — AI data governance in finance",url:"https://www.bis.org/fsi/publ/insights73.pdf"},
  {name:"Bank for International Settlements — AI explainability and supervision",url:"https://www.bis.org/publications/fsi-paper-24-managing-explanations-how-regulators-can-address-ai-explainability"},
  {name:"Google Search Central — Helpful, people-first information",url:"https://developers.google.com/search/docs/fundamentals/creating-helpful-content"}
 ],
 caution:"The workflows shown are illustrative technology designs, not claims that every capability is already deployed in a specific MFSYS product. Banking AI governance, regulatory and data-residency requirements vary by market."
},
{
 slug:"islamic-banking-technology",
 title:"Islamic Banking & Finance: Key Contracts and Digital Technology",
 metaTitle:"Islamic Banking & Finance: Contracts & Software | MFSYS",
 description:"Understand Murabaha, Mudarabah, Musharakah, Ijarah, Salam and Istisna, and how Islamic banking software handles contracts, Shariah review and financial reporting.",
 kicker:"ISLAMIC BANKING / CONTRACTS & DIGITAL SYSTEMS",
 lead:"Islamic banking is built around defined contractual relationships, assets, risk allocation and Shariah oversight. Digital systems must preserve those distinctions instead of treating every product as a conventional loan with different labels.",
 introduction:[
  "Islamic banking and finance use contracts whose rights, responsibilities and commercial outcomes depend on the underlying transaction. Financing can involve a sale, a lease, a partnership or an investment arrangement. It is not enough to replace the word 'interest' in ordinary banking screens with 'profit'.",
  "For an institution, the technology challenge is to capture the parties, asset or investment, contract terms, approval evidence, execution sequence and accounting treatment consistently across branches and digital channels. Shariah policies and regulatory requirements must be reflected in the workflow rather than left to an informal checklist.",
  "ShariahOne is MFSYS's broader Islamic financial services platform concept, while Smart Mudarabah focuses on investment and profit-sharing operations. Both depend on the institution's approved structures and qualified Shariah supervision."
 ],
 distinctions:[
  {title:"Murabaha — cost-plus sale",body:"A seller discloses the asset's acquisition cost and an agreed profit margin. Systems need purchase evidence, asset and ownership records, sale contract execution, amounts owed and settlement controls."},
  {title:"Ijarah — leasing",body:"Financing involves the use of an asset under a lease. Systems should distinguish asset ownership, rental schedules, maintenance responsibilities, contractual dates and end-of-term treatment."},
  {title:"Mudarabah — investment partnership",body:"One party provides capital and another manages the enterprise. Profit shares are agreed under the contract; loss allocation and negligence treatment depend on the governing terms and Shariah rules."},
  {title:"Musharakah — joint participation",body:"Partners contribute capital to a venture. Accounting and monitoring should represent contributions, agreed profit shares, loss treatment and partnership events."},
  {title:"Salam — deferred delivery sale",body:"Payment is made in advance for goods specified for future delivery. Contract data must cover quantity, quality, delivery obligations and settlement events."},
  {title:"Istisna — manufacturing or construction",body:"A contract concerns an asset to be manufactured or constructed under agreed specifications, delivery milestones and payment arrangements."}
 ],
 steps:[
  {title:"Select an approved structure",body:"Choose a product permitted under institutional Shariah rules and jurisdictional policy."},
  {title:"Document parties and assets",body:"Identify counterparties, beneficial relationships, ownership and supporting documents."},
  {title:"Apply contract-specific controls",body:"Configure consideration, profit shares, rentals, milestones and required transaction order."},
  {title:"Review and execute",body:"Apply delegated approvals, Shariah checkpoints and documentary evidence before execution."},
  {title:"Account, monitor and report",body:"Post events through the appropriate ledger and produce operational, financial and Shariah oversight information."}
 ],
 capabilities:[
  {title:"A configurable product catalogue",body:"Differentiate cost-plus sales, leases, partnerships and investment mandates without hiding contractual differences behind a single generic loan form."},
  {title:"Asset and counterparty controls",body:"Manage vendors, customer relationships, ownership, purchase records and transaction sequences relevant to the contract."},
  {title:"Mudarabah profit distribution",body:"Record capital providers, approved profit-sharing ratios, pool activity, allowable expenses and distributable amounts with independently reviewable allocations."},
  {title:"Shariah governance",body:"Maintain decision references, conditions, review steps, exception routing and versioned controls subject to the institution's board or advisers."},
  {title:"Contracts and evidence",body:"Connect offers, approvals, supporting documents, notices and execution records to the correct parties and asset or investment."},
  {title:"Accounting and integration",body:"Pass approved events to subledgers and the general ledger, reconcile bank and settlement instructions, and support relevant regulatory reporting."}
 ],
 checks:[
  {title:"Confirm your approved products",body:"Ask the institution's Shariah advisers to define the exact contract variations, permissible steps and exceptions. Countries and schools of thought may differ."},
  {title:"Map contractual events to system events",body:"Identify when purchase, ownership transfer, investment participation, distribution or rental obligations are legally effective and how accounting reflects them."},
  {title:"Validate profit and loss treatment",body:"Test rounding, periods, expenses, early settlement, impaired assets, loss allocation and any purification requirements against approved policy."},
  {title:"Test end-to-end traceability",body:"Reconstruct a sample transaction from onboarding and contract execution through ledger posting, customer communication and final reporting."}
 ],
 faqs:[
  {q:"What is the difference between Islamic banking software and conventional banking software?",a:"Both may need customer records, accounting and secure digital access. Islamic banking software must also support contract-specific events, asset and ownership information, approved profit-sharing or rental treatment, and Shariah governance."},
  {q:"Is Mudarabah the same as Murabaha?",a:"No. Mudarabah is a capital-and-management investment partnership with agreed profit-sharing provisions. Murabaha is a cost-plus sale in which the seller discloses the asset cost and agreed margin."},
  {q:"Can Islamic banking support mobile and digital channels?",a:"Yes. Mobile apps, portals and APIs can serve customers, but underlying contracts, approvals, ownership and reporting controls remain necessary within the institution's systems."},
  {q:"Does a platform's product list certify Shariah compliance?",a:"No. Compliance depends on actual contract terms, execution, local regulation and approval or review by qualified Shariah authorities. Software must implement those requirements as configured."}
 ],
 related:[
  {name:"ShariahOne Islamic Finance",href:"/products/shariahone",body:"Explore the end-to-end Islamic financing platform."},
  {name:"Smart Mudarabah",href:"/products/smart-mudarabah",body:"Explore investment pools, profit-sharing and institution-specific controls."},
  {name:"Islamic Finance Industry",href:"/industries/islamic-finance",body:"Review sector-level operational requirements."},
  {name:"Glaxity Core Banking",href:"/products/glaxity",body:"Review core banking and ledger integration opportunities."}
 ],
 sources:[
  {name:"Islamic Financial Services Board — Islamic finance terminology and contracts",url:"https://www.ifsb.org/"},
  {name:"Islamic Financial Services Board — Financial inclusion and Islamic finance",url:"https://www.ifsb.org/wp-content/uploads/2023/10/TN-3_-Technical-Note-on-Financial-Inclusion-and-Islamic-Finance_En.pdf"}
 ],
 caution:"This guide is an educational overview, not a fatwa, legal opinion or independent Shariah certification. Products, profit allocation, transaction sequence and compliance rules must be approved by qualified advisers and regulatory authorities as applicable."
}
];
