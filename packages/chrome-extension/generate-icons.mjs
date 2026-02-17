/**
 * Generates placeholder SVG icons for the Arcanea Chrome Extension.
 * Run with: node generate-icons.mjs
 *
 * For production, replace with actual designed PNG icons at:
 * icons/icon16.png, icons/icon32.png, icons/icon48.png, icons/icon128.png
 */

import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('icons', { recursive: true });

function createSvgIcon(size) {
  const center = size / 2;
  const fontSize = size * 0.5;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg-grad" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#1a1d26"/>
      <stop offset="100%" stop-color="#0b0e14"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7fffd4" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#7fffd4" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow-filter">
      <feGaussianBlur stdDeviation="${size * 0.04}" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#bg-grad)"/>

  <!-- Outer ring -->
  <circle cx="${center}" cy="${center}" r="${center * 0.82}"
    fill="none"
    stroke="#7fffd4"
    stroke-width="${size * 0.025}"
    stroke-opacity="0.3"/>

  <!-- Glow -->
  <circle cx="${center}" cy="${center}" r="${center * 0.5}" fill="url(#glow)"/>

  <!-- Star/Mark symbol -->
  <text
    x="${center}"
    y="${center + fontSize * 0.35}"
    text-anchor="middle"
    font-family="system-ui, -apple-system, serif"
    font-size="${fontSize}"
    fill="#7fffd4"
    filter="url(#glow-filter)"
    font-weight="bold">✦</text>
</svg>`;
}

// Generate SVG icons (Chrome actually supports SVG for some sizes but requires PNG for manifest)
// These serve as visual references — convert to PNG for production
const sizes = [16, 32, 48, 128];

for (const size of sizes) {
  const svg = createSvgIcon(size);
  writeFileSync(`icons/icon${size}.svg`, svg);
  console.log(`Generated icons/icon${size}.svg`);
}

console.log('\nNote: For production, convert SVG files to PNG using:');
console.log('  - Inkscape: inkscape -w 128 -h 128 icons/icon128.svg -o icons/icon128.png');
console.log('  - ImageMagick: convert -background none icons/icon128.svg icons/icon128.png');
console.log('  - Or use an online converter like cloudconvert.com');
console.log('\nChrome Manifest V3 requires PNG icons. Update manifest.json to use .png extension.');
console.log('During development, you can reference the SVG files directly in manifest.json.');
