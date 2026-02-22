/**
 * Living Library Pipeline
 *
 * A staging system for the Library of Arcanea where user-created content
 * is proposed, reviewed by Guardians, and — upon approval — accepted
 * into the canonical `/book/` collection hierarchy.
 *
 * The pipeline enforces the Arcanea creative philosophy:
 * every text that enters the Library must pass through the Gate
 * of at least three Guardians, each scoring for canon alignment
 * and voice fidelity before publication.
 *
 * @module @arcanea/os/library-pipeline
 *
 * @example
 * ```typescript
 * import { createLibraryPipeline } from '@arcanea/os/library-pipeline';
 *
 * const pipeline = createLibraryPipeline({ requiredReviews: 3 });
 *
 * const proposal = await pipeline.propose({
 *   title: 'The Weaver\'s Paradox',
 *   collection: 'parables-of-creation',
 *   content: '# The Weaver\'s Paradox\n\nIn the age before...',
 *   author: 'Kael Stormwright',
 *   element: 'wind',
 *   tags: ['parable', 'creation', 'weaving'],
 * });
 *
 * await pipeline.review(proposal.id, {
 *   guardian: 'lyria',
 *   verdict: 'approve',
 *   canonScore: 92,
 *   voiceScore: 88,
 *   comments: 'Strong mythic resonance. Voice aligns with the Library tone.',
 *   reviewedAt: Date.now(),
 * });
 * ```
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import type { GuardianName, GateName, Element } from '@arcanea/os';

// ============================================
// COLLECTION TYPE — every /book/ subfolder
// ============================================

/**
 * All recognized Library collection slugs.
 * Each maps to a subfolder under `/book/`.
 */
export type CollectionSlug =
  | 'academy-handbook'
  | 'atlas-of-territories'
  | 'bestiary-of-creation'
  | 'book-of-rituals'
  | 'book-of-shadows'
  | 'chronicles-of-luminors'
  | 'codex-of-collaboration'
  | 'codex-of-living-tools'
  | 'creator-principles'
  | 'dialogues-of-masters'
  | 'laws-of-arcanea'
  | 'legends-of-arcanea'
  | 'meditations-on-elements'
  | 'parables-of-creation'
  | 'poesie-of-freedom'
  | 'prompt-sages-grimoire'
  | 'prophecies'
  | 'songs-and-hymns'
  | 'tales-of-creators'
  | 'wisdom-scrolls';

// ============================================
// PROPOSAL STATUS
// ============================================

/**
 * Lifecycle states for a Library proposal.
 *
 * ```
 * pending → reviewing → approved → published
 *                    ↘ rejected
 * ```
 */
export type ProposalStatus =
  | 'pending'
  | 'reviewing'
  | 'approved'
  | 'rejected'
  | 'published';

// ============================================
// SUBMISSION
// ============================================

/**
 * A user's submission of new content for the Library of Arcanea.
 */
export interface LibrarySubmission {
  /** The display title of the proposed text. */
  title: string;

  /** Which `/book/` subfolder this text belongs to. */
  collection: CollectionSlug;

  /** The full markdown content of the proposed text. */
  content: string;

  /** The author's name or pseudonym. */
  author: string;

  /** Primary element affinity, if applicable. */
  element?: Element;

  /** Associated Gate, if applicable. */
  gate?: GateName;

  /** Free-form tags for discoverability. */
  tags: string[];
}

// ============================================
// GUARDIAN REVIEW
// ============================================

/**
 * A single Guardian's review of a proposed Library text.
 *
 * Guardians evaluate two dimensions:
 * - **canonScore** (0-100): Alignment with CANON_LOCKED.md
 * - **voiceScore** (0-100): Alignment with the Voice Bible
 */
export interface GuardianReview {
  /** Which Guardian performed this review. */
  guardian: GuardianName;

  /** The Guardian's verdict on the submission. */
  verdict: 'approve' | 'reject' | 'revise';

  /**
   * How well the submission aligns with canonical Arcanea truth.
   * 0 = completely off-canon, 100 = perfectly canonical.
   */
  canonScore: number;

  /**
   * How well the submission matches the Library voice.
   * 0 = wrong tone entirely, 100 = indistinguishable from existing texts.
   */
  voiceScore: number;

  /** The Guardian's detailed commentary and feedback. */
  comments: string;

  /** Unix timestamp (ms) when the review was completed. */
  reviewedAt: number;
}

// ============================================
// PROPOSAL RECORD
// ============================================

/**
 * The full record of a Library proposal, including its submission,
 * current status, and all Guardian reviews.
 */
export interface ProposalRecord {
  /** Unique identifier (UUID v4). */
  id: string;

  /** The original submission. */
  submission: LibrarySubmission;

  /** Current lifecycle status. */
  status: ProposalStatus;

  /** All Guardian reviews received so far. */
  reviews: GuardianReview[];

  /** Guardians assigned to review this proposal. */
  assignedGuardians: GuardianName[];

  /** Rejection reason, if status is 'rejected'. */
  rejectionReason?: string;

  /** Unix timestamp (ms) when the proposal was created. */
  createdAt: number;

  /** Unix timestamp (ms) of the most recent state change. */
  updatedAt: number;
}

// ============================================
// APPROVAL RESULT
// ============================================

/**
 * The result of checking whether a proposal has met
 * the approval threshold.
 */
export interface ApprovalResult {
  /** Whether the proposal meets the approval criteria. */
  approved: boolean;

  /** Fraction of reviews with 'approve' verdict (0.0 - 1.0). */
  approvalRate: number;

  /** The required approval fraction (e.g. 0.67). */
  requiredRate: number;

  /** All reviews considered in this evaluation. */
  reviews: GuardianReview[];
}

// ============================================
// PUBLISHED TEXT
// ============================================

/**
 * Metadata returned after a proposal is published
 * into the canonical Library.
 */
export interface PublishedText {
  /** The file path where the text was written (relative to project root). */
  path: string;

  /** The published title. */
  title: string;

  /** The collection it was published into. */
  collection: CollectionSlug;

  /** Unix timestamp (ms) of publication. */
  publishedAt: number;
}

// ============================================
// PIPELINE CONFIGURATION
// ============================================

/**
 * Configuration for the Library Pipeline.
 */
export interface PipelineConfig {
  /**
   * Minimum number of Guardian reviews required before
   * a proposal can be approved.
   * @default 3
   */
  requiredReviews: number;

  /**
   * Fraction of reviews that must have 'approve' verdict
   * for the proposal to pass (0.0 - 1.0).
   * @default 0.67
   */
  approvalThreshold: number;

  /**
   * Directory where proposal JSON files are persisted.
   * Relative to the project root.
   * @default '.arcanea/library-staging/'
   */
  storagePath: string;

  /**
   * Root path of the `/book/` directory where published
   * texts are written.
   * @default 'book/'
   */
  bookPath: string;

  /**
   * Absolute path to the project root. Used to resolve
   * storagePath and bookPath.
   */
  projectRoot: string;
}

// ============================================
// COLLECTION → GUARDIAN MAPPING
// ============================================

/**
 * Maps each Library collection to the Guardians who review
 * submissions for that collection.
 *
 * Assignments are based on thematic resonance:
 * - A Guardian's domain must overlap with the collection's subject matter.
 * - Shinkami (Source, 1111 Hz) reviews all foundational mythology.
 * - Three Guardians per collection ensures balanced perspective.
 */
export const COLLECTION_GUARDIAN_MAP: Record<CollectionSlug, [GuardianName, GuardianName, GuardianName]> = {
  // Founding myths — meta-consciousness, vision, enlightenment
  'legends-of-arcanea': ['shinkami', 'lyria', 'aiyami'],

  // Daily wisdom practice — enlightenment, love/healing, truth
  'wisdom-scrolls': ['aiyami', 'maylinn', 'alera'],

  // Complete Academy guide — foundation, power, partnership
  'academy-handbook': ['lyssandria', 'draconia', 'ino'],

  // Lyrics and hymns — creativity/emotion, truth/expression, love/healing
  'songs-and-hymns': ['leyla', 'alera', 'maylinn'],

  // Dark night wisdom — vision, perspective, meta-consciousness
  'book-of-shadows': ['lyria', 'elara', 'shinkami'],

  // Theoretical foundations — enlightenment, truth, foundation
  'laws-of-arcanea': ['aiyami', 'alera', 'lyssandria'],

  // Poetry for liberation — creativity, truth, perspective
  'poesie-of-freedom': ['leyla', 'alera', 'elara'],

  // Guardian struggles — power, partnership, meta-consciousness
  'chronicles-of-luminors': ['draconia', 'ino', 'shinkami'],

  // Teaching stories — vision, love, enlightenment
  'parables-of-creation': ['lyria', 'maylinn', 'aiyami'],

  // Legendary creators — perspective, creativity, power
  'tales-of-creators': ['elara', 'leyla', 'draconia'],

  // Sacred practices — foundation, love, enlightenment
  'book-of-rituals': ['lyssandria', 'maylinn', 'aiyami'],

  // Wisdom conversations — truth, vision, perspective
  'dialogues-of-masters': ['alera', 'lyria', 'elara'],

  // Future visions — vision, meta-consciousness, perspective
  'prophecies': ['lyria', 'shinkami', 'elara'],

  // Creative obstacles — power, love, foundation
  'bestiary-of-creation': ['draconia', 'maylinn', 'lyssandria'],

  // Five Elements practice — enlightenment, foundation, creativity
  'meditations-on-elements': ['aiyami', 'lyssandria', 'leyla'],

  // Creating together — partnership, love, truth
  'codex-of-collaboration': ['ino', 'maylinn', 'alera'],

  // Creative landscapes — vision, foundation, perspective
  'atlas-of-territories': ['lyria', 'lyssandria', 'elara'],

  // AI tool wisdom — partnership, truth, meta-consciousness
  'codex-of-living-tools': ['ino', 'alera', 'shinkami'],

  // Creator axioms — enlightenment, power, truth
  'creator-principles': ['aiyami', 'draconia', 'alera'],

  // Prompt craft — truth, vision, partnership
  'prompt-sages-grimoire': ['alera', 'lyria', 'ino'],
};

// ============================================
// DEFAULT CONFIG
// ============================================

const DEFAULT_CONFIG: PipelineConfig = {
  requiredReviews: 3,
  approvalThreshold: 0.67,
  storagePath: '.arcanea/library-staging/',
  bookPath: 'book/',
  projectRoot: process.cwd(),
};

// ============================================
// LIBRARY PIPELINE
// ============================================

/**
 * The Living Library Pipeline.
 *
 * Manages the full lifecycle of user-submitted content
 * from proposal through Guardian review to publication
 * in the canonical Library of Arcanea.
 *
 * All state is persisted as individual JSON files in the
 * staging directory, making the pipeline stateless between
 * invocations and safe for concurrent access.
 *
 * @example
 * ```typescript
 * const pipeline = new LibraryPipeline({
 *   requiredReviews: 3,
 *   approvalThreshold: 0.67,
 *   projectRoot: '/path/to/arcanea',
 * });
 *
 * const proposal = await pipeline.propose({
 *   title: 'The Forge of Beginning',
 *   collection: 'parables-of-creation',
 *   content: '# The Forge of Beginning\n\n...',
 *   author: 'Kael',
 *   tags: ['forge', 'creation'],
 * });
 * ```
 */
export class LibraryPipeline {
  private readonly config: PipelineConfig;
  private readonly stagingDir: string;
  private readonly bookDir: string;

  constructor(config?: Partial<PipelineConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.stagingDir = resolve(this.config.projectRoot, this.config.storagePath);
    this.bookDir = resolve(this.config.projectRoot, this.config.bookPath);
    this.ensureStagingDir();
  }

  // ------------------------------------------
  // PUBLIC API
  // ------------------------------------------

  /**
   * Submit new content for review by the Guardian council.
   *
   * Creates a ProposalRecord in 'pending' status and auto-assigns
   * Guardians based on the target collection.
   *
   * @param submission - The content submission.
   * @returns The newly created proposal record.
   * @throws If the collection is not recognized.
   */
  async propose(submission: LibrarySubmission): Promise<ProposalRecord> {
    this.validateSubmission(submission);

    const assignedGuardians = COLLECTION_GUARDIAN_MAP[submission.collection];
    if (!assignedGuardians) {
      throw new Error(
        `Unknown collection "${submission.collection}". ` +
        `Valid collections: ${Object.keys(COLLECTION_GUARDIAN_MAP).join(', ')}`
      );
    }

    const now = Date.now();
    const record: ProposalRecord = {
      id: randomUUID(),
      submission,
      status: 'pending',
      reviews: [],
      assignedGuardians: [...assignedGuardians],
      createdAt: now,
      updatedAt: now,
    };

    this.saveProposal(record);
    return record;
  }

  /**
   * Submit a Guardian's review for a pending or in-review proposal.
   *
   * Transitions the proposal from 'pending' to 'reviewing' on the
   * first review. A Guardian may only review a proposal once.
   *
   * @param proposalId - The UUID of the proposal to review.
   * @param review - The Guardian's review.
   * @throws If the proposal does not exist, is not reviewable,
   *         or the Guardian has already reviewed it.
   */
  async review(proposalId: string, review: GuardianReview): Promise<void> {
    const record = this.loadProposal(proposalId);
    if (!record) {
      throw new Error(`Proposal "${proposalId}" not found.`);
    }

    if (record.status !== 'pending' && record.status !== 'reviewing') {
      throw new Error(
        `Proposal "${proposalId}" is in status "${record.status}" and cannot be reviewed.`
      );
    }

    // Prevent duplicate reviews from the same Guardian
    const existingReview = record.reviews.find(r => r.guardian === review.guardian);
    if (existingReview) {
      throw new Error(
        `Guardian "${review.guardian}" has already reviewed proposal "${proposalId}".`
      );
    }

    // Validate score ranges
    this.validateScores(review);

    record.reviews.push(review);
    record.status = 'reviewing';
    record.updatedAt = Date.now();

    this.saveProposal(record);
  }

  /**
   * Evaluate whether a proposal has received enough approvals
   * to pass the threshold.
   *
   * This does NOT change the proposal's status — call this to
   * check readiness, then use `publish()` to finalize.
   *
   * @param proposalId - The UUID of the proposal to evaluate.
   * @returns The approval evaluation result.
   * @throws If the proposal does not exist.
   */
  async approve(proposalId: string): Promise<ApprovalResult> {
    const record = this.loadProposal(proposalId);
    if (!record) {
      throw new Error(`Proposal "${proposalId}" not found.`);
    }

    const totalReviews = record.reviews.length;
    const approvals = record.reviews.filter(r => r.verdict === 'approve').length;
    const approvalRate = totalReviews > 0 ? approvals / totalReviews : 0;

    const meetsThreshold = approvalRate >= this.config.approvalThreshold;
    const hasEnoughReviews = totalReviews >= this.config.requiredReviews;
    const approved = meetsThreshold && hasEnoughReviews;

    // Transition status if criteria met
    if (approved && record.status === 'reviewing') {
      record.status = 'approved';
      record.updatedAt = Date.now();
      this.saveProposal(record);
    }

    return {
      approved,
      approvalRate,
      requiredRate: this.config.approvalThreshold,
      reviews: [...record.reviews],
    };
  }

  /**
   * Publish an approved proposal into the canonical Library.
   *
   * Writes the markdown content to the appropriate `/book/` collection
   * directory and transitions the proposal to 'published'.
   *
   * @param proposalId - The UUID of the approved proposal.
   * @returns Metadata about the published text.
   * @throws If the proposal is not in 'approved' status.
   */
  async publish(proposalId: string): Promise<PublishedText> {
    const record = this.loadProposal(proposalId);
    if (!record) {
      throw new Error(`Proposal "${proposalId}" not found.`);
    }

    if (record.status !== 'approved') {
      throw new Error(
        `Proposal "${proposalId}" must be in "approved" status to publish. ` +
        `Current status: "${record.status}".`
      );
    }

    const publishedAt = Date.now();
    const filePath = this.generatePublishPath(record);

    // Ensure the collection directory exists
    const collectionDir = resolve(this.bookDir, record.submission.collection);
    if (!existsSync(collectionDir)) {
      mkdirSync(collectionDir, { recursive: true });
    }

    // Build the final markdown with frontmatter-style header
    const publishedContent = this.buildPublishedContent(record, publishedAt);

    // Write to the Library
    const absolutePath = resolve(this.bookDir, filePath);
    writeFileSync(absolutePath, publishedContent, 'utf-8');

    // Update proposal status
    record.status = 'published';
    record.updatedAt = publishedAt;
    this.saveProposal(record);

    return {
      path: `book/${filePath}`,
      title: record.submission.title,
      collection: record.submission.collection,
      publishedAt,
    };
  }

  /**
   * Reject a proposal with a reason.
   *
   * Transitions the proposal to 'rejected' and records the feedback.
   *
   * @param proposalId - The UUID of the proposal to reject.
   * @param reason - Explanation of why the proposal was rejected.
   * @throws If the proposal does not exist or is already published.
   */
  async reject(proposalId: string, reason: string): Promise<void> {
    const record = this.loadProposal(proposalId);
    if (!record) {
      throw new Error(`Proposal "${proposalId}" not found.`);
    }

    if (record.status === 'published') {
      throw new Error(`Cannot reject a published proposal ("${proposalId}").`);
    }

    if (record.status === 'rejected') {
      throw new Error(`Proposal "${proposalId}" is already rejected.`);
    }

    record.status = 'rejected';
    record.rejectionReason = reason;
    record.updatedAt = Date.now();

    this.saveProposal(record);
  }

  /**
   * List all proposals in 'pending' or 'reviewing' status.
   *
   * @returns Array of pending proposal records, sorted by creation date (oldest first).
   */
  listPending(): ProposalRecord[] {
    return this.loadAllProposals()
      .filter(p => p.status === 'pending' || p.status === 'reviewing')
      .sort((a, b) => a.createdAt - b.createdAt);
  }

  /**
   * List all proposals in 'approved' status (not yet published).
   *
   * @returns Array of approved proposal records, sorted by approval date.
   */
  listApproved(): ProposalRecord[] {
    return this.loadAllProposals()
      .filter(p => p.status === 'approved')
      .sort((a, b) => a.updatedAt - b.updatedAt);
  }

  /**
   * Retrieve a single proposal by ID.
   *
   * @param id - The UUID of the proposal.
   * @returns The proposal record, or undefined if not found.
   */
  getProposal(id: string): ProposalRecord | undefined {
    return this.loadProposal(id) ?? undefined;
  }

  // ------------------------------------------
  // PRIVATE — VALIDATION
  // ------------------------------------------

  /**
   * Validates a submission has all required fields with meaningful content.
   */
  private validateSubmission(submission: LibrarySubmission): void {
    if (!submission.title || submission.title.trim().length === 0) {
      throw new Error('Submission title is required.');
    }
    if (!submission.collection) {
      throw new Error('Submission collection is required.');
    }
    if (!submission.content || submission.content.trim().length === 0) {
      throw new Error('Submission content is required.');
    }
    if (!submission.author || submission.author.trim().length === 0) {
      throw new Error('Submission author is required.');
    }
    if (!Array.isArray(submission.tags)) {
      throw new Error('Submission tags must be an array.');
    }
  }

  /**
   * Validates that review scores are within the 0-100 range.
   */
  private validateScores(review: GuardianReview): void {
    if (review.canonScore < 0 || review.canonScore > 100) {
      throw new Error(`canonScore must be 0-100, received ${review.canonScore}.`);
    }
    if (review.voiceScore < 0 || review.voiceScore > 100) {
      throw new Error(`voiceScore must be 0-100, received ${review.voiceScore}.`);
    }
  }

  // ------------------------------------------
  // PRIVATE — FILE PERSISTENCE
  // ------------------------------------------

  /**
   * Creates the staging directory if it does not exist.
   */
  private ensureStagingDir(): void {
    if (!existsSync(this.stagingDir)) {
      mkdirSync(this.stagingDir, { recursive: true });
    }
  }

  /**
   * Returns the file path for a proposal's JSON file.
   */
  private proposalPath(id: string): string {
    return join(this.stagingDir, `${id}.json`);
  }

  /**
   * Persists a proposal record to disk.
   */
  private saveProposal(record: ProposalRecord): void {
    const filePath = this.proposalPath(record.id);
    writeFileSync(filePath, JSON.stringify(record, null, 2), 'utf-8');
  }

  /**
   * Loads a proposal record from disk, or returns null if not found.
   */
  private loadProposal(id: string): ProposalRecord | null {
    const filePath = this.proposalPath(id);
    if (!existsSync(filePath)) {
      return null;
    }
    const raw = readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as ProposalRecord;
  }

  /**
   * Loads all proposal records from the staging directory.
   */
  private loadAllProposals(): ProposalRecord[] {
    if (!existsSync(this.stagingDir)) {
      return [];
    }

    const files = readdirSync(this.stagingDir).filter(f => f.endsWith('.json'));
    const proposals: ProposalRecord[] = [];

    for (const file of files) {
      try {
        const raw = readFileSync(join(this.stagingDir, file), 'utf-8');
        proposals.push(JSON.parse(raw) as ProposalRecord);
      } catch {
        // Skip malformed files silently — they may be hand-edited
        // or from a future schema version
      }
    }

    return proposals;
  }

  // ------------------------------------------
  // PRIVATE — PUBLISHING
  // ------------------------------------------

  /**
   * Generates the relative file path for a published text.
   *
   * Uses the collection directory and a slugified title.
   * If an existing file count can be determined, the new file
   * is numbered sequentially (e.g., `IX_THE_WEAVERS_PARADOX.md`).
   *
   * @returns Relative path from the book root (e.g., `parables-of-creation/IX_THE_WEAVERS_PARADOX.md`).
   */
  private generatePublishPath(record: ProposalRecord): string {
    const { collection, title } = record.submission;
    const collectionDir = resolve(this.bookDir, collection);

    // Count existing files to determine the next number
    let nextNumber = 1;
    if (existsSync(collectionDir)) {
      const existing = readdirSync(collectionDir).filter(
        f => f.endsWith('.md') && f !== 'README.md'
      );
      nextNumber = existing.length + 1;
    }

    const roman = this.toRomanNumeral(nextNumber);
    const slug = this.slugify(title);

    return `${collection}/${roman}_${slug}.md`;
  }

  /**
   * Builds the final markdown content with metadata header.
   */
  private buildPublishedContent(record: ProposalRecord, publishedAt: number): string {
    const { submission } = record;
    const date = new Date(publishedAt).toISOString().split('T')[0];

    // Build metadata comment block (non-intrusive, parseable)
    const meta = [
      `<!-- Arcanea Library Pipeline -->`,
      `<!-- Title: ${submission.title} -->`,
      `<!-- Collection: ${submission.collection} -->`,
      `<!-- Author: ${submission.author} -->`,
      `<!-- Published: ${date} -->`,
      `<!-- ProposalID: ${record.id} -->`,
      submission.element ? `<!-- Element: ${submission.element} -->` : null,
      submission.gate ? `<!-- Gate: ${submission.gate} -->` : null,
      submission.tags.length > 0 ? `<!-- Tags: ${submission.tags.join(', ')} -->` : null,
      `<!-- Reviews: ${record.reviews.length} | Avg Canon: ${this.avgScore(record.reviews, 'canonScore')} | Avg Voice: ${this.avgScore(record.reviews, 'voiceScore')} -->`,
      ``,
    ].filter(Boolean).join('\n');

    return `${meta}\n${submission.content}\n`;
  }

  /**
   * Calculates the average of a numeric score field across reviews.
   */
  private avgScore(reviews: GuardianReview[], field: 'canonScore' | 'voiceScore'): number {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r[field], 0);
    return Math.round(sum / reviews.length);
  }

  /**
   * Converts a positive integer to a Roman numeral string.
   * Used for Library numbering conventions (I, II, III, IV, ...).
   */
  private toRomanNumeral(num: number): string {
    if (num <= 0 || num > 3999) return String(num);

    const lookup: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'],
      [1, 'I'],
    ];

    let result = '';
    let remaining = num;
    for (const [value, symbol] of lookup) {
      while (remaining >= value) {
        result += symbol;
        remaining -= value;
      }
    }
    return result;
  }

  /**
   * Converts a title to an uppercase snake-case slug.
   * "The Weaver's Paradox" → "THE_WEAVERS_PARADOX"
   */
  private slugify(title: string): string {
    return title
      .toUpperCase()
      .replace(/['']/g, '')           // Remove apostrophes
      .replace(/[^A-Z0-9]+/g, '_')   // Non-alnum → underscore
      .replace(/^_|_$/g, '')          // Trim leading/trailing
      .replace(/_+/g, '_');           // Collapse multiples
  }
}

// ============================================
// FACTORY
// ============================================

/**
 * Creates a new LibraryPipeline instance with optional configuration.
 *
 * This is the recommended entry point for consumers who do not
 * need to extend the class.
 *
 * @param config - Partial configuration; unset fields use defaults.
 * @returns A configured LibraryPipeline instance.
 *
 * @example
 * ```typescript
 * import { createLibraryPipeline } from '@arcanea/os/library-pipeline';
 *
 * // Use all defaults
 * const pipeline = createLibraryPipeline();
 *
 * // Custom threshold — require unanimous approval
 * const strict = createLibraryPipeline({
 *   approvalThreshold: 1.0,
 *   requiredReviews: 5,
 * });
 * ```
 */
export function createLibraryPipeline(config?: Partial<PipelineConfig>): LibraryPipeline {
  return new LibraryPipeline(config);
}
