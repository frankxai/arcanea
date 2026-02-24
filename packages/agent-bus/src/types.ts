/** Unique message identifier */
export type MessageId = string;

/** Unique correlation identifier for request-response pairs */
export type CorrelationId = string;

/** Topic string for pub-sub (supports dot-notation: "guardian.shinkami.task") */
export type Topic = string;

/** Message priority levels */
export type Priority = 'critical' | 'high' | 'normal' | 'low';

/** Message delivery status */
export type DeliveryStatus = 'pending' | 'delivered' | 'acknowledged' | 'failed' | 'expired';

/** Core message envelope */
export interface Message<T = unknown> {
  id: MessageId;
  from: string;
  to: string;
  type: 'request' | 'response' | 'event' | 'command';
  topic: Topic;
  payload: T;
  correlationId?: CorrelationId;
  priority: Priority;
  timestamp: number;
  ttl?: number;
  metadata?: Record<string, unknown>;
}

/** Options for sending a message */
export interface SendOptions {
  priority?: Priority;
  ttl?: number;
  timeout?: number;
  metadata?: Record<string, unknown>;
}

/** Options for subscribing to topics */
export interface SubscribeOptions {
  /** Glob-style topic filter (e.g., "guardian.*", "task.**.complete") */
  filter?: string;
  /** Only receive messages from specific senders */
  fromAgents?: string[];
  /** Maximum messages to receive before auto-unsubscribing */
  maxMessages?: number;
  /** Priority threshold — only receive messages at or above this priority */
  minPriority?: Priority;
}

/** Subscription handle */
export interface Subscription {
  id: string;
  topic: Topic;
  handler: MessageHandler;
  options: SubscribeOptions;
  messageCount: number;
  createdAt: number;
}

/** Message handler function */
export type MessageHandler<T = unknown> = (message: Message<T>) => void | Promise<void>;

/** Middleware function for message pipeline */
export type Middleware = (
  message: Message,
  next: () => Promise<void>
) => Promise<void>;

/** Dead letter entry for failed deliveries */
export interface DeadLetter {
  message: Message;
  reason: string;
  failedAt: number;
  attempts: number;
}

/** Bus configuration */
export interface BusConfig {
  /** Maximum messages in the dead letter queue */
  maxDeadLetters?: number;
  /** Default message TTL in milliseconds */
  defaultTtl?: number;
  /** Default request timeout in milliseconds */
  defaultTimeout?: number;
  /** Maximum in-flight messages */
  maxInFlight?: number;
  /** Enable message history tracking */
  trackHistory?: boolean;
  /** Maximum history entries */
  maxHistory?: number;
}

/** Bus statistics */
export interface BusStats {
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  totalExpired: number;
  activeSubscriptions: number;
  deadLetterCount: number;
  inFlightCount: number;
  avgDeliveryMs: number;
}

/** Event types emitted by the bus */
export interface BusEvents {
  'message:sent': Message;
  'message:delivered': Message;
  'message:failed': { message: Message; reason: string };
  'message:expired': Message;
  'subscription:added': Subscription;
  'subscription:removed': { id: string; topic: Topic };
  'deadletter:added': DeadLetter;
}
