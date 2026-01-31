import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

// Arcanea Premium Library Interface
// Built with opencode + FrankX Design System

const FRANKX_COLORS = {
  deepNavy: '#0F172A',
  midnight: '#1E293B', 
  cosmicDark: '#0F1629',
  consciousPurple: '#8B5CF6',
  techCyan: '#06B6D4',
  musicOrange: '#F97316',
  growthGreen: '#10B981',
  goldAccent: '#F59E0B',
  auroraBlue: '#43BFE3',
  cosmicPurple: '#AB47C7',
  white: '#FFFFFF'
};

const GUARDIANS = {
  draconia: { name: 'Draconia', element: 'Fire', icon: '🐉', color: '#EF4444' },
  leyla: { name: 'Leyla', element: 'Water', icon: '💧', color: '#3B82F6' },
  lyssandria: { name: 'Lyssandria', element: 'Earth', icon: '🌍', color: '#10B981' },
  alera: { name: 'Alera', element: 'Wind', icon: '🌪️', color: '#8B5CF6' },
  elara: { name: 'Elara', element: 'Void', icon: '⚫', color: '#6B7280' },
  ino: { name: 'Ino', element: 'Unity', icon: '✨', color: '#F59E0B' }
};

export default function ArcaneaPremiumLibrary({ libraryData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuardian, setSelectedGuardian] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid, list, masonry
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [previewFile, setPreviewFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('browse'); // browse, guardians, analytics, workflows

  // Filter and sort files
  const filteredFiles = useMemo(() => {
    let files = libraryData?.files || [];
    
    // Guardian filter
    if (selectedGuardian !== 'all') {
      files = files.filter(f => 
        f.analysis?.guardianAffinity?.primary === selectedGuardian ||
        f.analysis?.guardianAffinity?.secondary === selectedGuardian
      );
    }
    
    // Category filter
    if (selectedCategory !== 'all') {
      files = files.filter(f => f.analysis?.primaryCategory === selectedCategory);
    }
    
    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      files = files.filter(f => {
        const searchText = (
          f.filename + ' ' + 
          f.dirname + ' ' +
          f.analysis?.tags?.join(' ') + ' ' +
          f.analysis?.themes?.join(' ')
        ).toLowerCase();
        return searchText.includes(query);
      });
    }
    
    // Sort
    files.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return (b.analysis?.arcaneaRelevance || 0) - (a.analysis?.arcaneaRelevance || 0);
        case 'quality':
          return (b.analysis?.quality || 0) - (a.analysis?.quality || 0);
        case 'name':
          return a.filename.localeCompare(b.filename);
        case 'date':
          return new Date(b.modified) - new Date(a.modified);
        case 'size':
          return b.size - a.size;
        default:
          return 0;
      }
    });
    
    return files;
  }, [libraryData, selectedGuardian, selectedCategory, searchQuery, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const files = libraryData?.files || [];
    return {
      total: files.length,
      totalSize: files.reduce((sum, f) => sum + (f.size || 0), 0),
      categories: Object.keys(libraryData?.categories || {}).length,
      guardians: Object.keys(libraryData?.guardians || {}).length,
      avgQuality: files.length > 0 
        ? Math.round(files.reduce((sum, f) => sum + (f.analysis?.quality || 0), 0) / files.length)
        : 0
    };
  }, [libraryData]);

  const toggleFileSelection = useCallback((fileId) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  }, []);

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      <Head>
        <title>Arcanea Library Premium | FrankX Design</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-slate-800/50 backdrop-blur-xl border-r border-white/10 flex flex-col"
            >
              {/* Logo */}
              <div className="p-6 border-b border-white/10">
                <h1 className="font-poppins font-bold text-2xl bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Arcanea
                </h1>
                <p className="text-xs text-slate-400 mt-1">Premium Library v2.0</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {[
                  { id: 'browse', label: 'Browse Library', icon: '🔍' },
                  { id: 'guardians', label: 'Guardians', icon: '🛡️' },
                  { id: 'analytics', label: 'Analytics', icon: '📊' },
                  { id: 'workflows', label: 'Workflows', icon: '⚡' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-white/10 text-amber-400 border border-amber-400/30'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Stats Mini */}
              <div className="p-4 border-t border-white/10">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-amber-400">{stats.total}</div>
                    <div className="text-xs text-slate-400">Files</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{formatSize(stats.totalSize)}</div>
                    <div className="text-xs text-slate-400">Total</div>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 bg-slate-800/30 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                ☰
              </button>
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by meaning, guardian, theme..."
                  className="w-96 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {selectedFiles.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-xl"
                >
                  <span className="text-amber-400 font-medium">{selectedFiles.size} selected</span>
                  <button className="text-amber-400 hover:text-amber-300">⚡ Actions</button>
                </motion.div>
              )}
              
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                🔔
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                👤
              </button>
            </div>
          </header>

          {/* Filters Bar */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-4 overflow-x-auto">
            {/* Guardian Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Guardian:</span>
              <select
                value={selectedGuardian}
                onChange={(e) => setSelectedGuardian(e.target.value)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Guardians</option>
                {Object.entries(GUARDIANS).map(([key, guardian]) => (
                  <option key={key} value={key}>
                    {guardian.icon} {guardian.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Categories</option>
                <option value="guardians">🛡️ Guardians</option>
                <option value="mythology">📖 Mythology</option>
                <option value="technology">🤖 Technology</option>
                <option value="artwork">🎨 Artwork</option>
                <option value="icons">🎯 Icons</option>
                <option value="branding">✨ Branding</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="relevance">Relevance</option>
                <option value="quality">Quality</option>
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="size">Size</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
              {['grid', 'list', 'masonry'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-md text-sm capitalize transition-all ${
                    viewMode === mode
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode === 'grid' ? '⊞' : mode === 'list' ? '☰' : '▦'}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'browse' && (
              <BrowseView 
                files={filteredFiles}
                viewMode={viewMode}
                selectedFiles={selectedFiles}
                onToggleSelect={toggleFileSelection}
                onPreview={setPreviewFile}
                formatSize={formatSize}
              />
            )}
            
            {activeTab === 'guardians' && (
              <GuardianDashboard 
                library={libraryData}
                onSelectGuardian={setSelectedGuardian}
              />
            )}
            
            {activeTab === 'analytics' && (
              <AnalyticsDashboard stats={stats} library={libraryData} />
            )}
            
            {activeTab === 'workflows' && (
              <WorkflowsPanel />
            )}
          </div>
        </main>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewFile && (
          <PreviewModal 
            file={previewFile} 
            onClose={() => setPreviewFile(null)}
            formatSize={formatSize}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', sans-serif; }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        ::-webkit-scrollbar-thumb { background: rgba(245, 158, 11, 0.5); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(245, 158, 11, 0.7); }
        
        /* Animations */
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse { animation: pulse 3s ease-in-out infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}

// Browse View Component
function BrowseView({ files, viewMode, selectedFiles, onToggleSelect, onPreview, formatSize }) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-400">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-white mb-2">No files found</h3>
        <p>Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'space-y-3'}>
      {files.map((file, index) => (
        <FileCard
          key={file.id || index}
          file={file}
          viewMode={viewMode}
          isSelected={selectedFiles.has(file.id)}
          onToggleSelect={() => onToggleSelect(file.id)}
          onPreview={() => onPreview(file)}
          formatSize={formatSize}
          index={index}
        />
      ))}
    </div>
  );
}

// File Card Component
function FileCard({ file, viewMode, isSelected, onToggleSelect, onPreview, formatSize, index }) {
  const guardian = file.analysis?.guardianAffinity?.primary || 'general';
  const guardianInfo = GUARDIANS[guardian] || { icon: '✨', color: '#F59E0B' };
  
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03 }}
        className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
          isSelected
            ? 'bg-amber-500/10 border-amber-500/50'
            : 'bg-white/5 border-white/10 hover:bg-white/10'
        }`}
        onClick={() => onPreview()}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelect();
          }}
          className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-amber-500"
        />
        
        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-2xl">
          {file.extension === '.svg' ? '🔷' : file.extension === '.gif' ? '▶️' : '🖼️'}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white truncate">{file.filename}</h4>
          <p className="text-sm text-slate-400">{file.dirname} • {formatSize(file.size)}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-lg" title={`Guardian: ${guardianInfo.name || guardian}`}>
            {guardianInfo.icon}
          </span>
          <span className="px-2 py-1 bg-white/10 rounded text-xs text-slate-300">
            {file.analysis?.primaryCategory}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer ${
        isSelected
          ? 'border-amber-500/50'
          : 'border-white/10 hover:border-white/20'
      }`}
      onClick={() => onPreview()}
    >
      {/* Selection overlay */}
      {isSelected && (
        <div className="absolute inset-0 bg-amber-500/10 z-10" />
      )}
      
      {/* Image preview */}
      <div className="aspect-square bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          {file.extension === '.svg' ? '🔷' : file.extension === '.gif' ? '▶️' : '🖼️'}
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-sm text-slate-300">{formatSize(file.size)}</p>
            <p className="text-xs text-slate-400">Click to preview</p>
          </div>
        </div>
        
        {/* Checkbox */}
        <div 
          className="absolute top-2 left-2 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="w-5 h-5 rounded border-white/20 bg-black/50 checked:bg-amber-500"
          />
        </div>
        
        {/* Guardian badge */}
        <div 
          className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center text-lg"
          style={{ backgroundColor: `${guardianInfo.color}30`, border: `1px solid ${guardianInfo.color}50` }}
          title={`Guardian: ${guardianInfo.name || guardian}`}
        >
          {guardianInfo.icon}
        </div>
      </div>
      
      {/* Info */}
      <div className="p-3 bg-slate-800/50">
        <h4 className="font-medium text-white text-sm truncate mb-1">{file.filename}</h4>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="px-2 py-0.5 bg-white/10 rounded">{file.analysis?.primaryCategory}</span>
          <span>{file.analysis?.quality || 0}% quality</span>
        </div>
      </div>
    </motion.div>
  );
}

// Guardian Dashboard
function GuardianDashboard({ library, onSelectGuardian }) {
  const guardianStats = useMemo(() => {
    const stats = {};
    Object.entries(GUARDIANS).forEach(([key, guardian]) => {
      stats[key] = library?.guardians?.[key]?.length || 0;
    });
    return stats;
  }, [library]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Guardian Affinities</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(GUARDIANS).map(([key, guardian]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectGuardian(key)}
            className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-left"
          >
            <div className="text-4xl mb-3">{guardian.icon}</div>
            <h3 className="font-semibold text-white text-lg">{guardian.name}</h3>
            <p className="text-sm text-slate-400 mb-3">{guardian.element} Element</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${Math.min((guardianStats[key] / 10) * 100, 100)}%`,
                    backgroundColor: guardian.color 
                  }}
                />
              </div>
              <span className="text-sm text-slate-400">{guardianStats[key]} files</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Analytics Dashboard
function AnalyticsDashboard({ stats, library }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Library Analytics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-4xl font-bold text-amber-400 mb-2">{stats.total}</div>
          <div className="text-slate-400">Total Files</div>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-4xl font-bold text-cyan-400 mb-2">{formatSize(stats.totalSize)}</div>
          <div className="text-slate-400">Total Size</div>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-4xl font-bold text-purple-400 mb-2">{stats.categories}</div>
          <div className="text-slate-400">Categories</div>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-4xl font-bold text-green-400 mb-2">{stats.avgQuality}%</div>
          <div className="text-slate-400">Avg Quality</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="font-semibold text-white mb-4">Category Distribution</h3>
          {Object.entries(library?.categories || {}).map(([cat, files]) => (
            <div key={cat} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-slate-300 capitalize">{cat}</span>
              <span className="text-amber-400 font-medium">{files.length} files</span>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-slate-300 flex-1">Library scanned</span>
              <span className="text-slate-500">Just now</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-slate-300 flex-1">83 files analyzed</span>
              <span className="text-slate-500">Just now</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-slate-300 flex-1">Guardians detected</span>
              <span className="text-slate-500">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Workflows Panel
function WorkflowsPanel() {
  const workflows = [
    { name: 'Auto-Organize', description: 'Intelligently sort files by Guardian affinity', icon: '🗂️' },
    { name: 'Bulk Rename', description: 'Mass rename with intelligent patterns', icon: '📝' },
    { name: 'Duplicate Finder', description: 'Find and manage duplicate files', icon: '🔍' },
    { name: 'Export Collection', description: 'Export curated file collections', icon: '📦' },
    { name: 'Generate Thumbnails', description: 'Create optimized preview images', icon: '🖼️' },
    { name: 'Sync to Cloud', description: 'Backup to cloud storage', icon: '☁️' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Workflows</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workflows.map((workflow, index) => (
          <motion.button
            key={workflow.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-left"
          >
            <div className="text-3xl mb-3">{workflow.icon}</div>
            <h3 className="font-semibold text-white mb-1">{workflow.name}</h3>
            <p className="text-sm text-slate-400">{workflow.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Preview Modal
function PreviewModal({ file, onClose, formatSize }) {
  const guardian = file.analysis?.guardianAffinity?.primary || 'general';
  const guardianInfo = GUARDIANS[guardian] || { icon: '✨', color: '#F59E0B', name: 'General' };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-800 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${guardianInfo.color}20`, border: `1px solid ${guardianInfo.color}40` }}
            >
              {guardianInfo.icon}
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">{file.filename}</h3>
              <p className="text-slate-400 text-sm">{file.dirname}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Preview */}
            <div className="aspect-square bg-slate-900 rounded-2xl flex items-center justify-center text-8xl">
              {file.extension === '.svg' ? '🔷' : file.extension === '.gif' ? '▶️' : '🖼️'}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h4 className="text-amber-400 font-medium mb-3">File Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Size</span>
                    <span className="text-white">{formatSize(file.size)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Format</span>
                    <span className="text-white uppercase">{file.extension?.replace('.', '')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Modified</span>
                    <span className="text-white">{new Date(file.modified).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Quality Score</span>
                    <span className="text-white">{file.analysis?.quality || 0}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-amber-400 font-medium mb-3">Guardian Affinity</h4>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <span className="text-3xl">{guardianInfo.icon}</span>
                  <div>
                    <div className="font-medium text-white">{guardianInfo.name}</div>
                    <div className="text-sm text-slate-400">{guardianInfo.element} Element • {file.analysis?.guardianAffinity?.confidence || 0}% confidence</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-amber-400 font-medium mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {file.analysis?.tags?.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-amber-500 text-black rounded-xl font-medium hover:bg-amber-400 transition-colors">
                  Open File
                </button>
                <button className="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors">
                  Show in Folder
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Server-side data fetching
export async function getServerSideProps() {
  try {
    const ArcaneaSuperintelligenceAgent = require('../arcanea-super-agent');
    const agent = new ArcaneaSuperintelligenceAgent();
    
    // Try to load existing library or scan if needed
    let libraryData;
    const loaded = await agent.loadLibrary();
    
    if (loaded) {
      libraryData = agent.libraryCache;
    } else {
      libraryData = await agent.execute('scan');
    }
    
    return {
      props: {
        libraryData: JSON.parse(JSON.stringify(libraryData)) // Serialize for SSR
      }
    };
  } catch (error) {
    console.error('Error loading library:', error);
    return {
      props: {
        libraryData: {
          total: 0,
          files: [],
          categories: {},
          guardians: {}
        }
      }
    };
  }
}