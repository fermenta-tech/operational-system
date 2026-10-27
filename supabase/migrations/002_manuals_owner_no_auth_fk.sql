-- Los usuarios de la app viven en data/workspace.json, no en auth.users.
-- La FK manuals_owner_id_fkey rechazaba el guardado con el id local del administrador.
alter table public.manuals drop constraint if exists manuals_owner_id_fkey;

comment on column public.manuals.owner_id is
  'Id de usuario local (data/workspace.json). Sin FK a auth.users.';
