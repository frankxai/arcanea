#!/bin/bash

# Sync OSS folder to public arcanea repository
# Usage: ./scripts/sync-oss.sh
#
# Repository Structure:
#   - frankxai/arcanea-platform (private) - Full SaaS codebase
#   - frankxai/arcanea (public) - OSS content only (agents, skills, lore, etc.)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OSS_DIR="$ROOT_DIR/oss"
PUBLIC_REPO="https://github.com/frankxai/arcanea.git"

echo ""
echo "  ✧ ARCANEA OSS SYNC ✧"
echo ""

# Check if oss directory exists
if [ ! -d "$OSS_DIR" ]; then
    echo "Error: oss/ directory not found"
    exit 1
fi

# Clone public repo, replace contents, push
TEMP_DIR=$(mktemp -d)
echo "Cloning public repo to $TEMP_DIR..."
git clone "$PUBLIC_REPO" "$TEMP_DIR"

echo "Syncing oss/ contents..."
# Remove all existing content except .git
find "$TEMP_DIR" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# Copy oss/ contents
cp -r "$OSS_DIR"/* "$TEMP_DIR/"

cd "$TEMP_DIR"
git add -A

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "No changes to sync."
else
    git commit -m "Sync OSS content from arcanea-platform

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
    git push origin main
    echo ""
    echo "  ✓ Sync complete!"
fi

rm -rf "$TEMP_DIR"
echo ""
echo "  Public repo: https://github.com/frankxai/arcanea"
echo ""
