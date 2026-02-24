import { EventEmitter } from 'node:events';
import { randomUUID } from 'node:crypto';
import type {
  Message,
  MessageId,
  CorrelationId,
  Topic,
  Priority,
  SendOptions,
  SubscribeOptions,
  Subscription,
  MessageHandler,
  Middleware,
  DeadLetter,
  BusConfig,
  BusStats,
} from './types.js';

const PRIORITY_ORDER: Record<Priority, number> = {
  critical: 0,
  high: 1,
  normal: 2,
  low: 3,
};

function topicMatches(pattern: string, topic: string): boolean {
  // Exact match
  if (pattern === topic) return true;
  // Wildcard matching: "guardian.*" matches "guardian.shinkami" but not "guardian.shinkami.task"
  // "guardian.**" matches "guardian.shinkami" and "guardian.shinkami.task"
  const patternParts = pattern.split('.');
  const topicParts = topic.split('.');

  let pi = 0;
  let ti = 0;
  while (pi < patternParts.length && ti < topicParts.length) {
    if (patternParts[pi] === '**') return true; // matches everything after
    if (patternParts[pi] === '*') {
      pi++;
      ti++;
      continue;
    }
    if (patternParts[pi] !== topicParts[ti]) return false;
    pi++;
    ti++;
  }
  return pi === patternParts.length && ti === topicParts.length;
}

/**
 * AgentBus — communication backbone for agent-to-agent messaging.
 *
 * Supports:
 * - Direct messaging (send to specific agent)
 * - Request-response with correlation IDs
 * - Pub-sub with topic-based filtering
 * - Middleware pipeline
 * - Dead letter queue for failed deliveries
 * - Message TTL and expiry
 */
export class AgentBus extends EventEmitter {
  private subscriptions = new Map<string, Subscription>();
  private topicIndex = new Map<Topic, Set<string>>();
  private pendingRequests = new Map<CorrelationId, {
    resolve: (msg: Message) => void;
    reject: (err: Error) => void;
    timer: ReturnType<typeof setTimeout>;
  }>();
  private middlewares: Middleware[] = [];
  private deadLetters: DeadLetter[] = [];
  private history: Message[] = [];
  private stats: BusStats = {
    totalSent: 0,
    totalDelivered: 0,
    totalFailed: 0,
    totalExpired: 0,
    activeSubscriptions: 0,
    deadLetterCount: 0,
    inFlightCount: 0,
    avgDeliveryMs: 0,
  };
  private deliveryTimes: number[] = [];
  private config: Required<BusConfig>;

  constructor(config: BusConfig = {}) {
    super();
    this.config = {
      maxDeadLetters: config.maxDeadLetters ?? 1000,
      defaultTtl: config.defaultTtl ?? 30_000,
      defaultTimeout: config.defaultTimeout ?? 10_000,
      maxInFlight: config.maxInFlight ?? 10_000,
      trackHistory: config.trackHistory ?? false,
      maxHistory: config.maxHistory ?? 5000,
    };
  }

  /**
   * Send a message to a specific agent or topic.
   */
  async send<T = unknown>(
    from: string,
    to: string,
    topic: Topic,
    payload: T,
    options: SendOptions = {}
  ): Promise<MessageId> {
    const message: Message<T> = {
      id: randomUUID(),
      from,
      to,
      type: 'event',
      topic,
      payload,
      priority: options.priority ?? 'normal',
      timestamp: Date.now(),
      ttl: options.ttl ?? this.config.defaultTtl,
      metadata: options.metadata,
    };

    await this.processMiddleware(message as Message);
    this.deliver(message as Message);
    return message.id;
  }

  /**
   * Send a request and wait for a response (request-response pattern).
   */
  async request<TReq = unknown, TRes = unknown>(
    from: string,
    to: string,
    topic: Topic,
    payload: TReq,
    options: SendOptions = {}
  ): Promise<Message<TRes>> {
    const correlationId = randomUUID();
    const timeout = options.timeout ?? this.config.defaultTimeout;

    const message: Message<TReq> = {
      id: randomUUID(),
      from,
      to,
      type: 'request',
      topic,
      payload,
      correlationId,
      priority: options.priority ?? 'normal',
      timestamp: Date.now(),
      ttl: options.ttl ?? this.config.defaultTtl,
      metadata: options.metadata,
    };

    return new Promise<Message<TRes>>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pendingRequests.delete(correlationId);
        this.stats.inFlightCount = Math.max(0, this.stats.inFlightCount - 1);
        reject(new Error(`Request timeout after ${timeout}ms: ${topic}`));
      }, timeout);

      this.pendingRequests.set(correlationId, {
        resolve: resolve as (msg: Message) => void,
        reject,
        timer,
      });
      this.stats.inFlightCount++;

      this.processMiddleware(message as Message)
        .then(() => this.deliver(message as Message))
        .catch((err) => {
          clearTimeout(timer);
          this.pendingRequests.delete(correlationId);
          this.stats.inFlightCount = Math.max(0, this.stats.inFlightCount - 1);
          reject(err);
        });
    });
  }

  /**
   * Reply to a request message.
   */
  async reply<T = unknown>(
    originalMessage: Message,
    payload: T,
    options: SendOptions = {}
  ): Promise<MessageId> {
    if (!originalMessage.correlationId) {
      throw new Error('Cannot reply to a message without a correlationId');
    }

    const response: Message<T> = {
      id: randomUUID(),
      from: originalMessage.to,
      to: originalMessage.from,
      type: 'response',
      topic: originalMessage.topic,
      payload,
      correlationId: originalMessage.correlationId,
      priority: options.priority ?? originalMessage.priority,
      timestamp: Date.now(),
      ttl: options.ttl ?? this.config.defaultTtl,
      metadata: options.metadata,
    };

    await this.processMiddleware(response as Message);
    this.deliver(response as Message);
    return response.id;
  }

  /**
   * Publish an event to all subscribers of a topic.
   */
  async publish<T = unknown>(
    from: string,
    topic: Topic,
    payload: T,
    options: SendOptions = {}
  ): Promise<MessageId> {
    const message: Message<T> = {
      id: randomUUID(),
      from,
      to: '*', // broadcast
      type: 'event',
      topic,
      payload,
      priority: options.priority ?? 'normal',
      timestamp: Date.now(),
      ttl: options.ttl ?? this.config.defaultTtl,
      metadata: options.metadata,
    };

    await this.processMiddleware(message as Message);
    this.deliver(message as Message);
    return message.id;
  }

  /**
   * Subscribe to messages on a topic.
   */
  subscribe<T = unknown>(
    topic: Topic,
    handler: MessageHandler<T>,
    options: SubscribeOptions = {}
  ): string {
    const id = randomUUID();
    const subscription: Subscription = {
      id,
      topic,
      handler: handler as MessageHandler,
      options,
      messageCount: 0,
      createdAt: Date.now(),
    };

    this.subscriptions.set(id, subscription);

    // Index by topic for fast lookup
    if (!this.topicIndex.has(topic)) {
      this.topicIndex.set(topic, new Set());
    }
    this.topicIndex.get(topic)!.add(id);

    this.stats.activeSubscriptions = this.subscriptions.size;
    this.emit('subscription:added', subscription);
    return id;
  }

  /**
   * Unsubscribe from a topic.
   */
  unsubscribe(subscriptionId: string): boolean {
    const sub = this.subscriptions.get(subscriptionId);
    if (!sub) return false;

    this.subscriptions.delete(subscriptionId);
    this.topicIndex.get(sub.topic)?.delete(subscriptionId);

    this.stats.activeSubscriptions = this.subscriptions.size;
    this.emit('subscription:removed', { id: subscriptionId, topic: sub.topic });
    return true;
  }

  /**
   * Add middleware to the message pipeline.
   * Middleware executes in order for every message.
   */
  use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  /**
   * Get dead letter queue entries.
   */
  getDeadLetters(): readonly DeadLetter[] {
    return this.deadLetters;
  }

  /**
   * Clear the dead letter queue.
   */
  clearDeadLetters(): number {
    const count = this.deadLetters.length;
    this.deadLetters = [];
    this.stats.deadLetterCount = 0;
    return count;
  }

  /**
   * Get message history (if tracking enabled).
   */
  getHistory(): readonly Message[] {
    return this.history;
  }

  /**
   * Get bus statistics.
   */
  getStats(): Readonly<BusStats> {
    return { ...this.stats };
  }

  /**
   * Destroy the bus, cleaning up all resources.
   */
  destroy(): void {
    for (const [, pending] of this.pendingRequests) {
      clearTimeout(pending.timer);
      pending.reject(new Error('Bus destroyed'));
    }
    this.pendingRequests.clear();
    this.subscriptions.clear();
    this.topicIndex.clear();
    this.middlewares = [];
    this.deadLetters = [];
    this.history = [];
    this.stats.activeSubscriptions = 0;
    this.stats.deadLetterCount = 0;
    this.stats.inFlightCount = 0;
    this.removeAllListeners();
  }

  // --- Internal ---

  private async processMiddleware(message: Message): Promise<void> {
    let index = 0;
    const next = async (): Promise<void> => {
      if (index < this.middlewares.length) {
        const mw = this.middlewares[index++]!;
        await mw(message, next);
      }
    };
    await next();
  }

  private deliver(message: Message): void {
    const startTime = Date.now();

    // Check TTL
    if (message.ttl && Date.now() - message.timestamp > message.ttl) {
      this.stats.totalExpired++;
      this.emit('message:expired', message);
      return;
    }

    // Track history
    if (this.config.trackHistory) {
      this.history.push(message);
      if (this.history.length > this.config.maxHistory) {
        this.history.shift();
      }
    }

    this.stats.totalSent++;
    this.emit('message:sent', message);

    // Handle response messages (complete pending requests)
    if (message.type === 'response' && message.correlationId) {
      const pending = this.pendingRequests.get(message.correlationId);
      if (pending) {
        clearTimeout(pending.timer);
        this.pendingRequests.delete(message.correlationId);
        this.stats.inFlightCount = Math.max(0, this.stats.inFlightCount - 1);
        pending.resolve(message);
        this.recordDelivery(startTime);
        return;
      }
    }

    // Find matching subscriptions
    const delivered = this.deliverToSubscriptions(message, startTime);

    if (!delivered && message.to !== '*') {
      this.addDeadLetter(message, 'No matching subscription');
    }
  }

  private deliverToSubscriptions(message: Message, startTime: number): boolean {
    let delivered = false;

    for (const [subId, sub] of this.subscriptions) {
      if (!this.subscriptionMatches(sub, message)) continue;

      try {
        const result = sub.handler(message);
        if (result instanceof Promise) {
          result.catch((err) => {
            this.addDeadLetter(message, `Handler error: ${(err as Error).message}`);
          });
        }
        sub.messageCount++;
        delivered = true;
        this.stats.totalDelivered++;
        this.emit('message:delivered', message);
        this.recordDelivery(startTime);

        // Auto-unsubscribe after maxMessages
        if (sub.options.maxMessages && sub.messageCount >= sub.options.maxMessages) {
          this.unsubscribe(subId);
        }
      } catch (err) {
        this.stats.totalFailed++;
        const reason = `Handler error: ${(err as Error).message}`;
        this.emit('message:failed', { message, reason });
        this.addDeadLetter(message, reason);
      }
    }

    return delivered;
  }

  private subscriptionMatches(sub: Subscription, message: Message): boolean {
    // Check topic match
    if (!topicMatches(sub.topic, message.topic)) {
      // Also check filter pattern
      if (sub.options.filter && topicMatches(sub.options.filter, message.topic)) {
        // filter matches, continue
      } else {
        return false;
      }
    }

    // Check sender filter
    if (sub.options.fromAgents && !sub.options.fromAgents.includes(message.from)) {
      return false;
    }

    // Check priority threshold
    if (sub.options.minPriority) {
      if (PRIORITY_ORDER[message.priority] > PRIORITY_ORDER[sub.options.minPriority]) {
        return false;
      }
    }

    return true;
  }

  private addDeadLetter(message: Message, reason: string): void {
    const existing = this.deadLetters.find((dl) => dl.message.id === message.id);
    if (existing) {
      existing.attempts++;
      existing.reason = reason;
      return;
    }

    const entry: DeadLetter = {
      message,
      reason,
      failedAt: Date.now(),
      attempts: 1,
    };

    this.deadLetters.push(entry);
    if (this.deadLetters.length > this.config.maxDeadLetters) {
      this.deadLetters.shift();
    }
    this.stats.deadLetterCount = this.deadLetters.length;
    this.emit('deadletter:added', entry);
  }

  private recordDelivery(startTime: number): void {
    const duration = Date.now() - startTime;
    this.deliveryTimes.push(duration);
    if (this.deliveryTimes.length > 1000) this.deliveryTimes.shift();
    this.stats.avgDeliveryMs =
      this.deliveryTimes.reduce((a, b) => a + b, 0) / this.deliveryTimes.length;
  }
}
