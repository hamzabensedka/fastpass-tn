alter table public.profiles
  add column if not exists last_lat double precision,
  add column if not exists last_lng double precision,
  add column if not exists last_location_at timestamptz;

create index if not exists profiles_last_location_idx
  on public.profiles (last_location_at desc)
  where last_lat is not null and last_lng is not null;
