/** Guía del formato slides (REDUCTION_SLIDES / build-content.mjs / visor). */

export type GuideSnippet = {
  id: string;
  label: string;
  description: string;
  code: string;
};

export const SLIDE_KINDS_GUIDE = [
  {
    kind: "cover",
    id: "t01",
    detail: "Carátula · layout-cover · bloque cover-hero (auto desde meta.cover).",
  },
  {
    kind: "toc",
    id: "toc",
    detail: "Índice · toc-grid / toc-card · se regenera al editar capítulos.",
  },
  {
    kind: "chapter",
    detail: "Capítulo H1 · kicker «Chapter» · entra al índice con anchor.",
  },
  {
    kind: "subchapter",
    detail: "Subcapítulo H2 · kicker «Subchapter · {capítulo}».",
  },
  {
    kind: "content",
    detail: "Slide de contenido dentro de un capítulo · no aparece en el índice.",
  },
  {
    kind: "review",
    id: "review-{anchor}",
    detail:
      "Resumen bilingüe + coach-dock + quiz (layout-recap). Requiere quiz[] y summary.en/es.",
  },
] as const;

export const PAGE_FIELDS_GUIDE = [
  {
    field: "id",
    required: true,
    detail:
      "Identificador único. Carátula t01, índice toc, revisión review-{anchor}.",
  },
  {
    field: "slideKind",
    required: false,
    detail: "cover | toc | chapter | subchapter | content | review (inferido si falta).",
  },
  {
    field: "chapter",
    required: true,
    detail: "Capítulo padre (H1). En subcapítulos y contenido coincide con el H1.",
  },
  {
    field: "group",
    required: true,
    detail: "Agrupa la navegación lateral del visor.",
  },
  {
    field: "title",
    required: true,
    detail: "Título visible en la slide (H2 del visor).",
  },
  {
    field: "kicker",
    required: false,
    detail: 'Etiqueta superior: "Chapter", "Subchapter · …", "Content · …", "… · Review".',
  },
  {
    field: "lead",
    required: false,
    detail: "Entradilla bajo el título.",
  },
  {
    field: "anchor",
    required: false,
    detail: "Ancla HTML (#objectives) para toc-card.",
  },
  {
    field: "summary",
    required: false,
    detail: "Solo slides review: { en, es } para el Safety Coach.",
  },
  {
    field: "audio",
    required: false,
    detail: "Texto narrado (fallback si falta summary.en).",
  },
  {
    field: "quiz",
    required: false,
    detail: "Preguntas MCQ bilingües; activa layout-recap y sección .quiz.",
  },
  {
    field: "blocks",
    required: true,
    detail: "Contenido de la slide (tipos listados abajo).",
  },
] as const;

export const BLOCK_TYPES_GUIDE = [
  {
    type: "text",
    summary: "Párrafo simple (<p>).",
    fields: ["text"],
  },
  {
    type: "heading",
    summary: "Subtítulo H2–H4 dentro del cuerpo.",
    fields: ["level", "text"],
  },
  {
    type: "callout",
    summary: "Destacado naranja (--callout-bg en light mode).",
    fields: ["text"],
  },
  { type: "warn", summary: "Advertencia (.warn).", fields: ["text"] },
  { type: "ok", summary: "Estado OK (.ok).", fields: ["text"] },
  {
    type: "columns",
    summary: "Párrafos en columnas (.column-grid / .column-card).",
    fields: ["columns[].title", "columns[].body"],
  },
  {
    type: "list",
    summary: "Lista en tarjeta (.card ul).",
    fields: ["title", "items[]"],
  },
  {
    type: "steps",
    summary: "Pasos numerados (ol.steps).",
    fields: ["title", "items[]"],
  },
  {
    type: "table",
    summary: "Tabla en tarjeta.",
    fields: ["headers[]", "rows[][]"],
  },
  {
    type: "chart",
    summary: "Gráfico bar/line (.chart-block SVG).",
    fields: ["title", "chartKind", "labels[]", "values[]"],
  },
  {
    type: "photos",
    summary: "Galería media-grid (url o src + caption).",
    fields: ["items[].url", "items[].caption"],
  },
  {
    type: "videos",
    summary: "YouTube o .mp4 con pasos opcionales.",
    fields: ["items[].title", "items[].url", "items[].steps[]"],
  },
  {
    type: "nav-cards",
    summary: "Tarjetas con tag (.home-grid / .tag).",
    fields: ["items[].tag", "title", "text", "go"],
  },
  {
    type: "flow",
    summary: "Flujo interactivo (.flow-board).",
    fields: ["nodes[].label", "sub", "detail"],
  },
  {
    type: "checklist",
    summary: "Lista verificable (.check-item).",
    fields: ["title", "items[]"],
  },
  {
    type: "reveal",
    summary: "Acordeón (.reveal-card).",
    fields: ["title", "items[].label", "detail"],
  },
  {
    type: "simulator",
    summary: "Permisivos de práctica (.sim-row).",
    fields: ["title", "items[]", "success", "fail"],
  },
  {
    type: "manual-html",
    summary: "HTML legacy (tablas Word, figuras, blockquote).",
    fields: ["html"],
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
  {
    id: "quiz-shape",
    label: "Forma de pregunta quiz",
    description: "Igual que review-objectives en content.js / CHAPTER_REVIEWS.",
    code: `{
  "q": "Question in English?",
  "qEs": "¿Pregunta en español?",
  "options": ["Correct", "Wrong B", "Wrong C"],
  "optionsEs": ["Correcta", "B", "C"],
  "a": 0,
  "why": "Feedback EN",
  "whyEs": "Feedback ES"
}`,
  },
];
