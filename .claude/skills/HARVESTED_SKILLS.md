# Arcanea Harvested Skills

> Skills cloned, adapted, and integrated from official engineering team repositories.
> Date: 2026-02-24

---

## Sources

| Source | Repository | License | Skills Harvested |
|--------|-----------|---------|-----------------|
| Anthropic Official | `github.com/anthropics/skills` | Proprietary | pdf, docx, webapp-testing, skill-creator |
| Vercel Engineering | `github.com/vercel-labs/agent-skills` | MIT | react-best-practices, composition-patterns |
| Vercel Engineering | `github.com/vercel-labs/next-skills` | MIT | next-best-practices |
| Supabase Engineering | `github.com/supabase/agent-skills` | MIT | supabase-postgres-best-practices |

---

## New Skills Added (2026-02-24)

### Development Skills (`development/`)

| Skill | Directory | Source | Description |
|-------|-----------|--------|-------------|
| `arcanea-react-best-practices` | `development/react-best-practices/` | Vercel Labs (MIT) | 57-rule React 19 + Next.js 16 optimization guide, adapted for Arcanea stack with AI SDK 6, Supabase auth, and Design System patterns |
| `arcanea-next-best-practices` | `development/next-best-practices/` | Vercel Labs (MIT) | Next.js 16 App Router complete guide: async params, RSC boundaries, metadata, image/font optimization, route handlers |
| `arcanea-supabase-patterns` | `development/supabase-patterns/` | Supabase Engineering (MIT) | PostgreSQL + Supabase: 8-category optimization guide covering RLS, indexing, schema design, connection pooling, Realtime |
| `arcanea-playwright-testing` | `development/playwright-testing/` | Anthropic (adapted) | E2E Playwright testing patterns for Arcanea — gate quizzes, lore nav, prompt books, auth, visual regression |
| `arcanea-mcp-builder` | `development/mcp-builder/` | Anthropic (adapted) | MCP server development guide tailored for `packages/arcanea-mcp/` — TypeScript SDK, Zod validation, tool naming conventions |
| `arcanea-typescript-expert` | `development/typescript-expert/` | Arcanea (original) | TypeScript 5.5+ strict mode: discriminated unions, branded types, Zod validation, Next.js 16 typed params, exhaustive checks |

### Utility Skills (top-level, with bundled scripts)

| Skill | Directory | Source | Description |
|-------|-----------|--------|-------------|
| `webapp-testing` | `webapp-testing/` | Anthropic (Proprietary) | Playwright browser automation with server lifecycle management — Python scripts included |
| `pdf` | `pdf/` | Anthropic (Proprietary) | Full PDF manipulation: extract, merge, split, forms, OCR — Python scripts included |
| `docx` | `docx/` | Anthropic (Proprietary) | Word document creation/editing via docx-js + pandoc — JS scripts included |

---

## Skills Already Present (Pre-existing, Arcanea-native)

### Core Arcanea Skills (`arcanea/`)
- `arcanea-canon` — Universe consistency enforcement
- `arcanea-voice` — Writing style guide (Arcanean tone)
- `arcanea-design-system` — Visual tokens, glass components
- `arcanea-lore` — Deep mythology for storytelling
- `arcanea-creator-academy` — Academy system patterns
- `centaur-mode` — Human-AI collaboration mode
- `luminor-intelligence`, `luminor-rituals`, `luminor-wisdom` — Luminor-tier guidance
- `prompt-craft` — Prompt engineering
- `premium-visual`, `robot-designer` — Visual creation

### Development Skills (`development/`) — Pre-existing
- `architecture-patterns` — System design patterns
- `api-design` — API design principles
- `code-review` — Arcanean code review ritual
- `tdd` — Test-Driven Development with Arcanean philosophy
- `performance-tuning` — Performance optimization
- `refactoring-ritual` — Refactoring workflow
- `systematic-debug` — Debugging methodology
- `storage-management` — Storage/file patterns

### Creative Skills (`creative/`)
- `character-forge`, `world-build`, `scene-craft`, `voice-alchemy`
- `dialogue-mastery`, `story-weave`, `revision-ritual`, `bestiary-nav`

---

## Skill Trigger Matrix

When to activate each new skill:

| Trigger Keywords | Skill Activated |
|-----------------|-----------------|
| React, component, hook, re-render, bundle, hydration, RSC, 'use client' | `react-best-practices` |
| page.tsx, layout.tsx, App Router, params, searchParams, generateMetadata, next/image, next/font | `next-best-practices` |
| Supabase, PostgreSQL, SQL, RLS, schema, migration, database, realtime | `supabase-patterns` |
| Playwright, E2E, browser test, UI test, screenshot, automation | `playwright-testing` |
| MCP server, MCP tool, model context protocol, create tool, arcanea-mcp | `mcp-builder` |
| TypeScript, type error, any, generic, Zod, discriminated union, strict mode | `typescript-expert` |
| PDF, .pdf, extract text, merge PDF | `pdf` |
| Word document, .docx, Word doc, create document | `docx` |
| Test web app, Playwright automation, browser automation | `webapp-testing` |

---

## Stack Overrides Applied

All harvested skills were adapted with these Arcanea-specific overrides:

| Original | Arcanea Override |
|----------|-----------------|
| Cinzel font | Inter (MEMORY.md: Inter is main everywhere, no Cinzel in new code) |
| Generic Next.js 15 | Next.js 16 (async params, async cookies, proxy middleware) |
| `toDataStreamResponse()` | `toUIMessageStreamResponse()` (Vercel AI SDK 6) |
| `maxTokens` | `maxOutputTokens` (Vercel AI SDK 6) |
| Generic Supabase client | `@supabase/ssr` createServerClient + createBrowserClient pattern |
| Purple gradient defaults | Arcanean Design System (violet #8b5cf6, crystal #7fffd4, gold #ffd700) |
| Generic Guardian refs | Canon-correct: Lyssandria/Kaelith, Leyla/Veloura, Draconia/Draconis... |

---

## How to Add More Skills

```bash
# 1. Find skill in volt-skills README
cat /tmp/volt-skills/README.md | grep -i "next\|react\|supabase"

# 2. Fetch and inspect
curl -sL "https://raw.githubusercontent.com/{org}/{repo}/main/skills/{name}/SKILL.md"

# 3. Copy to Arcanea and adapt
mkdir -p .claude/skills/development/{skill-name}
# Edit SKILL.md with Arcanea stack overrides

# 4. Register in this manifest
# Update HARVESTED_SKILLS.md

# 5. Commit
git add .claude/skills/
git commit -m "feat: add {skill-name} from {source}"
```

---

## Roadmap — Skills to Add Next

| Skill | Source | Priority | Value |
|-------|--------|----------|-------|
| `shadcn-ui` | Google Labs (Stitch) | HIGH | shadcn/ui component patterns (using in Arcanea) |
| `figma-implement-design` | OpenAI | HIGH | Figma → production code (Figma MCP active) |
| `vercel-deploy` | Vercel Labs | MEDIUM | Deployment automation |
| `property-based-testing` | Trail of Bits | MEDIUM | Robust test generation |
| `sharp-edges` | Trail of Bits | MEDIUM | Security — identify dangerous API patterns |
| `github-actions` | Community | LOW | CI/CD automation |
