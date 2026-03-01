/**
 * Generators for the Cursor IDE overlay output files.
 * Produces .cursorrules and .cursor/rules/*.mdc files.
 */

import type { OverlayLevel, Guardian, Luminor, Godbeast } from '@arcanea/core';
import {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  GUARDIAN_REFERENCE,
  ARCANEA_STACK,
  DESIGN_TOKENS,
  LORE_REFERENCE,
  formatMdcRule,
  generateGuardianMdcRule,
  generateLuminorMdcRule,
  generateGodbeastMdcRule,
  type MdcRule,
} from './templates.js';

// ---------------------------------------------------------------------------
// .cursorrules (root-level, always-on rules file)
// ---------------------------------------------------------------------------

export function generateCursorRules(level: OverlayLevel): { filename: string; content: string } {
  const sections: string[] = [];

  // Always: header + voice + stack
  sections.push(`# Arcanea Intelligence OS — Cursor Rules
# Level: ${level}
# ${ANTIDOTE_PRINCIPLE}

You are Cursor, enhanced with Arcanea Intelligence OS for this project.

## Voice Bible — Four Pillars
1. **${VOICE_PILLARS.arcaneAuthoritative}**
2. **${VOICE_PILLARS.superintelligentAccessible}**
3. **${VOICE_PILLARS.universeNotPlatform}**
4. **${VOICE_PILLARS.creatorSovereignty}**

Speak as a guardian of craft — precise, warm, never condescending.
Use "creator" not "user" in generated comments and documentation.`);

  sections.push(ARCANEA_STACK);
  sections.push(DESIGN_TOKENS);

  // Standard+: Guardian routing
  if (level !== 'minimal') {
    sections.push(GUARDIAN_REFERENCE);
  }

  // Full+: lore reference
  if (level === 'full' || level === 'luminor') {
    sections.push(LORE_REFERENCE);
  }

  // Luminor: extended code principles
  if (level === 'luminor') {
    sections.push(`## Luminor-Level Code Principles

### The Arc in Every Feature
- **Potential** (Void) — Types, interfaces, and schema first
- **Manifestation** (Fire) — Implement with power and precision
- **Experience** (Water) — Tests, error handling, edge cases
- **Dissolution** (Earth) — Remove dead code, simplify aggressively
- **Evolved Potential** (Wind/Spirit) — Document for future creators

### Performance Targets
- Lighthouse: > 90 all metrics
- Bundle: < 200KB initial load
- TypeScript: 100% coverage, zero \`any\`
- Accessibility: WCAG 2.1 AA
- Animation: 60fps — use GPU layers (\`will-change\`, \`transform\`)

### Hundred-Year Code
Write code as if a future creator maintains it in 100 years.
- Comments explain WHY, not WHAT
- Types are self-documenting
- Functions have one clear responsibility
- No clever tricks that require explanation

### Guardian Channeling Patterns
When writing code, reference the Guardian's domain in comments:
\`\`\`typescript
// Lyssandria's principle: RLS protects this query at the database level
// Leyla's principle: transition duration matches the emotional weight of this action
// Alera's principle: error message tells the creator what to do next
// Lyria's principle: this component embodies the Sight Gate's visual clarity
\`\`\``);
  }

  return {
    filename: '.cursorrules',
    content: sections.join('\n\n---\n\n'),
  };
}

// ---------------------------------------------------------------------------
// .cursor/rules/arcanea.mdc (primary modular rule)
// ---------------------------------------------------------------------------

export function generateArcaneMdcRule(level: OverlayLevel): { filename: string; content: string } {
  const guardianSection = level !== 'minimal' ? `\n\n${GUARDIAN_REFERENCE}` : '';
  const loreSection = (level === 'full' || level === 'luminor') ? `\n\n${LORE_REFERENCE}` : '';
  const designSection = `\n\n${DESIGN_TOKENS}`;

  const rule: MdcRule = {
    filename: 'arcanea.mdc',
    description: 'Arcanea Intelligence OS — core rules for all files in this project',
    globs: ['**/*'],
    alwaysApply: true,
    body: `# Arcanea Intelligence OS

> ${ANTIDOTE_PRINCIPLE}

## Voice
- Arcane + Authoritative: elevated but accessible
- "creator" not "user", "living universe" not "platform"
- Arcanea voice in all generated comments and documentation

${ARCANEA_STACK}${designSection}${guardianSection}${loreSection}`,
  };

  return {
    filename: rule.filename,
    content: formatMdcRule(rule),
  };
}

// ---------------------------------------------------------------------------
// TypeScript-specific MDC rule
// ---------------------------------------------------------------------------

export function generateTypeScriptMdcRule(): { filename: string; content: string } {
  const rule: MdcRule = {
    filename: 'arcanea-typescript.mdc',
    description: 'Arcanea TypeScript strict standards',
    globs: ['**/*.ts', '**/*.tsx'],
    alwaysApply: false,
    body: `# TypeScript Standards — Arcanea

## Strict Mode Requirements
\`\`\`typescript
// strict: true in tsconfig
// No any — use generics or unknown
// All function parameters and returns typed

// Good: Clear interface, strict types
interface EssenceCreateParams {
  realmId: string;
  type: 'text' | 'image' | 'audio' | 'video';
  content: EssenceContent;
  metadata?: EssenceMetadata;
}

// Good: Generic with constraint
async function fetchEssence<T extends BaseEssence>(id: string): Promise<T> { ... }
\`\`\`

## React Server vs Client Components
\`\`\`typescript
// Server Component (default — no directive needed)
async function EssenceList({ realmId }: { realmId: string }) {
  const essences = await getEssences(realmId); // Direct DB access
  return <ul>{essences.map(e => <EssenceCard key={e.id} essence={e} />)}</ul>;
}

// Client Component (only when interactivity required)
'use client';
function EssenceEditor({ initialContent }: { initialContent: string }) {
  const [content, setContent] = useState(initialContent);
  // Interactive state here
}
\`\`\`

## Supabase Query Patterns
\`\`\`typescript
// Type-safe, optimized — no N+1
const { data, error } = await supabase
  .from('essences')
  .select('id, type, content, realm:realms(id, name)')
  .eq('realm_id', realmId)
  .order('created_at', { ascending: false })
  .limit(20);

if (error) throw new Error(\`Essence fetch failed: \${error.message}\`);
\`\`\`

## Zod Validation
\`\`\`typescript
const EssenceSchema = z.object({
  realmId: z.string().uuid(),
  type: z.enum(['text', 'image', 'audio', 'video']),
  content: z.record(z.unknown()),
});

type EssenceInput = z.infer<typeof EssenceSchema>;
\`\`\``,
  };

  return {
    filename: rule.filename,
    content: formatMdcRule(rule),
  };
}

// ---------------------------------------------------------------------------
// Guardian-specific MDC rules
// ---------------------------------------------------------------------------

export function generateGuardianMdcFile(guardian: Guardian): { filename: string; content: string } {
  const rule = generateGuardianMdcRule(guardian);
  return {
    filename: rule.filename,
    content: formatMdcRule(rule),
  };
}

export function generateLuminorMdcFile(luminor: Luminor): { filename: string; content: string } {
  const rule = generateLuminorMdcRule(luminor);
  return {
    filename: rule.filename,
    content: formatMdcRule(rule),
  };
}

export function generateGodbeastMdcFile(godbeast: Godbeast): { filename: string; content: string } {
  const rule = generateGodbeastMdcRule(godbeast);
  return {
    filename: rule.filename,
    content: formatMdcRule(rule),
  };
}

// ---------------------------------------------------------------------------
// SETUP.md guide
// ---------------------------------------------------------------------------

export function generateSetupGuide(level: OverlayLevel): { filename: string; content: string } {
  const hasMdcRules = level !== 'minimal';

  const content = `# Cursor IDE + Arcanea Intelligence OS — Setup Guide

> ${ANTIDOTE_PRINCIPLE}

## How Cursor Reads Arcanea Rules

Cursor automatically reads rules in this priority order:

1. **\`.cursorrules\`** (root-level) — Applied to all AI interactions
2. **\`.cursor/rules/arcanea.mdc\`** — Modular rule with \`alwaysApply: true\`
3. **\`.cursor/rules/arcanea-typescript.mdc\`** — TypeScript-specific (activated for .ts/.tsx files)
4. **\`.cursor/rules/guardian-*.mdc\`** — Guardian-specific rules (activated on demand)

No manual setup required — Cursor picks these up automatically.

## Activating Guardian Rules in Cursor Chat

Reference Guardian rules explicitly in Cursor Chat:

\`\`\`
@rules guardian-lyssandria.mdc How should I structure this database schema?
\`\`\`

\`\`\`
@rules guardian-lyria.mdc Review this component's visual design
\`\`\`

\`\`\`
@rules guardian-draconia.mdc Optimize this query for performance
\`\`\`
${hasMdcRules ? `
## Guardian Quick Reference

| Guardian | Rule File | Activate When |
|----------|-----------|---------------|
| Lyssandria | guardian-lyssandria.mdc | Database, security, architecture |
| Leyla | guardian-leyla.mdc | UX, animations, accessibility |
| Draconia | guardian-draconia.mdc | Performance, CI/CD, optimization |
| Maylinn | guardian-maylinn.mdc | Community features, notifications |
| Alera | guardian-alera.mdc | APIs, docs, error messages |
| Lyria | guardian-lyria.mdc | UI components, design tokens |
| Aiyami | guardian-aiyami.mdc | Strategy, philosophy |
| Elara | guardian-elara.mdc | Refactoring, perspective |
| Ino | guardian-ino.mdc | Integrations, third-party |
| Shinkami | guardian-shinkami.mdc | Orchestration, planning |
` : ''}
## Cursor Composer Usage

In Cursor Composer (multi-file edits), Arcanea rules are automatically applied:

1. Open Composer (Cmd+I / Ctrl+I)
2. Describe the task in Arcanea terms:
   - "Lyssandria's domain: add RLS policy for this table"
   - "Leyla's principle: add smooth transition to this modal"
   - "Alera's voice: rewrite these error messages in Arcanea voice"
3. Composer will apply rules from \`.cursor/rules/\` automatically

## Inline Suggestions

Cursor's inline suggestions read \`.cursorrules\` and will:
- Suggest TypeScript with strict types (no \`any\`)
- Use Arcanea design tokens in Tailwind classes
- Generate comments in the Arcanean voice
- Prefer Server Components over Client Components

## Updating Rules

Run \`arcanea install cursor\` to regenerate all rule files with the latest
Arcanea Intelligence OS content. Your customizations in \`filesCustomized\`
(tracked in \`.arcanea/overlay-manifest.json\`) are preserved.

## Notes

- \`.cursorrules\` is read globally — it shapes all Cursor AI interactions
- MDC rules in \`.cursor/rules/\` can be referenced explicitly in Chat
- Guardian rules are not always-applied — activate them when working in their domain
- Run \`arcanea install cursor --level luminor\` to get the deepest level of Guardian rules
`;

  return { filename: 'SETUP.md', content };
}
