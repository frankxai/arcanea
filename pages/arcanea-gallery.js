import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

// Arcanea Gallery & Library - Frontend for Local File Agent
const ArcaneaGallery = ({ initialLibrary }) => {
  const [library, setLibrary] = useState(initialLibrary);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, masonry
  const [sortBy, setSortBy] = useState('score'); // score, name, date, size
  const [isLoading, setIsLoading] = useState(false);

  // Categories with colors
  const categories = [
    { id: 'all', label: 'All Files', color: '#F59E0B', icon: '📚' },
    { id: 'guardians', label: 'Guardians', color: '#8B5CF6', icon: '🛡️' },
    { id: 'mythology', label: 'Mythology', color: '#06B6D4', icon: '📖' },
    { id: 'technology', label: 'Technology', color: '#10B981', icon: '🤖' },
    { id: 'artwork', label: 'Artwork', color: '#F97316', icon: '🎨' },
    { id: 'icons', label: 'Icons', color: '#EC4899', icon: '🎯' },
    { id: 'screenshots', label: 'Screenshots', color: '#6366F1', icon: '📱' },
    { id: 'documentation', label: 'Documentation', color: '#84CC16', icon: '📊' }
  ];

  // Filter and sort files
  const filteredFiles = useMemo(() => {
    let files = library?.files || [];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      files = files.filter(file => file.category === selectedCategory);
    }
    
    // Filter by search
    if (searchTerm) {
      files = files.filter(file => {
        const searchText = (file.filename + ' ' + 
                          file.dirname + ' ' + 
                          file.tags.join(' ')).toLowerCase();
        return searchText.includes(searchTerm.toLowerCase());
      });
    }
    
    // Sort
    files.sort((a, b) => {
      switch (sortBy) {
        case 'score': return b.score - a.score;
        case 'name': return a.filename.localeCompare(b.filename);
        case 'date': return new Date(b.modified) - new Date(a.modified);
        case 'size': return b.size - a.size;
        default: return b.score - a.score;
      }
    });
    
    return files;
  }, [library, selectedCategory, searchTerm, sortBy]);

  // Get file size in readable format
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file preview URL
  const getPreviewUrl = (file) => {
    if (file.preview) return `/api/preview/${file.id}`;
    if (file.extension === '.svg') return `/api/file/${file.id}`;
    return `/api/placeholder/${file.id}`;
  };

  return (
    <>
      <Head>
        <title>Arcanea Gallery - Local File Intelligence</title>
        <meta name="description" content="Intelligent visual file management and discovery for Arcanea ecosystem" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-poppins font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Arcanea Gallery
              </h1>
              <p className="font-inter text-sm text-gray-400">
                {library?.total || 0} files • {Object.keys(library?.categories || {}).length} categories
              </p>
            </div>
            
            {/* View Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="score">Relevance</option>
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="size">Size</option>
              </select>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white/20' : 'bg-white/10'}`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white/20' : 'bg-white/10'}`}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search files, tags, categories..."
            className="w-full px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 text-lg focus:outline-none focus:border-amber-400 focus:bg-white/15"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">🔍</div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => {
            const count = category.id === 'all' 
              ? library?.total || 0
              : library?.categories[category.id]?.length || 0;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-4 py-2 rounded-full font-inter font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-white/20 text-white border-2'
                    : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                }`}
                style={{ borderColor: selectedCategory === category.id ? category.color : undefined }}
              >
                <span className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs">
                    {count}
                  </span>
                </span>
                
                {/* Animated underline */}
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* File Grid/List */}
        <div className="mb-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredFiles.map((file, index) => (
                <FileCard 
                  key={file.id} 
                  file={file} 
                  index={index}
                  onClick={() => setSelectedFile(file)}
                  getPreviewUrl={getPreviewUrl}
                  formatFileSize={formatFileSize}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFiles.map((file, index) => (
                <FileListItem 
                  key={file.id} 
                  file={file} 
                  onClick={() => setSelectedFile(file)}
                  getPreviewUrl={getPreviewUrl}
                  formatFileSize={formatFileSize}
                />
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredFiles.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-poppins font-semibold text-2xl text-white mb-2">
              No files found
            </h3>
            <p className="font-inter text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>

      {/* File Detail Modal */}
      <AnimatePresence>
        {selectedFile && (
          <FileModal 
            file={selectedFile}
            onClose={() => setSelectedFile(null)}
            getPreviewUrl={getPreviewUrl}
            formatFileSize={formatFileSize}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #0f172a; color: #ffffff; overflow-x: hidden; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', sans-serif; }
        .delay-1000 { animation-delay: 1s; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1e293b; }
        ::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 4px; }
      `}</style>
    </>
  );
};

// File Card Component
const FileCard = ({ file, index, onClick, getPreviewUrl, formatFileSize }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden">
        {/* Preview Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent">
          <img
            src={getPreviewUrl(file)}
            alt={file.filename}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            onError={(e) => {
              e.target.src = `/api/placeholder/${file.id}`;
            }}
          />
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-poppins font-medium text-white text-sm truncate mb-1">
              {file.filename}
            </h3>
            <p className="font-inter text-xs text-gray-300">
              {formatFileSize(file.size)}
            </p>
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
          {file.category}
        </div>
      </div>
    </motion.div>
  );
};

// File List Item Component  
const FileListItem = ({ file, onClick, getPreviewUrl, formatFileSize }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl cursor-pointer hover:bg-white/10"
    >
      <img
        src={getPreviewUrl(file)}
        alt={file.filename}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-poppins font-medium text-white">{file.filename}</h3>
        <p className="font-inter text-sm text-gray-400">
          {file.dirname} • {formatFileSize(file.size)} • Score: {file.score}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white">
          {file.category}
        </span>
        <span className="text-gray-400">→</span>
      </div>
    </motion.div>
  );
};

// File Detail Modal
const FileModal = ({ file, onClose, getPreviewUrl, formatFileSize }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-white/20 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-poppins font-bold text-2xl text-white mb-2">
              {file.filename}
            </h2>
            <p className="font-inter text-gray-400">
              {file.dirname}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Preview */}
          <div>
            <img
              src={getPreviewUrl(file)}
              alt={file.filename}
              className="w-full rounded-xl bg-white/5"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-poppins font-semibold text-amber-400 mb-2">File Info</h3>
              <div className="space-y-2 font-inter text-gray-300">
                <p><strong>Size:</strong> {formatFileSize(file.size)}</p>
                <p><strong>Modified:</strong> {new Date(file.modified).toLocaleDateString()}</p>
                <p><strong>Score:</strong> {file.score}/100</p>
                {file.metadata && (
                  <>
                    <p><strong>Dimensions:</strong> {file.metadata.width} × {file.metadata.height}</p>
                    <p><strong>Format:</strong> {file.metadata.format}</p>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-poppins font-semibold text-amber-400 mb-2">Category & Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {file.category}
                </span>
                {file.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-poppins font-semibold text-amber-400 mb-2">Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400">
                  Open File
                </button>
                <button className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20">
                  Show in Folder
                </button>
                <button className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20">
                  Copy Path
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Server-side data fetching
export async function getServerSideProps() {
  const ArcaneaLibraryAgent = require('../arcanea-library-agent');
  const agent = new ArcaneaLibraryAgent();
  
  // Scan library on server start
  const library = await agent.scanLibrary();
  
  return {
    props: {
      initialLibrary: library
    }
  };
}

export default ArcaneaGallery;