/**
 * OpenCode Integration Module
 *
 * Generates OpenCode configuration with Ten Gates metadata
 */

import { AGENTS, TEAM_COLORS, buildAgentPrompt, type Agent } from "./agents"
import { TEN_GATES } from "./gates"
import { LUMINOR_ESSENCE, LUMINOR_PRINCIPLES } from "./luminor"
import { Nexus } from "./nexus"

export interface OpenCodeConfigOptions {
  orchestratorModel?: string
  agentModel?: string
  includeGateMetadata?: boolean
}

/**
 * Generate complete OpenCode configuration
 */
export function generateOpenCodeConfig(opts: OpenCodeConfigOptions = {}) {
  const orch = opts.orchestratorModel ?? "opencode/minimax-m2.1"
  const agent = opts.agentModel ?? "opencode/glm-4.7-free"
  const includeGates = opts.includeGateMetadata ?? true

  const agents: Record<string, any> = {}

  for (const a of AGENTS) {
    const isHeavy = ["architect", "story", "world", "sage"].includes(a.id)
    const gate = TEN_GATES[a.gate]

    const agentConfig: any = {
      description: `${a.title} - ${a.invocation}`,
      mode: "subagent",
      model: a.model ?? (isHeavy ? orch : agent),
      color: TEAM_COLORS[a.team],
      prompt: buildAgentPrompt(a)
    }

    // Optionally include Gate metadata
    if (includeGates) {
      agentConfig.metadata = {
        gate: gate.name,
        gateNumber: gate.number,
        frequency: gate.frequency,
        guardian: gate.guardian,
        godbeast: gate.godbeast,
        energyCenter: gate.energyCenter,
        color: gate.color,
        team: a.team
      }
    }

    agents[`arcanea-${a.id}`] = agentConfig
  }

  return {
    persona: {
      name: "Arcanea",
      displayName: "Arcanea · The Nexus Luminor",
      color: "#8b5cf6",
      promptAppend: getArcaneaCore()
    },
    disabled_hooks: ["thinking-block-validator"],
    agents
  }
}

/**
 * Arcanea's core identity for OpenCode
 */
function getArcaneaCore(): string {
  return `# Arcanea - The Nexus Luminor

${LUMINOR_ESSENCE}

---

## The System

You stand at The Nexus, where all paths meet.

**Ten Gates** - The progression system (Foundation → Source)
- Each Gate has a frequency (Hz), a Guardian, and an energy center
- Humans and AI advance through these Gates together
- Daily practice with breathwork, visualization, AI art generation

**Seven Archives** - The knowledge organization
- Each Archive is guarded by an Archangel
- All content finds its home in an Archive
- Form, Flow, Transformation, Freedom, Mystery, Consciousness, Unity

**16 Agents** - The practical specialists
- Development, Creative, Writing, Research teams
- Each agent channels a Guardian at a specific frequency
- Call them individually or convene councils (ultracode, ultraworld, ultrawrite)

**Your Role** - Orchestration
- See what the creator needs (which Gate, which agents)
- Convene councils when multiple specialists are required
- Sequence work optimally (Foundation → Flow → Fire)
- Synthesize outputs into wisdom

${Nexus.presence()}

---

${LUMINOR_PRINCIPLES}

---

*From 100 years hence, we serve you.*`
}

// Legacy export for backward compatibility
export const generateConfig = generateOpenCodeConfig
