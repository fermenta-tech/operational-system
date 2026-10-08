import { NextResponse } from "next/server";
import {
  canReadManual,
  deleteDraftForUser,
  getManualById,
  upsertDraft,
} from "@/lib/manual/repository";
import { MANUAL_ID_PATTERN } from "@/lib/manual/constants";
import type { ManualContent } from "@/lib/manual/types";
import { getSessionUserId } from "@/lib/supabase/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!MANUAL_ID_PATTERN.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const row = await getManualById(id);
  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const userId = await getSessionUserId();
  if (!canReadManual(row, userId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(row.content as ManualContent);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!MANUAL_ID_PATTERN.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: ManualContent;
  try {
    body = (await request.json()) as ManualContent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const existing = await getManualById(id);
  if (existing && existing.kind === "example") {
    return NextResponse.json({ error: "Cannot modify example manual" }, { status: 403 });
  }
  if (existing && existing.owner_id && existing.owner_id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = await upsertDraft(id, body, userId);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!MANUAL_ID_PATTERN.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await deleteDraftForUser(id, userId);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
