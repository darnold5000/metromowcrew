# Migration safety review — Metro Mow Crew on shared Signal Works Supabase

| Check | Status |
|-------|--------|
| Every `weidner_*` table includes `tenant_id` FK → `tenants` | Yes (002) |
| RLS enabled on all `weidner_*` tables | Yes (003) |
| Policies use app staff helpers (DAWG-style), not portal membership alone | Yes — `weidner_is_staff` / `weidner_is_admin` (003) |
| No anon write to ops tables | Yes |
| `METROMOWCREW_TENANT_ID` server-only, not from form input | Yes — `getMetroMowCrewTenantId()`; APIs reject client `tenant_id` |
| Photo bucket private; path scoped by tenant | Yes (004) |
| Namespaced objects (`weidner_` prefix) | Yes — lawn-ops module; no collision with `ma5_`, `training_`, etc. |
| Idempotent tenant upsert | Yes (001) — upserts `metromowcrew` only |

## Why not `is_tenant_member` alone?

`public.is_tenant_member()` is the platform portal membership helper. A Signal Works Clients member or DAWG staff must **not** automatically access Metro Mow Crew ops data.

This app follows the DAWG pattern (`training_is_staff`): access requires an active `weidner_staff_profiles` row for **this** `tenant_id`. Platform Auth login without that row → `/access-disabled`.

## Apply order (new shared DB)

1. `001_weidner_tenant_registration.sql`
2. `002_weidner_schema.sql`
3. `003_weidner_rls.sql`
4. `004_weidner_storage.sql` — if bucket insert fails with ownership error, create private bucket in Dashboard then run `004b_weidner_storage_policies_only.sql`
5. `005_weidner_rls_assertions.sql`

On a DB that already has 002–005 from another lawn client, run **001** for Metro’s tenant row only.

Set `METROMOWCREW_TENANT_ID` from:

```sql
select id from public.tenants where slug = 'metromowcrew';
```
