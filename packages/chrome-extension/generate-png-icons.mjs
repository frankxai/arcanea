#!/usr/bin/env node
/**
 * generate-png-icons.mjs
 *
 * Converts SVG icons to PNG format for Chrome Web Store compliance.
 * Primary: uses `sharp` for faithful SVG rendering (gradients, text, etc.)
 * Fallback: uses `pngjs` for a programmatic approximation if sharp is unavailable.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICONS_DIR = join(__dirname, 'icons');
const SIZES = [16, 32, 48, 128];

async function convertWithSharp() {
  const { default: sharp } = await import('sharp');

  for (const size of SIZES) {
    const svgPath = join(ICONS_DIR, `icon${size}.svg`);
    const pngPath = join(ICONS_DIR, `icon${size}.png`);

    if (!existsSync(svgPath)) {
      console.warn(`  SKIP: ${svgPath} not found`);
      continue;
    }

    const svgBuffer = readFileSync(svgPath);

    await sharp(svgBuffer, { density: 300 })
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(pngPath);

    console.log(`  OK: icon${size}.svg -> icon${size}.png (${size}x${size})`);
  }
}

function convertWithPngjs() {
  const require = createRequire(import.meta.url);
  const { PNG } = require('pngjs');
  console.log('  Using pngjs fallback (programmatic rendering)');

  const DARK = [11, 14, 20, 255];
  const DARK_HI = [26, 29, 38, 255];
  const TEAL = [127, 255, 212, 255];

  function setPx(png, x, y, rgba) {
    const i = (png.width * y + x) << 2;
    png.data[i] = rgba[0];
    png.data[i + 1] = rgba[1];
    png.data[i + 2] = rgba[2];
    png.data[i + 3] = rgba[3];
  }

  function mix(a, b, t) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t),
      255,
    ];
  }

  // Four-pointed star shape function
  function computeStarShape(angle) {
    const a = Math.abs(Math.cos(2 * angle));
    return 0.35 + 0.65 * a;
  }

  function createPngIcon(size) {
    const png = new PNG({ width: size, height: size });
    const center = (size - 1) / 2;
    const cornerR = size * 0.2;
    const ring = size * 0.41;
    const ringW = Math.max(1.2, size * 0.025);
    const starR = size * 0.22;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - center;
        const dy = y - center;
        const d = Math.sqrt(dx * dx + dy * dy);

        // Rounded rect mask
        const cx = Math.max(cornerR, Math.min(x, size - 1 - cornerR));
        const cy = Math.max(cornerR, Math.min(y, size - 1 - cornerR));
        const cdx = x - cx;
        const cdy = y - cy;
        if (Math.sqrt(cdx * cdx + cdy * cdy) > cornerR) {
          setPx(png, x, y, [0, 0, 0, 0]);
          continue;
        }

        // Radial gradient background (center-top to edges)
        const gradDy = y - size * 0.3;
        const gradD = Math.sqrt(dx * dx + gradDy * gradDy);
        const gradT = Math.min(1, gradD / (size * 0.7));
        let px = mix(DARK_HI, DARK, gradT);

        // Teal ring
        const ringDist = Math.abs(d - ring);
        if (ringDist <= ringW) {
          const ringAlpha = (1 - ringDist / ringW) * 0.3;
          px = mix(px, TEAL, ringAlpha);
        }

        // Four-pointed star glyph (sparkle)
        const angle = Math.atan2(dy, dx);
        const starScale = computeStarShape(angle);
        if (d < starR * starScale) {
          const t = 1 - d / (starR * starScale);
          px = mix(px, TEAL, Math.min(1, t * 1.5));
        }

        setPx(png, x, y, px);
      }
    }
    return PNG.sync.write(png);
  }

  for (const size of SIZES) {
    const pngPath = join(ICONS_DIR, `icon${size}.png`);
    writeFileSync(pngPath, createPngIcon(size));
    console.log(`  OK: icon${size}.png (${size}x${size}) [pngjs fallback]`);
  }
}

async function main() {
  console.log('Arcanea Chrome Extension — PNG Icon Generator');
  console.log('=============================================');
  console.log(`Source: ${ICONS_DIR}`);
  console.log(`Sizes: ${SIZES.join(', ')}px\n`);

  try {
    console.log('Attempting sharp-based SVG-to-PNG conversion...');
    await convertWithSharp();
    console.log('\nDone. All icons converted with sharp (faithful SVG rendering).');
  } catch (err) {
    console.warn(`\nsharp unavailable: ${err.message}`);
    console.log('Falling back to pngjs programmatic rendering...\n');
    try {
      convertWithPngjs();
      console.log('\nDone. All icons generated with pngjs fallback.');
    } catch (fallbackErr) {
      console.error('\nFallback also failed:', fallbackErr.message);
      console.error('Install sharp or pngjs: npm i -D sharp  OR  npm i -D pngjs');
      process.exit(1);
    }
  }
}

main();
