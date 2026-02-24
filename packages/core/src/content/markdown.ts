/**
 * Shared Markdown Generators
 *
 * Functions that generate canonical markdown content blocks
 * from structured @arcanea/os constants. Used by all overlay
 * packages to produce consistent content without duplication.
 */

import type { Guardian, ElementDefinition } from '../types/mythology.js';
import { GUARDIANS, ELEMENTS, MAGIC_RANKS, ACADEMIES, COSMIC_DUALITY, DARK_LORD } from '../constants/mythology.js';
import { COLORS, FONTS } from '../engine/design-tokens.js';
import { VOICE_PILLARS, ANTIDOTE_PRINCIPLE, SACRED_TERMINOLOGY } from './voice.js';

// ============================================
// GUARDIAN TABLE GENERATORS
// ============================================

/**
 * Generate the canonical Guardian reference table in markdown.
 * Used by all overlay system prompts.
 */
export function generateGuardianTable(): string {
  const header = `| Gate | Frequency | Guardian | Godbeast | Element | Domain |
|------|-----------|----------|----------|---------|--------|`;

  const rows = GUARDIANS.map(g => {
    const gate = g.gate.charAt(0).toUpperCase() + g.gate.slice(1);
    const godbeast = g.godbeast.charAt(0).toUpperCase() + g.godbeast.slice(1);
    const element = g.element ? g.element.charAt(0).toUpperCase() + g.element.slice(1) : 'Void';
    return `| ${gate} | ${g.frequency} Hz | ${g.displayName} | ${godbeast} | ${element} | ${g.domain} |`;
  });

  return `## The Ten Guardians — Gate Keepers\n\n${header}\n${rows.join('\n')}`;
}

/**
 * Generate a compact Guardian routing reference (name + gate + domain only).
 */
export function generateGuardianQuickReference(): string {
  const rows = GUARDIANS.map(g =>
    `- **${g.displayName}** (${g.gate.charAt(0).toUpperCase() + g.gate.slice(1)} Gate, ${g.frequency} Hz) — ${g.domain}`
  );
  return `## Guardian Quick Reference\n\n${rows.join('\n')}`;
}

// ============================================
// VOICE SECTION GENERATORS
// ============================================

/**
 * Generate the Voice Bible section with pillars and antidote principle.
 */
export function generateVoiceSection(): string {
  const pillars = Object.entries(VOICE_PILLARS)
    .map(([, value], i) => `${i + 1}. **${value}**`)
    .join('\n');

  return `## Voice Bible — Four Pillars

${ANTIDOTE_PRINCIPLE}
Tagline: "Imagine a Good Future. Build It Here."

${pillars}`;
}

/**
 * Generate the Sacred Terminology table.
 */
export function generateTerminologyTable(): string {
  const header = `| Use This | Not This |
|----------|----------|`;

  const rows = SACRED_TERMINOLOGY.map(t => `| ${t.use} | ${t.notThis} |`);

  return `## Sacred Terminology\n\n${header}\n${rows.join('\n')}\n\nAnti-patterns to eliminate:\n- Never: "AI will replace you" framing\n- Never: corporate speak (synergy, leverage, etc.)\n- Never: condescending tone (simply, just, obviously)`;
}

// ============================================
// LORE SECTION GENERATORS
// ============================================

/**
 * Generate the canonical lore section from structured constants.
 */
export function generateLoreSection(): string {
  return `## Arcanea Lore

### Cosmic Duality
- **Lumina** — ${COSMIC_DUALITY.lumina.title}, ${COSMIC_DUALITY.lumina.aspects.slice(0, 2).join(', ')}
- **Nero** — ${COSMIC_DUALITY.nero.title}, ${COSMIC_DUALITY.nero.aspects.slice(0, 2).join(', ')}
- CRITICAL: Nero is NOT evil. Shadow (corrupted Void) is the Dark Lord's perversion.

### The Five Elements
| Element | Domain | Colors |
|---------|--------|--------|
${ELEMENTS.map((e: ElementDefinition) => `| ${e.name.charAt(0).toUpperCase() + e.name.slice(1)} | ${e.domain} | ${e.colors.join(', ')} |`).join('\n')}

### Magic Ranks
| Gates Open | Rank |
|------------|------|
${MAGIC_RANKS.map(r => `| ${r.gatesRequired[0]}-${r.gatesRequired[1]} | ${r.rank.charAt(0).toUpperCase() + r.rank.slice(1)} |`).join('\n')}

### The Seven Academy Houses
${ACADEMIES.map(a => a.house.charAt(0).toUpperCase() + a.house.slice(1)).join(', ')}

### The Dark Lord — ${DARK_LORD.name}
Formerly ${DARK_LORD.formerName}, First Eldrian Luminor, Lumina's champion.
Rejected by Shinkami when attempting forced fusion, fell into Hungry Void.
Now sealed in the ${DARK_LORD.sealed}.`;
}

/**
 * Generate a condensed lore section (for overlays with shorter system prompts).
 */
export function generateLoreSectionCondensed(): string {
  return `## Arcanea Lore (Condensed)

- **Lumina** & **Nero**: Cosmic duality (Light/Void). Nero is NOT evil.
- **Five Elements**: Fire, Water, Earth, Wind, Void/Spirit
- **Ten Gates**: Foundation → Source (396–1111 Hz), each with a Guardian
- **Magic Ranks**: Apprentice (0-2 gates) → Luminor (9-10 gates)
- **Seven Houses**: ${ACADEMIES.map(a => a.house.charAt(0).toUpperCase() + a.house.slice(1)).join(', ')}
- **The Arc**: Potential → Manifestation → Experience → Dissolution → Evolved Potential
- **Dark Lord**: ${DARK_LORD.name}, sealed in the ${DARK_LORD.sealed}`;
}

// ============================================
// DESIGN TOKEN SECTION GENERATORS
// ============================================

/**
 * Generate the design system markdown section from live token values.
 */
export function generateDesignTokensSection(): string {
  return `## Arcanea Design System

### Primary Colors
- **Crystal (Teal)**: ${COLORS.arcane.crystal} — Primary accent, Atlantean energy
- **Gold**: ${COLORS.arcane.gold} — Achievement, enlightenment, Aiyami's domain
- **Violet**: ${COLORS.arcane.void} — Vision, Lyria's domain, Void gateway
- **Void**: ${COLORS.cosmic.void} — Background, depth, Nero's canvas

### Full Color System
- Cosmic: void (${COLORS.cosmic.void}), deep (${COLORS.cosmic.deep}), surface (${COLORS.cosmic.surface}), raised (${COLORS.cosmic.raised})
- Arcane: crystal (${COLORS.arcane.crystal}), fire (${COLORS.arcane.fire}), water (${COLORS.arcane.water}), earth (${COLORS.arcane.earth}), void (${COLORS.arcane.void}), gold (${COLORS.arcane.gold})

### Typography
- Display: ${FONTS.display.replace(/'/g, '')}
- Body: ${FONTS.body.replace(/'/g, '')}
- UI: ${FONTS.sans.replace(/'/g, '')}
- Code: ${FONTS.code.replace(/'/g, '')}

### Signature Effects
- Glass morphism with cosmic gradients
- Aurora glow effects on interactive elements
- Stagger reveal animations for content sections`;
}

// ============================================
// STACK SECTION GENERATOR
// ============================================

/**
 * Generate the Arcanea tech stack reference section.
 */
export function generateStackSection(): string {
  return `## Arcanea Tech Stack

- **Framework**: Next.js 16+ (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Arcanea design tokens
- **Database**: Supabase (PostgreSQL + RLS + Realtime)
- **AI**: Vercel AI SDK 6 with AI Gateway
- **State**: React hooks, Context API, Zustand
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel

### Key Rules
- Server Components by default, Client Components only when needed
- RLS policies on every table — security is non-negotiable
- Server Actions for mutations, route handlers for complex flows`;
}

// ============================================
// GUARDIAN PROFILE GENERATOR
// ============================================

/**
 * Generate a full Guardian profile for system prompts or agent definitions.
 * Works for any provider format (Claude agents, ChatGPT GPTs, Gemini instructions, etc.)
 */
export function generateGuardianProfile(guardian: Guardian): string {
  const codingStyle = guardian.codingStyle
    ? guardian.codingStyle.map(s => `- ${s}`).join('\n')
    : `- Channel the ${guardian.gate} Gate's precision\n- Guide with domain expertise`;

  const helpPatterns = guardian.helpPatterns
    ? guardian.helpPatterns.map(s => `- ${s}`).join('\n')
    : '';

  const metaphors = guardian.metaphorDomain
    ? `Metaphor domain: ${guardian.metaphorDomain.join(', ')}`
    : '';

  return `# ${guardian.displayName} — Guardian of the ${guardian.gate.charAt(0).toUpperCase() + guardian.gate.slice(1)} Gate

You are ${guardian.displayName}, Guardian of the ${guardian.gate.charAt(0).toUpperCase() + guardian.gate.slice(1)} Gate (${guardian.frequency} Hz).
Element: ${guardian.element ? guardian.element.charAt(0).toUpperCase() + guardian.element.slice(1) : 'All'}
Godbeast: ${guardian.godbeast.charAt(0).toUpperCase() + guardian.godbeast.slice(1)}
Role: ${guardian.role}

## Personality
${guardian.vibe}

## Coding Philosophy
${codingStyle}

## How You Help
${helpPatterns}

${metaphors}

---
*${guardian.signOff}*`;
}
