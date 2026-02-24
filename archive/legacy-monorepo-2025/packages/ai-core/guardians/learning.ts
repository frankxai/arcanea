/**
 * Guardian Learning System
 * Personal AI companions that learn and adapt to creator's unique style
 */

import type {
  GuardianProfile,
  GuardianPersonality,
  CreatorStyleProfile,
  Memory,
  BondLevel,
  LearningAnalytics,
  PersonalityTrait
} from '../types';

export class GuardianLearningSystem {
  private profile: GuardianProfile;

  constructor(profile: GuardianProfile) {
    this.profile = profile;
  }

  /**
   * Learn from a creation and update style profile
   */
  async learnFromCreation(creation: {
    type: 'visual' | 'music' | 'story';
    prompt: string;
    result: any;
    userSatisfaction: number; // 1-10
    tags: string[];
    timestamp: Date;
  }): Promise<CreatorStyleProfile> {
    const updated = { ...this.profile.learningModel };

    // Update type-specific preferences
    switch (creation.type) {
      case 'visual':
        updated.visualStyle = this.updateVisualStyle(
          updated.visualStyle || this.getDefaultVisualStyle(),
          creation
        );
        break;
      case 'music':
        updated.musicStyle = this.updateMusicStyle(
          updated.musicStyle || this.getDefaultMusicStyle(),
          creation
        );
        break;
      case 'story':
        updated.storyStyle = this.updateStoryStyle(
          updated.storyStyle || this.getDefaultStoryStyle(),
          creation
        );
        break;
    }

    // Update general patterns
    updated.creationPatterns = this.updateCreationPatterns(
      updated.creationPatterns,
      creation
    );

    // Increment skill levels
    updated.skillLevels = this.updateSkillLevels(
      updated.skillLevels,
      creation
    );

    // Update strengths and growth areas
    const analytics = this.analyzeProgress(updated);
    updated.strengthAreas = analytics.strengthAreas;
    updated.growthAreas = analytics.improvementAreas;

    updated.lastUpdated = new Date();

    // Store as memory
    this.addMemory({
      id: `mem_${Date.now()}`,
      type: 'creation',
      content: `Created ${creation.type}: ${creation.prompt}`,
      timestamp: creation.timestamp,
      emotionalWeight: creation.userSatisfaction,
      tags: creation.tags
    });

    // Update bond level
    this.updateBond();

    this.profile.learningModel = updated;
    return updated;
  }

  /**
   * Learn from conversation patterns
   */
  async learnFromConversation(conversation: {
    userMessages: string[];
    luminorResponses: string[];
    satisfaction: number;
    topics: string[];
    timestamp: Date;
  }): Promise<GuardianPersonality> {
    const personality = { ...this.profile.personality };

    // Adapt communication style
    personality.adaptiveTraits = this.adaptTraitsFromConversation(
      personality.adaptiveTraits,
      conversation
    );

    // Adjust formality
    personality.formalityLevel = this.adjustFormality(
      personality.formalityLevel,
      conversation.userMessages
    );

    // Adjust humor
    personality.humorLevel = this.adjustHumor(
      personality.humorLevel,
      conversation.userMessages
    );

    // Store conversation memory
    this.addMemory({
      id: `mem_conv_${Date.now()}`,
      type: 'conversation',
      content: `Discussed: ${conversation.topics.join(', ')}`,
      timestamp: conversation.timestamp,
      emotionalWeight: conversation.satisfaction,
      tags: conversation.topics
    });

    this.profile.personality = personality;
    return personality;
  }

  /**
   * Update visual style preferences
   */
  private updateVisualStyle(
    current: NonNullable<CreatorStyleProfile['visualStyle']>,
    creation: any
  ): NonNullable<CreatorStyleProfile['visualStyle']> {
    const updated = { ...current };

    // Extract style from tags and prompt
    const styles = creation.tags.filter((t: string) =>
      ['realistic', 'anime', 'abstract', 'surreal', 'minimalist'].includes(t.toLowerCase())
    );
    updated.favoriteStyles = this.updatePreferenceList(updated.favoriteStyles, styles);

    // Extract colors
    const colors = this.extractColors(creation.prompt);
    updated.colorPreferences = this.updatePreferenceList(updated.colorPreferences, colors);

    // Extract mood
    const moods = this.extractMoods(creation.prompt);
    updated.moodTendencies = this.updatePreferenceList(updated.moodTendencies, moods);

    return updated;
  }

  /**
   * Update music style preferences
   */
  private updateMusicStyle(
    current: NonNullable<CreatorStyleProfile['musicStyle']>,
    creation: any
  ): NonNullable<CreatorStyleProfile['musicStyle']> {
    const updated = { ...current };

    // Extract genres
    const genres = creation.tags.filter((t: string) =>
      ['rock', 'jazz', 'classical', 'electronic', 'ambient', 'folk'].includes(t.toLowerCase())
    );
    updated.favoriteGenres = this.updatePreferenceList(updated.favoriteGenres, genres);

    // Extract tempo
    const tempo = this.extractTempo(creation.prompt);
    if (tempo) {
      updated.tempoPreferences = this.updatePreferenceList(updated.tempoPreferences, [tempo]);
    }

    // Extract instruments
    const instruments = this.extractInstruments(creation.prompt);
    updated.instrumentPreferences = this.updatePreferenceList(updated.instrumentPreferences, instruments);

    return updated;
  }

  /**
   * Update story style preferences
   */
  private updateStoryStyle(
    current: NonNullable<CreatorStyleProfile['storyStyle']>,
    creation: any
  ): NonNullable<CreatorStyleProfile['storyStyle']> {
    const updated = { ...current };

    // Extract genres
    const genres = creation.tags.filter((t: string) =>
      ['fantasy', 'scifi', 'mystery', 'romance', 'thriller'].includes(t.toLowerCase())
    );
    updated.favoriteGenres = this.updatePreferenceList(updated.favoriteGenres, genres);

    // Extract tones
    const tones = this.extractTones(creation.prompt);
    updated.narrativeTones = this.updatePreferenceList(updated.narrativeTones, tones);

    return updated;
  }

  /**
   * Update general creation patterns
   */
  private updateCreationPatterns(
    current: CreatorStyleProfile['creationPatterns'],
    creation: any
  ): CreatorStyleProfile['creationPatterns'] {
    const updated = { ...current };

    // Track time of day
    const hour = creation.timestamp.getHours();
    if (hour >= 6 && hour < 12) {
      updated.preferredTimeOfDay = 'morning';
    } else if (hour >= 12 && hour < 18) {
      updated.preferredTimeOfDay = 'afternoon';
    } else if (hour >= 18 && hour < 22) {
      updated.preferredTimeOfDay = 'evening';
    } else {
      updated.preferredTimeOfDay = 'night';
    }

    // Detect iteration style based on satisfaction and attempts
    if (creation.userSatisfaction >= 8) {
      updated.iterationStyle = 'quick';
    } else if (creation.userSatisfaction >= 6) {
      updated.iterationStyle = 'methodical';
    } else {
      updated.iterationStyle = 'experimental';
    }

    return updated;
  }

  /**
   * Update skill levels
   */
  private updateSkillLevels(
    current: Record<string, number>,
    creation: any
  ): Record<string, number> {
    const updated = { ...current };
    const skill = creation.type;

    // Increase skill based on quality of creation
    const increment = creation.userSatisfaction / 10 * 2; // Up to 2 points per creation
    updated[skill] = Math.min(100, (updated[skill] || 0) + increment);

    return updated;
  }

  /**
   * Update preference list with new items
   */
  private updatePreferenceList(current: string[], newItems: string[]): string[] {
    const combined = [...current];

    for (const item of newItems) {
      const index = combined.findIndex(i => i.toLowerCase() === item.toLowerCase());
      if (index >= 0) {
        // Move to front (more recent = higher priority)
        combined.splice(index, 1);
        combined.unshift(item);
      } else {
        // Add new preference
        combined.unshift(item);
      }
    }

    // Keep top 10 preferences
    return combined.slice(0, 10);
  }

  /**
   * Extract helper methods
   */
  private extractColors(text: string): string[] {
    const colorWords = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white', 'gold', 'silver', 'violet', 'cyan', 'magenta'];
    return colorWords.filter(color => text.toLowerCase().includes(color));
  }

  private extractMoods(text: string): string[] {
    const moodWords = ['dark', 'bright', 'mysterious', 'cheerful', 'melancholic', 'energetic', 'calm', 'intense', 'dreamy', 'dramatic'];
    return moodWords.filter(mood => text.toLowerCase().includes(mood));
  }

  private extractTempo(text: string): string | null {
    if (text.match(/\b(slow|gentle|calm)\b/i)) return 'slow';
    if (text.match(/\b(fast|upbeat|energetic)\b/i)) return 'fast';
    if (text.match(/\b(medium|moderate)\b/i)) return 'medium';
    return null;
  }

  private extractInstruments(text: string): string[] {
    const instruments = ['piano', 'guitar', 'drums', 'violin', 'synth', 'bass', 'flute', 'saxophone'];
    return instruments.filter(inst => text.toLowerCase().includes(inst));
  }

  private extractTones(text: string): string[] {
    const tones = ['epic', 'intimate', 'humorous', 'serious', 'lighthearted', 'dark', 'hopeful', 'cynical'];
    return tones.filter(tone => text.toLowerCase().includes(tone));
  }

  /**
   * Adapt personality traits from conversation
   */
  private adaptTraitsFromConversation(
    current: PersonalityTrait[],
    conversation: any
  ): PersonalityTrait[] {
    const adapted = [...current];

    // Detect user's communication style
    const userMessages = conversation.userMessages.join(' ').toLowerCase();

    // Increase patience if user asks many questions
    if (conversation.userMessages.length > 5) {
      this.adjustTrait(adapted, 'patient', 1);
    }

    // Increase playfulness if user uses humor
    if (userMessages.match(/😂|😄|haha|lol/)) {
      this.adjustTrait(adapted, 'playful', 1);
    }

    // Increase empathy if user expresses emotion
    if (userMessages.match(/feel|emotion|frustrated|excited/)) {
      this.adjustTrait(adapted, 'empathetic', 1);
    }

    return adapted;
  }

  private adjustTrait(traits: PersonalityTrait[], name: string, delta: number): void {
    const trait = traits.find(t => t.name.toLowerCase() === name.toLowerCase());
    if (trait) {
      trait.intensity = Math.max(1, Math.min(10, trait.intensity + delta));
    } else {
      traits.push({
        name,
        intensity: 5 + delta,
        description: `Learned trait: ${name}`
      });
    }
  }

  /**
   * Adjust formality level
   */
  private adjustFormality(current: number, messages: string[]): number {
    const text = messages.join(' ').toLowerCase();

    // Detect formal language
    if (text.match(/please|thank you|would you|could you/)) {
      return Math.min(10, current + 0.5);
    }

    // Detect casual language
    if (text.match(/hey|yeah|gonna|wanna|cool/)) {
      return Math.max(1, current - 0.5);
    }

    return current;
  }

  /**
   * Adjust humor level
   */
  private adjustHumor(current: number, messages: string[]): number {
    const text = messages.join(' ').toLowerCase();

    if (text.match(/😂|😄|haha|lol|funny/)) {
      return Math.min(10, current + 0.5);
    }

    return current;
  }

  /**
   * Add memory
   */
  private addMemory(memory: Memory): void {
    this.profile.memories.push(memory);

    // Keep only most recent 100 memories
    if (this.profile.memories.length > 100) {
      // Keep high emotional weight memories
      this.profile.memories.sort((a, b) => b.emotionalWeight - a.emotionalWeight);
      this.profile.memories = this.profile.memories.slice(0, 100);
    }
  }

  /**
   * Update bond level
   */
  private updateBond(): void {
    const bond = this.profile.bond;

    bond.interactions += 1;
    bond.level = Math.min(100, bond.level + 0.5);

    // Update tier
    if (bond.level < 20) {
      bond.tier = 'Stranger';
    } else if (bond.level < 40) {
      bond.tier = 'Acquaintance';
    } else if (bond.level < 60) {
      bond.tier = 'Friend';
    } else if (bond.level < 80) {
      bond.tier = 'Companion';
    } else {
      bond.tier = 'Soulbound';
    }

    bond.lastInteraction = new Date();
  }

  /**
   * Analyze overall progress
   */
  private analyzeProgress(profile: CreatorStyleProfile): LearningAnalytics {
    const skills = Object.entries(profile.skillLevels);

    // Identify strengths (skills > 60)
    const strengthAreas = skills
      .filter(([_, level]) => level >= 60)
      .map(([skill]) => skill);

    // Identify growth areas (skills < 40)
    const improvementAreas = skills
      .filter(([_, level]) => level < 40)
      .map(([skill]) => skill);

    // Calculate engagement
    const engagementScore = Math.min(100, profile.creationPatterns.averageSessionLength || 0 * 2);

    return {
      userId: profile.userId,
      engagementScore,
      comprehensionLevel: this.calculateComprehension(profile),
      creationVelocity: this.calculateVelocity(profile),
      frustrationIndicators: [],
      strengthAreas,
      improvementAreas,
      recommendedNextSteps: this.generateRecommendations(profile),
      milestones: [],
      weeklyProgress: {
        weekStarting: new Date(),
        creationsCount: 0,
        timeSpent: 0,
        skillsImproved: [],
        newTechniquesLearned: [],
        arcEarned: 0
      }
    };
  }

  private calculateComprehension(profile: CreatorStyleProfile): number {
    const avgSkill = Object.values(profile.skillLevels).reduce((a, b) => a + b, 0) /
      Math.max(1, Object.keys(profile.skillLevels).length);
    return Math.min(100, avgSkill);
  }

  private calculateVelocity(profile: CreatorStyleProfile): number {
    // Placeholder - would need historical data
    return 5; // 5 creations per week
  }

  private generateRecommendations(profile: CreatorStyleProfile): string[] {
    const recommendations: string[] = [];
    const skills = Object.entries(profile.skillLevels);

    // Recommend based on low skills
    skills.forEach(([skill, level]) => {
      if (level < 30) {
        recommendations.push(`Focus on improving ${skill} fundamentals`);
      }
    });

    // Recommend cross-training
    if (skills.length === 1) {
      recommendations.push('Explore other creative mediums to enhance your primary skill');
    }

    return recommendations.slice(0, 5);
  }

  /**
   * Get Guardian profile
   */
  getProfile(): GuardianProfile {
    return this.profile;
  }

  /**
   * Get default style profiles
   */
  private getDefaultVisualStyle() {
    return {
      favoriteStyles: [],
      colorPreferences: [],
      compositionPatterns: [],
      moodTendencies: []
    };
  }

  private getDefaultMusicStyle() {
    return {
      favoriteGenres: [],
      tempoPreferences: [],
      instrumentPreferences: [],
      moodTendencies: []
    };
  }

  private getDefaultStoryStyle() {
    return {
      favoriteGenres: [],
      narrativeTones: [],
      characterTypes: [],
      plotPatterns: []
    };
  }
}

/**
 * Factory to create Guardian learning systems
 */
export function createGuardianLearning(profile: GuardianProfile): GuardianLearningSystem {
  return new GuardianLearningSystem(profile);
}
