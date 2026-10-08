"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { FormatGuidePanel } from "@/components/manual/FormatGuidePanel";
import type {
  ManualBlock,
  ManualContent,
  ManualCoverMeta,
  ManualEquipmentLine,
  ManualPage,
  ManualSectionLevel,
} from "@/lib/manual/types";
import { saveDraft } from "@/lib/manual/client-storage";
import {
  MANUAL_COVER_ID,
  MANUAL_TOC_ID,
  listChapters,
  newSectionPage,
  normalizeManualContent,
  refreshTocPage,
  syncCoverPage,
} from "@/lib/manual/template";

type Props = {
  manualId: string;
  initial: ManualContent;
};

type RightPanel = "guide" | "preview";

const BLOCK_TYPES: ManualBlock["type"][] = [
  "text",
  "callout",
  "manual-html",
  "photos",
  "videos",
];

function emptyBlock(type: ManualBlock["type"]): ManualBlock {
  switch (type) {
    case "text":
      return { type: "text", text: "Nuevo párrafo" };
    case "callout":
      return { type: "callout", text: "Nota destacada" };
    case "manual-html":
      return { type: "manual-html", html: "<p>Contenido HTML del manual</p>" };
    case "photos":
      return {
        type: "photos",
        items: [{ url: "/manual/images/image1.png", caption: "Leyenda" }],
      };
    case "videos":
      return {
        type: "videos",
        items: [
          {
            title: "Video de ejemplo",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            steps: [],
          },
        ],
      };
    default:
      return { type: "text", text: "" };
  }
}

function isStructuralPageId(id: string): boolean {
  return id === MANUAL_COVER_ID || id === "cover" || id === MANUAL_TOC_ID;
}

export function ManualEditor({ manualId, initial }: Props) {
  const [content, setContent] = useState(() => normalizeManualContent(initial));
  const [selectedPageId, setSelectedPageId] = useState<string>(MANUAL_COVER_ID);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionLevel, setNewSectionLevel] =
    useState<ManualSectionLevel>("chapter");
  const [savedHint, setSavedHint] = useState("");
  const [rightPanel, setRightPanel] = useState<RightPanel>("guide");
  const [previewRev, setPreviewRev] = useState(0);

  const sections = useMemo(
    () =>
      content.pages.filter(
        (p) => !isStructuralPageId(p.id) && !p.id.startsWith("review-"),
      ),
    [content.pages],
  );

  const chapters = useMemo(() => listChapters(content.pages), [content.pages]);

  const selectedPage =
    content.pages.find((p) => p.id === selectedPageId) ?? content.pages[0];

  const parentChapter =
    chapters.at(-1) ?? sections.find((s) => s.sectionLevel !== "subchapter")?.chapter ?? "Manual";

  const persist = useCallback(
    (next: ManualContent) => {
      const normalized = syncCoverPage(refreshTocPage(next));
      setContent(normalized);
      void saveDraft(manualId, normalized).then((ok) => {
        setPreviewRev((v) => v + 1);
        setSavedHint(ok ? "Guardado en Supabase" : "Error al guardar");
        window.setTimeout(() => setSavedHint(""), 2000);
      });
    },
    [manualId],
  );

  function updateMeta(patch: Partial<NonNullable<ManualContent["meta"]>>) {
    persist({
      ...content,
      meta: {
        title: content.meta?.title ?? "Untitled",
        subtitle: content.meta?.subtitle,
        cover: content.meta?.cover,
        createdAt: content.meta?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...patch,
      },
    });
  }

  function updateCoverMeta(patch: Partial<ManualCoverMeta>) {
    updateMeta({
      cover: { ...content.meta?.cover, ...patch },
    });
  }

  function updateEquipment(index: number, patch: Partial<ManualEquipmentLine>) {
    const equipment = [...(content.meta?.cover?.equipment ?? [])];
    while (equipment.length <= index) {
      equipment.push({ code: "", label: "" });
    }
    equipment[index] = { ...equipment[index], ...patch };
    updateCoverMeta({ equipment });
  }

  function addSection() {
    const title = newSectionTitle.trim();
    if (!title) return;
    if (newSectionLevel === "subchapter" && !chapters.length) {
      setSavedHint("Crea un capítulo antes de un subcapítulo");
      return;
    }
    const page = newSectionPage({
      title,
      level: newSectionLevel,
      parentChapter:
        newSectionLevel === "subchapter" ? parentChapter : title,
      index: sections.length,
    });
    persist({ ...content, pages: [...content.pages, page] });
    setNewSectionTitle("");
    setSelectedPageId(page.id);
  }

  function removeSelectedSection() {
    if (isStructuralPageId(selectedPage.id)) return;
    if (!window.confirm(`¿Eliminar la sección «${selectedPage.title}»?`)) return;
    const pages = content.pages.filter((p) => p.id !== selectedPage.id);
    persist({ ...content, pages });
    setSelectedPageId(MANUAL_TOC_ID);
  }

  function moveSection(delta: -1 | 1) {
    if (isStructuralPageId(selectedPage.id)) return;
    const ids = sections.map((s) => s.id);
    const idx = ids.indexOf(selectedPage.id);
    const target = idx + delta;
    if (idx < 0 || target < 0 || target >= ids.length) return;
    const reordered = [...sections];
    const [item] = reordered.splice(idx, 1);
    reordered.splice(target, 0, item);
    const cover = content.pages.find(
      (p) => p.id === MANUAL_COVER_ID || p.id === "cover",
    );
    const toc = content.pages.find((p) => p.id === MANUAL_TOC_ID);
    const reviews = content.pages.filter((p) => p.id.startsWith("review-"));
    persist({
      ...content,
      pages: [
        ...(cover ? [cover] : []),
        ...(toc ? [toc] : []),
        ...reordered,
        ...reviews,
      ],
    });
  }

  function updatePage(patch: Partial<ManualPage>) {
    persist({
      ...content,
      pages: content.pages.map((p) =>
        p.id === selectedPage.id ? { ...p, ...patch } : p,
      ),
    });
  }

  function updateBlock(index: number, block: ManualBlock) {
    const blocks = [...(selectedPage.blocks || [])];
    blocks[index] = block;
    updatePage({ blocks });
  }

  function addBlock(type: ManualBlock["type"], seed?: Partial<ManualBlock>) {
    const block = { ...emptyBlock(type), ...seed } as ManualBlock;
    updatePage({ blocks: [...(selectedPage.blocks || []), block] });
  }

  function insertSnippet(code: string) {
    if (isStructuralPageId(selectedPage.id) && selectedPage.id !== MANUAL_COVER_ID) {
      setSavedHint("Abre una sección de contenido para insertar HTML");
      return;
    }
    addBlock("manual-html", { html: code });
    setSavedHint("Bloque manual-html añadido");
  }

  function removeBlock(index: number) {
    const blocks = [...(selectedPage.blocks || [])];
    blocks.splice(index, 1);
    updatePage({ blocks });
  }

  async function exportToServer() {
    const ok = await saveDraft(manualId, content);
    setSavedHint(ok ? "JSON sincronizado con Supabase" : "Error al exportar");
    window.setTimeout(() => setSavedHint(""), 2000);
  }

  const previewSrc = `/ejemplos/manual-interactivo/index.html?draft=${encodeURIComponent(manualId)}&v=${previewRev}`;

  const coverMeta = content.meta?.cover;

  return (
    <div className="editor-shell">
      <aside className="editor-nav">
        <div className="editor-nav-head">
          <h2>{content.meta?.title ?? "Borrador"}</h2>
          <p className="sub">Índice · mismo flujo que el visor</p>
        </div>
        <nav className="editor-nav-list">
          <button
            type="button"
            className={selectedPageId === MANUAL_COVER_ID ? "active" : ""}
            onClick={() => setSelectedPageId(MANUAL_COVER_ID)}
          >
            <span>Start</span>
            <strong>Carátula</strong>
          </button>
          <button
            type="button"
            className={selectedPageId === MANUAL_TOC_ID ? "active" : ""}
            onClick={() => setSelectedPageId(MANUAL_TOC_ID)}
          >
            <span>Index</span>
            <strong>Índice (auto)</strong>
          </button>
          {sections.map((p) => (
            <button
              key={p.id}
              type="button"
              className={selectedPageId === p.id ? "active" : ""}
              onClick={() => setSelectedPageId(p.id)}
            >
              <span>
                {p.sectionLevel === "subchapter" ? "Subchapter" : "Chapter"}
              </span>
              <strong>{p.title}</strong>
            </button>
          ))}
        </nav>

        <div className="editor-nav-add">
          <label className="field-label">Nueva sección</label>
          <select
            value={newSectionLevel}
            onChange={(e) =>
              setNewSectionLevel(e.target.value as ManualSectionLevel)
            }
          >
            <option value="chapter">Capítulo (H1)</option>
            <option value="subchapter">Subcapítulo (H2)</option>
          </select>
          {newSectionLevel === "subchapter" ? (
            <p className="hint tiny">
              Dentro de: <strong>{parentChapter}</strong>
            </p>
          ) : null}
          <input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Título de la sección"
            onKeyDown={(e) => {
              if (e.key === "Enter") addSection();
            }}
          />
          <button type="button" className="btn block" onClick={addSection}>
            Añadir al índice
          </button>
        </div>
      </aside>

      <section className="editor-main glass-panel">
        <div className="editor-toolbar">
          <div>
            <h2 className="editor-page-title">Editor de slide</h2>
            <p className="hint toolbar-hint">
              {savedHint || "Los cambios se guardan al editar."}
            </p>
          </div>
          <div className="toolbar-actions">
            <button
              type="button"
              className={`btn ghost small${rightPanel === "guide" ? " on" : ""}`}
              onClick={() => setRightPanel("guide")}
            >
              Guía
            </button>
            <button
              type="button"
              className={`btn ghost small${rightPanel === "preview" ? " on" : ""}`}
              onClick={() => setRightPanel("preview")}
            >
              Vista previa
            </button>
            <Link className="btn ghost small" href={`/manuals/view/${manualId}`}>
              Visor completo
            </Link>
            <button
              type="button"
              className="btn ghost small"
              onClick={() => void exportToServer()}
            >
              Exportar JSON
            </button>
          </div>
        </div>

        {selectedPage.id === MANUAL_COVER_ID || selectedPage.id === "cover" ? (
          <div className="form-stack cover-form">
            <label>
              Título (slide)
              <input
                value={content.meta?.title ?? selectedPage.title}
                onChange={(e) =>
                  updateMeta({ title: e.target.value })
                }
              />
            </label>
            <label>
              Eyebrow (cover-eyebrow)
              <input
                value={coverMeta?.eyebrow ?? content.meta?.subtitle ?? ""}
                onChange={(e) =>
                  updateCoverMeta({ eyebrow: e.target.value })
                }
              />
            </label>
            <label>
              Línea de marca (cover-brand)
              <input
                value={coverMeta?.brandLine ?? ""}
                onChange={(e) =>
                  updateCoverMeta({ brandLine: e.target.value })
                }
              />
            </label>
            {[0, 1, 2].map((i) => (
              <div key={i} className="equipment-row">
                <input
                  placeholder="Código EQ"
                  value={coverMeta?.equipment?.[i]?.code ?? ""}
                  onChange={(e) => updateEquipment(i, { code: e.target.value })}
                />
                <input
                  placeholder="Descripción"
                  value={coverMeta?.equipment?.[i]?.label ?? ""}
                  onChange={(e) => updateEquipment(i, { label: e.target.value })}
                />
              </div>
            ))}
            <label>
              Aviso legal (opcional)
              <textarea
                rows={2}
                value={coverMeta?.notice ?? ""}
                onChange={(e) => updateCoverMeta({ notice: e.target.value })}
              />
            </label>
            <p className="hint">
              La carátula usa la misma estructura HTML que REDUCTION CIRCUIT
              (cover-hero). El visor aplica layout-cover con id{" "}
              <code>t01</code>.
            </p>
          </div>
        ) : selectedPage.id === MANUAL_TOC_ID ? (
          <div className="toc-readonly">
            <p className="hint">
              El índice (<code>toc-grid</code> / <code>toc-card</code>) se
              regenera al añadir capítulos o subcapítulos. Abre la vista previa
              para navegar como en el manual de ejemplo.
            </p>
            <pre className="toc-preview">
              {(selectedPage.blocks?.[0]?.type === "manual-html"
                ? selectedPage.blocks[0].html
                : "") || ""}
            </pre>
          </div>
        ) : (
          <>
            <div className="section-toolbar">
              <button
                type="button"
                className="btn ghost small"
                onClick={() => moveSection(-1)}
              >
                ↑ Subir
              </button>
              <button
                type="button"
                className="btn ghost small"
                onClick={() => moveSection(1)}
              >
                ↓ Bajar
              </button>
              <button
                type="button"
                className="btn ghost small danger"
                onClick={removeSelectedSection}
              >
                Eliminar sección
              </button>
            </div>
            <div className="form-stack wide">
              <label>
                Título
                <input
                  value={selectedPage.title}
                  onChange={(e) => updatePage({ title: e.target.value })}
                />
              </label>
              <label>
                Kicker
                <input
                  value={selectedPage.kicker ?? ""}
                  onChange={(e) => updatePage({ kicker: e.target.value })}
                />
              </label>
              <label>
                Lead / entradilla
                <textarea
                  rows={2}
                  value={selectedPage.lead ?? ""}
                  onChange={(e) => updatePage({ lead: e.target.value })}
                />
              </label>
              <label>
                Anchor (href del índice)
                <input
                  value={selectedPage.anchor ?? ""}
                  onChange={(e) => updatePage({ anchor: e.target.value })}
                  placeholder="objectives"
                />
              </label>
              <label>
                Nivel
                <select
                  value={selectedPage.sectionLevel ?? "chapter"}
                  onChange={(e) =>
                    updatePage({
                      sectionLevel: e.target.value as ManualSectionLevel,
                      kicker:
                        e.target.value === "chapter"
                          ? "Chapter"
                          : `Subchapter · ${selectedPage.chapter}`,
                    })
                  }
                >
                  <option value="chapter">Capítulo</option>
                  <option value="subchapter">Subcapítulo</option>
                </select>
              </label>
            </div>

            <h3 className="blocks-heading">Bloques de contenido</h3>
            <div className="block-list">
              {(selectedPage.blocks || []).map((block, index) => (
                <BlockEditor
                  key={`${selectedPage.id}-${index}`}
                  block={block}
                  onChange={(b) => updateBlock(index, b)}
                  onRemove={() => removeBlock(index)}
                />
              ))}
            </div>
            <div className="block-add-row">
              {BLOCK_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className="btn ghost small"
                  onClick={() => addBlock(type)}
                >
                  + {type}
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      <aside className="editor-side glass-panel">
        {rightPanel === "guide" ? (
          <FormatGuidePanel onInsertSnippet={insertSnippet} compact />
        ) : (
          <div className="editor-preview-wrap">
            <p className="hint preview-label">
              Vista previa en vivo (API Supabase vía{" "}
              <code>?draft=</code>)
            </p>
            <iframe
              key={previewSrc}
              className="editor-preview-frame"
              title="Vista previa del borrador"
              src={previewSrc}
            />
          </div>
        )}
      </aside>
    </div>
  );
}

function BlockEditor({
  block,
  onChange,
  onRemove,
}: {
  block: ManualBlock;
  onChange: (b: ManualBlock) => void;
  onRemove: () => void;
}) {
  return (
    <div className="block-item">
      <div className="block-item-head">
        <strong>{block.type}</strong>
        <button type="button" className="btn ghost small" onClick={onRemove}>
          Quitar
        </button>
      </div>
      {block.type === "text" || block.type === "callout" ? (
        <textarea
          rows={3}
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
        />
      ) : null}
      {block.type === "manual-html" ? (
        <textarea
          rows={8}
          className="code-area"
          value={block.html}
          onChange={(e) => onChange({ ...block, html: e.target.value })}
        />
      ) : null}
      {block.type === "photos" ? (
        <div className="form-stack wide">
          {(block.items || []).map((item, i) => (
            <div key={i} className="equipment-row">
              <input
                value={item.url}
                placeholder="URL imagen"
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], url: e.target.value };
                  onChange({ ...block, items });
                }}
              />
              <input
                placeholder="Leyenda"
                value={item.caption ?? ""}
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], caption: e.target.value };
                  onChange({ ...block, items });
                }}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn ghost small"
            onClick={() =>
              onChange({
                ...block,
                items: [
                  ...(block.items || []),
                  { url: "", caption: "" },
                ],
              })
            }
          >
            + imagen
          </button>
        </div>
      ) : null}
      {block.type === "videos" ? (
        <div className="form-stack wide">
          {(block.items || []).map((item, i) => (
            <div key={i} className="form-stack wide">
              <input
                value={item.title}
                placeholder="Título"
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], title: e.target.value };
                  onChange({ ...block, items });
                }}
              />
              <input
                placeholder="URL (YouTube o .mp4)"
                value={item.url}
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], url: e.target.value };
                  onChange({ ...block, items });
                }}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
