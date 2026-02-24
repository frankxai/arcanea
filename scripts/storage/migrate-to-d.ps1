# Arcanea Storage Guardian - Migration Script
# Guardian: Lyssandria (Earth Gate)
# Usage: powershell.exe -ExecutionPolicy Bypass -File scripts/storage/migrate-to-d.ps1 -Target <target>
# Targets: wsl, docker, steam, epic, riot, pnpm, all
# MUST RUN AS ADMINISTRATOR

param(
    [ValidateSet("wsl", "docker", "steam", "epic", "riot", "pnpm", "all")]
    [string]$Target = "wsl",
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"

function Test-Administrator {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($identity)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function New-SafeSymlink {
    param(
        [string]$Source,
        [string]$Destination,
        [string]$Label
    )

    Write-Host ""
    Write-Host "  === Migrating: $Label ===" -ForegroundColor Cyan
    Write-Host "    From: $Source" -ForegroundColor DarkGray
    Write-Host "    To:   $Destination" -ForegroundColor DarkGray

    if ($DryRun) {
        Write-Host "    [DRY RUN] Would move and symlink" -ForegroundColor DarkYellow
        return
    }

    # Verify source exists
    if (-not (Test-Path $Source)) {
        Write-Host "    SKIP: Source does not exist" -ForegroundColor Yellow
        return
    }

    # Check if already a symlink
    $item = Get-Item $Source -Force -ErrorAction SilentlyContinue
    if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
        Write-Host "    SKIP: Already a symlink" -ForegroundColor Yellow
        return
    }

    # Create destination parent
    $destParent = Split-Path $Destination -Parent
    if (-not (Test-Path $destParent)) {
        New-Item -ItemType Directory -Path $destParent -Force | Out-Null
    }

    # Measure source
    $sourceSize = (Get-ChildItem $Source -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum -ErrorAction SilentlyContinue).Sum
    $sizeGB = [math]::Round($sourceSize / 1GB, 2)
    Write-Host "    Size: $sizeGB GB" -ForegroundColor White

    # Copy to destination
    Write-Host "    Copying to D:/..." -ForegroundColor Yellow
    Copy-Item -Path $Source -Destination $Destination -Recurse -Force

    # Verify copy
    $destSize = (Get-ChildItem $Destination -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum -ErrorAction SilentlyContinue).Sum
    if ([math]::Abs($sourceSize - $destSize) -gt 1MB) {
        Write-Host "    ERROR: Size mismatch after copy! Aborting migration for $Label" -ForegroundColor Red
        Write-Host "    Source: $sourceSize bytes, Dest: $destSize bytes" -ForegroundColor Red
        return
    }

    # Remove original
    Write-Host "    Removing original..." -ForegroundColor Yellow
    Remove-Item -Path $Source -Recurse -Force

    # Create symlink
    Write-Host "    Creating symlink..." -ForegroundColor Yellow
    New-Item -ItemType SymbolicLink -Path $Source -Target $Destination | Out-Null

    Write-Host "    DONE: Migrated $sizeGB GB to D:/" -ForegroundColor Green
}

# Header
Write-Host ""
Write-Host "  ========================================" -ForegroundColor DarkGreen
Write-Host "    ARCANEA STORAGE GUARDIAN - MIGRATION" -ForegroundColor DarkGreen
Write-Host "    Guardian: Lyssandria | Gate: Foundation" -ForegroundColor Green
Write-Host "    Target: $Target | DryRun: $DryRun" -ForegroundColor Green
Write-Host "  ========================================" -ForegroundColor DarkGreen

# Admin check
if (-not (Test-Administrator)) {
    Write-Host ""
    Write-Host "  ERROR: This script requires Administrator privileges." -ForegroundColor Red
    Write-Host "  Right-click PowerShell > Run as Administrator" -ForegroundColor Red
    exit 1
}

$userHome = "C:\Users\frank"

# === WSL2 Migration (special procedure) ===
if ($Target -in @("wsl", "all")) {
    Write-Host ""
    Write-Host "  === WSL2 Migration ===" -ForegroundColor Cyan

    if ($DryRun) {
        Write-Host "    [DRY RUN] Would export Ubuntu, reimport to D:\WSL\Ubuntu" -ForegroundColor DarkYellow
    } else {
        Write-Host "    Step 1: Creating backup directory..." -ForegroundColor Yellow
        New-Item -ItemType Directory -Path "D:\WSL" -Force | Out-Null
        New-Item -ItemType Directory -Path "D:\wsl-backup" -Force | Out-Null

        Write-Host "    Step 2: Shutting down WSL..." -ForegroundColor Yellow
        wsl --shutdown
        Start-Sleep -Seconds 3

        Write-Host "    Step 3: Exporting Ubuntu to D:\wsl-backup\ubuntu.tar..." -ForegroundColor Yellow
        Write-Host "    (This may take several minutes for a 26 GB image)" -ForegroundColor DarkGray
        wsl --export Ubuntu "D:\wsl-backup\ubuntu.tar"

        Write-Host "    Step 4: Verifying export..." -ForegroundColor Yellow
        if (Test-Path "D:\wsl-backup\ubuntu.tar") {
            $tarSize = [math]::Round((Get-Item "D:\wsl-backup\ubuntu.tar").Length / 1GB, 2)
            Write-Host "    Export size: $tarSize GB" -ForegroundColor White

            Write-Host "    Step 5: Unregistering Ubuntu from C:/..." -ForegroundColor Red
            wsl --unregister Ubuntu

            Write-Host "    Step 6: Importing to D:\WSL\Ubuntu..." -ForegroundColor Yellow
            New-Item -ItemType Directory -Path "D:\WSL\Ubuntu" -Force | Out-Null
            wsl --import Ubuntu "D:\WSL\Ubuntu" "D:\wsl-backup\ubuntu.tar" --version 2

            Write-Host "    Step 7: Setting default user..." -ForegroundColor Yellow
            ubuntu config --default-user frank 2>$null
            # Fallback: create /etc/wsl.conf
            wsl -d Ubuntu -e bash -c "echo -e '[user]\ndefault=frank' | sudo tee /etc/wsl.conf" 2>$null

            Write-Host "    DONE: WSL2 migrated to D:\WSL\Ubuntu" -ForegroundColor Green
            Write-Host "    Recovered ~26 GB on C:/" -ForegroundColor Green
            Write-Host "    Backup kept at D:\wsl-backup\ubuntu.tar (delete when confirmed working)" -ForegroundColor DarkGray
        } else {
            Write-Host "    ERROR: Export failed! Ubuntu not modified." -ForegroundColor Red
        }
    }
}

# === Docker Migration ===
if ($Target -in @("docker", "all")) {
    Write-Host ""
    Write-Host "  === Docker Data Migration ===" -ForegroundColor Cyan
    Write-Host "    Docker Desktop manages its own VHDX location." -ForegroundColor DarkGray
    Write-Host "    To migrate:" -ForegroundColor Yellow
    Write-Host "      1. Open Docker Desktop" -ForegroundColor White
    Write-Host "      2. Settings > Resources > Advanced" -ForegroundColor White
    Write-Host "      3. Change 'Disk image location' to D:\Docker\data" -ForegroundColor White
    Write-Host "      4. Apply & Restart" -ForegroundColor White
}

# === Game Libraries ===
$gameMigrations = @()

if ($Target -in @("steam", "all")) {
    $gameMigrations += @{
        Label = "Steam Library"
        Source = "C:\Program Files (x86)\Steam\steamapps"
        Dest = "D:\Games\Steam\steamapps"
        Note = "After migration, add D:\Games\Steam\steamapps as a Steam Library folder in Steam > Settings > Storage"
    }
}

if ($Target -in @("epic", "all")) {
    $gameMigrations += @{
        Label = "Epic Games"
        Source = "C:\Program Files\Epic Games"
        Dest = "D:\Games\Epic Games"
        Note = "After migration, update install location in Epic Games Launcher > Settings"
    }
}

if ($Target -in @("riot", "all")) {
    $gameMigrations += @{
        Label = "Riot Games"
        Source = "C:\Riot Games"
        Dest = "D:\Games\Riot Games"
        Note = "After migration, Riot Client may need reinstall pointing to D:\Games"
    }
}

foreach ($game in $gameMigrations) {
    New-SafeSymlink -Source $game.Source -Destination $game.Dest -Label $game.Label
    if ($game.Note) {
        Write-Host "    NOTE: $($game.Note)" -ForegroundColor DarkGray
    }
}

# === pnpm store ===
if ($Target -in @("pnpm", "all")) {
    New-SafeSymlink -Source "$userHome\.pnpm-store" -Destination "D:\dev-caches\.pnpm-store" -Label "pnpm store"

    Write-Host "    Also updating pnpm config..." -ForegroundColor Yellow
    if (-not $DryRun) {
        & pnpm config set store-dir "D:\dev-caches\.pnpm-store" 2>$null
    }
}

# Summary
Write-Host ""
Write-Host "  ========================================" -ForegroundColor DarkGreen
$cFree = [math]::Round((Get-PSDrive C).Free / 1GB, 1)
Write-Host ("  C:/ Free Space Now: {0} GB" -f $cFree) -ForegroundColor $(if ($cFree -lt 10) { "Red" } else { "Green" })
Write-Host "  ========================================" -ForegroundColor DarkGreen
Write-Host ""
