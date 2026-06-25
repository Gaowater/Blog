import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const postsDir = resolve(scriptDir, '..', 'src', 'content', 'posts');
const snippetFP = resolve(scriptDir, 'search-snippet.html');

const searchSnippet = '\n' + readFileSync(snippetFP, 'utf-8');

const skipFiles = ['十万个为什么？.md', 'mdx-example.mdx'];
const files = readdirSync(postsDir).filter(f => {
  const ext = extname(f).toLowerCase();
  return (ext === '.md' || ext === '.mdx') && !skipFiles.includes(f);
});

let count = 0;
for (const file of files) {
  const fp = join(postsDir, file);
  let content = readFileSync(fp, 'utf-8');
  if (content.includes('article-search-wrap') || content.includes('qa-search-wrapper')) {
    console.log('  SKIP ' + file + ' (already has search)');
    continue;
  }
  const idx = content.indexOf('---', 3);
  if (idx === -1) {
    console.log('  SKIP ' + file + ' (no frontmatter)');
    continue;
  }
  const insertPos = idx + 3;
  content = content.slice(0, insertPos) + searchSnippet + content.slice(insertPos);
  writeFileSync(fp, content, 'utf-8');
  count++;
  console.log('  OK ' + file);
}

console.log('\nDone! Added search to ' + count + ' articles.');
