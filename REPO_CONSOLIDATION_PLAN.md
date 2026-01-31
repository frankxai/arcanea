# Arcanea Repository Consolidation Plan

## Analysis Complete ✅

Based on analysis of 12 Arcanea repositories, we've identified:

### CORE REPOS (Keep & Enhance)
1. **arcanea** - Main platform (well-structured, 77 skills, 38 agents)
2. **arcanea-intelligence-os** - Unique AIOS concept 
3. **[CREATE] arcanea-docs** - Documentation hub

### REPOS TO ARCHIVE (Move to Arcanea-Labs Org)
| Repo | Reason | Action |
|------|--------|--------|
| arcanea-opencode | Ecosystem-specific duplicate | Archive → arcanea-labs |
| arcanea-codex | Ecosystem-specific duplicate | Archive → arcanea-labs |
| arcanea-gemini | Ecosystem-specific duplicate | Archive → arcanea-labs |
| arcanea-core | Experimental core concept | Archive → arcanea-labs |
| arcanea-mobile | Experimental mobile app | Archive → arcanea-labs |
| arcanea-marketplace | Marketplace experiment | Archive → arcanea-labs |
| arcanea-ai-research | Research concepts | Archive → arcanea-labs |
| arcanea-prompt-language | Language experiment | Archive → arcanea-labs |
| Arcanea-Labs | Current personal org | Convert to official org |
| arcanean-library | Content duplicate | Archive → arcanea-labs |

## Execution Commands

### 1. Create Arcanea-Labs Organization
```bash
# Go to GitHub settings → Create new organization
# Name: "Arcanea Labs" 
# Handle: "Arcanea-Labs"
```

### 2. Archive Repos (Run in sequence)
```bash
# Archive experimental repos
gh repo archive frankxai/arcanea-opencode --yes
gh repo archive frankxai/arcanea-codex --yes
gh repo archive frankxai/arcanea-gemini --yes
gh repo archive frankxai/arcanea-core --yes
gh repo archive frankxai/arcanea-mobile --yes
gh repo archive frankxai/arcanea-marketplace --yes
gh repo archive frankxai/arcanea-ai-research --yes
gh repo archive frankxai/arcanea-prompt-language --yes
gh repo archive frankxai/arcanean-library --yes
```

### 3. Transfer to Arcanea-Labs
```bash
# Transfer archived repos to new organization
gh repo transfer Arcanea-Labs/arcanea-opencode --yes
gh repo transfer Arcanea-Labs/arcanea-codex --yes
gh repo transfer Arcanea-Labs/arcanea-gemini --yes
# ... continue for all repos
```

### 4. Create arcanea-docs
```bash
gh repo create arcanea-docs --public --clone=false
cd arcanea-docs
# Initialize with documentation structure
```

## Benefits of This Strategy

### SEO Impact
- **Single Authority**: All SEO juice flows to `arcanea` main repo
- **Clear Focus**: One canonical product page
- **Reduced Competition**: No longer competing against your own repos

### User Experience
- **Clear Entry Point**: `arcanea` becomes the obvious starting place
- **Less Confusion**: Users don't need to choose between similar repos
- **Better Navigation**: Clear separation between product and experiments

### Maintenance
- **Reduced Overhead**: Focus on 3 core repos instead of 12
- **Cleaner GitHub Profile**: Professional, focused appearance
- **Easier Contributions**: Clear contribution targets

## Mono-Repo Structure for Main arcanea

```
arcanea/
├── packages/
│   ├── core/              # Platform agnostic core
│   ├── claude/            # Claude Code integration
│   ├── opencode/          # OpenCode integration  
│   ├── gemini/            # Gemini integration
│   └── mcp-server/        # MCP Server (30+ tools)
├── apps/
│   └── web/               # Next.js application
├── docs/                  # Consolidated documentation
└── .claude/               # AI skills & agents
```

## Next Steps After Consolidation

1. **Update Main README**: Clear repo hierarchy and navigation
2. **Consolidate Documentation**: Move all docs to arcanea-docs
3. **Setup Mono-Repo**: Implement packages structure
4. **Redirect Links**: Update all cross-references
5. **Announce Changes**: Community communication plan

## Timeline

- **Week 1**: Archive and transfer repos
- **Week 2**: Create arcanea-docs, consolidate content  
- **Week 3**: Restructure main repo as mono-repo
- **Week 4**: Update documentation and announce

## Success Metrics

- GitHub profile clarity (qualitative)
- SEO ranking improvement (quantitative)
- Contributer confusion reduction (qualitative)
- Maintenance time reduction (quantitative)

---

**Ready for execution**: Run the GitHub CLI commands above in sequence, ensuring you have proper permissions and authentication set up.