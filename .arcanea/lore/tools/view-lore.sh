#!/usr/bin/env bash

# Arcanea Lore Viewer - Terminal-based lore file viewer
# Usage: ./view-lore.sh <category> <status> <filename>
# Example: ./view-lore.sh guardians staging maylinn

CATEGORIES="guardians bestiary luminors godbeasts archangels"
STATUSES="staging production"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Function to show usage
usage() {
    echo -e "${BOLD}Arcanea Lore Viewer${NC}"
    echo ""
    echo "Usage: $0 <category> <status> [filename]"
    echo ""
    echo "Categories: $CATEGORIES"
    echo "Statuses: $STATUSES"
    echo ""
    echo "Examples:"
    echo "  $0 guardians production lyssandria    # View approved Guardian"
    echo "  $0 guardians staging maylinn          # View pending Guardian"
    echo "  $0 guardians staging                  # List all staging guardians"
    echo "  $0 bestiary production                # List all production bestiary"
    echo "  $0 --index                            # Show all lore index"
    echo ""
}

# Function to show index
show_index() {
    echo -e "${BOLD}${CYAN}═══ ARCANEA LORE INDEX ═══${NC}"
    echo ""
    
    for category in $CATEGORIES; do
        echo -e "${BOLD}${YELLOW}━━━ $category ━━━${NC}"
        
        if [ -d "arcanea-lore/$category/production" ]; then
            echo -e "${GREEN}Production:${NC}"
            ls -1 arcanea-lore/$category/production/*.md 2>/dev/null | while read f; do
                fname=$(basename "$f" .md)
                echo "  ✅ $fname"
            done
        fi
        
        if [ -d "arcanea-lore/$category/staging" ]; then
            echo -e "${YELLOW}Staging:${NC}"
            ls -1 arcanea-lore/$category/staging/*.md 2>/dev/null | while read f; do
                fname=$(basename "$f" .md)
                echo "  ⏳ $fname"
            done
        fi
        echo ""
    done
}

# Function to list files in a category/status
list_files() {
    local category=$1
    local status=$2
    local dir="arcanea-lore/$category/$status"
    
    if [ ! -d "$dir" ]; then
        echo -e "${RED}Directory not found: $dir${NC}"
        return 1
    fi
    
    echo -e "${BOLD}${CYAN}═══ $category / $status ═══${NC}"
    echo ""
    
    local count=0
    ls -1 "$dir"/*.md 2>/dev/null | while read f; do
        ((count++))
        fname=$(basename "$f" .md)
        
        # Get status from frontmatter
        status_val=$(grep "^status:" "$f" 2>/dev/null | cut -d'"' -f2 || echo "unknown")
        
        # Get description
        desc=$(grep "^description:" "$f" 2>/dev/null | cut -d'"' -f2 || echo "")
        
        printf "%3d. ${BOLD}%s${NC}\n" $count "$fname"
        printf "    %s\n" "$desc"
        echo ""
    done
    
    echo -e "${BOLD}Total: $count files${NC}"
}

# Function to view a specific file with full content
view_file() {
    local category=$1
    local status=$2
    local filename=$3
    local filepath="arcanea-lore/$category/$status/$filename.md"
    
    if [ ! -f "$filepath" ]; then
        echo -e "${RED}File not found: $filepath${NC}"
        return 1
    fi
    
    # Clear screen for cleaner viewing
    clear
    
    # Show file info header
    echo -e "${BOLD}${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BOLD}${CYAN}  ARCANEA LORE VIEWER${NC}"
    echo -e "${BOLD}${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    
    # Extract and display frontmatter
    echo -e "${BOLD}${YELLOW}┌── Frontmatter ──┐${NC}"
    
    name=$(grep "^name:" "$filepath" | cut -d'"' -f2)
    title=$(grep "^title:" "$filepath" | cut -d'"' -f2)
    desc=$(grep "^description:" "$filepath" | cut -d'"' -f2)
    status_val=$(grep "^status:" "$filepath" | cut -d'"' -f2)
    element=$(grep "^element:" "$filepath" | cut -d'"' -f2)
    wisdom=$(grep "^wisdom:" "$filepath" | cut -d'"' -f2)
    gate=$(grep "^gate:" "$filepath" | cut -d'"' -f2)
    freq=$(grep "^frequency:" "$filepath" | cut -d'"' -f2)
    version=$(grep "^version:" "$filepath" | cut -d'"' -f2)
    created=$(grep "^created:" "$filepath" | cut -d'"' -f2)
    
    echo -e "  ${BOLD}Name:${NC}      $name"
    echo -e "  ${BOLD}Title:${NC}     $title"
    echo -e "  ${BOLD}Description:${NC} $desc"
    echo -e "  ${BOLD}Status:${NC}    $status_val"
    echo -e "  ${BOLD}Element:${NC}   $element"
    echo -e "  ${BOLD}Wisdom:${NC}    $wisdom"
    echo -e "  ${BOLD}Gate:${NC}      $gate"
    echo -e "  ${BOLD}Frequency:${NC} $freq Hz"
    echo -e "  ${BOLD}Version:${NC}   $version"
    echo -e "  ${BOLD}Created:${NC}   $created"
    
    echo -e "${BOLD}${YELLOW}└──────────────────────┘${NC}"
    echo ""
    
    # Count lines and words
    lines=$(wc -l < "$filepath")
    words=$(wc -w < "$filepath")
    echo -e "${BOLD}File stats: $lines lines, $words words${NC}"
    echo ""
    
    echo -e "${BOLD}Press ENTER to view full content, or 'q' to quit...${NC}"
    read -r response
    
    if [ "$response" = "q" ] || [ "$response" = "Q" ]; then
        return 0
    fi
    
    # View full content using less for pagination
    less "$filepath"
}

# Main script logic
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    usage
    exit 0
fi

if [ "$1" = "--index" ] || [ "$1" = "-i" ]; then
    show_index
    exit 0
fi

if [ $# -lt 2 ]; then
    usage
    exit 1
fi

category=$1
status=$2

# Validate category
if ! echo "$CATEGORIES" | grep -qw "$category"; then
    echo -e "${RED}Invalid category: $category${NC}"
    echo "Valid categories: $CATEGORIES"
    exit 1
fi

# Validate status
if ! echo "$STATUSES" | grep -qw "$status"; then
    echo -e "${RED}Invalid status: $status${NC}"
    echo "Valid statuses: $STATUSES"
    exit 1
fi

if [ $# -eq 3 ]; then
    # View specific file
    filename=$3
    view_file "$category" "$status" "$filename"
else
    # List files in category/status
    list_files "$category" "$status"
fi
