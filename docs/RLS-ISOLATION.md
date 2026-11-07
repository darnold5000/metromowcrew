# RLS isolation — Metro Mow Crew (shared `weidner_*` lawn-ops schema)

Highest-risk area on the shared production database: cross-tenant data leakage.

## Access matrix

| Actor | Must see Metro Mow Crew ops data? |
|-------|-----------------------------------|
| Anonymous | No |
| Authenticated user with no `weidner_staff_profiles` row for this tenant | No |
| Metro Mow Crew staff | Only rows where `tenant_id` = Metro tenant |
| Staff of another tenant (DAWG/MA5/Lopez/etc.) | No Metro rows |

## Verification layers

1. **Structural** — `scripts/rls-isolation-test.sql`  
   Asserts RLS on all `weidner_*` tables, private bucket, `metromowcrew` tenant row exists.

2. **API JWT** — section B in the same script  
   - Metro staff JWT → can read own leads  
   - Other-tenant JWT → `[]` on `weidner_leads` for Metro tenant

3. **Application**  
   - `METROMOWCREW_TENANT_ID` only from env  
   - Client payloads with `tenant_id` are rejected

## Data flow

```
Form / API body  →  never trusted for tenant_id
Server           →  getMetroMowCrewTenantId() from env
DB RLS           →  weidner_is_staff(tenant_id)
Trigger          →  tenant_id immutable on UPDATE
```

## Pre-launch

- [ ] Section A (A1–A3) PASS for `metromowcrew`
- [ ] Cross-tenant API test (B2/B3) PASS
- [ ] Staff without profile gets `/access-disabled`
