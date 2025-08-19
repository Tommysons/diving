import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default clerkMiddleware({
  // optional: protect all routes or specific paths
  // you can use the `matcher` below
})

export const config = {
  matcher: [
    /*
      Match all routes that require auth:
      - dashboard pages
      - API routes
    */
    '/dashboard/:path*',
    '/api/dashboard/:path*',
  ],
}
