import * as vscode from 'vscode';
import { GUARDIANS } from './guardians';

export class GuardianPanelProvider implements vscode.WebviewViewProvider {
  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    webviewView.webview.options = {
      enableScripts: true
    };

    webviewView.webview.html = this.getHtml();

    // Listen for config changes
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('arcanea.activeGuardian')) {
        webviewView.webview.html = this.getHtml();
      }
    });
  }

  private getHtml(): string {
    const config = vscode.workspace.getConfiguration('arcanea');
    const activeId = config.get<string>('activeGuardian') || 'shinkami';
    const active = GUARDIANS[activeId];

    const guardianCards = Object.entries(GUARDIANS)
      .map(([id, g]) => {
        const isActive = id === activeId;
        return `<div class="guardian-card ${isActive ? 'active' : ''}" style="border-color: ${g.color}">
          <div class="guardian-header">
            <span class="guardian-name" style="color: ${g.color}">${g.name}</span>
            <span class="guardian-freq">${g.frequency}</span>
          </div>
          <div class="guardian-gate">${g.gate} Gate</div>
          <div class="guardian-element">${g.element}</div>
        </div>`;
      })
      .join('\n');

    return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background: transparent;
      color: #e2e8f0;
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      padding: 0 8px;
      margin: 0;
    }
    .active-guardian {
      background: #0b0e14;
      border: 1px solid ${active?.color || '#ffd700'};
      border-radius: 8px;
      padding: 12px;
      margin: 8px 0;
      text-align: center;
    }
    .active-name {
      font-size: 1.2em;
      font-weight: bold;
      color: ${active?.color || '#ffd700'};
    }
    .active-details {
      color: #64748b;
      font-size: 0.85em;
      margin-top: 4px;
    }
    .active-domain {
      color: #94a3b8;
      font-size: 0.8em;
      margin-top: 8px;
    }
    .divider {
      border: none;
      border-top: 1px solid #1e293b;
      margin: 12px 0;
    }
    .section-title {
      color: #7fffd4;
      font-size: 0.75em;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 8px 0 4px;
    }
    .guardian-card {
      background: #0f1319;
      border-left: 3px solid;
      border-radius: 4px;
      padding: 6px 8px;
      margin: 4px 0;
      cursor: pointer;
      transition: background 0.2s;
    }
    .guardian-card:hover {
      background: #151a22;
    }
    .guardian-card.active {
      background: #1a2030;
    }
    .guardian-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .guardian-name {
      font-weight: bold;
      font-size: 0.9em;
    }
    .guardian-freq {
      color: #64748b;
      font-size: 0.7em;
    }
    .guardian-gate {
      color: #94a3b8;
      font-size: 0.75em;
    }
    .guardian-element {
      color: #64748b;
      font-size: 0.7em;
    }
  </style>
</head>
<body>
  <div class="active-guardian">
    <div class="active-name">${active?.name || 'Shinkami'}</div>
    <div class="active-details">${active?.gate || 'Source'} Gate | ${active?.frequency || '1111 Hz'} | ${active?.element || 'Source'}</div>
    <div class="active-domain">${active?.domain || 'Meta-architecture, orchestration, the totality'}</div>
  </div>

  <hr class="divider">
  <div class="section-title">All Guardians</div>

  ${guardianCards}
</body>
</html>`;
  }
}
