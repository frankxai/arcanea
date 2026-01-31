@echo off
echo ==========================================
echo STORAGE INVESTIGATION & CLEANUP SCRIPT
echo Run this as Administrator!
echo ==========================================
echo.

echo [1] Checking for huge hidden files...
dir C:\pagefile.sys /q
dir C:\hiberfil.sys /q
dir C:\swapfile.sys /q
echo.

echo [2] Checking Windows Update cache...
dism /Online /Cleanup-Image /AnalyzeComponentStore
echo.

echo [3] Listing biggest folders in C:\...
powershell "Get-ChildItem C:\ -Directory | Sort-Object { (Get-ChildItem $_.FullName -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum } -Descending | Select-Object -First 10 Name"
echo.

echo [4] Checking System Restore points...
vssadmin list shadowstorage
echo.

echo [5] Checking Recycle Bin size...
powershell "$bin = (Get-ChildItem 'C:\$Recycle.Bin' -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum; Write-Host ('Recycle Bin: ' + [math]::Round($bin/1GB,2) + ' GB')"
echo.

echo ==========================================
echo CLEANUP COMMANDS (Run these separately)
echo ==========================================
echo.
echo === OPTION A: Disable Hibernation (saves 4-8GB) ===
echo powercfg /hibernate off
echo.
echo === OPTION B: Clean WinSxS (Windows component store) ===
echo dism /Online /Cleanup-Image /StartComponentCleanup
echo dism /Online /Cleanup-Image /StartComponentCleanup /ResetBase
echo.
echo === OPTION C: Clean Windows Update ===
echo net stop wuauserv
echo rd /s /q C:\Windows\SoftwareDistribution
echo net start wuauserv
echo.
echo === OPTION D: Reduce Pagefile ===
echo System Properties - Advanced - Performance Settings - Advanced - Virtual Memory - Set to custom size or different drive
echo.
echo === OPTION E: Delete old Windows installs ===
echo rd /s /q C:\Windows.old
echo.
echo === OPTION F: Clean Temp thoroughly ===
echo rd /s /q %temp%
echo rd /s /q C:\Windows\Temp
echo.

pause
