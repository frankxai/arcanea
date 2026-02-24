import { Metadata } from 'next';
import { ElementsPage } from '@/components/lore/elements/elements-page';

export const metadata: Metadata = {
  title: 'The Five Elements | Lore of Arcanea',
  description:
    'Fire transforms, Water remembers, Earth endures, Wind connects, and the Void holds all possibility. Explore the five elemental forces at the foundation of the Arcanea universe.',
  openGraph: {
    title: 'The Five Elements | Lore of Arcanea',
    description:
      'Explore the five elemental forces — Fire, Water, Earth, Wind, and Void/Spirit — that underpin all creation in Arcanea.',
  },
};

export default function Elements() {
  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      <main>
        <ElementsPage />
      </main>
    </div>
  );
}
