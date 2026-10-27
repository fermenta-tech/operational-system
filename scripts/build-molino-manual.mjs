import fs from "node:fs";

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const title = "Operación del molino de bolas MB-240";
const subtitle = "Planta de molienda · Turno de operación";
const now = new Date().toISOString();

const coverHtml = `
  <div class="cover-hero">
    <div class="cover-brand">
      <span>Operational System</span>
    </div>
    <div class="cover-eyebrow">${esc(subtitle)}</div>
    <div class="cover-equipment">
      <div><strong>MB-240</strong><span>Molino de bolas</span></div>
      <div><strong>AL-12</strong><span>Alimentador</span></div>
      <div><strong>BT-03</strong><span>Banda de descarga</span></div>
    </div>
    <h2 style="margin:12px 0 0">${esc(title)}</h2>
    <div class="cover-start">Usa <strong>Siguiente</strong> o elige un módulo en el menú de la izquierda.</div>
  </div>`;

function page(partial) {
  return {
    kicker: "",
    lead: "",
    blocks: [],
    ...partial,
  };
}

const pages = [
  page({
    id: "t01",
    chapter: "Inicio",
    group: "Carátula",
    title,
    slideKind: "cover",
    kicker: subtitle,
    lead: "Manual de operación para el turno. Léelo antes de energizar el molino.",
    blocks: [{ type: "manual-html", html: coverHtml }],
  }),
  page({
    id: "toc",
    chapter: "Inicio",
    group: "Índice",
    title: "Índice",
    slideKind: "toc",
    kicker: "Contenido",
    lead: "Los módulos de este manual.",
    blocks: [{ type: "manual-html", html: "<div class=\"toc-grid\"></div>" }],
  }),
  page({
    id: "mod-antes",
    chapter: "Antes de arrancar",
    group: "Antes de arrancar",
    title: "Antes de arrancar",
    slideKind: "chapter",
    sectionLevel: "chapter",
    kicker: "Módulo",
    lead: "Nadie energiza el molino sin recorrer esta lista.",
    blocks: [
      { type: "text", text: "Este módulo reúne lo que el operador confirma en piso antes de pulsar arranque. Si un punto no se cumple, el molino se queda detenido." },
      { type: "list", title: "En este módulo", items: ["Equipo de protección", "Bloqueo y etiquetado", "Parámetros de la guardia"] },
    ],
  }),
  page({
    id: "sub-epp",
    chapter: "Antes de arrancar",
    group: "Equipo de protección",
    title: "Equipo de protección",
    slideKind: "subchapter",
    sectionLevel: "subchapter",
    kicker: "Submódulo",
    lead: "El ingreso al área del molino es con equipo completo.",
    blocks: [
      { type: "text", text: "El casco, las gafas, la protección auditiva y el calzado de seguridad se colocan antes de cruzar la línea amarilla. Sin guantes no se tocan guardas ni el alimentador." },
      {
        type: "checklist",
        title: "Antes de entrar al área",
        items: ["Casco y gafas puestos", "Protección auditiva puesta", "Calzado de seguridad", "Guantes para maniobrar guardas", "Radio del turno encendida"],
      },
    ],
  }),
  page({
    id: "slide-bloqueo",
    chapter: "Antes de arrancar",
    group: "Equipo de protección",
    title: "Bloqueo y etiquetado",
    slideKind: "content",
    sectionLevel: "content",
    kicker: "Información",
    lead: "Si hay una persona dentro de la guarda, el molino no arranca.",
    blocks: [
      { type: "warn", text: "No retires un candado que no sea el tuyo. El dueño del candado es quien lo quita, al salir del equipo." },
      {
        type: "steps",
        title: "Orden del bloqueo",
        items: [
          "Avisa por radio que el MB-240 queda en bloqueo.",
          "Para el molino desde el tablero y espera velocidad cero.",
          "Abre el interruptor principal y coloca tu candado.",
          "Pon la etiqueta con tu nombre, la hora y el motivo.",
          "Prueba el pulsador de arranque: no debe responder.",
        ],
      },
    ],
  }),
  page({
    id: "slide-parametros",
    chapter: "Antes de arrancar",
    group: "Equipo de protección",
    title: "Parámetros de la guardia",
    slideKind: "content",
    sectionLevel: "content",
    kicker: "Tabla",
    lead: "Estos son los valores con los que el molino puede arrancar.",
    blocks: [
      {
        type: "table",
        headers: ["Punto", "Mínimo", "Normal", "Máximo"],
        rows: [
          ["Nivel de pulpa en la cuba", "40 %", "55 %", "70 %"],
          ["Presión de agua de sello", "2.0 bar", "2.5 bar", "3.0 bar"],
          ["Temperatura del descanso", "—", "45 °C", "65 °C"],
          ["Carga de bolas", "28 %", "32 %", "35 %"],
          ["Amperaje del motor", "—", "180 A", "220 A"],
        ],
      },
      { type: "ok", text: "Si un valor está fuera de la columna Normal, avisa al supervisor antes de arrancar." },
    ],
  }),
  page({
    id: "mod-arranque",
    chapter: "Arranque",
    group: "Arranque",
    title: "Arranque",
    slideKind: "chapter",
    sectionLevel: "chapter",
    kicker: "Módulo",
    lead: "La secuencia empieza por los auxiliares y termina en el molino.",
    blocks: [
      { type: "text", text: "El molino no arranca solo. Primero el agua de sello, luego la banda de descarga y al final el motor principal. Invertir el orden llena la descarga y dispara el molino." },
      {
        type: "flow",
        nodes: [
          { label: "Sello", sub: "Agua", detail: "Abre el agua de sello y confirma 2.5 bar en el manómetro local." },
          { label: "Banda", sub: "BT-03", detail: "Arranca la banda de descarga y espera a que gire estable, sin carga." },
          { label: "Molino", sub: "MB-240", detail: "Pulsa arranque en el tablero. El amperaje sube y debe bajar hacia 180 A." },
        ],
      },
    ],
  }),
  page({
    id: "sub-secuencia",
    chapter: "Arranque",
    group: "Secuencia",
    title: "Secuencia de arranque",
    slideKind: "subchapter",
    sectionLevel: "subchapter",
    kicker: "Submódulo",
    lead: "Sigue los pasos en orden. No te saltes ninguno.",
    blocks: [
      {
        type: "steps",
        title: "Arranque del MB-240",
        items: [
          "Confirma que no hay candados en el interruptor principal.",
          "Abre el agua de sello y lee 2.5 bar.",
          "Arranca la banda BT-03 en vacío.",
          "Arranca el alimentador AL-12 en velocidad baja.",
          "Pulsa arranque del molino y quédate en el tablero el primer minuto.",
          "Sube la alimentación solo cuando el amperaje se estabilice.",
        ],
      },
    ],
  }),
  page({
    id: "slide-molino",
    chapter: "Arranque",
    group: "Secuencia",
    title: "El equipo en piso",
    slideKind: "content",
    sectionLevel: "content",
    kicker: "Imagen",
    lead: "Reconoce el molino, la alimentación y la descarga antes de operarlo.",
    blocks: [
      {
        type: "photos",
        items: [
          { url: "/manuales/molino-bolas.jpg", caption: "Molino de bolas MB-240, alimentación a la izquierda y descarga a la banda." },
          { kind: "pump", caption: "Bomba de agua de sello. El manómetro debe marcar 2.5 bar." },
        ],
      },
    ],
  }),
  page({
    id: "slide-alarmas",
    chapter: "Arranque",
    group: "Secuencia",
    title: "Alarmas del arranque",
    slideKind: "content",
    sectionLevel: "content",
    kicker: "Tabla",
    lead: "Si aparece una de estas alarmas, no insistas con el pulsador.",
    blocks: [
      {
        type: "table",
        headers: ["Alarma", "Qué significa", "Qué haces"],
        rows: [
          ["Sello bajo", "El agua de sello no llega a 2.0 bar", "Cierra el arranque y revisa la válvula del sello"],
          ["Banda detenida", "La BT-03 no confirma giro", "No arranques el molino. Revisa el paro de emergencia de la banda"],
          ["Sobrecorriente", "El motor pasa de 220 A", "Para el molino y avisa al supervisor. No reintentes"],
          ["Guarda abierta", "Un final de carrera está abierto", "Cierra la guarda y confirma el candado fuera"],
        ],
      },
    ],
  }),
  page({
    id: "mod-marcha",
    chapter: "Operación en marcha",
    group: "Operación en marcha",
    title: "Operación en marcha",
    slideKind: "chapter",
    sectionLevel: "chapter",
    kicker: "Módulo",
    lead: "Con el molino girando, el trabajo es vigilar y no abandonar el tablero.",
    blocks: [
      { type: "text", text: "En marcha normal el amperaje se queda cerca de 180 A, la pulpa en la cuba cerca del 55 % y la banda descarga sin derrames. Un cambio brusco se reporta en el momento, no al final del turno." },
      {
        type: "list",
        title: "Cada hora",
        items: [
          "Lee amperaje, temperatura del descanso y nivel de pulpa.",
          "Mira que la banda no acumule material en el retorno.",
          "Anota los tres valores en la bitácora del turno.",
        ],
      },
    ],
  }),
  page({
    id: "slide-tablero",
    chapter: "Operación en marcha",
    group: "Operación en marcha",
    title: "Lectura del tablero",
    slideKind: "content",
    sectionLevel: "content",
    kicker: "Imagen",
    lead: "Verde es marcha. Ámbar es aviso. Rojo es paro.",
    blocks: [
      {
        type: "photos",
        items: [
          { url: "/manuales/tablero-control.jpg", caption: "Tablero del MB-240. Arranque en verde, paro en rojo." },
          { kind: "hmi", caption: "Pantalla de marcha. LEVEL OK y válvulas abiertas antes de subir alimentación." },
        ],
      },
      { type: "callout", text: "Si el ámbar del sello parpadea, baja la alimentación y revisa la presión antes de que pase a rojo." },
    ],
  }),
  page({
    id: "resumen",
    chapter: "Cierre",
    group: "Resumen",
    title: "Resumen del turno",
    slideKind: "summary",
    sectionLevel: "content",
    kicker: "Resumen",
    lead: "Escucha el resumen antes de responder el cuestionario.",
    summary: {
      es: "Antes de arrancar te pones el equipo de protección y recorres el bloqueo. El agua de sello va primero, después la banda y al final el molino. En marcha vigilas el amperaje cerca de 180 amperes, la pulpa cerca del 55 por ciento y la temperatura del descanso por debajo de 65 grados. Si hay sello bajo, banda detenida o sobrecorriente, paras y avisas. No reintentas un arranque que ya disparó.",
      en: "Before starting, wear the protective equipment and complete the lockout. Seal water comes first, then the belt, then the mill. In operation watch the amperage near 180 amps, the pulp near 55 percent, and the bearing temperature below 65 degrees. If seal pressure is low, the belt is stopped, or there is overcurrent, stop and call the supervisor. Do not retry a start that already tripped.",
    },
    quiz: [],
    blocks: [
      { type: "text", text: "Este resumen lo narra el avatar. Puedes corregir el texto haciendo clic sobre él." },
    ],
  }),
  page({
    id: "cuestionario",
    chapter: "Cierre",
    group: "Cuestionario",
    title: "Cuestionario de cierre",
    slideKind: "quiz",
    sectionLevel: "content",
    kicker: "Cuestionario",
    lead: "Tres preguntas. La respuesta correcta es la que marcas como Correcta.",
    summary: {
      es: "Responde con lo que acabas de recorrer: el orden de arranque, el amperaje de marcha y qué hacer si el motor pasa de 220 amperes.",
      en: "Answer from the procedure you just reviewed: the start order, the running amperage, and what to do if the motor exceeds 220 amps.",
    },
    quiz: [
      {
        q: "¿Cuál es el orden correcto de arranque?",
        qEs: "¿Cuál es el orden correcto de arranque?",
        options: ["Molino, banda y sello", "Sello, banda y molino", "Banda, molino y sello"],
        optionsEs: ["Molino, banda y sello", "Sello, banda y molino", "Banda, molino y sello"],
        a: 1,
        why: "El agua de sello va primero, luego la banda de descarga y al final el molino.",
        whyEs: "El agua de sello va primero, luego la banda de descarga y al final el molino.",
      },
      {
        q: "¿Qué amperaje es normal con el molino en marcha?",
        qEs: "¿Qué amperaje es normal con el molino en marcha?",
        options: ["80 A", "180 A", "260 A"],
        optionsEs: ["80 A", "180 A", "260 A"],
        a: 1,
        why: "La marcha normal está cerca de 180 A. Por encima de 220 A es sobrecorriente.",
        whyEs: "La marcha normal está cerca de 180 A. Por encima de 220 A es sobrecorriente.",
      },
      {
        q: "El motor pasa de 220 A en el arranque. ¿Qué haces?",
        qEs: "El motor pasa de 220 A en el arranque. ¿Qué haces?",
        options: ["Mantienes el pulsador presionado", "Paras el molino y avisas al supervisor", "Subes la alimentación para estabilizar"],
        optionsEs: ["Mantienes el pulsador presionado", "Paras el molino y avisas al supervisor", "Subes la alimentación para estabilizar"],
        a: 1,
        why: "La sobrecorriente se atiende parando y avisando. No se reintenta el arranque.",
        whyEs: "La sobrecorriente se atiende parando y avisando. No se reintenta el arranque.",
      },
    ],
    blocks: [],
  }),
];

const tocCards = pages
  .filter((p) => p.slideKind === "chapter" || p.slideKind === "summary" || p.slideKind === "quiz")
  .map(
    (p) => `<a class="toc-card" href="#${p.id}" data-go="${p.id}"><span>${esc(p.kicker)}</span><strong>${esc(p.title)}</strong><i>Abrir →</i></a>`,
  )
  .join("");
pages[1].blocks = [{ type: "manual-html", html: `<div class="toc-grid">${tocCards}</div>` }];

const content = {
  ver: 8,
  meta: {
    title,
    subtitle,
    cover: {
      eyebrow: subtitle,
      brandLine: "Operational System",
      equipment: [
        { code: "MB-240", label: "Molino de bolas" },
        { code: "AL-12", label: "Alimentador" },
        { code: "BT-03", label: "Banda de descarga" },
      ],
    },
    createdAt: now,
    updatedAt: now,
  },
  pages,
};

const out = process.argv[2] || "/tmp/molino-manual.json";
fs.writeFileSync(out, JSON.stringify(content));
console.log(out, pages.length);
