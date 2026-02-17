@echo off
setlocal
wsl -e bash -lc "cd /mnt/c/Users/frank/Arcanea && claude --dangerously-skip-permissions %*"
