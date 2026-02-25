/**
 * Guardian Hero Images Configuration
 *
 * URLs point to Vercel Blob storage
 * Update these URLs after uploading images to Vercel Blob
 *
 * Upload script: scripts/upload-to-vercel-blob.mjs
 */

export const GUARDIAN_IMAGES = {
  lyssandria: {
    hero: "https://images.arcanea.ai/guardians/lyssandria-tree-goddess-001.webp",
    gallery: [],
  },
  leyla: {
    hero: "https://images.arcanea.ai/guardians/leyla-phoenix-001.webp",
    gallery: [],
  },
  draconia: {
    hero: "https://images.arcanea.ai/guardians/draconia-goddess-dragon-002.webp",
    gallery: [
      "https://images.arcanea.ai/guardians/draconia-golden-037.webp",
      "https://images.arcanea.ai/guardians/draconia-sky-island-360.webp",
    ],
  },
  maylinn: {
    hero: "https://images.arcanea.ai/guardians/maylinn-deer-001.webp",
    gallery: [],
  },
  alera: {
    hero: "https://images.arcanea.ai/guardians/alera-spirit-animal-001.webp",
    gallery: [
      "https://images.arcanea.ai/guardians/alera-spirit-animal-005.webp",
    ],
  },
  lyria: {
    hero: "https://images.arcanea.ai/guardians/lyria-vision-001.webp",
    gallery: [],
  },
  aiyami: {
    hero: "https://images.arcanea.ai/guardians/aiyami-sun-001.webp",
    gallery: [],
  },
  elara: {
    hero: "https://images.arcanea.ai/guardians/elara-unicorn-001.webp",
    gallery: ["https://images.arcanea.ai/guardians/elara-unicorn-010.webp"],
  },
  ino: {
    hero: "https://images.arcanea.ai/guardians/ino-unity-001.webp",
    gallery: [],
  },
  shinkami: {
    hero: "https://images.arcanea.ai/guardians/shinkami-source-001.webp",
    gallery: [],
  },
} as const;

export type GuardianName = keyof typeof GUARDIAN_IMAGES;
