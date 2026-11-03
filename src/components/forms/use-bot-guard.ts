"use client";

import { useRef, useState } from "react";
import { MIN_FILL_MS } from "@/lib/forms/schemas";

/**
 * Spam traps for the WhatsApp forms, matching the server-side checks in
 * lib/forms/server.ts: a hidden honeypot field and a minimum time between the
 * visitor first touching the form and sending it.
 *
 * - Honeypot filled in → treated as a bot and silently ignored.
 * - Sent too quickly → not sent; the visitor is asked to press the button
 *   again, so a real person using autofill is never locked out.
 */
export function useBotGuard() {
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Wire to the form's onFocus so the timer starts when the visitor begins.
  const markStarted = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  /** Returns true when the form may be sent. */
  const allow = () => {
    if (honeypot.current?.value) return false;
    if (!startedAt.current || Date.now() - startedAt.current < MIN_FILL_MS) {
      markStarted();
      setError("That was very quick. Please check your details and press the button again.");
      return false;
    }
    setError(null);
    return true;
  };

  return { honeypot, markStarted, allow, error };
}
