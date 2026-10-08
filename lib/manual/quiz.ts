import type { ManualQuizQuestion } from "./types";

export function emptyQuizQuestion(): ManualQuizQuestion {
  return {
    q: "Question in English?",
    qEs: "¿Pregunta en español?",
    options: ["Correct answer", "Distractor B", "Distractor C"],
    optionsEs: ["Respuesta correcta", "Distractor B", "Distractor C"],
    a: 0,
    why: "The correct answer is the first option.",
    whyEs: "La respuesta correcta es la primera opción.",
  };
}

export function normalizeQuiz(raw: unknown): ManualQuizQuestion[] {
  if (!Array.isArray(raw)) return [];
  const out: ManualQuizQuestion[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const q = item as Record<string, unknown>;
    const question = String(q.q ?? "").trim();
    if (!question) continue;
    const options = Array.isArray(q.options)
      ? q.options.map(String)
      : ["A", "B", "C"];
    const optionsEs = Array.isArray(q.optionsEs)
      ? q.optionsEs.map(String)
      : options;
    out.push({
      q: question,
      qEs: q.qEs != null ? String(q.qEs) : undefined,
      options,
      optionsEs,
      a: typeof q.a === "number" ? q.a : 0,
      why: q.why != null ? String(q.why) : undefined,
      whyEs: q.whyEs != null ? String(q.whyEs) : undefined,
    });
  }
  return out;
}
