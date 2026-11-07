# Metro Mow Crew — content notes

Cloned from `targetlawnpro` (landscape marketing + ops template). Public copy and images were sourced from [metromowcrew.com](https://www.metromowcrew.com/) in Nov 2026.

## Verified from public site

| Item | Value |
|------|--------|
| Brand | Metro Mow Crew |
| Phone | (317) 767-5689 |
| Email | sales@metromowcrew.com |
| Service area | Indianapolis, Avon, Plainfield, and nearby |
| Services | Mowing, Mulching, Aeration, Yard Clean-Up, Leaf Clean-Up (+ Bush Trimming on `/services`) |

## Images

Downloaded to `public/images/metromowcrew/` from Wix CDN (`static.wixstatic.com`). Replace with higher-res client assets when available.

## Backend naming (legacy product prefix)

Shared lawn-ops tables remain **`weidner_*`** (module prefix on Signal Works Supabase). Data is isolated by **`tenant_id`**.

| Concept | Value |
|---------|--------|
| Tenant slug | `metromowcrew` |
| Server env | `METROMOWCREW_TENANT_ID` (`WEIDNER_TENANT_ID` accepted as deprecated fallback) |

## Do not invent

- Pricing, licenses, or service areas beyond what the client confirms
- Additional reviews beyond the three on the legacy site
