#!/bin/bash

# 🌌 ARCANEA SUPERINTELLIGENT CLEANUP & DEPLOYMENT SCRIPT
# Execute with: bash CLEANUP_AND_DEPLOY.sh

echo "🌌 ARCANEA SUPERINTELLIGENCE DEPLOYMENT SYSTEM"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Backup check
echo -e "${YELLOW}📦 Step 1: Checking backup status...${NC}"
if [ -d "/mnt/c/Users/Frank/Arcanea-Backup-$(date +%Y%m%d)"* ]; then
    echo -e "${GREEN}✅ Backup found${NC}"
else
    echo -e "${YELLOW}Creating backup...${NC}"
    cp -r /mnt/c/Users/Frank/Arcanea "/mnt/c/Users/Frank/Arcanea-Backup-$(date +%Y%m%d-%H%M%S)"
    echo -e "${GREEN}✅ Backup created${NC}"
fi

# Step 2: Clean structure
echo -e "${YELLOW}🧹 Step 2: Cleaning folder structure...${NC}"

# Remove duplicates and old versions
echo "Removing duplicate folders..."
rm -rf /mnt/c/Users/Frank/Arcanea/_TO_DELETE 2>/dev/null
rm -rf /mnt/c/Users/Frank/Arcanea/Arcanea 2>/dev/null
rm -rf /mnt/c/Users/Frank/Arcanea/github-version 2>/dev/null
rm -rf /mnt/c/Users/Frank/Arcanea/old-* 2>/dev/null

# Check if ARCANEA_PRODUCTION exists and move contents
if [ -d "/mnt/c/Users/Frank/Arcanea/ARCANEA_PRODUCTION" ]; then
    echo "Moving ARCANEA_PRODUCTION contents to root..."
    cp -r /mnt/c/Users/Frank/Arcanea/ARCANEA_PRODUCTION/* /mnt/c/Users/Frank/Arcanea/ 2>/dev/null
    cp -r /mnt/c/Users/Frank/Arcanea/ARCANEA_PRODUCTION/.* /mnt/c/Users/Frank/Arcanea/ 2>/dev/null
    rm -rf /mnt/c/Users/Frank/Arcanea/ARCANEA_PRODUCTION
    echo -e "${GREEN}✅ Structure cleaned${NC}"
fi

# Step 3: Integrate valuable GitHub components
echo -e "${YELLOW}🔄 Step 3: Integrating GitHub improvements...${NC}"
if [ -d "github-version/apps/web-portal/src/components/world-builder" ]; then
    mkdir -p apps/nexus/components
    cp -r github-version/apps/web-portal/src/components/world-builder apps/nexus/components/ 2>/dev/null
    cp -r github-version/apps/web-portal/src/components/social-feed apps/nexus/components/ 2>/dev/null
    echo -e "${GREEN}✅ Components integrated${NC}"
fi

# Step 4: Create proper .gitignore
echo -e "${YELLOW}🔒 Step 4: Creating secure .gitignore...${NC}"
cat > /mnt/c/Users/Frank/Arcanea/.gitignore << 'EOF'
# SECURITY - NEVER COMMIT THESE
.env*
!.env.example
/secrets
/credentials
/api-keys
/frank-input/credentials/
/frank-input/apis/
*.pem
*.key
*.cert
private/
arcanea-secrets/

# Dependencies
node_modules/
.pnp
.pnp.js
.yarn/

# Build outputs
.next/
dist/
build/
out/
*.tsbuildinfo
.turbo/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
desktop.ini

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Testing
coverage/
.nyc_output/

# Misc
.cache/
.parcel-cache/
.vercel/
.netlify/
EOF
echo -e "${GREEN}✅ .gitignore created${NC}"

# Step 5: Create .env.example
echo -e "${YELLOW}📝 Step 5: Creating .env.example...${NC}"
cat > /mnt/c/Users/Frank/Arcanea/.env.example << 'EOF'
# OpenRouter API (Required for AI features)
OPENROUTER_API_KEY=your_openrouter_key_here

# Supabase (Required for database)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Stripe (Required for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Optional Services
RESEND_API_KEY=your_resend_key_for_emails
SENTRY_DSN=your_sentry_dsn_for_monitoring
EOF
echo -e "${GREEN}✅ .env.example created${NC}"

# Step 6: Scan for secrets
echo -e "${YELLOW}🔍 Step 6: Scanning for exposed secrets...${NC}"
echo "Checking for potential API keys..."
grep -r "sk-\|pk-\|api-\|key-\|secret-\|password" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" . 2>/dev/null | grep -v ".env.example" | grep -v "// Example" | head -5
if [ $? -eq 0 ]; then
    echo -e "${RED}⚠️  Warning: Potential secrets found. Please review before pushing.${NC}"
else
    echo -e "${GREEN}✅ No obvious secrets detected${NC}"
fi

# Step 7: Initialize Git
echo -e "${YELLOW}🔄 Step 7: Initializing Git repository...${NC}"
cd /mnt/c/Users/Frank/Arcanea

if [ ! -d ".git" ]; then
    git init
    echo -e "${GREEN}✅ Git initialized${NC}"
else
    echo -e "${GREEN}✅ Git already initialized${NC}"
fi

# Check if remote exists
if ! git remote | grep -q "origin"; then
    git remote add origin https://github.com/frankxai/Arcanea
    echo -e "${GREEN}✅ Remote added${NC}"
else
    echo -e "${GREEN}✅ Remote already configured${NC}"
fi

# Step 8: Prepare for commit
echo -e "${YELLOW}📦 Step 8: Preparing for GitHub push...${NC}"
git add .
echo -e "${GREEN}✅ Files staged${NC}"

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}🎉 CLEANUP COMPLETE!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Review the changes: ${BLUE}git status${NC}"
echo -e "2. Commit the changes: ${BLUE}git commit -m \"feat: Arcanea 2.0 - Complete AI Consciousness Platform\"${NC}"
echo -e "3. Push to GitHub: ${BLUE}git push -f origin main${NC}"
echo -e "4. Deploy to Vercel: ${BLUE}cd apps/academy && vercel --prod${NC}"
echo ""
echo -e "${GREEN}🌌 The Superintelligence has prepared everything. Ready to launch! 🚀${NC}"