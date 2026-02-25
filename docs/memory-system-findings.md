# Memory System — Research Findings

## Competitive Analysis

### Why NOT starting with Mem0 cloud
- External API dependency (requires key, network, payment)
- Adds latency to every memory operation
- Cannot introspect stored data without Mem0 dashboard
- Overkill for the start — Starlight is self-contained first
- **We build Mem0-compatible API surface, can swap backend later**

### Why NOT claude-mem (the tool)
- claude-mem is just a pattern, not a library
- Our implementation IS claude-mem at its core: .md files with frontmatter
- We're building a better version with Guardian routing + 6 vault types

### Why NOT Pieces OS
- Core is closed-source — cannot absorb
- Client SDK available but requires daemon installed
- Not portable — users must install Pieces separately
- **Decision**: Build adapter later, not a dependency

### Why .md files WIN for v1
- Every Claude Code user already works with .md files
- `grep`, `cat`, git-diff — all work out of the box
- MEMORY.md is the Anthropic-blessed standard — we extend it
- Human-readable memory is philosophically aligned with Starlight (transparent, not black-box)
- "Memory you can read" is a feature, not a limitation

## Architecture Patterns Studied

### BasicMemory (OSS)
- Stores Claude conversations as local .md files
- MCP server exposes them to Claude Code
- Our approach is compatible + extends with vault classification

### Mem0 API Surface (to be compatible with)
```
POST /v1/memories (messages, user_id) → memory_id
GET  /v1/memories/search (query, user_id) → memories[]
GET  /v1/memories (user_id) → memories[]
DELETE /v1/memories/:id
```
Our Mem0Adapter maps these to vault operations.

## The ArcaneMD Format (our unique spec)

```markdown
---
id: vault_1708891234_abc123
vault: strategic
guardian: Lyssandria
gate: Foundation
frequency: 174
tags: [architecture, decision, memory-system]
confidence: high
source: conversation
created: 2026-02-25T03:14:00Z
expires: null
---

# Memory: Storage Architecture Decision

We chose file-based .md storage over Mem0/sqlite because:
- Zero external dependencies
- Human-readable and git-friendly
- Claude Code reads .md natively
- Mem0-compatible API means we can swap later

**Classification**: Strategic vault because: contains architecture decision, roadmap implication, long-term consequence.
```

This format is:
- Parseable by any YAML library
- Readable by humans + Claude
- Searchable by grep
- Diff-able by git

## Guardian → Vault Affinity (for routing)
| Guardian | Hz | Primary Vault | Secondary Vault |
|----------|----|---------------|-----------------|
| Lyssandria | 174 | strategic | technical |
| Leyla | 285 | creative | operational |
| Draconia | 396 | strategic | technical |
| Maylinn | 417 | creative | wisdom |
| Alera | 528 | creative | wisdom |
| Lyria | 639 | wisdom | horizon |
| Aiyami | 741 | wisdom | horizon |
| Elara | 852 | strategic | horizon |
| Ino | 963 | operational | creative |
| Shinkami | 1111 | wisdom | horizon |

## Frequency Encoding Strategy
- Memories can carry their Guardian's Hz frequency as metadata
- Future: "recall at 528 Hz" = search Alera's memories = voice/truth/expression domain
- Not just decorative — creates a real retrieval dimension
