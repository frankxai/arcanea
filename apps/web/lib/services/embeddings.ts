/**
 * Arcanea Embedding Service
 *
 * Core embedding generation service using Google Gemini Text Embedding 004.
 * Provides text embedding generation, batch processing, and intelligent chunking.
 *
 * Model: text-embedding-004 (768 dimensions)
 * Context: Up to 2048 tokens per chunk
 *
 * @module lib/services/embeddings
 */

import { GoogleGenerativeAI, TaskType } from '@google/generative-ai';

// ============================================
// TYPES
// ============================================

export interface EmbeddingResult {
  embedding: number[];
  tokensUsed: number;
}

export interface BatchEmbeddingResult {
  embeddings: number[][];
  totalTokens: number;
  successCount: number;
  failedIndices: number[];
}

export interface ChunkMetadata {
  index: number;
  startChar: number;
  endChar: number;
  tokenEstimate: number;
}

export interface TextChunk {
  content: string;
  metadata: ChunkMetadata;
}

export interface EmbeddingServiceConfig {
  apiKey?: string;
  modelName?: string;
  maxRetries?: number;
  retryDelayMs?: number;
  batchSize?: number;
}

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_MODEL = 'text-embedding-004';
const EMBEDDING_DIMENSION = 768;
const MAX_TOKENS_PER_CHUNK = 2048;
const CHARS_PER_TOKEN_ESTIMATE = 4; // Conservative estimate
const DEFAULT_BATCH_SIZE = 100; // Gemini supports batches
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RETRY_DELAY_MS = 1000;

// Semantic boundaries for intelligent chunking
const SECTION_MARKERS = [
  /^#{1,6}\s+/m,           // Markdown headers
  /^---+$/m,               // Horizontal rules
  /^\*{3,}$/m,             // Asterisk dividers
  /^={3,}$/m,              // Equal dividers
  /^>\s*$/m,               // Blockquote ends
];

const PARAGRAPH_BREAK = /\n\s*\n/;
const SENTENCE_END = /(?<=[.!?])\s+(?=[A-Z])/;

// ============================================
// EMBEDDING SERVICE CLASS
// ============================================

export class EmbeddingService {
  private client: GoogleGenerativeAI;
  private modelName: string;
  private maxRetries: number;
  private retryDelayMs: number;
  private batchSize: number;

  constructor(config: EmbeddingServiceConfig = {}) {
    const apiKey = config.apiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY is required. Set it in environment variables or pass in config.'
      );
    }

    this.client = new GoogleGenerativeAI(apiKey);
    this.modelName = config.modelName || DEFAULT_MODEL;
    this.maxRetries = config.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.retryDelayMs = config.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;
    this.batchSize = config.batchSize ?? DEFAULT_BATCH_SIZE;
  }

  /**
   * Generate embedding for a single text string.
   *
   * @param text - Text to embed (will be chunked if too long)
   * @param taskType - The type of task (affects embedding optimization)
   * @returns Embedding vector (768 dimensions) and token count
   */
  async generateEmbedding(
    text: string,
    taskType: TaskType = TaskType.RETRIEVAL_DOCUMENT
  ): Promise<EmbeddingResult> {
    if (!text || text.trim().length === 0) {
      throw new Error('Text cannot be empty');
    }

    // If text is too long, we need to chunk and average
    const estimatedTokens = this.estimateTokens(text);
    if (estimatedTokens > MAX_TOKENS_PER_CHUNK) {
      return this.generateChunkedEmbedding(text, taskType);
    }

    const model = this.client.getGenerativeModel({ model: this.modelName });

    let lastError: Error | null = null;
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const result = await model.embedContent({
          content: { parts: [{ text }], role: 'user' },
          taskType,
        });

        const embedding = result.embedding.values;

        if (embedding.length !== EMBEDDING_DIMENSION) {
          throw new Error(
            `Unexpected embedding dimension: ${embedding.length} (expected ${EMBEDDING_DIMENSION})`
          );
        }

        return {
          embedding,
          tokensUsed: estimatedTokens,
        };
      } catch (error) {
        lastError = error as Error;
        console.error(`Embedding attempt ${attempt + 1} failed:`, error);

        if (attempt < this.maxRetries - 1) {
          await this.delay(this.retryDelayMs * Math.pow(2, attempt));
        }
      }
    }

    throw new Error(`Failed to generate embedding after ${this.maxRetries} attempts: ${lastError?.message}`);
  }

  /**
   * Generate embeddings for multiple texts in batch.
   * More efficient than calling generateEmbedding multiple times.
   *
   * @param texts - Array of texts to embed
   * @param taskType - The type of task
   * @returns Array of embedding vectors and metadata
   */
  async batchEmbeddings(
    texts: string[],
    taskType: TaskType = TaskType.RETRIEVAL_DOCUMENT
  ): Promise<BatchEmbeddingResult> {
    if (!texts || texts.length === 0) {
      return {
        embeddings: [],
        totalTokens: 0,
        successCount: 0,
        failedIndices: [],
      };
    }

    const embeddings: number[][] = new Array(texts.length).fill(null);
    const failedIndices: number[] = [];
    let totalTokens = 0;

    // Process in batches
    for (let i = 0; i < texts.length; i += this.batchSize) {
      const batchTexts = texts.slice(i, Math.min(i + this.batchSize, texts.length));
      const batchIndices = batchTexts.map((_, idx) => i + idx);

      // Process batch items (Gemini doesn't have true batch API, so parallel processing)
      const results = await Promise.allSettled(
        batchTexts.map((text, idx) =>
          this.generateEmbedding(text, taskType)
            .then(result => ({ idx: batchIndices[idx], result }))
        )
      );

      for (const result of results) {
        if (result.status === 'fulfilled') {
          const { idx, result: embeddingResult } = result.value;
          embeddings[idx] = embeddingResult.embedding;
          totalTokens += embeddingResult.tokensUsed;
        } else {
          // Extract the index from the error context
          const match = results.indexOf(result);
          if (match !== -1) {
            failedIndices.push(batchIndices[match]);
          }
          console.error('Batch embedding failed:', result.reason);
        }
      }

      // Rate limiting between batches
      if (i + this.batchSize < texts.length) {
        await this.delay(100); // Small delay between batches
      }
    }

    return {
      embeddings: embeddings.filter(e => e !== null),
      totalTokens,
      successCount: texts.length - failedIndices.length,
      failedIndices,
    };
  }

  /**
   * Intelligently chunk text into semantically meaningful segments.
   * Respects markdown structure, paragraphs, and sentences.
   *
   * @param content - Full text content to chunk
   * @param maxTokens - Maximum tokens per chunk (default: 500 for good retrieval)
   * @param overlap - Token overlap between chunks (default: 50)
   * @returns Array of text chunks with metadata
   */
  chunkText(
    content: string,
    maxTokens: number = 500,
    overlap: number = 50
  ): TextChunk[] {
    if (!content || content.trim().length === 0) {
      return [];
    }

    const chunks: TextChunk[] = [];
    const maxChars = maxTokens * CHARS_PER_TOKEN_ESTIMATE;
    const overlapChars = overlap * CHARS_PER_TOKEN_ESTIMATE;

    // First, split by major sections (headers, dividers)
    const sections = this.splitBySections(content);

    let globalCharIndex = 0;

    for (const section of sections) {
      if (this.estimateTokens(section) <= maxTokens) {
        // Section fits in one chunk
        chunks.push({
          content: section.trim(),
          metadata: {
            index: chunks.length,
            startChar: globalCharIndex,
            endChar: globalCharIndex + section.length,
            tokenEstimate: this.estimateTokens(section),
          },
        });
        globalCharIndex += section.length;
        continue;
      }

      // Section too large, split by paragraphs
      const paragraphs = section.split(PARAGRAPH_BREAK);
      let currentChunk = '';
      let chunkStartChar = globalCharIndex;

      for (const paragraph of paragraphs) {
        const trimmedParagraph = paragraph.trim();
        if (!trimmedParagraph) {
          globalCharIndex += paragraph.length + 2; // +2 for \n\n
          continue;
        }

        const potentialChunk = currentChunk
          ? `${currentChunk}\n\n${trimmedParagraph}`
          : trimmedParagraph;

        if (this.estimateTokens(potentialChunk) <= maxTokens) {
          currentChunk = potentialChunk;
        } else {
          // Save current chunk if it exists
          if (currentChunk) {
            chunks.push({
              content: currentChunk.trim(),
              metadata: {
                index: chunks.length,
                startChar: chunkStartChar,
                endChar: globalCharIndex,
                tokenEstimate: this.estimateTokens(currentChunk),
              },
            });
          }

          // Check if paragraph itself is too long
          if (this.estimateTokens(trimmedParagraph) > maxTokens) {
            // Split paragraph by sentences
            const sentenceChunks = this.splitBySentences(
              trimmedParagraph,
              maxTokens
            );
            for (const sentenceChunk of sentenceChunks) {
              chunks.push({
                content: sentenceChunk.trim(),
                metadata: {
                  index: chunks.length,
                  startChar: globalCharIndex,
                  endChar: globalCharIndex + sentenceChunk.length,
                  tokenEstimate: this.estimateTokens(sentenceChunk),
                },
              });
            }
            currentChunk = '';
          } else {
            // Start new chunk with overlap from previous
            const overlapText = this.getOverlapText(currentChunk, overlapChars);
            currentChunk = overlapText
              ? `${overlapText}\n\n${trimmedParagraph}`
              : trimmedParagraph;
          }
          chunkStartChar = globalCharIndex;
        }
        globalCharIndex += paragraph.length + 2;
      }

      // Don't forget the last chunk
      if (currentChunk.trim()) {
        chunks.push({
          content: currentChunk.trim(),
          metadata: {
            index: chunks.length,
            startChar: chunkStartChar,
            endChar: globalCharIndex,
            tokenEstimate: this.estimateTokens(currentChunk),
          },
        });
      }
    }

    return chunks.filter(c => c.content.length > 0);
  }

  /**
   * Estimate token count from text (conservative estimate).
   */
  estimateTokens(text: string): number {
    if (!text) return 0;
    // Gemini tokenizer is similar to others: ~4 chars per token
    // We use a slightly more conservative estimate
    return Math.ceil(text.length / CHARS_PER_TOKEN_ESTIMATE);
  }

  /**
   * Get the embedding dimension for this model.
   */
  getDimension(): number {
    return EMBEDDING_DIMENSION;
  }

  // ============================================
  // PRIVATE METHODS
  // ============================================

  /**
   * Generate embedding for text that exceeds token limit by chunking and averaging.
   */
  private async generateChunkedEmbedding(
    text: string,
    taskType: TaskType
  ): Promise<EmbeddingResult> {
    const chunks = this.chunkText(text, MAX_TOKENS_PER_CHUNK - 100); // Leave buffer

    if (chunks.length === 0) {
      throw new Error('Text resulted in no valid chunks');
    }

    const results = await this.batchEmbeddings(
      chunks.map(c => c.content),
      taskType
    );

    if (results.successCount === 0) {
      throw new Error('Failed to generate embeddings for all chunks');
    }

    // Average the embeddings (weighted by token count could be better)
    const avgEmbedding = this.averageEmbeddings(results.embeddings);

    return {
      embedding: avgEmbedding,
      tokensUsed: results.totalTokens,
    };
  }

  /**
   * Average multiple embeddings into one.
   */
  private averageEmbeddings(embeddings: number[][]): number[] {
    if (embeddings.length === 0) {
      throw new Error('Cannot average empty embeddings array');
    }

    if (embeddings.length === 1) {
      return embeddings[0];
    }

    const dimension = embeddings[0].length;
    const avg = new Array(dimension).fill(0);

    for (const embedding of embeddings) {
      for (let i = 0; i < dimension; i++) {
        avg[i] += embedding[i];
      }
    }

    // Normalize: divide by count and L2 normalize
    const count = embeddings.length;
    let norm = 0;
    for (let i = 0; i < dimension; i++) {
      avg[i] /= count;
      norm += avg[i] * avg[i];
    }
    norm = Math.sqrt(norm);

    if (norm > 0) {
      for (let i = 0; i < dimension; i++) {
        avg[i] /= norm;
      }
    }

    return avg;
  }

  /**
   * Split content by major sections (headers, dividers).
   */
  private splitBySections(content: string): string[] {
    const sections: string[] = [];
    let currentSection = '';
    const lines = content.split('\n');

    for (const line of lines) {
      const isMarker = SECTION_MARKERS.some(marker => marker.test(line));

      if (isMarker && currentSection.trim()) {
        sections.push(currentSection);
        currentSection = line + '\n';
      } else {
        currentSection += line + '\n';
      }
    }

    if (currentSection.trim()) {
      sections.push(currentSection);
    }

    return sections;
  }

  /**
   * Split paragraph by sentences when it's too long.
   */
  private splitBySentences(paragraph: string, maxTokens: number): string[] {
    const sentences = paragraph.split(SENTENCE_END);
    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (!trimmedSentence) continue;

      const potential = currentChunk
        ? `${currentChunk} ${trimmedSentence}`
        : trimmedSentence;

      if (this.estimateTokens(potential) <= maxTokens) {
        currentChunk = potential;
      } else {
        if (currentChunk) {
          chunks.push(currentChunk);
        }
        // If single sentence exceeds limit, force split by characters
        if (this.estimateTokens(trimmedSentence) > maxTokens) {
          const maxChars = maxTokens * CHARS_PER_TOKEN_ESTIMATE;
          for (let i = 0; i < trimmedSentence.length; i += maxChars) {
            chunks.push(trimmedSentence.slice(i, i + maxChars));
          }
          currentChunk = '';
        } else {
          currentChunk = trimmedSentence;
        }
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }

  /**
   * Get overlap text from the end of a chunk.
   */
  private getOverlapText(text: string, overlapChars: number): string {
    if (!text || overlapChars <= 0) return '';

    const lastPart = text.slice(-overlapChars);
    // Try to start at a word boundary
    const firstSpace = lastPart.indexOf(' ');
    return firstSpace > 0 ? lastPart.slice(firstSpace + 1) : lastPart;
  }

  /**
   * Delay helper for rate limiting and retries.
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

let embeddingServiceInstance: EmbeddingService | null = null;

/**
 * Get the singleton embedding service instance.
 * Lazily initialized on first call.
 */
export function getEmbeddingService(config?: EmbeddingServiceConfig): EmbeddingService {
  if (!embeddingServiceInstance) {
    embeddingServiceInstance = new EmbeddingService(config);
  }
  return embeddingServiceInstance;
}

// ============================================
// CONVENIENCE FUNCTIONS
// ============================================

/**
 * Generate embedding for a single text (convenience function).
 */
export async function generateEmbedding(
  text: string,
  taskType: TaskType = TaskType.RETRIEVAL_DOCUMENT
): Promise<number[]> {
  const service = getEmbeddingService();
  const result = await service.generateEmbedding(text, taskType);
  return result.embedding;
}

/**
 * Generate embeddings for multiple texts (convenience function).
 */
export async function batchEmbeddings(
  texts: string[],
  taskType: TaskType = TaskType.RETRIEVAL_DOCUMENT
): Promise<number[][]> {
  const service = getEmbeddingService();
  const result = await service.batchEmbeddings(texts, taskType);
  return result.embeddings;
}

/**
 * Chunk text into semantically meaningful segments (convenience function).
 */
export function chunkText(
  content: string,
  maxTokens: number = 500,
  overlap: number = 50
): string[] {
  const service = getEmbeddingService();
  return service.chunkText(content, maxTokens, overlap).map(c => c.content);
}

// Re-export TaskType for convenience
export { TaskType };
