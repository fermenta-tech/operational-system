import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { deleteUser, updateUser } from "@/lib/workspace/store";
import type { Role } from "@/lib/workspace/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await context.params;
  let body: { password?: string; role?: Role };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const patch: { password?: string; role?: Role } = {};
  if (typeof body.password === "string") patch.password = body.password;
  if (body.role === "admin" || body.role === "operator") patch.role = body.role;

  const result = await updateUser(id, patch);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result.user);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await context.params;
  const result = await deleteUser(id, session.id);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}
