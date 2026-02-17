# Findings: Arcanea — Every Surface Strategy

## Date: 2026-02-17
## Question: How do we own EVERY surface — overlay + standalone CLI + VS Code + browser + desktop + mobile?

---

## Critical Discovery: OpenCode Is Now TypeScript

The original OpenCode (Go, `opencode-ai/opencode`) was **archived September 2025**. It was rewritten in **TypeScript** and now lives at `anomalyco/opencode` (Anomaly Co, ex-SST team).

| Attribute | OpenCode (TypeScript) |
|:----------|:---------------------|
| **Language** | TypeScript (50.7%) |
| **Runtime** | Bun |
| **TUI** | OpenTUI + SolidJS (custom, 60fps) |
| **AI SDK** | Vercel AI SDK (SAME AS ARCANEA) |
| **Architecture** | Client-server — TUI talks to local HTTP server |
| **Models** | 75+ via Vercel AI SDK |
| **MCP** | Full support (stdio + HTTP) |
| **Plugin System** | Mature — TypeScript plugins, custom agents, custom commands |
| **License** | MIT — fully forkable |
| **Stars** | 105K |
| **Monorepo** | packages/opencode (TUI+server), sdk/js, app (web), desktop (Tauri), plugin, ui, sdks/vscode |

### Why This Is Perfect For Arcanea
1. **Same AI SDK** — Vercel AI SDK, already in our stack
2. **Plugin system** — Arcanea OS becomes a plugin set (Guardian routing, voice, design tokens, lore)
3. **Client-server split** — reskin TUI without touching AI logic
4. **Multi-surface** — TUI + web + desktop + VS Code from ONE codebase
5. **MIT license** — full freedom to fork, rebrand, commercialize
6. **TypeScript** — our language

### Alternative: Gemini CLI

| Attribute | Gemini CLI |
|:----------|:-----------|
| **Language** | TypeScript (98.1%) |
| **Runtime** | Node.js 20+ |
| **TUI** | Ink + React 19 (we know React deeply) |
| **AI SDK** | @google/genai (Gemini ONLY) |
| **License** | Apache 2.0 |
| **Stars** | 95K |
| **Monorepo** | cli, core, a2a-server, vscode-ide-companion |

**Pros**: React/Ink = our stack, cleaner architecture, smaller codebase
**Cons**: Gemini-only (would need to rip out and replace AI layer), Google telemetry baked in

### Verdict: Fork OpenCode

OpenCode wins because of Vercel AI SDK (already our stack), MIT license, plugin system (cleanest integration), and multi-surface architecture (TUI + web + desktop + VS Code all from one server).

---

## The "ALL Surfaces" Architecture

```
┌────────────────────────────────────────────────────────┐
│                     ARCANEA OS                          │
│   @arcanea/os — Intelligence layer (npm package)        │
│                                                         │
│   Guardians · Voice Bible · Design System · Lore/Canon  │
│   Session State · 65+ Skills · 40+ Agents · Types       │
└────────┬──────────┬──────────┬──────────┬──────────────┘
         │          │          │          │
    ┌────┴───┐ ┌───┴────┐ ┌──┴────┐ ┌──┴──────────┐
    │ Overlay│ │  MCP   │ │ VS    │ │  Standalone  │
    │ Configs│ │ Server │ │ Code  │ │     CLI      │
    │        │ │        │ │  Ext  │ │ (OpenCode    │
    │.claude │ │30 tools│ │       │ │  fork)       │
    │.cursor │ │7 rsrc  │ │       │ │              │
    └───┬────┘ └───┬────┘ └──┬────┘ └──────┬───────┘
        │          │         │              │
   Enhances    Works in   VS Code      Standalone
   existing    Claude,    Marketplace  "Arcanea Realm"
   AI tools    Cursor,                 TUI + web + desktop
               Windsurf,
               Cline, Codex
```

### Product Line

| Product | What It Is | Source |
|:--------|:-----------|:-------|
| **@arcanea/os** | Intelligence layer (npm) | `packages/core/` (rename) |
| **@arcanea/cli** | Overlay installer ("Oh My Zsh for AI") | `packages/cli/` (slim down) |
| **@arcanea/mcp-server** | Universal tool access | `packages/arcanea-mcp/` |
| **Arcanea Realm CLI** | Standalone AI creation tool | Fork of `anomalyco/opencode` |
| **Arcanea Realm VS Code** | VS Code extension | New package |
| **Arcanea Realm Browser** | 5 browser overlays | `packages/overlay-*` |
| **Arcanea Realm Desktop** | Desktop app | OpenCode's Tauri package |
| **Arcanea Realm Web** | Web app | OpenCode's web package |
| **arcanea.ai** | Marketing + platform | `arcanea-platform` repo |

### How The Fork Works

1. Fork `anomalyco/opencode` → `frankxai/arcanea-realm`
2. The OpenCode server already supports MCP → add `@arcanea/mcp-server` as default
3. The OpenCode plugin system → install `@arcanea/os` as a plugin providing Guardians, voice, design
4. Reskin TUI → Arcanea Design System colors, Guardian status in sidebar, Gate progression
5. Custom agents → 10 Guardian agents in `.opencode/agents/`
6. Custom commands → worldbuilding commands via plugin
7. Rename binary → `arcanea` or `realm`

### What Stays As Is

| Package | Keeps Its Role |
|:--------|:---------------|
| `@arcanea/os` | Intelligence library — used by ALL surfaces |
| `@arcanea/mcp-server` | Tool layer — used by overlay CLI AND standalone fork |
| `@arcanea/cli` | Overlay installer — for people who DON'T want a standalone tool |
| The fork | Standalone product — for people who want Arcanea as their primary tool |

---

## Key Decision: Don't Choose. Ship Both.

**Overlay path** (quick, wide reach):
- `npx @arcanea/cli init` → enhances existing AI tools
- No switching cost for users — they keep Claude Code/Cursor

**Standalone path** (deep, owned UX):
- `npx arcanea-realm` → full Arcanea experience
- Custom TUI, Guardian sidebar, Gate progression, worldbuilding commands
- All the UX we dream of

Both powered by the same `@arcanea/os` intelligence and `@arcanea/mcp-server` tools.
