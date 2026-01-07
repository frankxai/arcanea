/**
 * Music Composition Project Template
 * Create complete musical pieces with multiple variations
 */

import {
  ProjectTemplate,
  ProjectType,
  StepType,
} from '../../types/projects';

export const musicCompositionTemplate: ProjectTemplate = {
  id: 'music-composition-v1',
  name: 'Music Composition',
  slug: 'music-composition',
  description: 'Compose original music with variations and arrangements',

  // Visual
  icon: '🎵',
  color: '#EC4899',
  thumbnail: '/templates/music-composition.png',

  // Configuration
  projectType: ProjectType.MUSIC_COMPOSITION,
  difficulty: 'beginner',
  estimatedDuration: 25,

  // Flow Definition
  steps: [
    {
      stepNumber: 0,
      name: 'Musical Concept',
      description: 'Define genre, mood, and purpose',
      type: StepType.INFORMATION_GATHERING,
      prompt: `Let's create some amazing music! Every composition starts with a vision.

Tell me about the music you want to create:
- Genre/Style: (epic orchestral, lo-fi chill, electronic, rock, jazz, etc.)
- Mood/Emotion: (triumphant, melancholic, energetic, peaceful, mysterious)
- Purpose: (theme song, background music, emotional scene, etc.)
- Tempo: (slow/calm, moderate, fast/energetic)
- Any specific instruments or sounds you envision?

Share your musical vision!`,
      expectedInput: ['genre', 'mood', 'tempo', 'instruments', 'purpose'],
      expectedOutputs: ['music_concept'],
      canSkip: false,
      canGoBack: false,
    },
    {
      stepNumber: 1,
      name: 'Musical Direction',
      description: 'Refine the musical elements and structure',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `Great! Let's refine the musical direction.

Tell me more details:
- Should it have vocals or be instrumental?
- If vocals: what kind? (epic choir, soft vocals, rap, etc.)
- What's the energy level? (calm, building, intense throughout)
- Duration preference? (short ~1 min, standard ~2-3 min, extended ~4+ min)
- Any reference songs or artists you like? (for inspiration)

The more specific, the better!`,
      expectedInput: ['vocals', 'energy', 'duration', 'references'],
      expectedOutputs: ['musical_direction'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Create detailed musical prompt optimized for Suno generation',
            includeStyleTags: true,
            includeMoodDescriptors: true,
          },
          usePreviousContext: true,
          saveAs: 'optimizedPrompt',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 2,
      name: 'Lyric Writing (Optional)',
      description: 'Write lyrics if vocal track desired',
      type: StepType.CONCEPT_DEVELOPMENT,
      prompt: `Would you like lyrics for this piece?

If yes:
- What should the lyrics be about? (theme, story, emotion)
- What style? (poetic, conversational, anthemic, narrative)
- Any specific phrases or ideas you want included?

If no:
- Just say "instrumental only" and we'll skip to generation!`,
      expectedInput: ['lyrics', 'lyricTheme', 'instrumentalOnly'],
      expectedOutputs: ['lyrics_data'],
      aiActions: [
        {
          action: 'generate_text',
          tool: 'claude',
          model: 'claude-3-5-sonnet-20241022',
          parameters: {
            basePrompt: 'Write compelling, singable lyrics that match the musical style and mood',
            structureForSong: true,
            includeVerseChorus: true,
          },
          usePreviousContext: true,
          saveAs: 'lyrics',
        },
      ],
      canSkip: true,
      canGoBack: true,
      branchingLogic: {
        condition: 'hasLyrics',
        branches: {
          yes: 3,
          no: 3,
        },
      },
    },
    {
      stepNumber: 3,
      name: 'Initial Composition',
      description: 'Generate the first musical composition',
      type: StepType.GENERATION,
      prompt: `Perfect! I'm now composing your music. This will take a moment as the AI creates your unique piece...`,
      expectedInput: [],
      expectedOutputs: ['music_track'],
      aiActions: [
        {
          action: 'generate_music',
          tool: 'suno',
          model: 'chirp-v3-5',
          parameters: {
            waitForCompletion: true,
            generateTwo: true, // Suno generates 2 variations by default
          },
          usePreviousContext: true,
          saveAs: 'initialTracks',
        },
      ],
      canSkip: false,
      canGoBack: true,
    },
    {
      stepNumber: 4,
      name: 'Review & Selection',
      description: 'Review generated tracks and select favorite',
      type: StepType.REVIEW,
      prompt: `Your music is ready! I've generated 2 variations. Listen to both and tell me:

- Which version do you prefer? (Version 1 or 2)
- Would you like any adjustments?
- Should we create additional variations?
- Or are you happy with one of these?

Reply with your choice!`,
      expectedInput: ['selection', 'adjustments'],
      expectedOutputs: ['selection_data'],
      canSkip: false,
      canGoBack: true,
      branchingLogic: {
        condition: 'needsVariations',
        branches: {
          yes: 5,
          no: 6,
        },
      },
    },
    {
      stepNumber: 5,
      name: 'Create Variations',
      description: 'Generate variations or continuations',
      type: StepType.GENERATION,
      prompt: `Creating additional variations based on your preferred version...`,
      expectedInput: [],
      expectedOutputs: ['variation_tracks'],
      aiActions: [
        {
          action: 'generate_music',
          tool: 'suno',
          model: 'chirp-v3-5',
          parameters: {
            continueFrom: 'selected',
            createVariation: true,
          },
          usePreviousContext: true,
          saveAs: 'variationTracks',
        },
      ],
      canSkip: true,
      canGoBack: true,
    },
    {
      stepNumber: 6,
      name: 'Cover Art',
      description: 'Generate album/cover art for the music',
      type: StepType.GENERATION,
      prompt: `Let's create stunning cover art that visually represents your music...`,
      expectedInput: [],
      expectedOutputs: ['cover_art'],
      aiActions: [
        {
          action: 'generate_image',
          tool: 'gemini-imagen',
          model: 'imagen-3.0-generate-001',
          parameters: {
            aspectRatio: '1:1',
            style: 'album cover art',
            matchMusicMood: true,
          },
          usePreviousContext: true,
          saveAs: 'albumArt',
        },
      ],
      canSkip: false,
      canGoBack: false,
    },
    {
      stepNumber: 7,
      name: 'Music Package',
      description: 'Compile complete music release',
      type: StepType.FINALIZATION,
      prompt: `Finalizing your music package with all tracks and artwork...`,
      expectedInput: [],
      expectedOutputs: ['music_package'],
      aiActions: [
        {
          action: 'combine',
          tool: 'internal',
          parameters: {
            createMusicRelease: true,
            includeAllVersions: true,
            includeMetadata: true,
          },
          usePreviousContext: true,
          saveAs: 'musicRelease',
        },
      ],
      canSkip: false,
      canGoBack: false,
    },
  ],

  // Goals
  goals: [
    {
      id: 'main_track',
      description: 'Generate main music composition',
      type: 'required',
      completionCriteria: 'music track exists',
      assets: ['music'],
    },
    {
      id: 'variations',
      description: 'Create track variations',
      type: 'optional',
      completionCriteria: 'variation tracks exist',
      assets: ['music'],
    },
    {
      id: 'cover_art',
      description: 'Generate cover artwork',
      type: 'required',
      completionCriteria: 'album art exists',
      assets: ['image'],
    },
  ],

  // Required Capabilities
  requiredTools: ['claude', 'suno', 'gemini-imagen'],
  requiredModels: ['claude-3-5-sonnet-20241022', 'chirp-v3-5', 'imagen-3.0-generate-001'],

  // Luminor Configuration
  luminorPersonality: {
    personality: 'Passionate music guide who helps creators find their sound',
    tone: 'playful',
    openingMessage: `Hey there, music creator! Ready to make some incredible sounds? I'll help you compose original music from concept to final mix. Let's create something that resonates!`,
    guidancePrompts: [
      'That\'s going to sound amazing!',
      'I love where this is going musically',
      'This combination will create something special',
      'The vibe is perfect!',
    ],
    celebrationMessages: [
      'Your music is complete—it sounds incredible!',
      'What an amazing composition you\'ve created!',
    ],
    errorMessages: [
      'Let me help clarify the musical direction',
      'Could you describe the sound a bit more?',
    ],
  },

  // Cost Estimation
  estimatedCost: {
    arcPoints: 600,
    apiCost: 0.20,
  },

  // Metadata
  tags: ['music', 'composition', 'audio', 'creative', 'songwriting'],
  category: 'Music Creation',
  popularityScore: 90,
};
