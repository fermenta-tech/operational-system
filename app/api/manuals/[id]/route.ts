import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import {
  deleteDraft,
  getManualById,
  upsertDraft,
} from "@/lib/manual/repository";
import { MANUAL_ID_PATTERN } from "@/lib/manual/constants";
import type { ManualContent } from "@/lib/manual/types";
import { getPublication } from "@/lib/workspace/store";

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

  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role === "operator") {
    const publication = await getPublication(id);
    const invited = publication.status === "published" && publication.inviteeIds.includes(session.id);
    if (row.kind === "example" || !invited) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return NextResponse.json(row.content as ManualContent);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!MANUAL_ID_PATTERN.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

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
  let result = await upsertDraft(id, body, existing?.owner_id || session.id);
  if (!result.ok && result.error.includes("owner_id_fkey")) {
    result = await upsertDraft(id, body, null);
  }
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

  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const result = await deleteDraft(id);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
