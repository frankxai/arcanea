import type { Metadata } from 'next';
import { LivingArcExperience } from '@/components/story/living-arc/living-arc-experience';

const title = 'The Living Arc — He Can Save Everyone';
const description =
  'Enter Arcanea’s flagship saga: Malachar can end almost every wound, but only by ending the choices he cannot predict.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/story/the-living-arc',
  },
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/story/the-living-arc',
    images: [
      {
        url: '/story/the-living-arc/wallpapers/living-arc-desktop.webp',
        width: 1920,
        height: 1080,
        alt: 'Lumara and Elyon stand on either side of the living Luminarch Staff at first dawn.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/story/the-living-arc/wallpapers/living-arc-desktop.webp'],
  },
};

const seriesData = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWorkSeries',
  name: 'Arcanea: The Living Arc',
  description,
  genre: ['Fantasy', 'Science fantasy', 'Anime-inspired epic fantasy'],
  inLanguage: 'en',
  url: 'https://www.arcanea.ai/story/the-living-arc',
  hasPart: [
    'Malachar: The Brightest Wound',
    'The First Echo',
    'Lord of the Living Elements',
    'The Mercy Engine',
    'The Perfect World',
    'The Last Unwritten Dawn',
  ].map((name, index) => ({
    '@type': 'Book',
    name,
    position: index + 1,
  })),
};

export default function LivingArcPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesData) }}
      />
      <LivingArcExperience />
    </>
  );
}
