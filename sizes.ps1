# Quick size calculator
$ErrorActionPreference = 'SilentlyContinue'

function Get-FolderSize($path) {
    if (!(Test-Path $path)) { return 0 }
    $result = robocopy $path C:\Windows\Temp\Empty /L /S /NJH /NJS /NDL /NC /NS 2>&1
    $line = $result | Select-String "Bytes"
    if ($line -match "(\d+)\s+Bytes") {
        return [math]::Round([long]$matches[1] / 1GB, 2)
    }
    return 0
}

Write-Host "=== USER FOLDER SIZES ==="
$folders = @(
    "C:\Users\frank\Downloads",
    "C:\Users\frank\Documents", 
    "C:\Users\frank\Desktop",
    "C:\Users\frank\Arcanea",
    "C:\Users\frank\dev",
    "C:\Users\frank\Development"
)
foreach ($f in $folders) {
    $size = Get-FolderSize $f
    if ($size -gt 0) {
        Write-Host "$size GB`t$f"
    }
}

Write-Host "`n=== APPDATA LOCAL MAJOR DIRECTORIES ==="
$localDirs = @(
    "Packages",
    "Docker", 
    "Microsoft",
    "BraveSoftware",
    "Google",
    "GitHubDesktop",
    "Discord",
    "Steam",
    "npm-cache",
    "pip",
    "pnpm",
    "Temp",
    "Epic Games",
    "UnrealEngine",
    "Unity",
    "CrashDumps",
    "D3DSCache",
    "INetHistory"
)
$base = "C:\Users\frank\AppData\Local"
foreach ($d in $localDirs) {
    $path = Join-Path $base $d
    $size = Get-FolderSize $path
    if ($size -gt 0.01) {
        Write-Host "$size GB`t$d"
    }
}

Write-Host "`n=== APPDATA ROAMING MAJOR DIRECTORIES ==="
$roamingDirs = @(
    "Docker",
    "npm",
    "NuGet",
    "Microsoft",
    "Code",
    "Discord",
    "Slack",
    "Notion",
    "Obsidian"
)
$base = "C:\Users\frank\AppData\Roaming"
foreach ($d in $roamingDirs) {
    $path = Join-Path $base $d
    $size = Get-FolderSize $path
    if ($size -gt 0.01) {
        Write-Host "$size GB`t$d"
    }
}

Write-Host "`n=== DEVELOPMENT CACHES ==="
$caches = @(
    @("C:\Users\frank\.cargo", "Cargo"),
    @("C:\Users\frank\.bun", "Bun"),
    @("C:\Users\frank\.rustup", "Rustup"),
    @("C:\Users\frank\.cache", "Generic Cache"),
    @("C:\Users\frank\.pnpm-store", "pnpm Store"),
    @("C:\Users\frank\.ollama", "Ollama Models")
)
foreach ($c in $caches) {
    $size = Get-FolderSize $c[0]
    if ($size -gt 0.01) {
        Write-Host "$size GB`t$($c[1])"
    }
}

Write-Host "`n=== ANALYSIS COMPLETE ==="
