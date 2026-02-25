"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CosmicCard,
  CosmicCardHeader,
  CosmicCardTitle,
  CosmicCardContent,
  CosmicCardFooter,
} from "@/components/ui/cosmic-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Star,
  User,
  Tag,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface DetailPageProps {
  /** Page configuration */
  config: {
    title: string;
    description?: string;
    image?: string;
    badge?: {
      text: string;
      color?: string;
    };
  };
  /** Author/creator info */
  author?: {
    name: string;
    avatar?: string;
    href?: string;
  };
  /** Metadata */
  metadata?: {
    publishedDate?: string;
    updatedDate?: string;
    readTime?: string;
    views?: number;
    likes?: number;
    rating?: number;
  };
  /** Tags */
  tags?: Array<{
    id: string;
    label: string;
    href?: string;
  }>;
  /** Related items */
  related?: Array<{
    id: string;
    title: string;
    image?: string;
    href: string;
  }>;
  /** Table of contents */
  tableOfContents?: Array<{
    id: string;
    label: string;
    level: number;
  }>;
  /** Main content (can be rendered separately) */
  children?: React.ReactNode;
  /** Sidebar content */
  sidebar?: React.ReactNode;
  /** Actions */
  actions?: {
    share?: {
      text: string;
      onClick?: () => void;
    };
    bookmark?: {
      saved: boolean;
      onClick?: () => void;
    };
  };
  /** Loading state */
  isLoading?: boolean;
  /** Custom className */
  className?: string;
}

// ─── Skeleton Components ──────────────────────────────────────────────────────

function DetailPageSkeleton() {
  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back link skeleton */}
        <div className="mb-8">
          <Skeleton variant="rect" className="w-24 h-8 rounded-lg" />
        </div>

        {/* Hero skeleton */}
        <div className="mb-12">
          <Skeleton variant="rect" className="w-32 h-6 rounded-full mb-4" />
          <Skeleton variant="text" className="w-3/4 h-12 mb-4" />
          <Skeleton variant="text" className="w-full h-6 mb-2" />
          <Skeleton variant="text" className="w-2/3 h-6" />
        </div>

        {/* Content skeleton */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton
              variant="rect"
              className="w-full aspect-video rounded-xl mb-8"
            />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} variant="text" className="w-full h-4" />
              ))}
              <Skeleton variant="text" className="w-3/4 h-4" />
            </div>
          </div>
          <div>
            <CosmicCard className="p-6">
              <Skeleton variant="text" className="w-32 h-6 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} variant="text" className="w-full h-4" />
                ))}
              </div>
            </CosmicCard>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Header Component ─────────────────────────────────────────────────────────

function Header({
  config,
  author,
  metadata,
}: {
  config: DetailPageProps["config"];
  author?: DetailPageProps["author"];
  metadata?: DetailPageProps["metadata"];
}) {
  return (
    <div className="mb-12">
      {/* Back link */}
      <Link
        href="javascript:history.back()"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>

      {/* Badge */}
      {config.badge && (
        <div className="mb-4">
          <span
            className={cn(
              "inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider",
              config.badge.color
                ? config.badge.color
                : "bg-brand-primary/20 text-brand-primary border border-brand-primary/30",
            )}
          >
            {config.badge.text}
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
        {config.title}
      </h1>

      {/* Description */}
      {config.description && (
        <p className="text-xl text-text-secondary font-body leading-relaxed mb-6 max-w-3xl">
          {config.description}
        </p>
      )}

      {/* Author & Metadata */}
      <div className="flex flex-wrap items-center gap-6">
        {author && (
          <Link
            href={author.href || "#"}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-creation-prism-purple flex items-center justify-center text-cosmic-void font-medium">
              {author.name.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-white group-hover:text-brand-primary transition-colors">
                {author.name}
              </div>
              <div className="text-xs text-text-muted">Author</div>
            </div>
          </Link>
        )}

        {metadata && (
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            {metadata.publishedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{metadata.publishedDate}</span>
              </div>
            )}
            {metadata.readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{metadata.readTime}</span>
              </div>
            )}
            {metadata.views !== undefined && (
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>{metadata.views.toLocaleString()} views</span>
              </div>
            )}
            {metadata.likes !== undefined && (
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                <span>{metadata.likes.toLocaleString()}</span>
              </div>
            )}
            {metadata.rating !== undefined && (
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-gold-medium fill-gold-medium" />
                <span>{metadata.rating}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Hero Image Component ─────────────────────────────────────────────────────

function HeroImage({ image }: { image?: string }) {
  if (!image) return null;

  return (
    <div className="relative mb-12 rounded-2xl overflow-hidden">
      <img
        src={image}
        alt="Hero"
        className="w-full aspect-video object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void/60 via-transparent to-transparent" />
    </div>
  );
}

// ─── Table of Contents Component ─────────────────────────────────────────────

function TableOfContents({
  tableOfContents,
}: {
  tableOfContents?: DetailPageProps["tableOfContents"];
}) {
  if (!tableOfContents || tableOfContents.length === 0) return null;

  return (
    <CosmicCard glass className="p-6 mb-8">
      <h3 className="font-display font-semibold text-white mb-4">
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {tableOfContents.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block text-sm transition-colors hover:text-brand-primary",
              item.level === 2 && "pl-0",
              item.level === 3 && "pl-4",
              item.level === 4 && "pl-8",
              "text-text-secondary",
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </CosmicCard>
  );
}

// ─── Tags Component ────────────────────────────────────────────────────────────

function Tags({ tags }: { tags?: DetailPageProps["tags"] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <Tag className="w-4 h-4 text-text-muted" />
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={tag.href || `#${tag.id}`}
          className="px-3 py-1 rounded-full text-sm bg-cosmic-raised border border-cosmic-border text-text-secondary hover:text-white hover:border-brand-primary/30 transition-colors"
        >
          {tag.label}
        </Link>
      ))}
    </div>
  );
}

// ─── Action Buttons Component ────────────────────────────────────────────────

function ActionButtons({ actions }: { actions?: DetailPageProps["actions"] }) {
  const [copied, setCopied] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(
    actions?.bookmark?.saved || false,
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    actions?.share?.onClick?.();
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    actions?.bookmark?.onClick?.();
  };

  return (
    <div className="flex items-center gap-3 mb-8">
      {/* Share */}
      <Button variant="cosmic" size="sm" onClick={handleCopy}>
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Copied
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </>
        )}
      </Button>

      {/* Bookmark */}
      <Button
        variant={bookmarked ? "default" : "cosmic"}
        size="sm"
        onClick={handleBookmark}
      >
        <Bookmark
          className={cn("w-4 h-4 mr-2", bookmarked && "fill-current")}
        />
        {bookmarked ? "Saved" : "Save"}
      </Button>

      {/* External link */}
      <Button variant="outline" size="sm">
        <ExternalLink className="w-4 h-4 mr-2" />
        Original
      </Button>
    </div>
  );
}

// ─── Sidebar Component ────────────────────────────────────────────────────────

function Sidebar({
  config,
  author,
  metadata,
  tags,
  sidebar,
}: {
  config: DetailPageProps["config"];
  author?: DetailPageProps["author"];
  metadata?: DetailPageProps["metadata"];
  tags?: DetailPageProps["tags"];
  sidebar?: React.ReactNode;
}) {
  return (
    <aside className="space-y-6">
      {/* Author Card */}
      {author && (
        <CosmicCard className="p-6">
          <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-brand-primary" />
            Author
          </h3>
          <Link
            href={author.href || "#"}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-creation-prism-purple flex items-center justify-center text-cosmic-void font-bold text-lg">
              {author.name.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-white group-hover:text-brand-primary transition-colors">
                {author.name}
              </div>
              <div className="text-sm text-text-muted">Creator</div>
            </div>
          </Link>
        </CosmicCard>
      )}

      {/* Stats Card */}
      {metadata && (
        <CosmicCard className="p-6">
          <h3 className="font-display font-semibold text-white mb-4">
            Statistics
          </h3>
          <div className="space-y-3">
            {metadata.views !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-text-secondary flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Views
                </span>
                <span className="font-medium text-white">
                  {metadata.views.toLocaleString()}
                </span>
              </div>
            )}
            {metadata.likes !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-text-secondary flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Likes
                </span>
                <span className="font-medium text-white">
                  {metadata.likes.toLocaleString()}
                </span>
              </div>
            )}
            {metadata.rating !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-text-secondary flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Rating
                </span>
                <span className="font-medium text-white flex items-center gap-1">
                  {metadata.rating}
                  <Star className="w-3 h-3 text-gold-medium fill-gold-medium" />
                </span>
              </div>
            )}
            {metadata.readTime && (
              <div className="flex items-center justify-between">
                <span className="text-text-secondary flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Read Time
                </span>
                <span className="font-medium text-white">
                  {metadata.readTime}
                </span>
              </div>
            )}
          </div>
        </CosmicCard>
      )}

      {/* Tags Card */}
      {tags && tags.length > 0 && (
        <CosmicCard className="p-6">
          <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
            <Tag className="w-4 h-4 text-brand-primary" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={tag.href || `#${tag.id}`}
                className="px-3 py-1 rounded-full text-sm bg-cosmic-raised border border-cosmic-border text-text-secondary hover:text-white hover:border-brand-primary/30 transition-colors"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </CosmicCard>
      )}

      {/* Custom Sidebar Content */}
      {sidebar}
    </aside>
  );
}

// ─── Related Items Component ──────────────────────────────────────────────────

function RelatedItems({ related }: { related?: DetailPageProps["related"] }) {
  if (!related || related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-white/5">
      <h2 className="text-2xl font-display font-bold text-white mb-8">
        Related Items
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {related.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={item.href}>
              <CosmicCard glow className="overflow-hidden group">
                <div className="aspect-video bg-cosmic-raised overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl opacity-20">✨</span>
                    </div>
                  )}
                </div>
                <CosmicCardContent className="p-4">
                  <h3 className="font-display font-semibold text-white group-hover:text-brand-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </CosmicCardContent>
              </CosmicCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * Premium detail page template with hero, content, sidebar, and related items.
 *
 * @example
 * ```tsx
 * import { DetailPage } from '@/app/templates/detail-page';
 *
 * <DetailPage
 *   config={{
 *     title: "The Art of Prompt Engineering",
 *     description: "Master the craft of AI prompt creation",
 *     badge: { text: "Tutorial" }
 *   }}
 *   author={{ name: "Frank", href: "/profile/frank" }}
 *   metadata={{
 *     publishedDate: "Feb 25, 2026",
 *     readTime: "8 min read",
 *     views: 1245,
 *     likes: 89
 *   }}
 *   tags={[
 *     { id: "ai", label: "AI", href: "/tags/ai" },
 *     { id: "prompts", label: "Prompts", href: "/tags/prompts" }
 *   ]}
 *   tableOfContents={[
 *     { id: "intro", label: "Introduction", level: 2 },
 *     { id: "basics", label: "Prompt Basics", level: 2 }
 *   ]}
 * >
 *   <div>Main content goes here...</div>
 * </DetailPage>
 * ```
 */
export function DetailPage({
  config,
  author,
  metadata,
  tags,
  related,
  tableOfContents,
  children,
  sidebar,
  actions,
  isLoading = false,
  className,
}: DetailPageProps) {
  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  return (
    <div className={cn("min-h-screen py-8 px-6", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header config={config} author={author} metadata={metadata} />

        {/* Hero Image */}
        <HeroImage image={config.image} />

        {/* Actions */}
        <ActionButtons actions={actions} />

        {/* Tags */}
        <Tags tags={tags} />

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Table of Contents (desktop) */}
            <div className="hidden lg:block">
              <TableOfContents tableOfContents={tableOfContents} />
            </div>

            {/* Article Content */}
            <article className="prose prose-invert max-w-none">
              {children}
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <Sidebar
                config={config}
                author={author}
                metadata={metadata}
                tags={tags}
                sidebar={sidebar}
              />
            </div>
          </div>
        </div>

        {/* Related Items */}
        <RelatedItems related={related} />
      </div>
    </div>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export type { DetailPageProps };
