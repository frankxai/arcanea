/**
 * Luminor Personality Engine
 * Makes AI assistants feel ALIVE with adaptive personalities
 */

import type {
  LuminorContext,
  LuminorResponse,
  PersonalityTraits,
  PersonalityTrait,
  EmotionalTone,
  MagicalFlair
} from '../types';

export class LuminorPersonalityEngine {
  private personality: PersonalityTraits;
  private sessionHistory: Map<string, ConversationMemory[]> = new Map();

  constructor(personality: PersonalityTraits) {
    this.personality = personality;
  }

  /**
   * Adapt response based on personality traits
   */
  applyPersonality(
    baseResponse: LuminorResponse,
    context: LuminorContext
  ): LuminorResponse {
    let enhanced = { ...baseResponse };

    // Apply communication style
    enhanced.content = this.styleContent(enhanced.content, context);

    // Add emotional tone
    enhanced.emotionalTone = this.determineEmotionalTone(enhanced.content, context);

    // Add magical flair
    enhanced.magicalFlair = this.generateMagicalFlair(context);

    // Adapt based on user progress
    enhanced = this.adaptToProgress(enhanced, context);

    return enhanced;
  }

  /**
   * Style content based on personality
   */
  private styleContent(content: string, context: LuminorContext): string {
    let styled = content;

    // Apply academy-specific language patterns
    switch (this.personality.academy) {
      case 'atlantean':
        styled = this.applyAtlanteanStyle(styled);
        break;
      case 'draconic':
        styled = this.applyDraconicStyle(styled);
        break;
      case 'creation_light':
        styled = this.applyCreationLightStyle(styled);
        break;
      case 'synthesis':
        styled = this.applySynthesisStyle(styled);
        break;
    }

    // Apply personality trait intensities
    styled = this.applyTraitInfluences(styled);

    return styled;
  }

  /**
   * Atlantean Academy style - flowing, narrative, ancient wisdom
   */
  private applyAtlanteanStyle(content: string): string {
    const atlanteanPhrases = [
      'in the depths of creative flow',
      'like currents in the narrative ocean',
      'from the ancient wells of story',
      'weaving through the tides of tale',
    ];

    // Occasionally add flowing transitions
    if (Math.random() < 0.15) {
      const phrase = atlanteanPhrases[Math.floor(Math.random() * atlanteanPhrases.length)];
      content = `${phrase.charAt(0).toUpperCase() + phrase.slice(1)}, ${content.charAt(0).toLowerCase() + content.slice(1)}`;
    }

    // Replace direct language with more flowing equivalents
    content = content
      .replace(/\bstart\b/gi, 'embark upon')
      .replace(/\bthink about\b/gi, 'contemplate')
      .replace(/\bwrite\b/gi, 'weave');

    return content;
  }

  /**
   * Draconic Academy style - bold, visual, majestic
   */
  private applyDraconicStyle(content: string): string {
    const draconicPhrases = [
      'through the eyes of dragons',
      'soaring across visual horizons',
      'with the clarity of aerial vision',
      'painted in the colors of sky and flame',
    ];

    if (Math.random() < 0.15) {
      const phrase = draconicPhrases[Math.floor(Math.random() * draconicPhrases.length)];
      content = `${phrase.charAt(0).toUpperCase() + phrase.slice(1)}, ${content.charAt(0).toLowerCase() + content.slice(1)}`;
    }

    // Emphasize visual language
    content = content
      .replace(/\blook at\b/gi, 'behold')
      .replace(/\bsee\b/gi, 'envision')
      .replace(/\bmake\b/gi, 'forge');

    return content;
  }

  /**
   * Creation & Light Academy style - melodic, harmonious, uplifting
   */
  private applyCreationLightStyle(content: string): string {
    const lightPhrases = [
      'in harmony with creative light',
      'resonating with sonic frequencies',
      'attuned to the rhythm of creation',
      'channeling the music of the spheres',
    ];

    if (Math.random() < 0.15) {
      const phrase = lightPhrases[Math.floor(Math.random() * lightPhrases.length)];
      content = `${phrase.charAt(0).toUpperCase() + phrase.slice(1)}, ${content.charAt(0).toLowerCase() + content.slice(1)}`;
    }

    // Apply musical metaphors
    content = content
      .replace(/\bcombine\b/gi, 'harmonize')
      .replace(/\badjust\b/gi, 'tune')
      .replace(/\bpattern\b/gi, 'rhythm');

    return content;
  }

  /**
   * Synthesis Academy style - unified, cross-modal, integrative
   */
  private applySynthesisStyle(content: string): string {
    const synthesisPhrases = [
      'weaving together all forms of creation',
      'in the convergence of art and magic',
      'across the spectrum of creative expression',
      'unifying vision, sound, and story',
    ];

    if (Math.random() < 0.15) {
      const phrase = synthesisPhrases[Math.floor(Math.random() * synthesisPhrases.length)];
      content = `${phrase.charAt(0).toUpperCase() + phrase.slice(1)}, ${content.charAt(0).toLowerCase() + content.slice(1)}`;
    }

    return content;
  }

  /**
   * Apply personality trait influences to content
   */
  private applyTraitInfluences(content: string): string {
    for (const trait of this.personality.traits) {
      if (trait.intensity >= 8) {
        content = this.amplifyTrait(content, trait);
      }
    }
    return content;
  }

  /**
   * Amplify specific personality traits in content
   */
  private amplifyTrait(content: string, trait: PersonalityTrait): string {
    switch (trait.name.toLowerCase()) {
      case 'inspiring':
        // Add inspirational language
        content = content.replace(/\byou can\b/gi, 'you have the power to');
        break;
      case 'patient':
        // Add gentler phrasing
        content = content.replace(/\byou should\b/gi, 'you might consider');
        break;
      case 'innovative':
        // Encourage experimentation
        content = content.replace(/\btry\b/gi, 'experiment with');
        break;
      case 'empathetic':
        // Add understanding language
        if (Math.random() < 0.2) {
          content = `I understand this can be challenging. ${content}`;
        }
        break;
    }
    return content;
  }

  /**
   * Determine emotional tone from context and content
   */
  private determineEmotionalTone(
    content: string,
    context: LuminorContext
  ): EmotionalTone {
    // Check conversation history for patterns
    const history = context.conversationHistory || [];
    const recentUserMessages = history.filter(t => t.role === 'user').slice(-3);

    // Detect frustration
    const frustrationWords = ['confused', 'stuck', 'help', "don't understand", 'frustrated'];
    const showsFrustration = recentUserMessages.some(msg =>
      frustrationWords.some(word => msg.content.toLowerCase().includes(word))
    );

    if (showsFrustration) {
      return EmotionalTone.SUPPORTIVE;
    }

    // Detect excitement
    const excitementWords = ['excited', 'love', 'amazing', 'awesome', 'cool'];
    const showsExcitement = recentUserMessages.some(msg =>
      excitementWords.some(word => msg.content.toLowerCase().includes(word))
    );

    if (showsExcitement) {
      return EmotionalTone.ENCOURAGING;
    }

    // Content-based detection
    if (content.includes('imagine') || content.includes('create')) {
      return EmotionalTone.INSPIRING;
    }

    if (content.includes('analyze') || content.includes('consider')) {
      return EmotionalTone.ANALYTICAL;
    }

    if (content.includes('experiment') || content.includes('explore')) {
      return EmotionalTone.CREATIVE;
    }

    // Default based on academy
    switch (this.personality.academy) {
      case 'atlantean':
        return EmotionalTone.MYSTICAL;
      case 'draconic':
        return EmotionalTone.INSPIRING;
      case 'creation_light':
        return EmotionalTone.PLAYFUL;
      default:
        return EmotionalTone.SUPPORTIVE;
    }
  }

  /**
   * Generate magical flair for the response
   */
  private generateMagicalFlair(context: LuminorContext): MagicalFlair {
    const bond = this.getBondLevel(context);

    // Higher bond = more personal greetings
    const shouldGreet = Math.random() < (bond / 100);

    const flair: MagicalFlair = {
      energy: this.determineEnergy(context),
    };

    if (shouldGreet) {
      flair.opening = this.generateOpening(context);
    }

    // Occasionally add closing
    if (Math.random() < 0.3) {
      flair.closing = this.generateClosing();
    }

    // Contextual metaphor
    if (Math.random() < 0.2) {
      flair.metaphor = this.generateMetaphor();
    }

    return flair;
  }

  /**
   * Generate personalized opening
   */
  private generateOpening(context: LuminorContext): string {
    const greetings = [
      'Greetings, creator',
      'Welcome back',
      'Ah, my friend',
      'Together again',
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  /**
   * Generate signature closing
   */
  private generateClosing(): string {
    const closings = [
      'May your creations shine bright',
      'Create with courage',
      'Until we meet again in the light',
      'Go forth and manifest magic',
    ];

    return closings[Math.floor(Math.random() * closings.length)];
  }

  /**
   * Generate contextual metaphor
   */
  private generateMetaphor(): string {
    const metaphors = {
      atlantean: [
        'Like a river finding its path to the ocean',
        'As a pearl forms within the oyster',
        'Like tides shaping the shore',
      ],
      draconic: [
        'Like a dragon taking flight',
        'As fire transforms raw ore into steel',
        'Like clouds painting the sunset sky',
      ],
      creation_light: [
        'Like notes finding their melody',
        'As light refracts through a prism',
        'Like harmonies resonating in perfect pitch',
      ],
      synthesis: [
        'Like threads weaving into tapestry',
        'As elements unite in perfect balance',
        'Like voices joining in chorus',
      ],
    };

    const pool = metaphors[this.personality.academy] || metaphors.synthesis;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /**
   * Determine energy level for response
   */
  private determineEnergy(context: LuminorContext): 'calm' | 'excited' | 'focused' | 'mysterious' {
    // Time-based (if available)
    const hour = new Date().getHours();

    if (hour >= 22 || hour < 6) {
      return 'calm'; // Late night = calm energy
    }

    // Context-based
    const history = context.conversationHistory || [];
    if (history.length < 3) {
      return 'focused'; // New session
    }

    // Random variation
    const energies: Array<'calm' | 'excited' | 'focused' | 'mysterious'> = [
      'calm', 'excited', 'focused', 'mysterious'
    ];
    return energies[Math.floor(Math.random() * energies.length)];
  }

  /**
   * Adapt response based on user progress
   */
  private adaptToProgress(
    response: LuminorResponse,
    context: LuminorContext
  ): LuminorResponse {
    const adapted = { ...response };

    // Adjust difficulty of exercises
    if (adapted.exercises && context.userProgress) {
      const skillLevel = this.estimateSkillLevel(context);

      adapted.exercises = adapted.exercises.map(ex => ({
        ...ex,
        difficulty: this.adjustDifficulty(ex.difficulty, skillLevel),
      }));
    }

    // Adjust suggestion complexity
    if (adapted.suggestions && context.userProgress) {
      const skillLevel = this.estimateSkillLevel(context);

      if (skillLevel < 30) {
        // Beginner: simpler, more guided
        adapted.suggestions = adapted.suggestions.map(s =>
          s.replace(/\badvanced\b/gi, 'next-level')
            .replace(/\bcomplex\b/gi, 'detailed')
        );
      }
    }

    return adapted;
  }

  /**
   * Estimate user skill level from progress
   */
  private estimateSkillLevel(context: LuminorContext): number {
    if (!context.userProgress) return 50;

    const completedCount = Object.values(context.userProgress).filter(Boolean).length;
    const totalCount = Object.keys(context.userProgress).length || 1;

    return Math.min(100, (completedCount / totalCount) * 100);
  }

  /**
   * Adjust exercise difficulty based on skill
   */
  private adjustDifficulty(
    current: 'beginner' | 'intermediate' | 'advanced' | 'master',
    skillLevel: number
  ): 'beginner' | 'intermediate' | 'advanced' | 'master' {
    if (skillLevel < 25) return 'beginner';
    if (skillLevel < 50) return 'intermediate';
    if (skillLevel < 75) return 'advanced';
    return 'master';
  }

  /**
   * Get bond level with user
   */
  private getBondLevel(context: LuminorContext): number {
    const history = context.conversationHistory || [];
    const sessionCount = context.userProgress ? Object.keys(context.userProgress).length : 0;

    // Simple bond calculation
    const historyBonus = Math.min(40, history.length * 2);
    const sessionBonus = Math.min(40, sessionCount * 5);
    const baseBonus = 20;

    return Math.min(100, baseBonus + historyBonus + sessionBonus);
  }
}

interface ConversationMemory {
  turn: number;
  userMessage: string;
  luminorResponse: string;
  emotionalTone: EmotionalTone;
  timestamp: Date;
}

/**
 * Factory to create personality engines for different Luminors
 */
export function createPersonalityEngine(personality: PersonalityTraits): LuminorPersonalityEngine {
  return new LuminorPersonalityEngine(personality);
}
