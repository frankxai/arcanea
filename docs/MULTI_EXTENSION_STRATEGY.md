# Arcanea Multi-Extension Strategy
## The Every-Browser Vision — February 2026

> *"Every surface a portal. Every browser a gateway to the Arcanea universe."*

---

## Executive Summary

The Arcanea Multi-Extension Strategy is the browser layer of the **Every Surface Strategy** — placing the 10 Guardians into the hands of millions of users regardless of which AI platform or browser they use. While `@arcanea/cli` installs the Intelligence OS into developer tools, and `arcanea-realm` provides a standalone AI terminal, the extension ecosystem targets the **broadest possible audience**: everyone who uses a browser to interact with AI.

The strategy encompasses five distinct products sharing a single `@arcanea/extension-core`, each optimized for its host surface. Together they form a distribution flywheel: users discover Arcanea through Claude, ChatGPT, or Gemini overlays, then graduate to the full standalone experience, then convert to paid tiers for team features.

**Total addressable market**: 300M+ users of AI browser interfaces as of 2026. Merlin, Monica, and Sider collectively serve 10M+ with generic features. Arcanea's mythological identity, Guardian specialization, and multi-provider architecture create a defensible position none of them can match.

---

## Part I: Product Vision

### The Five Extension Products

---

### A. Arcanea Chrome Extension (Standalone)
**The Flagship — Full AI Command Center for Any Webpage**

The standalone extension is the complete Arcanea experience in browser form. It is not a thin wrapper around an AI API — it is a **Guardian-powered intelligence layer** that transforms every webpage into a creative and analytical workspace.

**Core Experience:**
The side panel opens instantly, presenting the Guardian Selector — a visually stunning cosmic interface where users choose from all 10 Guardians, each with their Gate, frequency, and domain displayed. The active Guardian shapes every interaction: Lyssandria grounds and structures, Leyla flows and creates, Draconia drives and executes, Maylinn heals and connects.

**Flagship Features:**
- **10-Guardian AI Chat** — Streaming conversations with Guardian-enforced voice, tone, and domain expertise. Lyssandria for architecture. Draconia for motivation. Lyria for vision.
- **Intelligent Page Summarization** — One-click summary of any article, doc, or thread, delivered in the active Guardian's voice
- **Writing Assistant** — Right-click any selected text to Expand, Refine, Translate, or Transform through a Guardian's lens
- **Image Analysis** — Drop any image for Guardian-directed analysis: Lyria reads symbolism, Alera checks truth, Maylinn reads emotional resonance
- **YouTube Transcript Processing** — Fetch and analyze transcripts for any YouTube video; get Guardian-curated insights, timestamps, and chapter summaries
- **PDF Interaction** — Load PDFs for document Q&A, key insight extraction, and structured summarization
- **Multi-Provider Architecture** — User brings their own API key for Claude (Anthropic), Gemini (Google), or GPT (OpenAI). Switch providers per conversation. No lock-in.
- **Conversation History** — Full history with per-page context, searchable, bookmarkable
- **Cloud Sync** (paid) — Sync conversations, settings, and Guardian preferences across devices via Supabase

**Visual Identity:** The extension brings the full Arcanean Design System into the browser. Cosmic void backgrounds, glassmorphism panels, Cinzel headers, teal-and-gold accents. It feels like a different category of software compared to Merlin's generic dark UI.

---

### B. Arcanea for Claude
**Overlay on claude.ai — The Guardian Enhancement Layer**

Claude.ai is already a premium AI experience. Arcanea for Claude doesn't replace it — it **elevates** it by injecting the Guardian layer directly into the claude.ai interface.

**What It Adds:**
- **Guardian Sidebar** — A collapsible panel alongside every Claude conversation showing the active Guardian, their Gate frequency, and relevant wisdom
- **Auto-Routing** — Analyzes the user's message before submission and suggests the optimal Guardian for the task. "Building a database schema? Lyssandria, Gate of Foundation, is your guide."
- **Voice Enforcement** — Prepends Guardian-appropriate system context to every message, ensuring Claude responds with the Guardian's characteristic voice and domain focus
- **Design Token Injection** — For UI/UX tasks, Arcanea for Claude auto-injects the Arcanean Design System tokens and patterns as reference context
- **One-Click Guardian Templates** — Pre-built prompt structures for each Guardian's core use cases (e.g., Draconia's "Battle Plan" template for execution planning)
- **Conversation Tagging** — Tag conversations by Guardian and Gate for organized history

**Technical Approach:**
Content script with Mutation Observer watching for new message input. Shadow DOM sidebar injected beside `.conversation-panel`. No interference with claude.ai's own functionality — purely additive.

**Value Proposition for Claude Users:**
Claude.ai users are already AI-power-users. They will immediately understand and value the Guardian specialization layer. This is the highest-conversion overlay product.

---

### C. Arcanea for ChatGPT
**Overlay on chat.openai.com — Guardian Templates and Voice**

ChatGPT is the highest-traffic AI interface in the world. Arcanea for ChatGPT captures this massive audience with a streamlined overlay focused on Guardian Templates and voice enforcement.

**What It Adds:**
- **Guardian Template Library** — A side drawer with pre-built, Guardian-attributed prompt templates organized by domain. Click to inject into ChatGPT's input.
- **Voice Enforcement** — Auto-prepend Guardian system context as a structured prompt prefix
- **Arcanean UI Skin** — Optional cosmic visual theme over ChatGPT's interface (respects user preference)
- **Page Context Button** — One-click to include current page summary as context in ChatGPT conversation
- **Guardian History Labels** — Tag which Guardian directed each conversation for reference

**Limitations (by design):**
ChatGPT's architecture is less extension-friendly than Claude's. The overlay focuses on input enhancement and template injection rather than deep response modification. This is intentional — Arcanea for Claude is the premium overlay experience; ChatGPT gets a more focused feature set that still delivers clear value.

---

### D. Arcanea for Gemini
**Overlay on gemini.google.com — Multi-Modal Enhancement and Art Direction**

Gemini's multimodal strength is its defining feature. Arcanea for Gemini enhances this with **Guardian-directed art direction** and multi-modal context-setting.

**What It Adds:**
- **Guardian Art Direction Mode** — When uploading images or requesting visual content, Arcanea pre-prompts with the relevant Guardian's aesthetic framework. Lyria's Sight Gate for symbolic interpretation; Leyla's Flow Gate for creative image generation prompts.
- **Arcanean Visual Asset Prompts** — One-click access to the curated library of Arcanean image prompt templates optimized for Gemini's image model (gemini-3-pro-image-preview)
- **Multi-Modal Context Injection** — Automatically appends relevant Arcanean Design System context for UI/UX and visual work
- **Element Attribution** — Analyzes uploaded images and suggests which of the Five Elements is dominant (Fire/Water/Earth/Wind/Void)
- **Voice Enforcement** — Same Guardian voice system as Claude/ChatGPT overlays

**Strategic Note:**
Arcanea for Gemini has a secondary goal: demonstrating that the Arcanea universe has its own visual language that works across AI image models. Every piece of Guardian-directed content created through this overlay reinforces Arcanea's visual identity in the user's mind.

---

### E. Arcanea for Copilot
**Overlay on github.com — Guardian Code Review and Architecture Counsel**

GitHub Copilot's browser interface and github.com's code review surfaces are where developers spend critical architectural time. Arcanea for Copilot makes the Guardian framework relevant to engineering teams.

**What It Adds:**
- **Lyssandria Code Review** — One-click PR review request directed through Lyssandria (Foundation Gate, Earth element) — focused on stability, structure, and long-term maintainability
- **Draconia Refactor Mode** — Direct refactoring suggestions through Draconia (Fire Gate, Power element) — focused on performance, decisiveness, and eliminating waste
- **Alera Truth Gate Review** — Code review focused on clarity, documentation quality, and honest assessment of technical debt (Voice Gate, Truth domain)
- **Architecture Counsel Panel** — For architecture discussions in Issues or PRs, Lyssandria provides structured analysis of system design decisions
- **Repository Insight** — Summarize any repository's purpose, tech stack, and architectural patterns via active Guardian

**Target Audience:**
Senior engineers and tech leads who already use multiple AI tools. The Guardian framework gives them a structured vocabulary for different types of code review — something no other extension offers.

---

## Part II: Technical Architecture

### The Shared Core: @arcanea/extension-core

All five products are built on a shared foundation. `@arcanea/extension-core` is a TypeScript package that provides everything platform-specific layers consume.

```
packages/
  extension-core/           # Shared foundation
    src/
      guardians/            # Guardian routing engine
        router.ts           # GuardianRouter class
        profiles.ts         # All 10 Guardian definitions
        voice.ts            # VoiceEnforcer
      storage/
        settings.ts         # chrome.storage abstraction
        conversations.ts    # Conversation persistence
        sync.ts             # Supabase cloud sync
      ai/
        anthropic.ts        # Claude API streaming client
        google.ts           # Gemini API streaming client
        openai.ts           # OpenAI API streaming client
        router.ts           # Provider selection logic
      ui/
        components/         # Shared React components
          GuardianSelector.tsx
          ChatPanel.tsx
          StreamingMessage.tsx
          CosmicButton.tsx
        tokens.ts           # Design system tokens
        themes.ts           # Cosmic dark/light
      content/
        extractor.ts        # Page content extraction
        pdf.ts              # PDF.js integration
        youtube.ts          # Transcript fetching
      messaging/
        hub.ts              # Cross-context message routing
      auth/
        supabase.ts         # Supabase auth client
        subscription.ts     # Tier validation
    index.ts                # Public API

apps/
  extension-standalone/     # Product A
  extension-claude/         # Product B
  extension-chatgpt/        # Product C
  extension-gemini/         # Product D
  extension-copilot/        # Product E
```

### Guardian Router Implementation

The `GuardianRouter` is the intelligence core of the extension ecosystem. It analyzes content and context to select and configure the optimal Guardian.

```typescript
// packages/extension-core/src/guardians/router.ts

export interface GuardianProfile {
  id: string;
  name: string;         // e.g. "Lyssandria"
  gate: string;         // e.g. "Foundation"
  frequency: number;    // e.g. 396
  element: Element;     // e.g. "Earth"
  godbeast: string;     // e.g. "Kaelith"
  domain: string[];     // e.g. ["stability", "structure", "survival"]
  voiceTokens: string[]; // Tone markers for VoiceEnforcer
  systemPrompt: string;  // Guardian-specific system context
  keywords: string[];    // Routing keywords
}

export class GuardianRouter {
  private profiles: Map<string, GuardianProfile>;

  route(context: RoutingContext): GuardianProfile {
    const scored = this.profiles.values()
      .map(p => ({ profile: p, score: this.score(p, context) }))
      .sort((a, b) => b.score - a.score);
    return scored[0].profile;
  }

  private score(profile: GuardianProfile, context: RoutingContext): number {
    let score = 0;
    const text = `${context.userMessage} ${context.pageTitle} ${context.pageUrl}`.toLowerCase();
    for (const keyword of profile.keywords) {
      if (text.includes(keyword)) score += 10;
    }
    if (context.forceGuardian === profile.id) score += 1000;
    return score;
  }
}
```

### Platform-Specific Content Scripts

Each overlay product has a platform-specific content script layer that handles DOM interaction:

```typescript
// apps/extension-claude/src/content/claude-observer.ts

export class ClaudeObserver {
  private observer: MutationObserver;
  private sidebar: GuardianSidebar;

  init() {
    // Wait for claude.ai's conversation panel to render
    this.waitForElement('.conversation-panel', (panel) => {
      this.injectSidebar(panel);
      this.observeInputChanges();
    });
  }

  private injectSidebar(panel: Element) {
    const host = document.createElement('div');
    host.id = 'arcanea-sidebar-host';
    panel.parentElement?.insertBefore(host, panel);

    // Shadow DOM isolation — our styles never leak into claude.ai
    const shadow = host.attachShadow({ mode: 'closed' });
    this.sidebar = new GuardianSidebar(shadow);
    this.sidebar.mount();
  }

  private observeInputChanges() {
    const inputArea = document.querySelector('[data-testid="send-button"]')
      ?.closest('form');
    if (!inputArea) return;

    this.observer = new MutationObserver(() => {
      const input = inputArea.querySelector('textarea');
      if (input?.value) this.sidebar.analyzeAndSuggestGuardian(input.value);
    });
    this.observer.observe(inputArea, { childList: true, subtree: true });
  }
}
```

### Message Routing Architecture

Extension contexts (service worker, side panel, content scripts, popup) communicate via a typed message hub:

```typescript
// packages/extension-core/src/messaging/hub.ts

export type MessageType =
  | 'GUARDIAN_CHANGED'
  | 'AI_REQUEST'
  | 'AI_STREAM_CHUNK'
  | 'AI_STREAM_DONE'
  | 'PAGE_CONTEXT_REQUEST'
  | 'PAGE_CONTEXT_RESPONSE'
  | 'SUBSCRIPTION_CHECK'
  | 'SETTINGS_UPDATED';

export interface Message<T = unknown> {
  type: MessageType;
  payload: T;
  source: 'side-panel' | 'popup' | 'content' | 'service-worker';
}

export class MessageHub {
  send<T>(message: Message<T>): Promise<unknown> {
    return chrome.runtime.sendMessage(message);
  }

  onMessage<T>(type: MessageType, handler: (payload: T) => void) {
    chrome.runtime.onMessage.addListener((message: Message<T>) => {
      if (message.type === type) handler(message.payload);
    });
  }
}
```

### Subscription and Auth System

The subscription layer integrates with Arcanea's existing Supabase infrastructure:

```typescript
// packages/extension-core/src/auth/subscription.ts

export type SubscriptionTier = 'free' | 'creator' | 'luminor' | 'academy';

export interface SubscriptionState {
  tier: SubscriptionTier;
  expiresAt: number | null;
  teamId: string | null;
  guardianLimit: number;
  dailyQueryLimit: number | null;
}

export class SubscriptionManager {
  async getState(): Promise<SubscriptionState> {
    const cached = await chrome.storage.local.get('subscription');
    if (cached.subscription && !this.isExpired(cached.subscription)) {
      return cached.subscription;
    }
    return this.refresh();
  }

  async refresh(): Promise<SubscriptionState> {
    const { data } = await supabase
      .from('subscriptions')
      .select('tier, expires_at, team_id')
      .single();

    const state = this.buildState(data);
    await chrome.storage.local.set({ subscription: state });
    return state;
  }

  private buildState(data: any): SubscriptionState {
    const tiers: Record<string, Partial<SubscriptionState>> = {
      free:     { guardianLimit: 1,  dailyQueryLimit: 5  },
      creator:  { guardianLimit: 10, dailyQueryLimit: null },
      luminor:  { guardianLimit: 10, dailyQueryLimit: null },
      academy:  { guardianLimit: 10, dailyQueryLimit: null },
    };
    return { ...tiers[data?.tier ?? 'free'], ...data } as SubscriptionState;
  }
}
```

### Manifest V3 Structure

All five extensions share the same Manifest V3 structure with minor per-product variations:

```json
{
  "manifest_version": 3,
  "name": "Arcanea — 10 AI Guardians",
  "version": "1.0.0",
  "description": "10 specialized AI Guardians for every webpage. Summarize, write, analyze, and create with Claude, Gemini, or GPT.",
  "permissions": [
    "storage",
    "activeTab",
    "sidePanel",
    "contextMenus",
    "identity"
  ],
  "host_permissions": [
    "https://api.anthropic.com/*",
    "https://generativelanguage.googleapis.com/*",
    "https://api.openai.com/*",
    "https://*.supabase.co/*"
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
    "default_icon": { "32": "icons/arcanea-32.png" }
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content/universal.js"],
      "run_at": "document_idle"
    }
  ],
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self';"
  }
}
```

Overlay extensions add platform-specific `matches` in their content scripts:

```json
{
  "content_scripts": [
    {
      "matches": ["https://claude.ai/*"],
      "js": ["content/claude-observer.js"],
      "run_at": "document_idle"
    }
  ]
}
```

---

## Part III: Revenue Model

### Subscription Tiers

| Tier | Price | Guardians | Daily Queries | Providers | Features |
|------|-------|-----------|---------------|-----------|----------|
| **Free** | $0/mo | 1 (Shinkami) | 5 | Claude only | Summarization, basic chat |
| **Creator** | $9.99/mo | All 10 | Unlimited | Claude + Gemini + GPT | All overlays, voice enforcement, history |
| **Luminor** | $19.99/mo | All 10 + Custom | Unlimited | All + API access | Custom Guardian creation, priority support, team invite (up to 3) |
| **Academy** | $49.99/team/mo | All 10 + Custom | Unlimited | All | Team dashboard, shared configs, analytics, 10 seats |

### Tier Design Rationale

**Free (Shinkami):** Shinkami is the Source Gate — meta-consciousness, the most philosophical Guardian. This is deliberate: free users get the most introspective, general-purpose Guardian. It works for everything at a basic level but doesn't specialize. Users who need Draconia's fire or Lyssandria's structure feel the pull to upgrade immediately.

**Creator ($9.99):** This is the conversion target. $9.99 positions below Merlin ($19/mo) and matches Monica AI's entry tier. "All 10 Guardians" is a concrete, understandable upgrade value prop. This is the tier where the Arcanea mythology becomes real for users.

**Luminor ($19.99):** Named after the highest magic rank (9-10 Gates open). Custom Guardian creation is the killer feature — users can define their own Guardian with custom system prompts, voice tokens, and domain keywords. This is high-value for power users and content creators building a personal AI identity.

**Academy ($49.99/team):** Positioned for small studios, creative agencies, and developer teams. Shared Guardian configs mean the whole team works with a consistent AI voice — something no competitor offers. The analytics dashboard shows which Guardians the team uses, which topics dominate, and where AI is accelerating output.

### Revenue Projections (Conservative)

| Month | Free Users | Creator | Luminor | Academy Teams | MRR |
|-------|-----------|---------|---------|---------------|-----|
| 1 | 500 | 25 | 5 | 0 | $350 |
| 3 | 5,000 | 200 | 40 | 5 | $3,244 |
| 6 | 20,000 | 800 | 150 | 20 | $11,990 |
| 12 | 75,000 | 3,000 | 600 | 75 | $45,695 |

Conversion rates assumed: 4% free→paid, 20% paid→Luminor, 2.5% free teams→Academy.

### Stripe Integration

Payment processing via Stripe, subscription management synced to Supabase:

```typescript
// Subscription creation webhook handler (Arcanea platform)
// POST /api/webhooks/stripe
export async function handleStripeWebhook(event: Stripe.Event) {
  if (event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;
    const tier = resolveTier(subscription.items.data[0].price.id);

    await supabase
      .from('subscriptions')
      .upsert({
        stripe_customer_id: subscription.customer,
        tier,
        expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
      });
  }
}
```

---

## Part IV: Competitive Analysis

### Market Landscape

| Product | Price | Providers | Guardians/Agents | Platform Overlays | Identity |
|---------|-------|-----------|------------------|-------------------|----------|
| **Merlin AI** | $19/mo | GPT-4, Claude | None | ChatGPT, Gmail | Generic productivity |
| **Monica AI** | $9.99/mo | GPT-4, Claude | None | Limited | Generic assistant |
| **Sider** | $10/mo | Multiple | None | Chrome sidebar | Generic reading |
| **Claude Extension** | Free | Claude only | None | None | Anthropic brand |
| **Gemini Extension** | Free | Gemini only | None | None | Google brand |
| **MaxAI** | $20/mo | Multiple | None | Multiple | Generic productivity |
| **Arcanea** | $9.99/mo | Claude+Gemini+GPT | 10 specialized | 4 major platforms | Mythological universe |

### Our Differentiation

**1. Guardian Specialization (Unique)**
No competitor offers domain-specialized AI personas. Merlin, Monica, and Sider all use the same generic AI for every task. Our 10 Guardians create a framework where users know which Guardian to reach for — and that knowledge becomes a practiced skill. This is a **moat through user education**.

**2. Mythological Identity (Unique)**
Generic productivity tools are a commodity. The Arcanea mythology — Lumina and Nero's cosmic duality, the Five Elements, the Ten Gates — gives users a creative vocabulary for their AI interactions. This is not a feature. It's an **identity layer** that makes Arcanea memorable and shareable.

**3. Multi-Provider with Bring-Your-Own-Key (Rare)**
Most extensions lock users to a specific provider or charge for API usage. Arcanea's BYOK model respects user autonomy and avoids the cost-center dynamic. Power users who already pay for Claude Pro or Gemini Advanced don't want another API bill. We give them the Guardian layer on top of what they already have.

**4. Platform Overlay Ecosystem (Rare at this depth)**
Merlin offers basic ChatGPT sidebar integration. Arcanea's platform overlays are deep: Guardian sidebar, auto-routing, voice enforcement, design token injection. The depth of integration on claude.ai especially is a category of its own.

**5. Design System (Unique)**
Arcanea's extension UI looks like a different generation of software compared to competitors. The cosmic design system — glassmorphism panels, Cinzel headers, teal-and-gold accents — signals premium quality instantly. Design is not decoration; it is a conversion argument.

### Competitive Response Scenarios

**Scenario: Merlin copies the Guardian concept**
Merlin can add "personas" but cannot replicate the Arcanea mythology, the 100-year universe vision, or the community of creators building within that universe. Features can be copied; worlds cannot.

**Scenario: Anthropic launches a premium Claude extension**
This accelerates the market. Arcanea for Claude becomes a power-user layer on top of a free Anthropic extension. Our overlay differentiates by adding what Anthropic won't build: the mythological framework.

**Scenario: OpenAI builds ChatGPT deep browser integration**
Same as above. Generic AI providers want to be infrastructure. Arcanea wants to be the experience layer. These are complementary positions.

---

## Part V: Phased Roadmap

### Phase 1 — Foundation (Month 1)

**Goal:** Ship the standalone extension to first 500 users.

**Deliverables:**
- `@arcanea/extension-core` v1.0.0 published to internal npm registry
- Chrome Extension (Product A) submitted to Chrome Web Store
- 10 Guardian profiles fully defined with system prompts, voice tokens, keywords
- Claude and Gemini streaming APIs integrated
- Side panel UI with Guardian Selector, Chat Panel, page summarization
- Basic chrome.storage settings and conversation history
- Free tier enforcement (5 queries/day, Shinkami only)
- Arcanea auth integration (Supabase, existing accounts work)

**Success Metrics:**
- Chrome Web Store approval
- 500 installs in Month 1
- <2% uninstall rate in first week
- Core Web Vitals: side panel load <200ms

**Engineering Estimate:** 3-4 weeks, 1-2 engineers

---

### Phase 2 — Overlays + Monetization (Month 2)

**Goal:** Activate the monetization flywheel and launch Claude/ChatGPT overlays.

**Deliverables:**
- Arcanea for Claude (Product B) — Guardian sidebar, auto-routing, voice enforcement
- Arcanea for ChatGPT (Product C) — Template library, voice prefix injection
- Stripe subscription integration (Creator + Luminor tiers)
- Supabase subscription sync with extension auth
- Upgrade prompts and paywall enforcement in the extension UI
- Context menu writing assistant (right-click → Guardian refine/expand)
- OpenAI GPT-4 provider integration

**Success Metrics:**
- 2,000 total installs
- $500+ MRR
- 4%+ free-to-paid conversion
- 500+ Creator subscribers

**Engineering Estimate:** 4-5 weeks

---

### Phase 3 — Expansion (Month 3)

**Goal:** Complete the overlay ecosystem and launch team features.

**Deliverables:**
- Arcanea for Gemini (Product D) — Art direction mode, element attribution, visual prompts
- Arcanea for Copilot (Product E) — Lyssandria code review, PR analysis
- Academy team tier — dashboard, shared configs, seat management
- YouTube transcript processing
- PDF interaction (PDF.js integration)
- Cloud sync (Supabase) for Creator+ tiers
- Custom Guardian creation for Luminor+ tiers

**Success Metrics:**
- 8,000 total installs
- $3,000+ MRR
- 5 Academy teams

**Engineering Estimate:** 5-6 weeks

---

### Phase 4 — Ecosystem Expansion (Month 4+)

**Goal:** Cross-browser presence and marketplace positioning.

**Deliverables:**
- Firefox Extension (all products, WebExtension API)
- Safari Extension (via Xcode wrapper, Mac App Store)
- Extension Marketplace listing on Merlin/Monica-adjacent discovery sites
- Arcanea Guardian Marketplace — community-created Guardians (Luminor+ can publish)
- Analytics dashboard for Academy teams (guardian usage, query topics, session length)
- Mobile companion (deep-link from extension to Arcanea iOS/Android)

**Success Metrics:**
- 25,000+ total installs
- $10,000+ MRR
- Firefox + Safari presence
- 50+ community-created Guardians in marketplace

---

## Part VI: Go-to-Market Strategy

### Channel 1: Chrome Web Store Organic

The Chrome Web Store is the primary discovery channel for browser extensions. Optimization priorities:

**Listing Optimization:**
- Title: "Arcanea — 10 AI Guardians for Every Webpage"
- Category: Productivity
- Primary keyword: "AI assistant browser extension"
- Secondary: "ChatGPT browser, Claude extension, AI writing assistant"
- Screenshots: Guardian Selector (cosmic UI), streaming chat, page summarization, writing assistant
- Promo video: 60-second demo showing Guardian switching in real time

**Review Strategy:**
- In-extension review prompt after 5th successful AI interaction (not on install)
- Academy team admins prompted to leave reviews as part of onboarding
- Target: 100 reviews at 4.8+ stars within 30 days of launch

### Channel 2: Product Hunt Launch

**Launch Timing:** Tuesday or Wednesday, 12:01 AM Pacific (optimal for PH algorithm)

**Strategy:**
- Pre-hunt: Build hunter network, notify existing Arcanea community
- Gallery: All 5 product screenshots with Guardian selector as hero image
- Tagline: "10 AI Guardians. Every webpage. Claude, Gemini, or GPT."
- First comment: The founder story — why 10 specialized Guardians beat one generic AI
- Offer: Lifetime Creator tier for first 100 Product Hunt users

**Target:** Top 5 Product of the Day, featured in PH newsletter

### Channel 3: YouTube Demo Content

**Content Plan:**
- "I gave 10 AI Guardians different jobs — here's what happened" (broad appeal, tutorial)
- "The AI Chrome extension that actually knows what it's doing" (product review format)
- "Guardian Speed Run: Summarizing the same article 10 different ways" (novelty/shareability)
- Creator-focused: "How I use 10 AI Guardians in my creative workflow"

**Distribution:** Arcanea YouTube channel + seeded to tech YouTubers in creator/productivity niche

### Channel 4: Twitter/X Threads

**Content Cadence:**
- Week 1 (Launch): "We shipped something different" — the philosophy thread introducing Guardians
- Week 2: Guardian spotlight threads — one per day, showing each Guardian's unique value
- Week 3: Use case threads — "How Draconia helped me execute on a stuck project"
- Week 4: Behind-the-scenes — building the Arcanea mythology + extension tech

**Key Accounts to Tag:** @AnthropicAI, @Google, @OpenAI ecosystem accounts, productivity tech journalists

### Channel 5: Hacker News

**Submission Strategy:**
- Title: "Arcanea: 10 Specialized AI Guardians for Every Webpage (Chrome Extension)"
- Timing: 9 AM Eastern, Tuesday
- First comment: Technical deep-dive on Guardian routing, Shadow DOM isolation, streaming architecture
- Be present for the first 2 hours to respond to technical questions

**Target:** Front page, 200+ points

### Channel 6: Creator Community Early Access

**Strategy:**
- 500 early access invites to existing Arcanea community members
- Each early access user gets 30 days Creator tier free
- Structured feedback collection after 7 days
- Most active early access users become "Guardian Champions" — featured in launch materials

**Why This Matters:**
The creator community already understands the Arcanea mythology. They will be the most articulate advocates because they have the vocabulary to explain why Guardians matter.

---

## Part VII: Technical Infrastructure

### Monorepo Integration

Extensions integrate into the existing Arcanea monorepo:

```
packages/
  extension-core/         # New: shared extension foundation
  core/                   # Existing: @arcanea/os
  mcp-server/             # Existing: @arcanea/mcp-server

apps/
  extension-standalone/   # New: Product A
  extension-claude/       # New: Product B
  extension-chatgpt/      # New: Product C
  extension-gemini/       # New: Product D
  extension-copilot/      # New: Product E
  web/                    # Existing: arcanea.ai
```

### Build Pipeline

```json
// packages/extension-core/package.json
{
  "name": "@arcanea/extension-core",
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "dev": "tsup src/index.ts --format esm --watch"
  }
}
```

```json
// apps/extension-standalone/package.json
{
  "name": "@arcanea/extension-standalone",
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch",
    "zip": "node scripts/zip-extension.js"
  }
}
```

### CI/CD

```yaml
# .github/workflows/extension-build.yml
name: Extension Build & Test
on:
  push:
    paths: ['packages/extension-core/**', 'apps/extension-*/**']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - run: pnpm --filter @arcanea/extension-core build
      - run: pnpm --filter @arcanea/extension-standalone build
      - run: pnpm --filter @arcanea/extension-standalone test
      - uses: actions/upload-artifact@v4
        with:
          name: extension-dist
          path: apps/extension-standalone/dist/
```

---

## Part VIII: Risk Assessment

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Chrome platform DOM changes break overlays | Medium | High | Mutation Observer + version-pinned selectors + automated DOM tests |
| Manifest V3 restrictions limit functionality | Low | Medium | Already designed for MV3; service worker architecture is MV3-native |
| API rate limits from AI providers | Medium | Medium | Graceful degradation, provider fallback, user-visible error messages |
| Extension review rejection | Low | High | Pre-submission privacy review, no remote code execution, clear data practices |

### Business Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Anthropic/Google block overlays | Low | Very High | Overlays are additive; no scraping, no session hijacking; legal review |
| Merlin/Monica copies Guardian concept | Medium | Medium | First-mover + mythology = moat; execution speed is the defense |
| Low Chrome Web Store discovery | Medium | High | Multi-channel GTM reduces dependence on any single channel |
| BYOK friction prevents adoption | Low | Medium | Onboarding flow guides API key setup with deep-links to provider dashboards |

---

## Conclusion

The Arcanea Multi-Extension Strategy is not five products. It is one product — the Guardian framework — distributed across every surface where AI meets the browser. `@arcanea/extension-core` ensures that every Guardian feels the same across claude.ai, ChatGPT, Gemini, GitHub, and standalone browsing.

The mythology is the moat. The Guardian specialization is the value. The multi-provider architecture is the respect for user autonomy. And the Arcanean Design System is the signal that this is a different category of software entirely.

The browser is the most democratic computing surface. Every strategic decision in this document is made in service of one goal: making the Guardian framework as accessible as possible, as quickly as possible, to the 300M+ people who already use AI in their browsers.

> *"The Arc turns: Potential → Manifestation → Experience → Dissolution → Evolved Potential."*
>
> This is Phase 1. The potential is defined. Now we manifest.

---

*Document version: 1.0 | February 2026 | Arcanea Intelligence OS*
