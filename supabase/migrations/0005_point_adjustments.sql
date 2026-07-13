create table public.point_adjustments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  admin_id uuid references public.profiles(id) on delete set null,
  points_delta integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);

alter table public.point_adjustments enable row level security;

create policy "point_adjustments_admin_only" on public.point_adjustments
  for all using (public.is_platform_admin());

create or replace function public.adjust_points(
  p_user_id uuid,
  p_admin_id uuid,
  p_points_delta integer,
  p_reason text
)
returns public.point_adjustments
language plpgsql
security definer
set search_path = public
as $$
declare
  adjustment public.point_adjustments;
begin
  insert into public.point_balances (user_id, total_points, last_activity_at)
  values (p_user_id, greatest(p_points_delta, 0), now())
  on conflict (user_id)
  do update set
    total_points = greatest(public.point_balances.total_points + p_points_delta, 0),
    last_activity_at = now(),
    updated_at = now();

  insert into public.point_adjustments (user_id, admin_id, points_delta, reason)
  values (p_user_id, p_admin_id, p_points_delta, p_reason)
  returning * into adjustment;

  return adjustment;
end;
$$;

grant execute on function public.adjust_points(uuid, uuid, integer, text) to service_role;
