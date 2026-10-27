import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { EXAMPLE_MANUAL_ID } from "@/lib/manual/constants";
import type { ManualContent, ManualIndexEntry } from "@/lib/manual/types";
import { MANUAL_CONTENT_VER } from "@/lib/manual/types";

export type ManualRow = {
  id: string;
  title: string;
  subtitle: string | null;
  kind: "example" | "draft";
  owner_id: string | null;
  content: ManualContent;
  created_at: string;
  updated_at: string;
};

function rowToIndex(row: Pick<ManualRow, "id" | "title" | "updated_at">): ManualIndexEntry {
  return {
    id: row.id,
    title: row.title,
    updatedAt: row.updated_at,
    status: "draft",
    inviteeIds: [],
  };
}

export async function getManualById(id: string): Promise<ManualRow | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("manuals")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return data as ManualRow;
}

export async function getExampleManual(): Promise<ManualRow | null> {
  return getManualById(EXAMPLE_MANUAL_ID);
}

export async function listManualRows(): Promise<
  { rows: Pick<ManualRow, "id" | "title" | "updated_at" | "kind" | "owner_id">[]; error: string | null }
> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("manuals")
      .select("id, title, updated_at, kind, owner_id")
      .eq("kind", "draft")
      .order("updated_at", { ascending: false });
    if (error) return { rows: [], error: error.message };
    return {
      rows: (data ?? []) as Pick<ManualRow, "id" | "title" | "updated_at" | "kind" | "owner_id">[],
      error: null,
    };
  } catch (error) {
    return { rows: [], error: error instanceof Error ? error.message : "fetch failed" };
  }
}

export async function listDraftsForUser(userId: string): Promise<ManualIndexEntry[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("manuals")
    .select("id, title, updated_at")
    .eq("kind", "draft")
    .eq("owner_id", userId)
    .order("updated_at", { ascending: false });
  if (error || !data) return [];
  return data.map((row) => ({
    ...rowToIndex(row as Pick<ManualRow, "id" | "title" | "updated_at">),
    status: "draft" as const,
    inviteeIds: [],
  }));
}

export async function upsertDraft(
  id: string,
  content: ManualContent,
  ownerId: string | null,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createSupabaseAdminClient();
  const now = new Date().toISOString();
  const title = content.meta?.title?.trim() || "Untitled";
  const subtitle = content.meta?.subtitle?.trim() || null;

  const payload = {
    id,
    title,
    subtitle,
    kind: "draft" as const,
    owner_id: ownerId,
    content: { ...content, ver: content.ver ?? MANUAL_CONTENT_VER },
    updated_at: now,
  };

  const { error } = await supabase.from("manuals").upsert(payload, { onConflict: "id" });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function upsertExampleManual(content: ManualContent): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createSupabaseAdminClient();
  const now = new Date().toISOString();
  const title = content.meta?.title?.trim() || "REDUCTION CIRCUIT";
  const subtitle = content.meta?.subtitle?.trim() || null;

  const { error } = await supabase.from("manuals").upsert(
    {
      id: EXAMPLE_MANUAL_ID,
      title,
      subtitle,
      kind: "example",
      owner_id: null,
      content: { ...content, ver: content.ver ?? MANUAL_CONTENT_VER },
      updated_at: now,
    },
    { onConflict: "id" },
  );
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function deleteDraft(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("manuals").delete().eq("id", id).eq("kind", "draft");
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function deleteDraftForUser(
  id: string,
  ownerId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("manuals")
    .delete()
    .eq("id", id)
    .eq("owner_id", ownerId)
    .eq("kind", "draft");
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export function canReadManual(row: ManualRow, userId: string | null): boolean {
  if (row.kind === "example") return true;
  if (!userId) return false;
  return row.owner_id === userId;
}
