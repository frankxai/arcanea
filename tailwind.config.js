/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // FrankX Brand Color Palette
      colors: {
        // Deep Backgrounds
        'deep-navy': '#0F172A',
        'midnight': '#1E293B',
        'cosmic-dark': '#0F1629',
        
        // Conscious & Spirituality
        'conscious-purple': '#8B5CF6',
        'conscious-deep': '#6D28D9',
        'conscious-light': '#C4B5FD',
        
        // AI & Technology
        'tech-cyan': '#06B6D4',
        'tech-electric': '#0891B2',
        'tech-bright': '#67E8F9',
        
        // Music & Creativity
        'music-orange': '#F97316',
        'music-vibrant': '#EA580C',
        'music-warm': '#FDBA74',
        
        // Personal Development
        'growth-green': '#10B981',
        'growth-forest': '#059669',
        'growth-fresh': '#6EE7B7',
        
        // Accents
        'aurora-blue': '#43BFE3',
        'cosmic-purple': '#AB47C7',
        'gold-accent': '#F59E0B',
      },
      
      // FrankX Typography
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      
      // Custom Animations for FrankX Quality
      animation: {
        'aurora': 'aurora 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.3' },
          '33%': { transform: 'translateY(-20px) rotate(120deg)', opacity: '0.5' },
          '66%': { transform: 'translateY(10px) rotate(240deg)', opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      
      // Glassmorphic Effects
      backdropBlur: {
        'xs': '2px',
      },
      
      // Enhanced Spacing for FrankX Design
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Custom Shadows for Depth
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(245, 158, 11, 0.3)',
        'aurora': '0 0 60px rgba(139, 92, 246, 0.2)',
        'cosmic': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      
      // Gradient Utilities
      backgroundImage: {
        'cosmic': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'aurora': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}