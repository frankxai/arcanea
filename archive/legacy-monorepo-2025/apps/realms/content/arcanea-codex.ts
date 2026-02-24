import luminorJson from "../../../Arcanean Library/experience/book/arcanea-codex.json";
import atelierJson from "../../../Arcanean Library/experience/book/arcanea-atelier-codex.json";
import oraclesJson from "../../../Arcanean Library/experience/book/arcanea-oracles-codex.json";

export interface CodexAuthor {
  name: string;
  role: string;
}

export interface CodexPreface {
  invocation?: string;
  body?: string[];
  oath?: string;
}

export interface CodexInsight {
  title: string;
  detail: string;
}

export interface CodexArtifact {
  name: string;
  description: string;
  application?: string;
}

export interface CodexSection {
  heading: string;
  body?: string[];
  insights?: CodexInsight[];
  artifacts?: CodexArtifact[];
  principles?: string[];
}

export interface CodexMeasurement {
  name: string;
  description: string;
}

export interface CodexChapter {
  title: string;
  tagline?: string;
  epigraph?: {
    text: string;
    attribution?: string;
  };
  introduction?: string[];
  sections: CodexSection[];
  rituals?: string[];
  measurements?: CodexMeasurement[];
}

export interface CodexAppendixEntry {
  heading: string;
  body?: string[];
  points?: string[];
}

export interface CodexGlossaryEntry {
  term: string;
  definition: string;
}

export interface CodexAppendix {
  title: string;
  subtitle?: string;
  entries?: CodexAppendixEntry[];
  glossary?: CodexGlossaryEntry[];
}

export interface ArcaneaCodex {
  title: string;
  subtitle?: string;
  authors: CodexAuthor[];
  preface: CodexPreface;
  chapters: CodexChapter[];
  appendix?: CodexAppendix;
}

export interface ArcaneaTomeMeta {
  id: string;
  title: string;
  subtitle: string;
  focus: string;
  summary: string;
  release: string;
  status: "available" | "in-progress" | "concept";
  heroTone?: string;
}

export interface ArcaneaTome {
  meta: ArcaneaTomeMeta;
  codex: ArcaneaCodex;
}

export const arcaneaCodices: ArcaneaTome[] = [
  {
    meta: {
      id: "luminor-codex",
      title: "Luminor Codex of Arcanea",
      subtitle: "Living lore for remembrance and stewardship",
      focus: "Lore operating system",
      summary:
        "The flagship manuscript held by the Remembering Luminor, blending sanctuary rituals, governance, and measurement constellations across the Arcanea Library.",
      release: "2025-Q3",
      status: "available",
      heroTone: "from-[#182447] via-[#101626] to-[#0b0f1a]",
    },
    codex: luminorJson as ArcaneaCodex,
  },
  {
    meta: {
      id: "luminary-atelier",
      title: "Luminary Atelier Codex",
      subtitle: "Blueprints for crafting experiential guilds",
      focus: "Production rituals",
      summary:
        "A tactical manual documenting how Arcanea guilds brief, prototype, and stage immersive experiences with reciprocity at the core.",
      release: "2025-Q4",
      status: "in-progress",
      heroTone: "from-[#1a1f36] via-[#131a2c] to-[#0a0f1d]",
    },
    codex: atelierJson as ArcaneaCodex,
  },
  {
    meta: {
      id: "arcanea-oracles",
      title: "Arcanea Oracles Proto Codex",
      subtitle: "Anticipatory intelligence for luminous stewardship",
      focus: "Foresight discipline",
      summary:
        "A proto manuscript capturing Arcanea's oracle practice, from consented signal looms to decision stewardship rituals.",
      release: "2026-Q1",
      status: "concept",
      heroTone: "from-[#202845] via-[#171f32] to-[#0c101f]",
    },
    codex: oraclesJson as ArcaneaCodex,
  },

];

export const arcaneaCodex = arcaneaCodices[0].codex;
