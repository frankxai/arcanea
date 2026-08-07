import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { WebtoonProgress } from './webtoon-progress';
import styles from './webtoon.module.css';

const title = 'Episode 00: The Hand He Released — The Living Arc';
const description =
  'Read the vertical prologue to Arcanea: The Living Arc. Before Malachar tried to save everyone, he honored one choice he could not survive.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/story/the-living-arc/webtoon/episode-0' },
  openGraph: {
    title,
    description,
    type: 'article',
    url: '/story/the-living-arc/webtoon/episode-0',
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

const episodeData = {
  '@context': 'https://schema.org',
  '@type': 'ComicStory',
  name: 'The Hand He Released',
  position: 0,
  isPartOf: {
    '@type': 'CreativeWorkSeries',
    name: 'Arcanea: The Living Arc',
    url: 'https://www.arcanea.ai/story/the-living-arc',
  },
  inLanguage: 'en',
  url: 'https://www.arcanea.ai/story/the-living-arc/webtoon/episode-0',
};

export default function LivingArcEpisodeZero() {
  return (
    <article className={styles.shell} aria-labelledby="episode-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeData) }}
      />
      <WebtoonProgress />

      <header className={styles.header}>
        <Link href="/story/the-living-arc">Arcanea // The Living Arc</Link>
        <span>Episode 00</span>
      </header>

      <section className={styles.prologue}>
        <p className={styles.kicker}>A vertical prologue</p>
        <h1 id="episode-title">The Hand He Released</h1>
        <p>Before he tried to end choice, Malachar honored one.</p>
        <span className={styles.scrollCue}>Scroll to remember</span>
      </section>

      <section className={styles.silence} aria-label="Eiren Gate begins to fail">
        <p>Eiren Gate failed at sunset.</p>
        <p>The lower city was still running.</p>
        <p>Saelith had one hand inside the breaking seam.</p>
      </section>

      <figure className={styles.panel}>
        <Image
          src="/story/the-living-arc/webtoon/episode-00-eiren-gate.webp"
          alt="Malachar reaches toward Saelith while she holds a collapsing elemental seam and the city escapes below."
          width={941}
          height={1672}
          priority
          sizes="(max-width: 760px) 100vw, 760px"
        />
      </figure>

      <section className={styles.dialogue} aria-label="Malachar and Saelith speak">
        <div className={styles.malacharLine}>
          <span>Malachar</span>
          <p>Take my hand.</p>
        </div>
        <div className={styles.saelithLine}>
          <span>Saelith</span>
          <p>I am.</p>
        </div>
        <div className={styles.malacharLine}>
          <p>No. Take it and come with me.</p>
        </div>
        <div className={styles.saelithLine}>
          <p>If I move, the lower road closes.</p>
        </div>
      </section>

      <section className={styles.vision}>
        <p>His sight opened.</p>
        <p>He watched every future become a different name for the same wound.</p>
        <p>In every future where Saelith remained herself, someone stayed.</p>
      </section>

      <section className={styles.dialogue} aria-label="The choice becomes final">
        <div className={styles.malacharLine}>
          <p>I can change what your body will permit.</p>
        </div>
        <div className={styles.saelithLine}>
          <p>That is not saving me.</p>
        </div>
        <div className={styles.malacharLine}>
          <p>I will not watch you die.</p>
        </div>
        <div className={styles.saelithLine}>
          <span>Saelith</span>
          <p>Then look at the people who live.</p>
        </div>
      </section>

      <section className={styles.fatherBeat}>
        <p>For the first time in battle, she called him father.</p>
      </section>

      <figure className={`${styles.panel} ${styles.handPanel}`}>
        <Image
          src="/story/the-living-arc/webtoon/episode-00-hands.webp"
          alt="Malachar and Saelith release one another’s hands across a breaking thread of cyan light."
          width={941}
          height={1672}
          loading="lazy"
          sizes="(max-width: 760px) 100vw, 760px"
        />
      </figure>

      <section className={styles.lastWords} aria-label="Saelith’s last instruction">
        <p>“Do not turn my choice into permission for the next death.”</p>
        <p className={styles.answer}>“Then what do I do with it?”</p>
        <p>“Carry it.”</p>
        <p>“Do not own it.”</p>
      </section>

      <section className={styles.releaseBeat}>
        <p>He opened his hand.</p>
        <p>The lower road held.</p>
        <p>Saelith did not return.</p>
      </section>

      <figure className={`${styles.panel} ${styles.aftermathPanel}`}>
        <Image
          src="/story/the-living-arc/webtoon/episode-00-aftermath.webp"
          alt="Malachar kneels alone in the shattered Eiren Gate chamber as a violet fracture begins behind him."
          width={941}
          height={1672}
          loading="lazy"
          sizes="(max-width: 760px) 100vw, 760px"
        />
      </figure>

      <section className={styles.afterword}>
        <p>For three thousand years, he remembered only the first half.</p>
        <blockquote>Carry it.</blockquote>
        <p>He forgot the boundary that made the burden love.</p>
        <blockquote>Do not own it.</blockquote>
      </section>

      <footer className={styles.footer}>
        <p className={styles.kicker}>Continue the Living Arc</p>
        <h2>A dead voice is about to remember him.</h2>
        <div className={styles.actions}>
          <Link href="/story/the-living-arc#codex">Read The First Echo</Link>
          <Link href="/story/the-living-arc#wallpapers">Download the art</Link>
          <Link href="/story/the-living-arc">Enter the saga</Link>
        </div>
        <small>Episode 00 · End</small>
      </footer>
    </article>
  );
}
