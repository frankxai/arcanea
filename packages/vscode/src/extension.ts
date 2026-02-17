import * as vscode from 'vscode';
import { GuardianStatusBar } from './status-bar';
import { GuardianPanelProvider } from './guardian-panel';
import { GateProgressProvider } from './gate-progress';
import { LoreExplorerProvider } from './lore-explorer';
import { GUARDIANS, routeToGuardian } from './guardians';

let statusBar: GuardianStatusBar;

export function activate(context: vscode.ExtensionContext) {
  // Status bar
  statusBar = new GuardianStatusBar();
  context.subscriptions.push(statusBar);

  // Sidebar providers
  const guardianPanel = new GuardianPanelProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('arcanea.guardianPanel', guardianPanel)
  );

  const gateProgress = new GateProgressProvider();
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('arcanea.gateProgress', gateProgress)
  );

  const loreExplorer = new LoreExplorerProvider();
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('arcanea.loreExplorer', loreExplorer)
  );

  // Commands
  context.subscriptions.push(
    vscode.commands.registerCommand('arcanea.routeGuardian', async () => {
      const input = await vscode.window.showInputBox({
        prompt: 'Describe your task to route to the optimal Guardian',
        placeHolder: 'e.g., "design a landing page" or "fix database performance"'
      });
      if (!input) return;

      const result = routeToGuardian(input);
      const guardian = GUARDIANS[result.guardian];

      vscode.window.showInformationMessage(
        `${guardian.symbol} ${guardian.name} (${guardian.element}, ${result.confidence}% confidence): ${guardian.domain}`
      );

      // Update status bar
      const config = vscode.workspace.getConfiguration('arcanea');
      await config.update('activeGuardian', result.guardian, vscode.ConfigurationTarget.Global);
      statusBar.update(result.guardian);
    }),

    vscode.commands.registerCommand('arcanea.conveneCouncil', async () => {
      const input = await vscode.window.showInputBox({
        prompt: 'What challenge should the Guardian Council deliberate on?',
        placeHolder: 'Describe a complex decision spanning multiple domains'
      });
      if (!input) return;

      const panel = vscode.window.createWebviewPanel(
        'arcanea.council',
        'Guardian Council',
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      panel.webview.html = getCouncilHtml(input);
    }),

    vscode.commands.registerCommand('arcanea.checkVoice', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage('Open a file to check voice');
        return;
      }

      const selection = editor.selection;
      const text = selection.isEmpty
        ? editor.document.getText()
        : editor.document.getText(selection);

      const issues = checkVoice(text);
      if (issues.length === 0) {
        vscode.window.showInformationMessage('Voice check passed — text aligns with Arcanea Voice Bible v2.0');
      } else {
        const message = issues.map(i => `- ${i}`).join('\n');
        vscode.window.showWarningMessage(`Voice issues found:\n${message}`);
      }
    }),

    vscode.commands.registerCommand('arcanea.queryLore', async () => {
      const input = await vscode.window.showInputBox({
        prompt: 'Ask about Arcanea lore',
        placeHolder: 'e.g., "Who is Draconis?" or "What are the Five Elements?"'
      });
      if (!input) return;

      vscode.window.showInformationMessage(`Lore query: "${input}" — connect MCP server for full responses`);
    }),

    vscode.commands.registerCommand('arcanea.showDesignTokens', () => {
      const panel = vscode.window.createWebviewPanel(
        'arcanea.tokens',
        'Arcanea Design Tokens',
        vscode.ViewColumn.One,
        { enableScripts: true }
      );
      panel.webview.html = getDesignTokensHtml();
    }),

    vscode.commands.registerCommand('arcanea.openGate', async () => {
      const gates = [
        'Foundation (396 Hz)', 'Flow (417 Hz)', 'Fire (528 Hz)',
        'Heart (639 Hz)', 'Voice (741 Hz)', 'Sight (852 Hz)',
        'Crown (963 Hz)', 'Shift (1111 Hz)', 'Unity (963 Hz)', 'Source (1111 Hz)'
      ];
      const selected = await vscode.window.showQuickPick(gates, {
        placeHolder: 'Select a Gate to explore'
      });
      if (selected) {
        vscode.window.showInformationMessage(`Opening ${selected}...`);
      }
    })
  );

  // Initialize status bar with config
  const config = vscode.workspace.getConfiguration('arcanea');
  const activeGuardian = config.get<string>('activeGuardian') || 'shinkami';
  statusBar.update(activeGuardian);

  console.log('Arcanea Realm activated');
}

export function deactivate() {
  statusBar?.dispose();
}

function checkVoice(text: string): string[] {
  const issues: string[] = [];
  const lower = text.toLowerCase();

  if (lower.includes('user') && !lower.includes('user-')) {
    issues.push('Say "creator" instead of "user"');
  }
  if (lower.includes('platform') && !lower.includes('cross-platform')) {
    issues.push('Say "realm" or "world" instead of "platform"');
  }
  if (lower.includes("i'd be happy to help")) {
    issues.push('Avoid generic AI assistant language');
  }
  if (lower.includes('leverage') || lower.includes('synergy')) {
    issues.push('Avoid corporate buzzwords');
  }
  if (lower.includes('ecosystem play')) {
    issues.push('Avoid "ecosystem play" — say "connected system" or "living world"');
  }

  return issues;
}

function getCouncilHtml(challenge: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0e14; color: #e2e8f0; font-family: 'Segoe UI', sans-serif; padding: 20px; }
    h1 { color: #ffd700; font-size: 1.4em; }
    h2 { color: #7fffd4; font-size: 1.1em; margin-top: 20px; }
    .challenge { background: #151a22; border-left: 3px solid #ffd700; padding: 12px; margin: 16px 0; border-radius: 4px; }
    .guardian { background: #1a2030; padding: 12px; margin: 8px 0; border-radius: 6px; border-left: 3px solid; }
    .note { color: #64748b; font-style: italic; margin-top: 24px; }
  </style>
</head>
<body>
  <h1>Guardian Council Convened</h1>
  <div class="challenge">${escapeHtml(challenge)}</div>
  <p class="note">Connect @arcanea/mcp-server for full Guardian Council deliberation with all 10 perspectives.</p>
  <h2>Guardians Available</h2>
  <div class="guardian" style="border-color: #4ade80;">Lyssandria — Foundation (Earth, 396 Hz)</div>
  <div class="guardian" style="border-color: #78a6ff;">Leyla — Flow (Water, 417 Hz)</div>
  <div class="guardian" style="border-color: #ff6b35;">Draconia — Fire (Fire, 528 Hz)</div>
  <div class="guardian" style="border-color: #f472b6;">Maylinn — Heart (Wind, 639 Hz)</div>
  <div class="guardian" style="border-color: #e879f9;">Alera — Voice (Void, 741 Hz)</div>
  <div class="guardian" style="border-color: #a855f7;">Lyria — Sight (Spirit, 852 Hz)</div>
  <div class="guardian" style="border-color: #fbbf24;">Aiyami — Crown (Spirit, 963 Hz)</div>
  <div class="guardian" style="border-color: #06b6d4;">Elara — Shift (Void, 1111 Hz)</div>
  <div class="guardian" style="border-color: #14b8a6;">Ino — Unity (Spirit, 963 Hz)</div>
  <div class="guardian" style="border-color: #ffd700;">Shinkami — Source (Source, 1111 Hz)</div>
</body>
</html>`;
}

function getDesignTokensHtml(): string {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0e14; color: #e2e8f0; font-family: 'Segoe UI', sans-serif; padding: 20px; }
    h1 { color: #ffd700; }
    h2 { color: #7fffd4; margin-top: 24px; }
    .swatch { display: inline-block; width: 60px; height: 60px; border-radius: 8px; margin: 4px; vertical-align: top; }
    .swatch-label { display: inline-block; width: 60px; text-align: center; font-size: 10px; color: #64748b; margin: 0 4px; }
    .section { margin: 16px 0; }
    code { background: #151a22; padding: 2px 6px; border-radius: 3px; color: #7fffd4; }
  </style>
</head>
<body>
  <h1>Arcanea Design Tokens</h1>

  <h2>Cosmic Palette</h2>
  <div class="section">
    <div><div class="swatch" style="background:#0b0e14;border:1px solid #1e293b;"></div><div class="swatch" style="background:#0f1319;"></div><div class="swatch" style="background:#151a22;"></div><div class="swatch" style="background:#1a2030;"></div><div class="swatch" style="background:#232d3f;"></div></div>
    <div><div class="swatch-label">void</div><div class="swatch-label">deep</div><div class="swatch-label">surface</div><div class="swatch-label">raised</div><div class="swatch-label">elevated</div></div>
  </div>

  <h2>Arcane Colors</h2>
  <div class="section">
    <div><div class="swatch" style="background:#7fffd4;"></div><div class="swatch" style="background:#ffd700;"></div><div class="swatch" style="background:#9966ff;"></div><div class="swatch" style="background:#78a6ff;"></div><div class="swatch" style="background:#a5f3fc;"></div></div>
    <div><div class="swatch-label">teal</div><div class="swatch-label">gold</div><div class="swatch-label">violet</div><div class="swatch-label">water</div><div class="swatch-label">crystal</div></div>
  </div>

  <h2>Element Colors</h2>
  <div class="section">
    <div><div class="swatch" style="background:#ff6b35;"></div><div class="swatch" style="background:#78a6ff;"></div><div class="swatch" style="background:#4ade80;"></div><div class="swatch" style="background:#e2e8f0;"></div><div class="swatch" style="background:#9966ff;"></div></div>
    <div><div class="swatch-label">fire</div><div class="swatch-label">water</div><div class="swatch-label">earth</div><div class="swatch-label">wind</div><div class="swatch-label">void</div></div>
  </div>

  <h2>Fonts</h2>
  <div class="section">
    <p><strong>Display:</strong> Cinzel</p>
    <p><strong>Body:</strong> Crimson Pro</p>
    <p><strong>UI:</strong> Inter</p>
    <p><strong>Code:</strong> <code>JetBrains Mono</code></p>
  </div>

  <h2>CSS Variables</h2>
  <div class="section">
    <code>--arcane-teal: #7fffd4</code><br>
    <code>--arcane-gold: #ffd700</code><br>
    <code>--arcane-violet: #9966ff</code><br>
    <code>--cosmic-void: #0b0e14</code><br>
    <code>--cosmic-deep: #0f1319</code><br>
    <code>--cosmic-surface: #151a22</code>
  </div>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
