# Arcanea Storage Guardian - Audit Script
# Guardian: Lyria (Sight Gate)
# Usage: powershell.exe -ExecutionPolicy Bypass -File scripts/storage/audit.ps1 [-Level quick|standard|deep]

param(
    [ValidateSet("quick", "standard", "deep")]
    [string]$Level = "quick"
)

$ErrorActionPreference = "SilentlyContinue"

function Get-DriveStatus {
    param([string]$DriveLetter)
    $drive = Get-PSDrive $DriveLetter -ErrorAction SilentlyContinue
    if ($drive) {
        $used = [math]::Round($drive.Used / 1GB, 1)
        $free = [math]::Round($drive.Free / 1GB, 1)
        $total = [math]::Round(($drive.Used + $drive.Free) / 1GB, 1)
        $pct = [math]::Round(($drive.Used / ($drive.Used + $drive.Free)) * 100, 1)
        $barLen = [math]::Floor($pct / 5)
        $bar = ("=" * $barLen) + ("-" * (20 - $barLen))
        $status = if ($pct -gt 95) { "CRITICAL" } elseif ($pct -gt 85) { "WARNING" } else { "HEALTHY" }
        $color = if ($pct -gt 95) { "Red" } elseif ($pct -gt 85) { "Yellow" } else { "Green" }
        Write-Host ("  {0}:/ {1,6}GB / {2,6}GB ({3}%) [{4}] {5}" -f $DriveLetter, $used, $total, $pct, $bar, $status) -ForegroundColor $color
        return @{ Used = $used; Free = $free; Total = $total; Pct = $pct; Status = $status }
    }
}

function Get-FolderSize {
    param([string]$Path)
    if (Test-Path $Path) {
        $size = (Get-ChildItem $Path -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum -ErrorAction SilentlyContinue).Sum
        return [math]::Round($size / 1GB, 2)
    }
    return 0
}

# Header
Write-Host ""
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host "    ARCANEA STORAGE GUARDIAN - AUDIT" -ForegroundColor Cyan
Write-Host "    Guardian: Lyria | Gate: Sight" -ForegroundColor DarkCyan
Write-Host "    Level: $Level | $(Get-Date -Format 'yyyy-MM-dd HH:mm')" -ForegroundColor DarkCyan
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host ""

# Drive Status
Write-Host "  DRIVE STATUS:" -ForegroundColor White
$cStatus = Get-DriveStatus "C"
$dStatus = Get-DriveStatus "D"
Write-Host ""

# Quick audit
Write-Host "  TOP CONSUMERS (C:\Users\frank):" -ForegroundColor White
$userHome = "C:\Users\frank"
$knownPaths = @(
    @{ Name = "OneDrive"; Path = "$userHome\OneDrive" },
    @{ Name = "AppData\Local"; Path = "$userHome\AppData\Local" },
    @{ Name = "AppData\Roaming"; Path = "$userHome\AppData\Roaming" },
    @{ Name = "Arcanea"; Path = "$userHome\Arcanea" },
    @{ Name = ".vscode"; Path = "$userHome\.vscode" },
    @{ Name = ".pnpm-store"; Path = "$userHome\.pnpm-store" },
    @{ Name = "Downloads"; Path = "$userHome\Downloads" },
    @{ Name = "Documents"; Path = "$userHome\Documents" }
)

$results = @()
foreach ($item in $knownPaths) {
    $size = Get-FolderSize $item.Path
    if ($size -gt 0.01) {
        $results += [PSCustomObject]@{ Name = $item.Name; SizeGB = $size }
    }
}
$results | Sort-Object SizeGB -Descending | ForEach-Object {
    $color = if ($_.SizeGB -gt 50) { "Red" } elseif ($_.SizeGB -gt 10) { "Yellow" } else { "White" }
    Write-Host ("    {0,6} GB  {1}" -f $_.SizeGB, $_.Name) -ForegroundColor $color
}

Write-Host ""
Write-Host "  SYSTEM DIRECTORIES:" -ForegroundColor White
$sysPaths = @(
    @{ Name = "Program Files (x86)"; Path = "C:\Program Files (x86)" },
    @{ Name = "Program Files"; Path = "C:\Program Files" },
    @{ Name = "Riot Games"; Path = "C:\Riot Games" },
    @{ Name = "ProgramData"; Path = "C:\ProgramData" }
)

foreach ($item in $sysPaths) {
    if (Test-Path $item.Path) {
        $size = Get-FolderSize $item.Path
        if ($size -gt 1) {
            $color = if ($size -gt 50) { "Red" } elseif ($size -gt 20) { "Yellow" } else { "White" }
            Write-Host ("    {0,6} GB  {1}" -f $size, $item.Name) -ForegroundColor $color
        }
    }
}

if ($Level -eq "quick") {
    Write-Host ""
    Write-Host "  Run with -Level standard or -Level deep for more detail." -ForegroundColor DarkGray
    Write-Host ""
    exit
}

# Standard audit additions
if ($Level -in @("standard", "deep")) {
    Write-Host ""
    Write-Host "  CACHE ANALYSIS:" -ForegroundColor White
    $caches = @(
        @{ Name = "Windows Temp"; Path = "$env:TEMP" },
        @{ Name = "npm cache"; Path = "$userHome\AppData\Local\npm-cache" },
        @{ Name = "npm global"; Path = "$userHome\AppData\Roaming\npm" },
        @{ Name = "uv cache"; Path = "$userHome\AppData\Local\uv" },
        @{ Name = "Claude Desktop"; Path = "$userHome\AppData\Roaming\Claude" },
        @{ Name = "Perplexity"; Path = "$userHome\AppData\Local\Perplexity" },
        @{ Name = "Slack"; Path = "$userHome\AppData\Local\slack" },
        @{ Name = "Brave"; Path = "$userHome\AppData\Local\BraveSoftware" },
        @{ Name = "Docker"; Path = "$userHome\AppData\Local\Docker" },
        @{ Name = "Unity"; Path = "$userHome\AppData\Local\Unity" },
        @{ Name = "Overwolf"; Path = "$userHome\AppData\Roaming\Overwolf" },
        @{ Name = "Adobe"; Path = "$userHome\AppData\Roaming\Adobe" },
        @{ Name = "Descript"; Path = "$userHome\AppData\Roaming\Descript" },
        @{ Name = "VS Code Data"; Path = "$userHome\AppData\Roaming\Code" }
    )

    foreach ($item in $caches) {
        $size = Get-FolderSize $item.Path
        if ($size -gt 0.1) {
            $reclaimable = if ($item.Name -match "Temp|cache|Cache") { " [RECLAIMABLE]" } else { "" }
            $color = if ($size -gt 5) { "Yellow" } else { "White" }
            Write-Host ("    {0,6} GB  {1}{2}" -f $size, $item.Name, $reclaimable) -ForegroundColor $color
        }
    }

    Write-Host ""
    Write-Host "  WSL2 VIRTUAL DISK:" -ForegroundColor White
    Get-ChildItem "$userHome\AppData\Local\Packages\*\LocalState\ext4.vhdx" -Force -ErrorAction SilentlyContinue | ForEach-Object {
        $sizeGB = [math]::Round($_.Length / 1GB, 2)
        $distro = ($_.FullName -split '\\Packages\\')[1] -split '\\' | Select-Object -First 1
        Write-Host ("    {0,6} GB  {1}" -f $sizeGB, $distro) -ForegroundColor Yellow
    }

    Write-Host ""
    Write-Host "  ONEDRIVE BREAKDOWN:" -ForegroundColor White
    if (Test-Path "$userHome\OneDrive") {
        Get-ChildItem "$userHome\OneDrive" -Directory -Force -ErrorAction SilentlyContinue | ForEach-Object {
            $size = Get-FolderSize $_.FullName
            [PSCustomObject]@{ Name = $_.Name; SizeGB = $size }
        } | Sort-Object SizeGB -Descending | Where-Object { $_.SizeGB -gt 0.5 } | ForEach-Object {
            Write-Host ("    {0,6} GB  {1}" -f $_.SizeGB, $_.Name) -ForegroundColor Yellow
        }
    }

    Write-Host ""
    Write-Host "  GAME INSTALLATIONS:" -ForegroundColor White
    $games = @(
        @{ Name = "Steam"; Path = "C:\Program Files (x86)\Steam" },
        @{ Name = "Epic Games"; Path = "C:\Program Files\Epic Games" },
        @{ Name = "Riot Games"; Path = "C:\Riot Games" },
        @{ Name = "Oculus"; Path = "C:\Program Files\Oculus" }
    )
    foreach ($item in $games) {
        $size = Get-FolderSize $item.Path
        if ($size -gt 1) {
            Write-Host ("    {0,6} GB  {1}  [MOVABLE TO D:/]" -f $size, $item.Name) -ForegroundColor Yellow
        }
    }
}

# Deep audit additions
if ($Level -eq "deep") {
    Write-Host ""
    Write-Host "  LARGE FILES (>500MB on C:\Users\frank):" -ForegroundColor White
    Get-ChildItem "$userHome" -Recurse -File -Force -ErrorAction SilentlyContinue |
        Where-Object { $_.Length -gt 500MB } |
        Sort-Object Length -Descending |
        Select-Object -First 20 |
        ForEach-Object {
            $sizeMB = [math]::Round($_.Length / 1MB, 0)
            $relPath = $_.FullName.Replace($userHome, "~")
            Write-Host ("    {0,6} MB  {1}" -f $sizeMB, $relPath) -ForegroundColor Yellow
        }
}

# Summary
Write-Host ""
Write-Host "  ----------------------------------------" -ForegroundColor Cyan
Write-Host "  RECOMMENDATIONS:" -ForegroundColor White

if ($cStatus.Pct -gt 95) {
    Write-Host "  [CRITICAL] C:/ is above 95% - immediate action required" -ForegroundColor Red
    Write-Host "    1. Enable OneDrive Files On-Demand (recover ~150 GB)" -ForegroundColor Red
    Write-Host "    2. Move games to D:/ (recover ~200 GB)" -ForegroundColor Red
    Write-Host "    3. Move WSL2 to D:/ (recover ~27 GB)" -ForegroundColor Red
} elseif ($cStatus.Pct -gt 85) {
    Write-Host "  [WARNING] C:/ above 85% - schedule cleanup" -ForegroundColor Yellow
} else {
    Write-Host "  [OK] Storage levels healthy" -ForegroundColor Green
}

Write-Host ""
