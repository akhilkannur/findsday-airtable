const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://salestools.club';
const dataFile = fs.readFileSync(path.join(__dirname, '..', 'lib', 'data.ts'), 'utf8');
const usecasesFile = fs.readFileSync(path.join(__dirname, '..', 'lib', 'usecases.ts'), 'utf8');
const stacksFile = fs.readFileSync(path.join(__dirname, '..', 'lib', 'stacks.ts'), 'utf8');
const skillsFile = fs.readFileSync(path.join(__dirname, '..', 'lib', 'skills.ts'), 'utf8');

function extractSlugs(content, pattern) {
  const slugs = new Set();
  let match;
  while ((match = pattern.exec(content)) !== null) {
    slugs.add(match[1]);
  }
  return [...slugs];
}

// Extract tool slugs from data.ts (slug: "xxx")
const toolSlugs = extractSlugs(dataFile, /slug:\s*["']([^"']+)["']/g);

// Extract category slugs from data.ts categories array
const categorySlugs = extractSlugs(dataFile, /slug:\s*["']([^"']+)["']/g);
// Categories are defined separately - extract from the categories export
const catSection = dataFile.substring(dataFile.indexOf('export const categories'));
const catSlugs = extractSlugs(catSection, /slug:\s*["']([^"']+)["']/g);

// Extract usecase slugs
const usecaseSlugs = extractSlugs(usecasesFile, /slug:\s*["']([^"']+)["']/g);

// Extract stack slugs
const stackSlugs = extractSlugs(stacksFile, /slug:\s*["']([^"']+)["']/g);

// Extract skill slugs
const skillSlugs = extractSlugs(skillsFile, /slug:\s*["']([^"']+)["']/g);

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// Static pages
const staticPages = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: '/tools', changefreq: 'weekly', priority: '0.9' },
  { path: '/categories', changefreq: 'monthly', priority: '0.8' },
  { path: '/for', changefreq: 'weekly', priority: '0.8' },
  { path: '/mcp', changefreq: 'weekly', priority: '0.8' },
  { path: '/stacks', changefreq: 'weekly', priority: '0.8' },
  { path: '/open-source', changefreq: 'weekly', priority: '0.7' },
  { path: '/skills', changefreq: 'weekly', priority: '0.8' },
  { path: '/submit', changefreq: 'monthly', priority: '0.5' },
  { path: '/about', changefreq: 'monthly', priority: '0.4' },
  { path: '/privacy', changefreq: 'monthly', priority: '0.3' },
];

staticPages.forEach(p => {
  xml += `
  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
});

// Tool pages
toolSlugs.forEach(slug => {
  xml += `
  <url>
    <loc>${BASE_URL}/tools/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
});

// Category pages
catSlugs.forEach(slug => {
  xml += `
  <url>
    <loc>${BASE_URL}/categories/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

// Use case pages
usecaseSlugs.forEach(slug => {
  xml += `
  <url>
    <loc>${BASE_URL}/for/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

// Stack pages
stackSlugs.forEach(slug => {
  xml += `
  <url>
    <loc>${BASE_URL}/stacks/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

// Skill pages
skillSlugs.forEach(slug => {
  xml += `
  <url>
    <loc>${BASE_URL}/skills/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

xml += `
</urlset>`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml);

const urlCount = (xml.match(/<url>/g) || []).length;
console.log(`✅ Static sitemap generated: ${urlCount} URLs → public/sitemap.xml`);
