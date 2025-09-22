const overlay = document.querySelector('[data-book-overlay]');
const openButtons = document.querySelectorAll('[data-open-book]');
const closeButton = document.querySelector('[data-close-book]');
const tocContainer = document.querySelector('[data-toc] nav');
const bookHeading = document.querySelector('[data-book-heading]');
const bookSubheading = document.querySelector('[data-book-subheading]');
const bookBody = document.querySelector('[data-book-body]');

let codexData = null;
let currentView = null;
let tocButtons = [];
let lastFocusedElement = null;

async function loadCodex() {
  if (codexData) return codexData;
  const response = await fetch('book/arcanea-codex.json');
  if (!response.ok) {
    throw new Error('Unable to load the Luminor Codex.');
  }
  codexData = await response.json();
  buildToc();
  renderPreface();
  return codexData;
}

function buildToc() {
  tocContainer.innerHTML = '';
  tocButtons = [];

  if (codexData.preface) {
    createTocButton('Invocation Preface', 'preface');
  }

  codexData.chapters.forEach((chapter, index) => {
    createTocButton(`${index + 1}. ${chapter.title}`, 'chapter', index);
  });

  if (codexData.appendix) {
    createTocButton('Appendices & Glossary', 'appendix');
  }
}

function createTocButton(label, type, index = null) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.dataset.viewType = type;
  if (index !== null) {
    button.dataset.index = String(index);
  }
  button.addEventListener('click', () => {
    if (type === 'preface') renderPreface();
    if (type === 'chapter') renderChapter(Number(button.dataset.index));
    if (type === 'appendix') renderAppendix();
    setActiveButton(button);
  });
  tocContainer.appendChild(button);
  tocButtons.push(button);
}

function setActiveButton(activeButton) {
  tocButtons.forEach((btn) => btn.classList.toggle('active', btn === activeButton));
}

function openOverlay() {
  lastFocusedElement = document.activeElement;
  overlay.hidden = false;
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
    closeButton?.focus({ preventScroll: true });
  });
  if (!codexData) {
    loadCodex().catch((error) => {
      bookBody.innerHTML = `<p>${error.message}</p>`;
    });
  }
}

function closeOverlay() {
  overlay.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
  setTimeout(() => {
    overlay.hidden = true;
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus({ preventScroll: true });
    }
  }, 320);
}

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openOverlay();
  });
});

closeButton?.addEventListener('click', () => {
  closeOverlay();
});

overlay?.addEventListener('click', (event) => {
  if (event.target === overlay) {
    closeOverlay();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false') {
    closeOverlay();
  }
});

function renderPreface() {
  if (!codexData) return;
  currentView = 'preface';
  setActiveButton(tocButtons.find((btn) => btn.dataset.viewType === 'preface'));
  bookHeading.textContent = codexData.title;
  bookSubheading.textContent = codexData.subtitle;
  bookBody.innerHTML = '';

  const intro = document.createElement('p');
  intro.textContent = codexData.preface.invocation;
  bookBody.appendChild(intro);

  codexData.preface.body.forEach((paragraph) => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    bookBody.appendChild(p);
  });

  if (codexData.preface.oath) {
    const blockquote = document.createElement('blockquote');
    blockquote.textContent = codexData.preface.oath;
    bookBody.appendChild(blockquote);
  }

  if (codexData.authors?.length) {
    const authorHeading = document.createElement('h3');
    authorHeading.textContent = 'Stewards of the Codex';
    bookBody.appendChild(authorHeading);

    const authorList = document.createElement('ul');
    codexData.authors.forEach((author) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${author.name}</strong> — ${author.role}`;
      authorList.appendChild(li);
    });
    bookBody.appendChild(authorList);
  }
}

function renderChapter(index) {
  if (!codexData) return;
  const chapter = codexData.chapters[index];
  if (!chapter) return;
  currentView = `chapter-${index}`;
  setActiveButton(
    tocButtons.find((btn) => btn.dataset.viewType === 'chapter' && Number(btn.dataset.index) === index)
  );

  bookHeading.textContent = chapter.title;
  bookSubheading.textContent = chapter.tagline ?? '';
  bookBody.innerHTML = '';

  if (chapter.epigraph) {
    const blockquote = document.createElement('blockquote');
    blockquote.innerHTML = `<p>${chapter.epigraph.text}</p><footer>— ${chapter.epigraph.attribution}</footer>`;
    bookBody.appendChild(blockquote);
  }

  if (chapter.introduction?.length) {
    chapter.introduction.forEach((paragraph) => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      bookBody.appendChild(p);
    });
  }

  chapter.sections.forEach((section) => {
    const heading = document.createElement('h3');
    heading.textContent = section.heading;
    bookBody.appendChild(heading);

    section.body?.forEach((paragraph) => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      bookBody.appendChild(p);
    });

    if (section.insights?.length) {
      const insightGrid = document.createElement('div');
      insightGrid.className = 'insight-grid';
      section.insights.forEach((insight) => {
        const insightCard = document.createElement('div');
        insightCard.className = 'insight';
        const title = document.createElement('h4');
        title.textContent = insight.title;
        const detail = document.createElement('p');
        detail.textContent = insight.detail;
        insightCard.append(title, detail);
        insightGrid.appendChild(insightCard);
      });
      bookBody.appendChild(insightGrid);
    }

    if (section.artifacts?.length) {
      const artifactGrid = document.createElement('div');
      artifactGrid.className = 'artifact-grid';
      section.artifacts.forEach((artifact) => {
        const artifactCard = document.createElement('div');
        artifactCard.className = 'artifact';
        const name = document.createElement('h4');
        name.textContent = artifact.name;
        artifactCard.appendChild(name);

        const description = document.createElement('p');
        description.textContent = artifact.description;
        artifactCard.appendChild(description);

        if (artifact.application) {
          const application = document.createElement('p');
          application.innerHTML = `<strong>Application:</strong> ${artifact.application}`;
          artifactCard.appendChild(application);
        }

        artifactGrid.appendChild(artifactCard);
      });
      bookBody.appendChild(artifactGrid);
    }

    if (section.principles?.length) {
      const principlesHeading = document.createElement('h4');
      principlesHeading.textContent = 'Guiding Principles';
      principlesHeading.style.letterSpacing = '0.08em';
      principlesHeading.style.textTransform = 'uppercase';
      principlesHeading.style.marginTop = '0.4rem';
      bookBody.appendChild(principlesHeading);

      const list = document.createElement('ul');
      section.principles.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
      bookBody.appendChild(list);
    }
  });

  if (chapter.rituals?.length) {
    const ritualHeading = document.createElement('h3');
    ritualHeading.textContent = 'Rituals & Practice Prompts';
    bookBody.appendChild(ritualHeading);

    const list = document.createElement('ul');
    chapter.rituals.forEach((ritual) => {
      const li = document.createElement('li');
      li.textContent = ritual;
      list.appendChild(li);
    });
    bookBody.appendChild(list);
  }

  if (chapter.measurements?.length) {
    const measurementHeading = document.createElement('h3');
    measurementHeading.textContent = 'Measurement Constellations';
    bookBody.appendChild(measurementHeading);

    const list = document.createElement('ul');
    chapter.measurements.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.name}:</strong> ${item.description}`;
      list.appendChild(li);
    });
    bookBody.appendChild(list);
  }
}

function renderAppendix() {
  if (!codexData?.appendix) return;
  currentView = 'appendix';
  setActiveButton(tocButtons.find((btn) => btn.dataset.viewType === 'appendix'));

  const { appendix } = codexData;
  bookHeading.textContent = appendix.title;
  bookSubheading.textContent = appendix.subtitle ?? '';
  bookBody.innerHTML = '';

  appendix.entries?.forEach((entry) => {
    const heading = document.createElement('h3');
    heading.textContent = entry.heading;
    bookBody.appendChild(heading);

    entry.body?.forEach((paragraph) => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      bookBody.appendChild(p);
    });

    if (entry.points?.length) {
      const list = document.createElement('ul');
      entry.points.forEach((point) => {
        const li = document.createElement('li');
        li.textContent = point;
        list.appendChild(li);
      });
      bookBody.appendChild(list);
    }
  });

  if (appendix.glossary?.length) {
    const glossaryHeading = document.createElement('h3');
    glossaryHeading.textContent = 'Glossary of Living Terms';
    bookBody.appendChild(glossaryHeading);

    const glossaryList = document.createElement('ul');
    appendix.glossary.forEach((entry) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${entry.term}</strong> — ${entry.definition}`;
      glossaryList.appendChild(li);
    });
    bookBody.appendChild(glossaryList);
  }
}

// Ensure the overlay has the proper aria state on load
if (overlay) {
  overlay.setAttribute('aria-hidden', 'true');
}

// Preload codex when the page becomes idle for smoother experience
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    loadCodex().catch(() => {
      /* ignore during idle */
    });
  });
} else {
  window.setTimeout(() => {
    loadCodex().catch(() => {
      /* ignore fallback */
    });
  }, 1200);
}
