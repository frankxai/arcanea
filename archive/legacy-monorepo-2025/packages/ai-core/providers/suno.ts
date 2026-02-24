/**
 * Suno Provider for Arcanea
 * Music generation for the Academy of Creation & Light
 * Integrates with Suno AI for magical music creation
 */

import type {
  ArcaneanProvider,
  GenerateOptions,
  MusicGenerationOptions,
  SunoSong,
  SunoGenerationResponse
} from '../types';

export interface SunoConfig {
  apiKey?: string;
  baseUrl?: string;
}

export interface SunoPromptOptions {
  style?: string;
  mood?: string;
  tempo?: 'slow' | 'medium' | 'fast';
  instruments?: string[];
  vocal?: 'male' | 'female' | 'none';
  duration?: number; // seconds
}

export class SunoProvider implements ArcaneanProvider {
  public readonly name = 'suno';
  private apiKey: string;
  private baseUrl: string;

  constructor(config: SunoConfig = {}) {
    this.apiKey = config.apiKey || process.env.SUNO_API_KEY || '';
    this.baseUrl = config.baseUrl || 'https://api.suno.ai/v1';

    if (!this.apiKey) {
      console.warn('Suno API key not provided. Music generation will fail.');
    }
  }

  /**
   * Generate music from a text prompt
   * Returns a song object with metadata and audio URL
   */
  async generateMusic(
    prompt: string,
    options: MusicGenerationOptions = {}
  ): Promise<SunoSong> {
    const requestBody = {
      prompt: this.enhancePrompt(prompt, options),
      make_instrumental: options.instrumental ?? false,
      wait_audio: options.waitForCompletion ?? true,
      tags: options.tags || this.buildTags(options),
      title: options.title,
      continue_at: options.continueAt,
      continue_clip_id: options.continueClipId,
    };

    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Suno API error: ${response.status} ${response.statusText}`);
      }

      const data: SunoGenerationResponse = await response.json();

      // Return the first generated song
      if (data.clips && data.clips.length > 0) {
        return this.formatSong(data.clips[0]);
      }

      throw new Error('No songs generated from Suno API');
    } catch (error) {
      console.error('Error generating music with Suno:', error);
      throw error;
    }
  }

  /**
   * Generate multiple music variations
   */
  async generateVariations(
    prompt: string,
    count: number = 2,
    options: MusicGenerationOptions = {}
  ): Promise<SunoSong[]> {
    const promises = Array(count).fill(null).map(() =>
      this.generateMusic(prompt, options)
    );

    return Promise.all(promises);
  }

  /**
   * Continue/extend an existing song
   */
  async extendSong(
    clipId: string,
    continueAt: number, // seconds
    prompt?: string
  ): Promise<SunoSong> {
    return this.generateMusic(prompt || '', {
      continueClipId: clipId,
      continueAt,
    });
  }

  /**
   * Get song by ID
   */
  async getSong(songId: string): Promise<SunoSong | null> {
    try {
      const response = await fetch(`${this.baseUrl}/clip/${songId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return this.formatSong(data);
    } catch (error) {
      console.error('Error fetching song:', error);
      return null;
    }
  }

  /**
   * Get user's song history
   */
  async getSongHistory(limit: number = 20): Promise<SunoSong[]> {
    try {
      const response = await fetch(`${this.baseUrl}/clips?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch song history');
      }

      const data = await response.json();
      return data.clips.map((clip: any) => this.formatSong(clip));
    } catch (error) {
      console.error('Error fetching song history:', error);
      return [];
    }
  }

  /**
   * Enhance prompt with Suno-specific guidance
   */
  private enhancePrompt(prompt: string, options: SunoPromptOptions): string {
    let enhanced = prompt;

    // Add style guidance
    if (options.style) {
      enhanced = `${options.style} style: ${enhanced}`;
    }

    // Add mood/emotion
    if (options.mood) {
      enhanced = `${enhanced}. Mood: ${options.mood}`;
    }

    // Add tempo guidance
    if (options.tempo) {
      const tempoMap = {
        slow: 'slow tempo, relaxed pace',
        medium: 'moderate tempo',
        fast: 'fast tempo, energetic pace',
      };
      enhanced = `${enhanced}. ${tempoMap[options.tempo]}`;
    }

    // Add instrument preferences
    if (options.instruments && options.instruments.length > 0) {
      enhanced = `${enhanced}. Featuring ${options.instruments.join(', ')}`;
    }

    // Add vocal preferences
    if (options.vocal && options.vocal !== 'none') {
      enhanced = `${enhanced}. ${options.vocal} vocals`;
    }

    return enhanced;
  }

  /**
   * Build tags from options
   */
  private buildTags(options: SunoPromptOptions): string {
    const tags: string[] = [];

    if (options.style) tags.push(options.style);
    if (options.mood) tags.push(options.mood);
    if (options.tempo) tags.push(options.tempo);

    return tags.join(', ');
  }

  /**
   * Format raw Suno response into SunoSong
   */
  private formatSong(clip: any): SunoSong {
    return {
      id: clip.id,
      title: clip.title || 'Untitled',
      prompt: clip.prompt || '',
      tags: clip.tags || '',
      audioUrl: clip.audio_url,
      videoUrl: clip.video_url,
      imageUrl: clip.image_url || clip.image_large_url,
      duration: clip.duration || 0,
      status: clip.status,
      createdAt: new Date(clip.created_at),
      metadata: {
        model: clip.model_name,
        isInstrumental: clip.is_instrumental,
        isPublic: clip.is_public,
        errorMessage: clip.error_message,
      },
    };
  }

  /**
   * Generate text description (for compatibility)
   */
  async generateText(prompt: string, options: GenerateOptions = {}): Promise<string> {
    // For music, we'll return metadata as text
    const song = await this.generateMusic(prompt, options as MusicGenerationOptions);
    return JSON.stringify({
      title: song.title,
      audioUrl: song.audioUrl,
      tags: song.tags,
      duration: song.duration,
    }, null, 2);
  }

  /**
   * Stream not supported for music generation
   */
  async *streamText(prompt: string, options: GenerateOptions = {}): AsyncGenerator<string> {
    const result = await this.generateText(prompt, options);
    yield result;
  }
}

/**
 * Factory function to create Suno provider
 */
export function createSunoProvider(config?: SunoConfig): SunoProvider {
  return new SunoProvider(config);
}

/**
 * Soul Guardian specific music generation
 * Each Soul Guardian has unique musical personality
 */
export class SoulGuardian {
  private suno: SunoProvider;

  constructor(
    public readonly name: string,
    public readonly instrument: string,
    public readonly style: string,
    public readonly personality: string,
    sunoProvider: SunoProvider
  ) {
    this.suno = sunoProvider;
  }

  /**
   * Generate music in this Guardian's signature style
   */
  async createSignatureSong(theme: string, mood?: string): Promise<SunoSong> {
    const prompt = `${theme}. ${this.personality}`;

    return this.suno.generateMusic(prompt, {
      style: this.style,
      mood: mood || 'inspiring',
      instruments: [this.instrument],
      tags: `${this.style}, ${this.instrument}, soul guardian`,
    });
  }

  /**
   * Collaborate with another Guardian
   */
  async collaborate(otherGuardian: SoulGuardian, theme: string): Promise<SunoSong> {
    const prompt = `Collaboration between ${this.name} and ${otherGuardian.name}: ${theme}`;

    return this.suno.generateMusic(prompt, {
      style: `${this.style} meets ${otherGuardian.style}`,
      instruments: [this.instrument, otherGuardian.instrument],
      tags: `collaboration, ${this.style}, ${otherGuardian.style}`,
    });
  }
}

/**
 * The complete Soul Guardian band
 */
export function createSoulGuardians(suno: SunoProvider) {
  return {
    melodia: new SoulGuardian(
      'Melodia',
      'ethereal synth',
      'ambient electronic',
      'Weaving melodies that touch the soul, guiding creators through harmonic landscapes',
      suno
    ),
    rhythm: new SoulGuardian(
      'Rhythm',
      'tribal drums',
      'world percussion',
      'The heartbeat of creation, pulsing with primal creative energy',
      suno
    ),
    harmony: new SoulGuardian(
      'Harmony',
      'choir voices',
      'vocal ambient',
      'Blending voices into celestial harmonies that elevate the spirit',
      suno
    ),
    resonance: new SoulGuardian(
      'Resonance',
      'deep bass',
      'atmospheric bass',
      'Grounding creative vision with deep, resonant frequencies',
      suno
    ),
  };
}
