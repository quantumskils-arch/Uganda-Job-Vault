import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const matter = require('gray-matter');

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');
const blogContentDir = join(root, 'src', 'content', 'blog');
const SITE_URL = 'https://uganda-job-vault.vercel.app';

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const PAGES = {
  '/': {
    title: 'Uganda Job Vault — Past Papers, CV Templates & AI CV Generator',
    desc: "Uganda's #1 career prep platform. URA aptitude tests, NGO CV formats, government interview guides. Pay with MTN MoMo. Instant download.",
  },
  '/tools': {
    title: 'Free Tools & Resources for Ugandan Job Seekers | UgandaJobVault',
    desc: 'Curated free and discounted tools for Ugandan job seekers — web hosting, CV design tools, freelance platforms, and productivity apps.',
  },
  '/about': {
    title: 'About Uganda Job Vault | Career Prep for Ugandan Job Seekers',
    desc: 'Uganda Job Vault provides affordable career preparation resources — past papers, CV templates, interview guides, and aptitude test packs for the Uganda job market.',
  },
  '/contact': {
    title: 'Contact Uganda Job Vault | Get in Touch',
    desc: 'Contact Uganda Job Vault for product support, billing questions, or partnership enquiries. We respond within 24 hours.',
  },
  '/terms': {
    title: 'Terms of Service | Uganda Job Vault',
    desc: 'Terms of Service for Uganda Job Vault — digital products, usage rules, and liability disclaimer.',
  },
  '/privacy': {
    title: 'Privacy Policy | Uganda Job Vault',
    desc: 'How Uganda Job Vault collects, uses, and protects your personal data. Compliant with Uganda Data Protection and Privacy Act 2019.',
  },
  '/refund': {
    title: 'Refund & Cancellation Policy | Uganda Job Vault',
    desc: 'Refund policy for Uganda Job Vault digital products. Digital downloads are final-sale; defect replacements within 7 days.',
  },
  '/blog': {
    title: 'Blog — Career Tips & Resources | UgandaJobVault',
    desc: 'Career advice, job search tips, and resources for Ugandan job seekers. Cover letters, interview prep, aptitude tests, and more.',
  },
};

function makeHtml(title, desc, image, urlPath, assets) {
  const ogImage = image ? `    <meta property="og:image" content="${SITE_URL}${image}" />\n` : '';
  return `<!doctype html>
<html lang="en">
  <head>
    ${assets.charset}
    ${assets.favicon}
    ${assets.viewport}
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${SITE_URL}${urlPath}" />
    <meta property="og:site_name" content="Uganda Job Vault" />
    <meta name="twitter:card" content="summary_large_image" />
${ogImage}    ${assets.stylesheet}
    ${assets.script}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
}

function run() {
  const baseHtml = readFileSync(join(dist, 'index.html'), 'utf-8');

  const assets = {
    charset:     baseHtml.match(/<meta charset="[^"]*"\s*\/?>/)?.[0] ?? '',
    favicon:     baseHtml.match(/<link rel="icon"[^>]*>/)?.[0] ?? '',
    viewport:    baseHtml.match(/<meta name="viewport"[^>]*>/)?.[0] ?? '',
    stylesheet:  baseHtml.match(/<link rel="stylesheet"[^>]*>/)?.[0] ?? '',
    script:      baseHtml.match(/<script[^>]*><\/script>/)?.[0] ?? '',
  };

  let count = 0;

  for (const [route, meta] of Object.entries(PAGES)) {
    if (route === '/') continue;
    const dirPath = join(dist, route.slice(1));
    mkdirSync(dirPath, { recursive: true });
    writeFileSync(join(dirPath, 'index.html'), makeHtml(meta.title, meta.desc, null, route, assets));
    count++;
  }

  const blogFiles = readdirSync(blogContentDir).filter(f => f.endsWith('.md') && f !== '.gitkeep');
  for (const file of blogFiles) {
    const raw = readFileSync(join(blogContentDir, file), 'utf-8');
    const { data, content } = matter(raw);
    const slug = file.replace(/\.md$/, '');
    const title = data.title ?? 'Untitled';
    const desc = data.description ?? '';
    const cover = data.cover ?? null;
    const image = cover ? cover : null;
    const route = `/blog/${slug}`;

    const dirPath = join(dist, 'blog', slug);
    mkdirSync(dirPath, { recursive: true });
    writeFileSync(join(dirPath, 'index.html'), makeHtml(title, desc, image, route, assets));
    count++;
  }

  console.log(`[prerender-head] Generated ${count} static HTML files with route-specific meta tags`);
}

run();
