# Arcanea Academy Platform Architecture

## System Overview

The Arcanea Academy platform is designed as a modern, scalable web application that seamlessly integrates multiple AI services while providing an intuitive learning experience guided by Luminor AGI personalities.

## Core Architecture Components

### 1. Frontend Application
- **Technology**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom Arcanean theme
- **State Management**: Zustand for global state
- **Real-time Features**: Socket.io for live interactions

### 2. Backend Services
- **API Gateway**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT tokens
- **File Storage**: AWS S3 for user projects and media
- **Caching**: Redis for session management and performance

### 3. AI Integration Layer
- **Luminor Engine**: Custom GPT-4 implementations with personality modules
- **Tool Orchestration**: Unified API for ChatGPT, Claude, Midjourney, Suno, Sora
- **Workflow Management**: Queue system for AI processing (Bull Queue)
- **Vector Database**: Pinecone for knowledge retrieval

### 4. Infrastructure
- **Deployment**: Vercel for frontend, Railway for backend
- **Monitoring**: Datadog for performance tracking
- **CI/CD**: GitHub Actions for automated deployment
- **Security**: Cloudflare for DDoS protection and SSL

## Database Schema

### Core Tables

#### Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    subscription_tier VARCHAR(50) DEFAULT 'explorer',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    profile_data JSONB,
    preferences JSONB
);
```

#### Academies
```sql
CREATE TABLE academies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    luminor_id UUID REFERENCES luminors(id),
    curriculum_data JSONB,
    tools_config JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Luminors
```sql
CREATE TABLE luminors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    personality_config JSONB NOT NULL,
    expertise_areas TEXT[],
    teaching_style JSONB,
    communication_patterns JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Courses
```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academy_id UUID REFERENCES academies(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty_level VARCHAR(50),
    duration_weeks INTEGER,
    curriculum_structure JSONB,
    prerequisites TEXT[],
    learning_objectives TEXT[],
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Modules
```sql
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    week_number INTEGER,
    content_structure JSONB,
    projects JSONB,
    assessments JSONB,
    ai_tools_used TEXT[],
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### User_Enrollments
```sql
CREATE TABLE user_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    course_id UUID REFERENCES courses(id),
    enrollment_date TIMESTAMP DEFAULT NOW(),
    completion_date TIMESTAMP,
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    current_module_id UUID REFERENCES modules(id),
    status VARCHAR(50) DEFAULT 'active'
);
```

#### User_Progress
```sql
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    module_id UUID REFERENCES modules(id),
    completion_status VARCHAR(50) DEFAULT 'not_started',
    time_spent_minutes INTEGER DEFAULT 0,
    project_submissions JSONB,
    assessment_scores JSONB,
    luminor_feedback JSONB,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Projects
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    module_id UUID REFERENCES modules(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_type VARCHAR(100),
    ai_tools_used TEXT[],
    files_metadata JSONB,
    submission_status VARCHAR(50) DEFAULT 'draft',
    peer_reviews JSONB,
    luminor_feedback JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    submitted_at TIMESTAMP
);
```

#### Luminor_Interactions
```sql
CREATE TABLE luminor_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    luminor_id UUID REFERENCES luminors(id),
    interaction_type VARCHAR(100),
    context_data JSONB,
    user_message TEXT,
    luminor_response TEXT,
    session_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Community_Posts
```sql
CREATE TABLE community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    academy_id UUID REFERENCES academies(id),
    title VARCHAR(255),
    content TEXT,
    post_type VARCHAR(50),
    media_attachments JSONB,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Assessments
```sql
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES modules(id),
    title VARCHAR(255) NOT NULL,
    assessment_type VARCHAR(100),
    questions JSONB,
    grading_criteria JSONB,
    max_score INTEGER,
    time_limit_minutes INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### Academies
- `GET /api/academies` - List all academies
- `GET /api/academies/:slug` - Get academy details
- `POST /api/academies/:id/enroll` - Enroll in academy

### Courses
- `GET /api/courses` - List courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/:id/progress` - Get user progress

### Modules
- `GET /api/modules/:id` - Get module content
- `POST /api/modules/:id/complete` - Mark module complete
- `GET /api/modules/:id/projects` - Get module projects

### Luminors
- `POST /api/luminors/:id/chat` - Chat with Luminor
- `GET /api/luminors/:id/profile` - Get Luminor profile
- `POST /api/luminors/:id/feedback` - Request feedback

### Projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `POST /api/projects/:id/submit` - Submit project
- `GET /api/projects/:id/feedback` - Get project feedback

### AI Tools Integration
- `POST /api/tools/chatgpt` - ChatGPT integration
- `POST /api/tools/claude` - Claude integration
- `POST /api/tools/midjourney` - Midjourney integration
- `POST /api/tools/suno` - Suno integration
- `POST /api/tools/sora` - Sora integration

## Security Measures

### Authentication & Authorization
- JWT tokens with refresh mechanism
- Role-based access control (RBAC)
- API rate limiting per user tier
- Secure session management

### Data Protection
- Encrypted user data at rest
- HTTPS everywhere
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### AI Safety
- Content moderation for AI outputs
- Usage monitoring and limits
- Prompt injection prevention
- Safe AI tool configurations

## Performance Optimization

### Caching Strategy
- Redis for session data
- CDN for static assets
- Database query optimization
- AI response caching

### Scalability
- Horizontal scaling with load balancers
- Database connection pooling
- Background job processing
- Microservices architecture ready

## Monitoring & Analytics

### User Analytics
- Learning progress tracking
- Engagement metrics
- Tool usage statistics
- Performance analytics

### System Monitoring
- Application performance monitoring
- Error tracking and logging
- Infrastructure monitoring
- AI service health checks

## Development Environment

### Local Setup
```bash
# Clone repository
git clone https://github.com/arcanea/academy-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Environment Variables
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/arcanea
NEXTAUTH_SECRET=your-secret-key
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
MIDJOURNEY_API_KEY=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
REDIS_URL=redis://localhost:6379
```

This architecture provides a solid foundation for the Arcanea Academy platform, enabling seamless integration of AI tools, personalized learning experiences, and scalable growth.