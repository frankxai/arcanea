// Creature Atlas — Types.
//
// The Atlas catalogs creatures from fictional universes (Avatar, Marvel, etc.)
// alongside Arcanea's original-variant reinterpretations. Reference creatures
// carry a rights tier that governs what can be generated. Arcanea variants are
// fully original and freely promptable.
//
// Lore & contribution spec: `.arcanea/lore/atlas/`

/** How the atlas may use a creature: reference-only vs. freely generated. */
export type CreatureRightsTier =
  | "original_arcanea"     // Arcanea-native, fully owned — generate freely
  | "public_domain"        // Pre-1927 or explicitly PD — generate with care
  | "licensed"             // CC-licensed fan use — generate per license terms
  | "factual_reference"    // IP-protected — document only, no generated imagery
  | "blocked";             // IP-holder restriction — no use

export type AtlasMonsterTier = "T0" | "T1" | "T2" | "T3" | "T4";
export type AtlasCreatureScale =
  | "tiny"
  | "small"
  | "medium"
  | "large"
  | "titan"
  | "world";

export type UniverseMedium =
  | "anime"
  | "animation"
  | "film"
  | "comics"
  | "tv"
  | "literature"
  | "game"
  | "other";

/** A fictional universe in the real world (not an Arcanea world). */
export interface UniverseSpec {
  /** Kebab-case slug e.g. `avatar-the-last-airbender`. */
  id: string;
  name: string;
  studio: string;
  medium: UniverseMedium;
  rightsTier: CreatureRightsTier;
  /** ISO year the franchise first debuted. */
  activeSince: string;
  description: string;
  /** Thematic mapping to Arcanea Five Elements for creative alignment. */
  arcaneaElements?: string[];
  tags: string[];
}

/** A creature FROM a fictional universe (reference entry, not Arcanea-original). */
export interface AtlasCreatureSpec {
  /** Kebab-case slug e.g. `sky-bison`. */
  id: string;
  /** FK to UniverseSpec.id. */
  universeId: string;
  name: string;
  aliases?: string[];
  tier: AtlasMonsterTier;
  scale: AtlasCreatureScale;
  /** Elements as the source universe defines them. */
  elements?: string[];
  habitat: string;
  description: string;
  abilities: string[];
  /** Why this creature matters to its universe's story. */
  significance: string;
  relationships?: AtlasRelationship[];
  rightsTier: CreatureRightsTier;
  /** Whether image generation is appropriate (false for IP-protected creatures). */
  promptable: boolean;
  /** Canonical in-universe sources. */
  canonSources: string[];
}

export type AtlasRelationshipType =
  | "companion"
  | "rival"
  | "spawn"
  | "symbiosis"
  | "predator"
  | "counterpart";

export interface AtlasRelationship {
  creatureId: string;
  type: AtlasRelationshipType;
}

/** An Arcanea-original creature INSPIRED by (not a copy of) a reference creature. */
export interface ArcaneaVariantSpec {
  /** Kebab-case Arcanea-original slug — never the source creature's name. */
  id: string;
  /** FK to AtlasCreatureSpec.id — the creature that inspired this. */
  sourceCreatureId: string;
  /** The Arcanea-original name (no reference to source universe). */
  name: string;
  arcaneaTier: AtlasMonsterTier;
  /** Arcanea Five Elements. */
  elements: string[];
  /** Gate Guardian this is bonded to, if any. null for unbonded. */
  gate?: string | null;
  domain: string;
  /** Pure Arcanea lore — no reference to the source universe. */
  description: string;
  appearance: string;
  abilities: ArcaneaVariantAbility[];
  /** The Vael Crystal pattern for this creature. */
  materialCorrespondence?: string;
  canonStatus: "staging" | "locked";
}

export interface ArcaneaVariantAbility {
  name: string;
  description: string;
  element: string;
}

/** A provider-specific image generation prompt. */
export interface ProviderPrompt {
  provider: "grok-imagine" | "codex-gpt-image-2" | "antigravity-nb2" | "higgsfield";
  positive: string;
  negative: string;
  /** Style directive for this provider. */
  style?: string;
  /** Invocation pattern e.g. "$imagegen" prefix for Codex. */
  invocationNote?: string;
}

export type PromptPackVariantType =
  | "hero"
  | "full_body"
  | "portrait"
  | "encounter"
  | "nft_1of1"
  | "spawn";

/** A full set of generation prompts for one creature or Arcanea variant. */
export interface PromptPack {
  /** AtlasCreatureSpec.id or ArcaneaVariantSpec.id. */
  subjectId: string;
  subjectType: "reference" | "arcanea_variant";
  variants: PromptPackVariant[];
}

export interface PromptPackVariant {
  type: PromptPackVariantType;
  label: string;
  prompts: ProviderPrompt[];
  /** Suggested DAM output path following image-registry conventions. */
  outputPath?: string;
}

/**
 * The World Repo Standard — the machine-readable shape of a contributed
 * universe data file. Submit as a PR to `.arcanea/lore/atlas/contributions/`.
 */
export interface WorldRepoContribution {
  schemaVersion: "1.0";
  universe: UniverseSpec;
  creatures: AtlasCreatureSpec[];
  arcaneaVariants?: ArcaneaVariantSpec[];
  promptPacks?: PromptPack[];
  contributor?: {
    handle: string;
    githubUrl?: string;
  };
  reviewStatus: "pending" | "approved" | "rejected";
  curatorNotes?: string;
}
