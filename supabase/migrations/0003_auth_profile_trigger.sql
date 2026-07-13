create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    phone,
    email,
    full_name,
    role,
    consented_at
  )
  values (
    new.id,
    new.phone,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce((new.raw_user_meta_data ->> 'role')::public.app_role, 'customer'),
    case when new.raw_user_meta_data ? 'consented_at'
      then (new.raw_user_meta_data ->> 'consented_at')::timestamptz
      else null
    end
  )
  on conflict (id) do nothing;

  insert into public.point_balances (user_id, total_points)
  values (new.id, 0)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();
