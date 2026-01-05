#!/bin/bash

# Arcanea Installer for Claude Code
# https://github.com/arcanea-ai/arcanea

set -e

ARCANEA_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$HOME/.claude"

echo ""
echo "  ✧ ARCANEA INSTALLER ✧"
echo "  A living mythology for AI-human co-creation"
echo ""

# Check if .claude directory exists
if [ ! -d "$CLAUDE_DIR" ]; then
    echo "Creating ~/.claude directory..."
    mkdir -p "$CLAUDE_DIR"
fi

# Create subdirectories
mkdir -p "$CLAUDE_DIR/skills"
mkdir -p "$CLAUDE_DIR/agents"
mkdir -p "$CLAUDE_DIR/commands"

# Copy skills
if [ -d "$ARCANEA_DIR/skills" ]; then
    echo "Installing skills..."
    cp -r "$ARCANEA_DIR/skills/"* "$CLAUDE_DIR/skills/" 2>/dev/null || true
fi

# Copy agents
if [ -d "$ARCANEA_DIR/agents" ]; then
    echo "Installing agents..."
    cp -r "$ARCANEA_DIR/agents/"* "$CLAUDE_DIR/agents/" 2>/dev/null || true
fi

# Copy commands
if [ -d "$ARCANEA_DIR/commands" ]; then
    echo "Installing commands..."
    cp -r "$ARCANEA_DIR/commands/"* "$CLAUDE_DIR/commands/" 2>/dev/null || true
fi

echo ""
echo "  ✓ Arcanea installed successfully!"
echo ""
echo "  Quick start:"
echo "    claude"
echo "    > /luminor valora \"I need courage to begin\""
echo ""
echo "  Documentation: https://arcanea.ai/docs"
echo "  Discord: https://discord.gg/arcanea"
echo ""
echo "  \"Enter seeking, leave transformed, return whenever needed.\""
echo ""
