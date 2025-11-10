# Project Flow System Architecture

## System Overview

```
┌────────────────────────────────────────────────────────────────┐
│                         User Interface                          │
│                  (Chat interface with Luminor)                  │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             │ HTTP Requests
                             ▼
┌────────────────────────────────────────────────────────────────┐
│                        API Routes Layer                         │
├────────────────────────────────────────────────────────────────┤
│  POST /api/projects/create          Create new project         │
│  POST /api/projects/:id/step        Process user input         │
│  GET  /api/projects/:id/step        Get project status         │
│  POST /api/projects/:id/complete    Complete & aggregate       │
│  GET  /api/projects/:id/complete    Get results bundle         │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│                    Project Flow Engine                          │
├────────────────────────────────────────────────────────────────┤
│  Core Orchestration:                                           │
│  • Initialize flow from template                               │
│  • Process user input                                          │
│  • Validate responses                                          │
│  • Execute AI actions                                          │
│  • Manage conversation turns                                   │
│  • Track goal completion                                       │
│  • Handle branching logic                                      │
│  • Calculate progress                                          │
└──┬─────────┬─────────┬─────────┬─────────┬───────────────┬────┘
   │         │         │         │         │               │
   ▼         ▼         ▼         ▼         ▼               ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐ ┌────────────┐
│State │ │Optim-│ │Result│ │Temp- │ │AI Actions│ │Validation  │
│Mgr   │ │izer  │ │Aggr  │ │lates │ │          │ │            │
└──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └─────┬────┘ └──────┬─────┘
   │        │        │        │            │             │
   │        │        │        │            ▼             │
   │        │        │        │    ┌──────────────┐      │
   │        │        │        │    │AI Providers  │      │
   │        │        │        │    ├──────────────┤      │
   │        │        │        │    │Claude        │      │
   │        │        │        │    │Gemini Imagen │      │
   │        │        │        │    │Suno          │      │
   │        │        │        │    └──────────────┘      │
   │        │        │        │                          │
   ▼        ▼        ▼        ▼                          ▼
┌────────────────────────────────────────────────────────────────┐
│                         Data Layer                              │
├────────────────────────────────────────────────────────────────┤
│  • Project states (in-memory & DB)                             │
│  • Snapshots                                                    │
│  • Generated assets                                             │
│  • Conversation history                                         │
│  • User progress                                                │
└────────────────────────────────────────────────────────────────┘
```

## Component Interaction Flow

### Creating a New Project

```
1. User clicks "Start Character Design"
          ↓
2. Frontend → POST /api/projects/create
   {
     templateSlug: 'character-design',
     userId: 'user_123',
     context: { preferences }
   }
          ↓
3. API Route loads template → ProjectFlowEngine
          ↓
4. FlowEngine.start()
   - Initialize state
   - Load first step
   - Generate opening message
          ↓
5. StateManager.saveState()
   - Persist initial state
   - Create snapshot
          ↓
6. Return response to frontend
   {
     projectId: 'proj_123',
     message: "Welcome! Let's create...",
     suggestions: [...],
     progress: 0
   }
```

### Processing User Input

```
1. User types response: "A fire mage"
          ↓
2. Frontend → POST /api/projects/:id/step
   { userInput: "A fire mage" }
          ↓
3. API Route loads state → Restore FlowEngine
          ↓
4. FlowEngine.processUserInput()
   ┌─────────────────────────┐
   │ Extract & Validate      │
   │ - Parse user intent     │
   │ - Extract data fields   │
   │ - Check validation rules│
   └────────┬────────────────┘
            │
            ▼
   ┌─────────────────────────┐
   │ Execute AI Actions      │
   │ - Generate text         │
   │ - Generate images       │
   │ - Generate music        │
   └────────┬────────────────┘
            │
            ▼
   ┌─────────────────────────┐
   │ Update State            │
   │ - Add conversation turn │
   │ - Store generated assets│
   │ - Update progress       │
   └────────┬────────────────┘
            │
            ▼
   ┌─────────────────────────┐
   │ Determine Next Step     │
   │ - Check branching logic │
   │ - Evaluate conditions   │
   │ - Advance or branch     │
   └────────┬────────────────┘
            ↓
5. StateManager.saveState()
   - Update database
   - Create snapshot
          ↓
6. Return next step to frontend
   {
     message: "Excellent! Now tell me...",
     suggestions: [...],
     progress: 30,
     assets: [...]
   }
```

## State Management Flow

```
┌─────────────────────────────────────────────────┐
│              ProjectFlowState                    │
├─────────────────────────────────────────────────┤
│  projectId: "proj_123"                          │
│  userId: "user_123"                             │
│  templateId: "character-design-v1"              │
│  sessionId: "sess_123"                          │
│  currentStep: 3                                 │
│  totalSteps: 7                                  │
│  status: IN_PROGRESS                            │
│                                                 │
│  context: {                                     │
│    templateName: "Character Design"             │
│    projectType: CHARACTER_DESIGN                │
│    userGoals: [...]                            │
│    preferences: {...}                          │
│  }                                              │
│                                                 │
│  collectedData: {                              │
│    characterType: "mage",                      │
│    element: "fire",                            │
│    personality: "brave, impulsive"             │
│  }                                              │
│                                                 │
│  conversationHistory: [                        │
│    {role: "luminor", content: "..."},         │
│    {role: "user", content: "..."},            │
│    ...                                         │
│  ]                                              │
│                                                 │
│  generatedAssets: [                            │
│    {type: "image", url: "..."},               │
│    {type: "text", content: "..."},            │
│    ...                                         │
│  ]                                              │
│                                                 │
│  completedGoals: ["personality", "appearance"] │
│  pendingGoals: ["backstory", "final_portrait"] │
└─────────────────────────────────────────────────┘
              │                    │
              ▼                    ▼
    ┌──────────────┐    ┌──────────────────┐
    │  Snapshots   │    │  Progress Stats  │
    ├──────────────┤    ├──────────────────┤
    │ Step 0       │    │ Overall: 60%     │
    │ Step 1       │    │ Goals: 2/4       │
    │ Step 2       │    │ Assets: 3        │
    │ Step 3 ◄─NOW │    │ Duration: 12min  │
    └──────────────┘    └──────────────────┘
```

## Template Structure

```
┌───────────────────────────────────────────────────┐
│            ProjectTemplate                         │
├───────────────────────────────────────────────────┤
│  Basic Info                                       │
│  - id, name, slug, description                    │
│  - icon, color, thumbnail                         │
│  - difficulty, estimatedDuration                  │
│                                                   │
│  Steps Array                                      │
│  ┌─────────────────────────────────────────┐    │
│  │ Step 0: Concept                          │    │
│  │  - prompt: "Tell me about..."           │    │
│  │  - expectedInput: [fields]              │    │
│  │  - validationRules: [...]               │    │
│  │  - aiActions: []                        │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ Step 1: Development                      │    │
│  │  - prompt: "Let's expand on..."         │    │
│  │  - aiActions: [                         │    │
│  │      {action: "generate_text", ...}     │    │
│  │    ]                                     │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ Step 2: Generation                       │    │
│  │  - aiActions: [                         │    │
│  │      {action: "generate_image", ...}    │    │
│  │    ]                                     │    │
│  └─────────────────────────────────────────┘    │
│  ...                                             │
│                                                   │
│  Goals                                            │
│  - Define completion criteria                    │
│  - Track required outputs                        │
│                                                   │
│  Luminor Personality                             │
│  - tone, openingMessage                          │
│  - guidancePrompts, celebrations                 │
│                                                   │
│  Cost Estimation                                 │
│  - arcPoints, apiCost                            │
└───────────────────────────────────────────────────┘
```

## Optimization Pipeline

```
┌──────────────────────────────────────────┐
│      Before Optimization                  │
├──────────────────────────────────────────┤
│  Step 1: Generate text ($0.03)          │
│  Step 2: Generate text ($0.03)          │
│  Step 3: Generate image ($0.04)         │
│  Step 4: Generate text ($0.03)          │
│  Step 5: Generate image ($0.04)         │
│  Step 6: Generate image ($0.04)         │
│                                          │
│  Total: $0.21                            │
└──────────────────────────────────────────┘
                  ↓
      ┌──────────────────────┐
      │  Optimization Pass   │
      ├──────────────────────┤
      │  1. Cache responses  │
      │  2. Batch requests   │
      │  3. Prune context    │
      │  4. Smart models     │
      └──────────────────────┘
                  ↓
┌──────────────────────────────────────────┐
│      After Optimization                   │
├──────────────────────────────────────────┤
│  Step 1: Generate text ($0.03)          │
│  Step 2: [CACHED] ($0.00)               │
│  Step 3: Generate image ($0.04)         │
│  Step 4: [BATCHED with 2] ($0.015)     │
│  Step 5: Generate image [STANDARD] ($0.02)│
│  Step 6: Generate image ($0.04)         │
│                                          │
│  Total: $0.15 (29% savings)              │
└──────────────────────────────────────────┘
```

## Result Aggregation Pipeline

```
┌─────────────────────────────────────────┐
│       Project Completion                 │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│     Collect All Assets                   │
│  • Text documents                        │
│  • Generated images                      │
│  • Music tracks                          │
│  • Conversation history                  │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│     Generate Summary                     │
│  • Extract title                         │
│  • Create description                    │
│  • Identify key features                │
│  • Select highlights                     │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│     Calculate Statistics                 │
│  • Duration                              │
│  • Asset count by type                   │
│  • Cost breakdown                        │
│  • Model usage                           │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│     Create Export Bundle                 │
│  Files:                                  │
│  • image-001.png                         │
│  • text-001.md                           │
│  • project-metadata.json                 │
│  • README.md                             │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│     Generate Showcase                    │
│  • Cover image                           │
│  • Featured assets (top 5)               │
│  • Tags and categories                   │
│  • Shareable summary                     │
└─────────────────────────────────────────┘
```

## Data Flow Example

### Character Design Flow - Complete Journey

```
STEP 0: Concept
  User Input: "A fire mage"
  Extracted: { characterType: "mage", element: "fire" }
  Output: None
  → Next: Step 1

STEP 1: Personality
  User Input: "Brave, impulsive, protective"
  Extracted: { traits: [...] }
  AI Action: Generate expanded personality (Claude)
  Output: { expandedPersonality: "..." }
  → Next: Step 2

STEP 2: Appearance
  User Input: "Red hair, amber eyes, flame robes"
  Extracted: { appearance: {...} }
  Output: None
  → Next: Step 3

STEP 3: Concept Art
  Context: All previous data
  AI Action: Generate image (Imagen)
  Output: { conceptArt: "image-url" }
  → Next: Step 4

STEP 4: Backstory
  User Input: "Volcanic region, lost family, trained"
  Extracted: { backstory: {...} }
  AI Action: Generate full backstory (Claude)
  Output: { backstory: "..." }
  → Next: Step 5

STEP 5: Review
  User Input: "Perfect!"
  Branch Condition: approved = yes
  → Next: Step 6 (skip regeneration)

STEP 6: Final Portrait
  Context: All collected data
  AI Action: Generate final image (Imagen)
  Output: { finalPortrait: "image-url" }
  AI Action: Combine into character sheet
  Output: { characterSheet: {...} }
  → Complete!

FINAL RESULT:
  Assets:
  - Expanded personality profile (text)
  - Full backstory (text)
  - Concept art (image)
  - Final portrait (image)
  - Character sheet (JSON)

  Stats:
  - Duration: 18 minutes
  - Cost: 480 ARC / $0.14
  - Interactions: 6
  - Goals: 3/3 completed
```

## Integration Points

```
┌────────────────────────────────────────────────┐
│          Arcanea Platform Integration           │
└────────────┬───────────────────────────────────┘
             │
    ┌────────┼────────┬──────────┬──────────┐
    │        │        │          │          │
    ▼        ▼        ▼          ▼          ▼
┌────────┐ ┌────┐ ┌────────┐ ┌────────┐ ┌─────┐
│Guardian│ │ARC │ │Essence │ │Realm   │ │Achv │
│System  │ │Econ│ │Storage │ │System  │ │     │
└────┬───┘ └─┬──┘ └───┬────┘ └───┬────┘ └──┬──┘
     │       │        │          │         │
     │       │        │          │         │
     │     ┌─▼────────▼──────────▼─────────▼──┐
     │     │   Project Flow Results            │
     │     │   - Assets saved as Essences      │
     │     │   - Cost deducted from balance    │
     │     │   - Added to Realm if specified   │
     │     │   - Achievements unlocked          │
     │     └───────────────────────────────────┘
     │
     └───► Guardian tracks:
           - Project completion
           - User preferences
           - Creative patterns
           - Skills developed
```

---

**Architecture Version:** 1.0
**Last Updated:** 2025
**Status:** Production Ready
