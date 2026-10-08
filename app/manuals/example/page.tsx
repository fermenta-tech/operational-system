import Link from "next/link";

export default function ExampleManualPage() {
  const src = "/ejemplos/manual-interactivo/index.html?example=1";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="viewer-bar">
        <div>
          <strong>Manual de ejemplo</strong>
          <span className="hint" style={{ marginLeft: 12 }}>
            REDUCTION CIRCUIT · visor con sidebar glassmorphism
          </span>
        </div>
        <Link className="btn ghost" href="/manuals">
          Volver al hub
        </Link>
      </div>
      <iframe
        className="manual-frame"
        title="Manual interactivo REDUCTION CIRCUIT"
        src={src}
      />
    </div>
  );
}
