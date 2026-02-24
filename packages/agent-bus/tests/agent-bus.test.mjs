import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { AgentBus } from '../dist/index.js';

describe('AgentBus', () => {
  let bus;

  beforeEach(() => {
    bus = new AgentBus({ trackHistory: true });
  });

  describe('send()', () => {
    it('should deliver a message to a subscriber', async () => {
      let received = null;
      bus.subscribe('task.created', (msg) => {
        received = msg;
      });

      await bus.send('agent-a', 'agent-b', 'task.created', { task: 'build' });

      assert.ok(received);
      assert.equal(received.from, 'agent-a');
      assert.equal(received.to, 'agent-b');
      assert.equal(received.topic, 'task.created');
      assert.deepEqual(received.payload, { task: 'build' });
    });

    it('should return a message ID', async () => {
      bus.subscribe('test', () => {});
      const id = await bus.send('a', 'b', 'test', {});
      assert.ok(id);
      assert.equal(typeof id, 'string');
    });
  });

  describe('publish()', () => {
    it('should broadcast to all matching subscribers', async () => {
      const received = [];
      bus.subscribe('events.deploy', (msg) => received.push('sub1'));
      bus.subscribe('events.deploy', (msg) => received.push('sub2'));

      await bus.publish('deployer', 'events.deploy', { version: '1.0' });

      assert.equal(received.length, 2);
      assert.ok(received.includes('sub1'));
      assert.ok(received.includes('sub2'));
    });
  });

  describe('request() / reply()', () => {
    it('should complete a request-response cycle', async () => {
      bus.subscribe('ping', async (msg) => {
        await bus.reply(msg, { pong: true });
      });

      const response = await bus.request('client', 'server', 'ping', { data: 1 });

      assert.ok(response);
      assert.deepEqual(response.payload, { pong: true });
      assert.equal(response.type, 'response');
    });

    it('should timeout on unanswered request', async () => {
      await assert.rejects(
        () => bus.request('a', 'b', 'no-one-listening', {}, { timeout: 50 }),
        /timeout/i
      );
    });
  });

  describe('topic matching', () => {
    it('should match wildcard topics', async () => {
      let received = false;
      bus.subscribe('guardian.*', (msg) => { received = true; });

      await bus.publish('sys', 'guardian.shinkami', { action: 'activate' });
      assert.ok(received);
    });

    it('should match double-wildcard topics', async () => {
      let received = false;
      bus.subscribe('task.**', (msg) => { received = true; });

      await bus.publish('sys', 'task.build.complete', { ok: true });
      assert.ok(received);
    });

    it('should not match non-matching topics', async () => {
      let received = false;
      bus.subscribe('guardian.shinkami', (msg) => { received = true; });

      await bus.publish('sys', 'guardian.leyla', {});
      assert.ok(!received);
    });
  });

  describe('subscribe options', () => {
    it('should filter by sender', async () => {
      let received = false;
      bus.subscribe('events', () => { received = true; }, {
        fromAgents: ['trusted-agent'],
      });

      await bus.publish('untrusted', 'events', {});
      assert.ok(!received);

      await bus.publish('trusted-agent', 'events', {});
      assert.ok(received);
    });

    it('should auto-unsubscribe after maxMessages', async () => {
      let count = 0;
      bus.subscribe('tick', () => { count++; }, { maxMessages: 3 });

      for (let i = 0; i < 5; i++) {
        await bus.publish('sys', 'tick', { i });
      }

      assert.equal(count, 3);
    });

    it('should filter by minimum priority', async () => {
      let received = false;
      bus.subscribe('alerts', () => { received = true; }, {
        minPriority: 'high',
      });

      await bus.send('sys', 'ops', 'alerts', {}, { priority: 'low' });
      assert.ok(!received);

      await bus.send('sys', 'ops', 'alerts', {}, { priority: 'critical' });
      assert.ok(received);
    });
  });

  describe('middleware', () => {
    it('should execute middleware before delivery', async () => {
      const log = [];
      bus.use(async (msg, next) => {
        log.push('before');
        await next();
        log.push('after');
      });

      bus.subscribe('test', () => { log.push('handler'); });
      await bus.send('a', 'b', 'test', {});

      // Middleware wraps the middleware chain; handler runs during deliver() after next() completes
      assert.deepEqual(log, ['before', 'after', 'handler']);
    });
  });

  describe('dead letters', () => {
    it('should add to dead letter queue when no subscriber', async () => {
      await bus.send('a', 'b', 'no-one-listening', {});

      const deadLetters = bus.getDeadLetters();
      assert.equal(deadLetters.length, 1);
      assert.equal(deadLetters[0].reason, 'No matching subscription');
    });
  });

  describe('stats', () => {
    it('should track message statistics', async () => {
      bus.subscribe('counted', () => {});
      await bus.send('a', 'b', 'counted', {});
      await bus.send('a', 'b', 'counted', {});

      const stats = bus.getStats();
      assert.equal(stats.totalSent, 2);
      assert.equal(stats.totalDelivered, 2);
      assert.equal(stats.activeSubscriptions, 1);
    });
  });

  describe('history', () => {
    it('should track message history when enabled', async () => {
      bus.subscribe('tracked', () => {});
      await bus.send('a', 'b', 'tracked', { n: 1 });
      await bus.send('a', 'b', 'tracked', { n: 2 });

      const history = bus.getHistory();
      assert.equal(history.length, 2);
    });
  });

  describe('destroy()', () => {
    it('should clean up all resources', () => {
      bus.subscribe('test', () => {});
      bus.destroy();

      const stats = bus.getStats();
      assert.equal(stats.activeSubscriptions, 0);
    });
  });
});
