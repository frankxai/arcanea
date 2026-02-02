# Linear MCP Server Setup

## Why
- Sync Arcanea milestones, sprints, and bugs with a shared source of truth.
- Let Codex fetch, create, and update Linear issues directly from the terminal.
- Keep documentation light in-repo while milestones live in Linear.

## 1. Create a Linear API key
1. Open https://linear.app and switch to the Arcanea workspace.
2. Go to `Settings -> Developer -> API Keys`.
3. Create a new key named `Codex MCP`.
4. Copy the token immediately and store it in your password manager.

## 2. Install the Linear MCP server
Use the maintained npm package that wraps Linear's GraphQL API.

```powershell
npm install -g linear-mcp-server
```

> You can skip the global install if you prefer `npx` (see config below).

## 3. Update Codex CLI config (`C:\Users\Frank\.codex\config.toml`)
Add a new `mcp_servers.linear` entry. Keep existing keys above the new table.

```toml
[mcp_servers.linear]
command = "npx"
args = ["-y", "linear-mcp-server"]
startup_timeout_sec = 15

env = { LINEAR_API_KEY = "${LINEAR_API_KEY}" }
```

Notes:
- The `${LINEAR_API_KEY}` syntax tells Codex to read from your environment.
- If you prefer a local install, change `command` to `linear-mcp-server` and drop the args.

## 4. Export the API key before launching Codex
Add this to your PowerShell profile (`$PROFILE`) or run per session:

```powershell
$env:LINEAR_API_KEY = "paste_your_token_here"
```

Verify it is available:

```powershell
$env:LINEAR_API_KEY
```

## 5. Test the connection
1. Restart Codex CLI so it reloads `config.toml`.
2. Ask Codex: `list MCP servers` - you should see `linear`.
3. Run a dry tool call: `fetch Linear teams` (Codex will choose `linear_search_issues` / similar).
4. If it times out, confirm the key and retry.

## 6. Suggested Linear structure
- Workspace: `Arcanea`.
- Teams: `Mobile`, `Lore`, `Systems`, `Ops` aligned with pods.
- Custom fields: `Cycle (enum)`, `Pod (enum)`, `Priority (0-4)`.
- Views:
  - `Cycle 17-09 Sprint` (filters: cycle = 17-09, status != Done).
  - `Ready for Codex` (status = Todo, assignee = Codex service user).
  - `Investors` (label = Investor Update).
- Milestones: map monthly outcomes (e.g., `2025-10 Chat MVP`).

## 7. Working agreement
- Codex opens issues for sizable tasks and links PRs in the description.
- Gemini logs research artifacts as issues with the `Research` label.
- Claude owns release notes / comms using `Lore` label.
- Humans close the loop during Friday demo by moving issues to `Done`.

## 8. Troubleshooting
- `401 Unauthorized`: key revoked - create a fresh one and update `$env:LINEAR_API_KEY`.
- `GraphQL error: viewer is null`: key belongs to another workspace.
- `Timeout waiting for MCP server`: bump `startup_timeout_sec` or run `linear-mcp-server --verbose` manually.
- `npx` installing every time: install globally and switch `command` to the binary path.

## 9. Optional: pin to the repo
Create `.env.mcp` and source it in a `prelaunch.ps1` script if you want per-project keys. Keep secrets out of git.
