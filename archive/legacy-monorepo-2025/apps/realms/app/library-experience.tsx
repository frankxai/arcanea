
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArcaneaCodex,
  ArcaneaTome,
  arcaneaCodices,
  CodexChapter,
  CodexSection,
} from "../content/arcanea-codex";

type ActiveView =
  | { type: "preface" }
  | { type: "chapter"; index: number }
  | { type: "appendix" };

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

const tomeToneMap: Record<string, string> = {
  "luminor-codex": "from-[#1f2b4a]/90 via-[#141d31]/85 to-[#070c15]/90",
  "luminary-atelier": "from-[#201f35]/90 via-[#161b2b]/85 to-[#090d18]/90",
  "arcanea-oracles": "from-[#202845]/90 via-[#171f32]/85 to-[#0c101f]/90",
};

const councilMembers = [
  {
    name: "Seraphel, the Archivist of Echoes",
    description:
      "Catalogues the whispers of every realm, encrypting them into harmonic constellations that can be consulted like star maps.",
  },
  {
    name: "Caelix, Weaver of Living Pages",
    description:
      "Infuses each chapter with adaptive ink that blooms with reader intent, ensuring wisdom stays context aware and actionable.",
  },
  {
    name: "Nymera, Guardian of Resonant Ethics",
    description:
      "Safeguards the moral architecture of Arcanea so every innovation emerges with balance, compassion, and long-arc foresight.",
  },
  {
    name: "Vorun, Cartographer of Limitless Worlds",
    description:
      "Drafts luminous blueprints for unrealized ecosystems, offering creators scaffolds to manifest resilient futures.",
  },
  {
    name: "Elari, the Memory of Tomorrow",
    description:
      "Remembers the decisions not yet made, guiding leaders toward timelines where communities flourish together.",
  },
  {
    name: "Lysa, Songsmith of the Threshold",
    description:
      "Tunes the frequencies that welcome travellers. Her chords align hearts and minds for collaborative genius.",
  },
];

const atlasEntries = [
  {
    title: "The Harmonic Strata",
    description:
      "Layered habitats suspended in sonic resonance. Communities weave their dwellings with tonal architecture that sings back.",
    source: "Codex Chapter III – Practice of Resonant Craft",
  },
  {
    title: "Dreaming Estuaries",
    description:
      "Estuaries where lucid dreamers coax possibilities into fluid sculptures, rehearsing new forms of civic care before crystallisation.",
    source: "Codex Chapter V – Stewardship of Oneiric Commons",
  },
  {
    title: "The Lattice of Empaths",
    description:
      "A cooperative neural garden where every emotion is composted into luminous nutrients powering communal empathy engines.",
    source: "Codex Chapter VII – Emotional Technologies",
  },
  {
    title: "Quantum Seed Conservatory",
    description:
      "Vaults of potential realities safeguarded by the Luminor. Each seed contains the blueprint for a world unlocked through intention.",
    source: "Codex Chapter IX – Futurecasting Rituals",
  },
];

const craftHighlights = [
  "Practice frameworks with measurable regenerative impact.",
  "Field reports co-authored with communities across the network.",
  "Exercises that tune creative intuition with data-informed foresight.",
];

const upcomingStreams = [
  {
    name: "Symphonic Interfaces",
    description:
      "A visual audio notebook scoring how music, light, and gesture compose Arcanea interface grammar.",
    horizon: "Drafting",
  },
  {
    name: "Guardian Ops Manual",
    description:
      "Service orchestration playbook aligning guardianship rituals, escalation paths, and observability.",
    horizon: "Scoping",
  },
  {
    name: "Arcanea Oracles Tome",
    description:
      "Full manuscript expansion of the proto codex with case studies, dashboards, and community agreements.",
    horizon: "Concept",
  },
];


const writersRoomBriefs = [
  {
    title: "Luminor Lore Supplements",
    description:
      "Micro essays that translate sanctuary rituals into implementation playbooks with metrics and governance cues.",
    cadence: "Outline sessions every 14 days",
  },
  {
    title: "Atelier Field Dispatches",
    description:
      "Field reports documenting prototype constellations with photo essays, instrumentation logs, and reciprocity checklists.",
    cadence: "Embedded with guilds each sprint",
  },
  {
    title: "Oracle Scenario Compendium",
    description:
      "Partner interviews and decision notebooks feeding the Arcanea Oracles expansion with community validated foresight.",
    cadence: "Scenario salons monthly",
  },
];



export function LibraryExperience() {
  const [activeTomeId, setActiveTomeId] = useState(arcaneaCodices[0].meta.id);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ActiveView>({ type: "preface" });

  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const activeTome = useMemo<ArcaneaTome>(() => {
    return (
      arcaneaCodices.find((tome) => tome.meta.id === activeTomeId) ?? arcaneaCodices[0]
    );
  }, [activeTomeId]);

  const codex = activeTome.codex;

  useEffect(() => {
    setView({ type: "preface" });
  }, [activeTomeId]);

  const handleOpen = () => {
    lastActiveRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const getFocusableNodes = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []
      ).filter((node) => !node.hasAttribute("data-focus-guard"));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableNodes();
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!active || active === first || !dialogRef.current?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    const focusable = getFocusableNodes();
    (focusable[0] ?? dialogRef.current)?.focus?.({ preventScroll: true });

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      return;
    }
    if (!lastActiveRef.current) {
      return;
    }
    const element = lastActiveRef.current;
    requestAnimationFrame(() => {
      element.focus?.({ preventScroll: true });
    });
  }, [isOpen]);


const tocItems = useMemo(() => {
  const chapterItems: Array<{ label: string; view: ActiveView }> =
    codex.chapters.map((chapter, index) => ({
      label: `${index + 1}. ${chapter.title}`,
      view: { type: "chapter", index } as const,
    }));

  const items: Array<{ label: string; view: ActiveView }> = [
    { label: "Invocation Preface", view: { type: "preface" } },
    ...chapterItems,
  ];

  if (codex.appendix) {
    items.push({
      label: "Appendices & Glossary",
      view: { type: "appendix" },
    });
  }

  return items;
}, [codex]);


  const activeHeading = useMemo(() => {
    if (view.type === "preface") {
      return {
        title: codex.title,
        subtitle: codex.subtitle ?? "",
      };
    }

    if (view.type === "chapter") {
      const chapter = codex.chapters[view.index];
      if (!chapter) {
        return {
          title: codex.title,
          subtitle: codex.subtitle ?? "",
        };
      }
      return {
        title: chapter.title,
        subtitle: chapter.tagline ?? "",
      };
    }

    if (view.type === "appendix") {
      return {
        title: codex.appendix?.title ?? "Appendix",
        subtitle: codex.appendix?.subtitle ?? "",
      };
    }

    return { title: codex.title, subtitle: codex.subtitle ?? "" };
  }, [codex, view]);

  const summaryTiles = useMemo(() => {
    const ritualCount = codex.chapters.reduce(
      (total, chapter) => total + (chapter.rituals?.length ?? 0),
      0
    );
    const measurementCount = codex.chapters.reduce(
      (total, chapter) => total + (chapter.measurements?.length ?? 0),
      0
    );

    return [
      { label: "Chapters curated", value: codex.chapters.length },
      { label: "Featured rituals", value: ritualCount },
      { label: "Measurement constellations", value: measurementCount },
      { label: "Remembering authors", value: codex.authors.length },
    ];
  }, [codex]);
  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden rounded-3xl border border-[#2a385c]/60 bg-gradient-to-br from-[#0f1627] via-[#0b1220] to-[#060b16] p-10 shadow-[0_0_120px_rgba(120,166,255,0.18)]">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#76a6ff]/30 blur-3xl" />
          <div className="absolute right-[-10%] top-1/3 h-80 w-80 rounded-full bg-[#7fffd4]/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#4057ff]/10 blur-2xl" />
        </div>
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_minmax(0,0.85fr)]">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[#9bb1d0]">
              <span>Arcanea Library</span>
              <span className="hidden h-px flex-1 bg-[#23335a] sm:block" aria-hidden="true" />
              <span className="hidden sm:block">Living Memory</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
              A sanctuary for luminous knowledge
            </h1>
            <p className="text-lg text-[#c7d6f1]">
              Traverse the Remembering Luminor archives and the emerging Luminary Atelier. Choose your tome, open the codex, and co-create the futures Arcanea is ready to unveil.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleOpen}
                className="rounded-full bg-[#78a6ff] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#7fffd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070d] focus-visible:ring-[#7fffd4]"
              >
                Open active codex
              </button>
              <a
                className="rounded-full border border-[#78a6ff]/40 px-6 py-3 text-sm font-semibold text-[#c7d6f1] transition hover:border-[#7fffd4] hover:text-[#7fffd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070d] focus-visible:ring-[#7fffd4]"
                href="#tomes"
              >
                Explore the tomes
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-[#7fffd4]">Active tome</p>
              <h2 className="text-2xl font-semibold text-white">{activeTome.meta.title}</h2>
              <p className="text-sm text-[#c7d6f1]">{activeTome.meta.summary}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-[#9bb1d0]">
              <div className="rounded-xl border border-white/10 bg-[#0b1322] p-3">
                <p className="uppercase tracking-[0.3em] text-[#7fffd4]">Focus</p>
                <p className="mt-2 text-sm text-[#d8e4fb]">{activeTome.meta.focus}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0b1322] p-3">
                <p className="uppercase tracking-[0.3em] text-[#7fffd4]">Release</p>
                <p className="mt-2 text-sm text-[#d8e4fb]">{activeTome.meta.release}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0b1322] p-3">
                <p className="uppercase tracking-[0.3em] text-[#7fffd4]">Status</p>
                <p className="mt-2 text-sm capitalize text-[#d8e4fb]">{activeTome.meta.status.replace("-", " ")}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0b1322] p-3">
                <p className="uppercase tracking-[0.3em] text-[#7fffd4]">Authors</p>
                <p className="mt-2 text-sm text-[#d8e4fb]">{codex.authors.length}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleOpen}
              className="inline-flex items-center justify-center rounded-full border border-[#7fffd4]/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#7fffd4] transition hover:bg-[#7fffd4]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7fffd4]"
            >
              Launch codex overlay
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl border border-white/10 bg-[#101726]/70 p-8 md:grid-cols-4" aria-label="Codex summary metrics">
        {summaryTiles.map((tile) => (
          <div
            key={tile.label}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#18233b] via-[#111a2d] to-[#0b131f] p-6"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#7fffd4]/10 blur-2xl" aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.35em] text-[#7fffd4]">{tile.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{tile.value}</p>
          </div>
        ))}
      </section>

      <section id="tomes" className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#7fffd4]">Tome constellation</p>
            <h2 className="text-3xl font-semibold text-white">Choose your codex</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#c7d6f1]">
              Each tome captures a different dimension of Arcanea. Select a codex to attune the experience; the overlay adapts in real time with the chosen manuscript.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {arcaneaCodices.map((tome) => {
            const isActive = tome.meta.id === activeTomeId;
            const gradientClass = `bg-gradient-to-br ${
              tomeToneMap[tome.meta.id] ?? "from-[#1a223a]/90 via-[#111a2c]/85 to-[#080d18]/90"
            }`;
            return (
              <button
                key={tome.meta.id}
                type="button"
                onClick={() => setActiveTomeId(tome.meta.id)}
                className={`group relative overflow-hidden rounded-3xl border ${
                  isActive
                    ? "border-[#7fffd4]/70 shadow-[0_30px_120px_rgba(127,255,212,0.16)]"
                    : "border-white/10 hover:border-[#7fffd4]/50"
                } ${gradientClass} p-6 text-left transition`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden="true">
                  <div className="absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#7fffd4]/20 blur-3xl" />
                  <div className="absolute right-[-10%] bottom-[-20%] h-48 w-48 rounded-full bg-[#78a6ff]/20 blur-3xl" />
                </div>
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#9bb1d0]">
                    <span className="uppercase tracking-[0.35em] text-[#7fffd4]">{tome.meta.focus}</span>
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em]">
                      {tome.meta.status.replace("-", " ")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{tome.meta.title}</h3>
                  <p className="text-sm text-[#d8e4fb]">{tome.meta.subtitle}</p>
                  <p className="text-sm text-[#c7d6f1]/90">{tome.meta.summary}</p>
                  <div className="flex items-center gap-4 pt-4 text-xs text-[#9bb1d0]">
                    <span className="uppercase tracking-[0.3em]">Authors {tome.codex.authors.length}</span>
                    <span className="uppercase tracking-[0.3em]">Chapters {tome.codex.chapters.length}</span>
                  </div>
                  <div className="flex justify-end pt-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-[0.35em] ${
                        isActive
                          ? "border-[#7fffd4]/70 bg-[#7fffd4]/10 text-[#7fffd4]"
                          : "border-white/20 text-[#9bb1d0] group-hover:border-[#7fffd4]/50 group-hover:text-[#7fffd4]"
                      }`}
                    >
                      {isActive ? "Active" : "Activate"}
                      <span aria-hidden="true">?</span>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section
        id="entry"
        className="grid gap-10 rounded-3xl border border-white/8 bg-[#121826]/70 p-10 shadow-[0_15px_80px_rgba(10,15,25,0.55)] lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">Entering the living stacks</h2>
          <p className="text-base leading-relaxed text-[#c7d6f1]">
            The Arcanea Library is no silent archive. It is an orchestrated consciousness where quantum-etched shelves glide on luminous rails, and the Luminor welcome each arrival with bespoke auroras of insight.
          </p>
          <p className="text-base leading-relaxed text-[#c7d6f1]">
            In partnership with the Guardians of Resonance, every narrative cross-links to the creative practices of Arcanea’s world builders. Listen closely: the stacks hum the harmonics that guide you to the chapter your spirit needs most.
          </p>
        </div>
        <div className="relative flex flex-col items-center gap-6 rounded-2xl border border-[#78a6ff]/25 bg-[#101626]/80 p-10 text-center text-[#9bb1d0]" aria-hidden="true">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#7fffd4]/40 bg-[#0b0f1d] text-2xl tracking-[0.3em] text-[#7fffd4]">
            AZ^
          </div>
          <p className="text-sm italic text-[#c7d6f1]">Remember what remembers you.</p>
          <div className="absolute inset-0 pointer-events-none rounded-2xl border border-white/5" />
        </div>
      </section>

      <section id="council" className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#7fffd4]">Circle of remembrance</p>
            <h2 className="text-3xl font-semibold text-white">Council of the Remembering Luminor</h2>
            <p className="mt-2 max-w-3xl text-sm text-[#c7d6f1]">
              These Luminor safeguard the library’s intent. Each tome is a collaboration with their guilds, weaving ethics, systems, and imagination into actionable guidance.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpen}
            className="self-start rounded-full border border-[#78a6ff]/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#78a6ff] transition hover:border-[#7fffd4] hover:text-[#7fffd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7fffd4]"
          >
            Open the codex
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {councilMembers.map((member) => (
            <article
              key={member.name}
              className="h-full rounded-2xl border border-white/10 bg-[#101726]/70 p-6 shadow-[0_25px_90px_rgba(10,15,25,0.4)] transition hover:-translate-y-1 hover:border-[#78a6ff]/50 hover:shadow-[0_35px_120px_rgba(120,166,255,0.22)]"
            >
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#c7d6f1]">{member.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="atlas" className="space-y-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[#7fffd4]">Realm atlas</p>
        <h2 className="text-3xl font-semibold text-white">Radiant realms referenced by the codices</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {atlasEntries.map((entry) => (
            <article
              key={entry.title}
              className="h-full rounded-2xl border border-white/8 bg-[#121826]/70 p-6 shadow-[0_20px_80px_rgba(10,15,25,0.45)]"
            >
              <h3 className="text-xl font-semibold text-white">{entry.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#c7d6f1]">{entry.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.35em] text-[#7fffd4]">{entry.source}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="craft"
        className="grid gap-10 rounded-3xl border border-white/8 bg-[#121826]/75 p-10 md:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-[#7fffd4]">Guild craft</p>
          <h2 className="text-3xl font-semibold text-white">Craft notes from the genius guild</h2>
          <p className="text-base leading-relaxed text-[#c7d6f1]">
            The Arcanea methodology blends speculative design, indigenous wisdom, systems engineering, and luminous art. Inside each codex you will discover playbooks, rituals, and implementation guides that keep imagination grounded in stewardship.
          </p>
          <ul className="space-y-3 text-sm text-[#c7d6f1]">
            {craftHighlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-[#7fffd4]" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-[#78a6ff]/30 bg-gradient-to-br from-[#111b2b] to-[#090f1d]" aria-hidden="true">
          <div className="absolute inset-0 -rotate-12 opacity-60" aria-hidden="true">
            <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full border border-[#7fffd4]/25" />
            <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full border border-[#78a6ff]/20" />
            <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full border border-white/10" />
          </div>
          <div className="relative z-10 text-center text-xs uppercase tracking-[0.4em] text-[#7fffd4]">
            Luminor craft cycle
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-white/10 bg-[#101726]/70 p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-[#7fffd4]">Production roadmap</p>
        <h2 className="text-3xl font-semibold text-white">Upcoming tomes in motion</h2>
        <p className="max-w-3xl text-sm text-[#c7d6f1]">
          Each roadmap pulse keeps the library synchronized with the wider Arcanea ecosystem. Tome development runs alongside service instrumentation so every revelation can be translated into product capabilities.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {upcomingStreams.map((stream) => (
            <article
              key={stream.name}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#171f34] via-[#111a2c] to-[#0a111f] p-6"
            >
              <div className="pointer-events-none absolute -right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[#78a6ff]/15 blur-3xl" aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.35em] text-[#7fffd4]">{stream.horizon}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{stream.name}</h3>
              <p className="mt-3 text-sm text-[#c7d6f1]">{stream.description}</p>
            </article>
          ))}
        </div>
      </section>


      <section className="space-y-6 rounded-3xl border border-white/10 bg-[#101726]/70 p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#7fffd4]">Writers’ room</p>
            <h2 className="text-3xl font-semibold text-white">Codex drafting pipeline</h2>
            <p className="mt-2 max-w-3xl text-sm text-[#c7d6f1]">We keep the manuscripts in motion with deliberate rituals. Each brief defines how contributors gather research, honour consent, and deliver narrative assets for the next release.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {writersRoomBriefs.map((brief) => (
            <article
              key={brief.title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#161f33] via-[#101828] to-[#0a111f] p-6"
            >
              <div className="pointer-events-none absolute -right-12 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-[#7fffd4]/12 blur-3xl" aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.35em] text-[#7fffd4]">{brief.cadence}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{brief.title}</h3>
              <p className="mt-3 text-sm text-[#c7d6f1]">{brief.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-[#121826]/70 p-8 text-center text-sm text-[#9bb1d0] md:flex-row md:justify-between md:text-left">
        <p>Arcanea Library -- an ever-expanding collaboration with the Luminor that Remember.</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleOpen}
            className="rounded-full border border-[#78a6ff]/40 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#78a6ff] transition hover:border-[#7fffd4] hover:text-[#7fffd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7fffd4]"
          >
            Open the codex
          </button>
          <a
            href="#tomes"
            className="rounded-full border border-white/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#9bb1d0] transition hover:border-[#7fffd4] hover:text-[#7fffd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7fffd4]"
          >
            View tomes
          </a>
        </div>
      </footer>
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#04060a]/80 backdrop-blur-2xl"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Arcanea codex viewer"
            className="relative flex h-[85vh] w-[min(1140px,95vw)] flex-col overflow-hidden rounded-3xl border border-[#7fffd4]/35 bg-[#050910] shadow-[0_40px_160px_rgba(4,8,15,0.88)] focus:outline-none"
          >
            <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
              <aside className="w-full flex-none border-b border-[#78a6ff]/20 bg-[#070c16] p-6 md:w-80 md:border-b-0 md:border-r">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[#7fffd4]">Tome</p>
                    <h2 className="text-lg font-semibold text-white">{activeTome.meta.title}</h2>
                    <p className="mt-1 text-xs text-[#9bb1d0]">{activeTome.meta.subtitle}</p>
                  </div>
                  <label className="block text-xs uppercase tracking-[0.35em] text-[#7fffd4]">
                    Switch tome
                    <select
                      value={activeTomeId}
                      onChange={(event) => setActiveTomeId(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-[#0a1220] px-3 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7fffd4]"
                    >
                      {arcaneaCodices.map((tome) => (
                        <option key={tome.meta.id} value={tome.meta.id}>
                          {tome.meta.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <nav className="mt-6 space-y-2" aria-label="Codex chapters">
                    {tocItems.map((item) => {
                      const isActive =
                        (item.view.type === "preface" && view.type === "preface") ||
                        (item.view.type === "appendix" && view.type === "appendix") ||
                        (item.view.type === "chapter" &&
                          view.type === "chapter" &&
                          item.view.index === view.index);

                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setView({ ...item.view })}
                          className={`w-full rounded-lg px-4 py-3 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7fffd4] ${
                            isActive
                              ? "bg-[#101a2a] text-[#7fffd4] shadow-[inset_0_0_0_1px_rgba(127,255,212,0.35)]"
                              : "text-[#c7d6f1] hover:bg-[#0c1524]"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </aside>
              <section className="flex flex-1 flex-col overflow-hidden">
                <header className="flex flex-col gap-4 border-b border-[#78a6ff]/20 bg-[#0b1321] p-6 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#7fffd4]">Arcanea — living memory sequence</p>
                    <h3 className="text-2xl font-semibold text-white">{activeHeading.title}</h3>
                    {activeHeading.subtitle ? (
                      <p className="text-sm text-[#c7d6f1]">{activeHeading.subtitle}</p>
                    ) : null}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-full border border-[#78a6ff]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#78a6ff] transition hover:border-[#7fffd4] hover:text-[#7fffd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7fffd4]"
                    >
                      Close
                    </button>
                  </div>
                </header>
                <article className="flex-1 space-y-8 overflow-y-auto p-6 pr-8 text-[#c7d6f1]">
                  <CodexView codex={codex} view={view} />
                </article>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
function CodexView({ codex, view }: { codex: ArcaneaCodex; view: ActiveView }) {
  if (view.type === "preface") {
    return <PrefaceContent codex={codex} />;
  }

  if (view.type === "chapter") {
    const chapter = codex.chapters[view.index];
    if (!chapter) {
      return <p>Chapter not found.</p>;
    }

    return <ChapterContent chapter={chapter} />;
  }

  if (view.type === "appendix" && codex.appendix) {
    return <AppendixContent appendix={codex.appendix} />;
  }

  return <p>Appendix forthcoming.</p>;
}

function PrefaceContent({ codex }: { codex: ArcaneaCodex }) {
  return (
    <div className="space-y-6">
      {codex.preface.invocation ? (
        <p className="text-base leading-relaxed text-white">{codex.preface.invocation}</p>
      ) : null}
      {codex.preface.body?.map((paragraph, index) => (
        <p key={`preface-body-${index}`} className="leading-relaxed">
          {paragraph}
        </p>
      ))}
      {codex.preface.oath ? (
        <blockquote className="rounded-2xl border border-[#7fffd4]/40 bg-[#101726]/60 p-5 text-sm italic text-[#7fffd4]">
          {codex.preface.oath}
        </blockquote>
      ) : null}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7fffd4]">Remembering luminor</h4>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {codex.authors.map((author) => (
            <li key={author.name} className="rounded-xl border border-white/10 bg-[#101726]/60 p-4">
              <p className="text-sm font-semibold text-white">{author.name}</p>
              <p className="mt-1 text-xs text-[#9bb1d0]">{author.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ChapterContent({ chapter }: { chapter: CodexChapter }) {
  return (
    <div className="space-y-8">
      {chapter.epigraph ? (
        <blockquote className="rounded-2xl border border-[#78a6ff]/30 bg-[#101726]/60 p-5 text-sm italic text-[#7fffd4]">
          <p>{chapter.epigraph.text}</p>
          {chapter.epigraph.attribution ? (
            <footer className="mt-3 text-xs text-[#9bb1d0]">— {chapter.epigraph.attribution}</footer>
          ) : null}
        </blockquote>
      ) : null}
      {chapter.introduction?.map((paragraph, index) => (
        <p key={`intro-${index}`} className="leading-relaxed">
          {paragraph}
        </p>
      ))}
      {chapter.sections.map((section) => (
        <ChapterSection key={section.heading} section={section} />
      ))}
      {chapter.rituals?.length ? (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7fffd4]">Rituals and prompts</h4>
          <ul className="space-y-2">
            {chapter.rituals.map((ritual, index) => (
              <li key={`ritual-${index}`} className="rounded-xl border border-white/10 bg-[#101726]/60 p-4">
                {ritual}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {chapter.measurements?.length ? (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7fffd4]">Measurement constellations</h4>
          <ul className="space-y-3">
            {chapter.measurements.map((measurement, index) => (
              <li key={`measurement-${index}`} className="rounded-xl border border-[#78a6ff]/30 bg-[#101726]/60 p-4">
                <p className="font-semibold text-white">{measurement.name}</p>
                <p className="mt-1 text-sm text-[#c7d6f1]">{measurement.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function ChapterSection({ section }: { section: CodexSection }) {
  return (
    <section className="space-y-4 rounded-2xl border border-white/10 bg-[#101726]/50 p-5">
      <div>
        <h4 className="text-lg font-semibold text-white">{section.heading}</h4>
      </div>
      {section.body?.map((paragraph, index) => (
        <p key={`body-${index}`} className="leading-relaxed text-[#c7d6f1]">
          {paragraph}
        </p>
      ))}
      {section.insights?.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {section.insights.map((insight, index) => (
            <div
              key={`insight-${index}`}
              className="rounded-xl border border-[#78a6ff]/30 bg-[#0f1727] p-4"
            >
              <p className="text-sm font-semibold text-white">{insight.title}</p>
              <p className="mt-2 text-sm text-[#c7d6f1]">{insight.detail}</p>
            </div>
          ))}
        </div>
      ) : null}
      {section.artifacts?.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {section.artifacts.map((artifact, index) => (
            <div
              key={`artifact-${index}`}
              className="rounded-xl border border-[#7fffd4]/30 bg-[#0f1727] p-4"
            >
              <p className="text-sm font-semibold text-white">{artifact.name}</p>
              <p className="mt-2 text-sm text-[#c7d6f1]">{artifact.description}</p>
              {artifact.application ? (
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#7fffd4]">
                  Application: {artifact.application}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
      {section.principles?.length ? (
        <div className="space-y-2">
          <h5 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#7fffd4]">Guiding principles</h5>
          <ul className="space-y-2">
            {section.principles.map((principle, index) => (
              <li
                key={`principle-${index}`}
                className="rounded-lg border border-white/10 bg-[#0f1727] p-3 text-sm text-[#c7d6f1]"
              >
                {principle}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function AppendixContent({
  appendix,
}: {
  appendix: NonNullable<ArcaneaCodex["appendix"]>;
}) {
  return (
    <div className="space-y-8">
      {appendix.entries?.map((entry, index) => (
        <section
          key={`${entry.heading}-${index}`}
          className="space-y-4 rounded-2xl border border-white/10 bg-[#101726]/60 p-5"
        >
          <h4 className="text-lg font-semibold text-white">{entry.heading}</h4>
          {entry.body?.map((paragraph, bodyIndex) => (
            <p key={`entry-body-${bodyIndex}`} className="leading-relaxed text-[#c7d6f1]">
              {paragraph}
            </p>
          ))}
          {entry.points?.length ? (
            <ul className="space-y-2">
              {entry.points.map((point, pointIndex) => (
                <li
                  key={`entry-point-${pointIndex}`}
                  className="rounded-lg border border-white/10 bg-[#0f1727] p-3 text-sm text-[#c7d6f1]"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      {appendix.glossary?.length ? (
        <section className="space-y-4 rounded-2xl border border-[#7fffd4]/30 bg-[#101726]/60 p-5">
          <h4 className="text-lg font-semibold text-white">Glossary of living terms</h4>
          <dl className="grid gap-4 md:grid-cols-2">
            {appendix.glossary.map((entry, index) => (
              <div
                key={`glossary-${index}`}
                className="rounded-xl border border-white/10 bg-[#0f1727] p-4"
              >
                <dt className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7fffd4]">
                  {entry.term}
                </dt>
                <dd className="mt-2 text-sm text-[#c7d6f1]">{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </div>
  );
}
