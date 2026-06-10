# Uganda Job Vault — Working Reference

## 1. PROJECT

Vite + React + TypeScript storefront. Products are digital PDFs (aptitude packs, CV guides, interview guides). Purchases happen on Selar — every product card is an `<a>` link to a Selar product page. No cart, no auth, no backend. Dark theme (`#0A0A0A` background, gold accents).

Commands:
```
npm run dev      # dev server
npm run build    # tsc + vite build — run before every commit
npm run preview  # preview the dist build
```

Git push uses SSH (token-free). Remote: `git@github.com:quantumskils-arch/Uganda-Job-Vault.git`.

---

## 2. BRAND TOKENS

| Token     | Value     | Usage                          |
|-----------|-----------|--------------------------------|
| Ink/bg    | `#0A0A0A` | Page background, dark surfaces |
| Gold      | `#F5C518` | Accent, CTAs, markers, borders |
| Paper     | `#FFFFFF` | PDF content pages              |
| Muted     | `#4A4A4A` | Secondary text (PDF only)      |

**Fonts:** Bebas Neue (display/headings — `font-display` in Tailwind), DM Sans (body — `font-body`). Both loaded via Google Fonts in `src/index.css` and `pdf-builder/template.html`.

Tailwind config extends `fontFamily.display` and `fontFamily.body` — use those classes, not arbitrary font stacks.

---

## 3. PRODUCT COPY FORMULA

Every title, description, and `whatsInside` bullet follows:

**[Quantity] + [named specifics] + [completeness signal] + [proof hook]**

Real example — URA Aptitude Pack:
- Title: `URA Aptitude Test — Past Questions & Answers (2026)` — named org + product type + year
- Description: `200+ real-style URA aptitude questions with full answers. Numerical Reasoning, Verbal Reasoning, Situational Judgement, Logical Reasoning + tips from candidates who passed.` — quantity → section names → social proof
- Bullets: lead with the number (`200+ real-style aptitude questions`), name sections explicitly, end with a trust closer (`Tips from candidates who passed`)

Bundles add a savings line as the last bullet: `Save UGX 9,000 vs buying separately`.

---

## 4. PRODUCT INTERFACE

Defined in `src/data/products.ts`:

```ts
interface Product {
  id: string;          // kebab-case, matches cover filename: public/covers/<id>.png
  title: string;
  description: string;
  price: string;       // "UGX 15,000" or "FREE"
  priceUSD?: string;   // "≈ $4" — shown below UGX price on card
  selarLink: string;   // full https://selar.com/<code> URL
  category: 'papers' | 'cv' | 'interview' | 'bundle';
  badge?: string;      // short label shown on cover image: 'Best Seller', 'New', 'Best Value', etc.
  free?: boolean;      // true → gold FREE badge + Download CTA instead of "Get This"
  coverImage?: string; // '/covers/<id>.png' — 16:10 aspect ratio; falls back to category gradient
  whatsInside?: string[]; // 4–5 bullets; card renders first 4 only
}
```

**Category → card gradient fallback:**
- `papers` → amber
- `interview` → blue/indigo
- `cv` → emerald/teal
- `bundle` → purple/violet

**Placement rule:** new hero/bundle products go at the **top** of the `PRODUCTS` array (first = first rendered on the page). Evergreen individual products follow in rough sales-priority order.

---

## 5. PDF ENGINE

Location: `pdf-builder/` — isolated Node package (its own `package.json`, `node_modules/`). Uses Puppeteer + marked. Install once with `npm install` inside `pdf-builder/`.

### Build a PDF

```bash
cd pdf-builder
node build.js <content-name>
# e.g. node build.js 14-day-sprint
# output → pdf-builder/output/<name>.pdf  (gitignored)
```

### Content file: `pdf-builder/content/<name>.md`

Front-matter fields:
```yaml
---
coverTitle: LINE ONE|LINE TWO   # pipe splits: line 1 white, line 2 gold
subtitle: One-sentence description shown on cover
edition: BUNDLE BONUS · 2026 EDITION
kicker: UGANDA JOB VAULT        # optional, defaults to "UGANDA JOB VAULT"
---
```

Authoring conventions in the markdown body:

| Syntax | Renders as |
|--------|-----------|
| `@day Day 1 — Title` | Dark chip with gold text (`.day` class) |
| `::: tip Title` / `:::` | Gold-tinted callout box |
| `::: warn Title` / `:::` | Red callout box |
| `::: note Title` / `:::` | Slate callout box |
| `<!-- pagebreak -->` | Hard page break |

Page-break tips:
- `break-after: avoid` is set on `.day` chips and headings — chip + following paragraph stay together automatically.
- Use `<!-- pagebreak -->` sparingly. Place it *before* the content that should open the new page, not after the content that closes the previous one.
- Check balance: aim for no near-empty pages and no orphan lines (single line stranded at top of a page).

### Template: `pdf-builder/template.html`

Reusable. CSS variables (`--ink`, `--gold`, `--paper`, `--tint`) at the top. To restyle all products at once, edit here. Placeholders: `{{TITLE}}`, `{{KICKER}}`, `{{COVER_TITLE}}`, `{{SUBTITLE}}`, `{{BRAND}}`, `{{EDITION}}`, `{{CONTENT}}`.

---

## 6. COVER IMAGES

- Generated in ChatGPT (GPT-4o image gen).
- Target aspect ratio: **16:10** — matches `aspect-[16/10]` in `ProductCard.tsx`.
- Save to `public/covers/<product-id>.png`.
- `coverImage` in the product object: `'/covers/<id>.png'` (leading slash, public-relative).
- If `coverImage` is missing or the image 404s, the card falls back to the category gradient — so missing covers degrade gracefully.

---

## 7. SELAR

- Individual products: `https://selar.com/<code>` — code is assigned when you create the product on Selar.
- **Bundles require Selar's multi-tier product type** (minimum 2 tiers). Create the bundle as a multi-tier listing on Selar, then use the resulting URL.
- Store page: `https://selar.com/m/ugandaJobVault` (exported as `SELAR_STORE` from `products.ts`).

---

## 8. WORKFLOW CONVENTIONS

1. **Always run `npm run build` before committing** — catches TypeScript errors that `dev` silently ignores.
2. **New product checklist:**
   - [ ] Add object to top of `PRODUCTS` array in `src/data/products.ts`
   - [ ] Add cover image to `public/covers/<id>.png` (16:10)
   - [ ] Verify `category` is one of the four valid values
   - [ ] Run `npm run build` — no errors
   - [ ] Commit: `git add src/data/products.ts public/covers/<id>.png`
3. **PDF checklist:**
   - [ ] Drop `pdf-builder/content/<name>.md` with front-matter
   - [ ] `cd pdf-builder && node build.js <name>`
   - [ ] Render pages to PNG if layout review needed: `node -e "..."` with Puppeteer screenshot
   - [ ] Commit content file only — `output/*.pdf` is gitignored
4. Stage specific files by name — never `git add .` (avoids accidentally staging `.env`, large binaries, or `pdf-builder/output/`).
5. SSH remote — no personal access token needed for push.
