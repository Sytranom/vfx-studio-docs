import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';

function cleanContent(content) {
  return content
    .replace(/<[^>]*>/g, ' ')     
    .replace(/[`*_[\]]/g, '')     
    .replace(/\s+/g, ' ')         
    .trim();
}

async function generateSearchIndex() {
  const docsDirectory = path.join(process.cwd(), '_docs');

if (!await fs.stat(docsDirectory).catch(() => false)) {
    console.warn('⚠️ _docs directory not found. Skipping index generation.');
    return;
  }

  const filenames = await fs.readdir(docsDirectory);
  
  let searchRecords = [];
  let idCounter = 0;
  const slugger = new GithubSlugger();

  for (const filename of filenames) {
    if (!filename.endsWith('.mdx')) continue;

    slugger.reset(); 
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(docsDirectory, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const pageTitle = data.title || 'Untitled';
    const urlBase = `/docs/${slug}`;

const mdRegex = /^(#{2,3})\s+(.+)$/gm;
    const htmlRegex = /<(h[23])\s+[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/\1>/g;

let headers = [];
    
    let match;
    while ((match = mdRegex.exec(content)) !== null) {
      headers.push({
        index: match.index,
        level: match[1] === '##' ? 'Section' : 'Subsection',
        text: match[2].trim(),
        id: slugger.slug(match[2].trim()), 
        length: match[0].length
      });
    }

    while ((match = htmlRegex.exec(content)) !== null) {
      headers.push({
        index: match.index,
        level: match[1] === 'h2' ? 'Section' : 'Subsection',
        text: match[3].trim(), 
        id: match[2],          
        length: match[0].length
      });
    }

headers.sort((a, b) => a.index - b.index);

const firstHeaderIndex = headers.length > 0 ? headers[0].index : content.length;
    const introContent = content.slice(0, firstHeaderIndex);
    
    if (cleanContent(introContent).length > 0) {
      searchRecords.push({
        id: idCounter++,
        url: urlBase,
        title: pageTitle,
        breadcrumbs: data.breadcrumbs || '',
        content: cleanContent(introContent),
        type: 'Page'
      });
    }

for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const nextHeader = headers[i + 1];

const start = header.index + header.length;
      const end = nextHeader ? nextHeader.index : content.length;
      const sectionContent = content.slice(start, end);

      searchRecords.push({
        id: idCounter++,
        url: `${urlBase}#${header.id}`,
        title: header.text,
        breadcrumbs: `${data.title} > ${header.text}`,
        content: cleanContent(sectionContent),
        type: header.level
      });
    }
  }

  const publicDir = path.join(process.cwd(), 'public');
  if (!await fs.stat(publicDir).catch(() => false)) {
    await fs.mkdir(publicDir);
  }

  await fs.writeFile(
    path.join(publicDir, 'search.json'),
    JSON.stringify(searchRecords)
  );

  console.log(`✅ Generated ${searchRecords.length} search records with deep links!`);
}

generateSearchIndex();