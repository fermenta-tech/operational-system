# Especificación del Manual Operativo Interactivo

**Cliente:** Carlos  
**Idioma de contenido:** inglés, lenguaje simple y condensado  
**Alcance:** un manual por sistema + un manual general de planta  
**Modo de uso:** autoadiestramiento (sin instructor) con refuerzo presencial a 6 o 12 meses  
**Extensión de referencia:** hasta ~90 páginas equivalentes por manual tradicional; el interactivo resume lo esencial

---

## 1. Decisiones del cliente (matriz cerrada)

| # | Elemento | Incluir | Prioridad | Comentario de Carlos |
|---|----------|---------|-----------|----------------------|
| 1 | Descripción del sistema | **Sí** | Alta | El manual define el flujo de material, agua o gases; permisivos, interlocks y arranque; cómo se relaciona el sistema. Existe además un manual de operación total de planta. |
| 2 | Diagrama de flujo del sistema | **Sí** | Alta | La mayoría de los diagramas fuente están en inglés. No traducir el lenguaje por defecto. |
| 3 | Narración por voz | **Sí** | Media | Resumen de lo más importante, no lectura completa. Audio (sin avatar). Voz masculina. Un resumen por sección. |
| 4 | Enlace a fotos | **Sí** | Media | Conservar el idioma por defecto. Incluir fotos de ejemplo. |
| 5 | Enlace a video | **Sí** | Media | Incluir videos de ejemplo. |
| 6 | Lazos de control principales | **Sí** | Alta | — |
| 7 | Interlocks del sistema | **Sí** | Alta | — |
| 8 | Troubleshooting | **Sí** | Alta | Incluir videos o tutoriales. |
| 9 | Cuestionario de autoevaluación | **Sí** | Alta (seguridad) | 3–4 preguntas por **sección** (no por manual). 3 opciones, 1 correcta. Enfoque: permisivos, interlocks, función del sistema o del equipo. Umbral 70 %: si no se alcanza, se recomienda repetir. Sin impacto administrativo. |
| 10 | Retroalimentación explicativa | **Sí** | Alta | Si falla, explicar por qué la opción correcta es la correcta. |
| 11 | Manual general de planta | **Sí** | Alta | Arranque → producción con calidad → paro → dejar lista para mantenimiento. |
| 12 | Modo autoadiestramiento | **Sí** | Alta | El operador recorre el manual solo, como preparación al refuerzo presencial. |
| 13 | Seguimiento de avance | **Sí** | Alta | Registrar secciones y cuestionarios completados por operador. |
| 14 | Lenguaje simple | **Sí** | Alta | Inglés, condensado, fácil de leer. Evitar el estilo de manual tradicional. |

**Resultado:** los 14 elementos se incluyen. No hay exclusiones.

---

## 2. Qué es un “manual” en este producto

Hay **dos tipos**:

1. **Manual de sistema** — un sistema de la planta (agua, gases, material). Cubre qué hace, cómo fluye, cómo se arranca, permisivos, lazos, interlocks y fallas frecuentes. El sistema se divide en **equipos**; las preguntas van por sección, no al final de todo el manual.
2. **Manual general de planta** — recorre la planta completa: arranque, producción con calidad, paro y preparación para mantenimiento. Relaciona los sistemas entre sí.

Cada manual se organiza en **secciones**. Cada sección tiene: texto corto, diagrama o media si aplica, **audio-resumen**, y **3–4 preguntas**.

---

## 3. Estructura fija de un manual de sistema

```
0. Portada y datos del operador
1. What this system does          → audio + quiz
2. Flow diagram                   → audio + quiz
3. Main equipment                 → fotos ejemplo + audio + quiz
4. How to start (permissives)     → video ejemplo + audio + quiz
5. Main control loops             → audio + quiz
6. Interlocks                     → audio + quiz
7. Troubleshooting                → videos/tutoriales + audio + quiz
```

Reglas de contenido:

- Texto en **inglés simple**. Frases cortas. Sin relleno.
- El diagrama de flujo muestra **material, agua o gases** y el sentido del flujo.
- No cambiar el idioma por defecto de planos, tags ni etiquetas de equipo (muchos vienen en inglés).
- Fotos y videos de ejemplo en la primera entrega; en producción se sustituyen por media real de planta.
- Audio = **resumen de lo más importante de esa sección**, voz masculina, no un avatar, no lectura palabra por palabra.

---

## 4. Estructura fija del manual general de planta

```
1. Plant overview — how systems connect
2. Plant start-up
3. Production with quality
4. Plant shutdown
5. Make the plant ready for maintenance
```

Misma regla: cada sección con audio-resumen y 3–4 preguntas.

---

## 5. Autoevaluación y avance

| Regla | Valor |
|-------|--------|
| Preguntas por sección | 3 o 4 |
| Opciones | 3 (A / B / C), una correcta |
| Foco | permisivos, interlocks, función del sistema o del equipo |
| Retroalimentación OK | “Correct.” |
| Retroalimentación error | “Incorrect. Review this section.” + **por qué la opción correcta es correcta** |
| Umbral | 70 % |
| Si no llega a 70 % | Recomendar repetir la sección. **Sin impacto** en expediente |
| Registro | operador, sección, quiz hecho sí/no, puntaje, fecha |

El modo es **autoadiestramiento**: el operador avanza solo. El seguimiento sirve para control de adiestramiento (quién terminó qué), no para sanción.

---

## 6. Alcance de la primera entrega (ejemplo)

Para validar formato con Carlos se entrega un prototipo con:

- Manual general de planta (condensado)
- Un manual de sistema completo: **SYS-07 Closed Cooling Water (CCW)**
- Fotos y videos de **ejemplo**
- Audio por sección (voz masculina en inglés)
- Quizzes por sección con umbral 70 %
- Panel de avance del operador (guardado local en el prototipo)
- **Modo administrador:** el contenido es editable (texto, audio, fotos, videos, quizzes, bloques interactivos)
- **Práctica interactiva:** diagrama clicable, checklists, tarjetas que revelan, simulador de arranque con permisivos

El archivo de ejemplo está en `ejemplos/manual-interactivo/index.html`.

---

## 7. Modo administrador (CMS del prototipo)

El operador recorre el manual. El **administrador** mantiene el contenido sin tocar código.

| Acción | Cómo |
|--------|------|
| Entrar | Sidebar → Administrator → PIN de prototipo `1234` |
| Editar sección actual | Título, kicker, lead, audio, bloques y preguntas |
| Hacerlo más interactivo | Añadir bloques: `flow`, `checklist`, `reveal`, `simulator`, fotos, videos |
| Media real | Subir foto o pegar URL de YouTube / mp4 |
| Nueva sección o sistema | Add section (se puede cambiar el Group, p. ej. SYS-08) |
| Respaldo | Export JSON / Import JSON |
| Volver al ejemplo | Reset example |

Los cambios se guardan en el navegador. Exportar JSON es la copia de trabajo para pasarla a otro equipo.
