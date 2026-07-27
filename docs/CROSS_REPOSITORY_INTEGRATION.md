# Cross-Repository Integration Guide

## 🔄 **Integration Architecture**

The Arcanea ecosystem historically used a **hub-and-spoke model**. Automatic synchronization is disabled; the repositories below are independently maintained until a replacement contract is explicitly ratified.

### Repository Structure

```
arcanea (main hub)
├── frankxai/arcanea-mobile (extracted)
├── frankxai/arcanea-prompt-language (extracted)
└── frankxai/arcanean-library (extracted)
```

## 🤖 **Automated Synchronization**

> **Current state (updated 2026-07-27):** automatic triggers are disabled. Every scheduled run from 2026-02-24 until disablement failed because `PERSONAL_ACCESS_TOKEN` was absent; no content synced in that window. The target repositories have therefore drifted and are independently maintained. Do not restore credentials or backfill blindly: the legacy APL job deletes target TypeScript files and the library job uses `rsync --delete`.

### Cross-Repository Sync Workflow
**File**: `.github/workflows/cross-repo-sync.yml`

#### Triggers
- **Automatic triggers:** disabled
- **Manual dispatch:** retained for controlled diagnosis only; do not run until ownership, dry-run diff, rollback, and least-privilege credential gates are reviewed

#### Sync Process
1. **Detect Changes**: Monitor specific paths for updates
2. **Sync Content**: Copy updated content to standalone repositories
3. **Version Bump**: Automatically increment patch version
4. **Commit & Push**: Update standalone repositories
5. **Trigger Deployments**: Initiate deployment workflows

### Supported Synchronization Paths

| Source Path | Target Repository | Sync Type |
|-------------|------------------|-----------|
| `packages/ai-core/` | `arcanea-prompt-language` | Full content sync |
| `apps/library/` | `arcanean-library` | App content sync |
| `apps/mobile/` | `arcanea-mobile` | Manual extraction |

## 🚀 **Deployment Integration**

### Application Deployment Workflow
**File**: `.github/workflows/deploy-apps.yml`

#### Supported Applications
- **Studio App** (`apps/studio/`) → `studio.arcanea.ai`
- **Gallery App** (`apps/gallery/`) → `gallery.arcanea.ai`
- **Library App** (`apps/library/`) → `library.arcanea.ai`
- **Web App** (`apps/web/`) → `arcanea.ai`

#### Deployment Process
1. **Change Detection**: Monitor app-specific paths
2. **Test & Build**: Run type-check, lint, and build
3. **Deploy to Vercel**: Deploy changed apps to production
4. **Status Updates**: Report deployment success/failure

## 🔐 **Required Secrets**

### GitHub Repository Secrets

```env
# Cross-repository access
PERSONAL_ACCESS_TOKEN=ghp_xxx...

# Vercel deployment
VERCEL_TOKEN=xxx...
VERCEL_ORG_ID=team_xxx...
VERCEL_STUDIO_PROJECT_ID=prj_xxx...
VERCEL_GALLERY_PROJECT_ID=prj_xxx...
VERCEL_LIBRARY_PROJECT_ID=prj_xxx...
VERCEL_WEB_PROJECT_ID=prj_xxx...

# Mobile app deployment (for arcanea-mobile)
EXPO_TOKEN=xxx...
EXPO_APPLE_ID=xxx...
EXPO_APPLE_PASSWORD=xxx...
EXPO_GOOGLE_SERVICE_ACCOUNT_KEY=xxx...
```

## 📦 **Package Management Integration**

### Workspace Dependencies
Standalone repositories remove workspace dependencies:

```json
// Before (in monorepo)
{
  "dependencies": {
    "@arcanea/ui": "workspace:*",
    "@arcanea/ai-core": "workspace:*"
  }
}

// After (in standalone)
{
  "dependencies": {
    "@arcanea/ui": "^1.0.0", // Published NPM package
    "@arcanea/prompt-language": "^1.0.0" // Standalone package
  }
}
```

### NPM Package Publishing
Standalone repositories can publish to NPM:

```bash
# Arcanea Prompt Language
npm publish @arcanea/prompt-language

# Arcanean Library (content package)
npm publish arcanean-library-content
```

## 🔄 **Development Workflow**

### Making Changes

#### For Prompt Language (APL)
1. **Edit in main repo**: `packages/ai-core/`
2. **Commit to main**: Does not update the standalone repository
3. **Port and review intentionally** in `arcanea-prompt-language`; record source and target commit SHAs
4. **NPM publish**: Manual step for package releases

#### For Library Content
1. **Edit in main repo**: `apps/library/`
2. **Commit to main**: Does not update the standalone repository
3. **Port, review, and deploy intentionally** from `arcanean-library`

#### For Mobile App
1. **Edit in standalone**: `arcanea-mobile` repository
2. **CI/CD handles**: Testing, building, and app store submission

### Local Development

#### Working with Main Repository
```bash
# Clone main repository
git clone https://github.com/frankxai/arcanea.git
cd arcanea

# Install dependencies
pnpm install

# Work on any app or package
pnpm dev --filter=@arcanea/studio
```

#### Working with Standalone Repositories
```bash
# Clone specific repository
git clone https://github.com/frankxai/arcanea-prompt-language.git
cd arcanea-prompt-language

# Install and develop
npm install
npm run dev
```

## 📊 **Monitoring & Maintenance**

### Sync Status Monitoring
- **GitHub Actions**: Monitor workflow runs
- **Status:** automatic sync disabled; no daily report is expected
- **Drift control:** compare source/target commits before any manual port

### Version Management
- **Automatic Versioning**: Patch version bumps on sync
- **Manual Releases**: Major/minor version updates
- **Changelog Generation**: Automated from commit messages

### Health Checks
- **Repository ownership:** standalone repositories remain independent until a tested replacement exists
- **Deployment Verification**: Confirms successful deployments
- **Dependency Updates**: Regular maintenance workflows

## 🛠️ **Troubleshooting**

### Common Issues

#### Sync Failures
```bash
# Check workflow logs
gh run list --repo frankxai/arcanea --workflow="Cross-Repository Synchronization"

# Do not manually dispatch the legacy sync. Inspect it and prepare a dry-run diff first.
gh workflow view "Cross-Repository Synchronization" --repo frankxai/arcanea
```

#### Deployment Failures
```bash
# Check Vercel deployments
vercel ls --team frankxai

# Redeploy manually
vercel --prod --cwd apps/studio
```

#### Version Conflicts
```bash
# Reset standalone repository
cd arcanea-prompt-language
git reset --hard origin/main
```

### Emergency Procedures

#### Cross-repository recovery
Do not use the legacy workflow as an emergency backfill. First snapshot both target repositories, produce a non-destructive source-to-target diff, define ownership for every deleted path, test rollback, and obtain explicit approval for the exact commit range.

#### Rollback Deployment
```bash
# Rollback to previous Vercel deployment
vercel rollback --team frankxai studio.arcanea.ai
```

## 🚀 **Future Enhancements**

### Planned Integrations
- **Automated testing**: Cross-repository test coordination
- **Dependency updates**: Synchronized package updates
- **Security scanning**: Multi-repository security monitoring
- **Performance monitoring**: Cross-deployment analytics

### Advanced Features
- **Blue-green deployments**: Zero-downtime updates
- **Feature flags**: Coordinated feature rollouts
- **A/B testing**: Cross-platform experimentation
- **Analytics aggregation**: Unified metrics dashboard

The repositories currently maintain independent release boundaries. Any future synchronization must be fail-closed, observable, non-destructive by default, and backed by explicit ownership and rollback contracts.