import Image from 'next/image';
import Link from 'next/link';
import { FORMATS, type FormatKey } from './living-arc-data';
import { livingArcStyles as styles } from './living-arc-styles';

interface LivingArcReleaseProps {
  activeFormat: FormatKey;
  onSelectFormat: (format: FormatKey) => void;
}

export function LivingArcRelease({ activeFormat, onSelectFormat }: LivingArcReleaseProps) {
  const selectedFormat = FORMATS[activeFormat];

  return (
    <>
      <section id="formats" className={styles.formatsSection} aria-labelledby="formats-title">
        <div className={styles.formatImage}>
          <Image
            src="/story/the-living-arc/lumara-godbeast.webp"
            alt="Lumara meets a living luminous Godbeast beside the waters of Arcanea."
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </div>

        <div className={styles.formatContent}>
          <p className={styles.eyebrow}>Read · Scroll · Watch · Listen</p>
          <h2 id="formats-title">One story system. Each medium does work the others cannot.</h2>

          <div className={styles.formatTabs} role="tablist" aria-label="Living Arc formats">
            {(Object.keys(FORMATS) as FormatKey[]).map((format) => (
              <button
                key={format}
                id={`format-tab-${format}`}
                type="button"
                role="tab"
                aria-selected={activeFormat === format}
                aria-controls="format-panel"
                className={activeFormat === format ? styles.formatActive : undefined}
                onClick={() => onSelectFormat(format)}
              >
                {FORMATS[format].label}
              </button>
            ))}
          </div>

          <div
            id="format-panel"
            className={styles.formatPanel}
            role="tabpanel"
            aria-labelledby={`format-tab-${activeFormat}`}
            key={activeFormat}
          >
            <h3>{selectedFormat.title}</h3>
            <p>{selectedFormat.body}</p>
            <p className={styles.formatRelease}>{selectedFormat.release}</p>
            {activeFormat === 'scroll' ? (
              <Link className={styles.formatCta} href="/story/the-living-arc/webtoon/episode-0">
                Read Episode 00
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section id="wallpapers" className={styles.wallpaperSection} aria-labelledby="wallpaper-title">
        <Image
          className={styles.wallpaperBackdrop}
          src="/story/the-living-arc/wallpapers/living-arc-desktop.webp"
          alt=""
          fill
          sizes="100vw"
        />
        <div className={styles.wallpaperShade} />
        <div className={styles.wallpaperCopy}>
          <p className={styles.eyebrow}>Keep the living world</p>
          <h2 id="wallpaper-title">Arcanean Luminism for every threshold.</h2>
          <p>
            Download the first-dawn key art as a 4K desktop or phone wallpaper. Both editions are composed around real icon and lock-screen safe areas.
          </p>
          <div className={styles.wallpaperActions}>
            <a href="/story/the-living-arc/wallpapers/living-arc-desktop-4k.jpg" download>
              Desktop · 3840×2160
            </a>
            <a href="/story/the-living-arc/wallpapers/living-arc-phone-4k.jpg" download>
              Phone · 2160×3840
            </a>
            <Link href="/story/the-living-arc/webtoon/episode-0">Read the webtoon</Link>
          </div>
        </div>
        <div className={styles.phonePreview} aria-hidden="true">
          <Image
            src="/story/the-living-arc/wallpapers/living-arc-phone.webp"
            alt=""
            width={1080}
            height={1920}
            sizes="(max-width: 760px) 42vw, 21vw"
          />
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <p className={styles.eyebrow}>Arcanea // The Living Arc</p>
          <h2>A living intelligence makes room for an answer it cannot predict.</h2>
        </div>
        <nav aria-label="Living Arc closing links">
          <a href="#living-arc-title">Return to the gate</a>
          <Link href="/story/the-living-arc/webtoon/episode-0">Read Episode 00</Link>
          <Link href="/lore">Explore Arcanea</Link>
          <Link href="/lore/malachar">Meet Malachar</Link>
        </nav>
      </footer>
    </>
  );
}
