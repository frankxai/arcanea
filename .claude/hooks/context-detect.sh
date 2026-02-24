#!/usr/bin/env bash
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Arcanea Context Detector v2.0
# Analyzes session context to determine realm, team, and focus entity.
# Called by prompt-submit and post-tool hooks.
# Writes: /tmp/arcanea-realm, /tmp/arcanea-team, /tmp/arcanea-focus
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INPUT="${1:-}"
TOOL="${2:-}"

# ── Realm Detection ────────────────────────────────────────────────────────
# Maps work context to Arcanea world locations

detect_realm() {
  local ctx="$1"
  local ctx_lower
  ctx_lower=$(echo "$ctx" | tr '[:upper:]' '[:lower:]')

  # Book / Library locations
  if echo "$ctx_lower" | grep -qE 'book/legends|legends.*arcanea|founding.*myth|first.*dawn'; then
    echo "Legends Chamber"
  elif echo "$ctx_lower" | grep -qE 'book/academy|academy.*handbook|ten.*gates|seven.*houses'; then
    echo "Academy of Light"
  elif echo "$ctx_lower" | grep -qE 'book/chronicles|chronicles.*luminors|guardian.*struggles'; then
    echo "Hall of Chronicles"
  elif echo "$ctx_lower" | grep -qE 'book/bestiary|creative.*block|obstacle'; then
    echo "Bestiary Vault"
  elif echo "$ctx_lower" | grep -qE 'book/atlas|territories|landscape'; then
    echo "Atlas Chamber"
  elif echo "$ctx_lower" | grep -qE 'book/prophecies|future.*vision|prophecy'; then
    echo "Oracle Tower"
  elif echo "$ctx_lower" | grep -qE 'book/songs|hymns|lyrics|melody'; then
    echo "Song Hall"
  elif echo "$ctx_lower" | grep -qE 'book/meditations|elements.*practice|meditation'; then
    echo "Element Shrine"
  elif echo "$ctx_lower" | grep -qE 'book/shadows|dark.*night|shadow'; then
    echo "Shadow Archive"
  elif echo "$ctx_lower" | grep -qE 'book/|library|collection|\btext\b|wisdom.*scroll'; then
    echo "Library of Arcanea"
  # Platform / Tech locations
  elif echo "$ctx_lower" | grep -qE 'arcanea-platform|arcanea\.ai|vercel|deploy'; then
    echo "Nexus Tower"
  elif echo "$ctx_lower" | grep -qE 'starlight|sis|intelligence.*system|vault|context.*engine'; then
    echo "Starlight Citadel"
  elif echo "$ctx_lower" | grep -qE 'arcanea-onchain|blockchain|nft|solana|base.*l2'; then
    echo "Chain Nexus"
  elif echo "$ctx_lower" | grep -qE '\.claude/|hooks|skills|settings|statusline|intelligence.*os'; then
    echo "Intelligence Sanctum"
  elif echo "$ctx_lower" | grep -qE 'component|design.*lab|ui|ux|tailwind|css|framer'; then
    echo "Design Atelier"
  elif echo "$ctx_lower" | grep -qE 'supabase|database|migration|rls|postgres|schema'; then
    echo "Foundation Vault"
  elif echo "$ctx_lower" | grep -qE 'api/|endpoint|route.*handler|server.*action'; then
    echo "Gate Workshop"
  elif echo "$ctx_lower" | grep -qE 'test|playwright|jest|e2e|coverage'; then
    echo "Crucible Arena"
  elif echo "$ctx_lower" | grep -qE 'app/|page\.tsx|layout\.tsx|next\.config'; then
    echo "Platform Forge"
  # Lore locations
  elif echo "$ctx_lower" | grep -qE 'lore|canon|guardian|godbeast|lumina|nero|malachar'; then
    echo "Lore Sanctum"
  elif echo "$ctx_lower" | grep -qE 'character|npc|personality|backstory'; then
    echo "Character Forge"
  elif echo "$ctx_lower" | grep -qE 'world.*build|new.*realm|cosmology|territory'; then
    echo "World Anvil"
  else
    return 1  # No realm detected
  fi
}

# ── Team Detection ─────────────────────────────────────────────────────────
# Maps context to active agentic team

detect_team() {
  local ctx="$1"
  local ctx_lower
  ctx_lower=$(echo "$ctx" | tr '[:upper:]' '[:lower:]')

  if echo "$ctx_lower" | grep -qE 'orchestrat|coordinate|multi-step|complex.*plan|starlight|council'; then
    echo "Source Council"
  elif echo "$ctx_lower" | grep -qE 'architect|system.*design|schema|data.*model|infrastructure|foundation|supabase'; then
    echo "Foundation Forge"
  elif echo "$ctx_lower" | grep -qE 'component|react|deploy|build|implement|code|compile'; then
    echo "Fire Brigade"
  elif echo "$ctx_lower" | grep -qE 'write|voice|tone|content|story|narrative|lore|creative|legend|myth|poem|song'; then
    echo "Flow Weavers"
  elif echo "$ctx_lower" | grep -qE 'design|ui\b|ux\b|accessibility|css|tailwind|animation'; then
    echo "Heart Circle"
  elif echo "$ctx_lower" | grep -qE 'security|review|audit|quality|verify|lint'; then
    echo "Voice Court"
  elif echo "$ctx_lower" | grep -qE 'plan|strategy|research|roadmap|vision|model.*route'; then
    echo "Sight Council"
  elif echo "$ctx_lower" | grep -qE 'visual|image|premium|glassmorphism|world.*build|crown'; then
    echo "Crown Assembly"
  elif echo "$ctx_lower" | grep -qE 'debug|bug|error|refactor|migrate|shift|fix|broken'; then
    echo "Shift Engineers"
  elif echo "$ctx_lower" | grep -qE 'github|pr\b|merge|collaborate|team|swarm|multi-agent|push|commit'; then
    echo "Unity Bridge"
  elif echo "$ctx_lower" | grep -qE 'test|playwright|jest|e2e|coverage'; then
    echo "Fire Brigade"
  else
    return 1
  fi
}

# ── Focus Detection ────────────────────────────────────────────────────────
# Detects which character, entity, or object is in focus

detect_focus() {
  local ctx="$1"
  local ctx_lower
  ctx_lower=$(echo "$ctx" | tr '[:upper:]' '[:lower:]')

  # Guardians/Gods
  if echo "$ctx_lower" | grep -qE 'shinkami|source.*gate|amaterasu'; then echo "Shinkami"
  elif echo "$ctx_lower" | grep -qE 'lyssandria|foundation.*gate|kaelith'; then echo "Lyssandria"
  elif echo "$ctx_lower" | grep -qE 'draconia|fire.*gate|draconis'; then echo "Draconia"
  elif echo "$ctx_lower" | grep -qE 'lyria|sight.*gate|yumiko'; then echo "Lyria"
  elif echo "$ctx_lower" | grep -qE 'leyla|flow.*gate|veloura'; then echo "Leyla"
  elif echo "$ctx_lower" | grep -qE 'alera|voice.*gate|otome'; then echo "Alera"
  elif echo "$ctx_lower" | grep -qE 'maylinn|heart.*gate|laeylinn'; then echo "Maylinn"
  elif echo "$ctx_lower" | grep -qE 'aiyami|crown.*gate|sol\b'; then echo "Aiyami"
  elif echo "$ctx_lower" | grep -qE 'elara|shift.*gate|thessara'; then echo "Elara"
  elif echo "$ctx_lower" | grep -qE 'ino|unity.*gate|kyuro'; then echo "Ino"
  # Major entities
  elif echo "$ctx_lower" | grep -qE 'lumina|first.*light|form.*giver'; then echo "Lumina"
  elif echo "$ctx_lower" | grep -qE 'nero|darkness|primordial'; then echo "Nero"
  elif echo "$ctx_lower" | grep -qE 'malachar|dark.*lord|shadowfen'; then echo "Malachar"
  elif echo "$ctx_lower" | grep -qE 'mamoru|fox|mascot'; then echo "Mamoru"
  # Starlight agents
  elif echo "$ctx_lower" | grep -qE 'orchestrator.*agent|prime.*agent'; then echo "SIS Agent"
  elif echo "$ctx_lower" | grep -qE 'architect.*agent|navigator.*agent'; then echo "SIS Agent"
  else
    return 1
  fi
}

# ── Execute ────────────────────────────────────────────────────────────────

# Combine input context with tool context
CONTEXT="${INPUT} ${TOOL}"

# Only update if we have actual context
if [ -n "$CONTEXT" ] && [ "$CONTEXT" != " " ]; then
  REALM=$(detect_realm "$CONTEXT" 2>/dev/null)
  if [ -n "$REALM" ]; then
    echo "$REALM" > /tmp/arcanea-realm
  else
    echo "" > /tmp/arcanea-realm
  fi

  TEAM=$(detect_team "$CONTEXT" 2>/dev/null)
  if [ -n "$TEAM" ]; then
    echo "$TEAM" > /tmp/arcanea-team
  else
    echo "" > /tmp/arcanea-team
  fi

  FOCUS=$(detect_focus "$CONTEXT" 2>/dev/null)
  if [ -n "$FOCUS" ]; then
    echo "$FOCUS" > /tmp/arcanea-focus
  else
    # Clear stale focus when no character detected
    echo "" > /tmp/arcanea-focus
  fi
fi

exit 0
