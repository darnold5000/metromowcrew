# Metro Mow Crew — launch checklist

## Before applying migrations

- [ ] Review `docs/MIGRATION-SAFETY.md`
- [ ] Confirm `weidner_` lawn-ops prefix is registered in shared-supabase products map
- [ ] Confirm RLS isolation plan in `docs/RLS-ISOLATION.md`

## Apply (shared Signal Works Supabase)

1. [ ] `001_weidner_tenant_registration.sql` (registers `metromowcrew` tenant)
2. [ ] `002_weidner_schema.sql` — skip if already applied on shared DB
3. [ ] `003_weidner_rls.sql` — skip if already applied
4. [ ] `004_weidner_storage.sql` (or Dashboard bucket + `004b`)
5. [ ] `005_weidner_rls_assertions.sql` — skip if already applied
6. [ ] Run `scripts/rls-isolation-test.sql` sections A1–A3 for **this** tenant
7. [ ] API cross-tenant JWT test (section B) — **do not rely on SQL Editor alone**

## Configure

- [ ] `METROMOWCREW_TENANT_ID` from `select id from tenants where slug = 'metromowcrew'`
- [ ] `NEXT_PUBLIC_SUPABASE_URL` / `ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Resend: `RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_NOTIFY_EMAIL`
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] Search indexing stays off until launch (`siteAllowIndexing` in `src/config/site.ts`)
- [ ] Provision staff: `scripts/grant-staff-access.sql`

## Production flow test

- [ ] Submit estimate
- [ ] Upload photos
- [ ] Customer + admin emails received
- [ ] Open lead in admin
- [ ] Add note + change status
- [ ] Convert lead → customer
- [ ] Create estimate
- [ ] Convert estimate → job
- [ ] Create recurring service
- [ ] RLS: user without `weidner_staff_profiles` for this tenant cannot see Metro rows

## Soft launch

- [ ] Owner review of copied content/images
- [ ] Connect final domain
- [ ] Flip `siteAllowIndexing` to `true` only after approval + redeploy

## Deferred

Invoicing, payments, routing, crew assignment, weather automation, customer portal.
