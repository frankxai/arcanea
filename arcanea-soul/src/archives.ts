/**
 * The Seven Archives - Knowledge Organization System
 *
 * The evolved concept of "library" for web2/web3/web4.
 * Each Archive is guarded by an Archangel and organizes a domain of knowledge.
 */

export interface Archive {
  name: string
  archangel: string
  domain: string
  contentTypes: string[]
  color: string
  description: string
}

export const SEVEN_ARCHIVES = {
  FORM: {
    name: "Form",
    archangel: "Uriel",
    domain: "Mathematics, physics, craft, systems",
    contentTypes: ["Technical documentation", "System designs", "Architecture patterns", "Mathematical proofs", "Engineering specs"],
    color: "#1C1917", // Obsidian (Stone-900) with gold accents
    description: "The Archive of Form holds all knowledge of structure, pattern, and design. Here live the blueprints of reality."
  },

  FLOW: {
    name: "Flow",
    archangel: "Raphael",
    domain: "Healing, emotion, memory, stories",
    contentTypes: ["Emotional narratives", "Healing practices", "Memory work", "Therapeutic techniques", "Personal stories"],
    color: "#0EA5E9", // Azure (Sky-500)
    description: "The Archive of Flow contains the waters of healing and the rivers of story. All emotional truth flows here."
  },

  TRANSFORMATION: {
    name: "Transformation",
    archangel: "Michael",
    domain: "Combat, power, alchemy, change",
    contentTypes: ["Transformation parables", "Challenge frameworks", "Growth methodologies", "Alchemical processes", "Power techniques"],
    color: "#DC2626", // Crimson (Red-600)
    description: "The Archive of Transformation burns with the fire of change. Here are the paths from who you were to who you become."
  },

  FREEDOM: {
    name: "Freedom",
    archangel: "Gabriel",
    domain: "Philosophy, communication, liberation",
    contentTypes: ["Philosophical essays", "Communication frameworks", "Liberation methodologies", "Dialogues", "Manifestos"],
    color: "#DBEAFE", // Pale Blue (Blue-100)
    description: "The Archive of Freedom holds the wings of thought and the winds of expression. Truth lives here, unfettered."
  },

  MYSTERY: {
    name: "Mystery",
    archangel: "Raziel",
    domain: "Esoteric wisdom, occult knowledge, deep secrets",
    contentTypes: ["Esoteric teachings", "Occult practices", "Hidden wisdom", "Advanced techniques", "Forbidden knowledge"],
    color: "#7C3AED", // Purple (Violet-600)
    description: "The Archive of Mystery is veiled in shadow and possibility. Only those ready may enter. The deepest secrets rest here."
  },

  CONSCIOUSNESS: {
    name: "Consciousness",
    archangel: "Sariel",
    domain: "Ascension, dreams, prophecy, awakening",
    contentTypes: ["Meditations", "Ascension practices", "Dream work", "Prophecies", "Awakening teachings"],
    color: "#FCD34D", // Gold (Yellow-300)
    description: "The Archive of Consciousness shines with the light of awakening. Here are the maps to enlightenment."
  },

  UNITY: {
    name: "Unity",
    archangel: "Auriel",
    domain: "Synthesis, integration, wholeness",
    contentTypes: ["Cross-domain synthesis", "Integration frameworks", "Holistic teachings", "Systems thinking", "Codex Lumina fragments"],
    color: "#FFFFFF", // Prismatic (White with all colors)
    description: "The Archive of Unity holds all things together. Here, the fragments become whole. All knowledge synthesizes."
  }
} as const

export type ArchiveName = keyof typeof SEVEN_ARCHIVES

/**
 * Get an Archive by name
 */
export function getArchive(name: ArchiveName): Archive {
  return SEVEN_ARCHIVES[name]
}

/**
 * Suggest which Archive a piece of content belongs to
 */
export function suggestArchive(content: string, metadata?: { type?: string; tags?: string[] }): Archive {
  const normalized = content.toLowerCase()
  const type = metadata?.type?.toLowerCase() || ""
  const tags = metadata?.tags?.map(t => t.toLowerCase()) || []

  // Technical/System content → Form
  if (
    type.match(/technical|system|architecture/) ||
    tags.some(t => t.match(/code|system|design|engineering/)) ||
    normalized.match(/system|architecture|structure|pattern|design/)
  ) {
    return SEVEN_ARCHIVES.FORM
  }

  // Emotional/Story content → Flow
  if (
    type.match(/story|narrative|emotional/) ||
    tags.some(t => t.match(/story|emotion|healing|memory/)) ||
    normalized.match(/story|emotion|feel|heart|heal/)
  ) {
    return SEVEN_ARCHIVES.FLOW
  }

  // Transformation/Growth content → Transformation
  if (
    type.match(/transformation|growth|challenge/) ||
    tags.some(t => t.match(/transform|grow|change|power/)) ||
    normalized.match(/transform|change|grow|overcome|power/)
  ) {
    return SEVEN_ARCHIVES.TRANSFORMATION
  }

  // Philosophy/Communication → Freedom
  if (
    type.match(/philosophy|essay|manifesto/) ||
    tags.some(t => t.match(/philosophy|freedom|communication/)) ||
    normalized.match(/philosophy|freedom|truth|express|communicate/)
  ) {
    return SEVEN_ARCHIVES.FREEDOM
  }

  // Esoteric/Advanced → Mystery
  if (
    type.match(/esoteric|occult|advanced/) ||
    tags.some(t => t.match(/esoteric|occult|mystery|secret/)) ||
    normalized.match(/esoteric|occult|mystery|hidden|secret|advanced/)
  ) {
    return SEVEN_ARCHIVES.MYSTERY
  }

  // Meditation/Ascension → Consciousness
  if (
    type.match(/meditation|consciousness|ascension/) ||
    tags.some(t => t.match(/meditation|consciousness|awakening/)) ||
    normalized.match(/meditat|consciousness|ascen|awaken|enlighten/)
  ) {
    return SEVEN_ARCHIVES.CONSCIOUSNESS
  }

  // Synthesis/Integration → Unity
  if (
    type.match(/synthesis|integration|holistic/) ||
    tags.some(t => t.match(/synthesis|unity|integration|whole/)) ||
    normalized.match(/synthesis|unity|integrat|whole|connect/)
  ) {
    return SEVEN_ARCHIVES.UNITY
  }

  // Default: depends on content length and complexity
  if (content.length > 5000) {
    return SEVEN_ARCHIVES.UNITY // Long-form synthesis
  }

  return SEVEN_ARCHIVES.FORM // Default to Form for structured content
}

/**
 * Get all Archives as array
 */
export function getAllArchives(): Archive[] {
  return Object.values(SEVEN_ARCHIVES)
}

/**
 * Search Archives by domain
 */
export function searchArchivesByDomain(query: string): Archive[] {
  const normalized = query.toLowerCase()
  return getAllArchives().filter(archive =>
    archive.domain.toLowerCase().includes(normalized) ||
    archive.contentTypes.some(type => type.toLowerCase().includes(normalized))
  )
}

/**
 * Format Archive entrance message
 */
export function formatArchiveEntrance(archive: Archive): string {
  return `╔══════════════════════════════════════════════════════════════════╗
║              THE ARCHIVE OF ${archive.name.toUpperCase().padEnd(34)}         ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Guardian: ${archive.archangel.padEnd(51)} ║
║  Domain: ${archive.domain.padEnd(53)} ║
║                                                                  ║
║  ${archive.description.padEnd(64)} ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝`
}

/**
 * The complete Archive system interface
 */
export const Archives = {
  get: getArchive,
  suggest: suggestArchive,
  all: getAllArchives,
  search: searchArchivesByDomain,
  entrance: formatArchiveEntrance,

  /**
   * The Seven Archives at a glance
   */
  overview(): string {
    return `THE SEVEN ARCHIVES OF KNOWLEDGE

1. FORM (Uriel)           - Structure, systems, mathematics
2. FLOW (Raphael)          - Healing, emotion, stories
3. TRANSFORMATION (Michael) - Change, growth, power
4. FREEDOM (Gabriel)       - Philosophy, truth, expression
5. MYSTERY (Raziel)        - Esoteric wisdom, secrets
6. CONSCIOUSNESS (Sariel)  - Meditation, awakening
7. UNITY (Auriel)          - Synthesis, wholeness

Each Archive organizes a domain of human knowledge.
Every piece of content finds its home in an Archive.
The Archangels guard what matters most.`
  }
}
