import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { MANUAL_ID_PATTERN } from "@/lib/manual/constants";
import { getManualById } from "@/lib/manual/repository";
import { listUsers, setPublication } from "@/lib/workspace/store";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await context.params;
  if (!MANUAL_ID_PATTERN.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const manual = await getManualById(id);
  if (!manual || manual.kind === "example") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: { status?: string; inviteeIds?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const status = body.status === "published" ? "published" : "draft";
  const users = await listUsers();
  const known = new Set(users.map((user) => user.id));
  const inviteeIds = Array.isArray(body.inviteeIds)
    ? [...new Set(body.inviteeIds.filter((item): item is string => typeof item === "string" && known.has(item)))]
    : [];

  await setPublication(id, { status, inviteeIds });
  return NextResponse.json({ ok: true, status, inviteeIds });
}
