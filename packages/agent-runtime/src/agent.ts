import { nanoid } from 'nanoid';
import type { ModelRuntime, ChatMessage, ChatCompletionResponse, StreamChunk, ToolDefinition } from '@arcanea/model-runtime';
import type { AgentConfig, AgentResponse, StreamEvent, ToolExecutor } from './types';

const MAX_TOOL_ROUNDS = 10;

export class Agent {
  readonly config: AgentConfig;
  private runtime: ModelRuntime;
  private toolExecutor?: ToolExecutor;

  constructor(config: AgentConfig, runtime: ModelRuntime, toolExecutor?: ToolExecutor) {
    this.config = config;
    this.runtime = runtime;
    this.toolExecutor = toolExecutor;
  }

  async chat(
    messages: ChatMessage[],
    options?: { signal?: AbortSignal }
  ): Promise<AgentResponse> {
    const fullMessages = this.buildMessages(messages);
    const tools = this.getAllTools();

    let currentMessages = fullMessages;
    let finalResponse: ChatCompletionResponse | null = null;
    let rounds = 0;

    while (rounds < MAX_TOOL_ROUNDS) {
      rounds++;
      const response = await this.runtime.chat({
        messages: currentMessages,
        model: this.config.model,
        provider: this.config.provider,
        temperature: this.config.temperature,
        maxTokens: this.config.maxTokens,
        tools: tools.length > 0 ? tools : undefined,
        signal: options?.signal,
      });

      if (!response.toolCalls?.length) {
        finalResponse = response;
        break;
      }

      // Execute tool calls
      currentMessages = [...currentMessages, {
        role: 'assistant' as const,
        content: response.content,
        toolCalls: response.toolCalls,
      }];

      for (const tc of response.toolCalls) {
        const result = this.toolExecutor
          ? await this.toolExecutor.execute(tc.function.name, JSON.parse(tc.function.arguments))
          : JSON.stringify({ error: 'No tool executor configured' });

        currentMessages.push({
          role: 'tool' as const,
          content: result,
          toolCallId: tc.id,
        });
      }
    }

    if (!finalResponse) {
      throw new Error(`Agent "${this.config.name}" exceeded max tool rounds (${MAX_TOOL_ROUNDS})`);
    }

    return {
      agentId: this.config.id,
      agentName: this.config.name,
      content: finalResponse.content,
      model: finalResponse.model,
      provider: finalResponse.provider,
      tokenUsage: finalResponse.usage,
    };
  }

  async *chatStream(
    messages: ChatMessage[],
    options?: { signal?: AbortSignal }
  ): AsyncIterable<StreamEvent> {
    const fullMessages = this.buildMessages(messages);

    yield* this.streamRound(fullMessages, options);
  }

  private async *streamRound(
    messages: ChatMessage[],
    options?: { signal?: AbortSignal }
  ): AsyncIterable<StreamEvent> {
    const tools = this.getAllTools();

    const stream = this.runtime.chatStream({
      messages,
      model: this.config.model,
      provider: this.config.provider,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      tools: tools.length > 0 ? tools : undefined,
      signal: options?.signal,
    });

    let fullContent = '';
    for await (const chunk of stream) {
      if (chunk.delta) {
        fullContent += chunk.delta;
        yield {
          type: 'text_delta',
          agentId: this.config.id,
          agentName: this.config.name,
          delta: chunk.delta,
        };
      }

      if (chunk.finishReason === 'stop') {
        yield {
          type: 'done',
          agentId: this.config.id,
          agentName: this.config.name,
        };
      }
    }
  }

  private buildMessages(messages: ChatMessage[]): ChatMessage[] {
    const systemMessage: ChatMessage = {
      role: 'system',
      content: this.config.systemPrompt,
    };
    return [systemMessage, ...messages];
  }

  private getAllTools(): ToolDefinition[] {
    const agentTools = this.config.tools ?? [];
    const executorTools = this.toolExecutor?.listAvailable() ?? [];
    return [...agentTools, ...executorTools];
  }
}

export function createAgent(
  config: Partial<AgentConfig> & Pick<AgentConfig, 'name' | 'systemPrompt' | 'model' | 'provider'>,
  runtime: ModelRuntime,
  toolExecutor?: ToolExecutor,
): Agent {
  const fullConfig: AgentConfig = {
    id: config.id ?? nanoid(),
    ...config,
  };
  return new Agent(fullConfig, runtime, toolExecutor);
}
