import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
        title: data.title,
        breadcrumbs: data.breadcrumbs,
        content: content.replace(/#+\s/g, '').replace(/\n/g, ' '), // Basic content cleaning
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

  console.log('✅ Search index generated successfully!');
}

generateSearchIndex();