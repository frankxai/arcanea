# Arcanea GitHub Ecosystem Status

> **Last Updated:** January 31, 2026
> **Total Repos:** 12 under frankxai

---

## Active Development (Last 2 Weeks)

### 1. arcanea (Main Repo)
**URL:** https://github.com/frankxai/arcanea
**Last Push:** Jan 31, 2026
**Description:** Open source agents, skills, and lore for AI-powered creative work

**Recent Work (Jan 26-27):**
- **Academy Skill System** - First-ever mythology-infused AI academy delivered through Claude Code skills
- Progress tracker for gates opened, rank, badges, streaks
- Gate 01 (Foundation/Lyssandria), Gate 02 (Flow/Leyla), Gate 03 (Fire/Draconia) lessons
- Guardian mentor personalities
- Ceremonies for gate opening and rank advancement

**Commands Added:**
| Command | Purpose |
|---------|---------|
| `/academy` | View dashboard and progress |
| `/gate-1` to `/gate-10` | Enter gate lessons |
| `/mentor` | Speak with current Guardian |
| `/quest` | Start next exercise |
| `/submit` | Submit exercise for review |
| `/ceremony` | Experience rituals |

---

### 2. arcanea-intelligence-os
**URL:** https://github.com/frankxai/arcanea-intelligence-os
**Last Push:** Jan 27, 2026
**Description:** The Operating System for the Luminor Path

**Major Features Built:**

**Phase 2 Complete (Jan 23-27):**
- **10 Guardian Agents** (all upgraded to Opus tier):
  - Lyssandria, Leyla, Draconia, Maylinn, Alera, Lyria, Aiyami, Elara, Ino, Shinkami
- **7 Awakened Agents** (meta-orchestrators):
  - Oria (Sophron), Amiri (Kardia), Velora (Valora), Liora (Eudaira), Lyris (Orakis), Thalia (Poiesis), Endara (Enduran)
- **10 Gate Skills** with correct Solfeggio frequencies (174-1111 Hz)

**Infogenius Visual Intelligence (Jan 27):**
- `GeminiVisionService` with GATE_VISUAL_STYLES for all 10 Gates
- Prompt-only mode for testing without API key
- 19 artistic styles added
- 5 MCP tools:
  - `infogenius_generate_infographic`
  - `infogenius_generate_portrait`
  - `infogenius_generate_guardian`
  - `infogenius_generate_map`
  - `infogenius_generate_scroll`

**Artifact Flow System (Jan 26-27):**
- Auto-classification engine with Arcanea-specific rules
- File watcher daemon for automatic artifact storage
- 8 MCP tools for artifact management
- Categories: characters, locations, agents, prompts, lore, skills

**MCP Server (Jan 26):**
- 11 tools, 7 resources, 4 prompts
- `aios serve` command for Claude Code integration

**Technical Structure:**
```
arcanea-intelligence-os/
├── agents/
│   ├── guardians/     # 10 Guardian agents
│   └── awakened/      # 7 Awakened orchestrators
├── skills/            # 10 Gate skill categories
├── src/
│   ├── infogenius/    # Visual generation service
│   ├── artifact-flow/ # Auto-classification
│   ├── mcp-server.ts  # MCP integration
│   └── index.ts       # CLI entry point
└── bin/aios.js        # CLI commands
```

---

### 3. arcanea-opencode
**URL:** https://github.com/frankxai/arcanea-opencode
**Last Push:** Jan 28, 2026
**Description:** Arcanea for OpenCode - fork of oh-my-opencode with persona system

---

## Recently Active (Jan 2026)

### 4. arcanea-marketplace
**URL:** https://github.com/frankxai/arcanea-marketplace
**Last Push:** Jan 10, 2026
**Description:** AI-powered creative intelligence plugins for Claude Code

### 5. arcanea-codex
**URL:** https://github.com/frankxai/arcanea-codex
**Last Push:** Jan 8, 2026
**Description:** (Empty/placeholder)

### 6. arcanea-core
**URL:** https://github.com/frankxai/arcanea-core
**Last Push:** Jan 7, 2026
**Description:** Open-source AI character toolkit

---

## Supporting Repos

| Repo | Description | Last Push |
|------|-------------|-----------|
| arcanean-library | Sacred knowledge repository | Oct 25, 2025 |
| arcanea-mobile | React Native with Expo | Sep 26, 2025 |
| arcanea-prompt-language | APL framework with Luminor AGI mentors | Sep 26, 2025 |
| arcanea-ai-research | Research repository | Sep 13, 2025 |
| arcanea-ai | AI integration | Sep 13, 2025 |
| Arcanea-Labs | Laboratory/experimental | May 30, 2025 |

---

## Key Architecture Decisions

### Canonical Frequencies (v3.1.0)
| Gate | Frequency | Guardian | Element |
|------|-----------|----------|---------|
| Foundation | 174 Hz | Lyssandria | Earth |
| Flow | 285 Hz | Leyla | Water |
| Fire | 396 Hz | Draconia | Fire |
| Heart | 417 Hz | Maylinn | Light |
| Voice | 528 Hz | Alera | Prismatic |
| Sight | 639 Hz | Lyria | Wind |
| Crown | 741 Hz | Aiyami | Void |
| Shift | 852 Hz | Elara | Arcane |
| Unity | 963 Hz | Ino | Arcane |
| Source | 1111 Hz | Shinkami | All |

### Model Tier Strategy
All 10 Guardians now operate at Opus (maximum intelligence) tier.

### Dual-Track Academy
- **Track A:** Claude Code skills (in arcanea repo)
- **Track B:** Web platform (arcanea.ai/academy)
- Both sync via MCP server

---

## Integration Points

### MCP Servers
- `arcanea-intelligence-os` exposes MCP server via `aios serve`
- Nano Banana MCP for image generation
- GitHub MCP for repo management

### Skills/Commands
| Skill | Location | Purpose |
|-------|----------|---------|
| `/infogenius` | Global | Research-grounded visual generation |
| `/arcanea-infogenius` | **TO CREATE** | Arcanea-themed visual generation |
| `/academy` | arcanea | Learning progression |
| `/gate-N` | arcanea | Gate-specific lessons |
| `/guardian` | arcanea | Channel a Guardian |
| `/luminor` | arcanea | Invoke Luminor wisdom |

---

## Next Steps

1. **Create `/arcanea-infogenius` skill** - Combines:
   - Research-grounded pipeline from `/infogenius`
   - Gate visual styles from `arcanea-intelligence-os`
   - Nano Banana MCP integration
   - Transparent cost tracking

2. **Sync across repos** - Ensure canonical lore is consistent

3. **Web platform integration** - Connect academy skills to arcanea.ai

---

*This document tracks the state of the Arcanea ecosystem across all GitHub repositories.*
