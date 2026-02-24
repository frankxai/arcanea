/**
 * Claude Code Overlay Installer
 * Installs the FULL Arcanea Intelligence OS into Claude Code projects.
 *
 * What gets installed by level:
 *   minimal  — CLAUDE.md + manifest
 *   standard — + 4 skills, 10 Guardian agents, 8 hooks, statusline, AgentDB, helpers
 *   full     — + /channel, /arcanea-status commands
 *   luminor  — + .arcanea/lore/ directory
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, chmodSync } from 'node:fs';
import { join, relative } from 'node:path';
import type {
  OverlayInstaller,
  OverlayLevel,
  OverlayConfig,
  OverlayManifest,
  ToolDetection,
  InstallResult,
  InstallPreview,
} from '@arcanea/os';
import { generateClaudeMd, OVERLAY_LEVELS, GUARDIANS } from '@arcanea/os';
import { generateSkillFile, getSkillIdsForLevel, generateAgentFile } from './generators.js';
import {
  getAllHookFiles,
  getAllHelperFiles,
  generateStatusline,
  generateHookSettings,
  generateAgentDBSchema,
  generateAgentDBInit,
} from './hook-generators.js';

export class ClaudeOverlayInstaller implements OverlayInstaller {
  async canInstall(projectDir: string): Promise<boolean> {
    return true;
  }

  async detect(projectDir: string): Promise<ToolDetection> {
    const hasClaudeDir = existsSync(join(projectDir, '.claude'));
    const hasClaudeMd = existsSync(join(projectDir, 'CLAUDE.md'));
    const hasMcpJson = existsSync(join(projectDir, '.mcp.json'));
    const hasManifest = existsSync(join(projectDir, '.arcanea', 'overlay-manifest.json'));

    let existingOverlay: OverlayConfig | undefined;
    if (hasManifest) {
      try {
        const manifest = JSON.parse(readFileSync(join(projectDir, '.arcanea', 'overlay-manifest.json'), 'utf-8'));
        existingOverlay = manifest.overlays?.claude;
      } catch {
        // Ignore parse errors
      }
    }

    return {
      provider: 'claude',
      detected: hasClaudeDir || hasClaudeMd || hasMcpJson,
      configPath: join(projectDir, '.claude'),
      existingOverlay,
    };
  }

  async install(projectDir: string, level: OverlayLevel, config?: Partial<OverlayConfig>): Promise<InstallResult> {
    const filesCreated: string[] = [];
    const filesModified: string[] = [];
    const warnings: string[] = [];

    // ── 1. Ensure directories ────────────────────────────────────────────
    const dirs = [
      join(projectDir, '.claude'),
      join(projectDir, '.claude', 'skills'),
      join(projectDir, '.arcanea'),
    ];

    if (level !== 'minimal') {
      dirs.push(
        join(projectDir, '.claude', 'agents', 'guardians'),
        join(projectDir, '.claude', 'hooks'),
        join(projectDir, '.claude', 'agentdb'),
        join(projectDir, '.claude', 'helpers'),
      );
    }
    if (level === 'full' || level === 'luminor') {
      dirs.push(join(projectDir, '.claude', 'commands'));
    }
    if (level === 'luminor') {
      dirs.push(join(projectDir, '.claude', 'lore'));
    }

    for (const dir of dirs) {
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    }

    // ── 2. Generate CLAUDE.md ────────────────────────────────────────────
    const claudeMdPath = join(projectDir, '.claude', 'CLAUDE.md');
    const projectName = projectDir.split('/').pop() || projectDir.split('\\').pop() || 'Project';
    const claudeMdContent = generateClaudeMd(level, projectName);

    if (existsSync(claudeMdPath)) {
      const existing = readFileSync(claudeMdPath, 'utf-8');
      if (!existing.includes('Arcanea Enhanced')) {
        writeFileSync(claudeMdPath, existing + '\n\n' + claudeMdContent);
        filesModified.push(relative(projectDir, claudeMdPath));
      } else {
        warnings.push('CLAUDE.md already contains Arcanea content — skipped');
      }
    } else {
      writeFileSync(claudeMdPath, claudeMdContent);
      filesCreated.push(relative(projectDir, claudeMdPath));
    }

    // ── 3. Install skills (standard+) ────────────────────────────────────
    if (level !== 'minimal') {
      const skillIds = getSkillIdsForLevel(level);
      for (const skillId of skillIds) {
        const skill = generateSkillFile(skillId, level);
        if (skill) {
          const skillPath = join(projectDir, '.claude', 'skills', skill.filename);
          if (!existsSync(skillPath)) {
            writeFileSync(skillPath, skill.content);
            filesCreated.push(relative(projectDir, skillPath));
          }
        }
      }
    }

    // ── 4. Install Guardian agents (standard+) ───────────────────────────
    if (level !== 'minimal') {
      for (const guardian of GUARDIANS) {
        const agent = generateAgentFile(guardian);
        const agentPath = join(projectDir, '.claude', 'agents', 'guardians', agent.filename);
        if (!existsSync(agentPath)) {
          writeFileSync(agentPath, agent.content);
          filesCreated.push(relative(projectDir, agentPath));
        }
      }
    }

    // ── 5. Install hooks (standard+) — THE SOUL OF THE SYSTEM ───────────
    if (level !== 'minimal') {
      const hookFiles = getAllHookFiles();
      for (const hook of hookFiles) {
        const hookPath = join(projectDir, '.claude', 'hooks', hook.filename);
        if (!existsSync(hookPath)) {
          writeFileSync(hookPath, hook.content);
          if (hook.executable) {
            try { chmodSync(hookPath, 0o755); } catch { /* Windows doesn't support chmod */ }
          }
          filesCreated.push(relative(projectDir, hookPath));
        }
      }

      // Install statusline
      const statuslinePath = join(projectDir, '.claude', 'statusline.mjs');
      if (!existsSync(statuslinePath)) {
        writeFileSync(statuslinePath, generateStatusline());
        filesCreated.push(relative(projectDir, statuslinePath));
      }

      // Install hook registration in settings.local.json
      const settingsPath = join(projectDir, '.claude', 'settings.local.json');
      const hookSettings = generateHookSettings(projectDir);
      if (existsSync(settingsPath)) {
        try {
          const existing = JSON.parse(readFileSync(settingsPath, 'utf-8'));
          if (!existing.hooks) {
            existing.hooks = (hookSettings as { hooks: object }).hooks;
            writeFileSync(settingsPath, JSON.stringify(existing, null, 2));
            filesModified.push(relative(projectDir, settingsPath));
          } else {
            warnings.push('settings.local.json already has hooks — skipped hook registration');
          }
        } catch {
          warnings.push('settings.local.json exists but could not be parsed — hook registration skipped');
        }
      } else {
        writeFileSync(settingsPath, JSON.stringify(hookSettings, null, 2));
        filesCreated.push(relative(projectDir, settingsPath));
      }
    }

    // ── 6. Install AgentDB (standard+) ──────────────────────────────────
    if (level !== 'minimal') {
      const schemaPath = join(projectDir, '.claude', 'agentdb', 'schema.sql');
      if (!existsSync(schemaPath)) {
        writeFileSync(schemaPath, generateAgentDBSchema());
        filesCreated.push(relative(projectDir, schemaPath));
      }

      const initPath = join(projectDir, '.claude', 'agentdb', 'init.sh');
      if (!existsSync(initPath)) {
        writeFileSync(initPath, generateAgentDBInit());
        try { chmodSync(initPath, 0o755); } catch { /* Windows */ }
        filesCreated.push(relative(projectDir, initPath));
      }
    }

    // ── 7. Install helper scripts (standard+) ───────────────────────────
    if (level !== 'minimal') {
      const helperFiles = getAllHelperFiles();
      for (const helper of helperFiles) {
        const helperPath = join(projectDir, '.claude', 'helpers', helper.filename);
        if (!existsSync(helperPath)) {
          writeFileSync(helperPath, helper.content);
          if (helper.executable) {
            try { chmodSync(helperPath, 0o755); } catch { /* Windows */ }
          }
          filesCreated.push(relative(projectDir, helperPath));
        }
      }
    }

    // ── 8. Install commands (full+) ─────────────────────────────────────
    if (level === 'full' || level === 'luminor') {
      const commands = [
        {
          name: 'channel',
          description: 'Channel a Guardian for specialized guidance',
          body: 'Activate the specified Guardian and channel their Gate energy for the current task.\n\nUsage: /channel <guardian-name>\n\nExamples:\n- /channel lyssandria — For security and infrastructure\n- /channel lyria — For design and vision\n- /channel shinkami — For orchestration and meta-tasks',
        },
        {
          name: 'arcanea-status',
          description: 'Show Arcanea overlay status',
          body: 'Display the current Arcanea overlay configuration, installed skills, active Guardians, and system status.',
        },
      ];

      for (const cmd of commands) {
        const cmdPath = join(projectDir, '.claude', 'commands', `${cmd.name}.md`);
        if (!existsSync(cmdPath)) {
          writeFileSync(cmdPath, `---\nname: ${cmd.name}\ndescription: ${cmd.description}\n---\n\n${cmd.body}\n`);
          filesCreated.push(relative(projectDir, cmdPath));
        }
      }
    }

    // ── 9. Write overlay manifest ───────────────────────────────────────
    const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');
    const now = new Date().toISOString();
    const manifest = {
      arcanea: { coreVersion: '1.0.0', installedAt: now, updatedAt: now },
      overlays: {
        claude: {
          packageVersion: '1.0.0',
          level,
          installedAt: now,
          updatedAt: now,
          filesManaged: [...filesCreated, ...filesModified],
          filesCustomized: [],
        },
      },
    };
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    filesCreated.push(relative(projectDir, manifestPath));

    return {
      success: true,
      filesCreated,
      filesModified,
      warnings,
      nextSteps: [
        'Restart Claude Code to activate hooks and statusline',
        'Run /channel <guardian> to activate a Guardian',
        'Run /arcanea-status to see your installation',
        'Run bash .claude/helpers/arcanea-health.sh to verify all subsystems',
      ],
    };
  }

  async update(projectDir: string): Promise<InstallResult> {
    const detection = await this.detect(projectDir);
    const level = detection.existingOverlay?.level || 'standard';
    return this.install(projectDir, level);
  }

  async uninstall(projectDir: string): Promise<void> {
    const manifestPath = join(projectDir, '.arcanea', 'overlay-manifest.json');
    if (!existsSync(manifestPath)) return;

    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    delete manifest.overlays?.claude;
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  }

  getManifest(): OverlayManifest {
    return {
      provider: 'claude',
      name: '@arcanea/overlay-claude',
      version: '1.0.0',
      supportedLevels: ['minimal', 'standard', 'full', 'luminor'],
      capabilities: ['system-prompt', 'slash-commands', 'skills', 'agents', 'mcp-servers', 'hooks', 'file-injection', 'workspace-context', 'statusline', 'agentdb', 'context-tracking', 'voice-enforcement', 'model-routing'],
    };
  }

  async preview(projectDir: string, level: OverlayLevel): Promise<InstallPreview> {
    const files: InstallPreview['filesToCreate'] = [
      { path: '.claude/CLAUDE.md', description: 'Arcanea-enhanced project instructions' },
      { path: '.arcanea/overlay-manifest.json', description: 'Overlay tracking manifest' },
    ];

    if (level !== 'minimal') {
      // Skills
      const skillIds = getSkillIdsForLevel(level);
      for (const skillId of skillIds) {
        files.push({ path: `.claude/skills/${skillId}.md`, description: `${skillId} skill` });
      }
      // Guardians
      for (const g of GUARDIANS) {
        files.push({ path: `.claude/agents/guardians/${g.displayName.toLowerCase()}.md`, description: `${g.displayName} Guardian agent` });
      }
      // Hooks
      const hookNames = [
        'session-start', 'prompt-submit', 'model-route', 'pre-tool',
        'voice-check', 'post-tool', 'context-tracker', 'session-end',
      ];
      for (const h of hookNames) {
        files.push({ path: `.claude/hooks/${h}.sh`, description: `${h} hook script` });
      }
      // Statusline
      files.push({ path: '.claude/statusline.mjs', description: 'Context-adaptive statusline' });
      // Settings
      files.push({ path: '.claude/settings.local.json', description: 'Hook registration config' });
      // AgentDB
      files.push({ path: '.claude/agentdb/schema.sql', description: 'AgentDB schema' });
      files.push({ path: '.claude/agentdb/init.sh', description: 'AgentDB initializer' });
      // Helpers
      files.push({ path: '.claude/helpers/arcanea-quick-status.sh', description: 'Quick status one-liner' });
      files.push({ path: '.claude/helpers/arcanea-health.sh', description: 'Health check script' });
    }

    if (level === 'full' || level === 'luminor') {
      files.push({ path: '.claude/commands/channel.md', description: 'Guardian channel command' });
      files.push({ path: '.claude/commands/arcanea-status.md', description: 'Status command' });
    }

    return {
      filesToCreate: files,
      filesToModify: existsSync(join(projectDir, '.claude', 'CLAUDE.md'))
        ? [{ path: '.claude/CLAUDE.md', description: 'Append Arcanea content' }]
        : [],
      estimatedSize: level === 'luminor' ? '~80KB' : level === 'full' ? '~60KB' : level === 'standard' ? '~50KB' : '~5KB',
    };
  }
}
