// Creature Atlas — barrel export.
//
// The Atlas catalogs creatures from fictional universes alongside Arcanea's
// original-variant reinterpretations. Lore spec: `.arcanea/lore/atlas/`

export * from "./types.js";

// Avatar: The Last Airbender (vertical slice — the first contributed universe)
export { avatarUniverse } from "./universes/avatar.js";
export { avatarCreatures, AVATAR_CREATURES } from "./creatures/avatar.js";
export { avatarArcaneaVariants, AVATAR_ARCANEA_VARIANTS } from "./arcanea-variants/avatar.js";

/** All catalogued universes. Add new universe exports here as they're approved. */
export const ALL_CATALOGUED_UNIVERSES = ["avatar-the-last-airbender"] as const;
export type CataloguedUniverseId = (typeof ALL_CATALOGUED_UNIVERSES)[number];
