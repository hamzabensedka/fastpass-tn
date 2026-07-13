insert into public.profiles (id, phone, email, full_name, role, consented_at)
values
  ('00000000-0000-0000-0000-000000000001', '+21620000001', 'admin@fastpass.tn', 'FastPass Admin', 'platform_admin', now()),
  ('00000000-0000-0000-0000-000000000002', '+21620000002', 'owner@kiko.tn', 'Kiko Owner', 'restaurant_owner', now()),
  ('00000000-0000-0000-0000-000000000003', '+21620000003', null, 'Demo Customer', 'customer', now())
on conflict (id) do nothing;

insert into public.restaurant_groups (id, owner_id, name)
values ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Kiko Group')
on conflict (id) do nothing;

insert into public.restaurants (
  id,
  group_id,
  owner_id,
  name,
  slug,
  address,
  city,
  lat,
  lng,
  status
)
values (
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  'Kiko Tunis',
  'kiko-tunis',
  'Avenue Habib Bourguiba',
  'Tunis',
  36.8065,
  10.1815,
  'active'
)
on conflict (id) do nothing;

insert into public.point_balances (user_id, total_points)
values ('00000000-0000-0000-0000-000000000003', 120)
on conflict (user_id) do nothing;

insert into public.rewards (id, restaurant_id, title, description, points_cost, reimbursement_value_dt)
values (
  '30000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'Free Sandwich',
  'Redeem at the counter within 10 minutes.',
  100,
  8
)
on conflict (id) do nothing;

insert into public.deals (id, restaurant_id, title, description, status, is_promoted, starts_at, ends_at)
values (
  '40000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'Lunch menu -20%',
  'Available today from 12:00 to 15:00.',
  'approved',
  true,
  now() - interval '1 day',
  now() + interval '7 days'
)
on conflict (id) do nothing;
