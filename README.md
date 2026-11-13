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
- Individual dive-site guides with descriptions, conditions, galleries and previous/next navigation. Some guides contain placeholders where site-specific information or photos are not yet available.
- An Udhdhoo Reef guide with LokaWndr photography and user-provided current and visibility information.
- Blog, about, FAQ, gallery, contact and course pages; selected relevant YouTube videos are linked from dive-site guides.
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

1. Check Google Search Console ownership, indexing, search queries and sitemap submission; confirm which pages are actually discoverable.
2. Expand destination and dive-site guides with the owner's verified first-hand details, original photos, relevant videos and current local conditions. Avoid inventing depths or promising wildlife encounters.
3. Test contact and booking journeys end to end with the configured services; clarify availability, locations and pricing when confirmed.
4. Test the latest deployment on phones and slower connections, including keyboard navigation, reduced motion, contrast and image loading. Measure performance before and after changes.
5. Use audience and search data to choose useful blog and video topics, and connect relevant YouTube videos and dive-site guides.
6. Review translations, dependencies and security regularly. Keep future ideas such as new activities, dive trips, a dive planner, a page for Mia, course follow-up information and alternative payments as proposals until requirements are decided.

## Deployment

Work on a feature branch and check the build before merging. Merging to `main` can trigger a Vercel production deployment: obtain the owner's approval before merging or deploying to production. Review the Vercel deployment status after a merge.
