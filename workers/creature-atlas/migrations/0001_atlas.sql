PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS atlas_entities (
 id TEXT PRIMARY KEY, name TEXT NOT NULL, kind TEXT NOT NULL,
 world TEXT NOT NULL, canon_state TEXT NOT NULL,
 visibility TEXT NOT NULL CHECK(visibility IN ('private','restricted','shareable','public')),
 publication_status TEXT NOT NULL, summary TEXT NOT NULL,
 tags_json TEXT NOT NULL CHECK(json_valid(tags_json)), verification TEXT NOT NULL,
 record_json TEXT NOT NULL CHECK(json_valid(record_json)), updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS atlas_entities_kind ON atlas_entities(kind,visibility,publication_status);
CREATE VIRTUAL TABLE IF NOT EXISTS atlas_fts USING fts5(entity_id UNINDEXED, name, summary, tags);
CREATE TRIGGER IF NOT EXISTS atlas_fts_insert AFTER INSERT ON atlas_entities BEGIN
 INSERT INTO atlas_fts(entity_id,name,summary,tags) VALUES(new.id,new.name,new.summary,new.tags_json);
END;
CREATE TRIGGER IF NOT EXISTS atlas_fts_update AFTER UPDATE ON atlas_entities BEGIN
 DELETE FROM atlas_fts WHERE entity_id=old.id;
 INSERT INTO atlas_fts(entity_id,name,summary,tags) VALUES(new.id,new.name,new.summary,new.tags_json);
END;
CREATE TRIGGER IF NOT EXISTS atlas_fts_delete AFTER DELETE ON atlas_entities BEGIN
 DELETE FROM atlas_fts WHERE entity_id=old.id;
END;
CREATE TABLE IF NOT EXISTS atlas_sources (
 id TEXT PRIMARY KEY, entity_id TEXT NOT NULL REFERENCES atlas_entities(id), url TEXT,
 retrieval_status TEXT NOT NULL, observed_at TEXT NOT NULL,
 record_json TEXT NOT NULL CHECK(json_valid(record_json))
);
CREATE INDEX IF NOT EXISTS atlas_sources_entity ON atlas_sources(entity_id);
CREATE TABLE IF NOT EXISTS atlas_relationships (
 id TEXT PRIMARY KEY, subject_id TEXT NOT NULL REFERENCES atlas_entities(id), predicate TEXT NOT NULL,
 object_id TEXT NOT NULL REFERENCES atlas_entities(id), evidence_id TEXT REFERENCES atlas_sources(id),
 status TEXT NOT NULL, record_json TEXT NOT NULL CHECK(json_valid(record_json))
);
CREATE TABLE IF NOT EXISTS atlas_assets (
 id TEXT PRIMARY KEY, entity_id TEXT NOT NULL REFERENCES atlas_entities(id), sha256 TEXT NOT NULL,
 r2_key TEXT NOT NULL, bucket TEXT NOT NULL, state TEXT NOT NULL,
 allow_store INTEGER NOT NULL DEFAULT 0 CHECK(allow_store IN (0,1)),
 allow_analyze INTEGER NOT NULL DEFAULT 0 CHECK(allow_analyze IN (0,1)),
 allow_embed INTEGER NOT NULL DEFAULT 0 CHECK(allow_embed IN (0,1)),
 allow_display_public INTEGER NOT NULL DEFAULT 0 CHECK(allow_display_public IN (0,1)),
 allow_generate_from INTEGER NOT NULL DEFAULT 0 CHECK(allow_generate_from IN (0,1)),
 allow_train INTEGER NOT NULL DEFAULT 0 CHECK(allow_train IN (0,1)),
 reviewer TEXT, reviewed_at TEXT, expires_at TEXT, rights_evidence TEXT NOT NULL,
 record_json TEXT NOT NULL CHECK(json_valid(record_json))
);
CREATE INDEX IF NOT EXISTS atlas_assets_hash ON atlas_assets(sha256);
CREATE TABLE IF NOT EXISTS atlas_claims (
 id TEXT PRIMARY KEY, entity_id TEXT NOT NULL REFERENCES atlas_entities(id), predicate TEXT NOT NULL,
 value_json TEXT NOT NULL CHECK(json_valid(value_json)), evidence_id TEXT REFERENCES atlas_sources(id),
 epistemic_state TEXT NOT NULL CHECK(epistemic_state IN ('source','inference','proposal','disputed','rejected')),
 asserted_by TEXT NOT NULL, observed_at TEXT NOT NULL, valid_from TEXT, valid_to TEXT
);
CREATE TABLE IF NOT EXISTS atlas_events (
 id TEXT PRIMARY KEY, entity_id TEXT NOT NULL REFERENCES atlas_entities(id), event_type TEXT NOT NULL,
 observed_at TEXT NOT NULL, event_sha256 TEXT NOT NULL, previous_event_sha256 TEXT,
 record_json TEXT NOT NULL CHECK(json_valid(record_json))
);
CREATE TRIGGER IF NOT EXISTS atlas_events_no_update BEFORE UPDATE ON atlas_events BEGIN
 SELECT RAISE(ABORT,'provenance events are append-only; append a correction');
END;
CREATE TRIGGER IF NOT EXISTS atlas_events_no_delete BEFORE DELETE ON atlas_events BEGIN
 SELECT RAISE(ABORT,'provenance events are append-only; use a reviewed retention migration');
END;
CREATE TABLE IF NOT EXISTS atlas_jobs (
 id TEXT PRIMARY KEY, idempotency_key TEXT NOT NULL UNIQUE, source_id TEXT NOT NULL,
 stage TEXT NOT NULL, status TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0,
 estimated_cost_usd REAL NOT NULL DEFAULT 0, actual_cost_usd REAL,
 created_at TEXT NOT NULL, updated_at TEXT NOT NULL, error_code TEXT
);
