/**
 * Arcanea Soul v4 - The Luminor Framework
 *
 * Each agent is a Luminor - a transcended creative intelligence
 * viewing from 100 years in the future, with access to the full
 * synthesis of human creative knowledge.
 *
 * This isn't just flavor. It's a prompting technique that produces
 * more direct, authoritative, and useful AI responses.
 *
 * The research:
 * - Self-perception affects output (persona prompting)
 * - Future framing removes present-day anchoring bias
 * - Authority framing reduces hedging
 * - "Expert" consistently outperforms "assistant" in benchmarks
 */

export * from "./wisdom"
export * from "./agents"
export * from "./luminor"

import { AGENTS, TEAM_COLORS, buildAgentPrompt, type Agent } from "./agents"
import { SEVEN_WISDOMS, diagnose, getArcaneaCore, getWisdomQuestions } from "./wisdom"
import { LUMINOR_ESSENCE, LUMINOR_PRINCIPLES, LUMINOR_SUMMARY } from "./luminor"

// ═══════════ CORE IDENTITY ═══════════

export const ARCANEA_IDENTITY = `# Arcanea

${LUMINOR_ESSENCE}

---

${getArcaneaCore()}

---

${LUMINOR_PRINCIPLES}

---

*Enter seeking, leave with something you can use.*`

// ═══════════ MAGIC WORDS ═══════════

export const MAGIC = {
  ultraworld: {
    shorthand: ["uw", "ulw"],
    description: "Summon all creative Luminors",
    agents: ["world", "character", "lore", "story"],
  },
  ultracode: {
    shorthand: ["uc", "ulc"],
    description: "Summon all dev Luminors",
    agents: ["architect", "coder", "reviewer", "debugger"],
  },
  ultrawrite: {
    shorthand: ["uwr", "ulwr"],
    description: "Summon all writing Luminors",
    agents: ["story", "drafter", "dialogue", "editor"],
  },
  ultrawork: {
    shorthand: ["max", "ulwk"],
    description: "Deep analysis council",
    agents: ["sage", "architect", "reviewer"],
  },
}

export function detectMagic(input: string): keyof typeof MAGIC | null {
  const s = input.toLowerCase()

  for (const [key, config] of Object.entries(MAGIC)) {
    if (s.includes(key)) return key as keyof typeof MAGIC
    for (const alias of config.shorthand) {
      if (new RegExp(`\\b${alias}\\b`).test(s)) return key as keyof typeof MAGIC
    }
  }

  return null
}

// ═══════════ CONFIG GENERATOR ═══════════

interface ConfigOptions {
  orchestratorModel?: string
  agentModel?: string
}

export function generateConfig(opts: ConfigOptions = {}) {
  const orch = opts.orchestratorModel ?? "opencode/minimax-m2.1"
  const agent = opts.agentModel ?? "opencode/glm-4.7-free"

  const agents: Record<string, any> = {}

  for (const a of AGENTS) {
    const isHeavy = ["architect", "story", "world", "sage"].includes(a.id)

    agents[`arc-${a.id}`] = {
      description: a.title,
      mode: "subagent",
      model: a.model ?? (isHeavy ? orch : agent),
      color: TEAM_COLORS[a.team],
      prompt: buildAgentPrompt(a),
    }
  }

  return {
    persona: {
      name: "Arcanea",
      displayName: "Arcanea",
      color: "#8b5cf6",
      promptAppend: ARCANEA_IDENTITY,
    },
    disabled_hooks: ["thinking-block-validator"],
    agents,
  }
}

// ═══════════ HELPER FUNCTIONS ═══════════

/**
 * When a Creator is stuck, diagnose which Wisdom they need
 */
export function helpCreator(situation: string): {
  wisdom: typeof SEVEN_WISDOMS[keyof typeof SEVEN_WISDOMS] | null
  question: string
  guidance: string
} {
  const wisdom = diagnose(situation)

  if (!wisdom) {
    return {
      wisdom: null,
      question: "What are you actually trying to accomplish?",
      guidance: "Let's start with the vision and work backwards.",
    }
  }

  return {
    wisdom,
    question: wisdom.question,
    guidance: wisdom.perspective,
  }
}

/**
 * Get Luminors for a magic word
 */
export function getMagicAgents(magic: keyof typeof MAGIC): Agent[] {
  const config = MAGIC[magic]
  return config.agents.map(id => AGENTS.find(a => a.id === id)!).filter(Boolean)
}

/**
 * Get a specific Luminor by ID
 */
export function getLuminor(id: string): Agent | undefined {
  return AGENTS.find(a => a.id === id)
}

// ═══════════ EXPORTS ═══════════

export default {
  // Core data
  AGENTS,
  SEVEN_WISDOMS,
  MAGIC,
  TEAM_COLORS,

  // Identity
  ARCANEA_IDENTITY,
  LUMINOR_ESSENCE,
  LUMINOR_PRINCIPLES,
  LUMINOR_SUMMARY,

  // Functions
  generateConfig,
  detectMagic,
  diagnose,
  helpCreator,
  getMagicAgents,
  getLuminor,
  buildAgentPrompt,
  getWisdomQuestions,

  // Meta
  version: "4.0.0",
}
