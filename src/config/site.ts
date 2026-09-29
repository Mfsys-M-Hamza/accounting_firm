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

const companyName = "[COMPANY NAME]";

export const siteConfig: SiteConfig = {
  companyName,
  legalName: companyName,
  shortName: companyName,
  tagline: "[TAGLINE]",
  description:
    "Professional audit, accounting, taxation and business advisory services that help businesses stay compliant, make informed decisions and grow with confidence.",
  siteUrl: "https://www.example.com",
  // Set to { src: "/brand/logo.svg", alt: "...", width: 180, height: 40 } once a logo
  // is supplied. While null, a typographic wordmark is rendered instead.
  logo: null,
  locale: "en",

  contact: {
    phone: "[PHONE]",
    whatsapp: "[WHATSAPP NUMBER]",
    email: "[EMAIL]",
    address: {
      street: "[ADDRESS]",
      city: "[CITY]",
      region: "",
      postalCode: "",
      country: "[COUNTRY]",
    },
    mapEmbedUrl: "",
    businessHours: [
      { days: "Monday – Friday", hours: "[BUSINESS HOURS]" },
      { days: "Saturday", hours: "[BUSINESS HOURS]" },
      { days: "Sunday", hours: "Closed" },
    ],
  },

  regulatoryBody: "[REGULATORY BODY]",
  yearsOfExperience: "[YEARS OF EXPERIENCE]",
  numberOfClients: "[NUMBER OF CLIENTS]",
  teamSize: "[TEAM SIZE]",

  socialLinks: [
    { platform: "linkedin", url: "[SOCIAL MEDIA LINKS]" },
    { platform: "facebook", url: "[SOCIAL MEDIA LINKS]" },
    { platform: "x", url: "[SOCIAL MEDIA LINKS]" },
    { platform: "instagram", url: "[SOCIAL MEDIA LINKS]" },
  ],

  // Counters animate only once a real `value` is supplied.
  statistics: [
    { label: "Years Experience", value: null, suffix: "+", placeholder: "[XX]" },
    { label: "Clients Served", value: null, suffix: "+", placeholder: "[XXX]" },
    { label: "Professionals", value: null, suffix: "+", placeholder: "[XX]" },
    { label: "Industries Supported", value: null, suffix: "+", placeholder: "[XX]" },
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
      position: "[POSITION, e.g. Audit Director]",
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
        "[Sample testimonial. Replace with a genuine client review, e.g. how the firm helped with their audit, tax filing or monthly bookkeeping.]",
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
      `Hello ${companyName}, I visited your website and would like information about your accounting, audit or taxation services.`,
  },

  seo: {
    titleTemplate: `%s | ${companyName}`,
    defaultTitle: `${companyName} | Audit, Tax & Accounting Firm`,
    defaultDescription:
      "Audit, accounting, taxation, payroll and business advisory services for startups, SMEs and established companies. Request a free quote today.",
    keywords: [
      "audit firm",
      "chartered accountants",
      "tax consultants",
      "bookkeeping services",
      "payroll services",
      "business advisory",
      "virtual CFO",
      "company formation",
    ],
    twitterHandle: "",
  },

  developerCredit: {
    name: "botwebtechnologies.com",
    url: "https://botwebtechnologies.com",
    phone: "+92 3040500121",
  },

  features: {
    showStatistics: true,
    showTestimonials: true,
    showTeam: true,
    floatingWhatsApp: true,
  },
};
