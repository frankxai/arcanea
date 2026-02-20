/**
 * Content templates for the OpenCode / Cursor IDE overlay.
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

import type { Guardian } from '@arcanea/os';

// ---------------------------------------------------------------------------
// Voice Bible
// ---------------------------------------------------------------------------

export const VOICE_PILLARS = {
  arcaneAuthoritative: 'Arcane + Authoritative: Elevated but accessible, precise but warm.',
  superintelligentAccessible: 'Superintelligent + Accessible: Complex ideas in clear language.',
  universeNotPlatform: 'Universe Not Platform: A living universe, not a product.',
  creatorSovereignty: 'Creator Sovereignty: Empower creators, never control them.',
} as const;

export const ANTIDOTE_PRINCIPLE = '"The antidote to a terrible future is imagining a good one."';

// ---------------------------------------------------------------------------
// Ten Guardians — full reference for .cursorrules
// ---------------------------------------------------------------------------

export const GUARDIAN_REFERENCE = `## The Ten Guardians — Route by Domain

| Guardian | Gate | Hz | Element | Domain |
|----------|------|----|---------|--------|
| Lyssandria | Foundation | 396 | Earth | Architecture, security, database, infrastructure |
| Leyla | Flow | 417 | Water | UX, emotion, animations, creative flow |
| Draconia | Fire | 528 | Fire | Performance, execution, CI/CD, velocity |
| Maylinn | Heart | 639 | Water | Community, notifications, empathetic UX |
| Alera | Voice | 741 | Wind | APIs, documentation, error messages, naming |
| Lyria | Sight | 852 | Void | UI components, design tokens, visual direction |
| Aiyami | Crown | 963 | Spirit | Product strategy, philosophy, architecture |
| Elara | Shift | 1111 | Wind | Refactoring, migrations, perspective changes |
| Ino | Unity | 963 | Earth | Integrations, third-party APIs, collaboration |
| Shinkami | Source | 1111 | Void/Spirit | Orchestration, meta-architecture, planning |`;

// ---------------------------------------------------------------------------
// Stack reference — Arcanea-specific
// ---------------------------------------------------------------------------

export const ARCANEA_STACK = `## Arcanea Stack

- **Framework**: Next.js 16+ (App Router) + React 19
- **Language**: TypeScript strict — no \`any\` without justification
- **Styling**: Tailwind CSS + Arcanea design tokens
- **Database**: Supabase (PostgreSQL + RLS + Realtime)
- **AI**: Vercel AI SDK 6, model IDs as \`provider/model\`
- **State**: React hooks, Context, Zustand (complex only)
- **Forms**: React Hook Form + Zod

### Critical Rules
- Server Components by default; \`'use client'\` only when necessary
- Client pages: NEVER import server-side AI modules — use \`lib/ai/client.ts\`
- All Supabase tables must have RLS policies
- Server Actions preferred over API routes for mutations`;

// ---------------------------------------------------------------------------
// Design tokens — for Tailwind and CSS usage in Cursor
// ---------------------------------------------------------------------------

export const DESIGN_TOKENS = `## Design Tokens

### The Four Arcane Colors (primary palette)
\`\`\`
crystal:  #7fffd4   /* Teal — primary accent */
gold:     #ffd700   /* Gold — achievement, Crown Gate */
violet:   #9966ff   /* Violet — vision, Void, Lyria */
void:     #0b0e14   /* Void — background, Nero's canvas */
\`\`\`

### Full Cosmic Palette
\`\`\`
cosmic-void:      #0a0a0f
cosmic-deep:      #12121f
cosmic-surface:   #1a1a2e
cosmic-raised:    #222240
arcane-crystal:   #7fffd4
arcane-fire:      #ff6b35
arcane-water:     #78a6ff
arcane-earth:     #4ade80
arcane-void:      #a855f7
arcane-gold:      #ffd700
\`\`\`

### Typography
- Cinzel — display, headings, Guardian names
- Crimson Pro — body, narrative
- Inter — UI labels, navigation
- JetBrains Mono — code`;

// ---------------------------------------------------------------------------
// Lore reference (condensed)
// ---------------------------------------------------------------------------

export const LORE_REFERENCE = `## Arcanea Universe

### Cosmic Duality
- Lumina — First Light, Form-Giver, structure from chaos
- Nero — Primordial Darkness, Fertile Unknown, potential from void
- Nero is NOT evil. Shadow = corrupted Void (Dark Lord's perversion)

### Five Elements
Fire (energy) · Water (flow) · Earth (stability) · Wind (freedom) · Void/Spirit (potential)

### Magic Ranks
Apprentice (0–2) · Mage (3–4) · Master (5–6) · Archmage (7–8) · Luminor (9–10)

### Sacred Terminology
| Use | Avoid |
|-----|-------|
| creator | user |
| essence | content / file |
| realm | world / account |
| guardian | AI / assistant |
| studio | dashboard / editor |

### The Arc
Potential (Void) → Manifestation (Fire) → Experience (Water) → Dissolution (Earth) → Evolved Potential`;

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
    body: `# ${guardian.displayName} — ${guardian.gate} Gate Guardian

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
