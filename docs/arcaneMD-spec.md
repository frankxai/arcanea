# ArcaneMD Format Specification v1.0

> "Memory you can read is memory you can trust."

ArcaneMD is a structured Markdown format with YAML frontmatter for human-readable,
git-friendly AI memory storage. It is the native format of the Arcanea Memory System
and Starlight Vaults.

## File Location

Each vault entry is stored as an individual `.md` file:

```
{storagePath}/vaults/{vault-type}/{entry-id}.md
```

Example:

```
.arcanea/memory/vaults/strategic/vault_1708891234_abc123.md
```

## File Format

```markdown
---
id: vault_1708891234_abc123
vault: strategic
guardian: Lyssandria
gate: Foundation
frequency: 174
tags: [architecture, decision, storage]
confidence: high
source: conversation
created: 2026-02-25T03:14:00Z
updated: 2026-02-25T03:14:00Z
expires: null
---

# Memory Title (optional first heading)

The content of the memory goes here. This can be any Markdown content.
Code blocks, lists, and other formatting are preserved.
```

## Required Frontmatter Fields

| Field | Type | Values | Description |
|-------|------|--------|-------------|
| `id` | string | `{vault}_{timestamp}_{6chars}` | Unique entry ID |
| `vault` | string | `strategic\|technical\|creative\|operational\|wisdom\|horizon` | Vault type |
| `created` | string | ISO 8601 | Creation timestamp |

## Optional Frontmatter Fields

| Field | Type | Values | Description |
|-------|------|--------|-------------|
| `updated` | string | ISO 8601 | Last update timestamp (defaults to `created`) |
| `guardian` | string | Ten Guardian names | Guardian namespace |
| `gate` | string | Ten Gate names | Gate association |
| `frequency` | number | `174\|285\|396\|417\|528\|639\|741\|852\|963\|1111` | Solfeggio Hz |
| `tags` | array | `[tag1, tag2]` | Categorization tags |
| `confidence` | string | `low\|medium\|high\|verified` | Confidence level |
| `source` | string | any | Where this memory came from |
| `expires` | string\|null | ISO 8601 or `null` | Expiry timestamp (`null` = permanent) |

## The Guardians & Frequencies

| Guardian | Gate | Hz | Element | Primary Vault |
|----------|------|----|---------|----------------|
| Lyssandria | Foundation | 174 | Earth | strategic |
| Leyla | Flow | 285 | Water | creative |
| Draconia | Fire | 396 | Fire | strategic |
| Maylinn | Heart | 417 | Fire | creative |
| Alera | Voice | 528 | Wind | creative |
| Lyria | Sight | 639 | Void | wisdom |
| Aiyami | Crown | 741 | Spirit | wisdom |
| Elara | Shift | 852 | Void | strategic |
| Ino | Unity | 963 | Spirit | operational |
| Shinkami | Source | 1111 | Spirit | wisdom |

Note: 417 Hz is Maylinn's canonical frequency (Heart Gate).
432 Hz is a different music tuning concept (Verdi tuning) and is not related.

## Horizon Vault: JSONL Format

The Horizon Vault uses a different format: JSONL (JSON Lines) for append-only streaming.

File location: `.arcanea/memory/horizon/entries.jsonl`

Each line is a complete JSON object:

```json
{"id":"horizon_1708891234_abc123","wish":"That AI systems amplify human creativity","context":"Building the memory system","author":"frankx","coAuthored":true,"tags":["alignment","creativity"],"createdAt":"2026-02-25T03:14:00Z"}
```

The Horizon Vault is APPEND-ONLY. Lines are never deleted or modified.

## MEMORY.md: Synthesized View

The MemoryBridge synthesizes vault entries into a single `MEMORY.md` file compatible with
Claude Code's native memory system:

File location: `.arcanea/memory/MEMORY.md`

This file is auto-generated. Edit source vault files, not `MEMORY.md` directly.

## Vault Index

Each vault directory contains an `index.json` file listing all entry IDs and their metadata
for fast listing without reading every `.md` file:

```
.arcanea/memory/vaults/strategic/index.json
```

The index is maintained automatically by the storage backend and should not be edited by hand.

## Compatibility

ArcaneMD files are compatible with:

- Any Markdown editor (Obsidian, VS Code, etc.)
- Git diff and version control
- `grep`, `cat`, and standard Unix tools
- Claude Code (reads `.md` files natively)
- Mem0 API (via `Mem0Adapter` translation layer)
