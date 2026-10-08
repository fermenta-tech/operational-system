/** Same shape as `REDUCTION_SLIDES` / viewer `content.pages`. */

export type ManualQuizQuestion = {
  q: string;
  qEs?: string;
  options: string[];
  optionsEs?: string[];
  /** Índice de la opción correcta (0-based). */
  a: number;
  why?: string;
  whyEs?: string;
};

export type ManualChapterSummary = {
  en: string;
  es: string;
};

export type ManualSlideKind =
  | "cover"
  | "toc"
  | "chapter"
  | "subchapter"
  | "content"
  | "review";

export type ManualBlock =
  | { type: "manual-html"; html: string }
  | { type: "text"; text: string }
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "callout"; text: string }
  | { type: "warn"; text: string }
  | { type: "ok"; text: string }
  | {
      type: "columns";
      columns: { title?: string; body: string }[];
    }
  | { type: "list"; title?: string; items: string[] }
  | { type: "steps"; title?: string; items: string[] }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      type: "chart";
      title?: string;
      chartKind: "bar" | "line";
      labels: string[];
      values: number[];
    }
  | { type: "photos"; items: { url: string; caption?: string }[] }
  | {
      type: "videos";
      items: { title: string; url: string; steps?: string[] }[];
    }
  | {
      type: "nav-cards";
      items: { tag: string; title: string; text: string; go: string }[];
    }
  | {
      type: "flow";
      nodes: { label: string; sub?: string; detail: string }[];
    }
  | { type: "checklist"; title?: string; items: string[] }
  | {
      type: "reveal";
      title?: string;
      items: { label: string; detail: string }[];
    }
  | {
      type: "simulator";
      title?: string;
      items: string[];
      success: string;
      fail: string;
    };

export type ManualSectionLevel = "chapter" | "subchapter" | "content";

export type ManualPage = {
  id: string;
  chapter: string;
  group: string;
  title: string;
  /** Tipo lógico de slide (inferido si falta). */
  slideKind?: ManualSlideKind;
  kicker?: string;
  lead?: string;
  anchor?: string;
  audio?: string;
  summary?: ManualChapterSummary;
  quiz?: ManualQuizQuestion[];
  /** Alineado con build-content.mjs (H1 vs H2 vs contenido). */
  sectionLevel?: ManualSectionLevel;
  blocks: ManualBlock[];
};

export type ManualEquipmentLine = { code: string; label: string };

export type ManualCoverMeta = {
  brandLine?: string;
  eyebrow?: string;
  logoUrl?: string;
  equipment?: ManualEquipmentLine[];
  notice?: string;
};

export type ManualContent = {
  ver: number;
  meta?: {
    title: string;
    subtitle?: string;
    cover?: ManualCoverMeta;
    createdAt: string;
    updatedAt: string;
  };
  pages: ManualPage[];
};

export type ManualIndexEntry = {
  id: string;
  title: string;
  updatedAt: string;
};

export const MANUAL_CONTENT_VER = 8;
