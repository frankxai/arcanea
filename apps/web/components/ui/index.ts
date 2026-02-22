/**
 * Arcanean UI Components
 * Central export file for all UI components
 *
 * Design System: Cosmic Glass — rgba(18,24,38,0.65) + blur(16px) + crystal borders
 * Brand: #8b5cf6 violet | #7fffd4 crystal | #ffd700 gold
 */

// ─── Base Form Components ─────────────────────────────────────────────────────

export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';

export { Input, inputVariants } from './input';
export type { InputProps } from './input';

export { Textarea, textareaVariants } from './textarea';
export type { TextareaProps } from './textarea';

// ─── Data Display ─────────────────────────────────────────────────────────────

export { Badge, badgeVariants } from './badge';
export type { BadgeProps } from './badge';

export { Avatar, AvatarGroup } from './avatar';
export type { AvatarProps, AvatarGroupProps } from './avatar';

export { Progress, progressTrackVariants, progressFillVariants } from './progress';
export type { ProgressProps } from './progress';

// ─── Layout & Structure ───────────────────────────────────────────────────────

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  cardVariants,
} from './card';
export type { CardProps } from './card';

export { Divider, dividerVariants } from './divider';
export type { DividerProps } from './divider';

// ─── Navigation ───────────────────────────────────────────────────────────────

export { Tabs, TabPanel } from './tabs';
export type { TabsProps, TabPanelProps, Tab } from './tabs';

export { Dropdown } from './dropdown';
export type { DropdownProps, DropdownItem, DropdownSection } from './dropdown';

// ─── Overlay / Feedback ──────────────────────────────────────────────────────

export { Modal, ModalHeader, ModalContent, ModalFooter } from './modal';
export type { ModalProps, ModalHeaderProps } from './modal';

export {
  ToastProvider,
  ToastContext,
  useToast,
} from './toast';
export type { ToastItem, ToastVariant, ToastProviderProps, ToastContextValue } from './toast';

export { Alert, alertVariants } from './alert';
export type { AlertProps } from './alert';

// ─── Loading States ───────────────────────────────────────────────────────────

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar, skeletonVariants } from './skeleton';
export type { SkeletonProps } from './skeleton';

export { Spinner, SpinnerWithLabel, spinnerVariants } from './spinner';
export type { SpinnerProps, SpinnerWithLabelProps } from './spinner';

// ─── Cosmic / Academy Components ─────────────────────────────────────────────

export {
  CosmicCard,
  CosmicCardHeader,
  CosmicCardTitle,
  CosmicCardDescription,
  CosmicCardContent,
  CosmicCardFooter,
} from './cosmic-card';
export type { CosmicCardProps } from './cosmic-card';

export { CosmicGradient } from './cosmic-gradient';
export type { CosmicGradientProps } from './cosmic-gradient';

export { GlowEffect } from './glow-effect';
export type { GlowEffectProps } from './glow-effect';

export { AcademyBadge } from './academy-badge';
export type { AcademyBadgeProps } from './academy-badge';

export { BondIndicator } from './bond-indicator';
export type { BondIndicatorProps } from './bond-indicator';
