import type { Guardian } from './guardians.js';
import type { Message } from './utils/storage.js';

export type Provider = 'anthropic' | 'google' | 'openai';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamChunk {
  type: 'delta' | 'done' | 'error';
  text?: string;
  error?: string;
}

export type StreamCallback = (chunk: StreamChunk) => void;

export interface ChatOptions {
  guardian: Guardian;
  messages: Message[];
  userMessage: string;
  pageContext?: string | undefined;
  apiKeys: Record<string, string>;
  provider: Provider;
  onChunk: StreamCallback;
}

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface GoogleMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const RATE_LIMIT = {
  maxRequestsPerMinute: 20,
  requests: [] as number[],
};

function checkRateLimit(): boolean {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  RATE_LIMIT.requests = RATE_LIMIT.requests.filter(t => t > oneMinuteAgo);

  if (RATE_LIMIT.requests.length >= RATE_LIMIT.maxRequestsPerMinute) {
    return false;
  }

  RATE_LIMIT.requests.push(now);
  return true;
}

function buildSystemPrompt(guardian: Guardian, pageContext?: string): string {
  let prompt = guardian.systemPrompt;

  if (pageContext) {
    prompt += `\n\n---\n\nYou have been given context from the webpage the user is currently viewing. Use this to provide relevant, grounded assistance:\n\n${pageContext}`;
  }

  return prompt;
}

function formatHistoryForAI(messages: Message[]): AnthropicMessage[] {
  // Take last 20 messages for context
  return messages
    .slice(-20)
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));
}

async function streamAnthropic(
  apiKey: string,
  systemPrompt: string,
  history: AnthropicMessage[],
  userMessage: string,
  onChunk: StreamCallback
): Promise<void> {
  const messages: AnthropicMessage[] = [
    ...history,
    { role: 'user', content: userMessage },
  ];

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      system: systemPrompt,
      messages,
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${error}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') {
            onChunk({ type: 'done' });
            return;
          }
          try {
            const parsed = JSON.parse(data) as {
              type: string;
              delta?: { type: string; text?: string };
            };
            if (
              parsed.type === 'content_block_delta' &&
              parsed.delta?.type === 'text_delta' &&
              parsed.delta.text
            ) {
              onChunk({ type: 'delta', text: parsed.delta.text });
            }
          } catch {
            // Skip malformed SSE data
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  onChunk({ type: 'done' });
}

async function streamGoogle(
  apiKey: string,
  systemPrompt: string,
  history: AnthropicMessage[],
  userMessage: string,
  onChunk: StreamCallback
): Promise<void> {
  const contents: GoogleMessage[] = [
    // Include system as first user turn for Gemini
    {
      role: 'user',
      parts: [{ text: `[System Instructions]\n${systemPrompt}\n\n[User Message]\n${userMessage}` }],
    },
  ];

  // Convert history (excluding the user message we just added)
  const historyMessages: GoogleMessage[] = history.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  // Build properly: system context in first turn, then history, then current
  const finalContents: GoogleMessage[] =
    historyMessages.length > 0
      ? [
          { role: 'user', parts: [{ text: `[System Instructions]\n${systemPrompt}` }] },
          { role: 'model', parts: [{ text: 'Understood. I am ready to assist.' }] },
          ...historyMessages,
          { role: 'user', parts: [{ text: userMessage }] },
        ]
      : contents;

  const model = 'gemini-2.0-flash-exp';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: finalContents,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Google API error ${response.status}: ${error}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          try {
            const parsed = JSON.parse(data) as {
              candidates?: Array<{
                content?: { parts?: Array<{ text?: string }> };
                finishReason?: string;
              }>;
            };
            const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              onChunk({ type: 'delta', text });
            }
            if (parsed.candidates?.[0]?.finishReason === 'STOP') {
              onChunk({ type: 'done' });
              return;
            }
          } catch {
            // Skip malformed data
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  onChunk({ type: 'done' });
}

async function streamOpenAI(
  apiKey: string,
  systemPrompt: string,
  history: AnthropicMessage[],
  userMessage: string,
  onChunk: StreamCallback
): Promise<void> {
  const messages: OpenAIMessage[] = [
    { role: 'system', content: systemPrompt },
    ...history.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user', content: userMessage },
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      max_tokens: 2048,
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${error}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') {
            onChunk({ type: 'done' });
            return;
          }
          try {
            const parsed = JSON.parse(data) as {
              choices?: Array<{
                delta?: { content?: string };
                finish_reason?: string;
              }>;
            };
            const text = parsed.choices?.[0]?.delta?.content;
            if (text) {
              onChunk({ type: 'delta', text });
            }
          } catch {
            // Skip malformed data
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  onChunk({ type: 'done' });
}

export async function streamChat(options: ChatOptions): Promise<void> {
  const { guardian, messages, userMessage, pageContext, apiKeys, provider, onChunk } = options;

  if (!checkRateLimit()) {
    onChunk({
      type: 'error',
      error: 'Rate limit reached. Please wait a moment before sending another message.',
    });
    return;
  }

  const systemPrompt = buildSystemPrompt(guardian, pageContext);
  const history = formatHistoryForAI(messages);

  try {
    switch (provider) {
      case 'anthropic': {
        const key = apiKeys['anthropic'];
        if (!key) {
          onChunk({ type: 'error', error: 'Anthropic API key not configured. Please add your key in Settings.' });
          return;
        }
        await streamAnthropic(key, systemPrompt, history, userMessage, onChunk);
        break;
      }
      case 'google': {
        const key = apiKeys['google'];
        if (!key) {
          onChunk({ type: 'error', error: 'Google AI API key not configured. Please add your key in Settings.' });
          return;
        }
        await streamGoogle(key, systemPrompt, history, userMessage, onChunk);
        break;
      }
      case 'openai': {
        const key = apiKeys['openai'];
        if (!key) {
          onChunk({ type: 'error', error: 'OpenAI API key not configured. Please add your key in Settings.' });
          return;
        }
        await streamOpenAI(key, systemPrompt, history, userMessage, onChunk);
        break;
      }
      default:
        onChunk({ type: 'error', error: `Unknown provider: ${provider as string}` });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred';
    onChunk({ type: 'error', error: message });
  }
}

export function getProviderName(provider: Provider): string {
  const names: Record<Provider, string> = {
    anthropic: 'Claude (Anthropic)',
    google: 'Gemini (Google)',
    openai: 'GPT-4o (OpenAI)',
  };
  return names[provider];
}

export function getProviderModel(provider: Provider): string {
  const models: Record<Provider, string> = {
    anthropic: 'claude-opus-4-6',
    google: 'gemini-2.0-flash-exp',
    openai: 'gpt-4o',
  };
  return models[provider];
}
