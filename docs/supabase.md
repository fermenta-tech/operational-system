# Supabase — manuales operativos

## Proyecto

| Campo | Valor |
| --- | --- |
| URL | `https://xyuhembqovjwivtzxaqm.supabase.co` |
| Project ref | `xyuhembqovjwivtzxaqm` |
| Publishable (anon) | `sb_publishable_VlXEXCZxIT4ZuoNr8NvLOg_AybHWPoM` |
| Secret (service role) | `sb_secret_bnKbwBIbtuGX1HsrSTxRwg_mW_QOlS6` |

Las claves están hardcodeadas en `lib/supabase/config.ts` (solo servidor / scripts). No se usa `.env` en este MVP.

## Auth (demo)

| Email | Contraseña |
| --- | --- |
| `demo@demo.com` | `demo123` |

Login en `/login` → Supabase Auth email/password. La sesión viaja en cookies gestionadas por `@supabase/ssr`.

## Esquema

### Tabla `public.manuals`

| Columna | Tipo | Descripción |
| --- | --- | --- |
| `id` | `text` PK | Ej. `m-reduction-circuit-example`, `m-…` borradores |
| `title` | `text` | Título carátula |
| `subtitle` | `text` | Subtítulo opcional |
| `kind` | `text` | `example` \| `draft` |
| `owner_id` | `uuid` | `auth.users.id` (null en ejemplo) |
| `content` | `jsonb` | `{ ver, meta?, pages[] }` — mismo shape que `REDUCTION_SLIDES` |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

Migración: [`supabase/migrations/001_manuals.sql`](../supabase/migrations/001_manuals.sql)

RLS activo para acceso directo desde cliente autenticado; las rutas Next.js usan service role en servidor y validan sesión.

## API Next.js

| Método | Ruta | Auth | Uso |
| --- | --- | --- | --- |
| GET | `/api/manuals/public/example` | No | Visor `?example=1` |
| GET | `/api/manuals` | Sí | Lista borradores del usuario |
| GET/PUT/DELETE | `/api/manuals/[id]` | Sí | Cargar/guardar borrador |
| POST | `/api/auth/login` | No | `{ email, password }` |
| POST | `/api/auth/logout` | Sí | Cierra sesión |

Manual de ejemplo sembrado: **`m-reduction-circuit-example`** (contenido desde `ejemplos/manual-interactivo/content.js`).

## Migración y seed remoto

1. **SQL (una vez)** — Supabase Dashboard → SQL Editor → pegar y ejecutar `supabase/migrations/001_manuals.sql`.

2. **Seed** (usuario demo + manual REDUCTION):

```bash
npm run seed:supabase
```

El script crea `demo@demo.com` / `demo123` y hace upsert del manual de ejemplo. Si la tabla no existe, indica ejecutar la migración manualmente.

## Probar en local

```bash
npm run dev
```

1. Tras migración + seed, abrir `/login` con credenciales demo.
2. Hub `/manuals` → «Ver manual de ejemplo» (datos desde Supabase; fallback `content.js` en el visor).
3. «Crear nuevo manual» → edición guarda en Supabase al editar.

Progreso del operador en el visor (checks, tema, etc.) sigue en `localStorage` del iframe; el **contenido slides** del ejemplo y borradores viene de Postgres.

## Build

```bash
npm run build
```
