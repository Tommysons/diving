# LokaWndr

LokaWndr is an ocean adventure website for discovering scuba diving, snorkeling and marine life. It currently focuses on Koh Tao, Thailand, and the Vilu Reef area of the Maldives.

- Website: https://lokawndr.com
- Repository: https://github.com/Tommysons/diving
- Languages: English and Russian (`/ru`)

## What is available

- A responsive home page with ocean animation, destination links, videos and recent blog posts.
- Activities pages for scuba courses and snorkeling, including snorkeling lessons, wildlife excursions and blue-light night snorkeling. Locations, conditions and availability should be confirmed separately.
- Thailand and Maldives destination pages with interactive illustrated dive-site maps and site information.
- An Explore Earth atlas with a globe and destination maps. Map positions are approximate and **not for navigation**.
- Individual dive-site guides with descriptions, conditions, galleries and previous/next navigation. Only photo-backed Koh Tao guides are published; unfinished guides remain in the source data but are hidden from public navigation and the sitemap.
- An Udhdhoo Reef guide with LokaWndr photography and user-provided current and visibility information.
- Blog, about, contact and course pages; selected relevant YouTube videos are linked from dive-site guides.
- A contact form and backend routes for booking, availability and an authenticated dashboard. These integrations depend on external services and configuration; their presence does not verify that bookings or email delivery work in a given environment.
- Responsive navigation, image optimization, reduced-motion support, page metadata, `robots.txt` and a sitemap. Some decorative ocean imagery is AI-generated and labelled on the page.

## Technology

Next.js App Router, React, TypeScript and Tailwind CSS. Animation uses CSS, Framer Motion, GSAP and Three.js where appropriate. The repository also includes integrations for Clerk authentication, MongoDB, Resend email and Vercel Analytics. The site is deployed through Vercel.

## Run locally

Install the dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Before running integrated features, add the appropriate service credentials to `.env.local`; never commit secrets. The application references:

- `MONGODB_URI` and `MONGODB_DB` for database-backed routes.
- `RESEND_API_KEY` and `ADMIN_EMAIL` for email and administrative functions.
- Clerk publishable and secret keys for authentication (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`).

A production build also evaluates server routes, so missing configuration such as `MONGODB_URI` can cause the build to fail. Placeholder values may suffice for an isolated build check but do not test real integrations.

```bash
npm run build
npm start
```

## Project structure

- `src/app/` — App Router pages, API routes, metadata, sitemap and Russian routes.
- `src/components/` — shared layouts, navigation, maps, galleries and animation components.
- `src/lib/data/` — dive-site, course and blog content.
- `public/images/` — optimized photographs, illustrations and other image assets.

Keep English and Russian content, links and metadata aligned when making changes. Do not present generated illustrations or approximate maps as photographs or verified positions of a specific site.

## Priorities and future work

1. Monitor Google Search Console indexing and search queries after the successful sitemap submission; prioritize ranking improvements and useful internal links over repeated manual indexing requests.
2. Expand destination and dive-site guides with the owner's verified first-hand details, original photos, relevant videos and current local conditions. Avoid inventing depths or promising wildlife encounters.
3. Test contact and booking journeys end to end with the configured services; clarify availability, locations and pricing when confirmed.
4. Test the latest deployment on phones and slower connections, including keyboard navigation, reduced motion, contrast and image loading. Measure performance before and after changes.
5. Use audience and search data to choose useful blog and video topics, and connect relevant YouTube videos and dive-site guides.
6. Review translations, dependencies and security regularly. Keep future ideas such as new activities, dive trips, a dive planner, a page for Mia, course follow-up information and alternative payments as proposals until requirements are decided.

## Deployment

Work on a feature branch and check the build before merging. Merging to `main` can trigger a Vercel production deployment: obtain the owner's approval before merging or deploying to production. Review the Vercel deployment status after a merge.

## November 2026 project update

The following changes have been merged to `main`:

- Refreshed the ocean-focused home page, activities and destinations navigation, interactive Earth and Koh Tao/Maldives experiences, and bilingual EN/RU content and metadata.
- Expanded the Maldives dive-site guides (including Udhdhoo Reef, Wella Giri, Lhohi Caves and Yuki Reef), dive-site photography, blog stories, and relevant YouTube content.
- Added localized blog-index metadata and improved canonical and language-alternate signals (PR #39).
- Temporarily disabled FAQ and Gallery pages in both languages, returning 404 and removing their URLs from the sitemap (PR #40).
- Limited published Koh Tao dive-site guides to Chumphon Pinnacle, Southwest Pinnacle, White Rock, Twins, Sattakut Shipwreck and 313 Shipwreck. Eleven placeholder-image guides are disabled in EN/RU, omitted from the sitemap and excluded from navigation, atlas and previous/next links (PR #41). Source content is preserved for later completion.
- Submitted `https://lokawndr.com/sitemap.xml` to Google Search Console. Live URL inspection confirms that multiple EN/RU pages are eligible for indexing; eligibility and an indexing request do **not** guarantee that Google has indexed a URL. Track actual indexing and search impressions separately.

### Publication workflow

- Add verified site descriptions, original photography and matching EN/RU translations before publishing a new dive-site guide.
- For Koh Tao, publication currently depends on a non-placeholder `imageUrl` in `src/lib/data/diveSites.ts`; `publishedDiveSites` and `publishedDiveSitesRU` drive the sitemap, destination listing, atlas, directory and guide navigation. A dedicated `status: 'draft' | 'published'` field would be safer long term.
- Temporarily disabled FAQ and Gallery route components remain in Git history; restore only when ready, and re-add routes to the sitemap deliberately.
- After merging to `main`, verify that Vercel reports a **READY** production deployment before claiming a change is live.

### Technical audit and roadmap (November 2026)

**Next priorities:**

1. Add `lint`, `typecheck`, and automated test scripts plus CI checks for pull requests. The current `package.json` has only `dev`, `build`, and `start` scripts.
2. Validate EN/RU document-language attributes, canonicals, hreflang links, accessibility and metadata for all routes. The root HTML layout currently sets `lang='en'`; confirm how Russian pages override it.
3. Measure mobile Core Web Vitals on production, particularly animation and image loading; preserve reduced-motion behavior and optimize heavy interactive components.
4. Test the contact form, email delivery, authentication and booking endpoints end to end in a configured staging environment before describing them as operational.
5. Strengthen contextual links between blog posts, dive-site guides, destinations and relevant YouTube videos; use Search Console impressions and queries to choose new articles.
6. Replace implicit image-based publishing with explicit draft/published status, and introduce content-validation checks to prevent missing images, broken links and EN/RU gaps.
7. Consider booking workflows, trip discovery, payments and a broader activity marketplace only after audience demand, fulfillment and operational requirements are validated.

**Dependency review:** `package.json` and `package-lock.json` currently agree on direct dependency ranges. Next.js and `eslint-config-next` share the same major/version range, as do React and React DOM. No dependency versions were changed in this documentation update: determining which upgrades are safe requires current npm registry/advisory information, lockfile regeneration and a passing build/test run. Review security advisories and upgrade in a separate, tested pull request rather than blindly bumping versions.
