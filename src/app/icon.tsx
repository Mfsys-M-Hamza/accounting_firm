import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon generated from the monogram mark. Replace with src/app/icon.png once a real logo exists. */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 5, padding: 13, borderRadius: 14, background: "linear-gradient(135deg, #27528a, #0b1f3a)" }}>
        {[14, 26, 20, 36].map((h, i) => (
          <div key={i} style={{ width: 6, height: h, borderRadius: 3, background: "#d6b566" }} />
        ))}
      </div>
    ),
    size,
  );
}
