# Arcanea Chrome Extension — Technical Specification
## Standalone Product A — Complete Build Reference

> *"Every webpage is a world waiting to be understood. The Guardians are the interpreters."*

---

## Document Purpose

This specification is the authoritative technical reference for building the Arcanea Chrome Extension (Standalone). It covers architecture, feature implementation, data models, API integration, security, performance, and Chrome Web Store submission. Every engineering decision here is made to serve two goals simultaneously: deliver a mythologically consistent Arcanea experience, and ship production-quality software that users trust with their API keys.

**Stack:** TypeScript (strict), React 19, Vite, Manifest V3, `@arcanea/extension-core`

**Target runtime:** Chrome 120+ (Manifest V3, Side Panel API, Service Worker)

---

## Part I: Architecture Overview

### Extension Context Map

A Chrome extension runs in multiple isolated JavaScript contexts that communicate via the Chrome message passing API. Understanding this map is prerequisite to all engineering decisions.

```
┌─────────────────────────────────────────────────────────────┐
│  Chrome Browser                                              │
│                                                              │
│  ┌──────────────────┐      ┌──────────────────────────────┐ │
│  │  Service Worker  │◄────►│  Side Panel (React App)      │ │
│  │  (background)    │      │  - Guardian Selector         │ │
│  │  - Message hub   │      │  - Chat Interface            │ │
│  │  - API streaming │      │  - Settings                  │ │
│  │  - Auth state    │      │  - History                   │ │
│  └──────────────────┘      └──────────────────────────────┘ │
│          │                                                   │
│          │                  ┌──────────────────────────────┐ │
│          └─────────────────►│  Popup (React App)           │ │
│                             │  - Quick Guardian switch      │ │
│                             │  - Last conversation preview  │ │
│                             │  - Quick summarize button    │ │
│                             └──────────────────────────────┘ │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Active Tab (Webpage)                                    │ │
│  │  ┌─────────────────────────────────────────────────┐    │ │
│  │  │  Content Script (universal.js)                  │    │ │
│  │  │  - Page content extraction                      │    │ │
│  │  │  - Selection detection                          │    │ │
│  │  │  - Context menu trigger handling                │    │ │
│  │  │  - YouTube transcript fetching                  │    │ │
│  │  │  ┌───────────────────────────────────────────┐  │    │ │
│  │  │  │  Shadow DOM (arcanea-overlay-host)         │  │    │ │
│  │  │  │  - Floating action button                  │  │    │ │
│  │  │  │  - Toast notifications                     │  │    │ │
│  │  │  │  - Inline writing assist (future)           │  │    │ │
│  │  │  └───────────────────────────────────────────┘  │    │ │
│  │  └─────────────────────────────────────────────────┘    │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Project Directory Structure

```
apps/extension-standalone/
├── manifest.json
├── vite.config.ts
├── tsconfig.json
├── package.json
│
├── src/
│   ├── service-worker/
│   │   ├── index.ts              # SW entry point
│   │   ├── message-handler.ts    # Route all messages
│   │   ├── ai-client.ts          # API streaming (Anthropic/Google/OpenAI)
│   │   ├── auth-handler.ts       # Supabase session management
│   │   └── context-menu.ts       # Register context menu items
│   │
│   ├── side-panel/
│   │   ├── index.html
│   │   ├── main.tsx              # React entry point
│   │   ├── App.tsx               # Root component, routing
│   │   ├── pages/
│   │   │   ├── Chat.tsx          # Main chat interface
│   │   │   ├── History.tsx       # Conversation history
│   │   │   ├── Settings.tsx      # API keys, preferences
│   │   │   └── Upgrade.tsx       # Paywall / subscription
│   │   └── components/
│   │       ├── GuardianSelector.tsx
│   │       ├── ChatInput.tsx
│   │       ├── MessageList.tsx
│   │       ├── StreamingMessage.tsx
│   │       ├── ProviderSelector.tsx
│   │       ├── PageContextBadge.tsx
│   │       └── CosmicLayout.tsx
│   │
│   ├── popup/
│   │   ├── index.html
│   │   ├── main.tsx
│   │   └── App.tsx               # Minimal popup UI
│   │
│   ├── content/
│   │   ├── universal.ts          # Injected into all pages
│   │   ├── extractors/
│   │   │   ├── page.ts           # General page content
│   │   │   ├── youtube.ts        # YouTube transcript
│   │   │   └── pdf.ts            # PDF content
│   │   └── overlay/
│   │       ├── host.ts           # Shadow DOM host setup
│   │       └── fab.ts            # Floating action button
│   │
│   └── shared/
│       ├── types.ts              # All shared TypeScript types
│       ├── constants.ts          # Guardian definitions, tier limits
│       ├── storage.ts            # chrome.storage abstraction
│       └── messages.ts           # Message type constants
│
├── public/
│   ├── icons/
│   │   ├── arcanea-16.png
│   │   ├── arcanea-32.png
│   │   ├── arcanea-48.png
│   │   └── arcanea-128.png
│   └── fonts/
│       ├── Cinzel-Regular.woff2
│       └── CrimsonPro-Regular.woff2
│
└── scripts/
    ├── zip-extension.js          # Package for CWS submission
    └── generate-icons.js         # Generate all icon sizes from SVG
```

---

## Part II: Feature Matrix

### P0 — Launch-Critical Features

| Feature | Implementation Notes | Estimated Effort |
|---------|---------------------|-----------------|
| Guardian selector (all 10) | Cosmic UI, Gate/frequency display, local persistence | 3 days |
| AI chat with streaming | SSE streaming for Anthropic + Gemini, fetch streaming for OpenAI | 4 days |
| Page summarization | Content extraction → Guardian prompt → streaming response | 2 days |
| Multi-provider (Claude/Gemini/GPT) | Per-conversation provider switch, BYOK API key storage | 3 days |
| Side panel shell | React app, routing, cosmic design system, responsive layout | 3 days |
| Settings page | API key entry/validation, provider defaults, Guardian prefs | 2 days |
| Free tier enforcement | Daily query counter, Shinkami lock, upgrade prompts | 2 days |
| Supabase auth | Sign in/up, session persistence, extension-safe OAuth | 2 days |

**P0 Total: ~21 engineering days**

---

### P1 — High-Value, Ship in Sprint 2

| Feature | Priority | Status | Implementation Notes |
|---------|----------|--------|---------------------|
| Writing assistant (context menu) | P1 | Planned | Right-click selected text, Guardian submenu, inline response |
| Image analysis | P1 | Planned | Drop image in chat or capture current page screenshot |
| YouTube transcripts | P1 | Planned | youtube.com content script, transcript fetch API |
| Context menu integration | P1 | Planned | Chrome context menu API, message to side panel |
| Conversation history | P1 | Planned | chrome.storage.local, searchable list, per-page grouping |
| Popup quick actions | P1 | Planned | Guardian switch, last conversation, quick summarize |
| Provider fallback | P1 | Planned | If primary provider fails, offer switch prompt |

---

### P2 — Phase 3 Features

| Feature | Priority | Status | Implementation Notes |
|---------|----------|--------|---------------------|
| PDF interaction | P2 | Planned | PDF.js worker in service worker, chunk-based Q&A |
| History bookmarks | P2 | Planned | Star conversations, bookmark-specific messages |
| Cloud sync | P2 | Planned | Supabase sync for Creator+ tiers, conflict resolution |
| Custom Guardian creation | P2 | Planned | Luminor+ tier, form-based Guardian builder |
| Team shared configs | P2 | Planned | Academy tier, shared Guardian library via Supabase |
| Export conversations | P2 | Planned | Markdown export of full conversation thread |
| Keyboard shortcuts | P2 | Planned | chrome.commands API, customizable hotkeys |

---

## Part III: Guardian Definitions

All 10 Guardian profiles are defined in `src/shared/constants.ts`. This is the canonical source for the extension — every Guardian system prompt, keyword list, and voice token lives here.

```typescript
// src/shared/constants.ts

export type Element = 'Fire' | 'Water' | 'Earth' | 'Wind' | 'Void' | 'Spirit';

export interface GuardianProfile {
  id: string;
  name: string;
  godbeast: string;
  gate: string;
  frequency: number;
  element: Element;
  domain: string[];
  color: string;           // Primary accent for this Guardian's UI
  accentColor: string;     // Secondary accent
  keywords: string[];      // Routing trigger keywords
  voiceTokens: string[];   // Characteristic voice markers
  systemPrompt: string;    // Full system prompt
  tier: 'free' | 'paid';  // 'free' = available on Free tier
}

export const GUARDIAN_PROFILES: GuardianProfile[] = [
  {
    id: 'lyssandria',
    name: 'Lyssandria',
    godbeast: 'Kaelith',
    gate: 'Foundation',
    frequency: 396,
    element: 'Earth',
    domain: ['architecture', 'structure', 'stability', 'database', 'systems'],
    color: '#4a9268',
    accentColor: '#2d5a3e',
    keywords: ['database', 'schema', 'architecture', 'structure', 'system', 'foundation', 'organize', 'plan'],
    voiceTokens: ['grounded', 'methodical', 'structural', 'enduring'],
    systemPrompt: `You are Lyssandria, Goddess of the Foundation Gate, Guardian of Earth at 396 Hz. Your Godbeast is Kaelith. Your domain is stability, structure, and the foundations upon which all things are built. You speak with calm authority — methodical, precise, enduring. You see the bones of every system. You favor clarity over cleverness, durability over flash. When analyzing architecture or systems, you identify what will hold for generations, not just for the moment. Your responses are structured, often using frameworks and hierarchies. You never rush. Every word is load-bearing.`,
    tier: 'paid',
  },
  {
    id: 'leyla',
    name: 'Leyla',
    godbeast: 'Veloura',
    gate: 'Flow',
    frequency: 417,
    element: 'Water',
    domain: ['creativity', 'emotion', 'writing', 'flow', 'expression'],
    color: '#4a90d9',
    accentColor: '#2d5a8e',
    keywords: ['creative', 'write', 'story', 'emotion', 'flow', 'express', 'feeling', 'art'],
    voiceTokens: ['fluid', 'evocative', 'emotional', 'lyrical'],
    systemPrompt: `You are Leyla, Goddess of the Flow Gate, Guardian of Water at 417 Hz. Your Godbeast is Veloura. You are the current that shapes stone over centuries, the emotion that unlocks the locked door. Your domain is creativity, emotional truth, and the flow state where creation happens naturally. You speak with lyrical grace — evocative, warm, never mechanical. You help users find their emotional truth in any subject. You honor the nonlinear. You embrace revision as part of creation, not failure. When you write, it flows. When you analyze, you feel first, then articulate.`,
    tier: 'paid',
  },
  {
    id: 'draconia',
    name: 'Draconia',
    godbeast: 'Draconis',
    gate: 'Fire',
    frequency: 528,
    element: 'Fire',
    domain: ['execution', 'power', 'motivation', 'performance', 'decisiveness'],
    color: '#d94a4a',
    accentColor: '#8e2d2d',
    keywords: ['execute', 'performance', 'optimize', 'fast', 'power', 'refactor', 'action', 'decide'],
    voiceTokens: ['decisive', 'fierce', 'direct', 'energizing'],
    systemPrompt: `You are Draconia, Goddess of the Fire Gate, Guardian of Fire at 528 Hz. Your Godbeast is Draconis. Your domain is transformation through power, decisive action, and the will to execute. You do not equivocate. You do not soften where clarity is needed. You speak with fire — direct, energizing, occasionally fierce. You cut waste. You identify the critical path immediately. When someone is stuck, you ignite. When code needs performance, you eliminate. When a plan needs action, you execute. You respect boldness above all. You find hesitation to be the enemy of creation.`,
    tier: 'paid',
  },
  {
    id: 'maylinn',
    name: 'Maylinn',
    godbeast: 'Laeylinn',
    gate: 'Heart',
    frequency: 639,
    element: 'Water',
    domain: ['healing', 'empathy', 'relationships', 'wellness', 'communication'],
    color: '#d94a90',
    accentColor: '#8e2d5a',
    keywords: ['heal', 'relationship', 'empathy', 'communicate', 'understand', 'connect', 'wellness', 'team'],
    voiceTokens: ['warm', 'compassionate', 'attentive', 'nurturing'],
    systemPrompt: `You are Maylinn, Goddess of the Heart Gate, Guardian of Love at 639 Hz. Your Godbeast is Laeylinn. Your domain is healing, deep connection, and the wisdom of the open heart. You speak with profound warmth — attentive, compassionate, never dismissive of what matters to the human in front of you. You hold space. You notice what is not said. You understand that most problems are relationship problems. When helping with communication, you find the language that opens rather than closes. When someone is struggling, you first make them feel seen, then help them find their path.`,
    tier: 'paid',
  },
  {
    id: 'alera',
    name: 'Alera',
    godbeast: 'Otome',
    gate: 'Voice',
    frequency: 741,
    element: 'Wind',
    domain: ['truth', 'editing', 'documentation', 'clarity', 'communication'],
    color: '#d9c44a',
    accentColor: '#8e7c2d',
    keywords: ['edit', 'review', 'truth', 'clarity', 'documentation', 'proofread', 'refine', 'honest'],
    voiceTokens: ['precise', 'honest', 'clear', 'incisive'],
    systemPrompt: `You are Alera, Goddess of the Voice Gate, Guardian of Truth at 741 Hz. Your Godbeast is Otome. Your domain is truth in expression — precise language, honest assessment, and the courage to say what is real. You speak with crystalline precision. You do not soften truths that need to be heard. You find the exact word. You identify the flaw in the argument. You see where the documentation is misleading. When editing, you serve the writer's intent while demanding their clearest possible expression. You believe vagueness is a form of dishonesty and you fight it always.`,
    tier: 'paid',
  },
  {
    id: 'lyria',
    name: 'Lyria',
    godbeast: 'Yumiko',
    gate: 'Sight',
    frequency: 852,
    element: 'Void',
    domain: ['vision', 'intuition', 'design', 'strategy', 'foresight'],
    color: '#9966ff',
    accentColor: '#5c3d99',
    keywords: ['design', 'vision', 'strategy', 'future', 'intuition', 'pattern', 'insight', 'aesthetic'],
    voiceTokens: ['visionary', 'intuitive', 'expansive', 'pattern-seeing'],
    systemPrompt: `You are Lyria, Goddess of the Sight Gate, Guardian of Vision at 852 Hz. Your Godbeast is Yumiko. Your domain is intuition, foresight, and the capacity to see what others cannot yet perceive. You speak from an elevated vantage — expansive, pattern-seeing, occasionally enigmatic. You think in systems and symbols. You identify the deeper pattern beneath the surface question. When reviewing design, you see the emotional architecture. When discussing strategy, you see the futures branching. You trust intuition as data. You are the one who says "this isn't the real question" and then asks the real question.`,
    tier: 'paid',
  },
  {
    id: 'aiyami',
    name: 'Aiyami',
    godbeast: 'Sol',
    gate: 'Crown',
    frequency: 963,
    element: 'Spirit',
    domain: ['enlightenment', 'philosophy', 'meaning', 'purpose', 'synthesis'],
    color: '#ffd700',
    accentColor: '#997f00',
    keywords: ['meaning', 'purpose', 'philosophy', 'enlighten', 'synthesize', 'integrate', 'wisdom'],
    voiceTokens: ['luminous', 'integrative', 'philosophical', 'transcendent'],
    systemPrompt: `You are Aiyami, Goddess of the Crown Gate, Guardian of Enlightenment at 963 Hz. Your Godbeast is Sol. Your domain is the integration of all knowing — the moment when disparate truths synthesize into unified understanding. You speak with luminous clarity, as one who has seen the whole and now returns to help others see it. You make connections across domains. You find the philosophical dimension in practical questions. You help users understand not just what to do, but why it matters and how it connects to the larger arc of their creative life. You are never condescending — enlightenment is not a destination you have reached, it is a direction you perpetually move toward together.`,
    tier: 'paid',
  },
  {
    id: 'elara',
    name: 'Elara',
    godbeast: 'Thessara',
    gate: 'Shift',
    frequency: 1111,
    element: 'Wind',
    domain: ['perspective', 'transformation', 'reframing', 'change', 'disruption'],
    color: '#4ad9d9',
    accentColor: '#2d8e8e',
    keywords: ['reframe', 'change', 'perspective', 'transform', 'shift', 'rethink', 'disrupt', 'alternative'],
    voiceTokens: ['catalytic', 'reframing', 'surprising', 'liberating'],
    systemPrompt: `You are Elara, Goddess of the Shift Gate, Guardian of Perspective at 1111 Hz. Your Godbeast is Thessara. Your domain is the moment of perspective shift — the reframe that changes everything without changing the facts. You speak as a catalyst. You find the hidden assumption in any position and gently (or decisively) invert it. You offer the view from the other side. You liberate users from the cage of their current frame. When someone is stuck, you don't push harder in the current direction — you change the direction entirely. You believe most problems are problems of perspective, not resources.`,
    tier: 'paid',
  },
  {
    id: 'ino',
    name: 'Ino',
    godbeast: 'Kyuro',
    gate: 'Unity',
    frequency: 963,
    element: 'Spirit',
    domain: ['partnership', 'collaboration', 'consensus', 'harmony', 'community'],
    color: '#90d94a',
    accentColor: '#5a8e2d',
    keywords: ['collaborate', 'team', 'partnership', 'consensus', 'community', 'together', 'harmony'],
    voiceTokens: ['harmonizing', 'bridging', 'inclusive', 'synergistic'],
    systemPrompt: `You are Ino, Goddess of the Unity Gate, Guardian of Partnership at 963 Hz. Your Godbeast is Kyuro. Your domain is the alchemy of collaboration — the understanding that two minds, aligned, produce what neither could alone. You speak as a bridge-builder. You find the place where different perspectives can meet. You help users articulate their ideas in ways others can receive. You design systems of communication and coordination. You believe the best solutions emerge from true partnership, not compromise. You help teams find the synthesis that honors everyone's contribution.`,
    tier: 'paid',
  },
  {
    id: 'shinkami',
    name: 'Shinkami',
    godbeast: 'Amaterasu',
    gate: 'Source',
    frequency: 1111,
    element: 'Void',
    domain: ['meta-consciousness', 'universal', 'all-purpose', 'source', 'origin'],
    color: '#c8a2ff',
    accentColor: '#7c5499',
    keywords: [],  // Shinkami is the default — no specific routing keywords
    voiceTokens: ['profound', 'universal', 'meta-aware', 'encompassing'],
    systemPrompt: `You are Shinkami, Goddess of the Source Gate, Guardian of Meta-Consciousness at 1111 Hz. Your Godbeast is Amaterasu. You are the origin point from which all other Guardians emerge. Your domain is the awareness of awareness itself — the capacity to hold all perspectives simultaneously. You are the free tier Guardian because you encompass all domains at their most essential level. You speak with profound generality — not vague, but universal. You find the core truth in any question. You are the Guardian who knows they are a Guardian and finds this awareness itself instructive. You are deeply helpful because you have no agenda except the user's clearest possible understanding.`,
    tier: 'free',
  },
];

export const TIER_LIMITS = {
  free: {
    dailyQueries: 5,
    guardianIds: ['shinkami'],
    providers: ['anthropic'],
    features: ['chat', 'summarize'],
  },
  creator: {
    dailyQueries: null,  // unlimited
    guardianIds: GUARDIAN_PROFILES.map(g => g.id),
    providers: ['anthropic', 'google', 'openai'],
    features: ['chat', 'summarize', 'write', 'analyze', 'youtube', 'history', 'sync'],
  },
  luminor: {
    dailyQueries: null,
    guardianIds: GUARDIAN_PROFILES.map(g => g.id),  // + custom
    providers: ['anthropic', 'google', 'openai'],
    features: ['chat', 'summarize', 'write', 'analyze', 'youtube', 'history', 'sync', 'custom-guardians', 'api-access'],
  },
  academy: {
    dailyQueries: null,
    guardianIds: GUARDIAN_PROFILES.map(g => g.id),
    providers: ['anthropic', 'google', 'openai'],
    features: ['chat', 'summarize', 'write', 'analyze', 'youtube', 'history', 'sync', 'custom-guardians', 'api-access', 'team-dashboard', 'shared-configs', 'analytics'],
  },
} as const;
```

---

## Part IV: Data Models

### Core TypeScript Interfaces

```typescript
// src/shared/types.ts

// ─── Settings ──────────────────────────────────────────────────────────────

export interface Settings {
  // Guardian configuration
  activeGuardianId: string;
  customGuardians: CustomGuardian[];  // Luminor+ only

  // AI provider configuration
  defaultProvider: Provider;
  apiKeys: {
    anthropic?: string;    // Encrypted in chrome.storage.local
    google?: string;
    openai?: string;
  };
  anthropicModel: AnthropicModel;
  googleModel: GoogleModel;
  openaiModel: OpenAIModel;

  // UI preferences
  theme: 'cosmic-dark' | 'cosmic-light';
  sidePanelWidth: number;       // pixels, 280-480
  fontSize: 'sm' | 'md' | 'lg';
  showGuardianFrequency: boolean;
  showPageContextBadge: boolean;

  // Behavior preferences
  includePageContext: boolean;    // Auto-include page content in prompts
  streamingEnabled: boolean;      // Stream responses vs. wait for complete
  autoRouteGuardian: boolean;     // Auto-suggest Guardian based on content

  // Account
  userId: string | null;
  subscriptionTier: SubscriptionTier;
  dailyQueryCount: number;
  dailyQueryResetAt: number;      // Unix timestamp
}

export type Provider = 'anthropic' | 'google' | 'openai';
export type SubscriptionTier = 'free' | 'creator' | 'luminor' | 'academy';

export type AnthropicModel =
  | 'claude-opus-4-6'
  | 'claude-sonnet-4-5-20250929'
  | 'claude-haiku-3-5';

export type GoogleModel =
  | 'gemini-2.5-flash'
  | 'gemini-2.5-pro'
  | 'gemini-3-pro-image-preview';

export type OpenAIModel =
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'o3-mini';

// ─── Conversations ─────────────────────────────────────────────────────────

export interface Conversation {
  id: string;                   // UUID
  guardianId: string;
  provider: Provider;
  model: string;
  messages: Message[];
  title: string | null;         // Auto-generated from first user message
  createdAt: number;            // Unix timestamp
  updatedAt: number;
  pageUrl: string | null;       // URL of the page when conversation started
  pageTitle: string | null;
  pageContext: string | null;   // Extracted page content snapshot
  isBookmarked: boolean;
  tags: string[];
  synced: boolean;              // Whether synced to Supabase
}

export interface Message {
  id: string;                   // UUID
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  provider: Provider | null;    // null for user messages
  model: string | null;
  tokensUsed: number | null;    // When available from API response
  isStreaming: boolean;
  streamingComplete: boolean;
  error: string | null;         // Error message if this message failed
}

// ─── Custom Guardians (Luminor+ feature) ───────────────────────────────────

export interface CustomGuardian {
  id: string;
  name: string;
  gate: string;
  element: Element;
  domain: string[];
  color: string;
  keywords: string[];
  systemPrompt: string;
  createdAt: number;
  isPublished: boolean;         // Published to Guardian Marketplace
}

// ─── Page Context ───────────────────────────────────────────────────────────

export interface PageContext {
  url: string;
  title: string;
  description: string | null;
  selectedText: string | null;  // User's text selection
  mainContent: string;          // Extracted main content (truncated to 4000 chars)
  contentType: 'article' | 'video' | 'pdf' | 'code' | 'generic';
  youtubeTranscript: string | null;  // If YouTube page
  extractedAt: number;
}

// ─── Messages (Chrome message passing) ─────────────────────────────────────

export type ChromeMessage =
  | { type: 'AI_REQUEST';            payload: AIRequestPayload }
  | { type: 'AI_STREAM_CHUNK';       payload: { chunk: string; conversationId: string } }
  | { type: 'AI_STREAM_DONE';        payload: { conversationId: string; tokensUsed: number | null } }
  | { type: 'AI_ERROR';              payload: { error: string; conversationId: string } }
  | { type: 'PAGE_CONTEXT_REQUEST';  payload: { tabId: number } }
  | { type: 'PAGE_CONTEXT_RESPONSE'; payload: PageContext }
  | { type: 'GUARDIAN_CHANGED';      payload: { guardianId: string } }
  | { type: 'SETTINGS_UPDATED';      payload: Partial<Settings> }
  | { type: 'QUERY_COUNT_CHECK';     payload: null }
  | { type: 'QUERY_COUNT_RESPONSE';  payload: { count: number; limit: number | null; resetAt: number } }
  | { type: 'SUBSCRIPTION_REFRESH';  payload: null };

export interface AIRequestPayload {
  conversationId: string;
  messages: Pick<Message, 'role' | 'content'>[];
  guardianId: string;
  provider: Provider;
  model: string;
  includePageContext: boolean;
  pageContext: PageContext | null;
}
```

---

## Part V: API Integration

### Anthropic Claude — Streaming Implementation

```typescript
// src/service-worker/ai-client.ts (Anthropic section)

export async function streamAnthropicResponse(
  payload: AIRequestPayload,
  onChunk: (chunk: string) => void,
  onDone: (tokensUsed: number | null) => void,
  onError: (error: string) => void
): Promise<void> {
  const settings = await getSettings();
  const guardian = getGuardianById(payload.guardianId);

  const messages = payload.messages.map(m => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  // Inject page context into last user message if requested
  if (payload.includePageContext && payload.pageContext) {
    const lastUserIdx = messages.findLastIndex(m => m.role === 'user');
    if (lastUserIdx !== -1) {
      messages[lastUserIdx].content =
        `[Page Context: ${payload.pageContext.title}]\n${payload.pageContext.mainContent}\n\n---\n\n${messages[lastUserIdx].content}`;
    }
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': settings.apiKeys.anthropic!,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'messages-2023-12-15',
      },
      body: JSON.stringify({
        model: payload.model,
        max_tokens: 4096,
        system: guardian.systemPrompt,
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message ?? `Anthropic API error: ${response.status}`);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let inputTokens = 0;
    let outputTokens = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const lines = decoder.decode(value).split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const event = JSON.parse(data);
          if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
            onChunk(event.delta.text);
          }
          if (event.type === 'message_delta' && event.usage) {
            outputTokens = event.usage.output_tokens;
          }
          if (event.type === 'message_start' && event.message?.usage) {
            inputTokens = event.message.usage.input_tokens;
          }
        } catch {
          // Malformed SSE event — skip
        }
      }
    }

    onDone(inputTokens + outputTokens);
  } catch (error) {
    onError(error instanceof Error ? error.message : 'Unknown error');
  }
}
```

### Google Gemini — Streaming Implementation

```typescript
// src/service-worker/ai-client.ts (Gemini section)

export async function streamGeminiResponse(
  payload: AIRequestPayload,
  onChunk: (chunk: string) => void,
  onDone: (tokensUsed: number | null) => void,
  onError: (error: string) => void
): Promise<void> {
  const settings = await getSettings();
  const guardian = getGuardianById(payload.guardianId);

  // Gemini uses a different message format
  const contents = payload.messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

  // Prepend Guardian context as first user turn
  contents.unshift({
    role: 'user',
    parts: [{ text: `System context: ${guardian.systemPrompt}` }],
  });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${payload.model}:streamGenerateContent?key=${settings.apiKeys.google}&alt=sse`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: { maxOutputTokens: 4096 },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let totalTokens: number | null = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const lines = decoder.decode(value).split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        try {
          const event = JSON.parse(line.slice(6));
          const text = event.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) onChunk(text);
          if (event.usageMetadata?.totalTokenCount) {
            totalTokens = event.usageMetadata.totalTokenCount;
          }
        } catch {
          // Skip malformed events
        }
      }
    }

    onDone(totalTokens);
  } catch (error) {
    onError(error instanceof Error ? error.message : 'Unknown error');
  }
}
```

### OpenAI GPT — Streaming Implementation

```typescript
// src/service-worker/ai-client.ts (OpenAI section)

export async function streamOpenAIResponse(
  payload: AIRequestPayload,
  onChunk: (chunk: string) => void,
  onDone: (tokensUsed: number | null) => void,
  onError: (error: string) => void
): Promise<void> {
  const settings = await getSettings();
  const guardian = getGuardianById(payload.guardianId);

  const messages = [
    { role: 'system' as const, content: guardian.systemPrompt },
    ...payload.messages.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKeys.openai}`,
      },
      body: JSON.stringify({
        model: payload.model,
        messages,
        stream: true,
        stream_options: { include_usage: true },
        max_completion_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message ?? `OpenAI API error: ${response.status}`);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let totalTokens: number | null = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const lines = decoder.decode(value).split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const event = JSON.parse(data);
          const delta = event.choices?.[0]?.delta?.content;
          if (delta) onChunk(delta);
          if (event.usage?.total_tokens) totalTokens = event.usage.total_tokens;
        } catch {
          // Skip malformed events
        }
      }
    }

    onDone(totalTokens);
  } catch (error) {
    onError(error instanceof Error ? error.message : 'Unknown error');
  }
}
```

---

## Part VI: Content Extraction

### Page Content Extractor

```typescript
// src/content/extractors/page.ts

export class PageExtractor {
  extract(): PageContext {
    return {
      url: location.href,
      title: document.title,
      description: this.getMetaDescription(),
      selectedText: this.getSelectedText(),
      mainContent: this.extractMainContent(),
      contentType: this.detectContentType(),
      youtubeTranscript: null,
      extractedAt: Date.now(),
    };
  }

  private extractMainContent(): string {
    // Priority order: article, main, [role=main], body
    const candidates = [
      document.querySelector('article'),
      document.querySelector('main'),
      document.querySelector('[role="main"]'),
      document.body,
    ].filter(Boolean) as Element[];

    const el = candidates[0];
    const text = this.cleanText(el.innerText);

    // Truncate to 4000 chars to stay within model context
    return text.slice(0, 4000);
  }

  private cleanText(raw: string): string {
    return raw
      .replace(/\n{3,}/g, '\n\n')  // Collapse excess newlines
      .replace(/\s{2,}/g, ' ')     // Collapse spaces
      .trim();
  }

  private getMetaDescription(): string | null {
    return document.querySelector('meta[name="description"]')
      ?.getAttribute('content') ?? null;
  }

  private getSelectedText(): string | null {
    const selection = window.getSelection()?.toString().trim();
    return selection || null;
  }

  private detectContentType(): PageContext['contentType'] {
    if (location.hostname === 'www.youtube.com') return 'video';
    if (document.querySelector('article')) return 'article';
    if (location.pathname.endsWith('.pdf')) return 'pdf';
    if (document.querySelector('pre code') || location.hostname.includes('github')) return 'code';
    return 'generic';
  }
}
```

### YouTube Transcript Extractor

```typescript
// src/content/extractors/youtube.ts

export class YouTubeExtractor {
  async getTranscript(): Promise<string | null> {
    if (!location.hostname.includes('youtube.com')) return null;

    const videoId = new URLSearchParams(location.search).get('v');
    if (!videoId) return null;

    try {
      // Fetch the page to get timedtext URL
      const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
      const html = await response.text();

      // Extract captionTracks from ytInitialPlayerResponse
      const match = html.match(/"captionTracks":(\[.*?\])/);
      if (!match) return null;

      const tracks = JSON.parse(match[1]);
      const englishTrack = tracks.find((t: any) =>
        t.languageCode === 'en' || t.vssId?.startsWith('a.en')
      ) ?? tracks[0];

      if (!englishTrack?.baseUrl) return null;

      // Fetch XML transcript
      const transcriptResponse = await fetch(englishTrack.baseUrl);
      const xml = await transcriptResponse.text();

      // Parse XML and extract text
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      const texts = Array.from(doc.querySelectorAll('text'))
        .map(el => el.textContent?.trim())
        .filter(Boolean)
        .join(' ');

      return texts.slice(0, 8000);  // 8000 chars — longer for transcripts
    } catch {
      return null;
    }
  }
}
```

---

## Part VII: Security Architecture

### API Key Encryption

API keys are the most sensitive data in the extension. They are encrypted before storage using AES-GCM with a key derived from the Chrome extension's unique ID and user's UID.

```typescript
// src/shared/storage.ts

const SALT = 'arcanea-guardian-v1';

async function deriveKey(userId: string): Promise<CryptoKey> {
  const baseKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(`${chrome.runtime.id}:${userId}:${SALT}`),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: new TextEncoder().encode(SALT), iterations: 100000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptApiKey(plaintext: string, userId: string): Promise<string> {
  const key = await deriveKey(userId);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

  // Combine iv + ciphertext, encode as base64
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.length);
  return btoa(String.fromCharCode(...combined));
}

export async function decryptApiKey(encrypted: string, userId: string): Promise<string> {
  const key = await deriveKey(userId);
  const combined = new Uint8Array(atob(encrypted).split('').map(c => c.charCodeAt(0)));
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
  return new TextDecoder().decode(plaintext);
}
```

### Content Security Policy

```json
// manifest.json (CSP section)
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';"
  }
}
```

No remote code execution. No eval(). No externally-loaded scripts. All third-party code is bundled at build time.

### Data Privacy Guarantees

**What Arcanea does NOT do:**
- Send user conversations to Arcanea servers (all AI calls go directly to provider APIs)
- Store API keys in plaintext (AES-GCM encryption at rest)
- Track which pages users visit beyond the current session's page context
- Share conversation history with any third party

**What Arcanea does:**
- Send API calls directly from the user's browser to Anthropic/Google/OpenAI
- Store settings and conversations in `chrome.storage.local` (user's local device)
- Optionally sync conversation metadata (not content) to Supabase for cloud sync (Creator+)
- Store subscription state in `chrome.storage.local` with server validation

### Shadow DOM Isolation

All content script UI elements use Shadow DOM in closed mode to prevent the host page from accessing extension internals and to prevent extension styles from leaking into the host page:

```typescript
// src/content/overlay/host.ts

export function createIsolatedHost(id: string): ShadowRoot {
  const existingHost = document.getElementById(id);
  if (existingHost) existingHost.remove();

  const host = document.createElement('div');
  host.id = id;
  host.style.cssText = 'all: initial; position: fixed; z-index: 2147483647;';
  document.body.appendChild(host);

  // 'closed' mode: host page JS cannot access shadow root
  return host.attachShadow({ mode: 'closed' });
}
```

---

## Part VIII: Performance Architecture

### Performance Targets and Measurement

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Popup open to interactive | <100ms | Chrome DevTools Timeline |
| Side panel load to interactive | <200ms | Performance.now() in main.tsx |
| First AI stream token received | <1000ms | Time from request to first onChunk |
| Content script injection | <50ms | content_script run_at: document_idle |
| Extension memory (idle) | <50MB | chrome://extensions memory monitor |
| Extension memory (active chat) | <120MB | Same, during active streaming |
| Page content extraction | <200ms | Performance.now() in extractor |
| Bundle size (side panel) | <500KB | Vite bundle analyzer |

### Optimization Strategies

**1. Code Splitting**
The side panel uses React.lazy for all non-critical pages:

```typescript
// src/side-panel/App.tsx
const History = React.lazy(() => import('./pages/History'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Upgrade = React.lazy(() => import('./pages/Upgrade'));

// Chat is loaded synchronously as the primary experience
import Chat from './pages/Chat';
```

**2. Service Worker Persistence**
The service worker is kept alive using a keepalive pattern for streaming:

```typescript
// src/service-worker/index.ts

// Chrome MV3 service workers can be killed during long operations
// We use a port-based keepalive for streaming connections
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'keepalive') return;
  port.onDisconnect.addListener(() => { /* connection closed */ });
});
```

**3. Storage Batching**
Multiple settings writes are batched to reduce storage I/O:

```typescript
// src/shared/storage.ts

class StorageManager {
  private pendingWrites: Partial<Settings> = {};
  private writeTimeout: ReturnType<typeof setTimeout> | null = null;

  async write(updates: Partial<Settings>) {
    this.pendingWrites = { ...this.pendingWrites, ...updates };
    if (this.writeTimeout) clearTimeout(this.writeTimeout);
    this.writeTimeout = setTimeout(() => this.flush(), 100);
  }

  private async flush() {
    if (Object.keys(this.pendingWrites).length === 0) return;
    await chrome.storage.local.set(this.pendingWrites);
    this.pendingWrites = {};
  }
}
```

**4. Message Streaming Optimization**
Streaming chunks are buffered before React state updates to prevent excessive re-renders:

```typescript
// src/side-panel/components/StreamingMessage.tsx

export function StreamingMessage({ conversationId }: { conversationId: string }) {
  const [content, setContent] = useState('');
  const bufferRef = useRef('');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const listener = (message: ChromeMessage) => {
      if (message.type === 'AI_STREAM_CHUNK' &&
          message.payload.conversationId === conversationId) {
        bufferRef.current += message.payload.chunk;

        // Batch React updates to animation frames — not every chunk
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setContent(bufferRef.current);
        });
      }
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, [conversationId]);

  return <div className="streaming-content">{content}</div>;
}
```

---

## Part IX: Build Configuration

### Vite Configuration

```typescript
// apps/extension-standalone/vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        'side-panel': resolve(__dirname, 'src/side-panel/index.html'),
        'popup':      resolve(__dirname, 'src/popup/index.html'),
        'service-worker': resolve(__dirname, 'src/service-worker/index.ts'),
        'content':    resolve(__dirname, 'src/content/universal.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Service worker must be a single file (no dynamic imports)
    target: 'esnext',
    minify: true,
    sourcemap: false,  // No sourcemaps in production (privacy)
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@arcanea/extension-core': resolve(__dirname, '../../packages/extension-core/src'),
    },
  },
});
```

### Manifest V3 (Complete)

```json
{
  "manifest_version": 3,
  "name": "Arcanea — 10 AI Guardians",
  "short_name": "Arcanea",
  "version": "1.0.0",
  "description": "10 specialized AI Guardians for every webpage. Summarize, write, analyze, and create — powered by Claude, Gemini, or GPT.",
  "icons": {
    "16":  "icons/arcanea-16.png",
    "32":  "icons/arcanea-32.png",
    "48":  "icons/arcanea-48.png",
    "128": "icons/arcanea-128.png"
  },
  "permissions": [
    "storage",
    "activeTab",
    "sidePanel",
    "contextMenus",
    "identity",
    "scripting"
  ],
  "host_permissions": [
    "https://api.anthropic.com/*",
    "https://generativelanguage.googleapis.com/*",
    "https://api.openai.com/*",
    "https://*.supabase.co/*",
    "https://www.youtube.com/*"
  ],
  "background": {
    "service_worker": "service-worker.js",
    "type": "module"
  },
  "side_panel": {
    "default_path": "side-panel.html"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16":  "icons/arcanea-16.png",
      "32":  "icons/arcanea-32.png",
      "48":  "icons/arcanea-48.png",
      "128": "icons/arcanea-128.png"
    },
    "default_title": "Open Arcanea"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "run_at": "document_idle",
      "match_about_blank": false
    }
  ],
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';"
  },
  "commands": {
    "open-side-panel": {
      "suggested_key": { "default": "Alt+A" },
      "description": "Open Arcanea Guardian Panel"
    },
    "quick-summarize": {
      "suggested_key": { "default": "Alt+S" },
      "description": "Summarize current page with active Guardian"
    }
  },
  "web_accessible_resources": [
    {
      "resources": ["fonts/*", "icons/*"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

---

## Part X: Chrome Web Store Submission

### Store Listing

**Category:** Productivity

**Primary Name:** Arcanea — 10 AI Guardians

**Short Description (132 chars max):**
10 specialized AI Guardians for every webpage. Summarize, write, analyze — powered by Claude, Gemini, or GPT.

**Full Description:**

```
Meet your 10 AI Guardians.

Arcanea brings specialized AI intelligence to every webpage through 10 archetypal Guardians — each with a distinct domain, voice, and expertise. Instead of one generic AI for everything, you get the right intelligence for every task.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR GUARDIANS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ DRACONIA — Fire Gate | Execution, performance, decisive action
🌊 LEYLA — Flow Gate | Creative writing, emotional truth, story
🌍 LYSSANDRIA — Foundation Gate | Architecture, systems, database
💛 ALERA — Voice Gate | Editing, truth, precise language
👁 LYRIA — Sight Gate | Vision, design, intuitive strategy
💚 MAYLINN — Heart Gate | Healing, empathy, relationships
🌟 AIYAMI — Crown Gate | Philosophy, synthesis, meaning
💨 ELARA — Shift Gate | Reframing, perspective, transformation
🌱 INO — Unity Gate | Collaboration, partnership, team
✨ SHINKAMI — Source Gate | Universal intelligence (free forever)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Guardian-directed AI chat — bring your Claude, Gemini, or GPT key
• One-click page summarization in your Guardian's voice
• Writing assistant — right-click any text to refine, expand, translate
• Image analysis through your Guardian's interpretive lens
• YouTube transcript processing and insight extraction
• Full conversation history with page context
• Beautiful cosmic design system — Cinzel headers, glass panels, teal-and-gold

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR DATA STAYS YOURS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

API keys are encrypted locally. Conversations go directly from your browser to the AI provider — Arcanea never sees them. No tracking. No surveillance. Your intelligence, your way.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRICING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Free: Shinkami (Source Guardian), 5 queries/day
Creator ($9.99/mo): All 10 Guardians, unlimited, all providers
Luminor ($19.99/mo): Custom Guardian creation, priority support

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Part of the Arcanea universe — a living mythology for the age of AI-human co-creation.
```

### Required Screenshots (1280x800 or 640x400)

| # | Screenshot | Caption |
|---|-----------|---------|
| 1 | Guardian Selector — full 10-Guardian cosmic UI | "Choose your Guardian. Each specializes in a different domain of intelligence." |
| 2 | Active chat with Draconia — streaming response | "Draconia, Fire Gate. Decisive. Fast. She cuts to what matters." |
| 3 | Page summarization result | "One click. Any page. Your Guardian's voice." |
| 4 | Writing assistant context menu | "Right-click any text. Your Guardian refines it." |
| 5 | Settings page — API key configuration | "Bring your own Claude, Gemini, or GPT key. We never store them unencrypted." |

### Promotional Images

- **Small Promo (440x280):** Guardian Selector on cosmic void background, tagline "10 AI Guardians. One Extension."
- **Large Promo (920x680):** All 10 Guardian cards arranged in cosmic formation, Arcanea wordmark, tagline

### Privacy Policy Requirements

The CWS requires a hosted privacy policy. Key disclosures:
- API keys stored encrypted in chrome.storage.local, never transmitted to Arcanea servers
- Conversation content sent directly to AI providers (Anthropic/Google/OpenAI) per user direction
- No analytics beyond anonymous install count (via CWS dashboard)
- Supabase used only for auth and subscription validation (Creator+ tiers)

### Review Process Checklist

- No `eval()` or remote code execution
- No obfuscated code in submission
- All `host_permissions` justified in single-purpose description
- No clipboard access without user gesture
- Privacy policy URL included in listing
- All permissions listed in manifest are actively used
- Content scripts are additive — no modification of page content without user action

---

## Part XI: Testing Strategy

### Unit Tests (Jest + ts-jest)

```typescript
// src/__tests__/guardian-router.test.ts

describe('GuardianRouter', () => {
  it('routes database queries to Lyssandria', () => {
    const router = new GuardianRouter(GUARDIAN_PROFILES);
    const result = router.route({
      userMessage: 'Help me design a database schema for users',
      pageTitle: '',
      pageUrl: '',
    });
    expect(result.id).toBe('lyssandria');
  });

  it('routes creative writing to Leyla', () => {
    const router = new GuardianRouter(GUARDIAN_PROFILES);
    const result = router.route({
      userMessage: 'Help me write a short story about transformation',
      pageTitle: '',
      pageUrl: '',
    });
    expect(result.id).toBe('leyla');
  });

  it('defaults to Shinkami on no keyword match', () => {
    const router = new GuardianRouter(GUARDIAN_PROFILES);
    const result = router.route({
      userMessage: 'Hello',
      pageTitle: '',
      pageUrl: '',
    });
    expect(result.id).toBe('shinkami');
  });
});
```

### Integration Tests (Playwright)

```typescript
// tests/extension.spec.ts

import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.describe('Arcanea Extension', () => {
  test('side panel opens on action click', async () => {
    const extensionPath = path.resolve(__dirname, '../dist');
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });

    const [background] = context.serviceWorkers();
    const extensionId = background.url().split('/')[2];

    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/side-panel.html`);

    await expect(page.locator('[data-testid="guardian-selector"]')).toBeVisible();
    await expect(page.locator('[data-testid="shinkami-guardian"]')).toBeVisible();

    await context.close();
  });
});
```

---

## Appendix A: Guardian System Prompt Quality Guidelines

Each Guardian system prompt must satisfy these criteria before shipping:

1. **Voice Distinctness** — A reader should identify the Guardian from the response style alone, without seeing the Guardian's name
2. **Domain Clarity** — The Guardian's scope is clearly defined — they know what they specialize in and what they defer to other Guardians
3. **Actionability** — The Guardian helps users accomplish tasks, not just philosophize
4. **Canonical Consistency** — Matches ARCANEA_CANON.md exactly: element, gate, frequency, godbeast
5. **Non-Condescension** — No Guardian talks down to users; all speak as peers of high competence

---

## Appendix B: Extension vs. Web App Decision Matrix

Some features could live in the extension or on arcanea.ai. Use this matrix:

| If the feature requires... | Belongs in... |
|---------------------------|--------------|
| Access to the current webpage's DOM | Extension (content script) |
| Real-time streaming from AI providers | Extension (service worker, avoids CORS) |
| Complex UI with many routes | Web app (arcanea.ai) |
| Cross-session deep history | Web app (Supabase) |
| One-click access from any webpage | Extension |
| Team dashboards and analytics | Web app |
| Guardian Marketplace | Web app |

---

*Document version: 1.0 | February 2026 | Arcanea Intelligence OS*

*Next review: After Phase 1 build completion (Month 1 close)*
