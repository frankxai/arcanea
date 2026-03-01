import { GoogleGenerativeAI, type GenerativeModel, type Content } from '@google/generative-ai';
import type {
  ModelProvider,
  ModelConfig,
  ChatCompletionOptions,
  ChatCompletionResponse,
  StreamChunk,
  ModelCapabilities,
  ChatMessage,
} from '../types';

const MODEL_CAPABILITIES: Record<string, Partial<ModelCapabilities>> = {
  'gemini-2.5-pro': { vision: true, reasoning: true, functionCalling: true, extendedThinking: true, maxContextLength: 1048576 },
  'gemini-2.5-flash': { vision: true, reasoning: true, functionCalling: true, extendedThinking: true, maxContextLength: 1048576 },
  'gemini-2.0-flash': { vision: true, reasoning: false, functionCalling: true, extendedThinking: false, maxContextLength: 1048576 },
};

export class GoogleProvider implements ModelProvider {
  readonly type = 'google' as const;
  private genAI: GoogleGenerativeAI;
  private config: ModelConfig;

  constructor(config: ModelConfig) {
    this.config = config;
    this.genAI = new GoogleGenerativeAI(config.apiKey ?? '');
  }

  async chat(options: ChatCompletionOptions): Promise<ChatCompletionResponse> {
    const model = this.getModel(options);
    const { systemInstruction, contents } = this.mapMessages(options.messages);

    const result = await model.generateContent({
      contents,
      systemInstruction: systemInstruction ? { role: 'user', parts: [{ text: systemInstruction }] } : undefined,
    });

    const response = result.response;
    const text = response.text();

    return {
      id: `gemini-${Date.now()}`,
      content: text,
      role: 'assistant',
      usage: response.usageMetadata ? {
        promptTokens: response.usageMetadata.promptTokenCount ?? 0,
        completionTokens: response.usageMetadata.candidatesTokenCount ?? 0,
        totalTokens: response.usageMetadata.totalTokenCount ?? 0,
      } : undefined,
      finishReason: 'stop',
      model: options.model ?? this.config.model,
      provider: 'google',
    };
  }

  async *chatStream(options: ChatCompletionOptions): AsyncIterable<StreamChunk> {
    const model = this.getModel(options);
    const { systemInstruction, contents } = this.mapMessages(options.messages);

    const result = await model.generateContentStream({
      contents,
      systemInstruction: systemInstruction ? { role: 'user', parts: [{ text: systemInstruction }] } : undefined,
    });

    const id = `gemini-${Date.now()}`;
    for await (const chunk of result.stream) {
      yield {
        id,
        delta: chunk.text() ?? '',
        usage: chunk.usageMetadata ? {
          promptTokens: chunk.usageMetadata.promptTokenCount ?? 0,
          completionTokens: chunk.usageMetadata.candidatesTokenCount ?? 0,
          totalTokens: chunk.usageMetadata.totalTokenCount ?? 0,
        } : undefined,
      };
    }

    yield { id, delta: '', finishReason: 'stop' };
  }

  async listModels(): Promise<string[]> {
    return Object.keys(MODEL_CAPABILITIES);
  }

  getCapabilities(model: string): ModelCapabilities {
    const known = MODEL_CAPABILITIES[model];
    return {
      vision: known?.vision ?? true,
      reasoning: known?.reasoning ?? false,
      functionCalling: known?.functionCalling ?? true,
      extendedThinking: known?.extendedThinking ?? false,
      streaming: true,
      maxContextLength: known?.maxContextLength ?? 1048576,
    };
  }

  private getModel(options: ChatCompletionOptions): GenerativeModel {
    return this.genAI.getGenerativeModel({
      model: options.model ?? this.config.model,
      generationConfig: {
        temperature: options.temperature ?? this.config.temperature,
        maxOutputTokens: options.maxTokens ?? this.config.maxTokens,
        topP: options.topP ?? this.config.topP,
      },
    });
  }

  private mapMessages(messages: ChatMessage[]): { systemInstruction: string | undefined; contents: Content[] } {
    const systemMessages = messages.filter((m) => m.role === 'system');
    const chatMessages = messages.filter((m) => m.role !== 'system');

    return {
      systemInstruction: systemMessages.length > 0
        ? systemMessages.map((m) => typeof m.content === 'string' ? m.content : '').join('\n\n')
        : undefined,
      contents: chatMessages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: typeof m.content === 'string'
          ? [{ text: m.content }]
          : m.content.map((c) =>
              c.type === 'text' ? { text: c.text! } : { text: `[Image: ${c.imageUrl?.url}]` }
            ),
      })),
    };
  }
}
