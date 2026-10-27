import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { createUser, listUsers } from "@/lib/workspace/store";
import type { Role } from "@/lib/workspace/types";

async function requireAdmin() {
  const session = await getSession();
  if (!session) return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  if (session.role !== "admin") {
    return { session: null, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { session, response: null };
}

export async function GET() {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  const users = await listUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  let body: { name?: string; email?: string; password?: string; role?: Role };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const result = await createUser({
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    password: String(body.password ?? ""),
    role: body.role === "admin" ? "admin" : "operator",
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result.user);
}
