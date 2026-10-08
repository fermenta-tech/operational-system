# Manuales — MVP

## Autenticación

- Ruta: `/login`
- Cookie HTTP-only `os-manual-auth=1` (7 días)
- Credenciales por defecto: `demo` / `demo123`
- Override: variables de entorno `MANUAL_USER` y `MANUAL_PASSWORD`

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/login` | Pantalla de acceso |
| `/` | Redirige a `/manuals` |
| `/manuals` | Hub: ejemplo vs nuevo manual |
| `/manuals/example` | Iframe del visor con `?example=1` |
| `/manuals/new` | Formulario carátula |
| `/manuals/new/[id]` | Editor (índice + páginas) |
| `/manuals/view/[id]` | Vista previa iframe `?draft=[id]` |

## Persistencia

1. **localStorage (principal MVP)**
   - Borrador: `manual-draft-{id}` — JSON `{ ver, meta, pages }` compatible con `REDUCTION_SLIDES`
   - Índice: `manual-draft-index` — lista `{ id, title, updatedAt }`

2. **Servidor (opcional)**
   - `PUT /api/manuals/{id}` guarda `data/drafts/{id}.json`
   - Botón «Exportar JSON servidor» en el editor

## Visor

Estático en `public/ejemplos/manual-interactivo/`:

- `content.js` absoluto: `/ejemplos/manual-interactivo/content.js`
- `?example=1` ignora borradores locales del visor (`iom-draft-content`)
- `?draft={id}` carga `manual-draft-{id}` desde localStorage

## Limitaciones MVP

- Sin multiusuario ni permisos granulares
- Quiz/reviews/capítulos bilingües no se generan en el editor (solo bloques básicos)
- Imágenes del manual de ejemplo dependen de `manual/images/` en el repo
- La exportación a servidor no sincroniza automáticamente con localStorage
