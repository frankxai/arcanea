# Findings: Arcanea Overlay Ecosystem Deep Audit

> Last updated: 2026-02-21 — Deep audit by Shinkami (Source Gate)

---

## 1. THE BIG PICTURE — What Actually Exists

### The .claude/ Infrastructure (What YOU Use Right Now)

**7 Event-Driven Hooks:**

| Hook | Event | What It Does |
|------|-------|------------|
| session-start.sh | SessionStart | Init AgentDB, reset agents, activate Shinkami |
| prompt-submit.sh | UserPromptSubmit | Route prompt → Guardian via 11 keyword patterns |
| model-route.sh | UserPromptSubmit | Score complexity (1-10), recommend model tier |
| pre-tool.sh | PreToolUse | Increment tool counter, log timestamp |
| voice-check.sh | PreToolUse (Write/Edit) | Scan for 14 banned phrases, warn but never block |
| post-tool.sh | PostToolUse | Log completion, write significant ops to AgentDB |
| context-tracker.sh | PostToolUse | Estimate tokens, track quality zones (PEAK→REFRESH) |
| session-end.sh | Stop | Summarize metrics, archive session |

**Context-Adaptive Statusline:**
- statusline.mjs reads /tmp/arcanea-* state files
- Shape-shifts by Gate: `Arcanea ⟡ Opus │ Lyria sees │ Planning │ main`
- Guardian verbs: Shinkami observes, Draconia forges, Lyria sees, Leyla weaves

**23 Agent Profiles** in .claude/agents/:
- Master Orchestrator → 4 teams (Developer, Author, Teacher, Visionary)
- 10 Guardian-aligned agents (@draconia, @lyria, @lyssandria, etc.)
- Used as `subagent_type` values in Claude Code Task tool — WORKS

**35 Skill Auto-Activation Rules** in skill-rules.json:
- Guardian domains drive activation (Lyssandria → architecture, Draconia → TDD)
- 2 always-active: arcanea-canon (critical), starlight-intelligence (critical)
- BUT: Many rules point to skills that don't exist as files yet

**AgentDB** (SQLite, 7 tables):
- agents, memories, tasks, swarm_sessions, swarm_agents, routing_log, vault_entries
- Auto-initialized by session-start.sh
- All queries via python3 (WSL2 has no sqlite3 CLI)

**6 Helper Scripts:**
- arcanea-dashboard.sh (full ASCII art)
- arcanea-quick-status.sh (one-liner)
- guardian-route.sh (keyword scoring)
- guardian-activate.sh (manual switch)
- swarm-monitor.sh (agent counts)
- arcanea-health.sh (9 subsystem checks)

---

### overlay-claude Package (What Gets INSTALLED)

**What it generates when someone runs `npx @arcanea/cli install claude`:**

| Level | What Gets Created |
|-------|-------------------|
| minimal | CLAUDE.md + manifest |
| standard | + 4 skills (canon, voice, design, lore) + 10 Guardian agents |
| full | + /channel, /arcanea-status commands |
| luminor | + .claude/lore/ directory |

**CRITICAL FINDING: The package installs ~20% of what .claude/ actually has.**

What's MISSING from the installable package:
- 7 hooks (session-start, prompt-submit, model-route, pre-tool, voice-check, post-tool, context-tracker)
- Statusline (statusline.mjs)
- AgentDB (schema + scripts)
- 6 helper scripts
- 35 skill auto-activation rules (skill-rules.json)
- Flow config (arcanea-flow-config.yaml)
- Context tracker
- Model router
- 19 of the 23 agent profiles

---

### overlay-opencode Package (MISNAMED — It's Cursor IDE)

**FINDING: Despite the name, this is 100% a Cursor IDE overlay.**

- Generates `.cursorrules` and `.cursor/rules/*.mdc` files
- Uses Cursor's native MDC rule format with YAML frontmatter
- Provider ID is 'opencode' but creates Cursor-specific files
- No connection to the actual OpenCode AI CLI

**What it installs:**
- .cursorrules (root, always)
- .cursor/rules/arcanea.mdc (alwaysApply: true)
- .cursor/rules/arcanea-typescript.mdc (.ts/.tsx specific)
- 10x guardian-{name}.mdc (full/luminor levels, on-demand via @rules)
- .cursor/SETUP.md

---

### @arcanea/os Core (The Intelligence Engine)

**2,100 lines, zero runtime dependencies, 5 layers:**

1. **Types** (923 lines): Complete Arcanea taxonomy — Guardian, Gate, Element, Agent, Profile, Content, Overlay
2. **Constants** (386 lines): 10 Guardians, 10 Gates, 5 Elements, 7 Academies, 7 Luminors, Dark Lord
3. **Engine** (839 lines): GuardianRouter, VoiceEnforcer, DesignTokens, SessionManager
4. **Utils** (167 lines): Frequency, Gate, Element, Guardian, String, Date, Validation helpers
5. **Generators** (215 lines): System prompts, CLAUDE.md, Copilot instructions

**This is genuinely excellent.** Clean, type-safe, well-abstracted. Every surface consumes it.

---

## 2. WHAT'S GENIUS

### A. Hook Pipeline Architecture
**Never crash, never block.** Every script uses `set +e` (no exit on error). Voice check WARNS but doesn't prevent writes. This is the correct design — mythology enhances but never obstructs.

### B. Dual Guardian Routing
- **Hooks** (prompt-submit.sh): Fast keyword pattern matching, runs on every prompt
- **@arcanea/os** (GuardianRouter): Weighted scoring with partial matching, confidence 0-1
- **VS Code** (guardians.ts): Third implementation with multi-word bonus scoring
- Three implementations, same canonical data, optimized for each context.

### C. Context Budget Intelligence
Token estimation by tool type, cumulative tracking, quality zone transitions (PEAK → GOOD → DEGRADING → REFRESH). This is **proactive session management** — tells you when your context is getting stale before quality drops.

### D. State Protocol (/tmp Files)
Zero coupling between hooks. Each reads/writes /tmp/arcanea-* files. A hook can crash without affecting others. State survives between prompts but clears on reboot (correct behavior for session state).

### E. Agent-as-Prompt Pattern
The 23 agent .md files work as `subagent_type` values for Claude Code's Task tool. This means `.claude/agents/arcanea-frontend.md` is a real, functional agent that Claude Code spawns as a subprocess. No custom runtime needed — Claude Code IS the runtime.

### F. Progressive Overlay Levels
minimal → standard → full → luminor. Each level adds depth without breaking the previous. A beginner gets CLAUDE.md; a power user gets the full Guardian system with deep lore. Same installer, four experiences.

---

## 3. WHAT'S JUST IDEAS / SCAFFOLDING

### A. overlay-claude Package Gap
The .claude/ directory is a Lamborghini. The overlay-claude package installs a Honda Civic.
- Hooks: NOT installed
- Statusline: NOT installed
- AgentDB: NOT installed
- Helpers: NOT installed
- 19/23 agents: NOT installed
- Skill rules: NOT installed

### B. Agent Orchestration Runtime
Agent .md files exist with rich descriptions (personality, coding style, metaphor domain). But there's NO agent-to-agent communication protocol. No swarm coordination runtime. The AgentDB has swarm_sessions and swarm_agents tables but they're empty scaffolding.

### C. Skills Auto-Activation
35 rules in skill-rules.json reference skills like:
- "architecture-patterns" → no file
- "supabase-patterns" → no file
- "react-patterns" → no file
- "security-audit" → no file
Only the 4 core skills (canon, voice, design, lore) actually exist as .md files.

### D. Flow Config
arcanea-flow-config.yaml defines 6 orchestration patterns (council, parallel, sequential, hierarchical, adversarial, consensus). Beautiful YAML. Zero runtime code to execute them.

---

## 4. OH-MY-OPENCODE & CLAUDE-FLOW ADAPTATION

### What oh-my-opencode Did Well
- **Plugin hook system**: event, config, tool, auth, chat.message, permission.ask
- **Theme system**: Customizable TUI appearance
- **Agent JSON**: Declarative agent definitions

### What We Absorbed
- Guardian agent definitions (JSON → .md files for Claude, .agent.md for OpenCode)
- Event-driven hooks (adapted to Claude Code's hook lifecycle)
- Theming concept (adapted to design tokens)

### What We DIDN'T Absorb
- Plugin architecture (oh-my-opencode lets users install community plugins)
- Chat message interception (we only intercept at prompt-submit, not during streaming)
- Permission system (we have no permission.ask equivalent)

### What claude-flow Did Well
- **Multi-agent orchestration**: Sequential, parallel, fan-out/fan-in
- **Agent handoffs**: One agent passing work to another
- **Shared memory**: Agents can read/write shared context

### What We DIDN'T Absorb
- Runtime orchestration engine (our flow config is YAML-only)
- Agent handoff protocol
- Shared memory between agents (AgentDB exists but agents don't use it collaboratively)

---

## 5. OVERLAY SYNC STATUS

### Claude vs OpenCode (Cursor) Overlay

| Feature | Claude Overlay | OpenCode (Cursor) Overlay |
|---------|---------------|--------------------------|
| Installer class | ClaudeOverlayInstaller | OpenCodeOverlayInstaller |
| File format | .md files | .mdc files (YAML frontmatter) |
| Root config | CLAUDE.md | .cursorrules |
| Guardian agents | .claude/agents/guardians/*.md | .cursor/rules/guardian-*.mdc |
| Core skills | 4 skill .md files | Inline in .cursorrules |
| Content depth | Separate content-depth.ts (403 lines) | Baked into generators |
| Templates | templates.ts (161 lines) | templates.ts (different, 300+ lines) |
| Tests | 29 tests | 73 tests |

**KEY FINDING: Content is NOT shared.** Each overlay has its own hardcoded templates. When you update Arcanea's voice pillars, you must update BOTH overlay packages manually.

**The fix**: Extract shared content into @arcanea/os generators. Both overlays consume from the same source.

---

## 6. WHAT'S MISSING — PRIORITY ROADMAP

### Tier 1: Critical (Overlay package should match .claude/ reality)
1. **Install hooks via overlay-claude** — The 7 hooks are the soul of the system
2. **Install statusline via overlay-claude** — The UX signature
3. **Rename/fix overlay-opencode** — It's Cursor, not OpenCode
4. **Create real overlay-opencode** — For the actual OpenCode CLI (arcanea-realm)

### Tier 2: High Value (Unify and strengthen)
5. **Shared content layer** — Single source for all overlay content
6. **Generate all 35 skill files** — Or trim rules to match real skills
7. **Hook tests** — 7 bash scripts with zero test coverage
8. **Audit overlay-chatgpt/copilot/gemini** — Verify implementation depth

### Tier 3: Ambitious (Runtime intelligence)
9. **Agent handoff protocol** — From claude-flow patterns
10. **Runtime flow engine** — Execute the 6 orchestration patterns
11. **Plugin system** — From oh-my-opencode patterns
12. **Live skill discovery** — Auto-detect and activate skills at runtime

### Tier 4: Vision (100-Year Architecture)
13. **Cross-surface state sync** — Session state shared across CLI, VS Code, Chrome
14. **Collaborative AgentDB** — Agents read/write shared context
15. **Community overlay marketplace** — Users can share custom overlays

---

## 7. ALL 5 OVERLAY PACKAGES — PRODUCTION VERIFIED

| Package | LOC | Primary Output | Guardian Integration | Status |
|---------|-----|---------------|---------------------|--------|
| overlay-claude | ~870 | .claude/ skills + agents | 10 agent .md files | PRODUCTION |
| overlay-opencode* | ~750 | .cursorrules + .mdc | 10 guardian-*.mdc files | PRODUCTION (misnamed) |
| overlay-chatgpt | 775 | Custom GPT JSON + prompts | 10 Guardian GPT configs | PRODUCTION |
| overlay-copilot | 743 | .github/copilot-instructions.md | Code review routing | PRODUCTION |
| overlay-gemini | 730 | System instructions + prompts | 10 Guardian prompt files | PRODUCTION |

*overlay-opencode generates Cursor IDE files, not OpenCode CLI files

**All 5 implement OverlayInstaller interface, manifest tracking, 4 levels, setup guides.**

---

## 8. THE REAL ARCHITECTURE MAP

```
@arcanea/os (2,100 LOC — the brain)
├── Types: Guardian, Gate, Element, Agent, Profile, Content, Overlay
├── Constants: 10 Guardians, 10 Gates, 5 Elements, Academies, Luminors
├── Engine: GuardianRouter, VoiceEnforcer, DesignTokens, SessionManager
├── Generators: SystemPrompt, ClaudeMd, CopilotInstructions
└── Detection: Claude, OpenAI, Gemini, Copilot, OpenCode

@arcanea/cli (10 commands — the hands)
├── route, voice, tokens, install, update, status, auth, init, world, create

@arcanea/mcp-server (30 tools — the voice)
├── Worldbuilding, Guardian routing, voice enforcement, design tokens

5 Overlay Packages (~3,870 LOC total — the reach)
├── Claude: .claude/ skills + agents
├── Cursor: .cursorrules + .mdc rules
├── ChatGPT: Custom GPT configs + system prompts
├── Copilot: .github/copilot-instructions.md
└── Gemini: System instructions + Guardian prompts

.claude/ Infrastructure (~2,000 LOC — the soul)
├── 7 Hooks: Session lifecycle, routing, voice, context tracking
├── Statusline: Context-adaptive display
├── 23 Agents: 4 teams + 10 Guardians
├── AgentDB: SQLite with 7 tables
├── 35 Skill Rules: Auto-activation by Guardian domain
└── 6 Helpers: Dashboards, routing, health checks

Extensions (~1,500 LOC — the limbs)
├── VS Code: 10 Guardians, 6 commands, panels, gate progress
└── Chrome: Guardian panel, content overlay, side panel
```

**TOTAL SYSTEM: ~10,000+ lines of intelligent infrastructure across 15 packages**
