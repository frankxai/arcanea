/**
 * @arcanea/security — SafeExecutor
 *
 * Command injection protection and safe execution sandbox.
 * Assesses command risk, blocks dangerous patterns, and
 * provides a sandboxed execution environment.
 *
 * The Earth Gate does not merely warn — it blocks what must
 * never pass through.
 */

import { execFile } from 'child_process';
import type {
  CommandAssessment,
  RiskLevel,
  ExecutionOptions,
  ExecutionResult,
} from './types.js';

/**
 * Commands that are ALWAYS blocked. These are destructive
 * beyond recovery or represent fork bombs / disk wiping.
 */
const BLOCKED_COMMANDS: Array<{ pattern: RegExp; reason: string }> = [
  { pattern: /\brm\s+-rf\s+\/(?:\s|$)/, reason: 'Recursive deletion of root filesystem' },
  { pattern: /\brm\s+-rf\s+\/\*/, reason: 'Wildcard deletion of root filesystem' },
  { pattern: /\brm\s+-rf\s+~/, reason: 'Recursive deletion of home directory' },
  { pattern: /\bdd\s+if=/, reason: 'Low-level disk write (dd)' },
  { pattern: /:\(\)\s*\{\s*:\|:\s*&\s*\}\s*;:/, reason: 'Fork bomb' },
  { pattern: /\bmkfs\b/, reason: 'Filesystem format command' },
  { pattern: /\bshred\b/, reason: 'Secure file erasure' },
  { pattern: /\b>\s*\/dev\/sd[a-z]/, reason: 'Direct write to disk device' },
  { pattern: /\bchmod\s+-R\s+777\s+\/(?:\s|$)/, reason: 'Recursive world-writable root' },
  { pattern: /\bchown\s+-R\s+.*\s+\/(?:\s|$)/, reason: 'Recursive ownership change on root' },
  { pattern: /\b(shutdown|reboot|init\s+0|halt|poweroff)\b/, reason: 'System shutdown/reboot' },
  { pattern: /\biptables\s+-F/, reason: 'Firewall flush' },
];

/**
 * Commands that are safe at LOW risk. These are read-only or
 * standard development operations.
 */
const SAFE_COMMANDS: Array<{ pattern: RegExp; risk: RiskLevel }> = [
  { pattern: /^npm\s+test/, risk: 'low' },
  { pattern: /^npm\s+run\s+build/, risk: 'low' },
  { pattern: /^npm\s+run\s+lint/, risk: 'low' },
  { pattern: /^npm\s+run\s+type-check/, risk: 'low' },
  { pattern: /^npx\s+tsc/, risk: 'low' },
  { pattern: /^node\s+--test/, risk: 'low' },
  { pattern: /^git\s+status/, risk: 'low' },
  { pattern: /^git\s+log/, risk: 'low' },
  { pattern: /^git\s+diff/, risk: 'low' },
  { pattern: /^git\s+branch/, risk: 'low' },
  { pattern: /^git\s+show/, risk: 'low' },
  { pattern: /^ls\b/, risk: 'low' },
  { pattern: /^cat\b/, risk: 'low' },
  { pattern: /^head\b/, risk: 'low' },
  { pattern: /^tail\b/, risk: 'low' },
  { pattern: /^wc\b/, risk: 'low' },
  { pattern: /^echo\b/, risk: 'low' },
  { pattern: /^pwd$/, risk: 'low' },
  { pattern: /^whoami$/, risk: 'low' },
  { pattern: /^date$/, risk: 'low' },
  { pattern: /^pnpm\s+(test|build|lint|type-check)/, risk: 'low' },
];

/**
 * Patterns that indicate MEDIUM risk — modifying operations
 * within a project context.
 */
const MEDIUM_RISK_PATTERNS: RegExp[] = [
  /^npm\s+install/,
  /^npm\s+uninstall/,
  /^npm\s+update/,
  /^pnpm\s+(install|add|remove)/,
  /^git\s+(add|commit|push|pull|merge|rebase|checkout)/,
  /^mkdir\b/,
  /^cp\b/,
  /^mv\b/,
  /^touch\b/,
];

/**
 * Patterns that indicate HIGH risk — system-level or
 * potentially destructive operations.
 */
const HIGH_RISK_PATTERNS: RegExp[] = [
  /\bsudo\b/,
  /\brm\s+-rf\b/,
  /\brm\s+-r\b/,
  /\bchmod\b/,
  /\bchown\b/,
  /\bkill\b/,
  /\bpkill\b/,
  /\bkillall\b/,
  /\bdocker\s+rm/,
  /\bdocker\s+rmi/,
  /\bgit\s+reset\s+--hard/,
  /\bgit\s+push\s+--force/,
  /\bgit\s+clean\s+-f/,
];

/**
 * Patterns that indicate CRITICAL risk — network exfiltration,
 * piped execution, or credential access.
 */
const CRITICAL_RISK_PATTERNS: RegExp[] = [
  /\bcurl\b.*\|\s*\bbash\b/,
  /\bwget\b.*\|\s*\bbash\b/,
  /\bcurl\b.*\|\s*\bsh\b/,
  /\bwget\b.*\|\s*\bsh\b/,
  /\beval\s*\(/,
  /\bexec\s*\(/,
  /\bssh\s+-i/,
  /\bscp\b/,
  /\brsync\b.*--delete/,
  /\bnetcat\b/,
  /\bnc\s+-/,
  /\btelnet\b/,
];

/**
 * Shell metacharacters that indicate command chaining / injection.
 */
const INJECTION_INDICATORS: Array<{ pattern: RegExp; reason: string }> = [
  { pattern: /;\s*\w/, reason: 'Command chaining with semicolon' },
  { pattern: /\|\|/, reason: 'Logical OR command chaining' },
  { pattern: /&&/, reason: 'Logical AND command chaining' },
  { pattern: /\$\(/, reason: 'Command substitution $()' },
  { pattern: /`[^`]+`/, reason: 'Backtick command substitution' },
  { pattern: />\s*\//, reason: 'Redirect to absolute path' },
  { pattern: /\|\s*tee\s/, reason: 'Pipe to tee (potential data exfiltration)' },
];

export class SafeExecutor {
  private customAllowList: RegExp[] = [];
  private customBlockList: Array<{ pattern: RegExp; reason: string }> = [];

  /**
   * Assess whether a command is safe to execute.
   * Returns a detailed assessment with risk level and reasons.
   */
  isCommandSafe(command: string): CommandAssessment {
    const trimmed = command.trim();
    const reasons: string[] = [];

    // Empty command check
    if (!trimmed) {
      return {
        command: trimmed,
        safe: false,
        risk: 'low',
        reasons: ['Empty command'],
        blocked: true,
        matchedPattern: undefined,
      };
    }

    // Check BLOCKED commands first (always blocked, no exceptions)
    for (const entry of BLOCKED_COMMANDS) {
      if (entry.pattern.test(trimmed)) {
        return {
          command: trimmed,
          safe: false,
          risk: 'critical',
          reasons: [entry.reason],
          blocked: true,
          matchedPattern: entry.pattern.source,
        };
      }
    }

    // Check custom block list
    for (const entry of this.customBlockList) {
      if (entry.pattern.test(trimmed)) {
        return {
          command: trimmed,
          safe: false,
          risk: 'critical',
          reasons: [entry.reason],
          blocked: true,
          matchedPattern: entry.pattern.source,
        };
      }
    }

    // Check for injection indicators BEFORE safe-command matching,
    // because a "safe" command prefix (e.g. echo) can still contain
    // dangerous injection patterns like $() or backticks.
    for (const entry of INJECTION_INDICATORS) {
      if (entry.pattern.test(trimmed)) {
        reasons.push(entry.reason);
      }
    }

    // If injection indicators were found, skip safe/allow lists — the command is tainted
    if (reasons.length === 0) {
      // Check custom allow list
      for (const pattern of this.customAllowList) {
        if (pattern.test(trimmed)) {
          return {
            command: trimmed,
            safe: true,
            risk: 'low',
            reasons: ['Matched custom allow list'],
            blocked: false,
            matchedPattern: pattern.source,
          };
        }
      }

      // Check SAFE commands
      for (const entry of SAFE_COMMANDS) {
        if (entry.pattern.test(trimmed)) {
          return {
            command: trimmed,
            safe: true,
            risk: entry.risk,
            reasons: ['Known safe command pattern'],
            blocked: false,
            matchedPattern: entry.pattern.source,
          };
        }
      }
    }

    // Assess risk level based on patterns
    let risk: RiskLevel = 'medium';

    for (const pattern of CRITICAL_RISK_PATTERNS) {
      if (pattern.test(trimmed)) {
        risk = 'critical';
        reasons.push(`Critical risk pattern: ${pattern.source}`);
      }
    }

    if (risk !== 'critical') {
      for (const pattern of HIGH_RISK_PATTERNS) {
        if (pattern.test(trimmed)) {
          risk = 'high';
          reasons.push(`High risk pattern: ${pattern.source}`);
        }
      }
    }

    if (risk === 'medium') {
      for (const pattern of MEDIUM_RISK_PATTERNS) {
        if (pattern.test(trimmed)) {
          reasons.push('Standard modification command');
          break;
        }
      }
    }

    // Determine safety: blocked if critical, unsafe if high, needs review if medium
    const blocked = risk === 'critical';
    const safe = risk === 'medium' && reasons.length === 0;

    if (reasons.length === 0) {
      reasons.push('Unknown command — not in allow or block lists');
    }

    return {
      command: trimmed,
      safe,
      risk,
      reasons,
      blocked,
    };
  }

  /**
   * Execute a command with sandboxing constraints.
   * Only executes if the command passes safety assessment.
   */
  async executeCommand(
    command: string,
    opts: ExecutionOptions = {},
  ): Promise<ExecutionResult> {
    const assessment = this.isCommandSafe(command);

    if (assessment.blocked) {
      throw new Error(
        `Command blocked by security policy: ${assessment.reasons.join(', ')}`,
      );
    }

    if (!assessment.safe && !opts.allowedCommands?.some((a) => command.startsWith(a))) {
      throw new Error(
        `Command deemed unsafe (risk: ${assessment.risk}): ${assessment.reasons.join(', ')}`,
      );
    }

    const timeout = opts.timeout ?? 30_000;
    const maxOutput = opts.maxOutputSize ?? 1_048_576; // 1MB default

    return new Promise<ExecutionResult>((resolvePromise, reject) => {
      const startTime = Date.now();

      // Parse command into program + args for execFile (safer than exec)
      const parts = command.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
      const program = parts[0];
      const args = parts.slice(1).map((arg) =>
        arg.replace(/^["']|["']$/g, ''),
      );

      if (!program) {
        reject(new Error('No program specified in command'));
        return;
      }

      const child = execFile(
        program,
        args,
        {
          timeout,
          cwd: opts.cwd,
          env: opts.env ? { ...process.env, ...opts.env } : undefined,
          maxBuffer: maxOutput,
        },
        (error, stdout, stderr) => {
          const duration = Date.now() - startTime;
          const timedOut =
            error !== null &&
            'killed' in error &&
            error.killed === true;

          resolvePromise({
            exitCode:
              error && 'code' in error && typeof error.code === 'number'
                ? error.code
                : error
                  ? 1
                  : 0,
            stdout: stdout ?? '',
            stderr: stderr ?? '',
            timedOut,
            duration,
          });
        },
      );

      // Guard against stalled processes
      if (child.stdout) {
        let outputSize = 0;
        child.stdout.on('data', (chunk: Buffer) => {
          outputSize += chunk.length;
          if (outputSize > maxOutput) {
            child.kill('SIGTERM');
          }
        });
      }
    });
  }

  /**
   * Add patterns to the custom allow list.
   */
  addAllowPatterns(patterns: RegExp[]): void {
    this.customAllowList.push(...patterns);
  }

  /**
   * Add patterns to the custom block list.
   */
  addBlockPatterns(
    patterns: Array<{ pattern: RegExp; reason: string }>,
  ): void {
    this.customBlockList.push(...patterns);
  }

  /**
   * Get the current risk assessment for a command without executing it.
   * Alias for isCommandSafe — provided for semantic clarity.
   */
  assessRisk(command: string): CommandAssessment {
    return this.isCommandSafe(command);
  }
}
