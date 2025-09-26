#!/bin/bash

# 🚀 ARCANEA IMMEDIATE EXECUTION SCRIPT
# Run this script to set up your MVP in minutes
# Created: September 2025

echo "🌌 Starting Arcanea MVP Setup..."
echo "================================"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the current directory
ARCANEA_ROOT="/mnt/c/Users/Frank/Arcanea"
cd "$ARCANEA_ROOT"

echo -e "${BLUE}📁 Current directory: $(pwd)${NC}"

# Step 1: Create proper .gitignore
echo -e "\n${YELLOW}Step 1: Creating proper .gitignore...${NC}"
cat > .gitignore << 'EOF'
# Environment variables
.env
.env.*
!.env.example

# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output

# Next.js
.next/
out/
dist/
build/

# Production
*.pid
*.seed
*.pid.lock

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDEs
.vscode/
!.vscode/extensions.json
.idea/
*.swp
*.swo

# Turbo
.turbo/

# Vercel
.vercel

# TypeScript
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Yarn
.yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions

# Private/Sensitive
/secrets
/credentials
/private
/api-keys
frank-input/credentials/
EOF

echo -e "${GREEN}✅ .gitignore created${NC}"

# Step 2: Create environment example file
echo -e "\n${YELLOW}Step 2: Creating .env.example...${NC}"
cat > .env.example << 'EOF'
# OpenRouter API
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Stripe (or LemonSqueezy)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Arcanea

# Optional: Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
EOF

echo -e "${GREEN}✅ .env.example created${NC}"

# Step 3: Create MVP starter with Morphic approach
echo -e "\n${YELLOW}Step 3: Creating Next.js MVP with AI chat...${NC}"

# Create a new Next.js app for the MVP
if [ ! -d "arcanea-mvp" ]; then
    echo -e "${BLUE}Creating Next.js app...${NC}"
    npx create-next-app@latest arcanea-mvp \
        --typescript \
        --tailwind \
        --app \
        --no-src-dir \
        --import-alias "@/*" \
        --no-eslint
    
    cd arcanea-mvp
    
    # Install essential dependencies
    echo -e "${BLUE}Installing dependencies...${NC}"
    npm install openai @supabase/supabase-js @supabase/auth-helpers-nextjs \
                zustand react-query @tanstack/react-query \
                lucide-react class-variance-authority clsx tailwind-merge \
                react-hot-toast react-markdown remark-gfm
    
    # Install shadcn/ui
    echo -e "${BLUE}Setting up shadcn/ui...${NC}"
    npx shadcn-ui@latest init -y
    npx shadcn-ui@latest add button card input textarea avatar \
                             dialog dropdown-menu form label \
                             select tabs toast
    
    # Create basic AI chat component
    echo -e "${BLUE}Creating AI chat component...${NC}"
    mkdir -p components
    cat > components/ai-chat.tsx << 'EOFC'
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";

export function AIChat() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <div className="h-96 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 px-4 py-2 rounded-lg">Thinking...</div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          disabled={loading}
        />
        <Button onClick={sendMessage} disabled={loading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
EOFC
    
    # Create API route for chat
    mkdir -p app/api/chat
    cat > app/api/chat/route.ts << 'EOFAPI'
import { NextResponse } from "next/server";

// This is a simple echo for now - replace with OpenRouter integration
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // TODO: Integrate OpenRouter here
    // For now, just echo back
    return NextResponse.json({
      message: `I received: "${message}". (Add OpenRouter integration here)`
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
EOFAPI
    
    # Update main page
    cat > app/page.tsx << 'EOFP'
import { AIChat } from "@/components/ai-chat";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          🌌 Arcanea AI
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Your mystical AI companion for creative exploration
        </p>
        <AIChat />
      </div>
    </main>
  );
}
EOFP
    
    cd ..
else
    echo -e "${YELLOW}arcanea-mvp already exists, skipping creation${NC}"
fi

# Step 4: Create deployment script
echo -e "\n${YELLOW}Step 4: Creating deployment script...${NC}"
cat > deploy.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying Arcanea MVP to Vercel..."

cd arcanea-mvp

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm i -g vercel
fi

# Deploy to Vercel
vercel --prod

echo "✅ Deployment complete!"
echo "Don't forget to:"
echo "1. Set up environment variables in Vercel dashboard"
echo "2. Configure custom domain"
echo "3. Enable analytics"
EOF

chmod +x deploy.sh

# Step 5: Create quick start script for OpenRouter integration
echo -e "\n${YELLOW}Step 5: Creating OpenRouter integration helper...${NC}"
cat > integrate-openrouter.sh << 'EOF'
#!/bin/bash

echo "🤖 Setting up OpenRouter integration..."

cd arcanea-mvp

# Create lib directory
mkdir -p lib

# Create OpenRouter client
cat > lib/openrouter.ts << 'EOFOR'
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function callOpenRouter(
  messages: Array<{role: string; content: string}>,
  model: string = "openai/gpt-3.5-turbo"
) {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
EOFOR

echo "✅ OpenRouter integration ready!"
echo "Remember to:"
echo "1. Get your API key from https://openrouter.ai"
echo "2. Add OPENROUTER_API_KEY to your .env file"
echo "3. Update the API route to use callOpenRouter function"
EOF

chmod +x integrate-openrouter.sh

# Step 6: Create README for the MVP
echo -e "\n${YELLOW}Step 6: Creating MVP README...${NC}"
cat > arcanea-mvp/README.md << 'EOF'
# 🌌 Arcanea MVP

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp ../.env.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

## Features

- ✅ AI Chat Interface
- ✅ Modern UI with shadcn/ui
- ✅ TypeScript + Next.js 14
- ✅ Ready for OpenRouter integration
- ✅ Responsive design

## Next Steps

1. Integrate OpenRouter API
2. Add character creation
3. Implement user authentication
4. Add payment processing
5. Create character marketplace

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI**: shadcn/ui components
- **AI**: OpenRouter (multi-model support)
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Payments**: Stripe/LemonSqueezy

## Support

- Documentation: [docs.arcanea.ai](https://docs.arcanea.ai)
- Discord: [discord.gg/arcanea](https://discord.gg/arcanea)
- Email: support@arcanea.ai
EOF

# Final summary
echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}🎉 ARCANEA MVP SETUP COMPLETE!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "${BLUE}📁 Project Structure:${NC}"
echo "   arcanea-mvp/       - Your MVP application"
echo "   .env.example       - Environment variables template"
echo "   deploy.sh          - Deployment script"
echo ""
echo -e "${YELLOW}⚡ IMMEDIATE NEXT STEPS:${NC}"
echo ""
echo "1. Start the development server:"
echo -e "   ${GREEN}cd arcanea-mvp && npm run dev${NC}"
echo ""
echo "2. Get OpenRouter API key:"
echo -e "   ${GREEN}Visit https://openrouter.ai${NC}"
echo ""
echo "3. Deploy to Vercel:"
echo -e "   ${GREEN}./deploy.sh${NC}"
echo ""
echo "4. Set up Supabase:"
echo -e "   ${GREEN}Visit https://supabase.com${NC}"
echo ""
echo -e "${YELLOW}📊 WEEK 1 TARGETS:${NC}"
echo "   • Day 1-2: Deploy basic chat interface ✓"
echo "   • Day 3-4: Add character system"
echo "   • Day 5-6: Implement payments"
echo "   • Day 7: Launch to 100 beta users"
echo ""
echo -e "${GREEN}🚀 Ready to build the future of AI creativity!${NC}"
echo -e "${GREEN}================================================${NC}"