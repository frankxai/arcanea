// Arcanea Hermes — the canon ↔ tech fit axis + canon-tier guesser.
//
// Two questions decide how a capture is handled:
//   1. Where does it sit on the canon ↔ tech spectrum? (does it touch the
//      living mythology, or is it a tech/mechanics artifact, or a blend?)
//   2. If it carries a new entity, where does it sit on the Monster System
//      ladder (T0–T4), and does that require a canon gate before it ships?
//
// New named entities at the Wild-Godbeast (T3) or Gate-Godbeast (T4) tier ALWAYS
// require the canon gate — they touch the locked mythology and can never
// auto-land. See `.arcanea/lore/creatures/MONSTER_SYSTEM.md` (T4 LOCKED, T3 OPEN
// but Creator-approval-gated) and `CANON_LOCKED.md`.
//
// Standalone + typed — no external imports (`.arcanea/` is a tool-agnostic
// config dir, not part of a tsconfig build).

import type { CanonTier } from './capture-types'

export type Spectrum = 'canon' | 'mixed' | 'tech'

/**
 * Signals Hermes extracts from a capture during the intake pass. All optional —
 * the classifier fills what it can read; absent signals are treated as unknown,
 * which biases the result toward the safe (gated) side.
 */
export interface CanonSignals {
  /** capture introduces a brand-new named entity (creature, character, place, artifact) */
  introducesNewEntity?: boolean
  /** references existing locked canon (a God, Godbeast, Gate, the Arc, Malachar) */
  referencesLockedCanon?: boolean
  /** scale of the entity, if it is a creature — maps to the Monster ladder */
  creatureScale?: 'mote' | 'beast' | 'shade' | 'leviathan' | 'godbeast'
  /** entity is/was bonded to a God — only the Ten Gate Godbeasts are bonded (T4) */
  bonded?: boolean
  /** capture is primarily mechanics / code / platform, not mythology */
  techLeaning?: boolean
}

export interface CanonFit {
  spectrum: Spectrum
  canonTier: CanonTier
  /** true → cannot ship without the canon gate (arcanea-canon + Frank lock-decision) */
  requiresCanonGate: boolean
}

const SCALE_TO_TIER: Record<NonNullable<CanonSignals['creatureScale']>, CanonTier> = {
  mote: 'T0',
  beast: 'T1',
  shade: 'T2',
  leviathan: 'T3',
  godbeast: 'T4',
}

/**
 * Classify a capture's canon fit from extracted signals.
 *
 * Tier logic (Monster System):
 *   - explicit creatureScale wins (mote→T0 … godbeast→T4)
 *   - bonded entity with no scale → T4 (only the Ten are bonded)
 *   - a new entity with no scale/bond signal → T3 (unbonded Wild Godbeast prior;
 *     the conservative default, because it forces the gate)
 *   - no new entity → 'none'
 *
 * Gate logic: any T3/T4 entity ALWAYS requires the gate. A new entity that
 * references locked canon also requires it (it can contradict the mythology).
 */
export function classifyCanonFit(signals: CanonSignals): CanonFit {
  const {
    introducesNewEntity = false,
    referencesLockedCanon = false,
    creatureScale,
    bonded = false,
    techLeaning = false,
  } = signals

  // --- spectrum ---
  let spectrum: Spectrum
  if (techLeaning && !referencesLockedCanon && !introducesNewEntity) {
    spectrum = 'tech'
  } else if (referencesLockedCanon || introducesNewEntity) {
    spectrum = techLeaning ? 'mixed' : 'canon'
  } else {
    spectrum = 'mixed'
  }

  // --- canon tier ---
  let canonTier: CanonTier
  if (creatureScale) {
    canonTier = SCALE_TO_TIER[creatureScale]
  } else if (bonded) {
    canonTier = 'T4'
  } else if (introducesNewEntity) {
    canonTier = 'T3' // conservative: unbonded new entity forces the gate
  } else {
    canonTier = 'none'
  }

  // --- gate ---
  const newEntityTier = canonTier === 'T3' || canonTier === 'T4'
  const requiresCanonGate = newEntityTier || (introducesNewEntity && referencesLockedCanon)

  return { spectrum, canonTier, requiresCanonGate }
}
