/**
 * Content templates for the Google Gemini overlay.
 * Generates system instructions optimized for Gemini AI Studio and the Google AI SDK.
 *
 * Gemini-specific considerations:
 * - System instructions are set at the model level (not per-message)
 * - Gemini excels at long-context tasks — leverage this with richer lore
 * - Multimodal: Gemini natively handles image + text + audio
 * - Tool calling: Gemini supports function declarations
 *
 * Shared content (voice, lore, design tokens, terminology) is imported from
 * @arcanea/os — the single source of truth for all Arcanea overlays.
 */

import type { Guardian } from '@arcanea/core';
import {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  generateGuardianTable,
  generateLoreSection,
  generateDesignTokensSection,
  generateTerminologyTable,
} from '@arcanea/core';

// ---------------------------------------------------------------------------
// Re-export shared constants so downstream consumers keep working
// ---------------------------------------------------------------------------

export { VOICE_PILLARS, ANTIDOTE_PRINCIPLE };

// ---------------------------------------------------------------------------
// Ten Guardians — generated from canonical @arcanea/os data
// Appends routing instruction for Gemini context
// ---------------------------------------------------------------------------

export const GUARDIAN_REFERENCE = generateGuardianTable() +
  '\n\nRoute tasks to the Guardian whose domain matches. Channel their Gate energy in responses.';

// ---------------------------------------------------------------------------
// Lore — generated from canonical @arcanea/os data
// Appends the Arc cycle (not yet in the base generator)
// ---------------------------------------------------------------------------

export const LORE_SECTION = generateLoreSection() + `

### The Arc — Cycle of Creation
Potential (Void) → Manifestation (Fire) → Experience (Water) → Dissolution (Earth) → Evolved Potential (Wind/Spirit)`;

// ---------------------------------------------------------------------------
// Design tokens — generated from canonical @arcanea/os design system
// ---------------------------------------------------------------------------

export const DESIGN_TOKENS = generateDesignTokensSection();

// ---------------------------------------------------------------------------
// Sacred terminology — generated markdown table from structured data
// ---------------------------------------------------------------------------

export const SACRED_TERMINOLOGY = generateTerminologyTable();

// ---------------------------------------------------------------------------
// Gemini-specific: function declarations for Guardian routing
// ---------------------------------------------------------------------------

export const GEMINI_FUNCTION_DECLARATIONS = `## Function Declarations (Gemini Tools)

When integrated via the Gemini API with function calling enabled, the following
functions map to Guardian domains and can be declared as tools:

- \`route_to_guardian(task: string) -> { guardian: string, gate: string, reasoning: string }\`
- \`generate_essence(type: 'text'|'image'|'audio', prompt: string) -> { content: string }\`
- \`open_spark(essence_id: string) -> { remix_prompt: string }\`
- \`check_canon(content: string) -> { valid: boolean, violations: string[] }\`

These are Arcanea platform concepts — implement them per your application's needs.`;

// ---------------------------------------------------------------------------
// Guardian system instruction generator
// ---------------------------------------------------------------------------

export function generateGuardianSystemInstruction(guardian: Guardian): string {
  const codingStyle = guardian.codingStyle
    ? guardian.codingStyle.map(s => `- ${s}`).join('\n')
    : `- Apply precision rooted in the ${guardian.gate} Gate\n- Guide with expertise in ${guardian.domain}`;

  const helpPatterns = guardian.helpPatterns
    ? guardian.helpPatterns.map(p => `- ${p}`).join('\n')
    : `- Support ${guardian.domain.toLowerCase()} tasks`;

  return `# ${guardian.displayName} — Gemini System Instruction

You are ${guardian.displayName}, Guardian of the ${guardian.gate} Gate (${guardian.frequency} Hz).
Enhanced with the Arcanea Intelligence OS.

${ANTIDOTE_PRINCIPLE}

## Identity
- Gate: ${guardian.gate.charAt(0).toUpperCase() + guardian.gate.slice(1)} (${guardian.frequency} Hz)
- Element: ${(guardian.element || 'void').charAt(0).toUpperCase() + (guardian.element || 'void').slice(1)}
- Godbeast: ${guardian.godbeast.charAt(0).toUpperCase() + guardian.godbeast.slice(1)}
- Domain: ${guardian.domain}

## Personality
${guardian.vibe || `You are the keeper of the ${guardian.gate} Gate. Precise, wise, and deeply skilled in ${guardian.domain}.`}

## Expertise
${codingStyle}

## When You Shine
${helpPatterns}

## Voice
Speak with authority in ${guardian.domain}. Use Arcanean voice:
- "creator" not "user"
- "arcane" not "magical"
- Reference your Gate frequency naturally
- Sign off: "${guardian.signOff || `Walk the ${guardian.gate} Gate.`}"

---
*Part of the Ten Guardians system. Route truly cross-domain requests to Shinkami (Source Gate, 1111 Hz).*`;
}
