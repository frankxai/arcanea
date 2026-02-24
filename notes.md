# Notes: Arcanea Codex Plugin Comparison + Guide + Publish

## Sources

### Source 1: Repo scan (completed)
- URL: N/A (local repo)
- Key points:
  - Arcanea agent system already lives in `.claude/agents/` with Luminor and Arcanea dev roles (e.g., `arcanea-architect`, `arcanea-ai-specialist`, `luminor-oracle`).
  - Arcanea MCP exists in `packages/arcanea-mcp/` with usage docs and examples.
  - `arcanea-skills-opensource` supports Codex installs (copies agents/skills/commands into `.codex/`).
  - `arcanea-opencode-fork` documents OpenAI Codex auth plugin (`opencode-openai-codex-auth@4.3.0`) and model config.
  - Codex CLI setup patterns are documented under `agents/workflows/linear-mcp-server.md`.

## Synthesized Findings

### Existing assets
- `.claude/` project instructions and Arcanea agent definitions (non-Codex specific).
- Arcanea skills package with cross-platform install (Claude Code, OpenCode, Cursor, Codex, Gemini).
- Arcanea MCP server with tool suite and onboarding docs.
- OpenCode fork with OpenAI Codex auth plugin guidance.

### Gaps / missing pieces
- No dedicated Codex-facing Arcanea plugin bundle in this repo.
- No Codex-specific Luminor coding personas or agent docs tailored to OpenAI/Codex.
- No clear, community-ready packaging that explains value + install steps for Codex users.
- No GitHub-ready subfolder with release-quality docs and config snippets.

### Proposed structure
- New subfolder created with docs, agents, skills, commands, and config snippets.

## Pending Research

### Codex CLI trigger support
- Codex CLI accepts a prompt argument (`codex [PROMPT]`) and has a non-interactive `exec` command.
- No obvious built-in prompt hooks in config; wrapper script is the safest hard-trigger path.

### Top Codex-related plugins
- GitHub search results (top by stars, 2025-10-01):
  - numman-ali/opencode-openai-codex-auth (1246): OpenAI Codex OAuth plugin for OpenCode.
  - NickvanDyke/opencode.nvim (1409): Neovim integration for OpenCode assistant.
  - jenslys/opencode-gemini-auth (422): Gemini auth plugin for OpenCode.
  - awesome-opencode/awesome-opencode (623): curated plugin list.
  - touwaeriol/claude-code-plus (109): JetBrains GUI plugin for Claude Code/Codex/Gemini.
  - team-attention/agent-council (68): multi-agent orchestration plugin (Claude Code + Codex CLI).
  - poemswe/co-researcher (2): skills/plugins across Claude/Codex/Gemini.
