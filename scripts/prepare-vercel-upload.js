/**
 * Arcanea — Prepare Vercel Blob Upload Manifest
 *
 * Reads the arcanea-manifest.json produced by scripts/media-catalog.py,
 * groups processed WebP files by Guardian, picks the 5 best hero candidates
 * per Guardian (largest file = highest quality), and writes a summary JSON
 * that can be used to drive the actual upload step.
 *
 * Run (requires Node.js 18+):
 *   node scripts/prepare-vercel-upload.js
 *
 * Output:
 *   scripts/arcanea-manifest-summary.json
 *
 * Prerequisites:
 *   • Run scripts/media-catalog.py (Windows Python, G: drive access required)
 *     to generate C:\Users\frank\arcanea-manifest.json first.
 *   • The processed WebP files must exist at
 *     C:\Users\frank\arcanea-processed\{Guardian}\*.webp
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── Config ────────────────────────────────────────────────────────────────────

const MANIFEST_PATH  = 'C:\\Users\\frank\\arcanea-manifest.json';
const PROCESSED_ROOT = 'C:\\Users\\frank\\arcanea-processed';
const OUTPUT_PATH    = path.join(__dirname, 'arcanea-manifest-summary.json');

// How many hero image candidates to pick per Guardian
const HERO_COUNT = 5;

// Upload cost reference (Vercel Blob, Jan 2026 pricing)
const COST_ESTIMATES = {
  storage:   '$0.023/GB per month',
  bandwidth: '$0.10/GB transferred',
  note:      '50 WebP images at ~500 KB each = ~25 MB = under $0.01/month storage',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Read JSON file, stripping a UTF-8 BOM if present (PowerShell sometimes
 * writes one).
 */
function readJsonFile(filePath) {
  const raw = fs.readFileSync(filePath);
  // Strip UTF-8 BOM (EF BB BF)
  const start = (raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF) ? 3 : 0;
  return JSON.parse(raw.slice(start).toString('utf-8'));
}

/**
 * Scan a Guardian's processed directory for WebP files and return them
 * sorted largest-first (higher file size usually means higher quality).
 */
function getProcessedFiles(guardianName) {
  const dir = path.join(PROCESSED_ROOT, guardianName);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith('.webp'))
    .map((f) => {
      const full = path.join(dir, f);
      let sizeBytes = 0;
      try { sizeBytes = fs.statSync(full).size; } catch (_) { /* ignore */ }
      return { file: f, path: full, sizeBytes };
    })
    .sort((a, b) => b.sizeBytes - a.sizeBytes);
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  console.log('='.repeat(60));
  console.log('  ARCANEA — PREPARE VERCEL BLOB UPLOAD MANIFEST');
  console.log('='.repeat(60));

  // 1. Load the full manifest if available
  let manifestData = null;
  if (fs.existsSync(MANIFEST_PATH)) {
    console.log(`\nLoading manifest: ${MANIFEST_PATH}`);
    try {
      manifestData = readJsonFile(MANIFEST_PATH);
      console.log(`  Total entries : ${manifestData.total_files ?? manifestData.media?.length ?? '?'}`);
    } catch (err) {
      console.warn(`  WARNING: Could not parse manifest — ${err.message}`);
      console.warn('  Falling back to scanning processed directory directly.');
    }
  } else {
    console.warn(`\nWARNING: Manifest not found at ${MANIFEST_PATH}`);
    console.warn('  Run scripts/media-catalog.py on Windows to generate it.');
    console.warn('  Falling back to scanning processed directory directly.\n');
  }

  // 2. Determine Guardian list
  //    Use manifest's by_guardian breakdown if available; otherwise scan dirs.
  let guardianCounts = {};
  if (manifestData && manifestData.by_guardian) {
    guardianCounts = manifestData.by_guardian;
  } else {
    // Scan the processed root directly
    if (fs.existsSync(PROCESSED_ROOT)) {
      for (const entry of fs.readdirSync(PROCESSED_ROOT, { withFileTypes: true })) {
        if (entry.isDirectory() && !entry.name.startsWith('_')) {
          const files = getProcessedFiles(entry.name);
          if (files.length > 0) guardianCounts[entry.name] = files.length;
        }
      }
    } else {
      console.error(`ERROR: Processed directory not found: ${PROCESSED_ROOT}`);
      console.error('  Process images first using scripts/media-process.py');
      process.exit(1);
    }
  }

  // Remove 'Unassigned' from the upload list
  delete guardianCounts['Unassigned'];

  // 3. Build hero image candidates from the processed directory
  const heroImages  = {};
  const uploadOrder = Object.entries(guardianCounts)
    .sort((a, b) => b[1] - a[1])           // most files first
    .map(([name]) => name);

  for (const guardian of uploadOrder) {
    const files = getProcessedFiles(guardian);
    heroImages[guardian] = files
      .slice(0, HERO_COUNT)
      .map((f) => ({
        file:      f.file,
        path:      f.path,
        sizeBytes: f.sizeBytes,
        blobPath:  `guardians/${guardian.toLowerCase()}/${f.file}`,
      }));
  }

  // 4. Build summary stats
  const processedTotal = Object.values(guardianCounts)
    .filter((_, i) => Object.keys(guardianCounts)[i] !== 'Unassigned')
    .reduce((sum, n) => sum + n, 0);

  const summary = {
    generated:  new Date().toISOString(),
    source:     MANIFEST_PATH,
    total:      manifestData?.total_files ?? processedTotal,
    processed:  processedTotal,
    byGuardian: guardianCounts,
  };

  // 5. Write output
  const output = {
    summary,
    heroImages,
    uploadOrder,
    estimatedCosts: COST_ESTIMATES,
    nextSteps: [
      '1. Review heroImages above — swap in better filenames if needed.',
      '2. Set VERCEL_BLOB_TOKEN in your environment (.env.local).',
      '3. Run: node scripts/upload-to-vercel-blob.mjs',
      '4. Paste the returned Blob URLs into apps/web/lib/config/media.ts',
      '5. Also update apps/web/lib/config/guardian-images.ts for the main site.',
    ],
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8');

  // 6. Print summary
  console.log('\n  Results:');
  console.log(`  Guardians with images : ${uploadOrder.length}`);
  for (const guardian of uploadOrder) {
    const count  = guardianCounts[guardian] ?? 0;
    const heroes = heroImages[guardian]?.length ?? 0;
    const bar    = '#'.repeat(Math.min(count, 20));
    console.log(`    ${guardian.padEnd(14)} ${String(count).padStart(3)} files  →  ${heroes} hero candidates  ${bar}`);
  }

  console.log(`\n  Cost estimate:`);
  console.log(`    Storage   : ${COST_ESTIMATES.storage}`);
  console.log(`    Bandwidth : ${COST_ESTIMATES.bandwidth}`);
  console.log(`    Your 50 images: ${COST_ESTIMATES.note}`);

  console.log(`\n  Manifest written: ${OUTPUT_PATH}`);
  console.log('\n  Next: run node scripts/upload-to-vercel-blob.mjs with VERCEL_BLOB_TOKEN set.\n');
}

main();
