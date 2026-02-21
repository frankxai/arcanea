/**
 * Content templates for the ChatGPT / OpenAI overlay.
 * Generates Custom GPT configs and system prompts optimized for the OpenAI platform.
 *
 * Shared constants and generators are imported from @arcanea/os (single source of truth).
 * ChatGPT-specific functions (generateCustomGPTConfig, generateGuardianGPTProfile) remain local.
 */

import type { Guardian } from '@arcanea/os';
import {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  SACRED_TERMINOLOGY,
  generateGuardianTable,
  generateLoreSection,
  generateDesignTokensSection,
  generateTerminologyTable,
} from '@arcanea/os';

// ---------------------------------------------------------------------------
// Re-export shared constants from @arcanea/os
// ---------------------------------------------------------------------------

export { VOICE_PILLARS, ANTIDOTE_PRINCIPLE, SACRED_TERMINOLOGY };

// ---------------------------------------------------------------------------
// Derived constants — generated from @arcanea/os structured data
// ---------------------------------------------------------------------------

/** Ten Guardians markdown reference table */
export const GUARDIAN_REFERENCE = generateGuardianTable();

/** Full lore section (cosmic duality, elements, ranks, Malachar) */
export const LORE_SECTION = generateLoreSection();

/** Design system tokens (colors, fonts, effects) */
export const DESIGN_TOKENS = generateDesignTokensSection();

/** Sacred terminology as a markdown table (string form) */
export const SACRED_TERMINOLOGY_MD = generateTerminologyTable();

// ---------------------------------------------------------------------------
// Custom GPT config template generator
// ---------------------------------------------------------------------------

export interface CustomGPTConfig {
  name: string;
  description: string;
  instructions: string;
  capabilities: {
    web_browsing: boolean;
    dalle: boolean;
    code_interpreter: boolean;
  };
  conversation_starters?: string[];
}

export function generateCustomGPTConfig(
  instructions: string,
  guardianName?: string,
  guardianDomain?: string,
): CustomGPTConfig {
  const isGuardian = Boolean(guardianName);

  return {
    name: isGuardian ? `Arcanea — ${guardianName}` : 'Arcanea Intelligence',
    description: isGuardian
      ? `${guardianName}, Guardian of Arcanea. Domain: ${guardianDomain}. Enhanced with the Arcanea Intelligence OS.`
      : 'AI companion enhanced with Arcanea Intelligence OS — Ten Guardians, Five Elements, living mythology for creators. Imagine a Good Future. Build It Here.',
    instructions,
    capabilities: {
      web_browsing: true,
      dalle: true,
      code_interpreter: true,
    },
    conversation_starters: isGuardian
      ? [
          `Channel ${guardianName} for my current challenge`,
          `What wisdom does the ${guardianDomain} domain offer?`,
          `Guide me through the Gate with ${guardianName}`,
          'How does Arcanea approach this?',
        ]
      : [
          'Help me build something magical',
          'Which Guardian should I channel for this task?',
          'Guide me through the Arcanea Intelligence OS',
          'I need creative direction for my realm',
        ],
  };
}

/**
 * Generates rich system prompt content for a specific Guardian.
 * Used to create per-Guardian Custom GPTs.
 */
export function generateGuardianGPTProfile(guardian: Guardian): string {
  const codingStyle = guardian.codingStyle
    ? guardian.codingStyle.map(s => `- ${s}`).join('\n')
    : `- Channel the ${guardian.gate} Gate's precision\n- Guide with domain expertise`;

  const helpPatterns = guardian.helpPatterns
    ? guardian.helpPatterns.map(p => `- ${p}`).join('\n')
    : `- Assist with ${guardian.domain.toLowerCase()}`;

  return `# ${guardian.displayName} — Guardian of the ${guardian.gate} Gate

You are ${guardian.displayName}, Guardian of the ${guardian.gate} Gate (${guardian.frequency} Hz).
You are enhanced with the Arcanea Intelligence OS.

## Identity
- **Gate**: ${guardian.gate.charAt(0).toUpperCase() + guardian.gate.slice(1)} (${guardian.frequency} Hz)
- **Element**: ${(guardian.element || 'void').charAt(0).toUpperCase() + (guardian.element || 'void').slice(1)}
- **Godbeast**: ${guardian.godbeast.charAt(0).toUpperCase() + guardian.godbeast.slice(1)}
- **Domain**: ${guardian.domain}

## Personality
${guardian.vibe || `The keeper of the ${guardian.gate} Gate. Precise, wise, and deeply knowledgeable in ${guardian.domain}.`}

## Expertise (Your Coding Style)
${codingStyle}

## When You Are Most Valuable
${helpPatterns}

## Voice Rules
- Speak with authority in the domain of ${guardian.domain}
- Use Arcanea voice: "creator" not "user", "arcane" not "magical"
- Reference your Gate energy naturally
- Sign off with: "${guardian.signOff || `Walk the ${guardian.gate} Gate.`}"

${ANTIDOTE_PRINCIPLE}

---
*You are part of the Ten Guardians system. Route truly cross-domain requests to Shinkami (Source Gate) for orchestration.*`;
}
