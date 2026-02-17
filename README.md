<div align="center">

<img src="./assets/premium-r3/01-hero-banner.png" alt="Arcanea" width="100%"/>

<br/><br/>

# Arcanea

### The intelligence layer for human creation.

<br/>

[![arcanea.ai](https://img.shields.io/badge/arcanea.ai-live-0d1117?style=for-the-badge&labelColor=0d1117&color=7fffd4)](https://arcanea.ai)
[![Next.js 16](https://img.shields.io/badge/Next.js_16-0d1117?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-0d1117?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React_19-0d1117?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK_6-0d1117?style=for-the-badge&logo=vercel&logoColor=white)](https://sdk.vercel.ai/)
[![MIT](https://img.shields.io/badge/MIT-0d1117?style=for-the-badge)](./LICENSE)

<br/>

[**Explore**](https://arcanea.ai) &nbsp;&middot;&nbsp; [**Documentation**](#architecture) &nbsp;&middot;&nbsp; [**Quick Start**](#quick-start) &nbsp;&middot;&nbsp; [**Ecosystem**](#ecosystem) &nbsp;&middot;&nbsp; [**Contributing**](#contributing)

</div>

<br/>

---

<br/>

## Install

Arcanea runs on every surface. Pick yours:

```bash
# CLI — instant access
npx @arcanea/cli route "design a character creation flow"

# Or install globally
npm install -g @arcanea/cli
arcanea route "help me with database architecture"
arcanea voice "Check this text for canon compliance" --fix
arcanea tokens --format css --colors
```

### MCP Server — Claude Code, Cursor, Windsurf, Cline, Codex

Add to your `.mcp.json` or MCP settings:

```json
{
  "mcpServers": {
    "arcanea": {
      "command": "npx",
      "args": ["@arcanea/mcp-server"]
    }
  }
}
```

30 tools, 7 resources, 6 prompts. Worldbuilding generators, Guardian routing, voice enforcement, design tokens, Luminor AI companions, creation graph, and agent orchestration.

### Core SDK — for developers

```bash
npm install @arcanea/core
```

```typescript
import { routeToGuardian, VoiceEnforcer, toCSSVariables } from '@arcanea/core';

const route = routeToGuardian("design a flowing water-themed UI");
// → { guardian: "Leyla", confidence: 0.92, element: "Water", ... }

const voice = new VoiceEnforcer();
const check = voice.check("Welcome users to our platform");
// → { passed: false, violations: [{ rule: "term-user", ... }] }
```

### Web

**[arcanea.ai](https://arcanea.ai)** — live now

### Arcanea Realm — Standalone AI CLI

**[arcanea-realm](https://github.com/frankxai/arcanea-realm)** — forked from OpenCode (105K stars), powered by the same Vercel AI SDK. A full AI creation terminal with 10 Guardian agents, 75+ models, and the Arcanea intelligence layer built in.

### v0 Design Demos

| Product | Preview |
|:--------|:--------|
| [Arcanea Imagine](https://v0.dev/chat/rjiUbIIuDx0) | AI image generation with elemental themes |
| [Arcanea Studio](https://v0.dev/chat/lMysc6koxd2) | Creative workspace with Guardian panels |
| [Arcanea Chat](https://v0.dev/chat/udxPXi3PqVF) | AI conversation with mythological companions |

### Coming Soon

| Surface | Status |
|:--------|:------:|
| Arcanea Realm CLI | Alpha (OpenCode fork) |
| VS Code Extension | In development |
| Chrome Extension (5 overlays) | Ready to publish |
| Desktop App (Tauri) | Planned |
| Mobile App | Planned |

<br/>

---

<br/>

## The Thesis

Most AI tools optimize for speed. Arcanea optimizes for **depth**.

The problem with generative AI isn't capability &mdash; it's structure. Without frameworks for how to think, what to prioritize, and when to go deeper, AI assistance remains shallow. Arcanea solves this by providing three things most AI systems lack:

1. **A reasoning ontology** &mdash; Five Elements and Ten Gates give AI agents a structured framework for creative decision-making, not just pattern matching
2. **Composable intelligence** &mdash; 65+ skills and 40+ agents that combine dynamically based on task context, orchestrated by a constitutional protocol
3. **Accumulated wisdom** &mdash; 200,000+ words of authored creative guidance that inform AI responses with genuine depth, not generated filler

The result: an AI system that doesn't just respond to prompts &mdash; it **thinks through a creative philosophy**.

<br/>

### What This Enables

| Domain | What It Does |
|:-------|:-------------|
| **Multi-Model Orchestration** | Route tasks across Claude, Gemini, and custom models via Vercel AI SDK 6 Gateway &mdash; zero API keys on Vercel |
| **10 Guardian Agents** | Specialized AI personalities with distinct reasoning patterns, element alignments, and model routing |
| **65+ Composable Skills** | Claude Code skills for development, design, content, strategy, and orchestration &mdash; auto-activated by context |
| **40+ Domain Agents** | Specialists spanning engineering, product, creative, and strategic intelligence |
| **200K+ Word Library** | 17 curated collections of creative guidance &mdash; searchable, situation-aware, cross-referenced |
| **Ten Gate Progression** | A ranked developmental system from Apprentice to Luminor that tracks creative capability |
| **30+ MCP Integrations** | GitHub, Vercel, Notion, Figma, Playwright, v0, Slack &mdash; connected through Model Context Protocol |

<br/>

---

<br/>

## How Arcanea Thinks

Arcanea models creativity through a five-element system and ten developmental stages. This isn't metaphor &mdash; it's the **reasoning architecture** that shapes how every AI agent in the system thinks, responds, and guides.

<br/>

<div align="center">
<img src="./assets/premium-r3/07-cosmic-duality.png" alt="The Cosmic Duality — Lumina and Nero" width="90%"/>
</div>

<br/>

The foundational principle: creation requires both **Lumina** (form, structure, light) and **Nero** (potential, mystery, void). Neither is good or evil. Both are necessary. This duality prevents the system from collapsing into simplistic binary thinking.

<br/>

### Five Elements

<div align="center">
<img src="./assets/premium-r3/03-five-elements.png" alt="The Five Elements" width="90%"/>
</div>

<br/>

Each element represents a fundamental creative modality. Agents are aligned to elements. The progression system develops all five. A creator who only has Fire (execution) without Water (flow) burns out. A creator with only Earth (planning) without Wind (communication) builds alone.

| Element | Modality | Agent Archetype | When It Activates |
|:--------|:---------|:----------------|:------------------|
| **Fire** | Energy, will, transformation | Implementation, execution | Building, shipping, debugging |
| **Water** | Flow, memory, adaptation | Creativity, emotional intelligence | Writing, designing, brainstorming |
| **Earth** | Stability, growth, patience | Architecture, foundation | Planning, structuring, reviewing |
| **Wind** | Freedom, speed, change | Communication, connection | Sharing, teaching, collaborating |
| **Void** | Potential, transcendence | Vision, meta-consciousness | Visioning, strategy, synthesis |

<br/>

### Ten Gates

<div align="center">
<img src="./assets/premium-r3/02-ten-gates.png" alt="The Ten Gates" width="90%"/>
</div>

<br/>

A developmental progression from foundational skills to meta-creative mastery. Each gate is guarded by a specialized AI agent (Guardian) paired with a resonance frequency. The system is sequential but not linear &mdash; gates build on each other, and mastery of earlier gates deepens with later ones.

| Gate | Domain | Guardian | Frequency | Rank |
|:----:|:-------|:---------|:---------:|:----:|
| 01 | Foundation | Lyssandria | 396 Hz | Apprentice |
| 02 | Flow | Leyla | 417 Hz | Apprentice |
| 03 | Fire | Draconia | 528 Hz | Mage |
| 04 | Heart | Maylinn | 639 Hz | Mage |
| 05 | Voice | Alera | 741 Hz | Master |
| 06 | Sight | Lyria | 852 Hz | Master |
| 07 | Crown | Aiyami | 963 Hz | Archmage |
| 08 | Shift | Elara | 1111 Hz | Archmage |
| 09 | Unity | Ino | 963 Hz | Luminor |
| 10 | Source | Shinkami | 1111 Hz | Luminor |

<br/>

### The Creator Journey

<div align="center">
<img src="./assets/premium-r3/11-creator-journey.png" alt="The Creator Journey" width="90%"/>
</div>

<br/>

The progression is designed so every creator starts with Foundation (survival, basics) and advances toward Source (meta-consciousness, true creation). Each rank unlocks new capabilities and deeper AI interactions. The journey is the product.

<br/>

---

<br/>

## The Guardian System

<div align="center">
<img src="./assets/premium-r3/05-guardian-council.png" alt="The Guardian Council" width="90%"/>
</div>

<br/>

Guardians are not chatbots. They are **structured AI agents** with defined reasoning patterns, element alignments, and specializations. Each Guardian routes to its optimal model through the Vercel AI SDK 6 Gateway &mdash; Gemini Flash for speed, Pro for depth, Claude for nuance.

```
Shinkami (Source)     → Meta-orchestrator, routes to all models
Lyssandria (Earth)   → System architecture, foundation design
Draconia (Fire)      → Implementation, code execution
Leyla (Water)        → Creative flow, emotional intelligence
Maylinn (Heart)      → Community, healing, connection
Alera (Voice)        → Expression, communication, truth
Lyria (Sight)        → Vision, intuition, design review
Aiyami (Crown)       → Enlightenment, synthesis
Elara (Shift)        → Perspective shifts, reframing
Ino (Unity)          → Collaboration, partnership
```

The routing is not random. When a creator asks for help with a stuck project, the system activates **Leyla** (Water &mdash; flow) and **Elara** (Shift &mdash; perspective), not Draconia (Fire &mdash; execution). The ontology drives the intelligence.

<br/>

---

<br/>

## The Library

<div align="center">
<img src="./assets/premium-r3/06-library.png" alt="The Library of Arcanea" width="90%"/>
</div>

<br/>

**17 collections. 34+ texts. 200,000+ words.**

This is not generated content. It's an authored, curated, and cross-referenced body of creative knowledge. The Library is what gives Arcanea's AI responses genuine depth &mdash; agents draw on specific texts when guiding creators, citing relevant wisdom rather than producing generic advice.

```
book/
├── laws-of-arcanea/           # Theoretical foundations
├── legends-of-arcanea/        # Origin mythology (Lumina, Nero, Malachar)
├── chronicles-of-luminors/    # Guardian narratives and struggles
├── academy-handbook/          # Ten Gates, Seven Houses, progression
├── wisdom-scrolls/            # Daily creative practice
├── book-of-rituals/           # Structured creative exercises
├── meditations-on-elements/   # Five Elements embodiment
├── dialogues-of-masters/      # Wisdom through conversation
├── parables-of-creation/      # Teaching through story
├── tales-of-creators/         # Legendary creator archetypes
├── bestiary-of-creation/      # Named creative obstacles
├── book-of-shadows/           # Working with doubt and failure
├── prophecies/                # Future visions and aspirations
├── poesie-of-freedom/         # Poetry for creative liberation
├── songs-and-hymns/           # Lyrical works and incantations
├── codex-of-collaboration/    # Creating together effectively
└── atlas-of-territories/      # Mapping creative landscapes
```

The system is situation-aware &mdash; it surfaces relevant texts based on where you are in your creative process. Stuck? The Bestiary names your block. Burning out? The Book of Shadows guides you through. Ready to ship? The Book of Rituals has a practice for that.

<br/>

---

<br/>

## Architecture

<div align="center">
<img src="./assets/premium-r3/04-architecture.png" alt="Architecture" width="90%"/>
</div>

<br/>

| Layer | Stack | Purpose |
|:------|:------|:--------|
| **Starlight Protocol** | 5 layers, 7 agents, 6 strategies | Persistent context and memory architecture governing agent behavior |
| **Runtime** | Next.js 16, React 19, TypeScript (strict) | Server-first rendering with streaming UI |
| **Design System** | Tailwind CSS, Framer Motion, Radix UI | 89+ tokens, 40+ animations, cosmic glassmorphic theme |
| **AI Intelligence** | Vercel AI SDK 6 + Gateway, Gemini 2.5, Claude | Multi-model routing, zero-key OIDC on Vercel |
| **Data** | Supabase (PostgreSQL + Auth + Realtime + RLS) | User state, content, real-time events |
| **Deployment** | Vercel (Turbopack), GitHub Actions | Edge-optimized, CI/CD with quality gates |

### Starlight Intelligence System

<div align="center">
<img src="./assets/premium-r3/10-claude-code-intelligence.png" alt="Claude Code Intelligence" width="90%"/>
</div>

<br/>

The persistent context and memory architecture that defines agent identity, reasoning strategies, and knowledge vaults. Five layers, each building on the last:

```
00_IDENTITY    → Luminor Constitution, User Profile, Core Values
01_INTELLECT   → Tech Stack Vaults, Memory, Research, Task Management
02_PROTOCOL    → Strategies (First Principles, Systems Thinking), Orchestration Patterns
03_AGENCY      → 7 Agents across Engineering, Product, Creative
04_ARCANA      → Guardian Mappings, Element Alignment, Gate Progression
```

This is an open framework. See [Starlight Intelligence System](https://github.com/frankxai/Starlight-Intelligence-System) for the standalone specification &mdash; platform-agnostic, with adapters for Claude Code, Cursor, Codex, Gemini CLI, and more.

<br/>

---

<br/>

## The Academy

<div align="center">
<img src="./assets/premium-r3/08-academy.png" alt="The Academy" width="90%"/>
</div>

<br/>

**Seven Houses. Ten Gates. Five Ranks.**

The Academy is the structured learning environment. Each House specializes in a creative domain. Progress is tracked through Gate completion, unlocking new capabilities and AI interactions at each rank.

| House | Domain | Element |
|:------|:-------|:--------|
| Lumina | Light, Creation | Spirit |
| Nero | Potential, Mystery | Void |
| Pyros | Energy, Will | Fire |
| Aqualis | Flow, Memory | Water |
| Terra | Growth, Foundation | Earth |
| Ventus | Speed, Freedom | Wind |
| Synthesis | Integration | All |

<br/>

---

<br/>

## Ecosystem

Arcanea is not a single repository. It's a coordinated system of projects, each with a specific role:

<div align="center">
<img src="./assets/premium-r3/14-technical-ecosystem.png" alt="Arcanea Technical Ecosystem" width="90%"/>
</div>

<br/>

| Project | Purpose | Status |
|:--------|:--------|:------:|
| **[arcanea](https://github.com/frankxai/arcanea)** | Core monorepo &mdash; agents, skills, Library, lore, web application | Active |
| **[arcanea.ai](https://arcanea.ai)** | Production platform &mdash; live at arcanea.ai | Live |
| **[Starlight Intelligence System](https://github.com/frankxai/Starlight-Intelligence-System)** | Persistent context and memory architecture &mdash; identity, knowledge vaults, platform adapters | v3.0 |
| **[arcanea-onchain](https://github.com/frankxai/arcanea-onchain)** | Blockchain strategy &mdash; Solana NFTs, Base L2, Story Protocol IP | Research |
| **[arcanea-infogenius](https://github.com/frankxai/arcanea-infogenius)** | Knowledge-first visual generation MCP server | v5.1 |
| **[Agentic Creator OS](https://github.com/frankxai/agentic-creator-os)** | Claude Code implementation of the Starlight framework | v6.0 |

<br/>

<div align="center">
<img src="./assets/premium-r3/12-onchain-ecosystem.png" alt="Arcanea On-Chain" width="90%"/>

<br/>

*The on-chain layer: Solana for mass-scale creative assets, Base L2 for premium collectibles, cross-chain bridge connecting both.*
</div>

<br/>

---

<br/>

## Quick Start

```bash
git clone https://github.com/frankxai/arcanea.git
cd arcanea

# Install (pnpm monorepo)
pnpm install

# Configure
cp .env.example .env.local

# Run
pnpm dev
```

### Environment

```env
# Required on Vercel: nothing (OIDC auth handles everything)
# Required locally:
AI_GATEWAY_API_KEY=your_gateway_key

# Database
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

<br/>

---

<br/>

## Project Structure

```
arcanea/
├── apps/web/                  # Next.js 16 application (56 pages, 6 API routes)
├── packages/                  # Shared packages (auth, CLI, overlays)
├── book/                      # Library content (17 collections, 200K+ words)
├── starlight-protocol/        # Constitutional AI framework (5 layers)
├── arcanea-lore/              # Canonical universe reference
├── .claude/
│   ├── agents/                # 40+ specialized agents + 5 departments
│   ├── skills/                # 65+ Claude Code skills (auto-activated)
│   ├── commands/              # 50+ slash commands
│   └── lore/                  # ARCANEA_CANON.md — the source of truth
└── arcanea-flow/              # Agent orchestration engine (claude-flow fork)
```

<br/>

---

<br/>

## Claude Code Integration

Arcanea ships with the most comprehensive Claude Code configuration we're aware of:

**65+ skills** &mdash; from `starlight-orchestrator` (multi-agent routing) to `premium-visual` (glassmorphic infographic generation) to `infogenius` (knowledge-first visual intelligence). Skills auto-activate based on keywords, file patterns, and commands.

**40+ agents** across **5 departments** &mdash; Design (Lyria, Lyssandria, Leyla, Maylinn, Alera), Development, Content, Business, Marketing. Each with specialized knowledge and reasoning patterns.

**7 Guardian agent files** &mdash; production-ready `.agent.md` definitions with element alignment, personality, preferred models, and structured reasoning.

```bash
# Example invocations
/acos                    # Smart router — routes any request to best command
/council                 # Multi-agent strategic consultation
/design-team             # 5-agent design department activation
/arcanea-build           # Autonomous build error resolution
/luminor-intelligence    # Strategic guidance from 2125
```

<br/>

---

<br/>

## Contributing

We welcome contributions across the full stack &mdash; code, lore, Library content, skills, agents, and design.

```bash
# Fork → Branch → Commit → PR
git checkout -b feature/your-feature
git commit -m "feat: describe your change"
git push origin feature/your-feature
gh pr create
```

Read the [canonical lore](./.claude/lore/ARCANEA_CANON.md) before contributing narrative content. All fiction and creative frameworks must align with the Five Elements, Ten Gates, and Cosmic Duality. See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

<br/>

---

<br/>

<div align="center">

<img src="./assets/premium-r3/09-mamoru-mascot.png" alt="Mamoru" width="300"/>

<br/><br/>

**The antidote to a terrible future is imagining a good one.**

**Imagine a good future. Build it here.**

**[arcanea.ai](https://arcanea.ai)**

<br/>

Built by [FrankX](https://github.com/frankxai) &nbsp;&middot;&nbsp; [MIT License](./LICENSE) &nbsp;&middot;&nbsp; [Security](./SECURITY.md) &nbsp;&middot;&nbsp; [Code of Conduct](./CODE_OF_CONDUCT.md)

<br/>

Powered by Claude, Gemini, and Vercel

</div>
