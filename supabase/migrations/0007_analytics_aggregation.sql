create or replace function public.aggregate_restaurant_stats(p_stat_date date default current_date - 1)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  affected integer;
begin
  insert into public.daily_restaurant_stats (
    restaurant_id,
    stat_date,
    scans,
    unique_customers,
    total_spend_dt,
    total_points_issued,
    total_redemptions
  )
  select
    restaurant_id,
    p_stat_date,
    count(*)::integer,
    count(distinct user_id)::integer,
    coalesce(sum(amount_dt), 0),
    coalesce(sum(points_earned), 0)::integer,
    (
      select count(*)::integer
      from public.redemptions r
      where r.restaurant_id = t.restaurant_id
        and r.status = 'used'
        and r.redeemed_at::date = p_stat_date
    )
  from public.transactions t
  where t.created_at::date = p_stat_date
  group by restaurant_id
  on conflict (restaurant_id, stat_date)
  do update set
    scans = excluded.scans,
    unique_customers = excluded.unique_customers,
    total_spend_dt = excluded.total_spend_dt,
    total_points_issued = excluded.total_points_issued,
    total_redemptions = excluded.total_redemptions;

  get diagnostics affected = row_count;
  return affected;
end;
$$;

grant execute on function public.aggregate_restaurant_stats(date) to service_role;
