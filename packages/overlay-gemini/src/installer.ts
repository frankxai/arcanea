/**
 * Google Gemini Overlay Installer
 * Generates system instructions and Guardian prompts for Gemini integration.
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import type {
  OverlayInstaller,
  OverlayLevel,
  OverlayConfig,
  OverlayManifest,
  ToolDetection,
  InstallResult,
  InstallPreview,
} from '@arcanea/core';
import { generateSystemPrompt, GUARDIANS } from '@arcanea/core';

export class GeminiOverlayInstaller implements OverlayInstaller {
  async canInstall(): Promise<boolean> {
    return true;
  }

  async detect(projectDir: string): Promise<ToolDetection> {
    return {
      provider: 'gemini',
      detected: !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY),
      configPath: join(projectDir, '.arcanea', 'gemini'),
    };
  }

  async install(projectDir: string, level: OverlayLevel): Promise<InstallResult> {
    const filesCreated: string[] = [];
    const outDir = join(projectDir, '.arcanea', 'gemini');
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

    // 1. System instructions
    const prompt = generateSystemPrompt({ level, provider: 'gemini' });
    const promptPath = join(outDir, 'system-instructions.md');
    writeFileSync(promptPath, prompt);
    filesCreated.push(relative(projectDir, promptPath));

    // 2. Guardian prompts (standard+)
    if (level !== 'minimal') {
      const guardiansDir = join(outDir, 'guardian-prompts');
      if (!existsSync(guardiansDir)) mkdirSync(guardiansDir, { recursive: true });

      for (const g of GUARDIANS) {
        const gPrompt = `# ${g.displayName} — Gemini System Instruction\n\n${generateSystemPrompt({
          level: 'standard',
          provider: 'gemini',
          guardianDefault: g.name,
        })}`;
        const gPath = join(guardiansDir, `${g.name}.md`);
        writeFileSync(gPath, gPrompt);
        filesCreated.push(relative(projectDir, gPath));
      }
    }

    // 3. SETUP.md (always)
    const setupContent = `# Gemini + Arcanea Setup Guide

## Google AI Studio (Quick Start)

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click "Create new prompt" → "System instruction"
3. Paste the contents of \`system-instructions.md\`
4. Select your preferred model (Gemini 2.5 Flash recommended)
5. Start chatting with Arcanea-enhanced intelligence

## API Integration (TypeScript)

\`\`\`typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync } from 'fs';

const systemInstruction = readFileSync(
  '.arcanea/gemini/system-instructions.md',
  'utf-8'
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction,
});

const result = await model.generateContent('Help me build...');
console.log(result.response.text());
\`\`\`

## Vercel AI SDK Integration

\`\`\`typescript
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { readFileSync } from 'fs';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const systemInstruction = readFileSync(
  '.arcanea/gemini/system-instructions.md',
  'utf-8'
);

const { text } = await generateText({
  model: google('gemini-2.5-flash'),
  system: systemInstruction,
  prompt: 'Help me build...',
});
\`\`\`
${level !== 'minimal' ? `
## Guardian Prompts

Use Guardian-specific prompts for specialized guidance:

\`\`\`typescript
const guardianPrompt = readFileSync(
  '.arcanea/gemini/guardian-prompts/lyssandria.md',
  'utf-8'
);
// Use as system instruction for architecture tasks
\`\`\`
` : ''}
## Notes

- Gemini does NOT auto-read project files — system instructions must be set via API or AI Studio
- Re-run \`arcanea install gemini\` after updates to regenerate prompts
- Guardian prompts are pre-configured system instructions for each Gate
`;
    const setupPath = join(outDir, 'SETUP.md');
    writeFileSync(setupPath, setupContent);
    filesCreated.push(relative(projectDir, setupPath));

    // Update manifest
    const manifestDir = join(projectDir, '.arcanea');
    if (!existsSync(manifestDir)) mkdirSync(manifestDir, { recursive: true });
    const manifestPath = join(manifestDir, 'overlay-manifest.json');
    const now = new Date().toISOString();

    let manifest: Record<string, unknown> = existsSync(manifestPath)
      ? JSON.parse(readFileSync(manifestPath, 'utf-8'))
      : { arcanea: { coreVersion: '1.0.0', installedAt: now, updatedAt: now }, overlays: {} };

    const overlays = (manifest.overlays || {}) as Record<string, unknown>;
    overlays.gemini = {
      packageVersion: '1.0.0',
      level,
      installedAt: now,
      updatedAt: now,
      filesManaged: filesCreated,
      filesCustomized: [],
    };
    manifest.overlays = overlays;
    (manifest.arcanea as Record<string, unknown>).updatedAt = now;
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    return {
      success: true,
      filesCreated,
      filesModified: [],
      warnings: [],
      nextSteps: [
        'Copy system-instructions.md content to Gemini system instruction field',
        'Use guardian-prompts/ for specialized Guardian interactions',
      ],
    };
  }

  async update(projectDir: string): Promise<InstallResult> {
    return this.install(projectDir, 'standard');
  }

  async uninstall(): Promise<void> {
    // No-op for now
  }

  getManifest(): OverlayManifest {
    return {
      provider: 'gemini',
      name: '@arcanea/overlay-gemini',
      version: '1.0.0',
      supportedLevels: ['minimal', 'standard', 'full', 'luminor'],
      capabilities: ['system-prompt', 'vision'],
    };
  }

  async preview(_projectDir: string, level: OverlayLevel): Promise<InstallPreview> {
    const files: InstallPreview['filesToCreate'] = [
      { path: '.arcanea/gemini/system-instructions.md', description: 'Gemini system instructions' },
      { path: '.arcanea/gemini/SETUP.md', description: 'Step-by-step setup guide' },
    ];
    if (level !== 'minimal') {
      for (const g of GUARDIANS) {
        files.push({ path: `.arcanea/gemini/guardian-prompts/${g.name}.md`, description: `${g.displayName} prompt` });
      }
    }
    return { filesToCreate: files, filesToModify: [], estimatedSize: '~10KB' };
  }
}
