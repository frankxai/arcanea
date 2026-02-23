"use client";

// Arcanea Prompt Books — Filter Bar
// Horizontal bar with prompt type, favorites, tags, and sort controls

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Star,
  Tag,
  X,
  SlidersHorizontal,
  Check,
  ArrowUpDown,
  Clock,
  ArrowDownAZ,
  TrendingUp,
  Calendar,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePromptBooksStore } from "@/lib/prompt-books/store";
import { PROMPT_TYPES } from "@/lib/prompt-books/constants";
import { Badge } from "@/components/ui/badge";
import type { PromptType, PromptFilters } from "@/lib/prompt-books/types";

// =====================================================================
// Types
// =====================================================================

type SortOption =
  | "newest"
  | "oldest"
  | "most_used"
  | "alphabetical"
  | "recently_used";

interface SortConfig {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SORT_OPTIONS: Record<SortOption, SortConfig> = {
  newest: { label: "Newest", icon: Calendar },
  oldest: { label: "Oldest", icon: CalendarDays },
  most_used: { label: "Most Used", icon: TrendingUp },
  alphabetical: { label: "A-Z", icon: ArrowDownAZ },
  recently_used: { label: "Recently Used", icon: Clock },
};

// =====================================================================
// Dropdown animation
// =====================================================================

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.96, y: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 30,
      mass: 0.6,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: -4,
    transition: { duration: 0.1 },
  },
};

// =====================================================================
// Generic Dropdown Hook
// =====================================================================

function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  return { isOpen, setIsOpen, ref };
}

// =====================================================================
// Component
// =====================================================================

export function FilterBar() {
  const {
    tags: allTags,
    loadPrompts,
    activeCollectionId,
  } = usePromptBooksStore();

  // ── Filter state ────────────────────────────────────────────────────
  const [selectedType, setSelectedType] = useState<PromptType | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // ── Dropdown controls ───────────────────────────────────────────────
  const typeDropdown = useDropdown();
  const tagDropdown = useDropdown();
  const sortDropdown = useDropdown();

  // ── Active filter count ─────────────────────────────────────────────
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedType) count++;
    if (favoritesOnly) count++;
    if (selectedTagIds.length > 0) count++;
    if (sortBy !== "newest") count++;
    return count;
  }, [selectedType, favoritesOnly, selectedTagIds, sortBy]);

  // ── Build filters and reload ────────────────────────────────────────
  const applyFilters = useCallback(() => {
    const filters: PromptFilters = {};

    if (activeCollectionId) {
      filters.collectionId = activeCollectionId;
    }
    if (selectedType) {
      filters.promptType = selectedType;
    }
    if (favoritesOnly) {
      filters.isFavorite = true;
    }
    if (selectedTagIds.length > 0) {
      filters.tagIds = selectedTagIds;
    }

    loadPrompts(filters);
  }, [
    activeCollectionId,
    selectedType,
    favoritesOnly,
    selectedTagIds,
    loadPrompts,
  ]);

  // ── Re-apply filters on change ──────────────────────────────────────
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // ── Clear all ───────────────────────────────────────────────────────
  const clearAll = useCallback(() => {
    setSelectedType(null);
    setFavoritesOnly(false);
    setSelectedTagIds([]);
    setSortBy("newest");
  }, []);

  // ── Toggle tag ──────────────────────────────────────────────────────
  const toggleTag = useCallback((tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  }, []);

  // ── Resolve selected tag names ──────────────────────────────────────
  const selectedTagNames = useMemo(
    () =>
      selectedTagIds
        .map((id) => allTags.find((t) => t.id === id)?.name)
        .filter(Boolean) as string[],
    [selectedTagIds, allTags],
  );

  // ── All prompt type entries ─────────────────────────────────────────
  const promptTypeEntries = useMemo(
    () =>
      Object.entries(PROMPT_TYPES) as [
        PromptType,
        (typeof PROMPT_TYPES)[PromptType],
      ][],
    [],
  );

  return (
    <div className="px-6 py-2.5 border-b border-white/5">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Filter icon */}
        <div className="flex items-center gap-1.5 text-text-muted mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          {activeFilterCount > 0 && (
            <span className="text-[10px] font-sans font-semibold bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>

        {/* ── Prompt Type Dropdown ──────────────────────────────────── */}
        <div ref={typeDropdown.ref} className="relative">
          <button
            onClick={() => typeDropdown.setIsOpen(!typeDropdown.isOpen)}
            className={cn(
              "glass-subtle px-3 py-1.5 rounded-lg text-xs font-sans",
              "flex items-center gap-1.5 transition-all duration-150",
              "hover:bg-white/[0.06] hover:border-white/10",
              "border",
              selectedType
                ? "border-brand-accent/30 text-brand-accent"
                : "border-transparent text-text-muted hover:text-text-secondary",
            )}
            aria-haspopup="listbox"
            aria-expanded={typeDropdown.isOpen}
          >
            <span>
              {selectedType ? PROMPT_TYPES[selectedType].label : "Type"}
            </span>
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform duration-200",
                typeDropdown.isOpen && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {typeDropdown.isOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="listbox"
                aria-label="Prompt type filter"
                className={cn(
                  "absolute top-full left-0 mt-1.5 z-50 min-w-[180px]",
                  "rounded-xl p-1.5",
                  "bg-[rgba(12,16,28,0.96)] backdrop-blur-[20px]",
                  "border border-[rgba(127,255,212,0.12)]",
                  "shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
                )}
              >
                {/* All types option */}
                <button
                  role="option"
                  aria-selected={!selectedType}
                  onClick={() => {
                    setSelectedType(null);
                    typeDropdown.setIsOpen(false);
                  }}
                  className={cn(
                    "w-full px-2.5 py-2 rounded-md text-left text-xs font-sans",
                    "flex items-center justify-between gap-2",
                    "transition-colors duration-100",
                    !selectedType
                      ? "bg-white/[0.06] text-text-primary"
                      : "text-text-secondary hover:bg-white/[0.04] hover:text-text-primary",
                  )}
                >
                  <span>All Types</span>
                  {!selectedType && (
                    <Check className="w-3 h-3 text-brand-accent" />
                  )}
                </button>

                <div className="my-1 h-px bg-white/5" role="separator" />

                {promptTypeEntries.map(([key, config]) => (
                  <button
                    key={key}
                    role="option"
                    aria-selected={selectedType === key}
                    onClick={() => {
                      setSelectedType(key);
                      typeDropdown.setIsOpen(false);
                    }}
                    className={cn(
                      "w-full px-2.5 py-2 rounded-md text-left text-xs font-sans",
                      "flex items-center justify-between gap-2",
                      "transition-colors duration-100",
                      selectedType === key
                        ? "bg-white/[0.06] text-text-primary"
                        : "text-text-secondary hover:bg-white/[0.04] hover:text-text-primary",
                    )}
                  >
                    <span>{config.label}</span>
                    {selectedType === key && (
                      <Check className="w-3 h-3 text-brand-accent" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Favorites Toggle ─────────────────────────────────────── */}
        <button
          onClick={() => setFavoritesOnly(!favoritesOnly)}
          className={cn(
            "glass-subtle px-3 py-1.5 rounded-lg text-xs font-sans",
            "flex items-center gap-1.5 transition-all duration-150",
            "border",
            favoritesOnly
              ? "border-brand-gold/30 text-brand-gold"
              : "border-transparent text-text-muted hover:text-text-secondary hover:bg-white/[0.06]",
          )}
          aria-pressed={favoritesOnly}
          aria-label="Filter favorites"
        >
          <Star className={cn("w-3 h-3", favoritesOnly && "fill-brand-gold")} />
          <span>Favorites</span>
        </button>

        {/* ── Tags Dropdown ────────────────────────────────────────── */}
        <div ref={tagDropdown.ref} className="relative">
          <button
            onClick={() => tagDropdown.setIsOpen(!tagDropdown.isOpen)}
            className={cn(
              "glass-subtle px-3 py-1.5 rounded-lg text-xs font-sans",
              "flex items-center gap-1.5 transition-all duration-150",
              "hover:bg-white/[0.06]",
              "border",
              selectedTagIds.length > 0
                ? "border-brand-primary/30 text-brand-primary"
                : "border-transparent text-text-muted hover:text-text-secondary",
            )}
            aria-haspopup="listbox"
            aria-expanded={tagDropdown.isOpen}
          >
            <Tag className="w-3 h-3" />
            <span>
              {selectedTagIds.length > 0
                ? `${selectedTagIds.length} tag${selectedTagIds.length !== 1 ? "s" : ""}`
                : "Tags"}
            </span>
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform duration-200",
                tagDropdown.isOpen && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {tagDropdown.isOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="listbox"
                aria-label="Tags filter"
                aria-multiselectable="true"
                className={cn(
                  "absolute top-full left-0 mt-1.5 z-50 min-w-[200px] max-w-[280px]",
                  "rounded-xl p-1.5",
                  "bg-[rgba(12,16,28,0.96)] backdrop-blur-[20px]",
                  "border border-[rgba(127,255,212,0.12)]",
                  "shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
                )}
              >
                {allTags.length === 0 ? (
                  <div className="px-3 py-4 text-center text-xs font-sans text-text-muted">
                    No tags available
                  </div>
                ) : (
                  <div className="max-h-[240px] overflow-y-auto overscroll-contain">
                    {allTags.map((tag) => {
                      const isSelected = selectedTagIds.includes(tag.id);
                      return (
                        <button
                          key={tag.id}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => toggleTag(tag.id)}
                          className={cn(
                            "w-full px-2.5 py-2 rounded-md text-left text-xs font-sans",
                            "flex items-center justify-between gap-2",
                            "transition-colors duration-100",
                            isSelected
                              ? "bg-white/[0.06] text-text-primary"
                              : "text-text-secondary hover:bg-white/[0.04] hover:text-text-primary",
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {tag.color && (
                              <div
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: tag.color }}
                              />
                            )}
                            <span className="truncate">{tag.name}</span>
                          </div>
                          {isSelected && (
                            <Check className="w-3 h-3 text-brand-accent flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Sort Dropdown ────────────────────────────────────────── */}
        <div ref={sortDropdown.ref} className="relative ml-auto">
          <button
            onClick={() => sortDropdown.setIsOpen(!sortDropdown.isOpen)}
            className={cn(
              "glass-subtle px-3 py-1.5 rounded-lg text-xs font-sans",
              "flex items-center gap-1.5 transition-all duration-150",
              "hover:bg-white/[0.06]",
              "border",
              sortBy !== "newest"
                ? "border-brand-accent/30 text-brand-accent"
                : "border-transparent text-text-muted hover:text-text-secondary",
            )}
            aria-haspopup="listbox"
            aria-expanded={sortDropdown.isOpen}
          >
            <ArrowUpDown className="w-3 h-3" />
            <span>{SORT_OPTIONS[sortBy].label}</span>
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform duration-200",
                sortDropdown.isOpen && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {sortDropdown.isOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="listbox"
                aria-label="Sort order"
                className={cn(
                  "absolute top-full right-0 mt-1.5 z-50 min-w-[170px]",
                  "rounded-xl p-1.5",
                  "bg-[rgba(12,16,28,0.96)] backdrop-blur-[20px]",
                  "border border-[rgba(127,255,212,0.12)]",
                  "shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
                )}
              >
                {(
                  Object.entries(SORT_OPTIONS) as [SortOption, SortConfig][]
                ).map(([key, config]) => {
                  const SortIcon = config.icon;
                  const isActive = sortBy === key;
                  return (
                    <button
                      key={key}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => {
                        setSortBy(key);
                        sortDropdown.setIsOpen(false);
                      }}
                      className={cn(
                        "w-full px-2.5 py-2 rounded-md text-left text-xs font-sans",
                        "flex items-center gap-2",
                        "transition-colors duration-100",
                        isActive
                          ? "bg-white/[0.06] text-text-primary"
                          : "text-text-secondary hover:bg-white/[0.04] hover:text-text-primary",
                      )}
                    >
                      <SortIcon className="w-3.5 h-3.5 text-text-muted" />
                      <span className="flex-1">{config.label}</span>
                      {isActive && (
                        <Check className="w-3 h-3 text-brand-accent" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Active Filter Chips ──────────────────────────────────────── */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {selectedType && (
            <Badge
              variant="crystal"
              size="sm"
              onDismiss={() => setSelectedType(null)}
              dismissLabel={`Remove ${PROMPT_TYPES[selectedType].label} filter`}
            >
              {PROMPT_TYPES[selectedType].label}
            </Badge>
          )}

          {favoritesOnly && (
            <Badge
              variant="gold"
              size="sm"
              icon={<Star className="w-3 h-3 fill-current" />}
              onDismiss={() => setFavoritesOnly(false)}
              dismissLabel="Remove favorites filter"
            >
              Favorites
            </Badge>
          )}

          {selectedTagNames.map((name, i) => (
            <Badge
              key={selectedTagIds[i]}
              variant="brand"
              size="sm"
              onDismiss={() => toggleTag(selectedTagIds[i])}
              dismissLabel={`Remove ${name} filter`}
            >
              {name}
            </Badge>
          ))}

          {sortBy !== "newest" && (
            <Badge
              variant="default"
              size="sm"
              onDismiss={() => setSortBy("newest")}
              dismissLabel="Reset sort order"
            >
              Sort: {SORT_OPTIONS[sortBy].label}
            </Badge>
          )}

          <button
            onClick={clearAll}
            className="text-[11px] font-sans text-text-muted hover:text-brand-accent transition-colors duration-150 ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
