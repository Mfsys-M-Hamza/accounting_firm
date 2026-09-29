/** Copy blocks shared by the home and about pages. All claims are general and configurable. */
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
  eyebrow: "Audit · Tax · Accounting · Advisory",
  title: "Audit, Tax & Accounting Expertise That Moves Your Business Forward",
  text: "Professional audit, accounting, taxation and advisory solutions designed to help businesses remain compliant, make informed decisions and grow with confidence.",
};

export const trustIndicators: { label: string; icon: LucideIcon }[] = [
  { label: "Professional Expertise", icon: Award },
  { label: "Confidential & Secure", icon: LockKeyhole },
  { label: "Client-Focused Service", icon: UserRoundCheck },
  { label: "Compliance Driven", icon: ShieldCheck },
];

export const advantages: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Experienced Professionals", description: "Qualified accountants and advisers who understand both the rules and the realities of running a business.", icon: Award },
  { title: "Personalized Advice", description: "Recommendations based on your goals, sector and stage of growth — not generic templates.", icon: UserRoundCheck },
  { title: "Transparent Pricing", description: "Clear, agreed fees before work starts, with no surprise bills.", icon: BadgeDollarSign },
  { title: "Confidential Service", description: "Strict confidentiality and secure handling of every document you share.", icon: LockKeyhole },
  { title: "Timely Delivery", description: "Agreed timetables and proactive reminders so deadlines are always met.", icon: Clock3 },
  { title: "Compliance Focus", description: "Work carried out with care against the applicable standards and regulations.", icon: ShieldCheck },
  { title: "Modern Accounting Solutions", description: "Cloud platforms, automation and digital workflows that save you time.", icon: MonitorSmartphone },
  { title: "Dedicated Support", description: "A named point of contact who knows your business and responds promptly.", icon: Headset },
];

export const processSteps = [
  {
    title: "Initial Consultation",
    description: "We get to know your business, your requirements and your current financial position.",
  },
  {
    title: "Requirement Assessment",
    description: "We identify the audit, accounting, tax or advisory services you need and agree a clear scope and fee.",
  },
  {
    title: "Professional Execution",
    description: "Assigned professionals handle the engagement securely and systematically, keeping you informed.",
  },
  {
    title: "Ongoing Support",
    description: "We provide reporting, compliance assistance and ongoing advisory support where applicable.",
  },
];

export const values: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Integrity", description: "We give honest, independent advice — even when it isn't what someone wants to hear.", icon: Scale },
  { title: "Confidentiality", description: "Client information is protected with the discipline financial data deserves.", icon: LockKeyhole },
  { title: "Partnership", description: "We build long-term relationships and treat each client's success as our own.", icon: Handshake },
  { title: "Excellence", description: "Accurate, well-documented work delivered to a consistently high standard.", icon: Target },
];
