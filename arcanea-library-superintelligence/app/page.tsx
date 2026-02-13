'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Library, Brain, BarChart3, Settings, Sparkles, Shield, Wind, Droplets, Mountain, Zap } from 'lucide-react';
import AssetGrid from '@/components/AssetGrid';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import SmartRecommendations from '@/components/SmartRecommendations';
import { ArcaneaDB, Asset } from '@/lib/database';

interface TabItem {
  id: string;
  label: string;
  icon: any;
  component: React.ReactNode;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('library');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState<ArcaneaDB | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalAssets: 0,
    totalViews: 0,
    totalFavorites: 0,
    elementDistribution: {} as Record<string, number>
  });

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database = new ArcaneaDB();
        await database.initialize();
        setDb(database);
        
        // Load initial assets
        await loadAssets(database);
        
        // Load statistics
        await loadStatistics(database);
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setLoading(false);
      }
    };

    initializeDatabase();
  }, []);

  const loadAssets = async (database: ArcaneaDB) => {
    try {
      // For now, create mock data since we don't have real assets yet
      const mockAssets: Asset[] = [
        {
          id: '1',
          path: '/draconia_guardian.png',
          filename: 'draconia_guardian.png',
          size: 1024576,
          type: 'raster',
          format: 'png',
          dimensions: { width: 1920, height: 1080 },
          metadata: {
            created: new Date('2024-01-15'),
            modified: new Date('2024-01-20'),
            exif: {}
          },
          analysis: {
            description: 'Majestic Draconia Guardian surrounded by flames, representing transformation and bold creation',
            tags: ['dragon', 'fire', 'guardian', 'draconia', 'transformation', 'power'],
            guardian: 'draconia',
            element: 'fire',
            mood: 'powerful',
            style: 'digital',
            content: ['illustration', 'character', 'fantasy'],
            colors: ['#FF6B35', '#FFA500', '#FFD700'],
            composition: 'centered'
          },
          usage: {
            views: 342,
            selects: 28,
            copies: 15,
            lastUsed: new Date(),
            favorites: true
          },
          relationships: {
            similar: ['2', '3'],
            related: ['4', '5'],
            variants: [],
            series: 'guardians'
          }
        },
        {
          id: '2',
          path: '/leyla_water_flow.jpg',
          filename: 'leyla_water_flow.jpg',
          size: 2048576,
          type: 'raster',
          format: 'jpg',
          dimensions: { width: 2560, height: 1440 },
          metadata: {
            created: new Date('2024-01-10'),
            modified: new Date('2024-01-18'),
            exif: {}
          },
          analysis: {
            description: 'Leyla Guardian dancing with water currents, embodying emotional intelligence and flow',
            tags: ['water', 'emotion', 'leyla', 'flow', 'story', 'serene'],
            guardian: 'leyla',
            element: 'water',
            mood: 'calm',
            style: 'painterly',
            content: ['illustration', 'character', 'nature'],
            colors: ['#3B82F6', '#06B6D4', '#0891B2'],
            composition: 'dynamic'
          },
          usage: {
            views: 256,
            selects: 19,
            copies: 8,
            lastUsed: new Date(Date.now() - 86400000),
            favorites: true
          },
          relationships: {
            similar: ['1', '6'],
            related: ['7', '8'],
            variants: [],
            series: 'guardians'
          }
        },
        {
          id: '3',
          path: '/arcanea_logo.svg',
          filename: 'arcanea_logo.svg',
          size: 24576,
          type: 'vector',
          format: 'svg',
          metadata: {
            created: new Date('2024-01-01'),
            modified: new Date('2024-01-01'),
            exif: {}
          },
          analysis: {
            description: 'Arcanea Library logo with aurora colors and mystical design',
            tags: ['logo', 'brand', 'arcanea', 'library', 'mystical'],
            guardian: 'elara',
            element: 'void',
            mood: 'mysterious',
            style: 'minimalist',
            content: ['logo', 'brand', 'symbol'],
            colors: ['#DC5FFF', '#B126FF', '#8519FF'],
            composition: 'balanced'
          },
          usage: {
            views: 189,
            selects: 45,
            copies: 23,
            lastUsed: new Date(Date.now() - 172800000),
            favorites: false
          },
          relationships: {
            similar: ['9'],
            related: ['10', '11'],
            variants: ['12'],
            series: 'branding'
          }
        }
      ];

      setAssets(mockAssets);
    } catch (error) {
      console.error('Failed to load assets:', error);
      setAssets([]);
    }
  };

  const loadStatistics = async (database: ArcaneaDB) => {
    try {
      // Mock statistics for now
      setStats({
        totalAssets: 1247,
        totalViews: 15420,
        totalFavorites: 342,
        elementDistribution: {
          fire: 342,
          water: 298,
          earth: 256,
          wind: 198,
          void: 153
        }
      });
    } catch (error) {
      console.error('Failed to load statistics:', error);
    }
  };

  const handleAssetSelect = (asset: Asset) => {
    // Log asset selection for analytics
    console.log('Asset selected:', asset.filename);
    
    // Update view count
    const updatedAssets = assets.map(a => 
      a.id === asset.id 
        ? { ...a, usage: { ...a.usage, views: a.usage.views + 1 } }
        : a
    );
    setAssets(updatedAssets);
  };

  const tabs: TabItem[] = [
    {
      id: 'library',
      label: 'Library',
      icon: Library,
      component: (
        <AssetGrid
          assets={assets}
          onAssetSelect={handleAssetSelect}
          loading={loading}
        />
      )
    },
    {
      id: 'recommendations',
      label: 'AI Recommendations',
      icon: Brain,
      component: (
        <SmartRecommendations
          currentAssetId={undefined}
          userPreferences={{
            preferredGuardians: ['draconia', 'leyla'],
            favoriteElements: ['fire', 'water'],
            recentSearches: ['dragon', 'water', 'logo']
          }}
        />
      )
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      component: <AnalyticsDashboard />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      component: (
        <div className="text-center py-12">
          <Settings className="w-16 h-16 text-cosmic-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
          <p className="text-cosmic-400">Configure your Arcanea Library preferences</p>
        </div>
      )
    }
  ];

  const getElementIcon = (element: string) => {
    const icons = {
      fire: <Zap className="w-4 h-4" />,
      water: <Droplets className="w-4 h-4" />,
      earth: <Mountain className="w-4 h-4" />,
      wind: <Wind className="w-4 h-4" />,
      void: <Sparkles className="w-4 h-4" />
    };
    return icons[element as keyof typeof icons] || <Sparkles className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass border-b border-white/20 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-aurora-400 to-purple-400">
                <Library className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Arcanea Library</h1>
                <p className="text-xs text-cosmic-400">Superintelligence System</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search the cosmic library..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass rounded-lg text-white placeholder-cosmic-400 focus:outline-none focus:ring-2 focus:ring-aurora-400"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-lg font-bold text-white">{stats.totalAssets.toLocaleString()}</p>
                <p className="text-xs text-cosmic-400">Assets</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">{stats.totalViews.toLocaleString()}</p>
                <p className="text-xs text-cosmic-400">Views</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">{stats.totalFavorites.toLocaleString()}</p>
                <p className="text-xs text-cosmic-400">Favorites</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 p-1 glass rounded-xl w-fit">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-cosmic-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabs.find(tab => tab.id === activeTab)?.component}
        </motion.div>

        {/* Element Distribution Widget */}
        {activeTab === 'library' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 grid grid-cols-5 gap-4"
          >
            {Object.entries(stats.elementDistribution).map(([element, count]) => (
              <motion.div
                key={element}
                whileHover={{ scale: 1.05 }}
                className="glass p-4 rounded-xl text-center hover:bg-white/20 transition-all duration-200"
              >
                <div className="flex justify-center mb-2">
                  <div className={`p-2 rounded-lg ${
                    element === 'fire' ? 'bg-draconia-500/20 text-draconia-400' :
                    element === 'water' ? 'bg-blue-500/20 text-blue-400' :
                    element === 'earth' ? 'bg-leyline-500/20 text-leyline-400' :
                    element === 'wind' ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {getElementIcon(element)}
                  </div>
                </div>
                <h4 className="text-white font-medium capitalize mb-1">{element}</h4>
                <p className="text-2xl font-bold gradient-text">{count}</p>
                <p className="text-xs text-cosmic-400">assets</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}