import * as vscode from 'vscode';
import { GUARDIANS, GUARDIAN_ORDER } from './guardians';

export class GuardianPanelProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(private readonly extensionUri: vscode.Uri) {
    void this.extensionUri;
  }

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void {
    this._view = webviewView;

    webviewView.webview.options = { enableScripts: true };
    webviewView.webview.html = this.getHtml();

    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('arcanea.activeGuardian')) {
        if (this._view) {
          this._view.webview.html = this.getHtml();
        }
      }
    });

    webviewView.webview.onDidReceiveMessage(async (message: { type: string; guardianId: string }) => {
      if (message.type === 'activateGuardian') {
        const config = vscode.workspace.getConfiguration('arcanea');
        await config.update('activeGuardian', message.guardianId, vscode.ConfigurationTarget.Global);
        await vscode.commands.executeCommand('arcanea.updateStatusBar', message.guardianId);
      }
    });
  }

  refresh(): void {
    if (this._view) {
      this._view.webview.html = this.getHtml();
    }
  }

  private getHtml(): string {
    const config = vscode.workspace.getConfiguration('arcanea');
    const activeId = config.get<string>('activeGuardian') ?? 'shinkami';
    const active = GUARDIANS[activeId];

    const elementColors: Record<string, string> = {
      'Fire': '#ff6b35',
      'Water': '#78a6ff',
      'Earth': '#4ade80',
      'Wind': '#e2e8f0',
      'Void': '#9966ff',
      'Spirit': '#a855f7',
      'Source': '#ffd700'
    };

    const elementColor = elementColors[active?.element ?? ''] ?? '#ffd700';
    const activeColor = active?.color ?? '#ffd700';

    const guardianCards = GUARDIAN_ORDER
      .map(id => {
        const g = GUARDIANS[id];
        const isActive = id === activeId;
        const elColor = elementColors[g.element] ?? g.color;
        return `<div class="guardian-card ${isActive ? 'active' : ''}"
                     style="border-color: ${g.color};"
                     onclick="activateGuardian('${id}')">
          <div class="guardian-header">
            <span class="guardian-symbol">${g.symbol}</span>
            <span class="guardian-name" style="color: ${g.color}">${g.name}</span>
            <span class="guardian-freq">${g.frequency}</span>
          </div>
          <div class="guardian-meta">
            <span class="guardian-gate">${g.gate}</span>
            <span class="guardian-sep">&middot;</span>
            <span class="guardian-element" style="color: ${elColor}">${g.element}</span>
          </div>
          <div class="guardian-domain">${g.shortDescription}</div>
          ${isActive ? '<div class="active-badge">ACTIVE</div>' : ''}
        </div>`;
      })
      .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: transparent;
      color: #e2e8f0;
      font-family: var(--vscode-font-family, 'Segoe UI', sans-serif);
      font-size: var(--vscode-font-size, 12px);
      padding: 0 6px 16px;
    }
    .hero {
      background: #0b0e14;
      border: 1px solid ${activeColor};
      border-radius: 10px;
      padding: 14px 12px;
      margin: 8px 0 10px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at top, ${activeColor}18 0%, transparent 65%);
      pointer-events: none;
    }
    .hero-symbol { font-size: 1.8em; display: block; margin-bottom: 4px; }
    .hero-name { font-size: 1.15em; font-weight: 700; color: ${activeColor}; letter-spacing: 0.04em; }
    .hero-gate { color: #94a3b8; font-size: 0.78em; margin-top: 3px; }
    .hero-frequency {
      display: inline-block; margin-top: 5px; padding: 2px 8px;
      background: ${activeColor}22; border: 1px solid ${activeColor}55;
      border-radius: 100px; color: ${activeColor};
      font-size: 0.72em; letter-spacing: 0.06em;
    }
    .hero-element { color: ${elementColor}; font-size: 0.75em; margin-top: 4px; }
    .hero-godbeast { color: #64748b; font-size: 0.72em; margin-top: 3px; font-style: italic; }
    .hero-domain {
      color: #94a3b8; font-size: 0.75em; margin-top: 8px; line-height: 1.4;
      border-top: 1px solid #1e293b; padding-top: 8px;
    }
    .section-header {
      color: #7fffd4; font-size: 0.68em; text-transform: uppercase;
      letter-spacing: 1.5px; margin: 10px 0 6px;
      display: flex; align-items: center; gap: 6px;
    }
    .section-header::after { content: ''; flex: 1; height: 1px; background: #1e293b; }
    .guardian-list { display: flex; flex-direction: column; gap: 3px; }
    .guardian-card {
      background: #0f1319; border-left: 3px solid; border-radius: 5px;
      padding: 6px 8px; cursor: pointer; transition: background 0.15s, transform 0.1s;
      position: relative;
    }
    .guardian-card:hover { background: #151a22; transform: translateX(1px); }
    .guardian-card.active { background: #151a22; border: 1px solid; border-left-width: 3px; }
    .guardian-header { display: flex; align-items: center; gap: 5px; }
    .guardian-symbol { font-size: 1em; flex-shrink: 0; }
    .guardian-name { font-weight: 600; font-size: 0.88em; flex: 1; }
    .guardian-freq { color: #475569; font-size: 0.68em; flex-shrink: 0; }
    .guardian-meta { display: flex; align-items: center; gap: 4px; margin-top: 2px; }
    .guardian-gate { color: #64748b; font-size: 0.72em; }
    .guardian-sep { color: #334155; font-size: 0.65em; }
    .guardian-element { font-size: 0.72em; }
    .guardian-domain { color: #475569; font-size: 0.68em; margin-top: 1px; }
    .active-badge {
      position: absolute; top: 4px; right: 6px;
      font-size: 0.58em; color: #7fffd4; letter-spacing: 1px; font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="hero">
    <span class="hero-symbol">${active?.symbol ?? '\u2728'}</span>
    <div class="hero-name">${active?.name ?? 'Shinkami'}</div>
    <div class="hero-gate">${active?.gate ?? 'Source'} Gate</div>
    <span class="hero-frequency">${active?.frequency ?? '1111 Hz'}</span>
    <div class="hero-element">${active?.element ?? 'Source'}</div>
    <div class="hero-godbeast">Godbeast: ${active?.godbeast ?? 'Amaterasu'}</div>
    <div class="hero-domain">${active?.domain ?? 'Meta-architecture, orchestration, first principles'}</div>
  </div>

  <div class="section-header">All Guardians</div>
  <div class="guardian-list">
    ${guardianCards}
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    function activateGuardian(id) {
      vscode.postMessage({ type: 'activateGuardian', guardianId: id });
    }
  </script>
</body>
</html>`;
  }
}
