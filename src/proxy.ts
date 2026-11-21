import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Pass the requested locale to the root server layout so the initial HTML
// contains the correct language, including for search engine crawlers.
export default clerkMiddleware(async (auth, request) => {
  const pathname = request.nextUrl.pathname
  if (/^\/(dashboard|account|protected)(\/|$)/.test(pathname) ||
      /^\/api\/dashboard(\/|$)/.test(pathname)) {
    await auth.protect()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-lokawndr-locale', /^\/ru(\/|$)/.test(pathname) ? 'ru' : 'en')
  return NextResponse.next({ request: { headers: requestHeaders } })
})

export const config = {
  matcher: ['/((?!_next/|.*\\.(?:ico|png|jpg|jpeg|webp|svg|gif|avif|css|js|txt|xml|woff|woff2|map)$).*)'],
}
