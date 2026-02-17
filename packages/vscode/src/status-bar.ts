import * as vscode from 'vscode';
import { GUARDIANS } from './guardians';

export class GuardianStatusBar implements vscode.Disposable {
  private statusBarItem: vscode.StatusBarItem;
  private elementItem: vscode.StatusBarItem;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100
    );
    this.statusBarItem.command = 'arcanea.routeGuardian';
    this.statusBarItem.tooltip = 'Click to route task to Guardian';
    this.statusBarItem.show();

    this.elementItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      99
    );
    this.elementItem.command = 'arcanea.openGate';
    this.elementItem.show();
  }

  update(guardianId: string) {
    const guardian = GUARDIANS[guardianId];
    if (!guardian) return;

    this.statusBarItem.text = `$(shield) ${guardian.name}`;
    this.statusBarItem.tooltip = `${guardian.name} — ${guardian.gate} Gate (${guardian.frequency}) | ${guardian.domain}`;
    this.statusBarItem.color = guardian.color;

    const elementSymbols: Record<string, string> = {
      'Fire': '$(flame)',
      'Water': '$(droplet)',
      'Earth': '$(globe)',
      'Wind': '$(cloud)',
      'Void': '$(circle-outline)',
      'Spirit': '$(sparkle)',
      'Source': '$(star-full)'
    };

    this.elementItem.text = `${elementSymbols[guardian.element] || '$(circle-outline)'} ${guardian.element}`;
    this.elementItem.color = guardian.color;
    this.elementItem.tooltip = `Element: ${guardian.element} | Gate: ${guardian.gate} (${guardian.frequency})`;
  }

  dispose() {
    this.statusBarItem.dispose();
    this.elementItem.dispose();
  }
}
