import * as vscode from 'vscode';

interface LoreEntry {
  label: string;
  description: string;
}
interface LoreCategory {
  label: string;
  icon: string;
  items: LoreEntry[];
}

const BUILTIN_LORE: LoreCategory[] = [
  {
    label: 'The Cosmic Duality',
    icon: 'symbol-namespace',
    items: [
      { label: 'Lumina', description: 'The First Light, Form-Giver, Creator' },
      { label: 'Nero', description: 'Primordial Darkness, Fertile Unknown, Father of Potential. NOT evil.' }
    ]
  },
  {
    label: 'Five Elements',
    icon: 'symbol-enum',
    items: [
      { label: 'Fire (Red/Gold)', description: 'Energy, transformation, will' },
      { label: 'Water (Blue/Silver)', description: 'Flow, healing, memory, emotion' },
      { label: 'Earth (Green/Brown)', description: 'Stability, growth, structure, survival' },
      { label: 'Wind (White/Silver)', description: 'Freedom, speed, change, connection' },
      { label: 'Void/Spirit (Black-Gold/Purple)', description: 'Void = potential (Nero). Spirit = transcendence (Lumina). Shadow = corrupted Void.' }
    ]
  },
  {
    label: 'Ten Gates & Guardians',
    icon: 'symbol-interface',
    items: [
      { label: 'Foundation (396 Hz)', description: 'Lyssandria \u00b7 Kaelith \u00b7 Earth \u2014 Liberation from fear' },
      { label: 'Flow (417 Hz)', description: 'Leyla \u00b7 Veloura \u00b7 Water \u2014 Change & creativity' },
      { label: 'Fire (528 Hz)', description: 'Draconia \u00b7 Draconis \u00b7 Fire \u2014 Transformation miracle frequency' },
      { label: 'Heart (639 Hz)', description: 'Maylinn \u00b7 Laeylinn \u00b7 Wind \u2014 Connection & healing' },
      { label: 'Voice (741 Hz)', description: 'Alera \u00b7 Otome \u00b7 Void \u2014 Truth & pure expression' },
      { label: 'Sight (852 Hz)', description: 'Lyria \u00b7 Yumiko \u00b7 Spirit \u2014 Intuition & vision' },
      { label: 'Crown (963 Hz)', description: 'Aiyami \u00b7 Sol \u00b7 Spirit \u2014 Divine consciousness' },
      { label: 'Shift (1111 Hz)', description: 'Elara \u00b7 Thessara \u00b7 Void \u2014 Portals & paradigm shifts' },
      { label: 'Unity (963 Hz)', description: 'Ino \u00b7 Kyuro \u00b7 Spirit \u2014 Partnership & integration' },
      { label: 'Source (1111 Hz)', description: 'Shinkami \u00b7 Amaterasu \u00b7 Source \u2014 Meta-consciousness & first principles' }
    ]
  },
  {
    label: 'Magic Ranks',
    icon: 'symbol-class',
    items: [
      { label: 'Apprentice', description: '0\u20132 Gates opened' },
      { label: 'Mage', description: '3\u20134 Gates opened' },
      { label: 'Master', description: '5\u20136 Gates opened' },
      { label: 'Archmage', description: '7\u20138 Gates opened' },
      { label: 'Luminor', description: '9\u201310 Gates opened \u2014 highest rank' }
    ]
  },
  {
    label: 'Seven Academy Houses',
    icon: 'organization',
    items: [
      { label: 'House Lumina', description: "Light and creation \u2014 Lumina's lineage" },
      { label: 'House Nero', description: "Darkness and potential \u2014 Nero's lineage" },
      { label: 'House Pyros', description: 'Fire and transformation' },
      { label: 'House Aqualis', description: 'Water and flow' },
      { label: 'House Terra', description: 'Earth and stability' },
      { label: 'House Ventus', description: 'Wind and freedom' },
      { label: 'House Synthesis', description: 'Integration of all elements' }
    ]
  },
  {
    label: 'The Dark Lord',
    icon: 'warning',
    items: [
      { label: 'Malachar Lumenbright', description: 'First Eldrian Luminor. Fell into Hungry Void. Sealed in the Shadowfen.' }
    ]
  },
  {
    label: 'The Arc',
    icon: 'sync',
    items: [
      { label: 'Potential', description: "The unformed \u2014 Nero's domain" },
      { label: 'Manifestation', description: "Form given \u2014 Lumina's act" },
      { label: 'Experience', description: 'Living the creation' },
      { label: 'Dissolution', description: 'Return to void' },
      { label: 'Evolved Potential', description: 'Transcended form \u2014 the cycle complete' }
    ]
  }
];

type LoreNode = FileDirNode | FileDocNode | BuiltinCategoryNode | BuiltinEntryNode;

class FileDirNode extends vscode.TreeItem {
  constructor(
    public readonly uri: vscode.Uri,
    label: string
  ) {
    super(label, vscode.TreeItemCollapsibleState.Collapsed);
    this.iconPath = new vscode.ThemeIcon('book');
    this.tooltip = uri.fsPath;
    this.contextValue = 'lore-dir';
    this.resourceUri = uri;
  }
}

class FileDocNode extends vscode.TreeItem {
  constructor(
    public readonly uri: vscode.Uri,
    label: string
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.iconPath = new vscode.ThemeIcon('symbol-file');
    this.tooltip = uri.fsPath;
    this.resourceUri = uri;
    this.command = {
      command: 'vscode.open',
      title: 'Open Lore File',
      arguments: [uri]
    };
    this.contextValue = 'lore-file';
  }
}

class BuiltinCategoryNode extends vscode.TreeItem {
  constructor(public readonly category: LoreCategory) {
    super(category.label, vscode.TreeItemCollapsibleState.Collapsed);
    this.iconPath = new vscode.ThemeIcon(category.icon);
  }
}

class BuiltinEntryNode extends vscode.TreeItem {
  constructor(public readonly entry: LoreEntry) {
    super(entry.label, vscode.TreeItemCollapsibleState.None);
    this.description = entry.description;
    this.tooltip = `${entry.label}: ${entry.description}`;
    this.iconPath = new vscode.ThemeIcon('symbol-field');
  }
}

export class LoreExplorerProvider implements vscode.TreeDataProvider<LoreNode> {
  private _onDidChangeTreeData = new vscode.EventEmitter<LoreNode | undefined | null | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private readonly LORE_SUBDIRS = ['.claude/lore', 'book', 'lore'];

  constructor() {
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
      this._onDidChangeTreeData.fire();
    });
  }

  getTreeItem(element: LoreNode): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: LoreNode): Promise<LoreNode[]> {
    if (!element) {
      const root = await this.findLoreRoot();
      if (root) {
        return this.getUriChildren(root);
      }
      return BUILTIN_LORE.map(c => new BuiltinCategoryNode(c));
    }

    if (element instanceof FileDirNode) {
      return this.getUriChildren(element.uri);
    }

    if (element instanceof BuiltinCategoryNode) {
      return element.category.items.map(e => new BuiltinEntryNode(e));
    }

    return [];
  }

  private async getUriChildren(uri: vscode.Uri): Promise<LoreNode[]> {
    try {
      const entries = await vscode.workspace.fs.readDirectory(uri);
      const nodes: LoreNode[] = [];

      for (const [name, type] of entries) {
        const childUri = vscode.Uri.joinPath(uri, name);

        if (type === vscode.FileType.Directory) {
          const label = name.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
          nodes.push(new FileDirNode(childUri, label));
        } else if (type === vscode.FileType.File && /\.(md|txt)$/i.test(name)) {
          const base = name.replace(/\.(md|txt)$/i, '');
          const label = base.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
          nodes.push(new FileDocNode(childUri, label));
        }
      }

      return nodes.sort((a, b) => {
        const aIsDir = a instanceof FileDirNode ? 0 : 1;
        const bIsDir = b instanceof FileDirNode ? 0 : 1;
        if (aIsDir !== bIsDir) return aIsDir - bIsDir;
        return (a.label as string).localeCompare(b.label as string);
      });
    } catch {
      return [];
    }
  }

  private async findLoreRoot(): Promise<vscode.Uri | null> {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) return null;

    const workspaceRoot = folders[0].uri;

    for (const subdir of this.LORE_SUBDIRS) {
      const candidate = vscode.Uri.joinPath(workspaceRoot, subdir);
      try {
        const stat = await vscode.workspace.fs.stat(candidate);
        if (stat.type === vscode.FileType.Directory) {
          return candidate;
        }
      } catch {
        // Not found, try next
      }
    }
    return null;
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}
