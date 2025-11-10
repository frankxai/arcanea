import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const manifestPath = resolve(root, 'data', 'canon-manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));

function stripFrontmatter(markdown: string) {
  if (markdown.startsWith('---')) {
    const end = markdown.indexOf('
---', 3);
    if (end !== -1) {
      return markdown.slice(end + 4).trim();
    }
  }
  return markdown.trim();
}

const enrichedSources = manifest.sources.map((source: { id: string; path: string }) => {
  const target = resolve(root, source.path);
  try {
    const raw = readFileSync(target, 'utf-8');
    return {
      ...source,
      content: stripFrontmatter(raw)
    };
  } catch (error) {
    return {
      ...source,
      error: `Unable to load ${source.path}: ${(error as Error).message}`
    };
  }
});

const outputPath = resolve(root, 'data', 'canon-sources.json');
writeFileSync(outputPath, JSON.stringify({ generatedAt: new Date().toISOString(), sources: enrichedSources }, null, 2));
console.log(`✔ Wrote ${outputPath}`);
