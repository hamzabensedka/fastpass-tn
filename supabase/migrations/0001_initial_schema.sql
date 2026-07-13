create extension if not exists "pgcrypto";
create extension if not exists "postgis";

create type public.app_role as enum ('customer', 'cashier', 'restaurant_owner', 'platform_admin');
create type public.restaurant_status as enum ('pending', 'active', 'grace_period', 'hidden', 'suspended');
create type public.deal_status as enum ('draft', 'pending_approval', 'approved', 'rejected', 'expired');
create type public.redemption_status as enum ('pending', 'used', 'expired', 'cancelled');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'cancelled');
create type public.payment_provider as enum ('flouci', 'konnect', 'manual');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text unique,
  email text unique,
  full_name text not null default '',
  role public.app_role not null default 'customer',
  is_premium boolean not null default false,
  premium_device_count integer not null default 0 check (premium_device_count <= 2),
  locale text not null default 'fr' check (locale in ('fr', 'ar')),
  consented_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.restaurant_groups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete restrict,
  name text not null,
  created_at timestamptz not null default now()
);

create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references public.restaurant_groups(id) on delete set null,
  owner_id uuid not null references public.profiles(id) on delete restrict,
  name text not null,
  slug text not null unique,
  address text not null,
  city text not null,
  lat double precision not null,
  lng double precision not null,
  location geography(point, 4326) generated always as (st_makepoint(lng, lat)::geography) stored,
  status public.restaurant_status not null default 'pending',
  daily_scan_limit integer not null default 1000,
  max_transaction_dt numeric(10, 2) not null default 500,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.restaurant_devices (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  device_name text not null,
  device_fingerprint text not null,
  pin_hash text not null,
  is_active boolean not null default true,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  unique (restaurant_id, device_fingerprint)
);

create table public.point_balances (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  total_points integer not null default 0 check (total_points >= 0),
  last_activity_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  restaurant_id uuid not null references public.restaurants(id) on delete restrict,
  device_id uuid references public.restaurant_devices(id) on delete set null,
  amount_dt numeric(10, 2) not null check (amount_dt >= 1 and amount_dt <= 500),
  points_earned integer not null check (points_earned >= 0),
  idempotency_key text not null unique,
  source text not null default 'online' check (source in ('online', 'offline_sync')),
  scanned_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table public.rewards (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  title text not null,
  description text not null default '',
  points_cost integer not null check (points_cost > 0),
  reimbursement_value_dt numeric(10, 2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.redemptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  reward_id uuid not null references public.rewards(id) on delete restrict,
  restaurant_id uuid references public.restaurants(id) on delete restrict,
  code_hash text not null,
  status public.redemption_status not null default 'pending',
  points_cost integer not null check (points_cost > 0),
  reimbursement_value_dt numeric(10, 2) not null default 0,
  expires_at timestamptz not null,
  redeemed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  title text not null,
  description text not null,
  image_path text,
  status public.deal_status not null default 'draft',
  is_promoted boolean not null default false,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null unique references public.restaurants(id) on delete cascade,
  provider public.payment_provider not null default 'flouci',
  provider_customer_id text,
  tier text not null default 'starter',
  status public.subscription_status not null default 'trialing',
  monthly_fee_dt numeric(10, 2) not null default 150,
  reward_credit_balance_dt numeric(10, 2) not null default 0,
  current_period_start timestamptz not null default now(),
  current_period_end timestamptz not null default (now() + interval '30 days'),
  grace_period_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  provider public.payment_provider not null,
  provider_payment_id text,
  amount_dt numeric(10, 2) not null check (amount_dt >= 0),
  status text not null,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.notification_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null default 'expo',
  token text not null unique,
  locale text not null default 'fr',
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.daily_restaurant_stats (
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  stat_date date not null,
  scans integer not null default 0,
  unique_customers integer not null default 0,
  total_spend_dt numeric(12, 2) not null default 0,
  total_points_issued integer not null default 0,
  total_redemptions integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (restaurant_id, stat_date)
);

create table public.admin_alerts (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants(id) on delete set null,
  user_id uuid references public.profiles(id) on delete set null,
  alert_type text not null,
  severity text not null default 'medium',
  metadata jsonb not null default '{}',
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create index transactions_user_created_idx on public.transactions (user_id, created_at desc);
create index transactions_restaurant_created_idx on public.transactions (restaurant_id, created_at desc);
create index restaurants_location_idx on public.restaurants using gist (location);
create index deals_restaurant_status_idx on public.deals (restaurant_id, status, starts_at, ends_at);
create index redemptions_code_hash_idx on public.redemptions (code_hash) where status = 'pending';
create index admin_alerts_unresolved_idx on public.admin_alerts (created_at desc) where resolved_at is null;

alter table public.profiles enable row level security;
alter table public.restaurant_groups enable row level security;
alter table public.restaurants enable row level security;
alter table public.restaurant_devices enable row level security;
alter table public.point_balances enable row level security;
alter table public.transactions enable row level security;
alter table public.rewards enable row level security;
alter table public.redemptions enable row level security;
alter table public.deals enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.notification_tokens enable row level security;
alter table public.daily_restaurant_stats enable row level security;
alter table public.admin_alerts enable row level security;

create or replace function public.current_role()
returns public.app_role
language sql
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_platform_admin()
returns boolean
language sql
stable
as $$
  select coalesce(public.current_role() = 'platform_admin', false)
$$;

create or replace function public.owns_restaurant(restaurant_uuid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.restaurants
    where id = restaurant_uuid and owner_id = auth.uid()
  )
$$;

create policy "profiles_self_read" on public.profiles
  for select using (id = auth.uid() or public.is_platform_admin());

create policy "profiles_self_update" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "restaurants_public_active_read" on public.restaurants
  for select using (status = 'active' or owner_id = auth.uid() or public.is_platform_admin());

create policy "restaurants_owner_update" on public.restaurants
  for update using (owner_id = auth.uid() or public.is_platform_admin());

create policy "restaurant_devices_owner_manage" on public.restaurant_devices
  for all using (public.owns_restaurant(restaurant_id) or public.is_platform_admin());

create policy "point_balances_self_read" on public.point_balances
  for select using (user_id = auth.uid() or public.is_platform_admin());

create policy "transactions_customer_or_owner_read" on public.transactions
  for select using (
    user_id = auth.uid()
    or public.owns_restaurant(restaurant_id)
    or public.is_platform_admin()
  );

create policy "rewards_active_read" on public.rewards
  for select using (
    is_active = true
    or restaurant_id is null
    or public.owns_restaurant(restaurant_id)
    or public.is_platform_admin()
  );

create policy "redemptions_self_or_owner_read" on public.redemptions
  for select using (
    user_id = auth.uid()
    or public.owns_restaurant(restaurant_id)
    or public.is_platform_admin()
  );

create policy "deals_public_approved_read" on public.deals
  for select using (
    status = 'approved'
    or public.owns_restaurant(restaurant_id)
    or public.is_platform_admin()
  );

create policy "deals_owner_manage" on public.deals
  for all using (public.owns_restaurant(restaurant_id) or public.is_platform_admin());

create policy "subscriptions_owner_read" on public.subscriptions
  for select using (public.owns_restaurant(restaurant_id) or public.is_platform_admin());

create policy "payments_owner_read" on public.payments
  for select using (
    public.is_platform_admin()
    or exists (
      select 1
      from public.subscriptions s
      where s.id = subscription_id
      and public.owns_restaurant(s.restaurant_id)
    )
  );

create policy "notification_tokens_self_manage" on public.notification_tokens
  for all using (user_id = auth.uid() or public.is_platform_admin());

create policy "daily_stats_owner_read" on public.daily_restaurant_stats
  for select using (public.owns_restaurant(restaurant_id) or public.is_platform_admin());

create policy "admin_alerts_admin_only" on public.admin_alerts
  for all using (public.is_platform_admin());
