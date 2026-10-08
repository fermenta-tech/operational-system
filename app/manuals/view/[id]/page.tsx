import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default async function ViewManualPage({ params }: Props) {
  const { id } = await params;
  const src = `/ejemplos/manual-interactivo/index.html?draft=${encodeURIComponent(id)}`;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="viewer-bar">
        <div>
          <strong>Vista previa del borrador</strong>
          <span className="hint" style={{ marginLeft: 12 }}>
            {id}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link className="btn ghost" href={`/manuals/new/${id}`}>
            Editar
          </Link>
          <Link className="btn ghost" href="/manuals">
            Hub
          </Link>
        </div>
      </div>
      <iframe className="manual-frame" title={`Manual ${id}`} src={src} />
    </div>
  );
}
