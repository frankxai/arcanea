import { Metadata } from 'next';
import { LoreHero } from '@/components/lore/lore-hero';
import { CosmologySection } from '@/components/lore/cosmology-section';
import { GuardiansPreview } from '@/components/lore/guardians-preview';
import { GatesPreview } from '@/components/lore/gates-preview';
import { LibraryPreview } from '@/components/lore/library-preview';
import { LoreExploreGrid } from '@/components/lore/lore-explore-grid';
import { LoreCTA } from '@/components/lore/lore-cta';


export const metadata: Metadata = {
  title: 'Lore of Arcanea | The Living Mythology',
  description:
    'Living Intelligence for the Arcanea universe. Explore the cosmic origins of Lumina and Nero, the Ten Guardian intelligences, and the sacred mythology that powers your creative civilization. Build your Universe through the wisdom of the Ten Gates.',
  openGraph: {
    title: 'Lore of Arcanea | The Living Mythology',
    description: 'Living Intelligence for the Arcanea universe. Explore the cosmic origins, Ten Guardians, and the sacred mythology that powers your creative civilization.',
    images: ['/og-lore.png'],
  },
};

export default function LorePage() {
  return (
    <div className="relative min-h-screen bg-cosmic-deep">
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

        {/* Explore Grid - All Lore Sub-Pages */}
        <LoreExploreGrid />

        {/* CTA - Begin Your Journey */}
        <LoreCTA />
      </main>
    </div>
  );
}
