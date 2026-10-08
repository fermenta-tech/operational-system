import {
  MANUAL_CONTENT_VER,
  type ManualContent,
  type ManualCoverMeta,
  type ManualPage,
  type ManualSectionLevel,
} from "./types";

const COVER_PAGE_ID = "t01";
const TOC_PAGE_ID = "toc";

function slug(value: string, index: number): string {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || `section-${index + 1}`;
}

function esc(value: string): string {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inferSectionLevel(page: ManualPage): ManualSectionLevel {
  if (page.sectionLevel) return page.sectionLevel;
  if (page.kicker?.startsWith("Subchapter")) return "subchapter";
  if (page.kicker === "Content" || page.kicker === "Contenido") return "content";
  return "chapter";
}

function tocLabel(level: ManualSectionLevel): string {
  if (level === "subchapter") return "Subchapter";
  if (level === "content") return "Content";
  return "Chapter";
}

function isStructuralPage(page: ManualPage): boolean {
  return page.id === COVER_PAGE_ID || page.id === "cover" || page.id === TOC_PAGE_ID;
}

function buildTocHtml(pages: ManualPage[]): string {
  const chapters = pages.filter(
    (p) => !isStructuralPage(p) && !p.id.startsWith("review-"),
  );
  const links = chapters
    .map((p) => {
      const level = inferSectionLevel(p);
      if (level === "content") return "";
      const label = tocLabel(level);
      const href = p.anchor ? `#${p.anchor}` : `#${p.id}`;
      return `
        <a class="toc-card" href="${href}" data-go="${p.id}">
          <span>${label}</span>
          <strong>${esc(p.title)}</strong>
          <i>Open →</i>
        </a>`;
    })
    .join("");
  return `<div class="toc-grid">${links}</div>`;
}

export function buildCoverHtml(input: {
  title: string;
  cover?: ManualCoverMeta;
  subtitle?: string;
}): string {
  const cover = input.cover ?? {};
  const eyebrow = cover.eyebrow ?? input.subtitle ?? "New training manual";
  const brandLine = cover.brandLine ?? "Plant operation · Training manual";
  const equipment = cover.equipment?.length
    ? cover.equipment
    : [
        { code: "EQ-001", label: "Main equipment" },
        { code: "EQ-002", label: "Auxiliary system" },
      ];
  const equipmentHtml = equipment
    .filter((e) => e.code.trim() || e.label.trim())
    .map(
      (e) =>
        `<div><strong>${esc(e.code)}</strong><span>${esc(e.label)}</span></div>`,
    )
    .join("");
  const notice = cover.notice?.trim();
  const noticeHtml = notice
    ? `<details class="cover-notice">
          <summary>Confidentiality notice</summary>
          <p>${esc(notice)}</p>
        </details>`
    : "";

  const logoHtml = cover.logoUrl?.trim()
    ? `<img src="${esc(cover.logoUrl.trim())}" alt="Logo">`
    : "";

  return `
      <div class="cover-hero">
        <div class="cover-brand">
          ${logoHtml}
          <span>${esc(brandLine)}</span>
        </div>
        <div class="cover-eyebrow">${esc(eyebrow)}</div>
        ${equipmentHtml ? `<div class="cover-equipment">${equipmentHtml}</div>` : ""}
        <h2 style="margin:12px 0 0">${esc(input.title)}</h2>
        <div class="cover-start">Use <strong>Next</strong> or select a chapter from the navigation.</div>
        ${noticeHtml}
      </div>`;
}

export function createEmptyManual(input: {
  id: string;
  title: string;
  subtitle?: string;
}): ManualContent {
  const now = new Date().toISOString();
  const coverMeta: ManualCoverMeta = {
    eyebrow: input.subtitle || "New training manual",
    brandLine: "Operational manual · Draft",
    equipment: [{ code: "—", label: "Add equipment tags in the editor" }],
  };
  const coverHtml = buildCoverHtml({
    title: input.title,
    subtitle: input.subtitle,
    cover: coverMeta,
  });

  const pages: ManualPage[] = [
    {
      id: COVER_PAGE_ID,
      chapter: "Start",
      group: "Start",
      title: input.title,
      kicker: input.subtitle || "New manual",
      lead: "Interactive manual draft.",
      blocks: [{ type: "manual-html", html: coverHtml }],
    },
    {
      id: TOC_PAGE_ID,
      chapter: "Manual",
      group: "TABLE OF CONTENTS",
      title: "TABLE OF CONTENTS",
      kicker: "Index",
      lead: "Add sections from the editor to populate this index.",
      blocks: [{ type: "manual-html", html: buildTocHtml([]) }],
    },
  ];

  return {
    ver: MANUAL_CONTENT_VER,
    meta: {
      title: input.title,
      subtitle: input.subtitle,
      cover: coverMeta,
      createdAt: now,
      updatedAt: now,
    },
    pages,
  };
}

export function newSectionPage(input: {
  title: string;
  level: ManualSectionLevel;
  parentChapter: string;
  index: number;
}): ManualPage {
  const { title, level, parentChapter, index } = input;
  const id = `manual-${index + 1}-${slug(title, index)}`;
  const chapter = level === "chapter" ? title : parentChapter;
  const group = level === "chapter" ? title : title;
  const kicker =
    level === "chapter"
      ? "Chapter"
      : level === "subchapter"
        ? `Subchapter · ${parentChapter}`
        : `Content · ${parentChapter}`;
  const slideKind =
    level === "chapter"
      ? "chapter"
      : level === "subchapter"
        ? "subchapter"
        : "content";
  return {
    id,
    chapter,
    group,
    title,
    slideKind,
    kicker,
    lead: "",
    anchor: level === "content" ? undefined : slug(title, index),
    sectionLevel: level,
    blocks: [
      {
        type: "text",
        text: "Describe this section. Add blocks below or use the block toolbar.",
      },
    ],
  };
}

export function newReviewPage(input: {
  chapterTitle: string;
  anchor: string;
  index: number;
}): ManualPage {
  const { chapterTitle, anchor, index } = input;
  const id = `review-${anchor || slug(chapterTitle, index)}`;
  return {
    id,
    chapter: chapterTitle,
    group: `${chapterTitle} · Summary`,
    title: "Chapter summary & knowledge check",
    slideKind: "review",
    kicker: `${chapterTitle} · Review`,
    lead: "Choose English or Español, listen to the coach, then complete the multiple-choice questions.",
    summary: {
      en: `Summary for ${chapterTitle}. Edit this text in the review slide editor.`,
      es: `Resumen de ${chapterTitle}. Edita este texto en el editor de slide de revisión.`,
    },
    audio: "",
    quiz: [],
    blocks: [],
  };
}

export function refreshTocPage(content: ManualContent): ManualContent {
  const tocIndex = content.pages.findIndex((p) => p.id === TOC_PAGE_ID);
  if (tocIndex < 0) return content;
  const tocHtml = buildTocHtml(content.pages);
  const pages = [...content.pages];
  pages[tocIndex] = {
    ...pages[tocIndex],
    blocks: [{ type: "manual-html", html: tocHtml }],
  };
  return { ...content, pages };
}

export function syncCoverPage(content: ManualContent): ManualContent {
  const coverIndex = content.pages.findIndex(
    (p) => p.id === COVER_PAGE_ID || p.id === "cover",
  );
  if (coverIndex < 0) return content;
  const title = content.meta?.title ?? content.pages[coverIndex].title;
  const html = buildCoverHtml({
    title,
    subtitle: content.meta?.subtitle,
    cover: content.meta?.cover,
  });
  const pages = [...content.pages];
  const cover = pages[coverIndex];
  pages[coverIndex] = {
    ...cover,
    id: COVER_PAGE_ID,
    title,
    kicker: content.meta?.subtitle ?? cover.kicker,
    blocks: [{ type: "manual-html", html }],
  };
  return { ...content, pages };
}

/** Migra borradores antiguos (id cover → t01). */
export function normalizeManualContent(content: ManualContent): ManualContent {
  let next = { ...content };
  const coverIdx = next.pages.findIndex((p) => p.id === "cover");
  if (coverIdx >= 0) {
    const pages = [...next.pages];
    pages[coverIdx] = { ...pages[coverIdx], id: COVER_PAGE_ID };
    next = { ...next, pages };
  }
  if (!next.meta?.cover && next.meta) {
    next = {
      ...next,
      meta: {
        ...next.meta,
        cover: {
          eyebrow: next.meta.subtitle,
          brandLine: "Operational manual · Draft",
          equipment: [{ code: "—", label: "Equipment" }],
        },
      },
    };
  }
  return syncCoverPage(refreshTocPage(next));
}

export function listChapters(pages: ManualPage[]): string[] {
  const chapters: string[] = [];
  for (const p of pages) {
    if (isStructuralPage(p) || p.id.startsWith("review-")) continue;
    if (inferSectionLevel(p) === "chapter") chapters.push(p.chapter);
  }
  return chapters;
}

export function newManualId(): string {
  return `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export const MANUAL_COVER_ID = COVER_PAGE_ID;
export const MANUAL_TOC_ID = TOC_PAGE_ID;
