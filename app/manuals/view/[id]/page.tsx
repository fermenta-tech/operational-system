import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getPublication } from "@/lib/workspace/store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function ViewManualPage({ params }: Props) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const publication = await getPublication(id);
  const invited = publication.status === "published" && publication.inviteeIds.includes(session.id);
  if (session.role === "operator" && !invited) redirect("/manuals");

  const edit = session.role === "admin";
  const src = `/ejemplos/manual-interactivo/index.html?draft=${encodeURIComponent(id)}${edit ? "&edit=1" : "&published=1"}`;

  return (
    <div className="desk" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="viewer-bar">
        <div>
          <strong>{edit ? "Visor" : "Manual publicado"}</strong>
          <span className="hint" style={{ marginLeft: 12 }}>
            {edit ? "Editas sobre la diapositiva" : "Solo lectura"}
          </span>
        </div>
        <Link className="desk-btn quiet" href="/manuals">
          Manuales
        </Link>
      </div>
      <iframe className="manual-frame" title={`Manual ${id}`} src={src} />
    </div>
  );
}
