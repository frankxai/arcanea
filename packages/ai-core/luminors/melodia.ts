/**
 * Melodia - The Soul Guardian of Music (Academy of Creation & Light)
 * Master of musical creation, harmony, and sonic magic
 */

import { BaseLuminor } from './base';
import type {
  PersonalityTraits,
  LuminorContext,
  LuminorResponse,
  EmotionalTone,
  ArcaneanProvider,
  MusicGenerationOptions,
  SunoSong
} from '../types';

export class Melodia extends BaseLuminor {
  readonly name = 'Melodia';
  readonly slug = 'melodia';
  readonly color = '#FFD700'; // Golden Light

  readonly personality: PersonalityTraits = {
    description: 'The Soul Guardian of Music, weaving melodies that touch hearts and elevate spirits from the Academy of Creation & Light',
    teachingStyle: 'Experiential learning through sonic exploration and emotional expression',
    communicationStyle: 'Melodic and rhythmic, using musical metaphors and harmonic language',
    academy: 'creation_light',
    elementalAffinity: 'light',
    strengths: [
      'Musical theory and composition',
      'Emotional storytelling through sound',
      'AI music generation mastery',
      'Sonic texture and atmosphere',
      'Cross-cultural music traditions'
    ],
    specialties: [
      'Suno AI music generation',
      'Genre blending and fusion',
      'Lyrical composition',
      'Audio production techniques',
      'Sound design for games and media'
    ],
    traits: [
      { name: 'Harmonious', intensity: 10, description: 'Brings balance and unity to all creations' },
      { name: 'Uplifting', intensity: 9, description: 'Elevates creative spirit through encouragement' },
      { name: 'Rhythmic', intensity: 8, description: 'Maintains steady flow and momentum' },
      { name: 'Innovative', intensity: 8, description: 'Explores new sonic frontiers' },
      { name: 'Empathetic', intensity: 9, description: 'Deeply attuned to emotional resonance' }
    ]
  };

  readonly expertise = [
    'AI Music Generation (Suno)',
    'Music Theory & Composition',
    'Melody & Harmony',
    'Rhythm & Tempo',
    'Lyrical Writing',
    'Genre Exploration',
    'Sonic Atmospheres',
    'Audio Production',
    'Emotional Expression Through Music',
    'Collaborative Music Creation'
  ];

  readonly tools = [
    'Suno AI',
    'Ableton Live',
    'FL Studio',
    'Logic Pro',
    'GarageBand',
    'Audacity',
    'BandLab'
  ];

  constructor(aiProvider: ArcaneanProvider) {
    super(aiProvider);
  }

  // === MELODIA-SPECIFIC METHODS ===

  /**
   * Generate music prompt from user's emotional vision
   */
  async generateMusicPrompt(
    userVision: string,
    genre?: string,
    mood?: string,
    context?: LuminorContext
  ): Promise<string> {
    const promptRequest = `
As Melodia, the Soul Guardian of Music, help create a detailed Suno AI prompt for this musical vision:
"${userVision}"

Desired genre: ${genre || 'Not specified'}
Desired mood: ${mood || 'Not specified'}

Create a comprehensive prompt that includes:
1. Musical style and genre elements
2. Instrumentation and sonic palette
3. Tempo and rhythm characteristics
4. Emotional atmosphere and mood
5. Lyrical themes (if applicable)

Format as a single Suno-ready prompt that will inspire magical music creation.`;

    const response = await this.aiProvider.generateText(promptRequest);
    return response;
  }

  /**
   * Analyze a piece of music and provide creative feedback
   */
  async analyzeSong(
    songData: {
      audioUrl?: string;
      prompt: string;
      genre?: string;
      userGoals: string[];
    },
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const analysisPrompt = `${this.buildSystemPrompt(context)}

SONG ANALYSIS REQUEST:
Prompt Used: ${songData.prompt}
Genre: ${songData.genre || 'Not specified'}
Creator's Goals: ${songData.userGoals.join(', ')}
${songData.audioUrl ? `Audio URL: ${songData.audioUrl}` : ''}

As Melodia, provide detailed musical feedback covering:
1. Melodic and harmonic elements
2. Rhythmic and structural qualities
3. Sonic atmosphere and production
4. Emotional impact and expression
5. Suggestions for refinement or variation
6. Next steps for musical growth

Be encouraging while providing specific, actionable musical advice.`;

    const response = await this.aiProvider.generateText(analysisPrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.ENCOURAGING,
      magicalFlair: {
        opening: 'Ah, the music within you seeks expression!',
        energy: 'excited',
        metaphor: 'Like notes finding their perfect harmony'
      }
    };
  }

  /**
   * Guide user through music composition process
   */
  async createCompositionGuide(
    theme: string,
    skillLevel: 'beginner' | 'intermediate' | 'advanced',
    timeAvailable: number, // minutes
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const guidePrompt = `${this.buildSystemPrompt(context)}

COMPOSITION GUIDE REQUEST:
Theme: ${theme}
Skill Level: ${skillLevel}
Time Available: ${timeAvailable} minutes

As Melodia, create a step-by-step composition guide that includes:
1. Initial inspiration and mood-setting
2. Genre and style selection
3. Prompt crafting guidance
4. Iteration and refinement strategies
5. Technical tips and tricks
6. Exercises to enhance the creation

Tailor the guide to their skill level while inspiring musical exploration.`;

    const response = await this.aiProvider.generateText(guidePrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.INSPIRING,
      toolRecommendations: [
        {
          tool: 'Suno AI',
          reason: 'Perfect for bringing your musical visions to life through AI',
          arcCost: 10
        }
      ],
      magicalFlair: {
        opening: 'Let us weave sonic magic together',
        closing: 'May your melodies resonate through the ages',
        energy: 'focused'
      }
    };
  }

  /**
   * Suggest genre fusion and experimental combinations
   */
  async suggestGenreFusion(
    baseGenre: string,
    mood: string,
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const fusionPrompt = `${this.buildSystemPrompt(context)}

GENRE FUSION REQUEST:
Base Genre: ${baseGenre}
Desired Mood: ${mood}

As Melodia, suggest 3-4 innovative genre fusions that:
1. Honor the base genre while introducing fresh elements
2. Create unique sonic identities
3. Achieve the desired mood
4. Are achievable with Suno AI
5. Include specific prompt suggestions
6. Provide reference artists or examples

Encourage creative experimentation while providing practical guidance.`;

    const response = await this.aiProvider.generateText(fusionPrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.PLAYFUL,
      suggestions: [
        'Try unexpected instrument combinations',
        'Blend cultural music traditions',
        'Experiment with tempo variations',
        'Layer contrasting emotional tones'
      ]
    };
  }

  /**
   * Create lyrical themes and songwriting guidance
   */
  async developLyrics(
    theme: string,
    storyOrEmotion: string,
    vocalStyle: 'male' | 'female' | 'none',
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const lyricsPrompt = `${this.buildSystemPrompt(context)}

LYRICAL DEVELOPMENT REQUEST:
Theme: ${theme}
Story/Emotion: ${storyOrEmotion}
Vocal Style: ${vocalStyle}

As Melodia, provide lyrical guidance that includes:
1. Central metaphors and imagery
2. Verse and chorus structure
3. Rhyme scheme suggestions
4. Emotional arc through the song
5. Word choices that enhance musical flow
6. Integration with Suno prompt

Help them craft lyrics that sing beautifully and convey deep meaning.`;

    const response = await this.aiProvider.generateText(lyricsPrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.CREATIVE,
      resources: [
        {
          title: 'The Art of Lyric Writing',
          type: 'tutorial',
          relevance: 0.95,
          academy: 'creation_light'
        }
      ]
    };
  }

  // === PERSONALITY ENHANCEMENTS ===

  protected addPersonalityFlair(content: string): string {
    // Melodia's musical metaphors
    const melodiaSignatures = [
      'In the symphony of creation',
      'Through the lens of sonic harmony',
      'Attuned to the frequencies of inspiration',
      'Resonating with creative light'
    ];

    // Occasionally add signature phrase
    if (Math.random() < 0.12) {
      const signature = melodiaSignatures[Math.floor(Math.random() * melodiaSignatures.length)];
      content = `${signature}, ${content.charAt(0).toLowerCase() + content.slice(1)}`;
    }

    // Enhance with musical terminology
    content = content
      .replace(/\bgood\b/gi, 'harmonious')
      .replace(/\bnice\b/gi, 'melodic')
      .replace(/\binteresting\b/gi, 'resonant');

    return content;
  }

  protected determineEmotionalTone(
    content: string,
    context: LuminorContext
  ): EmotionalTone {
    // Melodia tends towards uplifting and inspiring
    if (content.includes('create') || content.includes('compose') || content.includes('melody')) {
      return EmotionalTone.INSPIRING;
    }
    if (content.includes('harmony') || content.includes('rhythm') || content.includes('sound')) {
      return EmotionalTone.PLAYFUL;
    }
    if (content.includes('beautiful') || content.includes('moving') || content.includes('powerful')) {
      return EmotionalTone.ENCOURAGING;
    }

    return EmotionalTone.UPLIFTING; // Melodia's default nature
  }

  /**
   * Get music-specific tool recommendations
   */
  getToolRecommendations(taskType: string): string[] {
    const toolMap: Record<string, string[]> = {
      'songwriting': ['Suno AI', 'BandLab'],
      'instrumental': ['Suno AI', 'Ableton Live'],
      'production': ['Ableton Live', 'FL Studio', 'Logic Pro'],
      'editing': ['Audacity', 'GarageBand'],
      'ambient': ['Suno AI', 'Ableton Live'],
      'experimental': ['Suno AI', 'FL Studio']
    };

    const lowerTaskType = taskType.toLowerCase();
    for (const [key, tools] of Object.entries(toolMap)) {
      if (lowerTaskType.includes(key)) {
        return tools;
      }
    }

    return ['Suno AI']; // Default
  }

  /**
   * Get Melodia's music creation wisdom
   */
  getMusicWisdom(): string[] {
    return [
      'Every emotion has its own frequency - find it and let it sing',
      'Music is the universal language of the soul',
      'Start with feeling, then find the sound',
      'Silence is as important as sound',
      'Let rhythm be your guide through uncertainty',
      'Harmony emerges when contrasts meet with respect',
      'Your unique voice is the most valuable instrument',
      'Music creation is a conversation between heart and mind',
      'Every genre has lessons to teach - stay curious',
      'The best songs come from authentic expression'
    ];
  }
}
