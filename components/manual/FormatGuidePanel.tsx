"use client";

import { useState } from "react";
import {
  BLOCK_TYPES_GUIDE,
  COPY_SNIPPETS,
  PAGE_FIELDS_GUIDE,
  SLIDE_KINDS_GUIDE,
} from "@/lib/manual/format-guide";

type Props = {
  onInsertSnippet?: (code: string) => void;
  compact?: boolean;
};

export function FormatGuidePanel({ onInsertSnippet, compact }: Props) {
  const [copied, setCopied] = useState("");
  const [tab, setTab] = useState<"slides" | "pages" | "blocks" | "snippets">(
    "slides",
  );

  async function copy(code: string, id: string) {
    await navigator.clipboard.writeText(code);
    setCopied(id);
    window.setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className={`format-guide${compact ? " compact" : ""}`}>
      <div className="format-guide-head">
        <h2>Guía del formato slides</h2>
        <p className="hint">
          Basada en REDUCTION_SLIDES, build-content.mjs y el visor en{" "}
          <code>ejemplos/manual-interactivo</code>.
        </p>
      </div>
      <div className="format-tabs" role="tablist">
        {(
          [
            ["slides", "Tipos slide"],
            ["pages", "Campos"],
            ["blocks", "Bloques"],
            ["snippets", "Ejemplos"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            className={tab === key ? "on" : ""}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "slides" ? (
        <ul className="guide-list">
          {SLIDE_KINDS_GUIDE.map((row) => (
            <li key={row.kind}>
              <strong>
                {row.kind}
                {"id" in row && row.id ? ` · ${row.id}` : ""}
              </strong>
              <span>{row.detail}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {tab === "pages" ? (
        <ul className="guide-list">
          {PAGE_FIELDS_GUIDE.map((row) => (
            <li key={row.field}>
              <strong>
                {row.field}
                {row.required ? " *" : ""}
              </strong>
              <span>{row.detail}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {tab === "blocks" ? (
        <ul className="guide-list">
          {BLOCK_TYPES_GUIDE.map((row) => (
            <li key={row.type}>
              <strong>{row.type}</strong>
              <span>{row.summary}</span>
              <code className="guide-fields">{row.fields.join(", ")}</code>
            </li>
          ))}
          <li>
            <strong>Legacy admin</strong>
            <span>
              El visor legacy incluye edición inline y temas; el editor Next.js
              persiste JSON vía Supabase. Usa <code>manual-html</code> solo para
              HTML que no tenga bloque dedicado.
            </span>
          </li>
        </ul>
      ) : null}

      {tab === "snippets" ? (
        <div className="snippet-list">
          {COPY_SNIPPETS.map((snip) => (
            <article key={snip.id} className="snippet-card">
              <header>
                <strong>{snip.label}</strong>
                <div className="snippet-actions">
                  <button
                    type="button"
                    className="btn ghost small"
                    onClick={() => void copy(snip.code, snip.id)}
                  >
                    {copied === snip.id ? "Copiado" : "Copiar"}
                  </button>
                  {onInsertSnippet ? (
                    <button
                      type="button"
                      className="btn ghost small"
                      onClick={() => onInsertSnippet(snip.code)}
                    >
                      Insertar
                    </button>
                  ) : null}
                </div>
              </header>
              <p className="hint">{snip.description}</p>
              <pre>{snip.code}</pre>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
