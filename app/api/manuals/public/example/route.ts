import { NextResponse } from "next/server";
import { getExampleManual } from "@/lib/manual/repository";
import type { ManualContent } from "@/lib/manual/types";

export async function GET() {
  const row = await getExampleManual();
  if (!row?.content) {
    return NextResponse.json({ error: "Example manual not seeded" }, { status: 404 });
  }
  return NextResponse.json(row.content as ManualContent);
}
