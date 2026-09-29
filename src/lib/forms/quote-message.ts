import { siteConfig } from "@/config/site";
import type { QuoteData } from "./schemas";

const line = (label: string, value?: string) => `*${label}:* ${value && value.trim() ? value.trim() : "—"}`;

/** Formats a validated quote request as a readable WhatsApp message. */
export function buildQuoteMessage(q: QuoteData): string {
  return [
    `Hello ${siteConfig.companyName},`,
    "",
    "I would like to request a quotation.",
    "",
    line("Name", q.fullName),
    line("Business", q.businessName),
    line("Email", q.email),
    line("Phone", q.phone),
    line("Country", q.country),
    line("City", q.city),
    line("Business Type", q.businessType),
    line("Industry", q.industry),
    line("Service Required", q.services.join(", ")),
    line("Annual Turnover", q.turnover),
    line("Employees", q.employees),
    line("Existing Accountant", q.existingAccountant),
    line("Preferred Contact", [q.contactMethod, q.contactTime].filter(Boolean).join(" — ")),
    line("Additional Requirements", q.message),
    "",
    "Please contact me regarding the quotation.",
  ].join("\n");
}
