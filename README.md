# Metro Mow Crew

Marketing website and lightweight operations portal for **Metro Mow Crew** — landscaping and lawn care in Indianapolis, Avon, Plainfield, and nearby areas.

Forked from the `targetlawnpro` landscape template. See `docs/CONTENT_NOTES.md` for scrape source and ops naming.

Built on the Signal Works stack: Next.js App Router, Tailwind, shared Supabase Auth/DB, Resend.

## Local setup

```bash
npm install
cp .env.example .env.local
# fill Supabase + Resend + WEIDNER_TENANT_ID (Metro Mow Crew tenant)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example`.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_SUPABASE_URL` / `ANON_KEY` | Shared Signal Works Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only lead inserts & uploads |
| `WEIDNER_TENANT_ID` | `select id from tenants where slug = 'metromowcrew'` |
| `RESEND_API_KEY` / `EMAIL_FROM` / `ADMIN_NOTIFY_EMAIL` | Transactional email |

Search indexing is **hardcoded off** (`siteAllowIndexing` in `src/config/site.ts`) until you explicitly opt in for launch.

Without Supabase, estimate/contact forms run in **demo mode** (log + success UI, no persistence).

## Database migrations

Apply in order on the shared Signal Works Supabase project:

`supabase-signalworks/migrations/`

1. `001_weidner_tenant_registration.sql` (registers `metromowcrew` tenant)
2. `002_weidner_schema.sql`
3. `003_weidner_rls.sql`
4. `004_weidner_storage.sql` (or Dashboard bucket + `004b_…`)
5. `005_weidner_rls_assertions.sql`

Then set `WEIDNER_TENANT_ID` and provision staff via `scripts/grant-staff-access.sql`.

## Content

- `src/config/site.ts` — business contact & service area
- `src/data/services.ts`, `reviews.ts`, `gallery.ts`, `about.ts`
- `public/images/metromowcrew/` — brand photos from legacy Wix site

## Deployment

Deploy to Vercel (`metromowcrew` GitHub repo). Set env vars per environment.
