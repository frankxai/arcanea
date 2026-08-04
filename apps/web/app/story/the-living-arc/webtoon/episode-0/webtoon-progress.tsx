'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './webtoon.module.css';

export function WebtoonProgress() {
  const [progress, setProgress] = useState(0);
  const completed = useRef(false);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
    window.dispatchEvent(
      new CustomEvent('living_arc_chapter_start', {
        detail: { chapter: 'episode-00-the-hand-he-released', choice: null },
      })
    );

    let frame = 0;
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const next = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 1;
      setProgress(next);

      if (next >= 0.94 && !completed.current) {
        completed.current = true;
        window.dispatchEvent(
          new CustomEvent('living_arc_chapter_complete', {
            detail: {
              chapter: 'episode-00-the-hand-he-released',
              choice: null,
              seconds: Math.max(1, Math.round((Date.now() - startedAt.current) / 1000)),
            },
          })
        );
      }
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className={styles.progressTrack} aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
