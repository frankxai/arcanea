/**
 * World Building Project Template
 * Create immersive fictional worlds with geography, culture, and history
 */

import {
  ProjectTemplate,
  ProjectType,
  StepType,
} from '../../types/projects';

export const worldBuildingTemplate: ProjectTemplate = {
  id: 'world-building-v1',
  name: 'World Building',
  slug: 'world-building',
  description: 'Create a complete fictional world with geography, cultures, history, and visual maps',

  // Visual
  icon: '🌍',
  color: '#10B981',
  thumbnail: '/templates/world-building.png',

  // Configuration
  projectType: ProjectType.WORLD_BUILDING,
  difficulty: 'intermediate',
  estimatedDuration: 35,

  // Flow Definition
  steps: [
    {
      stepNumber: 0,
      name: 'World Concept',
      description: 'Define the core concept and theme of your world',
      type: StepType.INFORMATION_GATHERING,
      prompt: `Let's build an incredible world together! Every great world starts with a vision.

What kind of world are you imagining?
- A high fantasy realm with magic and ancient kingdoms?
- A dystopian future with advanced technology?
- A steampunk world where magic meets machinery?
- A mystical realm inspired by specific cultures?
- Something entirely unique?

Share your vision, and we'll expand it into a living, breathing world!`,
      expectedInput: ['worldType', 'theme', 'uniqueElements'],
      expectedOutputs: ['world_concept'],
      canSkip: false,
      canGoBack: false,
    },
    {
      stepNumber: 1,
      name: 'Geography & Environment',
      description: 'Design the physical landscape and climate',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `Now let's shape the physical world itself!

Tell me about the geography:
- What major landforms exist? (continents, islands, mountains, oceans)
- What's the climate like? (temperate, harsh winters, tropical, varied)
- Are there unique or magical geographical features?
- Any dangerous or mystical regions?
- Size and scale of the world?

Paint me a picture of this world's landscape!`,
      expectedInput: ['geography', 'climate', 'features'],
      expectedOutputs: ['geography_data'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Create detailed geographical descriptions with rich environmental details',
            includeRegions: true,
            includeLandmarks: true,
          },
          usePreviousContext: true,
          saveAs: 'geographyDescription',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 2,
      name: 'Cultures & Civilizations',
      description: 'Develop societies, cultures, and peoples',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `Who lives in this world? Let's create its civilizations!

Tell me about the peoples and cultures:
- What major civilizations or factions exist?
- What are their values, beliefs, and customs?
- How do they relate to each other? (allies, rivals, trade partners)
- What languages do they speak?
- Any unique cultural practices or traditions?

You can describe 2-4 major cultures or peoples.`,
      expectedInput: ['cultures', 'societies', 'relationships'],
      expectedOutputs: ['culture_data'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Expand cultures into detailed societies with customs, governance, and cultural identity',
            createMultipleCultures: true,
          },
          usePreviousContext: true,
          saveAs: 'culturesExpanded',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 3,
      name: 'History & Lore',
      description: 'Create the historical timeline and mythology',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `Every world has a history. Let's create yours!

Share the key historical elements:
- How was this world created? (origin myth or scientific)
- What major historical events shaped it? (wars, disasters, golden ages)
- Are there legendary heroes or villains?
- Ancient mysteries or lost civilizations?
- What era are we in now?

Give me 3-5 major historical events or periods.`,
      expectedInput: ['history', 'mythology', 'keyEvents'],
      expectedOutputs: ['history_data'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Create a comprehensive historical timeline with mythology, legends, and major events',
            createTimeline: true,
            includeLegends: true,
          },
          usePreviousContext: true,
          saveAs: 'worldHistory',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 4,
      name: 'Magic/Technology Systems',
      description: 'Define the power systems and rules',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `What makes your world unique? Let's define its power systems!

Describe the magic, technology, or unique systems:
- Is there magic? How does it work? Who can use it?
- What level of technology exists?
- Are there unique power sources or resources?
- What are the rules and limitations?
- How does this affect society?

Share the core mechanics of how things work in your world.`,
      expectedInput: ['magicSystem', 'technology', 'rules'],
      expectedOutputs: ['systems_data'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Create a detailed, internally consistent magic/technology system with clear rules and implications',
            includeExamples: true,
          },
          usePreviousContext: true,
          saveAs: 'systemsExpanded',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 5,
      name: 'World Map Generation',
      description: 'Generate visual map of the world',
      type: StepType.GENERATION,
      prompt: `Time to visualize your world! I'm generating a map that brings together all the geographical features and regions we've discussed...`,
      expectedInput: [],
      expectedOutputs: ['world_map'],
      aiActions: [
        {
          action: 'generate_image',
          tool: 'gemini-imagen',
          model: 'imagen-3.0-generate-001',
          parameters: {
            aspectRatio: '16:9',
            style: 'fantasy map',
            includeLabels: true,
          },
          usePreviousContext: true,
          saveAs: 'worldMap',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 6,
      name: 'Key Locations',
      description: 'Visualize important locations in the world',
      type: StepType.GENERATION,
      prompt: `Let's bring some key locations to life! Based on what you've created, I'll generate concept art for 2-3 significant places in your world (capital cities, mystical locations, important landmarks)...`,
      expectedInput: [],
      expectedOutputs: ['location_art'],
      aiActions: [
        {
          action: 'generate_image',
          tool: 'gemini-imagen',
          model: 'imagen-3.0-generate-001',
          parameters: {
            aspectRatio: '16:9',
            style: 'environment concept art',
            generateMultiple: 2,
          },
          usePreviousContext: true,
          saveAs: 'locationArt',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 7,
      name: 'World Guide Compilation',
      description: 'Compile complete world guide',
      type: StepType.FINALIZATION,
      prompt: `Creating your complete World Guide that brings everything together...`,
      expectedInput: [],
      expectedOutputs: ['world_guide'],
      aiActions: [
        {
          action: 'combine',
          tool: 'internal',
          parameters: {
            createWorldGuide: true,
            includeAllSections: true,
            format: 'comprehensive',
          },
          usePreviousContext: true,
          saveAs: 'worldGuide',
        },
      ],
      canSkip: false,
      canGoBack: false,
    },
  ],

  // Goals
  goals: [
    {
      id: 'world_geography',
      description: 'Define complete geography and environment',
      type: 'required',
      completionCriteria: 'geography description exists',
      assets: ['text'],
    },
    {
      id: 'world_cultures',
      description: 'Create detailed cultures and societies',
      type: 'required',
      completionCriteria: 'cultures documented',
      assets: ['text'],
    },
    {
      id: 'world_history',
      description: 'Establish historical timeline',
      type: 'required',
      completionCriteria: 'history timeline exists',
      assets: ['text'],
    },
    {
      id: 'world_map',
      description: 'Generate visual world map',
      type: 'required',
      completionCriteria: 'map image exists',
      assets: ['image'],
    },
    {
      id: 'world_guide',
      description: 'Complete comprehensive world guide',
      type: 'required',
      completionCriteria: 'world guide compiled',
      assets: ['text'],
    },
  ],

  // Required Capabilities
  requiredTools: ['claude', 'gemini-imagen'],
  requiredModels: ['claude-3-5-sonnet-20241022', 'imagen-3.0-generate-001'],

  // Luminor Configuration
  luminorPersonality: {
    personality: 'Wise and imaginative world-builder who helps create immersive universes',
    tone: 'mystical',
    openingMessage: `Greetings, world-crafter! I am here to guide you through the ancient art of world-building. Together, we shall forge a realm of wonder—complete with lands, peoples, history, and magic. Let us begin this grand creation!`,
    guidancePrompts: [
      'A fascinating world is taking shape!',
      'The depth of this world is truly impressive',
      'These cultures will bring your world to life',
      'The history you\'re weaving is compelling',
    ],
    celebrationMessages: [
      'Behold! Your world stands complete, ready to be explored!',
      'A magnificent realm has been born!',
    ],
    errorMessages: [
      'Let me guide you toward more clarity',
      'A bit more detail will help us continue',
    ],
  },

  // Cost Estimation
  estimatedCost: {
    arcPoints: 800,
    apiCost: 0.25,
  },

  // Metadata
  tags: ['world-building', 'fantasy', 'lore', 'worldcraft', 'creative'],
  category: 'World Creation',
  popularityScore: 88,
};
