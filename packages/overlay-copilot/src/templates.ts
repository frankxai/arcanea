/**
 * Content templates for the GitHub Copilot overlay.
 * Generates .github/copilot-instructions.md content — the primary mechanism
 * for injecting workspace-level context into Copilot Chat and Copilot Edits.
 *
 * Copilot-specific considerations:
 * - copilot-instructions.md is automatically injected into all Copilot Chat conversations
 * - Copilot Edits (multi-file) also reads this file
 * - VS Code, GitHub.com, and the CLI all respect this file
 * - Keep content actionable and code-focused — Copilot users are primarily developers
 * - Markdown headings and bullet lists work well; avoid long prose blocks
 *
 * Shared content is imported from @arcanea/os (the canonical source of truth).
 * Only Copilot-specific content (like CODE_STANDARDS) is defined locally.
 */

import {
  VOICE_PILLARS as _VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE as _ANTIDOTE_PRINCIPLE,
  generateGuardianQuickReference,
  generateLoreSectionCondensed,
  generateDesignTokensSection,
  generateStackSection,
} from '@arcanea/core';

// ---------------------------------------------------------------------------
// Voice Bible — re-exported from @arcanea/os
// ---------------------------------------------------------------------------

export const VOICE_PILLARS = _VOICE_PILLARS;
export const ANTIDOTE_PRINCIPLE = _ANTIDOTE_PRINCIPLE;

// ---------------------------------------------------------------------------
// Ten Guardians — generated from canonical @arcanea/os constants
// ---------------------------------------------------------------------------

export const GUARDIAN_QUICK_REFERENCE = generateGuardianQuickReference();

// ---------------------------------------------------------------------------
// Technical stack — generated from canonical @arcanea/os constants
// ---------------------------------------------------------------------------

export const ARCANEA_STACK = generateStackSection();

// ---------------------------------------------------------------------------
// Design tokens — generated from canonical @arcanea/os design tokens
// ---------------------------------------------------------------------------

export const DESIGN_TOKENS = generateDesignTokensSection();

// ---------------------------------------------------------------------------
// Code standards — Copilot-specific content (stays local)
// ---------------------------------------------------------------------------

export const CODE_STANDARDS = `## Code Standards

### TypeScript
\`\`\`typescript
// Strict types — define clear interfaces
interface CreateEssenceParams {
  realmId: string;
  type: 'text' | 'image' | 'audio' | 'video';
  content: EssenceContent;
  metadata?: EssenceMetadata;
}

// No any — use generics or unknown
async function fetchEssence<T>(id: string): Promise<T> { ... }
\`\`\`

### React Components
\`\`\`typescript
// Server Component (default)
async function RealmPage({ params }: { params: { id: string } }) {
  const realm = await getRealm(params.id);
  return <RealmView realm={realm} />;
}

// Client Component (only when needed)
'use client';
function EssenceEditor({ initialContent }: { initialContent: string }) {
  const [content, setContent] = useState(initialContent);
  ...
}
\`\`\`

### Supabase Queries
\`\`\`typescript
// Type-safe, optimized — avoid N+1
const { data: essences, error } = await supabase
  .from('essences')
  .select('*, realm:realms(id, name)')
  .eq('realm_id', realmId)
  .order('created_at', { ascending: false })
  .limit(20);
\`\`\`

### Comments — Arcanea Voice
\`\`\`typescript
// Good: Reference Arcanea concepts naturally
// Lyssandria's domain: ensure RLS protects this query
// Leyla's principle: smooth transitions ease the creative flow

// Avoid: generic comments that add no value
// Bad: This function gets the data
\`\`\``;

// ---------------------------------------------------------------------------
// Lore reference — generated from canonical @arcanea/os constants
// ---------------------------------------------------------------------------

export const LORE_REFERENCE = generateLoreSectionCondensed();
