# Arcanea Repository Index

> *"Through the Gates we rise. With the Guardians we create."*

## Master Repository Registry

This document tracks all Arcanea repositories across the ecosystem.

---

## Core Platform Repositories

| Repository | GitHub | Purpose | Status | Guardian |
|------------|--------|---------|--------|----------|
| **arcanea** | frankxai/arcanea | Main Next.js platform | Active | Draconia |
| **arcanea-intelligence-os** | frankxai/arcanea-intelligence-os | CLI, agents, MCP | Active | Shinkami |
| **arcanea-core** | frankxai/arcanea-core | AI character toolkit | Active | Aiyami |
| **arcanea-marketplace** | frankxai/arcanea-marketplace | Claude Code plugins | Active | Ino |

## AI Assistant Integrations

| Repository | GitHub | Purpose | Status | Guardian |
|------------|--------|---------|--------|----------|
| **claude-arcanea** | frankxai/claude-arcanea | Claude Code integration | **CREATE** | Alera |
| **opencode-arcanea** | frankxai/opencode-arcanea | OpenCode integration | **CREATE** | Alera |
| **gemini-arcanea** | frankxai/gemini-arcanea | Gemini integration | **CREATE** | Alera |
| **codex-arcanea** | frankxai/arcanea-codex | Codex/GPT integration | Empty | Alera |

## Creative & World-Building

| Repository | GitHub | Purpose | Status | Guardian |
|------------|--------|---------|--------|----------|
| **ultraworld** | frankxai/ultraworld | World-building engine | **CREATE** | Thalia |
| **arcanea-ai-research** | frankxai/arcanea-ai-research | Research | Active | Lyria |

## Organization

| Repository | GitHub | Purpose | Status | Guardian |
|------------|--------|---------|--------|----------|
| **Arcanea-Labs** | Arcanea-Labs/Arcanea | Organization baseline | Active | Oria |

---

## Local Workspace Mapping

```
C:\Users\frank\arcanea-hub\
├── main/                    → frankxai/arcanea
├── intelligence-os/         → frankxai/arcanea-intelligence-os
├── platform/                → frankxai/arcanea-platform (experiments)
├── labs/                    → Arcanea-Labs/Arcanea
├── claude-arcanea/          → frankxai/claude-arcanea
├── opencode-arcanea/        → frankxai/opencode-arcanea
├── gemini-arcanea/          → frankxai/gemini-arcanea
├── codex-arcanea/           → frankxai/arcanea-codex
├── ultraworld/              → frankxai/ultraworld
├── core/                    → frankxai/arcanea-core
├── marketplace/             → frankxai/arcanea-marketplace
└── mcp-servers/             → frankxai/arcanea-mcp-servers
```

---

## Package Publishing

| Package | npm | Version | Status |
|---------|-----|---------|--------|
| @arcanea/claude | npmjs.com/@arcanea/claude | 1.0.0 | **PUBLISH** |
| @arcanea/opencode | npmjs.com/@arcanea/opencode | 1.0.0 | **PUBLISH** |
| @arcanea/gemini | npmjs.com/@arcanea/gemini | 1.0.0 | **PUBLISH** |
| @arcanea/codex | npmjs.com/@arcanea/codex | 1.0.0 | **PUBLISH** |
| @arcanea/intelligence-os | npmjs.com/@arcanea/intelligence-os | 1.0.0 | Active |
| @arcanea/core | npmjs.com/@arcanea/core | 1.0.0 | Active |

---

## Repository Responsibilities

### claude-arcanea
- Claude Code CLI integration
- Guardian agent routing for Claude
- Skill definitions
- Workflow automation

### opencode-arcanea
- OpenCode editor integration
- Extension/plugin architecture
- OpenCode-specific skills

### gemini-arcanea
- Google Gemini integration
- Gemini-specific prompts
- Multi-modal capabilities

### codex-arcanea
- OpenAI Codex/GPT integration
- ChatGPT plugin
- GPT-4 specific features

### ultraworld
- Parallel world generation
- 11-agent architecture
- World Bible templates
- Canon integration

---

## Daily Sync Protocol

Run `/arcanea-status` to:
1. Check all repo statuses
2. Sync with remotes
3. Report evolution metrics
4. Identify action items

---

*Last updated: 2026-01-27*
*Starlight Intelligence v1.0.0*
