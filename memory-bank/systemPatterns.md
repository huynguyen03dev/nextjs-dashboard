# System Patterns & Architecture

## Next.js App Router Architecture

### File-System Based Routing
```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── dashboard/          # Route segment
│   ├── layout.tsx      # Nested layout for /dashboard/*
│   ├── page.tsx        # Dashboard page (/dashboard)
│   ├── customers/      # Nested route
│   │   └── page.tsx    # Customers page (/dashboard/customers)
│   └── invoices/       # Nested route
│       └── page.tsx    # Invoices page (/dashboard/invoices)
├── lib/                # Utilities (not routed)
└── ui/                 # Components (not routed)
```

### Component Hierarchy & Rendering
1. **Root Layout** (`app/layout.tsx`) - Wraps entire application
2. **Nested Layouts** (`app/dashboard/layout.tsx`) - Shared UI for route segments
3. **Pages** (`page.tsx`) - Route-specific content
4. **Special Files**: `loading.tsx`, `error.tsx`, `not-found.tsx`

### Architectural Patterns

#### Server Components (Default)
- **Data Fetching**: Direct database queries in Server Components
- **Performance**: Zero client-side JavaScript for static content
- **Security**: Database queries and sensitive logic on server
- **SEO**: Full server-side rendering for better search indexing

```typescript
// Server Component - runs on server
export default async function DashboardPage() {
  const revenue = await fetchRevenue(); // Direct DB query
  return <RevenueChart data={revenue} />;
}
```

#### Client Components (Selective)
- **Interactivity**: Event handlers, state, browser APIs
- **Hydration**: Minimal client-side JavaScript
- **Selective Usage**: Only when needed for user interaction

```typescript
'use client' // Client Component marker
export default function SearchForm() {
  const [term, setTerm] = useState('');
  // Interactive functionality
}
```

## Data Layer Architecture

### Database Integration
- **Direct Queries**: No ORM - using raw SQL with PostgreSQL
- **Type Safety**: TypeScript definitions in `lib/definitions.ts`
- **Connection**: Using `postgres` package for database connectivity
- **Data Functions**: Centralized in `lib/data.ts`

### Data Flow Pattern
```
Database (PostgreSQL) 
    ↓
lib/data.ts (Server functions)
    ↓
Server Components (Pages/Layouts)
    ↓
Client Components (Interactive UI)
```

### Type System
```typescript
// Strongly typed data models
export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid'; // Union types for constraints
};
```

## Component Architecture

### Organization Strategy
```
app/ui/
├── dashboard/          # Feature-specific components
│   ├── cards.tsx
│   ├── revenue-chart.tsx
│   ├── nav-links.tsx
│   └── sidenav.tsx
├── invoices/           # Invoice-related components
│   ├── table.tsx
│   ├── create-form.tsx
│   └── status.tsx
└── customers/          # Customer components
    └── table.tsx
```

### Design Patterns

#### Composition Pattern
```typescript
// Layout composition
<DashboardLayout>
  <SideNav />
  <main>
    <DashboardPage />
  </main>
</DashboardLayout>
```

#### Props Pattern
```typescript
// Strongly typed props
interface RevenueChartProps {
  revenue: Revenue[];
}
```

#### Server/Client Boundary
- **Server**: Data fetching, database operations, initial rendering
- **Client**: User interactions, form handling, state management

## Styling Architecture

### Tailwind CSS Integration
- **Utility-First**: Atomic CSS classes for rapid development
- **Component Classes**: Custom components with Tailwind utilities
- **Responsive Design**: Mobile-first breakpoint system
- **Design System**: Consistent spacing, colors, typography

### CSS Organization
```
app/ui/
├── global.css         # Global styles and Tailwind imports
├── fonts.ts          # Font definitions and imports
└── components/       # Styled component definitions
```

## Authentication Architecture

### NextAuth Integration
- **Provider Setup**: Configured authentication providers
- **Session Management**: Server-side session handling
- **Route Protection**: Middleware for protected routes
- **Type Safety**: TypeScript definitions for auth objects

## Performance Patterns

### Optimization Strategies
- **Server Components**: Reduce client-side JavaScript
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts with Next.js font system
- **Code Splitting**: Automatic with App Router
- **Prefetching**: Link component prefetching

### Streaming & Loading Patterns
- **Granular Suspense**: Component-level streaming with individual `<Suspense>` boundaries
- **Progressive Loading**: Static content renders immediately, dynamic components stream independently
- **Loading.tsx**: Page-level loading (should be avoided when using granular Suspense)
- **Skeleton UI**: Contextual loading states for each component type

#### Suspense Best Practices
```typescript
// Preferred: Granular Suspense for optimal streaming
<main>
  <h1>Dashboard</h1> {/* Renders immediately */}
  <Suspense fallback={<CardsSkeleton />}>
    <CardWrapper />
  </Suspense>
  <Suspense fallback={<RevenueChartSkeleton />}>
    <RevenueChart />
  </Suspense>
  <Suspense fallback={<LatestInvoicesSkeleton />}>
    <LatestInvoices />
  </Suspense>
</main>

// Avoid: Page-level loading when using granular Suspense
// loading.tsx conflicts with individual Suspense boundaries
```

#### Streaming Benefits
- **Immediate Static Content**: Headers, navigation render instantly
- **Independent Component Loading**: Each component streams as data becomes available
- **No Waterfall Blocking**: Fast components don't wait for slow ones
- **Better Perceived Performance**: Progressive enhancement over all-or-nothing loading

### Error Boundaries
- **Error Handling**: Error boundaries with `error.tsx`
- **Graceful Degradation**: Fallback UI for failed components

## Security Patterns

### Data Protection
- **Server-Side Validation**: Input validation on server
- **SQL Injection Prevention**: Parameterized queries
- **Authentication**: NextAuth session management
- **Environment Variables**: Secure configuration management

## Next.js Evolution & Version Insights

### Version Migration Patterns
- **Next.js 13 → 14**: Minimal breaking changes, Server Actions stabilization
- **Next.js 14 → 15**: Major async API changes requiring migration
- **Migration Strategy**: Use automated codemods for safe upgrades

### Breaking Changes in Next.js 15
- **Async Request APIs**: `cookies()`, `headers()`, `draftMode()` now return Promises
- **Route Handler Changes**: `params` in Route Handlers are now Promises
- **Caching Behavior**: `fetch` requests and GET Route Handlers no longer cached by default
- **Configuration Stabilization**: Experimental features moved to stable config

### Component Architecture Insights
- **Server Components**: Default for static content, data fetching, SEO optimization
- **Client Components**: Required for interactivity, browser APIs, event handlers
- **Decision Framework**: Use Client Components only when needing real-time interaction or browser-specific features

#### Client Component Requirements
```typescript
// Must be Client Component when using:
- useSearchParams(), usePathname(), useRouter() // Browser navigation hooks
- onChange, onClick, onSubmit // Event handlers
- useState, useEffect // React state hooks
- Browser APIs (localStorage, geolocation, etc.)
```

#### Server Component Benefits
```typescript
// Perfect for Server Components:
- Data fetching with await
- Static content rendering
- SEO-critical content
- Minimal JavaScript bundle
```

## Common Debugging Patterns & Lessons

### Component Communication Issues
- **Parameter Naming Consistency**: Critical for component synchronization
- **Search Params Mismatch**: Common source of bugs in Next.js App Router
- **URL Parameter Standards**: Use consistent naming across components (`page` vs `currentPage`)

#### Pagination Bug Pattern
```typescript
// ❌ Inconsistent parameter names cause synchronization issues
// Pagination component sets 'page'
params.set('page', pageNumber.toString());

// Page component looks for 'currentPage'  
const currentPage = Number(searchParams?.currentPage) || 1;

// ✅ Solution: Use consistent parameter names
// Both components use 'page'
const currentPage = Number(searchParams?.page) || 1;
```

### Debugging Best Practices
- **Systematic Analysis**: Check parameter flow between components
- **URL Parameter Inspection**: Verify what's actually being set in URL
- **Component Prop Tracing**: Follow data flow from URL to component props
- **Consistent Naming**: Establish naming conventions across component boundaries

This architecture demonstrates modern Next.js patterns while maintaining simplicity and learning-focused implementation, with insights from Next.js version evolution, component architecture best practices, and real-world debugging experience.
