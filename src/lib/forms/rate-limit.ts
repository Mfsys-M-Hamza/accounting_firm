import "server-only";
/**
 * Fixed-window, in-memory rate limiter.
 *
 * Suitable for a single server instance. On serverless or multi-instance
 * hosting each instance keeps its own counters, so swap this for a shared
 * store (e.g. Redis/Upstash, a database, or your platform's WAF/rate-limit
 * rules) — the `rateLimit(key)` signature is all the form handler relies on.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_KEYS = 5_000;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  if (hits.size > MAX_KEYS) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    // Still full of live entries (e.g. a flood of spoofed IPs): drop the oldest.
    while (hits.size > MAX_KEYS) hits.delete(hits.keys().next().value!);
  }
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  entry.count += 1;
  return { allowed: entry.count <= MAX_REQUESTS, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
}
