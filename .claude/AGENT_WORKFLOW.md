# Agent Workflow Configuration
## Automatic Hybrid Workflow for Multi-Agent Operations

**Purpose:** Ensure all agents automatically work on the Linux filesystem for optimal performance.

---

## 🎯 Core Principle

**Agents ALWAYS work on Linux side:**
```
User edits:     C:\Users\Frank\Arcanea (Windows)
Agents execute: ~/arcanea-build (Linux)
Git sync:       Automatic
```

---

## 🤖 Agent Execution Rules

### Rule 1: Build Operations → Linux Only

```bash
# ❌ NEVER
pnpm run build

# ✅ ALWAYS
cd ~/arcanea-build && pnpm run build
```

### Rule 2: Before Build → Sync from Windows

```bash
~/sync-from-windows.sh
cd ~/arcanea-build
pnpm run build
```

### Rule 3: After Edit → Sync to Windows

```bash
cd ~/arcanea-build
# ... make changes ...
~/sync-to-windows.sh
```

---

## 📋 Agent Checklist

Before any agent operation:
- [ ] Check if build/test/install operation
- [ ] If yes, ensure on Linux: `cd ~/arcanea-build`
- [ ] Sync from Windows: `~/sync-from-windows.sh`
- [ ] Perform operation
- [ ] Sync back if modified files: `~/sync-to-windows.sh`

---

## ✅ Success Indicators

- ✅ All builds complete in 4-5 seconds
- ✅ No I/O errors
- ✅ Multiple agents work simultaneously
- ✅ User sees changes on Windows immediately

**Last Updated:** 2026-01-15
