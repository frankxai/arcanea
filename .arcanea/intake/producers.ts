// Arcanea Hermes — producer substrate.
//
// 5 producer specialists. Each reads the same intake substrate (capture-types +
// canon-spectrum) and fans one classified capture into per-surface output. This
// mirrors the FrankX L4-producer shipping pattern: add a producer in ~1 day, the
// registry drives every downstream surface. Standalone + typed — no external
// imports (`.arcanea/` is a tool-agnostic config dir, not part of a build).

import type { CaptureType } from './capture-types'

export type ProducerId =
  | 'lore-producer'
  | 'world-builder'
  | 'vis-producer'
  | 'music-producer'
  | 'prose-producer'

/** Shipping maturity of a producer. Hermes defers dispatch to `planned` ones. */
export type ProducerStatus = 'shipped' | 'partial' | 'planned'

export interface Producer {
  id: ProducerId
  label: string
  description: string
  /** which capture types this producer can consume */
  acceptedCaptureTypes: CaptureType[]
  /** what artifact kinds it emits */
  outputs: string[]
  /** where its output lands — repo paths, registries, external tools */
  targetSurfaces: string[]
  status: ProducerStatus
}

export const PRODUCERS: Record<ProducerId, Producer> = {
  'lore-producer': {
    id: 'lore-producer',
    label: 'Lore Producer',
    description:
      'Lore text + voice-memo wisdom → canon-aligned lore entries, myth fragments, timeline notes. Runs the arcanea-canon gate on every entry. New named entities land as STAGING in CANON_LOCKED, never auto-locked.',
    acceptedCaptureTypes: ['lore-text', 'guardian-wisdom', 'world-fragment'],
    outputs: ['canon-entry', 'myth-fragment', 'timeline-note', 'staging-proposal'],
    targetSurfaces: ['.arcanea/lore', 'book/', '.arcanea/lore/CANON_LOCKED.md (staging)'],
    status: 'shipped',
  },
  'world-builder': {
    id: 'world-builder',
    label: 'World Builder',
    description:
      'Monster concepts + world fragments → Monster System ladder entries (T0–T4), faction notes, region maps, item stat blocks. Grades every new creature against the tier ladder; T3/T4 always route through the canon gate.',
    acceptedCaptureTypes: ['monster-concept', 'world-fragment', 'lore-text'],
    outputs: ['monster-entry', 'faction-note', 'region-map', 'stat-block'],
    targetSurfaces: ['.arcanea/lore/creatures', '.arcanea/lore', 'book/academy-handbook'],
    status: 'partial',
  },
  'vis-producer': {
    id: 'vis-producer',
    label: 'Visual Producer',
    description:
      'Concept art + character sketches → registered visual assets, character renders, world backdrops, cover frames. Composes NB2 / Higgsfield. Writes nothing to the live site — assets land in the registry for review.',
    acceptedCaptureTypes: ['concept-art', 'character-sketch', 'monster-concept'],
    outputs: ['character-render', 'world-backdrop', 'cover-frame', 'registry-asset'],
    targetSurfaces: ['image registry (.arcanea/design)', 'public/images (via review)'],
    status: 'shipped',
  },
  'music-producer': {
    id: 'music-producer',
    label: 'Music Producer',
    description:
      'Music seeds + Gate-frequency motifs → Suno prompts, soundscape briefs, Gate-aligned tracks (Ten Gates, 174–1111 Hz). Emits prompts + briefs only; rendering is downstream.',
    acceptedCaptureTypes: ['music-seed', 'guardian-wisdom'],
    outputs: ['suno-prompt', 'soundscape-brief', 'gate-motif'],
    targetSurfaces: ['suno', '.arcanea/messaging (track briefs)'],
    status: 'partial',
  },
  'prose-producer': {
    id: 'prose-producer',
    label: 'Prose Producer',
    description:
      'Lore text + transcribed wisdom → Library prose: parables, dialogues, wisdom scrolls, chronicles. Brand-voice gate (arcanea-voice) applies. Pairs tightly with lore-producer for canon-checked source.',
    acceptedCaptureTypes: ['lore-text', 'guardian-wisdom'],
    outputs: ['library-text', 'parable', 'dialogue', 'wisdom-scroll'],
    targetSurfaces: ['book/', 'content/fiction'],
    status: 'shipped',
  },
}

/** All producers as an array (stable order). */
export const PRODUCER_LIST: Producer[] = Object.values(PRODUCERS)

export function getProducer(id: ProducerId): Producer {
  return PRODUCERS[id]
}

export function producersByStatus(status: ProducerStatus): Producer[] {
  return PRODUCER_LIST.filter((p) => p.status === status)
}

/** Which producers accept a given capture type — the core dispatch lookup. */
export function producersAcceptingCaptureType(type: CaptureType): Producer[] {
  return PRODUCER_LIST.filter((p) => p.acceptedCaptureTypes.includes(type))
}
