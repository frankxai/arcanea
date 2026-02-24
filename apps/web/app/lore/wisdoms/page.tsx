import { Metadata } from 'next';
import { WisdomsPage } from '@/components/lore/wisdoms/wisdoms-page';

export const metadata: Metadata = {
  title: 'The Seven Wisdoms | Lore of Arcanea',
  description:
    'Discover the Seven Wisdoms of Arcanea — aspects of virtue that guide every creator on their journey through the Gates.',
  openGraph: {
    title: 'The Seven Wisdoms | Lore of Arcanea',
    description:
      'Discover the Seven Wisdoms of Arcanea — aspects of virtue that guide every creator on their journey through the Gates.',
  },
};

export default function Wisdoms() {
  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      <main>
        <WisdomsPage />
      </main>
    </div>
  );
}
