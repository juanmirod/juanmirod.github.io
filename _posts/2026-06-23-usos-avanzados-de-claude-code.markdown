---
title: "Usos avanzados de Claude Code: orquestación, sub-agentes y tratar de no quemarse"
layout: post
published: true
tags: [ai, Inteligencia Artificial, Claude Code, herramientas]
image: /public/img/dev-on-park.png
---

Hace unos días di una charla interna en la Community of Practice de herramientas de IA de Clarity sobre usos avanzados de Claude Code. Era una demo en vivo, así que esto es más bien la versión escrita y ordenada de lo que enseñé, para quien quiera volver sobre ello.

Un aviso antes de empezar: esto es **contenido avanzado**. Asume que ya estás cómodo usando Claude en auto mode, es decir, que confías lo suficiente en el agente como para dejarlo ejecutar sin estar aprobando cada paso. Si todavía estás empezando, mejor haz primero el camino básico —plan mode, iterar, revisar— y vuelve luego. Lo digo porque casi todo lo que viene asume esa confianza.

## El flujo normal que sigue siendo el 90%

Antes de la parte vistosa, conviene recordar que el flujo más común sigue siendo "el de siempre", y es la base de todo lo demás:

1. Describir la tarea en **plan mode**.
2. Iterar sobre el plan hasta que tenga sentido.
3. Implementar/ejecutar el plan.
4. Revisar los cambios.
5. Crear la MR.

Eso es literalmente el 90% del tiempo. La regla nueva que merece la pena interiorizar es esta: **si te encuentras repitiendo las mismas instrucciones tres o más veces, conviértelas en una skill** adaptada al repo. Esa única costumbre es lo que más palanca te da de todo lo que cuento aquí. En el repo de frontend ya tenemos varias skills (crear MR, quitar un feature toggle, quitar warnings, debug) y la gracia es que están adaptadas al repo, así el agente ya sabe dónde mirar y qué herramientas usar sin que se lo expliques cada vez.

## Orquestar agentes: en serie o en paralelo

Cuando una tarea no cabe en una sola conversación, puedes hacer que Claude la reparta entre varios agentes. Hay muchas formas de orquestar eso, y elegir la adecuada es lo que marca la diferencia en control y en coste. Estos son los dos modelos más básicos, los que he probado hasta ahora:

La primera es **en serie**: un bucle reanudable en el que haces un cambio, esperas a que su MR se mergee, y solo entonces pasas al siguiente. El estado vive en un fichero markdown, así que puedes cerrar el portátil y retomarlo al día siguiente. Es lo que quieres cuando tienes muchos cambios parecidos pero necesitas **revisar cada MR** antes de seguir. Es barato, porque solo hay una tarea en marcha a la vez, y aunque Claude hace la mayor parte del trabajo, el humano se mantiene en el bucle en todo momento.

La segunda es **en paralelo**: Claude lanza **muchos sub-agentes a la vez** para hacer piezas independientes simultáneamente. Es para trabajo repetitivo y sin dependencias de orden —añadir tipos de retorno a todos los ficheros, aumentar la cobertura de tests, migraciones...—, tareas en las que cada sub-agente pueda trabajar por su cuenta en un fichero o módulo. Puedes pedirle a Claude que orqueste a los sub-agentes, que cada uno trabaje en su propio worktree o haga su commit, y que el agente principal se encargue de mergear todo y hacer la MR. Es mucho más rápido, pero caro en tokens. Cada sub-agente será como una conversación independiente, solo que en este caso entre el orquestador y el sub-agente, siguiendo el plan que tú hayas definido anteriormente. Para activarlo basta con pedírselo con palabras como "fan out" o "spawn agents" al crear el plan: cualquiera de esas le dice a Opus que monte un plan de orquestación en paralelo.

> ⚠️ Consejo que de verdad te puede ahorrar dinero: **dile explícitamente que use Sonnet para los sub-agentes.** Si no lo dices, puede acabar ejecutándolos con Opus o con Fable y quemar tokens a una velocidad que asusta (el caso típico es Fable gastando "como loco"). La regla es: **orquesta con Opus, ejecuta las subtareas con Sonnet.**

## Comandos que merece la pena conocer

Más allá de la orquestación, hay un puñado de comandos que enseñé en la demo y que uso a menudo:

**Deep research.** Funciona parecido a Perplexity o al deep search de Google: lanza agentes en paralelo, busca fuentes y compila un informe citado. Es muy útil para investigar nuevos temas, explorar alternativas en el mercado, revisar las publicaciones sobre un problema concreto... Ojo otra vez con el modelo: Opus sale mejor pero más caro, Sonnet es más barato.

**Handoff.** Le pides a Claude que escriba un plan en markdown con todo lo necesario para continuar en una sesión nueva. Es perfecto para cuando detectas un refactor o una subtarea que no quieres meter en la MR actual, o cuando estás a punto de quedarte sin contexto. Hay una [skill muy conocida](https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md) para esto, pero en realidad son cuatro líneas: se lo puedes pedir a Claude directamente.

**`/insights`.** Analiza todas tus sesiones y genera un informe HTML con estadísticas, los problemas en los que sueles tropezar, sugerencias de mejora y hasta "moonshots". Es muy útil para depurar tus propias skills, hooks y agentes. Conviene correrlo de vez en cuando.

**Remote control.** Te deja monitorizar y pilotar una sesión activa desde el móvil u otro navegador, mientras la sesión sigue corriendo en el terminal. Está [documentado aquí](https://code.claude.com/docs/en/remote-control). Es un poco buggy —a veces se pierde la conexión y hay que volver al terminal— pero su valor real es que te deja **levantarte de la silla**: aprobar un plan desde la cocina, salir a dar una vuelta. Eso sí, un aviso medio legal medio de salud: no lo uses fuera de tu horario laboral; en España eso es directamente ilegal. Lo cual enlaza con el siguiente punto, que va en serio.

![Desarrollador paseando por el parque mientras controla Claude Code desde el móvil](/public/img/dev-on-park.png)

## No te quemes

Estos flujos son rápidos y muy adictivos. Como van tan deprisa, _sientes_ que parar es perder dinero o tiempo, y eso te mantiene pegado a la pantalla. Es una receta para quemarse. Haz pausas, levántate, y no tengas cinco agentes corriendo todo el rato porque sí. No es ninguna tontería, hay muchos testimonios de esto y si antes era un problema en el gremio, ahora será mucho peor.

## Pero ¿cómo hemos llegado hasta aquí?

Si te paras a pensarlo, el salto es enorme. Llevo unos años escribiendo sobre esto en el blog y releer aquellos posts da un poco de vértigo:

- En [_Desarrollando con ChatGPT_](/2023/04/16/trabajando-con-chat-gpt.html) (abril de 2023) contaba cómo le pedía a ChatGPT trozos de código y los pegaba a mano, maravillado de que me escribiera un Dockerfile o un README decentes.
- Un año después, en [_Repaso LLMs un año después_](/2023/11/02/llms-review.html), la cosa ya parecía un cambio de paradigma, aunque todavía con mucho escepticismo alrededor y sin tener del todo claro hacia dónde iba.
- Y en [_Review de 2025 en desarrollo 'asistido'_](/2026/01/14/augmented-codin-review.html) (enero de este año) ya hablaba de proyectos enteros hechos en días en lugar de meses, y de que escribir el código a mano empezaba a no tener sentido.

En menos de tres años hemos pasado de copiar y pegar fragmentos de un chat a orquestar enjambres de agentes que abren sus propias MRs mientras nosotros revisamos. Lo que cuento en este post —orquestar sub-agentes, dejarlos correr en auto mode, pilotarlos desde el móvil— habría sonado a ciencia ficción cuando escribí el primero de esos posts. Y tengo la sensación de que dentro de un año esto también se nos quedará anticuado. Por eso me parece que merece la pena ir dejando estos apuntes como una foto de en qué punto estamos hoy.

## Por dónde empezar

Si tuviera que quedarme con tres cosas para probar esta semana:

1. **Codifica una instrucción que repitas a menudo en una skill**, en un repo en el que trabajes de verdad.
2. **Corre `/insights` una vez** y adopta al menos una de sus sugerencias.
3. **Orquesta una tanda en serie** sobre un lote pequeño de tickets parecidos, con sub-agentes en Sonnet.

Como siempre, puedes dejar tus comentarios en github o escribirme en [bluesky](https://bsky.app/profile/juanmirod.bsky.social). Y si montas tu propia orquestación de agentes, me encantará que me cuentes cómo te ha ido.
