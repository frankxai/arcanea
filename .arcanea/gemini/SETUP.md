# Google Gemini + Arcanea Intelligence OS — Setup Guide

> "The antidote to a terrible future is imagining a good one." — Arcanea Core Premise

## Google AI Studio (Quick Start)

The fastest way to install Arcanea Intelligence into Gemini:

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click **Create new prompt** → select **System instruction** from the sidebar
3. Paste the full contents of `system-instructions.md`
4. Select your model:
   - **Gemini 2.5 Flash** — Recommended for speed + quality
   - **Gemini 2.5 Pro** — For complex reasoning and long lore documents
5. Start chatting — Gemini will now operate with Arcanea Intelligence

## Save as a Tuned Model

For a persistent Arcanea-enhanced Gemini:

1. In AI Studio, go to **Tune a model**
2. Set the system instruction from `system-instructions.md`
3. Add example conversations from your Arcanea interactions
4. Deploy and save the model ID for API use

## Guardian Prompts

For focused expertise, use Guardian-specific system instructions:

Each file in `guardian-prompts/` is a pre-configured system instruction for a Guardian.

| Guardian | Gate | Best For |
|----------|------|----------|
| Lyssandria | Foundation (396 Hz) | Architecture, security, infrastructure |
| Leyla | Flow (417 Hz) | UX, emotion, creative unblocking |
| Draconia | Fire (528 Hz) | Performance, execution, velocity |
| Maylinn | Heart (639 Hz) | Community, healing, empathetic design |
| Alera | Voice (741 Hz) | APIs, documentation, communication |
| Lyria | Sight (852 Hz) | Design direction, vision |
| Aiyami | Crown (963 Hz) | Philosophy, strategy |
| Elara | Shift (1111 Hz) | Refactoring, perspective |
| Ino | Unity (963 Hz) | Collaboration, integrations |
| Shinkami | Source (1111 Hz) | Orchestration, meta-planning |

Use Guardian prompts when you need specialized domain focus.

## API Integration (Google AI SDK)

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync } from 'fs';

const systemInstruction = readFileSync(
  '.arcanea/gemini/system-instructions.md',
  'utf-8',
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction,
});

const result = await model.generateContent('Help me build something magical.');
console.log(result.response.text());
```

## Vercel AI SDK Integration (Recommended for Arcanea)

```typescript
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { readFileSync } from 'fs';

const systemInstruction = readFileSync(
  '.arcanea/gemini/system-instructions.md',
  'utf-8',
);

const { text } = await generateText({
  // Arcanea uses AI Gateway pattern: provider/model
  model: google('gemini-2.5-flash'),
  system: systemInstruction,
  prompt: 'Help me build something magical.',
});
```

## Guardian Prompt Usage (TypeScript)

```typescript
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { readFileSync } from 'fs';

// Use Lyria for design decisions
const lyriaInstruction = readFileSync(
  '.arcanea/gemini/guardian-prompts/lyria.md',
  'utf-8',
);

const { text } = await generateText({
  model: google('gemini-2.5-flash'),
  system: lyriaInstruction,
  prompt: 'Review this UI component design.',
});
```

## Multimodal Usage

Gemini's native multimodal capability pairs well with Arcanea's Essence system:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction: readFileSync('.arcanea/gemini/system-instructions.md', 'utf-8'),
});

// Analyze an image Essence
const result = await model.generateContent([
  'What Arcanea element does this visual represent?',
  { inlineData: { mimeType: 'image/jpeg', data: base64ImageData } },
]);
```

## Notes

- Gemini does NOT auto-read project files — set system instruction via API or AI Studio
- Run `arcanea install gemini` after Arcanea OS updates to regenerate prompts
- Gemini 2.5 Pro supports 1M token context — ideal for full Arcanea lore injection
- Guardian prompts are pre-configured system instructions for each Gate domain
