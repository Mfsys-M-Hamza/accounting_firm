/**
 * Audiences ("Who We Help"). Each entry generates a landing page at
 * /industries/<slug>, a card on /industries, a home-page tile (first eight),
 * a footer link (first eight) and a sitemap entry. Add an audience by
 * appending an object — no other file needs editing.
 *
 * Tax rules and thresholds below are current UK rules as of November 2026.
 * Have the firm review the wording before launch, as thresholds change.
 */
import type { LucideIcon } from "lucide-react";
import {
  Rocket,
  Store,
  Building2,
  ShoppingCart,
  HardHat,
  House,
  HeartPulse,
  ShoppingBag,
  UtensilsCrossed,
  Briefcase,
  Cpu,
  Laptop,
} from "lucide-react";
import type { FaqItem, ServiceFeature } from "./services";

export interface Industry {
  slug: string;
  name: string;
  icon: LucideIcon;
  /** One sentence for cards and tiles. */
  description: string;
  /** H1 on the landing page. */
  headline: string;
  intro: string;
  metaDescription: string;
  /** Three challenges this audience typically faces. */
  challenges: ServiceFeature[];
  /** What we do for them, as short checklist items. */
  support: string[];
  /** Service slugs from services.ts, most relevant first. */
  services: string[];
  faqs: FaqItem[];
}

export const industryHref = (i: Pick<Industry, "slug">) => `/industries/${i.slug}`;

export const industries: Industry[] = [
  {
    slug: "small-businesses",
    name: "Small Businesses",
    icon: Store,
    description: "Bookkeeping, VAT, payroll and tax support sized for owner-managed UK businesses.",
    headline: "Accountants for UK small businesses",
    intro:
      "Running a small business means wearing every hat. We take care of the bookkeeping, VAT, payroll and year-end work, so the numbers are right and the deadlines are met — and you have one accountant to call when you need advice.",
    metaDescription:
      "Accounting, bookkeeping, VAT, payroll and tax for UK small businesses. A dedicated accountant, clear fees and HMRC and Companies House deadlines handled for you.",
    challenges: [
      { title: "Too little time for the books", description: "Bookkeeping slips behind the day-to-day work, and year-end becomes a scramble to find receipts and reconcile months of transactions." },
      { title: "Keeping up with deadlines", description: "VAT returns, payroll submissions, Self Assessment or Corporation Tax, confirmation statements — each has its own date and its own penalty." },
      { title: "Knowing where you stand", description: "Without up-to-date figures it's hard to judge cash flow, price your work or decide when to hire." },
    ],
    support: [
      "Monthly or quarterly bookkeeping in Xero or QuickBooks",
      "VAT registration and Making Tax Digital VAT returns",
      "Payroll, payslips and RTI submissions to HMRC",
      "Year-end accounts and Corporation Tax or Self Assessment returns",
      "A calendar of your deadlines with reminders before each one",
      "Plain-English advice on tax, cash flow and growth",
    ],
    services: ["accounting-bookkeeping", "vat-services", "taxation"],
    faqs: [
      {
        question: "Do I need an accountant as a small business?",
        answer:
          "There's no legal requirement, but most owners find an accountant saves more than it costs — through accurate filings, avoided penalties and tax reliefs they wouldn't otherwise claim, as well as the time saved.",
      },
      {
        question: "Can you take over from my current accountant?",
        answer:
          "Yes. We contact your previous accountant for the handover information, so you don't have to chase it, and pick up your records from where they left off.",
      },
      {
        question: "Which accounting software do you work with?",
        answer: "We mainly work in Xero and QuickBooks Online, and can help you choose and set up the right one if you don't use either yet.",
      },
    ],
  },
  {
    slug: "startups",
    name: "Startups",
    icon: Rocket,
    description: "Company registration, HMRC setup and simple finance routines from day one.",
    headline: "Accounting support for UK startups",
    intro:
      "The decisions you make in the first months — business structure, registrations, how you pay yourself, how you keep records — shape your tax bill for years. We help you set things up properly from day one.",
    metaDescription:
      "Startup accountants in the UK: company registration, HMRC registrations, bookkeeping set-up, VAT advice and tax-efficient pay for new businesses and founders.",
    challenges: [
      { title: "Choosing the right structure", description: "Sole trader or limited company? The answer affects your tax, your paperwork and your personal liability." },
      { title: "Registering with the right bodies", description: "Companies House, Corporation Tax, PAYE and possibly VAT — each with its own timing rules after you start trading." },
      { title: "Building good habits early", description: "A simple, well-set-up bookkeeping routine now avoids an expensive clean-up at the end of your first year." },
    ],
    support: [
      "Advice on sole trader versus limited company",
      "Company registration with Companies House",
      "Corporation Tax, PAYE and VAT registrations",
      "Xero or QuickBooks set up with bank feeds",
      "Salary and dividend planning for directors",
      "First-year accounts and tax returns",
    ],
    services: ["company-formation", "cloud-accounting", "accounting-bookkeeping"],
    faqs: [
      {
        question: "When do I need to register for Corporation Tax?",
        answer: "A limited company must register for Corporation Tax within three months of starting to do business — which includes buying, selling, advertising or employing someone.",
      },
      {
        question: "Do I need to register for VAT straight away?",
        answer:
          "Only if your VAT-taxable turnover goes over the registration threshold (currently £90,000 in a rolling 12-month period) or you expect it to within 30 days. Some startups register voluntarily — we'll tell you whether that makes sense for you.",
      },
      {
        question: "Can you register my company for me?",
        answer: "Yes. We can register the company with Companies House and complete the HMRC registrations that follow, so everything is set up correctly from the start.",
      },
    ],
  },
  {
    slug: "ecommerce-online-sellers",
    name: "E-commerce & Online Sellers",
    icon: ShoppingCart,
    description: "Amazon, eBay and Shopify reconciliations, marketplace fees and online-sales VAT.",
    headline: "Accountants for e-commerce and online sellers",
    intro:
      "Marketplace payouts rarely match your sales. Fees, refunds, advertising costs and VAT all sit in between. We reconcile your Amazon, eBay, Etsy and Shopify income properly, so your accounts and VAT returns are right.",
    metaDescription:
      "Accounting for Amazon, eBay, Etsy and Shopify sellers in the UK: payout reconciliations, marketplace fees, stock, VAT on online sales and year-end accounts.",
    challenges: [
      { title: "Payouts that don't match sales", description: "Platforms net off fees, refunds and advertising before paying you, so the bank feed alone doesn't show your real sales." },
      { title: "VAT on online sales", description: "Marketplace rules, overseas customers and the VAT registration threshold make it easy to get VAT wrong." },
      { title: "Stock and margins", description: "Knowing your true margin per product means accounting properly for stock, shipping and platform costs." },
    ],
    support: [
      "Reconciliation of marketplace and payment-provider payouts",
      "Correct treatment of fees, refunds and advertising costs",
      "VAT registration and Making Tax Digital VAT returns",
      "Stock and cost-of-sales records at year-end",
      "Connecting sales channels to Xero or QuickBooks",
      "Year-end accounts and tax returns",
    ],
    services: ["accounting-bookkeeping", "vat-services", "cloud-accounting"],
    faqs: [
      {
        question: "Do you work with Amazon, eBay and Shopify sellers?",
        answer: "Yes. We reconcile settlement reports from the main marketplaces and payment providers so that sales, fees and refunds are recorded separately and accurately.",
      },
      {
        question: "Does the VAT threshold include marketplace sales?",
        answer: "Yes — all of your VAT-taxable UK sales count towards the registration threshold, whichever platform they come through. We can check where you stand.",
      },
      {
        question: "How should I account for stock?",
        answer: "Stock you hold at the year-end isn't an expense yet. We help you record opening and closing stock so your profit — and your tax — are calculated correctly.",
      },
    ],
  },
  {
    slug: "sole-traders-freelancers",
    name: "Sole Traders & Freelancers",
    icon: Laptop,
    description: "Self Assessment, expense tracking and Making Tax Digital for Income Tax.",
    headline: "Accountants for sole traders and freelancers",
    intro:
      "Self Assessment, allowable expenses, payments on account and now Making Tax Digital for Income Tax — we keep it simple, file everything on time and make sure you claim what you're entitled to.",
    metaDescription:
      "Accountants for UK sole traders and freelancers: Self Assessment tax returns, allowable expenses, payments on account and Making Tax Digital for Income Tax.",
    challenges: [
      { title: "Self Assessment deadlines", description: "Online returns and any tax owed are due by 31 January, with payments on account adding a second payment date in July." },
      { title: "Claiming the right expenses", description: "Missing allowable expenses means paying too much tax; claiming the wrong ones risks penalties." },
      { title: "Making Tax Digital for Income Tax", description: "Sole traders and landlords with qualifying income over £50,000 must keep digital records and send quarterly updates from April 2026, with lower thresholds following." },
    ],
    support: [
      "Self Assessment tax returns, filed on time",
      "Review of allowable expenses and allowances",
      "Explanation of payments on account and what to set aside",
      "Making Tax Digital for Income Tax readiness and quarterly updates",
      "Simple bookkeeping set-up in software or spreadsheets",
      "Advice on when a limited company might suit you better",
    ],
    services: ["taxation", "accounting-bookkeeping", "cloud-accounting"],
    faqs: [
      {
        question: "Does Making Tax Digital for Income Tax apply to me?",
        answer:
          "It applies to sole traders and landlords whose qualifying income (turnover, not profit) is over £50,000 from April 2026, over £30,000 from April 2027 and over £20,000 from April 2028. We can confirm whether and when it affects you.",
      },
      {
        question: "What are payments on account?",
        answer:
          "If your Self Assessment bill is over £1,000, HMRC usually asks for two advance payments towards next year's tax, due on 31 January and 31 July. We'll show you the amounts so they don't come as a surprise.",
      },
      {
        question: "Should I become a limited company?",
        answer: "Sometimes it saves tax once profits reach a certain level, but it adds costs and responsibilities. We'll run the numbers for your situation before you decide.",
      },
    ],
  },
  {
    slug: "contractors",
    name: "Contractors",
    icon: Briefcase,
    description: "Limited company accounts, salary and dividend planning and IR35 awareness.",
    headline: "Accountants for UK contractors",
    intro:
      "Whether you work through your own limited company or as a sole trader, we handle the accounts, payroll and tax returns, help you pay yourself tax-efficiently and keep you informed about the off-payroll (IR35) rules.",
    metaDescription:
      "Contractor accountants in the UK: limited company accounts, director payroll, salary and dividend planning, VAT, Self Assessment and IR35 awareness.",
    challenges: [
      { title: "Paying yourself efficiently", description: "The balance between salary and dividends affects both your company's tax and your personal tax." },
      { title: "The off-payroll (IR35) rules", description: "Your employment status for each contract affects how you're taxed, and who decides depends on the size of your client." },
      { title: "Company and personal deadlines", description: "Annual accounts, Corporation Tax, confirmation statements, payroll and your own Self Assessment all run on different dates." },
    ],
    support: [
      "Limited company year-end accounts and Corporation Tax returns",
      "Director payroll and dividend paperwork",
      "Salary and dividend planning each tax year",
      "VAT registration and returns where needed",
      "Your personal Self Assessment return",
      "Guidance on IR35 status and what it means for your contracts",
    ],
    services: ["taxation", "accounting-bookkeeping", "payroll"],
    faqs: [
      {
        question: "Who decides whether IR35 applies to my contract?",
        answer:
          "For contracts with medium and large private-sector clients and all public-sector bodies, the client decides your status. For small private-sector clients, your own company is responsible for deciding.",
      },
      {
        question: "How should I pay myself from my company?",
        answer: "Most contractor directors take a modest salary plus dividends, but the right mix depends on your income and circumstances. We review it with you each tax year.",
      },
      {
        question: "Do you do my personal tax return too?",
        answer: "Yes. Most contractors need a Self Assessment return to report dividends, and we prepare it alongside your company's accounts.",
      },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    icon: HardHat,
    description: "CIS returns, subcontractor payments, VAT domestic reverse charge and job costing.",
    headline: "Accountants for the construction industry",
    intro:
      "CIS deductions, subcontractor verification, the VAT domestic reverse charge and job-by-job costing make construction accounting its own discipline. We keep you compliant and help you see which jobs actually make money.",
    metaDescription:
      "Construction accountants in the UK: CIS returns, subcontractor verification, CIS refunds, VAT domestic reverse charge, payroll and job costing.",
    challenges: [
      { title: "The Construction Industry Scheme", description: "Contractors must verify subcontractors, deduct the right CIS rate and file monthly returns to HMRC." },
      { title: "VAT domestic reverse charge", description: "Many construction services between VAT-registered businesses use the reverse charge, which changes how invoices and VAT returns work." },
      { title: "Profit by job", description: "Materials, labour and retentions spread across projects make it hard to see which jobs are profitable." },
    ],
    support: [
      "Subcontractor verification and monthly CIS returns",
      "Reclaiming CIS deductions suffered as a subcontractor",
      "VAT returns including domestic reverse charge invoices",
      "Payroll for directly employed staff",
      "Job costing in Xero or QuickBooks",
      "Year-end accounts and tax returns",
    ],
    services: ["accounting-bookkeeping", "vat-services", "payroll"],
    faqs: [
      {
        question: "What are the CIS deduction rates?",
        answer: "Contractors deduct 20% from payments to registered subcontractors and 30% for unregistered ones. Subcontractors with gross payment status receive payments without deductions.",
      },
      {
        question: "Can I get CIS deductions back?",
        answer:
          "Yes. Sole traders offset them against their Self Assessment bill, and limited companies offset them against their PAYE liabilities or claim a repayment from HMRC. We make sure nothing is left unclaimed.",
      },
      {
        question: "When does the VAT domestic reverse charge apply?",
        answer:
          "It generally applies to standard and reduced-rate construction services between VAT-registered businesses that report under CIS, where the customer isn't the end user. We check your invoices are set up correctly.",
      },
    ],
  },
  {
    slug: "landlords-property",
    name: "Landlords & Property",
    icon: House,
    description: "Rental income accounts, property tax returns and capital gains reporting.",
    headline: "Accountants for landlords and property investors",
    intro:
      "From one buy-to-let to a growing portfolio, we prepare your rental accounts and tax returns, make sure finance costs and expenses are treated correctly, and help you plan for capital gains when you sell.",
    metaDescription:
      "Landlord accountants in the UK: rental income accounts, Self Assessment property returns, mortgage interest relief, Capital Gains Tax reporting and Making Tax Digital.",
    challenges: [
      { title: "Mortgage interest rules", description: "Individual landlords can't deduct residential mortgage interest as an expense; they get a basic-rate tax credit instead." },
      { title: "Capital Gains Tax on sale", description: "Gains on UK residential property must usually be reported and paid within 60 days of completion." },
      { title: "Making Tax Digital for Income Tax", description: "Landlords with qualifying income over £50,000 must keep digital records and file quarterly updates from April 2026." },
    ],
    support: [
      "Rental income and expense accounts for each property",
      "Self Assessment returns including the property pages",
      "Correct treatment of finance costs and repairs",
      "Capital Gains Tax calculations and 60-day property returns",
      "Making Tax Digital for Income Tax readiness",
      "Advice on owning property personally or through a company",
    ],
    services: ["taxation", "accounting-bookkeeping", "business-advisory"],
    faqs: [
      {
        question: "Can I deduct my mortgage interest?",
        answer:
          "If you own residential property personally, you can't deduct mortgage interest from rental income. Instead you receive a tax credit worth 20% of the finance costs. Companies follow different rules.",
      },
      {
        question: "What's the deadline for Capital Gains Tax when I sell?",
        answer: "For UK residential property, you normally need to report the sale and pay any Capital Gains Tax within 60 days of completion.",
      },
      {
        question: "Should I hold property in a limited company?",
        answer: "It can suit some landlords, particularly higher-rate taxpayers with mortgages, but moving existing property into a company can trigger tax. We'll compare the options for you.",
      },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    icon: ShoppingBag,
    description: "Stock, point-of-sale reconciliation, margins and seasonal cash planning.",
    headline: "Accountants for retail businesses",
    intro:
      "Shops live on margins and cash flow. We reconcile your till and card takings, keep stock records accurate and give you the figures you need to plan for quiet months and busy seasons.",
    metaDescription:
      "Accountants for UK retailers: point-of-sale and card reconciliations, stock accounting, VAT retail schemes, payroll, margins and seasonal cash flow planning.",
    challenges: [
      { title: "Reconciling takings", description: "Cash, card terminals and online sales all need to match what your till says you sold." },
      { title: "Stock and margins", description: "Accurate stock counts and costs are essential to know your real gross margin and to calculate tax correctly." },
      { title: "Seasonal cash flow", description: "Buying stock ahead of busy periods puts pressure on cash in the months before the sales arrive." },
    ],
    support: [
      "Daily or weekly reconciliation of till, card and online takings",
      "Stock and cost-of-sales records",
      "VAT returns, including advice on VAT retail schemes",
      "Payroll for shop staff, including part-time and seasonal workers",
      "Margin reports by product range",
      "Cash flow forecasts for seasonal planning",
    ],
    services: ["accounting-bookkeeping", "vat-services", "cfo-services"],
    faqs: [
      {
        question: "Can you connect my point-of-sale system to my accounts?",
        answer: "Many point-of-sale systems connect directly to Xero or QuickBooks. We'll set up the link and check the takings reconcile with your bank.",
      },
      {
        question: "What is a VAT retail scheme?",
        answer: "Retail schemes let businesses that sell to the public calculate VAT from total takings rather than on every sale. We can tell you whether one would suit your shop.",
      },
      {
        question: "How often should I count stock?",
        answer: "At least once a year at your year-end for the accounts. Many retailers count more often to spot losses and keep margins accurate.",
      },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    icon: UtensilsCrossed,
    description: "Shift-based payroll, tips and service charge, cost of sales and cash management.",
    headline: "Accountants for restaurants, cafés and hospitality",
    intro:
      "Shift workers, tips and service charges, tight food and drink margins and plenty of cash — hospitality needs careful bookkeeping and payroll. We keep it accurate and compliant so you can focus on your customers.",
    metaDescription:
      "Hospitality accountants in the UK for restaurants, cafés, pubs and takeaways: shift payroll, tips and tronc, VAT, cost of sales, cash reconciliation and year-end accounts.",
    challenges: [
      { title: "Variable, shift-based payroll", description: "Changing hours, holiday pay and National Minimum Wage checks make every pay run different." },
      { title: "Tips and service charges", description: "Since October 2024 employers must pass on all tips and service charges to workers fairly, and how they're paid affects tax and National Insurance." },
      { title: "Food and drink margins", description: "Small changes in supplier prices or waste have a big effect on profit." },
    ],
    support: [
      "Weekly or monthly payroll for shift-based teams",
      "Handling of tips, service charges and tronc arrangements",
      "Cash and card takings reconciliations",
      "VAT returns, including food and drink rate rules",
      "Gross profit reports for food and drink",
      "Year-end accounts and tax returns",
    ],
    services: ["payroll", "accounting-bookkeeping", "vat-services"],
    faqs: [
      {
        question: "How should tips be paid to staff?",
        answer:
          "Tips can be paid through payroll or through a tronc scheme run independently of the employer, which can change the National Insurance treatment. We'll explain the options and keep the records right.",
      },
      {
        question: "Do you run weekly payroll?",
        answer: "Yes. We run weekly, fortnightly or monthly payroll, including payslips, RTI submissions to HMRC and pension auto-enrolment.",
      },
      {
        question: "Is VAT the same on all food?",
        answer: "No. Much cold takeaway food is zero-rated, while food eaten on the premises, hot takeaway food and most drinks are standard-rated. We check your tills apply the right rates.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    description: "Practice accounts, payroll for clinical teams and cost management.",
    headline: "Accountants for healthcare practices and professionals",
    intro:
      "Whether you run a clinic, a private practice or work as a self-employed practitioner, we look after your accounts, payroll and tax — including the VAT rules that apply to medical services.",
    metaDescription:
      "Accountants for UK healthcare practices and professionals: practice accounts, payroll for clinical teams, VAT on medical services, Self Assessment and tax planning.",
    challenges: [
      { title: "VAT on medical services", description: "Many healthcare services are VAT-exempt, but not all — and mixing exempt and taxable income affects how much VAT you can reclaim." },
      { title: "Payroll for clinical teams", description: "Part-time, sessional and locum arrangements need careful payroll and employment-status decisions." },
      { title: "Running costs", description: "Premises, equipment and staffing costs need close monitoring to keep a practice profitable." },
    ],
    support: [
      "Practice bookkeeping and year-end accounts",
      "Payroll for clinical and administrative staff",
      "Review of VAT exemption and partial exemption",
      "Self Assessment for self-employed practitioners",
      "Management accounts and cost reports",
      "Advice on structure as the practice grows",
    ],
    services: ["accounting-bookkeeping", "payroll", "taxation"],
    faqs: [
      {
        question: "Are healthcare services exempt from VAT?",
        answer: "Medical care provided by registered health professionals is generally VAT-exempt, but some services, such as many cosmetic treatments, are not. We review what you offer and advise accordingly.",
      },
      {
        question: "Do you work with self-employed practitioners?",
        answer: "Yes. We prepare Self Assessment returns and accounts for self-employed and locum practitioners as well as for practices.",
      },
      {
        question: "Can you run payroll for our practice?",
        answer: "Yes, including payslips, RTI submissions to HMRC and pension auto-enrolment for clinical and non-clinical staff.",
      },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    icon: Building2,
    description: "Work-in-progress, profit allocation and cash flow for consultancies and agencies.",
    headline: "Accountants for consultancies and agencies",
    intro:
      "Consultancies, agencies and other professional firms sell time and expertise. We help you track work in progress, keep invoicing and cash flow under control and share profit between partners or directors fairly.",
    metaDescription:
      "Accountants for UK consultancies, agencies and professional services firms: work in progress, project profitability, cash flow, partnership and LLP accounts and tax.",
    challenges: [
      { title: "Work in progress", description: "Unbilled time and part-finished projects need to be valued correctly in your accounts." },
      { title: "Cash flow and late payers", description: "Long payment terms and slow-paying clients can leave a profitable firm short of cash." },
      { title: "Sharing profit", description: "Partnerships, LLPs and companies with several directors need clear, tax-efficient profit allocation." },
    ],
    support: [
      "Bookkeeping and invoicing set-up in Xero or QuickBooks",
      "Work-in-progress valuation at the year-end",
      "Project and client profitability reports",
      "Partnership, LLP or company accounts and tax returns",
      "Cash flow forecasts and credit control routines",
      "Profit-sharing and remuneration planning",
    ],
    services: ["cfo-services", "accounting-bookkeeping", "business-advisory"],
    faqs: [
      {
        question: "Do I need to account for work in progress?",
        answer: "Yes. Work you've done but not yet billed generally has to be included in your accounts, which affects your profit and your tax. We'll value it correctly.",
      },
      {
        question: "Do you prepare partnership and LLP returns?",
        answer: "Yes. We prepare the accounts, the partnership tax return and each partner's Self Assessment return.",
      },
      {
        question: "Can you help us see which clients are profitable?",
        answer: "Yes. With project or client tracking set up in your software, we produce regular reports showing profitability by client or project.",
      },
    ],
  },
  {
    slug: "technology",
    name: "Technology",
    icon: Cpu,
    description: "SaaS metrics, R&D tax relief considerations and investor-ready reporting.",
    headline: "Accountants for technology and software businesses",
    intro:
      "Tech businesses often spend heavily before revenue arrives. We keep your accounts investor-ready, help you understand recurring-revenue metrics and look at whether your work could qualify for R&D tax relief.",
    metaDescription:
      "Accountants for UK technology, software and SaaS businesses: management accounts, recurring revenue metrics, R&D tax relief, investor reporting and payroll.",
    challenges: [
      { title: "Investor-ready numbers", description: "Investors expect clean accounts, a clear burn rate and up-to-date management information." },
      { title: "R&D tax relief", description: "Qualifying research and development can reduce tax or produce a cash credit, but the rules and claim requirements are strict." },
      { title: "Recurring revenue", description: "Annual subscriptions and deferred income need careful treatment to show real monthly performance." },
    ],
    support: [
      "Monthly management accounts and burn-rate reporting",
      "Recurring revenue and deferred income tracking",
      "Review of whether your work may qualify for R&D tax relief",
      "Payroll, including for growing teams",
      "Year-end accounts and Corporation Tax returns",
      "Financial forecasts for fundraising",
    ],
    services: ["cfo-services", "cloud-accounting", "business-advisory"],
    faqs: [
      {
        question: "Could my business claim R&D tax relief?",
        answer:
          "If you're working to resolve scientific or technological uncertainty — not just applying existing technology — you may qualify. We'll review your projects and advise whether a claim is worth pursuing.",
      },
      {
        question: "Do you produce monthly management accounts?",
        answer: "Yes. Monthly or quarterly management accounts give you and any investors a clear view of performance, cash and runway.",
      },
      {
        question: "How should annual subscriptions be recorded?",
        answer: "Income received in advance is usually spread over the period it covers rather than recorded all at once. We set this up so your monthly figures are accurate.",
      },
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
