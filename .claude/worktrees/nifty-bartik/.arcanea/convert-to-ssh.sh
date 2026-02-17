#!/bin/bash
# Convert all Arcanea repos from HTTPS to SSH

echo "Converting Arcanea repos to SSH..."

REPOS=(
    "/mnt/c/Users/frank/Arcanea"
    "/mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea"
    "/mnt/c/Users/frank/Arcanea/arcanea.ai"
    "/mnt/c/Users/frank/Arcanea/claude-arcanea"
    "/mnt/c/Users/frank/Arcanea/gemini-arcanea"
    "/mnt/c/Users/frank/Arcanea/codex-arcanea"
    "/mnt/c/Users/frank/Arcanea/arcanea-mobile"
    "/mnt/c/Users/frank/Arcanea/arcanea-opencode"
    "/mnt/c/Users/frank/Arcanea/arcanea-luminor"
    "/mnt/c/Users/frank/Arcanea/arcaneabot"
)

for repo in "${REPOS[@]}"; do
    if [ -d "$repo/.git" ]; then
        cd "$repo"
        current_url=$(git remote get-url origin 2>/dev/null)
        if [[ "$current_url" == https://github.com/* ]]; then
            # Convert HTTPS to SSH
            ssh_url=$(echo "$current_url" | sed 's|https://github.com/|git@github.com:|')
            git remote set-url origin "$ssh_url"
            echo "✓ $repo -> $ssh_url"
        elif [[ "$current_url" == git@github.com:* ]]; then
            echo "✓ $repo (already SSH)"
        else
            echo "? $repo - unknown URL format"
        fi
    fi
done

echo ""
echo "Testing SSH connection..."
ssh -T git@github.com 2>&1

echo ""
echo "Done! You can now push from WSL2."
