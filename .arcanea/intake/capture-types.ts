// Arcanea Hermes — capture-type substrate.
//
// Every inbound creative capture maps to exactly one CaptureType. The Hermes
// intake phase reads mime + extension to infer the type; when ambiguous, a
// multimodal pass decides. Standalone + typed — no external imports, because
// `.arcanea/` is a tool-agnostic config dir, not part of a tsconfig build.
//
// `defaultCanonTier` is a *guess* at where new lore-bearing captures sit on the
// Monster System ladder (`.arcanea/lore/creatures/MONSTER_SYSTEM.md`):
//   T0 Motes · T1 Beasts · T2 Shades · T3 Leviathans/Wild Godbeasts · T4 Gate Godbeasts.
// `none` = the capture carries no new canon entity by default (text, art, music).
// The real tier is decided by canon-spectrum.ts at classify time; this is a prior.

export type CaptureType =
  | 'lore-text'
  | 'monster-concept'
  | 'character-sketch'
  | 'concept-art'
  | 'guardian-wisdom'
  | 'music-seed'
  | 'world-fragment'

export type CanonTier = 'T0' | 'T1' | 'T2' | 'T3' | 'T4' | 'none'

export interface CaptureTypeMeta {
  id: CaptureType
  label: string
  description: string
  /** mime types this capture commonly arrives as */
  mimeTypes: string[]
  /** lowercase file extensions (with dot) that match this capture */
  extensions: string[]
  /** prior guess at the Monster System tier; canon-spectrum.ts decides the real one */
  defaultCanonTier: CanonTier
}

export const CAPTURE_TYPES: Record<CaptureType, CaptureTypeMeta> = {
  'lore-text': {
    id: 'lore-text',
    label: 'Lore text',
    description:
      'A written lore note, myth fragment, timeline entry, or canon proposal. Prose or markdown. Source for book/ collections, CANON_LOCKED entries, world bible.',
    mimeTypes: ['text/markdown', 'text/plain', 'application/pdf'],
    extensions: ['.md', '.mdx', '.txt', '.pdf'],
    defaultCanonTier: 'none',
  },
  'monster-concept': {
    id: 'monster-concept',
    label: 'Monster concept',
    description:
      'A creature idea — name, element(s), scale, behavior — destined for the Monster System ladder. Text brief or annotated sketch. New creatures default to the unbonded Wild-Godbeast tier until graded.',
    mimeTypes: ['text/markdown', 'text/plain', 'image/png', 'image/jpeg', 'image/webp'],
    extensions: ['.md', '.txt', '.png', '.jpg', '.jpeg', '.webp'],
    defaultCanonTier: 'T3',
  },
  'character-sketch': {
    id: 'character-sketch',
    label: 'Character sketch',
    description:
      'A character idea or visual reference — Creator, Luminor, NPC, Academy figure. Drawing, render, or written profile. Source for character-forge + visual production.',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'text/markdown', 'text/plain'],
    extensions: ['.png', '.jpg', '.jpeg', '.webp', '.heic', '.md', '.txt'],
    defaultCanonTier: 'none',
  },
  'concept-art': {
    id: 'concept-art',
    label: 'Concept art',
    description:
      'A location, artifact, scene, or mood-board image with no single named entity attached. Environmental or atmospheric. Source for the image registry + world-builder backdrops.',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/svg+xml'],
    extensions: ['.png', '.jpg', '.jpeg', '.webp', '.heic', '.svg'],
    defaultCanonTier: 'none',
  },
  'guardian-wisdom': {
    id: 'guardian-wisdom',
    label: 'Guardian wisdom',
    description:
      'A voice memo — spoken lore, a Guardian-voiced teaching, a dictated idea, a ritual. Transcribed first, then routed. Source for book/ wisdom collections, dialogues, and prose.',
    mimeTypes: ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/x-m4a', 'audio/ogg', 'audio/webm'],
    extensions: ['.m4a', '.mp3', '.wav', '.ogg', '.opus', '.webm'],
    defaultCanonTier: 'none',
  },
  'music-seed': {
    id: 'music-seed',
    label: 'Music seed',
    description:
      'A hummed melody, found-sound clip, loop idea, or Gate-frequency motif. Short audio. Source for Suno prompts + the soundscape pipeline (Ten Gates run 174–1111 Hz).',
    mimeTypes: ['audio/mpeg', 'audio/mp4', 'audio/wav'],
    extensions: ['.m4a', '.mp3', '.wav'],
    defaultCanonTier: 'none',
  },
  'world-fragment': {
    id: 'world-fragment',
    label: 'World fragment',
    description:
      'A loose structured snippet — faction note, map region, item stat block, mixed-mode brain dump that spans lore + mechanics. Source for world-builder framework + Academy handbook.',
    mimeTypes: ['text/markdown', 'text/plain', 'application/json'],
    extensions: ['.md', '.mdx', '.txt', '.json'],
    defaultCanonTier: 'T1',
  },
}

/** All capture-type metas as an array (stable order). */
export const CAPTURE_TYPE_LIST: CaptureTypeMeta[] = Object.values(CAPTURE_TYPES)

export function getCaptureType(id: CaptureType): CaptureTypeMeta {
  return CAPTURE_TYPES[id]
}

/**
 * Infer a capture type from a file's mime + extension.
 * Extension wins (most reliable); mime is the fallback. Returns undefined when
 * nothing matches — the caller must surface it, never silently guess.
 */
export function inferCaptureType(mimeType: string, extension: string): CaptureTypeMeta | undefined {
  const lowerExt = extension.toLowerCase()
  const byExt = CAPTURE_TYPE_LIST.find((c) => c.extensions.includes(lowerExt))
  if (byExt) return byExt
  return CAPTURE_TYPE_LIST.find((c) => c.mimeTypes.includes(mimeType))
}
