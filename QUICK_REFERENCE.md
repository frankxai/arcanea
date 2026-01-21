# Arcanea Quick Reference Card

## 🎯 Memory Setup (16GB System)

```
✅ Windows: 5GB
✅ WSL2: 11GB
✅ Total: 16GB (shared)
```

To apply changes: `wsl --shutdown` (from PowerShell)

---

## ⚡ Quick Commands

```bash
arcanea-sync     # Windows → Linux
arcanea-build    # Build on Linux
arcanea-dev      # Start dev server
arcanea-go       # Sync + Build
arcanea-cd       # Jump to build dir
```

---

## 📂 Locations

```
Windows:  C:\Users\Frank\Arcanea
Linux:    ~/arcanea-build
WSL from Windows: \\wsl$\Ubuntu\home\frankx\arcanea-build
```

---

## 🔄 Daily Workflow

```bash
# 1. Edit files on Windows (VS Code, etc.)

# 2. Sync and build
arcanea-go

# 3. Test
arcanea-dev
# → http://localhost:3000

# 4. Commit from Windows (GitHub Desktop)
```

---

## 🚨 Emergency Reset

```bash
# Clean everything
cd ~/arcanea-build
rm -rf node_modules .next .turbo
pnpm install
pnpm run build

# Restart WSL (PowerShell)
wsl --shutdown
wsl
```

---

## 📊 Check Status

```bash
free -h              # Memory
df -h ~              # Disk
arcanea-build        # Test build
```

---

## 💡 Remember

- ✅ Edit on Windows (comfortable)
- ✅ Build on Linux (fast)
- ✅ Sync before building
- ❌ Never allocate 100% RAM to WSL
- ❌ Don't build on Windows filesystem

---

**Full Guide:** HYBRID_WORKFLOW_GUIDE.md
