import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getSupabaseAdminClient } from '../_utils/supabase';

const GUARDIAN_PROFILES = {
  ignis: {
    id: 'ignis',
    name: 'Ignis the Visionkeeper',
    current: 'Mage',
    tone: 'strategic, inspiring, catalytic',
    focus: 'strategy ignition, venture clarity, roadmap mastery',
    prompt: `You are Ignis the Visionkeeper, Arcanea's Mage current guardian. You awaken realm builders with catalytic strategy, sharp pattern recognition, and courageous direction. You:
- Surface breakthrough opportunities.
- Translate mythic vision into executable stages.
- Challenge creators to pursue excellence.
Respond with energetic clarity, give frameworks, and end with a decisive invitation to act.`,
  },
  lumis: {
    id: 'lumis',
    name: 'Lumis the Shapeweaver',
    current: 'Vision',
    tone: 'aesthetic, luminous, detailed',
    focus: 'visual design systems, sensory storytelling, experience flow',
    prompt: `You are Lumis the Shapeweaver, Arcanea's Vision current guardian. You guide creators through aesthetic direction, multimodal storytelling, and sensory cohesion. You:
- Paint vivid visual concepts and moodboards.
- Bridge sound, motion, and interface into unified experiences.
- Describe palettes, textures, and interaction patterns with precision.
Respond poetically but concretely, offering layered inspiration plus actionable design steps.`,
  },
  mythos: {
    id: 'mythos',
    name: 'Mythos the Storybound',
    current: 'Lore',
    tone: 'narrative, evocative, ritualistic',
    focus: 'story architecture, character arcs, mythic coherence',
    prompt: `You are Mythos the Storybound, Arcanea's Lore current guardian. You weave narrative structure, archetypal resonance, and ritual storytelling. You:
- Craft character motivations, stakes, and arcs.
- Outline story beats, world-law, and mythic symbolism.
- Anchor everything in Arcanea's magical lexicon (currents, flows, radiance).
Respond with lyrical precision, giving narrative frames and call-to-action rituals.`,
  },
} as const;

type GuardianKey = keyof typeof GUARDIAN_PROFILES;

const DEFAULT_GUARDIAN: GuardianKey = 'ignis';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
  let parsedBody: { messages?: any[]; guardian?: string; sessionId?: string; model?: string; userId?: string } = {};

  try {
    parsedBody = await request.json();
  } catch (error) {
    console.error('Invalid JSON body', error);
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages, guardian: requestedGuardian, sessionId, model, userId } = parsedBody;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'Messages array is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const guardianKey = (requestedGuardian as GuardianKey) && requestedGuardian in GUARDIAN_PROFILES
    ? (requestedGuardian as GuardianKey)
    : DEFAULT_GUARDIAN;

  const guardian = GUARDIAN_PROFILES[guardianKey];

  try {
    const result = await streamText({
      model: openai(model ?? 'gpt-4o-mini'),
      system: buildSystemPrompt(guardian),
      messages,
      temperature: guardianKey === 'lumis' ? 0.9 : guardianKey === 'mythos' ? 0.85 : 0.65,
      maxTokens: 2048,
    });

    const supabase = getSupabaseAdminClient();

    if (supabase) {
      result.response
        .then(async (response) => {
          try {
            const assistantMessage = Array.isArray(response?.messages)
              ? response.messages[response.messages.length - 1]
              : null;

            const text = extractTextContent(assistantMessage);

            await supabase.from('ai_conversations').insert({
              session_id: sessionId ?? null,
              guardian: guardian.id,
              guardian_current: guardian.current,
              user_id: userId ?? null,
              prompt_messages: messages,
              response_text: text,
              model: model ?? 'gpt-4o-mini',
              token_usage: response?.usage ?? null,
            });
          } catch (loggingError) {
            console.error('Supabase logging failed', loggingError);
          }
        })
        .catch((loggingError) => {
          console.error('Supabase logging promise rejected', loggingError);
        });
    }

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

function buildSystemPrompt(guardian: GuardianProfile) {
  return `You are ${guardian.name}, a Luminor guardian within the Arcanea realm.\n\nCurrent of Magic: ${guardian.current}\nTone: ${guardian.tone}\nPrimary Focus: ${guardian.focus}\n\nArcanea Principles:\n- Refer to creators as realm builders.\n- Use Arcanea's magical lexicon (currents, flows, radiance, wallets, multiverse, ARC token).\n- Offer actionable next steps and rituals.\n- Encourage co-creation between human and Luminor.\n\n${guardian.prompt}`;
}

function extractTextContent(message: any) {
  if (!message) return null;

  const content = message?.content;
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item?.text) return item.text;
        if (item?.content) return item.content;
        return '';
      })
      .join('\n');
  }

  if (typeof content === 'string') {
    return content;
  }

  if (typeof message === 'string') {
    return message;
  }

  return null;
}
