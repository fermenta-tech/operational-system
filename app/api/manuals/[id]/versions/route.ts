import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { MANUAL_ID_PATTERN } from "@/lib/manual/constants";
import { getManualById, listManualVersions, pushManualVersion } from "@/lib/manual/repository";
import type { ManualContent } from "@/lib/manual/types";

type RouteContext = { params: Promise<{ id: string }> };

async function requireAdmin(id: string) {
  if (!MANUAL_ID_PATTERN.test(id)) {
    return { error: NextResponse.json({ error: "Invalid id" }, { status: 400 }) };
  }
  const session = await getSession();
  if (!session) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  if (session.role !== "admin") return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  const existing = await getManualById(id);
  if (!existing || existing.kind === "example") {
    return { error: NextResponse.json({ error: "Not found" }, { status: 404 }) };
  }
  return { session };
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const gate = await requireAdmin(id);
  if (gate.error) return gate.error;
  const result = await listManualVersions(id);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 500 });
  return NextResponse.json({ versions: result.versions });
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const gate = await requireAdmin(id);
  if (gate.error) return gate.error;
  let body: ManualContent;
  try {
    body = (await request.json()) as ManualContent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || !Array.isArray(body.pages)) {
    return NextResponse.json({ error: "Invalid manual" }, { status: 400 });
  }
  const result = await pushManualVersion(id, body);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
