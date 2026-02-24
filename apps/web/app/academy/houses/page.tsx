import { Metadata } from 'next';
import { HousesPage } from '@/components/academy/houses-page';

export const metadata: Metadata = {
  title: 'The Seven Houses | Academy of Arcanea',
  description:
    'Discover the Seven Academy Houses of Arcanea — each a path of creation aligned with a cosmic force.',
  openGraph: {
    title: 'The Seven Houses | Academy of Arcanea',
    description:
      'Discover the Seven Academy Houses of Arcanea — each a path of creation aligned with a cosmic force.',
  },
};

export default function Houses() {
  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      <main>
        <HousesPage />
      </main>
    </div>
  );
}
