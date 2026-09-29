/**
 * General FAQs, shown on /faqs (all) and the home page (first six).
 * FAQPage structured data is generated from exactly what is rendered.
 */
import type { FaqItem } from "./services";

export const faqs: FaqItem[] = [
  {
    question: "What accounting services do you provide?",
    answer:
      "We provide bookkeeping, management accounts, annual accounts and financial statements, bank reconciliation, accounts payable and receivable, payroll, cloud accounting setup and CFO-level financial advisory. Services can be combined into a single monthly package.",
  },
  {
    question: "What is included in your audit services?",
    answer:
      "Our audit and assurance services include statutory and external audits, financial statement audits, internal audit, compliance reviews, internal controls reviews and risk assessments. Each engagement includes planning, fieldwork, a reported opinion where applicable and a management letter with practical recommendations.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "Yes. We work with freelancers, startups and small and medium-sized businesses as well as larger companies. Our services and pricing are scaled to the size and complexity of each client.",
  },
  {
    question: "Can you manage monthly bookkeeping?",
    answer:
      "Yes. We agree a monthly routine for sending documents, reconcile your accounts and provide regular reports so your books are always up to date.",
  },
  {
    question: "Do you provide tax advisory services?",
    answer:
      "Yes. Alongside tax compliance and return preparation, we advise on tax planning, VAT / sales tax, business changes, transactions and queries from tax authorities.",
  },
  {
    question: "Can you help with company formation?",
    answer:
      "Yes. We advise on the right structure, handle registration and tax registrations, set up your accounting system and provide a first-year compliance calendar.",
  },
  {
    question: "Do you offer payroll services?",
    answer:
      "Yes. We process payroll on weekly, fortnightly or monthly schedules, provide payslips, maintain employee records and handle payroll reporting and compliance submissions.",
  },
  {
    question: "How do I request a quotation?",
    answer:
      "Use our Instant Quote form. You can send the details straight to us on WhatsApp or submit the form online, and we will come back to you with a tailored quotation.",
  },
  {
    question: "Can I book an online consultation?",
    answer:
      "Yes. You can book a phone call, video meeting or office meeting using our consultation booking form and choose a preferred date and time.",
  },
  {
    question: "What documents are needed to get started?",
    answer:
      "It depends on the service. Typically we ask for business registration details, recent financial statements or tax returns, access to your accounting records and bank statements. We send a tailored checklist after the initial consultation — please don't send sensitive documents through the website forms.",
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
