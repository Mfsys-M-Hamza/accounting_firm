/**
 * Static build for GitHub Pages (or any static host): `npm run build:pages` → out/
 *
 * Static hosting has no server, so the /api form routes are set aside for the
 * build and restored afterwards; forms then point visitors to WhatsApp or
 * phone instead (NEXT_PUBLIC_STATIC_EXPORT). The /locations route is also set
 * aside while no location page is published, because a static export cannot
 * contain a dynamic route with zero pages.
 *
 * Env: NEXT_PUBLIC_BASE_PATH (e.g. /accounting_firm), NEXT_PUBLIC_SITE_URL.
 */
import { execSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const park = ["src/app/api"];
// Matches a real `published: true` entry at the start of a line, not the words in a comment.
if (!/^\s*published:\s*true/m.test(readFileSync("src/content/locations.ts", "utf8"))) park.push("src/app/locations");

const parked = (dir) => `.parked-${dir.replace(/[\\/]/g, "_")}`;
const env = { ...process.env, STATIC_EXPORT: "true", NEXT_PUBLIC_STATIC_EXPORT: "true" };

// Copy + delete rather than rename: on Windows an editor's file watcher can block renaming a folder.
const move = (from, to) => {
  cpSync(from, to, { recursive: true });
  rmSync(from, { recursive: true, force: true });
};

for (const dir of park) if (existsSync(dir)) move(dir, parked(dir));
try {
  execSync("npx next build", { stdio: "inherit", env });
} finally {
  for (const dir of park) if (existsSync(parked(dir))) move(parked(dir), dir);
}
execSync("node scripts/flatten-rsc.mjs", { stdio: "inherit" });
writeFileSync("out/.nojekyll", "");
console.log("Static site ready in out/");
