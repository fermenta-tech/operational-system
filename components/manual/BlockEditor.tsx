"use client";

import { useState } from "react";
import {
  BLOCK_TYPE_LABELS,
  type BlockType,
} from "@/lib/manual/blocks";
import type { ManualBlock } from "@/lib/manual/types";

type Props = {
  block: ManualBlock;
  onChange: (b: ManualBlock) => void;
  onRemove: () => void;
};

function LinesField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string[];
  onChange: (items: string[]) => void;
  rows?: number;
}) {
  return (
    <label>
      {label}
      <textarea
        rows={rows}
        value={value.join("\n")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
        placeholder="Un ítem por línea"
      />
    </label>
  );
}

export function BlockEditor({ block, onChange, onRemove }: Props) {
  const [advanced, setAdvanced] = useState(false);
  const type = block.type as BlockType;

  return (
    <div className="block-item">
      <div className="block-item-head">
        <strong>{BLOCK_TYPE_LABELS[type] ?? type}</strong>
        <button type="button" className="btn ghost small" onClick={onRemove}>
          Quitar
        </button>
      </div>

      {block.type === "text" ||
      block.type === "callout" ||
      block.type === "warn" ||
      block.type === "ok" ? (
        <textarea
          rows={3}
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
        />
      ) : null}

      {block.type === "heading" ? (
        <div className="form-stack wide">
          <label>
            Nivel
            <select
              value={block.level}
              onChange={(e) =>
                onChange({
                  ...block,
                  level: Number(e.target.value) as 2 | 3 | 4,
                })
              }
            >
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
            </select>
          </label>
          <input
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
          />
        </div>
      ) : null}

      {block.type === "columns" ? (
        <div className="form-stack wide">
          {block.columns.map((col, ci) => (
            <div key={ci} className="column-edit-card">
              <div className="block-item-head">
                <span>Columna {ci + 1}</span>
                <button
                  type="button"
                  className="btn ghost small"
                  onClick={() =>
                    onChange({
                      ...block,
                      columns: block.columns.filter((_, i) => i !== ci),
                    })
                  }
                >
                  Quitar
                </button>
              </div>
              <input
                placeholder="Título (opcional)"
                value={col.title ?? ""}
                onChange={(e) => {
                  const columns = [...block.columns];
                  columns[ci] = { ...columns[ci], title: e.target.value };
                  onChange({ ...block, columns });
                }}
              />
              <textarea
                rows={3}
                value={col.body}
                onChange={(e) => {
                  const columns = [...block.columns];
                  columns[ci] = { ...columns[ci], body: e.target.value };
                  onChange({ ...block, columns });
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
                columns: [
                  ...block.columns,
                  { title: "", body: "Nueva columna" },
                ],
              })
            }
          >
            + columna
          </button>
        </div>
      ) : null}

      {block.type === "list" || block.type === "steps" || block.type === "checklist" ? (
        <div className="form-stack wide">
          <label>
            Título
            <input
              value={block.title ?? ""}
              onChange={(e) => onChange({ ...block, title: e.target.value })}
            />
          </label>
          <LinesField
            label="Ítems"
            value={block.items}
            onChange={(items) => onChange({ ...block, items })}
          />
        </div>
      ) : null}

      {block.type === "table" ? (
        <div className="form-stack wide">
          <label>
            Encabezados (separados por |)
            <input
              value={block.headers.join(" | ")}
              onChange={(e) =>
                onChange({
                  ...block,
                  headers: e.target.value
                    .split("|")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>
          <label>
            Filas (una por línea, celdas con |)
            <textarea
              rows={5}
              value={block.rows.map((r) => r.join(" | ")).join("\n")}
              onChange={(e) =>
                onChange({
                  ...block,
                  rows: e.target.value
                    .split("\n")
                    .filter((line) => line.trim())
                    .map((line) =>
                      line.split("|").map((s) => s.trim()),
                    ),
                })
              }
            />
          </label>
        </div>
      ) : null}

      {block.type === "chart" ? (
        <div className="form-stack wide">
          <label>
            Título
            <input
              value={block.title ?? ""}
              onChange={(e) => onChange({ ...block, title: e.target.value })}
            />
          </label>
          <label>
            Tipo
            <select
              value={block.chartKind}
              onChange={(e) =>
                onChange({
                  ...block,
                  chartKind: e.target.value as "bar" | "line",
                })
              }
            >
              <option value="bar">Barras</option>
              <option value="line">Líneas</option>
            </select>
          </label>
          <label>
            Etiquetas (una por línea)
            <textarea
              rows={3}
              value={block.labels.join("\n")}
              onChange={(e) =>
                onChange({
                  ...block,
                  labels: e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>
          <label>
            Valores (números, una por línea)
            <textarea
              rows={3}
              value={block.values.join("\n")}
              onChange={(e) =>
                onChange({
                  ...block,
                  values: e.target.value
                    .split("\n")
                    .map((s) => Number(s.trim()))
                    .filter((n) => !Number.isNaN(n)),
                })
              }
            />
          </label>
        </div>
      ) : null}

      {block.type === "manual-html" ? (
        <div className="form-stack wide">
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={advanced}
              onChange={(e) => setAdvanced(e.target.checked)}
            />
            Modo avanzado (HTML crudo)
          </label>
          {advanced ? (
            <textarea
              rows={10}
              className="code-area"
              value={block.html}
              onChange={(e) => onChange({ ...block, html: e.target.value })}
            />
          ) : (
            <p className="hint">
              Usa bloques estructurados arriba cuando puedas. Activa modo avanzado
              para pegar HTML del manual legacy (<code>blockquote</code>, figuras,
              tablas Word, etc.).
            </p>
          )}
        </div>
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
                items: [...(block.items || []), { url: "", caption: "" }],
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
            <div key={i} className="form-stack wide video-edit-card">
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
              <LinesField
                label="Pasos (opcional)"
                value={item.steps ?? []}
                onChange={(steps) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], steps };
                  onChange({ ...block, items });
                }}
                rows={2}
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
                  { title: "Nuevo video", url: "", steps: [] },
                ],
              })
            }
          >
            + video
          </button>
        </div>
      ) : null}

      {block.type === "nav-cards" ? (
        <div className="form-stack wide">
          {block.items.map((card, i) => (
            <div key={i} className="nav-card-edit">
              <input
                placeholder="Tag"
                value={card.tag}
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], tag: e.target.value };
                  onChange({ ...block, items });
                }}
              />
              <input
                placeholder="Título"
                value={card.title}
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], title: e.target.value };
                  onChange({ ...block, items });
                }}
              />
              <textarea
                rows={2}
                placeholder="Texto"
                value={card.text}
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], text: e.target.value };
                  onChange({ ...block, items });
                }}
              />
              <input
                placeholder="Slide destino (id)"
                value={card.go}
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], go: e.target.value };
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
                  ...block.items,
                  { tag: "TAG", title: "Título", text: "", go: "t01" },
                ],
              })
            }
          >
            + tarjeta
          </button>
        </div>
      ) : null}

      {block.type === "flow" ? (
        <div className="form-stack wide">
          {block.nodes.map((node, i) => (
            <div key={i} className="flow-node-edit">
              <input
                placeholder="Etiqueta"
                value={node.label}
                onChange={(e) => {
                  const nodes = [...block.nodes];
                  nodes[i] = { ...nodes[i], label: e.target.value };
                  onChange({ ...block, nodes });
                }}
              />
              <input
                placeholder="Sub / tag"
                value={node.sub ?? ""}
                onChange={(e) => {
                  const nodes = [...block.nodes];
                  nodes[i] = { ...nodes[i], sub: e.target.value };
                  onChange({ ...block, nodes });
                }}
              />
              <textarea
                rows={2}
                placeholder="Detalle al clic"
                value={node.detail}
                onChange={(e) => {
                  const nodes = [...block.nodes];
                  nodes[i] = { ...nodes[i], detail: e.target.value };
                  onChange({ ...block, nodes });
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
                nodes: [
                  ...block.nodes,
                  { label: "NODO", sub: "", detail: "Detalle." },
                ],
              })
            }
          >
            + nodo
          </button>
        </div>
      ) : null}

      {block.type === "reveal" ? (
        <div className="form-stack wide">
          <label>
            Título
            <input
              value={block.title ?? ""}
              onChange={(e) => onChange({ ...block, title: e.target.value })}
            />
          </label>
          {block.items.map((it, i) => (
            <div key={i} className="reveal-edit">
              <input
                value={it.label}
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], label: e.target.value };
                  onChange({ ...block, items });
                }}
              />
              <textarea
                rows={2}
                value={it.detail}
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], detail: e.target.value };
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
                items: [...block.items, { label: "Tema", detail: "" }],
              })
            }
          >
            + ítem
          </button>
        </div>
      ) : null}

      {block.type === "simulator" ? (
        <div className="form-stack wide">
          <label>
            Título
            <input
              value={block.title ?? ""}
              onChange={(e) => onChange({ ...block, title: e.target.value })}
            />
          </label>
          <LinesField
            label="Permisivos"
            value={block.items}
            onChange={(items) => onChange({ ...block, items })}
          />
          <label>
            Mensaje éxito
            <input
              value={block.success}
              onChange={(e) => onChange({ ...block, success: e.target.value })}
            />
          </label>
          <label>
            Mensaje bloqueo
            <input
              value={block.fail}
              onChange={(e) => onChange({ ...block, fail: e.target.value })}
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}
