"use client";

import type { ManualContent, ManualIndexEntry } from "./types";

export function draftStorageKey(id: string): string {
  return `manual-draft-${id}`;
}

async function parseJsonResponse<T>(res: Response): Promise<T | null> {
  if (!res.ok) return null;
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function loadDraftIndex(): Promise<ManualIndexEntry[]> {
  const res = await fetch("/api/manuals", { credentials: "include" });
  return (await parseJsonResponse<ManualIndexEntry[]>(res)) ?? [];
}

export async function loadDraft(id: string): Promise<ManualContent | null> {
  const res = await fetch(`/api/manuals/${encodeURIComponent(id)}`, {
    credentials: "include",
  });
  return await parseJsonResponse<ManualContent>(res);
}

export async function saveDraft(id: string, content: ManualContent): Promise<boolean> {
  const updated: ManualContent = {
    ...content,
    meta: {
      title: content.meta?.title ?? "Untitled",
      subtitle: content.meta?.subtitle,
      createdAt: content.meta?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  const res = await fetch(`/api/manuals/${encodeURIComponent(id)}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  return res.ok;
}

export async function deleteDraft(id: string): Promise<boolean> {
  const res = await fetch(`/api/manuals/${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.ok;
}
