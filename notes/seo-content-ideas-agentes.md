# Ideas de contenido SEO — LLMs, ML, agentes y agentic programming

> Contexto: estrategia para atraer tráfico orgánico sin redes sociales. La base SEO ya está lista
> (sitemap.xml OK, robots.txt OK, url https). Esto es la fase B: QUÉ escribir (nuevo, no reescribir)
> para rankear en queries que casi nadie cubre bien.
>
> Fecha: 2026-11-08. Autor: Chipi, para Juanmi.

---

## Principio rector

No pelear contra pesos pesados en temas saturados. Buscar **queries long-tail con competencia baja**
en el nicho **hispano** (donde Juanmi es de los pocos que escribe desde la práctica real) y apoyarse
en ventajas únicas (datos reales de precios, experiencia construyendo pi-harness).

El formato que YA funciona en el blog (según analytics LibreCounter): **posts tipo "chuleta"**
(referencia densa y escaneable que responde a una query), no ensayos de opinión.

---

## ❌ Descartado (saturado — no escribir)

| Tema | Por qué se descarta |
|---|---|
| "Qué es agentic programming / roadmap" | 2 surveys de arXiv + MLM + decenas de artículos |
| "Mejores agentes de IA 2026" / listas | felloai, mouredev (1M subs), etc. |
| Tutorial Claude Code desde cero | mouredev (439K views), LAB10, datacamp EN+ES |
| Guardrails para agentes | Ya lo tapan AWS Español + TrueFoundry |
| Context window management genérico | MLM, comet, datacamp lo cubren |

---

## 🥇 Idea 1 — "Qué omiten los agentes al escribir código"

- **Query objetivo:** `qué omiten los agentes de ia` / `que no hace un agente al generar codigo`
- **Oportunidad:** EN lo acaba de tocar Addy Osmani (el "80% Problem") y Augment Code, pero **en español
  no hay NADIE con autoridad**. Encaja con el post existente de "augmented coding review" desde la experiencia.
- **Gancho:** formato chuleta (el formato que ya rankea en el blog).

### Título SEO sugerido
```
Qué omiten los agentes de IA al generar código (y cómo atraparlo)
```
Alternativas: "Lo que tu agente de código no te dice: qué se salta al generar código" ·
"Agentes de IA: checklist de lo que omiten sistemáticamente al programar".

### Frontmatter (Jekyll)
```
---
layout: post
title: "Qué omiten los agentes de IA al generar código (y cómo atraparlo)"
description: "Error handling, observabilidad, edge cases: lo que un agente de IA se salta al escribir código. Checklist para revisar antes de merge."
tags: [llm, agentes, claude, code-review]
lang: es
---
```

### Secciones recomendadas (estructura chuleta, orientada a SEO)
1. **Intro (2-4 frases):** qué es un agente de código y por qué el problema no es que "alucine" sino
   lo que **omite** de forma sistemática. (Captura la query en las 2 primeras frases.)
2. **`## Lo que el agente se salta`** — la checklist, dividida en sub-bloques `<h3>`:
   - Error handling fuera del happy path
   - Observabilidad (logging estructurado, métricas, traces)
   - Edge cases y consistencia arquitectónica entre ficheros
   - Seguridad a nivel de arquitectura (no solo por endpoint)
   - Complianza / requisitos no funcionales
3. **`## Cómo atraparlo`** — gate pre-merge: tests, análisis estático, revisión específica.
4. **`## Qué aporta el humano`** — dónde el humano sigue siendo necesario (el "80% problem").
5. **`## Referencias y fact-log`** — fuentes (Addy Osmani, Augment, experiencia propia).
6. **Conclusión corta** que repita la query naturalmente.

---

## 🥈 Idea 2 — "¿Por qué tu agente se olvida de todo entre sesiones?"

- **Query objetivo:** `claude code pierde contexto` / `agente se olvida contexto sesion`
- **Oportunidad:** dolor REAL con issues abiertos en GitHub (Copilot/Codex). Casi nadie lo explica bien.
- **Ventaja única de Juanmi:** construyó pi-harness → sabe de persistencia de contexto de primera mano.

### Título SEO sugerido
```
¿Por qué tu agente de IA se olvida de todo entre sesiones? (y cómo persistirlo)
```
Alternativa: "Contexto de agentes: qué sobrevive a una compactación y qué cruza entre sesiones".

### Frontmatter (Jekyll)
```
---
layout: post
title: "¿Por qué tu agente de IA se olvida de todo entre sesiones? (y cómo persistirlo)"
description: "Cada sesión de Claude Code / agentes arranca con la ventana vacía. Qué sobrevive a un /compact, qué se pierde y cómo darle memoria al agente."
tags: [llm, agentes, claude-code, contexto]
lang: es
---
```

### Secciones recomendadas
1. Intro: "tu agente no se olvida, nunca lo supo — cada sesión empieza con contexto vacío".
2. **`## Qué sobrevive a una compactación ( /compact )`** y qué no (docs de Claude Code: CLAUDE.md raíz vs anidados).
3. **`## Qué cruza entre sesiones`** — solo lo que está escrito en disco y se recarga.
4. **`## Cómo darle memoria: patrones`** — AGENTS.md/CLAUDE.md, memory con persistencia a fichero, RAG vs full-context.
5. **`## Gestión agresiva del contexto`** — `/clear` entre tareas, esc/rewind, cuándo cortar una sesión.
6. **Referencias + lecciones del pi-harness** (fact-log).

---

## 🥉 Idea 3 — "Cuánto cuesta dejar un agente suelto" (cost engineering)

- **Query objetivo:** `coste tokens agente` / `agente token budget context`
- **Oportunidad:** nadie une el coste del bucle del agente con **precios reales de modelo** + cuándo usar
  sliding window vs full context vs RAG.
- **Ventaja única de Juanmi:** ya tiene datos reales de precios DeepSeek guardados (price-baseline).
  Casi imposible de rankear para otro blog que no tenga esos datos.

### Título SEO sugerido
```
Cuánto cuesta dejar un agente de IA suelto: presupuesto de tokens por tarea
```
Alternativa: "Coste real de los agentes de IA: 1M tokens de contexto y cuánto pagas por ellos".

### Frontmatter (Jekyll)
```
---
layout: post
title: "Cuánto cuesta dejar un agente de IA suelto: presupuesto de tokens por tarea"
description: "Contexto = dinero. Cuándo usar sliding window, full context o RAG según el coste real por token de cada modelo."
tags: [llm, agentes, coste, tokens, deepseek]
lang: es
---
```

### Secciones recomendadas
1. Intro: "contexto = coste; un agente quema tokens en cada llamada del bucle".
2. **`## Por qué se acumula el contexto`** — 50 pasos × 20K tokens = 1M tokens.
3. **`## Tabla de costes reales por modelo`** — volcar el price-baseline de DeepSeek/alternativas (ventaja única).
4. **`## Sliding window vs full context vs RAG`** — cuándo usar cada uno según la tarea y el coste.
5. **`## Presupuesto por tarea`** — patrón para fijar un budget de tokens por agente.
6. **Referencias + el price-baseline enlazado** (fact-log).

---

## Próximos pasos sugeridos

1. Escribir **#1 primero** (formato chuleta + competencia hispana cero + solo con experiencia propia).
2. Verificar en **Google Search Console** que el sitemap se está leyendo (vía GSC una vez indexado).
3. Tras 1-2 posts, medir a las **8-12 semanas** si alguna query entra en posiciones; iterar sobre esa.

> Regla de oro: no publicar nada sin aprobación de Juanmi, y una query por post, bien respondida.