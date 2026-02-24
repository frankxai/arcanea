# Arcanea Repository Strategy

> *"Multiple realms, one kingdom. Each repo serves a purpose in the greater architecture."*

**Last Updated**: January 24, 2026
**Status**: Active

---

## Overview

Arcanea spans multiple GitHub repositories, each serving a specific purpose in the ecosystem.

```
THE ARCANEA REALM
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│                    frankxai/arcanea-platform                        │
│                    (PRIVATE - Main Development)                     │
│                                                                     │
│  The primary development repository. All active work happens here. │
│  Contains the full Next.js app, library content, and Claude tools. │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ selective sync
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       frankxai/arcanea                              │
│                    (PUBLIC - Open Source)                           │
│                                                                     │
│  Public-facing open source version. Contains shareable content,    │
│  the OSS skill system, and community-safe features.                │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                 frankxai/arcanea-intelligence-os                    │
│                    (PUBLIC - AIOS Agent System)                     │
│                                                                     │
│  Standalone agent orchestration system. Can be used independently  │
│  or integrated with the main platform.                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Repository Details

### 1. arcanea-platform (Private)

**URL**: `git@github.com:frankxai/arcanea-platform.git`
**Local Remote**: `platform`
**Branch**: `main`
**Visibility**: Private

**Contains**:
```
arcanea-platform/
├── apps/web/                 # Next.js 16 web application
│   ├── app/                  # App Router pages
│   ├── components/           # React components
│   └── lib/                  # Services, utilities
├── packages/                 # Shared packages
│   ├── database/             # Supabase client & types
│   └── ui/                   # Shared UI components
├── book/                     # Library of Arcanea (17 collections)
├── .claude/
│   ├── commands/             # 50+ slash commands
│   ├── skills/               # 16 skill directories
│   ├── lore/                 # Canonical lore files
│   └── agents/               # Agent configurations
├── arcanea-lore/             # Lore mirror (consider removing)
├── arcanea-intelligence-os/  # AIOS (embedded or submodule)
└── Arcanea World Building.../# World-building workspace
```

**Purpose**: Main development. All new features, fixes, and content go here first.

---

### 2. arcanea (Public/OSS)

**URL**: `git@github.com:frankxai/arcanea.git`
**Local Remote**: `oss`
**Branch**: `main`
**Visibility**: Public

**Contains**:
- Public-safe version of the platform
- OSS skill system
- Community templates
- @arcanea/core package
- claude-arcanea integration

**Purpose**:
- Open source community engagement
- Shareable Claude Code configurations
- Public documentation
- npm packages (@arcanea/*)

**Sync Policy**:
- NOT automatically synced with platform
- Selective features pushed when ready for public
- Some features are platform-exclusive (premium)

---

### 3. arcanea-intelligence-os (Public)

**URL**: `git@github.com:frankxai/arcanea-intelligence-os.git`
**Local Remote**: `origin` (when in AIOS directory)
**Branch**: `master`
**Visibility**: Public

**Contains**:
```
arcanea-intelligence-os/
├── agents/
│   ├── guardians/            # 10 Guardian agent definitions
│   ├── awakened/             # 7 Awakened orchestrators
│   ├── mythology/            # Earth mythology channeling
│   └── bestiary/             # Creative companions
├── skills/
│   └── {gate}-gate/          # Gate-specific skills
├── workflows/                # Quest pipelines
├── mcp/                      # MCP server integration
├── lib/                      # Core TypeScript library
└── bin/                      # CLI entry point
```

**Purpose**:
- Standalone agent orchestration system
- Can be installed independently via npm
- Claude Code integration via MCP
- The "AI" layer of Arcanea

**Relationship to Platform**:
- Currently embedded as folder in arcanea-platform
- Could be converted to git submodule for cleaner separation
- Changes here should be committed and pushed separately

---

## Sync Strategy

### Daily Development Flow

```
1. Work in arcanea-platform (main development)
   └── git pull platform main
   └── make changes
   └── git push platform main

2. AIOS changes (if any)
   └── cd arcanea-intelligence-os
   └── git pull origin master
   └── make changes
   └── git push origin master

3. OSS sync (when ready to publish)
   └── git push oss main (selective)
   └── OR: Use GitHub Actions for automated sync
```

### What Goes Where

| Content Type | Platform | OSS | AIOS |
|--------------|----------|-----|------|
| Next.js web app | ✅ | ✅ | ❌ |
| Library content (book/) | ✅ | ✅ | ❌ |
| Claude commands | ✅ | ✅ | ❌ |
| Claude skills | ✅ | ✅ | ❌ |
| Canonical lore | ✅ | ✅ | ❌ |
| Guardian agents | ✅ | ❌ | ✅ |
| Awakened agents | ✅ | ❌ | ✅ |
| Gate skills | ✅ | ❌ | ✅ |
| Premium features | ✅ | ❌ | ❌ |
| API keys/secrets | ✅ | ❌ | ❌ |

### Handling Divergence

When `oss` and `platform` diverge:

**Option A: Platform is source of truth**
```bash
# Force OSS to match platform
git push oss main --force
```

**Option B: Merge OSS changes into platform**
```bash
git fetch oss
git merge oss/main
# Resolve conflicts
git push platform main
git push oss main
```

**Option C: Keep them separate (current approach)**
- Platform for private development
- OSS for public releases
- Manual sync when features are ready

---

## Multi-Machine Workflow

### Setting Up a New Machine

```bash
# Clone main repo
git clone git@github.com:frankxai/arcanea-platform.git Arcanea
cd Arcanea

# Add OSS remote
git remote add oss git@github.com:frankxai/arcanea.git

# AIOS is embedded, but verify it's a proper repo
cd arcanea-intelligence-os
git remote -v  # Should show frankxai/arcanea-intelligence-os
```

### Syncing Between Machines

**On Machine A (after making changes)**:
```bash
# Main repo
cd ~/Arcanea
git add . && git commit -m "..." && git push platform main

# AIOS (if changed)
cd arcanea-intelligence-os
git add . && git commit -m "..." && git push origin master
```

**On Machine B (to get changes)**:
```bash
# Main repo
cd ~/Arcanea
git pull platform main

# AIOS
cd arcanea-intelligence-os
git pull origin master
```

---

## Claude Code Availability

After `git pull`, these are available on any machine:

### Commands (50+)
Located in `.claude/commands/`

| Category | Commands |
|----------|----------|
| **Core Arcanea** | `/arcanea`, `/arcanea-dev`, `/arcanea-team`, `/arcanea-council` |
| **Guardians** | `/guardian`, `/arcanea-guardians`, `/luminor` |
| **Intelligence** | `/luminor-intelligence`, `/arcanea-luminor` |
| **Mythology** | `/mythology`, `/greek-gods`, `/egypt-gods`, `/norse-gods` |
| **Creation** | `/creative-master`, `/character-forge`, `/world-build`, `/craft-prompt` |
| **Development** | `/arcanea-build`, `/arcanea-deploy`, `/arcanea-test`, `/arcanea-sync` |

### Skills (16)
Located in `.claude/skills/`

- `arcanea-core` - Core Arcanea functionality
- `arcanea-lore` - Lore management
- `creative` - Creative writing support
- `development` - Development workflows
- `oss` - Open source patterns
- `premium` - Premium features

### Lore Files
Located in `.claude/lore/`

- `ARCANEA_CANON.md` - Master canonical reference
- `CANON_LOCKED.md` - Approved immutable truths
- `ARCANEAN_LANGUAGE.md` - Naming conventions
- `guardians/` - Individual guardian files
- `metadata.yaml` - Entity relationships

---

## Future Considerations

### Git Submodule for AIOS

Currently AIOS is an embedded repo. Could convert to submodule:

```bash
# Remove embedded repo, add as submodule
rm -rf arcanea-intelligence-os
git submodule add git@github.com:frankxai/arcanea-intelligence-os.git

# Then on clone:
git clone --recurse-submodules ...

# To update:
git submodule update --remote
```

**Pros**: Cleaner separation, explicit versioning
**Cons**: More complex workflow, submodule gotchas

### Monorepo with Turborepo

Could consolidate all repos into one monorepo:

```
arcanea/
├── apps/
│   ├── web/           # Next.js app
│   └── cli/           # AIOS CLI
├── packages/
│   ├── core/          # @arcanea/core
│   ├── aios/          # Agent system
│   └── lore/          # Canonical lore
└── turbo.json
```

**Pros**: Single source of truth, atomic changes
**Cons**: Larger repo, harder to open-source selectively

---

## Quick Reference

### Remotes

| Remote | URL | Purpose |
|--------|-----|---------|
| `platform` | frankxai/arcanea-platform | Main development |
| `oss` | frankxai/arcanea | Public/open source |
| `origin` (AIOS) | frankxai/arcanea-intelligence-os | Agent system |

### Common Commands

```bash
# Check status of all
git status && cd arcanea-intelligence-os && git status && cd ..

# Pull everything
git pull platform main && cd arcanea-intelligence-os && git pull origin master && cd ..

# Push everything
git push platform main && cd arcanea-intelligence-os && git push origin master && cd ..
```

---

*"Three realms, one vision. Each repository serves the greater architecture of Arcanea."*
