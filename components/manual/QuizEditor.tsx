"use client";

import type { ManualQuizQuestion } from "@/lib/manual/types";
import { emptyQuizQuestion } from "@/lib/manual/quiz";

type Props = {
  questions: ManualQuizQuestion[];
  onChange: (next: ManualQuizQuestion[]) => void;
};

export function QuizEditor({ questions, onChange }: Props) {
  function updateQuestion(index: number, patch: Partial<ManualQuizQuestion>) {
    const next = [...questions];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function updateOption(
    qIndex: number,
    optIndex: number,
    value: string,
    lang: "en" | "es",
  ) {
    const q = questions[qIndex];
    const key = lang === "es" ? "optionsEs" : "options";
    const options = [...(q[key] ?? q.options)];
    while (options.length <= optIndex) options.push("");
    options[optIndex] = value;
    updateQuestion(qIndex, { [key]: options });
  }

  return (
    <div className="quiz-editor">
      {questions.map((q, qi) => (
        <article key={qi} className="quiz-question-card">
          <div className="block-item-head">
            <strong>Pregunta {qi + 1}</strong>
            <button
              type="button"
              className="btn ghost small danger"
              onClick={() => onChange(questions.filter((_, i) => i !== qi))}
            >
              Quitar
            </button>
          </div>
          <label>
            Enunciado (EN)
            <textarea
              rows={2}
              value={q.q}
              onChange={(e) => updateQuestion(qi, { q: e.target.value })}
            />
          </label>
          <label>
            Enunciado (ES)
            <textarea
              rows={2}
              value={q.qEs ?? ""}
              onChange={(e) => updateQuestion(qi, { qEs: e.target.value })}
            />
          </label>
          {[0, 1, 2].map((oi) => (
            <div key={oi} className="quiz-option-row">
              <label className="quiz-opt-label">
                <input
                  type="radio"
                  name={`correct-${qi}`}
                  checked={q.a === oi}
                  onChange={() => updateQuestion(qi, { a: oi })}
                />
                Opción {["A", "B", "C"][oi]}
              </label>
              <input
                placeholder="English"
                value={q.options[oi] ?? ""}
                onChange={(e) => updateOption(qi, oi, e.target.value, "en")}
              />
              <input
                placeholder="Español"
                value={q.optionsEs?.[oi] ?? ""}
                onChange={(e) => updateOption(qi, oi, e.target.value, "es")}
              />
            </div>
          ))}
          <label>
            Feedback correcto (EN)
            <input
              value={q.why ?? ""}
              onChange={(e) => updateQuestion(qi, { why: e.target.value })}
            />
          </label>
          <label>
            Feedback correcto (ES)
            <input
              value={q.whyEs ?? ""}
              onChange={(e) => updateQuestion(qi, { whyEs: e.target.value })}
            />
          </label>
        </article>
      ))}
      <button
        type="button"
        className="btn ghost small"
        onClick={() => onChange([...questions, emptyQuizQuestion()])}
      >
        + Añadir pregunta
      </button>
    </div>
  );
}
