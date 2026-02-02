/**
 * Remix Attribution and Chain Tracking Types
 */

export interface RemixChain {
  id: string;
  originalCreationId: string;
  remixes: RemixNode[];
  totalGenerations: number;
  createdAt: Date;
  lastRemixedAt: Date;
}

export interface RemixNode {
  id: string;
  creationId: string;
  creatorId: string;
  creatorName: string;
  parentId: string | null;
  children: string[];
  remixType: 'variation' | 'extension' | 'transformation' | 'collaboration';
  changes: string[];
  arcDistribution: ArcDistribution;
  timestamp: Date;
}

export interface ArcDistribution {
  originalCreator: number;
  remixers: Record<string, number>;
  platformFee: number;
}

export interface Attribution {
  originalCreator: {
    id: string;
    name: string;
    contribution: string;
  };
  contributors: Contributor[];
  license: 'open' | 'attribution' | 'commercial' | 'exclusive';
  arcShareRules: ArcShareRule[];
}

export interface Contributor {
  id: string;
  name: string;
  role: 'co-creator' | 'remixer' | 'inspiration' | 'collaborator';
  contribution: string;
  timestamp: Date;
}

export interface ArcShareRule {
  creatorId: string;
  percentage: number;
  type: 'fixed' | 'diminishing' | 'generation-based';
}
