'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { type Academy, getAcademyTheme } from '@/lib/theme-utils';
import { AcademyBadge } from '@/components/ui/academy-badge';
import { BondIndicator } from '@/components/ui/bond-indicator';
import { CosmicCard, CosmicCardHeader } from '@/components/ui/cosmic-card';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ChatHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  luminorName: string;
  academy: Academy;
  bondLevel?: number;
  onMenuClick?: () => void;
  showBond?: boolean;
}

const ChatHeader = React.forwardRef<HTMLDivElement, ChatHeaderProps>(
  (
    {
      className,
      luminorName,
      academy,
      bondLevel,
      onMenuClick,
      showBond = true,
      ...props
    },
    ref
  ) => {
    const theme = getAcademyTheme(academy);

    return (
      <div
        ref={ref}
        className={cn(
          'glass border-b border-cosmic-border px-4 py-3',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          {/* Left: Luminor info */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-text-primary">
                {luminorName}
              </h2>
              <AcademyBadge academy={academy} size="sm" />
            </div>
          </div>

          {/* Right: Bond level and menu */}
          <div className="flex items-center gap-3">
            {showBond && bondLevel !== undefined && (
              <div className="hidden md:block">
                <BondIndicator
                  level={bondLevel}
                  variant="compact"
                  showLabel={false}
                />
              </div>
            )}

            {onMenuClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="h-8 w-8"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile bond indicator */}
        {showBond && bondLevel !== undefined && (
          <div className="mt-2 md:hidden">
            <BondIndicator level={bondLevel} variant="compact" />
          </div>
        )}
      </div>
    );
  }
);

ChatHeader.displayName = 'ChatHeader';

export { ChatHeader };
