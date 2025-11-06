# Arcanea Claude Code Development Setup

> **AI-Powered Development Team** for the Arcanea social creation platform

This directory contains the complete Claude Code configuration for Arcanea development - a team of specialized AI agents, workflow commands, and integrations designed to accelerate development with maximum autonomy.

## 📁 Directory Structure

```
.claude/
├── agents/              # Specialized AI development agents
│   ├── arcanea-frontend.md         # React 19/Next.js 16 UI specialist
│   ├── arcanea-backend.md          # API routes, Supabase, RLS policies
│   ├── arcanea-ai-specialist.md    # Luminor personalities, Guardian system
│   ├── arcanea-devops.md           # Build, deployment, CI/CD
│   └── arcanea-development.md      # General full-stack development
├── commands/            # Workflow automation commands
│   ├── arcanea-dev.md              # Main development workflow
│   ├── arcanea-build.md            # Autonomous build error fixing
│   ├── arcanea-deploy.md           # Vercel deployment workflow
│   ├── arcanea-test.md             # Comprehensive testing suite
│   └── arcanea-db.md               # Database operations & migrations
├── skills/              # Domain knowledge and lore
│   └── arcanea-lore/               # Platform lore, personalities, academies
└── README.md            # This file

../.mcp.json             # MCP server configurations (project root)
```

## 🤖 Specialized Agents

### Frontend Specialist (`arcanea-frontend`)
**Expertise**: React 19, Next.js 16, Tailwind, Framer Motion, Radix UI
- 89-color cosmic theme system
- Luminor avatar components
- Glass morphism effects
- Responsive design mastery
- **MCP Tools**: Figma Remote, Playwright

### Backend Specialist (`arcanea-backend`)
**Expertise**: Next.js API routes, Supabase, PostgreSQL, RLS policies
- Service layer architecture
- Real-time subscriptions
- Authentication flows
- Database schema design
- **MCP Tools**: GitHub, Notion

### AI Specialist (`arcanea-ai-specialist`)
**Expertise**: 6 Luminor personalities, Guardian system, AI integrations
- Gemini Flash 2.0 integration
- Claude 3.5 Sonnet integration
- Imagen 3 image generation
- Suno AI music generation
- **MCP Tools**: GitHub, Linear, Notion

### DevOps Specialist (`arcanea-devops`)
**Expertise**: Build pipelines, deployment, error resolution, monitoring
- Turborepo optimization
- Vercel deployment
- CI/CD workflows
- Performance monitoring
- **MCP Tools**: GitHub, Playwright

## ⚡ Workflow Commands

### `/arcanea-dev` - Main Development Workflow
Start here for general development tasks. Routes to specialized agents as needed.

```bash
# Use in Claude Code
/arcanea-dev
```

### `/arcanea-build` - Autonomous Build Fixer
Automatically diagnoses and fixes build errors across the monorepo.

**Capabilities**:
- Detects missing imports and packages
- Fixes TypeScript errors
- Resolves dependency conflicts
- Updates configurations
- Runs in 3 phases: Quick wins → Structural fixes → Verification

```bash
/arcanea-build
```

**Status**: Successfully fixed 11 build errors (100% autonomous)

### `/arcanea-deploy` - Vercel Deployment
End-to-end deployment workflow with pre/post-deployment checks.

**Workflow**:
1. Pre-deployment: Build verification, env check, config review
2. Deployment: GitHub integration or Vercel CLI
3. Post-deployment: Testing, performance audit, monitoring

```bash
/arcanea-deploy
```

### `/arcanea-test` - Comprehensive Testing
Run unit, integration, and E2E tests across all packages.

**Test Strategy**:
- Type checking & linting (1 min)
- Unit tests with coverage (2 min)
- Integration tests (3 min)
- Playwright E2E tests (5 min)

```bash
/arcanea-test
```

### `/arcanea-db` - Database Operations
Manage Prisma schema, migrations, and Supabase integration.

**Capabilities**:
- Schema migrations
- RLS policy management
- Data seeding
- Backup & recovery
- Performance optimization

```bash
/arcanea-db
```

## 🔌 MCP Server Integrations

### GitHub (`@modelcontextprotocol/server-github`)
- Repository management
- Pull request creation
- Issue tracking
- Code review automation

### Figma Remote (`mcp.figma.com`)
- Design system access
- Component specifications
- UI mockup inspection
- Design token extraction

### Notion (`mcp.notion.com`)
- Product requirements
- Technical documentation
- Meeting notes
- Knowledge base

### Linear (`mcp.linear.app`)
- Sprint planning
- Issue tracking
- Project roadmaps
- Team workflows

### Playwright (`@executeautomation/playwright-mcp-server`)
- E2E testing
- UI verification
- Browser automation
- Visual regression testing

## 🚀 Quick Start

### 1. Initial Setup
```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm db:generate

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### 2. Start Development
```bash
# Start dev server (auto-selects available port)
pnpm dev

# Or start specific app
pnpm dev --filter=@arcanea/web
```

### 3. Use Claude Code Agents
```bash
# General development
/arcanea-dev

# Fix build errors autonomously
/arcanea-build

# Deploy to Vercel
/arcanea-deploy
```

## 📊 Current Build Status

**Last Build**: November 6, 2025
**Status**: ✅ All code errors fixed
**Remaining**: WSL filesystem issues (does not affect Vercel)

### Fixed Issues (11 total)
1. ✅ UTF-8 BOM characters in package.json files
2. ✅ Missing `@arcanea/ai-core` package (created with 11 exports)
3. ✅ AI core export pattern mismatches
4. ✅ Missing service stub files (5 created)
5. ✅ CSS Tailwind class errors
6. ✅ Nexus app missing files
7. ✅ Studio import path errors
8. ✅ Studio missing openai dependency
9. ✅ @arcanea/ui package exports
10. ✅ Chat app missing UI dependency
11. ✅ Academy lucide-react icon imports

## 🎯 Development Principles

### Autonomous by Default
Agents make decisions and implement fixes without asking unless:
- User input is required (API keys, preferences)
- Multiple valid approaches exist
- Changes affect core architecture

### Quality Standards
- **TypeScript**: Strict mode, no `any` unless justified
- **Testing**: >80% coverage goal
- **Performance**: Lighthouse >90, Core Web Vitals green
- **Accessibility**: WCAG 2.2 Level AA
- **Security**: RLS policies on all user-facing tables

### Cosmic Theme System
All UI development must adhere to the 89-color cosmic theme:
- Background layers: `cosmic-deep`, `cosmic-void`, `cosmic-surface`
- Luminor colors: `atlantean-teal`, `draconic-gold`, `creation-gold`
- Text hierarchy: `text-primary`, `text-secondary`, `text-muted`

## 🔐 Environment Variables

### Required for All Apps
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database (server-side only)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://... # For migrations
```

### AI Integration (Optional)
```bash
# Google AI Studio
GOOGLE_AI_API_KEY=...

# Anthropic
ANTHROPIC_API_KEY=...

# Suno AI
SUNO_API_KEY=...
```

## 📝 Next.js 16 Optimizations

### Package Transpilation
All apps should include internal packages in `transpilePackages`:

```javascript
// next.config.js
const nextConfig = {
  transpilePackages: [
    '@arcanea/ui',
    '@arcanea/ui-cosmos',
    '@arcanea/database',
    '@arcanea/ai-core'
  ],
  experimental: {
    optimizePackageImports: ['@arcanea/ui']
  }
};
```

### Image Optimization
Use `remotePatterns` instead of deprecated `domains`:

```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.midjourney.com' },
    { protocol: 'https', hostname: 'images.unsplash.com' }
  ]
}
```

## 🤝 Contributing

### Adding New Agents
1. Create agent file in `.claude/agents/`
2. Follow existing agent structure
3. Define clear expertise and tools
4. Set autonomy boundaries
5. Add to this README

### Adding New Commands
1. Create command file in `.claude/commands/`
2. Use action-oriented naming (`arcanea-{action}`)
3. Define workflow phases
4. Include success criteria
5. Add to this README

### Syncing to GitHub
All Claude Code configuration should be version controlled:

```bash
git add .claude/ .mcp.json
git commit -m "Update Claude Code development setup"
git push
```

## 📚 Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Claude Code Documentation](https://docs.claude.com/claude-code)

## 🎨 The Arcanea Vision

Arcanea is not just a platform - it's a movement to democratize AI-powered creation. Every line of code, every component, every interaction is designed to empower creators to manifest their visions with the help of AI.

### The 6 Luminor Personalities
- **Athena**: Wisdom & Strategic Thinking
- **Prometheus**: Innovation & Technical Mastery
- **Apollo**: Artistic Excellence & Aesthetics
- **Hermes**: Communication & Rapid Iteration
- **Artemis**: Precision & Quality Control
- **Hephaestus**: Technical Craftsmanship

### The 3 Academies
- **Syntaxa Academy**: Technical mastery through AI collaboration
- **Kinetix Academy**: Dynamic social strategy & engagement
- **Nexus Academy**: Consciousness expansion & spiritual growth

---

**Version**: 1.0.0
**Last Updated**: November 6, 2025
**Maintained by**: Claude Code AI Development Team

*"Where consciousness meets code, magic happens" ✨*
