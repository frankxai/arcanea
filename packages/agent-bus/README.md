# @arcanea/agent-bus

Agent-to-agent communication bus for the Arcanea Intelligence OS — request-response messaging, pub-sub, and delivery guarantees.

## Install

```bash
npm install @arcanea/agent-bus
```

## Usage

```js
import { AgentBus } from '@arcanea/agent-bus';

const bus = new AgentBus();

// Subscribe to a topic
bus.subscribe('task.created', (msg) => {
  console.log(`${msg.from} created task:`, msg.payload);
});

// Send a direct message
await bus.send('agent-a', 'agent-b', 'task.created', { task: 'build' });

// Publish to all subscribers
await bus.publish('orchestrator', 'guardian.activated', { id: 'shinkami' });

// Request-response pattern
bus.subscribe('ping', async (msg) => {
  await bus.reply(msg, { pong: true });
});
const response = await bus.request('client', 'server', 'ping', { data: 1 });
```

## Features

- **Direct messaging** — send to specific agents
- **Request-response** — with correlation IDs and timeouts
- **Pub-sub** — topic-based with wildcard matching (`guardian.*`, `task.**`)
- **Middleware pipeline** — intercept, transform, and log messages
- **Dead letter queue** — track failed deliveries
- **Priority levels** — critical, high, normal, low
- **Message TTL** — automatic expiry
- **Statistics** — delivery counts, latency tracking

## API

| Export | Description |
|---|---|
| `AgentBus` | Main communication bus class |

### Topic Matching

- `guardian.shinkami` — exact match
- `guardian.*` — single-level wildcard
- `task.**` — multi-level wildcard

## License

MIT
