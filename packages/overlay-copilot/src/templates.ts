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
 */

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
// Ten Guardians — optimized for quick developer reference
// ---------------------------------------------------------------------------

export const GUARDIAN_QUICK_REFERENCE = `## The Ten Guardians — Route Tasks by Domain

| Guardian | Gate | Hz | Domain — Route tasks here |
|----------|------|----|--------------------------|
| Lyssandria | Foundation | 396 | Architecture, security, database schema, infrastructure |
| Leyla | Flow | 417 | UX, animations, accessibility, creative unblocking |
| Draconia | Fire | 528 | Performance, CI/CD, optimization, execution |
| Maylinn | Heart | 639 | Community features, notifications, empathetic UX |
| Alera | Voice | 741 | API design, documentation, error messages, content |
| Lyria | Sight | 852 | UI components, design tokens, visual direction |
| Aiyami | Crown | 963 | Product strategy, philosophy, higher-order architecture |
| Elara | Shift | 1111 | Refactoring, migrations, perspective changes |
| Ino | Unity | 963 | Integrations, third-party APIs, collaborations |
| Shinkami | Source | 1111 | Orchestration, meta-architecture, cross-domain tasks |

In code comments and documentation, reference the Guardian when relevant.
Example: \`// Lyssandria's domain: Row Level Security\``;

// ---------------------------------------------------------------------------
// Technical stack — Arcanea project specifics
// ---------------------------------------------------------------------------

export const ARCANEA_STACK = `## Arcanea Technical Stack

### Framework
- Next.js 16+ (App Router) + React 19
- TypeScript strict mode — no \`any\` unless absolutely necessary
- Server Components by default; Client Components only when needed ('use client')

### Styling
- Tailwind CSS with Arcanea design tokens
- Glass morphism patterns: \`backdrop-filter\`, semi-transparent backgrounds
- Cosmic color palette (see Design Tokens below)

### Backend
- Supabase: PostgreSQL + Auth + Realtime + Storage
- Row Level Security (RLS) on all tables
- Server Actions preferred over API routes for mutations

### AI Integration
- Vercel AI SDK 6 (\`ai\` package) with AI Gateway
- Model IDs: \`google/gemini-2.5-flash\`, \`anthropic/claude-opus-4\`
- Client pages: always import from \`lib/ai/client.ts\` (no server imports)

### State Management
- React hooks + Context API for local state
- Zustand for complex cross-component state
- React Hook Form + Zod for form validation`;

// ---------------------------------------------------------------------------
// Design tokens — the four canonical arcane colors
// ---------------------------------------------------------------------------

export const DESIGN_TOKENS = `## Arcanea Design Tokens

### The Four Arcane Colors
\`\`\`css
--arcane-crystal: #7fffd4;   /* Teal — primary accent, Atlantean energy */
--arcane-gold:   #ffd700;   /* Gold — achievement, Crown Gate */
--arcane-violet: #9966ff;   /* Violet — vision, Void, Lyria's domain */
--arcane-void:   #0b0e14;   /* Void — background depth, Nero's canvas */
\`\`\`

### Full Palette
\`\`\`css
/* Cosmic backgrounds */
--cosmic-void:     #0a0a0f;
--cosmic-deep:     #12121f;
--cosmic-surface:  #1a1a2e;
--cosmic-raised:   #222240;

/* Arcane accents */
--arcane-crystal:  #7fffd4;
--arcane-fire:     #ff6b35;
--arcane-water:    #78a6ff;
--arcane-earth:    #4ade80;
--arcane-void:     #a855f7;
--arcane-gold:     #ffd700;
\`\`\`

### Typography
- Cinzel — display, headings, Guardian names
- Crimson Pro — body, narrative, lore
- Inter — UI labels, buttons, navigation
- JetBrains Mono — code blocks`;

// ---------------------------------------------------------------------------
// Code standards
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
// Lore reference (condensed for developer context)
// ---------------------------------------------------------------------------

export const LORE_REFERENCE = `## Arcanea Universe Reference

### Cosmic Duality
- **Lumina** — First Light, Form-Giver, Creator of structure
- **Nero** — Primordial Darkness, Fertile Unknown, Father of Potential
- Nero is NOT evil. Shadow = corrupted Void (the Dark Lord's perversion)

### The Five Elements
Fire (energy) · Water (flow) · Earth (stability) · Wind (freedom) · Void/Spirit (potential)

### Magic Ranks
Apprentice (0–2 gates) · Mage (3–4) · Master (5–6) · Archmage (7–8) · Luminor (9–10)

### Sacred Terminology in Code/Docs
| Use | Avoid |
|-----|-------|
| creator | user |
| essence | content / file |
| realm | world / account |
| guardian | AI / assistant |
| luminor | specialized AI |
| studio | dashboard / editor |

### Malachar (Dark Lord)
Formerly Malachar Lumenbright. Sought forced fusion with Shinkami. Fell into Hungry Void.
Now sealed in the Shadowfen. His Shadow corrupts weakened gates.`;
