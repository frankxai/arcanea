#!/usr/bin/env bash

# Open Arcanea Lore in VS Code with all the right settings
# Usage: ./open-vscode.sh

# Change to arcanea-lore directory
cd "$(dirname "$0")"

# Check if VS Code is available
if command -v code &> /dev/null; then
    echo "Opening Arcanea Lore in VS Code..."
    code . --new-window
else
    echo "VS Code 'code' command not found."
    echo ""
    echo "To open manually:"
    echo "1. Open VS Code"
    echo "2. File > Open Folder"
    echo "3. Navigate to: $(pwd)"
    echo "4. Select the folder"
    echo ""
    echo "To enable 'code' command, run in VS Code:"
    echo "  Cmd+Shift+P > 'Shell Command: Install code command in PATH'"
fi
