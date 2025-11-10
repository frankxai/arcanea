# Arcanea MVP Architecture

**Version:** 1.0.0
**Last Updated:** October 23, 2025
**Status:** Foundation Phase

## Table of Contents

1. [Vision & Strategy](#vision--strategy)
2. [Architecture Overview](#architecture-overview)
3. [Tech Stack](#tech-stack)
4. [System Design](#system-design)
5. [Five-Department Approach](#five-department-approach)
6. [Development Phases](#development-phases)
7. [Team Structure](#team-structure)
8. [Integration Strategy](#integration-strategy)

---

## Vision & Strategy

### MVP Goal

Build a **conversational AI platform** where users can chat with specialized AI assistants (Luminors) across five creative departments:

1. **World Building** - Create fictional worlds, lore, characters
2. **Music Lab** - Generate lyrics, melodies, production
3. **Art Studio** - Visual design, illustration, digital art
4. **Code Academy** - Learn programming, build projects
5. **Personal Growth** - Life coaching, wellness, mindfulness

### Strategic Decisions

**Why Vercel AI Chatbot Template?**
- ✅ Production-ready foundation (18.4k stars)
- ✅ Best practices for AI chatbots
- ✅ Optimized streaming responses
- ✅ Server Components + Server Actions
- ✅ Fast to customize, fast to deploy

**Why Gemini 2.0 Flash?**
- ✅ 1M token context window (massive!)
- ✅ Fast inference (<2s typical)
- ✅ Multimodal ready (text, images, audio)
- ✅ Free tier for MVP testing
- ✅ Strong creative capabilities

**Why Supabase?**
- ✅ PostgreSQL (robust, scalable)
- ✅ Built-in auth and storage
- ✅ Real-time subscriptions
- ✅ Row-level security (RLS)
- ✅ Free tier, pay-as-you-grow

**Philosophy:**
> "Use proven tools. Focus on what makes Arcanea unique."

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│              (Next.js 15 + React 19)                    │
│         Components │ Pages │ Layouts │ Styles          │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                  Application Layer                       │
│                  (App Router + RSC)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  API Routes  │  │Server Actions│  │  Middleware  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────▼──────┐ ┌───▼────────┐ ┌─▼──────────────┐
│  Gemini AI   │ │  Database  │ │  Auth & Cache  │
│ (2.0 Flash)  │ │ (Supabase) │ │(NextAuth+Redis)│
│  via AI SDK  │ │ PostgreSQL │ │   (optional)   │
└──────────────┘ └────────────┘ └────────────────┘
```

### Request Flow

**Chat Message Example:**

```
1. User types message → Chat UI Component

2. Submit → Server Action (app/actions/chat.ts)

3. Server Action:
   - Validates input
   - Checks auth (NextAuth session)
   - Fetches conversation history (Drizzle ORM)
   - Calls Gemini API (Vercel AI SDK)
   - Streams response chunks

4. Response streams to UI → React hooks display

5. Save to database → Supabase PostgreSQL

6. Update bond level → Background task
```

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.3+ | React framework, App Router |
| **React** | 19.0+ | UI library |
| **TypeScript** | 5.5+ | Type safety |
| **Tailwind CSS** | 3.4+ | Styling |
| **Radix UI** | Latest | Accessible components |
| **shadcn/ui** | Latest | Component library |
| **Lucide React** | 0.302+ | Icons |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js API Routes** | 15.3+ | Backend APIs |
| **Server Actions** | Next.js | Data mutations |
| **Drizzle ORM** | 0.34+ | Database ORM |
| **NextAuth.js** | 5.0 beta | Authentication |
| **Zod** | 3.25+ | Schema validation |

### AI & ML

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vercel AI SDK** | 5.0+ | Unified AI interface |
| **@ai-sdk/google** | 1.0+ | Gemini provider |
| **@ai-sdk/react** | 2.0+ | React hooks |
| **Gemini 2.0 Flash** | Latest | LLM model |

### Database & Storage

| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | Latest | Database platform |
| **PostgreSQL** | 15+ | Relational database |
| **Drizzle Kit** | 0.25+ | Migrations |
| **Vercel Blob** | Latest | File storage (future) |

### DevOps

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vercel** | Latest | Hosting & deployment |
| **pnpm** | 8.15+ | Package manager |
| **Turbo** | 1.11+ | Monorepo build system |
| **GitHub Actions** | - | CI/CD (future) |

---

## System Design

### Database Schema

**Core Tables:**

```sql
-- Users & Auth
users (id, email, name, avatar_url, created_at)
sessions (id, user_id, expires_at)

-- Conversations
chats (id, user_id, department, title, created_at)
messages (id, chat_id, role, content, tokens, created_at)

-- Departments & Luminors
departments (id, name, slug, description, icon)
luminors (id, department_id, name, personality, system_prompt)

-- User Progress
user_luminor_bonds (user_id, luminor_id, level, xp, last_interaction)
user_projects (id, user_id, department_id, title, data, status)

-- Generated Content
creations (id, user_id, type, title, content, metadata)
assets (id, creation_id, type, url, size)
```

**See detailed schema:** [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)

### API Design

**RESTful Endpoints:**

```typescript
// Chat
POST   /api/chat              // Create/continue conversation
GET    /api/chat/:id          // Get conversation
DELETE /api/chat/:id          // Delete conversation

// Departments
GET    /api/departments       // List all departments
GET    /api/departments/:slug // Get department details

// Luminors
GET    /api/luminors          // List all Luminors
GET    /api/luminors/:id      // Get Luminor details
GET    /api/luminors/:id/bond // Get user's bond with Luminor

// Projects
GET    /api/projects          // List user's projects
POST   /api/projects          // Create project
PATCH  /api/projects/:id      // Update project
DELETE /api/projects/:id      // Delete project

// User
GET    /api/user/profile      // Get current user
PATCH  /api/user/profile      // Update profile
GET    /api/user/stats        // Get user stats
```

**Server Actions:**

```typescript
// Direct database mutations (no API layer)
async function sendMessage(chatId, content)
async function createProject(data)
async function updateBondLevel(luminorId, xpGain)
async function saveCreation(data)
```

### AI Integration

**Gemini Client Setup:**

```typescript
// lib/ai/gemini-client.ts
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, streamText } from 'ai';

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export const defaultModel = google('gemini-2.0-flash-001', {
  maxTokens: 8192,
  temperature: 0.7,
});

// Streaming chat
export async function streamChat(
  messages: Message[],
  luminorPrompt: string
) {
  return streamText({
    model: defaultModel,
    system: luminorPrompt,
    messages,
  });
}

// Single generation
export async function generateResponse(
  prompt: string,
  context?: string
) {
  const { text } = await generateText({
    model: defaultModel,
    prompt: [context, prompt].filter(Boolean).join('\n\n'),
  });

  return text;
}
```

**Luminor Personalities:**

Each Luminor has a unique system prompt:

```typescript
// Example: Lumina (Art Studio)
const LUMINA_PROMPT = `You are Lumina, a wise and creative AI guide
specializing in visual arts. You help users:
- Develop artistic concepts
- Choose color palettes
- Understand composition
- Generate image descriptions
- Learn art history

Your personality: Encouraging, patient, visually descriptive.
Always provide actionable creative direction.`;
```

### Authentication Flow

```typescript
// NextAuth.js v5 configuration
// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
})
```

---

## Five-Department Approach

### Department Structure

Each department is a specialized AI assistant team:

```typescript
interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  luminors: Luminor[];
  features: Feature[];
}

interface Luminor {
  id: string;
  name: string;
  departmentId: string;
  role: string; // "guide", "specialist", "mentor"
  personality: string;
  systemPrompt: string;
  avatar: string;
}
```

### 1. World Building Department

**Luminor:** Mythara

**Capabilities:**
- Character creation and development
- World lore and history
- Magic systems and rules
- Geography and maps
- Conflict and plot development

**Example Interaction:**
```
User: "I want to create a fantasy world with crystal-powered magic."
Mythara: "Fascinating! Let's develop this. First, tell me:
- How common are these crystals?
- What happens when they're depleted?
- Are there different types with different powers?"
```

### 2. Music Lab Department

**Luminor:** Harmonix

**Capabilities:**
- Lyric writing and poetry
- Melody suggestions (text descriptions)
- Song structure guidance
- Music theory education
- Production tips

**Example Interaction:**
```
User: "Help me write a chorus about overcoming fear."
Harmonix: "Let's craft something powerful. What emotion do you
want at the peak of the chorus? Triumph? Relief? Determination?"
```

### 3. Art Studio Department

**Luminor:** Lumina

**Capabilities:**
- Visual concept development
- Color palette suggestions
- Composition guidance
- Art style education
- Image prompt generation

**Example Interaction:**
```
User: "I need a character design for a cyberpunk hacker."
Lumina: "Exciting! Let's define their visual identity:
- Color scheme: Neon accents on dark clothing?
- Key elements: Holographic displays, tech implants?
- Mood: Rebellious? Mysterious? Tech-savvy cool?"
```

### 4. Code Academy Department

**Luminor:** Syntax

**Capabilities:**
- Programming tutorials
- Code review and debugging
- Project architecture advice
- Best practices teaching
- Algorithm explanation

**Example Interaction:**
```
User: "How do I build a REST API in Node.js?"
Syntax: "Great question! Let's break this down step-by-step:
1. Set up Express.js server
2. Define routes and endpoints
3. Connect to database
4. Add error handling
Which part would you like to start with?"
```

### 5. Personal Growth Department

**Luminor:** Serenity

**Capabilities:**
- Goal setting and planning
- Mindfulness guidance
- Productivity advice
- Emotional support
- Habit formation

**Example Interaction:**
```
User: "I'm feeling overwhelmed with my creative projects."
Serenity: "I hear you. Let's create clarity together.
Can you list your current projects? We'll prioritize and
create a manageable plan that honors your energy."
```

### Department Navigation

```typescript
// components/DepartmentSelector.tsx
function DepartmentSelector() {
  const departments = [
    {
      name: "World Building",
      icon: "🌍",
      path: "/world-building",
      luminor: "Mythara"
    },
    {
      name: "Music Lab",
      icon: "🎵",
      path: "/music-lab",
      luminor: "Harmonix"
    },
    {
      name: "Art Studio",
      icon: "🎨",
      path: "/art-studio",
      luminor: "Lumina"
    },
    {
      name: "Code Academy",
      icon: "💻",
      path: "/code-academy",
      luminor: "Syntax"
    },
    {
      name: "Personal Growth",
      icon: "🌱",
      path: "/personal-growth",
      luminor: "Serenity"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {departments.map(dept => (
        <DepartmentCard key={dept.path} {...dept} />
      ))}
    </div>
  );
}
```

---

## Development Phases

### Phase 1: Foundation (Week 1-2)

**Goal:** Single department working end-to-end

**Tasks:**
- ✅ Setup development environment
- ✅ Install dependencies
- ✅ Configure Gemini AI
- ✅ Setup Supabase database
- [ ] Implement basic chat UI
- [ ] Create World Building department
- [ ] Deploy to Vercel staging

**Success Criteria:**
- User can sign in
- User can chat with Mythara
- Messages persist to database
- Streaming responses work
- Bond level increases

### Phase 2: Expansion (Week 3-4)

**Goal:** All five departments operational

**Tasks:**
- [ ] Implement Music Lab (Harmonix)
- [ ] Implement Art Studio (Lumina)
- [ ] Implement Code Academy (Syntax)
- [ ] Implement Personal Growth (Serenity)
- [ ] Build department switcher
- [ ] Add user dashboard

**Success Criteria:**
- All 5 Luminors respond correctly
- Users can switch departments
- Separate conversation threads
- Individual bond levels per Luminor

### Phase 3: Enhancement (Week 5-6)

**Goal:** Rich features and polish

**Tasks:**
- [ ] Add file uploads (images, audio)
- [ ] Implement project system
- [ ] Add creation gallery
- [ ] Build user profiles
- [ ] Add social features (likes, comments)
- [ ] Implement search

**Success Criteria:**
- Users can upload reference files
- Projects save and organize content
- Gallery showcases user work
- Profile shows stats and achievements

### Phase 4: Launch Prep (Week 7-8)

**Goal:** Production-ready MVP

**Tasks:**
- [ ] Performance optimization
- [ ] Mobile responsive design
- [ ] Error handling and logging
- [ ] Rate limiting
- [ ] Analytics integration
- [ ] Beta testing with users

**Success Criteria:**
- <2s page load
- Works on mobile
- Zero critical bugs
- Handles 100 concurrent users
- 10+ beta testers onboarded

---

## Team Structure

### Development Team Roles

**1. Database Designer**
- Design schema for all features
- Set up RLS policies
- Create indexes
- Write migrations
- Generate TypeScript types

**2. Backend Engineer**
- Build API routes
- Implement server actions
- Integrate Gemini AI
- Add error handling
- Optimize performance

**3. Frontend Engineer**
- Build UI components
- Implement chat interface
- Create department pages
- Add responsive design
- Handle loading states

**4. DevOps Engineer**
- Configure Vercel deployment
- Set up environment variables
- Implement monitoring
- Create CI/CD pipeline
- Manage staging environment

**5. QA / Testing**
- Write test cases
- Test all user flows
- Report bugs
- Verify fixes
- User acceptance testing

### Collaboration Workflow

```
1. GitHub Issues: Track all tasks
2. Pull Requests: Code review required
3. Main Branch: Protected, CI must pass
4. Staging: Auto-deploy from main
5. Production: Manual deploy after QA
```

---

## Integration Strategy

### From Vercel Template to Arcanea

**What We Keep:**
- ✅ Next.js App Router structure
- ✅ AI SDK integration patterns
- ✅ Chat UI components (customize)
- ✅ Streaming response handling
- ✅ Server Actions for mutations
- ✅ Database with Drizzle ORM

**What We Customize:**
- 🎨 Brand and styling
- 🤖 Luminor personalities
- 🏢 Five-department structure
- 📊 Bond level system
- 🎨 Project/creation system
- 👥 User profiles and social

**What We Remove:**
- ❌ Multi-provider AI gateway (Gemini only)
- ❌ xAI models
- ❌ Vercel-specific features we don't need

### Migration Path

**Step 1: Clean Clone**
```bash
# Clone template to separate directory
git clone https://github.com/vercel/ai-chatbot.git arcanea-template

# Study structure
cd arcanea-template
tree -L 2
```

**Step 2: Copy Components**
```bash
# Copy relevant components to our monorepo
cp -r arcanea-template/components/chat apps/web/components/
cp -r arcanea-template/components/ui apps/web/components/
cp arcanea-template/lib/ai apps/web/lib/
```

**Step 3: Adapt Code**
```typescript
// Before (template):
const model = getModelByProvider(provider);

// After (Arcanea):
const model = google('gemini-2.0-flash-001');
const systemPrompt = getLuminorPrompt(department);
```

**Step 4: Add Features**
```typescript
// New: Department system
// New: Luminor personalities
// New: Bond level tracking
// New: Project management
```

---

## Success Metrics

### MVP Goals

**Technical Metrics:**
- ✅ 99% uptime
- ✅ <2s response time (P95)
- ✅ <5s initial page load
- ✅ Zero critical security issues
- ✅ <10 bugs per week

**User Metrics:**
- 🎯 100 beta users
- 🎯 70% weekly retention
- 🎯 5+ messages per session
- 🎯 3+ departments used per user
- 🎯 50+ creations generated

**Business Metrics:**
- 💰 $1,000 Gemini API budget
- 💰 $0 infrastructure cost (free tiers)
- 💰 <$100/month at scale
- 📈 Ready for seed funding demo

---

## Future Roadmap

**Post-MVP Features:**

**Q1 2026:**
- Multi-modal: Image, audio, video generation
- Collaboration: Shared projects
- Marketplace: Buy/sell creations
- Mobile apps: iOS and Android

**Q2 2026:**
- API for developers
- Webhook integrations
- Advanced analytics
- White-label for businesses

**Q3 2026:**
- Fine-tuned models per department
- Voice chat with Luminors
- VR/AR experiences
- Enterprise tier

---

## Conclusion

This architecture provides:

✅ **Solid Foundation:** Proven template + best practices
✅ **Flexibility:** Easy to extend and customize
✅ **Scalability:** Handles growth from 100 to 100k users
✅ **Speed:** Fast development, fast deployment
✅ **Quality:** Type-safe, tested, production-ready

**Next Step:** Start Phase 1 development!

See [MVP_SETUP_COMPLETE.md](./MVP_SETUP_COMPLETE.md) for setup instructions.

---

**Let's build something extraordinary.** 🚀
