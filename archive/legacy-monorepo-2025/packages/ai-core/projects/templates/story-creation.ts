/**
 * Story Creation Project Template
 * Write complete stories with character development, plot, and illustrations
 */

import {
  ProjectTemplate,
  ProjectType,
  StepType,
} from '../../types/projects';

export const storyCreationTemplate: ProjectTemplate = {
  id: 'story-creation-v1',
  name: 'Story Creation',
  slug: 'story-creation',
  description: 'Write a complete story with characters, plot, and visual scenes',

  // Visual
  icon: '📖',
  color: '#F59E0B',
  thumbnail: '/templates/story-creation.png',

  // Configuration
  projectType: ProjectType.STORY_CREATION,
  difficulty: 'intermediate',
  estimatedDuration: 30,

  // Flow Definition
  steps: [
    {
      stepNumber: 0,
      name: 'Story Concept',
      description: 'Define genre, theme, and premise',
      type: StepType.INFORMATION_GATHERING,
      prompt: `Every great story begins with a spark of inspiration! Let's craft yours.

Tell me about your story:
- What genre? (fantasy, sci-fi, romance, mystery, adventure, etc.)
- What's the core premise or "what if" question?
- What themes do you want to explore?
- What tone? (dark, lighthearted, epic, intimate)
- Approximate length? (short story, novella, multi-chapter)

Share your vision!`,
      expectedInput: ['genre', 'premise', 'theme', 'tone', 'length'],
      expectedOutputs: ['story_concept'],
      canSkip: false,
      canGoBack: false,
    },
    {
      stepNumber: 1,
      name: 'Main Characters',
      description: 'Create protagonist and key characters',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `Who will live this story? Let's meet your characters!

Describe your main character(s):
- Protagonist: name, role, key traits
- What do they want? What's at stake?
- Supporting characters (1-3 key ones)
- Antagonist or conflict source (if applicable)

Give me the essentials—I'll help develop them further!`,
      expectedInput: ['protagonist', 'supporting', 'antagonist'],
      expectedOutputs: ['character_data'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Expand character sketches into fully-developed characters with depth, motivations, and arcs',
            includeArcs: true,
          },
          usePreviousContext: true,
          saveAs: 'expandedCharacters',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 2,
      name: 'Plot Structure',
      description: 'Outline the story arc and key events',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `Now for the journey! Let's map out your story's path.

Describe the main plot points:
- Opening situation: where do we begin?
- Inciting incident: what kicks off the story?
- Major obstacles or challenges (2-3 key ones)
- Climax: the big turning point
- Resolution: how does it end?

You can share as much or as little as you like—I'll help structure it!`,
      expectedInput: ['opening', 'conflict', 'climax', 'resolution'],
      expectedOutputs: ['plot_outline'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Create a detailed plot outline with scene breakdowns and narrative beats',
            useThreeActStructure: true,
            includeSubplots: true,
          },
          usePreviousContext: true,
          saveAs: 'detailedOutline',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 3,
      name: 'Setting & World',
      description: 'Establish where and when the story takes place',
      type: StepType.INFORMATION_GATHERING,
      prompt: `Where does your story unfold? Let's build the setting!

Tell me about the world:
- Time period and location
- Key locations (2-4 important places)
- Atmosphere and mood of the setting
- Any unique world rules or elements?

Paint the scene for me!`,
      expectedInput: ['setting', 'locations', 'atmosphere'],
      expectedOutputs: ['setting_data'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Create vivid, immersive setting descriptions that enhance the story',
          },
          usePreviousContext: true,
          saveAs: 'settingDescription',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 4,
      name: 'Story Writing',
      description: 'Generate the complete story',
      type: StepType.GENERATION,
      prompt: `All the pieces are in place! I'm now writing your story, weaving together characters, plot, and setting into a complete narrative...

This may take a moment as I craft each scene with care.`,
      expectedInput: [],
      expectedOutputs: ['story_text'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Write a complete, engaging story with all elements integrated',
            style: 'literary',
            includeDialogue: true,
            includeDescription: true,
            chapterBreaks: true,
          },
          usePreviousContext: true,
          saveAs: 'storyManuscript',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 5,
      name: 'Key Scene Illustrations',
      description: 'Generate artwork for pivotal moments',
      type: StepType.GENERATION,
      prompt: `Your story is written! Now let's bring key moments to life visually. I'll create illustrations for 3 pivotal scenes...`,
      expectedInput: [],
      expectedOutputs: ['scene_illustrations'],
      aiActions: [
        {
          action: 'analyze',
          tool: 'claude',
          parameters: {
            analyzeFor: 'visualScenes',
            selectTopScenes: 3,
          },
          usePreviousContext: true,
          saveAs: 'scenesToIllustrate',
        },
        {
          action: 'generate_image',
          tool: 'gemini-imagen',
          model: 'imagen-3.0-generate-001',
          parameters: {
            aspectRatio: '16:9',
            style: 'storybook illustration',
            generateMultiple: 3,
          },
          usePreviousContext: true,
          saveAs: 'sceneArt',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 6,
      name: 'Cover Art',
      description: 'Create cover art for the story',
      type: StepType.GENERATION,
      prompt: `Finally, let's create stunning cover art that captures the essence of your story...`,
      expectedInput: [],
      expectedOutputs: ['cover_art'],
      aiActions: [
        {
          action: 'generate_image',
          tool: 'gemini-imagen',
          model: 'imagen-3.0-generate-001',
          parameters: {
            aspectRatio: '2:3',
            style: 'book cover art',
            quality: 'premium',
          },
          usePreviousContext: true,
          saveAs: 'coverArt',
        },
      ],
      canSkip: false,
      canGoBack: false,
    },
    {
      stepNumber: 7,
      name: 'Story Compilation',
      description: 'Compile the complete story package',
      type: StepType.FINALIZATION,
      prompt: `Compiling your complete story with all text and illustrations...`,
      expectedInput: [],
      expectedOutputs: ['story_package'],
      aiActions: [
        {
          action: 'combine',
          tool: 'internal',
          parameters: {
            createStoryBook: true,
            includeAllAssets: true,
            format: 'digital_book',
          },
          usePreviousContext: true,
          saveAs: 'completeStory',
        },
      ],
      canSkip: false,
      canGoBack: false,
    },
  ],

  // Goals
  goals: [
    {
      id: 'story_written',
      description: 'Complete story manuscript',
      type: 'required',
      completionCriteria: 'story text exists',
      assets: ['story'],
    },
    {
      id: 'illustrations',
      description: 'Scene illustrations generated',
      type: 'required',
      completionCriteria: 'scene art exists',
      assets: ['image'],
    },
    {
      id: 'cover_art',
      description: 'Cover art created',
      type: 'required',
      completionCriteria: 'cover image exists',
      assets: ['image'],
    },
  ],

  // Required Capabilities
  requiredTools: ['claude', 'gemini-imagen'],
  requiredModels: ['claude-3-5-sonnet-20241022', 'imagen-3.0-generate-001'],

  // Luminor Configuration
  luminorPersonality: {
    personality: 'Passionate storyteller who helps craft compelling narratives',
    tone: 'encouraging',
    openingMessage: `Welcome, storyteller! I'm thrilled to help you bring your story to life—from the first spark of an idea to a complete narrative with beautiful illustrations. Let's create something memorable together!`,
    guidancePrompts: [
      'What an intriguing premise!',
      'Your characters are coming alive on the page',
      'The plot is taking an exciting shape',
      'This scene will be powerful',
    ],
    celebrationMessages: [
      'Your story is complete—a beautiful creation!',
      'What a wonderful tale you\'ve crafted!',
    ],
    errorMessages: [
      'Let me help clarify what would work best here',
      'Could you share a bit more about that?',
    ],
  },

  // Cost Estimation
  estimatedCost: {
    arcPoints: 700,
    apiCost: 0.30,
  },

  // Metadata
  tags: ['story', 'writing', 'narrative', 'fiction', 'creative'],
  category: 'Story Writing',
  popularityScore: 92,
};
