import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Generated once at build time (also required for the static GitHub Pages export).
export const dynamic = "force-static";

export const alt = `${siteConfig.companyName} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-sharing image, generated from the site config (no design file needed). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #3634a8 0%, #29288e 50%, #1c1b6b 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="-45 -39 1180 1180">
            <rect x="-45" y="-39" width="1180" height="1180" rx="140" fill="#29288e" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="24" />
            <path fill="#ffffff" d="M255 330H430L634 556L438 772H268L458 556Z" />
            <path fill="#25bba2" d="M655 330H835L645 518L561 444ZM645 594L835 772H655L561 678Z" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 700 }}>{siteConfig.companyName}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#4fd1b9", textTransform: "uppercase" }}>{siteConfig.tagline}</div>
          <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 700, maxWidth: 980 }}>Your trusted partner in financial success</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 240, background: "#25bba2", borderRadius: 3 }} />
      </div>
    ),
    size,
  );
}
