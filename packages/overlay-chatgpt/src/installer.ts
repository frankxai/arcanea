/**
 * ChatGPT / OpenAI Overlay Installer
 * Generates Custom GPT configs and system prompts for OpenAI integration.
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

export class ChatGPTOverlayInstaller implements OverlayInstaller {
  async canInstall(): Promise<boolean> {
    return true;
  }

  async detect(projectDir: string): Promise<ToolDetection> {
    return {
      provider: 'openai',
      detected: !!process.env.OPENAI_API_KEY || existsSync(join(projectDir, '.arcanea', 'chatgpt')),
      configPath: join(projectDir, '.arcanea', 'chatgpt'),
    };
  }

  async install(projectDir: string, level: OverlayLevel): Promise<InstallResult> {
    const filesCreated: string[] = [];
    const outDir = join(projectDir, '.arcanea', 'chatgpt');
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

    // 1. System prompt
    const prompt = generateSystemPrompt({ level, provider: 'openai' });
    const promptPath = join(outDir, 'system-prompt.md');
    writeFileSync(promptPath, prompt);
    filesCreated.push(relative(projectDir, promptPath));

    // 2. Custom GPT config (standard+)
    if (level !== 'minimal') {
      const gptConfig = {
        name: 'Arcanea Intelligence',
        description: 'AI companion enhanced with Arcanea Intelligence OS — Ten Guardians, Five Elements, living mythology for creators.',
        instructions: prompt,
        capabilities: { web_browsing: true, dalle: true, code_interpreter: true },
      };
      const configPath = join(outDir, 'custom-gpt-config.json');
      writeFileSync(configPath, JSON.stringify(gptConfig, null, 2));
      filesCreated.push(relative(projectDir, configPath));
    }

    // 3. Guardian GPTs (full+)
    if (level === 'full' || level === 'luminor') {
      const guardiansDir = join(outDir, 'guardian-gpts');
      if (!existsSync(guardiansDir)) mkdirSync(guardiansDir, { recursive: true });

      for (const g of GUARDIANS) {
        const guardianPrompt = generateSystemPrompt({
          level: 'standard',
          provider: 'openai',
          guardianDefault: g.name,
        });
        const guardianConfig = {
          name: `Arcanea — ${g.displayName}`,
          description: `${g.displayName}, Guardian of the ${g.gate} Gate (${g.frequency} Hz). Domain: ${g.domain}.`,
          instructions: guardianPrompt,
        };
        const gPath = join(guardiansDir, `${g.name}.json`);
        writeFileSync(gPath, JSON.stringify(guardianConfig, null, 2));
        filesCreated.push(relative(projectDir, gPath));
      }
    }

    // 4. SETUP.md (always)
    const setupContent = `# ChatGPT + Arcanea Setup Guide

## Quick Start (Custom Instructions)

1. Open ChatGPT → Settings → Personalization → Custom Instructions
2. In "What would you like ChatGPT to know about you?":
   - Paste the contents of \`system-prompt.md\`
3. Save and start a new conversation

## Custom GPT (Recommended)

For the best experience, create a Custom GPT:

1. Go to [ChatGPT GPT Editor](https://chatgpt.com/gpts/editor)
2. Click "Create a GPT"
3. In the "Configure" tab:
   - **Name**: Arcanea Intelligence
   - **Description**: AI companion enhanced with Arcanea Intelligence OS
   - **Instructions**: Paste contents of \`system-prompt.md\`
4. Enable capabilities: Web Browsing, DALL-E, Code Interpreter
5. Click "Save" → "Only me" (or share with your team)
${level !== 'minimal' ? `
## Guardian GPTs

For specialized guidance, create individual Guardian GPTs:

Each file in \`guardian-gpts/\` contains a pre-configured prompt for a specific Guardian.
Create separate Custom GPTs for your most-used Guardians:

- **Lyssandria** — Architecture, security, infrastructure
- **Draconia** — Performance, execution, velocity
- **Lyria** — Design, vision, creative direction
- **Leyla** — UX, flow, emotional resonance
- **Shinkami** — Orchestration, meta-architecture
` : ''}
## Notes

- ChatGPT does NOT auto-read project files — you must paste the system prompt manually
- Custom GPTs persist across conversations (recommended over Custom Instructions)
- Re-run \`arcanea install openai\` after updates to regenerate prompts
`;
    const setupPath = join(outDir, 'SETUP.md');
    writeFileSync(setupPath, setupContent);
    filesCreated.push(relative(projectDir, setupPath));

    // Write manifest
    const manifestDir = join(projectDir, '.arcanea');
    if (!existsSync(manifestDir)) mkdirSync(manifestDir, { recursive: true });
    const manifestPath = join(manifestDir, 'overlay-manifest.json');
    const now = new Date().toISOString();

    let manifest: Record<string, unknown> = {};
    if (existsSync(manifestPath)) {
      manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    } else {
      manifest = {
        arcanea: { coreVersion: '1.0.0', installedAt: now, updatedAt: now },
        overlays: {},
      };
    }

    const overlays = (manifest.overlays || {}) as Record<string, unknown>;
    overlays.openai = {
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
        'Copy system-prompt.md content to ChatGPT Custom Instructions',
        level !== 'minimal' ? 'Import custom-gpt-config.json to create a Custom GPT' : '',
      ].filter(Boolean),
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
      provider: 'openai',
      name: '@arcanea/overlay-chatgpt',
      version: '1.0.0',
      supportedLevels: ['minimal', 'standard', 'full', 'luminor'],
      capabilities: ['system-prompt', 'custom-gpt', 'assistants-api', 'vision'],
    };
  }

  async preview(_projectDir: string, level: OverlayLevel): Promise<InstallPreview> {
    const files: InstallPreview['filesToCreate'] = [
      { path: '.arcanea/chatgpt/system-prompt.md', description: 'System prompt for ChatGPT' },
      { path: '.arcanea/chatgpt/SETUP.md', description: 'Step-by-step setup guide' },
    ];
    if (level !== 'minimal') {
      files.push({ path: '.arcanea/chatgpt/custom-gpt-config.json', description: 'Custom GPT configuration' });
    }
    if (level === 'full' || level === 'luminor') {
      for (const g of GUARDIANS) {
        files.push({ path: `.arcanea/chatgpt/guardian-gpts/${g.name}.json`, description: `${g.displayName} GPT` });
      }
    }
    return { filesToCreate: files, filesToModify: [], estimatedSize: '~15KB' };
  }
}
