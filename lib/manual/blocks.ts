import type { ManualBlock } from "./types";

export type BlockType = ManualBlock["type"];

export const EDITOR_BLOCK_TYPES: BlockType[] = [
  "text",
  "heading",
  "callout",
  "warn",
  "ok",
  "columns",
  "list",
  "steps",
  "table",
  "chart",
  "photos",
  "videos",
  "nav-cards",
  "flow",
  "checklist",
  "reveal",
  "simulator",
  "manual-html",
];

export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  "manual-html": "HTML avanzado",
  text: "Párrafo",
  heading: "Subtítulo",
  callout: "Destacado",
  warn: "Advertencia",
  ok: "Estado OK",
  columns: "Columnas",
  list: "Lista",
  steps: "Pasos numerados",
  table: "Tabla",
  chart: "Gráfico",
  photos: "Fotos",
  videos: "Videos",
  "nav-cards": "Tarjetas con tag",
  flow: "Flujo interactivo",
  checklist: "Checklist",
  reveal: "Revelar al clic",
  simulator: "Simulador",
};

export function emptyBlock(type: BlockType): ManualBlock {
  switch (type) {
    case "text":
      return { type: "text", text: "Nuevo párrafo" };
    case "heading":
      return { type: "heading", level: 3, text: "Subtítulo de sección" };
    case "callout":
      return { type: "callout", text: "Nota destacada para el operador." };
    case "warn":
      return { type: "warn", text: "Advertencia de seguridad o procedimiento." };
    case "ok":
      return { type: "ok", text: "Condición saludable o verificación OK." };
    case "columns":
      return {
        type: "columns",
        columns: [
          { title: "Columna A", body: "Texto de la primera columna." },
          { title: "Columna B", body: "Texto de la segunda columna." },
        ],
      };
    case "list":
      return { type: "list", title: "Lista", items: ["Elemento 1", "Elemento 2"] };
    case "steps":
      return { type: "steps", title: "Procedimiento", items: ["Paso 1", "Paso 2"] };
    case "table":
      return {
        type: "table",
        headers: ["Columna A", "Columna B"],
        rows: [["Valor", "Descripción"]],
      };
    case "chart":
      return {
        type: "chart",
        title: "Tendencia de ejemplo",
        chartKind: "bar",
        labels: ["T1", "T2", "T3"],
        values: [40, 65, 52],
      };
    case "manual-html":
      return { type: "manual-html", html: "<p>Contenido HTML del manual</p>" };
    case "photos":
      return {
        type: "photos",
        items: [{ url: "/manual/images/image1.png", caption: "Leyenda" }],
      };
    case "videos":
      return {
        type: "videos",
        items: [
          {
            title: "Video de ejemplo",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            steps: [],
          },
        ],
      };
    case "nav-cards":
      return {
        type: "nav-cards",
        items: [
          {
            tag: "NUEVO",
            title: "Tarjeta",
            text: "Descripción breve",
            go: "t01",
          },
        ],
      };
    case "flow":
      return {
        type: "flow",
        nodes: [
          { label: "ENTRADA", sub: "tag", detail: "Detalle al hacer clic." },
        ],
      };
    case "checklist":
      return {
        type: "checklist",
        title: "Verificaciones",
        items: ["Comprobar válvulas", "Confirmar instrumentos"],
      };
    case "reveal":
      return {
        type: "reveal",
        title: "Clic para revelar",
        items: [{ label: "Tema", detail: "Explicación." }],
      };
    case "simulator":
      return {
        type: "simulator",
        title: "Simulador de arranque",
        items: ["Permisivo 1", "Permisivo 2"],
        success: "Equipo listo.",
        fail: "Faltan permisivos.",
      };
    default:
      return { type: "text", text: "" };
  }
}
