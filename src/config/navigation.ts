import { siteConfig } from "@/config/site";
import { industries, industryHref } from "@/content/industries";

export interface NavItem {
  label: string;
  href: string;
}

/** Main navigation, in display order. "Services" is rendered as a dropdown built from src/content/services.ts. */
export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Who We Help", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/resources" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  services: [
    { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    { label: "VAT & Making Tax Digital", href: "/services/vat-services" },
    { label: "Tax Returns & Planning", href: "/services/taxation" },
    { label: "Payroll", href: "/services/payroll" },
    { label: "Company Formation", href: "/services/company-formation" },
    { label: "Management Accounts", href: "/services/cfo-services" },
    { label: "Xero & QuickBooks", href: "/services/cloud-accounting" },
    { label: "Business Advisory", href: "/services/business-advisory" },
  ],
  audiences: industries.slice(0, 8).map((i) => ({ label: i.name, href: industryHref(i) })),
  company: [
    { label: "About Us", href: "/about" },
    ...(siteConfig.features.showTeam ? [{ label: "Our Team", href: "/team" }] : []),
    { label: "Insights & Guides", href: "/resources" },
    { label: "FAQs", href: "/faqs" },
    { label: "Get a Free Quote", href: "/quote" },
    { label: "Book a Consultation", href: "/book-consultation" },
    { label: "Contact", href: "/contact" },
  ],
} satisfies Record<string, NavItem[]>;
