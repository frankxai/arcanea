import * as vscode from 'vscode';

interface Gate {
  name: string;
  frequency: string;
  guardian: string;
  element: string;
  opened: boolean;
}

const GATES: Gate[] = [
  { name: 'Foundation', frequency: '396 Hz', guardian: 'Lyssandria', element: 'Earth', opened: false },
  { name: 'Flow', frequency: '417 Hz', guardian: 'Leyla', element: 'Water', opened: false },
  { name: 'Fire', frequency: '528 Hz', guardian: 'Draconia', element: 'Fire', opened: false },
  { name: 'Heart', frequency: '639 Hz', guardian: 'Maylinn', element: 'Wind', opened: false },
  { name: 'Voice', frequency: '741 Hz', guardian: 'Alera', element: 'Void', opened: false },
  { name: 'Sight', frequency: '852 Hz', guardian: 'Lyria', element: 'Spirit', opened: false },
  { name: 'Crown', frequency: '963 Hz', guardian: 'Aiyami', element: 'Spirit', opened: false },
  { name: 'Shift', frequency: '1111 Hz', guardian: 'Elara', element: 'Void', opened: false },
  { name: 'Unity', frequency: '963 Hz', guardian: 'Ino', element: 'Spirit', opened: false },
  { name: 'Source', frequency: '1111 Hz', guardian: 'Shinkami', element: 'Source', opened: false }
];

class GateItem extends vscode.TreeItem {
  constructor(public readonly gate: Gate) {
    super(
      `${gate.opened ? '\u2713' : '\u25CB'} ${gate.name} (${gate.frequency})`,
      vscode.TreeItemCollapsibleState.None
    );

    this.description = `${gate.guardian} | ${gate.element}`;
    this.tooltip = `${gate.name} Gate\nFrequency: ${gate.frequency}\nGuardian: ${gate.guardian}\nElement: ${gate.element}\nStatus: ${gate.opened ? 'Opened' : 'Sealed'}`;

    this.iconPath = new vscode.ThemeIcon(
      gate.opened ? 'pass-filled' : 'circle-outline',
      new vscode.ThemeColor(gate.opened ? 'arcanea.teal' : 'descriptionForeground')
    );
  }
}

export class GateProgressProvider implements vscode.TreeDataProvider<GateItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<GateItem | undefined | null | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  getTreeItem(element: GateItem): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<GateItem[]> {
    return Promise.resolve(GATES.map(g => new GateItem(g)));
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}
