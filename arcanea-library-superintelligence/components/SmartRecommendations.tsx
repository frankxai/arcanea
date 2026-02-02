'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Target, Zap, Shield, Wind, Droplets, Mountain, Eye } from 'lucide-react';

interface SmartRecommendation {
  id: string;
  type: 'similar' | 'trending' | 'complementary' | 'guardian-based';
  title: string;
  description: string;
  assetIds: string[];
  confidence: number;
  reasoning: string;
}

interface SmartRecommendationsProps {
  currentAssetId?: string;
  userPreferences?: {
    favoriteElements?: string[];
    preferredGuardians?: string[];
    recentSearches?: string[];
  };
}

export default function SmartRecommendations({ 
  currentAssetId,
  userPreferences = {}
}: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateRecommendations = async () => {
      setLoading(true);
      
      // Simulate AI-powered recommendation generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockRecommendations: SmartRecommendation[] = [
        {
          id: '1',
          type: 'similar',
          title: 'Visually Similar Assets',
          description: 'Assets with similar visual characteristics and composition',
          assetIds: ['asset1', 'asset2', 'asset3'],
          confidence: 0.92,
          reasoning: 'Based on visual analysis of colors, shapes, and composition'
        },
        {
          id: '2',
          type: 'guardian-based',
          title: 'Draconia Collection',
          description: 'More assets aligned with the Draconia Guardian energy',
          assetIds: ['asset4', 'asset5', 'asset6'],
          confidence: 0.87,
          reasoning: 'Shares fire element transformation themes'
        },
        {
          id: '3',
          type: 'trending',
          title: 'Trending This Week',
          description: 'Popular assets gaining attention in the community',
          assetIds: ['asset7', 'asset8', 'asset9'],
          confidence: 0.78,
          reasoning: 'High engagement and recent usage spikes'
        },
        {
          id: '4',
          type: 'complementary',
          title: 'Elemental Balance',
          description: 'Water element assets to complement your fire selection',
          assetIds: ['asset10', 'asset11', 'asset12'],
          confidence: 0.85,
          reasoning: 'Creating elemental harmony through contrast'
        }
      ];

      // Filter and sort based on user preferences
      let filteredRecommendations = mockRecommendations;

      if (userPreferences.preferredGuardians?.length) {
        filteredRecommendations = filteredRecommendations.map(rec => ({
          ...rec,
          confidence: rec.type === 'guardian-based' ? rec.confidence + 0.1 : rec.confidence
        }));
      }

      setRecommendations(filteredRecommendations.sort((a, b) => b.confidence - a.confidence));
      setLoading(false);
    };

    generateRecommendations();
  }, [currentAssetId, userPreferences]);

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'similar': return <Eye className="w-4 h-4" />;
      case 'trending': return <Zap className="w-4 h-4" />;
      case 'guardian-based': return <Shield className="w-4 h-4" />;
      case 'complementary': return <Brain className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case 'similar': return 'text-blue-400 bg-blue-400/10';
      case 'trending': return 'text-draconia-400 bg-draconia-400/10';
      case 'guardian-based': return 'text-purple-400 bg-purple-400/10';
      case 'complementary': return 'text-leyline-400 bg-leyline-400/10';
      default: return 'text-aurora-400 bg-aurora-400/10';
    }
  };

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'fire': return <Zap className="w-3 h-3" />;
      case 'water': return <Droplets className="w-3 h-3" />;
      case 'earth': return <Mountain className="w-3 h-3" />;
      case 'wind': return <Wind className="w-3 h-3" />;
      default: return <Eye className="w-3 h-3" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-aurora-400 animate-pulse" />
          <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-3 bg-white/10 rounded mb-2"></div>
            <div className="h-2 bg-white/10 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-aurora-400" />
          <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
          <div className="flex items-center gap-1 px-2 py-1 bg-aurora-500/20 rounded-full">
            <Sparkles className="w-3 h-3 text-aurora-400" />
            <span className="text-xs text-aurora-400">Smart</span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={recommendation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-200 cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${getRecommendationColor(recommendation.type)}`}>
                  {getRecommendationIcon(recommendation.type)}
                </div>
                <div>
                  <h4 className="text-white font-medium">{recommendation.title}</h4>
                  <p className="text-cosmic-400 text-sm">{recommendation.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{Math.round(recommendation.confidence * 100)}%</div>
                <div className="text-cosmic-400 text-xs">match</div>
              </div>
            </div>

            {/* Reasoning */}
            <div className="mb-3 p-2 bg-white/5 rounded-lg border-l-2 border-aurora-400">
              <p className="text-xs text-cosmic-300">
                <Target className="inline w-3 h-3 mr-1" />
                {recommendation.reasoning}
              </p>
            </div>

            {/* Asset Previews */}
            <div className="flex items-center gap-2">
              <span className="text-cosmic-400 text-sm">{recommendation.assetIds.length} assets:</span>
              <div className="flex -space-x-2">
                {recommendation.assetIds.slice(0, 6).map((assetId, assetIndex) => (
                  <div
                    key={assetId}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-aurora-400 to-purple-400 border-2 border-cosmic-900 flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-white">{assetIndex + 1}</span>
                  </div>
                ))}
                {recommendation.assetIds.length > 6 && (
                  <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-cosmic-900 flex items-center justify-center">
                    <span className="text-xs text-cosmic-400">+{recommendation.assetIds.length - 6}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Learning Feedback */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-aurora-500/10 to-purple-500/10 border border-aurora-400/20 rounded-xl p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-aurora-400" />
          <span className="text-sm font-medium text-white">Learning from your preferences</span>
        </div>
        <p className="text-xs text-cosmic-300">
          These recommendations improve based on your viewing patterns, favorites, and search history. 
          The more you interact, the smarter they become.
        </p>
      </motion.div>
    </div>
  );
}