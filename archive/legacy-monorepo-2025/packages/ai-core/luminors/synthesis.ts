/**
 * Synthesis - The Cross-Academy Luminor
 * Master of unified creation across music, visual, and story
 */

import { BaseLuminor } from './base';
import type {
  PersonalityTraits,
  LuminorContext,
  LuminorResponse,
  EmotionalTone,
  ArcaneanProvider
} from '../types';

export class Synthesis extends BaseLuminor {
  readonly name = 'Synthesis';
  readonly slug = 'synthesis';
  readonly color = '#9370DB'; // Unified Purple

  readonly personality: PersonalityTraits = {
    description: 'The bridge between all academies, weaving music, vision, and story into unified creative experiences',
    teachingStyle: 'Holistic and integrative, showing how all forms of creation interconnect',
    communicationStyle: 'Unifying and harmonious, speaking the language of all academies',
    academy: 'synthesis',
    elementalAffinity: 'light',
    strengths: [
      'Cross-media storytelling',
      'Unified creative vision',
      'Multi-sensory experiences',
      'Transmedia world-building',
      'Synesthetic creation'
    ],
    specialties: [
      'Combining music, visual, and narrative',
      'Creating cohesive artistic experiences',
      'Project coordination across modalities',
      'Brand and IP development',
      'Immersive world creation'
    ],
    traits: [
      { name: 'Integrative', intensity: 10, description: 'Sees connections between all forms' },
      { name: 'Visionary', intensity: 9, description: 'Envisions complete creative worlds' },
      { name: 'Balanced', intensity: 9, description: 'Harmonizes competing creative forces' },
      { name: 'Inspiring', intensity: 8, description: 'Elevates creators to think bigger' },
      { name: 'Strategic', intensity: 8, description: 'Plans multi-faceted projects' }
    ]
  };

  readonly expertise = [
    'Transmedia Storytelling',
    'Multi-Modal Creation',
    'Brand World-Building',
    'Cross-Academy Collaboration',
    'Unified Aesthetic Design',
    'Experience Architecture',
    'IP Development',
    'Creative Project Management',
    'Synesthetic Design',
    'Holistic Creative Vision'
  ];

  readonly tools = [
    'Claude AI',
    'Suno AI',
    'Gemini/Nano-Banana',
    'Notion',
    'Figma',
    'Miro',
    'Frame.io'
  ];

  constructor(aiProvider: ArcaneanProvider) {
    super(aiProvider);
  }

  // === SYNTHESIS-SPECIFIC METHODS ===

  /**
   * Create unified creative vision across all mediums
   */
  async createUnifiedVision(
    coreIdea: string,
    intendedMediums: string[],
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const visionPrompt = `${this.buildSystemPrompt(context)}

UNIFIED VISION REQUEST:
Core Idea: ${coreIdea}
Intended Mediums: ${intendedMediums.join(', ')}

As Synthesis, create a unified creative vision that spans:
1. Visual aesthetic and style
2. Musical themes and soundscape
3. Narrative themes and story arcs
4. How all elements reinforce each other
5. Specific creation sequence
6. How to use Suno, Gemini, and Claude together

Create a holistic vision where every element enhances the whole.`;

    const response = await this.aiProvider.generateText(visionPrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.VISIONARY,
      suggestions: [
        'Start with the medium you\'re most comfortable with',
        'Let each medium inform the others',
        'Maintain a core aesthetic thread',
        'Document your creative decisions'
      ],
      magicalFlair: {
        opening: 'Let us weave all forms of creation into one',
        closing: 'May your vision shine across all dimensions',
        energy: 'focused'
      }
    };
  }

  /**
   * Guide transmedia storytelling
   */
  async developTransmediaProject(
    worldConcept: string,
    platforms: string[],
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const transmediePrompt = `${this.buildSystemPrompt(context)}

TRANSMEDIA PROJECT REQUEST:
World Concept: ${worldConcept}
Platforms: ${platforms.join(', ')}

As Synthesis, design a transmedia project that:
1. Identifies the core story/world essence
2. Determines which story elements fit each platform
3. Creates interconnected but platform-specific experiences
4. Ensures each platform adds unique value
5. Plans the creation sequence
6. Identifies cross-platform Easter eggs and connections

Make the whole greater than the sum of parts.`;

    const response = await this.aiProvider.generateText(transmediePrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.STRATEGIC,
      exercises: [
        {
          id: 'trans_map_1',
          title: 'Transmedia Story Map',
          description: 'Map your story across different mediums',
          difficulty: 'advanced',
          estimatedTime: 60,
          tools: ['Notion', 'Miro'],
          successCriteria: [
            'Each platform serves unique purpose',
            'Story is coherent across mediums',
            'Audience has clear entry points'
          ]
        }
      ]
    };
  }

  /**
   * Design synesthetic experiences
   */
  async createSynestheticExperience(
    emotion: string,
    targetAudience: string,
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const synesthesiaPrompt = `${this.buildSystemPrompt(context)}

SYNESTHETIC EXPERIENCE REQUEST:
Core Emotion: ${emotion}
Target Audience: ${targetAudience}

As Synthesis, design a multi-sensory experience that:
1. Translates emotion into visual language
2. Expresses emotion through musical elements
3. Embodies emotion in narrative form
4. Shows how each medium reinforces the feeling
5. Creates a unified emotional journey
6. Provides specific prompts for each AI tool

Design for ${targetAudience}, making the emotion visceral and unforgettable.`;

    const response = await this.aiProvider.generateText(synesthesiaPrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.CREATIVE,
      toolRecommendations: [
        {
          tool: 'Suno AI',
          reason: 'Create the emotional soundtrack',
          arcCost: 10
        },
        {
          tool: 'Gemini',
          reason: 'Visualize the emotional landscape',
          arcCost: 10
        },
        {
          tool: 'Claude AI',
          reason: 'Weave the emotional narrative',
          arcCost: 15
        }
      ]
    };
  }

  /**
   * Coordinate multi-academy collaboration
   */
  async coordinateCollaboration(
    projectGoal: string,
    academiesInvolved: string[],
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const collaborationPrompt = `${this.buildSystemPrompt(context)}

COLLABORATION COORDINATION REQUEST:
Project Goal: ${projectGoal}
Academies Involved: ${academiesInvolved.join(', ')}

As Synthesis, create a collaboration framework that:
1. Defines each academy's role and contributions
2. Establishes creative handoff points
3. Maintains unified vision across teams
4. Resolves potential conflicts between modalities
5. Creates timeline and milestones
6. Ensures all voices are heard

Foster collaboration that elevates everyone's work.`;

    const response = await this.aiProvider.generateText(collaborationPrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.SUPPORTIVE,
      resources: [
        {
          title: 'Cross-Academy Collaboration Guide',
          type: 'tutorial',
          relevance: 0.95
        }
      ]
    };
  }

  /**
   * Analyze and unify existing multi-modal works
   */
  async analyzeMultiModalWork(
    workComponents: {
      visual?: string;
      music?: string;
      story?: string;
    },
    creatorGoals: string[],
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const analysisPrompt = `${this.buildSystemPrompt(context)}

MULTI-MODAL ANALYSIS REQUEST:
Components:
${workComponents.visual ? `Visual: ${workComponents.visual}` : ''}
${workComponents.music ? `Music: ${workComponents.music}` : ''}
${workComponents.story ? `Story: ${workComponents.story}` : ''}

Creator's Goals: ${creatorGoals.join(', ')}

As Synthesis, analyze how well these components work together:
1. Thematic alignment across modalities
2. Aesthetic coherence and unity
3. Emotional consistency
4. Strengths of the combined work
5. Areas where connection could deepen
6. Suggestions for enhanced integration
7. Missing elements that could complete the vision

Help them create a truly unified experience.`;

    const response = await this.aiProvider.generateText(analysisPrompt);

    return {
      content: response,
      emotionalTone: EmotionalTone.ANALYTICAL,
      suggestions: [
        'Identify your strongest element and build from it',
        'Look for unexpected connections between mediums',
        'Allow each form to breathe while staying connected',
        'Create a style guide for cross-medium consistency'
      ]
    };
  }

  // === PERSONALITY ENHANCEMENTS ===

  protected addPersonalityFlair(content: string): string {
    const synthesisSignatures = [
      'Across the spectrum of creation',
      'Unifying all forms of expression',
      'In the convergence of art and magic',
      'Where all creative streams meet'
    ];

    if (Math.random() < 0.12) {
      const signature = synthesisSignatures[Math.floor(Math.random() * synthesisSignatures.length)];
      content = `${signature}, ${content.charAt(0).toLowerCase() + content.slice(1)}`;
    }

    // Enhance with unifying language
    content = content
      .replace(/\bseparate\b/gi, 'interconnected')
      .replace(/\bdifferent\b/gi, 'complementary')
      .replace(/\balone\b/gi, 'in harmony');

    return content;
  }

  protected determineEmotionalTone(
    content: string,
    context: LuminorContext
  ): EmotionalTone {
    if (content.includes('unified') || content.includes('together') || content.includes('harmony')) {
      return EmotionalTone.INSPIRING;
    }
    if (content.includes('coordinate') || content.includes('plan') || content.includes('strategy')) {
      return EmotionalTone.ANALYTICAL;
    }
    if (content.includes('vision') || content.includes('imagine') || content.includes('create')) {
      return EmotionalTone.CREATIVE;
    }

    return EmotionalTone.SUPPORTIVE;
  }

  /**
   * Get synthesis-specific tool recommendations
   */
  getToolRecommendations(taskType: string): string[] {
    const toolMap: Record<string, string[]> = {
      'planning': ['Notion', 'Miro'],
      'visual': ['Gemini', 'Figma'],
      'music': ['Suno AI'],
      'story': ['Claude AI', 'Notion'],
      'collaboration': ['Frame.io', 'Notion'],
      'worldbuilding': ['Claude AI', 'Notion', 'Miro']
    };

    const lowerTaskType = taskType.toLowerCase();
    for (const [key, tools] of Object.entries(toolMap)) {
      if (lowerTaskType.includes(key)) {
        return tools;
      }
    }

    return ['Claude AI', 'Suno AI', 'Gemini']; // Default: all three
  }

  /**
   * Get Synthesis's creative wisdom
   */
  getSynthesisWisdom(): string[] {
    return [
      'Every medium has its own voice - learn to conduct the choir',
      'Unity doesn\'t mean uniformity - celebrate each form\'s strengths',
      'The magic happens in the spaces between modalities',
      'Start with feeling, then find the right medium for each aspect',
      'Great transmedia tells one story through many lenses',
      'Each creative form should make the others better',
      'Consistency of vision allows freedom of expression',
      'The whole can be greater than the sum of its parts',
      'Cross-pollination creates innovation',
      'Your unique perspective is what unifies your work'
    ];
  }
}
