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
        subtitle="Crea, consulta y mejora tus procedimientos operativos"
      />
      <section className="hub-intro" aria-labelledby="hub-title">
        <div>
          <p className="eyebrow">Centro de operación</p>
          <h2 id="hub-title">Todo tu conocimiento operativo, en un solo lugar.</h2>
          <p className="hub-lead">
            Consulta el manual de referencia o crea una guía clara para que cada
            turno pueda trabajar con confianza.
          </p>
        </div>
        <div className="hub-status" role="status">
          <span className="status-dot" aria-hidden="true" />
          <span>Espacio de trabajo listo</span>
        </div>
      </section>
      <div className="card-grid">
        <Link className="action-card action-card-primary" href="/manuals/example">
          <span className="action-card-icon" aria-hidden="true">↗</span>
          <strong>Ver manual de ejemplo</strong>
          <span>
            Manual interactivo REDUCTION CIRCUIT (contenido de{" "}
            <code>ejemplos/manual-interactivo</code>).
          </span>
          <span className="card-link">Abrir manual <span aria-hidden="true">→</span></span>
        </Link>
        <Link className="action-card" href="/manuals/new">
          <span className="action-card-icon" aria-hidden="true">＋</span>
          <strong>Crear nuevo manual</strong>
          <span>
            Carátula, índice y páginas con texto, imágenes y video (Supabase).
          </span>
          <span className="card-link">Comenzar ahora <span aria-hidden="true">→</span></span>
        </Link>
      </div>

      {drafts.length > 0 ? (
        <section className="glass-panel drafts-panel" aria-labelledby="drafts-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Continuar trabajando</p>
              <h2 id="drafts-title">Borradores recientes</h2>
            </div>
            <span className="count-badge">{drafts.length}</span>
          </div>
          <ul className="section-list">
            {drafts.map((d) => (
              <li key={d.id}>
                <Link href={`/manuals/new/${d.id}`}>
                  <span className="draft-title">{d.title}</span>
                  <span className="hint">
                    Actualizado {new Date(d.updatedAt).toLocaleString()}
                  </span>
                  <span className="draft-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
