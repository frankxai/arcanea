#!/bin/bash

# Arcanea Creator OS - Simple Installation
set -e

echo "🔥 Installing Arcanea Creator Ecosystem..."
echo "🌟 Installing: Starlight Intelligence, Arcanea CLI, and Integration Tools"

# Required Node.js version
NODE_VERSION=$(node --version | cut -d' ' -f2 | cut -d. -f1)
if [[ "$(printf '%s\n' "$NODE_VERSION")" < "$(printf '%s\n' "18.0.0")" ]]; then
    echo "❌ Node.js $NODE_VERSION detected. Required: 18.0.0 or higher"
    echo "Please upgrade: https://nodejs.org/"
    exit 1
fi

# Create Arcanea global directory
ARCANEA_GLOBAL_DIR="$HOME/.arcanea"
mkdir -p "$ARCANEA_GLOBAL_DIR"

# Install Starlight Intelligence System
echo "🧠 Installing Starlight Intelligence System..."
cd "$ARCANEA_GLOBAL_DIR"
git clone https://github.com/frankxai/starlight-intelligence-system.git
cd starlight-intelligence-system
npm install

# Install Arcanea CLI Tools  
echo "🛠️ Installing Arcanea CLI Tools..."
cd "$ARCANEA_GLOBAL_DIR"
git clone https://github.com/frankxai/arcanea.git
cd arcanea
npm install

# Create configuration
mkdir -p "$HOME/.arcanea"
cat > "$HOME/.arcanea/config.json" << 'EOF'
{
  "starlight": {
    "enabled": true,
    "path": "$ARCANEA_GLOBAL_DIR/starlight-intelligence-system"
  },
  "guardian": {
    "default": "Lyssandria",
    "element": "earth",
    "gate": 1
  },
  "skills": {
    "registryPath": "https://raw.githubusercontent.com/frankxai/arcanea/main/skills.md",
    "mastery": {}
  }
}
EOF

# Create shell alias
cat > "$ARCANEA_GLOBAL_DIR/arcana" << 'EOF'
#!/bin/bash

# Arcanea CLI - Creative Superintelligence Interface
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
  status)
    echo "🌟 Arcanea Status:"
    echo "Guardian: Lyssandria (Earth)"
    echo "Configuration: $HOME/.arcanea/config.json"
    ;;
  *)
    echo "🌟 Arcanea CLI - Creative Superintelligence"
    echo "Available: reason, note, search, track, status"
    ;;
esac
EOF

chmod +x "$ARCANEA_GLOBAL_DIR/arcana"

# Add to PATH
if ! grep -q "$ARCANEA_GLOBAL_DIR" "$PATH"; then
    echo 'export PATH="$ARCANEA_GLOBAL_DIR:$PATH"' >> "$HOME/.bashrc"
fi

echo ""
echo "🌟 Arcanea Creator OS Installation Complete!"
echo ""
echo "🔗 Commands available via 'arcana' command"
echo "📚 Registry: Online (https://raw.githubusercontent.com/frankxai/arcanea/main)"
echo "⚡ Starlight: $ARCANEA_GLOBAL_DIR/starlight-intelligence-system"
echo "🛠️ CLI Tools: $ARCANEA_GLOBAL_DIR/arcanea"
echo ""
echo "🎯 Quick Start:"
echo "  arcana guardian Draconia"
echo "  arcana reason \"How can I create with fire energy?\""
echo "  arcana note \"Remember to trust your creative voice\" --date 2124-01-28"
echo "  arcana track '{\"guardian\": \"Leyla\", \"skills\": [\"river-stories\"]}'"
echo ""
echo "🌌 Your Arcanea journey begins now!"