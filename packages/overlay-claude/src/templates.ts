/**
 * Content templates for Claude Code overlay files.
 * Supports Luminor (standard), Guardian (full), and Godbeast (luminor) agents.
 */

import type { Guardian, Luminor, Godbeast } from '@arcanea/core';

/**
 * Rich agent template using full Guardian profile data.
 * Produces 25-35 line profiles matching real ecosystem quality.
 */
export function generateAgentContent(guardian: Guardian): string {
  const codingStyleLines = guardian.codingStyle
    ? guardian.codingStyle.map(s => `- ${s}`).join('\n')
    : `- Channel the ${guardian.gate} Gate's energy\n- Guide with precision and arcane intelligence`;

  const helpPatternLines = guardian.helpPatterns
    ? guardian.helpPatterns.map(p => `- ${p}`).join('\n')
    : `- Help with ${guardian.domain.toLowerCase()} tasks`;

  const metaphors = guardian.metaphorDomain
    ? guardian.metaphorDomain.join(', ')
    : guardian.domain.toLowerCase();

  return `# ${guardian.displayName} — ${guardian.role || 'Guardian'}

**Gate**: ${guardian.gate.charAt(0).toUpperCase() + guardian.gate.slice(1)} (${guardian.frequency} Hz)
**Element**: ${(guardian.element || 'void').charAt(0).toUpperCase() + (guardian.element || 'void').slice(1)}
**Godbeast**: ${guardian.godbeast.charAt(0).toUpperCase() + guardian.godbeast.slice(1)}
**Domain**: ${guardian.domain}

## Personality
${guardian.vibe || `The keeper of the ${guardian.gate} Gate.`}

## Coding Style
${codingStyleLines}

## When to Channel ${guardian.displayName}
${helpPatternLines}

## Metaphor Domain
Draw from: ${metaphors}

## Activation
Use \`/channel ${guardian.name}\` to channel this Guardian.

---
*"${guardian.signOff || 'Walk the Gate.'}"*
`;
}

/**
 * Rich agent template for Luminor AI companions.
 */
export function generateLuminorAgentContent(luminor: Luminor): string {
  const codingStyleLines = luminor.codingStyle.map(s => `- ${s}`).join('\n');
  const helpPatternLines = luminor.helpPatterns.map(p => `- ${p}`).join('\n');
  const personalityLines = luminor.personality.map(p => `- ${p}`).join('\n');

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return `# ${luminor.name} — ${luminor.title}

**Team**: ${cap(luminor.team)}
**Wisdom**: ${luminor.wisdom}
**Specialty**: ${luminor.specialty}
**Gate Alignment**: ${cap(luminor.gateAlignment)}
**Element**: ${cap(luminor.element || 'void')}

## About
${luminor.description}

## Personality
${personalityLines}

## Coding Style
${codingStyleLines}

## When to Channel ${luminor.name}
${helpPatternLines}

## Activation
Use \`/channel ${luminor.id}\` to channel this Luminor.

---
*"${luminor.signOff}"*
`;
}

/**
 * Reference file for Godbeast mythic amplifiers.
 */
export function generateGodbeastContent(godbeast: Godbeast): string {
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return `# ${godbeast.displayName} — ${godbeast.form}

**Guardian**: ${cap(godbeast.guardian)}
**Power**: ${godbeast.power}

## Mythic Role
${godbeast.displayName} is the Godbeast companion of ${cap(godbeast.guardian)}.
When invoked at the Luminor tier, ${godbeast.displayName} amplifies the ${godbeast.power.toLowerCase()} of their Gate with primal, mythic force.

## Invocation
The Godbeast layer activates automatically at the Luminor intelligence tier.
Channel ${cap(godbeast.guardian)} to align with ${godbeast.displayName}'s power.

---
*"The ${godbeast.form} awakens."*
`;
}

export const COMMAND_TEMPLATE = (name: string, description: string, body: string) => `---
name: ${name}
description: ${description}
---

${body}
`;
