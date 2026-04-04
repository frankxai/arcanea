#!/usr/bin/env bash
# Arcanea Orchestrator — Machine Bootstrap
# Run from the repo root: bash .arcanea/scripts/ao-init.sh
set -e

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

echo "Arcanea Orchestrator — bootstrapping agent configs..."
echo "Repo: $REPO_ROOT"
echo ""

# --- 1. Claude Code ---
mkdir -p .claude/commands .claude/skills/arcanea-orchestrator

# Only create if missing (don't overwrite user customizations)
for cmd in ao handover status arcanea-orchestrator; do
  if [ ! -f ".claude/commands/$cmd.md" ]; then
    echo "  Creating .claude/commands/$cmd.md"
    # Pull from claude-arcanea repo or create minimal shim
    case $cmd in
      ao)
        cat > ".claude/commands/$cmd.md" << 'CMDEOF'
---
description: "Arcanea Orchestrator — ops dashboard, promote, digest, coach, cleanup, plan, handover. Usage: /ao [status|promote|digest|coach|cleanup|plan|handover]"
thinking: true
---
# Arcanea Orchestrator (AO)
Subcommand from args: `$ARGUMENTS`
Read `.claude/skills/arcanea-orchestrator/SKILL.md` for your full protocol, then execute the requested mode.
If no subcommand given, default to **status**.
Before any mode, read: AGENTS.md, planning-with-files/CURRENT_STATE_* (newest), .arcanea/ops/ao.md.
CMDEOF
        ;;
      handover)
        cat > ".claude/commands/$cmd.md" << 'CMDEOF'
---
description: "Write a session handover doc to docs/ops/. Use at the end of any work session."
thinking: false
---
Read `.arcanea/ops/commands/handover.md` and execute directly.
CMDEOF
        ;;
      status)
        cat > ".claude/commands/$cmd.md" << 'CMDEOF'
---
description: "Quick repo status dashboard — branch, trunk, worktrees, dirty files."
thinking: false
---
Read `.arcanea/ops/commands/status.md` and execute directly.
CMDEOF
        ;;
      arcanea-orchestrator)
        cat > ".claude/commands/$cmd.md" << 'CMDEOF'
---
description: "Arcanea Orchestrator — alias for /ao."
thinking: true
---
Read `.claude/commands/ao.md` instructions and execute with the same `$ARGUMENTS`.
CMDEOF
        ;;
    esac
  else
    echo "  .claude/commands/$cmd.md exists, skipping"
  fi
done

# Copy orchestrator skill if missing
if [ ! -f ".claude/skills/arcanea-orchestrator/SKILL.md" ]; then
  echo "  Fetching orchestrator skill from GitHub..."
  curl -sL "https://raw.githubusercontent.com/frankxai/claude-arcanea/master/skills/arcanea-orchestrator/SKILL.md" \
    -o ".claude/skills/arcanea-orchestrator/SKILL.md" 2>/dev/null || echo "  (fetch failed, create manually)"
fi

# --- 2. Codex ---
mkdir -p .codex
if [ ! -f ".codex/instructions.md" ]; then
  echo "  Creating .codex/instructions.md"
  cat > ".codex/instructions.md" << 'EOF'
# Arcanea - Codex Configuration
Read `.arcanea/ops/AGENT_BOOTSTRAP.md` first.
Read `.arcanea/ops/ao.md` for ops protocol.
Read `.arcanea/ops/commands/*.md` for shared commands.
Write handover docs at session end: `docs/ops/SHORT_STATUS_AND_HANDOVER_{date}.md`
EOF
else
  echo "  .codex/instructions.md exists, skipping"
fi

# --- 3. Gemini ---
mkdir -p .gemini
if [ ! -f ".gemini/instructions.md" ]; then
  echo "  Creating .gemini/instructions.md"
  cat > ".gemini/instructions.md" << 'EOF'
# Arcanea - Gemini Configuration
Read `.arcanea/ops/AGENT_BOOTSTRAP.md` first.
Read `.arcanea/ops/ao.md` for ops protocol.
Read `.arcanea/ops/commands/*.md` for shared commands.
Write handover docs at session end: `docs/ops/SHORT_STATUS_AND_HANDOVER_{date}.md`
EOF
else
  echo "  .gemini/instructions.md exists, skipping"
fi

# --- 4. Cursor ---
mkdir -p .cursor/rules
if [ ! -f ".cursor/rules/arcanea.mdc" ]; then
  echo "  Creating .cursor/rules/arcanea.mdc"
  cat > ".cursor/rules/arcanea.mdc" << 'EOF'
---
description: Arcanea project rules
globs: "**/*"
alwaysApply: true
---
Read `.arcanea/ops/AGENT_BOOTSTRAP.md` for shared rules and commands.
Read `.arcanea/ops/ao.md` for orchestrator protocol.
Write handover docs at session end: `docs/ops/SHORT_STATUS_AND_HANDOVER_{date}.md`
EOF
else
  echo "  .cursor/rules/arcanea.mdc exists, skipping"
fi

# --- 5. Starlight ---
STARLIGHT_HOME="${STARLIGHT_HOME:-$HOME/.starlight}"
if [ ! -d "$STARLIGHT_HOME/vaults" ]; then
  echo "  Bootstrapping Starlight at $STARLIGHT_HOME"
  mkdir -p "$STARLIGHT_HOME/vaults" "$STARLIGHT_HOME/graph" "$STARLIGHT_HOME/evals" "$STARLIGHT_HOME/agentdb/agents"
  for vault in strategic technical creative operational wisdom horizon; do
    touch "$STARLIGHT_HOME/vaults/$vault.jsonl"
  done
else
  echo "  Starlight already exists at $STARLIGHT_HOME"
fi

# --- 6. Verify ---
echo ""
echo "Done. Verify:"
echo ""
echo "  Shared ops:  $(ls .arcanea/ops/commands/*.md 2>/dev/null | wc -l) commands"
echo "  Claude:      $(ls .claude/commands/*.md 2>/dev/null | wc -l) commands, $(ls .claude/skills/*/SKILL.md 2>/dev/null | wc -l) skills"
echo "  Codex:       $([ -f .codex/instructions.md ] && echo 'ready' || echo 'missing')"
echo "  Gemini:      $([ -f .gemini/instructions.md ] && echo 'ready' || echo 'missing')"
echo "  Cursor:      $([ -f .cursor/rules/arcanea.mdc ] && echo 'ready' || echo 'missing')"
echo "  Starlight:   $(ls $STARLIGHT_HOME/vaults/*.jsonl 2>/dev/null | wc -l) vaults"
echo ""
echo "Quick test: open Claude Code and type /ao or /status"
