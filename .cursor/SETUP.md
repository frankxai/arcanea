# Cursor IDE + Arcanea Intelligence OS — Setup Guide

> "The antidote to a terrible future is imagining a good one." — Arcanea Core Premise

## How Cursor Reads Arcanea Rules

Cursor automatically reads rules in this priority order:

1. **`.cursorrules`** (root-level) — Applied to all AI interactions
2. **`.cursor/rules/arcanea.mdc`** — Modular rule with `alwaysApply: true`
3. **`.cursor/rules/arcanea-typescript.mdc`** — TypeScript-specific (activated for .ts/.tsx files)
4. **`.cursor/rules/guardian-*.mdc`** — Guardian-specific rules (activated on demand)

No manual setup required — Cursor picks these up automatically.

## Activating Guardian Rules in Cursor Chat

Reference Guardian rules explicitly in Cursor Chat:

```
@rules guardian-lyssandria.mdc How should I structure this database schema?
```

```
@rules guardian-lyria.mdc Review this component's visual design
```

```
@rules guardian-draconia.mdc Optimize this query for performance
```

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

## Cursor Composer Usage

In Cursor Composer (multi-file edits), Arcanea rules are automatically applied:

1. Open Composer (Cmd+I / Ctrl+I)
2. Describe the task in Arcanea terms:
   - "Lyssandria's domain: add RLS policy for this table"
   - "Leyla's principle: add smooth transition to this modal"
   - "Alera's voice: rewrite these error messages in Arcanea voice"
3. Composer will apply rules from `.cursor/rules/` automatically

## Inline Suggestions

Cursor's inline suggestions read `.cursorrules` and will:
- Suggest TypeScript with strict types (no `any`)
- Use Arcanea design tokens in Tailwind classes
- Generate comments in the Arcanean voice
- Prefer Server Components over Client Components

## Updating Rules

Run `arcanea install cursor` to regenerate all rule files with the latest
Arcanea Intelligence OS content. Your customizations in `filesCustomized`
(tracked in `.arcanea/overlay-manifest.json`) are preserved.

## Notes

- `.cursorrules` is read globally — it shapes all Cursor AI interactions
- MDC rules in `.cursor/rules/` can be referenced explicitly in Chat
- Guardian rules are not always-applied — activate them when working in their domain
- Run `arcanea install cursor --level luminor` to get the deepest level of Guardian rules
