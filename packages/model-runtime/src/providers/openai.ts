import OpenAI from 'openai';
import type {
  ModelProvider,
  ModelConfig,
  ChatCompletionOptions,
  ChatCompletionResponse,
  StreamChunk,
  ModelCapabilities,
  ProviderType,
  ChatMessage,
} from '../types';

const MODEL_CAPABILITIES: Record<string, Partial<ModelCapabilities>> = {
  'gpt-4o': { vision: true, reasoning: false, functionCalling: true, extendedThinking: false, maxContextLength: 128000 },
  'gpt-4o-mini': { vision: true, reasoning: false, functionCalling: true, extendedThinking: false, maxContextLength: 128000 },
  'o1': { vision: true, reasoning: true, functionCalling: true, extendedThinking: true, maxContextLength: 200000 },
  'o3-mini': { vision: false, reasoning: true, functionCalling: true, extendedThinking: true, maxContextLength: 200000 },
};

export class OpenAIProvider implements ModelProvider {
  readonly type: ProviderType;
  private client: OpenAI;
  private config: ModelConfig;

  constructor(config: ModelConfig) {
    this.type = config.provider;
    this.config = config;
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseUrl,
    });
  }

  async chat(options: ChatCompletionOptions): Promise<ChatCompletionResponse> {
    const response = await this.client.chat.completions.create({
      model: options.model ?? this.config.model,
      messages: this.mapMessages(options.messages),
      temperature: options.temperature ?? this.config.temperature,
      max_tokens: options.maxTokens ?? this.config.maxTokens,
      top_p: options.topP ?? this.config.topP,
      tools: options.tools as OpenAI.ChatCompletionTool[] | undefined,
      tool_choice: options.toolChoice as OpenAI.ChatCompletionToolChoiceOption | undefined,
      stream: false,
    }, { signal: options.signal });

    const choice = response.choices[0];
    return {
      id: response.id,
      content: choice.message.content ?? '',
      role: 'assistant',
      toolCalls: choice.message.tool_calls?.map((tc) => ({
        id: tc.id,
        type: 'function' as const,
        function: { name: tc.function.name, arguments: tc.function.arguments },
      })),
      usage: response.usage ? {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens,
        totalTokens: response.usage.total_tokens,
      } : undefined,
      finishReason: this.mapFinishReason(choice.finish_reason),
      model: response.model,
      provider: this.type,
    };
  }

  async *chatStream(options: ChatCompletionOptions): AsyncIterable<StreamChunk> {
    const stream = await this.client.chat.completions.create({
      model: options.model ?? this.config.model,
      messages: this.mapMessages(options.messages),
      temperature: options.temperature ?? this.config.temperature,
      max_tokens: options.maxTokens ?? this.config.maxTokens,
      top_p: options.topP ?? this.config.topP,
      tools: options.tools as OpenAI.ChatCompletionTool[] | undefined,
      tool_choice: options.toolChoice as OpenAI.ChatCompletionToolChoiceOption | undefined,
      stream: true,
      stream_options: { include_usage: true },
    }, { signal: options.signal });

    for await (const chunk of stream) {
      const choice = chunk.choices[0];
      if (!choice) continue;

      yield {
        id: chunk.id,
        delta: choice.delta?.content ?? '',
        toolCalls: choice.delta?.tool_calls?.map((tc) => ({
          id: tc.id,
          type: 'function' as const,
          function: tc.function ? { name: tc.function.name ?? '', arguments: tc.function.arguments ?? '' } : undefined,
        })),
        finishReason: choice.finish_reason ? this.mapFinishReason(choice.finish_reason) : undefined,
        usage: chunk.usage ? {
          promptTokens: chunk.usage.prompt_tokens,
          completionTokens: chunk.usage.completion_tokens,
          totalTokens: chunk.usage.total_tokens,
        } : undefined,
      };
    }
  }

  async listModels(): Promise<string[]> {
    const response = await this.client.models.list();
    return response.data.map((m) => m.id).sort();
  }

  getCapabilities(model: string): ModelCapabilities {
    const known = MODEL_CAPABILITIES[model];
    return {
      vision: known?.vision ?? false,
      reasoning: known?.reasoning ?? false,
      functionCalling: known?.functionCalling ?? true,
      extendedThinking: known?.extendedThinking ?? false,
      streaming: true,
      maxContextLength: known?.maxContextLength ?? 8192,
    };
  }

  private mapMessages(messages: ChatMessage[]): OpenAI.ChatCompletionMessageParam[] {
    return messages.map((msg) => {
      if (typeof msg.content === 'string') {
        return { role: msg.role as 'system' | 'user' | 'assistant', content: msg.content };
      }
      return {
        role: msg.role as 'user',
        content: msg.content.map((c) =>
          c.type === 'text'
            ? { type: 'text' as const, text: c.text! }
            : { type: 'image_url' as const, image_url: { url: c.imageUrl!.url, detail: c.imageUrl?.detail } }
        ),
      };
    }) as OpenAI.ChatCompletionMessageParam[];
  }

  private mapFinishReason(reason: string | null): ChatCompletionResponse['finishReason'] {
    switch (reason) {
      case 'stop': return 'stop';
      case 'tool_calls': return 'tool_calls';
      case 'length': return 'length';
      case 'content_filter': return 'content_filter';
      default: return 'stop';
    }
  }
}
