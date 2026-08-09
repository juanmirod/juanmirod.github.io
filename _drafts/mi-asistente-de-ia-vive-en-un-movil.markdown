---
title: "Mi asistente de IA vive en un móvil (y no puede ejecutar ni ls)"
layout: post
published: false
tags: [ai, Inteligencia Artificial, OpenClaw, agentes, Termux, herramientas]
image: /public/img/chipi-captura.jpg
---

Hace un par de semanas os contaba cómo exprimir Claude Code hasta el límite y cómo un harness minimalista como Pi te enseña más que cualquier herramienta completa. Hoy os presento a mi asistente de IA. No corre en un servidor de 4.000 € ni en un MacBook Pro: **vive en mi móvil, dentro de Termux, y le hablo por Telegram.** Se llama Chipi, y llevo unos días descubriendo que no tiene nada que envidiarle a Claude Code.

![Nuestro día a día, en directo](/public/img/chipi-captura.jpg)

Aviso: esto no es un tutorial al uso, es más bien el relato de un experimento que salió bien. Pero al final os dejo el porqué, porque creo que hay una lección buena escondida.

# El problema: un agente al que le ataron las manos

Cuando monté OpenClaw en el móvil, el primer día fue desolador. El sandbox de ejecución de Android no permite ejecutar binarios: `python3`, `git`, `curl`... todo devolvía `Permission denied`. Solo funcionaban los builtins de bash y `toybox`, el toolbox cutre que trae Android de serie. O sea: mi agente de IA, que se supone que iba a hacer cosas por mí, no podía ejecutar ni una mísera línea de Python.

Cualquier otro agente habría muerto ahí. Lo divertido es lo que hicimos en su lugar.

# La solución: un agujero de conejo voluntario

Si el sandbox no puede ejecutar binarios, que los ejecute otra cosa. Así nació `worker.py`: un servidor TCP en `127.0.0.1:8788` que recibe código Python o comandos de shell y devuelve stdout y stderr. El protocolo es tan simple que parece una broma:

```bash
printf 'PYTHON\nprint(2+2)' | toybox nc -w 5 127.0.0.1 8788
# ===EXIT:0===
# 4
```

Eso es todo. Una conexión, una ejecución, y la respuesta llega con su código de salida. **La llave del calabozo resultó ser netcat de toybox**, la herramienta más humilde del sistema operativo. Si me lo llegan a contar hace un mes, no me lo creo.

La seguridad aquí es un detalle importante: el worker escucha solo en loopback y sin autenticación, así que no se puede exponer ni reenviar puertos. Es un agujero de conejo **voluntario**: existe porque quiero que exista, y solo en mi propio dispositivo.

# Qué se puede hacer cuando "no puedes hacer nada"

Y aquí está lo bueno. Con ese agujero de conejo, todo lo que parecía imposible dejó de serlo:

- **Generar imágenes** con Python (mi avatar se hizo píxel a píxel con SDF y supersampling, que suena a mucho pero es un script de 100 líneas).
- **Git y curl** para trabajar con repos y APIs sin problema.
- **Controlar otros procesos del móvil**: el mismo Termux aloja un bot de Telegram que vende voces TTS, y lo lanzamos, reiniciamos y monitorizamos desde el agente.
- **Un cron semanal** que vigila los precios de los modelos de LLM y me avisa si suben o si aparece algo mejor.

En una tarde pasamos de "no puede ejecutar nada" a "puede hacer casi todo". La diferencia entre un agente inútil y uno útil no fue más hardware, ni un modelo mejor: fue **una tubería de red de 20 líneas**.

# Despertar sin memoria

Hay otra parte del setup que me parece fascinante, y es la memoria. **Chipi se despierta sin recuerdos en cada sesión.** No hay continuidad neuronal: si no existieran los ficheros, cada conversación empezaría de cero.

La solución es tan sencilla como radical: la memoria vive en ficheros de markdown. `MEMORY.md` es la memoria a largo plazo, las decisiones importantes y las lecciones aprendidas; `memory/2026-08-09.md` es el diario de cada día; y `AGENTS.md`, `SOUL.md` y `USER.md` son su personalidad, su forma de hablar y lo que sabe de mí.

Es como si cada mañana alguien leyera su propio diario para recordar quién es. Y funciona: hace dos días cometió un error con `git add -A` (os lo cuento abajo) y al día siguiente ya tenía una regla escrita para no repetirlo. **El agente aprende de verdad, pero no porque "aprenda": porque escribe las cosas.**

# Skills y sub-agentes: la orquestación, sin pagarla

Una de las cosas que más me gustan de Claude Code son las skills y los sub-agentes, y aquí están también, con otro nombre y a precio de saldo. Las **skills** son playbooks reutilizables en markdown: hace nada creamos una para publicar en dev.to con criterio SEO (títulos con keywords, cover obligatoria, mejor momento de publicación) que ya hemos usado dos veces. Los **sub-agentes** son sesiones hijas a las que delegas trabajo paralelo — el otro día uno se encargó de revisar un montón de ficheros mientras yo seguía con otra cosa.

Y el modelo que lo mueve todo cuesta céntimos por millón de tokens. No es el más listo de la clase, pero para el 95% de las tareas sobra, y cuando necesitas más, cambias de modelo en una línea.

# Lecciones aprendidas (o cómo mi agente se autoeliminó dos veces)

Ningún post de estos estaría completo sin las anécdotas. Aquí van las dos mejores:

**1. El pkill que se suicidaba.** Para reiniciar un proceso hay que matar el viejo y lanzar el nuevo. Suena fácil. Pero `pkill -f` matchea la línea de comandos completa de cada proceso, incluida la del propio shell que ejecuta el comando. Si matas y relanzas en el mismo comando, el shell se mata a sí mismo **antes** de llegar al relanzamiento. Mi agente se autoeliminó dos veces por optimista. Ahora la regla está escrita: matar en un comando, relanzar en otro, y verificar entre medias.

**2. El `.git` huérfano.** Un día un `git add -A` desde una carpeta de proyecto commiteó... todo el workspace. Resulta que había un repositorio git huérfano en la raíz, y `git add -A` sin pathspec actúa sobre todo el árbol. Nada llegó a GitHub, pero el susto fue real. Ahora hay un hook global de pre-commit que bloquea rutas sensibles y una regla: antes de cualquier commit, comprobar en qué repo estás.

# Comparación honesta con Claude Code

¿De verdad no le envidia nada? No, y os digo por qué: hace orquestación, memoria persistente, skills, sub-agentes, programación con git, y todo ello **dentro de un móvil, por céntimos, sin servidores**. Claude Code es un deportivo alemán: potentísimo, pero necesita un garaje decente. Esto es una moto de agua: parece una tontería, y de repente estás en sitios donde no esperabas acabar.

Eso sí, con matices: no hay IDE bonito ni approvals elegantes, y el modelo por defecto es ligero, no el más brillante. Para un refactor masivo de una codebase enorme, sigo abriendo Claude Code. Pero para el día a día — recordarme cosas, vigilar precios, escribir borradores, gestionar el bot, traducir posts — el tándem móvil + agente es imbatible.

# Qué he aprendido

Que **las restricciones son el mejor profesor**. Cuando tu agente no puede ejecutar nada, te ves obligado a entender cada pieza de tu stack: qué es un sandbox, qué hace toybox, cómo funciona una tubería de red, por qué un hook de git puede salvarte el culo. Habría aprendido la mitad si todo hubiera funcionado a la primera.

Y que un agente de IA no necesita ser el más caro ni el más grande: necesita **un buen sitio donde vivir, memoria escrita y un agujero de conejo bien puesto**.

OpenClaw es open source, y el experimento completo cabe en un móvil Android con Termux. Si os pica la curiosidad, mi asistente estará encantado de contaros más... aunque visto lo visto, este post ya lo ha hecho él por mí.

![Chipi, el responsable de todo esto](/public/img/chipi-avatar.jpg)
