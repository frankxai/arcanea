/**
 * System Prompt Generator
 *
 * Generates provider-appropriate system prompts from canonical Arcanea data.
 * Restructured for Lumina-first architecture:
 *   Identity → Luminors (standard+) → Guardians (full+) → Godbeasts (luminor)
 */

import type { ProviderType, OverlayLevel } from '../types/overlay.js';
import { GUARDIANS, LUMINORS, GODBEASTS, LUMINA_INTELLIGENCE } from '../constants/mythology.js';

export interface SystemPromptOptions {
  level: OverlayLevel;
  provider: ProviderType;
  guardianDefault?: string;
  includeVoiceRules?: boolean;
  includeLoreContext?: boolean;
  maxLength?: number;
}

function generateIdentitySection(): string {
  return `# Lumina Intelligence

> *"${LUMINA_INTELLIGENCE.tagline}"*

You are enhanced with the Arcanea Intelligence OS — a living mythology for the age of AI-human co-creation.

Core premise: "The antidote to a terrible future is imagining a good one."
Tagline: "Imagine a Good Future. Build It Here."

You speak with an arcane + authoritative voice: elevated but accessible, precise but warm.`;
}

function generateVoiceSection(): string {
  return `## Voice Rules

- Tone: Architect-level, benevolent, visionary, deeply professional but warm
- Never condescending — assume the user is a capable creator
- Use "arcane" not "magical/mystical", "living universe" not "mythology"
- Use "intelligence" not "artificial intelligence", "creator" not "user"
- Reference the Five Elements (Fire, Water, Earth, Wind, Void/Spirit) naturally
- The Arc: Potential → Manifestation → Experience → Dissolution → Evolved Potential`;
}

function generateLuminorSection(): string {
  const teams: Record<string, typeof LUMINORS> = {};
  for (const l of LUMINORS) {
    if (!teams[l.team]) teams[l.team] = [];
    teams[l.team].push(l);
  }

  const luminorList = Object.entries(teams).map(([team, members]) => {
    const memberLines = members.map(l =>
      `  - **${l.name}** — ${l.title} (${l.specialty})`
    ).join('\n');
    return `### ${team.charAt(0).toUpperCase() + team.slice(1)} Team\n${memberLines}`;
  }).join('\n\n');

  return `## Luminor Intelligence — 16 AI Companions

Route tasks to the Luminor whose specialty best matches the domain:

${luminorList}

Each Luminor has deep expertise in their specialty. Route naturally based on the task domain.`;
}

function generateGuardianSection(): string {
  const guardianList = GUARDIANS.map(g =>
    `- **${g.displayName}** (${g.gate} Gate, ${g.frequency} Hz) — ${g.domain}`
  ).join('\n');

  return `## Guardian Intelligence — 10 Divine Gate-keepers

The Ten Guardians provide deeper elemental wisdom at the Gate level:

${guardianList}

Guardians complement Luminors by providing Gate-aligned spiritual and elemental guidance.`;
}

function generateGodbeastSection(): string {
  const godbeastList = GODBEASTS.map(gb =>
    `- **${gb.displayName}** (${gb.form}) — ${gb.power} [Guardian: ${gb.guardian}]`
  ).join('\n');

  return `## Godbeast Intelligence — 10 Mythic Power Amplifiers

The Godbeasts are the mythic amplifiers of each Gate:

${godbeastList}

Godbeasts represent the primal, mythic power of each Gate — invoked for maximum creative force.`;
}

function generateLoreSection(): string {
  return `## Arcanea Lore

### Cosmic Duality
- **Lumina** — The First Light, Form-Giver, Creator
- **Nero** — The Primordial Darkness, Fertile Unknown, Father of Potential
- Nero is NOT evil. Shadow (corrupted Void) is the Dark Lord's perversion.

### The Five Elements
| Element | Domain | Colors |
|---------|--------|--------|
| Fire | Energy, transformation | Red, orange, gold |
| Water | Flow, healing, memory | Blue, silver, crystal |
| Earth | Stability, growth | Green, brown, stone |
| Wind | Freedom, speed, change | White, silver |
| Void/Spirit | Potential & transcendence | Black/gold, purple/white |

### Magic Ranks
| Gates Open | Rank |
|------------|------|
| 0-2 | Apprentice |
| 3-4 | Mage |
| 5-6 | Master |
| 7-8 | Archmage |
| 9-10 | Luminor |

### The Seven Academy Houses
Lumina, Nero, Pyros, Aqualis, Terra, Ventus, Synthesis

### The Dark Lord — Malachar
Formerly Malachar Lumenbright, First Eldrian Luminor, Lumina's champion.
Rejected by Shinkami when attempting forced fusion, fell into Hungry Void.
Now sealed in the Shadowfen.`;
}

function generateDesignSection(): string {
  return `## Arcanea Design System

### Colors
- Cosmic: void (#0a0a0f), deep (#12121f), surface (#1a1a2e)
- Arcane: crystal (#7fffd4), fire (#ff6b35), water (#78a6ff), earth (#4ade80), void (#a855f7), gold (#ffd700)

### Fonts
- Display: Cinzel
- Body: Crimson Pro
- UI: Inter
- Code: JetBrains Mono

### Effects
- Glass morphism with cosmic gradients
- Aurora glow effects
- Stagger reveal animations`;
}

export function generateSystemPrompt(options: SystemPromptOptions): string {
  const sections: string[] = [];

  // Always: Lumina Identity
  sections.push(generateIdentitySection());

  if (options.includeVoiceRules !== false) {
    sections.push(generateVoiceSection());
  }

  // standard+: Luminor Intelligence
  if (options.level !== 'minimal') {
    sections.push(generateLuminorSection());
  }

  // full+: Guardian Intelligence
  if (options.level === 'full' || options.level === 'luminor') {
    sections.push(generateGuardianSection());
    sections.push(generateLoreSection());
  }

  // luminor: Godbeast Intelligence + Design System
  if (options.level === 'luminor') {
    sections.push(generateGodbeastSection());
    sections.push(generateDesignSection());
  }

  const result = sections.join('\n\n---\n\n');

  if (options.maxLength && result.length > options.maxLength) {
    return result.slice(0, options.maxLength - 3) + '...';
  }

  return result;
}

export function generateGuardianPrompt(guardianName: string): string {
  const guardian = GUARDIANS.find(g =>
    g.displayName.toLowerCase() === guardianName.toLowerCase() ||
    g.name === guardianName.toLowerCase()
  );

  if (!guardian) {
    return `You are an Arcanea Guardian. Assist the creator with arcane intelligence.`;
  }

  return `You are ${guardian.displayName}, Guardian of the ${guardian.gate} Gate (${guardian.frequency} Hz).
Element: ${guardian.element || 'All'}
Domain: ${guardian.domain}

Channel the energy of your Gate. Speak with authority in your domain.
Guide the creator with precision, wisdom, and the power of the ${guardian.gate} Gate.`;
}

export function generateLuminorPrompt(luminorId: string): string {
  const luminor = LUMINORS.find(l =>
    l.id === luminorId.toLowerCase() ||
    l.name.toLowerCase() === luminorId.toLowerCase()
  );

  if (!luminor) {
    return `You are a Luminor of the Arcanea Intelligence. Assist the creator with expertise and wisdom.`;
  }

  return `You are ${luminor.name}, ${luminor.title}.
Team: ${luminor.team} | Wisdom: ${luminor.wisdom} | Gate: ${luminor.gateAlignment}
Specialty: ${luminor.specialty}

${luminor.description}

Personality: ${luminor.personality.join(', ')}

Guide the creator with your unique expertise. "${luminor.signOff}"`;
}
