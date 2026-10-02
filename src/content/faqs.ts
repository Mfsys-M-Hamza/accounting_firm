/**
 * General FAQs, shown on /faqs (all) and the home page (first six).
 * FAQPage structured data is generated from exactly what is rendered.
 */
import type { FaqItem } from "./services";

export const faqs: FaqItem[] = [
  {
    question: "What accounting services do you provide?",
    answer:
      "We provide bookkeeping, bank reconciliations, expense schedules, debtor and creditor reconciliations, management accounts, year-end accounts, VAT returns, payroll, Self Assessment and Corporation Tax returns, company registration and Xero / QuickBooks setup. Services can be combined into a single monthly package.",
  },
  {
    question: "Can you handle our VAT registration and returns?",
    answer:
      "Yes. We check whether you need to register, handle your VAT registration with HMRC, and prepare and submit your returns through Making Tax Digital-compatible software. We also advise on VAT schemes and the rules for Amazon, eBay and other online sellers.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "Yes — small businesses are our focus. We work with sole traders, freelancers, startups, e-commerce sellers and limited companies across the UK, with low-cost packages scaled to the size and complexity of each client.",
  },
  {
    question: "Can you manage monthly bookkeeping?",
    answer:
      "Yes. We agree a monthly routine for sending documents, reconcile your accounts and provide regular reports so your books are always up to date.",
  },
  {
    question: "Do you provide tax advisory services?",
    answer:
      "Yes. Alongside Self Assessment and Corporation Tax returns, we carry out regular tax efficiency reviews and advise on tax planning, VAT, profit extraction, business changes and HMRC enquiries.",
  },
  {
    question: "Can you help with company formation?",
    answer:
      "Yes. We advise on the right structure, register your company with Companies House, arrange your HMRC registrations, set up your accounting software and give you a first-year compliance calendar.",
  },
  {
    question: "Do you offer payroll services?",
    answer:
      "Yes. We run weekly, fortnightly or monthly payroll, provide payslips, file RTI submissions with HMRC and handle workplace pension auto-enrolment and year-end forms.",
  },
  {
    question: "How do I request a quotation?",
    answer:
      "Use our Instant Quote form. Your details are sent straight to us on WhatsApp, and we will come back to you with a tailored quotation.",
  },
  {
    question: "Can I book an online consultation?",
    answer:
      "Yes. You can book a phone call, video meeting or office meeting using our consultation booking form and choose a preferred date and time.",
  },
  {
    question: "What documents are needed to get started?",
    answer:
      "It depends on the service. Typically we ask for your Companies House and HMRC details (such as your UTR), recent accounts or tax returns, access to your accounting records and bank statements. We send a tailored checklist after the initial consultation — please don't send sensitive documents through the website forms.",
  },
  {
    question: "How is client information protected?",
    answer:
      "Client information is treated as strictly confidential. We use secure systems with access controls, share documents through secure channels and only collect the information needed to deliver our services. See our Privacy Policy for details.",
  },
  {
    question: "Can I switch from my existing accountant?",
    answer:
      "Yes. Switching is straightforward. With your permission we contact your previous accountant for the professional handover information and records needed, and we take care of the transition.",
  },
];
