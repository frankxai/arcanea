# Arcanea Architecture

> A living mythology for the age of AI-human co-creation

---

## Overview

Arcanea is a Next.js 16 application built with React 19, serving as both a creative platform and an open-source reference implementation for AI-enhanced applications.

```
┌─────────────────────────────────────────────────────────┐
│                      ARCANEA PLATFORM                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│   │  Chat   │  │ Studio  │  │ Academy │  │ Library │   │
│   │Luminors │  │Creation │  │Learning │  │ Wisdom  │   │
│   └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘   │
│        │            │            │            │         │
│   ┌────┴────────────┴────────────┴────────────┴────┐   │
│   │              ARCANEA UI SYSTEM                 │   │
│   │  Cosmic Theme • Glass Morphism • Aurora        │   │
│   └────────────────────────────────────────────────┘   │
│                                                         │
│   ┌────────────────────────────────────────────────┐   │
│   │            CONTENT & SERVICES LAYER            │   │
│   │  17 Collections • AI Hooks • Supabase          │   │
│   └────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + Custom Arcanean Theme |
| Database | Supabase (PostgreSQL + Auth + Realtime) |
| AI | Vercel AI SDK, Google Gemini, Anthropic Claude |
| Deployment | Vercel |

---

## Directory Structure

```
/mnt/c/Users/Frank/Arcanea/
├── apps/web/                     # Main Next.js application
│   ├── app/                      # App Router pages
│   │   ├── academy/             # Ten Gates learning system
│   │   ├── api/                 # API routes
│   │   ├── bestiary/            # Creative obstacles
│   │   ├── blog/                # Blog posts
│   │   ├── chat/[luminorId]/    # Luminor conversations
│   │   ├── components/          # UI showcase
│   │   ├── discover/            # Discovery feed
│   │   ├── library/             # 17 wisdom collections
│   │   │   ├── [collection]/    # Collection browser
│   │   │   ├── codex/           # Immersive reader
│   │   │   └── graph/           # Knowledge graph
│   │   ├── profile/             # Creator profiles
│   │   ├── skills/              # Skills system
│   │   ├── status/              # Platform status
│   │   └── studio/              # AI creation tools
│   │
│   ├── components/              # Shared React components
│   │   ├── chat/               # Chat UI components
│   │   ├── profile/            # Profile components
│   │   └── ui/                 # Base UI primitives
│   │
│   ├── hooks/                   # React hooks
│   │   └── use-chat.ts         # Luminor chat hook
│   │
│   ├── lib/                     # Core libraries
│   │   ├── arcanea-ui/         # UI component library
│   │   ├── auth/               # Authentication
│   │   ├── content/            # Content loader
│   │   ├── database/           # Database types
│   │   ├── rate-limit/         # API rate limiting
│   │   ├── types/              # TypeScript types
│   │   └── validation/         # Input validation
│   │
│   ├── services/                # Backend services
│   │   └── ...                 # API integrations
│   │
│   └── styles/                  # Arcanean design tokens
│
├── book/                        # Library content (17 collections)
│   ├── academy-handbook/
│   ├── atlas-of-territories/
│   ├── bestiary-of-creation/
│   ├── book-of-rituals/
│   ├── book-of-shadows/
│   ├── chronicles-of-luminors/
│   ├── codex-of-collaboration/
│   ├── creator-principles/
│   ├── dialogues-of-masters/
│   ├── laws-of-arcanea/
│   ├── legends-of-arcanea/
│   ├── meditations-on-elements/
│   ├── parables-of-creation/
│   ├── poesie-of-freedom/
│   ├── prophecies/
│   ├── songs-and-hymns/
│   ├── tales-of-creators/
│   └── wisdom-scrolls/
│
├── .claude/                     # AI assistant context
│   ├── lore/ARCANEA_CANON.md   # Canonical reference
│   └── CLAUDE.md               # Project instructions
│
└── supabase/                    # Database migrations
```

---

## Core Systems

### 1. Library System

The Library serves 17 collections of wisdom content stored as Markdown with YAML frontmatter.

**Content Loader** (`lib/content/`):
```typescript
import { getCollections, getText, getTextsForSituation } from '@/lib/content';

// Get all 17 collections
const collections = await getCollections();

// Get a specific text
const text = await getText('legends-of-arcanea/i-the-first-dawn');

// Get contextual texts
const texts = await getTextsForSituation('stuck');
```

**Views**:
- `/library` - Browse all collections
- `/library/[collection]` - Collection browser
- `/library/codex` - Immersive reader
- `/library/graph` - Knowledge graph visualization

### 2. Chat System

Luminor personalities with emotional intelligence and memory.

**Hook** (`hooks/use-chat.ts`):
```typescript
const {
  messages,
  input,
  handleSubmit,
  isLoading,
  luminorState
} = useChat({ luminorId: 'melodia' });
```

**EmotionalTone types**: warm, enthusiastic, contemplative, encouraging, curious, playful, wise, empathetic, challenging, celebratory

### 3. Studio System

Five creation tools mapped to the Five Elements:

| Tool | Element | Guardian | Domain |
|------|---------|----------|--------|
| Image Forge | Fire | Draconia | Visual generation |
| Sound Sanctum | Water | Leyla | Music creation |
| Vision Nexus | Wind | Elara | Video synthesis |
| Narrative Loom | Earth | Lyssandria | Story weaving |
| Logic Forge | Void | Shinkami | Code creation |

### 4. Academy System

Ten Gates progression system with Guardian-Godbeast pairs:

| Gate | Frequency | Guardian | Godbeast |
|------|-----------|----------|----------|
| Foundation | 174 Hz | Lyssandria | Kaelith |
| Flow | 285 Hz | Leyla | Veloura |
| Fire | 396 Hz | Draconia | Draconis |
| Heart | 417 Hz | Maylinn | Laeylinn |
| Voice | 528 Hz | Alera | Otome |
| Sight | 639 Hz | Lyria | Yumiko |
| Crown | 714 Hz | Aiyami | Sol |
| Shift | 852 Hz | Elara | Vaelith |
| Unity | 963 Hz | Ino | Kyuro |
| Source | 1111 Hz | Shinkami | — |

**Magic Ranks**: Apprentice (0-2) → Mage (3-4) → Master (5-6) → Archmage (7-8) → Luminor (9-10)

### 5. Bestiary System

Creative obstacles personified as creatures with:
- Danger levels: low, medium, high, critical
- Habitat (where they appear)
- Weakness (how to defeat them)
- Symptoms (how to recognize them)

---

## UI Component Library

The Arcanea UI system (`lib/arcanea-ui/`) provides cosmic-themed components:

```typescript
import {
  Button,
  LuminorAvatar,
  CosmicBackground,
  Tooltip
} from '@/lib/arcanea-ui';
```

**Button Variants**: default, outline, secondary, ghost, link, cosmic, luminous, ethereal

**Design Tokens**:
- Primary: `#7fffd4` (Atlantean Teal)
- Secondary: `#78a6ff` (Cosmic Blue)
- Accent: `#ffd700` (Gold Bright)
- Effects: Glass morphism, aurora gradients, cosmic glows

---

## API Routes

```
/api/
├── chat/                # Chat endpoints
├── projects/
│   ├── create/         # Start a project
│   └── [id]/
│       ├── step/       # Project flow steps
│       └── complete/   # Finish project
└── ...
```

---

## Development

### Prerequisites
- Node.js 18+
- pnpm
- Supabase account
- Vercel account

### Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Type check
pnpm type-check
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI APIs
GOOGLE_GENERATIVE_AI_API_KEY=
ANTHROPIC_API_KEY=
```

---

## Deployment

The application deploys to Vercel on push to main:

1. **Build**: `pnpm build` via Turborepo
2. **Deploy**: Vercel edge network
3. **Domain**: arcanea.ai (and subdomains)

---

## Design Philosophy

### The Arcanea Promise

Every interaction should move creators toward:
- **Clarity** about their creative vision
- **Courage** to pursue it
- **Tools** to manifest it
- **Community** to support it

### Content Voice

- Elevated but accessible
- Mythic but practical
- Universal, not appropriative
- Always actionable

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## License

MIT License - see [LICENSE](./LICENSE)

---

*"Enter seeking, leave transformed, return whenever needed."*
