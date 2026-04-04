import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: URL metadata extraction
 *
 * Extracts Open Graph metadata, favicon, and optionally article content
 * from any given URL. Used by the URLCard canvas node.
 *
 * GET /api/url-extract?url=https://example.com
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Validate URL
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ArcaneanCanvas/1.0 (metadata extraction)',
        'Accept': 'text/html,application/xhtml+xml,*/*',
      },
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status}` },
        { status: 502 }
      );
    }

    const contentType = response.headers.get('content-type') || '';

    // Only parse HTML content
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      const hostname = new URL(url).hostname;
      return NextResponse.json({
        title: hostname,
        url,
        siteName: hostname,
        type: contentType.split('/')[0],
      });
    }

    const html = await response.text();
    const metadata = extractMetadata(html, url);

    return NextResponse.json(metadata);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Extraction failed: ${message}` },
      { status: 500 }
    );
  }
}

interface ExtractedMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
  url: string;
  content?: string;
  type?: string;
}

/**
 * Extract metadata from HTML using regex (no DOM parser dependency needed).
 * Extracts: OG tags, Twitter cards, title, description, favicon.
 */
function extractMetadata(html: string, url: string): ExtractedMetadata {
  const parsedUrl = new URL(url);
  const origin = parsedUrl.origin;

  const result: ExtractedMetadata = { url };

  // OG tags
  result.title = extractMeta(html, 'og:title') || extractMeta(html, 'twitter:title') || extractTitle(html);
  result.description = extractMeta(html, 'og:description') || extractMeta(html, 'twitter:description') || extractMeta(html, 'description', 'name');
  result.image = resolveUrl(extractMeta(html, 'og:image') || extractMeta(html, 'twitter:image'), origin);
  result.siteName = extractMeta(html, 'og:site_name') || parsedUrl.hostname;
  result.type = extractMeta(html, 'og:type');

  // Favicon
  const faviconMatch = html.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i)
    || html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["'](?:shortcut )?icon["']/i);
  result.favicon = resolveUrl(
    faviconMatch?.[1] || '/favicon.ico',
    origin
  );

  // Extract main content (simplified readability)
  result.content = extractMainContent(html);

  return result;
}

function extractMeta(html: string, property: string, attr: string = 'property'): string | undefined {
  // Try property="..." content="..."
  const pattern1 = new RegExp(
    `<meta[^>]*${attr}=["']${escapeRegex(property)}["'][^>]*content=["']([^"']*)["']`,
    'i'
  );
  // Try content="..." property="..."
  const pattern2 = new RegExp(
    `<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${escapeRegex(property)}["']`,
    'i'
  );

  return pattern1.exec(html)?.[1] || pattern2.exec(html)?.[1];
}

function extractTitle(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match?.[1]?.trim();
}

function resolveUrl(path: string | undefined, origin: string): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('//')) return `https:${path}`;
  if (path.startsWith('/')) return `${origin}${path}`;
  return `${origin}/${path}`;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Simplified article content extraction.
 * Strips HTML tags, scripts, styles, and extracts text from main content areas.
 */
function extractMainContent(html: string): string {
  // Remove scripts and styles
  let cleaned = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '');

  // Try to find article or main content
  const articleMatch = cleaned.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
    || cleaned.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    || cleaned.match(/<div[^>]*class=["'][^"']*(?:content|article|post|entry)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);

  const content = articleMatch ? articleMatch[1] : cleaned;

  // Strip all HTML tags
  const text = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  // Return first 3000 chars of meaningful content
  return text.slice(0, 3000);
}
