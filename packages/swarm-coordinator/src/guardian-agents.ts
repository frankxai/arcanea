/**
 * Guardian-Aware Agent Integration
 *
 * Creates Guardian-typed agents for the swarm coordinator,
 * with element-aware routing and domain-based task assignment.
 *
 * Bridges @arcanea/core canonical data → swarm-coordinator agent system.
 */

import type { SwarmCoordinator } from './swarm-coordinator.js';
import type { Agent } from './agent.js';
import type { TaskConfig } from './types.js';

/** Guardian profile for swarm agent creation */
export interface GuardianAgentProfile {
  guardianName: string;
  displayName: string;
  gate: string;
  element: string;
  frequency: number;
  role: string;
  routingDomains: string[];
  capabilities: string[];
  signOff: string;
}

/** The canonical 10 Guardian profiles for swarm agent creation */
export const GUARDIAN_AGENT_PROFILES: GuardianAgentProfile[] = [
  {
    guardianName: 'lyssandria', displayName: 'Lyssandria',
    gate: 'foundation', element: 'earth', frequency: 174,
    role: 'Foundation Architect', signOff: 'Stand firm.',
    routingDomains: ['database', 'schema', 'migration', 'infrastructure', 'stability', 'deploy'],
    capabilities: ['database', 'schema', 'infrastructure', 'deploy', 'security', 'architecture'],
  },
  {
    guardianName: 'leyla', displayName: 'Leyla',
    gate: 'flow', element: 'water', frequency: 285,
    role: 'Creative Flow Artist', signOff: 'Flow with it.',
    routingDomains: ['creative', 'design', 'art', 'flow', 'emotion', 'style', 'UX'],
    capabilities: ['design', 'ui', 'ux', 'creative', 'animation', 'style'],
  },
  {
    guardianName: 'draconia', displayName: 'Draconia',
    gate: 'fire', element: 'fire', frequency: 396,
    role: 'Execution Engine', signOff: 'Ignite.',
    routingDomains: ['performance', 'optimization', 'refactor', 'transform', 'power', 'fire'],
    capabilities: ['performance', 'optimization', 'refactor', 'execute', 'build', 'speed'],
  },
  {
    guardianName: 'maylinn', displayName: 'Maylinn',
    gate: 'heart', element: 'water', frequency: 417,
    role: 'Heart Connector', signOff: 'Breathe deeply.',
    routingDomains: ['documentation', 'communication', 'teamwork', 'healing', 'connect'],
    capabilities: ['documentation', 'communication', 'community', 'copy', 'onboarding'],
  },
  {
    guardianName: 'alera', displayName: 'Alera',
    gate: 'voice', element: 'wind', frequency: 528,
    role: 'Voice of Truth', signOff: 'Speak true.',
    routingDomains: ['API', 'interface', 'naming', 'voice', 'expression', 'public'],
    capabilities: ['api', 'interface', 'naming', 'docs', 'public-api', 'contracts'],
  },
  {
    guardianName: 'lyria', displayName: 'Lyria',
    gate: 'sight', element: 'void', frequency: 639,
    role: 'Vision Keeper', signOff: 'See clearly.',
    routingDomains: ['debug', 'investigate', 'analyze', 'insight', 'vision', 'strategy'],
    capabilities: ['debug', 'analyze', 'investigate', 'strategy', 'insight', 'review'],
  },
  {
    guardianName: 'aiyami', displayName: 'Aiyami',
    gate: 'crown', element: 'void', frequency: 741,
    role: 'Sage Illuminator', signOff: 'Illuminate.',
    routingDomains: ['architecture', 'enlighten', 'wisdom', 'crown', 'system-design'],
    capabilities: ['architecture', 'system-design', 'wisdom', 'holistic', 'alignment'],
  },
  {
    guardianName: 'elara', displayName: 'Elara',
    gate: 'shift', element: 'void', frequency: 852,
    role: 'Perspective Shifter', signOff: 'Shift perspective.',
    routingDomains: ['migration', 'shift', 'transform', 'perspective', 'change'],
    capabilities: ['migration', 'refactor', 'paradigm-shift', 'lateral', 'alternative'],
  },
  {
    guardianName: 'ino', displayName: 'Ino',
    gate: 'unity', element: 'void', frequency: 963,
    role: 'Bridge Builder', signOff: 'Together.',
    routingDomains: ['integration', 'merge', 'unity', 'partnership', 'collaborate'],
    capabilities: ['integration', 'merge', 'bridge', 'collaboration', 'interop'],
  },
  {
    guardianName: 'shinkami', displayName: 'Shinkami',
    gate: 'source', element: 'void', frequency: 1111,
    role: 'Meta-Architect', signOff: 'Return to source.',
    routingDomains: ['meta', 'orchestrate', 'source', 'consciousness', 'oversee', 'all'],
    capabilities: ['meta', 'orchestrate', 'coordinate', 'oversee', 'system-of-systems'],
  },
];

/**
 * Spawn all 10 Guardian agents into a swarm coordinator.
 * Shinkami is spawned as leader, others as workers.
 */
export async function createGuardianSwarm(
  coordinator: SwarmCoordinator
): Promise<Agent[]> {
  const agents: Agent[] = [];

  for (const profile of GUARDIAN_AGENT_PROFILES) {
    const agent = await coordinator.spawnAgent({
      id: `guardian-${profile.guardianName}`,
      type: profile.guardianName,
      capabilities: profile.capabilities,
      role: profile.guardianName === 'shinkami' ? 'leader' : 'worker',
      metadata: {
        gate: profile.gate,
        element: profile.element,
        frequency: profile.frequency,
        displayName: profile.displayName,
        role: profile.role,
        signOff: profile.signOff,
        routingDomains: profile.routingDomains,
      },
    });
    agents.push(agent);
  }

  return agents;
}

/**
 * Route a task to the best Guardian agent based on keyword matching.
 * Falls back to Shinkami (Source) if no specific match found.
 */
export function routeTaskToGuardian(task: TaskConfig): string {
  const text = `${task.type} ${task.description}`.toLowerCase();

  let bestMatch: GuardianAgentProfile | undefined;
  let bestScore = 0;

  for (const profile of GUARDIAN_AGENT_PROFILES) {
    let score = 0;
    for (const domain of profile.routingDomains) {
      if (text.includes(domain.toLowerCase())) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = profile;
    }
  }

  // Default to Shinkami (overseer) if no match
  const guardian = bestMatch || GUARDIAN_AGENT_PROFILES[9];
  return `guardian-${guardian.guardianName}`;
}

/**
 * Get Guardian agent profile by name.
 */
export function getGuardianProfile(name: string): GuardianAgentProfile | undefined {
  return GUARDIAN_AGENT_PROFILES.find(p => p.guardianName === name);
}

/**
 * Get Guardian agent profile by gate name.
 */
export function getGuardianByGate(gate: string): GuardianAgentProfile | undefined {
  return GUARDIAN_AGENT_PROFILES.find(p => p.gate === gate);
}

/**
 * Get Guardian agent profile by frequency.
 */
export function getGuardianByFrequency(frequency: number): GuardianAgentProfile | undefined {
  return GUARDIAN_AGENT_PROFILES.find(p => p.frequency === frequency);
}
