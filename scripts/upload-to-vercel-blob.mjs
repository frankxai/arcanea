/**
 * Arcanea Hero Image Uploader → Vercel Blob
 *
 * Reads hero-shortlist.json (TASTE-scored, top image per Guardian)
 * Uploads to Vercel Blob, then patches apps/web/lib/config/media.ts with real URLs.
 *
 * SETUP:
 *   1. Go to vercel.com → your project → Storage tab
 *   2. Create a Blob store (or open existing) → .env.local tab → copy BLOB_READ_WRITE_TOKEN
 *   3. Run:
 *      export BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXX
 *      node scripts/upload-to-vercel-blob.mjs
 *
 * DRY RUN (no token needed):
 *   node scripts/upload-to-vercel-blob.mjs --dry-run
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes("--dry-run");
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

const SHORTLIST = join(__dirname, "taste", "hero-shortlist.json");
const MEDIA_CONFIG = join(__dirname, "..", "apps", "web", "lib", "config", "media.ts");

if (!TOKEN && !DRY_RUN) {
  console.error("\n  BLOB_READ_WRITE_TOKEN not set.\n");
  console.error("  Get it: vercel.com → Project → Storage → Blob → .env.local tab");
  console.error("  Then:   export BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...");
  console.error("          node scripts/upload-to-vercel-blob.mjs\n");
  console.error("  Or for a dry run: node scripts/upload-to-vercel-blob.mjs --dry-run\n");
  process.exit(1);
}

const heroShortlist = JSON.parse(readFileSync(SHORTLIST, "utf8"));

async function uploadToBlob(filePath, blobPath) {
  if (DRY_RUN) {
    return `https://[blob-store].public.blob.vercel-storage.com/${blobPath}`;
  }
  const fileBuffer = readFileSync(filePath);
  // Use Vercel Blob REST API directly (avoids ESM/SDK issues)
  const filename = basename(blobPath);
  const response = await fetch(
    `https://blob.vercel-storage.com?filename=guardians%2F${encodeURIComponent(filename)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "image/webp",
        "x-api-version": "7",
      },
      body: fileBuffer,
    }
  );
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`${response.status}: ${err}`);
  }
  const data = await response.json();
  return data.url;
}

async function main() {
  console.log("\n  Arcanea Media → Vercel Blob");
  console.log("  " + "═".repeat(42));
  if (DRY_RUN) console.log("  DRY RUN — no files will be uploaded\n");

  const uploaded = {};
  let ok = 0, fail = 0;

  for (const [guardian, images] of Object.entries(heroShortlist)) {
    if (!images || images.length === 0) continue;
    const top = images[0]; // highest TASTE score
    // Convert Windows path to WSL2 path
    const localPath = top.path.replace(/\\/g, "/").replace(/^C:/, "/mnt/c");
    const filename = basename(localPath);
    const blobPath = `guardians/${guardian.toLowerCase()}/${filename}`;

    if (!existsSync(localPath)) {
      console.log(`  MISS  ${guardian}: ${localPath}`);
      fail++;
      continue;
    }

    try {
      const url = await uploadToBlob(localPath, blobPath);
      console.log(`  OK  ${guardian} (score ${top.score}): ${DRY_RUN ? "[dry-run url]" : url.slice(0, 70) + "..."}`);
      uploaded[guardian.toLowerCase()] = url;
      ok++;
    } catch (err) {
      console.log(`  FAIL  ${guardian}: ${err.message}`);
      fail++;
    }
  }

  console.log(`\n  Uploaded: ${ok}  Failed: ${fail}`);

  if (ok > 0 && !DRY_RUN) {
    // Patch media.ts with real URLs
    let mediaTs = readFileSync(MEDIA_CONFIG, "utf8");
    for (const [guardian, url] of Object.entries(uploaded)) {
      // Match: draconia: { ... heroImage: '', ...
      const re = new RegExp(`(${guardian}:\\s*\\{[^}]{0,300}heroImage:\\s*)'[^']*'`, "s");
      if (re.test(mediaTs)) {
        mediaTs = mediaTs.replace(re, `$1'${url}'`);
        console.log(`  Patched media.ts: ${guardian} -> ${url.slice(0, 60)}...`);
      }
    }
    writeFileSync(MEDIA_CONFIG, mediaTs, "utf8");
    console.log("\n  media.ts updated. Commit with:");
    console.log("  GIT_OBJECT_DIRECTORY=/home/frankx/.arcanea-objects git add apps/web/lib/config/media.ts");
    console.log('  GIT_OBJECT_DIRECTORY=/home/frankx/.arcanea-objects git commit -m "feat: Guardian hero images live on Vercel Blob"');
    console.log("  GIT_OBJECT_DIRECTORY=/home/frankx/.arcanea-objects git push origin main\n");
  }
}

main().catch(console.error);
