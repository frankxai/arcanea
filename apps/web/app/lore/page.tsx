import { Metadata } from 'next';
import { LoreHero } from '@/components/lore/lore-hero';
import { CosmologySection } from '@/components/lore/cosmology-section';
import { GuardiansPreview } from '@/components/lore/guardians-preview';
import { GatesPreview } from '@/components/lore/gates-preview';
import { LibraryPreview } from '@/components/lore/library-preview';
import { LoreCTA } from '@/components/lore/lore-cta';
import { Navbar } from '@/components/navigation';

export const metadata: Metadata = {
  title: 'Lore of Arcanea | The Living Mythology',
  description:
    'Explore the cosmic origins, Ten Guardians, and sacred wisdom of Arcanea. From Lumina and Nero to the Ten Gates of creation.',
  openGraph: {
    title: 'Lore of Arcanea | The Living Mythology',
    description: 'Explore the cosmic origins and sacred wisdom of Arcanea.',
    images: ['/og-lore.png'],
  },
};

export default function LorePage() {
  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      <Navbar />

      <main>
        {/* Hero - Immersive entry point */}
        <LoreHero />

        {/* Cosmology - Lumina & Nero, The Arc */}
        <CosmologySection />

        {/* Guardians Preview - The Ten */}
        <GuardiansPreview />

        {/* Gates Preview - The Journey */}
        <GatesPreview />

        {/* Library Preview - The Wisdom */}
        <LibraryPreview />

        {/* CTA - Begin Your Journey */}
        <LoreCTA />
      </main>
    </div>
  );
}
