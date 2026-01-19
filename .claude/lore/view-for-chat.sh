#!/usr/bin/env bash

# Arcanea Lore Chat Viewer - Split large files for chat display
# Usage: ./view-for-chat.sh <category> <filename> [part]
# Example: 
#   ./view-for-chat.sh guardians maylinn        # Shows all parts
#   ./view-for-chat.sh guardians maylinn 1      # Shows only part 1

CATEGORIES="guardians bestiary luminors godbeasts archangels"

usage() {
    echo "Arcanea Lore Chat Viewer"
    echo ""
    echo "Usage: $0 <category> <filename> [part]"
    echo ""
    echo "Examples:"
    echo "  $0 guardians maylinn           # Show all parts"
    echo "  $0 guardians maylinn 1         # Show only part 1"
    echo "  $0 guardians maylinn 2         # Show only part 2"
    echo ""
    echo "This script splits large files into ~100 line chunks"
    echo "for viewing in chat interfaces that truncate long messages."
}

# Get part number or show all
if [ $# -lt 2 ]; then
    usage
    exit 1
fi

category=$1
filename=$2
part=$3

# Find the file - check both possible locations
if [ -f "guardians/staging/$filename.md" ]; then
    filepath="guardians/staging/$filename.md"
elif [ -f "$category/staging/$filename.md" ]; then
    filepath="$category/staging/$filename.md"
else
    echo "File not found: $category/staging/$filename.md"
    echo "Searched in:"
    echo "  - guardians/staging/$filename.md"
    echo "  - $category/staging/$filename.md"
    exit 1
fi

# Get file info
lines=$(wc -l < "$filepath")
words=$(wc -w < "$filepath")
parts=$(( (lines + 99) / 100 ))

echo "═══════════════════════════════════════════════════════════════"
echo "  FILE: $filename.md"
echo "  CATEGORY: $category"
echo "  LINES: $lines"
echo "  WORDS: $words"
echo "  PARTS: $parts (split every ~100 lines)"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Extract frontmatter
echo "┌── FRONTMATTER ──┐"
grep "^---" -n "$filepath" | head -2
echo "└──────────────────┘"
echo ""

# If part specified, show just that part
if [ -n "$part" ]; then
    start=$(( (part - 1) * 100 + 1 ))
    end=$(( part * 100 ))
    
    if [ $start -gt $lines ]; then
        echo "Part $part exceeds file length ($lines lines)"
        exit 1
    fi
    
    echo "═══ PART $part of $parts (lines $start-$end) ═══"
    echo ""
    sed -n "${start},${end}p" "$filepath"
    echo ""
    echo "[Part $part/$parts - lines $start-$end of $lines]"
    exit 0
fi

# Show all parts
echo "Would you like to see this file split into $parts parts?"
echo ""
echo "Commands to view specific parts:"
for i in $(seq 1 $parts); do
    start=$(( (i - 1) * 100 + 1 ))
    end=$(( i * 100 ))
    [ $end -gt $lines ] && end=$lines
    echo "  ./view-for-chat.sh $category $filename $i  (lines $start-$end)"
done
echo ""
echo "Or view the full file in terminal:"
echo "  ./tools/view-lore.sh $category staging $filename"
echo ""
echo "Or open in VS Code:"
echo "  code $filepath"
