// Static export writes prefetch payloads as out/<route>/__next.<route>/__PAGE__.txt, but the client requests
// out/<route>/__next.<route>.__PAGE__.txt. Static hosts (GitHub Pages) do not rewrite, so copy each file to
// the flat name too. Runs automatically after `npm run build`.
import { cpSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const out = "out";
if (!existsSync(out)) process.exit(0);

let copied = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const file of listFiles(full)) {
        const flat = join(dir, `${name}.${relative(full, file).split(/[\/]/).join(".")}`);
        cpSync(file, flat);
        copied++;
      }
    } else {
      walk(full);
    }
  }
}
function listFiles(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? listFiles(p) : [p];
  });
}
walk(out);
console.log(`flatten-rsc: wrote ${copied} flat prefetch files`);
