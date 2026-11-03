"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { analyticsEnabled, conversionFor, loadAnalytics, readConsent, saveConsent, trackEvent, type Consent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

/** Event fired by the footer's "Cookie settings" link to reopen the banner. */
export const OPEN_CONSENT_EVENT = "open-cookie-settings";

/**
 * Cookie consent banner + conversion click tracking. Renders nothing at all
 * unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 */
export function Analytics() {
  const [consent, setConsent] = useState<Consent | null | "unknown">("unknown");

  useEffect(() => {
    if (!analyticsEnabled) return;
    const stored = readConsent();
    // Reading localStorage is only possible after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(stored);
    if (stored === "granted") loadAnalytics();

    const reopen = () => setConsent(null);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);

    // One delegated listener tracks every quote, consultation, phone, email and WhatsApp link.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href");
      const name = href ? conversionFor(href) : null;
      if (name) trackEvent(name, { link_text: a?.textContent?.trim().slice(0, 60) ?? "", page_path: location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  if (!analyticsEnabled || consent !== null) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    setConsent(value);
    if (value === "granted") loadAnalytics();
    // Turning analytics off after it loaded needs a reload to unload the script.
    else if (window.gtag) location.reload();
  };

  return (
    <div role="region" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-xl border border-line bg-white p-5 shadow-lift sm:inset-x-6 sm:bottom-6">
      <p className="font-bold text-navy-900">Cookies</p>
      <p className="mt-1.5 text-sm leading-relaxed text-body">
        We&apos;d like to use analytics cookies to understand how visitors use our website so we can improve it. They&apos;re only set if you accept. See our{" "}
        <Link href="/privacy-policy" className="font-semibold text-teal-700 underline">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={() => choose("granted")}>
          Accept analytics
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => choose("denied")}>
          Reject
        </Button>
      </div>
    </div>
  );
}

/** Footer link that reopens the consent banner. Hidden while analytics is off. */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!analyticsEnabled) return null;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Cookie settings
    </button>
  );
}
