export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  // "Services" is rendered as a dropdown built from src/content/services.ts
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Contact", href: "/contact" },
    { label: "Book a Consultation", href: "/book-consultation" },
  ],
  services: [
    { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    { label: "VAT Returns", href: "/services/vat-services" },
    { label: "Tax Returns", href: "/services/taxation" },
    { label: "Payroll", href: "/services/payroll" },
    { label: "Company Registration", href: "/services/company-formation" },
    { label: "Xero & QuickBooks", href: "/services/cloud-accounting" },
  ],
  resources: [
    { label: "Blog & Guides", href: "/resources" },
    { label: "FAQs", href: "/faqs" },
    { label: "Get a Quote", href: "/quote" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
} satisfies Record<string, NavItem[]>;
