/**
 * Services. Each entry generates a detail page at /services/<slug>, a card on
 * the home/services pages, a header dropdown link, a sitemap entry and Service
 * structured data. Add a new service by appending an object — no other file
 * needs editing.
 *
 * Copy is written for UK clients (HMRC, Companies House, Making Tax Digital)
 * and reflects the services UK Accountax advertises. Have the firm
 * review figures and wording before launch, as UK thresholds change.
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
    slug: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    shortTitle: "Accounting",
    illustration: "accounting",
    image: "accountingDocuments",
    summary: "Complete monthly and yearly accounting — accurate books, reconciled accounts and year-end accounts filed on time.",
    headline: "Accounting & Bookkeeping That Takes the Headache Away",
    intro:
      "Is bookkeeping a headache when all you want to do is run your business? We provide complete monthly and yearly accounting support so your finances stay accurate, compliant and stress-free.",
    metaTitle: "Accounting & Bookkeeping Services for UK Small Businesses",
    metaDescription:
      "Monthly bookkeeping, bank reconciliations, expense schedules, debtor and creditor reconciliations and year-end accounts for UK small businesses, sole traders and limited companies.",
    overview: [
      "Running a business is already challenging — your accounting shouldn't be. We take care of the routine recording, reconciling and reporting so your books are always current and your year-end is straightforward.",
      "We work in Xero, QuickBooks and other popular packages, and agree a simple monthly routine for sending us your documents. Your records are kept Making Tax Digital-ready, so VAT and tax returns flow straight from your books.",
      "At year end we prepare your annual accounts, file them with Companies House where required and use them for your Corporation Tax or Self Assessment return — all handled by your dedicated accountant.",
    ],
    included: [
      { title: "Bookkeeping", description: "Recording sales, purchases, expenses and receipts in your accounting software." },
      { title: "Bank Reconciliations", description: "Regular matching of bank and card transactions to your ledger." },
      { title: "Expense Schedules", description: "Organised expense tracking, so every allowable cost is claimed." },
      { title: "Debtors & Creditors Reconciliation", description: "Monthly reconciliation of what customers owe you and what you owe suppliers." },
      { title: "Annual Accounts", description: "Year-end statutory accounts prepared and filed with Companies House." },
      { title: "Sole Trader & Partnership Accounts", description: "Clear year-end accounts that feed straight into your tax return." },
      { title: "Catch-Up Bookkeeping", description: "Bringing late or incomplete records up to date, then onto a monthly routine." },
    ],
    idealFor: [
      "Small businesses without an in-house bookkeeper",
      "Limited companies, sole traders and partnerships",
      "Amazon, eBay and e-commerce sellers",
      "Startups setting up their first finance routine",
      "Businesses whose books have fallen behind",
    ],
    benefits: [
      { title: "Always up to date", description: "Books reconciled monthly, so your numbers reflect reality." },
      { title: "Easier year-end", description: "Clean records reduce accounts preparation time and cost." },
      { title: "Better decisions", description: "Know your profit, cash and tax position at any point in the year." },
    ],
    deliverables: [
      "Reconciled bank accounts and ledgers",
      "Aged debtor and creditor reports",
      "Year-end statutory accounts",
      "Companies House filing where applicable",
    ],
    faqs: [
      {
        question: "Can you manage our monthly bookkeeping?",
        answer:
          "Yes. We agree a monthly routine — how documents reach us, reconciliation dates and reporting deadlines — and handle the bookkeeping end to end.",
      },
      {
        question: "Which accounting software do you work with?",
        answer: "We work with Xero, QuickBooks Online and other popular cloud packages, and can help you choose and set one up if you are starting out.",
      },
      {
        question: "Our books are behind. Can you help us catch up?",
        answer: "Yes. We can bring historic records up to date, reconcile your accounts and then move you onto a regular monthly routine.",
      },
    ],
    related: ["vat-services", "taxation", "cloud-accounting"],
  },
  {
    slug: "vat-services",
    title: "VAT Registration & Returns",
    shortTitle: "VAT",
    illustration: "vat",
    image: "auditDocumentReview",
    summary: "VAT registration, Making Tax Digital returns and scheme advice — accurate and always on time.",
    headline: "VAT Registration & Making Tax Digital Returns",
    intro:
      "From deciding when to register to filing every quarterly return through Making Tax Digital software, we handle your VAT so you stay compliant with HMRC and never pay more than you should.",
    metaTitle: "VAT Registration & VAT Returns (Making Tax Digital)",
    metaDescription:
      "VAT registration, quarterly MTD VAT returns, VAT scheme advice, e-commerce and Amazon seller VAT and HMRC correspondence for UK businesses.",
    overview: [
      "VAT is one of the easiest places for a small business to make costly mistakes. You must register once your taxable turnover passes the VAT threshold, keep digital records and file returns through Making Tax Digital-compatible software.",
      "We monitor your turnover against the threshold, handle the registration with HMRC and then prepare and submit your returns from your books, checking that every claim is supported and every sale is treated correctly.",
      "We also advise on whether the Flat Rate, Cash Accounting or Annual Accounting schemes could save you time or money, and on the VAT rules that apply to online and marketplace sellers.",
    ],
    included: [
      { title: "VAT Registration", description: "Checking whether and when you need to register, and handling the HMRC registration." },
      { title: "MTD VAT Returns", description: "Preparing and submitting quarterly or monthly returns through Making Tax Digital software." },
      { title: "VAT Reconciliations", description: "Reconciling your VAT control account to your returns and payments." },
      { title: "VAT Scheme Advice", description: "Assessing the Flat Rate, Cash Accounting and Annual Accounting schemes for your business." },
      { title: "E-commerce VAT", description: "Support for Amazon, eBay and online sellers, including marketplace and import VAT rules." },
      { title: "HMRC Correspondence", description: "Dealing with HMRC VAT queries and checks on your behalf." },
      { title: "VAT Deregistration", description: "Cancelling your VAT registration when it is no longer needed." },
    ],
    idealFor: [
      "Businesses approaching the VAT registration threshold",
      "VAT-registered small businesses and limited companies",
      "Amazon, eBay and e-commerce sellers",
      "Owners who want returns filed without the stress",
    ],
    benefits: [
      { title: "Never miss a deadline", description: "Returns prepared ahead of HMRC's filing and payment dates." },
      { title: "Fully MTD-compliant", description: "Digital records and submissions that meet Making Tax Digital rules." },
      { title: "Pay the right amount", description: "Correct treatment of sales and purchases, and the right scheme for you." },
    ],
    deliverables: ["HMRC VAT registration", "Filed MTD VAT returns", "VAT reconciliation for each period", "VAT payment reminders"],
    faqs: [
      {
        question: "When do I need to register for VAT?",
        answer:
          "You must register if your VAT-taxable turnover for the previous 12 months goes over the registration threshold (£90,000 from 1 April 2024), or if you expect to go over it in the next 30 days alone. You can also register voluntarily below the threshold. We'll check your position and handle the registration.",
      },
      {
        question: "When are VAT returns due?",
        answer:
          "Most businesses file quarterly. The return and payment are normally due one calendar month and seven days after the end of each VAT period. We prepare your return in good time and remind you of the payment date.",
      },
      {
        question: "Do you help Amazon and eBay sellers with VAT?",
        answer:
          "Yes. We work with online and marketplace sellers on VAT registration, returns and the rules on marketplace-collected VAT, so your figures match your sales reports.",
      },
    ],
    related: ["accounting-bookkeeping", "taxation", "cloud-accounting"],
  },
  {
    slug: "taxation",
    title: "Tax Returns & Planning",
    shortTitle: "Tax",
    illustration: "tax",
    image: "taxForms",
    summary: "Self Assessment, Corporation Tax and tax planning — filed accurately and on time with HMRC.",
    headline: "Tax Returns & Tax Planning Without the Stress",
    intro:
      "We prepare and file your Self Assessment and Corporation Tax returns, keep track of every HMRC deadline and review your affairs regularly to make sure you claim every relief you're entitled to.",
    metaTitle: "Tax Returns — Self Assessment, Corporation Tax & Tax Planning",
    metaDescription:
      "Self Assessment tax returns, Corporation Tax returns, tax planning, Making Tax Digital for Income Tax and HMRC enquiry support for UK individuals, sole traders and limited companies.",
    overview: [
      "Tax rules change frequently, and getting them wrong means penalties, interest and time spent dealing with HMRC. We keep track of your deadlines and the latest rules so you don't have to.",
      "As we prepare your returns we look for legitimate reliefs and allowances, and explain the tax impact of decisions — like how to take money out of your company — before you make them.",
      "Making Tax Digital for Income Tax now applies to many sole traders and landlords, with quarterly updates to HMRC. We can set up the right software and handle the submissions for you.",
    ],
    included: [
      { title: "Self Assessment", description: "Personal tax returns for sole traders, directors, landlords and individuals." },
      { title: "Corporation Tax", description: "Company tax computations and CT600 returns, with payment planning." },
      { title: "Tax Planning", description: "Planning around profit extraction, salary and dividends, investment and business changes." },
      { title: "Tax Efficiency Reviews", description: "Regular reviews to ensure your business runs in the most tax-efficient way." },
      { title: "MTD for Income Tax", description: "Software setup and quarterly updates for sole traders and landlords within scope." },
      { title: "Capital Gains Tax", description: "Calculations and reporting on the sale of property, shares and business assets." },
      { title: "HMRC Enquiries", description: "Help responding to HMRC questions, checks and compliance enquiries." },
    ],
    idealFor: [
      "Limited companies and their directors",
      "Sole traders and freelancers",
      "Landlords with rental income",
      "Individuals with untaxed or investment income",
    ],
    benefits: [
      { title: "Deadlines managed", description: "Reminders mean returns and payments are never late." },
      { title: "Lawful efficiency", description: "We identify reliefs and allowances you are entitled to claim." },
      { title: "Clear explanations", description: "You'll understand what you owe, why, and when it needs to be paid." },
    ],
    deliverables: ["Filed Self Assessment or Corporation Tax return", "Tax computation and liability summary", "Payment and deadline reminders", "Written planning recommendations where relevant"],
    faqs: [
      {
        question: "When is the Self Assessment deadline?",
        answer:
          "Online Self Assessment returns and any tax owed are due by 31 January following the end of the tax year (which ends on 5 April). We aim to file well before the deadline so you know your bill in advance.",
      },
      {
        question: "Can you take over our tax filings mid-year?",
        answer: "Yes. We review your previous returns and current records, confirm upcoming deadlines and take over from the next filing.",
      },
      {
        question: "Does Making Tax Digital for Income Tax apply to me?",
        answer:
          "It applies to sole traders and landlords whose qualifying income is above HMRC's thresholds, which are being phased in from April 2026. We'll check whether you are in scope and when, and set you up with compatible software.",
      },
    ],
    related: ["accounting-bookkeeping", "vat-services", "business-advisory"],
  },
  {
    slug: "payroll",
    title: "Payroll Services",
    shortTitle: "Payroll",
    illustration: "payroll",
    image: "payrollTeam",
    summary: "Accurate PAYE payroll, payslips, RTI submissions and pension auto-enrolment — every pay run.",
    headline: "Accurate, Confidential Payroll — Every Pay Run",
    intro:
      "We run your payroll accurately and on schedule, submit Real Time Information to HMRC and handle workplace pension duties, so your team is paid correctly and you stay compliant.",
    metaTitle: "Payroll Services — PAYE, RTI & Auto-Enrolment",
    metaDescription:
      "Outsourced UK payroll: PAYE calculations, payslips, RTI submissions to HMRC, workplace pension auto-enrolment, P60s and P11Ds, and CIS returns.",
    overview: [
      "Payroll has to be right every time. Mistakes affect your people directly and can lead to HMRC penalties. Outsourcing payroll gives you accuracy, confidentiality and one less monthly task.",
      "We handle weekly, fortnightly or monthly pay runs, starters and leavers, statutory pay, PAYE and National Insurance, and the Full Payment Submissions HMRC needs on or before each payday.",
      "We also manage workplace pension auto-enrolment and year-end forms, and can file monthly CIS returns for construction businesses.",
    ],
    included: [
      { title: "Payroll Processing", description: "PAYE tax, National Insurance, student loans and statutory pay calculated each period." },
      { title: "Payslips", description: "Clear electronic payslips delivered securely to employees." },
      { title: "RTI Submissions", description: "Full Payment and Employer Payment Submissions filed with HMRC on time." },
      { title: "Pension Auto-Enrolment", description: "Assessing staff, calculating contributions and handling pension duties." },
      { title: "Year-End Forms", description: "P60s, P45s and P11D benefits reporting." },
      { title: "CIS Returns", description: "Monthly Construction Industry Scheme returns and subcontractor verification." },
    ],
    idealFor: [
      "Businesses hiring their first employees",
      "Directors running a payroll for themselves",
      "Growing teams with changing headcount",
      "Construction businesses using subcontractors",
    ],
    benefits: [
      { title: "On time, every time", description: "A fixed payroll calendar with clear cut-off dates." },
      { title: "Confidentiality", description: "Salary information stays with a small, professional team." },
      { title: "HMRC-compliant", description: "RTI, pension and year-end obligations tracked for you." },
    ],
    deliverables: ["Payslips for every employee", "Payroll summary and journal each period", "RTI submissions and PAYE payment schedule", "P60s and year-end reports"],
    faqs: [
      {
        question: "Do you offer payroll for small teams?",
        answer: "Yes. We run payroll for one-person director payrolls through to larger teams, with pricing based on headcount and pay frequency.",
      },
      {
        question: "Do you handle workplace pensions?",
        answer: "Yes. We assess employees for auto-enrolment, calculate contributions and help you meet your ongoing duties with your pension provider.",
      },
    ],
    related: ["accounting-bookkeeping", "taxation", "cloud-accounting"],
  },
  {
    slug: "company-formation",
    title: "Company Registration & Start-Up",
    shortTitle: "Company Registration",
    illustration: "formation",
    image: "companyFormationCity",
    summary: "Register your UK company and start right — Companies House, HMRC registrations and accounting set up for you.",
    headline: "Register a Company in the UK and Start on the Right Footing",
    intro:
      "Want to register a company in the UK? We help you choose the right structure, form your company with Companies House and set up your HMRC registrations and accounting from day one.",
    metaTitle: "Company Registration & Business Start-Up Support (UK)",
    metaDescription:
      "UK company registration with Companies House, HMRC registrations for Corporation Tax, PAYE and VAT, accounting setup and start-up advice for new businesses.",
    overview: [
      "The decisions you make at the start — sole trader or limited company, share structure, registrations and accounting setup — have long-term tax and legal consequences. Getting them right early saves time and money later.",
      "We guide you through each step, prepare and file your incorporation with Companies House, register you with HMRC for the taxes that apply and set up your bookkeeping, so you can start trading with confidence.",
      "You'll also get a clear first-year calendar covering your confirmation statement, accounts, Corporation Tax and any VAT or payroll deadlines.",
    ],
    included: [
      { title: "Company Formation", description: "Incorporating your private limited company with Companies House." },
      { title: "Structure Advice", description: "Sole trader, partnership or limited company — advice on what suits your plans." },
      { title: "HMRC Registrations", description: "Corporation Tax, Self Assessment, PAYE and VAT registrations where required." },
      { title: "Accounting Setup", description: "Xero or QuickBooks set up with bank feeds from day one." },
      { title: "Compliance Calendar", description: "Your first-year Companies House and HMRC deadlines, all in one place." },
    ],
    idealFor: ["First-time founders", "Sole traders moving to a limited company", "Overseas founders starting a UK company", "Amazon and e-commerce sellers launching a business"],
    benefits: [
      { title: "Right structure", description: "Advice on the structure that suits your plans and tax position." },
      { title: "Faster setup", description: "Registrations and accounting prepared in one coordinated process." },
      { title: "Compliant from day one", description: "A clear list of obligations and deadlines from the start." },
    ],
    deliverables: ["Certificate of incorporation", "HMRC registration confirmations", "Accounting software setup", "First-year compliance calendar"],
    faqs: [
      {
        question: "Can you register a UK limited company for me?",
        answer:
          "Yes. We advise on structure, prepare and file the incorporation with Companies House, arrange your HMRC registrations and set up your accounting so you can start trading.",
      },
      {
        question: "What information do you need to register a company?",
        answer:
          "Typically the proposed company name, registered office address, details of directors and shareholders (who will also need to verify their identity with Companies House), the share structure and the business activity.",
      },
    ],
    related: ["accounting-bookkeeping", "taxation", "business-advisory"],
  },
  {
    slug: "cfo-services",
    title: "Management Accounts & Remote Finance Director",
    shortTitle: "Management Accounts",
    illustration: "cfo",
    image: "cfoDashboard",
    summary: "Monthly management accounts and part-time finance director support — senior insight without a full-time hire.",
    headline: "Management Accounts & Remote Finance Director",
    intro:
      "Making decisions with the right, real-time information is key to growth. We provide monthly or quarterly management accounts and remote finance director support to help you increase profits and improve cash flow.",
    metaTitle: "Management Accounts & Remote Finance Director Services",
    metaDescription:
      "Monthly and quarterly management accounts, KPI reporting, cash flow forecasting and remote finance director support for growing UK businesses.",
    overview: [
      "Getting the right information about your business is key to helping it grow. Management accounts show you profit, margins and cash month by month, not just once a year.",
      "Our remote finance director service gives you senior financial guidance on a flexible basis — when there's a lot on the line, we help you stay compliant, reduce risk and plan ahead.",
    ],
    included: [
      { title: "Management Accounts", description: "Monthly or quarterly profit and loss, balance sheet and commentary." },
      { title: "Remote Finance Director", description: "Part-time senior finance support tailored to your stage and needs." },
      { title: "KPI Reporting", description: "The metrics that drive your business, tracked and explained." },
      { title: "Cash Flow Forecasting", description: "Rolling cash forecasts so you can plan ahead with confidence." },
      { title: "Budgeting", description: "Annual budgets tracked against actual results." },
    ],
    idealFor: ["Growing small and medium-sized businesses", "Owners who need a finance sounding board", "Businesses preparing for finance or investment", "Companies between finance hires"],
    benefits: [
      { title: "Real-time insight", description: "Up-to-date numbers for smarter, faster decisions." },
      { title: "Senior expertise", description: "Finance director experience at a fraction of a full-time cost." },
      { title: "Flexible", description: "Scale support up or down as your business changes." },
    ],
    deliverables: ["Monthly or quarterly management accounts", "KPI dashboard", "Rolling cash flow forecast", "Annual budget"],
    faqs: [
      {
        question: "How often will I receive management accounts?",
        answer: "Monthly or quarterly — whichever suits your business. Each pack includes a short commentary on what the numbers mean.",
      },
      {
        question: "Do you work with our existing bookkeeper?",
        answer: "Yes. We can review and support an in-house bookkeeper, or combine management reporting with our own bookkeeping service.",
      },
    ],
    related: ["business-advisory", "accounting-bookkeeping", "cloud-accounting"],
  },
  {
    slug: "cloud-accounting",
    title: "Xero & QuickBooks Accounting",
    shortTitle: "Cloud Accounting",
    illustration: "cloud",
    image: "cloudAnalytics",
    summary: "The right accounting software, set up properly — Xero, QuickBooks Online, bank feeds and automation.",
    headline: "Xero & QuickBooks Setup, Migration and Support",
    intro:
      "It's important to choose software that meets your business's needs. We help you pick, set up and get the most from Xero or QuickBooks Online, so your records are accurate and Making Tax Digital-ready.",
    metaTitle: "Xero & QuickBooks Accountants — Cloud Accounting Setup",
    metaDescription:
      "Xero and QuickBooks Online setup, migration, bank feeds, receipt capture, e-commerce integrations and training for UK small businesses.",
    overview: [
      "Cloud accounting gives you real-time numbers, secure access from anywhere and far less manual work — but only with a good setup: the right chart of accounts, sensible bank rules and clean opening balances.",
      "We handle software selection, migration and configuration, connect bank feeds and apps such as Amazon, eBay, Shopify and payment providers, and show you how to use the system day to day.",
    ],
    included: [
      { title: "QuickBooks Online", description: "Setup, clean-up and ongoing bookkeeping in QuickBooks." },
      { title: "Xero", description: "Setup, migration and ongoing bookkeeping in Xero." },
      { title: "Bank Feeds & Rules", description: "Automated bank and credit card feeds with rules to cut manual entry." },
      { title: "Receipt Capture", description: "Paperless expense capture with secure document storage." },
      { title: "E-commerce Integrations", description: "Connecting marketplaces, online stores and payment platforms to your ledger." },
      { title: "Training", description: "Practical training so you and your team use the software with confidence." },
    ],
    idealFor: ["Businesses still using spreadsheets or desktop software", "Amazon, eBay and multi-channel sellers", "Businesses that need to be MTD-ready", "Owners who want real-time reporting"],
    benefits: [
      { title: "Real-time visibility", description: "See your financial position whenever you need it." },
      { title: "Less manual work", description: "Automation removes repetitive data entry and errors." },
      { title: "MTD-ready", description: "Digital records that meet HMRC's Making Tax Digital requirements." },
    ],
    deliverables: ["Configured Xero or QuickBooks account", "Migrated opening balances", "Connected bank feeds and apps", "Training session"],
    faqs: [
      {
        question: "Should I use Xero or QuickBooks?",
        answer: "Both are excellent and both are Making Tax Digital-compatible. We'll recommend one based on how you trade, the apps you use and your budget.",
      },
      {
        question: "Will moving software disrupt my business?",
        answer: "We plan migrations around a period-end cut-over date and check opening balances, so day-to-day trading carries on smoothly.",
      },
    ],
    related: ["accounting-bookkeeping", "vat-services", "payroll"],
  },
  {
    slug: "business-advisory",
    title: "Finance & Business Consulting",
    shortTitle: "Consulting",
    illustration: "advisory",
    image: "advisoryPlanning",
    summary: "Financial analysis, business planning and profit growth advice that turn your numbers into better decisions.",
    headline: "Finance & Business Consulting for Confident Growth",
    intro:
      "Expert financial guidance when there's a lot on the line. We help owners analyse performance, plan ahead and grow profit — with clear, practical advice.",
    metaTitle: "Finance & Business Consulting",
    metaDescription:
      "Financial analysis, profit growth analysis, business planning, budgeting, cash flow management and growth advice for UK small businesses and startups.",
    overview: [
      "Every business reaches points where the decisions get bigger: hiring, expanding, raising finance or launching something new. Our consulting gives you a financially grounded view before you commit.",
      "We start with your goals, then build the analysis, plans and forecasts needed to test them — so you have a plan you understand and can measure progress against.",
    ],
    included: [
      { title: "Financial Analysis", description: "A clear analysis of your company's finances, margins and costs." },
      { title: "Profit Growth Analysis", description: "Finding where profit is made and lost — by product, customer or channel." },
      { title: "Business Planning", description: "Business plans with financial projections for lenders, investors or your own use." },
      { title: "Receivables & Payables Control", description: "Tighter credit control and supplier management to protect cash." },
      { title: "Cash Flow Management", description: "Practical steps to improve cash flow and working capital." },
    ],
    idealFor: ["Owner-managed businesses planning growth", "Startups preparing to raise finance", "Businesses facing cash flow pressure", "Owners wanting clearer numbers"],
    benefits: [
      { title: "Clarity", description: "Understand the financial impact of decisions before you make them." },
      { title: "Stronger cash flow", description: "Better control of receivables and payables." },
      { title: "Growth", description: "A clear, measurable plan for increasing profit." },
    ],
    deliverables: ["Financial analysis report", "Business plan and projections", "Cash flow forecast", "Recommendations and action plan"],
    faqs: [
      {
        question: "Is business consulting only for larger companies?",
        answer: "No. Most of our consulting work is with small, owner-managed businesses, where clear financial insight makes the biggest difference.",
      },
      {
        question: "Can you help us prepare for a bank or investor meeting?",
        answer: "Yes. We can prepare the business plan, projections and supporting analysis lenders and investors typically expect to see.",
      },
    ],
    related: ["cfo-services", "accounting-bookkeeping", "company-formation"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
