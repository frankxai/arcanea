#!/usr/bin/env node

/**
 * @arcanea/cli — Standalone Bundle Builder
 *
 * Bundles the entire CLI (all @arcanea/* packages, commander, picocolors)
 * into a single standalone file with zero runtime dependencies.
 *
 * Usage: node build.mjs
 * Output: dist/arcanea.cjs
 */

import { execSync } from 'node:child_process';
import { existsSync, statSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const entryPoint = resolve(distDir, 'index.js');
const outFile = resolve(distDir, 'arcanea.cjs');

// ── Pre-flight checks ──────────────────────────────────────────────
if (!existsSync(entryPoint)) {
  console.error(
    '  ERROR: dist/index.js not found.\n' +
    '  Run `tsc` first to compile TypeScript, then run this script.\n'
  );
  process.exit(1);
}

// ── Bundle ──────────────────────────────────────────────────────────
console.log('  Bundling @arcanea/cli...\n');

const cmd = [
  'npx', 'esbuild', entryPoint,
  '--bundle',
  '--platform=node',
  '--target=node18',
  '--format=cjs',
  '--outfile=' + outFile,
  '--packages=bundle',
  // Keep the original #!/usr/bin/env node shebang from dist/index.js
  // (esbuild preserves it automatically for CJS)
].join(' ');

try {
  execSync(cmd, {
    cwd: __dirname,
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'inherit'],
  });
} catch (err) {
  console.error('\n  Bundle failed:\n');
  console.error(err.stderr || err.message);
  process.exit(1);
}

// ── Verify ──────────────────────────────────────────────────────────
if (!existsSync(outFile)) {
  console.error('  ERROR: Output file was not created.');
  process.exit(1);
}

const stats = statSync(outFile);
const sizeKb = (stats.size / 1024).toFixed(1);

// Verify shebang
const head = readFileSync(outFile, 'utf-8').slice(0, 100);
const hasShebang = head.startsWith('#!/usr/bin/env node');

console.log(`\n  Output: dist/arcanea.cjs (${sizeKb} KB)`);
console.log(`  Shebang: ${hasShebang ? 'yes' : 'MISSING'}`);
console.log(`\n  Run with: node dist/arcanea.cjs --help`);
console.log(`  Or:       node dist/arcanea.cjs status`);
console.log(`  Or:       node dist/arcanea.cjs init\n`);
