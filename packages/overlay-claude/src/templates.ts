/**
 * Content templates for Claude Code overlay files.
 */

import type { Guardian } from '@arcanea/os';

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

export const COMMAND_TEMPLATE = (name: string, description: string, body: string) => `---
name: ${name}
description: ${description}
---

${body}
`;
