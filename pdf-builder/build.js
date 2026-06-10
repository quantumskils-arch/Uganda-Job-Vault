/**
 * Uganda Job Vault — HTML → PDF build engine
 * ------------------------------------------------------------------
 * Usage:   node build.js <content-name>
 * Example: node build.js 14-day-sprint
 *
 * Reads   content/<name>.md   (front-matter + markdown body)
 * Injects into template.html
 * Outputs output/<name>.pdf    (A4, print-optimized, brand styled)
 *
 * Authoring conventions supported in the markdown body:
 *   ::: tip Title          callout box (variants: tip | warn | note)
 *   …body…
 *   :::
 *
 *   <!-- pagebreak -->      force a new page
 *
 *   @day Day 1 — Warm-up    renders a dark "day chip" heading
 * ------------------------------------------------------------------
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { marked } from "marked";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));

const name = process.argv[2];
if (!name) {
  console.error("✗ Missing content name.\n  Usage: node build.js <content-name>\n  e.g.   node build.js 14-day-sprint");
  process.exit(1);
}

const contentPath  = join(__dirname, "content", `${name}.md`);
const templatePath = join(__dirname, "template.html");
const outDir       = join(__dirname, "output");
const outPath      = join(outDir, `${name}.pdf`);

if (!existsSync(contentPath)) {
  console.error(`✗ Content file not found: ${contentPath}`);
  process.exit(1);
}

/* ---------- 1. Read source + front-matter ---------- */
const raw = await readFile(contentPath, "utf8");

function parseFrontMatter(src) {
  const meta = {};
  let body = src;
  const m = src.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i === -1) continue;
      const key = line.slice(0, i).trim();
      const val = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
      if (key) meta[key] = val;
    }
    body = src.slice(m[0].length);
  }
  return { meta, body };
}

const { meta, body } = parseFrontMatter(raw);

/* ---------- 2. Pre-process authoring conventions ---------- */
function preprocess(md) {
  let out = md;

  // Page breaks
  out = out.replace(/<!--\s*pagebreak\s*-->/gi, '\n\n<div class="pagebreak"></div>\n\n');

  // Day chips:  @day Day 1 — Title   →   styled chip
  out = out.replace(/^@day\s+(.+)$/gim, (_, txt) => `\n<div class="day">${txt.trim()}</div>\n`);

  // Callout containers:  ::: tip Title \n …md… \n :::
  out = out.replace(
    /^:::\s*(tip|warn|note)\s*(.*)$([\s\S]*?)^:::\s*$/gim,
    (_, kind, title, inner) => {
      const cls = kind === "tip" ? "" : ` ${kind}`;
      const head = title.trim()
        ? `<div class="callout-title">${title.trim()}</div>`
        : "";
      const inHtml = marked.parse(inner.trim());
      return `\n<div class="callout${cls}">${head}${inHtml}</div>\n`;
    }
  );

  return out;
}

marked.setOptions({ gfm: true, breaks: false, headerIds: false, mangle: false });
const contentHtml = marked.parse(preprocess(body));

/* ---------- 3. Inject into template ---------- */
let html = await readFile(templatePath, "utf8");

// Split the cover title on "|" so authors can gold-highlight the second part:
//   coverTitle: "14-DAY APTITUDE|EXAM SPRINT"
const titleParts = (meta.coverTitle || meta.title || name).split("|");
const coverTitleHtml = titleParts.length > 1
  ? `${titleParts[0].trim()}<br><span class="gold">${titleParts.slice(1).join(" ").trim()}</span>`
  : titleParts[0].trim();

const fields = {
  TITLE:        meta.title       || name,
  KICKER:       meta.kicker      || "UGANDA JOB VAULT",
  COVER_TITLE:  coverTitleHtml,
  SUBTITLE:     meta.subtitle    || "",
  BRAND:        meta.brand       || "UGANDA JOB VAULT",
  EDITION:      meta.edition     || "",
  CONTENT:      contentHtml,
};
for (const [k, v] of Object.entries(fields)) {
  html = html.replaceAll(`{{${k}}}`, v);
}

/* ---------- 4. Render PDF with Puppeteer ---------- */
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });
  // Ensure web fonts are fully loaded before painting
  await page.evaluateHandle("document.fonts.ready");
  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
  });
  console.log(`✓ Built ${name}`);
  console.log(`  → ${outPath}`);
} finally {
  await browser.close();
}
