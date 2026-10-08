/** Same shape as `REDUCTION_SLIDES` / viewer `content.pages`. */
export type ManualBlock =
  | { type: "manual-html"; html: string }
  | { type: "text"; text: string }
  | { type: "callout"; text: string }
  | { type: "photos"; items: { url: string; caption?: string }[] }
  | { type: "videos"; items: { title: string; url: string; steps?: string[] }[] };

export type ManualSectionLevel = "chapter" | "subchapter";

export type ManualPage = {
  id: string;
  chapter: string;
  group: string;
  title: string;
  kicker?: string;
  lead?: string;
  anchor?: string;
  audio?: string;
  quiz?: unknown[];
  /** Alineado con build-content.mjs (H1 vs H2). */
  sectionLevel?: ManualSectionLevel;
  blocks: ManualBlock[];
};

export type ManualEquipmentLine = { code: string; label: string };

export type ManualCoverMeta = {
  brandLine?: string;
  eyebrow?: string;
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

export const MANUAL_CONTENT_VER = 7;
