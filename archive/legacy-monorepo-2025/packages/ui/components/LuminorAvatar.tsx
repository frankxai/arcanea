import React from 'react'
import { cn } from '../lib/utils'
import { motion } from 'framer-motion'

interface LuminorAvatarProps {
  name: string
  color: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  className?: string
}

const sizeMap: Record<NonNullable<LuminorAvatarProps['size']>, string> = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
}

export function LuminorAvatar({
  name,
  color,
  size = 'md',
  animated = true,
  className,
}: LuminorAvatarProps) {
  const initial = name.charAt(0).toUpperCase()

  const avatarVariants = {
    idle: {
      boxShadow: `0 0 20px ${color}20`,
      scale: 1,
    },
    hover: {
      boxShadow: `0 0 30px ${color}40`,
      scale: 1.05,
    },
  }

  const letterVariants = {
    idle: {
      textShadow: `0 0 10px ${color}`,
    },
    hover: {
      textShadow: `0 0 15px ${color}`,
    },
  }

  const Component = animated ? motion.div : 'div'
  const TextComponent = animated ? motion.span : 'span'

  return (
    <Component
      className={cn(
        'relative rounded-full flex items-center justify-center',
        'bg-gradient-to-br from-arcanean-void to-arcanean-deep',
        'border-2 border-opacity-30',
        sizeMap[size],
        className,
      )}
      style={{
        borderColor: color,
        background: `radial-gradient(circle, ${color}10 0%, ${color}05 50%, transparent 100%)`,
      }}
      variants={animated ? avatarVariants : undefined}
      initial={animated ? 'idle' : undefined}
      whileHover={animated ? 'hover' : undefined}
      transition={animated ? { duration: 0.3 } : undefined}
    >
      {/* Cosmic particles effect */}
      {animated && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-60"
              style={{
                backgroundColor: color,
                left: `${20 + i * 20}%`,
                top: `${30 + i * 15}%`,
              }}
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Luminor initial */}
      <TextComponent
        className={cn(
          'font-bold text-white relative z-10',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-lg',
          size === 'xl' && 'text-2xl',
        )}
        variants={animated ? letterVariants : undefined}
        style={{ color }}
      >
        {initial}
      </TextComponent>

      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-opacity-20"
        style={{ borderColor: color }}
        animate={
          animated
            ? {
                rotate: 360,
                opacity: [0.6, 1, 0.6],
              }
            : undefined
        }
        transition={
          animated
            ? {
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
              }
            : undefined
        }
      />
    </Component>
  )
}
