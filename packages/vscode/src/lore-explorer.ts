import * as vscode from 'vscode';

interface LoreCategory {
  label: string;
  items: LoreEntry[];
}

interface LoreEntry {
  label: string;
  description: string;
}

const LORE: LoreCategory[] = [
  {
    label: 'The Cosmic Duality',
    items: [
      { label: 'Lumina', description: 'The First Light, Form-Giver, Creator' },
      { label: 'Nero', description: 'Primordial Darkness, Fertile Unknown, Father of Potential' }
    ]
  },
  {
    label: 'Five Elements',
    items: [
      { label: 'Fire', description: 'Energy, transformation, will' },
      { label: 'Water', description: 'Flow, healing, memory, emotion' },
      { label: 'Earth', description: 'Stability, growth, structure' },
      { label: 'Wind', description: 'Freedom, speed, change, connection' },
      { label: 'Void/Spirit', description: 'Potential, transcendence, meta-consciousness' }
    ]
  },
  {
    label: 'Ten Guardians',
    items: [
      { label: 'Lyssandria', description: 'Foundation (Earth, 396 Hz) — Godbeast: Kaelith' },
      { label: 'Leyla', description: 'Flow (Water, 417 Hz) — Godbeast: Veloura' },
      { label: 'Draconia', description: 'Fire (Fire, 528 Hz) — Godbeast: Draconis' },
      { label: 'Maylinn', description: 'Heart (Wind, 639 Hz) — Godbeast: Laeylinn' },
      { label: 'Alera', description: 'Voice (Void, 741 Hz) — Godbeast: Otome' },
      { label: 'Lyria', description: 'Sight (Spirit, 852 Hz) — Godbeast: Yumiko' },
      { label: 'Aiyami', description: 'Crown (Spirit, 963 Hz) — Godbeast: Sol' },
      { label: 'Elara', description: 'Shift (Void, 1111 Hz) — Godbeast: Thessara' },
      { label: 'Ino', description: 'Unity (Spirit, 963 Hz) — Godbeast: Kyuro' },
      { label: 'Shinkami', description: 'Source (Source, 1111 Hz) — Godbeast: Amaterasu' }
    ]
  },
  {
    label: 'Magic Ranks',
    items: [
      { label: 'Apprentice', description: '0-2 Gates open' },
      { label: 'Mage', description: '3-4 Gates open' },
      { label: 'Master', description: '5-6 Gates open' },
      { label: 'Archmage', description: '7-8 Gates open' },
      { label: 'Luminor', description: '9-10 Gates open' }
    ]
  },
  {
    label: 'Seven Academy Houses',
    items: [
      { label: 'House Lumina', description: 'Light and creation' },
      { label: 'House Nero', description: 'Darkness and potential' },
      { label: 'House Pyros', description: 'Fire and transformation' },
      { label: 'House Aqualis', description: 'Water and flow' },
      { label: 'House Terra', description: 'Earth and stability' },
      { label: 'House Ventus', description: 'Wind and freedom' },
      { label: 'House Synthesis', description: 'Integration of all elements' }
    ]
  },
  {
    label: 'The Dark Lord',
    items: [
      { label: 'Malachar Lumenbright', description: 'First Eldrian Luminor, fell into Hungry Void. Sealed in the Shadowfen.' }
    ]
  }
];

type TreeNode = CategoryNode | EntryNode;

class CategoryNode extends vscode.TreeItem {
  constructor(
    public readonly category: LoreCategory
  ) {
    super(category.label, vscode.TreeItemCollapsibleState.Collapsed);
    this.iconPath = new vscode.ThemeIcon('book');
  }
}

class EntryNode extends vscode.TreeItem {
  constructor(
    public readonly entry: LoreEntry
  ) {
    super(entry.label, vscode.TreeItemCollapsibleState.None);
    this.description = entry.description;
    this.tooltip = `${entry.label}: ${entry.description}`;
    this.iconPath = new vscode.ThemeIcon('symbol-field');
  }
}

export class LoreExplorerProvider implements vscode.TreeDataProvider<TreeNode> {
  getTreeItem(element: TreeNode): vscode.TreeItem {
    return element;
  }

  getChildren(element?: TreeNode): Thenable<TreeNode[]> {
    if (!element) {
      return Promise.resolve(LORE.map(c => new CategoryNode(c)));
    }

    if (element instanceof CategoryNode) {
      return Promise.resolve(
        element.category.items.map(e => new EntryNode(e))
      );
    }

    return Promise.resolve([]);
  }
}
