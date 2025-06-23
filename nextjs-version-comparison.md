# Next.js Version Comparison: What's New in 14 and 15 vs 13

A comprehensive guide to the major changes, new features, and breaking changes introduced in Next.js 14 and 15 compared to Next.js 13.

## Table of Contents
- [Overview](#overview)
- [Next.js 14 Changes](#nextjs-14-changes)
- [Next.js 15 Changes](#nextjs-15-changes)
- [Migration Guide](#migration-guide)
- [Key Takeaways](#key-takeaways)

## Overview

This document outlines the significant changes between Next.js versions:
- **Next.js 13**: Foundation with App Router
- **Next.js 14**: Stabilization and performance improvements
- **Next.js 15**: Major API changes with breaking changes

## Next.js 14 Changes

### 1. Server Actions Stabilization ✅

**Next.js 13** (Required experimental flag):
```javascript
/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: true, // Required in v13
  },
}
module.exports = config
```

**Next.js 14** (Stable by default):
```javascript
// No configuration needed - Server Actions are stable
```

### 2. Performance Improvements
- **Turbopack**: Enhanced build performance and stability
- **Development Experience**: Faster builds and hot reloading
- **Memory Usage**: Optimized memory consumption

### 3. React 18 Full Support
- Complete compatibility with React 18 features
- Enhanced Concurrent Features support
- Improved Suspense handling

### 4. Minimal Breaking Changes
- Mostly additive changes
- Easy upgrade path from v13
- Backward compatibility maintained

---

## Next.js 15 Changes

> ⚠️ **Warning**: Next.js 15 introduces significant breaking changes that require code migration.

### 1. Async Request APIs (🔥 Breaking Change)

All request-related APIs now return Promises and must be awaited:

#### Pages and Layouts

**Before (Next.js 13/14):**
```typescript
// Synchronous access
export default function Page({ params, searchParams }) {
  const { slug } = params
  const { query } = searchParams
  return <div>Product: {slug}</div>
}

export function generateMetadata({ params }) {
  const { slug } = params
  return { title: slug }
}
```

**After (Next.js 15):**
```typescript
// Asynchronous access - REQUIRED
export default async function Page(props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { slug } = params
  const { query } = searchParams
  return <div>Product: {slug}</div>
}

export async function generateMetadata(props) {
  const params = await props.params
  const { slug } = params
  return { title: slug }
}
```

#### Alternative: Using React's `use` Hook

```tsx
'use client'
import { use } from 'react'

export default function Page(props) {
  const params = use(props.params)
  const searchParams = use(props.searchParams)
  const { slug } = params
  return <div>Product: {slug}</div>
}
```

#### Request APIs (cookies, headers, draftMode)

**Before (Next.js 13/14):**
```typescript
import { cookies, headers, draftMode } from 'next/headers'

export default function Page() {
  const cookieStore = cookies()
  const headersList = headers()
  const { isEnabled } = draftMode()
  
  const token = cookieStore.get('token')
  const userAgent = headersList.get('user-agent')
}
```

**After (Next.js 15):**
```typescript
import { cookies, headers, draftMode } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const headersList = await headers()
  const { isEnabled } = await draftMode()
  
  const token = cookieStore.get('token')
  const userAgent = headersList.get('user-agent')
}
```

### 2. Route Handler Changes (🔥 Breaking Change)

**Before (Next.js 13/14):**
```typescript
export async function GET(request, { params }) {
  const { slug } = params
  return Response.json({ slug })
}
```

**After (Next.js 15):**
```typescript
export async function GET(request, { params }) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  return Response.json({ slug })
}
```

### 3. Caching Behavior Changes (🔥 Breaking Change)

#### Fetch Requests
**Next.js 14**: Cached by default
**Next.js 15**: Not cached by default

```javascript
// Next.js 15 - Explicit caching required
export default async function Page() {
  // Not cached
  const data1 = await fetch('https://api.example.com/data')
  
  // Explicitly cached
  const data2 = await fetch('https://api.example.com/data', { 
    cache: 'force-cache' 
  })
  
  return <div>{/* render data */}</div>
}

// Apply default caching to all fetch requests in layout/page
export const fetchCache = 'default-cache'
```

#### Route Handlers
**Next.js 14**: GET handlers cached by default
**Next.js 15**: GET handlers not cached by default

```javascript
// Next.js 15 - Explicit caching for Route Handlers
export const dynamic = 'force-static'

export async function GET() {
  // This will now be cached
  return Response.json({ message: 'Hello' })
}
```

### 4. Configuration Stabilization

Several experimental features moved to stable configuration:

**Before (Next.js 13/14):**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    bundlePagesExternals: true,
    serverComponentsExternalPackages: ['package-name'],
  },
}
```

**After (Next.js 15):**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ['package-name'],
}
```

### 5. React 19 Support

**Package.json updates for React 19:**
```json
{
  "dependencies": {
    "next": "15.0.4",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "@types/react": "19.0.0",
    "@types/react-dom": "19.0.0"
  }
}
```

### 6. Font Import Migration (🔥 Breaking Change)

**Before:**
```javascript
import { Inter } from '@next/font/google'
```

**After (Next.js 15):**
```javascript
import { Inter } from 'next/font/google'
```

### 7. NextRequest API Changes (🔥 Breaking Change)

**Before (Next.js 13/14):**
```typescript
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { geo, ip } = request
  console.log('Location:', geo.country)
  console.log('IP:', ip)
}
```

**After (Next.js 15):**
```typescript
import type { NextRequest } from 'next/server'
import { geolocation, ipAddress } from '@vercel/functions'

export function middleware(request: NextRequest) {
  const geo = geolocation(request)
  const ip = ipAddress(request)
  console.log('Location:', geo?.country)
  console.log('IP:', ip)
}
```

### 8. Temporary Migration Support

Next.js 15 provides temporary synchronous access with warnings for gradual migration:

```typescript
// TypeScript - with type casting (logs warning in development)
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers'

const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies
const token = cookieStore.get('token') // Will log warning
```

---

## Migration Guide

### Upgrading to Next.js 14

```bash
# Install Next.js 14
npm i next@14 react@18 react-dom@18 eslint-config-next@14

# Or with other package managers
yarn add next@14 react@18 react-dom@18 eslint-config-next@14
pnpm i next@14 react@18 react-dom@18 eslint-config-next@14
bun add next@14 react@18 react-dom@18 eslint-config-next@14
```

**Migration Steps:**
1. Update dependencies
2. Remove `experimental.serverActions` from config
3. Test Server Actions functionality
4. Update any deprecated APIs

### Upgrading to Next.js 15

```bash
# Automated migration (recommended)
npx @next/codemod@canary upgrade latest

# Manual upgrade
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

**Migration Steps:**
1. **Run the codemod** for automatic updates
2. **Update async APIs**: Add `await` to all request APIs
3. **Fix Route Handlers**: Make `params` async
4. **Review caching**: Add explicit caching where needed
5. **Update imports**: Change font imports
6. **Install @vercel/functions**: For geo/IP access
7. **Test thoroughly**: Breaking changes require extensive testing

### Specific Codemods Available

```bash
# Migrate NextRequest geo and ip properties
npx @next/codemod@latest next-request-geo-ip .

# Migrate ImageResponse imports
npx @next/codemod@latest next-og-import .

# Migrate next/image to legacy (if needed)
npx @next/codemod next-image-to-legacy-image .
```

---

## Key Takeaways

### Migration Complexity
- **Next.js 13 → 14**: ✅ Easy upgrade, minimal code changes
- **Next.js 14 → 15**: ⚠️ Significant refactoring needed due to async API changes

### Breaking Changes Summary
| Change | Impact | Migration Required |
|--------|--------|--------------------|
| Async Request APIs | High | Yes - Add await to all request APIs |
| Route Handler params | Medium | Yes - Await params in Route Handlers |
| Caching behavior | Medium | Yes - Explicit caching configuration |
| NextRequest geo/ip | Low | Yes - Use @vercel/functions |
| Font imports | Low | Yes - Update import paths |
| Config options | Low | Yes - Move experimental to stable |

### Performance Considerations
- **Caching**: Review and explicitly configure caching in v15
- **Bundle Size**: React 19 may affect bundle sizes
- **Runtime**: Async APIs may have slight performance overhead

### Best Practices
1. **Use the automated codemod** for initial migration
2. **Test incrementally** - migrate one feature at a time
3. **Review caching strategy** - explicitly configure for performance
4. **Update TypeScript types** - ensure compatibility with new versions
5. **Monitor performance** - test both development and production builds

### Version Support Timeline
- **Next.js 13**: Extended support for critical fixes
- **Next.js 14**: Active LTS, recommended for stable production
- **Next.js 15**: Latest features, React 19 support

---

*Last updated: December 2024*
*Source: Official Next.js documentation via Context7*
