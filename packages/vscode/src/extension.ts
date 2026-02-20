import * as vscode from 'vscode';
import { GuardianStatusBar } from './status-bar';
import { GuardianPanelProvider } from './guardian-panel';
import { GateProgressProvider } from './gate-progress';
import { LoreExplorerProvider } from './lore-explorer';
import { GUARDIANS, GUARDIAN_ORDER, routeToGuardian } from './guardians';

let statusBar: GuardianStatusBar;
let guardianPanel: GuardianPanelProvider;
let gateProgress: GateProgressProvider;

export function activate(context: vscode.ExtensionContext): void {
  // ── Status Bar ──────────────────────────────────────────────────────────
  statusBar = new GuardianStatusBar();
  context.subscriptions.push(statusBar);

  // ── Sidebar Providers ───────────────────────────────────────────────────
  guardianPanel = new GuardianPanelProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('arcanea.guardianPanel', guardianPanel)
  );

  gateProgress = new GateProgressProvider();
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('arcanea.gateProgress', gateProgress)
  );

  const loreExplorer = new LoreExplorerProvider();
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('arcanea.loreExplorer', loreExplorer)
  );

  // ── Commands ─────────────────────────────────────────────────────────────
  context.subscriptions.push(

    // Internal: status bar update (called from webview message handler)
    vscode.commands.registerCommand('arcanea.updateStatusBar', (guardianId: string) => {
      statusBar.update(guardianId);
      guardianPanel.refresh();
    }),

    // Cycle guardian (status bar click)
    vscode.commands.registerCommand('arcanea.cycleGuardian', async () => {
      const nextId = statusBar.cycle();
      const config = vscode.workspace.getConfiguration('arcanea');
      await config.update('activeGuardian', nextId, vscode.ConfigurationTarget.Global);
      guardianPanel.refresh();

      const g = GUARDIANS[nextId];
      vscode.window.setStatusBarMessage(
        `${g.symbol} ${g.name} \u2014 ${g.shortDescription}`,
        3000
      );
    }),

    // Route to Guardian — QuickPick all 10 or auto-route by task description
    vscode.commands.registerCommand('arcanea.routeGuardian', async () => {
      const AUTO_LABEL = '$(wand) Auto-route by task description...';

      const items: vscode.QuickPickItem[] = [
        { label: AUTO_LABEL, description: 'Describe your task and let the system choose' },
        { label: '', kind: vscode.QuickPickItemKind.Separator },
        ...GUARDIAN_ORDER.map(id => {
          const g = GUARDIANS[id];
          return {
            label: `${g.symbol}  ${g.name}`,
            description: `${g.gate} Gate \u00b7 ${g.element} \u00b7 ${g.frequency}`,
            detail: g.domain
          };
        })
      ];

      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select a Guardian or auto-route by task',
        matchOnDescription: true,
        matchOnDetail: true
      });

      if (!selected) return;

      let guardianId: string;

      if (selected.label === AUTO_LABEL) {
        const input = await vscode.window.showInputBox({
          prompt: 'Describe your task to route to the optimal Guardian',
          placeHolder: 'e.g. "design a landing page" or "fix database performance"'
        });
        if (!input) return;

        const result = routeToGuardian(input);
        guardianId = result.guardian;
        const g = GUARDIANS[guardianId];

        const altNames = result.alternatives
          .map(id => GUARDIANS[id]?.name)
          .filter(Boolean)
          .join(', ');

        vscode.window.showInformationMessage(
          `${g.symbol} Routed to ${g.name} (${result.confidence}% confidence)` +
          (altNames ? ` \u2014 Alternatives: ${altNames}` : '')
        );
      } else {
        // User selected a guardian directly — match by name extracted from label
        const name = selected.label.trim().split(/\s+/).slice(1).join(' ');
        const found = Object.entries(GUARDIANS).find(([, g]) => g.name === name);
        if (!found) return;
        guardianId = found[0];
      }

      const config = vscode.workspace.getConfiguration('arcanea');
      await config.update('activeGuardian', guardianId, vscode.ConfigurationTarget.Global);
      statusBar.update(guardianId);
      guardianPanel.refresh();
    }),

    // Convene Council — webview showing all 10 Guardians with current file/selection context
    vscode.commands.registerCommand('arcanea.conveneCouncil', async () => {
      let fileContext = '';
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;
        if (!selection.isEmpty) {
          fileContext = editor.document.getText(selection);
        } else {
          const full = editor.document.getText();
          fileContext = full.length > 2000 ? full.slice(0, 2000) + '\n...(truncated)' : full;
        }
      }

      let challenge: string;
      if (!fileContext) {
        const input = await vscode.window.showInputBox({
          prompt: 'What challenge should the Guardian Council deliberate on?',
          placeHolder: 'Describe a complex decision spanning multiple domains'
        });
        if (!input) return;
        challenge = input;
      } else {
        const input = await vscode.window.showInputBox({
          prompt: 'Frame the question for the Council (leave blank to use file context)',
          placeHolder: 'What specific question about this code/content?',
          value: ''
        });
        challenge = input || `Review this:\n\n${fileContext.slice(0, 500)}`;
      }

      const panel = vscode.window.createWebviewPanel(
        'arcanea.council',
        'Guardian Council',
        vscode.ViewColumn.Beside,
        { enableScripts: false, retainContextWhenHidden: true }
      );

      panel.webview.html = getCouncilHtml(challenge, fileContext);
    }),

    // Check Voice — Voice Bible v2.0 compliance
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
        vscode.window.showInformationMessage(
          'Voice check passed \u2014 text aligns with Arcanea Voice Bible v2.0'
        );
      } else {
        const pick = await vscode.window.showQuickPick(
          issues.map(i => ({ label: `$(warning) ${i}` })),
          { placeHolder: `${issues.length} voice issue(s) found \u2014 press Escape to dismiss` }
        );
        void pick;
      }
    }),

    // Query Lore — search built-in lore index
    vscode.commands.registerCommand('arcanea.queryLore', async () => {
      const input = await vscode.window.showInputBox({
        prompt: 'Ask about Arcanea lore',
        placeHolder: 'e.g. "Who is Draconis?" or "What are the Five Elements?"'
      });
      if (!input) return;

      const results = searchLore(input.toLowerCase());
      if (results.length === 0) {
        vscode.window.showInformationMessage(
          `No lore found for "${input}" \u2014 connect @arcanea/mcp-server for full RAG search`
        );
        return;
      }

      await vscode.window.showQuickPick(
        results.map(r => ({ label: r.label, detail: r.description })),
        { placeHolder: `${results.length} result(s) for "${input}"`, matchOnDetail: true }
      );
    }),

    // Show Design Tokens
    vscode.commands.registerCommand('arcanea.showDesignTokens', () => {
      const panel = vscode.window.createWebviewPanel(
        'arcanea.tokens',
        'Arcanea Design Tokens',
        vscode.ViewColumn.One,
        { enableScripts: false }
      );
      panel.webview.html = getDesignTokensHtml();
    }),

    // Open Gate — QuickPick with rank display, toggle open/closed
    vscode.commands.registerCommand('arcanea.openGate', async () => {
      const rank = gateProgress.getMagicRank();
      const openedCount = gateProgress.getOpenedCount();

      const gateItems: vscode.QuickPickItem[] = [
        {
          label: `$(star-full) Rank: ${rank} \u2014 ${openedCount}/10 Gates`,
          kind: vscode.QuickPickItemKind.Separator
        },
        ...GUARDIAN_ORDER.map(id => {
          const g = GUARDIANS[id];
          return {
            label: `${g.symbol}  ${g.gate} Gate`,
            description: `${g.frequency} \u00b7 ${g.element}`,
            detail: `${g.name} \u2014 ${g.shortDescription}`
          };
        })
      ];

      const selected = await vscode.window.showQuickPick(gateItems, {
        placeHolder: `${rank} \u2014 ${openedCount}/10 Gates opened. Select to toggle.`,
        matchOnDescription: true,
        matchOnDetail: true
      });

      if (!selected || selected.kind === vscode.QuickPickItemKind.Separator) return;

      const symbol = selected.label.trim().split(/\s+/)[0];
      const foundId = GUARDIAN_ORDER.find(id => GUARDIANS[id].symbol === symbol);
      if (!foundId) return;

      await gateProgress.toggleGate(foundId);

      const newRank = gateProgress.getMagicRank();
      const newCount = gateProgress.getOpenedCount();
      vscode.window.showInformationMessage(
        `Gate toggled. ${newCount}/10 Gates open \u2014 Rank: ${newRank}`
      );
    })

  );

  // ── Initialize status bar ─────────────────────────────────────────────
  const config = vscode.workspace.getConfiguration('arcanea');
  const activeGuardian = config.get<string>('activeGuardian') ?? 'shinkami';
  statusBar.update(activeGuardian);

  vscode.window.setStatusBarMessage('[Arcanea] Realm activated \u2014 10 Guardians standing by', 2000);
}

export function deactivate(): void {
  statusBar?.dispose();
}

// ── Voice Bible v2.0 checker ──────────────────────────────────────────────

function checkVoice(text: string): string[] {
  const issues: string[] = [];

  const rules: Array<{ pattern: RegExp; issue: string }> = [
    { pattern: /\buser(?!-)/i,          issue: 'Say "creator" instead of "user"' },
    { pattern: /\bplatform(?!s?\s+(?:agnostic|specific|independent|support))/i, issue: 'Say "realm" or "world" instead of "platform"' },
    { pattern: /i['']d be happy to/i,  issue: 'Avoid generic AI assistant language ("happy to help")' },
    { pattern: /\bleverage\b/i,         issue: 'Avoid corporate buzzwords \u2014 say "use" or "harness"' },
    { pattern: /\bsynergy\b/i,          issue: 'Avoid corporate buzzwords \u2014 say "alignment" or "resonance"' },
    { pattern: /ecosystem play/i,       issue: 'Avoid "ecosystem play" \u2014 say "connected system" or "living world"' },
    { pattern: /\bfeatures?\b/i,        issue: 'Consider "capabilities" or "powers" instead of "features"' },
    { pattern: /\bproduct\b/i,          issue: 'Consider "creation" or "realm" instead of "product"' }
  ];

  for (const rule of rules) {
    if (rule.pattern.test(text)) {
      issues.push(rule.issue);
    }
  }

  return issues;
}

// ── Lore search ───────────────────────────────────────────────────────────

interface SearchResult {
  label: string;
  description: string;
}

const LORE_INDEX: SearchResult[] = [
  { label: 'Lumina', description: 'The First Light, Form-Giver, Creator' },
  { label: 'Nero', description: 'Primordial Darkness, Fertile Unknown, Father of Potential. NOT evil.' },
  { label: 'Malachar', description: 'First Eldrian Luminor. Fell into Hungry Void. Sealed in the Shadowfen.' },
  { label: 'Fire (528 Hz)', description: 'Energy, transformation, will. Draconia & Draconis. Miracle frequency.' },
  { label: 'Water (417/639 Hz)', description: 'Flow, healing, memory, emotion. Leyla & Maylinn.' },
  { label: 'Earth (396 Hz)', description: 'Stability, growth, structure, grounding. Lyssandria & Kaelith.' },
  { label: 'Wind (639/741 Hz)', description: 'Freedom, speed, change, connection. Maylinn & Alera.' },
  { label: 'Void', description: "Potential, mystery, unformed \u2014 Nero's aspect. Shadow = corrupted Void." },
  { label: 'Spirit', description: "Transcendence, consciousness, soul \u2014 Lumina's aspect." },
  { label: 'The Arc', description: 'Potential \u2192 Manifestation \u2192 Experience \u2192 Dissolution \u2192 Evolved Potential' },
  { label: 'Lyssandria', description: 'Guardian of Foundation Gate. Godbeast: Kaelith. Earth, 396 Hz. Architect.' },
  { label: 'Kaelith', description: 'Godbeast of Lyssandria. Foundation Gate, Earth element.' },
  { label: 'Leyla', description: 'Guardian of Flow Gate. Godbeast: Veloura. Water, 417 Hz. Muse.' },
  { label: 'Veloura', description: 'Godbeast of Leyla. Flow Gate, Water element.' },
  { label: 'Draconia', description: 'Guardian of Fire Gate. Godbeast: Draconis. Fire, 528 Hz. Executor.' },
  { label: 'Draconis', description: 'Godbeast of Draconia. Fire Gate. The great fire dragon.' },
  { label: 'Maylinn', description: 'Guardian of Heart Gate. Godbeast: Laeylinn. Wind, 639 Hz. Healer.' },
  { label: 'Laeylinn', description: 'Godbeast of Maylinn. Heart Gate, Wind element.' },
  { label: 'Alera', description: 'Guardian of Voice Gate. Godbeast: Otome. Void, 741 Hz. Truth-Teller.' },
  { label: 'Otome', description: 'Godbeast of Alera. Voice Gate, Void element.' },
  { label: 'Lyria', description: 'Guardian of Sight Gate. Godbeast: Yumiko. Spirit, 852 Hz. Seer.' },
  { label: 'Yumiko', description: 'Godbeast of Lyria. Sight Gate, Spirit element.' },
  { label: 'Aiyami', description: 'Guardian of Crown Gate. Godbeast: Sol. Spirit, 963 Hz. Illuminator.' },
  { label: 'Sol', description: 'Godbeast of Aiyami. Crown Gate, Spirit element. The great sun.' },
  { label: 'Elara', description: 'Guardian of Shift Gate. Godbeast: Thessara. Void, 1111 Hz. Reframer.' },
  { label: 'Thessara', description: 'Godbeast of Elara. Shift Gate, Void element.' },
  { label: 'Ino', description: 'Guardian of Unity Gate. Godbeast: Kyuro. Spirit, 963 Hz. Integrator.' },
  { label: 'Kyuro', description: 'Godbeast of Ino. Unity Gate, Spirit element.' },
  { label: 'Shinkami', description: 'Guardian of Source Gate. Godbeast: Amaterasu. Source, 1111 Hz. Origin.' },
  { label: 'Amaterasu', description: 'Godbeast of Shinkami. Source Gate. The great light of heaven.' },
  { label: 'Apprentice', description: 'Magic rank: 0\u20132 Gates opened' },
  { label: 'Mage', description: 'Magic rank: 3\u20134 Gates opened' },
  { label: 'Master', description: 'Magic rank: 5\u20136 Gates opened' },
  { label: 'Archmage', description: 'Magic rank: 7\u20138 Gates opened' },
  { label: 'Luminor', description: 'Magic rank: 9\u201310 Gates opened. Highest rank.' },
  { label: 'House Lumina', description: 'Academy house of light and creation' },
  { label: 'House Nero', description: 'Academy house of darkness and potential' },
  { label: 'House Pyros', description: 'Academy house of fire and transformation' },
  { label: 'House Aqualis', description: 'Academy house of water and flow' },
  { label: 'House Terra', description: 'Academy house of earth and stability' },
  { label: 'House Ventus', description: 'Academy house of wind and freedom' },
  { label: 'House Synthesis', description: 'Academy house integrating all elements' }
];

function searchLore(query: string): SearchResult[] {
  const terms = query.trim().split(/\s+/);
  return LORE_INDEX.filter(entry => {
    const haystack = `${entry.label} ${entry.description}`.toLowerCase();
    return terms.some(term => haystack.includes(term));
  });
}

// ── Council webview HTML ──────────────────────────────────────────────────

function getCouncilHtml(challenge: string, fileContext: string): string {
  const guardianRows = GUARDIAN_ORDER.map(id => {
    const g = GUARDIANS[id];
    return `<div class="gp" style="border-color: ${g.color}">
      <div class="gp-head">
        <span class="gp-sym">${g.symbol}</span>
        <div>
          <div class="gp-name" style="color: ${g.color}">${g.name}</div>
          <div class="gp-meta">${g.gate} \u00b7 ${g.element} \u00b7 ${g.frequency}</div>
        </div>
      </div>
      <div class="gp-domain">${g.domain}</div>
      <div class="gp-wisdom">${g.systemPromptSummary}</div>
    </div>`;
  }).join('\n');

  const contextBlock = fileContext
    ? `<div class="context-block">
        <div class="block-label">File Context</div>
        <pre class="context-code">${escapeHtml(fileContext.slice(0, 1500))}${fileContext.length > 1500 ? '\n\u2026(truncated)' : ''}</pre>
      </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';">
  <style>
    * { box-sizing: border-box; }
    body { background: #0b0e14; color: #e2e8f0; font-family: 'Segoe UI', system-ui, sans-serif; padding: 24px; margin: 0; font-size: 13px; line-height: 1.5; }
    h1 { color: #ffd700; font-size: 1.4em; margin: 0 0 4px; }
    .subtitle { color: #64748b; font-size: 0.8em; margin-bottom: 20px; }
    .challenge-block { background: #151a22; border-left: 3px solid #ffd700; border-radius: 0 6px 6px 0; padding: 12px 16px; margin-bottom: 16px; }
    .block-label { color: #ffd700; font-size: 0.72em; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
    .context-block { background: #0f1319; border: 1px solid #1e293b; border-radius: 6px; padding: 12px; margin-bottom: 20px; }
    .context-block .block-label { color: #7fffd4; }
    .context-code { font-family: 'JetBrains Mono', monospace; font-size: 0.8em; color: #94a3b8; white-space: pre-wrap; word-break: break-all; margin: 0; max-height: 200px; overflow-y: auto; }
    .mcp-note { background: #1a2030; border: 1px solid #9966ff44; border-radius: 6px; padding: 10px 14px; color: #94a3b8; font-size: 0.8em; margin-bottom: 20px; }
    .mcp-note strong { color: #9966ff; }
    .section-title { color: #7fffd4; font-size: 0.78em; text-transform: uppercase; letter-spacing: 1.5px; margin: 20px 0 12px; display: flex; align-items: center; gap: 8px; }
    .section-title::after { content: ''; flex: 1; height: 1px; background: #1e293b; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
    .gp { background: #0f1319; border-left: 3px solid; border-radius: 0 6px 6px 0; padding: 10px 12px; }
    .gp-head { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px; }
    .gp-sym { font-size: 1.3em; flex-shrink: 0; }
    .gp-name { font-weight: 700; font-size: 0.95em; }
    .gp-meta { color: #475569; font-size: 0.7em; }
    .gp-domain { color: #64748b; font-size: 0.75em; margin-bottom: 5px; }
    .gp-wisdom { color: #94a3b8; font-size: 0.78em; font-style: italic; border-top: 1px solid #1e293b; padding-top: 5px; }
  </style>
</head>
<body>
  <h1>Guardian Council Convened</h1>
  <div class="subtitle">All 10 Guardians deliberating in council</div>

  <div class="challenge-block">
    <div class="block-label">Challenge</div>
    ${escapeHtml(challenge)}
  </div>

  ${contextBlock}

  <div class="mcp-note">
    <strong>Connect @arcanea/mcp-server</strong> for full Guardian Council deliberation with live AI responses from each Guardian.
  </div>

  <div class="section-title">Guardian Perspectives</div>
  <div class="grid">
    ${guardianRows}
  </div>
</body>
</html>`;
}

// ── Design Tokens webview HTML ─────────────────────────────────────────────

function getDesignTokensHtml(): string {
  const swatch = (name: string, hex: string) =>
    `<div class="sg"><div class="sw" style="background:${hex}" title="${hex}"></div><div class="sn">${name}</div><div class="sh">${hex}</div></div>`;

  const cosmic = [
    ['void', '#0b0e14'], ['deep', '#0f1319'], ['surface', '#151a22'],
    ['raised', '#1a2030'], ['elevated', '#232d3f']
  ].map(([n, h]) => swatch(n, h)).join('');

  const arcane = [
    ['teal', '#7fffd4'], ['gold', '#ffd700'], ['violet', '#9966ff'],
    ['water', '#78a6ff'], ['crystal', '#a5f3fc']
  ].map(([n, h]) => swatch(n, h)).join('');

  const elements = [
    ['fire', '#ff6b35'], ['water', '#78a6ff'], ['earth', '#4ade80'],
    ['wind', '#e2e8f0'], ['void', '#9966ff'], ['spirit', '#a855f7'], ['source', '#ffd700']
  ].map(([n, h]) => swatch(n, h)).join('');

  const guardians = GUARDIAN_ORDER.map(id => {
    const g = GUARDIANS[id];
    return swatch(g.name.toLowerCase(), g.color);
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';">
  <style>
    * { box-sizing: border-box; }
    body { background: #0b0e14; color: #e2e8f0; font-family: 'Segoe UI', system-ui, sans-serif; padding: 24px; margin: 0; font-size: 13px; }
    h1 { color: #ffd700; margin: 0 0 4px; }
    .subtitle { color: #64748b; font-size: 0.8em; margin-bottom: 24px; }
    h2 { color: #7fffd4; font-size: 0.85em; text-transform: uppercase; letter-spacing: 1.5px; margin: 24px 0 12px; border-bottom: 1px solid #1e293b; padding-bottom: 6px; }
    .row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 8px; }
    .sg { text-align: center; }
    .sw { width: 52px; height: 52px; border-radius: 8px; border: 1px solid #1e293b; margin: 0 auto 4px; }
    .sn { color: #94a3b8; font-size: 0.68em; }
    .sh { color: #475569; font-size: 0.65em; font-family: monospace; }
    code { background: #151a22; border: 1px solid #1e293b; border-radius: 4px; padding: 2px 7px; font-family: 'JetBrains Mono', monospace; font-size: 0.82em; color: #7fffd4; }
    .var-list { display: flex; flex-direction: column; gap: 4px; }
    .var-row { display: flex; align-items: center; gap: 10px; }
    .var-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
    .font-row { margin: 6px 0; }
    .font-name { color: #94a3b8; font-size: 0.8em; }
    .font-sample { color: #64748b; font-size: 0.75em; }
  </style>
</head>
<body>
  <h1>Arcanea Design Tokens</h1>
  <div class="subtitle">v2.0 \u2014 Cosmic glassmorphism design system</div>

  <h2>Cosmic Palette</h2>
  <div class="row">${cosmic}</div>

  <h2>Arcane Colors</h2>
  <div class="row">${arcane}</div>

  <h2>Element Colors</h2>
  <div class="row">${elements}</div>

  <h2>Guardian Colors</h2>
  <div class="row">${guardians}</div>

  <h2>CSS Variables</h2>
  <div class="var-list">
    <div class="var-row"><div class="var-dot" style="background:#7fffd4"></div><code>--arcane-teal: #7fffd4</code></div>
    <div class="var-row"><div class="var-dot" style="background:#ffd700"></div><code>--arcane-gold: #ffd700</code></div>
    <div class="var-row"><div class="var-dot" style="background:#9966ff"></div><code>--arcane-violet: #9966ff</code></div>
    <div class="var-row"><div class="var-dot" style="background:#78a6ff"></div><code>--arcane-water: #78a6ff</code></div>
    <div class="var-row"><div class="var-dot" style="background:#0b0e14"></div><code>--cosmic-void: #0b0e14</code></div>
    <div class="var-row"><div class="var-dot" style="background:#0f1319"></div><code>--cosmic-deep: #0f1319</code></div>
    <div class="var-row"><div class="var-dot" style="background:#151a22"></div><code>--cosmic-surface: #151a22</code></div>
    <div class="var-row"><div class="var-dot" style="background:#1a2030"></div><code>--cosmic-raised: #1a2030</code></div>
  </div>

  <h2>Fonts</h2>
  <div class="font-row"><div class="font-name">Display</div><div class="font-sample">Cinzel \u2014 headings, titles, display text</div></div>
  <div class="font-row"><div class="font-name">Body</div><div class="font-sample">Crimson Pro \u2014 long-form text, descriptions</div></div>
  <div class="font-row"><div class="font-name">UI</div><div class="font-sample">Inter \u2014 interface elements, labels</div></div>
  <div class="font-row"><div class="font-name">Code</div><div class="font-sample"><code>JetBrains Mono</code> \u2014 code, tokens, hex values</div></div>
</body>
</html>`;
}

// ── Utilities ─────────────────────────────────────────────────────────────

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
