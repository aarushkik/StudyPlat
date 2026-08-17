-- StudyPlat — database schema
--
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New
-- query → paste → Run). It is written to be safe to run twice.
--
-- There is exactly one table. The map itself is generated in the app from the
-- course id, so the only things worth storing are which course a student
-- chose and what they have cleared. Storing the generated map would mean a
-- migration every time a unit title changes.

create table if not exists public.profiles (
  id                  uuid primary key references auth.users (id) on delete cascade,

  -- Setup answers.
  course_id           text,
  experience_level_id text,
  goal_score_id       text,
  exam_timeframe_id   text,
  placement_level_id  text,
  onboarded           boolean     not null default false,

  -- Progress.
  xp                  integer     not null default 0,
  gems                integer     not null default 0,
  streak_days         integer     not null default 0,
  last_session_on     date,
  -- Stop ids the student actually played. The placement head start is
  -- recomputed from placement_level_id on load, so it is deliberately absent.
  completed_stops     text[]      not null default '{}',

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Keep updated_at honest without the client having to send it.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row level security
--
-- This is the part that matters. The app ships with the anon key, which is
-- public by design — anyone who downloads the app has it. RLS is what stops
-- one student reading or writing another's row, so it is not optional.
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;

drop policy if exists "read own profile"   on public.profiles;
drop policy if exists "insert own profile" on public.profiles;
drop policy if exists "update own profile" on public.profiles;

create policy "read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- No delete policy on purpose: deleting the auth user cascades to this row,
-- which is the only route that should remove one.

-- ---------------------------------------------------------------------------
-- Create the row automatically on sign-up
--
-- The app also creates it on first load, so this is a belt-and-braces measure
-- that guarantees a row exists even if the first session never completes.
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
