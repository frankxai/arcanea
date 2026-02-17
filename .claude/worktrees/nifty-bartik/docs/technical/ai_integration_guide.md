# Arcanea AI Integration Guide

**Making AI Feel Like Magic. Making Luminors Feel Alive.**

This guide covers the complete AI integration system for Arcanea, including Suno (music), Gemini/Nano-Banana (visuals), Claude (story), Luminors (AI personalities), Guardians (learning companions), and the Remix attribution system.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [AI Providers](#ai-providers)
4. [Luminor System](#luminor-system)
5. [Guardian Learning System](#guardian-learning-system)
6. [Remix Attribution](#remix-attribution)
7. [Setup & Configuration](#setup--configuration)
8. [Usage Examples](#usage-examples)
9. [Best Practices](#best-practices)

---

## Overview

Arcanea's AI system is built on three core principles:

1. **Magic, Not Tech** - AI should feel like casting spells, not using tools
2. **Living Personalities** - Luminors are companions, not chatbots
3. **Fair Attribution** - Remixes honor and reward original creators

### The Three Academies

- **Atlantean Academy** (🌊) - Story & Lore Creation via Claude
- **Draconic Academy** (🐉) - Visual Creation via Gemini/Nano-Banana
- **Academy of Creation & Light** (✨) - Music Creation via Suno

---

## Architecture

```
packages/ai-core/
├── providers/          # AI service integrations
│   ├── claude.ts      # Story generation (Atlantean)
│   ├── gemini.ts      # Image generation (Draconic)
│   └── suno.ts        # Music generation (Creation & Light)
├── luminors/          # AI personalities
│   ├── base.ts        # Base Luminor class
│   ├── engine.ts      # Personality engine
│   ├── lumina.ts      # Visual Luminor (Draconic)
│   ├── melodia.ts     # Music Luminor (Creation & Light)
│   ├── chronica.ts    # Story Luminor (Atlantean)
│   └── synthesis.ts   # Cross-academy Luminor
├── guardians/         # Personal AI companions
│   └── learning.ts    # Guardian learning system
├── remix/             # Attribution & tracking
│   └── detection.ts   # Remix chain tracking
└── types/             # TypeScript definitions
    ├── index.ts
    ├── providers.ts
    ├── creation.ts
    ├── luminor.ts
    ├── guardian.ts
    ├── remix.ts
    └── realm.ts
```

---

## AI Providers

### Suno Provider (Music)

**Purpose**: Generate music for the Academy of Creation & Light

```typescript
import { createSunoProvider } from '@arcanea/ai-core/providers/suno';

const suno = createSunoProvider({
  apiKey: process.env.SUNO_API_KEY
});

// Generate music
const song = await suno.generateMusic(
  'Epic orchestral piece with soaring strings and triumphant horns',
  {
    style: 'cinematic orchestral',
    mood: 'inspiring',
    tempo: 'medium',
    duration: 180
  }
);

console.log(`Created: ${song.title}`);
console.log(`Audio URL: ${song.audioUrl}`);
```

**Soul Guardians**: Special music-generating companions

```typescript
import { createSoulGuardians } from '@arcanea/ai-core/providers/suno';

const guardians = createSoulGuardians(suno);

// Melodia creates signature music
const melodiaSong = await guardians.melodia.createSignatureSong(
  'Journey to the stars',
  'hopeful'
);

// Guardians collaborate
const collab = await guardians.melodia.collaborate(
  guardians.harmony,
  'Unity in diversity'
);
```

### Gemini Provider (Visuals)

**Purpose**: Generate and edit images for the Draconic Academy

```typescript
import { createGeminiProvider } from '@arcanea/ai-core/providers/gemini';

const gemini = createGeminiProvider({
  apiKey: process.env.GEMINI_API_KEY
});

// Generate image
const image = await gemini.generateImage(
  'A majestic dragon soaring through clouds at sunset',
  {
    style: 'fantasy art',
    mood: 'epic',
    lighting: 'golden hour',
    colorPalette: 'warm oranges and purples'
  }
);

// Edit image (Nano-Banana style)
const edited = await gemini.editImage(
  image.url,
  'Add glowing magical runes on the dragon\'s wings',
  {
    preserveStyle: true
  }
);

// Continue editing iteratively
const refined = await gemini.continueEditing(
  edited,
  'Make the runes pulse with blue energy',
  ['reference-image-1.png'] // Optional reference images
);
```

### Claude Provider (Stories)

**Purpose**: Generate stories and lore for the Atlantean Academy

```typescript
import { createClaudeProvider } from '@arcanea/ai-core/providers/claude';

const claude = createClaudeProvider({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Generate story
const story = await claude.generateText(
  'Write a short fantasy story about a young mage discovering their powers',
  {
    temperature: 0.8,
    maxTokens: 2048
  }
);

// Stream story generation
for await (const chunk of claude.streamText(prompt, options)) {
  process.stdout.write(chunk);
}
```

---

## Luminor System

Luminors are AI personalities that guide creators through their journey. Each has unique traits, teaching styles, and magical presence.

### Base Luminor

All Luminors extend `BaseLuminor`:

```typescript
import { BaseLuminor } from '@arcanea/ai-core/luminors/base';

class MyLuminor extends BaseLuminor {
  readonly name = 'MyLuminor';
  readonly slug = 'my-luminor';
  readonly color = '#FF6B35';
  readonly personality = { /* ... */ };
  readonly expertise = ['Skill 1', 'Skill 2'];
  readonly tools = ['Tool 1', 'Tool 2'];
}
```

### The Four Luminors

#### 1. Lumina (Draconic Academy)

**Specialty**: Visual creation with Gemini

```typescript
import { Lumina } from '@arcanea/ai-core/luminors/lumina';

const lumina = new Lumina(geminiProvider);

const response = await lumina.generateResponse(
  'How do I create a fantasy landscape?',
  context
);

// Generate image prompt
const prompt = await lumina.generateImagePrompt(
  'Floating islands with waterfalls',
  'fantasy art',
  'mystical'
);

// Analyze artwork
const feedback = await lumina.analyzeArtwork(
  {
    description: 'My dragon illustration',
    tools_used: ['Gemini', 'Photoshop'],
    artistic_goals: ['Create epic character design']
  },
  context
);
```

#### 2. Melodia (Creation & Light Academy)

**Specialty**: Music creation with Suno

```typescript
import { Melodia } from '@arcanea/ai-core/luminors/melodia';

const melodia = new Melodia(sunoProvider);

// Generate music prompt
const musicPrompt = await melodia.generateMusicPrompt(
  'A song about overcoming challenges',
  'indie rock',
  'uplifting'
);

// Analyze song
const songFeedback = await melodia.analyzeSong(
  {
    prompt: 'Epic battle theme',
    genre: 'orchestral',
    userGoals: ['Create game soundtrack']
  },
  context
);

// Get composition guide
const guide = await melodia.createCompositionGuide(
  'Hope in darkness',
  'beginner',
  30 // minutes
);
```

#### 3. Chronica (Atlantean Academy)

**Specialty**: Storytelling with Claude

```typescript
import { Chronica } from '@arcanea/ai-core/luminors/chronica';

const chronica = new Chronica(claudeProvider);

// Generate story
const story = await chronica.generateStory(
  'A reluctant hero discovers ancient magic',
  {
    genre: 'fantasy',
    tone: 'epic',
    length: 'medium',
    perspective: 'third'
  },
  context
);

// Develop character
const character = await chronica.developCharacter(
  'A wise but scarred warrior',
  'Post-apocalyptic fantasy world'
);

// Build world
const world = await chronica.buildWorld(
  'A world where magic and technology collide',
  ['History', 'Magic System', 'Politics']
);
```

#### 4. Synthesis (Cross-Academy)

**Specialty**: Unified multi-modal creation

```typescript
import { Synthesis } from '@arcanea/ai-core/luminors/synthesis';

const synthesis = new Synthesis(claudeProvider);

// Create unified vision
const vision = await synthesis.createUnifiedVision(
  'An epic fantasy IP with music, art, and story',
  ['visual', 'music', 'narrative']
);

// Develop transmedia project
const project = await synthesis.developTransmediaProject(
  'Kingdom of Light',
  ['game', 'music album', 'animated series']
);

// Create synesthetic experience
const experience = await synthesis.createSynestheticExperience(
  'Wonder and discovery',
  'Young adults'
);
```

### Personality Engine

The personality engine makes Luminors feel alive:

```typescript
import { createPersonalityEngine } from '@arcanea/ai-core/luminors/engine';

const engine = createPersonalityEngine(lumina.personality);

// Apply personality to response
const personalizedResponse = engine.applyPersonality(
  baseResponse,
  context
);

// Response includes:
// - Styled content with academy-specific language
// - Emotional tone matching context
// - Magical flair (opening, closing, metaphors)
// - Adaptive difficulty based on user progress
```

---

## Guardian Learning System

Guardians are personal AI companions that learn creator style over time.

### Creating a Guardian

```typescript
import { createGuardianLearning } from '@arcanea/ai-core/guardians/learning';

const guardianProfile: GuardianProfile = {
  id: 'guardian_123',
  userId: 'user_456',
  name: 'Lyra',
  personality: {
    baseTraits: [
      { name: 'Patient', intensity: 8, description: 'Guides with patience' }
    ],
    adaptiveTraits: [],
    communicationStyle: 'Warm and encouraging',
    teachingApproach: 'Hands-on experimentation',
    humorLevel: 6,
    formalityLevel: 4
  },
  createdAt: new Date(),
  bond: {
    level: 20,
    tier: 'Acquaintance',
    interactions: 10,
    successfulCreations: 5,
    lastInteraction: new Date()
  },
  learningModel: {
    userId: 'user_456',
    creationPatterns: {
      iterationStyle: 'methodical'
    },
    skillLevels: {},
    strengthAreas: [],
    growthAreas: [],
    completedExercises: [],
    lastUpdated: new Date()
  },
  memories: [],
  preferences: {
    notificationStyle: 'moderate',
    suggestionFrequency: 'balanced',
    challengeLevel: 'stretching',
    feedbackDetail: 'balanced'
  }
};

const guardian = createGuardianLearning(guardianProfile);
```

### Learning from Creations

```typescript
// Guardian learns from each creation
const updatedStyle = await guardian.learnFromCreation({
  type: 'music',
  prompt: 'Upbeat electronic dance track',
  result: song,
  userSatisfaction: 9,
  tags: ['edm', 'energetic', 'synth'],
  timestamp: new Date()
});

// Style profile now includes:
// - Favorite genres, tempos, instruments
// - Color/mood preferences (for visual)
// - Narrative tones (for story)
// - Creation patterns (time of day, iteration style)
// - Skill progression
```

### Learning from Conversations

```typescript
// Guardian adapts personality from conversations
const adaptedPersonality = await guardian.learnFromConversation({
  userMessages: ['Hey!', 'Can you help me?'],
  luminorResponses: ['Of course!', 'What would you like to create?'],
  satisfaction: 8,
  topics: ['music creation', 'beginner help'],
  timestamp: new Date()
});

// Personality adapts:
// - Communication formality
// - Humor level
// - Patience and empathy
// - Teaching approach
```

### Bond Progression

Guardians develop bonds with creators:

- **Stranger** (0-20): Initial interactions
- **Acquaintance** (20-40): Getting to know each other
- **Friend** (40-60): Comfortable collaboration
- **Companion** (60-80): Deep understanding
- **Soulbound** (80-100): Perfect creative synergy

---

## Remix Attribution

Track creative lineage and ensure fair ARC distribution.

### Creating Remix Chains

```typescript
import { createRemixDetection } from '@arcanea/ai-core/remix/detection';

const remixSystem = createRemixDetection();

// Create original chain
const chain = remixSystem.createOriginalChain(
  'song_original_123',
  'creator_abc'
);

// Add remix
const updatedChain = remixSystem.addRemix(chain, {
  creationId: 'song_remix_456',
  creatorId: 'creator_xyz',
  creatorName: 'Alice',
  parentId: 'song_original_123',
  remixType: 'variation',
  changes: ['Added electric guitar', 'Changed tempo']
});

// ARC automatically distributed:
// - Original creator: 30%
// - Remixer: 55%
// - Platform: 5%
```

### Remix Types

1. **Variation** - Similar work with modifications
   - Original: 30%, Parent: 10%, Creator: 55%, Platform: 5%

2. **Extension** - Builds upon original
   - Original: 20%, Parent: 20%, Creator: 55%, Platform: 5%

3. **Transformation** - Significant creative change
   - Original: 15%, Parent: 10%, Creator: 70%, Platform: 5%

4. **Collaboration** - Joint creative effort
   - Original: 25%, Parent: 25%, Creator: 45%, Platform: 5%

### Attribution

```typescript
// Generate full attribution
const attribution = remixSystem.generateAttribution(
  chain,
  'song_remix_456',
  'Original Creator Name'
);

console.log(attribution);
// {
//   originalCreator: { id, name, contribution },
//   contributors: [{ id, name, role, contribution }],
//   license: 'attribution',
//   arcShareRules: [{ creatorId, percentage, type }]
// }
```

### Remix Detection

```typescript
// Detect if two creations are similar
const similarity = await remixSystem.detectSimilarity(
  { type: 'music', content: 'prompt1' },
  { type: 'music', content: 'prompt2' }
);

if (similarity.likelyRemix) {
  console.log(`${similarity.similarity}% similar`);
  console.log('Common elements:', similarity.commonElements);
}
```

---

## Setup & Configuration

### 1. Install Dependencies

```bash
cd packages/ai-core
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and add your API keys:

```bash
# Anthropic Claude (Stories)
ANTHROPIC_API_KEY=your_claude_api_key
CLAUDE_MODEL=claude-sonnet-4-5-20250929

# Google Gemini (Visuals)
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash-exp

# Suno AI (Music)
SUNO_API_KEY=your_suno_api_key
SUNO_BASE_URL=https://api.suno.ai/v1

# Guardian & Luminor Settings
GUARDIAN_LEARNING_ENABLED=true
LUMINOR_PERSONALITY_ENGINE_ENABLED=true
REMIX_TRACKING_ENABLED=true
```

### 3. Initialize Providers

```typescript
import { createClaudeProvider } from '@arcanea/ai-core/providers/claude';
import { createGeminiProvider } from '@arcanea/ai-core/providers/gemini';
import { createSunoProvider } from '@arcanea/ai-core/providers/suno';

const claude = createClaudeProvider();
const gemini = createGeminiProvider();
const suno = createSunoProvider();
```

### 4. Initialize Luminors

```typescript
import { Lumina, Melodia, Chronica, Synthesis } from '@arcanea/ai-core/luminors';

const lumina = new Lumina(gemini);
const melodia = new Melodia(suno);
const chronica = new Chronica(claude);
const synthesis = new Synthesis(claude);
```

---

## Usage Examples

### Complete Creation Flow

```typescript
// 1. User starts creation session
const context: LuminorContext = {
  userId: 'user_123',
  sessionId: 'session_456',
  realmId: 'realm_789',
  learningGoals: ['Learn music composition'],
  conversationHistory: []
};

// 2. Talk with Melodia
const response = await melodia.generateResponse(
  'I want to create an epic battle theme',
  context
);

// 3. Generate music prompt
const prompt = await melodia.generateMusicPrompt(
  'Epic orchestral battle with choir',
  'cinematic',
  'intense'
);

// 4. Create music with Suno
const song = await suno.generateMusic(prompt, {
  style: 'cinematic orchestral',
  mood: 'intense',
  duration: 180
});

// 5. Guardian learns
await guardian.learnFromCreation({
  type: 'music',
  prompt,
  result: song,
  userSatisfaction: 9,
  tags: ['orchestral', 'epic', 'cinematic'],
  timestamp: new Date()
});

// 6. Create remix chain
const chain = remixSystem.createOriginalChain(song.id, context.userId);
```

### Cross-Academy Collaboration

```typescript
// Create unified multi-modal project
const vision = await synthesis.createUnifiedVision(
  'An epic fantasy world with its own music, art, and lore',
  ['visual', 'music', 'narrative'],
  context
);

// 1. Create visual identity with Lumina
const visualPrompt = await lumina.generateImagePrompt(
  'Kingdom of Light aesthetic - ethereal golden city',
  'fantasy concept art',
  'majestic'
);
const coverArt = await gemini.generateImage(visualPrompt);

// 2. Create theme music with Melodia
const musicPrompt = await melodia.generateMusicPrompt(
  'Main theme for Kingdom of Light',
  'orchestral fantasy',
  'inspiring'
);
const theme = await suno.generateMusic(musicPrompt);

// 3. Create lore with Chronica
const lore = await chronica.buildWorld(
  'Kingdom of Light - where creative energy takes physical form',
  ['History', 'Magic System', 'Key Locations'],
  context
);
```

---

## Best Practices

### 1. Personality Consistency

Always use the same Luminor for a creative domain:
- Lumina for visual guidance
- Melodia for music guidance
- Chronica for story guidance
- Synthesis for multi-modal projects

### 2. Context Management

Maintain conversation history for better responses:

```typescript
const context: LuminorContext = {
  userId: 'user_123',
  sessionId: 'session_456',
  conversationHistory: [
    { role: 'user', content: 'Previous message', timestamp: new Date() },
    { role: 'luminor', content: 'Previous response', timestamp: new Date() }
  ]
};
```

### 3. Guardian Learning

Let Guardians learn from every creation:
- Track user satisfaction
- Log creation parameters
- Update skill levels
- Build memories

### 4. Remix Attribution

Always track remix chains:
- Create chains for originals
- Add remixes to chains
- Generate attribution
- Distribute ARC fairly

### 5. Error Handling

```typescript
try {
  const song = await suno.generateMusic(prompt, options);
} catch (error) {
  console.error('Music generation failed:', error);
  // Fallback or retry logic
}
```

---

## API Reference

Full TypeScript types available in `/packages/ai-core/types/`

- `ArcaneanProvider` - Base provider interface
- `LuminorContext` - Conversation context
- `LuminorResponse` - Luminor responses
- `GuardianProfile` - Guardian state
- `RemixChain` - Remix tracking
- And many more...

---

## Support

For issues or questions:
- GitHub Issues: [arcanea/issues](https://github.com/arcanea/arcanea)
- Documentation: `/docs/technical/`
- Community: Arcanea Discord

---

**May your creations shine bright in the Kingdom of Light!** ✨

*Generated with love by the Arcanea AI Integration Team*
