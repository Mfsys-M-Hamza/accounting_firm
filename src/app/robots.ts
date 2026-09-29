import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/config-utils";

// Generated once at build time (also required for the static GitHub Pages export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl(),
  };
}
