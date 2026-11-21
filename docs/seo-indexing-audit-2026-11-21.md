# SEO indexing audit — 2026-11-21

## Scope and verification
- Repository: `Tommysons/diving`, compared against `main`.
- Reviewed `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, both EN/RU blog article layouts, both blog indexes, and `next.config.ts`.
- Public web fetches of `/robots.txt`, `/sitemap.xml` and one RU blog article were inconclusive due to fetch errors; do not interpret those errors as site failures.
- No live HTTP header/status verification, Search Console API access, or build execution was completed in this audit.

## Confirmed in source
1. Root `src/app/layout.tsx` hardcodes `<html lang='en'>`. All Russian routes inherit the English HTML language declaration. Fixing this properly requires a coordinated locale-aware root-layout routing refactor; do not add a nested `<html>` in `src/app/ru/layout.tsx`.
2. Root metadata explicitly allows indexing and following links. `src/app/robots.ts` allows all crawlers and points to the sitemap. These files do not support a claim of a global `noindex` bug.
3. `src/app/sitemap.ts` includes paired EN/RU URL entries and hreflang alternates. Check actual generated output and HTTP responses before claiming it is fully valid.
4. Both EN/RU blog article `layout.tsx` files already generate unique titles, descriptions, canonicals, hreflang alternates, Open Graph article data, Twitter cards, and BlogPosting JSON-LD. Do not add duplicate metadata to the client page components.
5. English and Russian blog index routes already have dedicated metadata layouts.

## Changes on this feature branch
- Explicit Open Graph locale for EN and RU blog articles, preserving existing metadata and structured data.

## Search Console follow-up
- The historical report from 2026-11-16 listed 34 noindex exclusions, 44 discovered-not-indexed and 1 crawled-not-indexed. Some URLs later showed indexed in individual URL Inspection. Treat the aggregate report as potentially stale until refreshed.
- Export current affected URLs and inspect representative examples individually, including Google's indexed canonical, user-declared canonical, robots directives and last crawl.
- Confirm `/robots.txt`, `/sitemap.xml`, HTTP→HTTPS redirects, both language versions, retired `/divesites` listing redirects, and an active dive-site page using direct HTTP checks.
- Check `<html lang>` and canonical/hreflang in actual rendered HTML for EN/RU pages.
- Validate EN/RU sitemap parity, that every sitemap URL returns 200, and that no retired/404 URL is listed.
- Run `npm ci`, `npm run lint` (if defined), `npm run build` and metadata smoke tests on the preview before merging.

## Caution
Do not bulk-request indexing of redirects, 404 pages, or URLs already indexed. Do not infer that `Discovered – currently not indexed` requires code changes; Google may simply not have crawled those URLs yet.
