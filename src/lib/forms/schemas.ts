/**
 * Form schemas shared by the browser (react-hook-form) and the API routes, so
 * client-side and server-side validation can never drift apart.
 *
 * Forms deliberately avoid sensitive financial data: no account numbers,
 * tax IDs or exact figures — only broad ranges.
 */
import { z } from "zod";
import {
  businessTypeOptions,
  callbackTimeOptions,
  consultationTimeOptions,
  consultationTypeOptions,
  contactMethodOptions,
  contactTimeOptions,
  employeeOptions,
  industryOptions,
  quoteServiceOptions,
  serviceOptions,
  turnoverOptions,
} from "@/content/form-options";

const req = (label: string) => `Please enter your ${label}`;
const choose = (label: string) => `Please select ${label}`;

const text = (label: string, min = 2, max = 120) =>
  z
    .string()
    .trim()
    .min(min, min <= 1 ? req(label) : `${label[0].toUpperCase()}${label.slice(1)} must be at least ${min} characters`)
    .max(max, `Please keep this under ${max} characters`);

const optionalText = (max = 120) => z.string().trim().max(max, `Please keep this under ${max} characters`).optional().or(z.literal(""));

const name = z.string().trim().min(2, req("full name")).max(80, "Please keep this under 80 characters");
const email = z.string().trim().min(1, req("email address")).pipe(z.email("Please enter a valid email address")).pipe(z.string().max(254));
const phone = z
  .string()
  .trim()
  .min(1, req("phone number"))
  .regex(/^\+?[\d\s()./-]{7,20}$/, "Please enter a valid phone number (digits, spaces and + only)");
const optionalPhone = z
  .string()
  .trim()
  .regex(/^\+?[\d\s()./-]{7,20}$/, "Please enter a valid phone number")
  .optional()
  .or(z.literal(""));

const oneOf = (options: readonly string[], label: string) =>
  z.string({ error: choose(label) }).refine((v) => options.includes(v), { message: choose(label) });

const consent = z.literal(true, { error: "Please confirm you agree to us using these details to respond" });

const message = (required: boolean) =>
  required
    ? z.string().trim().min(10, "Please add a few more details (at least 10 characters)").max(2000, "Please keep your message under 2,000 characters")
    : z.string().trim().max(2000, "Please keep your message under 2,000 characters").optional().or(z.literal(""));

/** "YYYY-MM-DD", not in the past (one day of slack for time zones) and within ~6 months. */
const futureDate = z
  .string()
  .min(1, "Please choose a preferred date")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a valid date")
  .refine((v) => {
    const d = Date.parse(`${v}T00:00:00Z`);
    const dayMs = 86_400_000;
    const now = Date.now();
    return !Number.isNaN(d) && d >= now - 2 * dayMs && d <= now + 190 * dayMs;
  }, "Please choose a date from today onwards, within the next six months");

export const quoteSchema = z.object({
  fullName: name,
  businessName: optionalText(120),
  email,
  phone,
  country: text("country", 2, 80),
  city: optionalText(80),
  businessType: oneOf(businessTypeOptions, "a business type"),
  industry: z.string().refine((v) => v === "" || industryOptions.includes(v)).optional(),
  services: z
    .array(z.string().refine((v) => quoteServiceOptions.includes(v)))
    .min(1, "Please select at least one service"),
  turnover: oneOf(turnoverOptions, "an annual turnover range"),
  employees: oneOf(employeeOptions, "the number of employees"),
  existingAccountant: oneOf(["Yes", "No"], "an option"),
  contactMethod: oneOf(contactMethodOptions, "a contact method"),
  contactTime: z.string().refine((v) => v === "" || contactTimeOptions.includes(v)).optional(),
  message: message(false),
  consent,
});

export const contactSchema = z.object({
  name,
  email,
  phone: optionalPhone,
  company: optionalText(120),
  subject: text("subject", 3, 140),
  service: z.string().refine((v) => v === "" || serviceOptions.includes(v)).optional(),
  message: message(true),
  contactMethod: oneOf(contactMethodOptions, "a contact method"),
  consent,
});

export const consultationSchema = z.object({
  name,
  company: optionalText(120),
  email,
  phone,
  service: oneOf(serviceOptions, "a service"),
  consultationType: oneOf(consultationTypeOptions, "a consultation type"),
  date: futureDate,
  time: oneOf(consultationTimeOptions, "a preferred time"),
  message: message(false),
  consent,
});

export const callbackSchema = z.object({
  name,
  phone,
  preferredTime: oneOf(callbackTimeOptions, "a preferred time"),
  service: oneOf(serviceOptions, "a service"),
  consent,
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ConsultationInput = z.input<typeof consultationSchema>;
export type ConsultationData = z.output<typeof consultationSchema>;
export type CallbackInput = z.input<typeof callbackSchema>;
export type CallbackData = z.output<typeof callbackSchema>;

export const formSchemas = {
  quote: quoteSchema,
  contact: contactSchema,
  consultation: consultationSchema,
  callback: callbackSchema,
} as const;

export type FormKind = keyof typeof formSchemas;
