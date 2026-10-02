/** Copy blocks shared by the home and about pages. Messaging adapted from UK Accountax's own LinkedIn/Instagram posts. */
import type { LucideIcon } from "lucide-react";
import {
  Award,
  UserRoundCheck,
  BadgeDollarSign,
  LockKeyhole,
  Clock3,
  ShieldCheck,
  MonitorSmartphone,
  Headset,
  Scale,
  Handshake,
  Target,
} from "lucide-react";

export const hero = {
  eyebrow: "Accounting · Bookkeeping · VAT · Tax · Payroll",
  title: "Your Trusted Partner in Financial Success",
  text: "UK-based qualified accountants helping small businesses, startups and online sellers keep accurate books, stay HMRC-compliant and save tax — so you can focus on growing your business.",
};

export const trustIndicators: { label: string; icon: LucideIcon }[] = [
  { label: "Qualified Accountants", icon: Award },
  { label: "HMRC Compliant", icon: ShieldCheck },
  { label: "Fully Online, UK-wide", icon: MonitorSmartphone },
  { label: "Low-Cost, Clear Fees", icon: BadgeDollarSign },
];

export const advantages: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Qualified, Experienced Team", description: "Qualified accountants who understand UK tax rules and the realities of running a small business.", icon: Award },
  { title: "Your Dedicated Accountant", description: "No 'account managers' — a dedicated UK-based accountant who gets to know you and your business in detail.", icon: UserRoundCheck },
  { title: "Unlimited Expert Advice", description: "Ask questions whenever you need to — by email, phone, WhatsApp or in a meeting.", icon: Headset },
  { title: "All Filing Included", description: "Annual accounts and the tax returns you need are prepared and submitted for you — no hidden costs.", icon: BadgeDollarSign },
  { title: "Regular Deadline Reminders", description: "Automated reminders tell you when accounts and returns are due, so you never miss an HMRC or Companies House deadline.", icon: Clock3 },
  { title: "Tax Efficiency Reviews", description: "Regular reviews to make sure your business runs in the most tax-efficient way, claiming every relief available.", icon: Target },
  { title: "Real-Time Information", description: "Cloud bookkeeping in Xero and QuickBooks gives you up-to-date numbers for better, faster decisions.", icon: MonitorSmartphone },
  { title: "Confidential & Secure", description: "Strict confidentiality and secure handling of every document you share with us.", icon: LockKeyhole },
];

export const processSteps = [
  {
    title: "Initial Consultation",
    description: "We get to know your business, your requirements and your current financial position.",
  },
  {
    title: "Requirement Assessment",
    description: "We identify the accounting, VAT, tax or payroll services you need and agree a clear scope and a transparent fee.",
  },
  {
    title: "Professional Execution",
    description: "Your dedicated accountant handles the work securely and on time, keeping you informed at every step.",
  },
  {
    title: "Ongoing Support",
    description: "Deadline reminders, up-to-date reports and unlimited advice whenever you need it.",
  },
];

export const values: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Integrity", description: "We give honest, independent advice — even when it isn't what someone wants to hear.", icon: Scale },
  { title: "Confidentiality", description: "Client information is protected with the discipline financial data deserves.", icon: LockKeyhole },
  { title: "Partnership", description: "We build long-term relationships and treat each client's success as our own.", icon: Handshake },
  { title: "Excellence", description: "Accurate, well-documented work delivered to a consistently high standard.", icon: Target },
];
