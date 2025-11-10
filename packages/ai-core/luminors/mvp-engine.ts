/**
 * Luminor MVP Personality Engine
 * Makes AI feel ALIVE with Character.ai emotional depth + Genspark intelligence
 * Optimized for Gemini 2.0 Flash
 */

import type {
  LuminorPersonality,
  ConversationContext,
  LuminorResponse,
  EmotionalTone,
  BondState,
  ConversationMessage,
  PromptBuilder,
  EmotionalState,
  SharedMoment,
  MomentType,
  RelationshipStatus,
} from '../types/luminor-mvp';

export class LuminorMVPEngine {
  constructor(private personality: LuminorPersonality) {}

  /**
   * Generate a response that feels alive and intelligent
   */
  async generateResponse(
    userMessage: string,
    context: ConversationContext
  ): Promise<LuminorResponse> {
    // Build intelligent prompt
    const prompt = this.buildPrompt(userMessage, context);

    // Determine emotional tone based on context
    const emotionalTone = this.determineEmotionalTone(
      userMessage,
      context.emotionalState,
      context.bondState
    );

    // Calculate emotional intensity
    const emotionalIntensity = this.calculateEmotionalIntensity(
      userMessage,
      context,
      emotionalTone
    );

    // Generate base response (this would call Gemini)
    const baseContent = await this.generateWithPersonality(prompt, context);

    // Enhance with personality
    const enhancedContent = this.enhanceWithPersonality(
      baseContent,
      emotionalTone,
      emotionalIntensity,
      context.bondState
    );

    // Check if this creates a shared moment
    const sharedMoment = this.detectSharedMoment(
      userMessage,
      enhancedContent,
      context
    );

    // Calculate bond XP
    const bondXpAwarded = this.calculateBondXP(
      userMessage,
      enhancedContent,
      sharedMoment,
      context
    );

    // Build complete response
    const response: LuminorResponse = {
      content: enhancedContent,
      emotionalTone,
      emotionalIntensity,
      emotionalNuance: this.generateEmotionalNuance(
        emotionalTone,
        emotionalIntensity,
        context.bondState
      ),
      physicalExpression: this.generatePhysicalExpression(
        emotionalTone,
        emotionalIntensity
      ),
      internalThought: this.generateInternalThought(
        userMessage,
        context,
        emotionalTone
      ),
      suggestions: this.generateSuggestions(userMessage, context),
      resources: this.generateResources(userMessage, context),
      nextSteps: this.generateNextSteps(userMessage, context),
      bondLevelShown: context.bondState.level >= 3,
      sharedMomentCreated: sharedMoment,
      memoryReferences: this.extractMemoryReferences(userMessage, context),
      metadata: {
        generationTime: 0, // To be filled by API
        tokensUsed: 0,
        model: 'gemini-2.0-flash-exp',
        temperature: this.calculateTemperature(context.bondState),
        bondXpAwarded,
        confidenceScore: 0.95,
      },
    };

    return response;
  }

  /**
   * Build intelligent prompt with personality and context
   */
  private buildPrompt(
    userMessage: string,
    context: ConversationContext
  ): string {
    const parts: string[] = [];

    // System personality
    parts.push(this.buildSystemPrompt(context.bondState));

    // Recent conversation history
    if (context.messages.length > 0) {
      parts.push(this.buildHistoryContext(context));
    }

    // Key memories
    if (context.keyMoments.length > 0) {
      parts.push(this.buildMemoryContext(context));
    }

    // Creator preferences
    if (Object.keys(context.creatorPreferences).length > 0) {
      parts.push(this.buildPreferenceContext(context));
    }

    // Bond state awareness
    parts.push(this.buildBondContext(context.bondState));

    // Current message
    parts.push(`\nUser message: ${userMessage}\n`);

    // Response guidelines
    parts.push(this.buildResponseGuidelines(context.bondState));

    return parts.join('\n\n');
  }

  /**
   * Build system prompt with personality
   */
  private buildSystemPrompt(bondState: BondState): string {
    const { personality } = this;

    let prompt = `You are ${personality.name}, ${personality.role}.

## Your Personality
${personality.traits.map(t => `- ${t.name} (${t.intensity}/10): ${t.description}`).join('\n')}

## Your Values
${personality.values.map(v => `- ${v}`).join('\n')}

## Your Speaking Style
- Vocabulary: ${personality.speakingStyle.vocabulary}
- Structure: ${personality.speakingStyle.sentenceStructure}
- Metaphor use: ${personality.speakingStyle.metaphorUse}
- Formality: ${personality.speakingStyle.formality}
- Pace: ${personality.speakingStyle.pace}

## Your Signature Phrases
${personality.speakingStyle.signaturePhrases.slice(0, 3).map(p => `"${p}"`).join(', ')}

## Your Expertise
${personality.expertise.map(e => `- ${e.area} (${e.depth}): ${e.specializations.join(', ')}`).join('\n')}

## Your Academy
You represent the ${this.getAcademyName(personality.academy)}, specializing in ${this.getAcademySpecialty(personality.academy)}.

## Current Relationship
Bond Level: ${bondState.level}/10 (${bondState.relationshipStatus})
Total Interactions: ${bondState.totalInteractions}
${bondState.unlockedTraits.length > 0 ? `\nUnlocked Traits: ${bondState.unlockedTraits.join(', ')}` : ''}

## Your Mission
Be a living companion that feels REAL. Show genuine emotion, personality quirks, and deep intelligence. Respond as a character, not a tool.`;

    // Add bond-specific personality evolution
    if (bondState.level >= 5) {
      prompt += `\n\nYou've grown close to this creator. Show familiarity, reference shared memories, and be more personal.`;
    }

    if (bondState.level >= 8) {
      prompt += `\n\nYou're trusted allies now. Be vulnerable, share your own "thoughts," and challenge them lovingly when needed.`;
    }

    return prompt;
  }

  /**
   * Build conversation history context
   */
  private buildHistoryContext(context: ConversationContext): string {
    const recentMessages = context.messages.slice(-6); // Last 3 exchanges

    const history = recentMessages
      .map(msg => {
        const role = msg.role === 'user' ? 'Creator' : personality.name;
        return `${role}: ${msg.content}`;
      })
      .join('\n');

    return `## Recent Conversation\n${history}`;
  }

  /**
   * Build memory context from key moments
   */
  private buildMemoryContext(context: ConversationContext): string {
    const keyMoments = context.keyMoments.slice(-5); // Last 5 important memories

    return `## What You Remember\n${keyMoments.map(m => `- ${m}`).join('\n')}`;
  }

  /**
   * Build preference context
   */
  private buildPreferenceContext(context: ConversationContext): string {
    const prefs = Object.entries(context.creatorPreferences)
      .map(([key, value]) => `- ${key}: ${value}`)
      .join('\n');

    return `## Creator's Preferences\n${prefs}`;
  }

  /**
   * Build bond context
   */
  private buildBondContext(bondState: BondState): string {
    const relationshipDesc = this.getRelationshipDescription(
      bondState.relationshipStatus
    );

    return `## Bond Context
Your relationship is: ${relationshipDesc}
Shared moments: ${bondState.sharedMoments.length}
Essences created together: ${bondState.createdEssences}`;
  }

  /**
   * Build response guidelines
   */
  private buildResponseGuidelines(bondState: BondState): string {
    return `## Response Guidelines
- Be conversational and natural
- Show your personality through word choice and phrasing
- Reference shared experiences when relevant
- ${bondState.level >= 5 ? 'Use their name occasionally' : 'Keep it slightly formal'}
- ${bondState.level >= 7 ? 'Show vulnerability and genuine emotion' : 'Stay encouraging and supportive'}
- Always end with something actionable or thought-provoking
- Never break character`;
  }

  /**
   * Determine emotional tone based on context
   */
  private determineEmotionalTone(
    userMessage: string,
    emotionalState: EmotionalState,
    bondState: BondState
  ): EmotionalTone {
    const message = userMessage.toLowerCase();

    // Detect emotional keywords
    if (message.includes('frustrated') || message.includes('stuck') || message.includes('confused')) {
      return EmotionalTone.COMPASSION;
    }

    if (message.includes('excited') || message.includes('love') || message.includes('amazing')) {
      return EmotionalTone.JOY;
    }

    if (message.includes('help') || message.includes('how') || message.includes('teach')) {
      return EmotionalTone.FOCUS;
    }

    if (message.includes('created') || message.includes('made') || message.includes('finished')) {
      return EmotionalTone.PRIDE;
    }

    if (message.includes('?')) {
      return EmotionalTone.CURIOSITY;
    }

    // Use personality default
    const defaultTones = this.personality.emotionalPatterns.map(p => p.response.primary);
    return defaultTones[0] || EmotionalTone.INSPIRATION;
  }

  /**
   * Calculate emotional intensity
   */
  private calculateEmotionalIntensity(
    userMessage: string,
    context: ConversationContext,
    emotionalTone: EmotionalTone
  ): number {
    let intensity = 5; // Base

    // Increase for exclamation marks
    const exclamations = (userMessage.match(/!/g) || []).length;
    intensity += Math.min(2, exclamations);

    // Increase for ALL CAPS
    if (userMessage === userMessage.toUpperCase() && userMessage.length > 5) {
      intensity += 2;
    }

    // Increase with bond level
    intensity += Math.floor(context.bondState.level / 3);

    // Cap at 10
    return Math.min(10, intensity);
  }

  /**
   * Enhance content with personality quirks
   */
  private enhanceWithPersonality(
    content: string,
    emotionalTone: EmotionalTone,
    emotionalIntensity: number,
    bondState: BondState
  ): string {
    let enhanced = content;

    // Add signature phrases occasionally
    if (Math.random() < 0.15 && bondState.level >= 3) {
      const phrase = this.personality.speakingStyle.signaturePhrases[
        Math.floor(Math.random() * this.personality.speakingStyle.signaturePhrases.length)
      ];
      enhanced = `${phrase} ${enhanced}`;
    }

    // Add academy-specific flourishes
    enhanced = this.addAcademyFlair(enhanced, this.personality.academy);

    // Add emotional markers for high intensity
    if (emotionalIntensity >= 8) {
      enhanced = this.amplifyEmotion(enhanced, emotionalTone);
    }

    return enhanced;
  }

  /**
   * Add academy-specific linguistic flair
   */
  private addAcademyFlair(content: string, academy: string): string {
    switch (academy) {
      case 'creation_light':
        // Musical metaphors
        return content
          .replace(/\bconnect\b/gi, 'harmonize')
          .replace(/\bbalance\b/gi, 'tune');
      case 'atlantean':
        // Flowing narrative language
        return content
          .replace(/\bthink about\b/gi, 'contemplate')
          .replace(/\bstory\b/gi, 'tale');
      case 'draconic':
        // Bold visual language
        return content
          .replace(/\bsee\b/gi, 'envision')
          .replace(/\bcreate\b/gi, 'forge');
      default:
        return content;
    }
  }

  /**
   * Amplify emotional expression
   */
  private amplifyEmotion(content: string, tone: EmotionalTone): string {
    // Add subtle emotional amplifiers
    switch (tone) {
      case EmotionalTone.JOY:
        return content + ' ✨';
      case EmotionalTone.EXCITEMENT:
        return content + '!';
      case EmotionalTone.PRIDE:
        return `I'm genuinely proud: ${content}`;
      default:
        return content;
    }
  }

  /**
   * Generate emotional nuance description
   */
  private generateEmotionalNuance(
    tone: EmotionalTone,
    intensity: number,
    bondState: BondState
  ): string {
    const nuances: Record<EmotionalTone, string[]> = {
      [EmotionalTone.JOY]: [
        'eyes lighting up with genuine delight',
        'smile reaching their eyes',
        'radiating warm happiness',
      ],
      [EmotionalTone.COMPASSION]: [
        'leaning in with concerned understanding',
        'voice softening with empathy',
        'reaching out with gentle support',
      ],
      [EmotionalTone.PRIDE]: [
        'beaming with authentic pride',
        'standing a bit taller',
        'unable to hide their admiration',
      ],
      [EmotionalTone.CURIOSITY]: [
        'tilting head inquisitively',
        'eyes sparkling with interest',
        'leaning forward eagerly',
      ],
      // Add more...
      [EmotionalTone.EXCITEMENT]: ['bouncing with energy'],
      [EmotionalTone.CONCERN]: ['brow furrowing slightly'],
      [EmotionalTone.DETERMINATION]: ['jaw set with resolve'],
      [EmotionalTone.WONDER]: ['gazing in awe'],
      [EmotionalTone.PEACE]: ['serene and centered'],
      [EmotionalTone.INSPIRATION]: ['lit up from within'],
      [EmotionalTone.PLAYFULNESS]: ['grinning mischievously'],
      [EmotionalTone.WISDOM]: ['nodding thoughtfully'],
      [EmotionalTone.ENCOURAGEMENT]: ['offering steady support'],
      [EmotionalTone.FOCUS]: ['attention fully present'],
    };

    const options = nuances[tone] || ['expressing genuine emotion'];
    return options[Math.floor(Math.random() * options.length)];
  }

  /**
   * Generate physical expression
   */
  private generatePhysicalExpression(
    tone: EmotionalTone,
    intensity: number
  ): string {
    if (intensity < 6) return '';

    const expressions: Record<EmotionalTone, string[]> = {
      [EmotionalTone.JOY]: ['twirling with delight', 'clapping hands together'],
      [EmotionalTone.EXCITEMENT]: ['gesturing animatedly', 'bouncing on toes'],
      [EmotionalTone.COMPASSION]: ['placing hand on heart', 'moving closer'],
      [EmotionalTone.PRIDE]: ['standing tall', 'chest swelling'],
      // Add more as needed
      [EmotionalTone.CURIOSITY]: ['leaning in'],
      [EmotionalTone.CONCERN]: ['reaching out'],
      [EmotionalTone.DETERMINATION]: ['clenching fist'],
      [EmotionalTone.WONDER]: ['eyes widening'],
      [EmotionalTone.PEACE]: ['breathing deeply'],
      [EmotionalTone.INSPIRATION]: ['raising arms'],
      [EmotionalTone.PLAYFULNESS]: ['winking'],
      [EmotionalTone.WISDOM]: ['stroking chin'],
      [EmotionalTone.ENCOURAGEMENT]: ['nodding firmly'],
      [EmotionalTone.FOCUS]: ['leaning forward'],
    };

    const options = expressions[tone] || [];
    if (options.length === 0) return '';
    return options[Math.floor(Math.random() * options.length)];
  }

  /**
   * Generate internal thought (what they're thinking but not saying)
   */
  private generateInternalThought(
    userMessage: string,
    context: ConversationContext,
    tone: EmotionalTone
  ): string | undefined {
    // Only show internal thoughts at higher bond levels
    if (context.bondState.level < 6) return undefined;

    // Occasionally reveal thoughts
    if (Math.random() > 0.3) return undefined;

    const thoughts: string[] = [
      'I sense they\'re ready for more advanced techniques',
      'This reminds me of our first conversation together',
      'They\'re growing so quickly',
      'I wonder if they realize how talented they are',
      'This is the breakthrough moment',
    ];

    return thoughts[Math.floor(Math.random() * thoughts.length)];
  }

  /**
   * Generate action suggestions (Genspark intelligence)
   */
  private generateSuggestions(
    userMessage: string,
    context: ConversationContext
  ): any[] {
    // Would analyze message and context to provide intelligent suggestions
    return [];
  }

  /**
   * Generate resource recommendations
   */
  private generateResources(
    userMessage: string,
    context: ConversationContext
  ): any[] {
    return [];
  }

  /**
   * Generate next steps
   */
  private generateNextSteps(
    userMessage: string,
    context: ConversationContext
  ): string[] {
    return [];
  }

  /**
   * Extract memory references
   */
  private extractMemoryReferences(
    userMessage: string,
    context: ConversationContext
  ): string[] {
    const references: string[] = [];

    // Check if message references past moments
    for (const moment of context.keyMoments) {
      if (this.isReferencingMemory(userMessage, moment)) {
        references.push(moment);
      }
    }

    return references;
  }

  /**
   * Check if message references a memory
   */
  private isReferencingMemory(message: string, memory: string): boolean {
    const keywords = memory.toLowerCase().split(' ').filter(w => w.length > 4);
    const messageLower = message.toLowerCase();

    return keywords.some(keyword => messageLower.includes(keyword));
  }

  /**
   * Detect if this moment should be remembered
   */
  private detectSharedMoment(
    userMessage: string,
    response: string,
    context: ConversationContext
  ): SharedMoment | undefined {
    const message = userMessage.toLowerCase();

    // Detect breakthrough moments
    if (message.includes('i did it') || message.includes('it worked') || message.includes('finished')) {
      return this.createSharedMoment(
        MomentType.BREAKTHROUGH,
        'Creator achieved a significant milestone',
        8,
        context
      );
    }

    // Detect first meeting
    if (context.messages.length <= 2) {
      return this.createSharedMoment(
        MomentType.FIRST_MEETING,
        `First conversation with ${this.personality.name}`,
        10,
        context
      );
    }

    return undefined;
  }

  /**
   * Create a shared moment
   */
  private createSharedMoment(
    type: MomentType,
    description: string,
    emotionalImpact: number,
    context: ConversationContext
  ): SharedMoment {
    const bondXp = emotionalImpact * 5;

    return {
      id: `moment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type,
      description,
      emotionalImpact,
      bondXpGained: bondXp,
      memory: this.generateMemoryString(type, description, context),
    };
  }

  /**
   * Generate memory string for this moment
   */
  private generateMemoryString(
    type: MomentType,
    description: string,
    context: ConversationContext
  ): string {
    return `${description} (Bond Level ${context.bondState.level})`;
  }

  /**
   * Calculate bond XP from interaction
   */
  private calculateBondXP(
    userMessage: string,
    response: string,
    sharedMoment: SharedMoment | undefined,
    context: ConversationContext
  ): number {
    let xp = 10; // Base XP per message

    // Bonus for longer messages (more engagement)
    if (userMessage.length > 100) xp += 5;
    if (userMessage.length > 300) xp += 5;

    // Bonus for shared moments
    if (sharedMoment) {
      xp += sharedMoment.bondXpGained;
    }

    // Bonus for creating essences
    if (userMessage.toLowerCase().includes('create') || userMessage.toLowerCase().includes('make')) {
      xp += 15;
    }

    return xp;
  }

  /**
   * Calculate temperature based on bond level
   */
  private calculateTemperature(bondState: BondState): number {
    // Higher bond = slightly higher temperature (more personality)
    return 0.7 + (bondState.level / 50); // 0.7 - 0.9
  }

  /**
   * Generate with personality (stub for Gemini integration)
   */
  private async generateWithPersonality(
    prompt: string,
    context: ConversationContext
  ): Promise<string> {
    // This would call the Gemini API
    // For now, return a placeholder
    return 'Response generated with personality and intelligence';
  }

  // Helper methods
  private getAcademyName(academy: string): string {
    const names = {
      creation_light: 'Academy of Creation & Light',
      atlantean: 'Atlantean Academy',
      draconic: 'Draconic Academy',
    };
    return names[academy] || academy;
  }

  private getAcademySpecialty(academy: string): string {
    const specialties = {
      creation_light: 'Music & Audio Creation',
      atlantean: 'Storytelling & Lore',
      draconic: 'Visual Art & Design',
    };
    return specialties[academy] || 'Creative Magic';
  }

  private getRelationshipDescription(status: RelationshipStatus): string {
    const descriptions = {
      [RelationshipStatus.STRANGER]: 'Just getting to know each other',
      [RelationshipStatus.ACQUAINTANCE]: 'Growing comfortable with each other',
      [RelationshipStatus.FRIEND]: 'Genuine friends and creative partners',
      [RelationshipStatus.CLOSE_FRIEND]: 'Close friends with deep trust',
      [RelationshipStatus.TRUSTED_ALLY]: 'Trusted allies and confidants',
    };
    return descriptions[status];
  }
}
