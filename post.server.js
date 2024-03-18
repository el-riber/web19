
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const result = await remark().use(html).process(fileContents);
  const contentHtml = result.toString();

  // Extract the front matter here if you added it to your Markdown

  return {
    slug: realSlug,
    content: contentHtml,
    // Add other front matter properties here
  };
}
