/**
 * Semantic Search API Endpoint
 *
 * POST /api/search/semantic
 *
 * Performs semantic similarity search across Arcanea content
 * using vector embeddings and pgvector.
 *
 * Request body:
 *   {
 *     "query": "search query string",
 *     "limit": 10,              // optional, default 10
 *     "threshold": 0.5,         // optional, default 0.5
 *     "category": "library_text", // optional, filter by category
 *     "tags": ["tag1", "tag2"], // optional, filter by tags
 *     "includeCreations": false // optional, also search user creations
 *   }
 *
 * Response:
 *   {
 *     "success": true,
 *     "results": [
 *       {
 *         "id": "uuid",
 *         "title": "Text Title",
 *         "content": "Matched content...",
 *         "similarity": 0.87,
 *         "category": "library_text",
 *         "source_file": "/book/legends-of-arcanea/I_THE_FIRST_DAWN.md",
 *         "tags": ["legends-of-arcanea", "story"]
 *       }
 *     ],
 *     "meta": {
 *       "query": "original query",
 *       "total": 5,
 *       "searchTime": 234
 *     }
 *   }
 *
 * @module app/api/search/semantic/route
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getVectorSearchService,
  type LoreFragment,
  type LoreCategory,
  type SearchResult,
} from '@/lib/services/vector-search';

// ============================================
// VALIDATION SCHEMA
// ============================================

const SearchRequestSchema = z.object({
  query: z
    .string()
    .min(1, 'Query cannot be empty')
    .max(1000, 'Query too long (max 1000 characters)'),
  limit: z.number().int().min(1).max(100).optional().default(10),
  threshold: z.number().min(0).max(1).optional().default(0.5),
  category: z
    .enum([
      'magic_system',
      'geography',
      'history',
      'character',
      'creature',
      'artifact',
      'library_text',
      'user_creation',
    ])
    .optional(),
  tags: z.array(z.string()).optional(),
  sourceFile: z.string().optional(),
  includeCreations: z.boolean().optional().default(false),
});

type SearchRequest = z.infer<typeof SearchRequestSchema>;

// ============================================
// RESPONSE TYPES
// ============================================

interface SearchResultItem {
  id: string;
  title: string;
  content: string;
  similarity: number;
  category: string;
  source_file?: string;
  tags: string[];
  type: 'lore' | 'creation';
}

interface SearchResponseSuccess {
  success: true;
  results: SearchResultItem[];
  meta: {
    query: string;
    total: number;
    searchTime: number;
    threshold: number;
    limit: number;
  };
}

interface SearchResponseError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

type SearchResponse = SearchResponseSuccess | SearchResponseError;

// ============================================
// ERROR CODES
// ============================================

const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SEARCH_FAILED: 'SEARCH_FAILED',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

// ============================================
// RATE LIMITING (simple in-memory)
// ============================================

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests per minute

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetAt) {
    requestCounts.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  record.count++;
  return record.count > RATE_LIMIT_MAX;
}

function getClientIdentifier(request: NextRequest): string {
  // Use forwarded IP if behind proxy, otherwise use connection IP
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0].trim() || 'anonymous';
  return `semantic-search:${ip}`;
}

// ============================================
// ROUTE HANDLER
// ============================================

export async function POST(request: NextRequest): Promise<NextResponse<SearchResponse>> {
  const startTime = Date.now();

  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    if (isRateLimited(clientId)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: ErrorCodes.RATE_LIMITED,
            message: 'Too many requests. Please try again later.',
          },
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: ErrorCodes.VALIDATION_ERROR,
            message: 'Invalid JSON in request body',
          },
        },
        { status: 400 }
      );
    }

    const validation = SearchRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: ErrorCodes.VALIDATION_ERROR,
            message: 'Invalid request parameters',
            details: validation.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const { query, limit, threshold, category, tags, sourceFile, includeCreations } =
      validation.data;

    // Perform search
    const searchService = getVectorSearchService();
    const results: SearchResultItem[] = [];

    // Search lore fragments
    try {
      const loreResults = await searchService.searchLore(query, {
        limit,
        threshold,
        category: category as LoreCategory | undefined,
        tags,
        sourceFile,
      });

      for (const result of loreResults) {
        results.push({
          id: result.item.id,
          title: result.item.title,
          content: truncateContent(result.item.content, 500),
          similarity: Math.round(result.similarity * 1000) / 1000,
          category: result.item.category,
          source_file: result.item.source_file,
          tags: result.item.tags || [],
          type: 'lore',
        });
      }
    } catch (err) {
      console.error('Lore search failed:', err);
      // Continue with creations search if lore fails
    }

    // Optionally search user creations
    if (includeCreations) {
      try {
        const creationResults = await searchService.searchCreations(query, {
          limit: Math.ceil(limit / 2), // Allocate half the limit to creations
          threshold,
        });

        for (const result of creationResults) {
          results.push({
            id: result.item.id,
            title: result.item.title,
            content: truncateContent(result.item.description || '', 500),
            similarity: Math.round(result.similarity * 1000) / 1000,
            category: 'user_creation',
            tags: result.item.tags || [],
            type: 'creation',
          });
        }
      } catch (err) {
        console.error('Creations search failed:', err);
        // Non-fatal, continue with lore results
      }
    }

    // Sort by similarity and limit
    results.sort((a, b) => b.similarity - a.similarity);
    const finalResults = results.slice(0, limit);

    const searchTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      results: finalResults,
      meta: {
        query,
        total: finalResults.length,
        searchTime,
        threshold,
        limit,
      },
    });
  } catch (err) {
    console.error('Semantic search error:', err);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: ErrorCodes.INTERNAL_ERROR,
          message: 'An unexpected error occurred during search',
          details: process.env.NODE_ENV === 'development' ? String(err) : undefined,
        },
      },
      { status: 500 }
    );
  }
}

// ============================================
// GET HANDLER (for simple queries)
// ============================================

export async function GET(request: NextRequest): Promise<NextResponse<SearchResponse>> {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || searchParams.get('query');

  if (!query) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: ErrorCodes.VALIDATION_ERROR,
          message: 'Query parameter "q" or "query" is required',
        },
      },
      { status: 400 }
    );
  }

  // Convert GET params to POST body and forward to POST handler
  const body = {
    query,
    limit: parseInt(searchParams.get('limit') || '10', 10),
    threshold: parseFloat(searchParams.get('threshold') || '0.5'),
    category: searchParams.get('category') || undefined,
    tags: searchParams.get('tags')?.split(',').filter(Boolean) || undefined,
    includeCreations: searchParams.get('includeCreations') === 'true',
  };

  // Create a new request with the body
  const newRequest = new NextRequest(request.url, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify(body),
  });

  return POST(newRequest);
}

// ============================================
// UTILITIES
// ============================================

/**
 * Truncate content to a maximum length, preserving word boundaries.
 */
function truncateContent(content: string, maxLength: number): string {
  if (content.length <= maxLength) {
    return content;
  }

  // Find the last space before maxLength
  const truncated = content.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > maxLength * 0.7) {
    return truncated.slice(0, lastSpace) + '...';
  }

  return truncated + '...';
}
