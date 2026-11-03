/**
 * Google Analytics 4, loaded only after the visitor accepts analytics cookies.
 *
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. "G-XXXXXXXXXX") to switch it on.
 * While it is empty nothing loads, no banner is shown and trackEvent() does
 * nothing. Conversion events sent: quote_click, consultation_click,
 * phone_click, email_click, whatsapp_click and generate_lead (form sent).
 */
export const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
export const analyticsEnabled = /^G-[A-Z0-9]+$/.test(gaId);

export const CONSENT_KEY = "analytics-consent";
export type Consent = "granted" | "denied";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
}

/** Injects the GA script once. Only call after consent is granted. */
export function loadAnalytics() {
  if (!analyticsEnabled || window.gtag) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", gaId);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(s);
}

/** Sends an event if analytics is loaded (i.e. configured and consented); otherwise does nothing. */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  window.gtag?.("event", name, params);
}

/** Maps a clicked link to a conversion event name, or null if it isn't one we track. */
export function conversionFor(href: string): string | null {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp_click";
  const path = href.replace(/^https?:\/\/[^/]+/, "").replace(process.env.NEXT_PUBLIC_BASE_PATH ?? "", "");
  if (/^\/quote\/?($|[?#])/.test(path)) return "quote_click";
  if (/^\/book-consultation\/?($|[?#])/.test(path)) return "consultation_click";
  return null;
}
