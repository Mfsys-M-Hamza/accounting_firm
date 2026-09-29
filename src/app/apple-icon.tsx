import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 14, padding: 38, background: "linear-gradient(135deg, #27528a, #0b1f3a)" }}>
        {[40, 72, 56, 100].map((h, i) => (
          <div key={i} style={{ width: 16, height: h, borderRadius: 8, background: "#d6b566" }} />
        ))}
      </div>
    ),
    size,
  );
}
