export interface PageContent {
  title: string;
  description: string;
  url: string;
  domain: string;
  mainText: string;
  wordCount: number;
  isYouTube: boolean;
  youtubeVideoId?: string | undefined;
  images: string[];
  headings: string[];
  author?: string | undefined;
  publishDate?: string | undefined;
}

interface ScoredElement {
  element: Element;
  score: number;
}

function getTextDensity(element: Element): number {
  const text = element.textContent ?? '';
  const html = element.innerHTML;
  if (html.length === 0) return 0;
  return text.length / html.length;
}

function getParagraphCount(element: Element): number {
  return element.querySelectorAll('p').length;
}

function getLinkDensity(element: Element): number {
  const text = element.textContent ?? '';
  const linkText = Array.from(element.querySelectorAll('a'))
    .map(a => a.textContent ?? '')
    .join('');
  if (text.length === 0) return 0;
  return linkText.length / text.length;
}

function scoreElement(element: Element): number {
  let score = 0;

  const tagName = element.tagName.toLowerCase();
  const classAndId = `${element.className} ${element.id}`.toLowerCase();

  // Positive signals
  if (['article', 'main', 'section'].includes(tagName)) score += 30;
  if (/article|content|main|story|post|text|body/.test(classAndId)) score += 25;
  if (/entry|blog|prose|readable/.test(classAndId)) score += 15;

  // Negative signals
  if (/nav|menu|header|footer|sidebar|comment|widget|ad|banner/.test(classAndId)) score -= 50;
  if (['nav', 'header', 'footer', 'aside'].includes(tagName)) score -= 40;

  // Text density
  const density = getTextDensity(element);
  score += density * 20;

  // Paragraph count bonus
  const paraCount = getParagraphCount(element);
  if (paraCount > 3) score += paraCount * 3;

  // Link density penalty
  const linkDensity = getLinkDensity(element);
  score -= linkDensity * 30;

  // Text length bonus
  const textLength = (element.textContent ?? '').trim().length;
  if (textLength > 500) score += 20;
  if (textLength > 1000) score += 20;
  if (textLength > 2000) score += 20;

  return score;
}

function extractMainContent(): string {
  // Try semantic elements first
  const semanticSelectors = [
    'article',
    'main',
    '[role="main"]',
    '.article-content',
    '.post-content',
    '.entry-content',
    '.content-body',
    '#content',
    '#main-content',
    '.main-content',
  ];

  for (const selector of semanticSelectors) {
    const el = document.querySelector(selector);
    if (el) {
      const text = extractText(el);
      if (text.length > 300) return text;
    }
  }

  // Heuristic scoring fallback
  const candidates: ScoredElement[] = [];

  const elements = document.querySelectorAll(
    'div, section, article, main, td'
  );

  elements.forEach(element => {
    const score = scoreElement(element);
    if (score > 10) {
      candidates.push({ element, score });
    }
  });

  if (candidates.length === 0) {
    return extractText(document.body);
  }

  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0];

  if (best) {
    return extractText(best.element);
  }

  return extractText(document.body);
}

function extractText(element: Element): string {
  // Remove unwanted elements before extracting
  const clone = element.cloneNode(true) as Element;

  const removeSelectors = [
    'script',
    'style',
    'noscript',
    'iframe',
    'nav',
    'header',
    'footer',
    '[role="navigation"]',
    '[role="banner"]',
    '[role="contentinfo"]',
    '.advertisement',
    '.ad',
    '.ads',
    '.social-share',
    '.related-posts',
    '.comments',
    '#comments',
    '.cookie-notice',
    '.popup',
    '.modal',
  ];

  removeSelectors.forEach(selector => {
    clone.querySelectorAll(selector).forEach(el => el.remove());
  });

  // Extract meaningful text blocks
  const textBlocks: string[] = [];
  const paragraphs = clone.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote');

  if (paragraphs.length > 0) {
    paragraphs.forEach(p => {
      const text = (p.textContent ?? '').trim();
      if (text.length > 20) {
        textBlocks.push(text);
      }
    });
  }

  if (textBlocks.length > 0) {
    return textBlocks.join('\n\n').slice(0, 8000);
  }

  return (clone.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 8000);
}

function extractHeadings(): string[] {
  const headings: string[] = [];
  document.querySelectorAll('h1, h2, h3').forEach(h => {
    const text = (h.textContent ?? '').trim();
    if (text.length > 0 && text.length < 200) {
      headings.push(text);
    }
  });
  return headings.slice(0, 10);
}

function extractImages(): string[] {
  const images: string[] = [];
  const seenSrcs = new Set<string>();

  document.querySelectorAll('img[src]').forEach(img => {
    const src = (img as HTMLImageElement).src;
    if (!src || seenSrcs.has(src)) return;
    seenSrcs.add(src);

    // Skip tiny images (icons, spacers)
    const naturalWidth = (img as HTMLImageElement).naturalWidth;
    const naturalHeight = (img as HTMLImageElement).naturalHeight;
    if (naturalWidth > 0 && naturalWidth < 50) return;
    if (naturalHeight > 0 && naturalHeight < 50) return;

    // Skip data URIs and tracking pixels
    if (src.startsWith('data:')) return;

    images.push(src);
  });

  return images.slice(0, 5);
}

function extractMetaContent(name: string): string | undefined {
  const selectors = [
    `meta[name="${name}"]`,
    `meta[property="${name}"]`,
    `meta[property="og:${name}"]`,
    `meta[name="twitter:${name}"]`,
  ];

  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el) {
      const content = el.getAttribute('content');
      if (content) return content;
    }
  }
  return undefined;
}

function detectYouTube(): { isYouTube: boolean; videoId?: string | undefined } {
  const url = window.location.href;
  if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
    return { isYouTube: false };
  }

  const urlObj = new URL(url);
  let videoId: string | undefined;

  if (urlObj.hostname.includes('youtube.com')) {
    videoId = urlObj.searchParams.get('v') ?? undefined;
  } else if (urlObj.hostname === 'youtu.be') {
    videoId = urlObj.pathname.slice(1);
  }

  return { isYouTube: true, videoId };
}

export function extractPageContent(): PageContent {
  const { isYouTube, videoId } = detectYouTube();

  const title =
    document.title ||
    extractMetaContent('title') ||
    document.querySelector('h1')?.textContent?.trim() ||
    'Untitled Page';

  const description =
    extractMetaContent('description') ||
    extractMetaContent('og:description') ||
    '';

  const mainText = extractMainContent();
  const wordCount = mainText.split(/\s+/).filter(w => w.length > 0).length;

  return {
    title: title.slice(0, 200),
    description: description.slice(0, 500),
    url: window.location.href,
    domain: window.location.hostname,
    mainText,
    wordCount,
    isYouTube,
    youtubeVideoId: videoId || undefined,
    images: extractImages(),
    headings: extractHeadings(),
    author: extractMetaContent('author') || undefined,
    publishDate:
      extractMetaContent('article:published_time') ||
      extractMetaContent('date') ||
      undefined,
  };
}

export function formatPageContextForAI(content: PageContent): string {
  const lines: string[] = [
    `**Page Context**`,
    `Title: ${content.title}`,
    `URL: ${content.url}`,
  ];

  if (content.author) lines.push(`Author: ${content.author}`);
  if (content.publishDate) lines.push(`Published: ${content.publishDate}`);
  if (content.description) lines.push(`Description: ${content.description}`);
  if (content.isYouTube) {
    lines.push(`Type: YouTube Video${content.youtubeVideoId ? ` (ID: ${content.youtubeVideoId})` : ''}`);
  }

  lines.push(`\n**Page Content** (${content.wordCount} words):`);
  lines.push(content.mainText.slice(0, 4000));

  if (content.mainText.length > 4000) {
    lines.push('\n[Content truncated for context window]');
  }

  return lines.join('\n');
}
