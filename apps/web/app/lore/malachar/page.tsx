import { Metadata } from 'next';
import { MalacharPage } from '@/components/lore/malachar/malachar-page';

export const metadata: Metadata = {
  title: 'Malachar — The Dark Lord | Lore of Arcanea',
  description:
    "The tragic tale of Malachar Lumenbright, once the greatest of Lumina's champions, now sealed in the Shadowfen as the Dark Lord.",
  openGraph: {
    title: 'Malachar — The Dark Lord | Arcanea',
    description:
      "He opened all Ten Gates. He earned the title First Eldrian Luminor. Then he tried to take what the universe would not give. Now he is the Shadowfen's sealed prisoner — and the warning every Luminor carries.",
  },
};

export default function Malachar() {
  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      <main>
        <MalacharPage />
      </main>
    </div>
  );
}
