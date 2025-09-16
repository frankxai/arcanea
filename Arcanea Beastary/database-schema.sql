-- Arcanean Bestiary Database Schema
-- PostgreSQL + Neo4j Hybrid Architecture
-- Version 1.0 - Production Ready

-- =====================================================
-- POSTGRESQL SCHEMA (Primary Structured Data)
-- =====================================================

-- Create database extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- =====================================================
-- CORE ENTITY TABLES
-- =====================================================

-- Cultures and Regions
CREATE TABLE cultures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    indigenous_name VARCHAR(255),
    region VARCHAR(255) NOT NULL,
    continent VARCHAR(100),
    languages TEXT[],
    current_status VARCHAR(100), -- 'active', 'endangered', 'extinct', 'revitalized'
    population_estimate INTEGER,
    time_period_start INTEGER, -- BCE/CE year
    time_period_end INTEGER,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    cultural_family VARCHAR(255),
    permissions JSONB, -- Cultural permissions and restrictions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mythologies
CREATE TABLE mythologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    culture_id UUID REFERENCES cultures(id),
    primary_language VARCHAR(100),
    creation_period VARCHAR(255),
    primary_sources TEXT[],
    mythology_type VARCHAR(100), -- 'pantheon', 'folklore', 'legend', 'oral_tradition'
    core_beliefs JSONB,
    deities JSONB,
    cosmology JSONB,
    verification_status VARCHAR(50) DEFAULT 'pending',
    cultural_sensitivity_level INTEGER DEFAULT 1, -- 1-5 scale
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creatures (Primary Entity)
CREATE TABLE creatures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    mythology_id UUID REFERENCES mythologies(id),
    culture_id UUID REFERENCES cultures(id),
    alternative_names TEXT[],
    pronunciation VARCHAR(255),
    etymology JSONB, -- Word origins and meanings
    classification VARCHAR(100), -- 'dragon', 'spirit', 'deity', 'monster', etc.
    creature_type VARCHAR(100), -- 'corporeal', 'spiritual', 'elemental', 'shapeshifter'
    
    -- Physical Characteristics
    physical_description TEXT,
    size_category VARCHAR(50), -- 'tiny', 'small', 'medium', 'large', 'huge', 'gargantuan'
    height_min DECIMAL(10, 2), -- in meters
    height_max DECIMAL(10, 2),
    weight_min DECIMAL(10, 2), -- in kilograms  
    weight_max DECIMAL(10, 2),
    primary_colors TEXT[],
    body_type VARCHAR(100),
    distinctive_features TEXT[],
    
    -- Abilities and Powers
    abilities JSONB,
    magical_powers JSONB,
    weaknesses TEXT[],
    immunities TEXT[],
    resistances TEXT[],
    
    -- Behavior and Intelligence
    intelligence_level VARCHAR(50), -- 'animal', 'low', 'human', 'superhuman', 'cosmic'
    alignment VARCHAR(50), -- 'good', 'neutral', 'evil', 'chaotic', 'lawful'
    temperament VARCHAR(100),
    behavior_patterns JSONB,
    communication_methods TEXT[],
    
    -- Habitat and Environment
    habitat_types TEXT[], -- 'forest', 'mountain', 'sea', 'underground', 'sky', 'otherworld'
    climate_preferences TEXT[],
    territorial BOOLEAN DEFAULT false,
    migration_patterns JSONB,
    
    -- Cultural and Mythological Context
    cultural_significance TEXT,
    symbolic_meaning TEXT[],
    moral_lessons TEXT[],
    ritual_roles TEXT[],
    taboos_and_restrictions TEXT[],
    modern_interpretations TEXT[],
    
    -- Sources and Verification
    primary_sources JSONB,
    academic_sources JSONB,
    historical_sources JSONB,
    oral_tradition_sources JSONB,
    verification_status VARCHAR(50) DEFAULT 'pending',
    academic_consensus INTEGER DEFAULT 1, -- 1-5 confidence level
    cultural_authenticity_score INTEGER DEFAULT 1, -- 1-5 authenticity level
    
    -- AI Training Data
    vector_embedding VECTOR(1536), -- OpenAI ada-002 embeddings
    semantic_tags TEXT[],
    generation_prompts JSONB,
    training_notes TEXT,
    ai_safety_flags TEXT[],
    
    -- Media and References
    image_urls TEXT[],
    audio_pronunciations TEXT[],
    video_references TEXT[],
    artwork_references JSONB,
    modern_media_appearances JSONB,
    
    -- Metadata
    copyright_status VARCHAR(100), -- 'public_domain', 'fair_use', 'licensed', 'restricted'
    content_warnings TEXT[],
    age_appropriateness VARCHAR(50), -- 'all_ages', 'teen', 'mature'
    educational_level VARCHAR(50), -- 'elementary', 'secondary', 'university', 'research'
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID, -- References users table
    last_modified_by UUID
);

-- Creature Relationships (Many-to-Many)
CREATE TABLE creature_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creature_a_id UUID REFERENCES creatures(id) ON DELETE CASCADE,
    creature_b_id UUID REFERENCES creatures(id) ON DELETE CASCADE,
    relationship_type VARCHAR(100), -- 'parent', 'child', 'variant', 'enemy', 'ally', 'similar', 'evolution'
    relationship_description TEXT,
    strength INTEGER DEFAULT 1, -- 1-10 relationship strength
    bidirectional BOOLEAN DEFAULT false,
    cultural_context TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Historical Sources
CREATE TABLE historical_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255),
    publication_date VARCHAR(100),
    source_type VARCHAR(100), -- 'manuscript', 'book', 'scroll', 'oral_account', 'inscription'
    language VARCHAR(100),
    culture_id UUID REFERENCES cultures(id),
    original_text TEXT,
    translation TEXT,
    translator VARCHAR(255),
    reliability_score INTEGER DEFAULT 1, -- 1-5 reliability
    accessibility VARCHAR(100), -- 'public', 'academic', 'restricted', 'lost'
    copyright_status VARCHAR(100),
    digital_archive_url TEXT,
    physical_location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media References
CREATE TABLE media_references (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creature_id UUID REFERENCES creatures(id) ON DELETE CASCADE,
    media_type VARCHAR(100), -- 'book', 'movie', 'game', 'tv_show', 'artwork', 'music'
    title VARCHAR(500),
    creator VARCHAR(255),
    release_date DATE,
    description TEXT,
    accuracy_rating INTEGER, -- 1-5 how accurate to original mythology
    popularity_score INTEGER, -- 1-10 cultural impact
    url TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- USER AND COMMUNITY TABLES
-- =====================================================

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    user_type VARCHAR(50) DEFAULT 'standard', -- 'standard', 'expert', 'cultural_representative', 'admin'
    cultural_affiliations UUID[], -- Array of culture IDs
    expertise_areas TEXT[],
    credentials JSONB,
    verification_status VARCHAR(50) DEFAULT 'unverified',
    api_key VARCHAR(255) UNIQUE,
    api_tier VARCHAR(50) DEFAULT 'free', -- 'free', 'starter', 'professional', 'enterprise'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- Cultural Representatives
CREATE TABLE cultural_representatives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    culture_id UUID REFERENCES cultures(id),
    role VARCHAR(100), -- 'elder', 'scholar', 'storyteller', 'historian', 'artist'
    credentials TEXT,
    verification_documents JSONB,
    approval_status VARCHAR(50) DEFAULT 'pending',
    permissions JSONB,
    bio TEXT,
    contact_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Contributions
CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    creature_id UUID REFERENCES creatures(id),
    contribution_type VARCHAR(100), -- 'creation', 'edit', 'verification', 'translation', 'source'
    original_data JSONB,
    new_data JSONB,
    change_description TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    reviewer_id UUID REFERENCES users(id),
    review_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- API AND ANALYTICS TABLES
-- =====================================================

-- API Usage Analytics
CREATE TABLE api_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    api_key VARCHAR(255),
    endpoint VARCHAR(255),
    method VARCHAR(10),
    query_parameters JSONB,
    response_time_ms INTEGER,
    response_status INTEGER,
    bytes_transferred INTEGER,
    creature_ids_accessed UUID[],
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Search Analytics
CREATE TABLE search_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    search_query TEXT,
    search_type VARCHAR(50), -- 'text', 'semantic', 'image', 'audio'
    filters_applied JSONB,
    results_count INTEGER,
    results_clicked UUID[], -- Creature IDs clicked
    session_id VARCHAR(255),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Primary indexes for fast lookups
CREATE INDEX idx_creatures_name ON creatures USING GIN (to_tsvector('english', name));
CREATE INDEX idx_creatures_alternative_names ON creatures USING GIN (alternative_names);
CREATE INDEX idx_creatures_mythology_id ON creatures(mythology_id);
CREATE INDEX idx_creatures_culture_id ON creatures(culture_id);
CREATE INDEX idx_creatures_classification ON creatures(classification);
CREATE INDEX idx_creatures_verification_status ON creatures(verification_status);

-- Full-text search indexes
CREATE INDEX idx_creatures_description_fts ON creatures USING GIN (to_tsvector('english', physical_description));
CREATE INDEX idx_creatures_cultural_significance_fts ON creatures USING GIN (to_tsvector('english', cultural_significance));
CREATE INDEX idx_creatures_semantic_tags ON creatures USING GIN (semantic_tags);

-- Geographic and cultural indexes
CREATE INDEX idx_cultures_region ON cultures(region);
CREATE INDEX idx_cultures_continent ON cultures(continent);
CREATE INDEX idx_mythologies_culture_id ON mythologies(culture_id);

-- Performance indexes for analytics
CREATE INDEX idx_api_usage_timestamp ON api_usage(timestamp);
CREATE INDEX idx_api_usage_user_id ON api_usage(user_id);
CREATE INDEX idx_search_analytics_timestamp ON search_analytics(timestamp);

-- Vector similarity index (requires pgvector extension)
CREATE INDEX idx_creatures_vector_embedding ON creatures USING ivfflat (vector_embedding vector_cosine_ops) WITH (lists = 100);

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- Public creatures view (excludes sensitive content)
CREATE VIEW public_creatures AS
SELECT 
    c.id, c.name, c.alternative_names, c.pronunciation,
    c.classification, c.creature_type, c.physical_description,
    c.cultural_significance, c.symbolic_meaning,
    c.habitat_types, c.abilities, c.modern_interpretations,
    m.name as mythology_name,
    cu.name as culture_name, cu.region,
    c.image_urls, c.created_at, c.updated_at
FROM creatures c
LEFT JOIN mythologies m ON c.mythology_id = m.id  
LEFT JOIN cultures cu ON c.culture_id = cu.id
WHERE c.verification_status IN ('verified', 'community_approved')
AND c.copyright_status IN ('public_domain', 'fair_use')
AND NOT EXISTS (
    SELECT 1 FROM unnest(c.content_warnings) as warning 
    WHERE warning IN ('sacred', 'restricted', 'sensitive')
);

-- Creature statistics view
CREATE VIEW creature_statistics AS
SELECT 
    m.name as mythology,
    cu.name as culture,
    cu.region,
    COUNT(*) as creature_count,
    AVG(c.academic_consensus) as avg_academic_consensus,
    AVG(c.cultural_authenticity_score) as avg_authenticity,
    COUNT(*) FILTER (WHERE c.verification_status = 'verified') as verified_count
FROM creatures c
LEFT JOIN mythologies m ON c.mythology_id = m.id
LEFT JOIN cultures cu ON c.culture_id = cu.id
GROUP BY m.name, cu.name, cu.region;

-- =====================================================
-- TRIGGERS FOR DATA INTEGRITY
-- =====================================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_creatures_updated_at BEFORE UPDATE ON creatures
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mythologies_updated_at BEFORE UPDATE ON mythologies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cultures_updated_at BEFORE UPDATE ON cultures
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Audit trigger for creature changes
CREATE TABLE creature_audit (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creature_id UUID,
    operation VARCHAR(10),
    old_data JSONB,
    new_data JSONB,
    changed_by UUID,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION audit_creature_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO creature_audit (creature_id, operation, old_data, changed_by)
        VALUES (OLD.id, 'DELETE', to_jsonb(OLD), OLD.last_modified_by);
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO creature_audit (creature_id, operation, old_data, new_data, changed_by)
        VALUES (NEW.id, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), NEW.last_modified_by);
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO creature_audit (creature_id, operation, new_data, changed_by)
        VALUES (NEW.id, 'INSERT', to_jsonb(NEW), NEW.created_by);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER audit_creatures AFTER INSERT OR UPDATE OR DELETE ON creatures
    FOR EACH ROW EXECUTE FUNCTION audit_creature_changes();

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Insert sample cultures
INSERT INTO cultures (id, name, indigenous_name, region, continent, languages, current_status) VALUES
(uuid_generate_v4(), 'Norse', 'Norrænt', 'Scandinavia', 'Europe', ARRAY['Old Norse', 'Icelandic'], 'revitalized'),
(uuid_generate_v4(), 'Greek', 'Ελληνικά', 'Mediterranean', 'Europe', ARRAY['Ancient Greek', 'Greek'], 'active'),
(uuid_generate_v4(), 'Egyptian', 'km.t', 'Nile Valley', 'Africa', ARRAY['Ancient Egyptian', 'Coptic'], 'extinct'),
(uuid_generate_v4(), 'Celtic', 'Ceilteach', 'British Isles', 'Europe', ARRAY['Gaelic', 'Welsh', 'Breton'], 'endangered'),
(uuid_generate_v4(), 'Japanese', '日本', 'Japan', 'Asia', ARRAY['Japanese'], 'active');

-- Note: This is a basic schema. In production, you would also need:
-- 1. Neo4j graph schema for complex relationships
-- 2. Additional indexes based on query patterns  
-- 3. Partitioning for large datasets
-- 4. Replication and backup strategies
-- 5. Security roles and permissions
-- 6. Data validation functions
-- 7. Migration scripts for schema updates

-- =====================================================
-- NEO4J CYPHER QUERIES (Complementary Graph Database)
-- =====================================================

/*
// Create graph nodes for creatures and relationships
CREATE (c:Creature {
    id: 'uuid-here',
    name: 'Dragon',
    type: 'Mythological Beast',
    culture: 'European'
})

// Create relationships between creatures
MATCH (a:Creature {name: 'Dragon'}), (b:Creature {name: 'Wyvern'})
CREATE (a)-[:RELATED_TO {type: 'variant', strength: 8}]->(b)

// Query for creature relationships
MATCH (c:Creature)-[r:RELATED_TO]-(related:Creature)
WHERE c.name = 'Dragon'
RETURN c.name, r.type, related.name, r.strength
*/