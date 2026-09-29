import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { posts } from "@/content/posts";
import { publishedLocations } from "@/content/locations";
import { absoluteUrl } from "@/lib/config-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/quote", priority: 0.9, changeFrequency: "yearly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.7, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/book-consultation", priority: 0.7, changeFrequency: "yearly" },
    { path: "/faqs", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p.path), changeFrequency: p.changeFrequency, priority: p.priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/resources/${p.slug}`), lastModified: p.updatedAt ?? p.publishedAt, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...publishedLocations.map((l) => ({ url: absoluteUrl(`/locations/${l.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
