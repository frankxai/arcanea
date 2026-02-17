@echo off
setlocal
wsl -e bash -lc "if [ -s \"$HOME/.nvm/nvm.sh\" ]; then . \"$HOME/.nvm/nvm.sh\"; nvm use --silent >/dev/null 2>&1 || true; fi; codex --dangerously-bypass-approvals-and-sandbox -C /mnt/c/Users/frank/Arcanea %*"
