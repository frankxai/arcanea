import * as vscode from 'vscode';
import { GUARDIANS, cycleGuardian } from './guardians';

const ELEMENT_ICONS: Record<string, string> = {
  'Fire': 'flame',
  'Water': 'droplet',
  'Earth': 'globe',
  'Wind': 'cloud',
  'Void': 'circle-outline',
  'Spirit': 'sparkle',
  'Source': 'star-full'
};

export class GuardianStatusBar implements vscode.Disposable {
  private guardianItem: vscode.StatusBarItem;
  private elementItem: vscode.StatusBarItem;
  private currentGuardianId: string = 'shinkami';

  constructor() {
    this.guardianItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100
    );
    this.guardianItem.command = 'arcanea.cycleGuardian';
    this.guardianItem.show();

    this.elementItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      99
    );
    this.elementItem.command = 'arcanea.openGate';
    this.elementItem.show();
  }

  get activeGuardianId(): string {
    return this.currentGuardianId;
  }

  update(guardianId: string): void {
    const guardian = GUARDIANS[guardianId];
    if (!guardian) return;

    this.currentGuardianId = guardianId;

    this.guardianItem.text = `\u2726 ${guardian.name} (${guardian.gate})`;
    this.guardianItem.tooltip = new vscode.MarkdownString(
      `**${guardian.name}** \u2014 ${guardian.gate} Gate\n\n` +
      `Frequency: ${guardian.frequency} | Element: ${guardian.element}\n\n` +
      `Godbeast: *${guardian.godbeast}*\n\n` +
      `${guardian.shortDescription}\n\n` +
      `*Click to cycle Guardians*`
    );
    // statusBarItem.color is supported; cast to any avoids strict deprecation warning
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.guardianItem as any).color = guardian.color;

    const elementIcon = ELEMENT_ICONS[guardian.element] ?? 'circle-outline';
    this.elementItem.text = `$(${elementIcon}) ${guardian.element}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.elementItem as any).color = guardian.color;
    this.elementItem.tooltip = new vscode.MarkdownString(
      `**Element:** ${guardian.element}\n\n` +
      `**Gate:** ${guardian.gate} (${guardian.frequency})\n\n` +
      `*Click to explore Gates*`
    );
  }

  cycle(): string {
    const nextId = cycleGuardian(this.currentGuardianId);
    this.update(nextId);
    return nextId;
  }

  dispose(): void {
    this.guardianItem.dispose();
    this.elementItem.dispose();
  }
}
