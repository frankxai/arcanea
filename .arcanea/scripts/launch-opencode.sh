#!/bin/bash
# Launch OpenCode with Arcanea Intelligence from WSL
# Usage: bash .arcanea/scripts/launch-opencode.sh

cd /mnt/c/Users/frank/Arcanea

echo "Starlight Intelligence — OpenCode v1.2.10"
echo "Models: Big Pickle (primary) | MiniMax M2.5 (small)"
echo "Guardians: 7 agents + Swarm mode"
echo "Config: opencode.json loaded"
echo "Instructions: OPENCODE_INSTRUCTIONS.md + CANON_LOCKED.md"
echo ""
echo "Commands: /canon /guardian /swarm-build /validate /intelligence-status"
echo ""
echo "Launching..."
echo ""

exec opencode "$@"
