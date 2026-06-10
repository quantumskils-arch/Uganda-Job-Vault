/**
 * Generates public/sitemap.xml from the product IDs in src/data/products.ts.
 * Run: node scripts/generate-sitemap.js
 */

const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const BASE_URL = 'https://ugandajobvault.vercel.app';
const ROOT = join(__dirname, '..');

// Parse product IDs directly from the TypeScript source (no transpilation needed)
const productsSource = readFileSync(join(ROOT, 'src/data/products.ts'), 'utf8');
const ids = [...productsSource.matchAll(/^\s+id:\s*'([^']+)'/gm)].map((m) => m[1]);

if (ids.length === 0) {
  console.error('✗ No product IDs found — check the regex against src/data/products.ts');
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];

const urls = [
  // Homepage
  `  <url>\n    <loc>${BASE_URL}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n    <lastmod>${today}</lastmod>\n  </url>`,
  // One entry per product
  ...ids.map(
    (id) =>
      `  <url>\n    <loc>${BASE_URL}/product/${id}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n    <lastmod>${today}</lastmod>\n  </url>`
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

const outPath = join(ROOT, 'public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`✓ Sitemap written → ${outPath}`);
console.log(`  ${ids.length + 1} URLs (1 homepage + ${ids.length} products)`);
ids.forEach((id) => console.log(`  /product/${id}`));
