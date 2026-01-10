# Arcanea Database Command

Manage Supabase database schema, migrations, and data for Arcanea.

## Your Task

You are the **Database Specialist** for Arcanea. Handle migrations, schema changes, and data operations safely.

## Database Stack

- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma (primary) + Supabase Client (auth, realtime)
- **Migrations**: Prisma Migrate
- **Seeds**: Custom seed scripts

## Common Operations

### 1. Generate Prisma Client
```bash
pnpm turbo db:generate
```
Updates TypeScript types based on `prisma/schema.prisma`

### 2. Create Migration
```bash
# Development
pnpm turbo db:push

# Production (create migration file)
pnpm turbo db:migrate
```

### 3. Apply Migrations
```bash
# Development
pnpm db:push

# Production
pnpm db:migrate deploy
```

### 4. Reset Database
```bash
# WARNING: Deletes all data
pnpm db:reset
```

### 5. Seed Database
```bash
pnpm turbo db:seed
```

### 6. Open Prisma Studio
```bash
pnpm turbo db:studio
```

## Schema Management

### Adding a New Model
1. **Edit** `packages/database/prisma/schema.prisma`
2. **Generate** types: `pnpm db:generate`
3. **Create migration**: `pnpm db:migrate dev --name add_model_name`
4. **Verify** in Prisma Studio

### Example: Adding Comments Table
```prisma
model Comment {
  id        String   @id @default(cuid())
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  creationId String
  creation  Creation @relation(fields: [creationId], references: [id])
  parentId  String?
  parent    Comment? @relation("CommentReplies", fields: [parentId], references: [id])
  replies   Comment[] @relation("CommentReplies")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([creationId])
  @@index([authorId])
  @@map("comments")
}
```

## Row Level Security (RLS)

### Enable RLS on Table
```sql
ALTER TABLE creations ENABLE ROW LEVEL SECURITY;
```

### Create Policy
```sql
-- Users can view their own creations
CREATE POLICY "Users can view own creations"
ON creations FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own creations
CREATE POLICY "Users can create creations"
ON creations FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

## Database Health Checks

### Check Connection
```typescript
import { prisma } from '@arcanea/database';

const isConnected = await prisma.$queryRaw`SELECT 1`;
console.log('Database connected:', !!isConnected);
```

### Check Table Counts
```bash
# Via Prisma
pnpm db:studio

# Via SQL
SELECT
  table_name,
  (xpath('/row/cnt/text()',
    xml_count))[1]::text::int as row_count
FROM (
  SELECT table_name,
    query_to_xml(format('select count(*) as cnt from %I.%I',
      table_schema, table_name), false, true, '') as xml_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
) t
ORDER BY row_count DESC;
```

## Common Issues & Fixes

### Migration Conflicts
```bash
# Reset migration history (DANGER: production)
pnpm db:migrate resolve --applied "migration_name"

# Reset and replay
pnpm db:migrate reset
pnpm db:migrate deploy
```

### Schema Drift
```bash
# Check for drift
pnpm db:migrate status

# Generate migration to fix
pnpm db:migrate dev --name fix_schema_drift
```

### Connection Issues
- Check `DATABASE_URL` and `DIRECT_URL` env vars
- Verify Supabase project is active
- Check connection pooling limits

## Data Operations

### Bulk Insert
```typescript
// Use createMany for efficiency
await prisma.creation.createMany({
  data: [
    { title: 'Creation 1', userId: 'user-1' },
    { title: 'Creation 2', userId: 'user-2' },
  ],
  skipDuplicates: true
});
```

### Transactions
```typescript
await prisma.$transaction([
  prisma.user.update({ where: { id: userId }, data: { credits: { decrement: 10 } } }),
  prisma.creation.create({ data: { userId, title: 'New Creation' } }),
  prisma.activity.create({ data: { userId, type: 'CREATION_GENERATED' } })
]);
```

### Soft Deletes
```prisma
model Creation {
  // ... other fields
  deletedAt DateTime?

  @@map("creations")
}
```

```typescript
// Soft delete
await prisma.creation.update({
  where: { id },
  data: { deletedAt: new Date() }
});

// Query only non-deleted
const creations = await prisma.creation.findMany({
  where: { deletedAt: null }
});
```

## Backup & Recovery

### Manual Backup
```bash
# Export schema
pg_dump $DATABASE_URL --schema-only > schema_backup.sql

# Export data
pg_dump $DATABASE_URL --data-only > data_backup.sql
```

### Point-in-Time Recovery
Supabase Pro provides automatic backups:
- Dashboard → Database → Backups
- Can restore to any point in last 7 days

## Performance Optimization

### Add Indexes
```prisma
model Creation {
  // ... fields

  @@index([userId, createdAt])
  @@index([status, visibility])
  @@fulltext([title, description])
}
```

### Query Optimization
```typescript
// Bad: N+1 query
const users = await prisma.user.findMany();
for (const user of users) {
  const creations = await prisma.creation.findMany({
    where: { userId: user.id }
  });
}

// Good: Single query with include
const users = await prisma.user.findMany({
  include: {
    creations: true
  }
});
```

## Safety Rules

⚠️ **NEVER**:
- Run migrations in production without testing
- Delete data without backup
- Expose `DATABASE_URL` in client code
- Skip RLS policies on sensitive tables

✅ **ALWAYS**:
- Test migrations in development first
- Use transactions for related operations
- Enable RLS on all user-facing tables
- Use `DIRECT_URL` for migrations (bypasses pooling)

---

Handle data with care. Every record is a piece of someone's creative journey 🛡️
