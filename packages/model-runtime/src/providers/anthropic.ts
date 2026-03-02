import Anthropic from '@anthropic-ai/sdk';
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
  'claude-opus-4-6': { vision: true, reasoning: true, functionCalling: true, extendedThinking: true, maxContextLength: 200000 },
  'claude-sonnet-4-6': { vision: true, reasoning: true, functionCalling: true, extendedThinking: true, maxContextLength: 200000 },
  'claude-haiku-4-5-20251001': { vision: true, reasoning: false, functionCalling: true, extendedThinking: false, maxContextLength: 200000 },
  'claude-3-5-sonnet-20241022': { vision: true, reasoning: false, functionCalling: true, extendedThinking: false, maxContextLength: 200000 },
};

export class AnthropicProvider implements ModelProvider {
  readonly type = 'anthropic' as const;
  private client: Anthropic;
  private config: ModelConfig;

  constructor(config: ModelConfig) {
    this.config = config;
    this.client = new Anthropic({
      apiKey: config.apiKey,
      baseURL: config.baseUrl,
    });
  }

  async chat(options: ChatCompletionOptions): Promise<ChatCompletionResponse> {
    const { systemMessage, messages } = this.extractSystem(options.messages);

    const response = await this.client.messages.create({
      model: options.model ?? this.config.model,
      max_tokens: options.maxTokens ?? this.config.maxTokens ?? 4096,
      system: systemMessage,
      messages: messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: typeof m.content === 'string' ? m.content : m.content.map((c) =>
          c.type === 'text'
            ? { type: 'text' as const, text: c.text! }
            : { type: 'image' as const, source: { type: 'url' as const, url: c.imageUrl!.url } }
        ),
      })),
      temperature: options.temperature ?? this.config.temperature,
      top_p: options.topP ?? this.config.topP,
      tools: options.tools?.map((t) => ({
        name: t.function.name,
        description: t.function.description,
        input_schema: t.function.parameters as Anthropic.Tool.InputSchema,
      })),
    });

    const textContent = response.content.filter((c) => c.type === 'text').map((c) => c.type === 'text' ? c.text : '').join('');
    const toolUseContent = response.content.filter((c) => c.type === 'tool_use');

    return {
      id: response.id,
      content: textContent,
      role: 'assistant',
      toolCalls: toolUseContent.length > 0 ? toolUseContent.map((tc) => {
        if (tc.type !== 'tool_use') throw new Error('unreachable');
        return {
          id: tc.id,
          type: 'function' as const,
          function: { name: tc.name, arguments: JSON.stringify(tc.input) },
        };
      }) : undefined,
      usage: {
        promptTokens: response.usage.input_tokens,
        completionTokens: response.usage.output_tokens,
        totalTokens: response.usage.input_tokens + response.usage.output_tokens,
      },
      finishReason: response.stop_reason === 'tool_use' ? 'tool_calls' : 'stop',
      model: response.model,
      provider: 'anthropic',
    };
  }

  async *chatStream(options: ChatCompletionOptions): AsyncIterable<StreamChunk> {
    const { systemMessage, messages } = this.extractSystem(options.messages);

    const stream = this.client.messages.stream({
      model: options.model ?? this.config.model,
      max_tokens: options.maxTokens ?? this.config.maxTokens ?? 4096,
      system: systemMessage,
      messages: messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: typeof m.content === 'string' ? m.content : m.content.map((c) =>
          c.type === 'text'
            ? { type: 'text' as const, text: c.text! }
            : { type: 'image' as const, source: { type: 'url' as const, url: c.imageUrl!.url } }
        ),
      })),
      temperature: options.temperature ?? this.config.temperature,
      top_p: options.topP ?? this.config.topP,
      tools: options.tools?.map((t) => ({
        name: t.function.name,
        description: t.function.description,
        input_schema: t.function.parameters as Anthropic.Tool.InputSchema,
      })),
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta') {
        if (event.delta.type === 'text_delta') {
          yield { id: '', delta: event.delta.text, };
        }
      } else if (event.type === 'message_stop') {
        const finalMessage = await stream.finalMessage();
        yield {
          id: finalMessage.id,
          delta: '',
          finishReason: finalMessage.stop_reason === 'tool_use' ? 'tool_calls' : 'stop',
          usage: {
            promptTokens: finalMessage.usage.input_tokens,
            completionTokens: finalMessage.usage.output_tokens,
            totalTokens: finalMessage.usage.input_tokens + finalMessage.usage.output_tokens,
          },
        };
      }
    }
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
      maxContextLength: known?.maxContextLength ?? 200000,
    };
  }

  private extractSystem(messages: ChatMessage[]): { systemMessage: string | undefined; messages: ChatMessage[] } {
    const systemMessages = messages.filter((m) => m.role === 'system');
    const nonSystemMessages = messages.filter((m) => m.role !== 'system');
    return {
      systemMessage: systemMessages.length > 0
        ? systemMessages.map((m) => typeof m.content === 'string' ? m.content : '').join('\n\n')
        : undefined,
      messages: nonSystemMessages,
    };
  }
}
