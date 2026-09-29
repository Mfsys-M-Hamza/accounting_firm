import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
// Static export for GitHub Pages / static hosts (npm run build:pages). No server: no API routes, headers or redirects.
const isStatic = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Content Security Policy. If you add third-party services (analytics, chat widgets,
// captcha, a different map provider) add their origins to the matching directive.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Pin the project root so a lockfile in a parent folder is not picked up.
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  ...(isStatic ? { output: "export" as const, trailingSlash: true, basePath } : {}),
  reactStrictMode: true,
  images: {
    // Static hosts cannot resize images on request; the source files are already optimised WebP.
    unoptimized: isStatic,
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  ...(isStatic ? {} : { headers, redirects }),
};

async function headers() {
  return [{ source: "/:path*", headers: securityHeaders }];
}

async function redirects() {
  return [
    { source: "/about-us", destination: "/about", permanent: true },
    { source: "/blog", destination: "/resources", permanent: true },
    { source: "/blog/:slug", destination: "/resources/:slug", permanent: true },
    { source: "/contact-us", destination: "/contact", permanent: true },
    { source: "/get-a-quote", destination: "/quote", permanent: true },
    { source: "/privacy", destination: "/privacy-policy", permanent: true },
    { source: "/terms", destination: "/terms-and-conditions", permanent: true },
  ];
}

export default nextConfig;
