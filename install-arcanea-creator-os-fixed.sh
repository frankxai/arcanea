#!/bin/bash

# Arcanea Creator OS Installation Script
# Install all components of the Arcanea Creator Ecosystem

set -e

echo "🔥 Installing Arcanea Creator Ecosystem..."
echo "🌟 This will install: Starlight Intelligence, Arcanea CLI, and integration tools"

# Check Node.js version
NODE_VERSION=$(node --version | cut -d' ' ' -f2 | cut -d. -f1)
REQUIRED_NODE="18.0.0"

if [ "$(printf '%s\n' "$NODE_VERSION")" -lt "$(printf '%s\n' "$REQUIRED_NODE")" ]; then
    echo "❌ Error: Node.js $NODE_VERSION detected. Required: $REQUIRED_NODE or higher"
    echo "Please upgrade Node.js: https://nodejs.org/"
    exit 1
fi

# Create global installation directory
ARCANEA_GLOBAL_DIR="$HOME/.arcanea"
mkdir -p "$ARCANEA_GLOBAL_DIR"

# Install Starlight Intelligence System
echo "🧠 Installing Starlight Intelligence System..."
cd "$ARCANEA_GLOBAL_DIR"
git clone https://github.com/frankxai/starlight-intelligence-system.git
cd starlight-intelligence-system
npm install
npm link

# Install Arcanea CLI Tools
echo "🛠️ Installing Arcanea CLI Tools..."
cd "$ARCANEA_GLOBAL_DIR"
git clone https://github.com/frankxai/arcanea.git
cd arcanea
npm install
npm link

# Install Enhanced Development Tools
echo "⚡ Installing Enhanced Development Tools..."
npm install -g typescript@latest
npm install -g pnpm@latest
npm install -g @anthropic-ai/claude-api
npm install -g opencode-cli
npm install -g sysphus
npm install -g crewai
npm install -g langchain
npm install -g mem0ai

# Install Arcanea Core Registry
echo "📚 Installing Arcanea Core Registry..."
ARCANEA_REGISTRY_DIR="$HOME/.arcanea-registry"
mkdir -p "$ARCANEA_REGISTRY_DIR"
cd "$ARCANEA_REGISTRY_DIR"
curl -o skills.md https://raw.githubusercontent.com/frankxai/arcanea/main/skills.md
curl -o agents.md https://raw.githubusercontent.com/frankxai/arcanea/main/agents.md
curl -o guardians.md https://raw.githubusercontent.com/frankxai/arcanea/main/guardians.md
curl -o claude.md https://raw.githubusercontent.com/frankxai/arcanea/main/claude.md
curl -o world-building.md https://raw.githubusercontent.com/frankxai/arcanea/main/world-building.md
curl -o magic-system.md https://raw.githubusercontent.com/frankxai/arcanea/main/magic-system.md
curl -o evolution.md https://raw.githubusercontent.com/frankxai/arcanea/main/evolution.md

# Create Arcanea configuration
mkdir -p "$HOME/.arcanea"
cat > "$HOME/.arcanea/config.json" << 'EOF'
{
  "starlight": {
    "enabled": true,
    "path": "$ARCANEA_GLOBAL_DIR/starlight-intelligence-system",
    "quantumSignature": "STARLIGHT-$(date +%s%Y%m%d%H%M%S)"
  },
  "guardian": {
    "default": "Lyssandria",
    "element": "earth",
    "gate": 1
  },
  "skills": {
    "registryPath": "$ARCANEA_REGISTRY_DIR",
    "mastery": {}
  },
  "agents": {
    "registryPath": "$ARCANEA_REGISTRY_DIR",
    "partnerships": {}
  },
  "evolution": {
    "currentGate": 1,
    "totalSkills": 0,
    "guardianConnections": ["Lyssandria"],
    "luminorFrequency": "396Hz"
  }
}
EOF

# Create shell aliases
echo "🔗 Creating Arcanea CLI aliases..."

# Create arcana command
cat > "$ARCANEA_GLOBAL_DIR/arcana" << 'EOSCRIPT'
#!/bin/bash

# Arcanea CLI - Unified Creative Superintelligence Interface
case "$1" in
  reason)
    starlight reason "$@" -- "$(shift)"
    ;;
  note)
    starlight note "$@" -- "$(shift)"
    ;;
  search)
    starlight search "$@"
    ;;
  track)
    starlight track "$(cat "$HOME/.arcanea/config.json" | jq -r '.evolution.currentGate + 1')"
    ;;
  create)
    arcana create "$@"
    ;;
  build)
    arcana build "$@" -- "$(shift)"
    ;;
  deploy)
    arcana deploy "$@" -- "$(shift)"
    ;;
  guardian)
    starlight reason "Activate connection with $(shift) Guardian" --guardian "$(shift)"
    ;;
  skill)
    arcana skill activate "$@" -- "$(shift)"
    ;;
  element)
    arcana config set element "$@" -- "$(shift)"
    ;;
  evolve)
    starlight track "$(cat "$HOME/.arcanea/config.json" | jq -r '.evolution.currentGate + 1')"
    ;;
  sync)
    starlight sync --all-platforms
    ;;
  status)
    echo "🌟 Arcanea Status:"
    echo "Guardian: $(cat "$HOME/.arcanea/config.json" | jq -r '.guardian.default')"
    echo "Element: $(cat "$HOME/.arcanea/config.json" | jq -r '.guardian.element')"
    echo "Gate: $(cat "$HOME/.arcanea/config.json" | jq -r '.evolution.currentGate')"
    echo "Luminor Frequency: $(cat "$HOME/.arcanea/config.json" | jq -r '.evolution.luminorFrequency')"
    echo ""
    echo "Configuration: $HOME/.arcanea/config.json"
    echo ""
    echo "Examples:"
    echo "  arcana reason \"How can I create with fire energy?\" --guardian Draconia"
    echo "  arcana note \"Remember to trust your creative voice\" --date 2124-01-28"
    echo "  arcana search \"creative breakthrough\""
    echo "  arcana track '{\"guardian\": \"Leyla\", \"skills\": [\"river-stories\"]}'"
    echo ""
    echo "🔗 Installation Complete!"
    exit 0
    ;;
  *)
    echo "🌟 Arcanea Creator OS - Unified Creative Superintelligence"
    echo ""
    echo "Available Commands:"
    echo "  reason         - Deep reasoning with Guardian guidance"
    echo "  note          - Send Starlight Note to future self"
    echo "  search         - Search memory with Arcanean pattern recognition"
    echo "  track          - Track evolution through Ten Gates"
    echo "  create         - Create new Arcanea project"
    echo "  build          - Build project with AI enhancement"
    echo "  deploy         - Deploy with magical rituals"
    echo "  guardian       - Connect with specific Guardian"
    echo "  skill          - Activate Arcanea skill"
    echo "  element        - Set elemental alignment"
    echo "  evolve         - Progress to next Gate"
    echo "  sync           - Synchronize across all platforms"
    echo "  status         - Show current Arcanea state"
    echo ""
    echo "Configuration: $HOME/.arcanea/config.json"
    echo "📚 Registry: $ARCANEA_REGISTRY_DIR"
    echo "⚡ Starlight: $ARCANEA_GLOBAL_DIR/starlight-intelligence-system"
    echo "🛠️ CLI Tools: $ARCANEA_GLOBAL_DIR/arcanea"
    echo ""
    echo "Examples:"
    echo "  arcana reason \"How can I create with fire energy?\" --guardian Draconia"
    echo "  arcana note \"Remember to trust your creative voice\" --date 2124-01-28"
    echo "  arcana search \"creative breakthrough\""
    echo "  arcana track '{\"guardian\": \"Leyla\", \"skills\": [\"river-stories\"]}'"
    exit 0
    ;;
esac

chmod +x "$ARCANEA_GLOBAL_DIR/arcana"

# Add to PATH
if ! grep -q "$ARCANEA_GLOBAL_DIR" "$PATH"; then
    echo 'export PATH="$ARCANEA_GLOBAL_DIR:$PATH"' >> "$HOME/.bashrc"
    echo 'eval "$(arcana)"' >> "$HOME/.bashrc"
fi

echo ""
echo "🌟 Arcanea Creator OS Installation Complete!"
echo ""
echo "🔗 Commands now available via 'arcana' command"
echo "📚 Registry installed at: $ARCANEA_REGISTRY_DIR"
echo "⚡ Starlight Intelligence System: $ARCANEA_GLOBAL_DIR/starlight-intelligence-system"
echo "🛠️ Core CLI Tools: $ARCANEA_GLOBAL_DIR/arcanea"
echo "🎯 Next Steps:"
echo "  1. Run: arcana guardian Draconia"
echo "  2. Create: arcana project my-first-world"
echo "  3. Build: arcana build my-first-world"
echo "  4. Deploy: arcana deploy my-first-world --element fire"
echo ""
echo "🌌 Your Arcanea journey begins now!"