"use client";

/**
 * 🎨 Arcanea Icon System - Comprehensive Lucide Integration
 * 
 * This module provides a complete icon system for the Arcanea platform,
 * featuring Luminor-specific icons, magical effects, and accessibility support.
 */

import React from 'react';
import { 
  // Magical & Mystical Icons
  Sparkles, Wand2, Shield, Zap, Star, Crown, Gem, Crystal,
  
  // Elemental Icons
  Flame, Droplets, Wind, Leaf, Mountain, Sun, Moon, 
  
  // Consciousness & Mind
  Eye, Heart, Brain, Lightbulb, Target, Focus,
  
  // Content Creation
  BookOpen, Scroll, Map, Music, Palette, Video, Code, 
  Network, Mic, Camera, Edit3, PenTool, Brush,
  
  // Media Controls
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  FastForward, Rewind, RotateCcw, RotateCw,
  
  // Actions & Operations
  Save, Download, Upload, Share2, Settings, User, Bell,
  Copy, Cut, Paste, Undo2, Redo2, Trash2, Archive,
  
  // Navigation & UI
  Search, Filter, Sort, Grid, List, Plus, Minus, X, 
  Check, ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ExternalLink,
  Menu, MoreHorizontal, MoreVertical, Home, Folder,
  
  // Status & Feedback
  Info, AlertCircle, CheckCircle, XCircle, HelpCircle,
  AlertTriangle, Clock, Calendar, MapPin, Globe,
  
  // Communication
  MessageCircle, MessageSquare, Mail, Phone, Send,
  
  // File & Data
  File, FileText, Image, FileAudio, FileVideo, Database,
  FolderOpen, FolderPlus, FileCheck, FileX,
  
  // Device & System
  Monitor, Smartphone, Tablet, Laptop, Headphones,
  Keyboard, Mouse, Printer, Wifi, Bluetooth,
  
  // Business & Finance
  DollarSign, CreditCard, ShoppingCart, TrendingUp,
  TrendingDown, PieChart, BarChart, Calculator,
  
  // Social & Community
  Users, UserPlus, UserMinus, MessageCircle as Chat,
  ThumbsUp, ThumbsDown, Award, Medal,
  
  // Weather & Nature
  Cloud, CloudRain, CloudSnow, Rainbow, Sunrise, Sunset,
  
  // Transportation
  Car, Plane, Train, Ship, Bike, Truck,
  
  // Gaming & Entertainment
  Gamepad2, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6,
  
  type LucideIcon,
} from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Comprehensive icon registry
export const arcaneaIcons = {
  // === MAGICAL & MYSTICAL ===
  magic: Sparkles,
  wand: Wand2,
  shield: Shield,
  lightning: Zap,
  star: Star,
  crown: Crown,
  gem: Gem,
  crystal: Crystal,
  
  // === ELEMENTAL FORCES ===
  fire: Flame,
  water: Droplets,
  air: Wind,
  earth: Leaf,
  mountain: Mountain,
  light: Sun,
  shadow: Moon,
  
  // === CONSCIOUSNESS & MIND ===
  eye: Eye,
  heart: Heart,
  brain: Brain,
  idea: Lightbulb,
  focus: Target,
  concentration: Focus,
  
  // === CONTENT CREATION ===
  book: BookOpen,
  scroll: Scroll,
  map: Map,
  music: Music,
  palette: Palette,
  video: Video,
  code: Code,
  network: Network,
  microphone: Mic,
  camera: Camera,
  edit: Edit3,
  pen: PenTool,
  brush: Brush,
  
  // === MEDIA CONTROLS ===
  play: Play,
  pause: Pause,
  next: SkipForward,
  previous: SkipBack,
  volume: Volume2,
  mute: VolumeX,
  forward: FastForward,
  rewind: Rewind,
  undo: RotateCcw,
  redo: RotateCw,
  
  // === ACTIONS & OPERATIONS ===
  save: Save,
  download: Download,
  upload: Upload,
  share: Share2,
  settings: Settings,
  user: User,
  notification: Bell,
  copy: Copy,
  cut: Cut,
  paste: Paste,
  undoAction: Undo2,
  redoAction: Redo2,
  delete: Trash2,
  archive: Archive,
  
  // === NAVIGATION & UI ===
  search: Search,
  filter: Filter,
  sort: Sort,
  grid: Grid,
  list: List,
  add: Plus,
  remove: Minus,
  close: X,
  check: Check,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  externalLink: ExternalLink,
  menu: Menu,
  moreHorizontal: MoreHorizontal,
  moreVertical: MoreVertical,
  home: Home,
  folder: Folder,
  
  // === STATUS & FEEDBACK ===
  info: Info,
  warning: AlertCircle,
  success: CheckCircle,
  error: XCircle,
  help: HelpCircle,
  alert: AlertTriangle,
  clock: Clock,
  calendar: Calendar,
  location: MapPin,
  globe: Globe,
  
  // === COMMUNICATION ===
  chat: MessageCircle,
  message: MessageSquare,
  mail: Mail,
  phone: Phone,
  send: Send,
  
  // === FILE & DATA ===
  file: File,
  document: FileText,
  image: Image,
  audio: FileAudio,
  videoFile: FileVideo,
  database: Database,
  folderOpen: FolderOpen,
  folderAdd: FolderPlus,
  fileCheck: FileCheck,
  fileError: FileX,
  
  // === DEVICE & SYSTEM ===
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  headphones: Headphones,
  keyboard: Keyboard,
  mouse: Mouse,
  printer: Printer,
  wifi: Wifi,
  bluetooth: Bluetooth,
  
  // === BUSINESS & FINANCE ===
  currency: DollarSign,
  payment: CreditCard,
  cart: ShoppingCart,
  trending: TrendingUp,
  declining: TrendingDown,
  pie: PieChart,
  bar: BarChart,
  calculator: Calculator,
  
  // === SOCIAL & COMMUNITY ===
  users: Users,
  userAdd: UserPlus,
  userRemove: UserMinus,
  chatBubble: Chat,
  like: ThumbsUp,
  dislike: ThumbsDown,
  award: Award,
  medal: Medal,
  
  // === WEATHER & NATURE ===
  cloud: Cloud,
  rain: CloudRain,
  snow: CloudSnow,
  rainbow: Rainbow,
  sunrise: Sunrise,
  sunset: Sunset,
  
  // === TRANSPORTATION ===
  car: Car,
  plane: Plane,
  train: Train,
  ship: Ship,
  bicycle: Bike,
  truck: Truck,
  
  // === GAMING & ENTERTAINMENT ===
  gamepad: Gamepad2,
  dice: Dice1,
  dice1: Dice1,
  dice2: Dice2,
  dice3: Dice3,
  dice4: Dice4,
  dice5: Dice5,
  dice6: Dice6,
} as const;

// Luminor-specific icon mappings
export const luminorIcons = {
  harmonix: arcaneaIcons.music,
  lumina: arcaneaIcons.palette,
  scripta: arcaneaIcons.book,
  kinetix: arcaneaIcons.video,
  syntaxa: arcaneaIcons.code,
  nexus: arcaneaIcons.network,
} as const;

// Icon variants using CVA
const iconVariants = cva(
  'inline-flex items-center justify-center shrink-0 transition-all duration-200',
  {
    variants: {
      size: {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
        '2xl': 'w-10 h-10',
        '3xl': 'w-12 h-12',
      },
      
      variant: {
        default: 'text-current',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        error: 'text-red-500',
        info: 'text-blue-500',
        mystic: 'text-mystic-500',
      },
      
      luminor: {
        harmonix: 'text-harmonix-500 hover:text-harmonix-600',
        lumina: 'text-lumina-500 hover:text-lumina-600',
        scripta: 'text-scripta-500 hover:text-scripta-600',
        kinetix: 'text-kinetix-500 hover:text-kinetix-600',
        syntaxa: 'text-syntaxa-500 hover:text-syntaxa-600',
        nexus: 'text-nexus-500 hover:text-nexus-600',
      },
      
      effect: {
        none: '',
        glow: 'drop-shadow-sm hover:drop-shadow-lg transition-all duration-300',
        shimmer: 'hover:animate-pulse',
        float: 'animate-float',
        spin: 'animate-spin-slow',
        bounce: 'animate-bounce-gentle',
      },
      
      interactive: {
        true: 'cursor-pointer hover:scale-110 active:scale-95',
        false: '',
      }
    },
    
    defaultVariants: {
      size: 'md',
      variant: 'default',
      effect: 'none',
      interactive: false,
    },
  }
);

// Main Icon component interface
interface IconProps extends VariantProps<typeof iconVariants> {
  name: keyof typeof arcaneaIcons;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
  title?: string;
}

// Primary Icon component
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(({
  name,
  size,
  variant,
  luminor,
  effect,
  interactive = false,
  className,
  onClick,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = !ariaLabel && !onClick,
  title,
  ...props
}, ref) => {
  const IconComponent = arcaneaIcons[name] as LucideIcon;
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in arcaneaIcons registry`);
    return null;
  }
  
  const isInteractive = interactive || onClick;
  
  return (
    <IconComponent
      ref={ref}
      className={cn(
        iconVariants({ 
          size, 
          variant, 
          luminor, 
          effect, 
          interactive: isInteractive 
        }),
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      title={title}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      {...props}
    />
  );
});

Icon.displayName = 'Icon';

// Specialized Luminor Icon component
interface LuminorIconProps extends Omit<IconProps, 'name'> {
  luminor: keyof typeof luminorIcons;
  glowing?: boolean;
}

export const LuminorIcon = React.forwardRef<SVGSVGElement, LuminorIconProps>(({
  luminor,
  glowing = false,
  className,
  ...props
}, ref) => {
  return (
    <Icon
      ref={ref}
      name={luminorIcons[luminor] === arcaneaIcons.music ? 'music' :
            luminorIcons[luminor] === arcaneaIcons.palette ? 'palette' :
            luminorIcons[luminor] === arcaneaIcons.book ? 'book' :
            luminorIcons[luminor] === arcaneaIcons.video ? 'video' :
            luminorIcons[luminor] === arcaneaIcons.code ? 'code' :
            'network'}
      luminor={luminor}
      effect={glowing ? 'glow' : 'none'}
      className={cn(
        glowing && [
          'filter drop-shadow-lg',
          luminor === 'harmonix' && 'drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]',
          luminor === 'lumina' && 'drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]',
          luminor === 'scripta' && 'drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]',
          luminor === 'kinetix' && 'drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]',
          luminor === 'syntaxa' && 'drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]',
          luminor === 'nexus' && 'drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]',
        ],
        className
      )}
      {...props}
    />
  );
});

LuminorIcon.displayName = 'LuminorIcon';

// Icon with Badge component
interface IconWithBadgeProps extends IconProps {
  badgeCount?: number;
  showBadge?: boolean;
  badgeColor?: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
}

export const IconWithBadge: React.FC<IconWithBadgeProps> = ({
  badgeCount = 0,
  showBadge = false,
  badgeColor = 'red',
  className,
  ...iconProps
}) => {
  const badgeColorClasses = {
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-500 text-black',
    purple: 'bg-purple-500 text-white',
  };
  
  return (
    <div className={cn('relative inline-flex', className)}>
      <Icon {...iconProps} />
      {(showBadge || badgeCount > 0) && (
        <span 
          className={cn(
            'absolute -top-1 -right-1 flex items-center justify-center',
            'min-w-5 h-5 text-xs font-semibold rounded-full',
            'border-2 border-background',
            badgeColorClasses[badgeColor]
          )}
          aria-label={`${badgeCount} notifications`}
        >
          {badgeCount > 99 ? '99+' : badgeCount || ''}
        </span>
      )}
    </div>
  );
};

// Animated Icon Stack component for loading states
interface IconStackProps {
  icons: (keyof typeof arcaneaIcons)[];
  className?: string;
  size?: IconProps['size'];
  staggerDelay?: number;
}

export const IconStack: React.FC<IconStackProps> = ({
  icons,
  className,
  size = 'md',
  staggerDelay = 200,
}) => {
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      {icons.map((iconName, index) => (
        <Icon
          key={iconName}
          name={iconName}
          size={size}
          className={cn(
            'absolute',
            'animate-fade-in opacity-0',
            // Stagger animation delays
            index === 0 && 'animation-delay-0',
            index === 1 && 'animation-delay-200',
            index === 2 && 'animation-delay-400',
            index === 3 && 'animation-delay-600',
          )}
          style={{
            animationDelay: `${index * staggerDelay}ms`,
            animationFillMode: 'forwards',
          }}
        />
      ))}
    </div>
  );
};

// Icon Button component
interface IconButtonProps extends Omit<IconProps, 'interactive'> {
  variant?: 'default' | 'ghost' | 'outline' | 'glass';
  rounded?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
  name,
  size = 'md',
  variant = 'default',
  rounded = true,
  loading = false,
  disabled = false,
  className,
  onClick,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center shrink-0',
    'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    rounded ? 'rounded-full' : 'rounded-lg',
    // Size-based padding
    size === 'xs' && 'p-1',
    size === 'sm' && 'p-1.5',
    size === 'md' && 'p-2',
    size === 'lg' && 'p-2.5',
    size === 'xl' && 'p-3',
  );
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50',
    ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-accent/50',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-accent/50',
    glass: 'glass-primary hover:bg-white/15 focus:ring-mystic-500/50',
  };
  
  return (
    <button
      ref={ref}
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        <Icon name="magic" size={size} effect="spin" />
      ) : (
        <Icon name={name} size={size} />
      )}
    </button>
  );
});

IconButton.displayName = 'IconButton';

// Utility function to get all available icons
export const getAvailableIcons = (): Array<keyof typeof arcaneaIcons> => {
  return Object.keys(arcaneaIcons) as Array<keyof typeof arcaneaIcons>;
};

// Utility function to check if an icon exists
export const iconExists = (name: string): name is keyof typeof arcaneaIcons => {
  return name in arcaneaIcons;
};

// Export types for TypeScript users
export type IconName = keyof typeof arcaneaIcons;
export type LuminorName = keyof typeof luminorIcons;
export type { IconProps, LuminorIconProps, IconWithBadgeProps, IconStackProps, IconButtonProps };

// Export the main components and utilities
export {
  iconVariants,
  arcaneaIcons,
  luminorIcons,
};