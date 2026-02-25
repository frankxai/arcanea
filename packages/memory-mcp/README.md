# @arcanea/memory-mcp

> Starlight Vaults MCP Server — 6-vault semantic memory for any AI tool

Add persistent, structured memory to Claude Code, Cursor, Cline, Windsurf, or any MCP-compatible AI assistant.

## Install

```bash
# Claude Code
claude mcp add arcanea-memory npx @arcanea/memory-mcp

# Cursor / Cline / Windsurf — add to mcp.json:
{
  "arcanea-memory": {
    "command": "npx",
    "args": ["@arcanea/memory-mcp"]
  }
}
```

## Tools

| Tool | Description |
|------|-------------|
| `vault_remember` | Store a memory (auto-classifies into right vault) |
| `vault_recall` | Search across all 6 vaults |
| `vault_recent` | Get recent memories |
| `vault_stats` | System statistics |
| `horizon_append` | Add a benevolent wish (permanent) |
| `horizon_read` | Read Horizon wishes |
| `vault_classify` | Classify content without storing |
| `memory_sync` | Sync vaults to MEMORY.md |

## The 6 Vaults

- **Strategic** — Decisions, architecture, roadmaps
- **Technical** — Patterns, solutions, code insights
- **Creative** — Voice, style, narrative patterns
- **Operational** — Recent context, session state
- **Wisdom** — Meta-patterns, cross-domain insights
- **Horizon** — Benevolent intentions (append-only, public dataset)

## Configuration

Set `STARLIGHT_PATH` to customize where vault data is stored:

```bash
STARLIGHT_PATH=/your/path npx @arcanea/memory-mcp
```

Default: `.arcanea/memory/` in your project root.

## License

MIT — FrankX / Arcanea
