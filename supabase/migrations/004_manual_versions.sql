-- Últimas copias de un manual, para deshacer dentro del mismo id.
-- El servidor escribe con la service role (no pasa por RLS).
-- Al borrar el manual, estas filas se van con él.

create table if not exists public.manual_versions (
  id uuid primary key default gen_random_uuid(),
  manual_id text not null references public.manuals(id) on delete cascade,
  content jsonb not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists manual_versions_manual_created_idx
  on public.manual_versions (manual_id, created_at desc);

alter table public.manual_versions enable row level security;

comment on table public.manual_versions is 'Hasta cinco copias anteriores de cada manual, para deshacer.';
