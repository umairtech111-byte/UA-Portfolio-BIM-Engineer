-- Shared portfolio content ---------------------------------------------------
create table if not exists public.portfolio_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  constraint portfolio_content_singleton check (id = 'main')
);

alter table public.portfolio_content enable row level security;

grant select on public.portfolio_content to anon, authenticated;
grant insert, update, delete on public.portfolio_content to authenticated;

drop policy if exists "Portfolio is publicly readable" on public.portfolio_content;
create policy "Portfolio is publicly readable"
on public.portfolio_content for select
to anon, authenticated
using (true);

drop policy if exists "Portfolio admin can insert" on public.portfolio_content;
create policy "Portfolio admin can insert"
on public.portfolio_content for insert
to authenticated
with check ((select auth.jwt() ->> 'email') = 'engr.umair.ahmad111@gmail.com');

drop policy if exists "Portfolio admin can update" on public.portfolio_content;
create policy "Portfolio admin can update"
on public.portfolio_content for update
to authenticated
using ((select auth.jwt() ->> 'email') = 'engr.umair.ahmad111@gmail.com')
with check ((select auth.jwt() ->> 'email') = 'engr.umair.ahmad111@gmail.com');

drop policy if exists "Portfolio admin can delete" on public.portfolio_content;
create policy "Portfolio admin can delete"
on public.portfolio_content for delete
to authenticated
using ((select auth.jwt() ->> 'email') = 'engr.umair.ahmad111@gmail.com');

create or replace function public.set_portfolio_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists portfolio_content_updated_at on public.portfolio_content;
create trigger portfolio_content_updated_at
before update on public.portfolio_content
for each row execute function public.set_portfolio_updated_at();

-- Public file bucket ---------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values ('portfolio-files', 'portfolio-files', true, 104857600)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

drop policy if exists "Portfolio files are publicly readable" on storage.objects;
create policy "Portfolio files are publicly readable"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'portfolio-files');

drop policy if exists "Portfolio admin can upload files" on storage.objects;
create policy "Portfolio admin can upload files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'portfolio-files'
  and (select auth.jwt() ->> 'email') = 'engr.umair.ahmad111@gmail.com'
);

drop policy if exists "Portfolio admin can update files" on storage.objects;
create policy "Portfolio admin can update files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'portfolio-files'
  and (select auth.jwt() ->> 'email') = 'engr.umair.ahmad111@gmail.com'
)
with check (
  bucket_id = 'portfolio-files'
  and (select auth.jwt() ->> 'email') = 'engr.umair.ahmad111@gmail.com'
);

drop policy if exists "Portfolio admin can delete files" on storage.objects;
create policy "Portfolio admin can delete files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'portfolio-files'
  and (select auth.jwt() ->> 'email') = 'engr.umair.ahmad111@gmail.com'
);
