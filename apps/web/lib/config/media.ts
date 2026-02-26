/**
 * Media configuration for Arcanea
 *
 * Maps each Guardian to their Vercel Blob hero image URL (once uploaded),
 * a gradient fallback shown while no Blob URL is set, and metadata about
 * how many processed source files are available for that Guardian.
 *
 * Upload workflow:
 *   1. Run:  node scripts/prepare-vercel-upload.js
 *      → Produces scripts/arcanea-manifest-summary.json with hero candidates
 *   2. Run:  node scripts/upload-to-vercel-blob.mjs (requires VERCEL_BLOB_TOKEN)
 *      → Uploads files and prints their Blob URLs
 *   3. Paste the returned URLs into the heroImage fields below.
 *
 * Processed source files live at:
 *   C:\Users\frank\arcanea-processed\{Guardian}\*.webp
 *   C:\Users\frank\arcanea-processed\_thumbnails\{Guardian}\*-thumb.webp
 */

export const GUARDIAN_MEDIA = {
  draconia: {
    // Source: C:\Users\frank\arcanea-processed\Draconia\ (128 files)
    heroImage: "/guardians/draconia-hero.webp",
    thumbnails: [] as string[],
    gradient: "from-red-600 via-orange-500 to-amber-400",
    glowColor: "#ef4444",
    available: 128,
  },
  alera: {
    // Source: C:\Users\frank\arcanea-processed\Alera\ (68 files)
    heroImage: "/guardians/alera-hero.webp",
    thumbnails: [] as string[],
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    glowColor: "#38bdf8",
    available: 68,
  },
  elara: {
    // Source: C:\Users\frank\arcanea-processed\Elara\ (37 files)
    heroImage: "/guardians/elara-hero.webp",
    thumbnails: [] as string[],
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    glowColor: "#34d399",
    available: 37,
  },
  ino: {
    // Source: C:\Users\frank\arcanea-processed\Ino\ (8 files)
    heroImage: "/guardians/ino-hero.webp",
    thumbnails: [] as string[],
    gradient: "from-pink-400 via-fuchsia-500 to-teal-400",
    glowColor: "#f472b6",
    available: 8,
  },
  aiyami: {
    // Source: C:\Users\frank\arcanea-processed\Aiyami\ (3 files)
    heroImage: "/guardians/aiyami-hero.webp",
    thumbnails: [] as string[],
    gradient: "from-yellow-200 via-amber-300 to-white",
    glowColor: "#fde68a",
    available: 3,
  },
  lyssandria: {
    // Source: C:\Users\frank\arcanea-processed\Lyssandria\ (2 files)
    heroImage: "/guardians/lyssandria-hero.webp",
    thumbnails: [] as string[],
    gradient: "from-amber-700 via-yellow-600 to-stone-400",
    glowColor: "#92400e",
    available: 2,
  },
  leyla: {
    heroImage: "/guardians/leyla-hero.webp",
    thumbnails: [] as string[],
    gradient: "from-blue-300 via-cyan-400 to-slate-300",
    glowColor: "#7dd3fc",
    available: 0,
  },
  maylinn: {
    heroImage: "/guardians/maylinn-hero.webp",
    thumbnails: [] as string[],
    gradient: "from-rose-300 via-pink-400 to-green-300",
    glowColor: "#fda4af",
    available: 0,
  },
  lyria: {
    heroImage: "/guardians/lyria-hero.webp",
    thumbnails: [] as string[],
    gradient: "from-violet-500 via-purple-600 to-indigo-700",
    glowColor: "#a78bfa",
    available: 0,
  },
  shinkami: {
    heroImage: "/guardians/shinkami-hero.webp",
    thumbnails: [] as string[],
    gradient: "from-neutral-900 via-yellow-400 to-white",
    glowColor: "#ffd700",
    available: 0,
  },
} as const;

export type GuardianMediaKey = keyof typeof GUARDIAN_MEDIA;

/**
 * Returns the media config for a Guardian by name (case-insensitive).
 * Falls back to a generic violet gradient if the Guardian is unknown.
 */
export function getGuardianMedia(name: string) {
  const key = name.toLowerCase() as GuardianMediaKey;
  return (
    GUARDIAN_MEDIA[key] ?? {
      heroImage: "",
      thumbnails: [] as string[],
      gradient: "from-violet-500 to-indigo-600",
      glowColor: "#8b5cf6",
      available: 0,
    }
  );
}
