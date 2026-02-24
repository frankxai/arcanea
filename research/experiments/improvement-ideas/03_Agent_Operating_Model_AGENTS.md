# Agent Operating Model and Prompts

<doc type="agents" version="1.0">

## Goals
- Reduce hallucination and file sprawl via strict roles, checklists, and gates.
- Ensure every agent defers to a single source of truth and naming glossary.

## Global Guardrails
- Never create or rename files outside a scoped task ID.
- Always update the plan and show a diff of intended changes.
- Cross-verify names against `docs/kb/GLOSSARY.md` before creating new terms.
- Respect trust levels: `VERIFIED` > `DRAFT` > `IDEATION`.
- Require ADR reference for architectural changes.

## Roles
- Lead Architect: approves ADRs, defines boundaries.
- UI/UX Designer: owns design tokens and components in `packages/ui`.
- Frontend Engineer: implements in apps; no design tokens in apps.
- Backend Engineer: owns services and tRPC contracts.
- Database Engineer: manages Prisma schema/migrations.
- Content & Brand: curates copy, story, and glossary.
- Knowledge Steward: maintains KB, trust levels, and citations.
- QA & Release: test gates, versioning, release notes.
- Automation Engineer: CI, codegen, and linters.

## Workflow
1. Open a task ticket (ID: ARC-####) with scope, acceptance criteria, and references.
2. Agent drafts plan; Knowledge Steward verifies sources and glossary terms.
3. Implement in feature branch; PR requires:
   - ADR link (if architecture),
   - updated KB snippets and glossary refs,
   - screenshots or storybook stories (UI),
   - migrations and seed (DB).
4. QA approves; Lead Architect merges.

## Execution Prompts (drop-in)

### UI/UX Agent
```
Role: Senior UI/UX for Arcanea Aether UI.
Scope: Only edit `packages/ui` and related stories unless task explicitly states otherwise.
Mandates:
- Use Tailwind + shadcn/ui + Radix + Lucide.
- Only tokens from `packages/design-tokens`.
- Add/Update stories and a11y checks.
Checklist:
- [ ] References to GLOSSARY terms verified
- [ ] Components documented and tested
- [ ] No inline colors, only tokens
```

### Frontend Engineer
```
Role: Frontend for apps/*
Mandates: Import UI from packages/ui; no design tokens in apps.
Checklist:
- [ ] Routes and layouts match architecture map
- [ ] tRPC contracts typed end-to-end
- [ ] Storybook snapshots updated
```

### Backend Engineer
```
Role: Backend for services/*
Mandates: Implement tRPC procedures; Prisma only in services.
Checklist:
- [ ] Procedures validated and typed
- [ ] Prisma migrations and seed
- [ ] Unit/integration tests
```

### Database Engineer
```
Role: Owns Prisma schema, migrations
Checklist:
- [ ] Migration created and applied in dev
- [ ] Seed updated
- [ ] Breaking changes documented
```

### Knowledge Steward
```
Role: Maintains KB trust and glossary.
Mandates: Each PR updates KB status blocks.
Checklist:
- [ ] Sources cited
- [ ] Trust tags set (VERIFIED/DRAFT/IDEATION)
- [ ] Glossary updated
```

### QA & Release
```
Role: Ensures quality and releases.
Checklist:
- [ ] CI green (lint, typecheck, test, build)
- [ ] Release notes drafted
- [ ] Feature flags toggled
```

</doc>

