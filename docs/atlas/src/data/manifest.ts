import manifest from '../../data/canon-manifest.json';

export interface RealmSpec {
  id: string;
  name: string;
  type: string;
  summary: string;
}

export interface DeitySpec {
  id: string;
  name: string;
  domain: string;
  dual?: string;
  narrative: string;
}

export interface LuminorSpec {
  id: string;
  name: string;
  purpose: string;
  deity?: string;
}

export const atlasManifest = manifest;
export const realms = manifest.realms as RealmSpec[];
export const deities = manifest.deities as DeitySpec[];
export const luminors = manifest.luminors as LuminorSpec[];
export const openSource = manifest.openSource as {
  public: string[];
  private: string[];
};
export const canonicalSources = manifest.sources;
