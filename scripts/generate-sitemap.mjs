import { promises as fs } from 'fs';
import path from 'path';

async function generateSitemap() {
  const siteUrl = 'https://sytranom.github.io/vfx-studio-docs';
  const publicDir = path.join(process.cwd(), 'public');
  
  const staticPages = (await fs.readdir(path.join(process.cwd(), 'src/pages')))
    .filter(file => file.endsWith('.tsx') && !file.startsWith('_') && !file.includes('['))
    .map(file => `/${file.replace('.tsx', '')}`);

  const docPages = (await fs.readdir(path.join(process.cwd(), '_docs')))
    .map(file => `/docs/${file.replace('.mdx', '')}`);

  const guidePages = (await fs.readdir(path.join(process.cwd(), 'src/pages/guides')))
    .filter(file => file.endsWith('.tsx'))
    .map(file => `/guides/${file.replace('.tsx', '')}`);

  const tutorialPages = (await fs.readdir(path.join(process.cwd(), 'src/pages/tutorials')))
    .filter(file => file.endsWith('.tsx'))
    .map(file => `/tutorials/${file.replace('.tsx', '')}`);

  const allPaths = [...staticPages, ...docPages, ...guidePages, ...tutorialPages]
    .map(p => p === '/index' ? '/' : p);
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
    .map(url => `
    <url>
      <loc>${siteUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`)
    .join('')}
</urlset>`;

  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
}

generateSitemap();