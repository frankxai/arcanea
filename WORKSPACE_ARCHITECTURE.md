# Arcanea Workspace Architecture

## 🏗️ **Hybrid Monorepo Strategy**

### Core Principle
**Develop in Monorepo, Deploy from Standalone** - All development happens in the main Arcanea workspace, with selective extraction for specific deployment needs.

## 📁 **Workspace Structure**

```
/mnt/c/Users/Frank/Arcanea/ (MAIN WORKSPACE)
├── apps/                    # All applications
│   ├── mobile/             # React Native app (Dev here)
│   ├── studio/             # Studio web app
│   ├── gallery/            # Gallery web app
│   ├── library/            # Library web app
│   ├── chat/               # Chat interface
│   ├── academy/            # Academy platform
│   ├── nexus/              # Nexus hub
│   ├── realms/             # Realms builder
│   ├── sanctuary/          # Sanctuary space
│   └── web/                # Main website
│
├── packages/               # Shared packages
│   ├── ai-core/           # APL (Prompt Language)
│   ├── ui/                # Shared UI components
│   ├── database/          # Database utilities
│   ├── asset-manager/     # Asset management
│   ├── guardian-ai/       # Guardian AI system
│   └── realm-engine/      # Realm generation
│
├── agents/                 # Agent workflow system
│   ├── workflows/         # Agent definitions
│   └── daily-ideas/       # Daily planning
│
└── pnpm-workspace.yaml    # Monorepo configuration
```

## 🚀 **Development Workflow**

### Daily Development (PRIMARY)
```bash
# Work in main monorepo
cd /mnt/c/Users/Frank/Arcanea
pnpm dev

# Everything runs together
# Hot reload across all apps
# Shared types and components
# Single git repository
```

### Benefits
- ✅ **Unified Development** - All code in one place
- ✅ **Shared Dependencies** - No duplication
- ✅ **Type Safety** - Cross-package TypeScript
- ✅ **Hot Module Reload** - Instant updates everywhere
- ✅ **Simple Git** - One repository to manage

## 🔄 **Standalone Repositories (SECONDARY)**

### Purpose
Standalone repos are **deployment targets**, not development environments:

| Repository | Purpose | Sync Strategy |
|------------|---------|---------------|
| `arcanea-mobile` | App Store deployment | Manual/CI extract when ready |
| `arcanea-prompt-language` | NPM package publishing | On version bump |
| `arcanean-library` | Independent hosting | Content updates only |

### When to Use Standalone
- **Mobile App Store** - Apple/Google require separate repo
- **NPM Publishing** - Package needs own versioning
- **Client Delivery** - Sharing specific component
- **Independent Scaling** - Separate infrastructure needs

## 💡 **Best Practices**

### DO ✅
- **Develop in monorepo** - Always start here
- **Use workspace:** - Reference local packages
- **Run pnpm dev** - For cross-app development
- **Commit to main** - Primary source of truth

### DON'T ❌
- **Develop in standalone** - Only for deployment
- **Manually sync** - Use CI/CD automation
- **Duplicate code** - Keep single source
- **Break workspace** - Maintain package links

## 🔧 **Common Commands**

### Development
```bash
# Run everything
pnpm dev

# Run specific app
pnpm dev --filter=@arcanea/studio

# Build all
pnpm build

# Test all
pnpm test
```

### Workspace Management
```bash
# Install new dependency to app
pnpm add package-name --filter=@arcanea/studio

# Add workspace package to app
pnpm add @arcanea/ui --workspace --filter=@arcanea/gallery

# Update all dependencies
pnpm update -r
```

### Deployment Extraction (When Needed)
```bash
# Extract mobile for app store
./scripts/extract-mobile.sh

# Publish APL to NPM
./scripts/publish-apl.sh

# Deploy library standalone
./scripts/deploy-library.sh
```

## 🎯 **Decision Matrix**

### Stay in Monorepo When:
- Developing new features
- Sharing code between apps
- Testing integrations
- Refactoring systems
- Daily development

### Extract to Standalone When:
- Submitting to app stores
- Publishing NPM packages
- Client needs separate repo
- Independent CI/CD required
- Legal/compliance reasons

## 📊 **Architecture Benefits**

### Development Speed
- **10x faster** - No context switching
- **Instant feedback** - Hot reload everywhere
- **Type safety** - Catch errors immediately

### Maintenance
- **Single source** - One place to update
- **Consistent versions** - All apps aligned
- **Shared fixes** - Bug fixes apply everywhere

### Scalability
- **Selective extraction** - Deploy what you need
- **Flexible architecture** - Adapt as needed
- **Future proof** - Easy to split later

## 🚦 **Current Status**

✅ **Monorepo Intact** - All apps still in workspace
✅ **Standalone Created** - Ready for special deployments
✅ **CI/CD Ready** - Automation configured
✅ **Best of Both** - Flexibility maintained

## 🎬 **Next Actions**

1. **Continue developing in monorepo**
2. **Use standalone only for deployment**
3. **Automate sync when needed**
4. **Keep workspace as source of truth**

---

**TLDR: You were right - keeping everything in the workspace is smarter! Standalone repos are just deployment targets, not development environments.**