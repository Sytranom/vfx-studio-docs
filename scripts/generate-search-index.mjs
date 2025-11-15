import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

function cleanContent(content) {
  return content
    .replace(/---[\s\S]*?---/, '') 
    .replace(/<[^>]*>/g, '')      
    .replace(/#+\s/g, '')         
    .replace(/[`*_-]/g, '')       
    .replace(/\s+/g, ' ')         
    .trim();
}

async function generateSearchIndex() {
  const docsDirectory = path.join(process.cwd(), '_docs');
  const filenames = await fs.readdir(docsDirectory);

  const docs = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(docsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: `/docs/${filename.replace(/\.mdx$/, '')}`,
        title: data.title || 'Untitled',
        breadcrumbs: data.breadcrumbs || '',
        content: cleanContent(content), 
      };
    })
  );

  const publicDir = path.join(process.cwd(), 'public');
  if (!await fs.stat(publicDir).catch(() => false)) {
    await fs.mkdir(publicDir);
  }

  await fs.writeFile(
    path.join(publicDir, 'search.json'),
    JSON.stringify(docs)
  );

  console.log('✅ Full-text search index generated successfully!');
}

generateSearchIndex();