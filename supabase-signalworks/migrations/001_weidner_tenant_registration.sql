-- Migration 001: Register Metro Mow Crew tenant on Signal Works Pro (idempotent).
-- Safe for shared production: only upserts the metromowcrew row; does not alter
-- other tenants or overwrite global table comments.

insert into public.tenants (
  slug,
  display_name,
  status,
  platform_category
)
values (
  'metromowcrew',
  'Metro Mow Crew',
  'active',
  'services'
)
on conflict (slug) do update
set
  display_name = excluded.display_name,
  status = excluded.status,
  platform_category = excluded.platform_category,
  updated_at = now();

-- Resolve for app env:
--   select id from public.tenants where slug = 'metromowcrew';
