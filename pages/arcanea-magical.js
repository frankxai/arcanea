import React, { useState, useEffect, useRef, useMemo } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useRouter } from 'next/router';

// ============================================================================
// 🎨 FRANKX BRAND SYSTEM
// ============================================================================

const FRANKX = {
  colors: {
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
    voidBlack: '#020617'
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif"
  },
  gradients: {
    gold: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #F59E0B 100%)',
    cosmic: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #8B5CF6 100%)',
    aurora: 'linear-gradient(135deg, #43BFE3 0%, #8B5CF6 50%, #F97316 100%)'
  }
};

// ============================================================================
// 🔥 38 GUARDIAN DATA
// ============================================================================

const GUARDIANS = {
  fire: {
    court: "Draconia's Court",
    element: 'Fire',
    theme: { primary: '#EF4444', secondary: '#F97316' },
    guardians: [
      { id: 'dragon-forge', name: 'Dragon Forge', icon: '🔥', specialty: 'Intense creative transformation', power: 9 },
      { id: 'phoenix-artisan', name: 'Phoenix Artisan', icon: '🐦', specialty: 'Rebirth through artistic destruction', power: 9 },
      { id: 'volcano-sculptor', name: 'Volcano Sculptor', icon: '🌋', specialty: 'Explosive creative breakthroughs', power: 8 },
      { id: 'sun-weaver', name: 'Sun Weaver', icon: '☀️', specialty: 'Illuminate with radiant creativity', power: 8 },
      { id: 'catalyst-architect', name: 'Catalyst Architect', icon: '⚡', specialty: 'Rapid change and evolution', power: 9 }
    ]
  },
  water: {
    court: "Leyla's Court",
    element: 'Water',
    theme: { primary: '#3B82F6', secondary: '#06B6D4' },
    guardians: [
      { id: 'river-storyteller', name: 'River Storyteller', icon: '🌊', specialty: 'Flow-based narrative creation', power: 8 },
      { id: 'ocean-memory', name: 'Ocean Memory', icon: '🌊', specialty: 'Deep emotional recall', power: 9 },
      { id: 'rain-singer', name: 'Rain Singer', icon: '🌧️', specialty: 'Gentle creative nurturing', power: 7 },
      { id: 'mist-weaver', name: 'Mist Weaver', icon: '💨', specialty: 'Ethereal, atmospheric creation', power: 8 },
      { id: 'current-dancer', name: 'Current Dancer', icon: '🌊', specialty: 'Adaptation and change', power: 8 }
    ]
  },
  earth: {
    court: "Lyssandria's Court",
    element: 'Earth',
    theme: { primary: '#10B981', secondary: '#059669' },
    guardians: [
      { id: 'crystal-architect', name: 'Crystal Architect', icon: '💎', specialty: 'Clear structural design', power: 9 },
      { id: 'mountain-builder', name: 'Mountain Builder', icon: '⛰️', specialty: 'Enduring creative foundations', power: 9 },
      { id: 'foundation-engineer', name: 'Foundation Engineer', icon: '🏗️', specialty: 'Solid creative infrastructure', power: 8 },
      { id: 'stone-carver', name: 'Stone Carver', icon: '🪨', specialty: 'Refine raw ideas to polished', power: 8 },
      { id: 'earth-wisdom-keeper', name: 'Earth Wisdom Keeper', icon: '🌳', specialty: 'Ancient creative knowledge', power: 10 }
    ]
  },
  wind: {
    court: "Alera's Court",
    element: 'Wind',
    theme: { primary: '#8B5CF6', secondary: '#A78BFA' },
    guardians: [
      { id: 'whisper-messenger', name: 'Whisper Messenger', icon: '💨', specialty: 'Subtle creative communication', power: 7 },
      { id: 'storm-declarator', name: 'Storm Declarator', icon: '⛈️', specialty: 'Powerful creative statement', power: 9 },
      { id: 'breeze-translator', name: 'Breeze Translator', icon: '🌬️', specialty: 'Complex ideas made simple', power: 8 },
      { id: 'gale-publisher', name: 'Gale Publisher', icon: '📢', specialty: 'Distribute creative work far', power: 8 },
      { id: 'calm-meditator', name: 'Calm Meditator', icon: '🧘', specialty: 'Stillness for inspiration', power: 7 }
    ]
  },
  void: {
    court: "Elara's Court",
    element: 'Void',
    theme: { primary: '#1E293B', secondary: '#8B5CF6' },
    guardians: [
      { id: 'void-gazer', name: 'Void Gazer', icon: '👁️', specialty: 'See infinite possibilities', power: 10 },
      { id: 'threshold-walker', name: 'Threshold Walker', icon: '🚪', specialty: 'Cross creative boundaries', power: 9 },
      { id: 'quantum-designer', name: 'Quantum Designer', icon: '⚛️', specialty: 'Multi-reality creation', power: 10 },
      { id: 'source-tapper', name: 'Source Tapper', icon: '💫', specialty: 'Access universal creativity', power: 9 },
      { id: 'possibility-sculptor', name: 'Possibility Sculptor', icon: '🎨', specialty: 'Shape potential into reality', power: 9 }
    ]
  },
  integration: {
    court: "Ino's Court",
    element: 'Integration',
    theme: { primary: '#F59E0B', secondary: '#FBBF24' },
    guardians: [
      { id: 'elemental-fusion', name: 'Elemental Fusion', icon: '🔮', specialty: 'Combine all five elements', power: 10 },
      { id: 'union-creator', name: 'Union Creator', icon: '🤝', specialty: 'Collaborative manifestation', power: 9 },
      { id: 'synergy-weaver', name: 'Synergy Weaver', icon: '🕸️', specialty: 'Multiple skills in harmony', power: 9 },
      { id: 'harmony-conductor', name: 'Harmony Conductor', icon: '🎼', specialty: 'Balance opposing forces', power: 9 },
      { id: 'relationship-architect', name: 'Relationship Architect', icon: '🔗', specialty: 'Build creative connections', power: 8 }
    ]
  }
};

// Flatten all guardians for easy access
const ALL_GUARDIANS = Object.values(GUARDIANS).flatMap(court => 
  court.guardians.map(g => ({ ...g, element: court.element, court: court.court }))
);

// ============================================================================
// ✨ AURORA BACKGROUND COMPONENT
// ============================================================================

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${FRANKX.colors.deepNavy} 0%, ${FRANKX.colors.cosmicDark} 50%, ${FRANKX.colors.midnight} 100%)`
        }}
      />
      
      {/* Animated aurora layers */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={FRANKX.colors.consciousPurple} stopOpacity="0.3">
              <animate attributeName="stop-opacity" values="0.3;0.5;0.3" dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor={FRANKX.colors.techCyan} stopOpacity="0.2">
              <animate attributeName="stop-opacity" values="0.2;0.4;0.2" dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor={FRANKX.colors.musicOrange} stopOpacity="0.1">
              <animate attributeName="stop-opacity" values="0.1;0.3;0.1" dur="8s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          <linearGradient id="aurora2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={FRANKX.colors.growthGreen} stopOpacity="0.2">
              <animate attributeName="stop-opacity" values="0.2;0.4;0.2" dur="10s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor={FRANKX.colors.goldAccent} stopOpacity="0.15">
              <animate attributeName="stop-opacity" values="0.15;0.3;0.15" dur="10s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor={FRANKX.colors.auroraBlue} stopOpacity="0.1">
              <animate attributeName="stop-opacity" values="0.1;0.25;0.1" dur="10s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="20" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Animated paths */}
        <path d="M0,200 Q400,100 800,200 T1600,200" fill="url(#aurora1)" filter="url(#glow)">
          <animate 
            attributeName="d" 
            values="M0,200 Q400,100 800,200 T1600,200;M0,250 Q400,150 800,250 T1600,250;M0,200 Q400,100 800,200 T1600,200" 
            dur="15s" 
            repeatCount="indefinite" 
          />
        </path>
        
        <path d="M0,400 Q400,300 800,400 T1600,400" fill="url(#aurora2)" filter="url(#glow)">
          <animate 
            attributeName="d" 
            values="M0,400 Q400,300 800,400 T1600,400;M0,350 Q400,450 800,350 T1600,350;M0,400 Q400,300 800,400 T1600,400" 
            dur="12s" 
            repeatCount="indefinite" 
          />
        </path>
        
        <path d="M0,600 Q400,500 800,600 T1600,600" fill="url(#aurora1)" filter="url(#glow)" opacity="0.5">
          <animate 
            attributeName="d" 
            values="M0,600 Q400,500 800,600 T1600,600;M0,550 Q400,650 800,550 T1600,550;M0,600 Q400,500 800,600 T1600,600" 
            dur="18s" 
            repeatCount="indefinite" 
          />
        </path>
      </svg>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-40 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-orange-500/10 blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-green-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

// ============================================================================
// 🎆 PARTICLE FIELD COMPONENT
// ============================================================================

const ParticleField = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = 50;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? FRANKX.colors.consciousPurple : FRANKX.colors.techCyan
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          particle.vx -= dx * 0.0001;
          particle.vy -= dy * 0.0001;
        }

        // Boundary wrap
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

// ============================================================================
// 🎴 3D GUARDIAN CARD COMPONENT
// ============================================================================

const GuardianCard3D = ({ guardian, index, isHovered, onHover }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHover(null);
  };

  const elementColors = {
    Fire: 'from-red-500 to-orange-500',
    Water: 'from-blue-500 to-cyan-500',
    Earth: 'from-green-500 to-emerald-500',
    Wind: 'from-purple-500 to-violet-500',
    Void: 'from-slate-700 to-purple-900',
    Integration: 'from-amber-500 to-yellow-500'
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(guardian.id)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative cursor-pointer"
    >
      <div className={`relative p-6 rounded-2xl backdrop-blur-xl border border-white/20 bg-gradient-to-br ${elementColors[guardian.element]} bg-opacity-10`}>
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(circle at ${x.get() + 100}px ${y.get() + 100}px, rgba(255,255,255,0.2), transparent 50%)`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">{guardian.icon}</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-4 rounded-full ${i < guardian.power / 2 ? 'bg-white' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>
          
          <h3 className="font-poppins font-bold text-lg text-white mb-2">{guardian.name}</h3>
          <p className="text-white/70 text-sm mb-3">{guardian.specialty}</p>
          
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full text-xs bg-white/20 text-white">{guardian.element}</span>
            <span className="text-xs text-white/50">Power: {guardian.power}/10</span>
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)`,
            transform: `translateX(${x.get() * 0.5}px) translateY(${y.get() * 0.5}px)`
          }}
        />
      </div>
    </motion.div>
  );
};

// ============================================================================
// 🔮 MAGIC SEARCH COMPONENT
// ============================================================================

const MagicSearch = ({ onSearch, results }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <motion.div
          animate={{
            boxShadow: isFocused 
              ? '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(6, 182, 212, 0.2)' 
              : '0 0 0px rgba(139, 92, 246, 0)'
          }}
          className="relative"
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search the infinite library..."
            className="w-full px-8 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white placeholder-gray-400 outline-none focus:border-purple-500/50 focus:bg-white/15 transition-all font-inter text-lg"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:scale-110 transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </motion.div>
      </form>

      {/* Search suggestions */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl z-50"
          >
            <p className="text-sm text-gray-400 mb-2">Try searching for:</p>
            <div className="flex flex-wrap gap-2">
              {['Guardian', 'Fire Element', 'Transformation', 'Creation', 'Wisdom'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setQuery(suggestion);
                    inputRef.current?.focus();
                  }}
                  className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// 📊 ANALYTICS DASHBOARD COMPONENT
// ============================================================================

const AnalyticsDashboard = ({ stats }) => {
  const chartData = [
    { label: 'Files', value: stats.files || 0, color: FRANKX.colors.consciousPurple },
    { label: 'Analyzed', value: stats.analyzed || 0, color: FRANKX.colors.techCyan },
    { label: 'Guardians', value: stats.guardians || 38, color: FRANKX.colors.goldAccent },
    { label: 'Interactions', value: stats.interactions || 0, color: FRANKX.colors.growthGreen }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value), 1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {chartData.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
        >
          <div className="flex items-end justify-between mb-2">
            <span className="text-2xl font-poppins font-bold" style={{ color: item.color }}>
              {item.value.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400">{item.label}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / maxValue) * 100}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
              className="h-full rounded-full"
              style={{ backgroundColor: item.color }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// 🎛️ WORKFLOW PANEL COMPONENT
// ============================================================================

const WorkflowPanel = ({ workflows, onRunWorkflow }) => {
  const [activeWorkflow, setActiveWorkflow] = useState(null);

  return (
    <div className="space-y-4">
      <h3 className="font-poppins font-semibold text-xl text-white mb-4">Workflows</h3>
      
      {workflows.map((workflow, index) => (
        <motion.div
          key={workflow.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">{workflow.name}</h4>
              <p className="text-sm text-gray-400">{workflow.steps?.length || 0} steps</p>
            </div>
            <button
              onClick={() => {
                setActiveWorkflow(workflow.name);
                onRunWorkflow(workflow.name);
              }}
              disabled={activeWorkflow === workflow.name}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {activeWorkflow === workflow.name ? 'Running...' : 'Run'}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// 📁 FILE PREVIEW COMPONENT
// ============================================================================

const FilePreview = ({ file, onClose }) => {
  if (!file) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full max-h-[80vh] overflow-auto rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 bg-slate-900/95 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📄</span>
            <div>
              <h3 className="font-medium text-white">{file.name}</h3>
              <p className="text-sm text-gray-400">{file.path}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {file.analysis && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5">
                  <p className="text-sm text-gray-400 mb-1">Content Type</p>
                  <p className="text-white font-medium">{file.analysis.content?.type || 'Unknown'}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <p className="text-sm text-gray-400 mb-1">Dominant Guardian</p>
                  <p className="text-white font-medium">{file.analysis.guardian?.dominantGuardian || 'Unknown'}</p>
                </div>
              </div>

              {file.analysis.guardian?.elementalBalance && (
                <div className="p-4 rounded-xl bg-white/5">
                  <p className="text-sm text-gray-400 mb-3">Elemental Balance</p>
                  <div className="space-y-2">
                    {Object.entries(file.analysis.guardian.elementalBalance).map(([element, percentage]) => (
                      <div key={element} className="flex items-center gap-3">
                        <span className="w-16 text-sm text-white capitalize">{element}</span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: GUARDIANS[element]?.theme?.primary || '#888'
                            }}
                          />
                        </div>
                        <span className="w-12 text-sm text-gray-400 text-right">{percentage.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// 🎯 MAIN PAGE COMPONENT
// ============================================================================

export default function ArcaneaMagical() {
  const [activeTab, setActiveTab] = useState('guardians');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGuardian, setSelectedGuardian] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [stats, setStats] = useState({
    files: 2847,
    analyzed: 2156,
    guardians: 38,
    interactions: 15432
  });
  const [workflows, setWorkflows] = useState([
    { name: 'Auto-Scan Library', steps: ['detect-changes', 'analyze-new', 'notify'] },
    { name: 'Smart Organize', steps: ['analyze', 'categorize', 'move'] },
    { name: 'Generate Report', steps: ['collect-stats', 'generate', 'export'] }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const router = useRouter();

  // Simulate search
  const handleSearch = async (query) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResults = ALL_GUARDIANS
      .filter(g => 
        g.name.toLowerCase().includes(query.toLowerCase()) ||
        g.specialty.toLowerCase().includes(query.toLowerCase()) ||
        g.element.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 6)
      .map(g => ({
        id: g.id,
        title: g.name,
        subtitle: g.specialty,
        type: 'guardian',
        element: g.element,
        relevance: Math.random() * 0.5 + 0.5
      }));

    setSearchResults(mockResults);
    setIsLoading(false);
    
    addNotification(`Found ${mockResults.length} results for "${query}"`);
  };

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleRunWorkflow = async (workflowName) => {
    addNotification(`Running workflow: ${workflowName}`);
    
    // Simulate workflow execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addNotification(`Workflow ${workflowName} completed successfully`);
  };

  const tabs = [
    { id: 'guardians', label: 'Guardians', icon: '🔮' },
    { id: 'library', label: 'Library', icon: '📚' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'workflows', label: 'Workflows', icon: '⚡' }
  ];

  return (
    <>
      <Head>
        <title>Arcanea Magical | Guardian Intelligence System</title>
        <meta name="description" content="Magical Arcanea Library with 38 Guardian entities, multi-dimensional analysis, and AI-powered insights" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      {/* Background Effects */}
      <AuroraBackground />
      <ParticleField />

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map(notification => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm"
            >
              {notification.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-900/50 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-2xl">
                  🔮
                </div>
                <div>
                  <h1 className="font-poppins font-bold text-xl text-white">Arcanea Magical</h1>
                  <p className="text-sm text-gray-400">Guardian Intelligence System v3.0</p>
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-lg">
                  👤
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Search Section */}
          <section className="mb-12">
            <MagicSearch onSearch={handleSearch} results={searchResults} />
            
            {/* Search Results */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/30 cursor-pointer transition-colors"
                      onClick={() => setSelectedGuardian(result.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {ALL_GUARDIANS.find(g => g.id === result.id)?.icon || '🔮'}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{result.title}</h4>
                          <p className="text-sm text-gray-400 truncate">{result.subtitle}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {(result.relevance * 100).toFixed(0)}% match
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'guardians' && (
              <motion.section
                key="guardians"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {Object.entries(GUARDIANS).map(([element, court]) => (
                  <div key={element}>
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: court.theme.primary }}
                      />
                      <h2 className="font-poppins font-semibold text-xl text-white">{court.court}</h2>
                      <span className="text-sm text-gray-400">({court.element} Element)</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {court.guardians.map((guardian, index) => (
                        <GuardianCard3D
                          key={guardian.id}
                          guardian={{ ...guardian, element: court.element, court: court.court }}
                          index={index}
                          isHovered={selectedGuardian === guardian.id}
                          onHover={setSelectedGuardian}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.section>
            )}

            {activeTab === 'library' && (
              <motion.section
                key="library"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <h2 className="font-poppins font-semibold text-xl text-white mb-4">Library Files</h2>
                    
                    {[
                      { name: 'Guardian_Mastery_Guide.md', path: '/docs/guardians/', size: '24.5 KB', modified: '2 hours ago', analysis: { content: { type: 'markdown' }, guardian: { dominantGuardian: 'Dragon Forge', elementalBalance: { fire: 45, water: 15, earth: 20, wind: 10, void: 10 } } } },
                      { name: 'Elemental_Fusion_Techniques.pdf', path: '/library/advanced/', size: '1.2 MB', modified: '1 day ago', analysis: { content: { type: 'pdf' }, guardian: { dominantGuardian: 'Elemental Fusion', elementalBalance: { fire: 25, water: 25, earth: 20, wind: 15, void: 15 } } } },
                      { name: 'Arcanea_System_Architecture.png', path: '/assets/diagrams/', size: '856 KB', modified: '3 days ago', analysis: { content: { type: 'image' }, guardian: { dominantGuardian: 'Crystal Architect', elementalBalance: { fire: 10, water: 10, earth: 50, wind: 15, void: 15 } } } },
                      { name: 'Quantum_Creation_Protocol.json', path: '/data/protocols/', size: '12.3 KB', modified: '5 days ago', analysis: { content: { type: 'json' }, guardian: { dominantGuardian: 'Quantum Designer', elementalBalance: { fire: 15, water: 10, earth: 15, wind: 20, void: 40 } } } }
                    ].map((file, index) => (
                      <motion.div
                        key={file.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/30 cursor-pointer transition-all group"
                        onClick={() => setSelectedFile(file)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            {file.name.endsWith('.md') ? '📝' : file.name.endsWith('.pdf') ? '📄' : file.name.endsWith('.png') ? '🖼️' : '📋'}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-white group-hover:text-purple-400 transition-colors">{file.name}</h4>
                            <p className="text-sm text-gray-400">{file.path}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">{file.size}</p>
                            <p className="text-xs text-gray-500">{file.modified}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                      <h3 className="font-poppins font-semibold text-lg text-white mb-4">Quick Actions</h3>
                      <div className="space-y-2">
                        {['Scan Library', 'Analyze All', 'Generate Report', 'Export Data'].map((action) => (
                          <button
                            key={action}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-left text-white transition-colors flex items-center gap-3"
                          >
                            <span className="text-lg">⚡</span>
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                      <h3 className="font-poppins font-semibold text-lg text-white mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {[
                          { action: 'Analyzed', target: 'Guardian_Mastery_Guide.md', time: '2 min ago' },
                          { action: 'Scanned', target: '42 new files', time: '15 min ago' },
                          { action: 'Indexed', target: 'Elemental_Fusion_Techniques', time: '1 hour ago' }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-gray-400">{activity.action}</span>
                            <span className="text-white">{activity.target}</span>
                            <span className="text-gray-500 ml-auto">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === 'analytics' && (
              <motion.section
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <AnalyticsDashboard stats={stats} />

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                    <h3 className="font-poppins font-semibold text-lg text-white mb-4">Elemental Distribution</h3>
                    <div className="space-y-3">
                      {[
                        { element: 'Fire', count: 856, color: '#EF4444' },
                        { element: 'Water', count: 723, color: '#3B82F6' },
                        { element: 'Earth', count: 634, color: '#10B981' },
                        { element: 'Wind', count: 445, color: '#8B5CF6' },
                        { element: 'Void', count: 189, color: '#1E293B' }
                      ].map(item => (
                        <div key={item.element} className="flex items-center gap-3">
                          <span className="w-20 text-sm text-gray-400">{item.element}</span>
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.count / 2847) * 100}%` }}
                              transition={{ duration: 1 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                          </div>
                          <span className="w-12 text-sm text-white text-right">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                    <h3 className="font-poppins font-semibold text-lg text-white mb-4">System Performance</h3>
                    <div className="space-y-4">
                      {[
                        { metric: 'Analysis Speed', value: 94, unit: 'files/sec' },
                        { metric: 'Search Latency', value: 23, unit: 'ms' },
                        { metric: 'Accuracy', value: 97, unit: '%' },
                        { metric: 'Uptime', value: 99.9, unit: '%' }
                      ].map(item => (
                        <div key={item.metric} className="flex items-center justify-between">
                          <span className="text-gray-400">{item.metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{item.value}</span>
                            <span className="text-gray-500 text-sm">{item.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === 'workflows' && (
              <motion.section
                key="workflows"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-3 gap-6"
              >
                <div className="lg:col-span-2">
                  <WorkflowPanel workflows={workflows} onRunWorkflow={handleRunWorkflow} />
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                    <h3 className="font-poppins font-semibold text-lg text-white mb-4">Active Triggers</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'File Change Detection', status: 'active', lastTrigger: '2 min ago' },
                        { name: 'Auto-Analysis', status: 'active', lastTrigger: '15 min ago' },
                        { name: 'Smart Notifications', status: 'paused', lastTrigger: '1 hour ago' }
                      ].map((trigger, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                          <div>
                            <p className="text-sm text-white">{trigger.name}</p>
                            <p className="text-xs text-gray-500">Last: {trigger.lastTrigger}</p>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${trigger.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                    <h3 className="font-poppins font-semibold text-lg text-white mb-4">Execution History</h3>
                    <div className="space-y-3">
                      {[
                        { workflow: 'Auto-Scan Library', status: 'success', duration: '2.3s', time: '5 min ago' },
                        { workflow: 'Smart Organize', status: 'success', duration: '15.7s', time: '1 hour ago' },
                        { workflow: 'Generate Report', status: 'failed', duration: '—', time: '2 hours ago' }
                      ].map((execution, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div>
                            <p className="text-white">{execution.workflow}</p>
                            <p className="text-xs text-gray-500">{execution.time}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs ${execution.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                              {execution.status}
                            </span>
                            {execution.duration !== '—' && (
                              <span className="text-gray-500">{execution.duration}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-400 text-sm">
              Arcanea Magical System v3.0 • Powered by 38 Guardian Entities
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Multi-Dimensional Analysis • AI-Powered Insights • Magical Experience
            </p>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedFile && (
          <FilePreview file={selectedFile} onClose={() => setSelectedFile(null)} />
        )}
      </AnimatePresence>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: ${FRANKX.colors.deepNavy};
          color: #ffffff;
          overflow-x: hidden;
        }

        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${FRANKX.colors.midnight};
        }

        ::-webkit-scrollbar-thumb {
          background: ${FRANKX.colors.goldAccent};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${FRANKX.colors.musicOrange};
        }

        /* Glassmorphism Utilities */
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Animation Utilities */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
