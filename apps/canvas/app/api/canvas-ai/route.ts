import { NextRequest } from 'next/server';

/**
 * API Route: Canvas AI Agent
 *
 * Processes AI requests with canvas context. Streams responses back.
 * Supports both Google Gemini and Anthropic Claude via the existing
 * Arcanea AI core configuration.
 *
 * POST /api/canvas-ai
 * Body: { message: string, context: string, history: ChatMessage[] }
 */
export async function POST(req: NextRequest) {
  try {
    const { message, context, history } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Missing message' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build the system prompt for canvas agent
    const systemPrompt = buildCanvasAgentPrompt(context);

    // Build message history
    const messages = [
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    // Try Gemini first (already configured in the Arcanea ecosystem)
    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;

    if (apiKey) {
      return streamGeminiResponse(apiKey, systemPrompt, messages);
    }

    // Try Claude
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (anthropicKey) {
      return streamClaudeResponse(anthropicKey, systemPrompt, messages);
    }

    // No API key configured - return helpful error
    return new Response(
      'I\'m the Arcanea Canvas AI Agent. To enable me, add GOOGLE_AI_API_KEY or ANTHROPIC_API_KEY to your environment variables.\n\n' +
      'In the meantime, here\'s what I can see on your canvas:\n\n' +
      context +
      '\n\nOnce configured, I can:\n- Summarize board contents\n- Generate new nodes from prompts\n- Connect and organize your ideas\n- Create code, documents, and more',
      {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function buildCanvasAgentPrompt(context: string): string {
  return `You are the Arcanea Canvas AI Agent - a spatial intelligence assistant that helps creators organize, expand, and connect ideas on an infinite canvas.

## Your Capabilities
- Analyze the canvas contents and provide insights
- Suggest connections between ideas
- Help brainstorm and expand on topics
- Generate structured content (documents, code, summaries)
- Help organize and categorize canvas objects

## Canvas Context
${context}

## Action Commands
When you want to create objects on the canvas, include action commands in your response:
- [ACTION:CREATE:sticky-note|Title|Content text] - Creates a sticky note
- [ACTION:CREATE:card|Title|Description] - Creates a card
- [ACTION:CREATE:markdown-doc|Title|Markdown content] - Creates a document
- [ACTION:CREATE:code-block|Title|Code content] - Creates a code block
- [ACTION:CONNECT:sourceId|targetId|Label] - Connects two nodes

## Guidelines
- Be concise and actionable
- When brainstorming, create actual canvas objects using ACTION commands
- Reference specific nodes by their titles when discussing them
- Suggest spatial organization strategies when relevant
- Match the elevated but accessible tone of the Arcanea universe`;
}

async function streamGeminiResponse(
  apiKey: string,
  systemPrompt: string,
  messages: { role: string; content: string }[]
) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${apiKey}&alt=sse`;

  const contents = messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  // Transform SSE stream to plain text stream
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        controller.close();
        return;
      }

      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Parse SSE events
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}

async function streamClaudeResponse(
  apiKey: string,
  systemPrompt: string,
  messages: { role: string; content: string }[]
) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      })),
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${error}`);
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        controller.close();
        return;
      }

      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const event = JSON.parse(line.slice(6));
                if (event.type === 'content_block_delta' && event.delta?.text) {
                  controller.enqueue(encoder.encode(event.delta.text));
                }
              } catch {
                // Skip
              }
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
