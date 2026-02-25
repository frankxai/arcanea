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
import { Skeleton, SkeletonAvatar } from "@/components/ui/skeleton";
import {
  LayoutDashboard,
  Home,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  FileText,
  Star,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface DashboardProps {
  /** Dashboard configuration */
  config: {
    title: string;
    description?: string;
    user?: {
      name: string;
      email?: string;
      avatar?: string;
    };
  };
  /** Sidebar navigation items */
  navigation?: Array<{
    id: string;
    label: string;
    href: string;
    icon?: React.ReactNode;
    badge?: string | number;
    active?: boolean;
  }>;
  /** Main content cards */
  cards?: Array<{
    id: string;
    title: string;
    value: string | number;
    change?: {
      value: number;
      type: "positive" | "negative" | "neutral";
    };
    icon?: React.ReactNode;
    href?: string;
  }>;
  /** Activity feed items */
  activity?: Array<{
    id: string;
    title: string;
    description?: string;
    time: string;
    icon?: React.ReactNode;
    href?: string;
  }>;
  /** Recent items list */
  recent?: Array<{
    id: string;
    title: string;
    subtitle?: string;
    metadata?: string;
    icon?: React.ReactNode;
    href?: string;
  }>;
  /** Loading state */
  isLoading?: boolean;
  /** Custom className */
  className?: string;
}

// ─── Skeleton Components ──────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar skeleton */}
      <aside className="w-64 border-r border-white/5 p-4 hidden lg:block">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton variant="circle" width={40} height={40} />
          <div>
            <Skeleton variant="text" className="w-24 h-4 mb-1" />
            <Skeleton variant="text" className="w-16 h-3" />
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <Skeleton variant="circle" width={20} height={20} />
              <Skeleton variant="text" className="w-20 h-4" />
            </div>
          ))}
        </div>
      </aside>

      {/* Main content skeleton */}
      <main className="flex-1 p-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton variant="text" className="w-48 h-8 mb-2" />
            <Skeleton variant="text" className="w-64 h-4" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton variant="rect" className="w-40 h-10" />
            <Skeleton variant="circle" width={40} height={40} />
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <CosmicCard key={i} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton variant="text" className="w-16 h-4 mb-2" />
                  <Skeleton variant="text" className="w-24 h-8" />
                </div>
                <Skeleton variant="circle" width={40} height={40} />
              </div>
            </CosmicCard>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CosmicCard className="p-6">
              <Skeleton variant="text" className="w-32 h-6 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton variant="circle" width={32} height={32} />
                    <div className="flex-1">
                      <Skeleton variant="text" className="w-48 h-4 mb-1" />
                      <Skeleton variant="text" className="w-24 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </CosmicCard>
          </div>
          <div>
            <CosmicCard className="p-6">
              <Skeleton variant="text" className="w-32 h-6 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton variant="text" className="w-full h-4 mb-1" />
                    <Skeleton variant="text" className="w-3/4 h-3" />
                  </div>
                ))}
              </div>
            </CosmicCard>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Sidebar Component ────────────────────────────────────────────────────────

function Sidebar({
  config,
  navigation,
}: {
  config: DashboardProps["config"];
  navigation?: DashboardProps["navigation"];
}) {
  return (
    <aside className="w-64 border-r border-white/5 bg-cosmic-surface/50 backdrop-blur-sm hidden lg:flex flex-col">
      {/* Logo & User */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-atlantean-teal-aqua to-creation-prism-purple flex items-center justify-center text-cosmic-deep font-bold text-lg font-display">
            A
          </div>
          <div>
            <div className="font-display font-semibold text-white">Arcanea</div>
            <div className="text-xs text-text-muted">Dashboard</div>
          </div>
        </div>

        {config.user && (
          <div className="flex items-center gap-3 p-2 rounded-lg bg-cosmic-raised">
            <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-medium">
              {config.user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">
                {config.user.name}
              </div>
              {config.user.email && (
                <div className="text-xs text-text-muted truncate">
                  {config.user.email}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navigation?.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all",
                item.active
                  ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                  : "text-text-secondary hover:text-white hover:bg-cosmic-raised",
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-cosmic-raised">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer links */}
      <div className="p-4 border-t border-white/5">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-white hover:bg-cosmic-raised transition-all"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}

// ─── Header Component ─────────────────────────────────────────────────────────

function Header({ config }: { config: DashboardProps["config"] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-cosmic-void/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-display font-bold text-white">
            {config.title}
          </h1>
          {config.description && (
            <p className="text-sm text-text-muted mt-1">{config.description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg bg-cosmic-raised border border-cosmic-border text-white placeholder:text-text-muted focus:outline-none focus:border-brand-primary/50 transition-colors"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-text-secondary hover:text-white hover:bg-cosmic-raised transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-primary" />
          </button>

          {/* User avatar */}
          {config.user && (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-creation-prism-purple flex items-center justify-center text-cosmic-void font-bold">
              {config.user.name.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Stats Cards ─────────────────────────────────────────────────────────────

function StatsCards({ cards }: { cards?: DashboardProps["cards"] }) {
  if (!cards || cards.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={card.href || "#"}>
            <CosmicCard
              glow
              className="p-4 hover:border-brand-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-text-muted mb-1">{card.title}</p>
                  <p className="text-3xl font-display font-bold text-white">
                    {card.value}
                  </p>
                  {card.change && (
                    <div
                      className={cn(
                        "flex items-center gap-1 text-sm mt-2",
                        card.change.type === "positive"
                          ? "text-green-400"
                          : card.change.type === "negative"
                            ? "text-red-400"
                            : "text-text-muted",
                      )}
                    >
                      {card.change.type === "positive" ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : card.change.type === "negative" ? (
                        <TrendingDown className="w-4 h-4" />
                      ) : (
                        <Activity className="w-4 h-4" />
                      )}
                      <span>
                        {card.change.type === "positive" ? "+" : ""}
                        {card.change.value}%
                      </span>
                    </div>
                  )}
                </div>
                {card.icon && (
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    {card.icon}
                  </div>
                )}
              </div>
            </CosmicCard>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Activity Feed ────────────────────────────────────────────────────────────

function ActivityFeed({ activity }: { activity?: DashboardProps["activity"] }) {
  if (!activity || activity.length === 0) return null;

  return (
    <CosmicCard className="p-6">
      <CosmicCardHeader>
        <CosmicCardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-primary" />
          Recent Activity
        </CosmicCardTitle>
      </CosmicCardHeader>
      <CosmicCardContent>
        <div className="space-y-4">
          {activity.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-cosmic-raised flex items-center justify-center text-text-muted shrink-0">
                {item.icon || <Activity className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={item.href || "#"}
                  className="font-medium text-white hover:text-brand-primary transition-colors"
                >
                  {item.title}
                </Link>
                {item.description && (
                  <p className="text-sm text-text-muted mt-0.5">
                    {item.description}
                  </p>
                )}
                <p className="text-xs text-text-muted mt-1">{item.time}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
            </motion.div>
          ))}
        </div>
      </CosmicCardContent>
      <CosmicCardFooter>
        <Link
          href="/activity"
          className="text-sm text-brand-primary hover:text-brand-primary/80 transition-colors"
        >
          View all activity
        </Link>
      </CosmicCardFooter>
    </CosmicCard>
  );
}

// ─── Recent Items ────────────────────────────────────────────────────────────

function RecentItems({ recent }: { recent?: DashboardProps["recent"] }) {
  if (!recent || recent.length === 0) return null;

  return (
    <CosmicCard className="p-6">
      <CosmicCardHeader>
        <CosmicCardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-primary" />
          Recent Items
        </CosmicCardTitle>
      </CosmicCardHeader>
      <CosmicCardContent>
        <div className="space-y-3">
          {recent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href || "#"}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-cosmic-raised transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-cosmic-raised flex items-center justify-center text-text-muted group-hover:text-brand-primary transition-colors">
                  {item.icon || <FileText className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate group-hover:text-brand-primary transition-colors">
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div className="text-sm text-text-muted truncate">
                      {item.subtitle}
                    </div>
                  )}
                </div>
                {item.metadata && (
                  <div className="text-xs text-text-muted shrink-0">
                    {item.metadata}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </CosmicCardContent>
    </CosmicCard>
  );
}

// ─── Quick Stats ─────────────────────────────────────────────────────────────

function QuickStats() {
  return (
    <CosmicCard className="p-6">
      <CosmicCardHeader>
        <CosmicCardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-gold-medium" />
          Quick Stats
        </CosmicCardTitle>
      </CosmicCardHeader>
      <CosmicCardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Total Views</span>
            <span className="font-semibold text-white">12.4K</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Luminors Bonded</span>
            <span className="font-semibold text-white">5</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Prompt Books</span>
            <span className="font-semibold text-white">23</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Gate Level</span>
            <span className="font-semibold text-brand-primary">
              Fire (396 Hz)
            </span>
          </div>
        </div>
      </CosmicCardContent>
    </CosmicCard>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * Premium dashboard template with sidebar, stats cards, activity feed, and recent items.
 *
 * @example
 * ```tsx
 * import { DashboardPage } from '@/app/templates/dashboard-page';
 *
 * <DashboardPage
 *   config={{
 *     title: "Creator Dashboard",
 *     user: { name: "Frank", email: "frank@arcanea.ai" }
 *   }}
 *   navigation={[
 *     { id: "home", label: "Home", href: "/", icon: <Home />, active: true },
 *     { id: "prompts", label: "Prompts", href: "/prompts", badge: 12 }
 *   ]}
 *   cards={[
 *     { id: "views", title: "Total Views", value: "12.4K", change: { value: 12, type: "positive" } }
 *   ]}
 *   activity={[
 *     { id: "1", title: "New prompt created", time: "2 hours ago" }
 *   ]}
 * />
 * ```
 */
export function DashboardPage({
  config,
  navigation,
  cards,
  activity,
  recent,
  isLoading = false,
  className,
}: DashboardProps) {
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className={cn("min-h-screen flex", className)}>
      <Sidebar config={config} navigation={navigation} />

      <div className="flex-1 flex flex-col">
        <Header config={config} />

        <main className="flex-1 p-6 overflow-y-auto">
          <StatsCards cards={cards} />

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed activity={activity} />
            </div>
            <div className="space-y-6">
              <QuickStats />
              <RecentItems recent={recent} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export type { DashboardProps };
