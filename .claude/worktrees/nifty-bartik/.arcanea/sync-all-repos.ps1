# Arcanea Repository Sync Script
# Run from Windows PowerShell: .\sync-all-repos.ps1

$ErrorActionPreference = "Continue"
$BaseDir = "C:\Users\frank\Arcanea"

# Repository definitions
$Repos = @(
    @{ Name = "arcanea (main)"; Path = $BaseDir; Branch = "local-work-sync" },
    @{ Name = "arcanea-ecosystem"; Path = "$BaseDir\arcanea-ecosystem"; Branch = "main" },
    @{ Name = "arcanea.ai"; Path = "$BaseDir\arcanea.ai"; Branch = "main" },
    @{ Name = "claude-arcanea"; Path = "$BaseDir\claude-arcanea"; Branch = "main" },
    @{ Name = "gemini-arcanea"; Path = "$BaseDir\gemini-arcanea"; Branch = "main" },
    @{ Name = "codex-arcanea"; Path = "$BaseDir\codex-arcanea"; Branch = "main" },
    @{ Name = "arcanea-infogenius"; Path = "$BaseDir\arcanea-infogenius"; Branch = "main" },
    @{ Name = "arcanea-library-superintelligence"; Path = "$BaseDir\arcanea-library-superintelligence"; Branch = "main" },
    @{ Name = "arcanea-mobile"; Path = "$BaseDir\arcanea-mobile"; Branch = "main" },
    @{ Name = "arcanea-opencode"; Path = "$BaseDir\arcanea-opencode"; Branch = "main" },
    @{ Name = "arcanea-luminor"; Path = "$BaseDir\arcanea-luminor"; Branch = "main" },
    @{ Name = "arcanea-agents"; Path = "$BaseDir\arcanea-agents"; Branch = "main" },
    @{ Name = "arcaneabot"; Path = "$BaseDir\arcaneabot"; Branch = "main" },
    @{ Name = "arcanea-game-development"; Path = "$BaseDir\arcanea-game-development"; Branch = "main" }
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  ARCANEA REPOSITORY SYNC" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$SyncedCount = 0
$ErrorCount = 0

foreach ($Repo in $Repos) {
    Write-Host ">>> $($Repo.Name)" -ForegroundColor Yellow

    if (-Not (Test-Path $Repo.Path)) {
        Write-Host "    [SKIP] Directory not found" -ForegroundColor Gray
        continue
    }

    if (-Not (Test-Path "$($Repo.Path)\.git")) {
        Write-Host "    [SKIP] Not a git repository" -ForegroundColor Gray
        continue
    }

    Push-Location $Repo.Path

    try {
        # Check for changes
        $Status = git status --porcelain 2>&1

        if ($Status) {
            Write-Host "    [CHANGES] Found uncommitted changes" -ForegroundColor Magenta

            # Stage all changes
            git add -A 2>&1 | Out-Null

            # Commit with timestamp
            $CommitMsg = "chore: Arcanea ecosystem sync $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
            git commit -m $CommitMsg 2>&1 | Out-Null

            Write-Host "    [COMMIT] $CommitMsg" -ForegroundColor Green
        }

        # Push to remote
        $Branch = $Repo.Branch
        Write-Host "    [PUSH] Pushing to origin/$Branch..." -ForegroundColor Cyan

        $PushResult = git push origin $Branch 2>&1

        if ($LASTEXITCODE -eq 0) {
            Write-Host "    [OK] Synced successfully" -ForegroundColor Green
            $SyncedCount++
        } else {
            Write-Host "    [WARN] Push result: $PushResult" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "    [ERROR] $($_.Exception.Message)" -ForegroundColor Red
        $ErrorCount++
    }

    Pop-Location
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SYNC COMPLETE" -ForegroundColor Cyan
Write-Host "  Synced: $SyncedCount | Errors: $ErrorCount" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
