"use client";

import type { ManualContent, ManualIndexEntry } from "./types";

const INDEX_KEY = "manual-draft-index";

export function draftStorageKey(id: string): string {
  return `manual-draft-${id}`;
}

export function loadDraftIndex(): ManualIndexEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(INDEX_KEY) || "[]") as ManualIndexEntry[];
  } catch {
    return [];
  }
}

export function saveDraftIndex(entries: ManualIndexEntry[]): void {
  localStorage.setItem(INDEX_KEY, JSON.stringify(entries));
}

export function loadDraft(id: string): ManualContent | null {
  try {
    const raw = localStorage.getItem(draftStorageKey(id));
    if (!raw) return null;
    return JSON.parse(raw) as ManualContent;
  } catch {
    return null;
  }
}

export function saveDraft(id: string, content: ManualContent): void {
  const updated: ManualContent = {
    ...content,
    meta: {
      title: content.meta?.title ?? "Untitled",
      subtitle: content.meta?.subtitle,
      createdAt: content.meta?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
  localStorage.setItem(draftStorageKey(id), JSON.stringify(updated));

  const index = loadDraftIndex().filter((e) => e.id !== id);
  index.unshift({
    id,
    title: updated.meta?.title ?? id,
    updatedAt: updated.meta!.updatedAt,
  });
  saveDraftIndex(index);
}

export function deleteDraft(id: string): void {
  localStorage.removeItem(draftStorageKey(id));
  saveDraftIndex(loadDraftIndex().filter((e) => e.id !== id));
}
