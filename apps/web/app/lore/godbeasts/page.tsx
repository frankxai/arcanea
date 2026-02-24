import { Metadata } from 'next';
import { GodbeastsPage } from '@/components/lore/godbeasts/godbeasts-page';

export const metadata: Metadata = {
  title: 'The Godbeasts | Lore of Arcanea',
  description:
    'Discover the ten primal Godbeasts, bonded to the Arcanean Gods as cosmic companions. From Kaelith the stone serpent-dragon to Amaterasu the cosmic wolf of starlight.',
  openGraph: {
    title: 'The Godbeasts | Lore of Arcanea',
    description:
      'Discover the ten primal Godbeasts, bonded to the Arcanean Gods as cosmic companions.',
  },
};

export default function Godbeasts() {
  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      <main>
        <GodbeastsPage />
      </main>
    </div>
  );
}
