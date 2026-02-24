import { mkdirSync, writeFileSync } from 'fs';
import { PNG } from 'pngjs';

mkdirSync('icons', { recursive: true });

const DARK = [11, 14, 20, 255];
const DARK_HI = [26, 29, 38, 255];
const TEAL = [127, 255, 212, 255];

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
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#bg-grad)"/>
  <circle cx="${center}" cy="${center}" r="${center * 0.82}" fill="none" stroke="#7fffd4" stroke-width="${size * 0.025}" stroke-opacity="0.3"/>
  <text x="${center}" y="${center + fontSize * 0.35}" text-anchor="middle" font-family="system-ui, -apple-system, serif" font-size="${fontSize}" fill="#7fffd4" font-weight="bold">✦</text>
</svg>`;
}

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

function createPngIcon(size) {
  const png = new PNG({ width: size, height: size });
  const center = (size - 1) / 2;
  const r = size * 0.43;
  const ring = size * 0.34;
  const ringW = Math.max(1.2, size * 0.04);
  const glow = size * 0.24;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = x / (size - 1);
      const ny = y / (size - 1);
      const dx = x - center;
      const dy = y - center;
      const d = Math.sqrt(dx * dx + dy * dy);

      const bg = mix(DARK_HI, DARK, (nx + ny) / 2);
      const corner = Math.min(x, y, size - 1 - x, size - 1 - y);
      if (corner < size * 0.1 && d > r * 1.3) {
        setPx(png, x, y, [0, 0, 0, 0]);
        continue;
      }

      let px = bg;

      if (Math.abs(d - ring) <= ringW) {
        px = mix(px, TEAL, 0.55);
      } else if (d < glow) {
        const t = 1 - d / glow;
        px = mix(px, TEAL, t * 0.42);
      }

      if (d < size * 0.075) {
        px = mix(px, [255, 255, 255, 255], 0.9);
      }

      setPx(png, x, y, px);
    }
  }

  return PNG.sync.write(png);
}

const sizes = [16, 32, 48, 128];

for (const size of sizes) {
  const svg = createSvgIcon(size);
  writeFileSync(`icons/icon${size}.svg`, svg);
  writeFileSync(`icons/icon${size}.png`, createPngIcon(size));
  console.log(`Generated icons/icon${size}.svg + icons/icon${size}.png`);
}
