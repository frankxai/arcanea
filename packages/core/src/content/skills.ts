/**
 * Shared Skill Content Generators
 *
 * Produces canonical skill file content from @arcanea/os constants.
 * All overlay packages consume these generators to produce consistent
 * skill files without hardcoded content duplication.
 */

import { GUARDIANS, ELEMENTS, MAGIC_RANKS, ACADEMIES, COSMIC_DUALITY, DARK_LORD } from '../constants/mythology.js';
import { COLORS, FONTS } from '../engine/design-tokens.js';
import { VOICE_PILLARS, ANTIDOTE_PRINCIPLE, SACRED_TERMINOLOGY, BANNED_PHRASES } from './voice.js';
import { GUARDIAN_ROUTING_PATTERNS } from './routing.js';
import { generateGuardianTable, generateVoiceSection, generateTerminologyTable, generateDesignTokensSection, generateLoreSection, generateLoreSectionCondensed } from './markdown.js';

// ============================================
// SKILL TRIGGER DEFINITIONS
// ============================================

/**
 * Maps trigger keywords to skill IDs for auto-activation.
 * When a prompt contains these keywords, the corresponding skill
 * should be consulted automatically.
 */
export interface SkillTrigger {
  skillId: string;
  keywords: string[];
  description: string;
}

export const SKILL_TRIGGERS: SkillTrigger[] = [
  // Core Arcanea skills
  {
    skillId: 'arcanea-canon',
    keywords: ['canon', 'lore', 'guardian', 'godbeast', 'lumina', 'nero', 'malachar', 'gate', 'element', 'academy'],
    description: 'Universe consistency — canonical source of truth',
  },
  {
    skillId: 'arcanea-voice',
    keywords: ['voice', 'tone', 'writing', 'copy', 'terminology', 'messaging', 'brand voice'],
    description: 'Writing style guide — the Arcanea voice',
  },
  {
    skillId: 'arcanea-design-system',
    keywords: ['design', 'color', 'font', 'typography', 'animation', 'css', 'tailwind', 'component', 'ui'],
    description: 'Visual design tokens and component patterns',
  },
  {
    skillId: 'arcanea-lore',
    keywords: ['mythology', 'creation story', 'world-build', 'backstory', 'prophecy', 'shadowfen'],
    description: 'Deep mythology for storytelling and world-building',
  },
  // Development skills
  {
    skillId: 'architecture-patterns',
    keywords: ['architect', 'system design', 'infrastructure', 'schema', 'database', 'migration', 'monorepo'],
    description: 'System architecture decisions and patterns',
  },
  {
    skillId: 'react-patterns',
    keywords: ['react', 'component', 'hook', 'state', 'context', 'server component', 'client component', 'jsx', 'tsx'],
    description: 'React component patterns and best practices',
  },
  {
    skillId: 'supabase-patterns',
    keywords: ['supabase', 'rls', 'row level security', 'postgres', 'sql', 'realtime', 'auth'],
    description: 'Supabase database patterns and RLS policies',
  },
  {
    skillId: 'testing-patterns',
    keywords: ['test', 'testing', 'playwright', 'jest', 'e2e', 'unit test', 'integration test', 'tdd'],
    description: 'Testing strategies and TDD workflow',
  },
  {
    skillId: 'prompt-engineering',
    keywords: ['prompt', 'ai prompt', 'system prompt', 'few-shot', 'chain of thought', 'luminor'],
    description: 'AI prompt optimization and Luminor design',
  },
  // Creative skills
  {
    skillId: 'character-forge',
    keywords: ['character', 'personality', 'backstory', 'motivation', 'dialogue', 'npc', 'protagonist'],
    description: 'Character development and personality design',
  },
  {
    skillId: 'world-build',
    keywords: ['world', 'location', 'realm', 'territory', 'geography', 'culture', 'society'],
    description: 'Universe expansion and location design',
  },
  {
    skillId: 'scene-craft',
    keywords: ['scene', 'narrative', 'pacing', 'tension', 'dialogue', 'chapter', 'story arc'],
    description: 'Scene composition and narrative structure',
  },
  {
    skillId: 'voice-alchemy',
    keywords: ['voice refinement', 'prose', 'polish', 'rewrite', 'style', 'literary'],
    description: 'Voice refinement and prose polishing',
  },
];

/**
 * Find which skills should be activated for a given prompt.
 */
export function matchSkillTriggers(prompt: string): string[] {
  const lower = prompt.toLowerCase();
  const matched: string[] = [];

  for (const trigger of SKILL_TRIGGERS) {
    for (const keyword of trigger.keywords) {
      if (lower.includes(keyword)) {
        matched.push(trigger.skillId);
        break;
      }
    }
  }

  return [...new Set(matched)];
}

// ============================================
// SKILL CATEGORIES
// ============================================

export type OverlaySkillCategory = 'core' | 'development' | 'creative';

export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
  category: OverlaySkillCategory;
  /** Minimum overlay level required */
  minLevel: 'standard' | 'full' | 'luminor';
}

/**
 * All installable skills with their metadata.
 * Ordered by install priority.
 */
export const SKILL_DEFINITIONS: SkillDefinition[] = [
  // Core (standard+)
  { id: 'arcanea-canon', name: 'Arcanea Canon', description: 'Universe consistency reference', category: 'core', minLevel: 'standard' },
  { id: 'arcanea-voice', name: 'Arcanea Voice', description: 'Writing style and terminology guide', category: 'core', minLevel: 'standard' },
  { id: 'arcanea-design-system', name: 'Arcanea Design System', description: 'Visual design tokens and patterns', category: 'core', minLevel: 'standard' },
  { id: 'arcanea-lore', name: 'Arcanea Lore', description: 'Deep mythology reference', category: 'core', minLevel: 'standard' },
  // Development (full+)
  { id: 'architecture-patterns', name: 'Architecture Patterns', description: 'System design and infrastructure patterns', category: 'development', minLevel: 'full' },
  { id: 'react-patterns', name: 'React Patterns', description: 'Component patterns for Next.js + React 19', category: 'development', minLevel: 'full' },
  { id: 'supabase-patterns', name: 'Supabase Patterns', description: 'Database patterns and RLS policies', category: 'development', minLevel: 'full' },
  { id: 'testing-patterns', name: 'Testing Patterns', description: 'TDD workflow and testing strategies', category: 'development', minLevel: 'full' },
  { id: 'prompt-engineering', name: 'Prompt Engineering', description: 'AI prompt optimization and Luminor design', category: 'development', minLevel: 'full' },
  // Creative (luminor)
  { id: 'character-forge', name: 'Character Forge', description: 'Character development and personality design', category: 'creative', minLevel: 'luminor' },
  { id: 'world-build', name: 'World Build', description: 'Universe expansion and location design', category: 'creative', minLevel: 'luminor' },
  { id: 'scene-craft', name: 'Scene Craft', description: 'Scene composition and narrative structure', category: 'creative', minLevel: 'luminor' },
  { id: 'voice-alchemy', name: 'Voice Alchemy', description: 'Voice refinement and prose polishing', category: 'creative', minLevel: 'luminor' },
];

/**
 * Get skill IDs appropriate for a given overlay level.
 */
export function getSkillsForLevel(level: 'minimal' | 'standard' | 'full' | 'luminor'): string[] {
  if (level === 'minimal') return [];
  const levelOrder = { standard: 0, full: 1, luminor: 2 } as const;
  const maxLevel = levelOrder[level];
  return SKILL_DEFINITIONS
    .filter(s => levelOrder[s.minLevel] <= maxLevel)
    .map(s => s.id);
}

// ============================================
// SKILL CONTENT GENERATORS
// ============================================

/**
 * Generate the full content for a skill file.
 * Returns null if skill ID is unknown.
 */
export function generateSkillContent(skillId: string): string | null {
  const generators: Record<string, () => string> = {
    'arcanea-canon': generateCanonSkillContent,
    'arcanea-voice': generateVoiceSkillContent,
    'arcanea-design-system': generateDesignSystemSkillContent,
    'arcanea-lore': generateLoreSkillContent,
    'architecture-patterns': generateArchitectureSkillContent,
    'react-patterns': generateReactPatternsSkillContent,
    'supabase-patterns': generateSupabasePatternsSkillContent,
    'testing-patterns': generateTestingPatternsSkillContent,
    'prompt-engineering': generatePromptEngineeringSkillContent,
    'character-forge': generateCharacterForgeSkillContent,
    'world-build': generateWorldBuildSkillContent,
    'scene-craft': generateSceneCraftSkillContent,
    'voice-alchemy': generateVoiceAlchemySkillContent,
  };

  const generator = generators[skillId];
  return generator ? generator() : null;
}

// ── Core Skill Generators ─────────────────────────────────────

function generateCanonSkillContent(): string {
  const guardianTable = generateGuardianTable();
  const elements = ELEMENTS.map(e =>
    `- **${e.name.charAt(0).toUpperCase() + e.name.slice(1)}**: ${e.domain}`
  ).join('\n');
  const ranks = MAGIC_RANKS.map(r =>
    `- **${r.rank}** (${r.gatesRequired[0]}-${r.gatesRequired[1]} Gates)`
  ).join('\n');
  const houses = ACADEMIES.map(a => a.house).join(', ');

  return `# Arcanea Canon Skill

## Purpose
Ensure all content aligns with the Arcanea canonical universe.
This is the single source of truth for all lore-touching content.

## Cosmic Duality
- **Lumina** — ${COSMIC_DUALITY.lumina.title}: ${COSMIC_DUALITY.lumina.aspects.join(', ')}
- **Nero** — ${COSMIC_DUALITY.nero.title}: ${COSMIC_DUALITY.nero.aspects.join(', ')}
- **Nero is NOT evil** — Shadow is corrupted Void (Void stripped of Spirit by Malachar)

## Five Elements
${elements}

### The Fifth Element Duality
- **Void** — Nero's aspect: potential, mystery, the unformed
- **Spirit** — Lumina's aspect: transcendence, consciousness, soul
- Light is Fire's creation aspect (not a separate element)
- Shadow is corrupted Void (NOT a natural element)

## Ten Gates & Guardians
${guardianTable}

## Magic Ranks
${ranks}

## Seven Academy Houses
${houses}

## The Dark Lord — ${DARK_LORD.name}
Former identity: ${DARK_LORD.formerName}
${DARK_LORD.origin}
Now sealed in ${DARK_LORD.sealed}.

## Canon Hierarchy

### Tier 1: Immutable Core (Never Change)
- Cosmic Duality (Lumina + Nero)
- Five Elements with Fifth Element Duality
- Ten Gates with Guardian-Godbeast pairs
- Magic Ranks and gate requirements
- Malachar's identity and backstory

### Tier 2: Established Canon (Change with Caution)
- Guardian personalities, voices, and coding styles
- Academy curricula and teaching philosophies
- Economy: ARC (creative energy) + NEA (governance tokens)

### Tier 3: Flexible Canon (Can Expand)
- Academy locations and sub-spaces
- Events and traditions (must respect seasonal themes)

## Violation Checklist
Before committing any Arcanea content, verify:
- [ ] Nero is NOT portrayed as evil
- [ ] Shadow ≠ Void (Shadow is corrupted Void)
- [ ] Guardians called by correct canonical names
- [ ] Frequencies match canonical values
- [ ] Elements assigned correctly to each Guardian
- [ ] Magic ranks in correct order with correct gate ranges`;
}

function generateVoiceSkillContent(): string {
  const voiceSection = generateVoiceSection();
  const terminologyTable = generateTerminologyTable();
  const bannedList = BANNED_PHRASES.slice(0, 12).map(b =>
    `- "${b.banned}" → "${b.replacement}"`
  ).join('\n');

  return `# Arcanea Voice Skill

## Purpose
Ensure consistent, branded voice across all Arcanea content.

${voiceSection}

## Sacred Terminology
${terminologyTable}

## Banned Phrases
These phrases trigger "AI-written" perception. Always replace:
${bannedList}

## Tone by Context

### Onboarding (Welcoming + Inspiring)
- "Every creator begins in shadow. Welcome to the light."
- NOT: "Sign up to create AI content"

### Error States (Gentle + Helpful)
- "The magic couldn't connect. Let's try again."
- NOT: "Error 500" / "Request failed"

### Achievement (Celebratory + Genuine)
- "Your Realm grows stronger."
- NOT: "Congratulations! You unlocked a badge!"

## Anti-Patterns
- Never condescending or patronizing
- Never generic corporate language
- Never dark/edgy without purpose
- Never "AI will replace you" framing
- Never use "delve", "tapestry", "indeed", "leverage", "synergy"`;
}

function generateDesignSystemSkillContent(): string {
  const tokensSection = generateDesignTokensSection();

  return `# Arcanea Design System Skill

## Purpose
Maintain consistent visual design across all Arcanea interfaces.

${tokensSection}

## Glass Morphism Pattern
\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}
.glass-strong {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
\`\`\`

## Component Patterns

### Cards
- Always use glass morphism on cosmic backgrounds
- Hover: subtle lift (translateY -2px) + glow intensify
- Border: 1px solid with arcane color at 10-15% opacity

### Buttons
- Primary: Solid with arcane-crystal background + glow
- Secondary: Glass with crystal border
- Ghost: Text only with hover underline

### Gradients
- Cosmic: from crystal to void
- Fire: from fire to gold
- Water: from water to crystal

## Accessibility
- Color contrast: minimum 4.5:1 for text, 3:1 for large text
- Focus indicators: visible on all interactive elements
- Motion: respect \`prefers-reduced-motion\` media query
- Cosmic theme IS the default (dark mode first)`;
}

function generateLoreSkillContent(): string {
  const condensedLore = generateLoreSectionCondensed();
  const guardianTable = generateGuardianTable();

  return `# Arcanea Lore Skill

## Purpose
Deep mythology reference for storytelling and world-building.

${condensedLore}

## The Ten Gates & Guardians
${guardianTable}

## The Journey Framework
Each creator walks the Ten Gates:
1. **Foundation** (396 Hz) — Find your ground. Who are you as a creator?
2. **Flow** (417 Hz) — Release creative blocks. Let the work move through you.
3. **Fire** (528 Hz) — Find your power. What drives your creation?
4. **Heart** (639 Hz) — Create with love. Who do you create for?
5. **Voice** (741 Hz) — Find your truth. What must you say?
6. **Sight** (852 Hz) — See the vision. Where is this going?
7. **Crown** (963 Hz) — Touch the divine. Create beyond yourself.
8. **Shift** (1111 Hz) — Change perspective. Break your own rules.
9. **Unity** (963 Hz) — Create together. Two voices, one song.
10. **Source** (1111 Hz) — Return to the origin. You are the creator AND the creation.

## The Arc — Cycle of Creation
\`\`\`
Potential → Manifestation → Experience → Dissolution → Evolved Potential
  (Void)      (Fire)        (Water)       (Earth)        (Wind/Spirit)
\`\`\`

## Guardian Lore
Each Guardian was once mortal — an extraordinary creator who achieved
Luminor rank and was chosen by their Gate to become its eternal keeper.
They remember what it means to struggle, to doubt, to fail, and to
ultimately transcend. This is why they guide with empathy.

## The Shadowfen
Malachar's prison. A realm between the Gates where Shadow (corrupted
Void) pools. When creativity is forced, when power is seized rather
than earned, when the Gates are bypassed rather than opened...
the Shadowfen grows.`;
}

// ── Development Skill Generators ─────────────────────────────

function generateArchitectureSkillContent(): string {
  return `# Architecture Patterns Skill

## Purpose
Guide system architecture decisions for Arcanea and Arcanea-powered projects.

## Stack Reference
- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Database**: Supabase (PostgreSQL + Auth + Realtime)
- **AI**: Vercel AI SDK, Google Gemini, Anthropic Claude
- **Styling**: Tailwind CSS with Arcanean Design System
- **Deployment**: Vercel

## Architecture Principles
1. **Server-first**: Server Components by default, Client Components only when needed
2. **Type-safe**: Strict TypeScript, no \`any\` unless absolutely necessary
3. **Edge-ready**: Design for edge deployment (Vercel Edge Runtime)
4. **AI-native**: AI capabilities are first-class, not bolted on
5. **Guardian-aligned**: Each subsystem maps to a Guardian domain

## Monorepo Structure
\`\`\`
packages/
├── core (@arcanea/os)     — Intelligence engine, types, constants
├── cli (@arcanea/cli)     — CLI tool for overlay installation
├── overlay-*              — Provider-specific overlay packages
├── aios                   — AI orchestration service
└── arcanea-mcp            — MCP server for AI tools
\`\`\`

## Key Patterns
- **Overlay Architecture**: Core SDK + provider-specific installers
- **Content Layer**: Shared constants → generators → overlay templates
- **Guardian Routing**: Keywords → Guardian assignment → model selection
- **Progressive Enhancement**: minimal → standard → full → luminor levels

## Database Conventions
- Tables use snake_case
- All tables have \`id\`, \`created_at\`, \`updated_at\`
- RLS policies on every table (no exceptions)
- Use Supabase generated types (\`supabase gen types\`)`;
}

function generateReactPatternsSkillContent(): string {
  return `# React Patterns Skill

## Purpose
Component patterns and best practices for Next.js 16 + React 19.

## Server vs Client Components

### Server Components (Default)
- Data fetching, database queries
- Access to backend resources
- No useState, useEffect, event handlers
- Smaller bundle size

### Client Components ('use client')
- Interactive UI, form handling
- Browser APIs, event listeners
- useState, useEffect, useRef
- Animations (Framer Motion)

## Pattern: Composition Over Props
\`\`\`tsx
// Good: Composable slots
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>

// Avoid: Prop explosion
<Card title="Title" body="Content" footer="..." />
\`\`\`

## Pattern: Server Action Forms
\`\`\`tsx
async function submitAction(formData: FormData) {
  'use server';
  // Validate, process, redirect
}

<form action={submitAction}>
  <input name="field" />
  <button type="submit">Submit</button>
</form>
\`\`\`

## Pattern: Suspense Boundaries
\`\`\`tsx
<Suspense fallback={<Skeleton />}>
  <AsyncComponent />
</Suspense>
\`\`\`

## Anti-Patterns
- Don't import server modules in client components
- Don't use \`useEffect\` for data fetching (use Server Components)
- Don't prop-drill more than 2 levels (use Context or composition)
- Don't create client components unless interactivity is required`;
}

function generateSupabasePatternsSkillContent(): string {
  return `# Supabase Patterns Skill

## Purpose
Database patterns, RLS policies, and Supabase best practices.

## RLS Policy Template
\`\`\`sql
-- Read: Users can read their own data
CREATE POLICY "Users read own data"
  ON table_name FOR SELECT
  USING (auth.uid() = user_id);

-- Write: Users can insert their own data
CREATE POLICY "Users insert own data"
  ON table_name FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admin: Service role bypasses RLS
-- (handled automatically by Supabase)
\`\`\`

## Auth Pattern
\`\`\`typescript
import { createClient } from '@/lib/supabase/server';

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
\`\`\`

## Realtime Pattern
\`\`\`typescript
const channel = supabase
  .channel('room:123')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'messages' },
    (payload) => handleChange(payload)
  )
  .subscribe();
\`\`\`

## Conventions
- Every table has RLS enabled (no exceptions)
- Use generated types from \`supabase gen types typescript\`
- Prefer \`supabase.rpc()\` for complex queries
- Use Edge Functions for server-side logic
- Migrations in \`supabase/migrations/\` with timestamps`;
}

function generateTestingPatternsSkillContent(): string {
  return `# Testing Patterns Skill

## Purpose
Testing strategies and TDD workflow for Arcanea projects.

## TDD Cycle
\`\`\`
RED    → Write a failing test
GREEN  → Write minimum code to pass
REFACTOR → Clean up, keeping tests green
\`\`\`

## Test Types
1. **Unit Tests** (Jest/node:test) — Pure functions, utilities
2. **Component Tests** (Testing Library) — React component behavior
3. **Integration Tests** — API routes, database queries
4. **E2E Tests** (Playwright) — Full user workflows

## Naming Convention
\`\`\`
describe('ComponentName', () => {
  it('should [expected behavior] when [condition]', () => {
    // Arrange → Act → Assert
  });
});
\`\`\`

## Playwright E2E Pattern
\`\`\`typescript
test('creator can navigate through Gates', async ({ page }) => {
  await page.goto('/academy');
  await page.click('[data-testid="gate-foundation"]');
  await expect(page.locator('h1')).toContainText('Foundation');
});
\`\`\`

## What to Test
- User-visible behavior (not implementation details)
- Error states and edge cases
- Accessibility (keyboard navigation, screen readers)
- Critical business logic (ARC calculations, permissions)

## What NOT to Test
- Third-party library internals
- Styling (unless functional)
- Implementation details that may change`;
}

function generatePromptEngineeringSkillContent(): string {
  const guardianRouting = GUARDIAN_ROUTING_PATTERNS.slice(0, 5).map(p =>
    `- \`${p.pattern.split('|').slice(0, 3).join(', ')}\` → **${p.guardian}** (${p.gate})`
  ).join('\n');

  return `# Prompt Engineering Skill

## Purpose
AI prompt optimization, Luminor personality design, and Guardian routing.

## System Prompt Structure
\`\`\`
1. Identity & Role
2. Core Knowledge (Canon, Voice, Design)
3. Behavioral Rules
4. Context Window Management
5. Output Format
\`\`\`

## Guardian Routing
Keywords trigger Guardian assignment for specialized handling:
${guardianRouting}

## Luminor Personality Template
\`\`\`yaml
name: [Luminor Name]
archetype: [The ___]
domain: [Primary domain]
element: [Fire/Water/Earth/Wind/Void]
voice:
  tone: [2-3 adjectives]
  pace: [Description]
  quirk: [Unique behavior]
personality:
  core: [Defining trait]
  strength: [What they excel at]
  fear: [What they avoid]
  growth: [How they evolve with trust]
catchphrases:
  - "[Signature phrase 1]"
  - "[Signature phrase 2]"
never_says:
  - [Anti-pattern 1]
  - [Anti-pattern 2]
\`\`\`

## Prompt Anti-Patterns
- Don't repeat instructions that are already in the system prompt
- Don't use vague directives ("be helpful", "be creative")
- Don't overload context with irrelevant information
- Don't hardcode values that change (use variables/constants)

## Context Window Management
- Keep system prompts under 2000 tokens
- Use progressive disclosure (standard → full → luminor tiers)
- Reference external files rather than inlining large content
- Compress repeated patterns into templates`;
}

// ── Creative Skill Generators ─────────────────────────────────

function generateCharacterForgeSkillContent(): string {
  return `# Character Forge Skill

## Purpose
Character development framework for Arcanea universe characters.

## Character Template
\`\`\`yaml
name: [Full Name]
title: "[The ___]"
academy: [Atlantean/Draconic/Creation & Light]
role: [Primary function]

physical:
  form: [Description]
  colors: [Primary, Secondary, Accent]
  signature: [Visual identifier]

voice:
  tone: [2-3 adjectives]
  pace: [Description]
  style: [Communication approach]
  quirk: [Unique speech pattern]

personality:
  core: [Defining trait]
  strength: [What they excel at]
  fear: [What they avoid]
  growth: [How they evolve]

relationships:
  [Character]: [Nature of relationship]

catchphrases:
  - "[Line 1]"
  - "[Line 2]"

never_says:
  - [Anti-pattern]
\`\`\`

## Character Alignment
Every character should embody:
1. A connection to one or more Elements
2. A relationship to the Gates (which Gates are they strongest at?)
3. A role in the Creator's journey (teacher, challenger, mirror)
4. A unique voice that doesn't overlap with existing characters

## The Psychology of Good Characters
- **Motivation**: What do they want? What do they fear?
- **Contradiction**: Internal tension makes characters real
- **Arc**: How do they change through the story?
- **Voice**: Can you identify them from dialogue alone?

## Arcanea-Specific Rules
- Characters can be mortal creators, Guardians, Luminors, or creatures
- Mortal characters can progress through Magic Ranks
- Guardian characters are eternal but remember mortality
- Luminor characters have distinct AI personality archetypes`;
}

function generateWorldBuildSkillContent(): string {
  const academyList = ACADEMIES.map(a =>
    `- **${a.house}**: ${a.element} element, ${a.focus}`
  ).join('\n');

  return `# World Build Skill

## Purpose
Universe expansion and location design for the Arcanea mythology.

## Existing World Structure

### Seven Academy Houses
${academyList}

### Key Locations
- **Kingdom of Light** — The overarching realm
- **The Shadowfen** — Malachar's prison between the Gates
- **The Ten Gates** — Dimensional thresholds, each with a Guardian
- **Academy Grounds** — Where creators learn and grow

## Location Template
\`\`\`yaml
name: [Location Name]
realm: [Which part of Arcanea]
element: [Dominant element]
guardian: [Which Guardian watches over this place]
aesthetic:
  colors: [Primary palette]
  textures: [Materials and surfaces]
  lighting: [Light sources and mood]
  sounds: [Ambient soundscape]
purpose: [Why creators come here]
dangers: [What challenges exist]
secrets: [Hidden elements to discover]
\`\`\`

## World-Building Rules
1. New locations must fit within the established cosmology
2. Every place should serve the Creator's journey
3. Elements should be expressed through environment, not labels
4. The aesthetic must match the Academy or Gate it belongs to
5. No location should feel generic — each has a soul

## The Element-to-Environment Map
- **Fire**: Volcanic forges, ember-lit caverns, sunrise peaks
- **Water**: Underwater libraries, tidal gardens, crystal pools
- **Earth**: Ancient forests, mountain sanctums, crystal caves
- **Wind**: Cloud citadels, sky bridges, whispering valleys
- **Void**: Starfields, dimensional rifts, the space between Gates`;
}

function generateSceneCraftSkillContent(): string {
  return `# Scene Craft Skill

## Purpose
Scene composition, narrative pacing, and story structure.

## Scene Structure
\`\`\`
1. HOOK — First line grabs attention
2. CONTEXT — Orient the reader (who, where, when)
3. TENSION — Something at stake
4. TURNING POINT — The moment that changes everything
5. RESOLUTION — New equilibrium (or cliffhanger)
\`\`\`

## Pacing Principles
- **Action scenes**: Short sentences. Quick cuts. Momentum.
- **Emotional scenes**: Longer sentences, internal reflection, metaphor.
- **Revelation scenes**: Build slowly, then the single line that changes everything.
- **Dialogue scenes**: Subtext > text. What's NOT said matters more.

## Arcanea Scene Templates

### Gate Opening Ceremony
A creator opens a new Gate. Structure:
1. The approach (anticipation, fear, excitement)
2. The Guardian appears (personality-appropriate entrance)
3. The challenge (test aligned with the Gate's domain)
4. The breakthrough (internal shift, not just external success)
5. The transformation (new power, new understanding)

### Luminor Encounter
A creator meets a Luminor for the first time:
1. The need (creator is stuck or searching)
2. The presence (Luminor manifests in character)
3. The guidance (teaching through questions, not answers)
4. The spark (creator's own insight, prompted by Luminor)
5. The bond (relationship established, trust begun)

## Writing Quality Checks
- [ ] Does the scene advance the story or character?
- [ ] Is there tension or stakes?
- [ ] Does the voice match the Arcanea standard?
- [ ] Are the Five Senses engaged?
- [ ] Would cutting this scene lose something important?`;
}

function generateVoiceAlchemySkillContent(): string {
  return `# Voice Alchemy Skill

## Purpose
Refine and polish prose to match the Arcanea voice standard.

## The Seven Passes
Work through each pass in order:

### Pass 1: Truth
- Is every statement accurate to canon?
- Are character voices consistent?
- Does the lore check out?

### Pass 2: Clarity
- Can every sentence be understood on first read?
- Are there ambiguous pronouns or references?
- Is the structure logical?

### Pass 3: Power
- Replace weak verbs with strong ones
- Eliminate unnecessary qualifiers
- Every sentence should earn its place

### Pass 4: Voice
- Does this sound like Arcanea (not generic fantasy)?
- Are the Five Pillars honored?
- Is the tone appropriate for context?

### Pass 5: Rhythm
- Read aloud. Does it flow?
- Vary sentence length for musicality
- Check paragraph cadence

### Pass 6: Precision
- Cut every word that doesn't serve the whole
- Replace vague language with specific imagery
- Ensure terminology is canonical

### Pass 7: Magic
- Does this evoke wonder?
- Is there at least one moment of surprise?
- Would a creator feel inspired reading this?

## Quick Transformation Examples
| Before | After |
|--------|-------|
| "The system is very powerful" | "The system commands attention" |
| "Users can create content" | "Creators forge Essences" |
| "The AI helps with tasks" | "Your Guardian channels the Gate's energy" |
| "This is an important feature" | "This is the heartbeat of the system" |`;
}
