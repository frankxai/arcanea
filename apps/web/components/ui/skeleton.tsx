import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Shimmer CSS is defined in globals.css as:
//     .shimmer { background: linear-gradient(90deg, ...) }
//     We replicate it inline with Tailwind animate-shimmer

const skeletonVariants = cva(
  [
    'relative overflow-hidden',
    'bg-cosmic-raised',
    'before:absolute before:inset-0',
    'before:bg-gradient-to-r',
    'before:from-transparent before:via-[rgba(127,255,212,0.06)] before:to-transparent',
    'before:translate-x-[-100%]',
    'before:animate-[shimmer_1.8s_ease-in-out_infinite]',
  ],
  {
    variants: {
      variant: {
        text: 'h-4 rounded-md w-full',
        circle: 'rounded-full',
        rect: 'rounded-lg',
        card: 'rounded-xl p-0',
      },
    },
    defaultVariants: {
      variant: 'rect',
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(skeletonVariants({ variant }), className)}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// ─── Preset Skeleton compositions ────────────────────────────────────────────

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[rgba(127,255,212,0.08)] overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      {/* Image area */}
      <Skeleton variant="rect" className="w-full aspect-video rounded-none" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <Skeleton variant="text" className="w-2/3 h-5" />
        <Skeleton variant="text" className="w-full h-3.5" />
        <Skeleton variant="text" className="w-4/5 h-3.5" />

        <div className="flex items-center gap-2 pt-1">
          <Skeleton variant="circle" className="w-7 h-7" />
          <Skeleton variant="text" className="w-24 h-3" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonAvatar({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <Skeleton
      variant="circle"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    />
  );
}

export { Skeleton, skeletonVariants };
