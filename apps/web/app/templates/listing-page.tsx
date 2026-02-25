"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CosmicCard, CosmicCardContent } from "@/components/ui/cosmic-card";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  X,
  SortAsc,
  SortDesc,
  Calendar,
  Star,
  Eye,
  Heart,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface ListingPageProps {
  /** Page configuration */
  config: {
    title: string;
    description?: string;
    totalCount?: number;
  };
  /** Filter options */
  filters?: Array<{
    id: string;
    label: string;
    options: Array<{
      value: string;
      label: string;
      count?: number;
    }>;
    selected?: string[];
  }>;
  /** Sort options */
  sort?: {
    options: Array<{
      value: string;
      label: string;
    }>;
    value?: string;
  };
  /** Items to display */
  items?: Array<{
    id: string;
    title: string;
    description?: string;
    image?: string;
    metadata?: {
      date?: string;
      views?: number;
      likes?: number;
      rating?: number;
      author?: string;
      category?: string;
      tag?: string;
    };
    href: string;
  }>;
  /** View mode */
  viewMode?: "grid" | "list";
  /** Pagination */
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
  };
  /** Search */
  search?: {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
  };
  /** Loading state */
  isLoading?: boolean;
  /** Custom className */
  className?: string;
}

// ─── Skeleton Components ──────────────────────────────────────────────────────

function ListingPageSkeleton() {
  return (
    <div className="min-h-screen py-8 px-6">
      {/* Header skeleton */}
      <div className="max-w-7xl mx-auto mb-8">
        <Skeleton variant="text" className="w-64 h-10 mb-2" />
        <Skeleton variant="text" className="w-96 h-5" />
      </div>

      {/* Controls skeleton */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <Skeleton variant="rect" className="w-full md:w-80 h-10" />
          <div className="flex items-center gap-2">
            <Skeleton variant="rect" className="w-24 h-10" />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="circle" width={40} height={40} />
          </div>
        </div>
      </div>

      {/* Filters skeleton */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              variant="rect"
              className="w-20 h-8 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Header Component ─────────────────────────────────────────────────────────

function Header({ config }: { config: ListingPageProps["config"] }) {
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            {config.title}
          </h1>
          {config.description && (
            <p className="text-text-secondary font-body">
              {config.description}
            </p>
          )}
        </div>
        {config.totalCount !== undefined && (
          <div className="text-right">
            <div className="text-2xl font-display font-bold text-white">
              {config.totalCount.toLocaleString()}
            </div>
            <div className="text-sm text-text-muted">Total Items</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Controls Component ────────────────────────────────────────────────────────

function Controls({
  config,
  sort,
  viewMode,
  search,
  onViewModeChange,
}: {
  config: ListingPageProps["config"];
  sort?: ListingPageProps["sort"];
  viewMode?: "grid" | "list";
  search?: ListingPageProps["search"];
  onViewModeChange?: (mode: "grid" | "list") => void;
}) {
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Search */}
        {search && (
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder={search.placeholder || "Search..."}
              value={search.value}
              onChange={(e) => search.onChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-cosmic-raised border border-cosmic-border text-white placeholder:text-text-muted focus:outline-none focus:border-brand-primary/50 transition-colors"
            />
          </div>
        )}

        {/* Sort & View */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Sort */}
          {sort && (
            <select
              value={sort.value}
              onChange={(e) => {
                const option = sort.options.find(
                  (o) => o.value === e.target.value,
                );
                if (option) {
                  // Trigger sort change
                  console.log("Sort changed:", option.value);
                }
              }}
              className="h-10 px-3 rounded-lg bg-cosmic-raised border border-cosmic-border text-white focus:outline-none focus:border-brand-primary/50 transition-colors cursor-pointer"
            >
              {sort.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {/* View Mode */}
          <div className="flex items-center border border-cosmic-border rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange?.("grid")}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === "grid"
                  ? "bg-brand-primary text-cosmic-void"
                  : "text-text-muted hover:text-white hover:bg-cosmic-raised",
              )}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange?.("list")}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === "list"
                  ? "bg-brand-primary text-cosmic-void"
                  : "text-text-muted hover:text-white hover:bg-cosmic-raised",
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Filter Bar Component ────────────────────────────────────────────────────

function FilterBar({ filters }: { filters?: ListingPageProps["filters"] }) {
  if (!filters || filters.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="w-4 h-4 text-text-muted mr-2" />
        {filters.map((filter) => (
          <div key={filter.id} className="flex flex-wrap gap-2">
            {filter.options.map((option) => (
              <button
                key={option.value}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm transition-all",
                  filter.selected?.includes(option.value)
                    ? "bg-brand-primary text-cosmic-void"
                    : "bg-cosmic-raised border border-cosmic-border text-text-secondary hover:text-white hover:border-brand-primary/30",
                )}
              >
                {option.label}
                {option.count !== undefined && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({option.count})
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Item Card Component ─────────────────────────────────────────────────────

function ItemCard({
  item,
  viewMode,
}: {
  item: ListingPageProps["items"] extends Array<infer U> ? U : never;
  viewMode?: "grid" | "list";
}) {
  const isList = viewMode === "list";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={item.href}>
        <CosmicCard
          glow
          className={cn(
            "group overflow-hidden transition-all hover:border-brand-primary/30",
            isList ? "flex" : "h-full",
          )}
        >
          {/* Image */}
          <div
            className={cn(
              "relative overflow-hidden bg-cosmic-raised",
              isList ? "w-48 shrink-0" : "aspect-video",
            )}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-4xl opacity-20">✨</div>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void/80 to-transparent" />

            {/* Category badge */}
            {item.metadata?.category && (
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-cosmic-void/70 backdrop-blur-sm text-white">
                  {item.metadata.category}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <CosmicCardContent
            className={cn(
              "p-4",
              isList && "flex-1 flex flex-col justify-between",
            )}
          >
            <div>
              <h3 className="font-display font-semibold text-white group-hover:text-brand-primary transition-colors mb-2 line-clamp-2">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                  {item.description}
                </p>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-text-muted">
              {item.metadata?.date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.metadata.date}</span>
                </div>
              )}
              {item.metadata?.views !== undefined && (
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{item.metadata.views.toLocaleString()}</span>
                </div>
              )}
              {item.metadata?.likes !== undefined && (
                <div className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{item.metadata.likes.toLocaleString()}</span>
                </div>
              )}
              {item.metadata?.rating !== undefined && (
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-gold-medium" />
                  <span>{item.metadata.rating}</span>
                </div>
              )}
            </div>
          </CosmicCardContent>
        </CosmicCard>
      </Link>
    </motion.div>
  );
}

// ─── Pagination Component ────────────────────────────────────────────────────

function Pagination({
  pagination,
}: {
  pagination?: ListingPageProps["pagination"];
}) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages, onPageChange } = pagination;

  return (
    <div className="max-w-7xl mx-auto mt-12">
      <div className="flex items-center justify-center gap-2">
        {/* Previous */}
        <Button
          variant="cosmic"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              // Show first, last, current, and adjacent pages
              return (
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
              );
            })
            .map((page, index, arr) => (
              <React.Fragment key={page}>
                {/* Ellipsis */}
                {index > 0 && arr[index - 1] !== page - 1 && (
                  <span className="px-2 text-text-muted">...</span>
                )}
                <Button
                  variant={page === currentPage ? "default" : "cosmic"}
                  size="icon"
                  onClick={() => onPageChange?.(page)}
                >
                  {page}
                </Button>
              </React.Fragment>
            ))}
        </div>

        {/* Next */}
        <Button
          variant="cosmic"
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

// ─── Empty State Component ───────────────────────────────────────────────────

function EmptyState({ config }: { config: ListingPageProps["config"] }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center py-20">
        <div className="w-20 h-20 rounded-2xl bg-cosmic-raised flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-text-muted" />
        </div>
        <h3 className="text-xl font-display font-semibold text-white mb-2">
          No items found
        </h3>
        <p className="text-text-secondary max-w-md mx-auto mb-6">
          We couldn&apos;t find any items matching your criteria. Try adjusting
          your filters or search terms.
        </p>
        <Button variant="cosmic">Clear Filters</Button>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * Premium listing page template with grid/list views, filters, search, and pagination.
 *
 * @example
 * ```tsx
 * import { ListingPage } from '@/app/templates/listing-page';
 *
 * <ListingPage
 *   config={{
 *     title: "Prompt Books",
 *     description: "Explore our collection of premium prompts",
 *     totalCount: 156
 *   }}
 *   filters={[
 *     { id: "category", label: "Category", options: [
 *       { value: "creative", label: "Creative", count: 45 },
 *       { value: "technical", label: "Technical", count: 32 }
 *     ]}
 *   ]}
 *   sort={{
 *     options: [
 *       { value: "newest", label: "Newest First" },
 *       { value: "popular", label: "Most Popular" }
 *     ],
 *     value: "newest"
 *   }}
 *   items={[
 *     { id: "1", title: "Creative Writing Prompt", href: "/prompts/1" }
 *   ]}
 *   pagination={{ currentPage: 1, totalPages: 10 }}
 *   viewMode="grid"
 * />
 * ```
 */
export function ListingPage({
  config,
  filters,
  sort,
  items,
  viewMode = "grid",
  pagination,
  search,
  isLoading = false,
  className,
}: ListingPageProps) {
  const [currentViewMode, setCurrentViewMode] = React.useState(viewMode);

  if (isLoading) {
    return <ListingPageSkeleton />;
  }

  const hasItems = items && items.length > 0;

  return (
    <div className={cn("min-h-screen py-8 px-6", className)}>
      <Header config={config} />

      <Controls
        config={config}
        sort={sort}
        viewMode={currentViewMode}
        search={search}
        onViewModeChange={setCurrentViewMode}
      />

      <FilterBar filters={filters} />

      {hasItems ? (
        <>
          <div className="max-w-7xl mx-auto">
            <div
              className={cn(
                "grid gap-6",
                currentViewMode === "grid"
                  ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1",
              )}
            >
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  viewMode={currentViewMode}
                />
              ))}
            </div>
          </div>

          <Pagination pagination={pagination} />
        </>
      ) : (
        <EmptyState config={config} />
      )}
    </div>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export type { ListingPageProps };
