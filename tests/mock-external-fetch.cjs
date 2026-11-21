// Only loaded by the isolated CI test server. No external requests leave it.
const originalFetch = globalThis.fetch
globalThis.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
  if (url.startsWith('https://api.resend.com/')) {
    return new Response(JSON.stringify({ id: 'isolated-test-email' }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }
  if (!/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(url)) throw new Error('External network blocked in isolated tests: ' + url)
  return originalFetch(input, init)
}
