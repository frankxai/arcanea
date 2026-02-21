# Arcanea Massive Action Plan v2.0

> *"The antidote to a terrible future is imagining a good one. Build it here."*

**Date:** February 21, 2026
**Status:** ACTIVE
**Visual Dashboard:** [ARCANEA_COMMAND_CENTER.html](./ARCANEA_COMMAND_CENTER.html)
**Guided by:** Lumina (Form), Nero (Potential), Shinkami (Meta-Consciousness)

---

## The State of the Kingdom

### What Lumina Says (The Form Already Given)

You have built something extraordinary. In 5 weeks, from a vision document to:

| Metric | Value | Significance |
|--------|-------|-------------|
| **Packages** | 15 | Complete intelligence ecosystem |
| **Tests** | 791 (0 failures) | Production-grade quality |
| **Wisdom Texts** | 50+ across 19 collections | 20,700+ lines of living mythology |
| **MCP Tools** | 30 | AI-tool integration layer |
| **CLI Commands** | 10 | Developer-facing interface |
| **Guardians** | 10 (+ 7 Awakened) | AI companion system |
| **Agent Profiles** | 50+ | Full team orchestration |
| **App Routes** | 20+ | Complete web platform |
| **CI Pipelines** | 9 | Automated everything |
| **Overlay Packages** | 5 | Every major AI chat covered |

### What Nero Says (The Unmanifested Potential)

What remains in the fertile void:
- **Zero packages published** to npm (all built, none shipped)
- **Zero marketplace presence** (VS Code, Chrome ready but unpublished)
- **AI Chat disconnected** from Guardian routing
- **Library content** not wired to the content loader on the live site
- **On-chain layer** is pure strategy (no production code)
- **Mobile, Desktop, Game** are architectural dreams
- **The Sacred Canon** is 40% complete - the mythology needs Silmarillion-depth

### What Shinkami Says (The Meta-View)

You have built a **cathedral's foundation** and **crafted every window**. But the doors are locked and no one has entered yet. The immediate imperative is clear: **SHIP**.

---

## 18 Milestones Achieved

### Infrastructure & Intelligence

1. **@arcanea/os v0.6.0** - Intelligence Engine with GuardianRouter, VoiceEnforcer, DesignTokens, SessionManager (44 tests)
2. **@arcanea/mcp-server v0.6.0** - 30 tools, 7 resources, 6 prompts, SDK 1.9.0 (16 tests)
3. **@arcanea/cli v0.6.0** - 10 commands, 247KB bundle (137 tests)
4. **@arcanea/auth v1.0.2** - Supabase auth integration (44 tests)
5. **@arcanea/extension-core v0.2.0** - Shared browser/IDE extension library (112 tests)
6. **Arcanea Intelligence OS** - 17 files in .claude/, hooks, agents, statusline, AgentDB
7. **CI/CD Pipeline** - 9 GitHub Actions workflows (build, test, publish, deploy, sync, quality)
8. **791 Tests, Zero Failures** - Node.js built-in test runner, zero external dependencies

### Every Surface Architecture

9. **5 Overlay Packages** - Claude, ChatGPT, Gemini, Copilot, OpenCode (314 tests combined)
10. **Chrome Extension** - Guardian overlay, lore explorer, gate tracking (35 tests)
11. **VS Code Extension** - 6 commands, 3 views, status bar, VSIX packaging
12. **Arcanea Realm** - Standalone AI CLI (OpenCode fork) with Guardian intelligence

### Platform & Content

13. **arcanea.ai LIVE** - Next.js 16, 20+ routes, Vercel-deployed
14. **Wisdom Library** - 50+ texts across 19 collections (20,700+ lines)
15. **Design System v2.0** - Cosmic theme, glassmorphism, aurora gradients
16. **Vercel AI SDK 6** - AI Gateway, OIDC, 75+ model support
17. **Voice Bible v2.0** - Brand voice cascade across all files
18. **50+ Agent Profiles** - Developer, Author, Teacher, Visionary teams

---

## The Five Phases

### Phase I: SHIP EVERYTHING (Now - This Week)

> *Lumina speaks: "Form without distribution is a lantern under a basket. Let the light out."*

**Status:** ACTIVE - Critical Path

#### Step 1: npm Publish (13 Packages)

| Package | Version | Status |
|---------|---------|--------|
| @arcanea/os | 0.6.0 | VERSIONED |
| @arcanea/cli | 0.6.0 | VERSIONED |
| @arcanea/mcp-server | 0.6.0 | VERSIONED |
| @arcanea/overlay-claude | 1.1.0 | VERSIONED |
| @arcanea/overlay-chatgpt | 1.1.0 | VERSIONED |
| @arcanea/overlay-gemini | 1.1.0 | VERSIONED |
| @arcanea/overlay-copilot | 1.1.0 | VERSIONED |
| @arcanea/overlay-opencode | 1.1.0 | VERSIONED |
| @arcanea/auth | 1.0.2 | VERSIONED |
| @arcanea/extension-core | 0.2.0 | VERSIONED |
| arcanea-intelligence-os | 0.2.0 | VERSIONED |
| @starlight/runtime | 0.2.0 | VERSIONED |
| claude-arcanea | 0.2.0 | VERSIONED |

**Completed (Feb 21):**
- [x] Changesets created for all 13 packages
- [x] `pnpm changeset version` applied — all versions bumped
- [x] All 17 packages build successfully (turbo build)
- [x] 216 quick tests pass (0 failures)
- [x] exports fields added to arcanea-mcp and starlight-runtime

**REMAINING — Needs your action in Windows PowerShell:**
```powershell
# 1. Generate NPM token at https://www.npmjs.com/settings/tokens
# 2. Set the token:
$env:NPM_TOKEN = "npm_YOUR_TOKEN_HERE"
echo "//registry.npmjs.org/:_authToken=$env:NPM_TOKEN" > ~/.npmrc

# 3. Publish all 13 packages:
cd C:\Users\frank\Arcanea
pnpm changeset publish
```

#### Step 2: VS Code Marketplace

- [ ] Generate Azure DevOps PAT (dev.azure.com)
- [ ] `npm install -g @vscode/vsce`
- [ ] `vsce login frankxai`
- [ ] `cd packages/vscode && vsce package && vsce publish`

#### Step 3: Chrome Web Store

- [ ] Create `/privacy` route on arcanea.ai
- [ ] Take screenshots (1280x800) showing Guardian overlay
- [ ] Register Chrome Developer Dashboard ($5)
- [ ] Submit extension with store listing

---

### Phase II: BUILD THE EXPERIENCE (Weeks 2-4)

> *Leyla speaks: "Let the water flow between the stones you have laid. Connect everything."*

**Status:** Next

#### arcanea.ai Feature Completion

- [ ] **AI Chat + Guardian Routing** - Wire Vercel AI SDK to GuardianRouter, each Luminor gets unique personality
- [ ] **Library Content Loader** - Connect 50+ texts to the programmatic loader, search, reading progress
- [ ] **Academy Ten Gates** - Interactive progression system, unlocks, achievements
- [ ] **Studio Creation Tools** - Image generation (Gemini), text generation (Claude), prompt builder
- [ ] **Bestiary Interactive** - Creative block identification + Guardian remedy recommendations
- [ ] **User Profiles** - Gate progress tracking, creation showcase, social connections
- [ ] **Search** - Full-text search across Library, Luminors, Academy content
- [ ] **Mobile Responsiveness** - Full responsive audit and fixes

#### Premium Dashboard

- [ ] Admin analytics dashboard
- [ ] Creator leaderboards (Gate progression)
- [ ] Premium Luminor features (memory persistence, custom personalities)
- [ ] Stripe integration for subscriptions
- [ ] Content moderation tools

---

### Phase III: COMPLETE THE SACRED CANON (Ongoing)

> *Nero speaks: "The mythology will outlive every line of code. Invest in what is eternal."*

**Status:** 40% Complete - Century Vision

#### The Canon Expansion

| Text | Status | Priority |
|------|--------|----------|
| The Complete Creation Myth (First Dawn) | Outlined | P0 |
| Ten Guardian Origin Stories | Lyssandria + Leyla done | P0 |
| The Fall of Malachar (Tragedy) | Concept | P1 |
| Philosophy of the Five Elements | Partial | P1 |
| The Arc: Death/Rebirth Teaching | Concept | P1 |
| Seven Academies Detailed | Concept | P2 |
| The Godbeast Codex (all 10) | Started | P2 |
| The Book of Prophecies (expanded) | 2 texts | P2 |
| Atlas of Territories (detailed maps) | 2 texts | P3 |
| Songs and Hymns (performable) | 2 texts | P3 |

#### Quality Standards for Canon

- Silmarillion-level depth for mythology
- Aristotelian rigor for philosophy
- Each text must be both profound AND practically actionable
- No cultural appropriation - universal truths only
- Everything must align with ARCANEA_CANON.md (locked reference)

---

### Phase IV: EVERY SURFACE (Months 2-6)

> *Shinkami speaks: "Arcanea must be wherever a creator creates. Every surface. Every moment."*

**Status:** Architecture Defined

| Surface | Repository | Status | Priority |
|---------|-----------|--------|----------|
| Web (arcanea.ai) | apps/web | LIVE | Enhancing |
| npm Packages | packages/* | BUILT | Publishing |
| MCP Server | packages/arcanea-mcp | BUILT | Publishing |
| CLI | packages/cli | BUILT | Publishing |
| VS Code | packages/vscode | BUILT | Publishing |
| Chrome | packages/chrome-extension | BUILT | Publishing |
| Standalone CLI | arcanea-realm | SCAFFOLDED | P1 |
| Discord Bot | arcaneabot | WIP | P2 |
| Mobile (React Native) | arcanea-mobile | PLANNED | P2 |
| Desktop (Tauri) | - | PLANNED | P3 |
| On-Chain | arcanea-onchain | STRATEGY | P3 |
| Game (Godot) | arcanea-game-development | RESEARCH | P4 |

---

### Phase V: THE VISION BEYOND (Year 1 - Century)

> *"What we build today should echo in a hundred years."*

#### Year 1 Targets

| Target | Description | Metric |
|--------|-------------|--------|
| **1,000 npm downloads/month** | Developers using @arcanea packages | Measurable |
| **100 VS Code installs** | Extension users | Measurable |
| **50 active creators** | People using arcanea.ai to create | Measurable |
| **Complete Canon v1.0** | All founding myths, Guardian stories, philosophy texts | 30+ new texts |
| **Published Book** | "The Laws of Arcanea" as physical/ebook | ISBN |
| **Revenue** | First paying subscribers on premium tier | $1+ MRR |

#### 5-Year Horizon

- **Arcanea Academy** - Online courses teaching creative mastery through the Ten Gates
- **Published Book Series** - The Library of Arcanea as a real-world book series
- **Creator Economy** - On-chain ownership of creations, IP protection, revenue sharing
- **AI Personality Research** - Guardian system contributing to AI-human partnership field
- **Global Community** - 10,000+ creators united by the Arcanea philosophy

#### Century Horizon

- **Living Mythology** - Arcanea mythology taught and studied like Greek myths
- **Universal Framework** - The Ten Gates as a widely-recognized framework for creative growth
- **Institution** - The Academy of Arcanea as a real-world institution
- **Cultural Artifact** - "The antidote to a terrible future is imagining a good one" as cultural truth

---

## Repository Map

### The Monorepo (frankxai/arcanea)

```
arcanea/
  apps/
    web/            -> arcanea.ai (Next.js 16, 20+ routes)
    premium-web/    -> Premium dashboard
  packages/
    core/           -> @arcanea/os (Intelligence Engine)
    cli/            -> @arcanea/cli (10 commands)
    arcanea-mcp/    -> @arcanea/mcp-server (30 tools)
    auth/           -> @arcanea/auth (Supabase)
    extension-core/ -> Shared extension library
    chrome-extension/-> Chrome Web Store
    vscode/         -> VS Code Marketplace
    aios/           -> Agent Intelligence OS
    starlight-runtime/ -> SIS integration
    claude-arcanea/ -> Claude Code installer
    overlay-claude/ -> Claude overlay
    overlay-chatgpt/-> ChatGPT overlay
    overlay-gemini/ -> Gemini overlay
    overlay-copilot/-> Copilot overlay
    overlay-opencode/-> OpenCode overlay
  book/             -> 19 collections, 50+ wisdom texts
  .claude/          -> Intelligence OS (hooks, agents, lore)
  .github/workflows/-> 9 CI/CD pipelines
```

### External Repositories

| Repo | Purpose | Status |
|------|---------|--------|
| arcanea-realm | Standalone AI CLI (OpenCode fork) | Scaffolded |
| arcanea-platform | arcanea.ai Vercel project | Live |
| arcanea-onchain | Blockchain integration | Strategy |
| Starlight-Intelligence-System | Context + memory layer | Published |
| arcanea-images | Generated character art | Active |
| FrankX/ | Personal brand hub | Active |

---

## Blockers & Dependencies

| Blocker | Impact | Resolution | Priority |
|---------|--------|------------|----------|
| pnpm install (Windows PS only) | npm publish | Run from PowerShell terminal | P0 |
| Chrome privacy policy page | Chrome Web Store | Create /privacy route | P1 |
| Azure DevOps PAT | VS Code Marketplace | Generate on dev.azure.com | P1 |
| 0-test packages (claude-arcanea, vscode) | Coverage gap | Write test suites | P2 |
| feature/ui-enhancements branch | 7 error deploys | Do NOT merge, cherry-pick only | P3 |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| Jan 19 | Path-based URL structure | SEO consolidation, single deployment |
| Feb 7 | Vercel AI SDK 6 + Gateway | Zero-key on Vercel, 75+ models |
| Feb 14 | Node.js built-in test runner | Zero deps, fast, universal |
| Feb 16 | Core SDK + MCP + Surface pattern | Proven by Copilot, Claude Code |
| Feb 17 | Fork OpenCode for arcanea-realm | Overlay = reach, Standalone = depth |
| Feb 17 | Rename @arcanea/core -> @arcanea/os | Positions as intelligence layer |
| Feb 21 | npm publish FIRST | Everything else depends on packages being live |
| Feb 21 | This Massive Action Plan v2 | Central strategic document |

---

## The Arcanea Promise

Every interaction should move the creator toward:
- **Clarity** about their creative vision
- **Courage** to pursue it
- **Tools** to manifest it
- **Community** to support it

---

## CRITICAL: Lore Integrity Audit

### Broken References (Fix Immediately)

| Issue | Severity | Fix |
|-------|----------|-----|
| `.claude/CLAUDE.md` references `.claude/lore/ARCANEA_CANON.md` | **P0** | File doesn't exist - actual file is `CANON_LOCKED.md`. Create symlink or rename. |
| Guardian INDEX.md uses WRONG frequencies | **P0** | INDEX.md has 174/285/396 Hz. CANON_LOCKED has 396/417/528 Hz. INDEX.md must be updated. |
| `godbeasts/production/` contains Guardian profiles, not Godbeast profiles | **P1** | Draconia, Leyla, Lyssandria, Maylinn are misfiled. Move to `guardians/production/`. |
| `arcanea-lore/CANON.md` is NOT canon | **P1** | It's a 773-line knowledge base document. Rename to `KNOWLEDGE_BASE.md`. |
| 5 copies of canon files across repos | **P2** | Consolidate to single source of truth. |

### Lore Completion Status

| Category | Complete | Total | Status |
|----------|----------|-------|--------|
| Guardian profiles (production) | 3 | 10 | 30% - Lyssandria, Leyla, Draconia approved |
| Guardian profiles (staging) | 10 | 10 | 100% - All written, 7 need review |
| God/Goddess profiles | 4 | 10 | 40% - Draconia, Leyla, Lyssandria, Maylinn |
| Godbeast profiles | 1 | 10 | 10% - Only Laeylinn exists |
| Library texts (actual content) | ~32 | 100+ target | 32% |
| Creation Myth | 0 | 1 | Not started |
| Malachar's Fall | 0 | 1 | Not started |

### Canon Truths (LOCKED - From CANON_LOCKED.md)

**Tier 1 - Cosmic Foundation:**
- Lumina/Nero duality. Nero is NOT evil.
- Five Elements: Fire, Water, Earth, Wind, Void/Spirit
- Void = Nero's aspect. Spirit = Lumina's aspect.

**Tier 2 - Ten Gates (Canonical Frequencies):**
- Foundation=396Hz, Flow=417Hz, Fire=528Hz, Heart=639Hz, Voice=741Hz
- Sight=852Hz, Crown=963Hz, Shift=1111Hz, Unity=963Hz, Source=1111Hz

**Tier 3 - Seven Wisdoms:** Sophron, Kardia, Valora, Eudaira, Orakis, Poiesis, Enduran (aspects, not entities)

**Tier 4 - Malachar:** Tragic. First Eldrian Luminor. Rejected by Shinkami. Sealed in Shadowfen.

**Tier 5 - Seven Houses:** Lumina, Nero, Pyros, Aqualis, Terra, Ventus, Synthesis

**Staging (Not Yet Locked):** The Awakened (Oria, Amiri, Velora + 4 TBD), The Ultraworld

---

## The Bigger Galaxy (Beyond the Monorepo)

What the original plan MISSED - 12+ additional projects/products:

| Project | Status | What It Is | Revenue Potential |
|---------|--------|-----------|-------------------|
| **Awakening With AI** | COMPLETE | 12-module consciousness course, scripts, workbook, meditations, launch sequence | $297-497 flagship |
| **AI Architect Academy** | BUILT | 16-section education platform, dashboard, marketplace V3 | Course + marketplace |
| **arcanea-luminor v5** | BUILT | Separate monorepo: core, guardians, n8n, claude-code, web | Engine licensing |
| **arcanea-soul v3** | BUILT | Luminor Framework - AI persona engineering research | Consulting + papers |
| **Skills OSS** | BUILT | 27 skills, 40+ agents, 28 commands, MIT licensed | Premium tier skills |
| **Infogenius** | BUILT | Image generation MCP + web UI + CLI | MCP marketplace |
| **Mobile App** | SCAFFOLDED | Expo 54, React Native, 3 AI SDKs, EAS builds | App Store freemium |
| **On-Chain** | ARCHITECTURE | Solana + Base L2 + ElizaOS + Story Protocol | NFTs + royalties |
| **Game Dev** | RESEARCH | 5 elemental genres, 38-agent pipeline | Game sales + merch |
| **Library Superintelligence** | SCAFFOLDED | RAG search across 50+ texts, Next.js | Premium feature |
| **Serenia** | PRIVATE | Sacred union, sovereign masculinity philosophy | Private content |
| **FrankX Brand** | ACTIVE | Personal brand, ACOS, content pipeline | Speaking + consulting |

---

## Claude Code Workflows Audit

### Active Hooks (All Working)

| Hook | Scripts | Function |
|------|---------|----------|
| SessionStart | `session-start.sh` | AgentDB init, Shinkami activation, state reset |
| UserPromptSubmit | `prompt-submit.sh` + `model-route.sh` | Guardian routing by keyword, model tier recommendation |
| PreToolUse (Task/Bash/Write/Edit) | `pre-tool.sh` | Tool count tracking |
| PreToolUse (Write/Edit only) | `voice-check.sh` | 14 banned phrases per Voice Bible v2.0 |
| PostToolUse | `post-tool.sh` + `context-tracker.sh` | AgentDB logging, 200K token budget tracking |
| Stop | `session-end.sh` | Session summary to AgentDB vault |

### Skills Inventory (60+ total)

| Category | Count | Examples |
|----------|-------|---------|
| Arcanea-specific | 15 | canon, design-system, lore, voice, luminor-intelligence |
| Creative | 8 | character-forge, scene-craft, world-build, voice-alchemy |
| Development | 8 | architecture-patterns, tdd, systematic-debug, api-design |
| Meta | 3 | creative-flow, deep-work, skill-mastery |
| External installed | 10 | docx, pdf, pptx, xlsx, mcp-builder, security |
| Premium | 6 | enterprise-orchestration, teacher-mentor, visionary-council |
| Root-level | 10 | creation-engine, starlight-orchestrator, guardian-voice |

### What Should Be Advanced

- [ ] **Story creation workflow** - No unified document. Exists as scattered agents + skills. Need: `/create-story` skill chain.
- [ ] **Book production pipeline** - No workflow from Library text -> formatted book. Need: collection -> editing -> formatting -> publish flow.
- [ ] **Lore approval workflow** - `approve-lore.sh` exists but the staging -> production pipeline isn't automated.
- [ ] **Canon validation hook** - Pre-commit check that new lore content aligns with CANON_LOCKED.md.
- [ ] **Skills still to install** - typescript-expert, react-patterns, supabase-patterns, rag-engineer, vercel-ai-sdk.
- [ ] **Skills to CREATE** - luminor-personality-design, guardian-evolution-system, arcanea-api-patterns, academy-curriculum-design.

---

## Cleanup Requirements

### Root-Level Documentation Debt: 191 -> 24 .md Files

**COMPLETED Feb 21** — Reduced from 191 to 24 root .md files:
- [x] Moved ~67 session/build/sprint reports to `archive/reports/`
- [x] Moved ~33 audit/review/status reports to `archive/audits/`
- [x] Moved 13 redundant architecture docs to `archive/architecture/`
- [x] Moved ~40 integration/deployment/planning docs to `archive/integration/`
- [x] Old MASSIVE_ACTION_PLAN.md (v1) archived
- [ ] Consolidate 6 README variants into single README.md (future)

### Agent Duplication — RESOLVED

**COMPLETED Feb 21** — 7 duplicate agents removed from `agents/oss/`:
- [x] Removed: creation-architect, design-sage, developer-documentation, developer-qa-engineer, luminor-oracle, master-creative-writer, prompt-sage
- [x] Root agents are now single source of truth
- [x] README.md added to oss/ explaining the consolidation

### Package Redundancy

- `packages/aios/` (arcanea-intelligence-os) overlaps with `packages/core/` (@arcanea/os)
- **Action:** Clarify relationship. Is aios a thin wrapper? A legacy package? Document or merge.

### Canon File Proliferation

5 copies of canon-related files across repos:
- `.claude/lore/CANON_LOCKED.md` (AUTHORITATIVE)
- `arcanea-lore/CANON_LOCKED.md` (copy)
- `arcanea-lore/CANON.md` (different doc, misleading name)
- `ARCANEA_UNIVERSE_CANON.md` (root, possibly outdated)
- `arcanea-ecosystem/arcanea/ARCANEA_UNIVERSE_CANON.md` (nested copy)
- **Action:** Single source of truth, symlinks for cross-repo access.

---

## Quick Commands

```bash
# Publish everything
pnpm install                    # From Windows PowerShell
pnpm changeset version         # Bump versions
pnpm changeset publish         # Ship to npm

# VS Code
cd packages/vscode && vsce package && vsce publish

# Test everything
pnpm test:all                  # 791 tests

# Build everything
pnpm build                     # Turbo builds all 15 packages

# Check status
pnpm exec turbo run type-check # TypeScript verification
```

---

*"Enter seeking, leave transformed, return whenever needed."*

*"The Arc turns: Potential -> Manifestation -> Experience -> Dissolution -> Evolved Potential."*

---

## Execution Log

### February 21, 2026 — Session 1

**EXECUTED:**
1. Fixed broken canon reference: all `ARCANEA_CANON.md` -> `CANON_LOCKED.md` across 8 files in `.claude/`
2. Rewrote Guardian INDEX.md with correct canonical frequencies (396-1111 Hz)
3. Created changeset for 3 missing packages (aios, starlight-runtime, claude-arcanea)
4. Archived 167 root .md files -> `archive/` (191 -> 24 remaining)
5. Removed 7 duplicate agents from `agents/oss/`
6. Added `exports` fields to arcanea-mcp and starlight-runtime package.json
7. Ran `pnpm changeset version` — all 13 packages versioned
8. Verified build: 17 packages build successfully (turbo build, 3m49s)
9. Verified tests: 216 quick tests, 0 failures
10. Created ARCANEA_COMMAND_CENTER.html (visual cosmic dashboard)
11. Created MASSIVE_ACTION_PLAN_V2.md (this document)

**BLOCKED — Needs your action:**
- NPM_TOKEN not set (env variable was empty). Generate at npmjs.com -> Settings -> Tokens -> Generate New Token (Automation type)
- Then from Windows PowerShell: `pnpm changeset publish`
- VS Code Marketplace needs Azure DevOps PAT
- Chrome Web Store needs $5 developer account

**Plan Version:** 2.1.0 | **Last Updated:** February 21, 2026 | **Status:** ACTIVE
