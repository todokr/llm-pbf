# LLM Architecture Comparison: Package by Feature vs Layered

## Project Overview

このプロジェクトは、**Package by Feature** アーキテクチャが **Layered Architecture** と比較してLLM（Large Language Models）にとってより有利であるという仮説を検証するためのものです。

## Hypothesis (仮説)

> Package by Feature アーキテクチャは、従来の Layered Architecture と比較して、LLMによるコード理解、生成、保守において以下の利点を持つ：
> 
> 1. **Context Locality**: 関連するコードが物理的に近くに配置されることで、LLMのコンテキスト理解が向上する
> 2. **Feature Coherence**: 機能単位でのコードの凝集度が高く、変更影響の把握が容易
> 3. **Navigation Efficiency**: 必要なファイルの特定とアクセスが効率的

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

両方のアプリケーションは同じ機能を実装しています：

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
```

**特徴:**
- 機能ごとにすべてのレイヤーのコードがまとまっている
- 機能追加時は新しいディレクトリを作成
- 機能内の依存関係が明確
- クロスカッティング concerns は shared/ に配置

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

**特徴:**
- 技術的関心事ごとにコードが分離
- レイヤー間の依存関係が明確
- 横断的関心事の実装が容易
- 同じレイヤー内でのパターンが一貫

## Running the Applications

### Setup
```bash
npm install
```

### Development
```bash
# Package by Feature architecture
npm run dev:feature

# Layered architecture  
npm run dev:layered
```

### Production Build
```bash
npm run build
npm run start:feature  # Feature-based app on port 3001
npm run start:layered   # Layered app on port 3002
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

## Testing Methodology

### Test Scenarios
詳細は [LLM_TEST_SCENARIOS.md](LLM_TEST_SCENARIOS.md) を参照。

1. **新機能の追加** - コメント機能の実装
2. **バグ修正** - 削除されたユーザー参照のバグ対応
3. **パフォーマンス最適化** - N+1問題の解決
4. **セキュリティ改善** - 認可機能の追加
5. **API バージョニング** - v2 API の実装
6. **ドキュメント生成** - API仕様書の自動生成

### Evaluation Criteria
詳細は [ANALYSIS_CRITERIA.md](ANALYSIS_CRITERIA.md) を参照。

#### 定量的メトリクス
- **File Discovery Time**: 必要ファイルの特定時間
- **Context Switches**: ディレクトリ間移動回数
- **Code Reading Accuracy**: コード理解の正答率
- **Implementation Completeness**: 実装の完全性

#### 定性的メトリクス
- **Mental Model Clarity**: アーキテクチャ理解のしやすさ
- **Change Impact Assessment**: 変更影響の把握精度
- **Feature Coherence**: 機能の凝集度理解
- **Maintenance Predictability**: メンテナンス性の予測精度

## Expected Results

### Package by Feature の予想される利点
- ✅ 機能追加時の効率性
- ✅ 関連コードの locality
- ✅ 変更影響範囲の明確性
- ✅ 新規機能開発の速度

### Layered Architecture の予想される利点
- ✅ 横断的関心事の実装効率
- ✅ 技術的パターンの一貫性
- ✅ レイヤー間の責任分離
- ✅ 既存パターンの再利用性

## Code Quality Standards

### TypeScript Configuration
- Strict mode enabled
- Comprehensive type safety
- ES2020 target with CommonJS modules

### Code Style
- ESLint + Prettier configuration
- Consistent naming conventions
- Comprehensive error handling
- Zod schemas for validation

### Documentation
- JSDoc comments for all public APIs
- Clear function and class documentation
- Type-safe interfaces and contracts

## Usage Examples

### Creating a User (Feature-based)
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Creating a User (Layered)
```bash
curl -X POST http://localhost:3002/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

## Contributing to the Analysis

このプロジェクトを使用してLLMアーキテクチャ比較を行う場合：

1. 各テストシナリオを両方のアーキテクチャで実行
2. メトリクスを記録し比較分析
3. 結果をドキュメントに記録
4. 仮説の検証と結論の導出

## Future Extensions

今後の拡張可能な検証項目：

- **複雑なビジネスロジック**: より複雑なドメインでの比較
- **マイクロサービス化**: 各アーキテクチャのサービス分割への対応
- **テスト戦略**: 異なるテスト戦略での保守性比較
- **チーム開発**: 複数開発者での開発効率比較

---

**このプロジェクトを通じて、LLMによる現代的なソフトウェア開発において最適なアーキテクチャパターンの理解を深めることができます。**