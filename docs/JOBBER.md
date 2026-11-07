# Jobber request form

Public quotes on `/request-quote` go to the owner’s Jobber account. This site does not store quote submissions.

## Setup

1. In Jobber: **Settings → Requests and Bookings**.
2. Hover the form → **More actions → Share links**.
3. **Copy code** (HTML iframe) and/or **Copy link**.
4. Set in `.env.local` / Vercel:

```bash
NEXT_PUBLIC_JOBBER_EMBED_SRC=<iframe src URL, or paste the full Copy code HTML>
NEXT_PUBLIC_JOBBER_REQUEST_URL=<optional Client Hub request URL>
```

Restart `npm run dev` after changing env.

Until those vars are set, `/request-quote` shows a labeled **demo preview** that does not submit.

## Two forms — do not duplicate

| Path | Use | Destination |
|------|-----|-------------|
| `/request-quote` | Lawn work quotes | Jobber only |
| `/contact` | Questions / talk with the owner | Custom contact form (email/ops). UTM stored here. |

Do not POST quote requests to `/api/contact` or `/api/estimate`. Jobber iframe conversions are **not** assumed in site UTM tracking until verified.
