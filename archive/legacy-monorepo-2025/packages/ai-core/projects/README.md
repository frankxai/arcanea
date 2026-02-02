# Project Flows System

Multi-turn creation flows for Arcanea MVP where users work with Luminors to create complete projects.

## Overview

The Project Flows system enables guided, multi-turn conversations that result in complete creative projects. Users collaborate with AI Luminors through structured flows that:

- Gather information through natural conversation
- Generate multiple AI assets (images, music, text)
- Maintain context across the entire flow
- Track progress and goals
- Deliver cohesive final products

## Quick Start

```typescript
import {
  ProjectFlowEngine,
  getTemplateBySlug,
  projectStateManager,
} from '@arcanea/ai-core/projects';

// 1. Get a template
const template = getTemplateBySlug('character-design');

// 2. Create flow engine
const flowEngine = new ProjectFlowEngine(template, {
  projectId: 'proj_123',
  userId: 'user_123',
  sessionId: 'sess_123',
  context: {
    templateName: template.name,
    projectType: template.projectType,
    userGoals: ['Create a character'],
    preferences: { style: 'fantasy' },
  },
});

// 3. Start the flow
const response = await flowEngine.start();
console.log(response.message); // Luminor's greeting

// 4. Process user input
const nextResponse = await flowEngine.processUserInput("A fire mage");

// 5. Continue until completed
if (nextResponse.completed) {
  console.log('Project complete!', nextResponse.assets);
}
```

## Available Templates

### 1. **Character Design** (`character-design`)
Create complete characters with personality, appearance, backstory, and visuals.
- **Duration:** ~20 min
- **Cost:** 500 ARC
- **Assets:** Concept art, backstory, final portrait

### 2. **World Building** (`world-building`)
Build complete fictional worlds with geography, cultures, history, and maps.
- **Duration:** ~35 min
- **Cost:** 800 ARC
- **Assets:** World guide, map, location art

### 3. **Story Creation** (`story-creation`)
Write complete stories with characters, plot, and illustrations.
- **Duration:** ~30 min
- **Cost:** 700 ARC
- **Assets:** Story text, scene illustrations, cover art

### 4. **Music Composition** (`music-composition`)
Compose original music with variations and album art.
- **Duration:** ~25 min
- **Cost:** 600 ARC
- **Assets:** Music tracks, cover art

### 5. **Visual Series** (`visual-series`)
Create cohesive image series with consistent style.
- **Duration:** ~30 min
- **Cost:** 900 ARC
- **Assets:** Image series, presentation

## Core Components

### Flow Engine
Orchestrates multi-turn conversations and AI generation.

```typescript
import { ProjectFlowEngine } from '@arcanea/ai-core/projects/flow-engine';
```

### State Manager
Manages persistence, snapshots, and progress tracking.

```typescript
import { projectStateManager } from '@arcanea/ai-core/projects/state-manager';

// Save state
await projectStateManager.saveState(flowState);

// Load state
const state = await projectStateManager.loadState(projectId);

// Create snapshot
await projectStateManager.createSnapshot(projectId, 'Checkpoint');

// Get progress
const progress = await projectStateManager.getProgressSummary(projectId);
```

### Result Aggregator
Combines assets into final deliverables.

```typescript
import { projectAggregator } from '@arcanea/ai-core/projects/aggregator';

// Aggregate results
const results = await projectAggregator.aggregateResults(state);

// Create showcase
const showcase = await projectAggregator.createShowcase(state);
```

### Flow Optimizer
Minimizes costs and optimizes performance.

```typescript
import { projectFlowOptimizer } from '@arcanea/ai-core/projects/optimizer';

// Optimize flow
const plan = await projectFlowOptimizer.optimizeFlow(template, {
  userBudget: { maxCost: 0.50 },
  enableCaching: true,
  batchRequests: true,
});

// Estimate costs
const estimate = projectFlowOptimizer.estimateCost(template, context);
```

## API Routes

### Create Project
```
POST /api/projects/create
```

```json
{
  "templateSlug": "character-design",
  "userId": "user_123",
  "context": {
    "userGoals": ["Create character"],
    "preferences": { "style": "fantasy" }
  }
}
```

### Advance Step
```
POST /api/projects/:id/step
```

```json
{
  "userInput": "A brave fire mage"
}
```

### Complete Project
```
POST /api/projects/:id/complete
```

Returns aggregated results and export bundle.

### Get Project Status
```
GET /api/projects/:id/step
```

Returns current project state and progress.

## Features

### ✅ Multi-Turn Conversations
Natural conversation flow with context accumulation

### ✅ Multiple AI Providers
- **Claude** for text generation and analysis
- **Gemini Imagen** for visual creation
- **Suno** for music composition

### ✅ State Management
- Automatic snapshots
- Pause/resume capability
- Progress tracking
- Goal completion detection

### ✅ Cost Optimization
- Response caching
- Request batching
- Smart model selection
- Context pruning

### ✅ Result Aggregation
- Project summaries
- Asset bundling
- Export packages
- Showcase generation

### ✅ Branching Logic
Conditional flow paths based on user input

### ✅ Validation
Input validation with helpful error messages

## Project Structure

```
packages/ai-core/projects/
├── flow-engine.ts          # Flow orchestration
├── state-manager.ts        # State persistence
├── aggregator.ts          # Result aggregation
├── optimizer.ts           # Cost optimization
├── index.ts              # Main exports
├── example-integration.ts # Usage examples
├── templates/
│   ├── character-design.ts
│   ├── world-building.ts
│   ├── story-creation.ts
│   ├── music-composition.ts
│   ├── visual-series.ts
│   └── index.ts
└── README.md

packages/ai-core/types/
└── projects.ts           # Type definitions

apps/web/app/api/projects/
├── create/route.ts       # Create project
├── [id]/
│   ├── step/route.ts    # Advance step
│   └── complete/route.ts # Complete project

docs/mvp/
└── PROJECT_FLOWS.md      # Full documentation
```

## Example Flow

**Character Design Flow:**

1. **Character Concept** - Define basic concept
2. **Personality & Traits** - Develop personality
3. **Physical Description** - Describe appearance
4. **Concept Art** - Generate initial art
5. **Backstory** - Create backstory
6. **Refinement** - Review and refine
7. **Final Portrait** - Generate final art

Each step:
- Asks specific questions
- Validates input
- Generates relevant assets
- Tracks progress toward goals

## Creating Custom Templates

See `example-integration.ts` and `docs/mvp/PROJECT_FLOWS.md` for detailed examples of creating custom project templates.

Key template elements:
- **Steps** - Define the flow progression
- **AI Actions** - Specify what to generate
- **Goals** - Define completion criteria
- **Luminor Personality** - Configure conversation style
- **Validation Rules** - Ensure quality input

## Integration with Arcanea Platform

Projects integrate with:
- **Guardian System** - Personal AI tracks project history
- **Essence Storage** - Generated assets become Essences
- **Realm System** - Projects can be added to Realms
- **ARC Economy** - Projects cost ARC to create
- **Achievement System** - Project completion earns achievements

## Performance

- **Caching:** Reduces repeat API calls by ~30%
- **Batching:** Reduces overhead by ~20%
- **Context Pruning:** Reduces token costs by ~15%
- **Smart Models:** Saves ~25% on non-critical steps

Average project costs:
- **Beginner:** 500-600 ARC (~$0.15-0.20)
- **Intermediate:** 700-900 ARC (~$0.25-0.35)
- **Advanced:** 1000+ ARC (~$0.40+)

## Testing

See `example-integration.ts` for runnable examples:

```typescript
import { runAllExamples } from '@arcanea/ai-core/projects/example-integration';

runAllExamples();
```

## Documentation

Full documentation: `/docs/mvp/PROJECT_FLOWS.md`

## License

Part of the Arcanea AI Platform
