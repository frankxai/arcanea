/**
 * Arcanea Website Image Requirements Map
 * Maps every page to its visual image needs based on design system
 *
 * Evaluates: Which images fit which page, hero vs gallery vs background
 */

export interface PageImageRequirement {
  page: string;
  url: string;
  imageType:
    | "hero"
    | "gallery"
    | "avatar"
    | "background"
    | "illustration"
    | "banner";
  placement: "header" | "hero" | "card" | "sidebar" | "footer" | "section";
  aspectRatio: "1:1" | "16:9" | "4:3" | "3:2" | "2:1" | "9:16";
  quality: "hero" | "standard" | "thumbnail";
  mood: string[];
  elements: string[];
  colorPalette?: string[];
  priority: 1 | 2 | 3; // 1 = critical, 2 = important, 3 = nice to have
}

export const WEBSITE_IMAGE_REQUIREMENTS: PageImageRequirement[] = [
  // ═══════════════════════════════════════════════════════════════
  // CORE PAGES - Highest Priority
  // ═══════════════════════════════════════════════════════════════

  {
    page: "Home",
    url: "/",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "16:9",
    quality: "hero",
    mood: ["majestic", "cosmic", "welcoming", "powerful"],
    elements: ["universe", "gods", "light", "gateway"],
    colorPalette: ["violet", "gold", "void"],
    priority: 1,
  },
  {
    page: "About",
    url: "/about",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "16:9",
    quality: "hero",
    mood: ["grand", "mystical", "historical"],
    elements: ["luminors", "wisdom", "lore"],
    colorPalette: ["gold", "violet"],
    priority: 1,
  },

  // ═══════════════════════════════════════════════════════════════
  // GUARDIAN PAGES - Critical for identity
  // ═══════════════════════════════════════════════════════════════

  {
    page: "Guardians List",
    url: "/lore/guardians",
    imageType: "gallery",
    placement: "card",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["divine", "powerful", "individual"],
    elements: ["guardian-portrait", "godbeast", "element"],
    colorPalette: ["varies-by-guardian"],
    priority: 1,
  },
  {
    page: "Lyssandria (Foundation - 174Hz)",
    url: "/lore/guardians/lyssandria",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["earthy", "ancient", "wise", "rooted"],
    elements: ["tree-goddess", "roots", "earth", "forest"],
    colorPalette: ["earth", "green", "brown", "gold"],
    priority: 1,
  },
  {
    page: "Draconia (Fire - 396Hz)",
    url: "/lore/guardians/draconia",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["fierce", "powerful", "majestic", "fiery"],
    elements: ["dragon", "fire", "wings", "power"],
    colorPalette: ["fire", "red", "gold", "violet"],
    priority: 1,
  },
  {
    page: "Alera (Voice - 528Hz)",
    url: "/lore/guardians/alera",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["melodic", "expressive", "artistic"],
    elements: ["spirit-animal", "music", "sound", "otome"],
    colorPalette: ["fire", "wind", "crystal"],
    priority: 1,
  },
  {
    page: "Elara (Shift - 852Hz)",
    url: "/lore/guardians/elara",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["shifting", "transformation", "perspective", "ethereal"],
    elements: ["unicorn", "transformation", "light"],
    colorPalette: ["wind", "void", "crystal"],
    priority: 1,
  },
  {
    page: "Lyria (Sight - 639Hz)",
    url: "/lore/guardians/lyria",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["intuitive", "visionary", "mystical"],
    elements: ["vision", "sight", "intuition"],
    colorPalette: ["water", "void", "crystal"],
    priority: 1,
  },
  {
    page: "Maylinn (Heart - 417Hz)",
    url: "/lore/guardians/maylinn",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["healing", "loving", "compassionate"],
    elements: ["deer", "laeylinn", "heart", "wind"],
    colorPalette: ["wind", "green", "crystal"],
    priority: 1,
  },
  {
    page: "Leyla (Flow - 285Hz)",
    url: "/lore/guardians/leyla",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["fluid", "creative", "emotional"],
    elements: ["water", "phoenix", "veloura", "creativity"],
    colorPalette: ["water", "crystal", "fire"],
    priority: 1,
  },
  {
    page: "Aiyami (Crown - 741Hz)",
    url: "/lore/guardians/aiyami",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["enlightened", "royal", "radiant"],
    elements: ["sol", "sun", "crown", "light"],
    colorPalette: ["fire", "light", "gold"],
    priority: 1,
  },
  {
    page: "Ino (Unity - 963Hz)",
    url: "/lore/guardians/ino",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["unified", "connected", "partnership"],
    elements: ["kyuro", "partnership", "connection"],
    colorPalette: ["all-elements"],
    priority: 1,
  },
  {
    page: "Shinkami (Source - 1111Hz)",
    url: "/lore/guardians/shinkami",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["meta", "transcendent", "void", "cosmic"],
    elements: ["amaterasu", "void", "source", "spirit"],
    colorPalette: ["void", "spirit", "gold"],
    priority: 1,
  },

  // ═══════════════════════════════════════════════════════════════
  // LORE & ENCYCLOPEDIA
  // ═══════════════════════════════════════════════════════════════

  {
    page: "Lore Overview",
    url: "/lore",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "16:9",
    quality: "hero",
    mood: ["mystical", "ancient", "grand"],
    elements: ["universe", "cosmic", "mythology"],
    colorPalette: ["void", "violet", "gold"],
    priority: 2,
  },
  {
    page: "Gates",
    url: "/lore/gates",
    imageType: "illustration",
    placement: "section",
    aspectRatio: "16:9",
    quality: "standard",
    mood: ["transformative", "ascending"],
    elements: ["gate", "frequency", "transformation"],
    colorPalette: ["varies-by-gate"],
    priority: 2,
  },
  {
    page: "Elements",
    url: "/lore/elements",
    imageType: "illustration",
    placement: "section",
    aspectRatio: "4:3",
    quality: "standard",
    mood: ["elemental", "fundamental"],
    elements: ["fire", "water", "earth", "wind", "void"],
    colorPalette: ["varies-by-element"],
    priority: 2,
  },
  {
    page: "Godbeasts",
    url: "/lore/godbeasts",
    imageType: "gallery",
    placement: "card",
    aspectRatio: "1:1",
    quality: "hero",
    mood: ["powerful", "mystical", "companion"],
    elements: ["godbeast", "guardian-bond"],
    colorPalette: ["varies-by-godbeast"],
    priority: 2,
  },
  {
    page: "Wisdoms",
    url: "/lore/wisdoms",
    imageType: "illustration",
    placement: "section",
    aspectRatio: "16:9",
    quality: "standard",
    mood: ["wise", "philosophical"],
    elements: ["wisdom", "knowledge"],
    colorPalette: ["gold", "violet"],
    priority: 2,
  },
  {
    page: "Malachar",
    url: "/lore/malachar",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["dark", "tragic", "dangerous"],
    elements: ["dark-lord", "shadow", "corruption"],
    colorPalette: ["shadow", "void", "red"],
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════════
  // ACADEMY & LEARNING
  // ═══════════════════════════════════════════════════════════════

  {
    page: "Academy",
    url: "/academy",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "16:9",
    quality: "hero",
    mood: ["educational", "transformative", "grand"],
    elements: ["temple", "learning", "ascension"],
    colorPalette: ["violet", "gold", "crystal"],
    priority: 2,
  },
  {
    page: "Gate Quiz",
    url: "/academy/gate-quiz",
    imageType: "illustration",
    placement: "section",
    aspectRatio: "16:9",
    quality: "standard",
    mood: ["quiz", "interactive", "discovering"],
    elements: ["gate", "discovery"],
    colorPalette: ["varies-by-gate"],
    priority: 2,
  },
  {
    page: "Academy Ranks",
    url: "/academy/ranks",
    imageType: "illustration",
    placement: "section",
    aspectRatio: "2:1",
    quality: "standard",
    mood: ["progressive", "achievement"],
    elements: ["rank", "advancement"],
    colorPalette: ["gold", "violet"],
    priority: 2,
  },
  {
    page: "Academy Houses",
    url: "/academy/houses",
    imageType: "gallery",
    placement: "card",
    aspectRatio: "4:3",
    quality: "standard",
    mood: ["house", "community", "identity"],
    elements: ["house", "element"],
    colorPalette: ["varies-by-house"],
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════════
  // LIBRARY & CONTENT
  // ═══════════════════════════════════════════════════════════════

  {
    page: "Library",
    url: "/library",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "16:9",
    quality: "hero",
    mood: ["knowledge", "ancient", "scholarly"],
    elements: ["books", "archives", "wisdom"],
    colorPalette: ["brown", "gold", "void"],
    priority: 2,
  },
  {
    page: "Library Codex",
    url: "/library/codex",
    imageType: "illustration",
    placement: "section",
    aspectRatio: "3:2",
    quality: "standard",
    mood: ["codex", "ancient-text"],
    elements: ["manuscript", "text"],
    colorPalette: ["brown", "gold"],
    priority: 3,
  },
  {
    page: "Library Graph",
    url: "/library/graph",
    imageType: "illustration",
    placement: "section",
    aspectRatio: "16:9",
    quality: "standard",
    mood: ["network", "connected", "knowledge-graph"],
    elements: ["nodes", "connections"],
    colorPalette: ["violet", "crystal"],
    priority: 3,
  },

  // ═══════════════════════════════════════════════════════════════
  // INTERACTIVE FEATURES
  // ═══════════════════════════════════════════════════════════════

  {
    page: "Chat",
    url: "/chat",
    imageType: "avatar",
    placement: "sidebar",
    aspectRatio: "1:1",
    quality: "standard",
    mood: ["conversational", "engaging"],
    elements: ["luminor", "avatar"],
    colorPalette: ["varies-by-luminor"],
    priority: 2,
  },
  {
    page: "Studio",
    url: "/studio",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "16:9",
    quality: "hero",
    mood: ["creative", "productive", "workspace"],
    elements: ["workspace", "tools", "creation"],
    colorPalette: ["violet", "crystal"],
    priority: 2,
  },
  {
    page: "Gallery",
    url: "/gallery",
    imageType: "gallery",
    placement: "card",
    aspectRatio: "3:2",
    quality: "standard",
    mood: ["visual", "showcase"],
    elements: ["art", "creations"],
    colorPalette: ["varies"],
    priority: 2,
  },
  {
    page: "Bestiary",
    url: "/bestiary",
    imageType: "gallery",
    placement: "card",
    aspectRatio: "3:2",
    quality: "standard",
    mood: ["creatures", "mystical", "bestiary"],
    elements: ["creatures", "beasts"],
    colorPalette: ["varies"],
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════════
  // COMMUNITY & BLOG
  // ═══════════════════════════════════════════════════════════════

  {
    page: "Blog",
    url: "/blog",
    imageType: "banner",
    placement: "header",
    aspectRatio: "2:1",
    quality: "standard",
    mood: ["blog", "article", "content"],
    colorPalette: ["varies"],
    priority: 3,
  },
  {
    page: "Community",
    url: "/community",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "16:9",
    quality: "hero",
    mood: ["community", "together", "welcoming"],
    elements: ["people", "together", "gather"],
    colorPalette: ["violet", "crystal"],
    priority: 2,
  },
  {
    page: "Luminors",
    url: "/luminors",
    imageType: "gallery",
    placement: "card",
    aspectRatio: "3:2",
    quality: "hero",
    mood: ["ai-companion", "personal"],
    elements: ["ai", "companion", "personality"],
    colorPalette: ["varies-by-luminor"],
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════════
  // TOOLS & PROMPTS
  // ═══════════════════════════════════════════════════════════════

  {
    page: "Skills",
    url: "/skills",
    imageType: "illustration",
    placement: "section",
    aspectRatio: "4:3",
    quality: "standard",
    mood: ["skill", "ability", "capability"],
    elements: ["skill", "tool"],
    colorPalette: ["violet", "crystal"],
    priority: 3,
  },
  {
    page: "Prompt Books",
    url: "/prompt-books",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "16:9",
    quality: "hero",
    mood: ["prompt", "guide", "instruction"],
    elements: ["book", "prompt", "guide"],
    colorPalette: ["gold", "violet"],
    priority: 2,
  },
  {
    page: "Hub Tools",
    url: "/hub/tools",
    imageType: "illustration",
    placement: "card",
    aspectRatio: "4:3",
    quality: "standard",
    mood: ["tool", "utility"],
    elements: ["tool", "utility"],
    colorPalette: ["violet", "crystal"],
    priority: 3,
  },
  {
    page: "Hub Guides",
    url: "/hub/guides",
    imageType: "illustration",
    placement: "card",
    aspectRatio: "16:9",
    quality: "standard",
    mood: ["guide", "tutorial"],
    elements: ["guide", "instruction"],
    colorPalette: ["violet", "gold"],
    priority: 3,
  },

  // ═══════════════════════════════════════════════════════════════
  // RECORDS (Video content)
  // ═══════════════════════════════════════════════════════════════

  {
    page: "Records",
    url: "/records",
    imageType: "hero",
    placement: "hero",
    aspectRatio: "16:9",
    quality: "hero",
    mood: ["video", "content", "showcase"],
    elements: ["video", "content"],
    colorPalette: ["varies"],
    priority: 2,
  },
];

/**
 * Get all requirements for a specific image type
 */
export function getRequirementsByType(
  type: PageImageRequirement["imageType"],
): PageImageRequirement[] {
  return WEBSITE_IMAGE_REQUIREMENTS.filter((r) => r.imageType === type);
}

/**
 * Get all requirements for a specific placement
 */
export function getRequirementsByPlacement(
  placement: PageImageRequirement["placement"],
): PageImageRequirement[] {
  return WEBSITE_IMAGE_REQUIREMENTS.filter((r) => r.placement === placement);
}

/**
 * Get priority 1 (critical) requirements
 */
export function getCriticalRequirements(): PageImageRequirement[] {
  return WEBSITE_IMAGE_REQUIREMENTS.filter((r) => r.priority === 1);
}
