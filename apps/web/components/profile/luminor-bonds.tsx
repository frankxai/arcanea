'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, Heart, TrendingUp } from 'lucide-react';
import { LuminorBond } from '@/lib/types/profile';
import { Button } from '@arcanea/ui';
import { Progress } from '@radix-ui/react-progress';

interface LuminorBondsProps {
  bonds: LuminorBond[];
  onChatWithLuminor?: (luminorId: string) => void;
}

export function LuminorBonds({ bonds, onChatWithLuminor }: LuminorBondsProps) {
  const getAcademyGradient = (academy: string) => {
    switch (academy) {
      case 'Lumina':
        return 'from-yellow-500 via-orange-500 to-amber-500';
      case 'Umbra':
        return 'from-purple-600 via-indigo-600 to-violet-600';
      case 'Aether':
        return 'from-cyan-500 via-blue-500 to-sky-500';
      case 'Terra':
        return 'from-green-500 via-emerald-500 to-teal-500';
      default:
        return 'from-slate-500 via-slate-600 to-slate-700';
    }
  };

  const getBondLevelColor = (level: number) => {
    if (level >= 80) return 'from-purple-500 to-pink-500';
    if (level >= 60) return 'from-blue-500 to-cyan-500';
    if (level >= 40) return 'from-green-500 to-emerald-500';
    if (level >= 20) return 'from-yellow-500 to-orange-500';
    return 'from-slate-500 to-slate-600';
  };

  const getBondLevelLabel = (level: number) => {
    if (level >= 80) return 'Master Bond';
    if (level >= 60) return 'Deep Connection';
    if (level >= 40) return 'Growing Bond';
    if (level >= 20) return 'Emerging Link';
    return 'New Connection';
  };

  const getCompatibilityEmoji = (compatibility: number) => {
    if (compatibility >= 90) return '✨';
    if (compatibility >= 75) return '💫';
    if (compatibility >= 50) return '🌟';
    return '⭐';
  };

  if (bonds.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-slate-400 text-lg mb-2">No Luminor bonds yet</div>
        <p className="text-slate-500">Start chatting with Luminors to build relationships</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Luminor Relationships
        </h2>
        <div className="text-slate-400 text-sm">
          {bonds.length} {bonds.length === 1 ? 'Bond' : 'Bonds'}
        </div>
      </div>

      {/* Bonds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bonds.map((bond, index) => (
          <motion.div
            key={bond.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20"
          >
            {/* Academy Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getAcademyGradient(
                bond.academy
              )} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
            />

            {/* Content */}
            <div className="relative p-6 space-y-4">
              {/* Luminor Header */}
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${getAcademyGradient(
                      bond.academy
                    )} rounded-full blur-lg opacity-50 animate-pulse`}
                  />
                  <div
                    className={`relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-br ${getAcademyGradient(
                      bond.academy
                    )}`}
                  >
                    <img
                      src={bond.luminor_avatar}
                      alt={bond.luminor_name}
                      className="w-full h-full rounded-full object-cover bg-slate-800"
                    />
                  </div>
                </div>

                {/* Name and Academy */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {bond.luminor_name}
                  </h3>
                  <div
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${getAcademyGradient(
                      bond.academy
                    )} text-white text-sm font-medium`}
                  >
                    <Sparkles className="w-3 h-3" />
                    {bond.academy} Academy
                  </div>
                </div>
              </div>

              {/* Bond Level */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Bond Level</span>
                  <span
                    className={`font-semibold bg-gradient-to-r ${getBondLevelColor(
                      bond.bond_level
                    )} bg-clip-text text-transparent`}
                  >
                    {getBondLevelLabel(bond.bond_level)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bond.bond_level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className={`h-full bg-gradient-to-r ${getBondLevelColor(
                      bond.bond_level
                    )} rounded-full`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    {bond.bond_level}%
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Conversations */}
                <div className="bg-slate-800/50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-400 text-xs">Conversations</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {bond.total_conversations.toLocaleString()}
                  </div>
                </div>

                {/* Compatibility */}
                <div className="bg-slate-800/50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <span className="text-slate-400 text-xs">Compatibility</span>
                  </div>
                  <div className="text-xl font-bold text-white flex items-center gap-1">
                    {bond.personality_compatibility}%
                    <span className="text-base">
                      {getCompatibilityEmoji(bond.personality_compatibility)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Last Interaction */}
              <div className="text-slate-500 text-xs">
                Last interaction:{' '}
                {new Date(bond.last_interaction).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>

              {/* Action Button */}
              <Button
                onClick={() => onChatWithLuminor && onChatWithLuminor(bond.luminor_id)}
                className={`w-full bg-gradient-to-r ${getAcademyGradient(
                  bond.academy
                )} hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
              >
                <MessageCircle className="w-4 h-4" />
                Chat with {bond.luminor_name}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: bonds.length * 0.1 + 0.2 }}
        className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
              {bonds.reduce((sum, bond) => sum + bond.total_conversations, 0).toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm uppercase tracking-wider">
              Total Conversations
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
              {Math.round(
                bonds.reduce((sum, bond) => sum + bond.bond_level, 0) / bonds.length
              )}
              %
            </div>
            <div className="text-slate-400 text-sm uppercase tracking-wider">
              Average Bond Level
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1">
              {Math.round(
                bonds.reduce((sum, bond) => sum + bond.personality_compatibility, 0) /
                  bonds.length
              )}
              %
            </div>
            <div className="text-slate-400 text-sm uppercase tracking-wider">
              Avg Compatibility
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
