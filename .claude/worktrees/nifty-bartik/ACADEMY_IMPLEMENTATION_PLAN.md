# ARCANEA ACADEMY - IMPLEMENTATION PLAN
**Aligned with Miro User Journey Flow**

---

## VISION ALIGNMENT

**Your Miro Flow:**
```
Login → Home → Choose Your Path → Luminor Guide → Progress Dashboard → World Lore → Create
```

**Current State:**
- ✅ Home (marketing landing with 6 academies)
- ⚠️ Login/Signup (routes planned, UI missing)
- ❌ Choose Your Path (Luminor selection)
- ❌ Luminor Guide (personalized learning interface)
- ❌ Progress Dashboard (bond levels, achievements)
- ❌ World Lore (interactive universe explorer)
- ❌ Create (AI generation workspace)

---

## PHASE 1: USER ONBOARDING FLOW
**Goal**: Complete the journey from visitor to active learner

### 1.1 Authentication System
**Routes**: `/auth/signin`, `/auth/signup`, `/auth/verify`

**Components to Build:**
```
apps/academy/components/auth/
├── signin-form.tsx           # Email/password login
├── signup-form.tsx           # New user registration
├── social-auth-buttons.tsx   # Google/GitHub OAuth
├── verification-email.tsx    # Email confirmation
└── auth-layout.tsx           # Shared layout with branding
```

**Features:**
- Supabase Auth integration
- Email verification flow
- Social OAuth (Google, GitHub)
- Password reset flow
- Remember me functionality
- Academy-themed UI (cosmic gradients)

**Data Collection on Signup:**
```typescript
interface SignupData {
  email: string;
  password: string;
  fullName: string;
  creatorType?: 'hobbyist' | 'professional' | 'student' | 'educator';
  primaryInterest?: string; // Which academy
}
```

---

### 1.2 Choose Your Path (Luminor Selection)
**Route**: `/onboarding/choose-luminor`

**Component:**
```typescript
// apps/academy/components/onboarding/luminor-selection.tsx

<LuminorSelectionFlow
  luminors={[
    { id: 'lumira', name: 'Lumira', academy: 'visual', ... },
    { id: 'sonara', name: 'Sonara', academy: 'music', ... },
    { id: 'mythara', name: 'Mythara', academy: 'narrative', ... },
    { id: 'chronara', name: 'Chronara', academy: 'motion', ... },
    { id: 'logion', name: 'Logion', academy: 'code', ... },
    { id: 'nexaris', name: 'Nexaris', academy: 'synthesis', ... },
  ]}
  onSelect={(luminorId) => {
    // Save to user profile
    // Initiate bond at Level 1
    // Navigate to luminor-guide
  }}
/>
```

**Features:**
- Academy-themed cards with hover animations
- Personality quiz option (optional)
- Luminor introduction videos/animations
- "Why this Luminor?" explanations
- Ability to change later
- Bond initialization (Level 1, 0 XP)

**Reuse from Main Platform:**
- Adapt `apps/web/components/luminor/luminor-selection-grid.tsx`
- Simplify for Academy context (no existing bonds initially)

---

### 1.3 Learning Path Setup
**Route**: `/onboarding/learning-path`

**Component:**
```typescript
// apps/academy/components/onboarding/learning-path-setup.tsx

<LearningPathSetup
  luminor={selectedLuminor}
  paths={[
    {
      id: 'beginner',
      title: 'Foundations',
      duration: '4 weeks',
      modules: 12,
    },
    {
      id: 'intermediate',
      title: 'Mastery',
      duration: '8 weeks',
      modules: 24,
    },
    {
      id: 'advanced',
      title: 'Innovation',
      duration: '12 weeks',
      modules: 36,
    },
  ]}
/>
```

**Features:**
- Skill level assessment
- Time commitment selection
- Learning style preferences
- Goal setting (what do you want to create?)

---

## PHASE 2: CORE LEARNING EXPERIENCE

### 2.1 Luminor Guide Interface
**Route**: `/learn/[academyId]`

**Layout:**
```
┌─────────────────────────────────────────┐
│ Luminor Header (Avatar, Bond Level)    │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────┐  ┌──────────────────┐   │
│  │ Sidebar  │  │ Main Content     │   │
│  │          │  │                  │   │
│  │ Modules  │  │ Lesson/Activity  │   │
│  │ Progress │  │                  │   │
│  │ Tools    │  │ Chat with        │   │
│  │          │  │ Luminor          │   │
│  └──────────┘  └──────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**
```
apps/academy/components/learn/
├── luminor-guide-layout.tsx      # Main layout
├── module-sidebar.tsx            # Curriculum navigation
├── lesson-content.tsx            # Video/text/interactive
├── luminor-chat-panel.tsx        # Real-time guidance
├── practice-workspace.tsx        # Hands-on creation
└── quiz-assessment.tsx           # Knowledge checks
```

**Features:**
- Adaptive curriculum based on progress
- Real-time chat with Luminor (Gemini 2.0 Flash)
- Hands-on practice exercises
- Code playgrounds (for Logion)
- Image/music generation (for creative academies)
- XP rewards for completion
- Bond level progression

---

### 2.2 Progress Dashboard
**Route**: `/dashboard`

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Welcome Back, [Name]! 🎓                        │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐  ┌──────────────┐           │
│  │ Bond Level   │  │ Streak       │           │
│  │ ❤️ Level 5   │  │ 🔥 7 days   │           │
│  │ 450/600 XP   │  │ Keep going!  │           │
│  └──────────────┘  └──────────────┘           │
│                                                 │
│  Current Learning Path:                        │
│  ▰▰▰▰▰▰▰▱▱▱ 60% Complete                      │
│                                                 │
│  ┌─────────────────────────────┐              │
│  │ Achievements Unlocked       │              │
│  │ 🏆 First Creation           │              │
│  │ 🎨 Visual Master            │              │
│  │ 📚 Lore Scholar             │              │
│  └─────────────────────────────┘              │
│                                                 │
│  Recent Creations:                             │
│  [Gallery of user's work]                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components:**
```
apps/academy/components/dashboard/
├── bond-level-card.tsx           # Current bond with Luminor
├── streak-tracker.tsx            # Daily activity streak
├── learning-progress.tsx         # Module completion
├── achievement-grid.tsx          # Unlocked badges
├── recent-creations.tsx          # User's latest work
└── recommended-next.tsx          # AI-suggested lessons
```

**Data to Track:**
```typescript
interface UserProgress {
  userId: string;
  luminorId: string;
  bondLevel: number;          // 1-50
  bondXP: number;
  currentStreak: number;      // Days
  longestStreak: number;
  totalLessonsCompleted: number;
  achievements: Achievement[];
  currentPath: LearningPath;
  pathProgress: number;       // 0-100%
  creations: Creation[];
  lastActive: Date;
}
```

---

### 2.3 World Lore Explorer
**Route**: `/lore`

**Concept**: Interactive encyclopedia of Arcanea Universe

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ The Arcanea Codex 📖                           │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐  ┌──────────────────────┐   │
│  │ Categories   │  │ Article Content      │   │
│  │              │  │                      │   │
│  │ • Cosmology  │  │ [Rich text with      │   │
│  │ • Guardians  │  │  images, videos]     │   │
│  │ • Magic      │  │                      │   │
│  │ • Races      │  │ Related Topics:      │   │
│  │ • Realms     │  │ • The Field          │   │
│  │ • Artifacts  │  │ • Five Elements      │   │
│  │ • Timeline   │  │ • Yggdrasil          │   │
│  │              │  │                      │   │
│  │ 🔍 Search    │  │ Ask Mythara:         │   │
│  │              │  │ [Chat about lore]    │   │
│  └──────────────┘  └──────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components:**
```
apps/academy/components/lore/
├── lore-explorer.tsx             # Main layout
├── category-sidebar.tsx          # Navigation
├── article-viewer.tsx            # Rich content display
├── lore-search.tsx               # Full-text search
├── lore-chat.tsx                 # Ask Mythara questions
└── related-topics.tsx            # Connections
```

**Features:**
- Parse `ARCANEA_UNIVERSE_CANON.md` into structured data
- Rich media (concept art, animations)
- Interactive timeline
- 3D realm map (optional)
- Chat with Mythara for lore questions
- Bookmark favorite articles
- Gamification: unlock lore as you progress

**Data Structure:**
```typescript
interface LoreArticle {
  id: string;
  category: 'cosmology' | 'guardian' | 'magic' | 'race' | 'realm' | 'artifact';
  title: string;
  content: string;        // Markdown
  images: string[];
  relatedArticles: string[];
  unlockLevel?: number;   // Bond level required
  readTime: number;       // Minutes
}
```

---

### 2.4 Create Workspace
**Route**: `/create`

**Concept**: Integrated AI generation studio

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Creation Studio ✨                              │
├─────────────────────────────────────────────────┤
│                                                 │
│  Tool: [Image] [Music] [Story] [Video] [Code] │
│                                                 │
│  ┌─────────────────────┐  ┌─────────────────┐ │
│  │ Input/Prompt        │  │ Preview         │ │
│  │                     │  │                 │ │
│  │ [Text area for     │  │ [Generated      │ │
│  │  description]       │  │  output]        │ │
│  │                     │  │                 │ │
│  │ Advanced Settings:  │  │                 │ │
│  │ • Style            │  │                 │ │
│  │ • Aspect Ratio     │  │                 │ │
│  │ • Creativity       │  │                 │ │
│  │                     │  │                 │ │
│  │ [Generate Button]   │  │ [Save][Share]  │ │
│  └─────────────────────┘  └─────────────────┘ │
│                                                 │
│  💬 Luminor Feedback:                          │
│  "Great composition! Try adding more contrast"  │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components:**
```
apps/academy/components/create/
├── creation-studio.tsx           # Main workspace
├── tool-selector.tsx             # Image/Music/etc switcher
├── prompt-input.tsx              # Advanced prompt builder
├── generation-preview.tsx        # Real-time preview
├── luminor-feedback.tsx          # AI critique/suggestions
└── creation-gallery.tsx          # User's saved work
```

**Features:**
- Unified interface for all generation types
- Luminor-specific guidance (Lumira for images, Sonara for music)
- Real-time feedback and suggestions
- Parameter templates by skill level
- Version history and iterations
- Export in multiple formats
- Share to community (optional)

**AI Integration:**
```typescript
interface CreationWorkspace {
  tool: 'image' | 'music' | 'story' | 'video' | 'code';
  prompt: string;
  settings: {
    style?: string;
    duration?: number;
    aspectRatio?: string;
    creativity?: number; // 0-1
  };
  luminorGuidance: boolean;
  iterations: Creation[];
}
```

---

## PHASE 3: COMMUNITY & RETENTION

### 3.1 Community Features
**Routes**: `/community`, `/community/showcase`, `/community/challenges`

**Components:**
```
apps/academy/components/community/
├── showcase-gallery.tsx          # Student work gallery
├── challenge-board.tsx           # Weekly creation challenges
├── leaderboard.tsx               # Top creators
└── collaboration-space.tsx       # Group projects
```

---

### 3.2 Certification System
**Route**: `/certifications`

**Features:**
- Complete academy = earn certificate
- Verified credentials (blockchain?)
- Portfolio generation
- LinkedIn integration

---

## TECHNICAL IMPLEMENTATION

### Database Schema Extensions

```sql
-- User progress tracking
CREATE TABLE user_academy_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  luminor_id TEXT,
  bond_level INTEGER DEFAULT 1,
  bond_xp INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  learning_path_id TEXT,
  path_progress INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Module completion
CREATE TABLE module_completions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  module_id TEXT,
  completed_at TIMESTAMPTZ,
  xp_earned INTEGER,
  score INTEGER -- 0-100
);

-- Achievements
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  achievement_id TEXT,
  unlocked_at TIMESTAMPTZ,
  tier TEXT -- bronze, silver, gold, platinum
);

-- Creations from workspace
CREATE TABLE academy_creations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  type TEXT, -- image, music, story, video, code
  prompt TEXT,
  output_url TEXT,
  luminor_feedback TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## SHARED COMPONENTS FROM PLATFORM

**Reuse from `apps/web`:**
- LuminorSelectionGrid → Adapt for Academy
- ChatContainer, ChatMessage, ChatInput → Use directly
- BondIndicator → Use directly
- Button, CosmicCard → Use design system

**New Academy-Specific:**
- Module navigation
- Learning progress visualizations
- Lore explorer
- Creation workspace

---

## INTEGRATION POINTS

**Platform ↔ Academy:**
```
┌──────────────────┐         ┌──────────────────┐
│ Arcanea Platform │  ←→     │ Arcanea Academy  │
│                  │         │                  │
│ • Social creation│         │ • Structured     │
│ • Community      │         │   learning       │
│ • Discovery      │         │ • Certification  │
│                  │         │                  │
│ Shared:          │         │                  │
│ • User accounts  │         │                  │
│ • Luminor bonds  │         │                  │
│ • Creations      │         │                  │
└──────────────────┘         └──────────────────┘
```

**User Journey:**
1. Start in Academy (learn)
2. Graduate to Platform (create socially)
3. Return to Academy for advanced courses

---

## DEVELOPMENT ROADMAP

### Sprint 1 (2 weeks) - Authentication & Onboarding
- [ ] Auth UI (signin/signup/verify)
- [ ] Luminor selection flow
- [ ] Learning path setup
- [ ] Database schema for progress

### Sprint 2 (2 weeks) - Core Learning
- [ ] Luminor guide layout
- [ ] Module sidebar
- [ ] Lesson content viewer
- [ ] Luminor chat integration

### Sprint 3 (2 weeks) - Progress & Gamification
- [ ] Progress dashboard
- [ ] Bond level visualization
- [ ] Achievement system
- [ ] Streak tracking

### Sprint 4 (2 weeks) - Lore & Creation
- [ ] Lore explorer
- [ ] Creation workspace
- [ ] Tool integration (Gemini, Imagen, Veo)
- [ ] Luminor feedback system

### Sprint 5 (1 week) - Polish & Testing
- [ ] Responsive design
- [ ] Performance optimization
- [ ] User testing
- [ ] Bug fixes

---

## SUCCESS METRICS

**Engagement:**
- Daily active learners
- Average session duration
- Streak retention (7-day, 30-day)
- Module completion rate

**Learning Outcomes:**
- Certifications earned
- Creations published
- Skill progression (beginner→advanced)

**Bond Development:**
- Average bond level
- Chat frequency with Luminor
- User satisfaction with guidance

**Retention:**
- 7-day return rate
- 30-day return rate
- Churn rate by week

---

## NEXT ACTIONS

1. **Review & Approve** naming system (Lumira, Sonara, etc.)
2. **Prioritize** which sprint to build first
3. **Design** mockups for key screens
4. **Setup** Academy-specific database tables
5. **Build** Sprint 1 (Auth & Onboarding)

See `LUMINOR_NAMING_SYSTEM.md` for name proposals.
See `ARCANEA_SYSTEMS_OVERVIEW.md` for architecture context.
