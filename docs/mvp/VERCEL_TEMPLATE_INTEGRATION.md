# Vercel AI Chatbot Template - Integration Guide

**Version:** 1.0.0
**Last Updated:** October 23, 2025
**Template Source:** https://github.com/vercel/ai-chatbot (v3.1.0)

## Table of Contents

1. [Overview](#overview)
2. [Template Analysis](#template-analysis)
3. [Integration Strategy](#integration-strategy)
4. [Component Migration](#component-migration)
5. [Code Adaptations](#code-adaptations)
6. [Testing Strategy](#testing-strategy)
7. [Customization Checklist](#customization-checklist)

---

## Overview

This guide details how to integrate components from the Vercel AI Chatbot template into our Arcanea MVP monorepo structure.

**Template Repository:** https://github.com/vercel/ai-chatbot
**Our Target:** `/mnt/c/Users/Frank/Arcanea/apps/web`

### Why Use This Template?

- ✅ **18.4k+ stars** - Battle-tested by thousands
- ✅ **Production-ready** - Optimized streaming, error handling
- ✅ **Best practices** - Server Components, Server Actions
- ✅ **AI SDK integration** - Clean abstractions for LLM providers
- ✅ **Modern stack** - Next.js 15, React 19, TypeScript

### What We're Taking

- Chat UI components (messages, input, layout)
- AI streaming logic (useChat hook)
- Database patterns (Drizzle ORM setup)
- Server Actions (for mutations)
- UI primitives (from shadcn/ui)

### What We're Changing

- AI provider (xAI → Gemini)
- Branding and styling
- Database schema (add departments, Luminors, bonds)
- Auth flow (customize for Arcanea)
- Features (add project system, creations)

---

## Template Analysis

### Directory Structure

```
vercel/ai-chatbot/
├── app/
│   ├── (auth)/              # Auth pages (login, signup)
│   ├── (chat)/              # Chat interface
│   ├── api/                 # API routes
│   │   └── chat/            # Chat endpoint
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # Radix UI components
│   ├── chat/                # Chat-specific components
│   │   ├── message.tsx      # Message display
│   │   ├── chat-input.tsx   # Input field
│   │   └── chat-panel.tsx   # Chat panel
│   └── ...
├── lib/
│   ├── ai/                  # AI SDK setup
│   │   └── index.ts         # Provider configuration
│   ├── db/                  # Database
│   │   ├── schema.ts        # Drizzle schema
│   │   └── index.ts         # DB client
│   └── utils.ts             # Helpers
├── hooks/
│   └── use-chat.ts          # Chat hook (from @ai-sdk/react)
├── public/
│   └── images/              # Static assets
├── drizzle.config.ts        # Drizzle configuration
├── next.config.js           # Next.js config
├── tailwind.config.js       # Tailwind config
└── package.json             # Dependencies
```

### Key Files to Study

**1. Chat Components**
- `/components/chat/message.tsx` - Message rendering
- `/components/chat/chat-input.tsx` - User input
- `/components/chat/chat-panel.tsx` - Panel layout
- `/components/chat/chat-list.tsx` - Message list

**2. Server Actions**
- `/app/actions/chat.ts` - Chat mutations
- `/app/actions/user.ts` - User operations

**3. API Routes**
- `/app/api/chat/route.ts` - Streaming chat endpoint

**4. Database**
- `/lib/db/schema.ts` - Table definitions
- `/lib/db/queries.ts` - Database queries

**5. AI Integration**
- `/lib/ai/index.ts` - AI SDK setup
- `/lib/ai/models.ts` - Model configuration

---

## Integration Strategy

### Phase 1: Setup Foundation

**Goal:** Minimal working chat in our monorepo

**Steps:**
1. Copy essential UI components
2. Set up Gemini provider
3. Create basic chat page
4. Test streaming responses

**Files to Copy:**
```bash
# From template
components/ui/button.tsx
components/ui/input.tsx
components/ui/textarea.tsx
components/chat/message.tsx
components/chat/chat-input.tsx
lib/utils.ts

# To our app
/mnt/c/Users/Frank/Arcanea/apps/web/components/ui/
/mnt/c/Users/Frank/Arcanea/apps/web/components/chat/
/mnt/c/Users/Frank/Arcanea/apps/web/lib/utils.ts
```

### Phase 2: Customize for Arcanea

**Goal:** Add Arcanea-specific features

**Steps:**
1. Add department selector
2. Implement Luminor personalities
3. Create bond level system
4. Add project management

**New Components:**
```
components/
├── departments/
│   ├── department-card.tsx
│   ├── department-selector.tsx
│   └── luminor-avatar.tsx
├── projects/
│   ├── project-card.tsx
│   ├── project-list.tsx
│   └── project-form.tsx
└── profile/
    ├── bond-level.tsx
    ├── stats-card.tsx
    └── achievement-badge.tsx
```

### Phase 3: Enhanced Features

**Goal:** Rich interactions and content

**Steps:**
1. Add file uploads
2. Implement creation gallery
3. Add real-time features
4. Build social components

---

## Component Migration

### 1. Chat Message Component

**Source:** `/components/chat/message.tsx`

**Original Code Pattern:**
```typescript
// Template version
export function Message({ message }: { message: Message }) {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src={message.user?.avatar} />
      </Avatar>
      <div>
        <p className="font-semibold">{message.user?.name}</p>
        <p>{message.content}</p>
      </div>
    </div>
  );
}
```

**Arcanea Adaptation:**
```typescript
// Our version - apps/web/components/chat/message.tsx
import { Avatar } from '@/components/ui/avatar';
import { getLuminorAvatar } from '@/lib/luminors';

interface ArcaneanMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  luminorId?: string;
  department?: string;
  timestamp: Date;
}

export function Message({ message }: { message: ArcaneanMessage }) {
  const isUser = message.role === 'user';
  const avatar = isUser
    ? '/avatars/user-default.png'
    : getLuminorAvatar(message.luminorId);

  return (
    <div className={cn(
      "flex gap-4 p-4",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar>
        <AvatarImage src={avatar} />
      </Avatar>
      <div className={cn(
        "rounded-lg p-4",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-70">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
```

### 2. Chat Input Component

**Source:** `/components/chat/chat-input.tsx`

**Original:**
```typescript
export function ChatInput({ onSubmit }: ChatInputProps) {
  const [input, setInput] = useState('');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(input);
      setInput('');
    }}>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <Button type="submit">Send</Button>
    </form>
  );
}
```

**Arcanea Adaptation:**
```typescript
// apps/web/components/chat/chat-input.tsx
export function ChatInput({
  onSubmit,
  luminorName,
  department
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    await onSubmit(input);
    setInput('');
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary">{department}</Badge>
        <span className="text-sm text-muted-foreground">
          Chatting with {luminorName}
        </span>
      </div>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Ask ${luminorName} anything about ${department}...`}
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
          }
        }}
      />
      <Button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="absolute bottom-2 right-2"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
      </Button>
    </form>
  );
}
```

### 3. Chat Page Layout

**Source:** `/app/(chat)/page.tsx`

**Original:**
```typescript
export default async function ChatPage() {
  const session = await auth();
  const chats = await getChats(session.user.id);

  return (
    <div className="flex h-screen">
      <Sidebar chats={chats} />
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  );
}
```

**Arcanea Adaptation:**
```typescript
// apps/web/app/(chat)/[department]/page.tsx
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getDepartmentBySlug } from '@/lib/db/queries';
import { DepartmentHeader } from '@/components/departments/header';
import { ChatInterface } from '@/components/chat/interface';
import { BondLevel } from '@/components/profile/bond-level';

interface PageProps {
  params: { department: string };
}

export default async function DepartmentChatPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect('/login');

  const department = await getDepartmentBySlug(params.department);
  if (!department) redirect('/');

  const luminor = department.luminors[0]; // Primary Luminor
  const bond = await getBondLevel(session.user.id, luminor.id);

  return (
    <div className="flex h-screen flex-col">
      <DepartmentHeader
        department={department}
        luminor={luminor}
      />
      <div className="flex-1 overflow-hidden">
        <ChatInterface
          departmentId={department.id}
          luminorId={luminor.id}
          userId={session.user.id}
        />
      </div>
      <BondLevel
        luminorName={luminor.name}
        level={bond.level}
        xp={bond.xp}
        nextLevelXp={bond.nextLevelXp}
      />
    </div>
  );
}
```

---

## Code Adaptations

### AI Provider Setup

**Template (xAI):**
```typescript
// lib/ai/index.ts
import { createXai } from '@ai-sdk/xai';

export const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
});

export const model = xai('grok-2-vision-1212');
```

**Arcanea (Gemini):**
```typescript
// apps/web/lib/ai/gemini-client.ts
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, generateText } from 'ai';

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export const defaultModel = google('gemini-2.0-flash-001', {
  maxTokens: parseInt(process.env.GEMINI_MAX_TOKENS || '8192'),
  temperature: parseFloat(process.env.GEMINI_TEMPERATURE || '0.7'),
});

// Get Luminor-specific model with custom prompt
export function getLuminorModel(luminorId: string) {
  const prompt = getLuminorSystemPrompt(luminorId);
  return defaultModel; // System prompt passed in streamText call
}
```

### Streaming Chat API

**Template:**
```typescript
// app/api/chat/route.ts
import { streamText } from 'ai';
import { xai } from '@/lib/ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: xai('grok-2-vision-1212'),
    messages,
  });

  return result.toDataStreamResponse();
}
```

**Arcanea:**
```typescript
// apps/web/app/api/chat/route.ts
import { streamText } from 'ai';
import { auth } from '@/lib/auth';
import { defaultModel } from '@/lib/ai/gemini-client';
import { getLuminorSystemPrompt } from '@/lib/luminors';
import { updateBondLevel } from '@/lib/db/mutations';

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { messages, luminorId, departmentId } = await req.json();

  // Get Luminor's personality
  const systemPrompt = await getLuminorSystemPrompt(luminorId);

  // Stream response
  const result = streamText({
    model: defaultModel,
    system: systemPrompt,
    messages,
    onFinish: async ({ text, usage }) => {
      // Save message to database
      await saveMessage({
        userId: session.user.id,
        luminorId,
        role: 'assistant',
        content: text,
        tokens: usage.totalTokens,
      });

      // Update bond level
      await updateBondLevel(session.user.id, luminorId, {
        xpGain: 10,
        interaction: 'chat',
      });
    },
  });

  return result.toDataStreamResponse();
}
```

### Database Schema Extensions

**Template:**
```typescript
// lib/db/schema.ts
export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  title: text('title'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  chatId: uuid('chat_id').references(() => chats.id),
  role: text('role'),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

**Arcanea Extensions:**
```typescript
// apps/web/lib/db/schema.ts
export const departments = pgTable('departments', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  icon: text('icon'),
  color: text('color'),
});

export const luminors = pgTable('luminors', {
  id: uuid('id').primaryKey().defaultRandom(),
  departmentId: uuid('department_id').references(() => departments.id),
  name: text('name').notNull(),
  role: text('role'), // "guide", "specialist", "mentor"
  personality: text('personality'),
  systemPrompt: text('system_prompt').notNull(),
  avatar: text('avatar'),
});

export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  luminorId: uuid('luminor_id').references(() => luminors.id),
  departmentId: uuid('department_id').references(() => departments.id),
  title: text('title'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userLuminorBonds = pgTable('user_luminor_bonds', {
  userId: uuid('user_id').references(() => users.id),
  luminorId: uuid('luminor_id').references(() => luminors.id),
  level: integer('level').default(1),
  xp: integer('xp').default(0),
  lastInteraction: timestamp('last_interaction'),
  primaryKey: { columns: ['userId', 'luminorId'] },
});

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  departmentId: uuid('department_id').references(() => departments.id),
  title: text('title').notNull(),
  description: text('description'),
  data: jsonb('data'), // Flexible project data
  status: text('status').default('draft'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

---

## Testing Strategy

### Unit Tests

**Test Chat Components:**
```typescript
// apps/web/__tests__/components/chat/message.test.tsx
import { render, screen } from '@testing-library/react';
import { Message } from '@/components/chat/message';

describe('Message Component', () => {
  it('renders user message correctly', () => {
    const message = {
      id: '1',
      role: 'user' as const,
      content: 'Hello, Lumina!',
      timestamp: new Date(),
    };

    render(<Message message={message} />);

    expect(screen.getByText('Hello, Lumina!')).toBeInTheDocument();
  });

  it('renders assistant message with Luminor avatar', () => {
    const message = {
      id: '2',
      role: 'assistant' as const,
      content: 'Hello! How can I help?',
      luminorId: 'lumina-id',
      timestamp: new Date(),
    };

    render(<Message message={message} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('lumina'));
  });
});
```

### Integration Tests

**Test Chat Flow:**
```typescript
// apps/web/__tests__/integration/chat-flow.test.tsx
import { test, expect } from '@playwright/test';

test('complete chat flow', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'test@arcanea.ai');
  await page.fill('[name="password"]', 'password123');
  await page.click('[type="submit"]');

  // Select department
  await page.click('[data-department="world-building"]');

  // Send message
  await page.fill('[placeholder*="Ask"]', 'Help me create a fantasy world');
  await page.click('[type="submit"]');

  // Verify response
  await expect(page.locator('.message-assistant')).toBeVisible();

  // Check bond level updated
  await expect(page.locator('.bond-level')).toContainText('Level 1');
});
```

### API Tests

**Test Gemini Integration:**
```typescript
// apps/web/__tests__/api/chat.test.ts
import { POST } from '@/app/api/chat/route';

describe('Chat API', () => {
  it('streams response from Gemini', async () => {
    const request = new Request('http://localhost:3001/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        luminorId: 'lumina-id',
        departmentId: 'art-studio-id',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/event-stream');
  });
});
```

---

## Customization Checklist

### Branding

- [ ] Update colors in `tailwind.config.js`
- [ ] Replace logo in `/public/images/logo.png`
- [ ] Customize font families
- [ ] Update favicon and metadata
- [ ] Add Arcanea-specific animations

### UI/UX

- [ ] Department selector on home page
- [ ] Luminor avatar animations
- [ ] Bond level progress bar
- [ ] Project cards layout
- [ ] Mobile responsive design
- [ ] Dark mode support

### Features

- [ ] Five departments implemented
- [ ] Each department has Luminor
- [ ] Bond level system working
- [ ] Project creation flow
- [ ] Creation gallery
- [ ] User profile page

### Technical

- [ ] Gemini API integrated
- [ ] Supabase connected
- [ ] Drizzle migrations run
- [ ] NextAuth configured
- [ ] Error handling added
- [ ] Rate limiting implemented

### Documentation

- [ ] Component Storybook (optional)
- [ ] API documentation
- [ ] Deployment guide
- [ ] User guide
- [ ] Developer onboarding

---

## Next Steps

After integration:

1. **For Backend Engineer:**
   - Implement server actions
   - Add error handling
   - Optimize database queries
   - Set up caching layer

2. **For Frontend Engineer:**
   - Build department pages
   - Create project UI
   - Add animations
   - Polish mobile experience

3. **For Database Designer:**
   - Seed departments and Luminors
   - Create indexes
   - Set up RLS policies
   - Generate TypeScript types

4. **For DevOps:**
   - Deploy to Vercel staging
   - Set up environment variables
   - Configure monitoring
   - Test production build

---

## Resources

- **Vercel AI SDK Docs:** https://sdk.vercel.ai/docs
- **Template Repository:** https://github.com/vercel/ai-chatbot
- **Gemini API Docs:** https://ai.google.dev/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Drizzle ORM:** https://orm.drizzle.team/docs

---

**Ready to integrate!** Follow this guide to bring Vercel's best practices into Arcanea. 🚀
