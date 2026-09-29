# Audit, Accounting & Tax Firm Website Template

A production-ready, reusable website for audit, accounting, taxation and business-advisory firms.
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion, Lucide icons, React Hook Form and Zod.

Every firm-specific value is a `[PLACEHOLDER]` until you replace it. Placeholders are shown visibly on the
site but are **never** turned into phone/email/WhatsApp links and **never** emitted in structured data.

## Quick start

```bash
npm install
cp .env.example .env.local     # optional in development
npm run dev                    # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Customising for a new client

| What | Where |
| --- | --- |
| Company name, tagline, logo, phone, WhatsApp, email, address, hours, map, social links | `src/config/site.ts` |
| Statistics (counters), team profiles, testimonials, certifications, SEO defaults, feature toggles | `src/config/site.ts` |
| Services (each creates a page at `/services/<slug>`) | `src/content/services.ts` |
| Industries | `src/content/industries.ts` |
| FAQs | `src/content/faqs.ts` |
| Articles (resource centre) | `src/content/posts.ts` |
| Local SEO pages (`/locations/<slug>`) | `src/content/locations.ts` |
| Hero copy, advantages, process steps, values | `src/content/home.ts` |
| Form dropdown options | `src/content/form-options.ts` |
| Photos and their alt text | `src/assets/images/` and `src/content/images.ts` |
| Colours and fonts | `@theme` block in `src/app/globals.css`, fonts in `src/app/layout.tsx` |
| Main / footer navigation | `src/config/navigation.ts` |

Rules the template enforces:

- **Statistics** render as `[XX]+` until you set a real `value`; only then do they animate.
- **Testimonials** and **team profiles** with `placeholder: true` show a visible "Sample" label. Only publish reviews you have permission to use. Testimonials are never added to structured data.
- **Certifications** are empty by default — list only memberships the firm actually holds.
- **WhatsApp**: set `contact.whatsapp` to the international number, digits only (e.g. `447700900123`). Until then, links open WhatsApp without a recipient.
- **Logo**: set `logo` to `{ src: "/brand/logo.svg", alt, width, height }` (file in `public/brand/`). While `null`, a monogram wordmark is used. Replace `src/app/icon.tsx` / `apple-icon.tsx` with PNG icons if desired.
- **Legal pages** (`/privacy-policy`, `/terms-and-conditions`) are templates — replace placeholders and have them reviewed for your jurisdiction.

## Forms and lead delivery

Four forms post to route handlers in `src/app/api/*`, all sharing one pipeline (`src/lib/forms/server.ts`):

same-origin check → rate limit → size limit → honeypot + time-to-fill spam traps → Zod validation (the **same schemas** the browser uses) → sanitisation → delivery.

Set `FORM_WEBHOOK_URL` (server-only) to receive each submission as JSON:

```json
{ "form": "quote", "submittedAt": "…", "data": { … }, "meta": { "userAgent": "…", "referer": "…" } }
```

Point it at your backend, CRM, email service, or a Zapier/Make webhook. `FORM_WEBHOOK_SECRET` is sent as a bearer token. Without a webhook, submissions are logged in development; in production the API returns 503 (so leads are never silently lost) unless `FORMS_DEMO_MODE=true`.

The rate limiter is in-memory (fine for one server). On serverless or multi-instance hosting, replace `src/lib/forms/rate-limit.ts` with a shared store (Redis/Upstash) or your platform's WAF rules. To add CAPTCHA (e.g. Cloudflare Turnstile), verify the token inside `handleForm` and add its origin to the CSP in `next.config.ts`.

### WhatsApp quotation

The Instant Quote form (`/quote`) validates the fields, formats them into a WhatsApp message (`src/lib/forms/quote-message.ts`) and opens `wa.me` with the message pre-filled. Nothing is sent until the visitor presses Send in WhatsApp. A fallback link and "copy message" button appear in case a browser blocks the new tab.

## SEO

- Per-page title, description, canonical, Open Graph and X/Twitter tags via `buildMetadata()` (`src/lib/seo.ts`).
- Generated `sitemap.xml`, `robots.txt`, web manifest, Open Graph image and favicons.
- JSON-LD (`src/lib/schema.ts`): AccountingService/ProfessionalService organisation, WebSite, Service, BreadcrumbList, FAQPage (only for FAQs rendered on that page) and Article. Placeholder values are omitted automatically.
- Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs and the sitemap use the real domain.

## Quality checks

```bash
npm run lint                                     # ESLint + TypeScript
npm run build
FORMS_DEMO_MODE=true npm start                   # terminal 1
npm run qa -- http://localhost:3000              # terminal 2
```

`scripts/qa.mjs` drives Chrome (set `CHROME_PATH` if needed) across every sitemap URL on desktop and mobile and checks:
status codes, console/network errors, single H1, unique titles and descriptions, canonical/OG tags, valid JSON-LD with no placeholders,
image alt text, horizontal overflow, axe-core WCAG 2.2 AA, internal links, WhatsApp link format, security headers, redirects, 404s,
keyboard dropdown, mobile menu, reduced motion, form validation, WhatsApp message content and form submission. Screenshots go to `qa-screenshots/`.

## Project structure

```
src/
  app/            routes, API handlers, sitemap/robots/OG/icons
  components/
    forms/        quote, contact, consultation, callback + shared fields
    icons/        3D-style SVG illustrations, icon badges, brand icons
    layout/       header, footer, floating WhatsApp
    motion/       Reveal, Stagger, Counter, Parallax (respect prefers-reduced-motion)
    sections/     reusable page sections
    ui/           buttons, section headings, breadcrumbs, page hero, JSON-LD
  config/         site.ts (client config), navigation, types
  content/        services, industries, FAQs, posts, locations, images
  lib/            SEO, schema, WhatsApp, forms (schemas, server pipeline, rate limit)
scripts/qa.mjs    automated QA
```

Photos are from Unsplash (free for commercial use) — see `src/assets/images/CREDITS.md`. Consider replacing people photos with the firm's own team and office before launch.
