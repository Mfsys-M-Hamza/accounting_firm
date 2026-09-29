/**
 * Image registry. Static imports give Next.js the intrinsic size (no layout
 * shift) and a blur placeholder. To rebrand, drop a new file into
 * src/assets/images/ and point the entry at it — alt text lives alongside.
 *
 * Current photos are from Unsplash (free for commercial use, Unsplash License).
 * Sources are listed in src/assets/images/CREDITS.md.
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

export interface SiteImage {
  src: StaticImageData;
  alt: string;
}

export const images = {
  heroAdvisoryMeeting: { src: heroAdvisoryMeeting, alt: "Financial adviser reviewing figures with a business owner at a meeting table" },
  teamBoardroom: { src: teamBoardroom, alt: "Accounting team in a boardroom meeting discussing a client engagement" },
  auditDocumentReview: { src: auditDocumentReview, alt: "Auditor reviewing and signing financial documents" },
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
