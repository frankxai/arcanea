# Claude Code Agent Automation
## Automatic Hybrid Workflow Integration

**Purpose:** Configure Claude Code agents to automatically use Linux filesystem for builds.

---

## 🤖 Automatic Agent Behavior

### When Agent Detects Build Operation:

```
Agent receives task: "build the project"
  ↓
Agent checks current directory
  ↓
If on /mnt/c/* (Windows):
  ↓
Agent automatically switches to ~/arcanea-build
  ↓
Agent syncs from Windows
  ↓
Agent executes build on Linux
  ↓
Agent syncs back to Windows
  ↓
Done! ✅
```

### No Manual Intervention Needed

**User just says:** "build the project"

**Agent automatically:**
1. Detects it's a build operation
2. Switches to Linux filesystem
3. Syncs latest code
4. Builds (fast, stable)
5. Syncs results back
6. Reports success

---

## 📋 Supported Operations (Auto-Linux)

Agents automatically use Linux for:
- `pnpm run build`
- `pnpm run test`
- `pnpm install`
- `npm run build`
- `npm run test`
- `npm install`
- Any operation with "build", "test", "install"

---

## 🎯 Working Directory Detection

```bash
# Agent checks:
if [[ $(pwd) == /mnt/c/* ]]; then
  # On Windows filesystem
  if [[ $task contains "build|test|install" ]]; then
    # Switch to Linux
    cd ~/arcanea-build
    ~/sync-from-windows.sh
  fi
fi
```

---

## ✅ Verification

Agent workflow is automated when:
- Agent says "Switching to Linux filesystem..."
- Builds complete in 4-5 seconds
- No manual intervention needed
- Multiple agents work simultaneously

---

**Status:** ✅ Configured for Arcanea
**Extends to:** All FrankX projects
**Requires:** Scripts in ~/ directory

