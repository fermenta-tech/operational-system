"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { loadDraftIndex } from "@/lib/manual/client-storage";
import type { ManualIndexEntry } from "@/lib/manual/types";

export default function ManualsHubPage() {
  const [drafts, setDrafts] = useState<ManualIndexEntry[]>([]);

  useEffect(() => {
    void loadDraftIndex().then(setDrafts);
  }, []);

  return (
    <main className="app-shell">
      <AppHeader
        title="Módulo de manuales"
        subtitle="REDUCTION CIRCUIT y borradores propios"
      />
      <div className="card-grid">
        <Link className="action-card" href="/manuals/example">
          <strong>Ver manual de ejemplo</strong>
          <span>
            Manual interactivo REDUCTION CIRCUIT (contenido de{" "}
            <code>ejemplos/manual-interactivo</code>).
          </span>
        </Link>
        <Link className="action-card" href="/manuals/new">
          <strong>Crear nuevo manual</strong>
          <span>
            Carátula, índice y páginas con texto, imágenes y video (Supabase).
          </span>
        </Link>
      </div>

      {drafts.length > 0 ? (
        <section className="glass-panel" style={{ marginTop: 24 }}>
          <h2 style={{ marginTop: 0, fontSize: "1.05rem" }}>Borradores recientes</h2>
          <ul className="section-list">
            {drafts.map((d) => (
              <li key={d.id}>
                <Link href={`/manuals/new/${d.id}`}>{d.title}</Link>
                <span className="hint" style={{ marginLeft: 8 }}>
                  {new Date(d.updatedAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
