# Arcanea Platform Status

> Last Updated: January 8, 2026

## Executive Summary

**Arcanea v3.0.0** is a unified creative intelligence platform that works across multiple AI coding tools. It provides 90+ content files (agents, skills, commands) organized into 7 teams.

### Current State: 🟡 PARTIALLY WORKING

| Component | Status | Notes |
|-----------|--------|-------|
| Core Package | ✅ Complete | v3.0.0, npm-ready |
| CLI Tool | ✅ Complete | `bunx arcanea install` |
| Agents (40+) | ✅ Complete | All teams populated |
| Skills (27+) | ✅ Complete | Full skill catalog |
| Commands (28) | ✅ Complete | Slash commands |
| Claude Code Support | ✅ Works | `.claude/` folder |
| OpenCode Support | 🟡 Partial | Needs agent registration |
| npm Published | ❌ Not Yet | Ready to publish |

---

## Quick Answer: Does Arcanea Work with OpenCode NOW?

### Short Answer: **Partially**

You can install Arcanea and it will copy all content to `.opencode/`, but:

1. **OpenCode won't show "Arcanea" as a switchable agent** because OpenCode agents are registered via `opencode agent create`, not by copying files
2. **The CLAUDE.md IS read by OpenCode** - so the system prompt works
3. **Slash commands work** if OpenCode reads the commands folder
4. **Magic words (ultraworld, etc.) work** in the prompt

### To Make Arcanea a "Real" OpenCode Agent

You need to run:
```bash
opencode agent create --description "Arcanea - Master Creative Intelligence for world-building, storytelling, and creative work" --mode primary --path /mnt/c/Users/Frank/Arcanea/arcanea-skills-opensource/agents/arcanea-master-orchestrator.md
```

This registers Arcanea as a switchable agent alongside `build`, `plan`, etc.

---

## Architecture Overview

### How OpenCode Works

```
┌─────────────────────────────────────────────────────────────┐
│                     OpenCode Runtime                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │    build     │    │     plan     │    │   explore    │  │
│  │  (primary)   │    │  (primary)   │    │  (subagent)  │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                   │                   │           │
│         └───────────────────┼───────────────────┘           │
│                             │                                │
│                     ┌───────▼───────┐                       │
│                     │   CLAUDE.md   │                       │
│                     │ (System Prompt)│                       │
│                     └───────────────┘                       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Project-Level Overrides                 │   │
│  │  .opencode/CLAUDE.md → Overrides default system prompt│  │
│  │  .opencode/agents/   → Additional agent definitions   │  │
│  │  .opencode/commands/ → Slash commands                 │  │
│  │  .opencode/skills/   → Skill definitions              │  │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Key Concepts

| Concept | What It Is | Where Defined |
|---------|-----------|---------------|
| **Primary Agent** | Main agent you interact with (like `build`) | `opencode agent create --mode primary` |
| **Subagent** | Background agent called by primary (like `explore`) | `opencode agent create --mode subagent` |
| **CLAUDE.md** | System prompt that shapes agent behavior | `.opencode/CLAUDE.md` or global |
| **Slash Commands** | `/command` triggers in prompts | `.opencode/commands/*.md` |
| **Skills** | Reusable capability definitions | `.opencode/skills/*.md` |

### How Arcanea Fits In

```
┌─────────────────────────────────────────────────────────────┐
│                    Arcanea v3.0.0                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Core System Prompt: CLAUDE.md                              │
│  ├── Identity: "Arcanea - Master Creative Intelligence"     │
│  ├── Seven Luminors (wisdom aspects)                        │
│  ├── Magic Words (ultraworld, ultrawrite, ultrabook)        │
│  └── Agent Team Definitions                                 │
│                                                              │
│  7 Agent Teams (40+ agents):                                │
│  ├── Creative: story-master, character-crafter, world-expander│
│  ├── Writing: story-architect, prose-weaver, line-editor    │
│  ├── Production: visual-director, sound-designer            │
│  ├── Research: sage, archivist, scout, muse                 │
│  ├── Development: architect, frontend, backend, devops      │
│  ├── Teacher: mentor, curriculum-designer, assessor         │
│  └── Visionary: strategist, innovator, futurist             │
│                                                              │
│  27+ Skills:                                                │
│  ├── Core: luminor-wisdom, prompt-craft, centaur-mode       │
│  ├── Creative: story-weave, character-forge, world-build    │
│  └── Development: tdd, systematic-debug, architecture       │
│                                                              │
│  28 Commands:                                               │
│  ├── /luminor, /bestiary, /ultraworld, /ultrawrite          │
│  ├── /write-chapter, /edit-chapter, /check-continuity       │
│  └── /arcanea-build, /arcanea-test, /arcanea-deploy        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Installation Options

### Option 1: Quick Install (Current - PARTIAL)

```bash
# Install Arcanea content to current project
bunx arcanea install --opencode

# This creates:
# .opencode/
# ├── agents/      (40+ agents)
# ├── skills/      (27+ skills)
# ├── commands/    (28 commands)
# └── CLAUDE.md    (system prompt)
```

**Result**: Arcanea's system prompt is active, but it's NOT a switchable agent.

### Option 2: Register as OpenCode Agent (FULL)

```bash
# Step 1: Install content
bunx arcanea install --opencode

# Step 2: Register Arcanea as a primary agent
opencode agent create \
  --description "Arcanea - Master Creative Intelligence for world-building, storytelling, and creative work" \
  --mode primary \
  --tools "bash,read,write,edit,list,glob,grep,webfetch,task,todowrite,todoread"
```

**Result**: Arcanea appears as switchable agent in OpenCode.

### Option 3: Global Installation (ALL PROJECTS)

```bash
# Install to global opencode config
bunx arcanea install --opencode --global  # NOT YET IMPLEMENTED

# Register globally
opencode agent create --description "Arcanea" --mode primary
```

---

## What's Built vs What's Needed

### ✅ BUILT (Ready Now)

| Component | Files | Description |
|-----------|-------|-------------|
| Package | `package.json` | v3.0.0, npm-ready |
| CLI | `src/cli/index.ts` | install, status, agents, luminors, magic |
| Installer | `src/install.ts` | Multi-platform detection & install |
| Master Prompt | `CLAUDE.md` | Full Arcanea identity & behavior |
| Agents | `agents/*.md` | 40+ agent definitions |
| Skills | `skills/*.md` | 27+ skill definitions |
| Commands | `commands/*.md` | 28 slash commands |
| Writing Team | `agents/writing/` | 5 agents |
| Production Team | `agents/production/` | 3 agents |
| Research Team | `agents/research/` | 4 agents |

### 🟡 PARTIAL (Works but needs polish)

| Component | Issue | Fix Needed |
|-----------|-------|------------|
| OpenCode Agent Registration | Not auto-registered | Add to install.ts |
| npm publish | Not published yet | `npm publish` |
| Git push to oss | Rebase conflict | Force push or re-sync |

### ❌ NOT BUILT (Future)

| Component | Description | Priority |
|-----------|-------------|----------|
| Global install | Install to ~/.opencode | Medium |
| Auto agent registration | Run `opencode agent create` during install | High |
| GitHub Actions sync | Auto-sync to mirror repos | Low |
| MCP integrations | Suno, custom MCPs | Low |

---

## File Structure

```
/mnt/c/Users/Frank/Arcanea/arcanea-skills-opensource/
├── package.json              # v3.0.0
├── tsconfig.json            
├── CLAUDE.md                 # Master system prompt
├── README.md                 # Documentation
├── ARCANEA-STATUS.md         # This file
├── TODO-TOMORROW.md          # Tomorrow's plan
│
├── src/
│   ├── index.ts              # Core exports (LUMINORS, AGENT_TEAMS, etc.)
│   ├── install.ts            # Multi-platform installer
│   └── cli/
│       └── index.ts          # CLI commands
│
├── dist/                     # Built output
│   ├── index.js
│   ├── install.js
│   └── cli/
│       └── index.js
│
├── agents/                   # 40+ agents
│   ├── arcanea-master-orchestrator.md
│   ├── arcanea-story-master.md
│   ├── arcanea-character-crafter.md
│   ├── arcanea-world-expander.md
│   ├── arcanea-lore-master.md
│   ├── writing/              # Writing team (5)
│   │   ├── story-architect.md
│   │   ├── prose-weaver.md
│   │   ├── voice-alchemist.md
│   │   ├── line-editor.md
│   │   └── continuity-guardian.md
│   ├── production/           # Production team (3)
│   │   ├── visual-director.md
│   │   ├── sound-designer.md
│   │   └── format-master.md
│   ├── research/             # Research team (4)
│   │   ├── sage.md
│   │   ├── archivist.md
│   │   ├── scout.md
│   │   └── muse.md
│   └── [20+ more agents]
│
├── skills/                   # 27+ skills
│   ├── arcanea-luminor-wisdom.md
│   ├── arcanea-story-weave.md
│   ├── arcanea-character-forge.md
│   └── [24+ more skills]
│
└── commands/                 # 28 commands
    ├── luminor.md
    ├── bestiary.md
    ├── ultraworld.md
    ├── ultrawrite.md
    ├── ultrabook.md
    ├── write-chapter.md
    └── [22+ more commands]
```

---

## Git Remotes

```
platform → git@github.com:frankxai/arcanea-platform.git (PRIVATE - full SaaS)
oss      → git@github.com:frankxai/arcanea.git (PUBLIC - this package)
```

Current branch: `main`
Commits ahead of oss: 1 (needs push)

---

## Immediate Next Steps

### To Make Arcanea Fully Work in OpenCode TODAY:

```bash
# 1. Go to the project where you want Arcanea
cd /mnt/c/Users/Frank/Arcanea/arcanea-skills-opensource

# 2. Install Arcanea (already there, but to demonstrate)
bunx arcanea install --opencode

# 3. Register Arcanea as an OpenCode agent
opencode agent create \
  --description "Arcanea - Master Creative Intelligence" \
  --mode primary \
  --path .opencode/agents/arcanea-master-orchestrator.md

# 4. Now you can switch to Arcanea in OpenCode!
```

### To Publish to npm:

```bash
cd /mnt/c/Users/Frank/Arcanea/arcanea-skills-opensource
bun run build
npm publish
```

### To Push to Both GitHubs:

```bash
cd /mnt/c/Users/Frank/Arcanea/arcanea-skills-opensource
git push platform main   # Private repo
git push oss main --force  # Public repo (force due to rebase conflict)
```

---

## The Vision

```
                    ┌─────────────────────┐
                    │    YOUR PROMPT      │
                    │  "ultraworld: ..."  │
                    └─────────┬───────────┘
                              │
                    ┌─────────▼───────────┐
                    │      ARCANEA        │
                    │  Master Orchestrator │
                    └─────────┬───────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
┌─────────▼─────────┐ ┌──────▼──────┐ ┌─────────▼─────────┐
│   World Team      │ │ Story Team  │ │  Production Team  │
│ ├─ world-architect│ │├─ story-arch│ │ ├─ visual-director│
│ ├─ lore-master   │ │├─ prose-weav│ │ ├─ sound-designer │
│ └─ character-cra │ │└─ line-edit │ │ └─ format-master  │
└───────────────────┘ └─────────────┘ └───────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                    ┌─────────▼───────────┐
                    │   COMPLETE WORLD    │
                    │ Characters, Lore,   │
                    │ Story, Media Output │
                    └─────────────────────┘
```

**One prompt → Full creative output through coordinated AI teams.**
