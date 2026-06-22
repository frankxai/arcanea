// The Leviathans — Tier 3 Wild Godbeasts of the Arcanea Monster System.
//
// Leviathans are unbonded, titan-scale beasts of Nero's Unformed that roam
// OUTSIDE the Ten Gates. The locked Ten Gate Godbeasts are untouched by this
// tier. Canon: `.arcanea/lore/leviathans/`, `.arcanea/lore/CANON_LOCKED.md`
// (the Leviathan tier, STAGING). Nethyssa is the flagship.

import type { BestiaryCreature } from "../bestiary/index.js";

export type MonsterTier = 0 | 1 | 2 | 3 | 4;
export type CreatureScale =
  | "tiny"
  | "small"
  | "medium"
  | "large"
  | "massive"
  | "titan"
  | "planet";

/**
 * A world/game creature. Extends the psychological BestiaryCreature so the
 * existing bestiary (Tier 2 "Shades") and new Tier 1–3 monsters share one
 * loader. The psychological fields (symptoms/remedies/affirmation) stay
 * optional for literal monsters that carry only a creative-practice parallel.
 */
export interface GameMonster extends Partial<Pick<BestiaryCreature, "symptoms" | "remedies" | "affirmation">> {
  slug: string;
  name: string;
  type: string;
  tier: MonsterTier;
  scale: CreatureScale;
  description: string;
  /** Canonical elements (one or more). */
  elements: string[];
  /** Relative encounter health, 1 (trivial) → 100 (extinction-tier). */
  health: number;
  abilities: string[];
  drops: string[];
  elementalWeaknesses: string[];
  elementalResistances: string[];
  habitat: string;
  /** Sub-Gate or Gate frequency, if it resonates on a named one. */
  resonanceHz?: number | null;
  /** Origin class (Tier 8 Kindreds), where applicable. */
  originClass?: string;
  /** Gate the creature is bonded to — null for Wild Godbeasts. */
  gate?: string | null;
}

/**
 * A Tier 3 Leviathan / Wild Godbeast. Carries the Leviathan-tier material
 * (the analogue of a Gate Godbeast's Vael Crystal) and a Shadow-corruption
 * counterpart.
 */
export interface Leviathan extends GameMonster {
  tier: 3;
  title: string;
  /** Leviathan-tier material correspondence (analogue of a Vael Crystal). */
  material: string;
  /** The Shadow-corrupted form of this Leviathan. */
  corruption: string;
  /** Always null — Leviathans are unbonded. */
  gate: null;
}

// ── Nethyssa's brood (Tier 1–2 creatures) ────────────────────────────────────

export const krakenBrood: Record<string, GameMonster> = {
  krakenling: {
    slug: "krakenling",
    name: "Krakenling",
    type: "Beast",
    tier: 1,
    scale: "large",
    description:
      "A juvenile kraken of Nethyssa's brood. Pack-hunters of the continental shelf, drawn to the Deep Call.",
    elements: ["Water"],
    health: 12,
    abilities: ["Constrict", "Ink spray", "Pack surge"],
    drops: ["Krakenling hide", "Lesser pearl shard"],
    elementalWeaknesses: ["Fire"],
    elementalResistances: ["Water"],
    habitat: "Continental shelf, shipwreck reefs",
    affirmation: "What is young and hungry can still be turned back from the shore.",
  },
  abyssal_tendril: {
    slug: "abyssal_tendril",
    name: "Abyssal Tendril",
    type: "Beast",
    tier: 2,
    scale: "medium",
    description:
      "An autonomous, severed tentacle-creature that lives on past its parent. An ambush predator of the dark water.",
    elements: ["Water", "Void"],
    health: 8,
    abilities: ["Ambush coil", "Drag-under", "Numbing grip"],
    drops: ["Tendril sinew", "Void-ink vial"],
    elementalWeaknesses: ["Fire", "Spirit"],
    elementalResistances: ["Void"],
    habitat: "Abyssal trenches, sunken ruins",
    symptoms: ["A distraction that grips long after its source is gone"],
    remedies: ["Name the grip; cut it once, cleanly"],
    affirmation: "I do not have to be held by a thing that has already let go.",
  },
  drowned_herald: {
    slug: "drowned_herald",
    name: "Drowned Herald",
    type: "Thrall",
    tier: 2,
    scale: "medium",
    description:
      "A humanoid who answered the Deep Call and walked into the sea. Tragic carrier of the Ink-of-Forgetting; neutral until provoked.",
    elements: ["Water", "Void"],
    health: 10,
    abilities: ["Ink-of-Forgetting touch", "Lure-song", "Tideward step"],
    drops: ["Forgotten keepsake", "Nethyss Pearl (rare)"],
    elementalWeaknesses: ["Spirit"],
    elementalResistances: ["Water", "Void"],
    habitat: "Tide-line, drowned villages",
    symptoms: ["Forgetting why you began"],
    remedies: ["Carry one written line of your reason where the tide can't reach it"],
    affirmation: "I keep my reason close enough that the deep cannot take it.",
  },
};

// ── Nethyssa, the Abyss That Dreams (Tier 3 flagship) ─────────────────────────

export const nethyssa: Leviathan = {
  slug: "nethyssa",
  name: "Nethyssa",
  title: "the Abyss That Dreams",
  type: "Leviathan",
  tier: 3,
  scale: "planet",
  gate: null,
  description:
    "A kraken the size of a drowned continent. Unbonded beast of Nero's Unformed, kept dreaming by the Tidesong. Water made depthless and touched by Void — where Veloura flows, Nethyssa drowns and dreams.",
  elements: ["Water", "Void"],
  resonanceHz: null, // resonates on the sub-Gate "Abyssal Hum"
  originClass: "Wild Godbeast (Nero's Unformed)",
  health: 100,
  abilities: [
    "Tidewrath",
    "Abyssal Dreaming",
    "Maelstrom Crown",
    "Ink-of-Forgetting",
    "The Deep Call",
  ],
  drops: ["Nethyss Pearl (legendary)", "Void-ink (epic)", "Drowned-city relic"],
  elementalWeaknesses: ["Fire", "Spirit"],
  elementalResistances: ["Water", "Void"],
  habitat: "The Drowned Deep — the Sunless Fathom",
  material: "Nethyss Pearl",
  corruption: "The Drowned Shadow",
};

export const leviathans: Record<string, Leviathan> = {
  nethyssa,
};

/** Resonance name for Leviathans that sound beneath the Ten-Gate scale. */
export const SUB_GATE_RESONANCE = "Abyssal Hum";
