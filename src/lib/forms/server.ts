import "server-only";
/**
 * Server-side form pipeline used by every /api/* form route:
 *
 *   same-origin check → rate limit → size limit → spam traps → schema
 *   validation → sanitisation → delivery
 *
 * Delivery: set FORM_WEBHOOK_URL (server-only env var) to POST each
 * submission as JSON to your CRM, email service, Zapier/Make, a Slack
 * workflow or your own backend. Optional FORM_WEBHOOK_SECRET is sent as a
 * bearer token. Credentials never reach the browser.
 *
 * Without a webhook, submissions are logged in development. In production
 * the API responds 503 so leads are never silently dropped — unless
 * FORMS_DEMO_MODE=true is set for a demo deployment.
 */
import { NextResponse, type NextRequest } from "next/server";
import { formSchemas, type FormKind } from "./schemas";
import { rateLimit } from "./rate-limit";

const MAX_BODY_BYTES = 16_384;
const MIN_FILL_MS = 2_500;

/** Strip control characters and HTML tags, normalise whitespace. */
export function sanitize(value: unknown): unknown {
  if (typeof value === "string") {
    return value
      .replace(/<[^>]*>/g, "")
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .replace(/[ \t]+/g, " ")
      .trim();
  }
  if (Array.isArray(value)) return value.map(sanitize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, sanitize(v)]));
  }
  return value;
}

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

const json = (status: number, body: { ok: boolean; message: string; errors?: Record<string, string> }) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

async function deliver(kind: FormKind, data: Record<string, unknown>, meta: Record<string, string>): Promise<boolean> {
  const url = process.env.FORM_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production" || process.env.FORMS_DEMO_MODE === "true") {
      console.info(`[forms] ${kind} submission (no FORM_WEBHOOK_URL configured):`, JSON.stringify({ ...data, meta }, null, 2));
      return true;
    }
    console.error(`[forms] ${kind} submission rejected: FORM_WEBHOOK_URL is not configured.`);
    return false;
  }
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.FORM_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.FORM_WEBHOOK_SECRET}` } : {}),
    },
    body: JSON.stringify({ form: kind, submittedAt: new Date().toISOString(), data, meta }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) console.error(`[forms] webhook responded ${res.status} for ${kind}`);
  return res.ok;
}

export async function handleForm(req: NextRequest, kind: FormKind): Promise<NextResponse> {
  if (!sameOrigin(req)) return json(403, { ok: false, message: "Request blocked." });

  const ip = clientIp(req);
  const limit = rateLimit(`${kind}:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please wait a few minutes and try again, or contact us by phone or WhatsApp." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  if (!req.headers.get("content-type")?.includes("application/json")) return json(415, { ok: false, message: "Unsupported request." });
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, message: "Your submission is too long." });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, message: "Invalid request." });
  }

  // Spam traps: a hidden honeypot field and a minimum time-to-fill. Bots get a
  // normal-looking success response so they don't adapt.
  const { website, startedAt, ...fields } = body;
  const elapsed = Date.now() - Number(startedAt);
  if ((typeof website === "string" && website.length > 0) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return json(200, { ok: true, message: "Thank you." });
  }

  const parsed = formSchemas[kind].safeParse(sanitize(fields));
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return json(422, { ok: false, message: "Please check the highlighted fields.", errors });
  }

  try {
    const delivered = await deliver(kind, parsed.data as Record<string, unknown>, {
      userAgent: (req.headers.get("user-agent") ?? "").slice(0, 200),
      referer: (req.headers.get("referer") ?? "").slice(0, 300),
    });
    if (!delivered) return json(503, { ok: false, message: "We couldn't send your request right now. Please contact us by phone, email or WhatsApp." });
  } catch (err) {
    console.error(`[forms] delivery failed for ${kind}:`, err);
    return json(502, { ok: false, message: "We couldn't send your request right now. Please contact us by phone, email or WhatsApp." });
  }

  return json(200, { ok: true, message: "Thank you — your request has been received." });
}
