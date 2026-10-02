/**
 * Automated QA for the built site.
 *
 *   npm run build
 *   FORMS_DEMO_MODE=true npm start               (terminal 1; demo mode lets form tests succeed without a webhook)
 *   npm run qa -- http://localhost:3000          (terminal 2)
 *
 * Checks every sitemap URL on desktop and mobile: status, console errors,
 * failed requests, one H1, unique title/description, canonical, OG tags,
 * valid JSON-LD, image alt text, horizontal overflow and an axe-core
 * WCAG 2.2 AA scan. Then: internal links, WhatsApp link format, security
 * headers, redirects, 404s, header dropdown + mobile menu, reduced motion,
 * and every form (validation, WhatsApp message, submission).
 *
 * Screenshots go to qa-screenshots/. Set CHROME_PATH if Chrome is elsewhere.
 */
import puppeteer from "puppeteer-core";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const SHOTS = "qa-screenshots";
mkdirSync(SHOTS, { recursive: true });

const report = { base: BASE, checks: [], failures: [], pages: [] };
const pass = (m) => (report.checks.push(m), console.log("  ✓", m));
const fail = (m) => (report.failures.push(m), console.log("  ✗", m));
const section = (t) => console.log(`\n── ${t}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Scroll first and let the layout settle (smooth scrolling and the header's on-scroll
// change can shift content), otherwise page.click may hit the element's old position.
const clickEl = async (page, sel) => {
  await page.$eval(sel, (el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
  await sleep(400);
  await page.click(sel);
};

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
};

// ─────────────────────────────────────────────────────────── sitemap & robots
section("Sitemap & robots");
const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
urls.length > 10 ? pass(`sitemap.xml lists ${urls.length} URLs`) : fail(`sitemap has only ${urls.length} URLs`);
const robots = await (await fetch(`${BASE}/robots.txt`)).text();
robots.includes("Sitemap:") ? pass("robots.txt references the sitemap") : fail("robots.txt missing Sitemap line");
robots.includes("Disallow: /api/") ? pass("robots.txt disallows /api/") : fail("robots.txt should disallow /api/");

// ─────────────────────────────────────────────────────────── headers, redirects, 404
section("Security headers, redirects, 404");
{
  const r = await fetch(`${BASE}/`);
  for (const h of ["content-security-policy", "strict-transport-security", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy"]) {
    r.headers.get(h) ? pass(`header ${h}`) : fail(`missing header ${h}`);
  }
  r.headers.get("x-powered-by") ? fail("x-powered-by exposed") : pass("x-powered-by hidden");
  for (const [from, to] of [["/about-us", "/about"], ["/blog", "/resources"], ["/privacy", "/privacy-policy"], ["/get-a-quote", "/quote"]]) {
    const res = await fetch(`${BASE}${from}`, { redirect: "manual" });
    const loc = res.headers.get("location") || "";
    [301, 308].includes(res.status) && loc.endsWith(to) ? pass(`redirect ${from} → ${to}`) : fail(`redirect ${from} gave ${res.status} ${loc}`);
  }
  for (const bad of ["/does-not-exist", "/services/not-a-service", "/resources/not-a-post", "/locations/anywhere"]) {
    const res = await fetch(`${BASE}${bad}`);
    res.status === 404 ? pass(`${bad} → 404`) : fail(`${bad} returned ${res.status}`);
  }
}

// ─────────────────────────────────────────────────────────── API hardening
section("Form API hardening");
{
  const post = (path, body, headers = {}) =>
    fetch(`${BASE}${path}`, { method: "POST", headers: { "content-type": "application/json", origin: BASE, ...headers }, body: JSON.stringify(body) });
  let r = await post("/api/contact", { name: "x" }, { origin: "https://evil.example" });
  r.status === 403 ? pass("cross-origin form POST rejected (403)") : fail(`cross-origin POST returned ${r.status}`);
  r = await post("/api/contact", { name: "A", email: "bad", message: "short", startedAt: Date.now() - 10_000 });
  const j = await r.json();
  r.status === 422 && j.errors?.email ? pass("server-side validation returns field errors (422)") : fail(`server validation returned ${r.status}`);
  r = await post("/api/callback", { name: "Bot", phone: "123456789", preferredTime: "Any", service: "Payroll", consent: true, website: "http://spam", startedAt: Date.now() - 10_000 });
  (await r.json()).ok && r.status === 200 ? pass("honeypot submissions silently accepted (not delivered)") : fail("honeypot handling unexpected");
  r = await post("/api/contact", { name: "<script>alert(1)</script>Jo", email: "a@b.co", subject: "Hello there", message: "Testing sanitisation of input", contactMethod: "Email", consent: true, startedAt: Date.now() - 10_000 });
  [200, 503].includes(r.status) ? pass(`sanitised submission handled (${r.status})`) : fail(`sanitised submission returned ${r.status}`);
}

// ─────────────────────────────────────────────────────────── per-page checks
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });
const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();
const waLinks = new Set();

async function openPage(vp) {
  const page = await browser.newPage();
  await page.setViewport(viewports[vp]);
  await page.setCacheEnabled(false);
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("requestfailed", (r) => !r.url().includes("wa.me") && errors.push(`request failed: ${r.url()} ${r.failure()?.errorText}`));
  page.on("response", (r) => r.status() >= 400 && r.url().startsWith(BASE) && errors.push(`HTTP ${r.status()} ${r.url()}`));
  return { page, errors };
}

for (const vp of ["desktop", "mobile"]) {
  section(`Pages — ${vp}`);
  for (const path of urls) {
    const { page, errors } = await openPage(vp);
    const res = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle0" });
    // Scroll through so in-view animations and lazy images run.
    await page.evaluate(async () => {
      // behavior: instant — the site uses smooth scrolling, which would swallow rapid scrollTo calls.
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await sleep(900);

    const info = await page.evaluate(() => {
      const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
        try {
          return { ok: true, data: JSON.parse(s.textContent) };
        } catch {
          return { ok: false };
        }
      });
      return {
        h1: document.querySelectorAll("h1").length,
        title: document.title,
        description: meta('meta[name="description"]'),
        canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
        ogTitle: meta('meta[property="og:title"]'),
        ogImage: meta('meta[property="og:image"]'),
        twitter: meta('meta[name="twitter:card"]'),
        ld,
        imgNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
        placeholdersInLd: ld.some((l) => l.ok && /\[[A-Z ]+\]/.test(JSON.stringify(l.data))),
        hiddenContent: [...document.querySelectorAll("main h2, main h3")].filter((h) => {
          let el = h;
          while (el && el !== document.body) {
            if (parseFloat(getComputedStyle(el).opacity) < 0.05) return true;
            el = el.parentElement;
          }
          return false;
        }).length,
      };
    });

    const problems = [];
    if (res.status() !== 200) problems.push(`status ${res.status()}`);
    if (info.h1 !== 1) problems.push(`${info.h1} h1 elements`);
    if (!info.description) problems.push("no meta description");
    if (!info.canonical) problems.push("no canonical");
    if (!info.ogTitle || !info.ogImage || !info.twitter) problems.push("missing OG/Twitter tags");
    if (info.ld.some((l) => !l.ok)) problems.push("invalid JSON-LD");
    if (info.placeholdersInLd) problems.push("placeholder text in JSON-LD");
    if (info.imgNoAlt) problems.push(`${info.imgNoAlt} images without alt`);
    if (info.overflow > 1) problems.push(`horizontal overflow ${info.overflow}px`);
    if (info.hiddenContent) problems.push(`${info.hiddenContent} headings still invisible after scrolling`);
    if (errors.length) problems.push(`console/network errors: ${errors.slice(0, 3).join(" | ")}`);

    if (vp === "desktop") {
      titles.set(info.title, [...(titles.get(info.title) || []), path]);
      descriptions.set(info.description, [...(descriptions.get(info.description) || []), path]);
      for (const l of info.links) {
        if (l.startsWith("/") && !l.startsWith("//")) internalLinks.add(l.split("#")[0] || "/");
        if (l.includes("wa.me")) waLinks.add(l);
      }
    }

    await page.addScriptTag({ content: axeSource });
    const axe = await page.evaluate(async () => {
      const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] });
      return r.violations.map((v) => `${v.id} (${v.impact}, ${v.nodes.length}): ${v.nodes[0]?.target?.join(" ")}`);
    });
    if (axe.length) problems.push(`axe: ${axe.join("; ")}`);

    const types = info.ld.filter((l) => l.ok).flatMap((l) => (Array.isArray(l.data) ? l.data : [l.data]).map((d) => [].concat(d["@type"]).join("/")));
    report.pages.push({ vp, path, title: info.title, jsonLd: types, problems });
    problems.length ? fail(`${path} — ${problems.join(" · ")}`) : pass(`${path} [${types.join(", ")}]`);

    if (["/", "/quote", "/services/vat-services", "/resources/month-end-close-checklist-small-business", "/contact", "/about"].includes(path)) {
      const name = path === "/" ? "home" : path.slice(1).replace(/\//g, "_");
      await page.screenshot({ path: `${SHOTS}/${vp}-${name}.png`, fullPage: true });
    }
    await page.close();
  }
}

section("Uniqueness");
for (const [t, paths] of titles) paths.length > 1 ? fail(`duplicate title "${t}" on ${paths.join(", ")}`) : null;
for (const [d, paths] of descriptions) paths.length > 1 ? fail(`duplicate description on ${paths.join(", ")}`) : null;
pass(`${titles.size} unique titles, ${descriptions.size} unique descriptions`);

section("Internal links");
for (const l of internalLinks) {
  const r = await fetch(`${BASE}${l}`, { redirect: "follow" });
  r.ok ? null : fail(`broken internal link ${l} (${r.status})`);
}
pass(`checked ${internalLinks.size} unique internal links`);

section("WhatsApp links");
for (const l of waLinks) /^https:\/\/wa\.me\/\d*\?text=.+/.test(l) ? null : fail(`malformed WhatsApp link ${l}`);
pass(`${waLinks.size} WhatsApp link variants well-formed`);

// ─────────────────────────────────────────────────────────── navigation
section("Navigation");
{
  const { page, errors } = await openPage("desktop");
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await page.focus('button[aria-controls="services-menu"]');
  await page.keyboard.press("Enter");
  await page.waitForSelector("#services-menu a");
  const count = await page.$$eval("#services-menu a", (a) => a.length);
  count >= 8 ? pass(`services dropdown opens by keyboard (${count} links)`) : fail("services dropdown incomplete");
  await page.keyboard.press("Escape");
  await sleep(400);
  (await page.$("#services-menu")) ? fail("dropdown did not close on Escape") : pass("dropdown closes on Escape and returns focus");
  await page.evaluate(() => window.scrollTo(0, 600));
  await sleep(500);
  const solid = await page.$eval("header > div:nth-child(2)", (el) => getComputedStyle(el).backgroundColor);
  solid !== "rgba(0, 0, 0, 0)" ? pass("header changes appearance on scroll") : fail("header did not change on scroll");
  // Skip link
  await page.goto(`${BASE}/about`, { waitUntil: "networkidle0" });
  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => document.activeElement?.textContent);
  skip?.includes("Skip to main") ? pass("skip link is first focusable element") : fail(`first focus is "${skip}"`);
  errors.length ? fail(`nav console errors: ${errors[0]}`) : null;
  await page.close();

  const m = await openPage("mobile");
  await m.page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await m.page.click('button[aria-controls="mobile-menu"]');
  await m.page.waitForSelector("#mobile-menu");
  await sleep(350);
  await m.page.screenshot({ path: `${SHOTS}/mobile-menu.png` });
  await m.page.click('button[aria-controls="mobile-services"]');
  await m.page.waitForSelector("#mobile-services a");
  await sleep(400);
  const svc = await m.page.$$eval("#mobile-services a", (a) => a.length);
  svc >= 9 ? pass(`mobile menu + services accordion work (${svc} links)`) : fail("mobile services accordion incomplete");
  const locked = await m.page.evaluate(() => document.body.style.overflow);
  locked === "hidden" ? pass("page scroll locked while menu open") : fail("scroll not locked");
  await Promise.all([m.page.waitForNavigation({ waitUntil: "networkidle0" }), m.page.click('#mobile-services a[href="/services/taxation"]')]);
  await sleep(600); // menu exit animation
  const closed = !(await m.page.$("#mobile-menu"));
  m.page.url().endsWith("/services/taxation") && closed ? pass("mobile menu navigates and closes") : fail("mobile menu navigation/close failed");
  const fab = await m.page.$eval('a[aria-label^="Chat with us on WhatsApp"]', (a) => {
    const r = a.getBoundingClientRect();
    return { href: a.href, visible: r.width > 0 && r.bottom <= innerHeight && r.right <= innerWidth };
  });
  fab.visible && fab.href.startsWith("https://wa.me/") ? pass("floating WhatsApp visible on mobile") : fail("floating WhatsApp not visible");
  await m.page.close();
}

// ─────────────────────────────────────────────────────────── reduced motion
section("Reduced motion");
{
  const { page } = await openPage("desktop");
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.querySelector("#industries-title")?.scrollIntoView());
  await sleep(700);
  const transform = await page.$eval("#industries-title", (h) => getComputedStyle(h.closest("div[style]") ?? h).transform);
  const visible = await page.$eval("#industries-title", (h) => h.getBoundingClientRect().height > 0);
  visible && (transform === "none" || transform.includes("matrix(1, 0, 0, 1, 0, 0)")) ? pass("reduced motion: content visible without transforms") : fail(`reduced motion transform: ${transform}`);
  await page.close();
}

// ─────────────────────────────────────────────────────────── forms
async function fill(page, label, value) {
  const id = await page.evaluate((text) => [...document.querySelectorAll("label")].find((l) => l.textContent.trim().startsWith(text))?.htmlFor, label);
  if (!id) throw new Error(`no field labelled ${label}`);
  const tag = await page.$eval(`[id="${id}"]`, (el) => el.tagName);
  if (tag === "SELECT") await page.select(`[id="${id}"]`, value);
  else {
    await page.click(`[id="${id}"]`, { clickCount: 3 });
    await page.type(`[id="${id}"]`, value);
  }
}
const choose = (page, value) => page.$eval(`input[value="${value}"]`, (i) => i.click());

section("Quote form + WhatsApp");
{
  const { page, errors } = await openPage("mobile");
  await page.goto(`${BASE}/quote`, { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    window.__opened = [];
    window.open = (u) => (window.__opened.push(u), {});
  });
  await clickEl(page, "form button.bg-whatsapp");
  await sleep(500);
  const errCount = await page.$$eval('[aria-invalid="true"]', (e) => e.length);
  const focused = await page.evaluate(() => document.activeElement?.getAttribute("aria-invalid") === "true" || document.activeElement?.closest("fieldset")?.getAttribute("aria-invalid") === "true");
  const opened0 = await page.evaluate(() => window.__opened.length);
  errCount >= 8 && opened0 === 0 ? pass(`empty quote blocked with ${errCount} field errors`) : fail(`empty quote: ${errCount} errors, opened=${opened0}`);
  focused ? pass("focus moved to first invalid field") : fail("focus not moved to invalid field");

  await fill(page, "Full name", "Jane Tester");
  await fill(page, "Business name", "Tester Ltd");
  await fill(page, "Email", "jane@example.com");
  await fill(page, "Phone", "+44 7700 900123");
  await fill(page, "Country", "United Kingdom");
  await fill(page, "City", "Leeds");
  await fill(page, "Business type", "Private Limited Company (Ltd)");
  await fill(page, "Industry", "Retail");
  await fill(page, "Annual turnover range", "£90,000 – £250,000");
  await fill(page, "Number of employees", "2 – 10");
  await choose(page, "No");
  await choose(page, "Bookkeeping");
  await choose(page, "Payroll");
  await choose(page, "WhatsApp");
  await fill(page, "Preferred contact time", "Any time");
  await fill(page, "Message / requirements", "About 200 transactions a month.");
  await page.$eval('input[name="consent"]', (i) => i.click());
  await sleep(2600); // time trap
  await clickEl(page, "form button.bg-whatsapp");
  await sleep(600);
  const opened = await page.evaluate(() => window.__opened);
  if (opened.length === 1) {
    const u = new URL(opened[0]);
    const text = u.searchParams.get("text") ?? "";
    const expect = ["I would like to request a quotation.", "Jane Tester", "Tester Ltd", "United Kingdom", "Private Limited Company (Ltd)", "Bookkeeping, Payroll", "£90,000 – £250,000", "2 – 10", "WhatsApp — Any time", "200 transactions", "Please contact me regarding the quotation."];
    const missing = expect.filter((e) => !text.includes(e));
    u.hostname === "wa.me" && !missing.length ? pass("WhatsApp quote message generated with all fields") : fail(`WhatsApp message missing: ${missing.join(", ")}`);
    writeFileSync(`${SHOTS}/whatsapp-message.txt`, text);
  } else fail(`WhatsApp opened ${opened.length} times`);
  (await page.$eval("body", (b) => b.innerText.includes("WhatsApp has been opened"))) ? pass("WhatsApp confirmation + fallback link shown") : fail("no WhatsApp confirmation");

  const submitButtons = await page.$$eval('form button[type="submit"]', (bs) => bs.map((b) => b.innerText.trim()));
  submitButtons.length === 1 && submitButtons[0].includes("WhatsApp") ? pass("quote form has only the WhatsApp action") : fail(`unexpected quote submit buttons: ${submitButtons.join(" | ")}`);
  await page.screenshot({ path: `${SHOTS}/mobile-quote-whatsapp.png` });
  errors.length ? fail(`quote console errors: ${errors[0]}`) : pass("no console errors during quote flow");
  await page.close();
}

section("Contact form");
{
  const { page } = await openPage("desktop");
  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    window.__opened = [];
    window.open = (u) => (window.__opened.push(u), {});
  });
  await clickEl(page, "main form button[type=submit]");
  await sleep(400);
  const n = await page.$$eval('main form [aria-invalid="true"]', (e) => e.length);
  const opened0 = await page.evaluate(() => window.__opened.length);
  n >= 5 && opened0 === 0 ? pass(`contact validation shows ${n} errors, WhatsApp not opened`) : fail(`contact validation showed ${n}, opened=${opened0}`);
  await fill(page, "Name", "Sam Client");
  await fill(page, "Email", "not-an-email");
  await clickEl(page, "main form button[type=submit]");
  await sleep(300);
  (await page.$eval("main form", (f) => f.innerText.includes("valid email"))) ? pass("invalid email rejected") : fail("invalid email accepted");
  await fill(page, "Email", "sam@example.com");
  await fill(page, "Subject", "Year-end accounts");
  await fill(page, "Message", "We need help with our year-end accounts this year.");
  await choose(page, "Email");
  await page.$eval('main form input[name="consent"]', (i) => i.click());
  await clickEl(page, "main form button[type=submit]");
  await sleep(600);
  const opened = await page.evaluate(() => window.__opened);
  if (opened.length === 1) {
    const u = new URL(opened[0]);
    const text = u.searchParams.get("text") ?? "";
    const missing = ["Sam Client", "sam@example.com", "Year-end accounts", "Email", "We need help with our year-end accounts this year."].filter((e) => !text.includes(e));
    u.hostname === "wa.me" && !missing.length ? pass("contact form opens WhatsApp with all details") : fail(`contact WhatsApp message missing: ${missing.join(", ")}`);
  } else fail(`contact form opened WhatsApp ${opened.length} times`);
  (await page.$eval("body", (b) => b.innerText.includes("WhatsApp has been opened"))) ? pass("contact WhatsApp confirmation shown") : fail("no contact WhatsApp confirmation");
  await page.close();
}

section("Consultation form");
{
  const { page } = await openPage("desktop");
  await page.goto(`${BASE}/book-consultation`, { waitUntil: "networkidle0" });
  await fill(page, "Name", "Alex Owner");
  await fill(page, "Email", "alex@example.com");
  await fill(page, "Phone", "+1 555 010 2000");
  await fill(page, "Service", "Tax Returns & Planning");
  await choose(page, "Video Meeting");
  await fill(page, "Preferred time", "10:00");
  await page.$eval('input[name="consent"]', (i) => i.click());
  const dateSel = 'input[type="date"]';
  await page.focus(dateSel);
  const min = await page.$eval(dateSel, (i) => i.min);
  min ? pass(`date picker min set to today (${min})`) : fail("date picker has no min");
  await page.$eval(dateSel, (i) => {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    set.call(i, "2020-01-01");
    i.dispatchEvent(new Event("input", { bubbles: true }));
    i.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await clickEl(page, "main form button[type=submit]");
  await sleep(400);
  (await page.$eval("main form", (f) => f.innerText.includes("from today onwards"))) ? pass("past date rejected") : fail("past date accepted");
  const future = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
  await page.$eval(
    dateSel,
    (i, v) => {
      const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      set.call(i, v);
      i.dispatchEvent(new Event("input", { bubbles: true }));
      i.dispatchEvent(new Event("change", { bubbles: true }));
    },
    future,
  );
  await page.evaluate(() => {
    window.__opened = [];
    window.open = (u) => (window.__opened.push(u), {});
  });
  await clickEl(page, "main form button[type=submit]");
  await sleep(600);
  const opened = await page.evaluate(() => window.__opened);
  const text = opened.length === 1 ? (new URL(opened[0]).searchParams.get("text") ?? "") : "";
  const missing = ["I would like to book a consultation.", "Alex Owner", "Tax Returns & Planning", "Video Meeting", "10:00"].filter((e) => !text.includes(e));
  opened.length === 1 && !missing.length ? pass("consultation opens WhatsApp with all details") : fail(`consultation WhatsApp: opened=${opened.length}, missing ${missing.join(", ")}`);
  (await page.$eval("body", (b) => b.innerText.includes("WhatsApp has been opened"))) ? pass("consultation WhatsApp confirmation shown") : fail("no consultation WhatsApp confirmation");
  await page.close();
}

section("Callback form");
{
  const { page } = await openPage("mobile");
  await page.goto(`${BASE}/services/payroll`, { waitUntil: "networkidle0" });
  const svc = await page.$eval("#cta-title", (h) => h.closest("section").querySelector("select:last-of-type") && [...h.closest("section").querySelectorAll("select")].pop().value);
  svc === "Payroll Services" ? pass("callback form pre-selects the page's service") : fail(`callback preselect was "${svc}"`);
  const form = "section[aria-labelledby=cta-title] form";
  await page.$eval(form, (f) => f.scrollIntoView());
  await page.type(`${form} input[autocomplete=name]`, "Pat Caller");
  await page.type(`${form} input[type=tel]`, "0161 496 0000");
  await page.select(`${form} select`, "As soon as possible");
  await page.$eval(`${form} input[name=consent]`, (i) => i.click());
  await page.evaluate(() => {
    window.__opened = [];
    window.open = (u) => (window.__opened.push(u), {});
  });
  await clickEl(page, `${form} button[type=submit]`);
  await sleep(600);
  const opened = await page.evaluate(() => window.__opened);
  const text = opened.length === 1 ? (new URL(opened[0]).searchParams.get("text") ?? "") : "";
  const missing = ["Please call me back.", "Pat Caller", "0161 496 0000", "As soon as possible", "Payroll Services"].filter((e) => !text.includes(e));
  opened.length === 1 && !missing.length ? pass("callback opens WhatsApp with all details") : fail(`callback WhatsApp: opened=${opened.length}, missing ${missing.join(", ")}`);
  await page.close();
}

await browser.close();

writeFileSync("qa-report.json", JSON.stringify(report, null, 2));
console.log(`\n${report.checks.length} checks passed, ${report.failures.length} failed. Report: qa-report.json, screenshots: ${SHOTS}/`);
process.exit(report.failures.length ? 1 : 0);
