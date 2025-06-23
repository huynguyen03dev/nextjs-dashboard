// Authentication disabled
// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
 
// Original authentication middleware (commented out)
// export default NextAuth(authConfig).auth;

// Empty middleware function that allows all requests
export function middleware() {
  return;
}
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};