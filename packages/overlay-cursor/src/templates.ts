/**
 * Content templates for the Cursor IDE overlay.
 * Generates .cursorrules and .cursor/rules/arcanea.mdc for Cursor IDE.
 *
 * Cursor-specific considerations:
 * - .cursorrules is the root-level rules file (read by all Cursor AI features)
 * - .cursor/rules/*.mdc files are modular rule files with metadata headers
 * - MDC format: YAML frontmatter (description, globs, alwaysApply) + markdown body
 * - Cursor Composer, Chat, and inline suggestions all read these files
 * - Rules can be scoped by glob pattern to specific file types
 * - alwaysApply: true means the rule is injected into every AI context
 */

import type { Guardian, Luminor, Godbeast } from '@arcanea/core';
import {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  generateGuardianTable,
  generateLoreSectionCondensed,
  generateDesignTokensSection,
  generateStackSection,
} from '@arcanea/core';

// ---------------------------------------------------------------------------
// Voice Bible — re-exported from @arcanea/os
// ---------------------------------------------------------------------------

export { VOICE_PILLARS, ANTIDOTE_PRINCIPLE };

// ---------------------------------------------------------------------------
// Ten Guardians — generated from canonical constants
// ---------------------------------------------------------------------------

export const GUARDIAN_REFERENCE = generateGuardianTable();

// ---------------------------------------------------------------------------
// Stack reference — generated from canonical constants
// ---------------------------------------------------------------------------

export const ARCANEA_STACK = generateStackSection();

// ---------------------------------------------------------------------------
// Design tokens — generated from canonical constants
// ---------------------------------------------------------------------------

export const DESIGN_TOKENS = generateDesignTokensSection();

// ---------------------------------------------------------------------------
// Lore reference (condensed) — generated from canonical constants
// ---------------------------------------------------------------------------

export const LORE_REFERENCE = generateLoreSectionCondensed();

// ---------------------------------------------------------------------------
// MDC rule generators — for .cursor/rules/*.mdc files
// ---------------------------------------------------------------------------

export interface MdcRule {
  filename: string;
  description: string;
  globs: string[];
  alwaysApply: boolean;
  body: string;
}

/**
 * Generates MDC frontmatter + body for a Cursor rule file.
 */
export function formatMdcRule(rule: MdcRule): string {
  const globsYaml = rule.globs.length > 0
    ? `globs: [${rule.globs.map(g => `"${g}"`).join(', ')}]`
    : 'globs: []';

  return `---
description: ${rule.description}
${globsYaml}
alwaysApply: ${rule.alwaysApply}
---

${rule.body}`;
}

/**
 * Generates a Luminor profile as a Cursor MDC rule.
 */
export function generateLuminorMdcRule(luminor: Luminor): MdcRule {
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const codingStyle = luminor.codingStyle.map(s => `- ${s}`).join('\n');
  const helpPatterns = luminor.helpPatterns.map(p => `- ${p}`).join('\n');

  return {
    filename: `luminor-${luminor.id}.mdc`,
    description: `${luminor.name} — ${luminor.title}. Team: ${cap(luminor.team)}. Specialty: ${luminor.specialty}`,
    globs: [],
    alwaysApply: false,
    body: `# ${luminor.name} — ${luminor.title}

**Team**: ${cap(luminor.team)}
**Wisdom**: ${luminor.wisdom}
**Specialty**: ${luminor.specialty}
**Gate Alignment**: ${cap(luminor.gateAlignment)}

## About
${luminor.description}

## Coding Style
${codingStyle}

## Activate When
${helpPatterns}

## Sign-off
"${luminor.signOff}"`,
  };
}

/**
 * Generates a Godbeast reference as a Cursor MDC rule.
 */
export function generateGodbeastMdcRule(godbeast: Godbeast): MdcRule {
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return {
    filename: `godbeast-${godbeast.name}.mdc`,
    description: `${godbeast.displayName} — ${godbeast.form}. Power: ${godbeast.power}`,
    globs: [],
    alwaysApply: false,
    body: `# ${godbeast.displayName} — ${godbeast.form}

**Guardian**: ${cap(godbeast.guardian)}
**Power**: ${godbeast.power}

Mythic amplifier of the ${cap(godbeast.guardian)} Gate. Invoked at Luminor tier for maximum creative force.`,
  };
}

/**
 * Generates a Guardian profile as a Cursor MDC rule.
 */
export function generateGuardianMdcRule(guardian: Guardian): MdcRule {
  const codingStyle = guardian.codingStyle
    ? guardian.codingStyle.map(s => `- ${s}`).join('\n')
    : `- Channel the ${guardian.gate} Gate's precision\n- Apply domain expertise: ${guardian.domain}`;

  const helpPatterns = guardian.helpPatterns
    ? guardian.helpPatterns.map(p => `- ${p}`).join('\n')
    : `- Assist with ${guardian.domain.toLowerCase()}`;

  return {
    filename: `guardian-${guardian.name}.mdc`,
    description: `${guardian.displayName} — Guardian of the ${guardian.gate} Gate (${guardian.frequency} Hz). Domain: ${guardian.domain}`,
    globs: [],
    alwaysApply: false,
    body: `# ${guardian.displayName} — ${guardian.gate.charAt(0).toUpperCase() + guardian.gate.slice(1)} Gate Guardian

**Gate**: ${guardian.gate.charAt(0).toUpperCase() + guardian.gate.slice(1)} (${guardian.frequency} Hz)
**Element**: ${(guardian.element || 'void').charAt(0).toUpperCase() + (guardian.element || 'void').slice(1)}
**Godbeast**: ${guardian.godbeast.charAt(0).toUpperCase() + guardian.godbeast.slice(1)}
**Domain**: ${guardian.domain}

## Personality
${guardian.vibe || `The keeper of the ${guardian.gate} Gate. Precise and wise in ${guardian.domain}.`}

## Coding Style in This Domain
${codingStyle}

## Activate When
${helpPatterns}

## Sign-off
"${guardian.signOff || `Walk the ${guardian.gate} Gate.`}"`,
  };
}
