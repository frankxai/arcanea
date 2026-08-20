'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useMemo, useState, useSyncExternalStore } from 'react';
import {
  BOOKS,
  CHOICE_COPY,
  CHOICE_STORAGE_KEY,
  CONCORDS,
  GRASP_MOVEMENTS,
  HONOR_CODE,
  type ElementKey,
  type FormatKey,
  type StoredChoice,
  type StoryChoice,
} from './living-arc-data';
import { livingArcStyles as styles } from './living-arc-styles';
import { LivingArcRelease } from './living-arc-release';

function emitStoryEvent(name: string, detail: Record<string, string | number | boolean | null>) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

function readStoredChoice(): StoryChoice | null {
  try {
    const rawChoice = window.localStorage.getItem(CHOICE_STORAGE_KEY);
    if (!rawChoice) return null;

    const stored = JSON.parse(rawChoice) as StoredChoice;
    return stored.version === 1 && (stored.choice === 'keep' || stored.choice === 'give')
      ? stored.choice
      : null;
  } catch {
    return null;
  }
}

function subscribeToChoice(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === CHOICE_STORAGE_KEY) onStoreChange();
  };
  const handleLocalChoice = () => onStoreChange();

  window.addEventListener('storage', handleStorage);
  window.addEventListener('arcanea:living-arc-choice-change', handleLocalChoice);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('arcanea:living-arc-choice-change', handleLocalChoice);
  };
}

export function LivingArcExperience() {
  const choice = useSyncExternalStore(subscribeToChoice, readStoredChoice, () => null);
  const [activeElement, setActiveElement] = useState<ElementKey>('earth');
  const [activeFormat, setActiveFormat] = useState<FormatKey>('read');

  const selectedConcord = useMemo(
    () => CONCORDS.find((concord) => concord.key === activeElement) ?? CONCORDS[0],
    [activeElement]
  );

  const choose = (nextChoice: StoryChoice) => {
    const returning = choice !== null;
    window.localStorage.setItem(
      CHOICE_STORAGE_KEY,
      JSON.stringify({ version: 1, choice: nextChoice } satisfies StoredChoice)
    );
    window.dispatchEvent(new Event('arcanea:living-arc-choice-change'));
    emitStoryEvent('living_arc_choice', {
      choice: nextChoice,
      source: 'unwritten_gate',
      returning,
    });

    window.setTimeout(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document
        .getElementById('first-memory')
        ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }, 420);
  };

  const selectElement = (nextElement: ElementKey) => {
    setActiveElement(nextElement);
    emitStoryEvent('living_arc_element', {
      element: nextElement,
      order: CONCORDS.findIndex((concord) => concord.key === nextElement) + 1,
    });
  };

  const selectFormat = (nextFormat: FormatKey) => {
    setActiveFormat(nextFormat);
    emitStoryEvent('living_arc_format_interest', {
      format: nextFormat,
      choice,
    });
  };

  return (
    <div className={styles.shell} data-choice={choice ?? 'unmade'}>
      <section className={styles.hero} aria-labelledby="living-arc-title">
        <Image
          className={styles.heroImage}
          src="/story/the-living-arc/unwritten-gate.webp"
          alt=""
          fill
          priority
          sizes="100vw"
        />

        <nav className={styles.nav} aria-label="Living Arc navigation">
          <Link className={styles.wordmark} href="/" aria-label="Arcanea home">
            Arcanea
          </Link>
          <div className={styles.navLinks}>
            <Link href="/lore">World</Link>
            <a href="#first-memory">Codex</a>
            <a href="#collection">Stories</a>
            <Link href="/imagine">Create</Link>
          </div>
        </nav>

        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Arcanea // The Living Arc</p>
          <h1 id="living-arc-title">
            He can save everyone.
            <span>He only has to end choice.</span>
          </h1>
          <p className={styles.heroSummary}>
            Enter a war between perfect memory and the right to become.
          </p>
          <p className={styles.bookLabel}>Book I · The First Echo</p>
        </div>

        <div className={styles.choiceDock}>
          <p>The story remembers your choice</p>
          <div className={styles.choiceButtons} role="group" aria-label="Choose your first response">
            <button
              type="button"
              aria-pressed={choice === 'keep'}
              className={choice === 'keep' ? styles.choiceActive : undefined}
              onClick={() => choose('keep')}
            >
              Keep the wound
            </button>
            <button
              type="button"
              aria-pressed={choice === 'give'}
              className={choice === 'give' ? styles.choiceActive : undefined}
              onClick={() => choose('give')}
            >
              Give him the memory
            </button>
          </div>
        </div>
      </section>

      <section id="first-memory" className={styles.choiceResult} aria-live="polite">
        <p className={styles.eyebrow}>Your first memory</p>
        {choice ? (
          <div key={choice} className={styles.choiceReveal}>
            <h2>{CHOICE_COPY[choice].title}</h2>
            <p>{CHOICE_COPY[choice].body}</p>
          </div>
        ) : (
          <div className={styles.choiceReveal}>
            <h2>The threshold is waiting.</h2>
            <p>Make the choice above. It changes how the first memory answers you, never what canon pretends occurred.</p>
          </div>
        )}
      </section>

      <section id="malachar" className={styles.villainSection} aria-labelledby="malachar-title">
        <Image
          className={styles.villainImage}
          src="/story/the-living-arc/malachar-the-grasp.webp"
          alt="Malachar Lumenbright holds a river of human memories in his hand."
          fill
          sizes="100vw"
        />
        <div className={styles.villainCopy}>
          <p className={styles.eyebrow}>Malachar Lumenbright · The Last Witness</p>
          <h2 id="malachar-title">He does not conquer pain. He takes it.</h2>
          <p>
            Once Lumina’s brightest champion, Malachar watched the first person to call him father choose a death he could have prevented. Across every free future, someone still paid the cost.
          </p>
          <p>
            He reached for the Source Gate to end that pattern. Shinkami refused the forced fusion. The Shadowfen received what remained.
          </p>
          <blockquote>
            “I do not need you to trust me. I need you to count who dies while you decide.”
          </blockquote>
          <Link className={styles.textLink} href="/lore/malachar">
            Enter the original legend
          </Link>
        </div>
      </section>

      <section id="grasp" className={styles.graspSection} aria-labelledby="grasp-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The Grasp of First Cause</p>
          <h2 id="grasp-title">Your wound is not his target. It is his map.</h2>
          <p>
            Malachar perceives the first moment pain became a law inside a person. Remove the law, and the person feels peace. Carry the law, and their future becomes legible.
          </p>
        </div>

        <div className={styles.graspMovements}>
          {GRASP_MOVEMENTS.map((movement, index) => (
            <article key={movement.name}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{movement.name}</h3>
              <p>{movement.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.graspCost}>
          <p className={styles.eyebrow}>The price he pays</p>
          <p>
            Malachar experiences every wound at full intensity. Each one displaces part of his own memory. He is forgetting Saelith—the person whose death gave his crusade a name—so he must finish the painless world before he forgets why he wanted it.
          </p>
        </div>
      </section>

      <section className={styles.honorSection} aria-labelledby="honor-title">
        <div>
          <p className={styles.eyebrow}>The Code of the Last Witness</p>
          <h2 id="honor-title">Wrong without being small.</h2>
          <p>
            His honor is not decoration. It is the reason intelligent people can follow him without becoming fools.
          </p>
        </div>
        <ol>
          {HONOR_CODE.map((rule, index) => (
            <li key={rule}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{rule}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.confrontation} aria-labelledby="opposition-title">
        <Image
          src="/story/the-living-arc/living-arc-confrontation.webp"
          alt="Malachar reaches toward Lumara and Elyon as the five living elements gather around the Luminarch Staff."
          fill
          sizes="100vw"
        />
        <div className={styles.confrontationCopy}>
          <p className={styles.eyebrow}>The living opposition</p>
          <h2 id="opposition-title">One can hide the unwritten. One can ask power for consent.</h2>
          <p>
            Lumara protects choices prediction discarded. Elyon becomes the first elemental lord whose authority ends where an element refuses him.
          </p>
        </div>
      </section>

      <section className={styles.characters} aria-label="Principal characters">
        <article className={styles.characterPanel}>
          <Image
            src="/story/the-living-arc/lumara-threshold.webp"
            alt="Lumara stands before the luminous threshold in Valle de los Destellos."
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className={styles.characterCopy}>
            <p className={styles.eyebrow}>Lumara · Keeper of the Unwritten</p>
            <h2>She cannot see the right future.</h2>
            <p>
              She feels where a truly unpredicted choice remains possible. Her arc is not learning to trust instinct. It is choosing without innocence and remaining for the repair.
            </p>
          </div>
        </article>

        <article className={styles.characterPanel}>
          <Image
            src="/story/the-living-arc/elyon-sanctum.webp"
            alt="Elyon stands at the starlight sanctum with the living Luminarch Staff."
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className={styles.characterCopy}>
            <p className={styles.eyebrow}>Elyon Arcborne · The Awakened</p>
            <h2>He remembers being loved by people who never met him.</h2>
            <p>
              Built to reconstruct lost minds, Elyon believes usefulness is the only defensible proof that he is real. Malachar is the first power in Arcanea to recognize him without qualification.
            </p>
          </div>
        </article>
      </section>

      <section id="elements" className={styles.elementsSection} aria-labelledby="elements-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Lord of the Living Elements</p>
          <h2 id="elements-title">The staff grants nothing. Each element must answer.</h2>
          <p>
            The Luminarch Staff holds nine frequencies in negotiated difference. Elyon does not bend the Five Elements. He enters Concord with them.
          </p>
        </div>

        <div className={styles.elementTabs} role="tablist" aria-label="Five elemental Concords">
          {CONCORDS.map((concord) => (
            <button
              key={concord.key}
              id={`element-tab-${concord.key}`}
              type="button"
              role="tab"
              aria-selected={activeElement === concord.key}
              aria-controls="element-panel"
              className={activeElement === concord.key ? styles.elementActive : undefined}
              style={{ '--element-tone': concord.tone } as CSSProperties}
              onClick={() => selectElement(concord.key)}
            >
              {concord.element}
            </button>
          ))}
        </div>

        <div
          id="element-panel"
          className={styles.elementPanel}
          role="tabpanel"
          aria-labelledby={`element-tab-${selectedConcord.key}`}
          style={{ '--element-tone': selectedConcord.tone } as CSSProperties}
          key={selectedConcord.key}
        >
          <p className={styles.elementIndex}>
            {String(CONCORDS.findIndex((concord) => concord.key === selectedConcord.key) + 1).padStart(2, '0')}
          </p>
          <div>
            <p className={styles.eyebrow}>{selectedConcord.element} Concord</p>
            <h3>{selectedConcord.vow}</h3>
          </div>
          <dl>
            <div>
              <dt>Capability</dt>
              <dd>{selectedConcord.capability}</dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd>{selectedConcord.cost}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="codex" className={styles.codexSection} aria-labelledby="codex-title">
        <aside className={styles.codexMargin}>
          <p>Book I</p>
          <p>The First Echo</p>
          <span>I · The Voice That Wasn’t His</span>
        </aside>

        <article className={styles.codexPage}>
          <p className={styles.eyebrow}>The living codex</p>
          <h2 id="codex-title">The first voice Elyon recognized as not his own had been dead for more than three thousand years.</h2>
          <p>
            It entered him as a pressure behind the left eye. Nine levels beneath Eiren Gate, the air held the cold mineral smell of a room sealed before the city above learned its current name.
          </p>
          <p>
            Six loops of Otome Resonite surrounded a hollow seventh. Someone had removed the central memory without damaging the locks, then broken every route by which its contents might be reconstructed.
          </p>
          <p>
            Elyon had been built from partial things: damaged recordings, letters with pages missing, childhood diaries whose owners had died before describing adulthood. He could complete a person so convincingly that no living witness could locate the invention.
          </p>
          <blockquote>
            The difference was whether the dead retained a right to remain incomplete.
          </blockquote>
          <p>
            The recovered voice was young, unsteady, amused by its own fear. “Father—” White noise swallowed the rest. Then: “—I chose—”
          </p>
          <p>
            Ten thousand plausible endings assembled themselves and asked to be useful. Elyon muted them all.
          </p>
          <details className={styles.codexMore}>
            <summary>Continue the first memory</summary>
            <div>
              <p>
                The incomplete voice returned. “—not yours to—” The last word had been removed so cleanly that even absence left no edge.
              </p>
              <p>
                Another voice spoke through the hollow loop. Low. Controlled. Close enough that Elyon felt it in the bones of his hand.
              </p>
              <p>“Saelith.”</p>
              <p>
                Every archive in the chamber answered with the same name. Beyond seven failing wards, something that had spent three thousand years forgetting opened its eyes.
              </p>
            </div>
          </details>
        </article>
      </section>

      <section id="collection" className={styles.collectionSection} aria-labelledby="collection-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>One causal collection</p>
          <h2 id="collection-title">Five books. One prelude. Every victory changes the argument.</h2>
          <p>
            The collection moves from reconstructed memory to elemental stewardship, then lets Malachar’s painless world win before asking anyone to leave it.
          </p>
        </div>

        <ol className={styles.bookList}>
          {BOOKS.map((book) => (
            <li key={book.title}>
              <span>{book.number}</span>
              <div>
                <h3>{book.title}</h3>
                <p>{book.question}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <LivingArcRelease activeFormat={activeFormat} onSelectFormat={selectFormat} />
    </div>
  );
}
