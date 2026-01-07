/**
 * Character Design Project Template
 * Multi-turn flow for creating complete character designs
 */

import {
  ProjectTemplate,
  ProjectType,
  StepType,
  AssetType,
} from '../../types/projects';

export const characterDesignTemplate: ProjectTemplate = {
  id: 'character-design-v1',
  name: 'Character Design',
  slug: 'character-design',
  description: 'Create a complete character with backstory, personality, and visual design',

  // Visual
  icon: '👤',
  color: '#8B5CF6',
  thumbnail: '/templates/character-design.png',

  // Configuration
  projectType: ProjectType.CHARACTER_DESIGN,
  difficulty: 'beginner',
  estimatedDuration: 20, // minutes

  // Flow Definition
  steps: [
    {
      stepNumber: 0,
      name: 'Character Concept',
      description: 'Define the basic concept and role of your character',
      type: StepType.INFORMATION_GATHERING,
      prompt: `Let's bring your character to life! First, tell me about the character you envision. What kind of character are you thinking about? For example:

- A brave warrior from a mystical land
- A cunning rogue with a mysterious past
- A wise mage who studies ancient magic
- A quirky inventor from a steampunk world

Share your basic concept, and we'll build from there!`,
      expectedInput: ['characterType', 'characterRole', 'basicConcept'],
      expectedOutputs: ['concept_data'],
      canSkip: false,
      canGoBack: false,
    },
    {
      stepNumber: 1,
      name: 'Personality & Traits',
      description: 'Develop personality, traits, and motivations',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `Excellent! Now let's dive deeper into who this character really is.

What are their key personality traits? Think about:
- Are they brave, cautious, or reckless?
- Are they kind-hearted, cynical, or mysterious?
- What drives them? What are their goals and fears?
- What makes them unique?

Share 3-5 key traits and their main motivation.`,
      expectedInput: ['personality', 'traits', 'motivation', 'fears'],
      expectedOutputs: ['personality_data'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Expand the character personality into a detailed psychological profile',
            includeMotivations: true,
            includeConflicts: true,
          },
          usePreviousContext: true,
          saveAs: 'expandedPersonality',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 2,
      name: 'Physical Description',
      description: 'Describe physical appearance and distinctive features',
      type: StepType.INFORMATION_GATHERING,
      prompt: `Now let's visualize what they look like!

Describe their physical appearance:
- Height, build, and general physique
- Hair, eyes, skin tone
- Distinctive features (scars, tattoos, unique accessories)
- Clothing style and typical outfit
- Any magical or supernatural elements

The more detail you provide, the better the concept art will be!`,
      expectedInput: ['appearance', 'features', 'clothing'],
      expectedOutputs: ['appearance_data'],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 3,
      name: 'Concept Art Generation',
      description: 'Generate initial concept art',
      type: StepType.GENERATION,
      prompt: `Perfect! I'm now generating concept art based on your description. This will capture the essence of your character...`,
      expectedInput: [],
      expectedOutputs: ['concept_art'],
      aiActions: [
        {
          action: 'generate_image',
          tool: 'gemini-imagen',
          model: 'imagen-3.0-generate-001',
          parameters: {
            aspectRatio: '3:4',
            style: 'concept art',
            quality: 'high',
          },
          usePreviousContext: true,
          saveAs: 'conceptArt',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 4,
      name: 'Backstory Creation',
      description: 'Develop character backstory and history',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `Great! Your character is taking shape visually. Now let's explore their past.

Tell me about their backstory:
- Where did they grow up?
- What major events shaped them?
- What's their relationship with family/friends?
- What led them to where they are now?

You can share key points, and I'll help weave it into a compelling narrative.`,
      expectedInput: ['backstory', 'origin', 'keyEvents'],
      expectedOutputs: ['backstory_data'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Create a compelling, detailed backstory that integrates all character elements',
            style: 'narrative',
            length: 'medium',
          },
          usePreviousContext: true,
          saveAs: 'backstory',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 5,
      name: 'Refinement & Adjustments',
      description: 'Review and refine the character design',
      type: StepType.REVIEW,
      prompt: `Let's review what we've created! I'll show you:
- The complete character profile
- Concept art
- Full backstory

Would you like to make any adjustments? You can:
- Refine the visual design
- Add details to the backstory
- Adjust personality traits
- Or proceed to final generation`,
      expectedInput: ['refinements', 'approval'],
      expectedOutputs: ['refinement_data'],
      branchingLogic: {
        condition: 'needsRefinement',
        branches: {
          yes: 3, // Go back to concept art
          no: 6,  // Continue to final
        },
      },
      canSkip: true,
      canGoBack: true,
    },
    {
      stepNumber: 6,
      name: 'Final Portrait',
      description: 'Generate high-quality final character portrait',
      type: StepType.FINALIZATION,
      prompt: `Excellent! Creating your final character portrait with all the refined details...`,
      expectedInput: [],
      expectedOutputs: ['final_portrait'],
      aiActions: [
        {
          action: 'generate_image',
          tool: 'gemini-imagen',
          model: 'imagen-3.0-generate-001',
          parameters: {
            aspectRatio: '3:4',
            style: 'detailed character portrait',
            quality: 'premium',
          },
          usePreviousContext: true,
          saveAs: 'finalPortrait',
        },
        {
          action: 'combine',
          tool: 'internal',
          parameters: {
            createCharacterSheet: true,
          },
          usePreviousContext: true,
          saveAs: 'characterSheet',
        },
      ],
      canSkip: false,
      canGoBack: false,
    },
  ],

  // Goals
  goals: [
    {
      id: 'concept_art',
      description: 'Generate concept art for the character',
      type: 'required',
      completionCriteria: 'concept_art asset exists',
      assets: ['concept_art'],
    },
    {
      id: 'backstory',
      description: 'Create detailed backstory',
      type: 'required',
      completionCriteria: 'backstory text exists',
      assets: ['story'],
    },
    {
      id: 'final_portrait',
      description: 'Generate final character portrait',
      type: 'required',
      completionCriteria: 'final portrait exists',
      assets: ['image'],
    },
  ],

  // Required Capabilities
  requiredTools: ['claude', 'gemini-imagen'],
  requiredModels: ['claude-3-5-sonnet-20241022', 'imagen-3.0-generate-001'],

  // Luminor Configuration
  luminorPersonality: {
    personality: 'Creative and encouraging guide who helps bring characters to life',
    tone: 'encouraging',
    openingMessage: `Welcome, creator! I'm here to help you design an amazing character from concept to final portrait. Together, we'll explore their personality, appearance, and backstory, then bring them to life visually. Ready to begin?`,
    guidancePrompts: [
      'That\'s a fascinating character concept!',
      'I love the depth you\'re adding to their personality',
      'Those visual details will make for stunning artwork',
      'This backstory is really coming together beautifully',
    ],
    celebrationMessages: [
      'Your character is complete and absolutely stunning!',
      'What an incredible character you\'ve created!',
    ],
    errorMessages: [
      'Let me help clarify what I need to continue',
      'Could you provide a bit more detail about that?',
    ],
  },

  // Cost Estimation
  estimatedCost: {
    arcPoints: 500,
    apiCost: 0.15, // USD
  },

  // Metadata
  tags: ['character', 'design', 'creative', 'storytelling', 'visual'],
  category: 'Character Creation',
  popularityScore: 95,
};
