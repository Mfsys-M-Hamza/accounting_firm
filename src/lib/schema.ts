/**
 * Structured data (schema.org JSON-LD).
 *
 * Rules enforced here:
 *  - Placeholder values ("[PHONE]" etc.) are omitted, never published.
 *  - No ratings, reviews, prices or credentials are emitted — testimonials
 *    and statistics stay out of structured data entirely.
 *  - FAQPage is only generated from the exact FAQ items rendered on the page.
 */
import { siteConfig } from "@/config/site";
import type { FaqItem, Service } from "@/content/services";
import type { Post } from "@/content/posts";
import { absoluteUrl, configuredSocialLinks, isConfigured } from "./config-utils";

type Json = Record<string, unknown>;

const orgId = () => absoluteUrl("/#organization");

function clean<T extends Json>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))) as T;
}

const valueOrUndefined = (v: string) => (isConfigured(v) ? v : undefined);

export function organizationSchema(): Json {
  const { contact, companyName, legalName, description } = siteConfig;
  const a = contact.address;
  const hasAddress = isConfigured(a.street) && isConfigured(a.city);
  return clean({
    "@context": "https://schema.org",
    "@type": ["AccountingService", "ProfessionalService"],
    "@id": orgId(),
    name: valueOrUndefined(companyName),
    legalName: valueOrUndefined(legalName),
    description,
    url: absoluteUrl("/"),
    logo: siteConfig.logo ? absoluteUrl(siteConfig.logo.src) : undefined,
    image: absoluteUrl("/opengraph-image"),
    telephone: valueOrUndefined(contact.phone),
    email: valueOrUndefined(contact.email),
    address: hasAddress
      ? clean({
          "@type": "PostalAddress",
          streetAddress: a.street,
          addressLocality: a.city,
          addressRegion: a.region || undefined,
          postalCode: a.postalCode || undefined,
          addressCountry: valueOrUndefined(a.country),
        })
      : undefined,
    areaServed: valueOrUndefined(a.city) ?? valueOrUndefined(a.country),
    sameAs: configuredSocialLinks().map((s) => s.url),
  });
}

export function websiteSchema(): Json {
  return clean({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: valueOrUndefined(siteConfig.companyName),
    publisher: { "@id": orgId() },
  });
}

export function serviceSchema(service: Service): Json {
  return clean({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": orgId() },
    areaServed: valueOrUndefined(siteConfig.contact.address.city) ?? valueOrUndefined(siteConfig.contact.address.country),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.included.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.title, description: item.description },
      })),
    },
  });
}

export function breadcrumbSchema(items: { name: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(items: FaqItem[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(post: Post, authorName: string, imageUrl: string): Json {
  return clean({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(imageUrl),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: post.author ? { "@type": "Person", name: post.author } : clean({ "@type": "Organization", "@id": orgId(), name: valueOrUndefined(authorName) }),
    publisher: { "@id": orgId() },
    mainEntityOfPage: absoluteUrl(`/resources/${post.slug}`),
    articleSection: post.category,
  });
}
