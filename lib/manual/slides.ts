import type { ManualPage, ManualSlideKind } from "./types";
import { MANUAL_COVER_ID, MANUAL_TOC_ID } from "./template";

export function inferSlideKind(page: ManualPage): ManualSlideKind {
  if (page.slideKind) return page.slideKind;
  if (page.id === MANUAL_COVER_ID || page.id === "cover") return "cover";
  if (page.id === MANUAL_TOC_ID) return "toc";
  if (page.id.startsWith("review-")) return "review";
  if (page.sectionLevel === "subchapter") return "subchapter";
  if (page.sectionLevel === "content") return "content";
  return "chapter";
}

export function isReviewPage(page: ManualPage): boolean {
  return inferSlideKind(page) === "review";
}

export function isStructuralSlideKind(kind: ManualSlideKind): boolean {
  return kind === "cover" || kind === "toc";
}

export function slideKindLabel(kind: ManualSlideKind): string {
  const labels: Record<ManualSlideKind, string> = {
    cover: "Carátula",
    toc: "Índice",
    chapter: "Capítulo",
    subchapter: "Subcapítulo",
    content: "Contenido",
    review: "Resumen y evaluación",
  };
  return labels[kind];
}
