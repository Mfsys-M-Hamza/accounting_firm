import { siteConfig } from "@/config/site";
import type { CallbackData, ConsultationData, ContactData, QuoteData } from "./schemas";

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

/** Formats a validated contact-form enquiry as a readable WhatsApp message. */
export function buildContactMessage(c: ContactData): string {
  return [
    `Hello ${siteConfig.companyName},`,
    "",
    "I'm getting in touch through your website.",
    "",
    line("Name", c.name),
    line("Email", c.email),
    line("Phone", c.phone),
    line("Company", c.company),
    line("Subject", c.subject),
    line("Service", c.service),
    line("Preferred Contact", c.contactMethod),
    "",
    "*Message:*",
    (c.message ?? "").trim(),
  ].join("\n");
}

/** Formats a validated callback request as a readable WhatsApp message. */
export function buildCallbackMessage(c: CallbackData): string {
  return [
    `Hello ${siteConfig.companyName},`,
    "",
    "Please call me back.",
    "",
    line("Name", c.name),
    line("Phone", c.phone),
    line("Preferred Time", c.preferredTime),
    line("Service", c.service),
  ].join("\n");
}

/** YYYY-MM-DD → e.g. "Monday 5 October 2026" (parsed as UTC so the day never shifts). */
function readableDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Formats a validated consultation booking as a readable WhatsApp message. */
export function buildConsultationMessage(c: ConsultationData): string {
  return [
    `Hello ${siteConfig.companyName},`,
    "",
    "I would like to book a consultation.",
    "",
    line("Name", c.name),
    line("Company", c.company),
    line("Email", c.email),
    line("Phone", c.phone),
    line("Service", c.service),
    line("Consultation Type", c.consultationType),
    line("Preferred Date", readableDate(c.date)),
    line("Preferred Time", c.time),
    line("Topics to Discuss", c.message),
    "",
    "Please confirm the appointment or suggest another time.",
  ].join("\n");
}

