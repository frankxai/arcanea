import { Metadata } from 'next';
import { RanksPage } from '@/components/academy/ranks-page';

export const metadata: Metadata = {
  title: 'Magic Ranks | Academy of Arcanea',
  description:
    'The path from Apprentice to Luminor — the five ranks of magical mastery in Arcanea.',
  openGraph: {
    title: 'Magic Ranks | Academy of Arcanea',
    description:
      'The path from Apprentice to Luminor — the five ranks of magical mastery in Arcanea.',
  },
};

export default function Ranks() {
  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      <main>
        <RanksPage />
      </main>
    </div>
  );
}
