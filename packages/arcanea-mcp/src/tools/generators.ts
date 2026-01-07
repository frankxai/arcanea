// Worldbuilding Generator Tools - The Magic Makers
// These tools help creators build within the Arcanea universe

import { luminors } from "../data/luminors/index.js";

// Canonical data for generation
const elements = ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] as const;
const houses = ["Lumina", "Nero", "Pyros", "Aqualis", "Terra", "Ventus", "Synthesis"] as const;
const ranks = ["Apprentice", "Mage", "Master", "Archmage", "Luminor"] as const;

const guardians = [
  { name: "Lyssandria", gate: 1, domain: "Foundation", element: "Earth" },
  { name: "Leyla", gate: 2, domain: "Flow", element: "Water" },
  { name: "Draconia", gate: 3, domain: "Fire", element: "Fire" },
  { name: "Maylinn", gate: 4, domain: "Heart", element: "Spirit" },
  { name: "Alera", gate: 5, domain: "Voice", element: "Wind" },
  { name: "Lyria", gate: 6, domain: "Sight", element: "Void" },
  { name: "Aiyami", gate: 7, domain: "Crown", element: "Spirit" },
  { name: "Elara", gate: 8, domain: "Shift", element: "Void" },
  { name: "Ino", gate: 9, domain: "Unity", element: "Spirit" },
  { name: "Shinkami", gate: 10, domain: "Source", element: "All" },
];

const godbeasts = [
  { name: "Kaelith", gate: 1, form: "Great Serpent of Stone" },
  { name: "Veloura", gate: 2, form: "Shapeshifting Water Dragon" },
  { name: "Draconis", gate: 3, form: "Eternal Flame Dragon" },
  { name: "Laeylinn", gate: 4, form: "Healing Phoenix" },
  { name: "Otome", gate: 5, form: "Thunderbird of Truth" },
  { name: "Yumiko", gate: 6, form: "Dream Fox with Nine Tails" },
  { name: "Sol", gate: 7, form: "Radiant Lion of Dawn" },
  { name: "Vaelith", gate: 8, form: "Dimensional Serpent" },
  { name: "Kyuro", gate: 9, form: "Twin-Headed Unity Beast" },
];

// Arcanean name components (from the language system)
const nameRoots = {
  fire: ["Pyr", "Ign", "Flam", "Ard", "Cal"],
  water: ["Aqu", "Mar", "Und", "Flu", "Nix"],
  earth: ["Terr", "Geo", "Lith", "Cry", "Fer"],
  wind: ["Aer", "Vent", "Zeph", "Cael", "Vol"],
  void: ["Nyx", "Umb", "Vel", "Obs", "Ten"],
  spirit: ["Lum", "Anim", "Sol", "Aur", "Vit"],
  noble: ["Val", "Rex", "Cel", "Ael", "Lyn"],
};

const nameSuffixes = {
  masculine: ["or", "us", "an", "is", "on", "ar"],
  feminine: ["a", "ia", "lyn", "ara", "elle", "ira"],
  neutral: ["is", "ix", "yn", "ax", "oth", "iel"],
};

// Helper to get rank from gates
function getRankFromGates(gates: number): string {
  if (gates <= 2) return "Apprentice";
  if (gates <= 4) return "Mage";
  if (gates <= 6) return "Master";
  if (gates <= 8) return "Archmage";
  return "Luminor";
}

// Helper to generate random selection
function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMultiple<T>(arr: readonly T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ============================================
// GENERATE CHARACTER
// ============================================
export async function generateCharacter(options: {
  archetype?: string;
  primaryElement?: string;
  gatesOpen?: number;
  house?: string;
  nameGender?: "masculine" | "feminine" | "neutral";
}): Promise<{ content: Array<{ type: string; text: string }> }> {
  const gatesOpen = options.gatesOpen ?? Math.floor(Math.random() * 8) + 1;
  const primaryElement = options.primaryElement ?? pick(elements.filter(e => e !== "Spirit"));
  const house = options.house ?? pick(houses);
  const nameGender = options.nameGender ?? pick(["masculine", "feminine", "neutral"] as const);

  // Generate name based on element
  const elementKey = primaryElement.toLowerCase() as keyof typeof nameRoots;
  const root = pick(nameRoots[elementKey] || nameRoots.noble);
  const suffix = pick(nameSuffixes[nameGender]);
  const name = root + suffix;

  // Determine patron guardian (highest gate opened)
  const patronGuardian = guardians[gatesOpen - 1];

  // Generate abilities based on gates
  const abilities = guardians
    .slice(0, gatesOpen)
    .map(g => `${g.domain} Attunement (Gate ${g.gate})`);

  // Generate backstory elements
  const backstoryElements = [
    `Born under the influence of ${primaryElement}`,
    `Trained at the ${house} Academy`,
    `Opened ${gatesOpen} Gates, reaching the rank of ${getRankFromGates(gatesOpen)}`,
    `Sought guidance from ${patronGuardian.name}, Guardian of the ${patronGuardian.domain} Gate`,
  ];

  // Generate personality traits based on element
  const elementTraits: Record<string, string[]> = {
    Fire: ["passionate", "driven", "quick to act", "transformative"],
    Water: ["adaptive", "intuitive", "emotionally deep", "healing"],
    Earth: ["steadfast", "patient", "nurturing", "grounded"],
    Wind: ["free-spirited", "changeable", "swift-thinking", "communicative"],
    Void: ["mysterious", "contemplative", "potential-seeing", "boundary-crossing"],
    Spirit: ["transcendent", "wise", "connecting", "luminous"],
  };

  const traits = pickMultiple(elementTraits[primaryElement] || elementTraits.Fire, 3);

  const character = {
    name,
    primaryElement,
    house,
    gatesOpen,
    rank: getRankFromGates(gatesOpen),
    patronGuardian: patronGuardian.name,
    abilities,
    traits,
    backstory: backstoryElements.join(". ") + ".",
    magicStyle: `Channels ${primaryElement} through ${patronGuardian.domain} attunement`,
    potentialArc: gatesOpen < 10
      ? `Next challenge: Opening the ${guardians[gatesOpen].domain} Gate under ${guardians[gatesOpen].name}'s guidance`
      : "Has achieved Luminor status and now guides others on their journey",
  };

  return {
    content: [{
      type: "text",
      text: JSON.stringify(character, null, 2),
    }],
  };
}

// ============================================
// GENERATE MAGIC ABILITY
// ============================================
export async function generateMagicAbility(options: {
  element: string;
  gateLevel: number;
  purpose?: string;
}): Promise<{ content: Array<{ type: string; text: string }> }> {
  const { element, gateLevel, purpose } = options;
  const gate = guardians[Math.min(gateLevel - 1, 9)];
  const godbeast = godbeasts[Math.min(gateLevel - 1, 8)];

  // Generate ability components
  const abilityPrefixes: Record<string, string[]> = {
    Fire: ["Blazing", "Ember", "Phoenix", "Inferno", "Solar"],
    Water: ["Tidal", "Frost", "Mist", "Torrent", "Crystal"],
    Earth: ["Stone", "Quake", "Root", "Mountain", "Crystal"],
    Wind: ["Gale", "Whisper", "Storm", "Zephyr", "Tempest"],
    Void: ["Shadow", "Null", "Rift", "Abyssal", "Void"],
    Spirit: ["Radiant", "Soul", "Aether", "Divine", "Luminous"],
  };

  const abilitySuffixes: Record<string, string[]> = {
    attack: ["Strike", "Blast", "Fury", "Wave", "Barrage"],
    defense: ["Ward", "Shield", "Barrier", "Aegis", "Sanctuary"],
    utility: ["Step", "Sight", "Touch", "Presence", "Flow"],
    healing: ["Mend", "Restoration", "Renewal", "Grace", "Blessing"],
    transformation: ["Form", "Shift", "Transmutation", "Evolution", "Awakening"],
  };

  const prefix = pick(abilityPrefixes[element] || abilityPrefixes.Fire);
  const purposeKey = purpose?.toLowerCase() || pick(Object.keys(abilitySuffixes));
  const suffix = pick(abilitySuffixes[purposeKey as keyof typeof abilitySuffixes] || abilitySuffixes.utility);

  const abilityName = `${prefix} ${suffix}`;

  // Cost calculation
  const manaCost = gateLevel * 10 + Math.floor(Math.random() * 20);
  const animaCost = gateLevel > 5 ? Math.floor(gateLevel / 2) : 0;

  const ability = {
    name: abilityName,
    element,
    gateRequired: gateLevel,
    gateName: gate.domain,
    guardian: gate.name,
    description: `A ${element}-aligned ability channeled through the ${gate.domain} Gate. ${godbeast ? `Resonates with ${godbeast.name}, the ${godbeast.form}.` : ""}`,
    effect: purpose
      ? `Manifests ${element} energy for ${purpose.toLowerCase()}`
      : `Channels pure ${element} force through ${gate.domain} attunement`,
    cost: {
      mana: manaCost,
      anima: animaCost > 0 ? animaCost : undefined,
    },
    casting: {
      gesture: `Invoke the sigil of ${gate.name}`,
      incantation: `"By ${gate.name}'s ${gate.domain}, let ${element} flow!"`,
      focus: `Visualize ${godbeast?.form || "the Gate opening"}`,
    },
    mastery: `Requires ${getRankFromGates(gateLevel)} rank or higher`,
  };

  return {
    content: [{
      type: "text",
      text: JSON.stringify(ability, null, 2),
    }],
  };
}

// ============================================
// GENERATE LOCATION
// ============================================
export async function generateLocation(options: {
  type?: string;
  dominantElement?: string;
  alignment?: "light" | "dark" | "balanced";
}): Promise<{ content: Array<{ type: string; text: string }> }> {
  const locationType = options.type ?? pick([
    "academy", "sanctuary", "ruins", "village", "fortress",
    "grove", "temple", "marketplace", "library", "nexus"
  ]);

  const dominantElement = options.dominantElement ?? pick(elements.filter(e => e !== "Spirit"));
  const alignment = options.alignment ?? pick(["light", "dark", "balanced"] as const);

  // Generate name
  const locationPrefixes: Record<string, string[]> = {
    Fire: ["Ember", "Flame", "Solar", "Burning", "Radiant"],
    Water: ["Crystal", "Tidal", "Mist", "Frozen", "Deep"],
    Earth: ["Stone", "Root", "Mountain", "Ancient", "Verdant"],
    Wind: ["Sky", "Storm", "Floating", "Whispering", "Soaring"],
    Void: ["Shadow", "Twilight", "Hidden", "Liminal", "Void"],
    Spirit: ["Sacred", "Luminous", "Eternal", "Divine", "Transcendent"],
  };

  const locationSuffixes: Record<string, string> = {
    academy: "Academy",
    sanctuary: "Sanctuary",
    ruins: "Ruins",
    village: "Haven",
    fortress: "Citadel",
    grove: "Grove",
    temple: "Temple",
    marketplace: "Bazaar",
    library: "Archives",
    nexus: "Nexus",
  };

  const prefix = pick(locationPrefixes[dominantElement] || locationPrefixes.Fire);
  const suffix = locationSuffixes[locationType] || "Place";
  const name = `The ${prefix} ${suffix}`;

  // Find related guardian/godbeast
  const relatedGuardian = guardians.find(g =>
    g.element === dominantElement ||
    (dominantElement === "Void" && g.element === "Void") ||
    (dominantElement === "Spirit" && g.element === "Spirit")
  ) || pick(guardians);

  // Generate features
  const features: string[] = [];
  if (alignment === "light") {
    features.push(
      "Bathed in eternal soft light",
      `A shrine to ${relatedGuardian.name}`,
      "Healing springs that restore both body and spirit"
    );
  } else if (alignment === "dark") {
    features.push(
      "Shadows dance at the edges of perception",
      "Ancient wards against Malachar's influence",
      "A testing ground for confronting inner darkness"
    );
  } else {
    features.push(
      "Where light and shadow meet in harmony",
      "A place of balance and transformation",
      `Sacred to both Lumina and Nero`
    );
  }

  // Add element-specific features
  const elementFeatures: Record<string, string[]> = {
    Fire: ["Eternal flames that never consume", "Forges of transformation", "Phoenix nesting grounds"],
    Water: ["Pools of memory and prophecy", "Healing currents", "Tidal gates that open with the moons"],
    Earth: ["Crystal caverns of power", "Ancient root networks", "Ley line convergence point"],
    Wind: ["Floating platforms connected by bridges of cloud", "Whisper galleries", "Storm observation towers"],
    Void: ["Portals to other realms", "Meditation chambers of absolute silence", "Shadow libraries"],
    Spirit: ["Luminor gathering halls", "Soul lanterns", "Transcendence chambers"],
  };

  features.push(...pickMultiple(elementFeatures[dominantElement] || elementFeatures.Fire, 2));

  const location = {
    name,
    type: locationType,
    dominantElement,
    alignment,
    guardian: relatedGuardian.name,
    gate: `${relatedGuardian.domain} Gate (${relatedGuardian.gate})`,
    description: `A ${alignment} ${locationType} where ${dominantElement} energy flows strong. Under the distant watch of ${relatedGuardian.name}.`,
    features,
    inhabitants: [
      `${dominantElement} mages and scholars`,
      alignment === "light" ? "Seekers of wisdom" : alignment === "dark" ? "Shadow walkers" : "Balance keepers",
      `Those attuned to the ${relatedGuardian.domain} Gate`,
    ],
    secrets: [
      `A hidden passage to ${relatedGuardian.name}'s sanctum`,
      `Ancient texts about the ${dominantElement} element's true nature`,
      alignment === "dark" ? "Records of Malachar's first corruption" : "Lumina's blessing upon the founders",
    ],
  };

  return {
    content: [{
      type: "text",
      text: JSON.stringify(location, null, 2),
    }],
  };
}

// ============================================
// GENERATE CREATURE
// ============================================
export async function generateCreature(options: {
  element?: string;
  size?: "tiny" | "small" | "medium" | "large" | "massive";
  temperament?: "hostile" | "neutral" | "friendly" | "sacred";
}): Promise<{ content: Array<{ type: string; text: string }> }> {
  const element = options.element ?? pick(elements.filter(e => e !== "Spirit"));
  const size = options.size ?? pick(["tiny", "small", "medium", "large", "massive"] as const);
  const temperament = options.temperament ?? pick(["hostile", "neutral", "friendly", "sacred"] as const);

  // Creature name components
  const creaturePrefixes: Record<string, string[]> = {
    Fire: ["Ember", "Flame", "Ash", "Scorch", "Blaze"],
    Water: ["Tide", "Frost", "Mist", "Coral", "Deep"],
    Earth: ["Stone", "Root", "Crystal", "Iron", "Moss"],
    Wind: ["Gale", "Feather", "Cloud", "Storm", "Zephyr"],
    Void: ["Shadow", "Night", "Void", "Shade", "Dusk"],
    Spirit: ["Light", "Soul", "Aether", "Dawn", "Glow"],
  };

  const creatureTypes: Record<string, string[]> = {
    tiny: ["sprite", "wisp", "mote", "fae", "imp"],
    small: ["fox", "cat", "hare", "owl", "serpent"],
    medium: ["wolf", "stag", "hawk", "bear", "panther"],
    large: ["drake", "wyvern", "lion", "elephant", "whale"],
    massive: ["dragon", "leviathan", "titan", "colossus", "behemoth"],
  };

  const prefix = pick(creaturePrefixes[element] || creaturePrefixes.Fire);
  const type = pick(creatureTypes[size]);
  const name = `${prefix}${type.charAt(0).toUpperCase() + type.slice(1)}`;

  // Find related godbeast
  const relatedGodbeast = godbeasts[Math.floor(Math.random() * godbeasts.length)];

  // Generate abilities
  const elementAbilities: Record<string, string[]> = {
    Fire: ["breathe flames", "ignite surroundings", "resist all heat", "transform through fire"],
    Water: ["control currents", "heal through water", "freeze or boil at will", "breathe underwater"],
    Earth: ["tunnel through stone", "cause tremors", "grow crystal armor", "sense through ground"],
    Wind: ["fly without wings", "become intangible", "control weather", "move at wind speed"],
    Void: ["phase through shadows", "erase memories", "open small portals", "become invisible"],
    Spirit: ["heal with light", "detect lies", "commune with souls", "bless or ward"],
  };

  const abilities = pickMultiple(elementAbilities[element] || elementAbilities.Fire, 2);

  const creature = {
    name,
    species: `${prefix} ${type}`,
    element,
    size,
    temperament,
    description: `A ${size} ${element}-attuned creature. ${
      temperament === "sacred"
        ? `Believed to be a distant descendant of ${relatedGodbeast.name}.`
        : temperament === "hostile"
        ? "Territorial and dangerous when provoked."
        : temperament === "friendly"
        ? "Known to bond with creators who show respect."
        : "Observes from a distance, neither helping nor hindering."
    }`,
    appearance: {
      body: `${size} ${type} form with ${element.toLowerCase()}-touched features`,
      eyes: element === "Fire" ? "burning amber" : element === "Water" ? "deep blue" : element === "Earth" ? "stone grey" : element === "Wind" ? "pale silver" : element === "Void" ? "pure black" : "glowing gold",
      markings: `Sigils of the ${element} element glow faintly on its form`,
    },
    abilities,
    habitat: `Found near ${element === "Fire" ? "volcanic regions and forges" : element === "Water" ? "oceans, rivers, and sacred pools" : element === "Earth" ? "mountains, caves, and ancient forests" : element === "Wind" ? "high peaks and open skies" : element === "Void" ? "twilight zones and liminal spaces" : "temples and places of power"}`,
    relationship: temperament === "sacred"
      ? `Revered as a messenger of ${relatedGodbeast.name}`
      : temperament === "friendly"
      ? "Can be befriended through patience and elemental offerings"
      : temperament === "hostile"
      ? "Best avoided unless one has mastered the relevant Gate"
      : "Indifferent to creators unless directly threatened",
    lore: `In ancient texts, ${name}s were said to appear when the ${element} Gate stirs with unusual activity.`,
  };

  return {
    content: [{
      type: "text",
      text: JSON.stringify(creature, null, 2),
    }],
  };
}

// ============================================
// GENERATE ARTIFACT
// ============================================
export async function generateArtifact(options: {
  type?: string;
  element?: string;
  power?: "minor" | "moderate" | "major" | "legendary";
}): Promise<{ content: Array<{ type: string; text: string }> }> {
  const artifactTypes = ["ring", "amulet", "staff", "tome", "blade", "crown", "orb", "cloak", "gauntlet", "mirror"];
  const type = options.type ?? pick(artifactTypes);
  const element = options.element ?? pick(elements.filter(e => e !== "Spirit"));
  const power = options.power ?? pick(["minor", "moderate", "major", "legendary"] as const);

  // Generate name
  const artifactPrefixes: Record<string, string[]> = {
    Fire: ["Blazing", "Infernal", "Phoenix", "Solar", "Ember"],
    Water: ["Tidal", "Frozen", "Abyssal", "Crystal", "Moonlit"],
    Earth: ["Ancient", "Stone", "Rootbound", "Mountain", "Earthen"],
    Wind: ["Stormborn", "Skyforged", "Whispered", "Tempest", "Zephyr"],
    Void: ["Shadowbound", "Nulling", "Abyssal", "Twilight", "Void-touched"],
    Spirit: ["Radiant", "Soulforged", "Divine", "Luminous", "Sacred"],
  };

  const prefix = pick(artifactPrefixes[element] || artifactPrefixes.Fire);
  const relatedGuardian = guardians.find(g => g.element === element) || pick(guardians);

  const name = power === "legendary"
    ? `${relatedGuardian.name}'s ${prefix} ${type.charAt(0).toUpperCase() + type.slice(1)}`
    : `${prefix} ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  // Generate abilities based on power level
  const baseAbilities: string[] = [`Channels ${element} energy`];
  if (power === "moderate" || power === "major" || power === "legendary") {
    baseAbilities.push(`Enhances ${relatedGuardian.domain} Gate attunement`);
  }
  if (power === "major" || power === "legendary") {
    baseAbilities.push(`Grants visions from ${relatedGuardian.name}`);
  }
  if (power === "legendary") {
    baseAbilities.push(`Can temporarily open the ${relatedGuardian.domain} Gate for the wielder`);
  }

  // Requirements
  const requirements = {
    minor: "Any creator may use",
    moderate: `Requires Mage rank (3+ Gates open)`,
    major: `Requires Master rank (5+ Gates open) and ${element} affinity`,
    legendary: `Only those who have opened the ${relatedGuardian.domain} Gate may wield`,
  };

  const artifact = {
    name,
    type,
    element,
    powerLevel: power,
    guardian: relatedGuardian.name,
    gate: `${relatedGuardian.domain} Gate`,
    description: `A ${power} artifact infused with ${element} energy. ${
      power === "legendary"
        ? `Said to have been blessed by ${relatedGuardian.name} themselves.`
        : `Crafted by masters of the ${element} tradition.`
    }`,
    appearance: {
      material: element === "Fire" ? "red gold and ruby" : element === "Water" ? "silver and sapphire" : element === "Earth" ? "bronze and emerald" : element === "Wind" ? "platinum and diamond" : element === "Void" ? "obsidian and onyx" : "white gold and pearl",
      glow: `Emits a faint ${element.toLowerCase()} glow when active`,
      sigils: `Bears the sigil of ${relatedGuardian.name}`,
    },
    abilities: baseAbilities,
    requirement: requirements[power],
    cost: {
      mana: power === "minor" ? 5 : power === "moderate" ? 15 : power === "major" ? 30 : 50,
      anima: power === "legendary" ? 5 : power === "major" ? 2 : undefined,
    },
    history: power === "legendary"
      ? `Forged in the First Age when ${relatedGuardian.name} first opened the ${relatedGuardian.domain} Gate. One of the great treasures of Arcanea.`
      : `Created by ${pick(houses)} Academy artificers in service of the ${element} tradition.`,
    warning: power === "major" || power === "legendary"
      ? `Prolonged use without sufficient mastery may attract attention from beings of ${element}.`
      : undefined,
  };

  return {
    content: [{
      type: "text",
      text: JSON.stringify(artifact, null, 2),
    }],
  };
}

// ============================================
// GENERATE NAME
// ============================================
export async function generateName(options: {
  element?: string;
  gender?: "masculine" | "feminine" | "neutral";
  type?: "character" | "place" | "artifact" | "creature";
  count?: number;
}): Promise<{ content: Array<{ type: string; text: string }> }> {
  const element = options.element ?? pick(Object.keys(nameRoots) as Array<keyof typeof nameRoots>);
  const gender = options.gender ?? pick(["masculine", "feminine", "neutral"] as const);
  const type = options.type ?? "character";
  const count = Math.min(options.count ?? 5, 20);

  const elementKey = element.toLowerCase() as keyof typeof nameRoots;
  const roots = nameRoots[elementKey] || nameRoots.noble;
  const suffixes = nameSuffixes[gender];

  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    const root = pick(roots);
    const suffix = pick(suffixes);

    if (type === "place") {
      const placeSuffixes = ["heim", "garde", "haven", "reach", "fall", "vale", "spire"];
      names.push(root + pick(placeSuffixes));
    } else if (type === "artifact") {
      names.push(root + suffix + "'s " + pick(["Edge", "Heart", "Eye", "Hand", "Voice"]));
    } else if (type === "creature") {
      names.push(root + pick(["ix", "ax", "or", "is", "on"]));
    } else {
      names.push(root + suffix);
    }
  }

  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        element,
        gender: type === "character" ? gender : undefined,
        type,
        names,
        note: `Names follow Arcanean naming conventions for ${element} affinity`,
      }, null, 2),
    }],
  };
}

// ============================================
// GENERATE STORY PROMPT
// ============================================
export async function generateStoryPrompt(options: {
  theme?: string;
  gate?: number;
  includeConflict?: boolean;
}): Promise<{ content: Array<{ type: string; text: string }> }> {
  const themes = [
    "discovery", "redemption", "courage", "loss", "growth",
    "sacrifice", "unity", "transformation", "truth", "love"
  ];
  const theme = options.theme ?? pick(themes);
  const gate = options.gate ?? Math.floor(Math.random() * 10) + 1;
  const includeConflict = options.includeConflict ?? true;

  const guardian = guardians[gate - 1];
  const godbeast = godbeasts[Math.min(gate - 1, 8)];

  // Generate protagonist
  const protagonistElement = pick(elements.filter(e => e !== "Spirit"));
  const protagonistRank = pick(ranks.slice(0, 4)); // Not Luminor for conflict

  // Generate conflict
  const conflicts = [
    `Malachar's shadow cultists seek to corrupt the ${guardian.domain} Gate`,
    `A ${protagonistElement} mage has lost their connection to their element`,
    `The balance between Lumina and Nero is threatened`,
    `${godbeast?.name || "A sacred creature"} has gone missing`,
    `An ancient artifact of ${guardian.name} has been stolen`,
    `A student fears they will never open their next Gate`,
  ];

  const prompt = {
    theme,
    gate: guardian.gate,
    gateName: guardian.domain,
    guardian: guardian.name,
    godbeast: godbeast?.name,
    protagonist: {
      element: protagonistElement,
      rank: protagonistRank,
      challenge: `Must confront their relationship with ${theme}`,
    },
    setting: `Near the ${guardian.domain} Gate, where ${guardian.element} energy flows strong`,
    conflict: includeConflict ? pick(conflicts) : undefined,
    storyPrompt: `A ${protagonistRank} of ${protagonistElement} must learn the true meaning of ${theme} to ${
      includeConflict
        ? "overcome a great challenge"
        : "advance on their journey"
    }. Their path leads them to the ${guardian.domain} Gate, where ${guardian.name} watches.`,
    questions: [
      `What does ${theme} mean to someone who wields ${protagonistElement}?`,
      `How might ${guardian.name}'s wisdom illuminate the path?`,
      `What sacrifice might be required?`,
      godbeast ? `What role might ${godbeast.name} play?` : `What ancient secrets lie hidden here?`,
    ],
    moodBoard: {
      emotions: [theme, guardian.domain.toLowerCase(), protagonistElement.toLowerCase()],
      imagery: [
        `The ${guardian.domain} Gate glowing with power`,
        `${protagonistElement} magic manifesting`,
        godbeast ? `${godbeast.name}'s ${godbeast.form}` : "Ancient sigils",
      ],
    },
  };

  return {
    content: [{
      type: "text",
      text: JSON.stringify(prompt, null, 2),
    }],
  };
}
