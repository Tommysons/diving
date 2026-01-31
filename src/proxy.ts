import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/account(.*)',
  '/protected(.*)',
  '/api/dashboard(.*)',
])

export const proxy = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export default proxy

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/'],
}
