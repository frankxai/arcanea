/**
 * Realm and Essence Types
 */

import { SunoSong, ArcaneanImage, ArcaneanStory } from './creation';

export interface ArcaneanRealm {
  id: string;
  name: string;
  creatorId: string;
  description: string;
  theme: string;
  essences: Essence[];
  portals: Portal[];
  aesthetics: RealmAesthetics;
  createdAt: Date;
  lastUpdated: Date;
  isPublic: boolean;
  collaborators?: string[];
}

export interface Essence {
  id: string;
  type: 'music' | 'visual' | 'story' | 'mixed';
  title: string;
  content: SunoSong | ArcaneanImage | ArcaneanStory | any;
  realmId: string;
  creatorId: string;
  tags: string[];
  remixChainId?: string;
  arcValue?: number;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface Portal {
  id: string;
  sourceRealmId: string;
  targetRealmId: string;
  type: 'inspiration' | 'collaboration' | 'continuation';
  description: string;
  createdAt: Date;
}

export interface RealmAesthetics {
  colorScheme: string[];
  musicTheme?: string;
  visualStyle?: string;
  narrativeTone?: string;
}
