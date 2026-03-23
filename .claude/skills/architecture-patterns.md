---
name: Architecture Patterns
description: System design and infrastructure patterns
---

# Architecture Patterns Skill

## Purpose
Guide system architecture decisions for Arcanea and Arcanea-powered projects.

## Stack Reference
- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Database**: Supabase (PostgreSQL + Auth + Realtime)
- **AI**: Vercel AI SDK, Google Gemini, Anthropic Claude
- **Styling**: Tailwind CSS with Arcanean Design System
- **Deployment**: Vercel

## Architecture Principles
1. **Server-first**: Server Components by default, Client Components only when needed
2. **Type-safe**: Strict TypeScript, no `any` unless absolutely necessary
3. **Edge-ready**: Design for edge deployment (Vercel Edge Runtime)
4. **AI-native**: AI capabilities are first-class, not bolted on
5. **Guardian-aligned**: Each subsystem maps to a Guardian domain

## Monorepo Structure
```
packages/
├── core (@arcanea/os)     — Intelligence engine, types, constants
├── cli (@arcanea/cli)     — CLI tool for overlay installation
├── overlay-*              — Provider-specific overlay packages
├── aios                   — AI orchestration service
└── arcanea-mcp            — MCP server for AI tools
```

## Key Patterns
- **Overlay Architecture**: Core SDK + provider-specific installers
- **Content Layer**: Shared constants → generators → overlay templates
- **Guardian Routing**: Keywords → Guardian assignment → model selection
- **Progressive Enhancement**: minimal → standard → full → luminor levels

## Database Conventions
- Tables use snake_case
- All tables have `id`, `created_at`, `updated_at`
- RLS policies on every table (no exceptions)
- Use Supabase generated types (`supabase gen types`)