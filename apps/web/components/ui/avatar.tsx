'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Variants ────────────────────────────────────────────────────────────────

const avatarSizes = {
  xs: { container: 'w-6 h-6', text: 'text-[0.5rem]', status: 'w-1.5 h-1.5 border' },
  sm: { container: 'w-8 h-8', text: 'text-xs', status: 'w-2 h-2 border' },
  md: { container: 'w-10 h-10', text: 'text-sm', status: 'w-2.5 h-2.5 border' },
  lg: { container: 'w-14 h-14', text: 'text-lg', status: 'w-3 h-3 border-[1.5px]' },
  xl: { container: 'w-20 h-20', text: 'text-2xl', status: 'w-3.5 h-3.5 border-2' },
} as const;

type AvatarSize = keyof typeof avatarSizes;

const statusColors = {
  online: 'bg-[#20cc73] shadow-[0_0_6px_rgba(32,204,115,0.6)]',
  offline: 'bg-text-muted',
  away: 'bg-[#ffa500] shadow-[0_0_6px_rgba(255,165,0,0.5)]',
  busy: 'bg-error shadow-[0_0_6px_rgba(245,41,82,0.5)]',
} as const;

type StatusType = keyof typeof statusColors;

const elementRings = {
  crystal: 'ring-2 ring-crystal/60 shadow-[0_0_10px_rgba(127,255,212,0.3)]',
  fire: 'ring-2 ring-fire/60 shadow-[0_0_10px_rgba(255,107,53,0.3)]',
  water: 'ring-2 ring-water/60 shadow-[0_0_10px_rgba(120,166,255,0.3)]',
  void: 'ring-2 ring-[#9966ff]/60 shadow-[0_0_10px_rgba(153,102,255,0.3)]',
  earth: 'ring-2 ring-earth/60 shadow-[0_0_10px_rgba(74,124,89,0.3)]',
  wind: 'ring-2 ring-wind/60 shadow-[0_0_10px_rgba(200,214,229,0.3)]',
  gold: 'ring-2 ring-brand-gold/60 shadow-[0_0_10px_rgba(255,215,0,0.3)]',
  brand: 'ring-2 ring-brand-primary/60 shadow-[0_0_10px_rgba(139,92,246,0.3)]',
} as const;

type ElementRing = keyof typeof elementRings;

// ─── Helper ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

// ─── Component ───────────────────────────────────────────────────────────────

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: StatusType;
  ring?: ElementRing;
  className?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name = '',
      size = 'md',
      status,
      ring,
      className,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const { container, text, status: statusSize } = avatarSizes[size];
    const initials = getInitials(name);
    const showImage = src && !imgError;

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex shrink-0', className)}
        {...props}
      >
        <div
          className={cn(
            'rounded-full overflow-hidden flex items-center justify-center',
            'bg-cosmic-surface border border-[rgba(127,255,212,0.12)]',
            'font-sans font-semibold text-text-secondary',
            'transition-all duration-200',
            container,
            text,
            ring && elementRings[ring]
          )}
          aria-label={alt ?? name ?? 'Avatar'}
        >
          {showImage ? (
            <img
              src={src}
              alt={alt ?? name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <span aria-hidden={!initials || undefined} className="select-none">
              {initials || (
                // Generic person icon fallback using SVG
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-1/2 h-1/2 text-text-muted"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </span>
          )}
        </div>

        {/* Status dot */}
        {status && (
          <span
            aria-label={`Status: ${status}`}
            className={cn(
              'absolute bottom-0 right-0 rounded-full',
              'border-cosmic-void',
              statusSize,
              statusColors[status]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// ─── Avatar Group ─────────────────────────────────────────────────────────────

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: Pick<AvatarProps, 'src' | 'name' | 'alt'>[];
  size?: AvatarSize;
  max?: number;
  ring?: ElementRing;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, size = 'md', max = 4, ring, className, ...props }, ref) => {
    const visible = avatars.slice(0, max);
    const overflow = avatars.length - max;
    const { container, text } = avatarSizes[size];

    return (
      <div
        ref={ref}
        className={cn('flex items-center', className)}
        aria-label={`${avatars.length} avatars`}
        {...props}
      >
        {visible.map((a, i) => (
          <div
            key={i}
            className="-ml-2 first:ml-0"
            style={{ zIndex: visible.length - i }}
          >
            <Avatar
              src={a.src}
              name={a.name}
              alt={a.alt}
              size={size}
              ring={ring}
              className="border-2 border-cosmic-void"
            />
          </div>
        ))}

        {overflow > 0 && (
          <div
            className={cn(
              '-ml-2 rounded-full flex items-center justify-center',
              'bg-cosmic-raised border-2 border-cosmic-void',
              'text-text-muted font-sans font-semibold select-none',
              container,
              text
            )}
            aria-label={`${overflow} more`}
          >
            +{overflow}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarGroup };
