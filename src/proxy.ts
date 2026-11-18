import { clerkMiddleware } from '@clerk/nextjs/server'

// Keep authentication middleware off public, search-indexable pages.
// Only private dashboard/account routes require Clerk authentication.
export default clerkMiddleware(async (auth) => {
  await auth.protect()
})

export const config = {
  matcher: [
    '/dashboard(.*)',
    '/account(.*)',
    '/protected(.*)',
    '/api/dashboard(.*)',
  ],
}
