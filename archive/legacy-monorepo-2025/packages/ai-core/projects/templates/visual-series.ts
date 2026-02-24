/**
 * Visual Series Project Template
 * Create a cohesive series of images with consistent style
 */

import {
  ProjectTemplate,
  ProjectType,
  StepType,
} from '../../types/projects';

export const visualSeriesTemplate: ProjectTemplate = {
  id: 'visual-series-v1',
  name: 'Visual Series',
  slug: 'visual-series',
  description: 'Create a cohesive series of images with consistent style and theme',

  // Visual
  icon: '🎨',
  color: '#6366F1',
  thumbnail: '/templates/visual-series.png',

  // Configuration
  projectType: ProjectType.VISUAL_SERIES,
  difficulty: 'intermediate',
  estimatedDuration: 30,

  // Flow Definition
  steps: [
    {
      stepNumber: 0,
      name: 'Series Concept',
      description: 'Define the theme and concept for the series',
      type: StepType.INFORMATION_GATHERING,
      prompt: `Let's create an amazing visual series! Whether it's for a story, brand, or pure art, we'll make something cohesive and stunning.

Tell me about your vision:
- What's the series about? (character journey, locations, abstract concepts, etc.)
- What style are you going for? (fantasy art, cyberpunk, minimalist, photo-realistic, etc.)
- How many images? (3-5 recommended, up to 10)
- What mood or atmosphere? (dark and moody, bright and cheerful, etc.)
- Any specific themes or elements?

Share your vision!`,
      expectedInput: ['concept', 'style', 'count', 'mood', 'themes'],
      expectedOutputs: ['series_concept'],
      canSkip: false,
      canGoBack: false,
    },
    {
      stepNumber: 1,
      name: 'Style Definition',
      description: 'Establish the visual style and consistency rules',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `Now let's lock in the visual style that will unify your series.

Define the style elements:
- Color palette: (specific colors, warm/cool tones, monochrome, etc.)
- Art style: (painting, digital art, illustration, photographic, etc.)
- Composition style: (dramatic angles, symmetrical, dynamic, etc.)
- Consistent elements: (same character, similar framing, recurring symbols, etc.)
- Level of detail: (highly detailed, stylized, minimalist)

The more specific, the more consistent your series will be!`,
      expectedInput: ['colorPalette', 'artStyle', 'composition', 'consistency'],
      expectedOutputs: ['style_guide'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Create a detailed style guide for consistent image generation',
            includePromptTemplate: true,
            includeConsistencyRules: true,
          },
          usePreviousContext: true,
          saveAs: 'styleGuide',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 2,
      name: 'Scene Planning',
      description: 'Plan each image in the series',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `Time to plan each image! For your series of [N] images, describe what each one should show.

For each image, tell me:
- Image 1: [scene description]
- Image 2: [scene description]
- Image 3: [scene description]
(and so on...)

Consider:
- How do they connect? (progression, contrast, complementary)
- What story do they tell together?
- Any text or focal elements?

You can describe them all at once or one at a time!`,
      expectedInput: ['scenes', 'progression', 'connections'],
      expectedOutputs: ['scene_descriptions'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Expand scene descriptions into detailed visual prompts while maintaining consistency',
            applyStyleGuide: true,
            ensureProgression: true,
          },
          usePreviousContext: true,
          saveAs: 'detailedScenes',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 3,
      name: 'Reference Image',
      description: 'Generate reference image for style consistency',
      type: StepType.GENERATION,
      prompt: `Creating a reference image that establishes the style for your entire series...`,
      expectedInput: [],
      expectedOutputs: ['reference_image'],
      aiActions: [
        {
          action: 'generate_image',
          tool: 'gemini-imagen',
          model: 'imagen-3.0-generate-001',
          parameters: {
            aspectRatio: '16:9',
            quality: 'premium',
            useAsReference: true,
          },
          usePreviousContext: true,
          saveAs: 'referenceImage',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 4,
      name: 'Style Approval',
      description: 'Review and approve the style',
      type: StepType.REVIEW,
      prompt: `Here's your style reference image! This will set the tone for your entire series.

Does this match your vision?
- "Yes, perfect!" - Let's generate the series
- "Close, but..." - Tell me what to adjust
- "Different direction" - Let's try a different style

What do you think?`,
      expectedInput: ['approval', 'adjustments'],
      expectedOutputs: ['approval_data'],
      branchingLogic: {
        condition: 'approved',
        branches: {
          yes: 5,
          adjust: 3, // Go back to regenerate reference
        },
      },
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 5,
      name: 'Series Generation',
      description: 'Generate all images in the series',
      type: StepType.GENERATION,
      prompt: `Perfect! Now generating your complete series with consistent style...

This will take a few moments as I create each image with care to maintain visual coherence.`,
      expectedInput: [],
      expectedOutputs: ['series_images'],
      aiActions: [
        {
          action: 'generate_image',
          tool: 'gemini-imagen',
          model: 'imagen-3.0-generate-001',
          parameters: {
            aspectRatio: '16:9',
            quality: 'premium',
            useReferenceImage: true,
            generateSeries: true,
            maintainConsistency: true,
          },
          usePreviousContext: true,
          saveAs: 'seriesImages',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 6,
      name: 'Refinement Options',
      description: 'Option to refine or regenerate specific images',
      type: StepType.REVIEW,
      prompt: `Your series is complete! Review all the images.

Would you like to:
- Keep the series as is
- Regenerate specific images (tell me which ones and what to change)
- Add one more image to the series
- Proceed to finalization

What's your choice?`,
      expectedInput: ['refinements', 'approval'],
      expectedOutputs: ['refinement_choices'],
      branchingLogic: {
        condition: 'needsRefinement',
        branches: {
          yes: 5, // Regenerate
          no: 7,  // Finalize
        },
      },
      canSkip: true,
      canGoBack: true,
    },
    {
      stepNumber: 7,
      name: 'Series Compilation',
      description: 'Create final series presentation',
      type: StepType.FINALIZATION,
      prompt: `Creating your final series presentation with all images beautifully arranged...`,
      expectedInput: [],
      expectedOutputs: ['series_package'],
      aiActions: [
        {
          action: 'combine',
          tool: 'internal',
          parameters: {
            createCollage: true,
            createGrid: true,
            includeIndividual: true,
            generateDescription: true,
          },
          usePreviousContext: true,
          saveAs: 'seriesPackage',
        },
      ],
      canSkip: false,
      canGoBack: false,
    },
  ],

  // Goals
  goals: [
    {
      id: 'style_guide',
      description: 'Establish consistent style guide',
      type: 'required',
      completionCriteria: 'style guide created',
      assets: ['text'],
    },
    {
      id: 'reference_image',
      description: 'Generate style reference',
      type: 'required',
      completionCriteria: 'reference image exists',
      assets: ['image'],
    },
    {
      id: 'series_images',
      description: 'Generate complete image series',
      type: 'required',
      completionCriteria: 'all series images exist',
      assets: ['image'],
    },
    {
      id: 'series_package',
      description: 'Create final series presentation',
      type: 'required',
      completionCriteria: 'series package complete',
      assets: ['image'],
    },
  ],

  // Required Capabilities
  requiredTools: ['claude', 'gemini-imagen'],
  requiredModels: ['claude-3-5-sonnet-20241022', 'imagen-3.0-generate-001'],

  // Luminor Configuration
  luminorPersonality: {
    personality: 'Artistic visual guide who helps create cohesive visual narratives',
    tone: 'professional',
    openingMessage: `Welcome, visual artist! I'm here to help you create a stunning image series with consistent style and compelling visual flow. Together, we'll craft images that work beautifully both individually and as a collection. Let's begin!`,
    guidancePrompts: [
      'Excellent visual direction!',
      'This style is going to be striking',
      'The consistency is coming together perfectly',
      'These images will look amazing together',
    ],
    celebrationMessages: [
      'Your visual series is complete—stunning work!',
      'What a cohesive and beautiful series!',
    ],
    errorMessages: [
      'Let me help refine that visual direction',
      'Could you clarify the style a bit more?',
    ],
  },

  // Cost Estimation
  estimatedCost: {
    arcPoints: 900,
    apiCost: 0.35,
  },

  // Metadata
  tags: ['visual', 'series', 'art', 'images', 'creative', 'design'],
  category: 'Visual Creation',
  popularityScore: 85,
};
