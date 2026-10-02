import type { LucideIcon } from "lucide-react";
import {
  Rocket,
  Store,
  Building2,
  ShoppingCart,
  HardHat,
  House,
  HeartPulse,
  ShoppingBag,
  UtensilsCrossed,
  Briefcase,
  Cpu,
  Laptop,
} from "lucide-react";

export interface Industry {
  name: string;
  icon: LucideIcon;
  description: string;
}

export const industries: Industry[] = [
  { name: "Small Businesses", icon: Store, description: "Bookkeeping, VAT, payroll and tax support sized for owner-managed UK businesses." },
  { name: "Startups", icon: Rocket, description: "Company registration, HMRC setup and simple finance routines from day one." },
  { name: "E-commerce & Online Sellers", icon: ShoppingCart, description: "Amazon, eBay and Shopify reconciliations, marketplace fees and online-sales VAT." },
  { name: "Sole Traders & Freelancers", icon: Laptop, description: "Self Assessment, expense tracking and Making Tax Digital for Income Tax." },
  { name: "Contractors", icon: Briefcase, description: "Limited company accounts, salary and dividend planning and IR35 awareness." },
  { name: "Construction", icon: HardHat, description: "CIS returns, subcontractor payments, VAT domestic reverse charge and job costing." },
  { name: "Landlords & Property", icon: House, description: "Rental income accounts, property tax returns and capital gains reporting." },
  { name: "Retail", icon: ShoppingBag, description: "Stock, point-of-sale reconciliation, margins and seasonal cash planning." },
  { name: "Hospitality", icon: UtensilsCrossed, description: "Shift-based payroll, tips and service charge, cost of sales and cash management." },
  { name: "Healthcare", icon: HeartPulse, description: "Practice accounts, payroll for clinical teams and cost management." },
  { name: "Professional Services", icon: Building2, description: "Work-in-progress, profit allocation and cash flow for consultancies and agencies." },
  { name: "Technology", icon: Cpu, description: "SaaS metrics, R&D tax relief considerations and investor-ready reporting." },
];
