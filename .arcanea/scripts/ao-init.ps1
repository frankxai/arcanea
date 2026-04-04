# Arcanea Orchestrator - Machine Bootstrap (Windows)
# Run from repo root: powershell -ExecutionPolicy Bypass -File .arcanea/scripts/ao-init.ps1

$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
Set-Location $RepoRoot

Write-Host "Arcanea Orchestrator - bootstrapping agent configs..." -ForegroundColor Cyan
Write-Host "Repo: $RepoRoot"
Write-Host ""

function Ensure-Dir { param([string]$P); if (-not (Test-Path $P)) { New-Item -ItemType Directory -Force -Path $P | Out-Null } }
function Write-If-Missing {
    param([string]$Path, [string[]]$Lines, [string]$Label)
    if (-not (Test-Path $Path)) {
        Ensure-Dir (Split-Path $Path -Parent)
        $Lines | Set-Content -Path $Path -Encoding UTF8
        Write-Host "  Created $Label" -ForegroundColor Green
    } else {
        Write-Host "  $Label exists, skipping" -ForegroundColor DarkGray
    }
}

# 1. Claude Code
Ensure-Dir ".claude/commands"
Ensure-Dir ".claude/skills/arcanea-orchestrator"

Write-If-Missing ".claude/commands/ao.md" @(
    '---'
    'description: "Arcanea Orchestrator. Usage: /ao [status|promote|digest|coach|cleanup|plan|handover]"'
    'thinking: true'
    '---'
    '# Arcanea Orchestrator (AO)'
    'Subcommand: `$ARGUMENTS`. Read `.claude/skills/arcanea-orchestrator/SKILL.md` then execute.'
    'Default to **status** if no subcommand. Read AGENTS.md and .arcanea/ops/ao.md first.'
) "Claude: /ao"

Write-If-Missing ".claude/commands/handover.md" @(
    '---'
    'description: "Write a session handover doc to docs/ops/."'
    'thinking: false'
    '---'
    'Read `.arcanea/ops/commands/handover.md` and execute directly.'
) "Claude: /handover"

Write-If-Missing ".claude/commands/status.md" @(
    '---'
    'description: "Quick repo status dashboard."'
    'thinking: false'
    '---'
    'Read `.arcanea/ops/commands/status.md` and execute directly.'
) "Claude: /status"

Write-If-Missing ".claude/commands/arcanea-orchestrator.md" @(
    '---'
    'description: "Alias for /ao."'
    'thinking: true'
    '---'
    'Read `.claude/commands/ao.md` and execute with `$ARGUMENTS`.'
) "Claude: /arcanea-orchestrator"

# 2. Codex
Write-If-Missing ".codex/instructions.md" @(
    '# Arcanea - Codex Configuration'
    'Read `.arcanea/ops/AGENT_BOOTSTRAP.md` first.'
    'Read `.arcanea/ops/ao.md` for ops protocol.'
    'Read `.arcanea/ops/commands/*.md` for shared commands.'
    'Write handover docs at session end.'
) "Codex: instructions"

# 3. Gemini
Write-If-Missing ".gemini/instructions.md" @(
    '# Arcanea - Gemini Configuration'
    'Read `.arcanea/ops/AGENT_BOOTSTRAP.md` first.'
    'Read `.arcanea/ops/ao.md` for ops protocol.'
    'Read `.arcanea/ops/commands/*.md` for shared commands.'
) "Gemini: instructions"

# 4. Cursor
Write-If-Missing ".cursor/rules/arcanea.mdc" @(
    '---'
    'description: Arcanea project rules'
    'globs: "**/*"'
    'alwaysApply: true'
    '---'
    'Read `.arcanea/ops/AGENT_BOOTSTRAP.md` for shared rules.'
    'Read `.arcanea/ops/ao.md` for orchestrator protocol.'
) "Cursor: rules"

# 5. Starlight
$StarlightHome = if ($env:STARLIGHT_HOME) { $env:STARLIGHT_HOME } else { Join-Path $HOME ".starlight" }
if (-not (Test-Path "$StarlightHome/vaults")) {
    Write-Host "  Bootstrapping Starlight at $StarlightHome" -ForegroundColor Green
    Ensure-Dir "$StarlightHome/vaults"
    Ensure-Dir "$StarlightHome/graph"
    Ensure-Dir "$StarlightHome/agentdb/agents"
    foreach ($v in @('strategic','technical','creative','operational','wisdom','horizon')) {
        $vp = "$StarlightHome/vaults/$v.jsonl"
        if (-not (Test-Path $vp)) { New-Item -ItemType File -Force -Path $vp | Out-Null }
    }
} else {
    Write-Host "  Starlight exists at $StarlightHome" -ForegroundColor DarkGray
}

# 6. Verify
Write-Host ""
Write-Host "Done." -ForegroundColor Cyan
$sc = (Get-ChildItem ".arcanea/ops/commands/*.md" -ErrorAction SilentlyContinue).Count
$cc = (Get-ChildItem ".claude/commands/*.md" -ErrorAction SilentlyContinue).Count
$vt = (Get-ChildItem "$StarlightHome/vaults/*.jsonl" -ErrorAction SilentlyContinue).Count
Write-Host "  Shared ops:  $sc commands"
Write-Host "  Claude:      $cc commands"
Write-Host "  Codex:       $(if (Test-Path '.codex/instructions.md') { 'ready' } else { 'missing' })"
Write-Host "  Gemini:      $(if (Test-Path '.gemini/instructions.md') { 'ready' } else { 'missing' })"
Write-Host "  Cursor:      $(if (Test-Path '.cursor/rules/arcanea.mdc') { 'ready' } else { 'missing' })"
Write-Host "  Starlight:   $vt vaults"
Write-Host ""
Write-Host 'Test: open Claude Code and type /ao or /status' -ForegroundColor Yellow
