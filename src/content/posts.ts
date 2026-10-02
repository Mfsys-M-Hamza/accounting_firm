/**
 * Resource centre articles. To publish a new article, add an object to `posts`.
 * The listing, category filters, search, sitemap, related posts and Article
 * structured data update automatically.
 *
 * Articles are general guidance for UK businesses, not advice for a specific
 * situation — each page carries a disclaimer to that effect.
 */
import type { ImageKey } from "./images";

export const categories = ["Accounting", "VAT", "Tax", "Business", "Compliance", "Finance", "Startup Guides"] as const;
export type Category = (typeof categories)[number];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  image: ImageKey;
  /** ISO dates. */
  publishedAt: string;
  updatedAt?: string;
  /** Leave undefined to credit the firm's editorial team. */
  author?: string;
  readingMinutes: number;
  featured?: boolean;
  body: Block[];
}

export const posts: Post[] = [
  {
    slug: "month-end-close-checklist-small-business",
    title: "A Practical Month-End Close Checklist for Small Businesses",
    excerpt:
      "A simple, repeatable month-end routine keeps your books accurate, makes tax time easier and gives you numbers you can actually use to run the business.",
    category: "Accounting",
    image: "blogReports",
    publishedAt: "2026-09-08",
    readingMinutes: 6,
    featured: true,
    body: [
      { type: "p", text: "Many small businesses only look closely at their books when a tax return or year-end deadline is approaching. By then, missing receipts are hard to find, bank transactions are months old and errors have compounded. A short, consistent month-end close fixes this. It turns bookkeeping into a routine rather than a rescue mission." },
      { type: "h2", text: "Why a month-end close matters" },
      { type: "p", text: "Closing the books each month means confirming that everything which happened in the period has been recorded correctly, then locking the period so it can't be changed accidentally. The benefits are practical:" },
      { type: "ul", items: ["You see your real profit and cash position within days of the month ending.", "Errors are caught while the details are still fresh.", "Year-end accounts and tax returns take less time — and usually cost less.", "Lenders and investors get reliable figures when they ask for them."] },
      { type: "h2", text: "The checklist" },
      { type: "h3", text: "1. Record all sales and purchases" },
      { type: "p", text: "Make sure every sales invoice has been raised and every supplier bill has been entered. Chase any missing supplier invoices and capture receipts for card spending." },
      { type: "h3", text: "2. Reconcile every bank, card and payment account" },
      { type: "p", text: "Match each transaction on your statements to the accounting system, including payment processors and online marketplaces. The closing balance in your books should agree to the statement. Investigate anything that doesn't match rather than forcing it." },
      { type: "h3", text: "3. Review receivables and payables" },
      { type: "p", text: "Look at your aged debtors and creditors reports. Follow up overdue customer invoices, check for duplicate supplier bills and confirm that credit notes have been applied." },
      { type: "h3", text: "4. Post accruals, prepayments and recurring journals" },
      { type: "p", text: "Record costs that belong to this month but haven't been invoiced yet, and spread annual payments such as insurance or software subscriptions over the months they cover. Post depreciation if you hold fixed assets." },
      { type: "h3", text: "5. Check payroll and tax control accounts" },
      { type: "p", text: "Confirm that payroll journals have been posted and that the balances owed for payroll taxes and VAT / sales tax agree to the returns you expect to file." },
      { type: "h3", text: "6. Review the reports" },
      { type: "p", text: "Read the profit and loss account and balance sheet. Compare them with last month and the same month last year. Unusual movements often reveal a mis-posting." },
      { type: "h3", text: "7. Lock the period" },
      { type: "p", text: "Once you're satisfied, set a lock date in your accounting software so the closed month can't be changed without a deliberate override." },
      { type: "callout", text: "Aim to finish your close within 5–10 working days of month-end. Speed matters less than consistency: a reliable routine every month beats a perfect close twice a year." },
      { type: "h2", text: "Making it sustainable" },
      { type: "p", text: "Automation helps a great deal. Bank feeds, receipt-capture apps and bank rules in cloud accounting software remove most of the manual data entry. What remains — review and judgement — is where an experienced bookkeeper or accountant adds the most value." },
      { type: "p", text: "If month-end keeps slipping down your to-do list, outsourcing the routine to a professional bookkeeping team is often cheaper than it looks once you count the time it saves you." },
    ],
  },
  {
    slug: "vat-registration-uk-small-business-guide",
    title: "VAT Registration in the UK: When You Need to Register and What Comes Next",
    excerpt:
      "Crossing the VAT threshold changes how you price, invoice and report. Here's how to know when you must register, and how to stay on top of VAT returns under Making Tax Digital.",
    category: "VAT",
    image: "blogGrowthChart",
    publishedAt: "2026-08-25",
    readingMinutes: 6,
    body: [
      { type: "p", text: "For many small businesses, registering for VAT is the first big compliance milestone. Register too late and HMRC can charge the VAT you should have collected plus a penalty; register without planning and your prices or margins can take a hit. A little preparation avoids both." },
      { type: "h2", text: "When you must register" },
      { type: "p", text: "You must register for VAT if your VAT-taxable turnover for any rolling 12-month period goes over the registration threshold — £90,000 since 1 April 2024. You must also register if you expect your taxable turnover to go over the threshold in the next 30 days alone." },
      { type: "ul", items: ["Check your turnover at the end of every month, looking back over the previous 12 months — not just your financial year.", "If you go over the threshold, you must register within 30 days of the end of that month.", "Exempt sales don't count towards the threshold, but zero-rated sales do."] },
      { type: "callout", text: "Thresholds change. Always check the current figure on GOV.UK, or ask us to monitor your turnover for you." },
      { type: "h2", text: "Should you register voluntarily?" },
      { type: "p", text: "You can register below the threshold. It can make sense if most of your customers are VAT-registered businesses (they can reclaim the VAT you charge) or if you make zero-rated sales and want to reclaim VAT on your costs. If you sell mainly to consumers, registering early usually means either raising prices or absorbing the VAT." },
      { type: "h2", text: "Making Tax Digital for VAT" },
      { type: "p", text: "All VAT-registered businesses must keep digital records and file VAT returns using Making Tax Digital-compatible software, such as Xero or QuickBooks. Most businesses file quarterly, and the return and payment are normally due one calendar month and seven days after the end of each VAT period." },
      { type: "h2", text: "Schemes that can make VAT simpler" },
      { type: "h3", text: "Flat Rate Scheme" },
      { type: "p", text: "You pay a fixed percentage of your VAT-inclusive turnover instead of calculating VAT on every sale and purchase. It can save time for smaller businesses with few costs, but it isn't always cheaper — run the numbers first." },
      { type: "h3", text: "Cash Accounting Scheme" },
      { type: "p", text: "You account for VAT when customers pay you and reclaim it when you pay suppliers, rather than on invoice dates — helpful if customers pay slowly." },
      { type: "h3", text: "Annual Accounting Scheme" },
      { type: "p", text: "You file one VAT return a year and make advance payments during the year, which can make budgeting easier." },
      { type: "h2", text: "Online and marketplace sellers" },
      { type: "p", text: "If you sell through Amazon, eBay or other online marketplaces, some VAT may be collected by the marketplace itself, depending on where you and your goods are based. Make sure your records separate marketplace-collected VAT from the VAT you're responsible for, and reconcile your marketplace reports to your returns." },
      { type: "h2", text: "Getting it right from day one" },
      { type: "p", text: "Once registered, you'll need to charge VAT at the right rate, issue valid VAT invoices, keep digital records and file on time. If you're approaching the threshold, talk to us — we can register you, set up your software and file your returns so you never miss a deadline." },
    ],
  },
  {
    slug: "record-keeping-habits-for-easier-tax-season",
    title: "Seven Record-Keeping Habits That Make Tax Season Easier",
    excerpt:
      "Most tax-time stress comes from poor records, not complicated rules. These habits keep your paperwork organised all year round.",
    category: "Tax",
    image: "blogTaxStatement",
    publishedAt: "2026-08-11",
    readingMinutes: 5,
    body: [
      { type: "p", text: "Whether you run a company, work as a freelancer or earn rental income, the quality of your records largely determines how quick, accurate and affordable your tax return will be. Here are seven habits that make a real difference." },
      { type: "h2", text: "1. Separate business and personal finances" },
      { type: "p", text: "Use a dedicated business bank account and card. Mixing personal and business spending makes every transaction a question, and increases the risk of claiming something you shouldn't — or missing something you should." },
      { type: "h2", text: "2. Capture receipts as you go" },
      { type: "p", text: "Photograph or forward receipts the day you receive them using a receipt-capture app linked to your accounting software. Faded paper receipts found in a drawer months later are hard to match and easy to lose." },
      { type: "h2", text: "3. Record the reason, not just the amount" },
      { type: "p", text: "A short note — who you met, what the purchase was for — turns an ambiguous expense into a clearly allowable one and saves time answering questions later." },
      { type: "h2", text: "4. Keep a record of assets" },
      { type: "p", text: "Equipment, vehicles and computers are often treated differently from day-to-day expenses for tax purposes. Keep invoices and note when each asset was bought and, later, sold." },
      { type: "h2", text: "5. Reconcile monthly" },
      { type: "p", text: "A monthly bank reconciliation catches missing income and duplicated expenses while they are easy to fix." },
      { type: "h2", text: "6. Track key deadlines" },
      { type: "p", text: "Keep a calendar of filing and payment dates for each tax you're registered for. Late filing penalties are often charged even when no tax is owed." },
      { type: "h2", text: "7. Keep records for the required period" },
      { type: "p", text: "Tax authorities require records to be retained for a minimum number of years, which varies by jurisdiction and tax type. Digital storage makes this easy — make sure it is backed up." },
      { type: "callout", text: "Retention periods and allowable expenses differ between countries and taxes. Confirm the rules that apply to you with a qualified tax adviser." },
    ],
  },
  {
    slug: "cash-flow-forecasting-guide-for-owners",
    title: "Cash Flow Forecasting: A Practical Guide for Business Owners",
    excerpt:
      "Profitable businesses still run out of cash. A simple rolling forecast shows problems weeks in advance, while there is still time to act.",
    category: "Finance",
    image: "blogTrend",
    publishedAt: "2026-07-28",
    readingMinutes: 6,
    body: [
      { type: "p", text: "Profit and cash are not the same thing. A business can be profitable on paper while its bank balance falls, because customers pay late, stock is bought in advance or loan repayments and tax bills land in the same month. A cash flow forecast makes those timing differences visible." },
      { type: "h2", text: "Start with a 13-week forecast" },
      { type: "p", text: "A 13-week (quarterly) forecast, updated weekly, is the most useful tool for managing short-term cash. It is detailed enough to be accurate and short enough to maintain." },
      { type: "ul", items: ["Opening bank balance", "Expected receipts from customers, based on when they actually pay", "Supplier payments, payroll, rent and other fixed costs", "Tax payments, loan repayments and one-off items", "Closing balance, which becomes next week's opening balance"] },
      { type: "h2", text: "Be realistic about receipts" },
      { type: "p", text: "Base customer receipts on actual payment behaviour, not invoice terms. If customers on 30-day terms typically pay in 45 days, forecast 45." },
      { type: "h2", text: "Compare forecast to actual" },
      { type: "p", text: "Each week, compare what you forecast with what happened. Consistent differences tell you where the forecast — or the business — needs attention." },
      { type: "h2", text: "Use scenarios" },
      { type: "p", text: "Create a downside version: what if your largest customer pays a month late, or sales fall by 15%? Knowing how much headroom you have makes it easier to decide when to arrange finance, delay spending or push collections." },
      { type: "callout", text: "The best time to talk to your bank about a facility is when you don't urgently need one. A forecast shows when that conversation should happen." },
      { type: "h2", text: "Levers to improve cash" },
      { type: "ul", items: ["Invoice promptly and follow up overdue accounts systematically", "Offer convenient payment methods", "Review stock levels and slow-moving items", "Negotiate supplier terms that match your customer terms", "Plan for tax payments by setting cash aside monthly"] },
    ],
  },
  {
    slug: "choosing-a-business-structure",
    title: "Choosing a Business Structure: Questions to Ask Before You Register",
    excerpt:
      "Sole trader, partnership or limited company? The right answer depends on risk, tax, funding plans and administration — here's how to think it through.",
    category: "Startup Guides",
    image: "blogStrategySession",
    publishedAt: "2026-07-14",
    readingMinutes: 6,
    body: [
      { type: "p", text: "The legal structure you choose affects your personal liability, how you're taxed, how easily you can raise investment and how much administration you'll face. Names and rules differ from country to country, but the underlying questions are similar everywhere." },
      { type: "h2", text: "The common options" },
      { type: "ul", items: ["Sole proprietorship — simplest to set up; you and the business are legally the same.", "Partnership — two or more people share ownership, profits and, often, liability.", "Limited liability company — a separate legal entity; owners' liability is generally limited to their investment.", "Branch or subsidiary — for existing businesses expanding into a new country."] },
      { type: "h2", text: "Questions to ask" },
      { type: "h3", text: "How much risk does the business carry?" },
      { type: "p", text: "If the business will sign large contracts, employ people or hold significant stock, separating business liabilities from personal assets is usually important." },
      { type: "h3", text: "How will profits be taken out?" },
      { type: "p", text: "Different structures are taxed differently, and the most efficient approach depends on profit levels and how owners plan to be paid." },
      { type: "h3", text: "Will you raise investment?" },
      { type: "p", text: "Investors typically expect a company with shares. Setting this up correctly from the start avoids restructuring later." },
      { type: "h3", text: "How much administration can you handle?" },
      { type: "p", text: "Companies usually have more filing and reporting obligations. Factor in the time or cost of meeting them." },
      { type: "callout", text: "Structure decisions have tax and legal consequences that depend on your jurisdiction and circumstances. Take professional advice before registering." },
      { type: "h2", text: "After you register" },
      { type: "p", text: "Open a business bank account, register for the relevant taxes, set up accounting software and create a calendar of filing deadlines. Doing these on day one is far easier than untangling them later." },
    ],
  },
  {
    slug: "internal-controls-for-growing-teams",
    title: "Internal Controls for Growing Teams: A Starter Framework",
    excerpt:
      "As a business grows, trust-based processes become risky. Simple, proportionate controls protect cash, reduce errors and make audits easier.",
    category: "Compliance",
    image: "blogRetailPos",
    publishedAt: "2026-06-30",
    readingMinutes: 5,
    body: [
      { type: "p", text: "In a small business the owner sees every payment and knows every customer. As the team grows, that visibility disappears. Internal controls are the processes that replace it — and they don't need to be bureaucratic to be effective." },
      { type: "h2", text: "Five controls worth putting in place early" },
      { type: "h3", text: "1. Segregation of duties" },
      { type: "p", text: "The person who sets up a supplier or approves an invoice shouldn't also be the person who releases the payment. Where the team is too small to split roles, add an owner review." },
      { type: "h3", text: "2. Payment approval limits" },
      { type: "p", text: "Define who can approve spending, and up to what amount. Use dual authorisation in online banking for larger payments." },
      { type: "h3", text: "3. Supplier bank detail verification" },
      { type: "p", text: "Verify any change to supplier bank details by calling a known contact number — never the number in the email requesting the change. This single control prevents a common type of payment fraud." },
      { type: "h3", text: "4. Monthly reconciliations with review" },
      { type: "p", text: "Reconcile bank, payroll and control accounts monthly, and have someone other than the preparer review them." },
      { type: "h3", text: "5. System access controls" },
      { type: "p", text: "Give each person their own login with only the permissions they need, and remove access promptly when people leave." },
      { type: "callout", text: "Controls should be proportionate. The goal is to reduce the most significant risks, not to slow down every transaction." },
      { type: "h2", text: "Test that controls work" },
      { type: "p", text: "A control that exists only on paper offers no protection. Periodically check that approvals are happening and reconciliations are reviewed — or ask an internal audit or controls review to do it independently." },
    ],
  },
  {
    slug: "when-does-a-business-need-a-virtual-cfo",
    title: "When Does a Business Need a Virtual CFO?",
    excerpt:
      "Bookkeeping tells you what happened. A CFO helps decide what happens next. Here are the signs your business is ready for senior financial support.",
    category: "Business",
    image: "cfoDashboard",
    publishedAt: "2026-06-16",
    readingMinutes: 5,
    body: [
      { type: "p", text: "Most growing businesses have someone keeping the books and an accountant preparing year-end accounts and tax returns. What's often missing is the forward-looking, strategic finance role — the person who connects the numbers to decisions. A virtual (part-time) CFO fills that gap." },
      { type: "h2", text: "Signs you might need one" },
      { type: "ul", items: ["You're planning to raise investment or significant bank finance.", "Revenue is growing but cash always seems tight.", "You don't have a budget or forecast you trust.", "Management reports arrive late or don't answer the questions you're asking.", "You're considering an acquisition, new location or major investment.", "The board or investors want more rigorous reporting."] },
      { type: "h2", text: "What a virtual CFO does" },
      { type: "p", text: "The role varies by business, but typically covers financial strategy, budgeting and forecasting, KPI design, board reporting, funding preparation and oversight of the finance team or outsourced bookkeeper." },
      { type: "h2", text: "Why part-time can work well" },
      { type: "p", text: "Many businesses need CFO-level thinking a few days a month, with more intensive support around fundraising or year-end. A virtual CFO provides that flexibility without the cost of a full-time executive." },
      { type: "callout", text: "A good starting point is a short diagnostic: review current reporting, agree the three or four decisions the business faces this year, and build the forecast and KPIs around them." },
    ],
  },
];

export const sortedPosts = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function relatedPosts(post: Post, count = 3): Post[] {
  const same = sortedPosts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = sortedPosts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...others].slice(0, count);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
