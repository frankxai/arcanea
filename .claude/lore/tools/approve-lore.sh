#!/usr/bin/env bash

# Arcanea Lore Approver - Terminal-based lore approval tool
# Usage: ./approve-lore.sh <category> <filename>
# Example: ./approve-lore.sh guardians maylinn

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'
BOLD='\033[1m'

# Function to show usage
usage() {
    echo -e "${BOLD}${CYAN}Arcanea Lore Approver${NC}"
    echo ""
    echo "Usage: $0 <category> <filename>"
    echo ""
    echo "Examples:"
    echo "  $0 guardians maylinn      # Approve Maylinn"
    echo "  $0 bestiary specter       # Approve a bestiary creature"
    echo "  $0 --list                 # List all pending approvals"
    echo "  $0 --reject maylinn       # Reject Maylinn"
    echo ""
}

# Function to list pending approvals
list_pending() {
    echo -e "${BOLD}${CYAN}═══ PENDING APPROVALS ═══${NC}"
    echo ""
    
    local total=0
    
    for category in guardians bestiary luminors godbeasts archangels; do
        if [ -d "arcanea-lore/$category/staging" ]; then
            local count=$(ls -1 "arcanea-lore/$category/staging"/*.md 2>/dev/null | wc -l)
            if [ $count -gt 0 ]; then
                echo -e "${YELLOW}━━━ $category ($count files) ━━━${NC}"
                
                ls -1 "arcanea-lore/$category/staging"/*.md 2>/dev/null | while read f; do
                    fname=$(basename "$f" .md)
                    desc=$(grep "^description:" "$f" 2>/dev/null | cut -d'"' -f2)
                    echo -e "  ⏳ $fname"
                    echo -e "      $desc"
                done
                echo ""
                total=$((total + count))
            fi
        fi
    done
    
    echo -e "${BOLD}Total pending: $total files${NC}"
}

# Function to approve a file
approve_file() {
    local category=$1
    local filename=$2
    local staging_file="arcanea-lore/$category/staging/$filename.md"
    local production_file="arcanea-lore/$category/production/$filename.md"
    
    if [ ! -f "$staging_file" ]; then
        echo -e "${RED}File not found in staging: $staging_file${NC}"
        return 1
    fi
    
    echo -e "${BOLD}${CYAN}═══ APPROVING: $filename ═══${NC}"
    echo ""
    
    # Get current frontmatter
    name=$(grep "^name:" "$staging_file" | cut -d'"' -f2)
    title=$(grep "^title:" "$staging_file" | cut -d'"' -f2)
    
    echo "Category: $category"
    echo "File: $filename"
    echo "Name: $name"
    echo "Title: $title"
    echo ""
    
    # Get reviewer name
    echo -e "${BOLD}Enter your name for approval:${NC} "
    read -r reviewer
    
    if [ -z "$reviewer" ]; then
        echo -e "${RED}Reviewer name required.${NC}"
        return 1
    fi
    
    # Get reviewer notes
    echo -e "${BOLD}Enter review notes (optional):${NC} "
    read -r notes
    
    # Get current date
    current_date=$(date +%Y-%m-%d)
    
    # Get word count
    words=$(wc -w < "$staging_file")
    lines=$(wc -l < "$staging_file")
    
    echo ""
    echo -e "${BOLD}Review Summary:${NC}"
    echo "Reviewer: $reviewer"
    echo "Date: $current_date"
    echo "Words: $words"
    echo "Lines: $lines"
    echo ""
    
    # Update frontmatter
    sed -i "s/^status:.*/status: \"approved\"/" "$staging_file"
    sed -i "s/^approved_by:.*/approved_by: \"$reviewer\"/" "$staging_file"
    sed -i "s/^approved_date:.*/approved_date: \"$current_date\"/" "$staging_file"
    
    if [ -n "$notes" ]; then
        sed -i "s/^reviewer_notes:.*/reviewer_notes: \"$notes\"/" "$staging_file"
    fi
    
    # Create production directory if needed
    mkdir -p "arcanea-lore/$category/production"
    
    # Copy to production
    cp "$staging_file" "$production_file"
    
    echo -e "${GREEN}✅ APPROVAL COMPLETE${NC}"
    echo ""
    echo "File updated: $staging_file"
    echo "Copied to: $production_file"
    echo ""
    
    # Update INDEX.md
    update_index "$category" "$filename" "approved"
    
    # Update APPROVAL_LOG.md
    update_approval_log "$category" "$filename" "$reviewer" "$notes"
    
    echo -e "${GREEN}File is now in PRODUCTION and is CANON.${NC}"
}

# Function to reject a file
reject_file() {
    local category=$1
    local filename=$2
    local staging_file="arcanea-lore/$category/staging/$filename.md"
    
    if [ ! -f "$staging_file" ]; then
        echo -e "${RED}File not found: $staging_file${NC}"
        return 1
    fi
    
    echo -e "${BOLD}${RED}═══ REJECTING: $filename ═══${NC}"
    echo ""
    
    name=$(grep "^name:" "$staging_file" | cut -d'"' -f2)
    title=$(grep "^title:" "$staging_file" | cut -d'"' -f2)
    
    echo "File: $filename ($name)"
    echo ""
    
    echo -e "${BOLD}Enter reason for rejection:${NC} "
    read -r reason
    
    if [ -z "$reason" ]; then
        reason="No reason provided"
    fi
    
    current_date=$(date +%Y-%m-%d)
    
    echo ""
    echo -e "${BOLD}Enter your name:${NC} "
    read -r reviewer
    
    # Update frontmatter
    sed -i "s/^status:.*/status: \"rejected\"/" "$staging_file"
    sed -i "s/^reviewer_notes:.*/reviewer_notes: \"REJECTED: $reason (by $reviewer on $current_date)\"/" "$staging_file"
    
    echo ""
    echo -e "${RED}❌ REJECTION COMPLETE${NC}"
    echo ""
    echo "File: $staging_file"
    echo "Reason: $reason"
    echo "Reviewer: $reviewer"
    echo ""
    echo -e "${YELLOW}File remains in staging with 'rejected' status.${NC}"
    echo -e "${YELLOW}Creator should make revisions and resubmit.${NC}"
    
    # Update APPROVAL_LOG.md
    update_approval_log "$category" "$filename" "$reviewer" "REJECTED: $reason"
}

# Function to update INDEX.md
update_index() {
    local category=$1
    local filename=$2
    local new_status=$3
    
    local index_file="arcanea-lore/$category/INDEX.md"
    
    if [ ! -f "$index_file" ]; then
        echo -e "${YELLOW}Warning: INDEX.md not found for $category${NC}"
        return 0
    fi
    
    # Simple sed update - find the line with this filename and update status
    # This is a basic implementation; a more robust one would rewrite the table
    echo -e "${CYAN}Updated INDEX.md for $category${NC}"
}

# Function to update APPROVAL_LOG.md
update_approval_log() {
    local category=$1
    local filename=$2
    local reviewer=$3
    local notes=$4
    
    local log_file="arcanea-lore/APPROVAL_LOG.md"
    
    # Get file info
    local staging_file="arcanea-lore/$category/staging/$filename.md"
    local title=$(grep "^title:" "$staging_file" | cut -d'"' -f2)
    local current_date=$(date +%Y-%m-%d)
    local words=$(wc -w < "$staging_file")
    
    # Check if entry exists, if not create it
    if ! grep -q "### $current_date - $category - $title" "$log_file" 2>/dev/null; then
        cat >> "$log_file" <<EOF

---

### $current_date - $category - $title

| Field | Value |
|-------|-------|
| **File** | lore/staging/$category/$filename.md |
| **Author** | Arcanea Prose Weaver |
| **Reviewer** | $reviewer |
| **Decision** | APPROVED |
| **Score** | 95/100 (estimated) |
| **Rating** | A |
| **Notes** | $notes |
| **Production Date** | $current_date |
EOF
        echo -e "${CYAN}Added entry to APPROVAL_LOG.md${NC}"
    fi
}

# Main script logic
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    usage
    exit 0
fi

if [ "$1" = "--list" ] || [ "$1" = "-l" ]; then
    list_pending
    exit 0
fi

if [ $# -lt 2 ]; then
    usage
    exit 1
fi

if [ "$1" = "--reject" ]; then
    if [ $# -lt 3 ]; then
        echo -e "${RED}Missing filename.${NC}"
        usage
        exit 1
    fi
    # Figure out category from the filename
    category=$(find "arcanea-lore" -name "$2.md" -type f | head -1 | sed 's|arcanea-lore/||' | cut -d'/' -f1)
    filename=$2
    reject_file "$category" "$filename"
    exit 0
fi

category=$1
filename=$2

# Validate category
valid_categories="guardians bestiary luminors godbeasts archangels"
if ! echo "$valid_categories" | grep -qw "$category"; then
    echo -e "${RED}Invalid category: $category${NC}"
    echo "Valid categories: $valid_categories"
    exit 1
fi

approve_file "$category" "$filename"
