# Contributing to Arcanea

Arcanea welcomes contributions across the full stack: code, lore, Library content, skills, agents, and design. This guide covers the essentials.

## Prerequisites

- Node.js 20+ and pnpm 9+
- Git and a GitHub account
- For AI features locally: `AI_GATEWAY_API_KEY` (Vercel AI Gateway)

## Setup

```bash
# Fork on GitHub, then:
git clone https://github.com/your-username/arcanea.git
cd arcanea
pnpm install
cp .env.example .env.local
# Add your AI_GATEWAY_API_KEY to .env.local
pnpm dev
```

## Architecture

```
arcanea/
├── apps/web/              # Next.js 16 application (React 19, TypeScript strict)
├── packages/              # Shared packages (auth, CLI, overlays)
├── book/                  # Library content (17 collections, 200K+ words)
├── starlight-protocol/    # Constitutional AI framework (5 layers)
├── arcanea-lore/          # Canonical universe reference
├── .claude/
│   ├── agents/            # 38 specialized agents + 5 departments
│   ├── skills/            # 77 Claude Code skills
│   ├── commands/          # 25+ slash commands
│   └── lore/              # ARCANEA_CANON.md
└── arcanea-flow/          # Agent orchestration engine
```

**Stack**: Next.js 16, React 19, TypeScript (strict), Tailwind CSS, Framer Motion, Radix UI, Supabase (PostgreSQL + Auth + RLS), Vercel AI SDK 6 (Gateway with OIDC), Vercel deployment.

## Contribution Types

### Code

- **Features**: New functionality in `apps/web/` or `packages/`
- **Fixes**: Bug fixes with clear before/after
- **Skills**: New Claude Code skills in `.claude/skills/`
- **Agents**: New agent definitions in `.claude/agents/`

### Content

- **Library texts**: New entries in `book/` collections. Must align with [ARCANEA_CANON.md](./.claude/lore/ARCANEA_CANON.md)
- **Lore expansion**: World-building additions to `arcanea-lore/`
- **Documentation**: Guides, API docs, tutorials

### Design

- **Components**: Follow the cosmic design system (dark void backgrounds, glass morphism, teal/gold/violet accents)
- **Animations**: Framer Motion variants in `lib/animations.ts`
- **Tokens**: Tailwind config extensions in `tailwind.config.ts`

## Development Workflow

### Branching

```
feature/guardian-voice-improvements
fix/supabase-rls-policy-leak
content/legends-book-iii
```

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(guardians): add Draconia fire-mode reasoning pattern
fix(api): resolve AI Gateway timeout on streaming responses
content(library): add Book of Shadows chapter 4
```

### Pull Request Process

1. Create a feature branch from `main`
2. Write your changes — TypeScript must compile with zero errors
3. Push and open a PR using the provided template
4. Address review feedback
5. Merge after approval

## Code Standards

**TypeScript**: Strict mode, no `any` types. Meaningful names. Server Components by default, Client Components only when state/effects are needed.

**Styling**: Tailwind CSS utilities only. Follow the design system — cosmic-void backgrounds, glass/crystal materials, teal (#7fffd4) primary accent. Dark theme only.

**AI Integration**: All AI calls go through Vercel AI SDK 6 Gateway. Model IDs use gateway format: `google/gemini-2.5-flash`, `anthropic/claude-sonnet-4-5`. Client components must import from `lib/ai/client.ts`, never from server-side AI modules.

**Testing**: Playwright for E2E, Jest for unit tests. CI runs TypeScript compilation, ESLint, and production build verification on every PR.

## Canon Alignment

All narrative content must align with the canonical universe. Before contributing lore or Library content:

1. Read [ARCANEA_CANON.md](./.claude/lore/ARCANEA_CANON.md) — the source of truth
2. Use the Five Elements system (Fire, Water, Earth, Wind, Void)
3. Use the Ten Gates and Guardian names correctly
4. Respect the Cosmic Duality — Lumina (form) and Nero (potential), neither good nor evil
5. Reference the proper magic terminology (Arcane, Song, Mana, Anima)

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/frankxai/arcanea/issues)
- **Security**: [SECURITY.md](./SECURITY.md) for vulnerability disclosure
- **Code of Conduct**: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

## Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Vercel AI SDK 6](https://sdk.vercel.ai/)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
