import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const postsDir = resolve(scriptDir, '..', 'src', 'content', 'posts');

const artNew = `  mark.art-highlight {
    background:color-mix(in srgb, var(--primary) 18%, transparent);
    color:inherit; padding:1px 2px; border-radius:3px;
    border-bottom:2px solid color-mix(in srgb, var(--primary) 50%, transparent);
  }
  mark.art-highlight.active {
    background:color-mix(in srgb, var(--primary) 35%, transparent);
    border-bottom-color:var(--primary);
  }`;

const qaNew = `  mark.qa-highlight {
    background:color-mix(in srgb, var(--primary) 18%, transparent);
    color:inherit; padding:1px 2px; border-radius:3px;
    border-bottom:2px solid color-mix(in srgb, var(--primary) 50%, transparent);
  }
  mark.qa-highlight.active {
    background:color-mix(in srgb, var(--primary) 35%, transparent);
    border-bottom-color:var(--primary);
  }`;

// Regex to match old highlight CSS (both art and qa), tolerant of CRLF and whitespace variations
const oldRegex = /  mark\.(art|qa)-highlight \{\r?\n\s+background:#ffee00; color:#000;\r?\n\s+padding:0 2px; border-radius:2px; font-weight:bold;\r?\n  \}\r?\n  mark\.\1-highlight\.active \{\r?\n\s+background:#ffb300; color:#000;\r?\n\s+box-shadow:0 0 0 2px #ffb300;\r?\n  \}/g;

const files = readdirSync(postsDir).filter(f => {
  const ext = extname(f).toLowerCase();
  return ext === '.md' || ext === '.mdx';
});

let count = 0;
for (const file of files) {
  const fp = join(postsDir, file);
  let content = readFileSync(fp, 'utf-8');
  let newContent = content.replace(oldRegex, function(match, p1) {
    return p1 === 'art' ? artNew : qaNew;
  });
  
  if (newContent !== content) {
    writeFileSync(fp, newContent, 'utf-8');
    count++;
    console.log('  UPDATED ' + file);
  }
}

console.log('\nDone! Updated ' + count + ' files.');
