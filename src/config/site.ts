/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CLIENT CONFIGURATION
 *  Everything firm-specific lives here. Replace every value in [BRACKETS]
 *  before launch. Values still in brackets are treated as "not configured":
 *  they are shown as visible placeholders, never linked (tel:, mailto:, wa.me)
 *  and never emitted in structured data.
 *
 *  Services, industries, FAQs and articles live in src/content/.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { SiteConfig } from "./types";

const companyName = "UK Accountax";

export const siteConfig: SiteConfig = {
  companyName,
  legalName: companyName,
  shortName: companyName,
  tagline: "UK Based Accountancy Firm",
  description:
    "UK Accountax is a UK-based accountancy firm helping small businesses, startups, sole traders and online sellers with accounting, bookkeeping, VAT, payroll and tax — accurate, HMRC-compliant and stress-free.",
  siteUrl: "https://uk-accountax.com",
  // While null, the brand mark + typographic wordmark in components/ui/logo.tsx is rendered.
  logo: null,
  locale: "en-GB",

  contact: {
    phone: "+44 7456 437305",
    whatsapp: "447456437305",
    email: "info@uk-accountax.com",
    address: {
      street: "",
      city: "London",
      region: "",
      postalCode: "",
      country: "United Kingdom",
    },
    mapEmbedUrl: "",
    // TODO(client): confirm opening hours — not published on LinkedIn, Instagram or uk-accountax.com.
    businessHours: [
      { days: "Monday – Friday", hours: "9:00 am – 6:00 pm" },
      { days: "Saturday", hours: "By appointment" },
      { days: "Sunday", hours: "Closed" },
    ],
  },

  regulatoryBody: "[REGULATORY BODY]",
  yearsOfExperience: "5+",
  numberOfClients: "[NUMBER OF CLIENTS]",
  teamSize: "2–10",

  socialLinks: [
    { platform: "linkedin", url: "https://www.linkedin.com/company/uk-accountax/" },
    { platform: "instagram", url: "https://www.instagram.com/uk_accountax/" },
    { platform: "facebook", url: "https://www.facebook.com/profile.php?id=100092446571116" },
  ],

  // Counters animate only once a real `value` is supplied. Founded 2021 (LinkedIn).
  statistics: [
    { label: "Years in Business", value: 5, suffix: "+", placeholder: "[XX]" },
    { label: "Core Services", value: 8, placeholder: "[X]" },
    { label: "Sectors Supported", value: 12, placeholder: "[XX]" },
  ],

  team: [
    {
      name: "[TEAM MEMBER NAME]",
      position: "[POSITION, e.g. Managing Partner]",
      qualification: "[QUALIFICATION]",
      specialization: "[SPECIALIZATION]",
      bio: "[Short professional biography — two or three sentences about experience and focus areas.]",
      linkedin: "",
      photo: "",
      placeholder: true,
    },
    {
      name: "[TEAM MEMBER NAME]",
      position: "[POSITION, e.g. Senior Accountant]",
      qualification: "[QUALIFICATION]",
      specialization: "[SPECIALIZATION]",
      bio: "[Short professional biography — two or three sentences about experience and focus areas.]",
      linkedin: "",
      photo: "",
      placeholder: true,
    },
    {
      name: "[TEAM MEMBER NAME]",
      position: "[POSITION, e.g. Head of Tax]",
      qualification: "[QUALIFICATION]",
      specialization: "[SPECIALIZATION]",
      bio: "[Short professional biography — two or three sentences about experience and focus areas.]",
      linkedin: "",
      photo: "",
      placeholder: true,
    },
    {
      name: "[TEAM MEMBER NAME]",
      position: "[POSITION, e.g. Client Services Manager]",
      qualification: "[QUALIFICATION]",
      specialization: "[SPECIALIZATION]",
      bio: "[Short professional biography — two or three sentences about experience and focus areas.]",
      linkedin: "",
      photo: "",
      placeholder: true,
    },
  ],

  // Replace with genuine, permission-granted client reviews. Entries with
  // placeholder: true are visibly labelled as samples on the site.
  testimonials: [
    {
      name: "[CLIENT NAME]",
      company: "[CLIENT COMPANY]",
      position: "[POSITION]",
      review:
        "[Sample testimonial. Replace with a genuine client review, e.g. how the firm helped with their VAT, tax filing or monthly bookkeeping.]",
      rating: 5,
      placeholder: true,
    },
    {
      name: "[CLIENT NAME]",
      company: "[CLIENT COMPANY]",
      position: "[POSITION]",
      review:
        "[Sample testimonial. Replace with a genuine client review describing the service received and the outcome for their business.]",
      rating: 5,
      placeholder: true,
    },
    {
      name: "[CLIENT NAME]",
      company: "[CLIENT COMPANY]",
      position: "[POSITION]",
      review:
        "[Sample testimonial. Replace with a genuine client review — only publish reviews you have written permission to use.]",
      rating: 5,
      placeholder: true,
    },
  ],

  // Only list memberships and registrations the firm actually holds.
  certifications: [],

  whatsappMessages: {
    general:
      `Hello ${companyName}, I visited your website and would like information about your accounting, VAT or tax services.`,
  },

  seo: {
    titleTemplate: `%s | ${companyName}`,
    defaultTitle: `${companyName} | UK Accountants for Small Businesses`,
    defaultDescription:
      "UK-based accountants for small businesses, startups, sole traders and Amazon & eBay sellers. Bookkeeping, VAT returns, payroll, Self Assessment and Corporation Tax. Get a free quote today.",
    keywords: [
      "UK accountants",
      "accountants London",
      "small business accountant",
      "bookkeeping services UK",
      "VAT returns",
      "Making Tax Digital",
      "Self Assessment tax return",
      "Corporation Tax",
      "payroll services UK",
      "Xero accountant",
      "QuickBooks accountant",
      "Amazon seller accountant",
      "company registration UK",
    ],
    twitterHandle: "",
  },

  developerCredit: {
    name: "WideWeb Technologies",
    url: "https://www.widewebtechnologies.site/",
    phone: "+92 3040500121",
  },

  features: {
    showStatistics: true,
    // Off until genuine, permission-granted reviews and named team profiles are supplied.
    showTestimonials: false,
    showTeam: false,
    floatingWhatsApp: true,
  },
};
