/**
 * Conversation Context Manager
 * Manages conversation history, memory extraction, and context building
 * Optimized for Gemini 2.0 Flash token limits
 */

import type {
  ConversationContext,
  ConversationMessage,
  EmotionalState,
  EmotionalTone,
  MemoryExtraction,
  BondState,
} from '../types/luminor-mvp';

export class ConversationManager {
  private context: ConversationContext;
  private readonly maxMessages: number;
  private readonly tokenBudget: number;
  private readonly keyMomentThreshold: number;

  constructor(
    sessionId: string,
    creatorId: string,
    luminorSlug: string,
    options: {
      maxMessages?: number;
      tokenBudget?: number;
      keyMomentThreshold?: number;
    } = {}
  ) {
    this.maxMessages = options.maxMessages || 50;
    this.tokenBudget = options.tokenBudget || 30000; // Gemini 2.0 Flash context
    this.keyMomentThreshold = options.keyMomentThreshold || 0.7;

    this.context = {
      sessionId,
      creatorId,
      luminorSlug,
      startedAt: new Date(),
      messages: [],
      keyMoments: [],
      creatorPreferences: {},
      recentTopics: [],
      emotionalState: this.createDefaultEmotionalState(),
      bondState: this.createDefaultBondState(),
      maxMessages: this.maxMessages,
      tokenBudget: this.tokenBudget,
    };
  }

  /**
   * Add a message to the conversation
   */
  addMessage(
    role: 'user' | 'assistant',
    content: string,
    metadata: {
      emotionalTone?: EmotionalTone;
      importance?: 'low' | 'medium' | 'high';
      tags?: string[];
    } = {}
  ): ConversationMessage {
    const message: ConversationMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
      emotionalTone: metadata.emotionalTone,
      importance: metadata.importance || this.determineImportance(content),
      tags: metadata.tags || [],
      metadata: {},
    };

    this.context.messages.push(message);

    // Extract memories from user messages
    if (role === 'user') {
      this.extractAndStoreMemories(message);
      this.updateEmotionalState(message);
      this.updateTopics(message);
    }

    // Manage context size
    this.pruneIfNeeded();

    return message;
  }

  /**
   * Get the current context
   */
  getContext(): ConversationContext {
    return this.context;
  }

  /**
   * Get recent messages for prompt building
   */
  getRecentMessages(count: number = 10): ConversationMessage[] {
    return this.context.messages.slice(-count);
  }

  /**
   * Get messages by importance
   */
  getImportantMessages(minImportance: 'low' | 'medium' | 'high' = 'medium'): ConversationMessage[] {
    const importanceLevel = { low: 1, medium: 2, high: 3 };
    const threshold = importanceLevel[minImportance];

    return this.context.messages.filter(
      msg => importanceLevel[msg.importance] >= threshold
    );
  }

  /**
   * Build context string for prompts (optimized for tokens)
   */
  buildContextString(maxTokens: number = 5000): string {
    const parts: string[] = [];
    let estimatedTokens = 0;

    // Add key moments (highest priority)
    if (this.context.keyMoments.length > 0) {
      const moments = this.context.keyMoments.slice(-5).join('\n- ');
      const momentSection = `Key Memories:\n- ${moments}\n`;
      estimatedTokens += this.estimateTokens(momentSection);
      if (estimatedTokens < maxTokens) {
        parts.push(momentSection);
      }
    }

    // Add creator preferences
    if (Object.keys(this.context.creatorPreferences).length > 0) {
      const prefs = Object.entries(this.context.creatorPreferences)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      const prefSection = `Creator preferences: ${prefs}\n`;
      estimatedTokens += this.estimateTokens(prefSection);
      if (estimatedTokens < maxTokens) {
        parts.push(prefSection);
      }
    }

    // Add recent topics
    if (this.context.recentTopics.length > 0) {
      const topics = this.context.recentTopics.slice(-3).join(', ');
      const topicSection = `Recent topics: ${topics}\n`;
      estimatedTokens += this.estimateTokens(topicSection);
      if (estimatedTokens < maxTokens) {
        parts.push(topicSection);
      }
    }

    // Add recent conversation (as many as fit)
    const recentMessages: string[] = [];
    for (let i = this.context.messages.length - 1; i >= 0; i--) {
      const msg = this.context.messages[i];
      const msgStr = `${msg.role === 'user' ? 'Creator' : 'You'}: ${msg.content}\n`;
      const msgTokens = this.estimateTokens(msgStr);

      if (estimatedTokens + msgTokens < maxTokens) {
        recentMessages.unshift(msgStr);
        estimatedTokens += msgTokens;
      } else {
        break;
      }
    }

    if (recentMessages.length > 0) {
      parts.push(`Recent conversation:\n${recentMessages.join('')}`);
    }

    return parts.join('\n');
  }

  /**
   * Extract and store memories from message
   */
  private extractAndStoreMemories(message: ConversationMessage): void {
    const memories = this.extractMemories(message.content);

    for (const memory of memories) {
      if (memory.importance >= this.keyMomentThreshold) {
        // Add to key moments
        if (!this.context.keyMoments.includes(memory.content)) {
          this.context.keyMoments.push(memory.content);
        }
      }

      // Update preferences
      if (memory.type === 'preference') {
        this.updatePreferences(memory);
      }
    }
  }

  /**
   * Extract memories from content using pattern matching
   */
  private extractMemories(content: string): MemoryExtraction[] {
    const memories: MemoryExtraction[] = [];
    const lower = content.toLowerCase();

    // Detect preferences
    const preferencePatterns = [
      /i (love|like|prefer|enjoy) (.+)/gi,
      /my favorite (.+) is (.+)/gi,
      /i want to (create|make|build) (.+)/gi,
    ];

    for (const pattern of preferencePatterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        memories.push({
          type: 'preference',
          content: match[0],
          importance: 0.7,
          timestamp: new Date(),
          source: content,
        });
      }
    }

    // Detect achievements
    const achievementPatterns = [
      /i (finished|completed|created|made|built) (.+)/gi,
      /i did it/gi,
      /it worked/gi,
    ];

    for (const pattern of achievementPatterns) {
      if (pattern.test(content)) {
        memories.push({
          type: 'achievement',
          content: content,
          importance: 0.9,
          timestamp: new Date(),
          source: content,
        });
      }
    }

    // Detect goals
    const goalPatterns = [
      /i want to (.+)/gi,
      /i'm trying to (.+)/gi,
      /my goal is (.+)/gi,
    ];

    for (const pattern of goalPatterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        memories.push({
          type: 'goal',
          content: match[0],
          importance: 0.8,
          timestamp: new Date(),
          source: content,
        });
      }
    }

    // Detect facts about creator
    const factPatterns = [
      /i am (.+)/gi,
      /i'm (.+)/gi,
      /my name is (.+)/gi,
    ];

    for (const pattern of factPatterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        memories.push({
          type: 'fact',
          content: match[0],
          importance: 0.6,
          timestamp: new Date(),
          source: content,
        });
      }
    }

    return memories;
  }

  /**
   * Update creator preferences from memory
   */
  private updatePreferences(memory: MemoryExtraction): void {
    // Simple key-value extraction
    const content = memory.content.toLowerCase();

    if (content.includes('love') || content.includes('like')) {
      const match = content.match(/(love|like|prefer|enjoy) (.+)/i);
      if (match) {
        this.context.creatorPreferences['likes'] =
          this.context.creatorPreferences['likes']
            ? `${this.context.creatorPreferences['likes']}, ${match[2]}`
            : match[2];
      }
    }

    if (content.includes('want to create') || content.includes('want to make')) {
      const match = content.match(/want to (create|make|build) (.+)/i);
      if (match) {
        this.context.creatorPreferences['goals'] =
          this.context.creatorPreferences['goals']
            ? `${this.context.creatorPreferences['goals']}, ${match[2]}`
            : match[2];
      }
    }
  }

  /**
   * Update emotional state from message
   */
  private updateEmotionalState(message: ConversationMessage): void {
    const detectedTone = this.detectEmotionalTone(message.content);
    const intensity = this.detectIntensity(message.content);

    // Update current state
    this.context.emotionalState.current = detectedTone;
    this.context.emotionalState.intensity = intensity;

    // Add to history
    this.context.emotionalState.history.push({
      tone: detectedTone,
      timestamp: new Date(),
      trigger: message.content.substring(0, 50),
      duration: 0, // Will be calculated later
    });

    // Keep history manageable
    if (this.context.emotionalState.history.length > 20) {
      this.context.emotionalState.history.shift();
    }
  }

  /**
   * Detect emotional tone from content
   */
  private detectEmotionalTone(content: string): EmotionalTone {
    const lower = content.toLowerCase();

    // Joy/Excitement
    if (
      lower.includes('love') ||
      lower.includes('amazing') ||
      lower.includes('awesome') ||
      lower.includes('excited')
    ) {
      return EmotionalTone.JOY;
    }

    // Frustration/Concern
    if (
      lower.includes('frustrated') ||
      lower.includes('stuck') ||
      lower.includes('confused') ||
      lower.includes('help')
    ) {
      return EmotionalTone.CONCERN;
    }

    // Achievement/Pride
    if (
      lower.includes('finished') ||
      lower.includes('completed') ||
      lower.includes('did it') ||
      lower.includes('made it')
    ) {
      return EmotionalTone.PRIDE;
    }

    // Curiosity/Learning
    if (
      lower.includes('how') ||
      lower.includes('why') ||
      lower.includes('what') ||
      lower.includes('teach')
    ) {
      return EmotionalTone.CURIOSITY;
    }

    // Default to focus
    return EmotionalTone.FOCUS;
  }

  /**
   * Detect intensity from content
   */
  private detectIntensity(content: string): number {
    let intensity = 5;

    // Exclamation marks
    const exclamations = (content.match(/!/g) || []).length;
    intensity += Math.min(2, exclamations);

    // ALL CAPS
    if (content === content.toUpperCase() && content.length > 5) {
      intensity += 2;
    }

    // Length (more detailed = more engaged)
    if (content.length > 200) intensity += 1;
    if (content.length > 500) intensity += 1;

    return Math.min(10, intensity);
  }

  /**
   * Update recent topics
   */
  private updateTopics(message: ConversationMessage): void {
    // Extract potential topics (nouns and key phrases)
    const topics = this.extractTopics(message.content);

    for (const topic of topics) {
      // Add if not already in recent topics
      if (!this.context.recentTopics.includes(topic)) {
        this.context.recentTopics.push(topic);
      }
    }

    // Keep only recent topics
    if (this.context.recentTopics.length > 10) {
      this.context.recentTopics = this.context.recentTopics.slice(-10);
    }
  }

  /**
   * Extract topics from content
   */
  private extractTopics(content: string): string[] {
    const topics: string[] = [];

    // Simple keyword extraction
    const keywords = [
      'music', 'song', 'melody', 'harmony', 'rhythm',
      'story', 'character', 'plot', 'world', 'lore',
      'art', 'design', 'color', 'composition', 'style',
      'create', 'make', 'build', 'develop',
    ];

    const lower = content.toLowerCase();
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        topics.push(keyword);
      }
    }

    return topics;
  }

  /**
   * Determine message importance
   */
  private determineImportance(content: string): 'low' | 'medium' | 'high' {
    const lower = content.toLowerCase();

    // High importance indicators
    if (
      lower.includes('finished') ||
      lower.includes('completed') ||
      lower.includes('first time') ||
      lower.includes('breakthrough') ||
      lower.includes('discovered')
    ) {
      return 'high';
    }

    // Medium importance indicators
    if (
      lower.includes('help') ||
      lower.includes('how') ||
      lower.includes('create') ||
      content.length > 100
    ) {
      return 'medium';
    }

    // Default to low
    return 'low';
  }

  /**
   * Prune messages if context is too large
   */
  private pruneIfNeeded(): void {
    // Remove oldest low-importance messages if over limit
    while (this.context.messages.length > this.maxMessages) {
      const lowImportanceIndex = this.context.messages.findIndex(
        msg => msg.importance === 'low'
      );

      if (lowImportanceIndex !== -1) {
        this.context.messages.splice(lowImportanceIndex, 1);
      } else {
        // Remove oldest if no low-importance found
        this.context.messages.shift();
      }
    }
  }

  /**
   * Estimate tokens (rough approximation)
   */
  private estimateTokens(text: string): number {
    // Rough estimate: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }

  /**
   * Create default emotional state
   */
  private createDefaultEmotionalState(): EmotionalState {
    return {
      current: EmotionalTone.CURIOSITY,
      intensity: 5,
      stability: 7,
      history: [],
    };
  }

  /**
   * Create default bond state
   */
  private createDefaultBondState(): BondState {
    return {
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      totalInteractions: 0,
      createdEssences: 0,
      sharedMoments: [],
      unlockedTraits: [],
      relationshipStatus: 'stranger' as any,
    };
  }

  /**
   * Update bond state
   */
  updateBondState(bondState: BondState): void {
    this.context.bondState = bondState;
  }

  /**
   * Get conversation summary for long-term memory
   */
  generateSummary(): string {
    const summary: string[] = [];

    summary.push(`Session started: ${this.context.startedAt.toISOString()}`);
    summary.push(`Total messages: ${this.context.messages.length}`);
    summary.push(`Bond level: ${this.context.bondState.level}`);

    if (this.context.keyMoments.length > 0) {
      summary.push('\nKey moments:');
      summary.push(...this.context.keyMoments.map(m => `- ${m}`));
    }

    if (Object.keys(this.context.creatorPreferences).length > 0) {
      summary.push('\nPreferences:');
      summary.push(...Object.entries(this.context.creatorPreferences).map(
        ([k, v]) => `- ${k}: ${v}`
      ));
    }

    if (this.context.recentTopics.length > 0) {
      summary.push(`\nTopics discussed: ${this.context.recentTopics.join(', ')}`);
    }

    return summary.join('\n');
  }

  /**
   * Clear old messages while keeping important ones
   */
  clearOldMessages(keepImportant: boolean = true): void {
    if (keepImportant) {
      // Keep high and medium importance messages
      this.context.messages = this.context.messages.filter(
        msg => msg.importance !== 'low'
      );
    } else {
      this.context.messages = [];
    }
  }

  /**
   * Reset conversation (for new session)
   */
  reset(preserveMemories: boolean = true): void {
    const oldKeyMoments = preserveMemories ? this.context.keyMoments : [];
    const oldPreferences = preserveMemories ? this.context.creatorPreferences : {};
    const oldBondState = preserveMemories ? this.context.bondState : this.createDefaultBondState();

    this.context = {
      ...this.context,
      startedAt: new Date(),
      messages: [],
      keyMoments: oldKeyMoments,
      creatorPreferences: oldPreferences,
      recentTopics: [],
      emotionalState: this.createDefaultEmotionalState(),
      bondState: oldBondState,
    };
  }
}

/**
 * Factory function to create conversation manager
 */
export function createConversationManager(
  sessionId: string,
  creatorId: string,
  luminorSlug: string,
  options?: {
    maxMessages?: number;
    tokenBudget?: number;
    keyMomentThreshold?: number;
  }
): ConversationManager {
  return new ConversationManager(sessionId, creatorId, luminorSlug, options);
}
