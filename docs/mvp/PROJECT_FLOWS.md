# Project Flows System

## Overview

The Project Flows system enables multi-turn creation flows where users work with Luminors to create complete projects through guided conversations. Each flow is a templated journey that orchestrates multiple AI generation steps, accumulates context, tracks progress, and delivers a cohesive final product.

## Architecture

### Core Components

1. **Flow Engine** (`flow-engine.ts`)
   - Orchestrates multi-turn conversations
   - Manages flow state and progression
   - Executes AI actions (text, image, music generation)
   - Handles branching logic and validation

2. **State Manager** (`state-manager.ts`)
   - Persists project state
   - Creates automatic snapshots
   - Tracks progress and statistics
   - Enables pause/resume functionality

3. **Result Aggregator** (`aggregator.ts`)
   - Combines generated assets
   - Creates project summaries
   - Generates export bundles
   - Builds showcase views

4. **Flow Optimizer** (`optimizer.ts`)
   - Minimizes API costs
   - Implements caching strategies
   - Batches similar requests
   - Prunes conversation context

5. **Project Templates** (`templates/`)
   - Pre-built project flows
   - Step-by-step guidance
   - Luminor personality configuration
   - Cost and time estimates

## Available Project Templates

### 1. Character Design
**Duration:** ~20 minutes | **Cost:** 500 ARC | **Difficulty:** Beginner

Creates a complete character with:
- Personality and traits development
- Physical appearance description
- Concept art generation
- Backstory creation
- Final character portrait
- Character sheet compilation

**Flow Steps:**
1. Character concept definition
2. Personality and traits
3. Physical description
4. Concept art generation
5. Backstory creation
6. Refinement and adjustments
7. Final portrait generation

### 2. World Building
**Duration:** ~35 minutes | **Cost:** 800 ARC | **Difficulty:** Intermediate

Creates a complete fictional world with:
- Geography and environment
- Cultures and civilizations
- Historical timeline and mythology
- Magic/technology systems
- World map visualization
- Key location concept art
- Comprehensive world guide

**Flow Steps:**
1. World concept
2. Geography and environment
3. Cultures and civilizations
4. History and lore
5. Magic/technology systems
6. World map generation
7. Key locations visualization
8. World guide compilation

### 3. Story Creation
**Duration:** ~30 minutes | **Cost:** 700 ARC | **Difficulty:** Intermediate

Creates a complete story with:
- Genre and theme definition
- Character development
- Plot structure and outline
- Setting establishment
- Full story manuscript
- Key scene illustrations
- Cover art design

**Flow Steps:**
1. Story concept
2. Main characters
3. Plot structure
4. Setting and world
5. Story writing
6. Scene illustrations
7. Cover art
8. Story compilation

### 4. Music Composition
**Duration:** ~25 minutes | **Cost:** 600 ARC | **Difficulty:** Beginner

Creates original music with:
- Genre and mood definition
- Musical direction refinement
- Optional lyric writing
- Initial composition (2 variations)
- Review and selection
- Additional variations
- Album cover art

**Flow Steps:**
1. Musical concept
2. Musical direction
3. Lyric writing (optional)
4. Initial composition
5. Review and selection
6. Create variations
7. Cover art
8. Music package

### 5. Visual Series
**Duration:** ~30 minutes | **Cost:** 900 ARC | **Difficulty:** Intermediate

Creates a cohesive image series with:
- Series concept and theme
- Visual style definition
- Scene planning (3-10 images)
- Reference image for consistency
- Series generation
- Refinement options
- Final presentation

**Flow Steps:**
1. Series concept
2. Style definition
3. Scene planning
4. Reference image
5. Style approval
6. Series generation
7. Refinement options
8. Series compilation

## Usage

### Starting a Project Flow

```typescript
// 1. Create a new project
const response = await fetch('/api/projects/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    templateSlug: 'character-design',
    userId: 'user_123',
    context: {
      userGoals: ['Create a fantasy character'],
      preferences: {
        style: 'fantasy',
        mood: 'heroic',
        complexity: 'moderate',
      },
    },
    optimization: {
      enableCaching: true,
      batchRequests: true,
    },
  }),
});

const { projectId, message, suggestions } = await response.json();

// 2. Display Luminor's opening message
console.log(message);
// "Welcome, creator! I'm here to help you design an amazing character..."

// 3. Get user input
const userInput = "I want to create a fire mage character";

// 4. Send user input to advance flow
const stepResponse = await fetch(`/api/projects/${projectId}/step`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userInput }),
});

const { message: nextMessage, progress, assets } = await stepResponse.json();

// 5. Continue conversation until completed
// When completed is true, the flow is done

// 6. Get final results
const resultsResponse = await fetch(`/api/projects/${projectId}/complete`, {
  method: 'POST',
});

const { results, showcase, exportBundle } = await resultsResponse.json();
```

### Checking Project Status

```typescript
const statusResponse = await fetch(`/api/projects/${projectId}/step`);
const { project } = await statusResponse.json();

console.log(`Progress: ${project.progress.overallProgress}%`);
console.log(`Assets: ${project.assetsGenerated}`);
console.log(`Status: ${project.status}`);
```

### Exporting Results

```typescript
const exportResponse = await fetch(`/api/projects/${projectId}/complete`);
const { exportBundle } = await exportResponse.json();

// Export bundle contains:
// - All generated assets
// - Project metadata
// - README file
// - Timestamps and versioning

for (const file of exportBundle.files) {
  console.log(`${file.filename}: ${file.type}`);
  // Download or save files
}
```

## Creating Custom Templates

To create a custom project template:

```typescript
import {
  ProjectTemplate,
  ProjectType,
  StepType,
} from '@arcanea/ai-core/types/projects';

export const myCustomTemplate: ProjectTemplate = {
  id: 'my-custom-v1',
  name: 'My Custom Project',
  slug: 'my-custom',
  description: 'Description of what this creates',

  // Visual identity
  icon: '🎨',
  color: '#8B5CF6',

  // Configuration
  projectType: ProjectType.CUSTOM,
  difficulty: 'beginner',
  estimatedDuration: 20,

  // Define the flow steps
  steps: [
    {
      stepNumber: 0,
      name: 'Initial Concept',
      description: 'Define the concept',
      type: StepType.INFORMATION_GATHERING,

      prompt: 'What would you like to create?',

      expectedInput: ['concept', 'style'],
      expectedOutputs: ['concept_data'],

      // Optional AI actions
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Expand the concept',
          },
          usePreviousContext: true,
          saveAs: 'expandedConcept',
        },
      ],

      canSkip: false,
      canGoBack: false,
    },
    // Add more steps...
  ],

  // Define goals
  goals: [
    {
      id: 'main_asset',
      description: 'Generate main asset',
      type: 'required',
      completionCriteria: 'asset exists',
      assets: ['image'],
    },
  ],

  // Required capabilities
  requiredTools: ['claude', 'gemini-imagen'],
  requiredModels: ['claude-3-5-sonnet-20241022', 'imagen-3.0-generate-001'],

  // Luminor personality
  luminorPersonality: {
    personality: 'Helpful and encouraging',
    tone: 'encouraging',
    openingMessage: 'Welcome! Let\'s create something amazing!',
    guidancePrompts: ['Great work!', 'Keep going!'],
    celebrationMessages: ['You did it!'],
    errorMessages: ['Let me help with that'],
  },

  // Cost estimation
  estimatedCost: {
    arcPoints: 500,
    apiCost: 0.15,
  },

  // Metadata
  tags: ['custom', 'creative'],
  category: 'Custom',
  popularityScore: 50,
};
```

## Flow Control

### Branching Logic

Steps can include branching based on user input:

```typescript
{
  stepNumber: 5,
  name: 'Review',
  type: StepType.REVIEW,
  prompt: 'Are you happy with this?',

  branchingLogic: {
    condition: 'approved',
    branches: {
      yes: 6,  // Go to step 6
      no: 3,   // Go back to step 3
    },
  },
}
```

### Validation Rules

Validate user input before advancing:

```typescript
{
  expectedInput: ['characterName', 'characterType'],
  validationRules: [
    {
      field: 'characterName',
      type: 'required',
      message: 'Please provide a character name',
    },
    {
      field: 'characterType',
      type: 'required',
      message: 'Please specify the character type',
    },
  ],
}
```

## Optimization Strategies

### 1. Caching
```typescript
{
  cacheable: true, // Enable caching for this step
}
```

### 2. Batching
```typescript
{
  batchable: true, // Allow batching with similar requests
}
```

### 3. Context Pruning
The optimizer automatically prunes conversation history to reduce token usage while maintaining context quality.

### 4. Smart Model Selection
Non-critical steps can use more cost-effective models:
- Intermediate generations: Standard quality
- Final outputs: Premium quality

## State Management

### Automatic Snapshots
The system creates automatic snapshots at each step for easy rollback.

### Manual Snapshots
```typescript
await projectStateManager.createSnapshot(
  projectId,
  'Before major change',
  false
);
```

### Pause and Resume
```typescript
// Pause a project
await projectStateManager.pauseProject(projectId);

// Resume later
await projectStateManager.resumeProject(projectId);
```

### Restore from Snapshot
```typescript
const snapshots = await projectStateManager.listSnapshots(projectId);
await projectStateManager.restoreSnapshot(projectId, snapshotId);
```

## Cost Management

### Budget Constraints
```typescript
{
  optimization: {
    budget: {
      maxCost: 0.50, // Max $0.50
      maxArc: 500,   // Max 500 ARC
    },
    prioritizeQuality: false, // Use cost-effective options
  }
}
```

### Cost Estimation
```typescript
const estimate = await projectFlowOptimizer.estimateCost(
  template,
  { userBudget: { maxCost: 0.50 } }
);

console.log(`Estimated cost: $${estimate.estimatedCost}`);
console.log(`Estimated ARC: ${estimate.estimatedArc}`);
```

## Integration with Database

To persist projects to the database:

```typescript
import { prisma } from '@arcanea/database';

// After project creation
await prisma.project.create({
  data: {
    id: projectId,
    userId: userId,
    type: 'PERSONAL_PROJECT',
    title: results.summary.title,
    description: results.summary.description,
    status: 'COMPLETED',
    essenceIds: results.assets.map(a => a.id),
    aiTools: template.requiredTools,
    config: { templateId: template.id },
  },
});

// Link generated essences
for (const asset of results.assets) {
  await prisma.essence.create({
    data: {
      id: asset.id,
      title: `${results.summary.title} - ${asset.type}`,
      description: asset.prompt || '',
      creatorId: userId,
      type: mapAssetTypeToEssenceType(asset.type),
      files: [{ url: asset.url }],
      aiTools: [asset.tool],
      prompt: asset.prompt,
      model: asset.model,
      metadata: asset.metadata,
    },
  });
}
```

## Best Practices

### 1. Clear Prompts
Write prompts that are:
- Clear and specific
- Encouraging and friendly
- Provide examples when helpful

### 2. Progressive Refinement
Build complexity gradually:
- Start with basic concept
- Add details incrementally
- Allow refinement before finalization

### 3. Context Accumulation
Use `usePreviousContext: true` to:
- Maintain consistency
- Build on previous outputs
- Create cohesive results

### 4. User Guidance
Provide helpful suggestions:
- Example responses
- Multiple choice options
- Clear next steps

### 5. Error Handling
Handle errors gracefully:
- Provide clear error messages
- Offer alternative paths
- Allow users to retry

## Example Flow: Character Design

```
User: "Help me design a character"

Luminor (Step 0): "Let's bring your character to life! What kind
                   of character are you thinking about?"

User: "A fire mage"

[System extracts: characterType: "mage", element: "fire"]

Luminor (Step 1): "Excellent! Now let's dive deeper into who this
                   character really is. What are their key
                   personality traits?"

User: "Brave, impulsive, passionate about protecting others"

[System generates expanded personality profile]

Luminor (Step 2): "Now let's visualize what they look like!
                   Describe their physical appearance..."

User: "Tall woman, red hair, amber eyes, wearing flowing robes
       with flame patterns"

[System prepares image generation]

Luminor (Step 3): "Perfect! I'm now generating concept art..."

[System generates image with Imagen]

Luminor (Step 4): "Great! Your character is taking shape visually.
                   Now let's explore their past..."

User: "She grew up in a volcanic region, lost her family to
       raiders, trained with a fire sage"

[System generates backstory]

Luminor (Step 5): "Let's review what we've created! [Shows all
                   elements] Would you like any adjustments?"

User: "It looks perfect!"

Luminor (Step 6): "Excellent! Creating your final character
                   portrait..."

[System generates final portrait]

Luminor (Step 7): "Your character is complete—stunning work!
                   [Shows complete package]"
```

## Troubleshooting

### Project Won't Start
- Verify template slug is correct
- Check user authentication
- Ensure all required fields provided

### Step Not Advancing
- Verify user input matches expected format
- Check validation rules
- Review error messages in response

### Assets Not Generating
- Check API credentials
- Verify tool availability
- Review action parameters

### High Costs
- Enable optimization options
- Use caching where possible
- Consider lower quality for drafts

## API Reference

### POST /api/projects/create
Create new project flow

**Request:**
```json
{
  "templateSlug": "character-design",
  "userId": "user_123",
  "context": {
    "userGoals": ["Create character"],
    "preferences": {
      "style": "fantasy"
    }
  }
}
```

### POST /api/projects/:id/step
Advance project to next step

**Request:**
```json
{
  "userInput": "User's response"
}
```

### GET /api/projects/:id/step
Get current project state

### POST /api/projects/:id/complete
Complete project and get results

### GET /api/projects/:id/complete
Get completed project results

---

**Generated by Arcanea AI Platform**
*Last Updated: 2025*
