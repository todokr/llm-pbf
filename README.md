# LLM Architecture Comparison: Package by Feature vs Layered

**Package by Feature** or **Layered Architecture** のアーキテクチャの差異が、LLM（Large Language Models）の効果性に影響するかを検証するもの

## Project Structure

```
llm-pbf/
├── feature-based/          # Package by Feature implementation
│   └── src/
│       ├── users/          # User feature module
│       ├── projects/       # Project feature module
│       ├── tasks/          # Task feature module
│       └── shared/         # Shared utilities
├── layered/               # Layered Architecture implementation
│   └── src/
│       ├── types/          # Type definitions
│       ├── repositories/   # Data layer
│       ├── services/       # Business layer
│       ├── controllers/    # Presentation layer
│       └── shared/         # Shared utilities
├── LLM_TEST_SCENARIOS.md  # Test scenarios for comparison
├── ANALYSIS_CRITERIA.md   # Analysis framework
└── README.md              # This file
```

## Implementation Details

### Core Features
- **User Management**: CRUD operations for users
- **Project Management**: Project creation and management with user ownership
- **Task Management**: Task creation with project association and user assignment

### Technical Stack
- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Express.js
- **Validation**: Zod schemas
- **Storage**: In-memory (for simplicity)

## Architecture Comparison

### Package by Feature (feature-based/)
```
users/
├── user.types.ts          # Types and schemas
├── user.repository.ts     # Data access
├── user.service.ts        # Business logic
├── user.controller.ts     # HTTP handlers
└── index.ts              # Module exports and routing

projects/
├── project.types.ts      # Types and schemas
├── project.repository.ts # Data access
├── project.service.ts    # Business logic
├── project.controller.ts # HTTP handlers
└── index.ts             # Module exports and routing

### Layered Architecture (layered/)
```
types/
├── user.types.ts         # User-related types
├── project.types.ts     # Project-related types
└── task.types.ts        # Task-related types

repositories/
├── user.repository.ts    # User data access
├── project.repository.ts # Project data access
└── task.repository.ts   # Task data access

services/
├── user.service.ts      # User business logic
├── project.service.ts   # Project business logic
└── task.service.ts     # Task business logic
```
## Running the Applications

### Setup
```bash
pnpm i
```

### Development
```bash
# Package by Feature architecture
pnpm dev:feature

# Layered architecture
pnpm dev:layered
```

### Production Build
```bash
pnpm build
pnpm start:feature  # Feature-based app on port 3001
pnpm start:layered   # Layered app on port 3002
```

### API Endpoints

両方のアプリケーションは同じAPI仕様を実装：

```
GET    /api/health
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id

GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id

GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Test Scenarios
[LLM_TEST_SCENARIOS.md](LLM_TEST_SCENARIOS.md) を参照。
