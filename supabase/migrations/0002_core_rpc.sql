create or replace function public.process_scan(
  p_user_id uuid,
  p_restaurant_id uuid,
  p_device_id uuid,
  p_amount_dt numeric,
  p_points_earned integer,
  p_idempotency_key text,
  p_source text,
  p_scanned_at timestamptz
)
returns public.transactions
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_transaction public.transactions;
begin
  if p_amount_dt < 1 or p_amount_dt > 500 then
    raise exception 'invalid_amount' using errcode = '22003';
  end if;

  insert into public.transactions (
    user_id,
    restaurant_id,
    device_id,
    amount_dt,
    points_earned,
    idempotency_key,
    source,
    scanned_at
  )
  values (
    p_user_id,
    p_restaurant_id,
    p_device_id,
    p_amount_dt,
    p_points_earned,
    p_idempotency_key,
    p_source,
    p_scanned_at
  )
  returning * into inserted_transaction;

  insert into public.point_balances (user_id, total_points, last_activity_at)
  values (p_user_id, p_points_earned, now())
  on conflict (user_id)
  do update set
    total_points = public.point_balances.total_points + excluded.total_points,
    last_activity_at = now(),
    updated_at = now();

  return inserted_transaction;
exception
  when unique_violation then
    select *
    into inserted_transaction
    from public.transactions
    where idempotency_key = p_idempotency_key;

    return inserted_transaction;
end;
$$;

create or replace function public.redeem_code(
  p_code_hash text,
  p_restaurant_id uuid
)
returns public.redemptions
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_redemption public.redemptions;
begin
  select *
  into selected_redemption
  from public.redemptions
  where code_hash = p_code_hash
    and status = 'pending'
    and expires_at > now()
  for update;

  if selected_redemption.id is null then
    raise exception 'invalid_or_expired_code' using errcode = 'P0001';
  end if;

  if selected_redemption.restaurant_id is not null and selected_redemption.restaurant_id <> p_restaurant_id then
    raise exception 'wrong_restaurant' using errcode = 'P0001';
  end if;

  update public.point_balances
  set total_points = total_points - selected_redemption.points_cost,
      last_activity_at = now(),
      updated_at = now()
  where user_id = selected_redemption.user_id
    and total_points >= selected_redemption.points_cost;

  if not found then
    raise exception 'insufficient_points' using errcode = 'P0001';
  end if;

  update public.redemptions
  set status = 'used',
      redeemed_at = now(),
      restaurant_id = p_restaurant_id
  where id = selected_redemption.id
  returning * into selected_redemption;

  return selected_redemption;
end;
$$;

grant execute on function public.process_scan(uuid, uuid, uuid, numeric, integer, text, text, timestamptz) to service_role;
grant execute on function public.redeem_code(text, uuid) to service_role;
