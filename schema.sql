create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role text not null check (role in ('student','faculty','librarian')),
  raw_id text not null,
  display_id text not null,
  full_name text not null,
  extra_info text,               -- program, department, etc.
  created_at timestamptz not null default now(),
  unique (role, raw_id)
);

alter table public.profiles enable row level security;

create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Lets an unauthenticated visitor turn "student number + role" into an
-- email, without exposing anything else. This is what makes ID-based
-- login possible.
create or replace function public.get_login_email(p_role text, p_raw_id text)
returns text
language sql security definer set search_path = public
as $$
  select u.email from public.profiles p
  join auth.users u on u.id = p.id
  where p.role = p_role and p.raw_id = upper(trim(p_raw_id))
  limit 1;
$$;

grant execute on function public.get_login_email(text, text) to anon;