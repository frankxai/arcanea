#!/usr/bin/env node

import { Command } from "commander";
import pc from "picocolors";
import { VERSION, NAME, ORCHESTRATOR, AGENT_TEAMS, LUMINORS, MAGIC_WORDS } from "../index.js";
import { install, detectPlatforms } from "../install.js";
import { existsSync } from "fs";
import { join } from "path";

const program = new Command();

program
  .name(NAME)
  .description(`${ORCHESTRATOR} - The Creative Intelligence Platform`)
  .version(VERSION);

program
  .command("install")
  .description("Initialize Arcanea in current project")
  .option("-f, --force", "Overwrite existing configuration")
  .option("--claude-code", "Install only for Claude Code")
  .option("--opencode", "Install only for OpenCode")
  .option("--codex", "Install only for Codex")
  .option("--gemini", "Install only for Gemini CLI")
  .option("--cursor", "Install only for Cursor")
  .option("--all", "Install for all supported platforms")
  .option("--skip-mcp", "Skip MCP configuration")
  .action(async (options) => {
    const targetDir = process.cwd();
    
    let platforms = undefined;
    if (options.claudeCode) platforms = ["claude-code"];
    else if (options.opencode) platforms = ["opencode"];
    else if (options.codex) platforms = ["codex"];
    else if (options.gemini) platforms = ["gemini"];
    else if (options.cursor) platforms = ["cursor"];
    else if (options.all) platforms = ["claude-code", "opencode", "cursor", "codex", "gemini"];

    await install(targetDir, {
      force: options.force,
      platforms: platforms as any,
      skipMcp: options.skipMcp
    });
  });

program
  .command("detect")
  .description("Detect available AI coding platforms")
  .action(() => {
    console.log(pc.cyan(`\n${ORCHESTRATOR} Platform Detection\n`));
    
    const platforms = detectPlatforms();
    
    if (platforms.length === 0) {
      console.log(pc.yellow("No platforms detected. Will install for Claude Code and OpenCode by default."));
    } else {
      console.log(pc.bold("Detected platforms:"));
      for (const platform of platforms) {
        console.log(pc.green(`  ✓ ${platform}`));
      }
    }
    console.log();
  });

program
  .command("agents")
  .description("List available agent teams")
  .option("-t, --team <team>", "Show specific team details")
  .action((options) => {
    console.log(pc.cyan(`\n${ORCHESTRATOR}'s Agent Teams\n`));

    if (options.team) {
      const team = AGENT_TEAMS[options.team as keyof typeof AGENT_TEAMS];
      if (team) {
        console.log(pc.bold(team.name));
        console.log(pc.dim(team.description));
        console.log();
        console.log("  Agents:", team.agents.join(", "));
      } else {
        console.log(pc.red(`Unknown team: ${options.team}`));
        console.log("Available teams:", Object.keys(AGENT_TEAMS).join(", "));
      }
      return;
    }

    for (const [key, team] of Object.entries(AGENT_TEAMS)) {
      const colors: Record<string, (s: string) => string> = {
        creative: pc.blue,
        writing: pc.green,
        production: pc.magenta,
        research: pc.yellow,
        development: pc.cyan,
        teacher: pc.dim,
        visionary: pc.dim
      };
      const colorFn = colors[key] || pc.white;
      console.log(colorFn(pc.bold(team.name + ":")));
      console.log(`  ${team.agents.join(", ")}`);
      console.log();
    }
  });

program
  .command("luminors")
  .description("Show the Seven Luminors")
  .action(() => {
    console.log(pc.cyan("\nThe Seven Luminors\n"));
    console.log(pc.dim("Aspects of creative consciousness itself\n"));

    for (const [_, luminor] of Object.entries(LUMINORS)) {
      console.log(pc.bold(pc.yellow(`${luminor.name}`)) + ` - ${luminor.domain}`);
      console.log(pc.dim(`  When: ${luminor.when}`));
      console.log();
    }

    console.log(pc.dim("Channel a Luminor: /luminor [name] [challenge]"));
    console.log();
  });

program
  .command("magic")
  .description("Show magic words and their effects")
  .action(() => {
    console.log(pc.cyan("\nMagic Words\n"));

    console.log(pc.bold(pc.cyan("ultraworld")) + " (or " + pc.bold("ulw") + ")");
    console.log("  Fires ALL world-building agents in parallel");
    console.log("  World Architect + Character Creator + Lore Master + all specialists");
    console.log();

    console.log(pc.bold(pc.green("ultrawrite")) + " (or " + pc.bold("ulwr") + ")");
    console.log("  Fires ALL writing/editing agents in parallel");
    console.log("  Story Architect + Prose Weaver + Voice Alchemist + editors");
    console.log();

    console.log(pc.bold(pc.magenta("ultrabook")) + " (or " + pc.bold("ulb") + ")");
    console.log("  Complete book pipeline - everything at once");
    console.log("  World Building → Story → Chapters → Editing → Production");
    console.log();

    console.log(pc.dim("Just include any magic word in your prompt!"));
    console.log();
  });

program
  .command("status")
  .description("Check Arcanea installation status")
  .action(() => {
    const cwd = process.cwd();

    console.log(pc.cyan(`\n${ORCHESTRATOR} Status\n`));

    const platformChecks = [
      { path: ".claude", name: "Claude Code" },
      { path: ".opencode", name: "OpenCode" },
      { path: ".cursor", name: "Cursor" },
      { path: ".codex", name: "Codex" },
      { path: ".gemini", name: "Gemini CLI" }
    ];

    console.log(pc.bold("Platform installations:"));
    for (const check of platformChecks) {
      const agentsPath = join(cwd, check.path, "agents");
      const exists = existsSync(agentsPath);
      const status = exists ? pc.green("✓") : pc.dim("○");
      console.log(`  ${status} ${check.name}`);
    }

    console.log();
    console.log(pc.bold("Configuration:"));
    
    const configChecks = [
      { path: "arcanea.json", name: "Arcanea config" },
      { path: ".mcp.json", name: "MCP config" }
    ];

    let allGood = true;
    for (const check of configChecks) {
      const exists = existsSync(join(cwd, check.path));
      const status = exists ? pc.green("✓") : pc.red("✗");
      console.log(`  ${status} ${check.name}`);
      if (!exists) allGood = false;
    }

    console.log();
    if (allGood) {
      console.log(pc.green("Arcanea is ready!"));
    } else {
      console.log(pc.yellow("Run 'arcanea install' to complete setup."));
    }
    console.log();
  });

program.parse();
