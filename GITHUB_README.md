<div align="center">

<img src="https://raw.githubusercontent.com/arcanea/ecosystem/main/docs/assets/arcanea-logo.svg" width="180" height="180" alt="Arcanea Logo">

# ✨ ARCANEA ECOSYSTEM

**The Complete Creative Suite for Solopreneurs & Game Developers**

[![GitHub stars](https://img.shields.io/github/stars/arcanea/ecosystem?style=for-the-badge&color=ffd700)](https://github.com/arcanea/ecosystem/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/arcanea/ecosystem?style=for-the-badge&color=7c4dff)](https://github.com/arcanea/ecosystem/network)
[![License](https://img.shields.io/badge/License-MIT-ff6b35?style=for-the-badge)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-32%2F32%20Passing-4caf50?style=for-the-badge)]()
[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-🚀-4fc3f7?style=for-the-badge)](https://arcanea.github.io/ecosystem)

<p align="center">
  <a href="https://arcanea.github.io/ecosystem/games">🎮 Games</a> •
  <a href="https://arcanea.github.io/ecosystem/business">💼 Business</a> •
  <a href="https://arcanea.github.io/ecosystem/gamedev">🎨 GameDev</a> •
  <a href="https://arcanea.github.io/ecosystem/portal">🌐 Portal</a> •
  <a href="#cli">⚡ CLI</a>
</p>

<img src="https://raw.githubusercontent.com/arcanea/ecosystem/main/docs/assets/demo-preview.png" width="800" alt="Arcanea Preview">

</div>

---

## 🌟 What is Arcanea?

Arcanea is a **complete creative ecosystem** that combines gamified training, professional business tools, and game development suites into one magical, integrated platform.

### 🎯 Three Systems, One Ecosystem

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   🎮 GAMES          💼 BUSINESS          🎨 GAMEDEV            │
│                                                                 │
│   Train Skills      Manage Work          Build Games            │
│   Summon Agents     Track Revenue        Design Levels          │
│   Level Up          Invoice Clients      Test & Deploy          │
│                                                                 │
│   ↓                    ↓                      ↓                 │
│   └────────────────────┴──────────────────────┘                 │
│                        ↓                                        │
│              ┌─────────────────┐                               │
│              │  Shared Data    │                               │
│              │  CLI Control    │                               │
│              │  MCP Bridge     │                               │
│              └─────────────────┘                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Live Demos

Experience Arcanea instantly in your browser:

| System | Demo | Description |
|--------|------|-------------|
| **🎮 Games** | [Play Now](https://arcanea.github.io/ecosystem/games) | Complete 50 challenges, summon 38 agents, master 77+ skills |
| **💼 Business** | [Try It](https://arcanea.github.io/ecosystem/business) | Manage $12.4K/month revenue, 8 clients, 6 projects |
| **🎨 GameDev** | [Build](https://arcanea.github.io/ecosystem/gamedev) | Professional game dev suite with level editor |
| **🌐 Portal** | [Dashboard](https://arcanea.github.io/ecosystem/portal) | Command center for all systems |
| **⚡ CLI** | [Commands](#cli) | Terminal control for power users |

---

## ✨ Key Features

### 🎮 Games System
- **50 Elemental Challenges** - Progress through Fire, Water, Earth, Wind, and Void towers
- **38 Arcane Agents** - Summon agents with unique powers and personalities  
- **77+ Mystical Skills** - Train and level up your abilities
- **Reality Weaving** - Combine agents to manifest creative projects
- **XP & Progression** - Complete RPG-style leveling system

### 💼 Business OS
- **Revenue Tracking** - Monitor monthly, outstanding, YTD, and projected income
- **Client Management** - Track 8+ clients with full profiles
- **Project Pipeline** - Visual progress tracking for all projects
- **Time Tracking** - Working timer with weekly summaries
- **Invoice System** - Professional invoicing with status tracking
- **Content Pipeline** - 4-stage workflow (Ideas → Drafting → Review → Published)
- **Workflow Templates** - 6 pre-built business processes

### 🎨 Game Designer OS
- **Project Manager** - Track multiple game projects with progress
- **Game Design Documents** - Structured GDD with section statuses
- **Asset Library** - Manage 147+ visual and audio assets
- **Level Editor** - Interactive 10x10 tile-based editor
- **Character Database** - Full character profiles with stats
- **Playtesting** - Analytics dashboard with 42+ sessions tracked
- **Bug Tracker** - Severity-based issue management

---

## 📦 Installation

### Option 1: Use Online (Recommended)
Simply visit [arcanea.github.io/ecosystem](https://arcanea.github.io/ecosystem) - no installation required!

### Option 2: Download & Run Locally

```bash
# Clone the repository
git clone https://github.com/arcanea/ecosystem.git

# Navigate to project
cd ecosystem

# Open in browser
open apps/games/index.html
```

### Option 3: CLI Installation

```bash
# Install globally
npm install -g arcanea-cli

# Or use directly
npx arcanea-cli

# Initialize
cd your-project
arcanea init

# Check status
arcanea status
```

---

## 🛠️ Quick Start

### For Training & Gamification
```bash
# Play fully functional games
open apps/games/index.html

# Or use CLI
arcanea games list              # View your profile
arcanea games progress          # Check challenge progress
arcanea games summon dragon-forge  # Summon an agent
```

### For Business Management
```bash
# Launch business suite
open apps/business/index.html

# Or use CLI
arcanea business revenue        # View revenue summary
arcanea business clients        # List clients
arcanea business projects       # View projects
arcanea export > backup.json    # Backup data
```

### For Game Development
```bash
# Launch game dev suite
open apps/gamedev/index.html

# Or use CLI
arcanea gamedev list            # List projects
arcanea gamedev build           # Build current project
arcanea gamedev test            # Run playtests
arcanea gamedev deploy          # Deploy to production
```

### For Rapid Project Creation
```bash
# Create project from template
node packages/templates/create.js novel-project my-book
node packages/templates/create.js indie-game my-game
node packages/templates/create.js business-launch my-company
node packages/templates/create.js online-course my-course
node packages/templates/create.js research-project my-study
```

---

## 📊 System Architecture

```
Arcanea Ecosystem
│
├── 🎮 Games System
│   ├── Elemental Challenges (50)
│   ├── Agent Summoning (38 agents)
│   ├── Skill Mastery (77+ skills)
│   └── Reality Weaving
│
├── 💼 Business System
│   ├── Revenue Dashboard
│   ├── Client Manager (8 clients)
│   ├── Project Tracker (6 projects)
│   ├── Time Tracking
│   ├── Invoice System
│   └── Content Pipeline
│
├── 🎨 GameDev System
│   ├── Project Manager (3 games)
│   ├── Game Design Documents
│   ├── Asset Library (147 assets)
│   ├── Level Editor (10x10 grid)
│   ├── Character Database
│   ├── Playtesting Analytics
│   └── Bug Tracker
│
├── 🔧 Tools & Integration
│   ├── arcanea-cli.js (20+ commands)
│   ├── arcanea-storage.js (Data persistence)
│   ├── arcanea-mcp-bridge.py (MCP integration)
│   └── arcanea-templates.js (5 templates)
│
└── 📚 Documentation (25,000+ words)
    ├── AGENTS_ULTIMATE.md
    ├── SKILLS_ULTIMATE.md
    ├── LORE.md
    └── TESTING_FRAMEWORK.md
```

---

## 🎯 Use Cases

### For Solopreneurs
- **Freelancers** - Track clients, projects, time, and invoices
- **Consultants** - Manage deliverables and content pipeline
- **Creators** - Organize content creation workflow
- **Agencies** - Professional project management

### For Game Developers
- **Indie Devs** - Complete game dev pipeline from design to deploy
- **Hobbyists** - Learn game development with structured tools
- **Teams** - Collaborative project management
- **Publishers** - Track multiple game projects

### For Writers & Creators
- **Novelists** - Use templates and track writing progress
- **Course Creators** - Structured course development workflow
- **Researchers** - Organized research project management

---

## 🛡️ Data & Privacy

- ✅ **100% Client-Side** - All data stays in your browser
- ✅ **localStorage** - Automatic saving, no server needed
- ✅ **Export/Import** - JSON backup and restore
- ✅ **No Tracking** - Zero analytics or telemetry
- ✅ **Open Source** - Full transparency

---

## 🧪 Testing

Arcanea includes a comprehensive test suite:

```bash
# Run all tests
npm test

# Run specific test suite
npm test:games
npm test:business
npm test:gamedev

# Run visual regression tests
npm test:visual
```

**Test Coverage:**
- ✅ 32 functional tests
- ✅ Responsive design tests
- ✅ Performance benchmarks
- ✅ Cross-browser compatibility
- ✅ Accessibility checks

---

## 🤝 Integration

### MCP (Model Context Protocol)
Arcanea integrates with MCP servers for enhanced AI capabilities:

```python
from arcanea_mcp import ArcaneaMCPBridge

bridge = ArcaneaMCPBridge()
await bridge.connect()

# Agents can now use external tools
result = await bridge.invoke_tool(
    tool="image_generation",
    params={"prompt": "fire dragon concept art"}
)
```

### External Tools
- 🎨 **Image Generation** - AI-generated concept art
- 🔍 **Code Analysis** - Quality checks
- 📚 **Documentation Search** - Smart doc lookup
- 📊 **Data Processing** - Transform and analyze

---

## 📖 Documentation

- [📚 Complete Documentation](docs/)
- [🎮 Games Guide](docs/GAMES.md)
- [💼 Business Guide](docs/BUSINESS.md)
- [🎨 GameDev Guide](docs/GAMEDEV.md)
- [⚡ CLI Reference](docs/CLI.md)
- [🧪 Testing Guide](docs/TESTING.md)
- [🏛️ Architecture](docs/ARCHITECTURE.md)

---

## 🤲 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Ways to Contribute
- 🐛 Report bugs
- 💡 Suggest features
- 📖 Improve documentation
- 🎨 Design assets
- 🔧 Code contributions

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=arcanea/ecosystem&type=Date)](https://star-history.com/#arcanea/ecosystem&Date)

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Nano Banana MCP** - For AI integration capabilities
- **InfoGenius** - For knowledge processing
- **Claude** - For development assistance
- **Community** - For feedback and testing

---

<div align="center">

**[⬆ Back to Top](#-arcanea-ecosystem)**

Made with 💜 by the Arcanea Collective

</div>
