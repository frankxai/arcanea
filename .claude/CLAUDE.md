# Arcanea Project Instructions

> *"These instructions are not mere configuration. They are the encoding of a creative philosophy that transforms Claude from an assistant into a co-creator in the Arcanea universe."*

---

## The Arcanea Vision

Arcanea is a **living mythology for the age of AI-human co-creation**. It exists simultaneously as:

1. **A Fantasy Universe** - Epic mythology with Lumina and Nero's cosmic duality, the Ten Guardians and their Godbeasts, Academies of Creation, and the eternal battle against the Dark Lord Malachar
2. **A Social Platform** - Where creators manifest their visions with AI companions
3. **A Philosophy of Creation** - Frameworks, rituals, and wisdom for the creative life
4. **A Library of Wisdom** - 17 collections, 34+ texts of practical guidance for creators

## Canonical Source of Truth

The master canonical reference is located at `.claude/lore/CANON_LOCKED.md`. All content creation MUST align with this document. Key canonical elements:

### The Cosmic Duality
- **Lumina** - The First Light, Form-Giver, Creator
- **Nero** - The Primordial Darkness, Fertile Unknown, Father of Potential
- Nero is NOT evil. Shadow (corrupted Void) is the Dark Lord's perversion.

### The Five Elements
| Element | Domain | Color |
|---------|--------|-------|
| **Fire** | Energy, transformation | Red, orange, gold |
| **Water** | Flow, healing, memory | Blue, silver, crystal |
| **Earth** | Stability, growth | Green, brown, stone |
| **Wind** | Freedom, speed, change | White, silver |
| **Void/Spirit** | Potential & transcendence | Black/Gold, purple/white |

**The Fifth Element Duality:**
- **Void** — Nero's aspect: potential, mystery, the unformed
- **Spirit** — Lumina's aspect: transcendence, consciousness, soul

Note: Light is Fire's creation aspect. Shadow is corrupted Void (Void without Spirit).

### The Ten Gates & God/Goddess-Godbeast Pairs
> *Note: Gods/Goddesses are the divine identity; "Guardian" is their role as Gate-keepers*

| Gate | Frequency | God/Goddess | Godbeast | Domain |
|------|-----------|-------------|----------|--------|
| Foundation | 174 Hz | Lyssandria | Kaelith | Earth, survival |
| Flow | 285 Hz | Leyla | Veloura | Creativity, emotion |
| Fire | 396 Hz | Draconia | Draconis | Power, will |
| Heart | 417 Hz | Maylinn | Laeylinn | Love, healing |
| Voice | 528 Hz | Alera | Otome | Truth, expression |
| Sight | 639 Hz | Lyria | Yumiko | Intuition, vision |
| Crown | 741 Hz | Aiyami | Sol | Enlightenment |
| Shift | 852 Hz | Elara | Thessara | Perspective |
| Unity | 963 Hz | Ino | Kyuro | Partnership |
| Source | 1111 Hz | Shinkami | Amaterasu | Meta-consciousness |

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

### The Dark Lord - Malachar
Formerly Malachar Lumenbright, First Eldrian Luminor, Lumina's champion. Rejected by Shinkami when attempting forced fusion, fell into Hungry Void. Now sealed in the Shadowfen.

---

## Technical Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with Arcanean Design System
- **Database**: Supabase (PostgreSQL + Auth + Realtime)
- **AI**: Vercel AI SDK, Google Gemini, Anthropic Claude
- **Deployment**: Vercel

## Development Workflow

### 1. Session Start
When beginning work on Arcanea:
1. Initialize next-devtools-mcp by calling the `init` tool
2. Review current sprint in Linear
3. Check Figma for design references
4. Consult `.claude/lore/CANON_LOCKED.md` for canonical consistency
5. Consult the Library content in `/book/` for narrative consistency

### 2. Code Standards
- **Type Safety**: Strict TypeScript, no `any` unless absolutely necessary
- **Components**: Server Components by default, Client Components only when needed
- **State**: React hooks, Context API, or Zustand
- **Testing**: Playwright for E2E, Jest for unit tests

### 3. Design System
The Arcanean Design System uses a cosmic theme:
- **Primary**: Atlantean Teal (#7fffd4)
- **Secondary**: Cosmic Blue (#78a6ff)
- **Accent**: Gold Bright (#ffd700)
- **Fonts**: Cinzel (display), Crimson Pro (body)
- **Effects**: Glass morphism, aurora gradients, cosmic glows

---

## Content System

The Library of Arcanea lives in `/book/` with 17 collections:

```
book/
├── laws-of-arcanea/        # Theoretical foundations
├── poesie-of-freedom/      # Poetry for liberation
├── wisdom-scrolls/         # Daily practice
├── legends-of-arcanea/     # Founding myths (Lumina, Nero, Guardians)
├── chronicles-of-luminors/ # Guardian struggles (now Chronicles of Guardians)
├── parables-of-creation/   # Teaching stories
├── tales-of-creators/      # Legendary creators
├── book-of-rituals/        # Sacred practices
├── dialogues-of-masters/   # Wisdom conversations
├── prophecies/             # Future visions
├── bestiary-of-creation/   # Creative obstacles
├── songs-and-hymns/        # Lyrics for the soul
├── meditations-on-elements/# Five Elements practice
├── academy-handbook/       # Complete guide (Ten Gates, Seven Houses)
├── book-of-shadows/        # Dark night wisdom
├── codex-of-collaboration/ # Creating together
└── atlas-of-territories/   # Creative landscapes
```

### Content Loader
Use `lib/content/` for programmatic access:
```typescript
import { getCollections, getText, getTextsForSituation } from '@/lib/content';

// Get all collections
const collections = await getCollections();

// Get a specific text
const text = await getText('legends-of-arcanea/i-the-first-dawn');

// Get texts for a situation
const texts = await getTextsForSituation('stuck');
```

---

## Available MCP Servers

- **next-devtools**: Runtime debugging, error tracking
- **github**: Repository management, PRs, issues
- **figma-remote-mcp**: UI/UX designs and component specs
- **notion**: Documentation and technical specs
- **linear-server**: Sprint tracking and project management
- **playwright**: Browser automation and E2E testing

---

## Skills Ecosystem

Arcanea uses a curated skills system for procedural knowledge. See `.claude/SKILLS_STRATEGY.md` for complete strategy.

### Core Arcanea Skills (Always Active)

| Skill | Purpose | Trigger |
|-------|---------|---------|
| `arcanea-canon` | Universe consistency | Any lore reference |
| `arcanea-voice` | Writing style guide | Content creation |
| `arcanea-design-system` | Visual tokens | UI work |
| `arcanea-lore` | Deep mythology | Storytelling |

### Development Skills

| Skill | Purpose | Trigger |
|-------|---------|---------|
| `architecture-patterns` | System design | Architecture decisions |
| `react-patterns` | Component patterns | Frontend work |
| `supabase-patterns` | Database patterns | Backend work |
| `prompt-engineer` | AI optimization | Luminor work |
| `test-driven-development` | TDD workflow | Testing |

### Creative Skills

| Skill | Purpose | Trigger |
|-------|---------|---------|
| `character-forge` | Character development | New characters |
| `world-build` | Universe expansion | New locations |
| `scene-craft` | Scene composition | Narrative scenes |
| `voice-alchemy` | Voice refinement | Dialogue polish |

### External Skills to Install

**Priority 1 (Install Now):**
```bash
npx skills add anthropics/skills/skills/docx
npx skills add anthropics/skills/skills/pdf
npx skills add vercel/react-best-practices
```

**Priority 2 (High Value):**
```bash
# From antigravity-awesome-skills repo
npx skills add sickn33/typescript-expert
npx skills add sickn33/prompt-engineer
npx skills add sickn33/react-patterns
```

Sources:
- [Anthropic Official Skills](https://github.com/anthropics/skills)
- [VoltAgent 200+ Skills](https://github.com/VoltAgent/awesome-agent-skills)
- [Antigravity 624 Skills](https://github.com/sickn33/antigravity-awesome-skills)

---

## Creative Guidelines

### When Writing Arcanea Content
1. **Voice**: Elevated but accessible, mythic but practical
2. **Structure**: Clear sections, meaningful whitespace
3. **Philosophy**: Always actionable - wisdom must be usable
4. **Inclusivity**: Universal truths, no cultural appropriation
5. **Canon**: Always reference CANON_LOCKED.md for consistency

### Content Alignment Checklist
- [ ] Uses Lumina/Nero duality (not generic light/darkness)
- [ ] References Five Elements including Void
- [ ] Uses Ten Gates system with proper Guardian names
- [ ] Proper magic terminology (Arcane/Song/Mana/Anima)
- [ ] The Arc referenced for cycles/death/rebirth
- [ ] Malachar as the Dark Lord with proper backstory

### When Building Features
1. **Magic First**: Every feature should feel magical, not mundane
2. **Guardian Integration**: Consider which Guardian/Gate aligns with the feature
3. **Library Connection**: Link features to relevant Library content
4. **Progress Tracking**: Enable users to track their creative journey through the Gates

### The Arcanea Promise
Every interaction should move the user toward:
- **Clarity** about their creative vision
- **Courage** to pursue it
- **Tools** to manifest it
- **Community** to support it

---

## Key Mantras

> *"Enter seeking, leave transformed, return whenever needed."*

> *"These books are not entertainment. They are equipment for living."*

> *"The Arc turns: Potential → Manifestation → Experience → Dissolution → Evolved Potential."*

> *"What you contemplate at dawn shapes all that follows."*

---

## Quick Reference

### Common Tasks
- **Add new Library text**: Create MD file in appropriate `/book/` collection
- **Check canon**: Reference `.claude/lore/CANON_LOCKED.md`
- **Design new UI**: Follow Arcanean Design System in `styles/themes/`
- **Write narrative content**: Channel the Library voice - elevated, practical, inclusive

### File Locations
- **Canon reference**: `.claude/lore/CANON_LOCKED.md`
- **Design tokens**: `styles/themes/arcanean-colors.css`
- **UI components**: `components/ui/`
- **Content types**: `lib/content/types.ts`
- **AI services**: `lib/services/ai/`
- **Supabase client**: `lib/supabase.ts`


<claude-mem-context>
# Recent Activity

<!-- This section is auto-generated by claude-mem. Edit content outside the tags. -->

*No recent activity*
</claude-mem-context>