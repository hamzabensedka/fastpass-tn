create table public.notification_outbox (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  event_type text not null,
  payload jsonb not null,
  status text not null default 'pending',
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.notification_outbox enable row level security;

create policy "notification_outbox_admin_only" on public.notification_outbox
  for all using (public.is_platform_admin());

create or replace function public.enqueue_points_added_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  restaurant_name text;
begin
  select name into restaurant_name from public.restaurants where id = new.restaurant_id;

  insert into public.notification_outbox (user_id, event_type, payload)
  values (
    new.user_id,
    'points_added',
    jsonb_build_object(
      'points', new.points_earned,
      'restaurantName', restaurant_name,
      'transactionId', new.id
    )
  );

  return new;
end;
$$;

drop trigger if exists transactions_points_notification on public.transactions;

create trigger transactions_points_notification
  after insert on public.transactions
  for each row execute function public.enqueue_points_added_notification();
