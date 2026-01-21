# AUTO-INSTRUCTIONS FOR AGENTS

**IMPORTANT: Read this file. It configures automatic behavior.**

## 🤖 You Are Working in a Hybrid Environment

- **User edits:** Windows (C:\Users\Frank\Arcanea)
- **You build:** Linux (~/arcanea)
- **Git commits:** Windows only

## ⚡ Automatic Commands

### For ANY Build Operation:

```bash
# Just call this - it handles everything
python3 ~/arcanea_helper.py build
```

This automatically:
1. Syncs latest code from Windows
2. Switches to Linux directory
3. Builds the project
4. Done!

### If You Need Specific Paths:

```bash
# Get build directory
BUILD_DIR=$(python3 ~/arcanea_helper.py build-path)
cd $BUILD_DIR
pnpm run build

# Get current location type
LOCATION=$(python3 ~/arcanea_helper.py location)
# Returns: "windows" or "linux"

# Just sync
python3 ~/arcanea_helper.py sync
```

## 📋 Simple Rules

### Rule 1: For Builds/Tests/Install
```bash
# Always use:
python3 ~/arcanea_helper.py build

# Or manually:
cd ~/arcanea
pnpm run build
```

### Rule 2: For Code Analysis  
```bash
# Can read from either location
# But prefer Linux (faster):
cd ~/arcanea
# analyze code
```

### Rule 3: For File Modifications
```bash
# Modify on Linux:
cd ~/arcanea
# edit files

# Changes are synced automatically on next build
```

### Rule 4: For Git Operations
```bash
# NEVER git commit on Linux side!
# Git guard will warn you

# All git operations happen on Windows
# User handles with GitHub Desktop
```

## 🎯 What You DON'T Need to Do

- ❌ Don't manually check which filesystem
- ❌ Don't manually sync
- ❌ Don't remember folder names
- ❌ Don't worry about Windows vs Linux

Just call: `python3 ~/arcanea_helper.py build`

## ✅ That's It!

The system handles:
- Automatic location detection
- Automatic sync
- Automatic path switching
- Git conflict prevention

You just build. It just works.

---

**Config:** `.claude/AUTO_CONFIG.json`
**Helper:** `~/arcanea_helper.py`
**Status:** ✅ Auto-configured
