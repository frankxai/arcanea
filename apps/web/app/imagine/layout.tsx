import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Imagine — Arcanea',
  description: 'Describe your vision. Watch it materialize. AI-powered image generation with one-click animation.',
  openGraph: {
    title: 'Imagine — Arcanea',
    description: 'AI-powered generative art. Describe. Create. Animate.',
  },
};

export default function ImagineLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
