# Git Push Instructions

## Changes Ready to Push

All commits are created locally. Push from Windows (GitHub Desktop, Git Bash, or VS Code).

### Main Repository: arcanea

**Branch:** `local-work-sync`
**Commit:** `feat: Next.js 16 upgrade, React 19 migration, comprehensive ecosystem sync`
**Files Changed:** 151

```powershell
cd C:\Users\frank\Arcanea
git push origin local-work-sync
```

### Sub-Repositories to Commit & Push

From Windows Git Bash or PowerShell:

```bash
# arcanea-infogenius
cd C:\Users\frank\Arcanea\arcanea-infogenius
git add -A
git commit -m "fix: Rename arcania to arcanea for naming consistency"
git push

# arcanea-ecosystem (contains nested repos)
cd C:\Users\frank\Arcanea\arcanea-ecosystem
git add -A
git commit -m "feat: Next.js 16.1.1 upgrade, aria-hidden fix"
git push

# claude-arcanea
cd C:\Users\frank\Arcanea\claude-arcanea
git add -A
git commit -m "chore: Ecosystem sync"
git push

# codex-arcanea
cd C:\Users\frank\Arcanea\codex-arcanea
git add -A
git commit -m "chore: Ecosystem sync"
git push

# gemini-arcanea
cd C:\Users\frank\Arcanea\gemini-arcanea
git add -A
git commit -m "chore: Ecosystem sync"
git push

# arcanea-opencode
cd C:\Users\frank\Arcanea\arcanea-opencode
git add -A
git commit -m "chore: Update GitHub templates"
git push
```

## Alternative: Use GitHub Desktop

1. Open GitHub Desktop
2. Add each repository
3. Review changes
4. Commit with message
5. Push to origin

## WSL2 Git Setup (Optional)

To enable git push from WSL2:

```bash
# Set git config
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"

# Set up SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"
cat ~/.ssh/id_ed25519.pub
# Copy output and add to GitHub Settings > SSH Keys

# Switch repos to SSH
git remote set-url origin git@github.com:frankxai/arcanea.git
```
