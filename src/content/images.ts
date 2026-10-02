/**
 * Image registry. Static imports give Next.js the intrinsic size (no layout
 * shift) and a blur placeholder. To rebrand, drop a new file into
 * src/assets/images/ and point the entry at it — alt text lives alongside.
 *
 * Stock photos are from Unsplash (free for commercial use, Unsplash License).
 * Sources are listed in src/assets/images/CREDITS.md. Social post artwork in
 * src/assets/images/social/ is the client's own (UK Accountax Instagram/LinkedIn).
 */
import type { StaticImageData } from "next/image";
import heroAdvisoryMeeting from "@/assets/images/hero-advisory-meeting.webp";
import teamBoardroom from "@/assets/images/team-boardroom.webp";
import auditDocumentReview from "@/assets/images/audit-document-review.webp";
import taxForms from "@/assets/images/tax-forms.webp";
import accountingDocuments from "@/assets/images/accounting-documents.webp";
import payrollTeam from "@/assets/images/payroll-team.webp";
import advisoryPlanning from "@/assets/images/advisory-planning.webp";
import companyFormationCity from "@/assets/images/company-formation-city.webp";
import cfoDashboard from "@/assets/images/cfo-dashboard.webp";
import cloudAnalytics from "@/assets/images/cloud-analytics.webp";
import industriesWorkshop from "@/assets/images/industries-workshop.webp";
import consultationHandshake from "@/assets/images/consultation-handshake.webp";
import modernOffice from "@/assets/images/modern-office.webp";
import officeFloor from "@/assets/images/office-floor.webp";
import blogReports from "@/assets/images/blog-reports.webp";
import blogGrowthChart from "@/assets/images/blog-growth-chart.webp";
import blogTrend from "@/assets/images/blog-trend.webp";
import blogTaxStatement from "@/assets/images/blog-tax-statement.webp";
import blogRetailPos from "@/assets/images/blog-retail-pos.webp";
import blogStrategySession from "@/assets/images/blog-strategy-session.webp";
import social2026 from "@/assets/images/social/social-2026-solutions.webp";
import socialAccountingServices from "@/assets/images/social/social-accounting-services.webp";
import socialBusinessOwner from "@/assets/images/social/social-business-owner-support.webp";
import socialUkReporting from "@/assets/images/social/social-uk-reporting.webp";
import socialOurServices from "@/assets/images/social/social-our-services.webp";
import socialReasons from "@/assets/images/social/social-reasons-to-work-with-us.webp";
import socialRegisterCompany from "@/assets/images/social/social-register-a-company.webp";
import socialLowCost from "@/assets/images/social/social-low-cost-accounting.webp";

export interface SiteImage {
  src: StaticImageData;
  alt: string;
}

export const images = {
  heroAdvisoryMeeting: { src: heroAdvisoryMeeting, alt: "Financial adviser reviewing figures with a business owner at a meeting table" },
  teamBoardroom: { src: teamBoardroom, alt: "Accounting team in a boardroom meeting discussing a client engagement" },
  auditDocumentReview: { src: auditDocumentReview, alt: "Accountant reviewing and signing financial documents" },
  taxForms: { src: taxForms, alt: "Tax forms and supporting paperwork on a desk ready for preparation" },
  accountingDocuments: { src: accountingDocuments, alt: "Accountant working through invoices and receipts with a calculator" },
  payrollTeam: { src: payrollTeam, alt: "Team of employees collaborating at a shared office table" },
  advisoryPlanning: { src: advisoryPlanning, alt: "Business advisers planning with laptops and handwritten notes" },
  companyFormationCity: { src: companyFormationCity, alt: "Modern commercial office buildings seen from street level" },
  cfoDashboard: { src: cfoDashboard, alt: "Laptop displaying a financial analytics dashboard with charts" },
  cloudAnalytics: { src: cloudAnalytics, alt: "Cloud accounting analytics dashboard showing performance graphs" },
  industriesWorkshop: { src: industriesWorkshop, alt: "Business owners attending a presentation in a modern workspace" },
  consultationHandshake: { src: consultationHandshake, alt: "Adviser and client shaking hands after a consultation" },
  modernOffice: { src: modernOffice, alt: "Bright, modern professional office interior" },
  officeFloor: { src: officeFloor, alt: "Open-plan corporate office floor with workstations" },
  blogReports: { src: blogReports, alt: "Printed financial reports and charts being reviewed on a desk" },
  blogGrowthChart: { src: blogGrowthChart, alt: "Hand-drawn growth chart on paper beside a ruler and pen" },
  blogTrend: { src: blogTrend, alt: "Line graph showing a financial trend on a screen" },
  blogTaxStatement: { src: blogTaxStatement, alt: "Annual tax statement and mileage log with a pen" },
  blogRetailPos: { src: blogRetailPos, alt: "Customer paying at a retail point-of-sale terminal" },
  blogStrategySession: { src: blogStrategySession, alt: "Team strategy session with notes on a glass wall" },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

/** UK Accountax's own social media posts, shown in the "Follow us" gallery. */
export const socialPosts: SiteImage[] = [
  { src: social2026, alt: "UK Accountax post: Smart UK tax and accounting solutions for 2026" },
  { src: socialAccountingServices, alt: "UK Accountax post: Accounting services — VAT work, expense schedules, bank and debtor/creditor reconciliations" },
  { src: socialBusinessOwner, alt: "UK Accountax post: Accounting, management accounts, bookkeeping, payroll, remote finance director and VAT support" },
  { src: socialUkReporting, alt: "UK Accountax post: Accounting and reporting services for UK based entities" },
  { src: socialOurServices, alt: "UK Accountax post: Our services — QuickBooks Online, bookkeeping, bank and credit card reconciliation, receivables and payables" },
  { src: socialReasons, alt: "UK Accountax post: Reasons to work with UK Accountax — easy access, expertise, lower overall cost" },
  { src: socialRegisterCompany, alt: "UK Accountax post: Want to register a company in the UK? Get in touch" },
  { src: socialLowCost, alt: "UK Accountax post: Low-cost professional accounting, taxation and bookkeeping services based in the UK" },
];
