# @arcanea/security

Security layer for the Arcanea Intelligence OS.

## Install

```bash
npm install @arcanea/security
```

## Usage

```js
const { SecurityContext, authorize } = require('@arcanea/security');

const ctx = new SecurityContext({
  guardian: 'aegis',
  permissions: ['read', 'write', 'execute']
});

// Authorize an action against the security context
const result = await authorize(ctx, {
  action: 'write',
  resource: '/vault/artifacts'
});

if (result.granted) {
  // proceed
}
```

## API

| Export | Description |
|---|---|
| `SecurityContext` | Encapsulates identity, permissions, and scope |
| `authorize` | Checks an action against a security context |
| `createToken` | Issues a signed token for inter-service auth |
| `verifyToken` | Validates and decodes a token |
| `RateLimiter` | Configurable rate limiter for API endpoints |
| `AuditLog` | Append-only audit trail for security events |

## License

MIT
