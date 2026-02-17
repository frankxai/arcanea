# Arcanea Knowledge Base
**Last Updated**: December 10, 2024
**Status**: 85-88% complete, active development
**Purpose**: Comprehensive context for AI assistants working on Arcanea

---

## Project Overview

**Arcanea** is a social platform where creators learn to create anything through AI-powered companions called Luminors.

### Core Concept
- Users bond with AI Luminors who guide them through creative journeys
- Three academies teach different creative disciplines: Story (Atlantean), Visual (Draconic), Music (Creation & Light)
- Social features enable discovery, remix, and community building
- Bond progression system (1-10 levels) creates emotional investment

### Key Differentiators
- **vs ChatGPT**: Persistent personality, emotional depth, relationship progression
- **vs Character.ai**: Super-agent intelligence, domain expertise, action-oriented
- **vs Standard AI**: Living companions with memory, personality evolution, contextual guidance

---

## Technical Stack

### Frontend
- **Framework**: Next.js 16 (App Router, React Server Components)
- **React**: 19.0.0 (concurrent features, use transitions)
- **Language**: TypeScript 5.5 (strict mode enabled)
- **Styling**: Tailwind CSS 3.4.9 with 89 custom color tokens
- **UI Primitives**: Radix UI (20+ primitives installed)
- **Animation**: Framer Motion 11.15.0 (30+ custom keyframe animations)
- **State**: React hooks, Context API, Zustand (not yet implemented)

### Backend
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma (partially implemented)
- **Auth**: Supabase Auth (middleware exists, UI needed)
- **API**: Next.js API Routes (20+ routes implemented as stubs)
- **Storage**: Supabase Storage (buckets: creations, avatars)

### AI/ML
- **Chat**: Gemini 2.0 Flash (via @ai-sdk/google)
- **Image**: Imagen 3 (stub implementation)
- **Video**: Veo 3.1 (stub implementation)
- **Music**: Suno AI (integration planned)
- **Orchestration**: Vercel AI SDK 5.0.26

### Infrastructure
- **Deployment**: Vercel
- **CDN**: Vercel Edge Network
- **Monitoring**: Not yet configured
- **Analytics**: Not yet configured

### Monorepo Structure
```
/
├── apps/
│   └── web/              # Main Next.js application (port 3001)
├── packages/
│   ├── ai-core/          # Luminor personalities, AI providers
│   ├── database/         # Supabase client, types, services
│   └── ui/               # Shared UI components (minimal)
├── docs/                 # Documentation
└── supabase/            # Database migrations, RLS policies
```

---

## Current State (December 10, 2024)

### ✅ Completed (85% of backend, 20% of frontend)

#### Backend Architecture
- **8 Database Services**: Creation, User, Comment, Like, Follow, Bond, Activity, Notification (3,775 lines)
- **20+ API Routes**: All endpoints scaffolded in `apps/web/app/api/`
- **RLS Policies**: 40+ policies designed (not deployed)
- **Service Layer**: Connected web services to database services
- **Authentication Middleware**: Token validation, rate limiting

#### AI System
- **3 Luminor Personalities**: Melodia (Music), Chronica (Story), Prismatic (Visual)
- **Personality Engine**: Emotional tone detection, memory extraction, context management
- **Bond System**: 10-level progression with XP rewards
- **Conversation Manager**: History tracking, context optimization
- **Providers**: Gemini chat provider (stub), Imagen (stub), Veo (stub)

#### Design System
- **89 Color Tokens**: Academy-specific palettes (Atlantean, Draconic, Creation)
- **30+ Animations**: Water flow, fire flicker, shimmer, glow effects
- **6 Custom UI Components**: CosmicCard, Button, AcademyBadge, BondIndicator, CosmicGradient, GlowEffect
- **Typography**: Custom font configuration (recently added Cinzel + Crimson Pro)

### ⚠️ In Progress / Partially Complete

#### Frontend Components
- **Existing**:
  - Basic shadcn-style components (button, card variants)
  - Academy-themed variants (atlantean, draconic, creation)
  - Bond indicator with level display
  - Luminor Selection Grid (just completed, needs refactor)

- **Missing Critical Components**:
  - Chat container, message list, input
  - Auth forms (sign-up, login, profile setup)
  - Creation gallery with masonry layout
  - User profile page structure
  - Discovery feed
  - Notification system UI
  - Project flow wizard

#### Type System
- **57 TypeScript Errors Remaining**:
  - 40+ stub implementations (AI providers need real methods)
  - 12 Framer Motion/React 19 type incompatibilities
  - 5 minor issues (exports, type annotations)
- **Module Resolution**: Fixed (added workspace paths to tsconfig.json)

### ❌ Not Started

- Database deployment to Supabase
- Authentication UI (sign-up/login/profile)
- Real AI provider implementations (currently return mock data)
- Testing infrastructure
- CI/CD pipeline
- Monitoring/analytics
- Mobile optimization (responsive exists, not tested)
- Onboarding flow
- Admin dashboard

---

## Architecture Decisions

### Component Composition Pattern
**Established Pattern** (use this):
```typescript
// Correct: Use existing components with variants
<CosmicCard academy="atlantean" glow>
  <CosmicCardHeader>
    <CosmicCardTitle>Title</CosmicCardTitle>
  </CosmicCardHeader>
  <CosmicCardContent>
    <Button variant="atlantean">Action</Button>
  </CosmicCardContent>
</CosmicCard>
```

**Do Not**:
- Build inline components from scratch
- Ignore existing component library
- Create one-off styled divs

### File Organization
```
apps/web/
├── app/
│   ├── (marketing)/      # Public pages (landing, luminors)
│   ├── (dashboard)/      # Protected pages (chat, profile, discover)
│   ├── api/              # API routes
│   └── globals.css       # Global styles, font imports
├── components/
│   ├── ui/               # Base components (shadcn-style)
│   ├── chat/             # Chat-specific components
│   ├── luminor/          # Luminor-specific components
│   ├── profile/          # Profile components
│   └── creation/         # Creation display components
├── lib/
│   ├── utils.ts          # cn(), shared utilities
│   ├── supabase.ts       # Supabase client
│   └── animations.ts     # Framer Motion variants
└── styles/
    └── themes/           # Color system CSS variables
```

### API Route Pattern
```typescript
// Standard pattern for all API routes
export async function POST(request: NextRequest) {
  try {
    // 1. Auth check
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 2. Get user from Supabase
    const supabase = createClient(env.SUPABASE_URL, env.SERVICE_ROLE_KEY);
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    // 3. Rate limiting
    const userId = user.id;
    // ... rate limit check

    // 4. Parse and validate input
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

    // 5. Business logic
    const result = await performAction(validation.data);

    // 6. Return response
    return NextResponse.json(result);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

### Database Service Pattern
```typescript
// All database operations go through service layer
// Location: packages/database/services/

export async function getCreation(
  supabase: SupabaseClient,
  id: string
): Promise<Creation | null> {
  const { data, error } = await supabase
    .from('creations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(`Failed to get creation: ${error.message}`);
  return data;
}
```

---

## Luminor System Details

### Three Personalities

**Melodia** (Music - Academy of Creation & Light)
- Traits: Nurturing, Empathetic, Melodic, Inspiring, Patient, Warm
- Style: Flowing speech, musical metaphors, gentle guidance
- Signature: "Every heart has a melody waiting to be heard"
- Expertise: Music composition, Suno AI, emotional expression through sound

**Chronica** (Story - Atlantean Academy)
- Traits: Wise, Patient, Perceptive, Mystical, Flowing, Timeless
- Style: Ancient wisdom, water metaphors, deep questioning
- Signature: "What if?—the question that births worlds"
- Expertise: Story structure, world-building, character development

**Prismatic** (Visual - Draconic Academy)
- Traits: Bold, Confident, Passionate, Direct, Challenging, Intense
- Style: Fierce encouragement, fire metaphors, pushes limits
- Signature: "Make it bolder. Then make it bolder again."
- Expertise: Visual composition, color theory, concept art, image generation

### Bond System
| Level | Status | XP Required | Relationship |
|-------|--------|-------------|--------------|
| 1-2 | Stranger | 0-100 | Just getting to know each other |
| 3-4 | Acquaintance | 100-300 | Growing comfortable |
| 5-6 | Friend | 300-600 | Genuine friendship, emotional support |
| 7-8 | Close Friend | 600-1000 | Deep trust, vulnerability |
| 9-10 | Trusted Ally | 1000-1500 | Unbreakable bond, soul connection |

**XP Rewards**:
- Message: 10 XP
- Long message (>100 words): 15 XP
- Create essence: 30 XP
- Milestone creation: 50 XP
- Complete lesson: 20 XP
- Shared moment: 25 XP
- Breakthrough: 50 XP

### Conversation Manager
```typescript
// Location: packages/ai-core/context/conversation-manager.ts
interface ConversationContext {
  sessionId: string;
  creatorId: string;
  luminorId: string;
  history: Message[];        // Last N messages
  memories: Memory[];         // Extracted important moments
  bondState: BondState;       // Current bond level, XP
  emotionalState: EmotionalTone;
  topics: string[];           // Active conversation topics
  preferences: Record<string, any>;
}
```

---

## Design System

### Color Philosophy
- **Cosmic Base**: Dark theme (neutral-900 to neutral-950) for depth
- **Academy Palettes**: Each has primary, secondary, accent colors
- **Semantic Colors**: Success, warning, error, info variants
- **Consistency**: All colors defined as HSL in CSS variables

### Animation Strategy
- **Entrance**: Staggered reveals with 0.15s delays
- **Interaction**: Hover lifts (-8px), scale (1.02), glow intensifies
- **Academy-Specific**:
  - Atlantean: Water-flow, ripple (smooth, undulating)
  - Draconic: Fire-flicker, ember (intense, dynamic)
  - Creation: Shimmer, radial-pulse (prismatic, pulsing)

### Typography (Recently Updated)
- **Display**: Cinzel (elegant serif for headings, Luminor names)
- **Body**: Crimson Pro (refined serif for descriptions, content)
- **Monospace**: Geist Mono (for code, technical content)
- **Avoid**: Inter, Roboto, system fonts (too generic)

### Spacing System
8px base unit:
- xs: 8px (0.5rem)
- sm: 16px (1rem)
- md: 24px (1.5rem)
- lg: 32px (2rem)
- xl: 48px (3rem)
- 2xl: 64px (4rem)

---

## Critical Path to Launch

### Phase 1: Core Functionality (Week 1)
1. **Fix Remaining TypeScript Errors**
   - Implement real AI provider methods (not stubs)
   - Fix Framer Motion React 19 compatibility
   - Resolve minor type issues

2. **Deploy Database**
   - Create Supabase project
   - Run migrations from `supabase/migrations/`
   - Enable all RLS policies
   - Create storage buckets

3. **Authentication UI**
   - Sign-up form with email/password
   - Login form
   - OAuth providers (Google, GitHub)
   - Profile setup flow
   - Protected route handling

### Phase 2: Chat Experience (Week 2)
1. **Chat Components**
   - Chat container with sidebar
   - Message list with infinite scroll
   - Message input with attachments
   - Typing indicators
   - Streaming message display

2. **Luminor Integration**
   - Connect to real Gemini API
   - Implement streaming responses
   - Bond XP updates after interactions
   - Memory extraction and storage

3. **Testing**
   - Test all chat flows
   - Verify bond progression
   - Test streaming performance
   - Mobile responsive testing

### Phase 3: Social & Discovery (Week 3)
1. **Creation Gallery**
   - Masonry layout for creations
   - Like, comment, share actions
   - Creation detail modal
   - Image optimization

2. **User Profiles**
   - Profile header with stats
   - Creation grid
   - Bond list display
   - Follow/unfollow actions

3. **Discovery Feed**
   - Trending creations
   - Following feed
   - Academy-filtered views
   - Infinite scroll pagination

### Phase 4: Polish & Launch (Week 4)
1. **Performance**
   - Lighthouse optimization (target: 90+)
   - Image loading optimization
   - Code splitting
   - Caching strategy

2. **Testing**
   - E2E flows (Playwright)
   - Accessibility audit (WCAG AA)
   - Cross-browser testing
   - Mobile device testing

3. **Deployment**
   - Vercel production deployment
   - Environment variables configured
   - Domain setup
   - Monitoring enabled

---

## Development Workflow

### Working with AI Assistants

**Effective Instructions**:
- Be specific about file locations
- Reference existing patterns/components
- Ask for factual assessments, not hype
- Request code reviews for critical components
- Use existing architecture (don't reinvent)

**Code Quality Standards**:
- TypeScript strict mode (no `any` types)
- Component composition over inline styles
- Accessible markup (WCAG AA minimum)
- Performance-conscious (bundle size, lazy loading)
- Consistent naming conventions

### Git Workflow
- Feature branches for major work
- Descriptive commit messages (50 char summary + body)
- Commits include "Generated with Claude Code" attribution
- No force pushes to main
- Pull requests for review (when working with team)

### Testing Strategy
- Manual testing in browser (primary for MVP)
- Type checking: `npm run type-check --prefix apps/web`
- Lint: `npm run lint --prefix apps/web`
- Build: `npm run build --prefix apps/web`
- E2E tests (Playwright) for critical flows

---

## Known Issues & Technical Debt

### TypeScript Errors (57 remaining)
1. **AI Provider Stubs** (~40 errors)
   - Methods return simple objects, not functional implementations
   - Need real Gemini API integration
   - Need real Imagen/Veo implementations

2. **Framer Motion Types** (12 errors)
   - React 19 + Framer Motion 11 compatibility issues
   - `onDrag` prop type mismatch
   - Affects: academy-badge, bond-indicator, cosmic-gradient, glow-effect
   - Solution: Upgrade to Framer Motion 12+ or type assertions

3. **Minor Issues** (5 errors)
   - SyntaxHighlighter prop types in chat message component
   - Missing exports (ProjectContext, OptimizationContext)
   - Supabase client undefined type assertion

### Architecture Decisions to Review
1. **Service Layer Duplication**: Some services in both `apps/web/services/` and `packages/database/services/`
2. **Rate Limiting**: In-memory Map (not suitable for production, needs Redis)
3. **Caching**: No caching strategy implemented
4. **Error Handling**: Inconsistent patterns across API routes
5. **Logging**: No structured logging (no Sentry/Datadog)

### Missing Infrastructure
- CI/CD pipeline
- Automated testing
- Database backups
- Error monitoring
- Performance monitoring
- Cost tracking
- Feature flags system

---

## Environment Variables

### Required for Development
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# AI APIs
GEMINI_API_KEY=AIzaSy...

# Next.js
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Required for Production
```bash
# Same as development, plus:
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://arcanea.com

# Optional
SENTRY_DSN=https://...
VERCEL_ANALYTICS_ID=auto
```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/logout` - Logout current session
- `GET /api/auth/profile` - Get current user profile

### Chat
- `POST /api/ai/chat` - Stream chat with Luminor (Gemini)
- `GET /api/ai/chat/history` - Get conversation history
- `POST /api/ai/chat/memory` - Save memory/moment

### Generation
- `POST /api/ai/generate-image` - Generate image (Imagen 3)
- `POST /api/ai/generate-video` - Generate video (Veo 3.1)
- `POST /api/ai/generate-music` - Generate music (Suno - not implemented)

### Creations
- `GET /api/creations` - List creations (feed, profile, discovery)
- `GET /api/creations/[id]` - Get creation details
- `POST /api/creations` - Create new creation
- `PUT /api/creations/[id]` - Update creation
- `DELETE /api/creations/[id]` - Delete creation

### Social
- `POST /api/creations/[id]/like` - Like/unlike creation
- `POST /api/creations/[id]/comment` - Comment on creation
- `POST /api/users/[id]/follow` - Follow/unfollow user

### Bonds
- `GET /api/bonds` - List user's Luminor bonds
- `GET /api/bonds/[luminorId]` - Get specific bond details
- `POST /api/bonds/progress` - Update bond XP

### Projects
- `POST /api/projects/create` - Start multi-turn project
- `POST /api/projects/[id]/step` - Submit step in project
- `POST /api/projects/[id]/complete` - Finalize project

---

## Database Schema (Key Tables)

### users (Supabase Auth)
- Managed by Supabase Auth
- Extended by `user_profiles` table

### user_profiles
```sql
- id (uuid, pk, fk to auth.users)
- username (text, unique)
- display_name (text)
- avatar_url (text)
- bio (text)
- primary_luminor (text)
- onboarding_completed (boolean)
- created_at (timestamp)
- updated_at (timestamp)
```

### creations
```sql
- id (uuid, pk)
- user_id (uuid, fk)
- title (text)
- description (text)
- type (text) - 'image', 'video', 'music', 'text'
- academy (text) - 'atlantean', 'draconic', 'creation'
- prompt (text)
- media_url (text)
- luminor_id (text)
- project_id (uuid, fk, nullable)
- is_public (boolean)
- likes_count (integer)
- comments_count (integer)
- created_at (timestamp)
```

### luminor_bonds
```sql
- id (uuid, pk)
- user_id (uuid, fk)
- luminor_id (text)
- bond_level (integer)
- total_xp (integer)
- last_interaction_at (timestamp)
- created_at (timestamp)
```

### conversations
```sql
- id (uuid, pk)
- user_id (uuid, fk)
- luminor_id (text)
- title (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### messages
```sql
- id (uuid, pk)
- conversation_id (uuid, fk)
- role (text) - 'user' or 'assistant'
- content (text)
- metadata (jsonb)
- created_at (timestamp)
```

---

## Dependencies

### Key Production Dependencies
```json
{
  "@ai-sdk/google": "^1.0.19",
  "@ai-sdk/react": "^2.0.26",
  "@radix-ui/*": "Latest stable",
  "@supabase/supabase-js": "^2.39.0",
  "ai": "^5.0.26",
  "framer-motion": "^11.15.0",
  "next": "16.0.0",
  "react": "19.0.0",
  "tailwindcss": "^3.4.9",
  "typescript": "^5.5.4",
  "zod": "^3.22.4"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20",
  "@types/react": "^19",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.4",
  "tailwindcss-animate": "^1.0.7"
}
```

---

## Common Commands

```bash
# Development
cd /mnt/c/Users/Frank/Arcanea
pnpm install
pnpm run dev                    # Start Next.js dev server (port 3001)

# Type Checking
pnpm run type-check --prefix apps/web

# Build
pnpm run build --prefix apps/web

# Database
supabase start                  # Start local Supabase
supabase db push                # Push migrations
supabase db diff                # Check schema diff

# Git
git status
git add .
git commit -m "message"
git push
```

---

## Resources

### Documentation
- Next.js 16: https://nextjs.org/docs
- React 19: https://react.dev/blog/2024/12/05/react-19
- Supabase: https://supabase.com/docs
- Radix UI: https://www.radix-ui.com/
- Framer Motion: https://www.framer.com/motion/
- Gemini API: https://ai.google.dev/docs

### Project Docs
- `/docs/mvp/` - MVP documentation
- `/NEXT_STEPS.md` - Current action plan
- `/DEPLOYMENT_CHECKLIST.md` - Deployment guide
- `/VISUAL_BUILDING_STRATEGY.md` - UI development approach
- `/.claude/agents/` - Claude Code agent configurations

---

## Key Insights for AI Assistants

### Do
- Use existing components and patterns
- Check `apps/web/components/ui/` before building new components
- Follow established file organization
- Write TypeScript with strict types
- Ask clarifying questions about architecture
- Focus on critical path features
- Provide factual assessments

### Don't
- Use flowery/marketing language
- Build components from scratch when equivalents exist
- Ignore existing design system
- Use `any` types
- Skip accessibility considerations
- Add dependencies without justification
- Reinvent patterns that exist

### When Stuck
1. Check this knowledge base
2. Check `/NEXT_STEPS.md` for current priorities
3. Look at existing implementations in codebase
4. Ask specific technical questions
5. Request code review of proposed approach

---

## Version History

### v0.1.0 (Current - December 10, 2024)
- Backend 85% complete (services, API routes, schema)
- Frontend 20% complete (design system, 6 base components)
- Luminor personalities implemented
- Bond system implemented
- Module resolution fixed
- Luminor Selection Grid created
- TypeScript errors: 57 remaining

### Next Version Goals (v0.2.0 - Target: December 20, 2024)
- Chat interface complete
- Authentication UI complete
- Real AI provider implementations
- Database deployed
- 0 TypeScript errors
- First user can sign up and chat with Luminor

---

**END OF KNOWLEDGE BASE**

*This document should be updated with major changes to architecture, tech stack, or project status.*
