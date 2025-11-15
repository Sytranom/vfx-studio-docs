import { promises as fs } from 'fs';
import path from 'path';
import { URL } from 'url';

async function generateSitemap() {
  const siteUrl = 'https://sytranom.github.io';
  const basePath = '/vfx-studio-docs';
  const publicDir = path.join(process.cwd(), 'public');

  const getPaths = async (dir, prefix = '/') => {
    const fullDir = path.join(process.cwd(), dir);
    const entries = await fs.readdir(fullDir);
    return entries
      .filter(file => (file.endsWith('.tsx') || file.endsWith('.mdx')) && !file.startsWith('_') && !file.includes('['))
      .map(file => path.join(prefix, file.replace(/\.(tsx|mdx)$/, '')));
  };

  const staticPages = await getPaths('src/pages');
  const docPages = await getPaths('_docs', '/docs');
  const guidePages = await getPaths('src/pages/guides', '/guides');
  const tutorialPages = await getPaths('src/pages/tutorials', '/tutorials');

  const allPaths = [...staticPages, ...docPages, ...guidePages, ...tutorialPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
    .map(urlPath => {
      
      const finalPath = urlPath.endsWith('/index') ? urlPath.replace('/index', '/') : urlPath;

const finalUrl = new URL(path.join(basePath, finalPath), siteUrl).href;

      return `
    <url>
      <loc>${finalUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully with robust URL construction!');
}

generateSitemap();