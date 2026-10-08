-- Manuales operativos (contenido slides JSON + metadatos)
create table if not exists public.manuals (
  id text primary key,
  title text not null default 'Untitled',
  subtitle text,
  kind text not null default 'draft' check (kind in ('example', 'draft')),
  owner_id uuid references auth.users (id) on delete set null,
  content jsonb not null default '{"ver": 7, "pages": []}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists manuals_owner_id_idx on public.manuals (owner_id);
create index if not exists manuals_kind_idx on public.manuals (kind);
create index if not exists manuals_updated_at_idx on public.manuals (updated_at desc);

alter table public.manuals enable row level security;

drop policy if exists "manuals_select_own_or_example" on public.manuals;
create policy "manuals_select_own_or_example"
  on public.manuals
  for select
  to authenticated
  using (kind = 'example' or owner_id = auth.uid());

drop policy if exists "manuals_insert_own_drafts" on public.manuals;
create policy "manuals_insert_own_drafts"
  on public.manuals
  for insert
  to authenticated
  with check (kind = 'draft' and owner_id = auth.uid());

drop policy if exists "manuals_update_own_drafts" on public.manuals;
create policy "manuals_update_own_drafts"
  on public.manuals
  for update
  to authenticated
  using (kind = 'draft' and owner_id = auth.uid());

drop policy if exists "manuals_delete_own_drafts" on public.manuals;
create policy "manuals_delete_own_drafts"
  on public.manuals
  for delete
  to authenticated
  using (kind = 'draft' and owner_id = auth.uid());

comment on table public.manuals is 'Manuales interactivos (slides JSON compatible con REDUCTION_SLIDES)';
