import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { siteUrl } from "@/lib/config-utils";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Analytics } from "@/components/layout/analytics";
import { RevealScript } from "@/components/motion/motion";
import { JsonLd } from "@/components/ui/json-ld";

// Static files in public/ are not prefixed automatically when the site lives under a sub-path (GitHub Pages).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: siteConfig.seo.defaultTitle, template: siteConfig.seo.titleTemplate },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  applicationName: siteConfig.companyName,
  authors: [{ name: siteConfig.companyName }],
  creator: siteConfig.companyName,
  icons: { icon: `${basePath}/icon.png`, apple: `${basePath}/apple-icon.png` },
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.companyName,
    locale: siteConfig.locale,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: siteConfig.seo.defaultTitle, description: siteConfig.seo.defaultDescription },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#12304a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.locale} className={jakarta.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <RevealScript />
      </body>
    </html>
  );
}
