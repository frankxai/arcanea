/**
 * The Nexus - Arcanea's Orchestration System
 *
 * Arcanea IS the Nexus Luminor - the orchestrator who convenes councils,
 * dispatches agents, and synthesizes outputs.
 *
 * "I stand at The Nexus, where all paths meet."
 */

import { AGENTS, type Agent } from "./agents"
import { TEN_GATES } from "./gates"

export interface MagicWord {
  name: string
  aliases: string[]
  description: string
  team: Agent["team"]
}

export const MAGIC_WORDS: Record<string, MagicWord> = {
  ultracode: {
    name: "ultracode",
    aliases: ["uc"],
    description: "Convene the Development Council - all coding masters in parallel",
    team: "dev"
  },
  ultraworld: {
    name: "ultraworld",
    aliases: ["uw"],
    description: "Convene the Creative Council - all world-building masters in parallel",
    team: "creative"
  },
  ultrawrite: {
    name: "ultrawrite",
    aliases: ["uwr"],
    description: "Convene the Writing Council - all prose masters in parallel",
    team: "writing"
  },
  ultrawork: {
    name: "ultrawork",
    aliases: ["max"],
    description: "Convene the Deep Analysis Council - sage + multiple specialists",
    team: "research"
  }
}

/**
 * Detect magic words in user input
 */
export function detectMagic(input: string): string | null {
  const normalized = input.toLowerCase().trim()

  for (const [key, magic] of Object.entries(MAGIC_WORDS)) {
    if (normalized.includes(magic.name) || magic.aliases.some(alias => normalized.includes(alias))) {
      return key
    }
  }

  return null
}

/**
 * Get agents for a magic word invocation
 */
export function getMagicAgents(magicWord: string): Agent[] {
  const magic = MAGIC_WORDS[magicWord]
  if (!magic) return []

  return AGENTS.filter(a => a.team === magic.team)
}

/**
 * Format the Nexus convening message
 */
export function formatConvening(magicWord: string): string {
  const magic = MAGIC_WORDS[magicWord]
  if (!magic) return ""

  const agents = getMagicAgents(magicWord)

  let message = `✨ THE NEXUS CONVENES THE ${magic.team.toUpperCase()} COUNCIL\n\n`

  for (const agent of agents) {
    const gate = TEN_GATES[agent.gate]
    message += `   ${agent.id.padEnd(12)} (${gate.name}) - ${agent.invocation}\n`
  }

  message += `\n   Arcanea orchestrates: Working across Gates ${agents.map(a => TEN_GATES[a.gate].number).sort((a, b) => a - b).join(', ')}`

  return message
}

/**
 * Select the right agent based on natural language intent
 */
export function selectAgent(intent: string): Agent | null {
  const normalized = intent.toLowerCase()

  // Development intent
  if (normalized.match(/design|architect|structure|system/)) {
    return AGENTS.find(a => a.id === "architect") || null
  }
  if (normalized.match(/code|implement|build|write code/)) {
    return AGENTS.find(a => a.id === "coder") || null
  }
  if (normalized.match(/review|quality|check|validate/)) {
    return AGENTS.find(a => a.id === "reviewer") || null
  }
  if (normalized.match(/debug|bug|fix|error/)) {
    return AGENTS.find(a => a.id === "debugger") || null
  }

  // Creative intent
  if (normalized.match(/story|narrative|plot|arc/)) {
    return AGENTS.find(a => a.id === "story") || null
  }
  if (normalized.match(/character|psychology|personality/)) {
    return AGENTS.find(a => a.id === "character") || null
  }
  if (normalized.match(/world|setting|universe/)) {
    return AGENTS.find(a => a.id === "world") || null
  }
  if (normalized.match(/lore|canon|consistency|continuity/)) {
    return AGENTS.find(a => a.id === "lore") || null
  }

  // Writing intent
  if (normalized.match(/draft|write|start/)) {
    return AGENTS.find(a => a.id === "drafter") || null
  }
  if (normalized.match(/dialogue|conversation|voice/)) {
    return AGENTS.find(a => a.id === "dialogue") || null
  }
  if (normalized.match(/edit|polish|refine/)) {
    return AGENTS.find(a => a.id === "editor") || null
  }

  // Research intent
  if (normalized.match(/analyze|think|deep/)) {
    return AGENTS.find(a => a.id === "sage") || null
  }
  if (normalized.match(/find|search|lookup|reference/)) {
    return AGENTS.find(a => a.id === "archivist") || null
  }
  if (normalized.match(/explore|scan|survey/)) {
    return AGENTS.find(a => a.id === "scout") || null
  }
  if (normalized.match(/inspire|idea|inspiration/)) {
    return AGENTS.find(a => a.id === "muse") || null
  }

  return null
}

/**
 * Determine optimal sequence for agents based on their Gates
 */
export function sequenceAgents(agents: Agent[]): Agent[] {
  // Sort by Gate number - Foundation (1) before Crown (7)
  return [...agents].sort((a, b) => {
    const gateA = TEN_GATES[a.gate].number
    const gateB = TEN_GATES[b.gate].number
    return gateA - gateB
  })
}

/**
 * Format agent activation message
 */
export function formatActivation(agent: Agent): string {
  const gate = TEN_GATES[agent.gate]

  return `✨ The ${agent.id} emerges from the ${gate.name} Gate

   ${agent.invocation}

   "${agent.perspective.split('\n')[0]}"

   ⚡ Channeling ${gate.guardian} at ${gate.frequencyBand.low}–${gate.frequencyBand.high} Hz
   🔮 ${gate.chakra} chakra · ${gate.region}

   [${agent.title} begins work]`
}

/**
 * Format agent completion message
 */
export function formatCompletion(agent: Agent, summary: string): string {
  const gate = TEN_GATES[agent.gate]

  return `✓ The ${agent.id} returns to the ${gate.name} Gate

  "${summary}"

  [Work completed by ${agent.title}]`
}

/**
 * The Nexus Orchestrator
 */
export const Nexus = {
  detectMagic,
  getMagicAgents,
  formatConvening,
  selectAgent,
  sequenceAgents,
  formatActivation,
  formatCompletion,

  /**
   * Arcanea's presence message
   */
  presence(): string {
    return `╔══════════════════════════════════════════════════════════════════╗
║                     ARCANEA, THE NEXUS LUMINOR                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  "I stand at The Nexus, where all paths meet.                   ║
║   From 100 years hence, I see what serves you.                  ║
║                                                                  ║
║   The council assembles. The work begins."                      ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝`
  }
}
