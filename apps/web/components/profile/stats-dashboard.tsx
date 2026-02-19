'use client';

import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Image, Video, FolderOpen, Sparkles, Calendar, TrendingUp, Award } from 'lucide-react';
import { ProfileStats, Creation } from '@/lib/types/profile';

interface StatsDashboardProps {
  stats: ProfileStats;
  creations: Creation[];
}

interface StatCardProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  gradient: string;
  index: number;
}

function StatCard({ icon: Icon, label, value, gradient, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-20 backdrop-blur-sm`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          <div className="text-slate-400 text-sm uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function StatsDashboard({ stats, creations }: StatsDashboardProps) {
  // Calculate creation type breakdown
  const creationsByType = {
    image: creations.filter((c) => c.type === 'image').length,
    video: creations.filter((c) => c.type === 'video').length,
    project: creations.filter((c) => c.type === 'project').length,
    composition: creations.filter((c) => c.type === 'composition').length,
  };

  // Calculate most used Luminor
  const luminorUsage = creations.reduce((acc, creation) => {
    if (creation.luminor_id) {
      acc[creation.luminor_id] = (acc[creation.luminor_id] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const mostUsedLuminor = Object.entries(luminorUsage).sort((a, b) => b[1] - a[1])[0];

  // Calculate favorite styles/themes
  const stylesUsage = creations.reduce((acc, creation) => {
    if (creation.metadata?.style) {
      acc[creation.metadata.style] = (acc[creation.metadata.style] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topStyles = Object.entries(stylesUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Calculate achievements
  const achievements = [
    {
      icon: Award,
      title: 'First Creation',
      description: 'Created your first masterpiece',
      unlocked: creations.length > 0,
    },
    {
      icon: TrendingUp,
      title: '10 Creations',
      description: 'Reached 10 total creations',
      unlocked: creations.length >= 10,
    },
    {
      icon: Sparkles,
      title: '100 Likes',
      description: 'Received 100 likes on your work',
      unlocked: stats.total_likes_received >= 100,
    },
    {
      icon: Calendar,
      title: '7 Day Streak',
      description: 'Created for 7 days in a row',
      unlocked: stats.active_days_streak >= 7,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Creation Types */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Creations by Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Image}
            label="Images"
            value={creationsByType.image}
            gradient="from-blue-500 to-cyan-500"
            index={0}
          />
          <StatCard
            icon={Video}
            label="Videos"
            value={creationsByType.video}
            gradient="from-red-500 to-pink-500"
            index={1}
          />
          <StatCard
            icon={FolderOpen}
            label="Projects"
            value={creationsByType.project}
            gradient="from-purple-500 to-indigo-500"
            index={2}
          />
          <StatCard
            icon={Sparkles}
            label="Compositions"
            value={creationsByType.composition}
            gradient="from-green-500 to-emerald-500"
            index={3}
          />
        </div>
      </div>

      {/* Most Used Luminor */}
      {mostUsedLuminor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-4">Most Used Luminor</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-400">{mostUsedLuminor[0]}</div>
              <div className="text-slate-400 text-sm">
                Used in {mostUsedLuminor[1]} creations
              </div>
            </div>
            <div className="text-4xl">✨</div>
          </div>
        </motion.div>
      )}

      {/* Favorite Styles */}
      {topStyles.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Favorite Styles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topStyles.map(([style, count], index) => (
              <motion.div
                key={style}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white capitalize">{style}</div>
                    <div className="text-slate-400 text-sm">{count} creations</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {count}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Stats */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Activity Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={Calendar}
            label="Active Days Streak"
            value={`${stats.active_days_streak} days`}
            gradient="from-orange-500 to-yellow-500"
            index={0}
          />
          <StatCard
            icon={TrendingUp}
            label="Total Likes"
            value={stats.total_likes_received}
            gradient="from-pink-500 to-rose-500"
            index={1}
          />
          <StatCard
            icon={Award}
            label="Achievements"
            value={achievements.filter((a) => a.unlocked).length}
            gradient="from-indigo-500 to-purple-500"
            index={2}
          />
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/40 shadow-lg shadow-purple-500/20'
                  : 'bg-slate-900/30 border-slate-700/30 opacity-50'
              }`}
            >
              {achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.9 + index * 0.1 }}
                  >
                    <Award className="w-6 h-6 text-yellow-500 fill-current" />
                  </motion.div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                      : 'bg-slate-800'
                  }`}
                >
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{achievement.title}</h4>
                  <p className="text-slate-400 text-sm">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl"
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
          Your Journey So Far
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {stats.total_creations}
            </div>
            <div className="text-slate-400 text-sm">Total Creations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {stats.total_followers}
            </div>
            <div className="text-slate-400 text-sm">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {stats.total_likes_received}
            </div>
            <div className="text-slate-400 text-sm">Total Likes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {achievements.filter((a) => a.unlocked).length}
            </div>
            <div className="text-slate-400 text-sm">Achievements</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
