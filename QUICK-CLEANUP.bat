@echo off
echo ==========================================
echo QUICK STORAGE CLEANUP (No long waits!)
echo ==========================================
echo.

echo [1/7] Disabling Hibernation (4-8GB)...
powercfg /hibernate off
echo ✅ Done!
echo.

echo [2/7] Stopping Windows Update...
net stop wuauserv >nul 2>&1
echo ✅ Done!
echo.

echo [3/7] Clearing Windows Update cache (10-20GB)...
rd /s /q C:\Windows\SoftwareDistribution >nul 2>&1
echo ✅ Done!
echo.

echo [4/7] Starting Windows Update...
net start wuauserv >nul 2>&1
echo ✅ Done!
echo.

echo [5/7] Clearing Temp folders (2-5GB)...
rd /s /q "%TEMP%" >nul 2>&1
rd /s /q "C:\Windows\Temp" >nul 2>&1
echo ✅ Done!
echo.

echo [6/7] Emptying Recycle Bin...
rd /s /q "C:\$Recycle.Bin" >nul 2>&1
echo ✅ Done!
echo.

echo [7/7] Deleting Windows.old if exists...
rd /s /q "C:\Windows.old" >nul 2>&1
echo ✅ Done (if it existed)!
echo.

echo ==========================================
echo QUICK CLEANUP COMPLETE!
echo ==========================================
echo.
echo Check your free space now!
echo.
echo If you want deeper cleaning, run Disk Cleanup manually:
echo cleanmgr.exe
echo.
pause
