# Arcanea Repository Registry

> Master reference for all Arcanea repositories and their relationships.

## Repository Map

### Tier 1: Core Platform (Deploy First)

| Repo | Path | GitHub | Type | Branch |
|------|------|--------|------|--------|
| **arcanea** | `/` | frankxai/arcanea | Monorepo root | local-work-sync → main |
| **arcanea-ecosystem** | `/arcanea-ecosystem` | frankxai/arcanea-ecosystem | Turbo monorepo | main |
| **arcanea.ai** | `/arcanea.ai` | frankxai/arcanea.ai | Next.js app | main |

### Tier 2: AI SDKs

| Repo | Path | GitHub | Purpose |
|------|------|--------|---------|
| **claude-arcanea** | `/claude-arcanea` | frankxai/claude-arcanea | Anthropic Claude SDK |
| **gemini-arcanea** | `/gemini-arcanea` | frankxai/gemini-arcanea | Google Gemini SDK |
| **codex-arcanea** | `/codex-arcanea` | frankxai/codex-arcanea | OpenAI Codex/GPT SDK |

### Tier 3: Tools & Libraries

| Repo | Path | GitHub | Purpose |
|------|------|--------|---------|
| **arcanea-infogenius** | `/arcanea-infogenius` | frankxai/arcanea-infogenius | AI visual generation |
| **arcanea-library-superintelligence** | `/arcanea-library-superintelligence` | frankxai/arcanea-library-superintelligence | Asset management |
| **arcanea-opencode** | `/arcanea-opencode` | frankxai/arcanea-opencode | CLI tool |
| **arcanea-luminor** | `/arcanea-luminor` | frankxai/arcanea-luminor | AI agent personas |
| **arcanea-agents** | `/arcanea-agents` | frankxai/arcanea-agents | Agent library |

### Tier 4: Applications

| Repo | Path | GitHub | Purpose |
|------|------|--------|---------|
| **arcanea-mobile** | `/arcanea-mobile` | frankxai/arcanea-mobile | React Native app |
| **arcaneabot** | `/arcaneabot` | frankxai/arcaneabot | Discord bot |
| **arcanea-game-development** | `/arcanea-game-development` | frankxai/arcanea-game-development | Game R&D |

### Tier 5: Documentation & Planning (Non-Git)

| Directory | Purpose |
|-----------|---------|
| `Arcanea Big Vision/` | Strategy documents |
| `Arcanea Framer Landing Pages/` | Marketing materials |
| `Arcanea World Building Agents and workflows/` | Lore & agent system |
| `.arcanea/` | Config & scripts |

---

## Nested Repository Structure

```
C:\Users\frank\Arcanea\                    # Main monorepo (arcanea)
├── arcanea-ecosystem/                     # Separate git repo
│   └── arcanea/                           # Turbo workspace
│       ├── apps/web/                      # @arcanea/web
│       └── packages/                      # Shared packages
├── arcanea.ai/                            # Separate git repo
├── claude-arcanea/                        # Separate git repo
├── gemini-arcanea/                        # Separate git repo
├── codex-arcanea/                         # Separate git repo
├── arcanea-infogenius/                    # Separate git repo
├── arcanea-library-superintelligence/     # Separate git repo
├── arcanea-mobile/                        # Separate git repo
├── arcanea-opencode/                      # Separate git repo
├── arcanea-luminor/                       # Separate git repo
├── arcanea-agents/                        # Separate git repo
├── arcaneabot/                            # Separate git repo
└── arcanea-game-development/              # Separate git repo
```

---

## Sync Rules

### Main Repo (arcanea)
- Contains: Documentation, planning, config, non-code assets
- Does NOT contain: Submodules (nested git repos are gitignored)
- Branch strategy: `local-work-sync` for dev → `main` for release

### Nested Repos
- Each has own git history
- Push independently
- May have different branch strategies

### What Gets Committed Where

| Content Type | Repo |
|--------------|------|
| Sprint plans, status reports | arcanea (main) |
| CLAUDE.md, agent configs | arcanea (main) |
| World building, lore | arcanea (main) |
| Next.js app code | arcanea-ecosystem or arcanea.ai |
| AI SDK code | claude-arcanea, gemini-arcanea, codex-arcanea |
| Mobile app code | arcanea-mobile |
| CLI tools | arcanea-opencode |

---

## Quick Reference

### Check All Repos Status
```bash
for dir in arcanea.ai arcanea-ecosystem claude-arcanea gemini-arcanea codex-arcanea arcanea-infogenius arcanea-library-superintelligence arcanea-mobile arcanea-opencode; do
  echo "=== $dir ===" && cd /mnt/c/Users/frank/Arcanea/$dir && git status -s 2>/dev/null | head -3
done
```

### Push All Repos
```powershell
# Run from Windows PowerShell - see sync-all-repos.ps1
```

---

*Registry Version: 1.0.0*
*Last Updated: 2026-02-02*
