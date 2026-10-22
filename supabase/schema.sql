-- AskList schema. Paste into Supabase → SQL Editor → New query → Run.
-- Safe to re-run.

create table if not exists public.questions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  question    text not null check (char_length(btrim(question)) between 1 and 1000),
  course      text check (course is null or char_length(course) <= 100),
  answered    boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists questions_user_created_idx
  on public.questions (user_id, created_at desc);

-- Row Level Security: each user can only see and change their own questions.
alter table public.questions enable row level security;

drop policy if exists "Users read own questions"   on public.questions;
drop policy if exists "Users insert own questions" on public.questions;
drop policy if exists "Users update own questions" on public.questions;
drop policy if exists "Users delete own questions" on public.questions;

create policy "Users read own questions"
  on public.questions for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users insert own questions"
  on public.questions for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users update own questions"
  on public.questions for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users delete own questions"
  on public.questions for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- Logged-out visitors (anon role) get no access at all.
revoke all on public.questions from anon;
grant select, insert, update, delete on public.questions to authenticated;

-- Make the API see the new table straight away.
notify pgrst, 'reload schema';
