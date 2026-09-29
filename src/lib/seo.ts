import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMeta {
  title: string;
  description: string;
  /** Path beginning with "/", used for the canonical URL and og:url. */
  path: string;
  /** Absolute or root-relative image; defaults to the generated /opengraph-image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Use the title as-is instead of applying the title template. */
  absoluteTitle?: boolean;
}

/**
 * One call per page gives a unique title, description, canonical URL,
 * Open Graph and X/Twitter metadata. The root layout sets metadataBase so
 * relative URLs resolve against the configured site URL.
 */
export function buildMetadata({ title, description, path, image, type = "website", publishedTime, modifiedTime, noindex, absoluteTitle }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : siteConfig.seo.titleTemplate.replace("%s", title);
  // Setting openGraph on a page replaces the inherited file-based image, so always pass one.
  const ogImage = image ?? "/opengraph-image";
  const images = image ? [{ url: image, alt: title }] : [{ url: ogImage, width: 1200, height: 630, alt: title }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: siteConfig.companyName,
      locale: siteConfig.locale,
      images,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(siteConfig.seo.twitterHandle ? { site: siteConfig.seo.twitterHandle } : {}),
      images: [ogImage],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
