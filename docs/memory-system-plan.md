# Arcanea Memory System — Build Plan
**Session**: Overnight Feb 25-26, 2026
**Architects**: Shinkami (Source 1111 Hz) + 10 Guardian agents

---

## Strategic Decisions (LOCKED)

### Storage: .md files FIRST (not Mem0, not sqlite)
**Why**: Zero deps, human-readable, git-friendly, Claude Code reads natively.
- Vault entries = `.md` files with YAML frontmatter in `.arcanea/memory/vaults/{type}/`
- Horizon = `.arcanea/memory/horizon.jsonl` (append-only JSONL)
- MEMORY.md bridge = auto-sync top-K entries into Claude Code's native format
- Mem0 adapter = compatible API, can swap to cloud Mem0 later — no rearchitecture needed

### Naming (LOCKED)
- **Package**: `@arcanea/memory-system`
- **Main class**: `StarlightVaults` (the 6-vault constellation)
- **Ledger name**: `HorizonLedger` ✓ (it IS the Horizon Vault's ledger — name makes sense)
- **Brand**: "Starlight Vaults" powered by `@arcanea/memory-system`
- **Public dataset**: "Starlight Horizon Dataset" (CC-BY-SA 4.0)
- **NOT**: StarlightLedger (that would be confusing with the full system)

### Directories (LOCKED)
```
.arcanea/memory/          ← ALL vault data lives here
├── vaults/
│   ├── strategic/        ← .md files per entry
│   ├── technical/
│   ├── creative/
│   ├── operational/
│   ├── wisdom/
│   └── index.json        ← fast lookup index
├── horizon.jsonl         ← append-only ledger
├── horizon-index.json    ← stats/tags index
└── MEMORY.md             ← auto-generated for Claude Code
```
**Not `.starlight/`** — keep everything under `.arcanea/` (canonical brain).

### Frequencies (LOCKED — Canon-Correct)
- Maylinn = Heart Gate = **417 Hz** (correct per canon)
- 432 Hz is a music TUNING system (Verdi tuning) — NOT part of Solfeggio scale
- Do NOT change frequencies — canon is authoritative

### Unique Differentiators (vs Mem0, Pieces, BasicMemory)
1. **Vault-typed .md files** — browsable, searchable, git-diffs show memory changes
2. **Guardian namespacing** — 10 named memory domains with mythological identity
3. **MEMORY.md bridge** — auto-syncs to Claude Code's native memory format
4. **HorizonLedger** — append-only benevolent intentions (unique to Arcanea, future training data)
5. **Gate frequency encoding** — memories tagged with Hz frequencies
6. **Mem0-compatible API** — future-proof: swap to cloud without code changes

---

## Phase Tracker

| Phase | Agent | Status | Output |
|-------|-------|--------|--------|
| 1a | Scaffold (Wave 1 Lyssandria) | ✅ DONE | types.ts, vault-classifier.ts, package.json |
| 1b | VaultManager (Wave 1 Leyla) | ✅ DONE | vault-manager.ts (778 lines) |
| 1c | HorizonLedger (Wave 1 Draconia) | ✅ DONE | horizon-ledger.ts (432 lines) |
| 1d | Starlight v5 (Wave 1 Lyria) | ✅ DONE | vault-memory.ts, v5.0.0, zero TS errors |
| 1e | MCP Tools (Wave 1 Alera) | IN PROGRESS | vault-tools.ts |
| 1f | Tests (Wave 1 Maylinn) | IN PROGRESS | test files |
| 2a | MD FileBackend | LAUNCHING | file-backend.ts complete |
| 2b | StarlightVaults API | LAUNCHING | starlight-vaults.ts (main class) |
| 2c | MEMORY.md Bridge | LAUNCHING | memory-bridge.ts |
| 2d | CLI Tool | LAUNCHING | bin/starlight.ts |
| 2e | ArcaneMD Format | LAUNCHING | format spec + migration tools |
| 2f | Integration Tests | LAUNCHING | e2e test suite |
| 2g | Monorepo Wiring | LAUNCHING | pnpm workspace entry |
| 2h | Git Commit + Push | LAUNCHING | all changes committed |
| 2i | npm Publish Prep | LAUNCHING | publish config |
| 2j | Starlight Integration | LAUNCHING | SIS package updated |

---

## Errors Log
| Error | Phase | Resolution |
|-------|-------|------------|

---

## Key Files
- Package: `packages/memory-system/`
- Starlight: `/mnt/c/Users/frank/Starlight-Intelligence-System/`
- Monorepo root: `/mnt/c/Users/frank/Arcanea/`
- Canon: `.arcanea/lore/CANON_LOCKED.md`
