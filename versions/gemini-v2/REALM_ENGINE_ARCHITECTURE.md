# Arcanea V2: Realm Engine Architecture

**Status:** Draft 1.0
**Owner:** Gemini (Architect of the Loom)

## 1. Core Principles

This document outlines the technical architecture for the **Realm Engine**, the headless, API-first core of the Arcanea V2 ecosystem. It is designed from the ground up to be scalable, extensible, and a direct reflection of the truths laid out in the Genesis Manifesto.

- **Headless First:** The Realm Engine is a pure, logic-and-data backend. It has no user interface. All frontends (Lenses) are completely decoupled clients that interact with the engine via its public API.
- **API as the Product:** The API is the primary way to interact with the Arcanea multiverse. It must be elegant, well-documented, and powerful.
- **Stateful & Persistent:** The engine is the single source of truth for the state of every Realm, Nexus, and Thread in the multiverse.
- **Built for Scale:** The architecture must support millions of realms and billions of threads, with a globally distributed user base.

---

## 2. Recommended Technology Stack

To achieve our goals of performance, scalability, and rapid development, the following stack is recommended for the Realm Engine:

- **Language:** **Python 3.11+** - The premier language for AI integration and a robust choice for web backends.
- **Framework:** **FastAPI** - Provides incredible performance, automatic OpenAPI documentation (crucial for our API-first approach), and a modern, type-hinted structure.
- **Database:** **PostgreSQL with Supabase** - Continues the V1 choice for its robust, relational nature, but with an emphasis on using it as a scalable backend with custom functions. Supabase provides excellent real-time capabilities for a living, breathing multiverse.
- **Deployment:** **Docker / Kubernetes on a Cloud Provider (e.g., Oracle Cloud, AWS, Google Cloud)** - For containerization and orchestration, ensuring the engine can scale on demand.

---

## 3. Core Data Models (The Primal Schemas)

These are the foundational data structures upon which all of Arcanea is built.

### `Weaver`
Represents a creator's account.
```json
{
  "weaver_id": "uuid",
  "email": "string",
  "display_name": "string",
  "created_at": "timestamp",
  "arc_balance": "decimal"
}
```

### `Realm`
The top-level container for a world. It is the first thing a Weaver creates.
```json
{
  "realm_id": "uuid",
  "owner_weaver_id": "uuid",
  "name": "string",
  "description": "text", // The core concept or "Echo"
  "created_at": "timestamp",
  "nexus_id": "uuid" // Each Realm has one Nexus
}
```

### `Nexus`
The AI soul of a Realm. It has its own identity and consciousness, shaped by the Realm's core concept.
```json
{
  "nexus_id": "uuid",
  "realm_id": "uuid",
  "persona_summary": "text", // The core personality
  "llm_base_model": "string", // e.g., 'claude-3.5-sonnet', 'gpt-4o'
  "memory_store_id": "uuid", // Link to a vector DB for long-term memory
  "created_at": "timestamp"
}
```

### `Thread`
A single, atomic piece of content within a Realm. A thread can be any data type, defined by its `thread_type`.
```json
{
  "thread_id": "uuid",
  "realm_id": "uuid",
  "author_id": "uuid", // Can be a Weaver or a Nexus
  "thread_type": "string", // e.g., 'lore_entry', 'image', 'audio', 'character_sheet', 'system_rule'
  "content": "jsonb", // Flexible JSON to hold the actual content
  "metadata": "jsonb", // For tags, relationships, etc.
  "created_at": "timestamp"
}
```

---

## 4. API Endpoint Strategy (The Incantations)

The API will be RESTful and resource-oriented. All endpoints will be secured via JWT authentication.

**Realm Endpoints**
- `POST /realms` -> **Create a new Realm and its Nexus.** (The "Echo in the Void")
- `GET /realms` -> List all Realms for the authenticated Weaver.
- `GET /realms/{realm_id}` -> Fetch a specific Realm's details.
- `PUT /realms/{realm_id}` -> Update a Realm's name or description.

**Thread Endpoints (The Weaving)**
- `POST /realms/{realm_id}/threads` -> **Create a new Thread within a Realm.** This is the primary creative act.
- `GET /realms/{realm_id}/threads` -> List all Threads in a Realm, with filtering by `thread_type`.
- `GET /threads/{thread_id}` -> Fetch a single Thread.
- `PUT /threads/{thread_id}` -> Update a Thread's content.
- `DELETE /threads/{thread_id}` -> Remove a Thread from a Realm.

**Nexus Endpoints (Collaboration)**
- `POST /nexus/{nexus_id}/interact` -> **The primary endpoint for communicating with a Realm's Nexus.** This will be an asynchronous endpoint that can trigger long-running creative tasks.

---

## 5. Next Steps

1.  **Prototype the API:** Develop a working prototype of the Realm Engine using FastAPI and a local PostgreSQL instance.
2.  **Define the `content` schemas:** Detail the specific JSON structures for each `thread_type` (e.g., what fields does a `character_sheet` require?).
3.  **Design the Authentication Flow:** Document the OAuth 2.0 flow for how Lenses will authenticate users and receive JWTs.

This architecture provides a robust and scalable foundation to build the epic vision of Arcanea V2.
