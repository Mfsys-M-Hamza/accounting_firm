import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Generated once at build time (also required for the static GitHub Pages export).
export const dynamic = "force-static";

export const alt = `${siteConfig.companyName} — Audit, Tax & Accounting`;
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
          background: "linear-gradient(135deg, #122c50 0%, #0b1f3a 55%, #06142a 100%)",
          color: "white",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#27528a", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 7, padding: 14 }}>
            {[16, 28, 22, 38].map((h, i) => (
              <div key={i} style={{ width: 7, height: h, borderRadius: 4, background: "#d6b566" }} />
            ))}
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>{siteConfig.companyName}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#d6b566", textTransform: "uppercase" }}>Audit · Tax · Accounting · Advisory</div>
          <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 700, maxWidth: 980 }}>Expertise that moves your business forward</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 240, background: "#c29b45", borderRadius: 3 }} />
      </div>
    ),
    size,
  );
}
