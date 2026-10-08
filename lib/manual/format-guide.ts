/** Guía del formato slides (REDUCTION_SLIDES / build-content.mjs / visor). */

export type GuideSnippet = {
  id: string;
  label: string;
  description: string;
  code: string;
};

export const PAGE_FIELDS_GUIDE = [
  {
    field: "id",
    required: true,
    detail:
      "Identificador único de la diapositiva. La carátula usa t01 (layout-cover en el visor).",
  },
  {
    field: "chapter",
    required: true,
    detail:
      "Capítulo padre (H1). En subcapítulos coincide con el último capítulo de nivel 1.",
  },
  {
    field: "group",
    required: true,
    detail: "Agrupa la navegación lateral: capítulo o subcapítulo según build-content.",
  },
  {
    field: "title",
    required: true,
    detail: "Título visible en la slide (H1/H2 del manual fuente).",
  },
  {
    field: "kicker",
    required: false,
    detail: 'Etiqueta superior: "Chapter" o "Subchapter · {capítulo}".',
  },
  {
    field: "lead",
    required: false,
    detail: "Entradilla bajo el título; suele tomarse del primer párrafo.",
  },
  {
    field: "anchor",
    required: false,
    detail: "Ancla HTML (#objectives) para el índice y enlaces toc-card.",
  },
  {
    field: "blocks",
    required: true,
    detail: "Contenido de la slide: manual-html, text, callout, photos, videos, etc.",
  },
] as const;

export const BLOCK_TYPES_GUIDE = [
  {
    type: "manual-html",
    summary: "HTML del manual original (párrafos, listas, tablas, imágenes inline).",
    fields: ["html"],
  },
  {
    type: "text",
    summary: "Párrafo simple escapado (equivalente a <p>).",
    fields: ["text"],
  },
  {
    type: "callout",
    summary: "Destacado naranja (--callout-bg en light mode).",
    fields: ["text"],
  },
  {
    type: "photos",
    summary: "Galería con url y caption (visor: bloque photos).",
    fields: ["items[].url", "items[].caption"],
  },
  {
    type: "videos",
    summary: "YouTube o .mp4 con pasos opcionales.",
    fields: ["items[].title", "items[].url", "items[].steps[]"],
  },
] as const;

export const COPY_SNIPPETS: GuideSnippet[] = [
  {
    id: "toc-card",
    label: "Tarjeta de índice (toc-grid)",
    description: "Usada en TABLE OF CONTENTS; el editor regenera el bloque manual-html.",
    code: `<a class="toc-card" href="#objectives">
  <span>Chapter</span>
  <strong>OBJECTIVES</strong>
  <i>Open →</i>
</a>`,
  },
  {
    id: "cover-hero",
    label: "Carátula (cover-hero)",
    description: "Estructura de REDUCTION CIRCUIT en content.js / build-content.mjs.",
    code: `<div class="cover-hero">
  <div class="cover-brand">
    <img src="../../manual/images/image1.png" alt="Logo">
    <span>Plant operation · Training manual</span>
  </div>
  <div class="cover-eyebrow">BAOSTEEL ENERGIRON ZR DR PLANT</div>
  <div class="cover-equipment">
    <div><strong>RE-621-D</strong><span>Reduction reactor</span></div>
  </div>
  <div class="cover-start">Use <strong>Next</strong> or select a chapter.</div>
</div>`,
  },
  {
    id: "callout-html",
    label: "Callout vía HTML (blockquote)",
    description: "Patrón frecuente en lazos de control del manual ejemplo.",
    code: `<blockquote>
<p>Nota de procedimiento o explicación del lazo de control.</p>
</blockquote>`,
  },
  {
    id: "figure",
    label: "Figura con leyenda",
    description: "Imágenes en manual-html con rutas relativas al visor.",
    code: `<img src="../../manual/images/image33.png" style="width:6in;height:auto" />
<p><strong>FIGURE 31 — Título de la figura</strong></p>`,
  },
  {
    id: "section-directory",
    label: "Directorio de subsecciones",
    description: "Cuando build-content divide un H2 largo en partes.",
    code: `<div class="section-directory">
  <a class="section-card" href="#anchor-part-1">
    <strong>Subsection title</strong>
    <span>Open subsection →</span>
  </a>
</div>`,
  },
];
