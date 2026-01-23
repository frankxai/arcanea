#!/usr/bin/env npx tsx
/**
 * Arcanea Library Embedding Script
 *
 * Batch ingestion script for embedding all Library of Arcanea content.
 * Reads markdown files from /book/, chunks them semantically,
 * generates embeddings, and upserts to lore_fragments table.
 *
 * Usage:
 *   npx tsx scripts/embed-library.ts [options]
 *
 * Options:
 *   --collection <name>  Process only a specific collection
 *   --dry-run            Preview what would be processed without making changes
 *   --clear              Clear existing library_text entries before processing
 *   --verbose            Show detailed progress
 *
 * Environment:
 *   GEMINI_API_KEY - Required for embedding generation
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY - Required for database access
 *
 * @module scripts/embed-library
 */

import { readdir, readFile } from 'fs/promises';
import { join, basename, extname } from 'path';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI, TaskType } from '@google/generative-ai';

// ============================================
// CONFIGURATION
// ============================================

const BOOK_DIR = join(process.cwd(), 'book');
const CHUNK_SIZE = 500; // Target tokens per chunk
const CHUNK_OVERLAP = 50; // Token overlap between chunks
const EMBEDDING_MODEL = 'text-embedding-004';
const EMBEDDING_DIMENSION = 768;
const BATCH_SIZE = 5; // Parallel embedding requests
const RATE_LIMIT_DELAY = 200; // ms between batches

// CLI Arguments
const args = process.argv.slice(2);
const targetCollection = getArgValue('--collection');
const isDryRun = args.includes('--dry-run');
const shouldClear = args.includes('--clear');
const isVerbose = args.includes('--verbose');

// ============================================
// TYPES
// ============================================

interface TextChunk {
  content: string;
  title: string;
  sourceFile: string;
  collection: string;
  chunkIndex: number;
  totalChunks: number;
  metadata: {
    order?: number;
    tags?: string[];
    format?: string;
  };
}

interface ProcessingStats {
  filesFound: number;
  filesProcessed: number;
  chunksGenerated: number;
  embeddingsCreated: number;
  errors: string[];
  startTime: number;
}

// ============================================
// UTILITIES
// ============================================

function getArgValue(flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index !== -1 && args[index + 1]) {
    return args[index + 1];
  }
  return undefined;
}

function log(...messages: unknown[]) {
  console.log('[embed-library]', ...messages);
}

function verbose(...messages: unknown[]) {
  if (isVerbose) {
    console.log('[verbose]', ...messages);
  }
}

function error(...messages: unknown[]) {
  console.error('[ERROR]', ...messages);
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// MARKDOWN PROCESSING
// ============================================

/**
 * Extract title from markdown content.
 */
function extractTitle(content: string, filename: string): string {
  // Try to find first h1 header
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }

  // Try frontmatter title
  const frontmatterMatch = content.match(/^---[\s\S]*?title:\s*["']?([^"'\n]+)["']?[\s\S]*?---/m);
  if (frontmatterMatch) {
    return frontmatterMatch[1].trim();
  }

  // Fallback to filename
  return basename(filename, extname(filename))
    .replace(/[-_]/g, ' ')
    .replace(/^\d+\s*/, '')
    .trim();
}

/**
 * Extract frontmatter from markdown.
 */
function extractFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter: Record<string, unknown> = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          frontmatter[key] = JSON.parse(value);
        } catch {
          frontmatter[key] = value;
        }
      }
      // Parse booleans
      else if (value === 'true') {
        frontmatter[key] = true;
      } else if (value === 'false') {
        frontmatter[key] = false;
      }
      // Parse numbers
      else if (!isNaN(Number(value)) && value !== '') {
        frontmatter[key] = Number(value);
      }
      // String
      else {
        frontmatter[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  return frontmatter;
}

/**
 * Remove frontmatter from content.
 */
function removeFrontmatter(content: string): string {
  return content.replace(/^---\n[\s\S]*?\n---\n*/, '').trim();
}

/**
 * Chunk markdown content semantically.
 */
function chunkMarkdown(
  content: string,
  maxTokens: number = CHUNK_SIZE,
  overlap: number = CHUNK_OVERLAP
): string[] {
  const cleanContent = removeFrontmatter(content);
  const chunks: string[] = [];

  // Split by major sections (headers)
  const sections = cleanContent.split(/(?=^#{1,3}\s+)/m);

  let currentChunk = '';

  for (const section of sections) {
    const trimmedSection = section.trim();
    if (!trimmedSection) continue;

    const potential = currentChunk
      ? `${currentChunk}\n\n${trimmedSection}`
      : trimmedSection;

    if (estimateTokens(potential) <= maxTokens) {
      currentChunk = potential;
    } else {
      // Save current chunk
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }

      // Check if section itself is too long
      if (estimateTokens(trimmedSection) > maxTokens) {
        // Split section by paragraphs
        const paragraphs = trimmedSection.split(/\n\s*\n/);
        let paraChunk = '';

        for (const para of paragraphs) {
          const trimmedPara = para.trim();
          if (!trimmedPara) continue;

          const paraPotential = paraChunk
            ? `${paraChunk}\n\n${trimmedPara}`
            : trimmedPara;

          if (estimateTokens(paraPotential) <= maxTokens) {
            paraChunk = paraPotential;
          } else {
            if (paraChunk.trim()) {
              chunks.push(paraChunk.trim());
            }

            // If single paragraph exceeds limit, force split
            if (estimateTokens(trimmedPara) > maxTokens) {
              const maxChars = maxTokens * 4;
              for (let i = 0; i < trimmedPara.length; i += maxChars) {
                chunks.push(trimmedPara.slice(i, i + maxChars).trim());
              }
              paraChunk = '';
            } else {
              // Add overlap from previous chunk
              const overlapText = getOverlapText(paraChunk, overlap * 4);
              paraChunk = overlapText
                ? `${overlapText}\n\n${trimmedPara}`
                : trimmedPara;
            }
          }
        }

        if (paraChunk.trim()) {
          // Add overlap for next iteration
          const overlapText = getOverlapText(paraChunk, overlap * 4);
          currentChunk = overlapText || '';
          chunks.push(paraChunk.trim());
        } else {
          currentChunk = '';
        }
      } else {
        // Start new chunk with overlap
        const overlapText = getOverlapText(currentChunk, overlap * 4);
        currentChunk = overlapText
          ? `${overlapText}\n\n${trimmedSection}`
          : trimmedSection;
      }
    }
  }

  // Don't forget the last chunk
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter(c => c.length > 10); // Filter out tiny chunks
}

/**
 * Get overlap text from end of string.
 */
function getOverlapText(text: string, chars: number): string {
  if (!text || chars <= 0) return '';
  const lastPart = text.slice(-chars);
  const firstSpace = lastPart.indexOf(' ');
  return firstSpace > 0 ? lastPart.slice(firstSpace + 1) : lastPart;
}

// ============================================
// FILE DISCOVERY
// ============================================

/**
 * Find all markdown files in the book directory.
 */
async function discoverMarkdownFiles(
  collection?: string
): Promise<Array<{ path: string; collection: string }>> {
  const files: Array<{ path: string; collection: string }> = [];

  try {
    const collections = await readdir(BOOK_DIR);

    for (const collectionName of collections) {
      // Skip hidden files and non-directories
      if (collectionName.startsWith('.')) continue;

      // Filter by collection if specified
      if (collection && collectionName !== collection) continue;

      const collectionPath = join(BOOK_DIR, collectionName);

      try {
        const items = await readdir(collectionPath);

        for (const item of items) {
          if (item.endsWith('.md') && !item.startsWith('.')) {
            // Skip README files and CLAUDE.md files
            if (item === 'README.md' || item === 'CLAUDE.md') continue;

            files.push({
              path: join(collectionPath, item),
              collection: collectionName,
            });
          }
        }
      } catch (err) {
        // Collection path might not be a directory
        verbose(`Skipping ${collectionName}: not a directory`);
      }
    }
  } catch (err) {
    error(`Failed to read book directory: ${err}`);
  }

  return files;
}

// ============================================
// EMBEDDING GENERATION
// ============================================

class EmbeddingGenerator {
  private client: GoogleGenerativeAI;
  private model: string;

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = EMBEDDING_MODEL;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const model = this.client.getGenerativeModel({ model: this.model });

    const result = await model.embedContent({
      content: { parts: [{ text }], role: 'user' },
      taskType: TaskType.RETRIEVAL_DOCUMENT,
    });

    return result.embedding.values;
  }

  async generateBatchEmbeddings(
    texts: string[]
  ): Promise<Array<{ embedding: number[] | null; error?: string }>> {
    const results: Array<{ embedding: number[] | null; error?: string }> = [];

    for (const text of texts) {
      try {
        const embedding = await this.generateEmbedding(text);
        results.push({ embedding });
      } catch (err) {
        results.push({
          embedding: null,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    return results;
  }
}

// ============================================
// DATABASE OPERATIONS
// ============================================

class DatabaseClient {
  private supabase;

  constructor(url: string, serviceKey: string) {
    this.supabase = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });
  }

  async clearLibraryTexts(): Promise<number> {
    const { data, error } = await this.supabase
      .from('lore_fragments')
      .delete()
      .eq('category', 'library_text')
      .select('id');

    if (error) {
      throw new Error(`Failed to clear library texts: ${error.message}`);
    }

    return data?.length || 0;
  }

  async upsertFragment(fragment: {
    category: string;
    title: string;
    content: string;
    embedding: number[];
    source_file: string;
    tags: string[];
  }): Promise<void> {
    const { error } = await this.supabase.from('lore_fragments').upsert(
      {
        ...fragment,
        embedding: `[${fragment.embedding.join(',')}]`,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'source_file,title',
        ignoreDuplicates: false,
      }
    );

    if (error) {
      throw new Error(`Failed to upsert fragment: ${error.message}`);
    }
  }

  async countFragments(category: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('lore_fragments')
      .select('*', { count: 'exact', head: true })
      .eq('category', category);

    if (error) {
      throw new Error(`Failed to count fragments: ${error.message}`);
    }

    return count || 0;
  }
}

// ============================================
// MAIN PROCESSING
// ============================================

async function processFile(
  file: { path: string; collection: string },
  embedder: EmbeddingGenerator,
  db: DatabaseClient,
  stats: ProcessingStats
): Promise<void> {
  verbose(`Processing: ${file.path}`);

  try {
    const content = await readFile(file.path, 'utf-8');
    const title = extractTitle(content, file.path);
    const frontmatter = extractFrontmatter(content);

    // Extract tags from frontmatter or generate from collection
    const tags: string[] = [
      file.collection,
      ...(Array.isArray(frontmatter.tags) ? frontmatter.tags : []),
      ...(frontmatter.format ? [String(frontmatter.format)] : []),
    ].filter((t): t is string => typeof t === 'string');

    // Chunk the content
    const chunks = chunkMarkdown(content, CHUNK_SIZE, CHUNK_OVERLAP);
    stats.chunksGenerated += chunks.length;

    verbose(`  Found ${chunks.length} chunks in "${title}"`);

    if (isDryRun) {
      log(`[DRY RUN] Would process "${title}" with ${chunks.length} chunks`);
      return;
    }

    // Process chunks in batches
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      const batchResults = await embedder.generateBatchEmbeddings(batch);

      for (let j = 0; j < batch.length; j++) {
        const chunkIndex = i + j;
        const result = batchResults[j];

        if (result.embedding) {
          const fragmentTitle =
            chunks.length > 1
              ? `${title} [Part ${chunkIndex + 1}/${chunks.length}]`
              : title;

          await db.upsertFragment({
            category: 'library_text',
            title: fragmentTitle,
            content: batch[j],
            embedding: result.embedding,
            source_file: file.path.replace(process.cwd(), ''),
            tags: [...tags, `chunk_${chunkIndex + 1}_of_${chunks.length}`],
          });

          stats.embeddingsCreated++;
        } else {
          stats.errors.push(
            `Failed to embed chunk ${chunkIndex + 1} of "${title}": ${result.error}`
          );
        }
      }

      // Rate limiting
      if (i + BATCH_SIZE < chunks.length) {
        await delay(RATE_LIMIT_DELAY);
      }
    }

    stats.filesProcessed++;
    log(`  Completed: "${title}" (${chunks.length} chunks)`);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    stats.errors.push(`Failed to process ${file.path}: ${message}`);
    error(`Failed to process ${file.path}:`, message);
  }
}

async function main() {
  log('='.repeat(60));
  log('Arcanea Library Embedding Script');
  log('='.repeat(60));

  // Validate environment
  const geminiKey = process.env.GEMINI_API_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!geminiKey) {
    error('GEMINI_API_KEY environment variable is required');
    process.exit(1);
  }

  if (!supabaseUrl || !supabaseKey) {
    error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
    process.exit(1);
  }

  // Initialize clients
  const embedder = new EmbeddingGenerator(geminiKey);
  const db = new DatabaseClient(supabaseUrl, supabaseKey);

  // Initialize stats
  const stats: ProcessingStats = {
    filesFound: 0,
    filesProcessed: 0,
    chunksGenerated: 0,
    embeddingsCreated: 0,
    errors: [],
    startTime: Date.now(),
  };

  // Log configuration
  log('Configuration:');
  log(`  Book directory: ${BOOK_DIR}`);
  log(`  Target collection: ${targetCollection || 'all'}`);
  log(`  Chunk size: ${CHUNK_SIZE} tokens`);
  log(`  Chunk overlap: ${CHUNK_OVERLAP} tokens`);
  log(`  Dry run: ${isDryRun}`);
  log(`  Clear existing: ${shouldClear}`);
  log('');

  // Clear existing entries if requested
  if (shouldClear && !isDryRun) {
    log('Clearing existing library_text entries...');
    const deleted = await db.clearLibraryTexts();
    log(`  Deleted ${deleted} existing entries`);
  }

  // Discover files
  log('Discovering markdown files...');
  const files = await discoverMarkdownFiles(targetCollection);
  stats.filesFound = files.length;
  log(`  Found ${files.length} files to process`);
  log('');

  if (files.length === 0) {
    log('No files found. Exiting.');
    return;
  }

  // Process files
  log('Processing files...');
  log('-'.repeat(40));

  for (const file of files) {
    await processFile(file, embedder, db, stats);
  }

  // Report results
  const duration = ((Date.now() - stats.startTime) / 1000).toFixed(1);
  log('');
  log('='.repeat(60));
  log('PROCESSING COMPLETE');
  log('='.repeat(60));
  log(`  Files found: ${stats.filesFound}`);
  log(`  Files processed: ${stats.filesProcessed}`);
  log(`  Chunks generated: ${stats.chunksGenerated}`);
  log(`  Embeddings created: ${stats.embeddingsCreated}`);
  log(`  Errors: ${stats.errors.length}`);
  log(`  Duration: ${duration}s`);

  if (stats.errors.length > 0) {
    log('');
    log('Errors:');
    for (const err of stats.errors.slice(0, 10)) {
      log(`  - ${err}`);
    }
    if (stats.errors.length > 10) {
      log(`  ... and ${stats.errors.length - 10} more`);
    }
  }

  // Final count
  if (!isDryRun) {
    const totalFragments = await db.countFragments('library_text');
    log('');
    log(`Total library_text fragments in database: ${totalFragments}`);
  }
}

// Run
main().catch(err => {
  error('Fatal error:', err);
  process.exit(1);
});
