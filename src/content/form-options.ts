/** Select / checkbox options used by every form. Edit here to change them site-wide. */
import { services } from "./services";
import { industries } from "./industries";

export const serviceOptions = [...services.map((s) => s.title), "Other"];

export const quoteServiceOptions = [
  "Bookkeeping",
  "Annual Accounts",
  "VAT Registration / Returns",
  "Self Assessment",
  "Corporation Tax",
  "Payroll",
  "Management Accounts",
  "Company Registration",
  "Xero / QuickBooks Setup",
  "Business Consulting",
  "Other",
];

export const businessTypeOptions = [
  "Sole Trader / Freelancer",
  "Partnership",
  "Private Limited Company (Ltd)",
  "Limited Liability Partnership (LLP)",
  "Landlord / Property",
  "Startup (not yet registered)",
  "Nonprofit / Charity",
  "Other",
];

export const industryOptions = [...industries.map((i) => i.name), "Other"];

// Ranges are deliberately broad — the quote form never asks for exact financials.
export const turnoverOptions = ["Pre-revenue", "Up to £90,000", "£90,000 – £250,000", "£250,000 – £1 million", "£1 – £5 million", "£5 million +", "Prefer not to say"];

export const employeeOptions = ["Just me", "2 – 10", "11 – 50", "51 – 250", "250 +"];

export const contactMethodOptions = ["Phone", "Email", "WhatsApp"];

export const contactTimeOptions = ["Morning (9am – 12pm)", "Afternoon (12pm – 3pm)", "Late afternoon (3pm – 6pm)", "Any time"];

export const consultationTypeOptions = ["Phone", "Video Meeting", "Office Meeting"];

export const consultationTimeOptions = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

export const callbackTimeOptions = ["As soon as possible", ...contactTimeOptions.filter((o) => o !== "Any time")];
