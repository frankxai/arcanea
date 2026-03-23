#!/usr/bin/env node

import { Command } from "commander";
import pc from "picocolors";
import { VERSION, NAME, ORCHESTRATOR, AGENT_TEAMS, LUMINORS, MAGIC_WORDS } from "../index.js";
import { install, detectPlatforms } from "../install.js";
import { startVizServer } from "../viz/index.js";
import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

function countMdFiles(dir: string): number {
  let count = 0;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    try {
      if (statSync(full).isDirectory()) {
        count += countMdFiles(full);
      } else if (entry.endsWith(".md")) {
        count++;
      }
    } catch {}
  }
  return count;
}

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

    console.log(pc.bold("Creative Magic:"));
    console.log(pc.bold(pc.cyan("  ultraworld")) + " (or ulw)  — Fire ALL world-building agents in parallel");
    console.log(pc.bold(pc.green("  ultrawrite")) + " (or ulwr) — Fire ALL writing/editing agents in parallel");
    console.log(pc.bold(pc.magenta("  ultrabook")) + "  (or ulb)  — Complete book pipeline end-to-end");
    console.log();

    console.log(pc.bold("Technical Magic:"));
    console.log(pc.bold(pc.yellow("  ultracode")) + " (or ulc)  — Fire ALL coding agents (architect + coder + reviewer)");
    console.log(pc.bold(pc.cyan("  ultrawork")) + " (or ulwk) — Maximum parallel execution for ANY task");
    console.log();

    console.log(pc.bold("Prefix Triggers:"));
    console.log(pc.dim("  arcanea: [task]") + "  — Invoke Arcanea's highest intelligence mode");
    console.log(pc.dim("  luminor: [task]") + "  — Apply Luminor wisdom to the task");
    console.log();

    console.log(pc.dim("Include any magic word in your prompt to activate!"));
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

program
  .command("doctor")
  .description("Diagnose Arcanea installation health")
  .action(() => {
    const cwd = process.cwd();
    let issues = 0;
    let ok = 0;

    console.log(pc.cyan(`\n${ORCHESTRATOR} Doctor (v${VERSION})\n`));
    console.log(pc.bold("Checking installation health...\n"));

    // Check CLAUDE.md
    const claudePaths = [
      join(cwd, ".claude", "CLAUDE.md"),
      join(cwd, ".opencode", "CLAUDE.md"),
      join(cwd, "CLAUDE.md")
    ];
    const hasClaudeMd = claudePaths.some(p => existsSync(p));
    if (hasClaudeMd) {
      console.log(pc.green("  ✓ CLAUDE.md found (Arcanea identity active)"));
      ok++;
    } else {
      console.log(pc.red("  ✗ No CLAUDE.md found — run 'arcanea install' to fix"));
      issues++;
    }

    // Check agents
    const agentPaths = [".claude/agents", ".opencode/agents"];
    const hasAgents = agentPaths.some(p => {
      const full = join(cwd, p);
      return existsSync(full) && readdirSync(full).length > 0;
    });
    if (hasAgents) {
      const agentDir = agentPaths.find(p => existsSync(join(cwd, p)))!;
      const count = countMdFiles(join(cwd, agentDir));
      console.log(pc.green(`  ✓ ${count} agent definitions installed`));
      ok++;
    } else {
      console.log(pc.red("  ✗ No agents installed — run 'arcanea install --force'"));
      issues++;
    }

    // Check skills
    const skillPaths = [".claude/skills", ".opencode/skills"];
    const hasSkills = skillPaths.some(p => {
      const full = join(cwd, p);
      return existsSync(full) && readdirSync(full).length > 0;
    });
    if (hasSkills) {
      console.log(pc.green("  ✓ Skills installed"));
      ok++;
    } else {
      console.log(pc.red("  ✗ No skills installed — run 'arcanea install --force'"));
      issues++;
    }

    // Check MCP config
    const mcpPath = join(cwd, ".mcp.json");
    if (existsSync(mcpPath)) {
      try {
        const mcp = JSON.parse(readFileSync(mcpPath, "utf-8"));
        const servers = Object.keys(mcp.mcpServers || {});
        const hasArcanea = servers.includes("arcanea");
        console.log(pc.green(`  ✓ MCP config: ${servers.length} servers configured`));
        if (!hasArcanea) {
          console.log(pc.yellow("    ⚠ Arcanea MCP server not configured — run 'arcanea install --force'"));
        }
        ok++;
      } catch {
        console.log(pc.red("  ✗ .mcp.json is invalid JSON"));
        issues++;
      }
    } else {
      console.log(pc.red("  ✗ No .mcp.json — run 'arcanea install'"));
      issues++;
    }

    // Check arcanea.json
    if (existsSync(join(cwd, "arcanea.json"))) {
      console.log(pc.green("  ✓ arcanea.json config exists"));
      ok++;
    } else {
      console.log(pc.yellow("  ○ No arcanea.json (optional)"));
    }

    // Check platform-specific instruction files
    const platformFiles = [
      { path: ".cursorrules", name: "Cursor (.cursorrules)" },
      { path: "codex.md", name: "Codex CLI (codex.md)" },
      { path: "GEMINI.md", name: "Gemini CLI (GEMINI.md)" }
    ];
    for (const pf of platformFiles) {
      if (existsSync(join(cwd, pf.path))) {
        console.log(pc.green(`  ✓ ${pf.name} configured`));
        ok++;
      }
    }

    // Summary
    console.log();
    if (issues === 0) {
      console.log(pc.green(pc.bold(`Health: ${ok} checks passed, 0 issues`)));
      console.log(pc.green("Arcanea is fully operational!"));
    } else {
      console.log(pc.yellow(pc.bold(`Health: ${ok} passed, ${issues} issues found`)));
      console.log(pc.dim("Run 'arcanea install --force' to fix issues."));
    }
    console.log();
  });

program
  .command("viz")
  .description("Launch real-time swarm visualization dashboard")
  .option("-p, --port <port>", "Server port", "3737")
  .option("--no-open", "Don't auto-open browser")
  .action((options) => {
    startVizServer(parseInt(options.port, 10));
  });

program.parse();
