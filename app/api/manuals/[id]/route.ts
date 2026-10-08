import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const draftsDir = path.join(process.cwd(), "data", "drafts");

async function ensureDraftsDir() {
  await mkdir(draftsDir, { recursive: true });
}

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!/^m-[a-z0-9-]+$/i.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  try {
    await ensureDraftsDir();
    const raw = await readFile(path.join(draftsDir, `${id}.json`), "utf8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!/^m-[a-z0-9-]+$/i.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  await ensureDraftsDir();
  await writeFile(
    path.join(draftsDir, `${id}.json`),
    JSON.stringify(body, null, 2),
    "utf8",
  );
  return NextResponse.json({ ok: true });
}
