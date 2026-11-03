/** Copy blocks shared by the home and about pages. Hero copy follows the client's 2026 website brief. */
import type { LucideIcon } from "lucide-react";
import {
  Award,
  UserRoundCheck,
  BadgePoundSterling,
  LockKeyhole,
  BellRing,
  CloudCog,
  MessagesSquare,
  MonitorSmartphone,
  ReceiptText,
  CalendarCheck,
  Scale,
  Handshake,
  Target,
} from "lucide-react";

export const hero = {
  eyebrow: "UK accountants for small businesses",
  title: "Clear, reliable accounting support for ambitious UK businesses.",
  text: "From bookkeeping and VAT returns to payroll, tax planning and year-end accounts, UK Accountax helps small businesses stay organised, compliant and ready to grow — with a dedicated accountant and straightforward support.",
  // TODO(client): the brief asks for this line only if each claim is accurate — confirm before launch.
  trustLine: ["Qualified accounting support", "UK-wide service", "Clear, agreed fees"],
};

/**
 * Trust strip under the hero. Only verifiable statements belong here: add
 * memberships through siteConfig.certifications and review ratings only with
 * their source. Never add invented scores or client numbers.
 */
export const trustPoints: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Xero & QuickBooks", text: "Cloud accounting set-up and support", icon: CloudCog },
  { title: "Making Tax Digital", text: "VAT returns filed with MTD software", icon: ReceiptText },
  { title: "UK-wide, fully online", text: "Phone, video, email or WhatsApp", icon: MonitorSmartphone },
  // Founded 2021 according to the firm's LinkedIn page.
  { title: "Established 2021", text: "Supporting UK small businesses", icon: CalendarCheck },
];

/** "Why UK Accountax". The first six appear on the home page; the about page shows all of them. */
export const advantages: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "A dedicated accountant", description: "One named, UK-based accountant who knows your business — not a different person every time you call.", icon: UserRoundCheck },
  { title: "Clear, agreed fees", description: "A fixed fee agreed before any work starts, with the filings you need included. No surprise invoices.", icon: BadgePoundSterling },
  { title: "Proactive reminders", description: "We tell you what is due and what we need from you well before HMRC and Companies House deadlines.", icon: BellRing },
  { title: "Practical advice", description: "Straight answers by phone, email, WhatsApp or video — and suggestions to keep more of what you earn.", icon: MessagesSquare },
  {
    title: "Secure document handling",
    description: "Your records are only seen by the people working on your account and are handled in line with UK GDPR and our privacy policy.",
    icon: LockKeyhole,
  },
  { title: "Cloud accounting", description: "Xero and QuickBooks set up properly, so you can see up-to-date numbers whenever you need them.", icon: CloudCog },
  { title: "Qualified, experienced team", description: "Qualified accountants who understand UK tax rules and the realities of running a small business.", icon: Award },
  { title: "Tax efficiency reviews", description: "Regular reviews to make sure your business runs tax-efficiently and claims the reliefs available to it.", icon: Target },
];

export const processSteps = [
  {
    title: "Consultation",
    description: "A free, no-obligation conversation about your business, what you need and where things stand today.",
  },
  {
    title: "Scope & fee",
    description: "We confirm exactly which services you need and agree a clear, fixed fee before any work starts.",
  },
  {
    title: "Onboarding & delivery",
    description: "We handle the switch from your previous accountant, set up your software and take care of the work, on time.",
  },
  {
    title: "Ongoing support",
    description: "Deadline reminders, up-to-date figures and practical advice whenever you need it.",
  },
];

export const values: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Integrity", description: "We give honest, independent advice — even when it isn't what someone wants to hear.", icon: Scale },
  { title: "Confidentiality", description: "Client information is protected with the discipline financial data deserves.", icon: LockKeyhole },
  { title: "Partnership", description: "We build long-term relationships and treat each client's success as our own.", icon: Handshake },
  { title: "Excellence", description: "Accurate, well-documented work delivered to a consistently high standard.", icon: Target },
];
