// Arcanea Aesthetic Lanes — the multi-lane taste substrate for image generation.
//
// Mirrors FrankX's lib/gen/lanes.ts shape, tuned to Arcanea canon. Each lane is a
// first-class, fully-specified art direction: palette, references, prompt fragments,
// a compiled negative prompt, a ranked backend list, and a per-lane quality bar.
//
// One lane per asset. The council gate reads the CHOSEN lane and holds output against
// THAT lane's bar — not one global standard. A leviathan-abyssal world-boss and a
// guardian-portrait are both "on brand" because the brand is "premium, on the chosen lane."
//
// Standalone-typed: NO external imports (this file lives outside the app graph).
//
// Arcanea design tokens: Atlantean Teal #00bcd4 · Cosmic Blue #0d47a1 · Gold #ffd700 · ground #09090b.

export type LaneId =
  | 'leviathan-abyssal'
  | 'godbeast-divine'
  | 'guardian-portrait'
  | 'luminor-card'
  | 'nft-1of1'

/** Backend ids the router can rank. Mirrors the harnesses in HARNESS_ROUTING.md. */
export type BackendId =
  | 'grok-imagine'
  | 'gpt-image-2'
  | 'nano-banana-pro'
  | 'nano-banana-2'
  | 'higgsfield'

export interface AestheticLane {
  id: LaneId
  /** Human-readable label. */
  label: string
  /** Hex palette in priority order — the colors this lane is built on. */
  palette: string[]
  /** One sentence: the reference mood / taste lineage to calibrate against. */
  referenceMood: string
  /** Positive style tokens appended to every resolved prompt on this lane. */
  promptFragments: string[]
  /** The compiled negative prompt — what this lane refuses to render. */
  negativePrompt: string
  /** Backend ids that render this lane best, in rank order (primary first). */
  bestBackends: BackendId[]
  /** The gate checklist for THIS lane. Every item must pass before publish. */
  qualityBar: string[]
}

export const LANES: Record<LaneId, AestheticLane> = {
  'leviathan-abyssal': {
    id: 'leviathan-abyssal',
    label: 'Leviathan / Abyssal',
    palette: ['#09090b', '#020308', '#00bcd4', '#0d47a1', '#1a2740'],
    referenceMood:
      'Sublime oceanic dread — a planet-scale abyssal kraken in the Sunless Fathom, obsidian hide drinking light, void-ink veins glowing through black water. Ancient, dreaming, vast beyond comprehension.',
    promptFragments: [
      'colossal abyssal leviathan, planet-scale kraken, obsidian hide that drinks light',
      'bioluminescent void-ink veins glowing cyan-teal #00bcd4 and cosmic-blue #0d47a1',
      'eyes like drowned moons, nine primary arms, countless writhing tendrils',
      'sunless deep-ocean abyss, near-black #09090b water, volumetric god-rays from far above',
      'sublime cosmic horror scale, atmospheric haze, suspended marine particulate, painterly cinematic',
      'element Water and Void, ancient and dreaming, oceanic dread',
    ],
    negativePrompt:
      'bright daylight, warm tones, cartoon, cute, friendly, plastic, low detail, flat lighting, oversaturated neon, clutter, watermark, signature, text artifacts, jpeg artifacts, small scale, land setting, fish-tank, googly eyes, extra malformed limbs',
    bestBackends: ['nano-banana-pro', 'gpt-image-2', 'higgsfield', 'grok-imagine'],
    qualityBar: [
      'Reads as planet-scale — scale cues (tiny ships/figures, dwarfed cities) present',
      'Hide is obsidian and light-drinking, never glossy plastic',
      'Glow comes only from void-ink veins in cyan-teal / cosmic-blue, on near-black water',
      'Mood is sublime dread, not monster-of-the-week kitsch',
      'Anatomy is coherent — nine primary arms read, tendrils not malformed',
      'Water has depth, haze, and particulate — never a flat backdrop',
    ],
  },

  'godbeast-divine': {
    id: 'godbeast-divine',
    label: 'Godbeast / Divine',
    palette: ['#09090b', '#ffd700', '#00bcd4', '#0d47a1', '#fff4cf'],
    referenceMood:
      'A radiant divine beast bonded to a Gate — luminous, mythic, awe-commanding. Light as the subject, gold and teal energy, the register of the Ten Godbeasts.',
    promptFragments: [
      'radiant divine godbeast, mythic guardian-creature, awe-commanding presence',
      'luminous golden #ffd700 energy with Atlantean-teal #00bcd4 and cosmic-blue #0d47a1 accents',
      'volumetric light radiating from the creature, sacred geometry haze, motivated rim light',
      'near-black #09090b stage, painterly photoreal, fine detail in scale/feather/hide texture',
      'epic mythological composition, single hero subject, cinematic depth',
    ],
    negativePrompt:
      'mundane animal, cartoon, plastic toy, flat lighting, dull, desaturated, cluttered background, stock photo, watermark, signature, text, malformed anatomy, extra limbs, lowres, jpeg artifacts, oversaturated rainbow',
    bestBackends: ['nano-banana-pro', 'gpt-image-2', 'grok-imagine', 'higgsfield'],
    qualityBar: [
      'Light is the subject — the beast radiates, not a flat overlay',
      'Gold/teal energy holds; no rainbow oversaturation',
      'A single, nameable hero creature on a dark stage',
      'Texture (scale/feather/hide) is detailed and coherent',
      'Reads as divine and mythic, not a zoo animal',
      'Anatomy is clean — no malformed or extra limbs',
    ],
  },

  'guardian-portrait': {
    id: 'guardian-portrait',
    label: 'Guardian Portrait',
    palette: ['#09090b', '#00bcd4', '#0d47a1', '#ffd700', '#e8eef5'],
    referenceMood:
      'One of the Ten Guardians — painterly photoreal character portrait. Dignified, elemental, the v3 hero register: ultra-quality, motivated light, gate-frequency energy.',
    promptFragments: [
      'painterly photorealistic character portrait, one of the Ten Guardians of Arcanea',
      'dignified mythic figure, elemental aura, gate-frequency energy in Atlantean-teal #00bcd4',
      'cosmic-blue #0d47a1 depth, gold #ffd700 accents, near-black #09090b background',
      'motivated key light from upper-left, cool rim light, soft ambient bounce',
      'ultra-quality detail in face/eyes/garment, shallow depth of field, hero composition',
    ],
    negativePrompt:
      'cartoon, anime waifu, 3d render look, plastic skin, oversharpened, flat lighting, generic fantasy stock, watermark, signature, text, extra fingers, malformed hands, asymmetric eyes, lowres, jpeg artifacts, busy background',
    bestBackends: ['nano-banana-pro', 'gpt-image-2', 'higgsfield', 'grok-imagine'],
    qualityBar: [
      'Face and eyes are coherent, ultra-quality, no anatomy errors',
      'Light is motivated and dimensional, never flat',
      'Elemental aura reads in teal/blue/gold, not generic glow',
      'Background is dark and uncluttered — the figure is the subject',
      'Skin and garment read painterly-photoreal, not plastic 3D',
      'Dignified mythic presence, not generic fantasy-stock',
    ],
  },

  'luminor-card': {
    id: 'luminor-card',
    label: 'Luminor Collectible Card',
    palette: ['#09090b', '#00bcd4', '#ffd700', '#0d47a1', '#12151c'],
    referenceMood:
      'A collectible trading-card aesthetic — framed character art with a clear focal subject, premium card-game finish, room for a name plate and frame treatment.',
    promptFragments: [
      'premium collectible trading-card character art, centered framed subject',
      'card-game finish, clean focal composition, decorative gold #ffd700 frame energy',
      'Atlantean-teal #00bcd4 and cosmic-blue #0d47a1 rarity glow, near-black #09090b ground',
      'crisp foreground subject with negative space for a name plate, balanced card layout',
      'illustrative-photoreal, rich detail, premium print quality',
    ],
    negativePrompt:
      'cluttered, busy edges, off-center subject, flat lighting, muddy colors, low detail, cheap clipart, watermark, random text, jpeg artifacts, lowres, malformed anatomy, cropped subject',
    bestBackends: ['gpt-image-2', 'nano-banana-pro', 'grok-imagine', 'higgsfield'],
    qualityBar: [
      'Subject is centered with deliberate negative space for a name plate',
      'Frame/rarity glow reads in gold + teal, premium card-game finish',
      'Single clear focal subject, never cropped at the edges',
      'Colors are rich and clean, not muddy',
      'Composition is balanced and print-ready',
      'No stray text or clipart artifacts',
    ],
  },

  'nft-1of1': {
    id: 'nft-1of1',
    label: 'NFT 1/1 Premium',
    palette: ['#09090b', '#00bcd4', '#0d47a1', '#ffd700', '#05070d'],
    referenceMood:
      'A premium one-of-one collectible — gallery-grade, museum-lit, unmistakably scarce. Maximum craft and detail, a piece that justifies a 1/1 mint.',
    promptFragments: [
      'museum-grade one-of-one collectible artwork, gallery-lit, unmistakably premium',
      'maximum craft and fine detail, intricate texture, signature centerpiece subject',
      'Atlantean-teal #00bcd4 and cosmic-blue #0d47a1 energy, gold #ffd700 highlights, deep #09090b ground',
      'dramatic motivated lighting, cinematic depth, flawless rendering, scarce and iconic',
      'high-resolution, collectible-poster framing, refined color grade',
    ],
    negativePrompt:
      'cheap, generic, mass-produced look, flat lighting, low detail, blurry, plastic, oversaturated, clutter, stock photo, watermark, signature, random text, jpeg artifacts, lowres, malformed anatomy, banding',
    bestBackends: ['gpt-image-2', 'nano-banana-pro', 'higgsfield', 'grok-imagine'],
    qualityBar: [
      'Detail and craft are maximal — this could hang in a gallery',
      'Lighting is dramatic and motivated, never flat',
      'A single iconic centerpiece subject worth a 1/1 mint',
      'Color grade is refined — teal/blue/gold on deep black, no banding',
      'Rendering is flawless, high-resolution, no artifacts',
      'Feels scarce and premium, never mass-produced',
    ],
  },
}

/** Resolve a lane by id, or undefined if unknown. */
export function getLane(id: LaneId): AestheticLane | undefined {
  return LANES[id]
}

/** The default lane when none is specified — abyssal leviathans are the flagship. */
export const DEFAULT_LANE: LaneId = 'leviathan-abyssal'
