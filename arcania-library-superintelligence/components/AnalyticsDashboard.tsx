'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BarChart3, TrendingUp, Eye, Heart, Copy, Zap } from 'lucide-react';

interface AnalyticsData {
  totalAssets: number;
  totalViews: number;
  totalFavorites: number;
  totalCopies: number;
  mostViewedAssets: Array<{
    id: string;
    filename: string;
    views: number;
    type: string;
  }>;
  elementDistribution: Array<{
    element: string;
    count: number;
    percentage: number;
  }>;
  guardianDistribution: Array<{
    guardian: string;
    count: number;
    element: string;
  }>;
  recentActivity: Array<{
    action: string;
    assetId: string;
    filename: string;
    timestamp: Date;
  }>;
  growthData: Array<{
    date: string;
    assets: number;
    views: number;
  }>;
}

interface AnalyticsDashboardProps {
  className?: string;
}

export default function AnalyticsDashboard({ className = '' }: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month');

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = async () => {
      setLoading(true);
      // This would normally fetch from your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData({
        totalAssets: 1247,
        totalViews: 15420,
        totalFavorites: 342,
        totalCopies: 891,
        mostViewedAssets: [
          { id: '1', filename: 'draconia_guardian.png', views: 342, type: 'raster' },
          { id: '2', filename: 'arcania_logo.svg', views: 256, type: 'vector' },
          { id: '3', filename: 'fire_element_banner.jpg', views: 198, type: 'raster' },
          { id: '4', filename: 'void_portal.gif', views: 187, type: 'raster' },
          { id: '5', filename: 'leyla_water_flow.png', views: 165, type: 'raster' }
        ],
        elementDistribution: [
          { element: 'fire', count: 342, percentage: 27.4 },
          { element: 'water', count: 298, percentage: 23.9 },
          { element: 'earth', count: 256, percentage: 20.5 },
          { element: 'wind', count: 198, percentage: 15.9 },
          { element: 'void', count: 153, percentage: 12.3 }
        ],
        guardianDistribution: [
          { guardian: 'draconia', count: 156, element: 'fire' },
          { guardian: 'leyla', count: 134, element: 'water' },
          { guardian: 'lyssandria', count: 112, element: 'earth' },
          { guardian: 'alera', count: 98, element: 'wind' },
          { guardian: 'elara', count: 87, element: 'void' }
        ],
        recentActivity: [
          { action: 'view', assetId: '1', filename: 'draconia_guardian.png', timestamp: new Date() },
          { action: 'favorite', assetId: '2', filename: 'arcania_logo.svg', timestamp: new Date(Date.now() - 300000) },
          { action: 'copy', assetId: '3', filename: 'fire_element_banner.jpg', timestamp: new Date(Date.now() - 600000) },
          { action: 'view', assetId: '4', filename: 'void_portal.gif', timestamp: new Date(Date.now() - 900000) }
        ],
        growthData: [
          { date: '2024-01-01', assets: 1000, views: 12000 },
          { date: '2024-01-07', assets: 1050, views: 12800 },
          { date: '2024-01-14', assets: 1120, views: 13500 },
          { date: '2024-01-21', assets: 1180, views: 14200 },
          { date: '2024-01-28', assets: 1247, views: 15420 }
        ]
      });
      
      setLoading(false);
    };

    loadAnalytics();
  }, [timeRange]);

  const getElementColor = (element: string) => {
    const colors = {
      fire: 'bg-draconia-500',
      water: 'bg-blue-500',
      earth: 'bg-leyline-500',
      wind: 'bg-cyan-500',
      void: 'bg-purple-500'
    };
    return colors[element as keyof typeof colors] || 'bg-cosmic-500';
  };

  const getGuardianIcon = (guardian: string) => {
    const icons = {
      draconia: '🔥',
      leyla: '💧',
      lyssandria: '🏛️',
      alera: '🌪️',
      elara: '🔮'
    };
    return icons[guardian as keyof typeof icons] || '✨';
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-white/20 rounded mb-2"></div>
              <div className="h-10 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const StatCard = ({ icon: Icon, title, value, change, color = 'aurora' }: {
    icon: any;
    title: string;
    value: string | number;
    change?: number;
    color?: string;
  }) => (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}-400/10`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${
            change > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            <TrendingUp className="w-4 h-4" />
            {change > 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value.toLocaleString()}</h3>
      <p className="text-cosmic-400 text-sm">{title}</p>
    </motion.div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-aurora-400" />
            Library Analytics
          </h2>
          <p className="text-cosmic-400 mt-1">Insights into your Arcanea asset collection</p>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-aurora-400"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Sparkles}
          title="Total Assets"
          value={data.totalAssets}
          change={12.5}
        />
        <StatCard
          icon={Eye}
          title="Total Views"
          value={data.totalViews}
          change={8.3}
        />
        <StatCard
          icon={Heart}
          title="Favorites"
          value={data.totalFavorites}
          change={15.2}
        />
        <StatCard
          icon={Copy}
          title="Copies"
          value={data.totalCopies}
          change={6.7}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Viewed Assets */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Most Viewed Assets</h3>
          <div className="space-y-3">
            {data.mostViewedAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-aurora-400 w-6">#{index + 1}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{asset.filename}</p>
                    <p className="text-cosmic-400 text-xs">{asset.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{asset.views}</p>
                  <p className="text-cosmic-400 text-xs">views</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Element Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Element Distribution</h3>
          <div className="space-y-3">
            {data.elementDistribution.map((element) => (
              <div key={element.element} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getElementColor(element.element)}`} />
                    <span className="text-white text-sm capitalize">{element.element}</span>
                  </div>
                  <span className="text-white font-medium">{element.count} assets</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${getElementColor(element.element)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${element.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                <p className="text-cosmic-400 text-xs text-right">{element.percentage}%</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Guardian Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Guardian Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.guardianDistribution.map((guardian) => (
            <motion.div
              key={guardian.guardian}
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="text-2xl mb-2">{getGuardianIcon(guardian.guardian)}</div>
              <h4 className="text-white font-medium capitalize">{guardian.guardian}</h4>
              <p className="text-cosmic-400 text-sm">{guardian.count} assets</p>
              <div className={`mt-2 w-4 h-4 rounded-full mx-auto ${getElementColor(guardian.element)}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-2">
          {data.recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded ${
                  activity.action === 'view' ? 'bg-blue-500/20 text-blue-400' :
                  activity.action === 'favorite' ? 'bg-red-500/20 text-red-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {activity.action === 'view' ? <Eye className="w-3 h-3" /> :
                   activity.action === 'favorite' ? <Heart className="w-3 h-3" /> :
                   <Copy className="w-3 h-3" />}
                </div>
                <div>
                  <p className="text-white text-sm">{activity.filename}</p>
                  <p className="text-cosmic-400 text-xs capitalize">{activity.action}</p>
                </div>
              </div>
              <span className="text-cosmic-400 text-xs">
                {new Date(activity.timestamp).toLocaleTimeString()}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}