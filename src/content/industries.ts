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
  Factory,
  Laptop,
  HandHeart,
} from "lucide-react";

export interface Industry {
  name: string;
  icon: LucideIcon;
  description: string;
}

export const industries: Industry[] = [
  { name: "Startups", icon: Rocket, description: "Formation, investor-ready reporting and scalable finance processes from day one." },
  { name: "SMEs", icon: Store, description: "Bookkeeping, tax and advisory support sized for owner-managed businesses." },
  { name: "Corporations", icon: Building2, description: "Statutory audit, group reporting and internal controls for larger entities." },
  { name: "E-commerce", icon: ShoppingCart, description: "Multi-channel reconciliation, marketplace fees and indirect tax on online sales." },
  { name: "Construction", icon: HardHat, description: "Job costing, retentions, subcontractor payments and project profitability." },
  { name: "Real Estate", icon: House, description: "Property accounts, rental income reporting and transaction tax advice." },
  { name: "Healthcare", icon: HeartPulse, description: "Practice accounts, payroll for clinical teams and cost management." },
  { name: "Retail", icon: ShoppingBag, description: "Inventory, point-of-sale reconciliation, margins and seasonal cash planning." },
  { name: "Hospitality", icon: UtensilsCrossed, description: "Shift-based payroll, service-charge handling, cost of sales control and cash management." },
  { name: "Professional Services", icon: Briefcase, description: "Work-in-progress, partner profit allocation and utilisation reporting." },
  { name: "Technology", icon: Cpu, description: "Revenue recognition, R&D considerations and SaaS metrics." },
  { name: "Manufacturing", icon: Factory, description: "Product costing, inventory valuation and capital expenditure planning." },
  { name: "Freelancers", icon: Laptop, description: "Personal tax, expense tracking and simple, affordable bookkeeping." },
  { name: "Nonprofit Organizations", icon: HandHeart, description: "Fund accounting, grant compliance, independent examination and audit." },
];
