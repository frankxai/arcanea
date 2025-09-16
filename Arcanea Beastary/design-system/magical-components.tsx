/**
 * 🪄 MAGICAL COMPONENT LIBRARY
 * Enchanted UI Components for Arcanean Realms
 * Built with: React, TypeScript, Framer Motion, Lucide Icons
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { 
  Sparkles, Wand2, Shield, Zap, Star, Crown, 
  Gem, Crystal, Flame, Droplets, Wind, Leaf,
  Eye, Heart, Brain, BookOpen, Scroll, Map
} from 'lucide-react';
import { cn } from '../lib/utils';
import { magicalGradients, glassEffects, spellAnimations } from './magical-design-system';

// ✨ MAGICAL BUTTON SYSTEM
interface SpellButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'mystical' | 'ethereal' | 'shadow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  enchantment?: 'glow' | 'shimmer' | 'float' | 'sparkle';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const SpellButton: React.FC<SpellButtonProps> = ({
  variant = 'primary',
  size = 'md',
  enchantment,
  icon,
  iconPosition = 'left',
  isLoading = false,
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-gradient-to-r from-crystal to-aurora text-white shadow-enchanted hover:shadow-mystical',
    secondary: 'bg-white/10 text-slate-200 border border-white/20 hover:bg-white/15',
    mystical: 'bg-gradient-to-r from-aurora to-ethereal text-white shadow-mystical',
    ethereal: 'bg-gradient-to-r from-ethereal to-radiant text-white shadow-ethereal',
    shadow: 'bg-gradient-to-r from-midnight to-deep text-slate-300 shadow-dramatic',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-xl', 
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl',
  };

  const enchantmentAnimation = enchantment ? spellAnimations[enchantment] : {};

  return (
    <motion.button
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-all duration-300',
        'backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed',
        'hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-crystal/25',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      whileHover={spellAnimations.hover}
      whileTap={spellAnimations.tap}
      animate={enchantmentAnimation.animate}
      transition={enchantmentAnimation.transition}
      {...props}
    >
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Sparkles className="w-5 h-5 animate-spin" />
        </motion.div>
      )}
      
      <span className={cn('flex items-center gap-2', isLoading && 'opacity-0')}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>
    </motion.button>
  );
};

// 🔮 MYSTICAL CARD SYSTEM
interface MysticCardProps extends HTMLMotionProps<"div"> {
  realm?: 'shadow' | 'crystal' | 'fire' | 'nature' | 'arcane';
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  enchantment?: 'glow' | 'float' | 'shimmer';
  children: React.ReactNode;
}

export const MysticCard: React.FC<MysticCardProps> = ({
  realm = 'shadow',
  rarity = 'common',
  enchantment,
  children,
  className,
  ...props
}) => {
  const realmStyles = {
    shadow: 'border-l-4 border-l-slate-500 bg-gradient-to-br from-slate-900/50 to-slate-800/30',
    crystal: 'border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-900/50 to-purple-800/30',
    fire: 'border-l-4 border-l-red-500 bg-gradient-to-br from-red-900/50 to-orange-800/30',
    nature: 'border-l-4 border-l-green-500 bg-gradient-to-br from-green-900/50 to-emerald-800/30',
    arcane: 'border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-900/50 to-indigo-800/30',
  };

  const rarityGlows = {
    common: '',
    uncommon: 'shadow-lg shadow-green-500/20',
    rare: 'shadow-lg shadow-blue-500/25', 
    epic: 'shadow-xl shadow-purple-500/30',
    legendary: 'shadow-xl shadow-yellow-500/35',
    mythic: 'shadow-2xl shadow-pink-500/40 animate-pulse',
  };

  const enchantmentAnimation = enchantment ? spellAnimations[enchantment] : {};

  return (
    <motion.div
      className={cn(
        'rounded-xl p-6 backdrop-blur-md transition-all duration-500',
        'border border-white/10 hover:border-white/20 cursor-pointer group',
        realmStyles[realm],
        rarityGlows[rarity],
        className
      )}
      style={glassEffects.primary}
      whileHover={{
        ...spellAnimations.hover,
        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)'
      }}
      animate={enchantmentAnimation.animate}
      transition={enchantmentAnimation.transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 🌟 ELEMENTAL ICON SYSTEM
interface ElementalIconProps {
  element: 'fire' | 'water' | 'air' | 'earth' | 'light' | 'shadow' | 'arcane' | 'nature';
  size?: number;
  className?: string;
  animated?: boolean;
}

export const ElementalIcon: React.FC<ElementalIconProps> = ({
  element,
  size = 24,
  className,
  animated = false
}) => {
  const iconMap = {
    fire: Flame,
    water: Droplets,
    air: Wind,
    earth: Gem,
    light: Star,
    shadow: Eye,
    arcane: Sparkles,
    nature: Leaf,
  };

  const colorMap = {
    fire: 'text-red-400',
    water: 'text-blue-400', 
    air: 'text-cyan-400',
    earth: 'text-amber-400',
    light: 'text-yellow-400',
    shadow: 'text-slate-400',
    arcane: 'text-purple-400',
    nature: 'text-green-400',
  };

  const Icon = iconMap[element];

  return (
    <motion.div
      className={cn(colorMap[element], className)}
      animate={animated ? spellAnimations.float.animate : {}}
      transition={animated ? spellAnimations.float.transition : {}}
    >
      <Icon size={size} />
    </motion.div>
  );
};

// 🏆 RARITY BADGE SYSTEM  
interface RarityBadgeProps {
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export const RarityBadge: React.FC<RarityBadgeProps> = ({
  rarity,
  size = 'md',
  animated = false,
  className
}) => {
  const rarityStyles = {
    common: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    uncommon: 'bg-green-500/20 text-green-300 border-green-500/30',
    rare: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    epic: 'bg-purple-500/20 text-purple-300 border-purple-500/30', 
    legendary: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    mythic: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const rarityIcons = {
    common: null,
    uncommon: <Shield className="w-3 h-3" />,
    rare: <Gem className="w-3 h-3" />,
    epic: <Crown className="w-3 h-3" />,
    legendary: <Star className="w-3 h-3" />,
    mythic: <Sparkles className="w-3 h-3" />,
  };

  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium uppercase tracking-wider',
        'backdrop-blur-sm',
        rarityStyles[rarity],
        sizeStyles[size],
        className
      )}
      animate={animated ? spellAnimations.shimmer.animate : {}}
      transition={animated ? spellAnimations.shimmer.transition : {}}
    >
      {rarityIcons[rarity]}
      {rarity}
    </motion.div>
  );
};

// 🔍 ENCHANTED SEARCH INPUT
interface EnchantedSearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  realm?: 'shadow' | 'crystal' | 'fire' | 'nature' | 'arcane';
  isScrying?: boolean;
  onScrygingComplete?: (query: string) => void;
}

export const EnchantedSearch: React.FC<EnchantedSearchProps> = ({
  size = 'md',
  realm = 'shadow',
  isScrying = false,
  onScrygingComplete,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const realmStyles = {
    shadow: 'focus:ring-slate-500/25 focus:border-slate-500/50',
    crystal: 'focus:ring-blue-500/25 focus:border-blue-500/50',
    fire: 'focus:ring-red-500/25 focus:border-red-500/50', 
    nature: 'focus:ring-green-500/25 focus:border-green-500/50',
    arcane: 'focus:ring-purple-500/25 focus:border-purple-500/50',
  };

  return (
    <div className="relative">
      <motion.input
        className={cn(
          'w-full rounded-xl border border-white/20 backdrop-blur-md transition-all duration-300',
          'text-white placeholder:text-slate-400 bg-white/5',
          'focus:outline-none focus:ring-4 focus:bg-white/10',
          sizeStyles[size],
          realmStyles[realm],
          className
        )}
        initial={spellAnimations.materialize.initial}
        animate={spellAnimations.materialize.animate}
        transition={spellAnimations.materialize.transition}
        {...props}
      />
      
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {isScrying ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </motion.div>
        ) : (
          <Wand2 className="w-5 h-5 text-slate-400" />
        )}
      </div>
    </div>
  );
};

// 📊 MAGICAL PROGRESS INDICATOR
interface SpellProgressProps {
  progress: number;
  variant?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  spell?: 'fire' | 'water' | 'earth' | 'air' | 'arcane';
  animated?: boolean;
  className?: string;
}

export const SpellProgress: React.FC<SpellProgressProps> = ({
  progress,
  variant = 'linear',
  size = 'md',
  spell = 'arcane', 
  animated = true,
  className
}) => {
  const spellColors = {
    fire: 'from-red-500 to-orange-500',
    water: 'from-blue-500 to-cyan-500',
    earth: 'from-amber-500 to-yellow-500', 
    air: 'from-cyan-400 to-sky-500',
    arcane: 'from-purple-500 to-pink-500',
  };

  const sizeStyles = {
    sm: variant === 'linear' ? 'h-2' : 'w-8 h-8',
    md: variant === 'linear' ? 'h-3' : 'w-12 h-12',
    lg: variant === 'linear' ? 'h-4' : 'w-16 h-16',
  };

  if (variant === 'circular') {
    const circumference = 2 * Math.PI * 16;
    const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

    return (
      <div className={cn('relative inline-flex items-center justify-center', sizeStyles[size], className)}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="16"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-white/10"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="16"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray }}
            transition={{ duration: animated ? 1 : 0, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={`stop-color-${spell}-500`} />
              <stop offset="100%" className={`stop-color-${spell}-400`} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-xs font-semibold text-white">
          {progress}%
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full bg-white/10 rounded-full overflow-hidden', sizeStyles[size], className)}>
      <motion.div
        className={cn('h-full bg-gradient-to-r rounded-full', spellColors[spell])}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: animated ? 1 : 0, ease: 'easeOut' }}
      />
    </div>
  );
};

// 🌟 MAGICAL TOOLTIP SYSTEM
interface MagicalTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'info' | 'warning' | 'success' | 'error' | 'mystical';
  delay?: number;
}

export const MagicalTooltip: React.FC<MagicalTooltipProps> = ({
  content,
  children,
  position = 'top',
  variant = 'info',
  delay = 500
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const variantStyles = {
    info: 'bg-slate-800 text-slate-200 border-slate-600',
    warning: 'bg-amber-800 text-amber-200 border-amber-600', 
    success: 'bg-green-800 text-green-200 border-green-600',
    error: 'bg-red-800 text-red-200 border-red-600',
    mystical: 'bg-purple-800 text-purple-200 border-purple-600',
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setTimeout(() => setIsVisible(true), delay)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <motion.div
          className={cn(
            'absolute z-50 px-3 py-2 text-sm rounded-lg border backdrop-blur-md',
            'pointer-events-none whitespace-nowrap',
            variantStyles[variant],
            positionStyles[position]
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

// 🎭 AVATAR SYSTEM
interface MagicalAvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  realm?: 'shadow' | 'crystal' | 'fire' | 'nature' | 'arcane';
  status?: 'online' | 'offline' | 'away' | 'busy';
  enchanted?: boolean;
  className?: string;
}

export const MagicalAvatar: React.FC<MagicalAvatarProps> = ({
  src,
  name,
  size = 'md',
  realm = 'shadow',
  status,
  enchanted = false,
  className
}) => {
  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const realmStyles = {
    shadow: 'ring-slate-500/50 bg-slate-600',
    crystal: 'ring-blue-500/50 bg-blue-600',
    fire: 'ring-red-500/50 bg-red-600',
    nature: 'ring-green-500/50 bg-green-600',
    arcane: 'ring-purple-500/50 bg-purple-600',
  };

  const statusStyles = {
    online: 'bg-green-500',
    offline: 'bg-slate-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className={cn('relative inline-block', className)}>
      <motion.div
        className={cn(
          'rounded-full ring-2 flex items-center justify-center overflow-hidden',
          'text-white font-semibold',
          sizeStyles[size],
          realmStyles[realm]
        )}
        animate={enchanted ? spellAnimations.glow.animate : {}}
        transition={enchanted ? spellAnimations.glow.transition : {}}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </motion.div>
      
      {status && (
        <div className={cn(
          'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white',
          statusStyles[status]
        )} />
      )}
    </div>
  );
};

export {
  SpellButton,
  MysticCard, 
  ElementalIcon,
  RarityBadge,
  EnchantedSearch,
  SpellProgress,
  MagicalTooltip,
  MagicalAvatar,
};