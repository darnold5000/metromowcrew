-- Metro Mow Crew — provision owner staff profile (run on Signal Works Supabase after 001–005).
-- Requires: tenant slug metromowcrew (migration 001) and auth user below.

-- Owner Auth user (Signal Works shared Supabase)
--   id: 63ebe3bb-79d6-4ae3-aac9-e2e3403805e0

insert into public.weidner_staff_profiles (
  tenant_id,
  user_id,
  role,
  full_name,
  email,
  is_active
)
select
  t.id,
  '63ebe3bb-79d6-4ae3-aac9-e2e3403805e0'::uuid,
  'owner',
  coalesce(u.raw_user_meta_data->>'full_name', 'Metro Mow Crew Owner'),
  u.email,
  true
from public.tenants t
cross join auth.users u
where t.slug = 'metromowcrew'
  and u.id = '63ebe3bb-79d6-4ae3-aac9-e2e3403805e0'::uuid
on conflict (tenant_id, user_id) do update
set
  role = 'owner',
  full_name = excluded.full_name,
  email = excluded.email,
  is_active = true,
  updated_at = now();
