# Arcanea Storage Guardian - Clean Script
# Guardian: Draconia (Fire Gate) + Shinkami (Security Arbiter)
# Usage: powershell.exe -ExecutionPolicy Bypass -File scripts/storage/clean.ps1 [-Mode safe|moderate|aggressive]

param(
    [ValidateSet("safe", "moderate", "aggressive")]
    [string]$Mode = "safe",
    [switch]$DryRun = $false
)

$ErrorActionPreference = "SilentlyContinue"
$totalRecovered = 0

function Get-SizeGB {
    param([string]$Path)
    if (Test-Path $Path) {
        $size = (Get-ChildItem $Path -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum -ErrorAction SilentlyContinue).Sum
        return [math]::Round($size / 1GB, 2)
    }
    return 0
}

function Remove-Safely {
    param(
        [string]$Path,
        [string]$Label,
        [switch]$IsRecursive = $true
    )
    $sizeBefore = Get-SizeGB $Path
    if ($sizeBefore -gt 0) {
        if ($DryRun) {
            Write-Host ("    [DRY RUN] Would clean: {0} ({1} GB)" -f $Label, $sizeBefore) -ForegroundColor DarkYellow
        } else {
            if ($IsRecursive) {
                Remove-Item -Path "$Path\*" -Recurse -Force -ErrorAction SilentlyContinue
            } else {
                Remove-Item -Path $Path -Force -ErrorAction SilentlyContinue
            }
            $sizeAfter = Get-SizeGB $Path
            $recovered = [math]::Round($sizeBefore - $sizeAfter, 2)
            $script:totalRecovered += $recovered
            Write-Host ("    Cleaned: {0} (recovered {1} GB)" -f $Label, $recovered) -ForegroundColor Green
        }
    }
}

# Header
Write-Host ""
Write-Host "  ========================================" -ForegroundColor Red
Write-Host "    ARCANEA STORAGE GUARDIAN - CLEANUP" -ForegroundColor Red
Write-Host "    Guardian: Draconia | Gate: Fire" -ForegroundColor DarkRed
Write-Host "    Security: Shinkami | Gate: Source" -ForegroundColor DarkCyan
Write-Host "    Mode: $Mode | DryRun: $DryRun" -ForegroundColor DarkRed
Write-Host "    $(Get-Date -Format 'yyyy-MM-dd HH:mm')" -ForegroundColor DarkGray
Write-Host "  ========================================" -ForegroundColor Red
Write-Host ""

$userHome = "C:\Users\frank"

# === SAFE MODE: Always safe to clean ===
Write-Host "  SAFE OPERATIONS:" -ForegroundColor Green

# Windows Temp
Remove-Safely "$env:TEMP" "Windows Temp ($env:TEMP)"

# Recycle Bin
if (-not $DryRun) {
    $shell = New-Object -ComObject Shell.Application
    $recycleBin = $shell.NameSpace(0x0a)
    $itemCount = $recycleBin.Items().Count
    if ($itemCount -gt 0) {
        Clear-RecycleBin -Force -ErrorAction SilentlyContinue
        Write-Host "    Cleaned: Recycle Bin ($itemCount items)" -ForegroundColor Green
    }
} else {
    Write-Host "    [DRY RUN] Would empty Recycle Bin" -ForegroundColor DarkYellow
}

# npm cache
Remove-Safely "$userHome\AppData\Local\npm-cache" "npm cache"

# uv/pip cache
Remove-Safely "$userHome\AppData\Local\uv\cache" "uv Python cache"

# Windows prefetch (safe)
Remove-Safely "C:\Windows\Prefetch" "Windows Prefetch"

# Thumbnail cache
Remove-Safely "$userHome\AppData\Local\Microsoft\Windows\Explorer\thumbcache_*" "Thumbnail cache" -IsRecursive:$false

Write-Host ""

# === MODERATE MODE ===
if ($Mode -in @("moderate", "aggressive")) {
    Write-Host "  MODERATE OPERATIONS:" -ForegroundColor Yellow

    # pnpm store prune
    if (-not $DryRun) {
        Write-Host "    Running pnpm store prune..." -ForegroundColor Yellow
        & pnpm store prune 2>$null
        Write-Host "    Done: pnpm store pruned" -ForegroundColor Green
    } else {
        Write-Host "    [DRY RUN] Would prune pnpm store" -ForegroundColor DarkYellow
    }

    # Electron app caches
    $electronApps = @(
        @{ Name = "Slack cache"; Path = "$userHome\AppData\Local\slack\Cache" },
        @{ Name = "Slack code cache"; Path = "$userHome\AppData\Local\slack\Code Cache" },
        @{ Name = "Perplexity cache"; Path = "$userHome\AppData\Local\Perplexity\Cache" },
        @{ Name = "Brave cache"; Path = "$userHome\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\Cache" },
        @{ Name = "VS Code cache"; Path = "$userHome\AppData\Roaming\Code\Cache" },
        @{ Name = "VS Code cached data"; Path = "$userHome\AppData\Roaming\Code\CachedData" }
    )

    foreach ($app in $electronApps) {
        Remove-Safely $app.Path $app.Name
    }

    # Old Windows Update files
    if (-not $DryRun) {
        Write-Host "    Running DISM cleanup..." -ForegroundColor Yellow
        & Dism.exe /online /Cleanup-Image /StartComponentCleanup 2>$null
        Write-Host "    Done: DISM cleanup" -ForegroundColor Green
    }

    Write-Host ""
}

# === AGGRESSIVE MODE ===
if ($Mode -eq "aggressive") {
    Write-Host "  AGGRESSIVE OPERATIONS (Shinkami Security Review):" -ForegroundColor Red

    # Docker prune
    Write-Host "    Checking Docker..." -ForegroundColor Red
    $dockerInstalled = Get-Command docker -ErrorAction SilentlyContinue
    if ($dockerInstalled) {
        if (-not $DryRun) {
            & docker system prune -a -f 2>$null
            & docker builder prune -f --filter "until=168h" 2>$null
            Write-Host "    Done: Docker pruned (images, containers, build cache)" -ForegroundColor Green
        } else {
            Write-Host "    [DRY RUN] Would prune Docker (all unused images + old build cache)" -ForegroundColor DarkYellow
        }
    }

    # Claude Desktop old data
    $claudeCache = "$userHome\AppData\Roaming\Claude"
    $claudeSize = Get-SizeGB $claudeCache
    if ($claudeSize -gt 5) {
        Write-Host ("    NOTE: Claude Desktop is {0} GB - consider clearing old conversations" -f $claudeSize) -ForegroundColor Yellow
        Write-Host "    (Manual: Claude Desktop > Settings > Clear conversation history)" -ForegroundColor DarkGray
    }

    # Adobe cache
    Remove-Safely "$userHome\AppData\Roaming\Adobe\Common\Media Cache Files" "Adobe Media Cache"

    Write-Host ""
}

# Summary
Write-Host "  ========================================" -ForegroundColor Cyan
if ($DryRun) {
    Write-Host "  DRY RUN COMPLETE - No changes made" -ForegroundColor DarkYellow
} else {
    Write-Host ("  TOTAL RECOVERED: {0} GB" -f [math]::Round($totalRecovered, 2)) -ForegroundColor Green
}
$cFree = [math]::Round((Get-PSDrive C).Free / 1GB, 1)
Write-Host ("  C:/ Free Space Now: {0} GB" -f $cFree) -ForegroundColor $(if ($cFree -lt 10) { "Red" } else { "Green" })
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host ""
