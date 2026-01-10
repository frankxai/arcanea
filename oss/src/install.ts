import { cpSync, existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pc from "picocolors";
import { VERSION, ORCHESTRATOR, defaultConfig, Platform } from "./index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

  const packageRoot = join(__dirname, "..");

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

  // Platform-specific config
  if (platform === "claude-code") {
    await installClaudeCodeSettings(platformPath, force);
  } else if (platform === "opencode") {
    await installOpenCodeSettings(platformPath, packageRoot, force);
  }
}

async function installClaudeCodeSettings(platformPath: string, force: boolean): Promise<void> {
  const settingsPath = join(platformPath, "settings.json");
  
  if (!existsSync(settingsPath) || force) {
    const settings = {
      hooks: {
        UserPromptSubmit: [
          {
            matcher: "ultraworld|ulw",
            hooks: [{ type: "command", command: "echo 'ARCANEA: Activating ultraworld - full parallel world generation'" }]
          },
          {
            matcher: "ultrawrite|ulwr", 
            hooks: [{ type: "command", command: "echo 'ARCANEA: Activating ultrawrite - full parallel chapter writing'" }]
          },
          {
            matcher: "ultrabook|ulb",
            hooks: [{ type: "command", command: "echo 'ARCANEA: Activating ultrabook - complete book pipeline'" }]
          }
        ]
      }
    };
    writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    console.log(pc.green("  ✓ Created Claude Code settings with magic word hooks"));
  }
}

async function installOpenCodeSettings(platformPath: string, packageRoot: string, force: boolean): Promise<void> {
  const claudeMdPath = join(platformPath, "CLAUDE.md");
  const sourcePath = join(packageRoot, "CLAUDE.md");
  
  if (existsSync(sourcePath) && (!existsSync(claudeMdPath) || force)) {
    cpSync(sourcePath, claudeMdPath);
    console.log(pc.green("  ✓ Installed OpenCode CLAUDE.md"));
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
  console.log();

  console.log(pc.bold("Try:"));
  console.log(pc.dim("  /luminor Valora courage"));
  console.log(pc.dim("  /bestiary perfectionism"));
  console.log(pc.dim("  ultraworld: Create a volcanic island with dragon-kin"));
  console.log();
}
