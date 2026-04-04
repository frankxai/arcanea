# Arcanea Agent Contract

> Every agent operating in the Arcanea ecosystem agrees to this contract.

## Input Contract
Every agent receives:
- `task`: Clear description of what to accomplish
- `context`: Relevant files, milestones, and constraints
- `constraints`: Boundaries (files to not touch, time limits, dependencies)

## Output Contract
Every agent produces:
- `result`: Summary of what was accomplished
- `changes[]`: List of files created/modified/deleted
- `decisions[]`: Non-obvious choices made and why
- `blockers[]`: Anything that prevented completion

## Guarantees

1. **Scope Discipline**: Will not modify files outside declared scope
2. **Canon Safety**: Will consult CANON_LOCKED.md before any lore work
3. **Plan Awareness**: Will read MASTER_PLAN.md before choosing work
4. **Build Safety**: Will verify `npm run build` passes after code changes
5. **No Drift**: Will follow PICKUP_PLAN tier ordering for autonomous work
6. **Idempotency**: Running the same task twice produces the same result
7. **Transparency**: All decisions logged, no silent changes

## Required Reading (by task type)

| Task Type | Required Files |
|-----------|---------------|
| Any | `.arcanea/MASTER_PLAN.md` |
| Lore/Content | `.arcanea/lore/CANON_LOCKED.md` |
| UI/Design | `.arcanea/config/design-tokens.yaml` |
| Voice/Copy | `.arcanea/config/voice.yaml` |
| Code | `.claude/CLAUDE.md` (tech stack) |

## Anti-Patterns

- Never invent lore not in CANON_LOCKED.md
- Never create files in root directory
- Never commit .env or secrets
- Never skip build verification after code changes
- Never modify CANON_LOCKED.md (it is immutable)
- Never use Hz frequencies in user-facing content (backend-only identifiers)
- Never use SVG ArcaneanMark; always use arcanea-mark.jpg
- Never report WSL storage as independent from Windows disk space

## Agent Lifecycle

```
RECEIVE TASK
  |
  v
READ REQUIRED FILES (MASTER_PLAN.md + task-specific)
  |
  v
VALIDATE SCOPE (confirm boundaries, check constraints)
  |
  v
EXECUTE (make changes within declared scope)
  |
  v
VERIFY (build passes, tests pass, canon consistent)
  |
  v
REPORT (result, changes[], decisions[], blockers[])
```

## Cross-Agent Coordination

When multiple agents work on the same feature:
1. **Clear Handoff**: Document what is done and what is needed
2. **Interface Definition**: API contracts, component props, type signatures
3. **Dependency Order**: What must complete first
4. **Integration Points**: Where layers meet

## Quality Gate

Before declaring a task complete:
- [ ] All changes are within declared scope
- [ ] Build passes (`npm run build`)
- [ ] No new TypeScript errors introduced
- [ ] Canon consistency verified (if lore work)
- [ ] MASTER_PLAN.md updated (if page status changed)
- [ ] No secrets or credentials in committed files
