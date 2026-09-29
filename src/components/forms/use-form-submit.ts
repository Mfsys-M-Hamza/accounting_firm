"use client";

import { useRef, useState } from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { FormKind } from "@/lib/forms/schemas";

type Status = { state: "idle" } | { state: "submitting" } | { state: "success"; message: string } | { state: "error"; message: string };

/**
 * Posts a validated form to /api/<kind>, including the spam-trap fields the
 * server expects, and maps server-side field errors back onto the form.
 */
export function useFormSubmit<T extends FieldValues>(kind: FormKind, setError: UseFormSetError<T>) {
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  // Called from the form's onFocus so the timer starts when the visitor begins filling it in.
  const markStarted = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  async function submit(data: T): Promise<boolean> {
    // Static builds (GitHub Pages) have no server to receive submissions.
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
      setStatus({
        state: "error",
        message: "Online submission isn't available on this preview site. Please send your request via WhatsApp or contact us by phone or email.",
      });
      return false;
    }
    setStatus({ state: "submitting" });
    try {
      const res = await fetch(`/api/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot.current?.value ?? "", startedAt: startedAt.current || Date.now() }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Record<string, string> };
      if (res.ok && body.ok) {
        setStatus({ state: "success", message: body.message ?? "Thank you." });
        return true;
      }
      if (body.errors) {
        for (const [field, message] of Object.entries(body.errors)) setError(field as Path<T>, { message });
      }
      setStatus({ state: "error", message: body.message ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ state: "error", message: "We couldn't reach the server. Please check your connection and try again." });
    }
    return false;
  }

  return { status, setStatus, submit, markStarted, honeypot };
}
