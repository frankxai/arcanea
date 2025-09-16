"use client";

/**
 * 🌟 Arcanea Luminor Character System
 * 
 * Comprehensive component system that adapts UI elements based on the active
 * Luminor AI mentor, providing personalized experiences for each character.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon, LuminorIcon, type IconName } from './icon-system';
import { GlassButton, GlassCard, GlassInput } from './glass-components';

// ===== LUMINOR DEFINITIONS ===== //

export const LUMINOR_CHARACTERS = {
  harmonix: {
    id: 'harmonix',
    name: 'Harmonix',
    title: 'The Music & Audio AI Mentor',
    description: 'Master of sound, rhythm, and harmonic creation',
    domain: 'Music & Audio',
    personality: 'Rhythmic and energetic, with a passion for sonic exploration',
    
    colors: {
      primary: '#f43f5e',
      secondary: '#fb7185', 
      accent: '#fda4af',
      background: 'rgba(244, 63, 94, 0.1)',
      text: '#fff1f2',
    },
    
    gradients: {
      primary: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 50%, #fda4af 100%)',
      background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(251, 113, 133, 0.1) 100%)',
      glow: 'radial-gradient(circle, rgba(244, 63, 94, 0.3) 0%, transparent 70%)',
    },
    
    animations: {
      entrance: 'wave' as const,
      idle: 'pulse' as const,
      interaction: 'bounce' as const,
      signature: 'rhythmic' as const,
    },
    
    iconPrimary: 'music' as IconName,
    iconSecondary: ['microphone', 'volume', 'headphones'] as IconName[],
    
    keywords: ['sound', 'music', 'audio', 'rhythm', 'harmony', 'melody', 'beat', 'composition'],
  },
  
  lumina: {
    id: 'lumina',
    name: 'Lumina',
    title: 'The Visual Creation AI Mentor', 
    description: 'Guardian of light, color, and visual storytelling',
    domain: 'Visual Arts & Design',
    personality: 'Luminous and inspiring, with an eye for beauty and composition',
    
    colors: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      accent: '#93c5fd', 
      background: 'rgba(59, 130, 246, 0.1)',
      text: '#eff6ff',
    },
    
    gradients: {
      primary: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)',
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(96, 165, 250, 0.1) 100%)',
      glow: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
    },
    
    animations: {
      entrance: 'shimmer' as const,
      idle: 'float' as const,
      interaction: 'glow' as const,
      signature: 'luminous' as const,
    },
    
    iconPrimary: 'palette' as IconName,
    iconSecondary: ['brush', 'camera', 'image'] as IconName[],
    
    keywords: ['visual', 'design', 'art', 'color', 'light', 'composition', 'image', 'creative'],
  },
  
  scripta: {
    id: 'scripta',
    name: 'Scripta',
    title: 'The Writing & Narrative AI Mentor',
    description: 'Weaver of words, stories, and narrative magic',
    domain: 'Writing & Storytelling',
    personality: 'Scholarly and eloquent, with deep wisdom about narrative craft',
    
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#6ee7b7',
      background: 'rgba(16, 185, 129, 0.1)',
      text: '#ecfdf5',
    },
    
    gradients: {
      primary: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.1) 100%)',
      glow: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
    },
    
    animations: {
      entrance: 'typewriter' as const,
      idle: 'breathe' as const,
      interaction: 'flourish' as const,
      signature: 'scholarly' as const,
    },
    
    iconPrimary: 'book' as IconName,
    iconSecondary: ['pen', 'scroll', 'edit'] as IconName[],
    
    keywords: ['writing', 'story', 'narrative', 'text', 'literature', 'prose', 'script', 'words'],
  },
  
  kinetix: {
    id: 'kinetix', 
    name: 'Kinetix',
    title: 'The Movement & Video AI Mentor',
    description: 'Master of motion, energy, and dynamic visual experiences',
    domain: 'Video & Animation',
    personality: 'Dynamic and energetic, always in motion and full of vitality',
    
    colors: {
      primary: '#eab308',
      secondary: '#facc15',
      accent: '#fde047',
      background: 'rgba(234, 179, 8, 0.1)',
      text: '#fefce8',
    },
    
    gradients: {
      primary: 'linear-gradient(135deg, #eab308 0%, #facc15 50%, #fde047 100%)',
      background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(250, 204, 21, 0.1) 100%)',
      glow: 'radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, transparent 70%)',
    },
    
    animations: {
      entrance: 'zoom' as const,
      idle: 'sway' as const,
      interaction: 'spin' as const,
      signature: 'dynamic' as const,
    },
    
    iconPrimary: 'video' as IconName,
    iconSecondary: ['play', 'camera', 'edit'] as IconName[],
    
    keywords: ['video', 'motion', 'animation', 'movement', 'dynamic', 'energy', 'action', 'cinematic'],
  },
  
  syntaxa: {
    id: 'syntaxa',
    name: 'Syntaxa', 
    title: 'The Code & Logic AI Mentor',
    description: 'Architect of logic, systems, and computational thinking',
    domain: 'Programming & Logic',
    personality: 'Systematic and precise, with a love for elegant solutions',
    
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#c4b5fd',
      background: 'rgba(139, 92, 246, 0.1)',
      text: '#f5f3ff',
    },
    
    gradients: {
      primary: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c4b5fd 100%)',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(167, 139, 250, 0.1) 100%)',
      glow: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
    },
    
    animations: {
      entrance: 'matrix' as const,
      idle: 'process' as const,
      interaction: 'compile' as const,
      signature: 'systematic' as const,
    },
    
    iconPrimary: 'code' as IconName,
    iconSecondary: ['settings', 'database', 'cpu'] as IconName[],
    
    keywords: ['code', 'programming', 'logic', 'system', 'algorithm', 'function', 'syntax', 'development'],
  },
  
  nexus: {
    id: 'nexus',
    name: 'Nexus',
    title: 'The Connection & Integration AI Mentor',
    description: 'Bridge-builder between realms, connecting all creative forces',
    domain: 'Integration & Synthesis', 
    personality: 'Connected and wise, seeing the bigger picture and relationships',
    
    colors: {
      primary: '#22c55e',
      secondary: '#4ade80',
      accent: '#86efac',
      background: 'rgba(34, 197, 94, 0.1)', 
      text: '#f0fdf4',
    },
    
    gradients: {
      primary: 'linear-gradient(135deg, #22c55e 0%, #4ade80 50%, #86efac 100%)',
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(74, 222, 128, 0.1) 100%)',
      glow: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
    },
    
    animations: {
      entrance: 'network' as const,
      idle: 'orbit' as const,
      interaction: 'link' as const,
      signature: 'connected' as const,
    },
    
    iconPrimary: 'network' as IconName,
    iconSecondary: ['share', 'globe', 'link'] as IconName[],
    
    keywords: ['connection', 'integration', 'synthesis', 'network', 'collaboration', 'unity', 'bridge', 'harmony'],
  },
} as const;

export type LuminorId = keyof typeof LUMINOR_CHARACTERS;
export type LuminorCharacter = typeof LUMINOR_CHARACTERS[LuminorId];

// ===== LUMINOR CONTEXT ===== //

interface LuminorContextType {
  activeLuminor: LuminorId;
  setActiveLuminor: (luminor: LuminorId) => void;
  character: LuminorCharacter;
  isTransitioning: boolean;
}

const LuminorContext = createContext<LuminorContextType | undefined>(undefined);

export const useLuminor = () => {
  const context = useContext(LuminorContext);
  if (context === undefined) {
    throw new Error('useLuminor must be used within a LuminorProvider');
  }
  return context;
};

// ===== LUMINOR PROVIDER ===== //

interface LuminorProviderProps {
  children: React.ReactNode;
  defaultLuminor?: LuminorId;
  onLuminorChange?: (luminor: LuminorId) => void;
}

export const LuminorProvider: React.FC<LuminorProviderProps> = ({
  children,
  defaultLuminor = 'lumina',
  onLuminorChange,
}) => {
  const [activeLuminor, setActiveLuminorState] = useState<LuminorId>(defaultLuminor);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const setActiveLuminor = (luminor: LuminorId) => {
    if (luminor === activeLuminor) return;
    
    setIsTransitioning(true);
    
    // Add a small delay for transition effect
    setTimeout(() => {
      setActiveLuminorState(luminor);
      onLuminorChange?.(luminor);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
  };

  const character = LUMINOR_CHARACTERS[activeLuminor];

  useEffect(() => {
    // Apply Luminor-specific CSS variables to the root
    const root = document.documentElement;
    
    root.style.setProperty('--luminor-primary', character.colors.primary);
    root.style.setProperty('--luminor-secondary', character.colors.secondary);
    root.style.setProperty('--luminor-accent', character.colors.accent);
    root.style.setProperty('--luminor-background', character.colors.background);
    root.style.setProperty('--luminor-text', character.colors.text);
    root.style.setProperty('--luminor-gradient-primary', character.gradients.primary);
    root.style.setProperty('--luminor-gradient-background', character.gradients.background);
    root.style.setProperty('--luminor-gradient-glow', character.gradients.glow);
  }, [character]);

  return (
    <LuminorContext.Provider
      value={{
        activeLuminor,
        setActiveLuminor,
        character,
        isTransitioning,
      }}
    >
      {children}
    </LuminorContext.Provider>
  );
};

// ===== LUMINOR ANIMATIONS ===== //

const luminorAnimations: Record<string, Variants> = {
  // Harmonix - Rhythmic and musical
  wave: {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100,
      }
    },
  },
  
  rhythmic: {
    animate: {
      scale: [1, 1.02, 1, 1.01, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        times: [0, 0.2, 0.5, 0.8, 1],
      }
    }
  },

  // Lumina - Light and shimmering
  shimmer: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
  },
  
  luminous: {
    animate: {
      boxShadow: [
        '0 0 20px rgba(59, 130, 246, 0.3)',
        '0 0 40px rgba(59, 130, 246, 0.6)', 
        '0 0 20px rgba(59, 130, 246, 0.3)'
      ],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  // Scripta - Typewriter and scholarly
  typewriter: {
    initial: { opacity: 0, width: 0 },
    animate: { 
      opacity: 1, 
      width: "auto",
      transition: {
        duration: 1,
        ease: "linear",
      }
    },
  },
  
  scholarly: {
    animate: {
      opacity: [0.8, 1, 0.8],
      transform: ['scale(1)', 'scale(1.01)', 'scale(1)'],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  // Kinetix - Dynamic and energetic
  zoom: {
    initial: { opacity: 0, scale: 0.5, rotate: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 200,
      }
    },
  },
  
  dynamic: {
    animate: {
      y: [-3, 3, -3],
      rotate: [-0.5, 0.5, -0.5],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  // Syntaxa - Matrix-like and systematic
  matrix: {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1,
      }
    },
  },
  
  systematic: {
    animate: {
      textShadow: [
        '0 0 5px rgba(139, 92, 246, 0.5)',
        '0 0 10px rgba(139, 92, 246, 0.8)',
        '0 0 5px rgba(139, 92, 246, 0.5)'
      ],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  // Nexus - Network connections
  network: {
    initial: { opacity: 0, scale: 0.8, rotate: 45 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
      }
    },
  },
  
  connected: {
    animate: {
      scale: [1, 1.05, 1],
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  // Common animations
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  float: {
    animate: {
      y: [-4, 4, -4],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  breathe: {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  glow: {
    animate: {
      filter: [
        'brightness(1) contrast(1)',
        'brightness(1.1) contrast(1.1)',
        'brightness(1) contrast(1)'
      ],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },
};

// ===== LUMINOR-ADAPTIVE COMPONENTS ===== //

const luminorButtonVariants = cva(
  'transition-all duration-300',
  {
    variants: {
      luminor: {
        harmonix: 'hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] active:shadow-[0_0_30px_rgba(244,63,94,0.6)]',
        lumina: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:shadow-[0_0_30px_rgba(59,130,246,0.6)]',
        scripta: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:shadow-[0_0_30px_rgba(16,185,129,0.6)]',
        kinetix: 'hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] active:shadow-[0_0_30px_rgba(234,179,8,0.6)]',
        syntaxa: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:shadow-[0_0_30px_rgba(139,92,246,0.6)]',
        nexus: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] active:shadow-[0_0_30px_rgba(34,197,94,0.6)]',
      }
    },
    defaultVariants: {
      luminor: 'lumina',
    },
  }
);

interface LuminorButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  loading?: boolean;
}

export const LuminorButton: React.FC<LuminorButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  className,
  ...props
}) => {
  const { activeLuminor, character, isTransitioning } = useLuminor();

  return (
    <motion.div
      variants={luminorAnimations[character.animations.signature]}
      animate={isTransitioning ? 'initial' : 'animate'}
    >
      <GlassButton
        variant={activeLuminor}
        size={size}
        leftIcon={icon}
        loading={loading}
        className={cn(
          luminorButtonVariants({ luminor: activeLuminor }),
          isTransitioning && 'opacity-50',
          className
        )}
        style={{
          '--button-glow': character.gradients.glow,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </GlassButton>
    </motion.div>
  );
};

// ===== LUMINOR CARD COMPONENT ===== //

interface LuminorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const LuminorCard: React.FC<LuminorCardProps> = ({
  children,
  size = 'md',
  glow = false,
  className,
  ...props
}) => {
  const { activeLuminor, character, isTransitioning } = useLuminor();

  return (
    <motion.div
      variants={luminorAnimations[character.animations.entrance]}
      initial="initial"
      animate="animate"
      className={cn('relative', className)}
      style={{
        '--card-gradient': character.gradients.background,
        '--card-glow': character.gradients.glow,
      } as React.CSSProperties}
    >
      <GlassCard
        variant={activeLuminor}
        size={size}
        glow={glow ? 'medium' : 'none'}
        className={cn(
          isTransitioning && 'opacity-50 scale-95',
          'transition-all duration-300'
        )}
        {...props}
      >
        {children}
      </GlassCard>
    </motion.div>
  );
};

// ===== LUMINOR SELECTOR COMPONENT ===== //

interface LuminorSelectorProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LuminorSelector: React.FC<LuminorSelectorProps> = ({
  className,
  orientation = 'horizontal',
  showLabels = true,
  size = 'md',
}) => {
  const { activeLuminor, setActiveLuminor, isTransitioning } = useLuminor();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
  };

  return (
    <div
      className={cn(
        'flex gap-2 p-2 glass-primary rounded-2xl',
        orientation === 'vertical' && 'flex-col',
        className
      )}
    >
      {Object.values(LUMINOR_CHARACTERS).map((character) => (
        <motion.button
          key={character.id}
          onClick={() => setActiveLuminor(character.id)}
          disabled={isTransitioning}
          className={cn(
            'relative flex items-center justify-center rounded-xl transition-all duration-300',
            'border-2 backdrop-blur-sm',
            sizeClasses[size],
            activeLuminor === character.id
              ? 'border-current scale-110 shadow-lg'
              : 'border-transparent hover:border-current/50 hover:scale-105',
            'focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2',
            isTransitioning && 'opacity-50'
          )}
          style={{
            color: character.colors.primary,
            background: activeLuminor === character.id 
              ? character.gradients.background 
              : 'rgba(255, 255, 255, 0.05)',
            boxShadow: activeLuminor === character.id 
              ? `0 0 20px ${character.colors.primary}40`
              : undefined,
          }}
          whileHover={{ scale: activeLuminor === character.id ? 1.1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={false}
          animate={{
            scale: activeLuminor === character.id ? 1.1 : 1,
            transition: { duration: 0.2 }
          }}
        >
          <LuminorIcon
            luminor={character.id}
            size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
            glowing={activeLuminor === character.id}
          />
          
          {showLabels && (
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
              {character.name}
            </span>
          )}
          
          {activeLuminor === character.id && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-current"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{
                boxShadow: `0 0 20px ${character.colors.primary}60, inset 0 0 20px ${character.colors.primary}20`,
              }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

// ===== LUMINOR AVATAR COMPONENT ===== //

interface LuminorAvatarProps {
  luminor?: LuminorId;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animated?: boolean;
  showStatus?: boolean;
  className?: string;
}

export const LuminorAvatar: React.FC<LuminorAvatarProps> = ({
  luminor,
  size = 'md',
  animated = true,
  showStatus = false,
  className,
}) => {
  const { activeLuminor, character: activeCharacter } = useLuminor();
  const character = luminor ? LUMINOR_CHARACTERS[luminor] : activeCharacter;

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24',
  };

  const iconSizes = {
    xs: 'xs' as const,
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
    xl: 'xl' as const,
    '2xl': '2xl' as const,
  };

  return (
    <motion.div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full',
        'border-2 backdrop-blur-sm overflow-hidden',
        sizeClasses[size],
        className
      )}
      style={{
        background: character.gradients.primary,
        borderColor: character.colors.primary,
        boxShadow: `0 0 20px ${character.colors.primary}40`,
      }}
      variants={animated ? luminorAnimations[character.animations.signature] : undefined}
      animate={animated ? 'animate' : undefined}
      whileHover={animated ? { scale: 1.1 } : undefined}
      whileTap={animated ? { scale: 0.95 } : undefined}
    >
      <LuminorIcon
        luminor={character.id}
        size={iconSizes[size]}
        glowing={animated}
        className="text-white"
      />
      
      {showStatus && (
        <div 
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
          style={{ backgroundColor: character.colors.primary }}
        />
      )}
      
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: character.gradients.glow,
          }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      )}
    </motion.div>
  );
};

// ===== LUMINOR TRANSITION WRAPPER ===== //

interface LuminorTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const LuminorTransition: React.FC<LuminorTransitionProps> = ({
  children,
  className,
}) => {
  const { isTransitioning, character } = useLuminor();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={character.id}
        variants={luminorAnimations[character.animations.entrance]}
        initial="initial"
        animate="animate"
        exit="initial"
        className={cn(
          'w-full',
          isTransitioning && 'pointer-events-none',
          className
        )}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ===== EXPORT ALL ===== //

export {
  luminorAnimations,
  luminorButtonVariants,
};