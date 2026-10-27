import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { MANUAL_ID_PATTERN } from "@/lib/manual/constants";
import { manualDownloadFilename } from "@/lib/manual/download-name";
import { buildManualExportHtml } from "@/lib/manual/export-html";
import { getManualById } from "@/lib/manual/repository";
import { getPublication } from "@/lib/workspace/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  if (!MANUAL_ID_PATTERN.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const row = await getManualById(id);
  if (!row || row.kind === "example") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const publication = await getPublication(id);
  if (session.role !== "admin") {
    const invited =
      publication.status === "published" && publication.inviteeIds.includes(session.id);
    if (!invited) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const title = row.content.meta?.title?.trim() || row.title || "Manual";
  const html = await buildManualExportHtml(row.content, title);
  const filename = manualDownloadFilename(title);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
