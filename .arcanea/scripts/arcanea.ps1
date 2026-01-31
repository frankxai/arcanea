# Arcanea Workspace Management Script
# Usage: .\arcanea.ps1 <command> [options]

param(
    [Parameter(Position=0)]
    [string]$Command,

    [Parameter(Position=1, ValueFromRemainingArguments=$true)]
    [string[]]$Args
)

$WorkspaceRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$ConfigPath = Join-Path $PSScriptRoot "..\config.json"
$Config = Get-Content $ConfigPath | ConvertFrom-Json

function Write-Banner {
    Write-Host ""
    Write-Host "   +-------------------------------------------+" -ForegroundColor Cyan
    Write-Host "   |     ARCANEA WORKSPACE HUB v1.0.0          |" -ForegroundColor Cyan
    Write-Host "   |   'Through the Gates we rise'             |" -ForegroundColor DarkCyan
    Write-Host "   +-------------------------------------------+" -ForegroundColor Cyan
    Write-Host ""
}

function Get-RepoStatus {
    param([string]$RepoName, [PSObject]$RepoConfig)

    $RepoPath = Join-Path $WorkspaceRoot $RepoConfig.path

    if (-not (Test-Path $RepoPath)) {
        return @{ Status = "missing"; Symbol = "o"; Color = "DarkGray" }
    }

    Push-Location $RepoPath
    try {
        $gitStatus = git status --porcelain 2>$null
        $branch = git branch --show-current 2>$null
        $behind = git rev-list --count "HEAD..@{u}" 2>$null
        $ahead = git rev-list --count "@{u}..HEAD" 2>$null

        if ($gitStatus) {
            return @{ Status = "dirty"; Symbol = "*"; Color = "Yellow"; Branch = $branch; Changes = ($gitStatus | Measure-Object).Count }
        }
        elseif ($behind -gt 0) {
            return @{ Status = "behind"; Symbol = "v"; Color = "Magenta"; Branch = $branch; Behind = $behind }
        }
        elseif ($ahead -gt 0) {
            return @{ Status = "ahead"; Symbol = "^"; Color = "Green"; Branch = $branch; Ahead = $ahead }
        }
        else {
            return @{ Status = "clean"; Symbol = "+"; Color = "Green"; Branch = $branch }
        }
    } finally {
        Pop-Location
    }
}

function Show-Status {
    Write-Banner
    Write-Host "Repository Status:" -ForegroundColor White
    Write-Host ""

    foreach ($repo in $Config.repositories.PSObject.Properties) {
        $name = $repo.Name
        $repoConfig = $repo.Value

        if ($repoConfig.placeholder) {
            Write-Host "  o " -NoNewline -ForegroundColor DarkGray
            Write-Host "$name" -NoNewline -ForegroundColor DarkGray
            Write-Host " (placeholder)" -ForegroundColor DarkGray
            continue
        }

        $status = Get-RepoStatus -RepoName $name -RepoConfig $repoConfig

        Write-Host "  $($status.Symbol) " -NoNewline -ForegroundColor $status.Color
        Write-Host "$name" -NoNewline -ForegroundColor White

        if ($status.Branch) {
            Write-Host " [$($status.Branch)]" -NoNewline -ForegroundColor DarkCyan
        }

        switch ($status.Status) {
            "dirty" { Write-Host " ($($status.Changes) changes)" -ForegroundColor Yellow }
            "behind" { Write-Host " ($($status.Behind) behind)" -ForegroundColor Magenta }
            "ahead" { Write-Host " ($($status.Ahead) ahead)" -ForegroundColor Green }
            "clean" { Write-Host " (clean)" -ForegroundColor Green }
            "missing" { Write-Host " (not cloned)" -ForegroundColor DarkGray }
        }
    }
    Write-Host ""
}

function Sync-Repos {
    Write-Banner
    Write-Host "Syncing repositories..." -ForegroundColor White
    Write-Host ""

    foreach ($repo in $Config.repositories.PSObject.Properties) {
        $name = $repo.Name
        $repoConfig = $repo.Value

        if ($repoConfig.placeholder -or -not $repoConfig.remote) {
            continue
        }

        $repoPath = Join-Path $WorkspaceRoot $repoConfig.path

        Write-Host "  -> $name... " -NoNewline -ForegroundColor Cyan

        if (-not (Test-Path $repoPath)) {
            Write-Host "cloning... " -NoNewline -ForegroundColor Yellow
            git clone $repoConfig.remote $repoPath 2>$null
            Write-Host "done" -ForegroundColor Green
        } else {
            Push-Location $repoPath
            git fetch --quiet 2>$null
            $result = git pull --quiet 2>&1
            Pop-Location

            if ($LASTEXITCODE -eq 0) {
                Write-Host "up to date" -ForegroundColor Green
            } else {
                Write-Host "conflicts (manual resolution needed)" -ForegroundColor Red
            }
        }
    }
    Write-Host ""
}

function Start-Dev {
    param([string]$Target = "main")

    # Resolve alias
    if ($Config.aliases.PSObject.Properties[$Target]) {
        $Target = $Config.aliases.$Target
    }

    $repoConfig = $Config.repositories.$Target
    if (-not $repoConfig) {
        Write-Host "Unknown repository: $Target" -ForegroundColor Red
        return
    }

    $repoPath = Join-Path $WorkspaceRoot $repoConfig.path

    Write-Banner
    Write-Host "Starting development server for: $Target" -ForegroundColor Cyan
    Write-Host "Path: $repoPath" -ForegroundColor DarkGray
    Write-Host ""

    Push-Location $repoPath
    if (Test-Path "package.json") {
        pnpm dev
    } else {
        Write-Host "No package.json found in $Target" -ForegroundColor Red
    }
    Pop-Location
}

function Start-Claude {
    Write-Banner
    Write-Host "Launching Claude Code in WSL..." -ForegroundColor Cyan
    Write-Host "Path: /mnt/c/Users/frank/Arcanea" -ForegroundColor DarkGray
    Write-Host ""
    wsl -e bash -c "cd /mnt/c/Users/frank/Arcanea && claude"
}

function Show-Help {
    Write-Banner
    Write-Host "Commands:" -ForegroundColor White
    Write-Host ""
    Write-Host "  status              Show status of all repositories" -ForegroundColor Gray
    Write-Host "  sync                Pull latest from all remotes" -ForegroundColor Gray
    Write-Host "  dev [repo]          Start dev server (default: main)" -ForegroundColor Gray
    Write-Host "  clone               Clone missing repositories" -ForegroundColor Gray
    Write-Host "  cd <repo>           Print path to repository" -ForegroundColor Gray
    Write-Host "  claude              Launch Claude Code in WSL" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Aliases:" -ForegroundColor White
    Write-Host ""
    foreach ($alias in $Config.aliases.PSObject.Properties) {
        Write-Host "  $($alias.Name) -> $($alias.Value)" -ForegroundColor Gray
    }
    Write-Host ""
}

# Main command handler
switch ($Command) {
    "status" { Show-Status }
    "sync" { Sync-Repos }
    "dev" {
        $devTarget = if ($Args[0]) { $Args[0] } else { "main" }
        Start-Dev -Target $devTarget
    }
    "clone" { Sync-Repos }
    "cd" {
        $target = $Args[0]
        if ($Config.aliases.PSObject.Properties[$target]) {
            $target = $Config.aliases.$target
        }
        $repoPath = Join-Path $WorkspaceRoot $Config.repositories.$target.path
        Write-Host $repoPath
    }
    "claude" { Start-Claude }
    "help" { Show-Help }
    default { Show-Help }
}
