import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function ExampleManualPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/manuals");
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
        <Link className="desk-btn quiet" href="/manuals">
          Manuales
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
