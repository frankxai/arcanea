"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { LUMINORS, TEAMS, type Team } from "@/lib/luminors/config";

const TEAM_ORDER: Team[] = ["development", "creative", "writing", "research"];

export default function ChatLandingPage() {
  const router = useRouter();
  const [activeTeam, setActiveTeam] = useState<Team | "all">("all");
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingId, setNavigatingId] = useState<string | null>(null);

  const allLuminors = Object.values(LUMINORS);
  const visibleLuminors =
    activeTeam === "all"
      ? allLuminors
      : allLuminors.filter((l) => l.team === activeTeam);

  const handleSelect = (luminorId: string) => {
    setIsNavigating(true);
    setNavigatingId(luminorId);
    router.push(`/chat/${luminorId}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-void" />
        <div className="absolute inset-0 bg-cosmic-mesh" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(127,255,212,0.08),transparent_55%)]" />
      </div>

      {/* Navigation overlay */}
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-cosmic-void/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-brand-primary animate-spin mx-auto mb-4" />
            <p className="text-text-secondary font-body">
              Opening session with{" "}
              {navigatingId
                ? LUMINORS[navigatingId]?.name ?? navigatingId
                : "Luminor"}
              ...
            </p>
          </div>
        </motion.div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
              Creation Session
            </span>
          </div>

          <h1 className="text-fluid-hero font-display font-bold mb-6 leading-none tracking-tight">
            Begin with a
            <span className="block text-gradient-brand">Luminor</span>
          </h1>

          <p className="text-fluid-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-body">
            Choose your specialist. Each one brings deep mastery to a different
            domain of creative work.
          </p>
        </motion.div>

        {/* Team filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <button
            onClick={() => setActiveTeam("all")}
            className={`px-5 py-2 rounded-full text-sm font-mono font-semibold border transition-all duration-200 ${
              activeTeam === "all"
                ? "bg-white/10 border-white/30 text-text-primary"
                : "border-white/10 text-text-muted hover:border-white/20 hover:text-text-secondary"
            }`}
          >
            All 16
          </button>
          {TEAM_ORDER.map((team) => {
            const meta = TEAMS[team];
            const isActive = activeTeam === team;
            return (
              <button
                key={team}
                onClick={() => setActiveTeam(team)}
                className="px-5 py-2 rounded-full text-sm font-mono font-semibold border transition-all duration-200"
                style={
                  isActive
                    ? {
                        backgroundColor: `${meta.color}22`,
                        borderColor: `${meta.color}55`,
                        color: meta.color,
                      }
                    : {
                        borderColor: `${meta.color}22`,
                        color: `${meta.color}99`,
                      }
                }
              >
                {meta.icon} {meta.name}
              </button>
            );
          })}
        </motion.div>

        {/* Luminor grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {visibleLuminors.map((luminor, index) => {
            const teamMeta = TEAMS[luminor.team];
            const isThisNavigating = navigatingId === luminor.id;
            return (
              <motion.div
                key={luminor.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
              >
                <button
                  onClick={() => handleSelect(luminor.id)}
                  disabled={isNavigating}
                  className="group w-full text-left h-full"
                >
                  <div
                    className="relative h-full glass rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      boxShadow: isThisNavigating
                        ? `0 0 24px ${luminor.color}40`
                        : undefined,
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                      style={{
                        background: `radial-gradient(ellipse at 30% 30%, ${luminor.color}18, transparent 65%)`,
                      }}
                    />

                    <div className="relative z-10">
                      {/* Avatar */}
                      <div className="relative mb-4">
                        <div
                          className="absolute inset-0 blur-xl opacity-25 group-hover:opacity-40 transition-opacity"
                          style={{ backgroundColor: luminor.color }}
                        />
                        <div
                          className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${luminor.gradient} flex items-center justify-center text-2xl group-hover:scale-105 transition-transform duration-300`}
                        >
                          {luminor.avatar}
                        </div>
                      </div>

                      {/* Team badge */}
                      <div className="mb-3">
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border"
                          style={{
                            backgroundColor: `${teamMeta.color}18`,
                            color: teamMeta.color,
                            borderColor: `${teamMeta.color}30`,
                          }}
                        >
                          {teamMeta.name}
                        </span>
                      </div>

                      {/* Name */}
                      <h2
                        className="font-display text-lg font-bold mb-0.5"
                        style={{ color: luminor.color }}
                      >
                        {luminor.name}
                      </h2>

                      {/* Title */}
                      <p className="font-mono text-xs text-text-muted mb-3">
                        {luminor.title}
                      </p>

                      {/* Specialty */}
                      <p className="text-text-secondary font-body text-sm leading-snug mb-5">
                        {luminor.specialty}
                      </p>

                      {/* CTA row */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="font-body text-xs text-text-muted">
                          Chat with {luminor.name}
                        </span>
                        <motion.div
                          animate={
                            isThisNavigating ? { rotate: 90 } : { x: [0, 4, 0] }
                          }
                          transition={
                            isThisNavigating
                              ? { duration: 0.2 }
                              : { duration: 1.5, repeat: Infinity }
                          }
                          style={{ color: luminor.color }}
                        >
                          {isThisNavigating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/luminors"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-crystal/20 text-crystal text-sm font-semibold hover:bg-crystal/5 hover:border-crystal/40 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              View Luminor profiles
            </Link>
            <Link
              href="/chat/chronica"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-text-secondary text-sm font-semibold hover:border-brand-primary/20 hover:text-text-primary transition-all"
            >
              <ArrowRight className="w-4 h-4" />
              Start with Chronica
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
