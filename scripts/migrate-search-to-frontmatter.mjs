/**
 * Remove embedded search bars from markdown articles and
 * add `searchBar: true` to frontmatter.
 *
 * Pattern: `<!-- 文章内搜索栏 -->` (comment) + div#article-search-wrap
 *          + <style>...</style> + <script>...</script>
 * Skips "十万个为什么？.md" (has its own QA-style search bar).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.resolve(__dirname, "../src/content/posts");

function walkDir(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkDir(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".md")) results.push(fullPath);
  }
  return results;
}

function hasSearchBar(content) {
  return content.includes("article-search-wrap");
}

function removeSearchBarAndAddFrontmatter(content) {
  // Find frontmatter end (handle both \n and \r\n)
  const fmMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  if (!fmMatch) {
    console.warn("  ⚠ No frontmatter found");
    return content;
  }

  const frontmatter = fmMatch[0];
  const body = content.slice(frontmatter.length);

  // Find the search bar: from `<!-- 文章内搜索栏 -->` to `</script>`
  const commentIdx = body.indexOf("<!--");
  const wrapIdx = body.indexOf('id="article-search-wrap"');

  if (commentIdx === -1 && wrapIdx === -1) {
    console.warn("  ⚠ Could not find search bar");
    return content;
  }

  // Start from comment if found, otherwise from the div
  const fromIdx = commentIdx !== -1 ? commentIdx : body.lastIndexOf("<div", wrapIdx);

  // Find the closing </script> tag after the search bar
  const scriptEndIdx = body.indexOf("</script>", fromIdx);
  if (scriptEndIdx === -1) {
    console.warn("  ⚠ Could not find </script> end of search bar");
    return content;
  }

  const toIdx = scriptEndIdx + "</script>".length;

  // Check that we're removing a reasonable amount (at least 100 chars)
  if (toIdx - fromIdx < 100) {
    console.warn("  ⚠ Search bar segment too short, might be wrong match");
    return content;
  }

  const cleanedBody = body.slice(0, fromIdx).trimStart() + "\n" + body.slice(toIdx).trimStart();

  // Add searchBar: true to frontmatter
  // Insert before the closing `---`
  const fmPart = frontmatter.slice(0, -5).replace(/\r?\n$/, ""); // remove trailing `---\r?\n`
  const newFrontmatter = fmPart + "\nsearchBar: true\n---\n";

  return newFrontmatter + cleanedBody;
}

function isQAArticle(relativePath) {
  return relativePath.includes("十万个为什么") || relativePath.includes("十万个怎么样");
}

// Main
const files = walkDir(postsDir);
let processed = 0, skipped = 0, errors = 0;

for (const filePath of files) {
  const rel = path.relative(postsDir, filePath);
  const content = fs.readFileSync(filePath, "utf-8");

  if (!hasSearchBar(content)) {
    continue; // Skip files without embedded search bar
  }

  if (isQAArticle(rel)) {
    console.log(`  ⏭ Skipping QA article — ${rel}`);
    skipped++;
    continue;
  }

  if (/searchBar:\s*true/.test(content)) {
    console.log(`  ⏭ Already has searchBar: true — ${rel}`);
    skipped++;
    continue;
  }

  console.log(`  🔄 ${rel}`);
  const newContent = removeSearchBarAndAddFrontmatter(content);

  if (newContent === content) {
    console.warn(`  ❌ Failed — ${rel}`);
    errors++;
    continue;
  }

  fs.writeFileSync(filePath, newContent, "utf-8");
  console.log(`  ✅ Done — ${rel}`);
  processed++;
}

console.log(`\nDone: ${processed} processed, ${skipped} skipped, ${errors} errors.`);
