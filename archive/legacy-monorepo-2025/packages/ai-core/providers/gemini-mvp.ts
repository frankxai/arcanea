/**
 * Gemini 2.0 Flash Provider for Luminor MVP
 * Streaming chat with multimodal support and system prompt injection
 */

import type {
  GeminiConfig,
  GeminiMessage,
  GeminiPart,
  GeminiStreamChunk,
  GeminiGenerationConfig,
  GeminiSafetySettings,
  LuminorResponse,
  ConversationContext,
} from '../types/luminor-mvp';

export class GeminiMVPProvider {
  private config: GeminiConfig;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor(config: GeminiConfig) {
    this.config = {
      model: config.model || 'gemini-2.0-flash-exp',
      apiKey: config.apiKey,
      safetySettings: config.safetySettings || this.getDefaultSafetySettings(),
      generationConfig: config.generationConfig || this.getDefaultGenerationConfig(),
    };
  }

  /**
   * Generate text response (non-streaming)
   */
  async generateText(
    systemPrompt: string,
    userMessage: string,
    conversationHistory?: GeminiMessage[],
    options?: Partial<GeminiGenerationConfig>
  ): Promise<{
    text: string;
    tokensUsed: number;
    finishReason: string;
  }> {
    const messages = this.buildMessages(systemPrompt, userMessage, conversationHistory);

    const requestBody = {
      contents: messages,
      generationConfig: {
        ...this.config.generationConfig,
        ...options,
      },
      safetySettings: this.buildSafetySettings(this.config.safetySettings!),
    };

    const response = await fetch(
      `${this.baseUrl}/models/${this.config.model}:generateContent?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Gemini API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();

    // Extract response
    const candidate = data.candidates?.[0];
    const content = candidate?.content;
    const parts = content?.parts || [];
    const text = parts.map((p: any) => p.text).join('');

    return {
      text,
      tokensUsed: data.usageMetadata?.totalTokenCount || 0,
      finishReason: candidate?.finishReason || 'STOP',
    };
  }

  /**
   * Generate streaming response
   */
  async *streamText(
    systemPrompt: string,
    userMessage: string,
    conversationHistory?: GeminiMessage[],
    options?: Partial<GeminiGenerationConfig>
  ): AsyncGenerator<GeminiStreamChunk> {
    const messages = this.buildMessages(systemPrompt, userMessage, conversationHistory);

    const requestBody = {
      contents: messages,
      generationConfig: {
        ...this.config.generationConfig,
        ...options,
      },
      safetySettings: this.buildSafetySettings(this.config.safetySettings!),
    };

    const response = await fetch(
      `${this.baseUrl}/models/${this.config.model}:streamGenerateContent?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Gemini API error: ${JSON.stringify(error)}`);
    }

    // Parse streaming response
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Split by newlines to get complete JSON objects
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (!line.trim()) continue;

          try {
            const data = JSON.parse(line);

            const candidate = data.candidates?.[0];
            const content = candidate?.content;
            const parts = content?.parts || [];
            const text = parts.map((p: any) => p.text).join('');

            if (text) {
              yield {
                text,
                finishReason: candidate?.finishReason,
                safetyRatings: candidate?.safetyRatings,
              };
            }
          } catch (parseError) {
            // Skip invalid JSON
            console.warn('Failed to parse streaming chunk:', parseError);
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Generate with images (multimodal)
   */
  async generateWithImages(
    systemPrompt: string,
    userMessage: string,
    images: Array<{ data: string; mimeType: string }>,
    conversationHistory?: GeminiMessage[],
    options?: Partial<GeminiGenerationConfig>
  ): Promise<{
    text: string;
    tokensUsed: number;
    finishReason: string;
  }> {
    // Build parts with text and images
    const userParts: GeminiPart[] = [
      { text: userMessage },
      ...images.map(img => ({
        inlineData: {
          mimeType: img.mimeType,
          data: img.data, // base64 encoded
        },
      })),
    ];

    // Build messages
    const messages: GeminiMessage[] = [];

    // Add system prompt as first user message
    if (systemPrompt) {
      messages.push({
        role: 'user',
        parts: [{ text: systemPrompt }],
      });
      messages.push({
        role: 'model',
        parts: [{ text: 'Understood. I\'ll respond according to my personality and expertise.' }],
      });
    }

    // Add conversation history
    if (conversationHistory) {
      messages.push(...conversationHistory);
    }

    // Add current message with images
    messages.push({
      role: 'user',
      parts: userParts,
    });

    const requestBody = {
      contents: messages,
      generationConfig: {
        ...this.config.generationConfig,
        ...options,
      },
      safetySettings: this.buildSafetySettings(this.config.safetySettings!),
    };

    const response = await fetch(
      `${this.baseUrl}/models/${this.config.model}:generateContent?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Gemini API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();

    // Extract response
    const candidate = data.candidates?.[0];
    const content = candidate?.content;
    const parts = content?.parts || [];
    const text = parts.map((p: any) => p.text).join('');

    return {
      text,
      tokensUsed: data.usageMetadata?.totalTokenCount || 0,
      finishReason: candidate?.finishReason || 'STOP',
    };
  }

  /**
   * Build messages array with system prompt injection
   */
  private buildMessages(
    systemPrompt: string,
    userMessage: string,
    conversationHistory?: GeminiMessage[]
  ): GeminiMessage[] {
    const messages: GeminiMessage[] = [];

    // Inject system prompt as first user message + acknowledgment
    // This is the Gemini way of handling system prompts
    if (systemPrompt) {
      messages.push({
        role: 'user',
        parts: [{ text: systemPrompt }],
      });
      messages.push({
        role: 'model',
        parts: [{ text: 'Understood. I will embody this personality completely.' }],
      });
    }

    // Add conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      messages.push(...conversationHistory);
    }

    // Add current user message
    messages.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    return messages;
  }

  /**
   * Build safety settings for API
   */
  private buildSafetySettings(settings: GeminiSafetySettings): any[] {
    return [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: settings.harassment,
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: settings.hateSpeech,
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: settings.sexuallyExplicit,
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: settings.dangerousContent,
      },
    ];
  }

  /**
   * Get default safety settings (permissive for creative content)
   */
  private getDefaultSafetySettings(): GeminiSafetySettings {
    return {
      harassment: 'BLOCK_ONLY_HIGH',
      hateSpeech: 'BLOCK_ONLY_HIGH',
      sexuallyExplicit: 'BLOCK_ONLY_HIGH',
      dangerousContent: 'BLOCK_ONLY_HIGH',
    };
  }

  /**
   * Get default generation config
   */
  private getDefaultGenerationConfig(): GeminiGenerationConfig {
    return {
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 2048,
    };
  }

  /**
   * Convert conversation context to Gemini messages
   */
  static contextToGeminiMessages(context: ConversationContext): GeminiMessage[] {
    return context.messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));
  }

  /**
   * Estimate tokens for text (rough approximation)
   */
  static estimateTokens(text: string): number {
    // Gemini uses approximately 1 token per 4 characters
    return Math.ceil(text.length / 4);
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.generateText(
        'You are a test assistant.',
        'Say "Connection successful"',
        []
      );
      return response.text.toLowerCase().includes('connection successful');
    } catch (error) {
      console.error('Gemini connection test failed:', error);
      return false;
    }
  }
}

/**
 * Factory function to create Gemini provider
 */
export function createGeminiProvider(apiKey: string, options?: Partial<GeminiConfig>): GeminiMVPProvider {
  return new GeminiMVPProvider({
    apiKey,
    model: options?.model || 'gemini-2.0-flash-exp',
    safetySettings: options?.safetySettings,
    generationConfig: options?.generationConfig,
  });
}

/**
 * Helper to convert conversation context to prompt
 */
export function buildGeminiPrompt(
  systemPrompt: string,
  context: ConversationContext,
  currentMessage: string
): { systemPrompt: string; history: GeminiMessage[]; userMessage: string } {
  const history = GeminiMVPProvider.contextToGeminiMessages(context);

  return {
    systemPrompt,
    history,
    userMessage: currentMessage,
  };
}
