/**
 * Local SEO landing pages, served at /locations/<slug>.
 *
 * Only entries with `published: true` are built and added to the sitemap.
 * Publish a location only when it has genuinely useful, unique content —
 * search engines treat near-duplicate "Accountants in <city>" pages as thin
 * content, and they help neither visitors nor rankings.
 *
 * Good local content includes: who you actually serve in the area, local
 * industries you know well, how clients there work with you (office visits,
 * remote), directions/parking, and FAQs specific to that location.
 */
import type { FaqItem } from "./services";

export interface LocationPage {
  slug: string;
  published: boolean;
  city: string;
  /** e.g. "Accountants in Springfield" — becomes the H1 and title. */
  headline: string;
  metaDescription: string;
  intro: string;
  /** Unique paragraphs about serving this area. */
  sections: { heading: string; body: string }[];
  /** Service slugs from services.ts to highlight. */
  services: string[];
  faqs: FaqItem[];
}

export const locations: LocationPage[] = [
  {
    slug: "accountants-in-city",
    published: false, // Example only — replace the content, then set to true.
    city: "[CITY]",
    headline: "Accountants in [CITY]",
    metaDescription: "Audit, tax and accounting services for businesses in [CITY]. [Replace with a unique description.]",
    intro: "[Unique introduction describing the firm's presence and experience in [CITY].]",
    sections: [
      { heading: "Supporting [CITY] businesses", body: "[Describe local industries you serve and how.]" },
      { heading: "Visiting our [CITY] office", body: "[Directions, parking, meeting options.]" },
    ],
    services: ["accounting-bookkeeping", "taxation", "audit-assurance"],
    faqs: [],
  },
];

export const publishedLocations = locations.filter((l) => l.published);
