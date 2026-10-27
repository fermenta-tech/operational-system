import { NextResponse } from "next/server";
import { listManualRows } from "@/lib/manual/repository";
import { getSession } from "@/lib/auth/session";
import type { ManualIndexEntry } from "@/lib/manual/types";
import { listPublications } from "@/lib/workspace/store";

function databaseWarning(message: string): string {
  const lower = message.toLowerCase();
  if (
    lower.includes("fetch") ||
    lower.includes("network") ||
    lower.includes("enotfound") ||
    lower.includes("econnrefused") ||
    lower.includes("getaddrinfo")
  ) {
    return "No hay conexión con la base de manuales.";
  }
  return "No se pudieron cargar los manuales.";
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { rows, error } = await listManualRows();
  const publications = await listPublications();
  const manuals: ManualIndexEntry[] = [];
  for (const row of rows) {
    const publication = publications[row.id] ?? { status: "draft" as const, inviteeIds: [] };
    if (session.role === "operator") {
      if (publication.status !== "published" || !publication.inviteeIds.includes(session.id)) continue;
    }
    manuals.push({
      id: row.id,
      title: row.title,
      updatedAt: row.updated_at,
      status: publication.status,
      inviteeIds: publication.inviteeIds,
    });
  }

  return NextResponse.json({
    manuals,
    warning: error ? databaseWarning(error) : "",
  });
}
