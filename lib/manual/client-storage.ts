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

export async function loadManualIndex(): Promise<{ manuals: ManualIndexEntry[]; warning: string }> {
  const res = await fetch("/api/manuals", { credentials: "include" });
  const data = await parseJsonResponse<{ manuals?: ManualIndexEntry[]; warning?: string } | ManualIndexEntry[]>(res);
  if (Array.isArray(data)) return { manuals: data, warning: "" };
  return {
    manuals: data?.manuals ?? [],
    warning: data?.warning || (res.ok ? "" : "No se pudieron cargar los manuales."),
  };
}

export async function loadDraftIndex(): Promise<ManualIndexEntry[]> {
  const { manuals } = await loadManualIndex();
  return manuals;
}

export async function loadDraft(id: string): Promise<ManualContent | null> {
  const res = await fetch(`/api/manuals/${encodeURIComponent(id)}`, {
    credentials: "include",
  });
  return await parseJsonResponse<ManualContent>(res);
}

export async function saveDraft(
  id: string,
  content: ManualContent,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const updated: ManualContent = {
    ...content,
    meta: {
      title: content.meta?.title ?? "Untitled",
      subtitle: content.meta?.subtitle,
      cover: content.meta?.cover,
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
  if (res.ok) return { ok: true };
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  return { ok: false, error: data.error || "No hay conexión con la base de manuales." };
}

export async function deleteDraft(id: string): Promise<boolean> {
  const res = await fetch(`/api/manuals/${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.ok;
}
