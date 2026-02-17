#!/bin/bash

# 🚀 Arcanea Development Environment Setup
# Automated setup for clean development start

set -e

echo "🌌 Setting up Arcanea development environment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this from ARCANEA_PRODUCTION root directory"
    exit 1
fi

echo "📦 Installing dependencies..."
if command -v pnpm &> /dev/null; then
    pnpm install
else
    echo "📦 pnpm not found, installing..."
    npm install -g pnpm
    pnpm install
fi

echo "🔑 Setting up environment variables..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env from .env.example"
        echo "🔧 Please add your API keys to .env file"
        echo "   Check frank-input/apis/ folder for your keys"
    else
        echo "⚠️  No .env.example found, creating basic .env"
        cat > .env << EOF
# Arcanea Environment Variables
SUPABASE_URL=
SUPABASE_ANON_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
EOF
    fi
else
    echo "✅ .env file already exists"
fi

echo "🏗️  Setting up database..."
if command -v supabase &> /dev/null; then
    echo "✅ Supabase CLI found"
    # Add database setup commands here when ready
else
    echo "📝 Note: Install Supabase CLI for database management"
    echo "   npm install -g supabase"
fi

echo "🧪 Setting up development tools..."
# Install development dependencies if not already installed
if [ ! -d "node_modules/@types" ]; then
    pnpm add -D @types/node typescript
fi

echo "📁 Creating necessary directories..."
mkdir -p logs
mkdir -p uploads
mkdir -p .temp

echo "🎯 Checking for required API keys..."
source .env 2>/dev/null || echo "Note: .env file needs to be configured"

MISSING_KEYS=""
if [ -z "$OPENAI_API_KEY" ]; then MISSING_KEYS="$MISSING_KEYS OpenAI"; fi
if [ -z "$SUPABASE_URL" ]; then MISSING_KEYS="$MISSING_KEYS Supabase"; fi

if [ -n "$MISSING_KEYS" ]; then
    echo "⚠️  Missing API keys:$MISSING_KEYS"
    echo "   Add them to .env file before starting development"
    echo "   Check frank-input/apis/ for your keys"
fi

echo "🔍 Running health check..."
if pnpm run build --dry-run &>/dev/null; then
    echo "✅ Build configuration looks good"
else
    echo "⚠️  Build issues detected, check package.json scripts"
fi

echo ""
echo "🎉 Development environment setup complete!"
echo ""
echo "🚀 Next steps:"
echo "   1. Add your API keys to .env file"
echo "   2. Run: pnpm dev"
echo "   3. Start building your realm platform!"
echo ""
echo "📚 Helpful commands:"
echo "   pnpm dev          - Start development server"
echo "   pnpm build        - Build for production"
echo "   pnpm test         - Run tests"
echo "   pnpm lint         - Check code quality"
echo ""
echo "🌟 Happy building! 🌟"