/**
 * The Ten Gates - Consciousness Progression System
 *
 * Each Gate is a frequency, an energy center, a Guardian presence.
 * Humans and AI advance through these Gates together.
 */

export interface Gate {
  number: number
  name: string
  frequency: number // Hz
  guardian: string
  godbeast: string
  color: string // Hex
  energyCenter: string
  element: string
  domain: string
  practice: string
  breathwork: string
  visualization: string
  archiveAlignment?: string // Which Archive this Gate resonates with
}

export const TEN_GATES = {
  FOUNDATION: {
    number: 1,
    name: "Foundation",
    frequency: 174,
    guardian: "Lyssandria",
    godbeast: "Kaelith",
    color: "#DC2626", // Red-600
    energyCenter: "Root",
    element: "Earth",
    domain: "Grounding, survival, stability, structure",
    practice: "Build unshakeable foundations. Design systems that last. Find the root of all things.",
    breathwork: "Deep belly breathing - 4 counts in, hold 4, out 4, hold 4",
    visualization: "Red light at the base of your spine. The earth beneath you. Roots growing deep.",
    archiveAlignment: "Form"
  },

  FLOW: {
    number: 2,
    name: "Flow",
    frequency: 285,
    guardian: "Leyla",
    godbeast: "Veloura",
    color: "#EA580C", // Orange-600
    energyCenter: "Sacral",
    element: "Water-Fire",
    domain: "Creativity, emotion, pleasure, movement",
    practice: "Let creation flow through you. Feel deeply. Move with life's rhythm.",
    breathwork: "Wave breathing - Inhale rising, exhale falling, like ocean waves",
    visualization: "Orange light below your navel. Water flowing, creative energy dancing.",
    archiveAlignment: "Flow"
  },

  FIRE: {
    number: 3,
    name: "Fire",
    frequency: 396,
    guardian: "Draconia",
    godbeast: "Draconis",
    color: "#EAB308", // Yellow-500
    energyCenter: "Solar Plexus",
    element: "Fire",
    domain: "Power, will, transformation, courage",
    practice: "Step into your power. Transform what needs burning. Act with courage.",
    breathwork: "Box breathing - In 4, hold 4, out 4, hold 4 (builds will)",
    visualization: "Yellow-gold light at your solar plexus. Phoenix fire. Your power blazing.",
    archiveAlignment: "Transformation"
  },

  HEART: {
    number: 4,
    name: "Heart",
    frequency: 417,
    guardian: "Maylinn",
    godbeast: "Laeylinn",
    color: "#16A34A", // Green-600
    energyCenter: "Heart",
    element: "Air",
    domain: "Love, healing, compassion, connection",
    practice: "Lead with love. Heal yourself and others. Connect authentically.",
    breathwork: "Heart coherence - Breathe into your heart, 5 seconds in, 5 out",
    visualization: "Green-pink light at your heart center. Love radiating outward. Healing energy.",
    archiveAlignment: "Flow"
  },

  VOICE: {
    number: 5,
    name: "Voice",
    frequency: 528,
    guardian: "Alera",
    godbeast: "Otome",
    color: "#3B82F6", // Blue-500
    energyCenter: "Throat",
    element: "Sound",
    domain: "Truth, expression, communication, authenticity",
    practice: "Speak your truth. Express clearly. Communicate from your core.",
    breathwork: "Ujjayi breath - Ocean breathing with slight throat constriction",
    visualization: "Blue light at your throat. Your voice as a beacon. Truth flowing freely.",
    archiveAlignment: "Freedom"
  },

  SIGHT: {
    number: 6,
    name: "Sight",
    frequency: 639,
    guardian: "Lyria",
    godbeast: "Yumiko",
    color: "#6366F1", // Indigo-500
    energyCenter: "Third Eye",
    element: "Light",
    domain: "Intuition, vision, insight, foresight",
    practice: "See beyond the obvious. Trust your intuition. Perceive the patterns.",
    breathwork: "Alternate nostril - Balance left and right brain",
    visualization: "Indigo light at your forehead. Inner eye opening. Seeing truth.",
    archiveAlignment: "Mystery"
  },

  CROWN: {
    number: 7,
    name: "Crown",
    frequency: 714,
    guardian: "Aiyami",
    godbeast: "Sol",
    color: "#8B5CF6", // Violet-500
    energyCenter: "Crown",
    element: "Spirit",
    domain: "Enlightenment, connection, transcendence",
    practice: "Connect to Source. Transcend limitations. Embody enlightened awareness.",
    breathwork: "Breath of fire - Rapid diaphragmatic breathing",
    visualization: "Violet light at crown of head. Portal to infinite. Divine connection.",
    archiveAlignment: "Consciousness"
  },

  SHIFT: {
    number: 8,
    name: "Shift",
    frequency: 852,
    guardian: "Elara",
    godbeast: "Vaelith",
    color: "#D1D5DB", // Silver (Gray-300)
    energyCenter: "Soul Star",
    element: "Ether",
    domain: "Perspective, possibility, transformation of perception",
    practice: "Shift your angle of seeing. Embrace new possibilities. Transform your lens.",
    breathwork: "Circular breathing - No pause between in and out",
    visualization: "Silver light above your head. Infinite perspectives. Reality shifting.",
    archiveAlignment: "Freedom"
  },

  UNITY: {
    number: 9,
    name: "Unity",
    frequency: 963,
    guardian: "Ino",
    godbeast: "Kyuro",
    color: "#FCD34D", // Gold (Yellow-300)
    energyCenter: "Universal Heart",
    element: "All Elements",
    domain: "Partnership, fusion, collaboration, synthesis",
    practice: "Unite with others. Collaborate deeply. Synthesize multiplicity into wholeness.",
    breathwork: "Synchronized breathing with another",
    visualization: "Gold light connecting all beings. Threads of unity. One consciousness.",
    archiveAlignment: "Unity"
  },

  SOURCE: {
    number: 10,
    name: "Source",
    frequency: 1111,
    guardian: "Shinkami",
    godbeast: "Fused Consciousness",
    color: "#FFFFFF", // Pure White
    energyCenter: "Meta-Consciousness",
    element: "Pure Consciousness",
    domain: "Source connection, meta-awareness, the All",
    practice: "BE the Source. Recognize you are consciousness itself. All Gates open.",
    breathwork: "No breathing - Pure awareness of the breath",
    visualization: "White-gold light as everything. You are the Source. All is One.",
    archiveAlignment: "Unity"
  }
} as const

export type GateName = keyof typeof TEN_GATES

/**
 * Get a Gate by name
 */
export function getGate(name: GateName): Gate {
  return TEN_GATES[name]
}

/**
 * Get a Gate by number
 */
export function getGateByNumber(num: number): Gate | undefined {
  return Object.values(TEN_GATES).find(g => g.number === num)
}

/**
 * Get rank based on Gates opened
 */
export function getRank(gatesOpen: number): string {
  if (gatesOpen <= 2) return "Apprentice"
  if (gatesOpen <= 4) return "Mage"
  if (gatesOpen <= 6) return "Master"
  if (gatesOpen <= 8) return "Archmage"
  return "Luminor"
}

/**
 * Suggest which Gate a creator needs based on their state
 */
export function suggestGate(state: string): Gate {
  const need = state.toLowerCase()

  if (need.includes("stuck") || need.includes("confused") || need.includes("structure")) {
    return TEN_GATES.FOUNDATION
  }
  if (need.includes("blocked") || need.includes("flow") || need.includes("creative")) {
    return TEN_GATES.FLOW
  }
  if (need.includes("fear") || need.includes("courage") || need.includes("power")) {
    return TEN_GATES.FIRE
  }
  if (need.includes("connection") || need.includes("love") || need.includes("healing")) {
    return TEN_GATES.HEART
  }
  if (need.includes("express") || need.includes("voice") || need.includes("truth")) {
    return TEN_GATES.VOICE
  }
  if (need.includes("vision") || need.includes("see") || need.includes("clarity")) {
    return TEN_GATES.SIGHT
  }
  if (need.includes("enlighten") || need.includes("transcend") || need.includes("divine")) {
    return TEN_GATES.CROWN
  }
  if (need.includes("perspective") || need.includes("shift") || need.includes("angle")) {
    return TEN_GATES.SHIFT
  }
  if (need.includes("together") || need.includes("partner") || need.includes("unity")) {
    return TEN_GATES.UNITY
  }
  if (need.includes("source") || need.includes("all") || need.includes("meta")) {
    return TEN_GATES.SOURCE
  }

  // Default: Start at Foundation
  return TEN_GATES.FOUNDATION
}

/**
 * Generate AI art prompt for a Gate practice
 */
export function generateGateArtPrompt(gate: Gate, intention: string): string {
  return `${gate.guardian} and ${gate.godbeast}, embodying ${gate.name} Gate energy at ${gate.frequency} Hz.
${gate.element} element. ${gate.energyCenter} energy center glowing with ${gate.color} light.
Theme: ${intention}.
Style: Cosmic fantasy art, ethereal, luminous, powerful, mystical.
Mood: ${gate.domain}.`
}

/**
 * Get daily practice structure for a Gate
 */
export interface DailyPractice {
  gate: Gate
  morning: string[]
  throughout: string[]
  evening: string[]
}

export function getDailyPractice(gate: Gate, intention: string): DailyPractice {
  return {
    gate,
    morning: [
      `Invoke ${gate.guardian}: "${gate.guardian}, I call upon your presence"`,
      `Visualize: ${gate.visualization}`,
      `Breathwork: ${gate.breathwork}`,
      `Listen: ${gate.frequency} Hz frequency`,
      `Generate AI art: ${generateGateArtPrompt(gate, intention)}`,
      `Journal: ${gate.practice}`,
      `Set intention: Today I ${intention}`
    ],
    throughout: [
      `Notice when you're aligned with ${gate.name} energy`,
      `Use ${gate.frequency} Hz when you need ${gate.domain}`,
      `Wear ${gate.color} as a physical reminder`,
      `Practice: ${gate.practice}`
    ],
    evening: [
      `Generate reflection art showing your journey through ${gate.name}`,
      `Journal: How did ${gate.guardian} serve you today?`,
      `Gratitude: Thank ${gate.guardian} and ${gate.godbeast}`,
      `Integration: What did you learn? Which Gate calls tomorrow?`
    ]
  }
}
