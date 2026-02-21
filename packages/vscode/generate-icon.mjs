/**
 * Generate a 128x128 PNG icon for the Arcanea Realm VS Code extension.
 * Pure Node.js — zero dependencies. Writes raw PNG binary.
 */
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SIZE = 128;
const pixels = new Uint8Array(SIZE * SIZE * 4); // RGBA

// Colors
const VOID = [11, 14, 20];
const TEAL = [127, 255, 212];
const GOLD = [255, 215, 0];
const TEAL_DIM = [60, 120, 100];

const cx = SIZE / 2;
const cy = SIZE / 2;

function setPixel(x, y, [r, g, b], a = 255) {
  x = Math.round(x);
  y = Math.round(y);
  if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return;
  const idx = (SIZE * y + x) * 4;
  const aa = a / 255;
  const ba = pixels[idx + 3] / 255;
  const oa = aa + ba * (1 - aa);
  if (oa === 0) return;
  pixels[idx]     = Math.round((r * aa + pixels[idx]     * ba * (1 - aa)) / oa);
  pixels[idx + 1] = Math.round((g * aa + pixels[idx + 1] * ba * (1 - aa)) / oa);
  pixels[idx + 2] = Math.round((b * aa + pixels[idx + 2] * ba * (1 - aa)) / oa);
  pixels[idx + 3] = Math.round(oa * 255);
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

// Fill background
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const d = dist(x, y, cx, cy);
    const t = Math.min(d / (SIZE * 0.55), 1);
    setPixel(x, y, [
      Math.round(VOID[0] + 4 * (1 - t)),
      Math.round(VOID[1] + 5 * (1 - t)),
      Math.round(VOID[2] + 10 * (1 - t)),
    ]);
  }
}

// Draw anti-aliased circle
function drawCircle(ccx, ccy, radius, color, thickness = 2, alpha = 180) {
  for (let y = Math.max(0, Math.floor(ccy - radius - thickness)); y <= Math.min(SIZE - 1, Math.ceil(ccy + radius + thickness)); y++) {
    for (let x = Math.max(0, Math.floor(ccx - radius - thickness)); x <= Math.min(SIZE - 1, Math.ceil(ccx + radius + thickness)); x++) {
      const d = dist(x, y, ccx, ccy);
      if (Math.abs(d - radius) < thickness) {
        const edge = 1 - Math.abs(d - radius) / thickness;
        setPixel(x, y, color, Math.round(alpha * edge));
      }
    }
  }
}

// Draw anti-aliased line
function drawLine(x0, y0, x1, y1, color, thickness = 1.5, alpha = 160) {
  const dx = x1 - x0, dy = y1 - y0;
  const len = Math.sqrt(dx * dx + dy * dy);
  const steps = Math.ceil(len * 2);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const px = x0 + dx * t, py = y0 + dy * t;
    for (let oy = -Math.ceil(thickness); oy <= Math.ceil(thickness); oy++) {
      for (let ox = -Math.ceil(thickness); ox <= Math.ceil(thickness); ox++) {
        const d = dist(px + ox, py + oy, px, py);
        if (d < thickness) {
          setPixel(px + ox, py + oy, color, Math.round(alpha * (1 - d / thickness)));
        }
      }
    }
  }
}

// Fill polygon using scanline
function fillPoly(points, color, alpha = 255) {
  let minY = SIZE, maxY = 0;
  for (const [, py] of points) { minY = Math.min(minY, Math.floor(py)); maxY = Math.max(maxY, Math.ceil(py)); }
  for (let y = minY; y <= maxY; y++) {
    const xs = [];
    for (let i = 0; i < points.length; i++) {
      const [x0, y0] = points[i], [x1, y1] = points[(i + 1) % points.length];
      if ((y0 <= y && y1 > y) || (y1 <= y && y0 > y)) {
        xs.push(x0 + (y - y0) / (y1 - y0) * (x1 - x0));
      }
    }
    xs.sort((a, b) => a - b);
    for (let i = 0; i < xs.length - 1; i += 2) {
      for (let x = Math.ceil(xs[i]); x <= Math.floor(xs[i + 1]); x++) setPixel(x, y, color, alpha);
    }
  }
}

// Outer circle (Gate)
drawCircle(cx, cy, 50, TEAL_DIM, 2.5, 120);

// Inner diamond (Source) - gold
const dR = 38;
const diamond = [[cx, cy - dR], [cx + dR, cy], [cx, cy + dR], [cx - dR, cy]];
for (let i = 0; i < 4; i++) drawLine(...diamond[i], ...diamond[(i + 1) % 4], GOLD, 1.5, 150);

// 4-pointed star (Arcanea emblem) - teal, filled
const sO = 22, sI = 9, star = [];
for (let i = 0; i < 8; i++) {
  const a = (Math.PI / 4) * i - Math.PI / 2;
  const r = i % 2 === 0 ? sO : sI;
  star.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
}
fillPoly(star, TEAL, 230);

// Bright center
drawCircle(cx, cy, 3, [255, 255, 255], 3, 200);

// ── Encode PNG ────────────────────────────────────────────────────────────

function crc32(buf) {
  let c = 0xffffffff;
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let v = n;
    for (let k = 0; k < 8; k++) v = v & 1 ? 0xedb88320 ^ (v >>> 1) : v >>> 1;
    table[n] = v;
  }
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBytes = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([typeBytes, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

// IHDR
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0);    // width
ihdr.writeUInt32BE(SIZE, 4);    // height
ihdr[8] = 8;                     // bit depth
ihdr[9] = 6;                     // color type: RGBA
ihdr[10] = 0;                    // compression
ihdr[11] = 0;                    // filter
ihdr[12] = 0;                    // interlace

// IDAT - raw pixel data with filter byte per row
const rawData = Buffer.alloc(SIZE * (1 + SIZE * 4));
for (let y = 0; y < SIZE; y++) {
  rawData[y * (1 + SIZE * 4)] = 0; // filter: None
  for (let x = 0; x < SIZE; x++) {
    const src = (y * SIZE + x) * 4;
    const dst = y * (1 + SIZE * 4) + 1 + x * 4;
    rawData[dst]     = pixels[src];
    rawData[dst + 1] = pixels[src + 1];
    rawData[dst + 2] = pixels[src + 2];
    rawData[dst + 3] = pixels[src + 3];
  }
}

const compressed = deflateSync(rawData);

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
  makeChunk('IHDR', ihdr),
  makeChunk('IDAT', compressed),
  makeChunk('IEND', Buffer.alloc(0)),
]);

const dir = dirname(fileURLToPath(import.meta.url));
writeFileSync(join(dir, 'media', 'arcanea-icon.png'), png);
console.log(`Generated media/arcanea-icon.png (${SIZE}x${SIZE}, ${png.length} bytes)`);
