# Metro Mow Crew

Marketing website and lightweight operations portal for **Metro Mow Crew** — landscaping and lawn care in Indianapolis, Avon, Plainfield, and nearby areas.

Forked from the `targetlawnpro` landscape template. See `docs/CONTENT_NOTES.md` for scrape source and ops naming.

Built on the Signal Works stack: Next.js App Router, Tailwind, shared Supabase Auth/DB, Resend.

## Local setup

```bash
npm install
cp .env.example .env.local
# fill Supabase + Resend + METROMOWCREW_TENANT_ID
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
| `METROMOWCREW_TENANT_ID` | `select id from tenants where slug = 'metromowcrew'` (legacy `WEIDNER_TENANT_ID` still works) |
| `RESEND_API_KEY` / `EMAIL_FROM` / `ADMIN_NOTIFY_EMAIL` | Transactional email |

Search indexing is **hardcoded off** (`siteAllowIndexing` in `src/config/site.ts`) until you explicitly opt in for launch.

Without Supabase, estimate/contact forms run in **demo mode** (log + success UI, no persistence).

## Database migrations

**Check first** (tells you if 002–005 are already on shared Signal Works from another lawn client):

```bash
npm run db:migrate:status
```

**Apply:** run core migrations 001–005 via npm (requires `DATABASE_URL` in `.env.local`):

```bash
# Shared production — add guard when prompted by the script
METROMOWCREW_MIGRATE_CONFIRM=gezdzzqnylloaxcmuzvm npm run db:migrate
npm run db:staff
```

The migrate script prints `METROMOWCREW_TENANT_ID` after 001.

Manual SQL lives in `supabase-signalworks/migrations/` (same order). If `004` bucket insert fails, create private bucket `weidner-lead-photos` in the Dashboard, then run `004b_weidner_storage_policies_only.sql` instead of re-running `004`.

## Content

- `src/config/site.ts` — business contact & service area
- `src/data/services.ts`, `reviews.ts`, `gallery.ts`, `about.ts`
- `public/images/metromowcrew/` — brand photos from legacy Wix site

## Deployment

Deploy to Vercel (`metromowcrew` GitHub repo). Set env vars per environment.
