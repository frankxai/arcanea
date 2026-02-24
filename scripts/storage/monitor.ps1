# Arcanea Storage Guardian - Monitor Script
# Guardian: Lyria (Sight Gate) + Shinkami (Source Gate)
# Schedule: Run via Windows Task Scheduler every 6 hours
# Usage: powershell.exe -ExecutionPolicy Bypass -File scripts/storage/monitor.ps1

$ErrorActionPreference = "SilentlyContinue"

$thresholdCriticalGB = 10
$thresholdWarningGB = 30
$logFile = "D:\Arcanea\storage-monitor.log"
$historyFile = "D:\Arcanea\storage-history.csv"

# Ensure log directory exists
$logDir = Split-Path $logFile -Parent
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Get drive info
$cDrive = Get-PSDrive C
$cFreeGB = [math]::Round($cDrive.Free / 1GB, 2)
$cUsedGB = [math]::Round($cDrive.Used / 1GB, 2)
$cTotalGB = [math]::Round(($cDrive.Used + $cDrive.Free) / 1GB, 2)
$cPct = [math]::Round(($cDrive.Used / ($cDrive.Used + $cDrive.Free)) * 100, 1)

$dDrive = Get-PSDrive D -ErrorAction SilentlyContinue
$dFreeGB = if ($dDrive) { [math]::Round($dDrive.Free / 1GB, 2) } else { 0 }
$dUsedGB = if ($dDrive) { [math]::Round($dDrive.Used / 1GB, 2) } else { 0 }

# Append to history CSV
$csvLine = "$timestamp,$cFreeGB,$cUsedGB,$cPct,$dFreeGB,$dUsedGB"
if (-not (Test-Path $historyFile)) {
    "timestamp,c_free_gb,c_used_gb,c_pct,d_free_gb,d_used_gb" | Out-File $historyFile -Encoding UTF8
}
$csvLine | Out-File $historyFile -Append -Encoding UTF8

# Log entry
$logEntry = "[$timestamp] C:/ Free: ${cFreeGB}GB (${cPct}%) | D:/ Free: ${dFreeGB}GB"
$logEntry | Out-File $logFile -Append -Encoding UTF8

# Alert logic
if ($cFreeGB -lt $thresholdCriticalGB) {
    $title = "CRITICAL: Disk Space Emergency"
    $message = "C:/ has only $cFreeGB GB free ($cPct% used).`nImmediate action required!`nRun: /storage-clean or move data to D:/"
    $logEntry = "[$timestamp] CRITICAL ALERT: $cFreeGB GB free"
    $logEntry | Out-File $logFile -Append -Encoding UTF8

    # Windows toast notification
    try {
        Add-Type -AssemblyName System.Windows.Forms
        $balloon = New-Object System.Windows.Forms.NotifyIcon
        $balloon.Icon = [System.Drawing.SystemIcons]::Warning
        $balloon.BalloonTipIcon = [System.Windows.Forms.ToolTipIcon]::Error
        $balloon.BalloonTipTitle = $title
        $balloon.BalloonTipText = $message
        $balloon.Visible = $true
        $balloon.ShowBalloonTip(15000)
        Start-Sleep -Seconds 16
        $balloon.Dispose()
    } catch {
        # Fallback: Write to event log or console
        Write-Host $message -ForegroundColor Red
    }

} elseif ($cFreeGB -lt $thresholdWarningGB) {
    $title = "Warning: Low Disk Space"
    $message = "C:/ has $cFreeGB GB free ($cPct% used).`nConsider running cleanup soon."

    try {
        Add-Type -AssemblyName System.Windows.Forms
        $balloon = New-Object System.Windows.Forms.NotifyIcon
        $balloon.Icon = [System.Drawing.SystemIcons]::Information
        $balloon.BalloonTipIcon = [System.Windows.Forms.ToolTipIcon]::Warning
        $balloon.BalloonTipTitle = $title
        $balloon.BalloonTipText = $message
        $balloon.Visible = $true
        $balloon.ShowBalloonTip(10000)
        Start-Sleep -Seconds 11
        $balloon.Dispose()
    } catch {
        Write-Host $message -ForegroundColor Yellow
    }
}

# Output for console runs
Write-Host "[$timestamp] Storage Monitor" -ForegroundColor Cyan
Write-Host "  C:/ Free: $cFreeGB GB ($cPct% used)" -ForegroundColor $(if ($cFreeGB -lt $thresholdCriticalGB) { "Red" } elseif ($cFreeGB -lt $thresholdWarningGB) { "Yellow" } else { "Green" })
Write-Host "  D:/ Free: $dFreeGB GB" -ForegroundColor Green
Write-Host "  Log: $logFile" -ForegroundColor DarkGray
Write-Host "  History: $historyFile" -ForegroundColor DarkGray
