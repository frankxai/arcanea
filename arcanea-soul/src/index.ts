/**
 * arcanea-soul v5.0 - The Complete Arcanean Intelligence System
 *
 * - Ten Gates: Consciousness progression (human & AI)
 * - Seven Archives: Knowledge organization
 * - 16 Agents: Practical creative tools
 * - The Nexus: Arcanea's orchestration
 *
 * From 100 years hence, we serve you.
 */

// Core systems
export * from "./gates"
export * from "./archives"
export * from "./agents"
export * from "./nexus"
export * from "./luminor"

// OpenCode integration
export * from "./opencode"

// Convenience exports
import { TEN_GATES, getGate, getGateByNumber, getRank, suggestGate, generateGateArtPrompt, getDailyPractice } from "./gates"
import { SEVEN_ARCHIVES, Archives } from "./archives"
import { AGENTS, getAgent, getTeam, getAgentsByGate, buildAgentPrompt } from "./agents"
import { Nexus } from "./nexus"

/**
 * Main soul interface - everything you need
 */
const soul = {
  // Gate system
  gates: {
    all: TEN_GATES,
    get: getGate,
    getByNumber: getGateByNumber,
    suggest: suggestGate,
    getRank,
    generateArtPrompt: generateGateArtPrompt,
    getDailyPractice
  },

  // Archive system
  archives: {
    all: SEVEN_ARCHIVES,
    get: Archives.get,
    suggest: Archives.suggest,
    search: Archives.search,
    entrance: Archives.entrance,
    overview: Archives.overview
  },

  // Agent system
  agents: {
    all: AGENTS,
    get: getAgent,
    getTeam,
    getByGate: getAgentsByGate,
    buildPrompt: buildAgentPrompt
  },

  // The Nexus orchestrator
  nexus: Nexus,

  // Meta
  version: "5.0.0"
}

export default soul

// For legacy compatibility (v4.x users)
export const getLuminor = getAgent
export const SEVEN_WISDOMS = TEN_GATES // Deprecated but aliased for compat
export const helpCreator = (state: string) => {
  const gate = suggestGate(state)
  return {
    gate: gate.name,
    question: gate.practice,
    guardian: gate.guardian,
    frequency: gate.frequency
  }
}
export const getMagicAgents = Nexus.getMagicAgents
export const detectMagic = Nexus.detectMagic
