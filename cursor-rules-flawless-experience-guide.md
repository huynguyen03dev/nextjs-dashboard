# Cursor Rules: The Ultimate Guide for Flawless Work Experience

## Table of Contents
1. [What are Cursor Rules?](#what-are-cursor-rules)
2. [Types of Cursor Rules](#types-of-cursor-rules)
3. [Best Practices for Cursor Rules](#best-practices-for-cursor-rules)
4. [Essential Cursor Rules for Different Tech Stacks](#essential-cursor-rules-for-different-tech-stacks)
5. [Advanced Rule Strategies](#advanced-rule-strategies)
6. [Community Resources](#community-resources)
7. [Real-World Examples](#real-world-examples)

## What are Cursor Rules?

Cursor rules are configuration files that provide persistent, reusable context at the prompt level for Cursor AI. They solve the memory limitation of large language models by providing consistent guidance for code generation, interpretation, and workflow assistance.

### Key Benefits:
- **Customized AI Behavior**: Tailor AI responses to your project's specific needs
- **Consistency**: Ensure AI generates code aligned with your project's style guidelines
- **Context Awareness**: Provide AI with important project context and architectural decisions
- **Improved Productivity**: Generate code requiring less manual editing
- **Team Alignment**: Shared rules ensure consistent AI assistance across team members

## Types of Cursor Rules

### 1. Project Rules (`.cursor/rules/*.mdc`)
- **Location**: `.cursor/rules` directory in your project
- **Format**: MDC (Markdown with metadata)
- **Scope**: Version-controlled and project-specific
- **Best For**: Domain-specific knowledge, project workflows, architecture decisions

#### Rule Types:
- **Always**: Always included in model context
- **Auto Attached**: Included when matching files are referenced
- **Agent Requested**: AI decides whether to include (requires description)
- **Manual**: Only included when explicitly mentioned using `@ruleName`

#### Example MDC Rule:
```markdown
---
description: RPC Service boilerplate
globs: ["**/*.service.ts"]
alwaysApply: false
---

- Use our internal RPC pattern when defining services
- Always use snake_case for service names
- Include error handling middleware
- Set up proper logging

@service-template.ts
```

### 2. User Rules (Global Settings)
- **Location**: Cursor Settings > Rules
- **Format**: Plain text
- **Scope**: Apply to all projects
- **Best For**: Personal preferences, response style, general guidelines

#### Example User Rule:
```
Please reply in a concise style. Avoid unnecessary repetition or filler language.
Always use TypeScript over JavaScript.
Prefer functional programming patterns.
```

### 3. Memories (Auto-generated)
- **Location**: Automatically managed by Cursor
- **Scope**: Git repository-specific
- **Best For**: Learning from conversation patterns

### 4. Legacy `.cursorrules` (Deprecated)
- **Location**: Root directory
- **Status**: Still supported but deprecated
- **Migration**: Move to Project Rules format for better control

## Best Practices for Cursor Rules

### 1. Keep Rules Focused and Concise
- **Target**: Under 500 lines per rule
- **Strategy**: Split large concepts into multiple, composable rules
- **Example**: Separate UI rules from API rules

### 2. Provide Concrete Examples
```markdown
# Good
When creating React components:
- Use functional components with hooks
- Example: `const Component = ({ prop }: Props) => <div>{prop}</div>`

# Bad
Use modern React patterns
```

### 3. Use Clear, Actionable Language
```markdown
# Good
- Always validate API inputs using Zod schemas
- Export types generated from Zod schemas
- Handle errors with try-catch blocks

# Bad
- Be careful with data validation
- Make sure things work properly
```

### 4. Leverage File References
```markdown
@component-template.tsx
@api-error-handler.ts
```

### 5. Organize with Nested Rules
```
project/
  .cursor/rules/        # Project-wide rules
  backend/
    .cursor/rules/      # Backend-specific rules
  frontend/
    .cursor/rules/      # Frontend-specific rules
```

## Essential Cursor Rules for Different Tech Stacks

### Next.js + TypeScript + Tailwind
```markdown
---
description: Next.js TypeScript Best Practices
globs: ["**/*.tsx", "**/*.ts"]
alwaysApply: true
---

## Code Style
- Use TypeScript for all files
- Prefer App Router over Pages Router
- Use Server Components by default, Client Components when needed
- Always use "use client" directive for client components

## UI Patterns
- Use Tailwind CSS for styling
- Follow shadcn/ui component patterns
- Implement responsive design with mobile-first approach
- Use semantic HTML elements

## Performance
- Optimize images with next/image
- Use dynamic imports for code splitting
- Implement proper loading states
- Use React.memo for expensive components

@component-template.tsx
@api-route-template.ts
```

### Python + FastAPI
```markdown
---
description: FastAPI Python Best Practices
globs: ["**/*.py"]
alwaysApply: true
---

## Code Style
- Use type hints for all function parameters and returns
- Follow PEP 8 naming conventions
- Use pydantic models for request/response validation
- Implement proper error handling with HTTPException

## API Design
- Use RESTful endpoints
- Include proper status codes
- Implement input validation
- Add comprehensive docstrings

## Database
- Use async database operations
- Implement proper connection pooling
- Use SQLAlchemy ORM patterns
- Handle database errors gracefully

@fastapi-template.py
@database-model-template.py
```

### React Native + Expo
```markdown
---
description: React Native Expo Best Practices
globs: ["**/*.tsx", "**/*.ts"]
alwaysApply: true
---

## Mobile Development
- Use Expo Router for navigation
- Implement proper screen transitions
- Handle different screen sizes and orientations
- Use react-native-reanimated for animations

## Performance
- Optimize list rendering with FlatList
- Use useMemo and useCallback appropriately
- Implement proper image caching
- Handle memory management

## Platform Considerations
- Use Platform.select() for platform-specific code
- Handle safe areas properly
- Implement proper keyboard handling
- Test on both iOS and Android

@screen-template.tsx
@navigation-template.ts
```

## Advanced Rule Strategies

### 1. Task-Oriented Rules
Create rules that guide specific development tasks:

```markdown
---
description: Feature Implementation Workflow
alwaysApply: false
---

When implementing a new feature:

1. **Analysis Phase**
   - Review requirements thoroughly
   - Identify affected components/modules
   - Plan database schema changes if needed

2. **Implementation Phase**
   - Create types/interfaces first
   - Implement backend API endpoints
   - Create frontend components
   - Add proper error handling

3. **Testing Phase**
   - Write unit tests for business logic
   - Add integration tests for API endpoints
   - Test UI components with different states

4. **Documentation Phase**
   - Update API documentation
   - Add code comments for complex logic
   - Update README if needed

@feature-template.md
```

### 2. Context-Aware Rules
Use globs to apply rules contextually:

```markdown
---
description: Database Operations
globs: ["**/models/**", "**/repositories/**", "**/migrations/**"]
alwaysApply: false
---

## Database Best Practices
- Always use transactions for multi-table operations
- Implement proper indexing strategies
- Use prepared statements to prevent SQL injection
- Handle connection timeouts gracefully
- Log slow queries for optimization

@database-connection.ts
@transaction-template.ts
```

### 3. Team Workflow Rules
```markdown
---
description: Code Review Guidelines
alwaysApply: false
---

## Before Creating PR
- Run all tests locally
- Check code coverage meets minimum threshold
- Update documentation for public APIs
- Add meaningful commit messages following conventional commits

## Code Standards
- Follow established linting rules
- Add JSDoc comments for public functions
- Ensure no console.log statements in production code
- Handle all async operations properly

@pr-template.md
@commit-convention.md
```

## Community Resources

### Top Rule Collections
1. **Awesome CursorRules**: 28.8k+ stars on GitHub
   - 200+ curated rules for different tech stacks
   - Community-contributed and maintained
   - Regular updates with latest practices

2. **Cursor Directory**: 41k+ community members
   - Browse and generate rules
   - MCP server integrations
   - Job board and trending discussions

3. **Official Cursor Documentation**
   - Comprehensive rule writing guide
   - Best practices from Cursor team
   - Integration examples

### Featured Community Rules
- **Next.js 15 + React 19 + Vercel AI**
- **Python FastAPI with async/await patterns**
- **React Native Expo with TypeScript**
- **Vue 3 + Nuxt 3 + TypeScript**
- **Go backend scalability patterns**
- **Chrome extension development**

## Real-World Examples

### 1. E-commerce Platform Rules
```markdown
---
description: E-commerce Domain Rules
globs: ["**/product/**", "**/cart/**", "**/payment/**"]
alwaysApply: true
---

## Business Logic
- Always validate product availability before adding to cart
- Implement proper inventory management
- Handle payment processing securely
- Log all financial transactions

## Data Validation
- Validate all monetary amounts with proper precision
- Ensure user authentication for sensitive operations
- Implement rate limiting for API endpoints
- Handle international currency formats

@payment-handler.ts
@inventory-service.ts
```

### 2. AI/ML Project Rules
```markdown
---
description: Machine Learning Best Practices
globs: ["**/*.py", "**/models/**", "**/training/**"]
alwaysApply: true
---

## Model Development
- Use type hints for tensor shapes
- Implement proper data validation
- Add model versioning and tracking
- Handle GPU/CPU fallback gracefully

## Data Processing
- Validate input data shapes and types
- Implement proper data preprocessing pipelines
- Handle missing data appropriately
- Use proper train/validation/test splits

@model-template.py
@data-pipeline.py
```

### 3. Microservices Architecture Rules
```markdown
---
description: Microservices Communication
globs: ["**/services/**", "**/api/**"]
alwaysApply: true
---

## Service Communication
- Use proper HTTP status codes
- Implement circuit breaker patterns
- Add distributed tracing
- Handle service discovery properly

## Error Handling
- Implement graceful degradation
- Use proper logging with correlation IDs
- Handle timeout scenarios
- Implement retry logic with exponential backoff

@service-template.ts
@communication-patterns.ts
```

## Tips for Maximum Effectiveness

### 1. Rule Generation from Conversations
- Use `/Generate Cursor Rules` command after productive AI conversations
- Capture decisions and patterns that worked well
- Convert repeated instructions into permanent rules

### 2. Iterative Improvement
- Start with basic rules and refine over time
- Monitor AI output quality and adjust rules accordingly
- Regular rule reviews and updates

### 3. Team Collaboration
- Share effective rules across team members
- Establish rule review process for team projects
- Document rule rationale and context

### 4. Performance Considerations
- Keep frequently used rules under 500 lines
- Use specific globs to avoid unnecessary rule application
- Balance rule specificity with reusability

## Latest Features & Advanced Techniques (2025)

### Background Agent Integration
Cursor 1.0 introduces the Background Agent - an autonomous development assistant that works with your rules:

```markdown
---
description: Background Agent Workflow
alwaysApply: false
---

## Automated Task Execution
- Use Background Agent (Ctrl/Cmd-E) for repetitive tasks
- Implement entire feature sets following established patterns
- Automate refactoring across large codebases
- Handle performance optimization tasks

## Integration with Rules
- Background Agent follows all active project rules
- Ensures consistency in automated code generation
- Applies testing and documentation standards automatically

@automation-workflow.md
```

### Memories & Persistent Context
Enable Memories in Settings → Rules for project-specific AI memory:

```markdown
---
description: Persistent Context Configuration
alwaysApply: true
---

## Context Preservation
- AI remembers coding style preferences across sessions
- Maintains framework-specific patterns and conventions
- Preserves naming conventions and architectural decisions
- Reduces need to re-explain project context

## Memory Optimization
- Keep frequently referenced patterns in memory
- Update memories when project standards evolve
- Use for maintaining consistency in long-term projects
```

### BugBot & Automated Code Review
```markdown
---
description: Automated Code Quality
alwaysApply: true
---

## Code Review Standards
- BugBot automatically reviews pull requests
- Catches potential bugs and security issues
- Enforces coding standards before merge
- Provides suggestions for performance improvements

## Quality Gates
- All functions must have corresponding tests
- Code coverage must meet minimum threshold
- Documentation required for public APIs
- Security patterns must be followed
```

## Production-Ready Rule Examples

### Real Project Implementation: tRPC API Standards
```markdown
---
description: tRPC Handler Standards
globs: ["**/api/trpc/**/*.ts"]
alwaysApply: true
---

## Handler Format Requirements
- Every handler must use proper input/output typing
- Implement error handling with TRPCError
- Include rate limiting for public endpoints
- Add proper logging and monitoring

## Example Pattern:
```typescript
export const userRouter = t.router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .output(z.object({ user: UserSchema }))
    .query(async ({ input }) => {
      try {
        // Implementation with proper error handling
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch user'
        });
      }
    })
});
```

@trpc-handler-template.ts
```

### Framework-Specific Boilerplate: React Component Standards
```markdown
---
description: React Component Generation
globs: ["**/components/**/*.tsx"]
alwaysApply: true
---

## Component Structure Requirements
When creating new components, always generate:
- `index.tsx` - Main component export
- `types.ts` - TypeScript interfaces
- `hooks.ts` - Custom hooks if needed
- `api.ts` - Data fetching logic
- `Component.test.tsx` - Unit tests

## Component Template:
```typescript
interface ComponentProps {
  // Props definition
}

export const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // Implementation
  return <div>{/* JSX */}</div>;
};

export default Component;
```

@component-template.tsx
@component-test-template.tsx
```

### Advanced Validation Rules: Zod Schema Enforcement
```markdown
---
description: API Validation Standards
globs: ["**/api/**/*.ts", "**/schemas/**/*.ts"]
alwaysApply: true
---

## Validation Requirements
- Every API endpoint must use Zod for input validation
- Export TypeScript types from Zod schemas
- Include proper error messages for validation failures
- Implement request/response validation consistently

## Schema Pattern:
```typescript
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0).max(150)
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
```

@validation-schema-template.ts
```

## Workflow Optimization Strategies

### 1. Reconnaissance → Planning → Execution Pattern
```markdown
---
description: Development Workflow
alwaysApply: false
---

## Structured Development Process
1. **Reconnaissance Phase**
   - Analyze existing codebase patterns
   - Identify integration points
   - Review related tests and documentation

2. **Planning Phase**
   - Define implementation approach
   - Identify required files and changes
   - Plan testing strategy

3. **Execution Phase**
   - Generate code following established patterns
   - Run tests and linters automatically
   - Auto-fix common issues
   - Update documentation

@workflow-template.md
```

### 2. Rule Priority Management
For large projects with multiple rules:

```markdown
---
description: Rule Priority Guidelines
alwaysApply: true
---

## Priority Order
1. Security and validation rules (highest priority)
2. Framework-specific patterns
3. Team coding standards
4. Personal preferences (lowest priority)

## Conflict Resolution
- More specific rules override general ones
- Project rules take precedence over user rules
- Use clear naming conventions for rule files
```

### 3. Retrospective-Driven Improvement
```markdown
---
description: Rule Evolution Process
alwaysApply: false
---

## Continuous Improvement
- Maintain `retro.md` file for rule effectiveness analysis
- Update rules based on code review feedback
- Adapt to new framework versions and best practices
- Remove outdated or conflicting rules

## Monthly Review Process
1. Analyze AI output quality metrics
2. Identify patterns causing issues
3. Update rules accordingly
4. Share improvements with team
```

## Conclusion

Cursor rules are a powerful feature that can dramatically improve your development experience. With the latest features like Background Agent, Memories, and BugBot, you can create a highly sophisticated AI coding assistant that not only understands your project's requirements but actively maintains code quality and consistency.

The key to success is:
- Starting with simple, focused rules
- Leveraging new automation features
- Iterating based on real usage patterns
- Maintaining rules as living documentation
- Using production-ready examples from the community

Remember that effective rules are specific, actionable, and evolve with your project needs. The combination of well-crafted rules and Cursor's advanced features creates a development environment that significantly reduces manual overhead while maintaining high code quality standards.

---

*Last updated: December 2024*
*Sources: Official Cursor Documentation, Awesome CursorRules GitHub Repository, Cursor Directory Community, Perplexity AI Research*
