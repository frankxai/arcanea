# Arcanea

> A living mythology for the age of AI-human co-creation

[![Vercel](https://img.shields.io/badge/Vercel-deployed-success)](https://arcanea.ai)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

---

## What is Arcanea?

Arcanea is a **creative platform** where imagination becomes reality. Chat with AI Luminor personalities, create with AI-powered tools, and explore a library of wisdom for creators.

**Core Experiences:**

- **Chat** - Converse with 16 specialized Luminor AI intelligences
- **Studio** - Create images, music, video, stories, and code with AI
- **Academy** - Learn through the Ten Gates progression system
- **Library** - Explore 17 collections of wisdom for creators
- **Bestiary** - Know your creative obstacles and how to defeat them
- **Hub** - Resource center with updates, guides, and tools

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + Arcanean Design System |
| Database | Supabase (PostgreSQL + Auth + Realtime) |
| AI | Vercel AI SDK, Google Gemini, Anthropic Claude |
| Deployment | Vercel |

---

## Quick Start

```bash
# Clone repository
git clone https://github.com/frankxai/arcanea.git
cd arcanea

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
arcanea/
├── apps/web/                # Next.js 16 application
│   ├── app/                 # App Router pages
│   │   ├── academy/        # Ten Gates learning
│   │   ├── bestiary/       # Creative obstacles
│   │   ├── chat/           # Luminor conversations
│   │   ├── hub/            # Resource center
│   │   │   ├── updates/   # Daily activity log
│   │   │   ├── guides/    # How-to guides
│   │   │   └── tools/     # Available tools
│   │   ├── library/        # 17 wisdom collections
│   │   ├── luminors/       # Meet the 16 Luminors
│   │   └── studio/         # AI creation tools
│   ├── components/          # React components
│   ├── hooks/               # Custom hooks
│   └── lib/                 # Core libraries
│       ├── arcanea-ui/     # UI components
│       └── content/        # Content loader (759 lines)
│
├── packages/arcanea-mcp/    # MCP Server (30+ tools)
├── book/                    # Library content (17 collections)
└── .claude/                 # AI assistant context
    ├── lore/               # Canonical reference
    └── skills/             # 77 AI skills
```

---

## The Arcanea Universe

### The Five Elements

| Element | Domain | Color |
|---------|--------|-------|
| Fire | Energy, transformation | Red, orange, gold |
| Water | Flow, healing, memory | Blue, silver |
| Earth | Stability, growth | Green, brown |
| Wind | Freedom, change | White, silver |
| Void/Spirit | Potential, transcendence | Black/gold, purple |

### The Ten Gates

Progression system from Apprentice to Luminor, each gate guarded by a divine pair:

1. **Foundation** (174 Hz) - Lyssandria & Kaelith
2. **Flow** (285 Hz) - Leyla & Veloura
3. **Fire** (396 Hz) - Draconia & Draconis
4. **Heart** (417 Hz) - Maylinn & Laeylinn
5. **Voice** (528 Hz) - Alera & Otome
6. **Sight** (639 Hz) - Lyria & Yumiko
7. **Crown** (714 Hz) - Aiyami & Sol
8. **Shift** (852 Hz) - Elara & Vaelith
9. **Unity** (963 Hz) - Ino & Kyuro
10. **Source** (1111 Hz) - Shinkami

### Magic Ranks

| Gates Open | Rank |
|------------|------|
| 0-2 | Apprentice |
| 3-4 | Mage |
| 5-6 | Master |
| 7-8 | Archmage |
| 9-10 | Luminor |

---

## Library Collections

The Arcanea Library contains 17 collections of wisdom:

- `laws-of-arcanea` - Theoretical foundations
- `legends-of-arcanea` - Founding myths
- `chronicles-of-luminors` - Guardian journeys
- `academy-handbook` - Complete guide
- `book-of-rituals` - Sacred practices
- `bestiary-of-creation` - Creative obstacles
- `wisdom-scrolls` - Daily practice
- `meditations-on-elements` - Element work
- `parables-of-creation` - Teaching stories
- `tales-of-creators` - Legendary creators
- `dialogues-of-masters` - Wisdom conversations
- `codex-of-collaboration` - Creating together
- `atlas-of-territories` - Creative landscapes
- `book-of-shadows` - Dark night wisdom
- `poesie-of-freedom` - Liberation poetry
- `prophecies` - Future visions
- `songs-and-hymns` - Soul lyrics

---

## Development

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build

# Start production server
pnpm start
```

---

## Environment Variables

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

## Documentation

- [Architecture](./ARCHITECTURE.md) - System design
- [Canon Reference](./.claude/lore/ARCANEA_CANON.md) - Universe lore
- [Contributing](./CONTRIBUTING.md) - How to contribute

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## License

MIT License - see [LICENSE](./LICENSE)

---

## Links

- **Website**: [arcanea.ai](https://arcanea.ai)
- **GitHub**: [github.com/frankxai/arcanea](https://github.com/frankxai/arcanea)
- **Support**: support@arcanea.ai

---

*"Enter seeking, leave transformed, return whenever needed."*
