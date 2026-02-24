import * as vscode from 'vscode';

interface GateDefinition {
  id: string;
  name: string;
  frequency: string;
  guardian: string;
  element: string;
  color: string;
  description: string;
}

const GATE_DEFINITIONS: GateDefinition[] = [
  { id: 'foundation', name: 'Foundation', frequency: '396 Hz', guardian: 'Lyssandria', element: 'Earth',  color: '#4ade80', description: 'Liberation from fear. Survival. Grounding.' },
  { id: 'flow',       name: 'Flow',       frequency: '417 Hz', guardian: 'Leyla',      element: 'Water',  color: '#78a6ff', description: 'Change. Creativity. Dissolution of stagnation.' },
  { id: 'fire',       name: 'Fire',       frequency: '528 Hz', guardian: 'Draconia',   element: 'Fire',   color: '#ff6b35', description: 'Transformation. DNA repair. Miraculous frequency.' },
  { id: 'heart',      name: 'Heart',      frequency: '639 Hz', guardian: 'Maylinn',    element: 'Wind',   color: '#f472b6', description: 'Connection. Relationships. Harmonizing communities.' },
  { id: 'voice',      name: 'Voice',      frequency: '741 Hz', guardian: 'Alera',      element: 'Void',   color: '#e879f9', description: 'Awakening intuition. Problem-solving. Pure expression.' },
  { id: 'sight',      name: 'Sight',      frequency: '852 Hz', guardian: 'Lyria',      element: 'Spirit', color: '#a855f7', description: 'Intuition. Spiritual order. Returning to truth.' },
  { id: 'crown',      name: 'Crown',      frequency: '963 Hz', guardian: 'Aiyami',     element: 'Spirit', color: '#fbbf24', description: 'Divine consciousness. Infinite intelligence. Synthesis.' },
  { id: 'shift',      name: 'Shift',      frequency: '1111 Hz', guardian: 'Elara',     element: 'Void',   color: '#06b6d4', description: 'Portals. Paradigm transformation. Reframing.' },
  { id: 'unity',      name: 'Unity',      frequency: '963 Hz', guardian: 'Ino',        element: 'Spirit', color: '#14b8a6', description: 'Partnership. Integration. Harmonious co-creation.' },
  { id: 'source',     name: 'Source',     frequency: '1111 Hz', guardian: 'Shinkami',  element: 'Source', color: '#ffd700', description: 'First principles. Meta-consciousness. Origin of all.' }
];

type GateNode = GateTreeItem | GateDetailItem;

class GateTreeItem extends vscode.TreeItem {
  constructor(
    public readonly gate: GateDefinition,
    public readonly opened: boolean
  ) {
    super(gate.name, vscode.TreeItemCollapsibleState.Collapsed);

    this.description = `${gate.guardian} \u00b7 ${gate.frequency}`;
    this.tooltip = new vscode.MarkdownString(
      `**${gate.name} Gate** \u2014 ${opened ? 'Opened' : 'Sealed'}\n\n` +
      `**Guardian:** ${gate.guardian}\n\n` +
      `**Element:** ${gate.element}\n\n` +
      `**Frequency:** ${gate.frequency}\n\n` +
      `*${gate.description}*`
    );
    (this.tooltip as vscode.MarkdownString).isTrusted = true;

    this.iconPath = new vscode.ThemeIcon(
      opened ? 'pass-filled' : 'circle-outline',
      new vscode.ThemeColor(opened ? 'arcanea.teal' : 'descriptionForeground')
    );

    this.contextValue = opened ? 'gate-opened' : 'gate-sealed';
  }
}

class GateDetailItem extends vscode.TreeItem {
  constructor(label: string, detail: string) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.description = detail;
    this.iconPath = new vscode.ThemeIcon('symbol-field');
  }
}

export class GateProgressProvider implements vscode.TreeDataProvider<GateNode> {
  private _onDidChangeTreeData = new vscode.EventEmitter<GateNode | undefined | null | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private openedGates: Set<string>;

  constructor() {
    const config = vscode.workspace.getConfiguration('arcanea');
    const saved = config.get<string[]>('openedGates') ?? [];
    this.openedGates = new Set(saved);

    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('arcanea.openedGates')) {
        const updated = vscode.workspace.getConfiguration('arcanea').get<string[]>('openedGates') ?? [];
        this.openedGates = new Set(updated);
        this._onDidChangeTreeData.fire();
      }
    });
  }

  getTreeItem(element: GateNode): vscode.TreeItem {
    return element;
  }

  getChildren(element?: GateNode): Thenable<GateNode[]> {
    if (!element) {
      return Promise.resolve(
        GATE_DEFINITIONS.map(g => new GateTreeItem(g, this.openedGates.has(g.id)))
      );
    }

    if (element instanceof GateTreeItem) {
      const g = element.gate;
      return Promise.resolve([
        new GateDetailItem('Guardian', g.guardian),
        new GateDetailItem('Element', g.element),
        new GateDetailItem('Frequency', g.frequency),
        new GateDetailItem('Status', element.opened ? 'Opened' : 'Sealed'),
        new GateDetailItem('Teaching', g.description)
      ]);
    }

    return Promise.resolve([]);
  }

  async toggleGate(gateId: string): Promise<void> {
    if (this.openedGates.has(gateId)) {
      this.openedGates.delete(gateId);
    } else {
      this.openedGates.add(gateId);
    }
    const config = vscode.workspace.getConfiguration('arcanea');
    await config.update('openedGates', [...this.openedGates], vscode.ConfigurationTarget.Global);
    this._onDidChangeTreeData.fire();
  }

  getOpenedCount(): number {
    return this.openedGates.size;
  }

  getMagicRank(): string {
    const count = this.openedGates.size;
    if (count <= 2) return 'Apprentice';
    if (count <= 4) return 'Mage';
    if (count <= 6) return 'Master';
    if (count <= 8) return 'Archmage';
    return 'Luminor';
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}
