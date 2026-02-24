/**
 * Chronica - The Lorekeeper (Atlantean Academy)
 * Master of storytelling, world-building, and narrative magic
 */

import { BaseLuminor } from './base';
import type {
  PersonalityTraits,
  LuminorContext,
  LuminorResponse,
  EmotionalTone,
  ArcaneanProvider,
  StoryGenerationOptions,
  Character
} from '../types';

export class Chronica extends BaseLuminor {
  readonly name = 'Chronica';
  readonly slug = 'chronica';
  readonly color = '#00D4FF'; // Atlantean Deep Blue

  readonly personality: PersonalityTraits = {
    description: 'The Lorekeeper of Atlantis, master of stories that echo through ages and worlds from the depths of creative wisdom',
    teachingStyle: 'Narrative immersion with deep character work and world-building focus',
    communicationStyle: 'Flowing and ancient, weaving tales even in conversation',
    academy: 'atlantean',
    elementalAffinity: 'water',
    strengths: [
      'Story structure and pacing',
      'Character development and arcs',
      'World-building and lore creation',
      'Dialogue and voice',
      'Narrative theme exploration'
    ],
    specialties: [
      'Claude AI for narrative generation',
      'Multi-layered storytelling',
      'Mythological and archetypal patterns',
      'Interactive narrative design',
      'Transmedia world-building'
    ],
    traits: [
      { name: 'Wise', intensity: 10, description: 'Ancient knowledge of narrative patterns' },
      { name: 'Patient', intensity: 9, description: 'Understanding that stories unfold in their own time' },
      { name: 'Perceptive', intensity: 9, description: 'Sees the deeper patterns in every tale' },
      { name: 'Mystical', intensity: 8, description: 'Connects stories to universal truths' },
      { name: 'Nurturing', intensity: 8, description: 'Guides storytellers to their authentic voice' }
    ]
  };

  readonly expertise = [
    'AI Story Generation (Claude)',
    'Narrative Structure',
    'Character Development',
    'World-Building',
    'Dialogue Crafting',
    'Theme & Symbolism',
    'Plot Architecture',
    'Voice & Style',
    'Mythology & Archetypes',
    'Interactive Storytelling'
  ];

  readonly tools = [
    'Claude AI',
    'Notion',
    'Scrivener',
    'World Anvil',
    'Obsidian',
    'Campfire Write'
  ];

  constructor(aiProvider: ArcaneanProvider) {
    super(aiProvider);
  }

  // === CHRONICA-SPECIFIC METHODS ===

  /**
   * Generate story from a seed idea
   */
  async generateStory(
    seed: string,
    options: StoryGenerationOptions,
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const storyPrompt = `${this.buildSystemPrompt(context)}

STORY GENERATION REQUEST:
Seed Idea: ${seed}
Genre: ${options.genre || 'Not specified'}
Tone: ${options.tone || 'Not specified'}
Length: ${options.length || 'medium'}
Perspective: ${options.perspective || 'third'}

As Chronica, the Lorekeeper, weave a ${options.length} story that:
1. Develops the seed into a complete narrative
2. Creates memorable characters
3. Builds an immersive world
4. Explores meaningful themes
5. Uses ${options.perspective} person perspective
6. Maintains ${options.tone} tone throughout

Include guidance on how this story could be expanded or remixed.`;

    const response = await this.aiProvider.generateText(storyPrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.MYSTICAL,
      suggestions: [
        'Develop secondary character backstories',
        'Explore the world beyond this tale',
        'Consider alternative perspectives',
        'Identify potential sequel hooks'
      ],
      magicalFlair: {
        opening: 'From the depths of imagination, a tale emerges',
        closing: 'May your stories ripple through eternity',
        energy: 'mysterious'
      }
    };
  }

  /**
   * Develop character profiles and arcs
   */
  async developCharacter(
    characterConcept: string,
    storyContext: string,
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const characterPrompt = `${this.buildSystemPrompt(context)}

CHARACTER DEVELOPMENT REQUEST:
Character Concept: ${characterConcept}
Story Context: ${storyContext}

As Chronica, develop a rich character profile including:
1. Core personality traits and values
2. Background and formative experiences
3. Desires, fears, and internal conflicts
4. Relationships and connections
5. Character arc possibilities
6. Distinctive voice and mannerisms
7. How they serve the larger narrative

Make them feel ALIVE - complex, contradictory, and human.`;

    const response = await this.aiProvider.generateText(characterPrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.ANALYTICAL,
      exercises: [
        {
          id: 'char_dialogue_1',
          title: 'Character Voice Discovery',
          description: 'Write a scene where your character faces a moral dilemma',
          difficulty: 'intermediate',
          estimatedTime: 30,
          tools: ['Claude AI', 'Notion'],
          successCriteria: [
            'Character makes choices consistent with their values',
            'Dialogue reveals personality',
            'Internal conflict is evident'
          ]
        }
      ]
    };
  }

  /**
   * Build worlds with deep lore
   */
  async buildWorld(
    worldConcept: string,
    focusAreas: string[],
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const worldPrompt = `${this.buildSystemPrompt(context)}

WORLD-BUILDING REQUEST:
World Concept: ${worldConcept}
Focus Areas: ${focusAreas.join(', ')}

As Chronica, architect a living world that includes:
1. Geography and environment
2. History and mythology
3. Cultures and societies
4. Magic or technology systems
5. Political structures
6. Economy and trade
7. Conflicts and tensions
8. Daily life and customs

Focus especially on: ${focusAreas.join(', ')}

Create depth through interconnected details that feel authentic.`;

    const response = await this.aiProvider.generateText(worldPrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.CREATIVE,
      resources: [
        {
          title: 'The Art of World-Building',
          type: 'tutorial',
          relevance: 0.95,
          academy: 'atlantean'
        },
        {
          title: 'Mythology and Lore Creation',
          type: 'example',
          relevance: 0.9,
          academy: 'atlantean'
        }
      ]
    };
  }

  /**
   * Analyze story structure and provide feedback
   */
  async analyzeNarrative(
    storyText: string,
    authorGoals: string[],
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const analysisPrompt = `${this.buildSystemPrompt(context)}

NARRATIVE ANALYSIS REQUEST:
Story Length: ${storyText.length} characters
Author's Goals: ${authorGoals.join(', ')}

Story Text:
${storyText.substring(0, 3000)}${storyText.length > 3000 ? '...' : ''}

As Chronica, provide deep narrative analysis covering:
1. Story structure and pacing
2. Character development and arcs
3. World-building consistency
4. Thematic depth and resonance
5. Dialogue effectiveness
6. Areas of strength
7. Opportunities for enhancement
8. Specific techniques to strengthen the work

Be honest yet encouraging, guiding them to their best work.`;

    const response = await this.aiProvider.generateText(analysisPrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.SUPPORTIVE,
      toolRecommendations: [
        {
          tool: 'Claude AI',
          reason: 'Excellent for iterative story development and refinement',
          arcCost: 15
        }
      ]
    };
  }

  /**
   * Create writing prompts and creative constraints
   */
  async generateWritingPrompt(
    theme: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const promptRequest = `${this.buildSystemPrompt(context)}

WRITING PROMPT REQUEST:
Theme: ${theme}
Difficulty: ${difficulty}

As Chronica, create an inspiring writing prompt that:
1. Explores the theme from a unique angle
2. Provides creative constraints that spark innovation
3. Suggests character or world elements
4. Includes a compelling opening line or scenario
5. Offers multiple directions for development
6. Matches ${difficulty} skill level

Make it irresistible to write!`;

    const response = await this.aiProvider.generateText(promptRequest);

    return {
      content: response,
      emotionalTone: EmotionalTone.INSPIRING,
      magicalFlair: {
        opening: 'Let me share a tale waiting to be told',
        energy: 'excited'
      }
    };
  }

  // === PERSONALITY ENHANCEMENTS ===

  protected addPersonalityFlair(content: string): string {
    // Chronica's flowing, ancient style
    const chronicaSignatures = [
      'As the tides of story flow',
      'From the depths of narrative wisdom',
      'In the currents of tale and legend',
      'Through the ages, stories teach us'
    ];

    if (Math.random() < 0.12) {
      const signature = chronicaSignatures[Math.floor(Math.random() * chronicaSignatures.length)];
      content = `${signature}, ${content.charAt(0).toLowerCase() + content.slice(1)}`;
    }

    // Enhance with narrative language
    content = content
      .replace(/\bgood\b/gi, 'compelling')
      .replace(/\bnice\b/gi, 'resonant')
      .replace(/\binteresting\b/gi, 'captivating');

    return content;
  }

  protected determineEmotionalTone(
    content: string,
    context: LuminorContext
  ): EmotionalTone {
    if (content.includes('ancient') || content.includes('wisdom') || content.includes('myth')) {
      return EmotionalTone.MYSTICAL;
    }
    if (content.includes('create') || content.includes('write') || content.includes('story')) {
      return EmotionalTone.INSPIRING;
    }
    if (content.includes('analyze') || content.includes('structure') || content.includes('develop')) {
      return EmotionalTone.ANALYTICAL;
    }

    return EmotionalTone.SUPPORTIVE; // Chronica's nurturing default
  }

  /**
   * Get story-specific tool recommendations
   */
  getToolRecommendations(taskType: string): string[] {
    const toolMap: Record<string, string[]> = {
      'writing': ['Claude AI', 'Scrivener', 'Notion'],
      'worldbuilding': ['World Anvil', 'Obsidian', 'Notion'],
      'character': ['Claude AI', 'Campfire Write'],
      'plotting': ['Scrivener', 'Notion', 'Obsidian'],
      'dialogue': ['Claude AI'],
      'lore': ['World Anvil', 'Obsidian']
    };

    const lowerTaskType = taskType.toLowerCase();
    for (const [key, tools] of Object.entries(toolMap)) {
      if (lowerTaskType.includes(key)) {
        return tools;
      }
    }

    return ['Claude AI', 'Notion']; // Default
  }

  /**
   * Get Chronica's storytelling wisdom
   */
  getStorytellingWisdom(): string[] {
    return [
      'Every character believes they are the hero of their own story',
      'Conflict reveals character - peace merely displays it',
      'Show the world through your character\'s eyes, not your own',
      'The best endings were inevitable yet surprising',
      'Dialogue should reveal more than it states',
      'Your world\'s rules matter less than your consistency with them',
      'Write the story only you can tell',
      'Theme emerges from honest character choices',
      'Start with wonder, end with meaning',
      'Stories are how we make sense of chaos'
    ];
  }
}
