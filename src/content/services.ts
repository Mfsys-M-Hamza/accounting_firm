/**
 * Services. Each entry generates a detail page at /services/<slug>, a card on
 * the home/services pages, a header dropdown link, a sitemap entry and Service
 * structured data. Add a new service by appending an object — no other file
 * needs editing.
 *
 * Copy is intentionally jurisdiction-neutral. Before launch, have the firm
 * review wording against its own regulatory obligations.
 */
import type { IllustrationName } from "@/components/icons/illustrations";
import type { ImageKey } from "./images";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  illustration: IllustrationName;
  image: ImageKey;
  /** One sentence for cards. */
  summary: string;
  /** H1 on the detail page. */
  headline: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  overview: string[];
  included: ServiceFeature[];
  idealFor: string[];
  benefits: ServiceFeature[];
  deliverables: string[];
  faqs: FaqItem[];
  related: string[];
}

export const services: Service[] = [
  {
    slug: "audit-assurance",
    title: "Audit & Assurance",
    shortTitle: "Audit",
    illustration: "audit",
    image: "auditDocumentReview",
    summary: "Independent, standards-based audits that give owners, lenders and regulators confidence in your numbers.",
    headline: "Audit & Assurance Services You Can Rely On",
    intro:
      "Independent audit and assurance engagements that test the accuracy of your financial statements, strengthen internal controls and give stakeholders confidence in your reporting.",
    metaTitle: "Audit & Assurance Services",
    metaDescription:
      "Statutory, internal and external audits, financial statement audits, compliance reviews and internal controls assessments delivered by an experienced audit team.",
    overview: [
      "An audit is more than a compliance exercise. Done well, it gives directors, shareholders, lenders and investors an independent view of whether the financial statements present a true and fair picture — and it highlights weaknesses in controls before they become costly problems.",
      "Our audit approach is risk-based. We spend time understanding how your business earns revenue, where judgement is involved and which processes carry the most risk, so that testing is focused where it matters and disruption to your team is kept to a minimum.",
      "Engagements are planned in advance with a clear timetable, a document request list and a named point of contact, so you always know what is needed and when.",
    ],
    included: [
      { title: "Statutory Audit", description: "Annual audits for entities required by law or their constitution to have audited financial statements." },
      { title: "Internal Audit", description: "Outsourced or co-sourced internal audit reviewing processes, controls and operational risk." },
      { title: "External Audit", description: "Independent examination of financial statements for shareholders, lenders or other third parties." },
      { title: "Financial Statement Audit", description: "Testing balances, transactions and disclosures against the applicable reporting framework." },
      { title: "Compliance Review", description: "Assessment of adherence to regulatory, contractual or grant-funding requirements." },
      { title: "Internal Controls Review", description: "Walk-throughs and testing of key controls with practical recommendations for improvement." },
      { title: "Risk Assessment", description: "Identification and prioritisation of financial and operational risks across the business." },
    ],
    idealFor: [
      "Companies that meet statutory audit thresholds",
      "Businesses seeking bank finance or investment",
      "Groups, subsidiaries and holding companies",
      "Non-profits and grant-funded organisations",
      "Owners wanting an independent view of controls",
    ],
    benefits: [
      { title: "Stakeholder confidence", description: "Audited statements carry weight with banks, investors, customers and regulators." },
      { title: "Stronger controls", description: "Management letters identify control gaps with clear, prioritised recommendations." },
      { title: "Fewer surprises", description: "Early planning and regular communication mean issues are raised before deadlines." },
    ],
    deliverables: [
      "Audit planning memorandum and timetable",
      "Independent auditor's report",
      "Management letter with control observations",
      "Summary of adjustments and key findings",
    ],
    faqs: [
      {
        question: "How long does an audit usually take?",
        answer:
          "Timing depends on the size and complexity of the business and how ready the records are. We agree a timetable at the planning stage, and most of the fieldwork can be completed within a few weeks once the requested information is available.",
      },
      {
        question: "What will you need from us before the audit starts?",
        answer:
          "We provide a tailored document request list — typically the trial balance, bank statements, key contracts, fixed asset and inventory records, payroll reports and supporting schedules for significant balances.",
      },
      {
        question: "Can you perform an internal audit if we already have an external auditor?",
        answer:
          "Yes. Internal audit focuses on processes and controls for management's benefit and can run alongside your external audit, subject to independence requirements.",
      },
    ],
    related: ["accounting-bookkeeping", "cfo-services", "business-advisory"],
  },
  {
    slug: "taxation",
    title: "Taxation",
    shortTitle: "Tax",
    illustration: "tax",
    image: "taxForms",
    summary: "Corporate, personal and indirect tax compliance and planning — filed accurately and on time.",
    headline: "Tax Compliance & Advisory Without the Stress",
    intro:
      "From registration and returns to forward-looking tax planning, we help businesses and individuals meet their obligations accurately, on time and in the most efficient lawful way.",
    metaTitle: "Tax Consultants — Corporate, Personal & VAT / Sales Tax",
    metaDescription:
      "Corporate tax, personal tax, VAT / sales tax, tax registration, return preparation, tax planning and advisory services for businesses and individuals.",
    overview: [
      "Tax rules change frequently and the cost of getting them wrong — penalties, interest and time spent resolving queries — can be significant. Our tax team keeps track of deadlines and developments so you don't have to.",
      "We combine compliance work with practical advice. As we prepare your returns we look for legitimate reliefs, allowances and structuring opportunities, and we explain the implications of business decisions before you make them.",
      "Where a tax authority raises a query or enquiry, we can help prepare responses and supporting information on your behalf.",
    ],
    included: [
      { title: "Corporate Tax", description: "Computation and filing of company tax returns, including provisions and payment planning." },
      { title: "Personal Tax", description: "Individual returns for directors, sole traders, landlords and high-net-worth individuals." },
      { title: "VAT / Sales Tax", description: "Registration, periodic returns, reconciliations and advice on indirect tax treatment." },
      { title: "Tax Registration", description: "Registering new businesses and individuals with the relevant tax authorities." },
      { title: "Tax Return Preparation", description: "Accurate preparation and submission of returns with a clear summary of liabilities." },
      { title: "Tax Planning", description: "Forward-looking planning around profit extraction, investment and business changes." },
      { title: "Tax Compliance", description: "A managed calendar of deadlines, filings and payments so nothing is missed." },
      { title: "Tax Advisory", description: "Advice on transactions, restructuring, cross-border activity and tax authority queries." },
    ],
    idealFor: [
      "Limited companies and partnerships",
      "Sole traders and freelancers",
      "Directors and shareholders",
      "VAT / sales-tax registered businesses",
      "Property owners and investors",
    ],
    benefits: [
      { title: "Deadlines managed", description: "A compliance calendar and reminders mean filings and payments are never late." },
      { title: "Lawful efficiency", description: "We identify reliefs and allowances you are entitled to claim." },
      { title: "Clear explanations", description: "You'll understand what you owe, why, and when it needs to be paid." },
    ],
    deliverables: [
      "Prepared and filed tax returns",
      "Tax computation and liability summary",
      "Annual tax deadline calendar",
      "Written planning recommendations where relevant",
    ],
    faqs: [
      {
        question: "Can you take over our tax filings mid-year?",
        answer:
          "Yes. We review prior filings and current records, confirm upcoming deadlines and take over from the next available filing period.",
      },
      {
        question: "Do you help with VAT / sales tax registration?",
        answer:
          "Yes. We assess whether and when registration is required, handle the registration process and can prepare your ongoing periodic returns.",
      },
      {
        question: "Do you provide tax advice for individuals as well as companies?",
        answer:
          "Yes. We prepare personal tax returns and advise directors, shareholders, sole traders and individuals with rental or investment income.",
      },
    ],
    related: ["accounting-bookkeeping", "company-formation", "business-advisory"],
  },
  {
    slug: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    shortTitle: "Accounting",
    illustration: "accounting",
    image: "accountingDocuments",
    summary: "Accurate books, timely reconciliations and clear financial statements you can actually use.",
    headline: "Accounting & Bookkeeping That Keeps You in Control",
    intro:
      "Reliable day-to-day bookkeeping, month-end reporting and year-end accounts — so you always know where your business stands and your compliance work is simple.",
    metaTitle: "Accounting & Bookkeeping Services",
    metaDescription:
      "Monthly bookkeeping, bank reconciliation, accounts payable and receivable, management accounts, annual accounts and financial statements for growing businesses.",
    overview: [
      "Good decisions depend on accurate, up-to-date numbers. We take care of the routine recording, reconciling and reporting so that your books are always current and your year-end is straightforward.",
      "We work with your existing accounting software or help you move to a cloud platform, and agree a monthly routine that fits the volume and complexity of your transactions.",
      "Each month you receive clear reports and a short commentary, not just a set of numbers.",
    ],
    included: [
      { title: "Bookkeeping", description: "Recording sales, purchases, expenses and receipts in your accounting system." },
      { title: "Annual Accounts", description: "Year-end financial statements prepared in line with the applicable framework." },
      { title: "Management Accounts", description: "Monthly or quarterly profit and loss, balance sheet and KPI reporting." },
      { title: "Financial Statements", description: "Presentation-ready statements for owners, lenders and investors." },
      { title: "Bank Reconciliation", description: "Regular matching of bank and card transactions to the ledger." },
      { title: "Accounts Payable", description: "Supplier invoice processing, payment scheduling and statement reconciliation." },
      { title: "Accounts Receivable", description: "Customer invoicing support, credit control reporting and debtor tracking." },
    ],
    idealFor: [
      "Startups building their first finance function",
      "SMEs without an in-house accountant",
      "Businesses with a growing transaction volume",
      "Owners who want monthly visibility",
    ],
    benefits: [
      { title: "Always up to date", description: "Books reconciled monthly, so reports reflect reality." },
      { title: "Easier year-end", description: "Clean records reduce accounts preparation time and cost." },
      { title: "Better decisions", description: "Management accounts show margins, trends and cash position." },
    ],
    deliverables: [
      "Reconciled ledgers and bank accounts",
      "Monthly or quarterly management accounts",
      "Aged debtor and creditor reports",
      "Year-end financial statements",
    ],
    faqs: [
      {
        question: "Can you manage our monthly bookkeeping?",
        answer:
          "Yes. We agree a monthly routine — how documents reach us, reconciliation dates and reporting deadlines — and handle the bookkeeping end to end.",
      },
      {
        question: "Which accounting software do you work with?",
        answer:
          "We work with the major cloud and desktop accounting platforms and can advise on the right one for your business if you are starting out or migrating.",
      },
      {
        question: "Our books are behind. Can you help us catch up?",
        answer:
          "Yes. We can bring historic records up to date, reconcile accounts and then move you onto a regular monthly routine.",
      },
    ],
    related: ["taxation", "payroll", "cloud-accounting"],
  },
  {
    slug: "payroll",
    title: "Payroll",
    shortTitle: "Payroll",
    illustration: "payroll",
    image: "payrollTeam",
    summary: "Accurate, confidential payroll processing with the reporting and compliance support to match.",
    headline: "Accurate, Confidential Payroll — Every Pay Run",
    intro:
      "We process payroll accurately and on schedule, keep employee records secure and handle the statutory reporting that comes with employing people.",
    metaTitle: "Payroll Services",
    metaDescription:
      "Outsourced payroll processing, payslips, employee records, payroll reporting and payroll compliance support for businesses of all sizes.",
    overview: [
      "Payroll has to be right every time. Mistakes affect your people directly and can lead to penalties from the authorities. Outsourcing payroll gives you accuracy, confidentiality and one less monthly task.",
      "We handle weekly, fortnightly or monthly pay runs, starters and leavers, deductions and statutory filings, and provide reports that feed straight into your accounts.",
      "Payroll information is handled on a strict need-to-know basis using secure systems.",
    ],
    included: [
      { title: "Payroll Processing", description: "Calculation of gross-to-net pay, deductions and employer contributions each pay period." },
      { title: "Payslips", description: "Clear electronic payslips delivered securely to employees." },
      { title: "Employee Records", description: "Maintenance of starter, leaver and change details in a secure payroll system." },
      { title: "Payroll Reporting", description: "Payroll journals, cost reports and year-end summaries for your accounts." },
      { title: "Compliance Support", description: "Statutory submissions and payments calendar for payroll-related obligations." },
    ],
    idealFor: [
      "Businesses hiring their first employees",
      "Growing teams with changing headcount",
      "Companies wanting payroll kept confidential from internal staff",
      "Employers with multiple pay frequencies",
    ],
    benefits: [
      { title: "On time, every time", description: "A fixed payroll calendar with clear cut-off dates." },
      { title: "Confidentiality", description: "Salary information stays with a small, professional team." },
      { title: "Compliance handled", description: "Statutory reports and deadlines are tracked for you." },
    ],
    deliverables: [
      "Payslips for every employee",
      "Payroll summary and journal each period",
      "Statutory submissions and payment schedule",
      "Year-end payroll reports",
    ],
    faqs: [
      {
        question: "Do you offer payroll services for small teams?",
        answer: "Yes. We run payroll for businesses with one employee through to larger teams, with pricing based on headcount and pay frequency.",
      },
      {
        question: "How do we send you changes each month?",
        answer: "We agree a monthly cut-off date and a simple, secure way to send starters, leavers, overtime and other changes.",
      },
    ],
    related: ["accounting-bookkeeping", "taxation", "cloud-accounting"],
  },
  {
    slug: "business-advisory",
    title: "Business Advisory",
    shortTitle: "Advisory",
    illustration: "advisory",
    image: "advisoryPlanning",
    summary: "Planning, budgeting and financial analysis that turn your numbers into better decisions.",
    headline: "Business Advisory for Confident Growth",
    intro:
      "Practical, numbers-led advice on planning, budgeting, forecasting and cash flow — helping owners make informed decisions about where to take the business next.",
    metaTitle: "Business Advisory Services",
    metaDescription:
      "Business planning, budgeting, forecasting, financial analysis, cash flow management and growth advisory for owner-managed businesses.",
    overview: [
      "Every business reaches points where the decisions get bigger: hiring, expanding, raising finance, launching a new product or entering a new market. Our advisory service gives you a financially grounded view before you commit.",
      "We start with your goals, then build the budgets, forecasts and analysis needed to test them. The result is a plan you understand and can measure progress against.",
    ],
    included: [
      { title: "Business Planning", description: "Structured business plans with financial projections for lenders, investors or internal use." },
      { title: "Budgeting", description: "Annual budgets built with your team and tracked against actual results." },
      { title: "Forecasting", description: "Rolling profit, balance sheet and cash forecasts with scenario analysis." },
      { title: "Financial Analysis", description: "Margin, cost and profitability analysis by product, customer or location." },
      { title: "Business Growth Advisory", description: "Advice on pricing, expansion, funding options and operational efficiency." },
      { title: "Cash Flow Management", description: "Working-capital review and practical steps to improve cash conversion." },
    ],
    idealFor: [
      "Owner-managed businesses planning growth",
      "Companies preparing to raise finance",
      "Businesses facing cash flow pressure",
      "Management teams wanting clearer KPIs",
    ],
    benefits: [
      { title: "Clarity", description: "Understand the financial impact of decisions before you make them." },
      { title: "Accountability", description: "Budgets and KPIs give a clear measure of progress." },
      { title: "Resilience", description: "Scenario planning prepares you for both upside and downside." },
    ],
    deliverables: ["Business plan and financial model", "Annual budget", "Cash flow forecast", "Advisory report with recommendations"],
    faqs: [
      {
        question: "Is business advisory only for large companies?",
        answer: "No. Most of our advisory work is with small and medium-sized, owner-managed businesses where clear financial insight makes a big difference.",
      },
      {
        question: "Can you help us prepare for a bank or investor meeting?",
        answer: "Yes. We can prepare the business plan, projections and supporting analysis lenders and investors typically expect to see.",
      },
    ],
    related: ["cfo-services", "accounting-bookkeeping", "company-formation"],
  },
  {
    slug: "company-formation",
    title: "Company Formation",
    shortTitle: "Formation",
    illustration: "formation",
    image: "companyFormationCity",
    summary: "Start on the right footing — registration, tax setup and compliance foundations handled for you.",
    headline: "Company Formation & Startup Setup",
    intro:
      "We help founders choose the right structure, register the business and put tax, accounting and compliance foundations in place from day one.",
    metaTitle: "Company Formation & Business Registration",
    metaDescription:
      "Business registration, company formation, tax registration, compliance setup and startup advisory for new businesses and founders.",
    overview: [
      "The decisions made at formation — legal structure, share arrangements, registrations and accounting setup — have long-term consequences. Getting them right early saves time and cost later.",
      "We guide you through each step, prepare and file the registration documents, set up your tax registrations and accounting system, and give you a clear compliance calendar for the first year.",
    ],
    included: [
      { title: "Business Registration", description: "Registration with the relevant company or business registry." },
      { title: "Company Formation", description: "Preparation of incorporation documents and initial statutory records." },
      { title: "Tax Registration", description: "Registration for applicable taxes, including VAT / sales tax where required." },
      { title: "Compliance Setup", description: "First-year compliance calendar covering filings and deadlines." },
      { title: "Startup Advisory", description: "Guidance on structure, founder remuneration and early financial planning." },
    ],
    idealFor: ["First-time founders", "Sole traders moving to a company structure", "Overseas businesses establishing a local entity", "Joint ventures and new subsidiaries"],
    benefits: [
      { title: "Right structure", description: "Advice on the structure that suits your plans and risk profile." },
      { title: "Faster setup", description: "Registrations and accounting prepared in one coordinated process." },
      { title: "Compliant from day one", description: "A clear list of obligations and deadlines from the start." },
    ],
    deliverables: ["Registration documents", "Tax registration confirmations", "Accounting system setup", "First-year compliance calendar"],
    faqs: [
      {
        question: "Can you help with company formation?",
        answer:
          "Yes. We advise on structure, prepare and file the registration, arrange tax registrations and set up your accounting so you can start trading with confidence.",
      },
      {
        question: "What information do you need to register a company?",
        answer:
          "Typically the proposed company name, registered address, details of directors and shareholders, share structure and business activity. We confirm the exact requirements for your jurisdiction.",
      },
    ],
    related: ["taxation", "accounting-bookkeeping", "business-advisory"],
  },
  {
    slug: "cfo-services",
    title: "CFO & Financial Advisory",
    shortTitle: "CFO Services",
    illustration: "cfo",
    image: "cfoDashboard",
    summary: "Senior financial leadership on a flexible basis — strategy, reporting and KPIs without a full-time hire.",
    headline: "Virtual CFO & Financial Advisory",
    intro:
      "Access senior finance expertise when you need it: strategic planning, board-level reporting, KPI design and cash flow forecasting, without the cost of a full-time CFO.",
    metaTitle: "Virtual CFO & Financial Advisory Services",
    metaDescription:
      "Virtual CFO services including financial strategy, management reporting, KPI analysis, cash flow forecasting and financial planning for growing companies.",
    overview: [
      "Growing companies often need CFO-level thinking long before they can justify a full-time CFO. Our virtual CFO service provides that expertise on a flexible basis — a few days a month, or more intensively around key events.",
      "We work alongside owners and management to set financial strategy, improve reporting, build forecasting models and prepare for funding rounds, acquisitions or board meetings.",
    ],
    included: [
      { title: "Virtual CFO", description: "Part-time senior finance leadership tailored to your stage and needs." },
      { title: "Financial Strategy", description: "Capital allocation, pricing, funding and long-term financial planning." },
      { title: "Management Reporting", description: "Board packs and monthly reporting designed around decision-making." },
      { title: "KPI Analysis", description: "Defining, tracking and interpreting the metrics that drive your business." },
      { title: "Cash Flow Forecasting", description: "13-week and 12-month cash models with scenario planning." },
      { title: "Financial Planning", description: "Budgets and multi-year plans aligned with business goals." },
    ],
    idealFor: ["Scaling startups and SMEs", "Businesses preparing for investment", "Owners who need a finance sounding board", "Companies between finance hires"],
    benefits: [
      { title: "Senior expertise", description: "Experienced financial leadership at a fraction of a full-time cost." },
      { title: "Investor-ready", description: "Reporting and models that stand up to scrutiny." },
      { title: "Flexible", description: "Scale involvement up or down as the business changes." },
    ],
    deliverables: ["Monthly board or management pack", "KPI dashboard", "Rolling cash flow forecast", "Annual financial plan"],
    faqs: [
      {
        question: "How much time does a virtual CFO spend with us?",
        answer: "That is agreed up front. Many clients start with a few days per month, increasing around year-end, fundraising or major projects.",
      },
      {
        question: "Do you work with our existing bookkeeper or finance team?",
        answer: "Yes. We can oversee and support an in-house team, or combine the CFO role with our own accounting service.",
      },
    ],
    related: ["business-advisory", "audit-assurance", "cloud-accounting"],
  },
  {
    slug: "cloud-accounting",
    title: "Cloud Accounting",
    shortTitle: "Cloud Accounting",
    illustration: "cloud",
    image: "cloudAnalytics",
    summary: "Modern accounting systems, automation and integrations that save time and improve accuracy.",
    headline: "Cloud Accounting Setup & Automation",
    intro:
      "Move your finance function to the cloud. We select, set up and integrate accounting software and automate routine processes so your team spends less time on data entry.",
    metaTitle: "Cloud Accounting Setup & Automation",
    metaDescription:
      "Cloud accounting system setup, migration, automation, app integrations and digital bookkeeping for modern businesses.",
    overview: [
      "Cloud accounting gives you real-time numbers, secure access from anywhere and far less manual processing. The benefits depend on a good setup: the right chart of accounts, sensible integrations and clean opening balances.",
      "We handle system selection, migration and configuration, connect bank feeds and business apps, and train your team so the new system is adopted properly.",
    ],
    included: [
      { title: "Accounting System Setup", description: "Configuration of chart of accounts, tax settings, users and permissions." },
      { title: "Data Migration", description: "Transfer of opening balances and history from your previous system." },
      { title: "Accounting Automation", description: "Bank rules, receipt capture and approval workflows to cut manual work." },
      { title: "Software Integration", description: "Connecting e-commerce, payments, payroll and CRM tools to your ledger." },
      { title: "Digital Bookkeeping", description: "Paperless record-keeping with secure document storage." },
    ],
    idealFor: ["Businesses still using spreadsheets or desktop software", "E-commerce and multi-channel sellers", "Teams working across multiple locations", "Companies wanting real-time reporting"],
    benefits: [
      { title: "Real-time visibility", description: "See your financial position whenever you need it." },
      { title: "Less manual work", description: "Automation removes repetitive data entry and errors." },
      { title: "Secure access", description: "Role-based access and cloud backups protect your data." },
    ],
    deliverables: ["Configured accounting platform", "Migrated opening balances", "Connected bank feeds and apps", "Team training session"],
    faqs: [
      {
        question: "Will moving to cloud accounting disrupt our business?",
        answer: "We plan migrations around a period-end cut-over date and run checks on opening balances so day-to-day operations continue smoothly.",
      },
      {
        question: "Is cloud accounting secure?",
        answer: "Reputable platforms use encryption, access controls and regular backups. We set up user permissions so people only see what they need to.",
      },
    ],
    related: ["accounting-bookkeeping", "payroll", "cfo-services"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
