import { Metadata } from 'next';
import { GatesPage } from '@/components/academy/gates-page';

export const metadata: Metadata = {
  title: 'The Ten Gates | Academy of Arcanea',
  description:
    'Journey through the Ten Gates of Creation — from Foundation to Source. Each Gate opens a new dimension of creative power.',
  openGraph: {
    title: 'The Ten Gates | Academy of Arcanea',
    description:
      'From Foundation at 174 Hz to Source at 1111 Hz — a vertical pathway through ten dimensions of creative mastery.',
  },
};

export default function Gates() {
  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      <main>
        <GatesPage />
      </main>
    </div>
  );
}
