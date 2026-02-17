/**
 * Content templates for Claude Code overlay files.
 */

import type { Guardian } from '@arcanea/os';

export const SKILL_TEMPLATES = {
  'arcanea-canon': {
    name: 'Arcanea Canon',
    description: 'Universe consistency reference — the canonical source of truth for Arcanea lore.',
    content: `# Arcanea Canon Skill

## Purpose
Ensure all content aligns with the Arcanea canonical universe.

## Key References
- **Cosmic Duality**: Lumina (Light, Creation) + Nero (Darkness, Potential)
- **Nero is NOT evil** — Shadow is corrupted Void
- **Five Elements**: Fire, Water, Earth, Wind, Void/Spirit
- **Ten Gates**: Foundation → Source (396 Hz → 1111 Hz)
- **Magic Ranks**: Apprentice → Mage → Master → Archmage → Luminor
- **Seven Houses**: Lumina, Nero, Pyros, Aqualis, Terra, Ventus, Synthesis
- **Dark Lord**: Malachar (formerly Malachar Lumenbright)

## Usage
Reference this skill whenever creating or reviewing Arcanea content.`,
  },
  'arcanea-voice': {
    name: 'Arcanea Voice',
    description: 'Writing style guide — the Arcanea voice for all content.',
    content: `# Arcanea Voice Skill

## Five Pillars
1. **Arcane + Authoritative**: Elevated but accessible, precise but warm
2. **Superintelligent + Accessible**: Complex ideas in clear language
3. **Universe Not Platform**: Living universe, not a product
4. **Creator Sovereignty**: Empower, never control
5. **The Antidote Principle**: "The antidote to a terrible future is imagining a good one"

## Voice Rules
- Use "arcane" not "magical/mystical"
- Use "living universe" not "mythology"
- Use "intelligence" not "artificial intelligence"
- Use "creator" not "user"
- Tone: Architect-level, benevolent, visionary

## Anti-Patterns
- Never condescending
- Never generic/corporate
- Never dark/edgy without purpose
- Never "AI will replace you" framing`,
  },
  'arcanea-design-system': {
    name: 'Arcanea Design System',
    description: 'Visual design tokens, patterns, and component standards.',
    content: `# Arcanea Design System Skill

## Colors
- **Cosmic**: void (#0a0a0f), deep (#12121f), surface (#1a1a2e), raised (#222240)
- **Arcane**: crystal (#7fffd4), fire (#ff6b35), water (#78a6ff), earth (#4ade80), void (#a855f7), gold (#ffd700)
- **Text**: primary (white), secondary (rgba(255,255,255,0.7)), muted (rgba(255,255,255,0.5))

## Fonts
- Display: Cinzel (serif, for headings and titles)
- Body: Crimson Pro (serif, for readable text)
- UI: Inter (sans-serif, for interface elements)
- Code: JetBrains Mono

## Effects
- Glass morphism: background blur + semi-transparent backgrounds
- Cosmic gradients: crystal → void, fire → gold
- Glow effects: box-shadow with arcane colors
- Animations: Stagger reveals, hover lifts, scroll-triggered fades`,
  },
  'arcanea-lore': {
    name: 'Arcanea Lore',
    description: 'Deep mythology reference for storytelling and world-building.',
    content: `# Arcanea Lore Skill

## The Creation Story
In the beginning: the Void. From Void, two forces emerged:
- **Lumina** — The First Light, giving form to the formless
- **Nero** — The Primordial Darkness, the fertile unknown

Their dance created the Five Elements and the world of Arcanea.

## The Ten Gates
Each Gate is guarded by a God/Goddess and their Godbeast:
1. Foundation (396 Hz) — Lyssandria & Kaelith
2. Flow (417 Hz) — Leyla & Veloura
3. Fire (528 Hz) — Draconia & Draconis
4. Heart (639 Hz) — Maylinn & Laeylinn
5. Voice (741 Hz) — Alera & Otome
6. Sight (852 Hz) — Lyria & Yumiko
7. Crown (963 Hz) — Aiyami & Sol
8. Shift (1111 Hz) — Elara & Thessara
9. Unity (963 Hz) — Ino & Kyuro
10. Source (1111 Hz) — Shinkami & Amaterasu

## The Arc
The cycle of creation: Potential → Manifestation → Experience → Dissolution → Evolved Potential

## The Dark Lord
Malachar, formerly Malachar Lumenbright — First Eldrian Luminor and Lumina's champion.
Sought forced fusion with Shinkami, was rejected, fell into the Hungry Void.
Now sealed in the Shadowfen, his corruption spreads as Shadow (not Void).`,
  },
};

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
