import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: YouTube transcript extraction
 *
 * Extracts captions/transcript from YouTube videos by fetching the
 * video page and parsing the embedded caption tracks.
 *
 * GET /api/youtube-transcript?url=https://youtube.com/watch?v=...
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  const videoId = extractVideoId(url);
  if (!videoId) {
    return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
  }

  try {
    const transcript = await fetchTranscript(videoId);
    return NextResponse.json({
      videoId,
      title: transcript.title,
      transcript: transcript.text,
      segments: transcript.segments,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Transcript extraction failed: ${message}` },
      { status: 500 }
    );
  }
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

interface TranscriptSegment {
  start: number;
  duration: number;
  text: string;
}

interface TranscriptResult {
  title: string;
  text: string;
  segments: TranscriptSegment[];
}

/**
 * Fetch transcript by parsing YouTube's page for caption track data.
 * This approach doesn't require an API key.
 */
async function fetchTranscript(videoId: string): Promise<TranscriptResult> {
  // Fetch the YouTube video page
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  const pageResponse = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; ArcaneanCanvas/1.0)',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    signal: controller.signal,
  });

  clearTimeout(timeout);

  if (!pageResponse.ok) {
    throw new Error(`Failed to fetch YouTube page: ${pageResponse.status}`);
  }

  const pageHtml = await pageResponse.text();

  // Extract title
  const titleMatch = pageHtml.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch?.[1]?.replace(' - YouTube', '').trim() || 'Unknown Video';

  // Find caption tracks in the page data
  const captionMatch = pageHtml.match(/"captionTracks":\s*(\[.*?\])/);

  if (!captionMatch) {
    // Try alternative: timedtext API directly
    return {
      title,
      text: '(Transcript not available for this video)',
      segments: [],
    };
  }

  try {
    const captionTracks = JSON.parse(captionMatch[1]);

    // Prefer English, fall back to first track
    const track =
      captionTracks.find((t: { languageCode: string }) => t.languageCode === 'en') ||
      captionTracks[0];

    if (!track?.baseUrl) {
      return {
        title,
        text: '(No caption track found)',
        segments: [],
      };
    }

    // Fetch the actual transcript XML
    const captionUrl = track.baseUrl.replace(/\\u0026/g, '&');
    const captionResponse = await fetch(captionUrl, {
      signal: AbortSignal.timeout(8000),
    });

    if (!captionResponse.ok) {
      throw new Error(`Failed to fetch captions: ${captionResponse.status}`);
    }

    const captionXml = await captionResponse.text();
    const segments = parseCaptionXml(captionXml);

    return {
      title,
      text: segments.map((s) => s.text).join(' '),
      segments,
    };
  } catch {
    return {
      title,
      text: '(Failed to parse transcript)',
      segments: [],
    };
  }
}

/**
 * Parse YouTube's caption XML format into segments.
 */
function parseCaptionXml(xml: string): TranscriptSegment[] {
  const segments: TranscriptSegment[] = [];
  const regex = /<text start="([\d.]+)" dur="([\d.]+)"[^>]*>(.*?)<\/text>/g;

  let match;
  while ((match = regex.exec(xml)) !== null) {
    const text = match[3]
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/<[^>]+>/g, '')
      .trim();

    if (text) {
      segments.push({
        start: parseFloat(match[1]),
        duration: parseFloat(match[2]),
        text,
      });
    }
  }

  return segments;
}
