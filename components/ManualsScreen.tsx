"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { confirmAction, notify, openForm, openInvite, tellError } from "@/components/dialogs";
import { brand, onPrimary } from "@/lib/brand";
import { loadManualIndex, saveDraft } from "@/lib/manual/client-storage";
import { createEmptyManual, newManualId } from "@/lib/manual/template";
import type { ManualIndexEntry } from "@/lib/manual/types";
import type { SessionUser } from "@/lib/workspace/types";

export function ManualsScreen({ session }: { session: SessionUser }) {
  const router = useRouter();
  const [manuals, setManuals] = useState<ManualIndexEntry[]>([]);
  const [users, setUsers] = useState<SessionUser[]>([]);
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(true);

  async function reload() {
    const index = await loadManualIndex();
    setManuals(index.manuals);
    setWarning(index.warning);
    if (session.role === "admin") {
      const res = await fetch("/api/users", { credentials: "include" });
      const data = (await res.json().catch(() => [])) as SessionUser[];
      setUsers(Array.isArray(data) ? data : []);
    }
    setLoading(false);
  }

  useEffect(() => {
    void reload();
  }, []);

  async function createManual() {
    const values = await openForm({
      title: "Nuevo manual",
      confirmText: "Crear",
      fields: [
        { name: "title", label: "Título", required: true, placeholder: "Procedimiento de arranque" },
        { name: "subtitle", label: "Subtítulo", required: false, placeholder: "Operación" },
      ],
    });
    if (!values) return;
    const id = newManualId();
    const saved = await saveDraft(
      id,
      createEmptyManual({
        id,
        title: values.title,
        subtitle: values.subtitle,
      }),
    );
    if (!saved.ok) {
      await tellError("No se creó el manual", saved.error || "No hay conexión con la base de manuales.");
      return;
    }
    router.push(`/manuals/view/${id}`);
  }

  async function publish(manual: ManualIndexEntry) {
    const inviteeIds = await openInvite({
      title: `Publicar ${manual.title}`,
      users,
      selected: manual.inviteeIds,
    });
    if (!inviteeIds) return;
    const res = await fetch(`/api/manuals/${manual.id}/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "published", inviteeIds }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      await tellError("No se publicó", data.error);
      return;
    }
    await reload();
    await notify("Manual publicado");
  }

  async function unpublish(manual: ManualIndexEntry) {
    const ok = await confirmAction(
      "Volver a borrador",
      "Los operadores dejarán de ver este manual.",
      "Volver a borrador",
    );
    if (!ok) return;
    const res = await fetch(`/api/manuals/${manual.id}/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "draft", inviteeIds: manual.inviteeIds }),
    });
    if (!res.ok) {
      await tellError("No se pudo volver a borrador");
      return;
    }
    await reload();
  }

  function inviteeNames(ids: string[]): string {
    return ids
      .map((id) => users.find((user) => user.id === id)?.name || "")
      .filter(Boolean)
      .join(", ");
  }

  return (
    <div className="desk-stack">
      {session.role === "admin" ? (
        <div className="desk-row">
          <button
            type="button"
            className="desk-btn"
            style={{ background: brand.primary, color: onPrimary(brand.primary) }}
            onClick={() => void createManual()}
          >
            Crear manual
          </button>
          <Link className="desk-textlink" href="/manuals/example">
            Manual de ejemplo
          </Link>
        </div>
      ) : null}
      {warning ? <p className="desk-warn">{warning}</p> : null}
      {loading ? <p className="desk-muted">Cargando…</p> : null}
      {!loading && manuals.length === 0 ? (
        <p className="desk-muted">
          {session.role === "admin"
            ? "Todavía no hay manuales. Crea el primero."
            : "Todavía no te han publicado un manual."}
        </p>
      ) : null}
      <ul className="desk-list">
        {manuals.map((manual) => (
          <li key={manual.id}>
            <div>
              <strong>{manual.title}</strong>
              <span>
                {new Date(manual.updatedAt).toLocaleString("es")}
                {manual.status === "published" && inviteeNames(manual.inviteeIds)
                  ? ` · ${inviteeNames(manual.inviteeIds)}`
                  : ""}
              </span>
            </div>
            <div className="desk-row">
              <span className={`desk-chip ${manual.status === "published" ? "pub" : "draft"}`}>
                {manual.status === "published" ? "Publicado" : "Borrador"}
              </span>
              <Link className="desk-btn quiet" href={`/manuals/view/${manual.id}`}>
                Abrir
              </Link>
              {session.role === "admin" ? (
                <button type="button" className="desk-btn quiet" onClick={() => void publish(manual)}>
                  {manual.status === "published" ? "Invitados" : "Publicar"}
                </button>
              ) : null}
              {session.role === "admin" && manual.status === "published" ? (
                <button type="button" className="desk-btn quiet" onClick={() => void unpublish(manual)}>
                  Borrador
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
