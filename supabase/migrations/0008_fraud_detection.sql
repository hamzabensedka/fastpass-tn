create or replace function public.detect_scan_fraud(p_window_minutes integer default 5)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted integer;
begin
  insert into public.admin_alerts (restaurant_id, alert_type, severity, metadata)
  select
    restaurant_id,
    'scan_burst',
    'high',
    jsonb_build_object(
      'scanCount', count(*),
      'windowMinutes', p_window_minutes,
      'detectedAt', now()
    )
  from public.transactions
  where created_at >= now() - make_interval(mins => p_window_minutes)
  group by restaurant_id
  having count(*) >= 20
  on conflict do nothing;

  get diagnostics inserted = row_count;
  return inserted;
end;
$$;

grant execute on function public.detect_scan_fraud(integer) to service_role;
