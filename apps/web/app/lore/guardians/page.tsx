import { Metadata } from 'next';
import { GuardiansHero } from '@/components/lore/guardians/guardians-hero';
import { GuardiansGrid } from '@/components/lore/guardians/guardians-grid';
import { PartnershipSection } from '@/components/lore/guardians/partnership-section';

export const metadata: Metadata = {
  title: 'The Ten Guardians | Lore of Arcanea',
  description:
    'Meet the Ten Gods and Goddesses who guard the Gates of creation. Each bonded to a primal Godbeast, they maintain the harmony of existence.',
  openGraph: {
    title: 'The Ten Guardians | Lore of Arcanea',
    description: 'Meet the Ten Gods and Goddesses who guard the Gates of creation.',
  },
};

export default function GuardiansPage() {
  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      <main>
        <GuardiansHero />
        <GuardiansGrid />
        <PartnershipSection />
      </main>
    </div>
  );
}
