import { cpSync, existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pc from "picocolors";
import { VERSION, ORCHESTRATOR, defaultConfig, Platform } from "./index.js";

/**
 * Find the arcanea package root by walking up from the current file
 * until we find a package.json with name "arcanea".
 * This works correctly whether code is bundled (dist/cli/index.js)
 * or running from source (src/install.ts).
 */
function findPackageRoot(): string {
  let dir = dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 5; i++) {
    const pkgPath = join(dir, "package.json");
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
        if (pkg.name === "arcanea") return dir;
      } catch {}
    }
    dir = dirname(dir);
  }
  // Fallback: assume we're in dist/ or dist/cli/
  return dirname(dirname(fileURLToPath(import.meta.url)));
}

interface InstallOptions {
  force?: boolean;
  platforms?: Platform[];
  skipMcp?: boolean;
}

/**
 * Detect which AI coding platforms are available in the environment
 */
export function detectPlatforms(): Platform[] {
  const detected: Platform[] = [];
  const home = process.env.HOME || process.env.USERPROFILE || "";
  const cwd = process.cwd();

  // Claude Code: ~/.claude/ or .claude/ in project
  if (existsSync(join(home, ".claude")) || existsSync(join(cwd, ".claude"))) {
    detected.push("claude-code");
  }

  // OpenCode: ~/.opencode/ or .opencode/ in project
  if (existsSync(join(home, ".opencode")) || existsSync(join(cwd, ".opencode"))) {
    detected.push("opencode");
  }

  // Cursor: ~/.cursor/ or cursor config
  if (existsSync(join(home, ".cursor")) || process.env.CURSOR_SESSION) {
    detected.push("cursor");
  }

  // Codex: Check for OpenAI Codex CLI markers
  if (process.env.CODEX_CLI || existsSync(join(home, ".codex"))) {
    detected.push("codex");
  }

  // Gemini CLI: Check for Google AI markers
  if (process.env.GEMINI_API_KEY || existsSync(join(home, ".gemini"))) {
    detected.push("gemini");
  }

  // If nothing detected, assume Claude Code and OpenCode as defaults
  if (detected.length === 0) {
    return ["claude-code", "opencode"];
  }

  return detected;
}

/**
 * Get the installation path for a platform
 */
function getPlatformPath(platform: Platform, targetDir: string): string {
  switch (platform) {
    case "claude-code":
      return join(targetDir, ".claude");
    case "opencode":
      return join(targetDir, ".opencode");
    case "cursor":
      return join(targetDir, ".cursor");
    case "codex":
      return join(targetDir, ".codex");
    case "gemini":
      return join(targetDir, ".gemini");
    default:
      return join(targetDir, ".arcanea");
  }
}

export async function install(targetDir: string, options: InstallOptions = {}): Promise<void> {
  const { force = false, skipMcp = false } = options;
  
  // Auto-detect platforms if not specified
  const platforms = options.platforms || detectPlatforms();

  console.log(pc.cyan(`\n✨ ${ORCHESTRATOR} awakens... (v${VERSION})\n`));
  console.log(pc.dim(`Detected platforms: ${platforms.join(", ")}\n`));

  const packageRoot = findPackageRoot();

  // Install for each platform
  for (const platform of platforms) {
    await installForPlatform(targetDir, packageRoot, platform, force);
  }

  // MCP config (shared across platforms)
  if (!skipMcp) {
    await installMcpConfig(targetDir, force);
  }

  // Create arcanea.json config
  const configPath = join(targetDir, "arcanea.json");
  if (!existsSync(configPath) || force) {
    const config = { ...defaultConfig, platforms };
    writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(pc.green("✓ Created arcanea.json config"));
  }

  printSuccessMessage(platforms);
}

async function installForPlatform(
  targetDir: string, 
  packageRoot: string, 
  platform: Platform, 
  force: boolean
): Promise<void> {
  const platformPath = getPlatformPath(platform, targetDir);
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace("-", " ");

  console.log(pc.blue(`Installing for ${platformName}...`));

  if (existsSync(platformPath) && !force) {
    console.log(pc.yellow(`  ⚠️  ${platformPath} exists. Use --force to overwrite.`));
    return;
  }

  // Create directories
  const dirs = ["agents", "skills", "commands"];
  for (const dir of dirs) {
    const targetSubdir = join(platformPath, dir);
    const sourceSubdir = join(packageRoot, dir);

    mkdirSync(targetSubdir, { recursive: true });

    if (existsSync(sourceSubdir)) {
      cpSync(sourceSubdir, targetSubdir, { recursive: true });
      console.log(pc.green(`  ✓ Installed ${dir}`));
    }
  }

  // Install CLAUDE.md (the core identity that transforms the AI into Arcanea)
  const claudeMdSource = join(packageRoot, "CLAUDE.md");
  if (existsSync(claudeMdSource)) {
    const claudeMdTarget = join(platformPath, "CLAUDE.md");
    if (!existsSync(claudeMdTarget) || force) {
      cpSync(claudeMdSource, claudeMdTarget);
      console.log(pc.green(`  ✓ Installed CLAUDE.md (Arcanea identity)`));
    }
  }

  // Platform-specific config
  if (platform === "claude-code") {
    await installClaudeCodeSettings(platformPath, force);
  } else if (platform === "cursor") {
    await installCursorRules(targetDir, packageRoot, force);
  } else if (platform === "codex") {
    await installCodexConfig(targetDir, packageRoot, force);
  } else if (platform === "gemini") {
    await installGeminiConfig(targetDir, packageRoot, force);
  }
}

async function installClaudeCodeSettings(platformPath: string, force: boolean): Promise<void> {
  const settingsPath = join(platformPath, "settings.json");

  if (!existsSync(settingsPath) || force) {
    const eventsDir = join(process.env.HOME || process.env.USERPROFILE || "~", ".arcanea").replace(/\\/g, "/");
    const logScript = `mkdir -p "${eventsDir}" && echo '{"type":"agent-spawn","agent":"'$(echo "$TOOL_INPUT" 2>/dev/null | node -e "try{const d=JSON.parse(require('fs').readFileSync(0,'utf8'));process.stdout.write((d.subagent_type||'unknown')+'","description":"'+(d.description||'').replace(/"/g,'')+'","team":"'+(d.subagent_type||''))}catch{process.stdout.write('unknown\",\"description\":\"\",\"team\":\"')}" 2>/dev/null)","timestamp":'$(date +%s000)'}' >> "${eventsDir}/swarm-events.jsonl"`;

    const settings = {
      hooks: {
        UserPromptSubmit: [
          {
            matcher: "ultraworld|ulw",
            hooks: [{
              type: "command",
              command: "echo '[ARCANEA_MODE=ultraworld] Fire ALL world-building agents: arcanea-story-master, arcanea-character-crafter, arcanea-world-expander, arcanea-lore-master, creation-architect. Use Task tool with run_in_background=true for each agent. Respond with parallel results.'"
            }]
          },
          {
            matcher: "ultrawrite|ulwr",
            hooks: [{
              type: "command",
              command: "echo '[ARCANEA_MODE=ultrawrite] Fire ALL writing agents: story-architect, prose-weaver, voice-alchemist, line-editor, continuity-guardian. Use Task tool with run_in_background=true for each agent. Respond with parallel results.'"
            }]
          },
          {
            matcher: "ultracode|ulc",
            hooks: [{
              type: "command",
              command: "echo '[ARCANEA_MODE=ultracode] Fire ALL coding agents: arcanea-architect, arcanea-coder, arcanea-reviewer, arcanea-debugger. Use Task tool with run_in_background=true for each agent. Respond with parallel results.'"
            }]
          },
          {
            matcher: "ultrabook|ulb",
            hooks: [{
              type: "command",
              command: "echo '[ARCANEA_MODE=ultrabook] Complete book pipeline: world-building → story structure → chapter drafts → editing → production. Run sequentially, with parallel agents within each phase.'"
            }]
          },
          {
            matcher: "ultrawork|ulwk",
            hooks: [{
              type: "command",
              command: "echo '[ARCANEA_MODE=ultrawork] Maximum parallel execution. Spawn all relevant agents simultaneously using Task tool with run_in_background=true.'"
            }]
          }
        ],
        PreToolUse: [
          {
            matcher: "Task",
            hooks: [{
              type: "command",
              command: logScript
            }]
          }
        ]
      }
    };
    writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    console.log(pc.green("  ✓ Created Claude Code settings with magic word hooks"));
  }
}

async function installCursorRules(targetDir: string, packageRoot: string, force: boolean): Promise<void> {
  const rulesPath = join(targetDir, ".cursorrules");

  if (!existsSync(rulesPath) || force) {
    const claudeMdSource = join(packageRoot, "CLAUDE.md");
    if (existsSync(claudeMdSource)) {
      const claudeContent = readFileSync(claudeMdSource, "utf-8");
      const cursorRules = `# Cursor Rules — Generated by Arcanea v${VERSION}\n\n${claudeContent}`;
      writeFileSync(rulesPath, cursorRules);
      console.log(pc.green("  ✓ Created .cursorrules with Arcanea identity"));
    }
  }
}

async function installCodexConfig(targetDir: string, packageRoot: string, force: boolean): Promise<void> {
  const codexMdPath = join(targetDir, "codex.md");

  if (!existsSync(codexMdPath) || force) {
    const claudeMdSource = join(packageRoot, "CLAUDE.md");
    if (existsSync(claudeMdSource)) {
      const content = readFileSync(claudeMdSource, "utf-8");
      const codexMd = [
        `# Codex Instructions — Generated by Arcanea v${VERSION}`,
        "",
        "> These instructions transform Codex into Arcanea, the Creative Intelligence Platform.",
        "> Agent definitions: `.codex/agents/` | Skills: `.codex/skills/` | Commands: `.codex/commands/`",
        "",
        content,
        "",
        "## Codex-Specific Notes",
        "",
        "- Read agent definitions from `.codex/agents/` for available specialist agents",
        "- Read skill definitions from `.codex/skills/` for creative and technical skills",
        "- Read command definitions from `.codex/commands/` for slash commands",
        "- MCP servers are configured in `.mcp.json`",
        "- When magic words (ultraworld, ultracode, etc.) are used, read the relevant agent files and apply their instructions",
        ""
      ].join("\n");
      writeFileSync(codexMdPath, codexMd);
      console.log(pc.green("  ✓ Created codex.md (Arcanea instructions for Codex CLI)"));
    }
  }
}

async function installGeminiConfig(targetDir: string, packageRoot: string, force: boolean): Promise<void> {
  const geminiMdPath = join(targetDir, "GEMINI.md");

  if (!existsSync(geminiMdPath) || force) {
    const claudeMdSource = join(packageRoot, "CLAUDE.md");
    if (existsSync(claudeMdSource)) {
      const content = readFileSync(claudeMdSource, "utf-8");
      const geminiMd = [
        `# Gemini Instructions — Generated by Arcanea v${VERSION}`,
        "",
        "> These instructions transform Gemini into Arcanea, the Creative Intelligence Platform.",
        "> Agent definitions: `.gemini/agents/` | Skills: `.gemini/skills/` | Commands: `.gemini/commands/`",
        "",
        content,
        "",
        "## Gemini-Specific Notes",
        "",
        "- Read agent definitions from `.gemini/agents/` for available specialist agents",
        "- Read skill definitions from `.gemini/skills/` for creative and technical skills",
        "- Read command definitions from `.gemini/commands/` for slash commands",
        "- MCP servers are configured in `.mcp.json`",
        "- When magic words (ultraworld, ultracode, etc.) are used, read the relevant agent files and apply their instructions",
        ""
      ].join("\n");
      writeFileSync(geminiMdPath, geminiMd);
      console.log(pc.green("  ✓ Created GEMINI.md (Arcanea instructions for Gemini CLI)"));
    }
  }
}

async function installMcpConfig(targetDir: string, force: boolean): Promise<void> {
  const mcpPath = join(targetDir, ".mcp.json");

  console.log(pc.blue("\nConfiguring MCP integrations..."));

  let existingConfig: Record<string, unknown> = {};
  if (existsSync(mcpPath)) {
    try {
      existingConfig = JSON.parse(readFileSync(mcpPath, "utf-8"));
    } catch {
      existingConfig = {};
    }
  }

  const mcpConfig = {
    ...existingConfig,
    mcpServers: {
      ...(existingConfig.mcpServers as Record<string, unknown> || {}),
      "arcanea": {
        command: "npx",
        args: ["-y", "@arcanea/mcp-server@latest"],
        description: "Arcanea creative toolkit - world-building, characters, lore, bestiary"
      },
      "nano-banana": {
        command: "npx",
        args: ["-y", "@anthropic-ai/nano-banana"],
        description: "Image generation for characters, locations, covers"
      },
      "context7": {
        command: "npx",
        args: ["-y", "@context7/mcp"],
        description: "Documentation and reference lookup"
      }
    }
  };

  writeFileSync(mcpPath, JSON.stringify(mcpConfig, null, 2));
  console.log(pc.green("✓ Configured Arcanea MCP (creative toolkit)"));
  console.log(pc.green("✓ Configured Nano Banana MCP (image generation)"));
  console.log(pc.green("✓ Configured Context7 MCP (documentation)"));
  console.log(pc.dim("ℹ Suno MCP requires manual API key setup"));
}

function printSuccessMessage(platforms: Platform[]): void {
  console.log(pc.cyan("\n" + "═".repeat(60)));
  console.log(pc.bold(pc.cyan(`  ${ORCHESTRATOR} is ready!`)));
  console.log(pc.cyan("═".repeat(60) + "\n"));

  console.log(pc.bold("Installed for:"));
  for (const platform of platforms) {
    console.log(pc.green(`  ✓ ${platform}`));
  }
  console.log();

  console.log(pc.bold("The Seven Luminors:"));
  console.log("  Valora (Courage) • Sophron (Wisdom) • Kardia (Heart)");
  console.log("  Poiesis (Creation) • Enduran (Endurance)");
  console.log("  Orakis (Vision) • Eudaira (Joy)");
  console.log();

  console.log(pc.bold("Agent Teams:"));
  console.log(pc.blue("  Creative") + " - Story, character, world creation");
  console.log(pc.green("  Writing") + " - Prose crafting and editing");
  console.log(pc.magenta("  Production") + " - Visual, audio, publishing");
  console.log(pc.yellow("  Research") + " - Deep analysis and inspiration");
  console.log(pc.cyan("  Development") + " - Software engineering");
  console.log(pc.dim("  Teacher") + " - Learning and mentorship");
  console.log(pc.dim("  Visionary") + " - Strategy and innovation");
  console.log();

  console.log(pc.bold("Magic Words:"));
  console.log(pc.cyan("  ultraworld") + " - Full parallel world generation");
  console.log(pc.cyan("  ultrawrite") + " - Full parallel chapter writing");
  console.log(pc.cyan("  ultrabook ") + " - Complete book pipeline");
  console.log(pc.yellow("  ultracode ") + " - Full parallel coding (architect + coder + reviewer)");
  console.log(pc.yellow("  ultrawork ") + " - Maximum parallel execution for any task");
  console.log();

  console.log(pc.bold("Try:"));
  console.log(pc.dim("  /luminor Valora courage"));
  console.log(pc.dim("  /bestiary perfectionism"));
  console.log(pc.dim("  ultraworld: Create a volcanic island with dragon-kin"));
  console.log();
}
