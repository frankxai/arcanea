# Storage Analysis Script for user frank
Write-Host "=== STORAGE ANALYSIS FOR frank ===" -ForegroundColor Green
Write-Host ""

# Function to get directory size
function Get-DirSize($path) {
    if (Test-Path $path) {
        $size = (Get-ChildItem $path -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
        return $size
    }
    return 0
}

# User folders
Write-Host "=== USER FOLDERS ===" -ForegroundColor Cyan
$userFolders = @(
    "C:\Users\frank\Downloads",
    "C:\Users\frank\Documents",
    "C:\Users\frank\Desktop",
    "C:\Users\frank\AppData",
    "C:\Users\frank\Arcanea"
)

foreach ($folder in $userFolders) {
    if (Test-Path $folder) {
        $size = Get-DirSize $folder
        $sizeGB = $size / 1GB
        Write-Host ("{0:N2} GB`t{1}" -f $sizeGB, $folder)
    }
}

Write-Host ""
Write-Host "=== APPDATA LOCAL SUBFOLDERS (Top 20) ===" -ForegroundColor Cyan
$localDirs = Get-ChildItem "C:\Users\frank\AppData\Local" -Directory -ErrorAction SilentlyContinue
$localSizes = foreach ($dir in $localDirs) {
    $size = Get-DirSize $dir.FullName
    [PSCustomObject]@{
        Name = $dir.Name
        SizeGB = $size / 1GB
        Path = $dir.FullName
    }
}
$localSizes | Sort-Object SizeGB -Descending | Select-Object -First 20 | ForEach-Object {
    Write-Host ("{0:N2} GB`t{1}" -f $_.SizeGB, $_.Name)
}

Write-Host ""
Write-Host "=== APPDATA ROAMING SUBFOLDERS (Top 15) ===" -ForegroundColor Cyan
$roamingDirs = Get-ChildItem "C:\Users\frank\AppData\Roaming" -Directory -ErrorAction SilentlyContinue
$roamingSizes = foreach ($dir in $roamingDirs) {
    $size = Get-DirSize $dir.FullName
    [PSCustomObject]@{
        Name = $dir.Name
        SizeGB = $size / 1GB
        Path = $dir.FullName
    }
}
$roamingSizes | Sort-Object SizeGB -Descending | Select-Object -First 15 | ForEach-Object {
    Write-Host ("{0:N2} GB`t{1}" -f $_.SizeGB, $_.Name)
}

Write-Host ""
Write-Host "=== DEVELOPMENT CACHES ===" -ForegroundColor Cyan
$devCaches = @(
    @("C:\Users\frank\.cargo", "Cargo/Rust Cache"),
    @("C:\Users\frank\.bun", "Bun Cache"),
    @("C:\Users\frank\.gradle", "Gradle Cache"),
    @("C:\Users\frank\.nuget", "NuGet Cache"),
    @("C:\Users\frank\AppData\Roaming\npm-cache", "npm Cache"),
    @("C:\Users\frank\AppData\Local\pip", "pip Cache"),
    @("C:\Users\frank\AppData\Local\npm-cache", "npm Local Cache")
)

foreach ($cache in $devCaches) {
    $path = $cache[0]
    $name = $cache[1]
    if (Test-Path $path) {
        $size = Get-DirSize $path
        Write-Host ("{0:N2} GB`t{1}" -f ($size / 1GB), $name)
    }
}

Write-Host ""
Write-Host "=== SYSTEM & BROWSER CACHES ===" -ForegroundColor Cyan
$systemCaches = @(
    @("C:\Users\frank\AppData\Local\Temp", "Windows Temp"),
    @("C:\Users\frank\AppData\Local\Microsoft\Windows\Explorer", "Windows Explorer Cache"),
    @("C:\Users\frank\AppData\Local\Microsoft\Windows\INetCache", "IE/Edge Cache"),
    @("C:\Users\frank\AppData\Local\Google\Chrome\User Data\Default\Cache", "Chrome Cache"),
    @("C:\Windows\Temp", "System Temp"),
    @("C:\Windows\SoftwareDistribution\Download", "Windows Update Cache")
)

foreach ($cache in $systemCaches) {
    $path = $cache[0]
    $name = $cache[1]
    if (Test-Path $path) {
        $size = Get-DirSize $path
        Write-Host ("{0:N2} GB`t{1}" -f ($size / 1GB), $name)
    }
}

Write-Host ""
Write-Host "=== PACKAGES FOLDER ===" -ForegroundColor Cyan
if (Test-Path "C:\Users\frank\AppData\Local\Packages") {
    $count = (Get-ChildItem "C:\Users\frank\AppData\Local\Packages" -Directory).Count
    $size = Get-DirSize "C:\Users\frank\AppData\Local\Packages"
    Write-Host "Packages count: $count"
    Write-Host "Packages total size: $([math]::Round($size / 1GB, 2)) GB"
}

Write-Host ""
Write-Host "=== ANALYSIS COMPLETE ===" -ForegroundColor Green
