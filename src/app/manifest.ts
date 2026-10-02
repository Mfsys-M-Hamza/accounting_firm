import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Generated once at build time (also required for the static GitHub Pages export).
export const dynamic = "force-static";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.companyName,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1c1b6b",
    icons: [
      { src: `${basePath}/icon.png`, sizes: "64x64", type: "image/png" },
      { src: `${basePath}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  };
}
