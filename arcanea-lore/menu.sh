#!/usr/bin/env bash

# Arcanea Lore Manager - Main Menu
# A terminal-based workflow for managing Arcanea lore

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'
BOLD='\033[1m'

# Change to the arcanea-lore directory
cd "$(dirname "$0")"

clear

echo -e "${BOLD}${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${CYAN}║                  ARCANEA LORE MANAGER                      ║${NC}"
echo -e "${BOLD}${CYAN}║           Terminal-Based Lore Workflow System              ║${NC}"
echo -e "${BOLD}${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Get stats
total_guardians=$(ls guardians/staging/*.md guardians/production/*.md 2>/dev/null | wc -l)
approved_guardians=$(ls guardians/production/*.md 2>/dev/null | wc -l)
pending_guardians=$(ls guardians/staging/*.md 2>/dev/null | wc -l)

total_lore=$(find . -name "*.md" -type f | wc -l)
production_lore=$(find production -name "*.md" -type f | wc -l)
staging_lore=$(find staging -name "*.md" -type f | wc -l)

echo -e "${BOLD}┌── Quick Stats ──┐${NC}"
echo -e "${BOLD}│${NC} Guardians: $total_guardians total ($approved_guardians approved, $pending_guardians pending)"
echo -e "${BOLD}│${NC} Total Lore: $total_lore files ($production_lore production, $staging_lore staging)"
echo -e "${BOLD}│${NC} Central Repo: $(pwd)"
echo -e "${BOLD}│${NC}"
echo -e "${BOLD}└──────────────────┘${NC}"
echo ""

echo -e "${BOLD}${CYAN}─── VIEW LORE ───${NC}"
echo -e "${CYAN}  1.${NC} View all lore index"
echo -e "${CYAN}  2.${NC} Browse guardians"
echo -e "${CYAN}  3.${NC} Browse bestiary"
echo -e "${CYAN}  4.${NC} Browse luminors"
echo -e "${CYAN}  5.${NC} View specific file (with full content)"
echo ""

echo -e "${BOLD}${CYAN}─── REVIEW WORKFLOW ───${NC}"
echo -e "${CYAN}  6.${NC} List all pending approvals"
echo -e "${CYAN}  7.${NC} Approve a file"
echo -e "${CYAN}  8.${NC} Reject a file"
echo ""

echo -e "${BOLD}${CYAN}─── MANAGEMENT ───${NC}"
echo -e "${CYAN}  9.${NC} Run automated review (arcanea-lore-review agent)"
echo -e "${CYAN} 10.${NC} Sync with Claude Code (.claude)"
echo -e "${CYAN} 11.${NC} Sync with OpenCode"
echo ""

echo -e "${BOLD}${CYAN}─── DOCUMENTATION ───${NC}"
echo -e "${CYAN} 12.${NC} View architecture document"
echo -e "${CYAN} 13.${NC} View workflow document"
echo -e "${CYAN} 14.${NC} View approval log"
echo ""

echo -e "${BOLD}${RED}─── SYSTEM ───${NC}"
echo -e "${RED}  q.${NC} Quit"
echo ""

echo -e "${BOLD}Enter your choice:${NC} "
read -r choice

case $choice in
    1)
        ./tools/view-lore.sh --index
        ;;
    2)
        echo "View staging or production? (s/p)"
        read -r sp
        if [ "$sp" = "s" ] || [ "$sp" = "S" ]; then
            ./tools/view-lore.sh guardians staging
        else
            ./tools/view-lore.sh guardians production
        fi
        ;;
    3)
        echo "View staging or production? (s/p)"
        read -r sp
        if [ "$sp" = "s" ] || [ "$sp" = "S" ]; then
            ./tools/view-lore.sh bestiary staging
        else
            ./tools/view-lore.sh bestiary production
        fi
        ;;
    4)
        echo "View staging or production? (s/p)"
        read -r sp
        if [ "$sp" = "s" ] || [ "$sp" = "S" ]; then
            ./tools/view-lore.sh luminors staging
        else
            ./tools/view-lore.sh luminors production
        fi
        ;;
    5)
        echo "Enter category (guardians/bestiary/luminors/godbeasts/archangels):"
        read -r category
        echo "Enter status (staging/production):"
        read -r status
        echo "Enter filename (without .md):"
        read -r filename
        ./tools/view-lore.sh "$category" "$status" "$filename"
        ;;
    6)
        ./tools/approve-lore.sh --list
        ;;
    7)
        echo "Enter category:"
        read -r category
        echo "Enter filename (without .md):"
        read -r filename
        ./tools/approve-lore.sh "$category" "$filename"
        ;;
    8)
        echo "Enter filename to reject (without .md):"
        read -r filename
        ./tools/approve-lore.sh --reject "$filename"
        ;;
    9)
        echo -e "${YELLOW}Starting arcanea-lore-review agent...${NC}"
        echo "Use: 'review all guardians' in Claude Code"
        echo "Or run: sisyphus_task with arcanea-lore-review agent"
        ;;
    10)
        if [ -L .claude ]; then
            echo -e "${GREEN}.claude symlink already exists${NC}"
        else
            ln -s "$(pwd)" .claude 2>/dev/null || ln -s "$(pwd)/.." .claude 2>/dev/null
            echo -e "${GREEN}Created .claude symlink${NC}"
        fi
        ;;
    11)
        echo "Symlink for OpenCode (run this in OpenCode's config directory):"
        echo "  ln -s $(pwd) lore"
        ;;
    12)
        less ARCHITECTURE.md
        ;;
    13)
        less WORKFLOW.md
        ;;
    14)
        less APPROVAL_LOG.md
        ;;
    q|Q)
        echo -e "${CYAN}Goodbye!${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice: $choice${NC}"
        ;;
esac

echo ""
echo -e "${BOLD}Press ENTER to return to menu...${NC}"
read -r

exec "$0"  # Restart the menu
