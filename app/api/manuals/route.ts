import { NextResponse } from "next/server";
import { listDraftsForUser } from "@/lib/manual/repository";
import { getSessionUserId } from "@/lib/supabase/server";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const entries = await listDraftsForUser(userId);
  return NextResponse.json(entries);
}
