# Technology Context & Setup

## Technology Stack

### Core Framework
- **Next.js**: Latest version with App Router architecture
- **React**: Latest version for UI components
- **TypeScript**: Full type safety throughout application
- **Node.js**: Runtime environment for server-side operations

### Database & Data
- **PostgreSQL**: Primary database for data storage
- **postgres**: NPM package for database connectivity
- **Raw SQL**: Direct database queries without ORM
- **Type Definitions**: Manual TypeScript types in `lib/definitions.ts`

### Authentication
- **NextAuth.js**: Version 5.0.0-beta.25 for authentication
- **bcrypt**: Password hashing and security

### Styling & UI
- **Tailwind CSS**: Version 3.4.17 for utility-first styling
- **@tailwindcss/forms**: Enhanced form styling
- **PostCSS**: CSS processing and optimization
- **@heroicons/react**: Icon library for UI elements

### Development Tools
- **TypeScript**: Version 5.7.3 for type checking
- **pnpm**: Package manager (preferred over npm/yarn)
- **Turbopack**: Next.js development bundler (--turbopack flag)

### Utilities & Validation
- **zod**: Schema validation library
- **clsx**: Utility for conditional CSS classes
- **use-debounce**: Performance optimization for input handling

### External Integrations
- **Context7 MCP**: Documentation lookup service for Next.js and other libraries
  - Successfully used for Next.js version comparison research
  - Effective retrieval of official Next.js documentation
  - Code examples and migration guides access
- **Filesystem MCP**: File operations for external directory access
- **Upstash Context7**: Library documentation and code snippet retrieval
  - Integrated for real-time documentation lookup
  - Access to comprehensive Next.js upgrade guides
  - Breaking changes analysis and migration patterns

## Project Configuration

### Package.json Scripts
```json
{
  "scripts": {
    "build": "next build",
    "dev": "next dev --turbopack",
    "start": "next start"
  }
}
```

### Development Setup
- **Turbopack**: Faster development builds with `--turbopack`
- **TypeScript**: Strict mode enabled for better type safety
- **ESLint**: Code linting and formatting (implied)

### Build Configuration
- **next.config.ts**: TypeScript configuration file
- **tsconfig.json**: TypeScript compiler options
- **tailwind.config.ts**: Tailwind CSS configuration
- **postcss.config.js**: PostCSS processing configuration

## Environment & Deployment

### Environment Variables
- Database connection strings
- NextAuth configuration
- API keys and secrets
- Environment-specific settings

### Development Workflow
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Database Setup

### PostgreSQL Integration
- Direct SQL queries using `postgres` package
- No ORM - manual query writing for learning purposes
- Connection pooling and management
- Type-safe query results with TypeScript

### Data Layer Structure
```
app/lib/
├── data.ts         # Database query functions
├── definitions.ts  # TypeScript type definitions
└── utils.ts        # Utility functions
```

## File Organization

### Next.js App Directory Structure
```
app/
├── layout.tsx      # Root layout
├── page.tsx        # Home page
├── globals.css     # Global styles
├── dashboard/      # Dashboard routes
├── lib/            # Server utilities
├── ui/             # Reusable components
├── query/          # API routes
└── seed/           # Database seeding
```

### Static Assets
```
public/
├── favicon.ico
├── hero-desktop.png
├── hero-mobile.png
└── customers/      # Customer profile images
```

## Development Patterns

### TypeScript Configuration
- Strict type checking enabled
- Path aliases for clean imports (`@/app/...`)
- Type definitions for all data models
- Interface definitions for component props

### Component Patterns
- Server Components by default
- Client Components when interactivity needed
- TypeScript interfaces for props
- Consistent naming conventions

### Styling Approach
- Tailwind utility classes
- Responsive design with mobile-first approach
- Custom CSS when needed in global.css
- Component-level styling with Tailwind

## Performance Considerations

### Optimization Features
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts integration
- **Code Splitting**: Automatic with App Router
- **Tree Shaking**: Unused code elimination
- **Minification**: Production build optimization

### Bundle Analysis
- Turbopack for fast development builds
- Production builds optimized for performance
- Minimal client-side JavaScript with Server Components

## Security Setup

### Authentication Security
- NextAuth.js secure session management
- bcrypt for password hashing
- Environment variable protection

### Database Security
- Parameterized queries to prevent SQL injection
- Connection string security
- Server-side validation

## Learning Resources

### Official Documentation
- Next.js Learn Course curriculum
- React documentation
- TypeScript handbook
- Tailwind CSS documentation

### Project Purpose
This setup follows the Next.js official learning curriculum, designed to teach:
- Modern React development patterns
- Next.js App Router architecture
- Full-stack TypeScript development
- Database integration patterns
- Authentication implementation
- Performance optimization techniques

The technology choices prioritize learning and understanding over production complexity.
