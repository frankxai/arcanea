#!/bin/bash

# Sync OSS folder to public arcanea repository
# Usage: ./scripts/sync-oss.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OSS_DIR="$ROOT_DIR/oss"
PUBLIC_REPO="git@github.com:arcanea-ai/arcanea.git"

echo ""
echo "  ✧ ARCANEA OSS SYNC ✧"
echo ""

# Check if oss directory exists
if [ ! -d "$OSS_DIR" ]; then
    echo "Error: oss/ directory not found"
    exit 1
fi

# Option 1: Git subtree (simpler, recommended)
echo "Syncing oss/ to public repository..."

# Check if public remote exists
if ! git remote | grep -q "public"; then
    echo "Adding public remote..."
    git remote add public "$PUBLIC_REPO"
fi

# Push oss/ directory as subtree to public repo
git subtree push --prefix=oss public main

echo ""
echo "  ✓ Sync complete!"
echo ""
echo "  Public repo: https://github.com/arcanea-ai/arcanea"
echo ""

# Alternative: Manual copy approach (if subtree has issues)
# Uncomment below if you prefer this approach:

# TEMP_DIR=$(mktemp -d)
# echo "Cloning public repo to $TEMP_DIR..."
# git clone "$PUBLIC_REPO" "$TEMP_DIR"
#
# echo "Copying oss/ contents..."
# rsync -av --delete \
#     --exclude '.git' \
#     "$OSS_DIR/" "$TEMP_DIR/"
#
# cd "$TEMP_DIR"
# git add -A
# git commit -m "Sync from main Arcanea repository" || echo "No changes to commit"
# git push origin main
#
# rm -rf "$TEMP_DIR"
# echo "Sync complete!"
