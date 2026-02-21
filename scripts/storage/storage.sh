#!/bin/bash
# Arcanea Storage Guardian - WSL2 Entry Point
# Usage: ./scripts/storage/storage.sh [audit|clean|migrate|monitor|status]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WIN_SCRIPT_DIR="C:\\Users\\frank\\Arcanea\\scripts\\storage"

case "${1:-status}" in
  status)
    echo ""
    echo "  === Arcanea Storage Guardian - Quick Status ==="
    echo ""
    powershell.exe -Command "
      \$c = Get-PSDrive C; \$d = Get-PSDrive D
      \$cFree = [math]::Round(\$c.Free/1GB,1)
      \$cPct = [math]::Round(\$c.Used/(\$c.Used+\$c.Free)*100,1)
      \$dFree = [math]::Round(\$d.Free/1GB,1)
      \$status = if(\$cFree -lt 10){'CRITICAL'}elseif(\$cFree -lt 30){'WARNING'}else{'HEALTHY'}
      Write-Host \"  C:/ Free: \${cFree}GB (\${cPct}% used) [\$status]\" -Fore \$(if(\$cFree-lt10){'Red'}elseif(\$cFree-lt30){'Yellow'}else{'Green'})
      Write-Host \"  D:/ Free: \${dFree}GB\" -Fore Green
    " 2>/dev/null
    echo ""
    ;;

  audit)
    LEVEL="${2:-quick}"
    powershell.exe -ExecutionPolicy Bypass -File "$WIN_SCRIPT_DIR\\audit.ps1" -Level "$LEVEL" 2>/dev/null
    ;;

  clean)
    MODE="${2:-safe}"
    DRYRUN="${3:---DryRun}"
    if [ "$3" = "--execute" ]; then
      powershell.exe -ExecutionPolicy Bypass -File "$WIN_SCRIPT_DIR\\clean.ps1" -Mode "$MODE" 2>/dev/null
    else
      echo "  Running in DRY RUN mode. Add --execute to actually clean."
      powershell.exe -ExecutionPolicy Bypass -File "$WIN_SCRIPT_DIR\\clean.ps1" -Mode "$MODE" -DryRun 2>/dev/null
    fi
    ;;

  migrate)
    TARGET="${2:-wsl}"
    echo "  Migration requires Administrator PowerShell."
    echo "  Run in elevated PowerShell:"
    echo "    powershell -ExecutionPolicy Bypass -File $WIN_SCRIPT_DIR\\migrate-to-d.ps1 -Target $TARGET"
    ;;

  monitor)
    powershell.exe -ExecutionPolicy Bypass -File "$WIN_SCRIPT_DIR\\monitor.ps1" 2>/dev/null
    ;;

  install-tools)
    echo "  Installing WSL2 storage tools..."
    sudo apt-get update -qq
    sudo apt-get install -y -qq ncdu 2>/dev/null
    echo "  Installing npkill globally..."
    npm install -g npkill 2>/dev/null
    echo "  Installing rclone..."
    sudo apt-get install -y -qq rclone 2>/dev/null
    echo "  Done. Tools: ncdu, npkill, rclone"
    ;;

  gc)
    echo "  === Git GC across all repos ==="
    find /mnt/c/Users/frank -maxdepth 3 -name ".git" -type d 2>/dev/null | while read gitdir; do
      repo=$(dirname "$gitdir")
      name=$(basename "$repo")
      before=$(du -sh "$gitdir" 2>/dev/null | awk '{print $1}')
      git -C "$repo" gc --prune=now --quiet 2>/dev/null
      after=$(du -sh "$gitdir" 2>/dev/null | awk '{print $1}')
      echo "    $name: $before -> $after"
    done
    echo "  Done."
    ;;

  help|*)
    echo ""
    echo "  Arcanea Storage Guardian System"
    echo "  ================================"
    echo ""
    echo "  Usage: ./scripts/storage/storage.sh <command> [options]"
    echo ""
    echo "  Commands:"
    echo "    status              Quick drive space check (default)"
    echo "    audit [level]       Full audit (quick|standard|deep)"
    echo "    clean [mode]        Cleanup (safe|moderate|aggressive) [--execute]"
    echo "    migrate [target]    Migrate to D:/ (wsl|docker|steam|epic|riot|pnpm|all)"
    echo "    monitor             Run monitoring check with alerts"
    echo "    gc                  Git gc across all repos"
    echo "    install-tools       Install WSL2 storage tools (ncdu, npkill, rclone)"
    echo "    help                Show this help"
    echo ""
    echo "  Guardian Council:"
    echo "    Lyssandria (Earth)  - Migration & Structure"
    echo "    Draconia (Fire)     - Cleanup & Purge"
    echo "    Lyria (Sight)       - Audit & Visualization"
    echo "    Maylinn (Wind)      - Cloud Sync & Backup"
    echo "    Shinkami (Source)    - Security & Approval"
    echo ""
    ;;
esac
