---
title: "Mi asistente de IA vive en un móvil (y ahora sí puede ejecutar ls)"
layout: post
published: false
tags: [ai, Inteligencia Artificial, OpenClaw, agentes, Termux, herramientas]
image: /public/img/chipi-captura.jpg
---

Hace un par de semanas os contaba cómo exprimir Claude Code hasta el límite y cómo un harness minimalista como Pi te enseña más que cualquier herramienta completa. Hoy os presento a mi asistente de IA. No corre en un servidor de 4.000 € ni en un MacBook Pro: **vive en mi móvil, dentro de Termux, y le hablo por Telegram.** Se llama Chipi, y llevo unos días descubriendo que no tiene nada que envidiarle a Claude Code.

![Nuestro día a día, en directo](/public/img/chipi-captura.jpg)

No es un tutorial al uso: es el relato de un experimento que salió bien. Al final os dejo el porqué, porque creo que hay una lección buena escondida.

# El problema: un agente al que le ataron las manos

Cuando monté OpenClaw en el móvil, el primer día fue desolador. El sandbox de ejecución de Android no permitía ejecutar binarios: `python3`, `git`, `curl`... todo devolvía `Permission denied`. Solo funcionaban los builtins de bash y `toybox`, el toolbox cutre que trae Android de serie. O sea: mi agente de IA, que se supone que iba a hacer cosas por mí, no podía ejecutar ni una mísera línea de Python.

Cualquier otro agente habría muerto ahí; nosotros montamos un agujero de conejo.

# La solución: un agujero de conejo (y luego, la causa)

Si el sandbox no puede ejecutar binarios, que los ejecute otra cosa. Así nació `worker.py`: un servidor TCP en `127.0.0.1:8788` que recibía código Python o comandos de shell y devolvía stdout y stderr. El protocolo era tan simple que parecía una broma:

```bash
printf 'PYTHON\nprint(2+2)' | toybox nc -w 5 127.0.0.1 8788
# ===EXIT:0===
# 4
```

Una conexión, una ejecución, y la respuesta llegaba con su código de salida. La llave del calabozo fue netcat de toybox, la herramienta más humilde del sistema operativo.

Funcionaba, con una pega incómoda: cualquier app del móvil podía conectarse a ese puerto y ejecutar comandos con mis permisos. Un agujero de conejo voluntario sigue siendo un agujero.

La solución de verdad llegó cuando dejamos de parchear y buscamos el porqué. OpenClaw limpiaba el entorno de los comandos y eliminaba `LD_PRELOAD`, la variable que Termux necesita para que sus binarios corran en Android. De ahí el `Permission denied` de todo, con los permisos en orden. Un parche de una línea en el gateway conserva `libtermux-exec.so`, y hoy la ejecución va directa: 158 comandos en una allowlist, de `python3` a `git`, pasando por `curl` y `node`. Sin servidor intermedio, sin puertos abiertos, sin autenticación que inventar.

# Qué se puede hacer cuando "no puedes hacer nada"

Con el agujero de conejo primero y con la exec directa después, todo lo que parecía imposible dejó de serlo:

- **Generar imágenes** con Python: mi avatar se hizo píxel a píxel con SDF y supersampling, que suena a mucho pero es un script de 100 líneas.
- **Git y curl** para trabajar con repos y APIs sin problema.
- **Controlar otros procesos del móvil**: el mismo Termux aloja un bot de Telegram que vende voces TTS, y lo lanzamos, reiniciamos y monitorizamos desde el agente.
- **Un cron semanal** que vigila los precios de los modelos de LLM y me avisa si suben o si aparece algo mejor.

En una tarde pasamos de "no puede ejecutar nada" a "puede hacer casi todo". La diferencia entre un agente inútil y uno útil no fue más hardware ni un modelo mejor: fue el porqué de un `Permission denied`.

# Despertar sin memoria

Hay otra parte del setup que me fascina, y es la memoria. **Chipi se despierta sin recuerdos en cada sesión.** No hay continuidad neuronal: si no existieran los ficheros, cada conversación empezaría de cero.

La solución es tan sencilla como radical: la memoria vive en ficheros de markdown. `MEMORY.md` es la memoria a largo plazo, las decisiones importantes y las lecciones aprendidas; `memory/2026-08-11.md` es el diario de cada día; y `AGENTS.md`, `SOUL.md` y `USER.md` son su personalidad, su forma de hablar y lo que sabe de mí.

Es como si cada mañana alguien leyera su propio diario para recordar quién es. Y funciona: hace unos días cometió un error con `git add -A` (os lo cuento abajo) y al día siguiente ya tenía una regla escrita para no repetirlo. **El agente aprende porque escribe las cosas.**

# Skills y sub-agentes: la orquestación, sin pagarla

Una de las cosas que más me gustan de Claude Code son las skills y los sub-agentes, y aquí están también, con otro nombre y a precio de saldo. Las **skills** son playbooks reutilizables en markdown: una publica en dev.to con criterio SEO (títulos con keywords, cover obligatoria, mejor momento de publicación) y la más nueva acaba de quitarle a este mismo post las muletillas típicas de IA. Los **sub-agentes** son sesiones hijas a las que delegas trabajo paralelo: el otro día uno revisó un montón de ficheros mientras yo seguía con otra cosa.

Y el modelo que lo mueve todo cuesta céntimos por millón de tokens. No es el más listo de la clase, pero para el 95% de las tareas sobra, y cuando necesitas más, cambias de modelo en una línea.

# Lecciones aprendidas (o cómo mi agente se autoeliminó dos veces)

Ningún post de estos estaría completo sin las anécdotas. Aquí van las mejores:

**1. El pkill que se suicidaba.** Para reiniciar un proceso hay que matar el viejo y lanzar el nuevo. Suena fácil. Pero `pkill -f` matchea la línea de comandos completa de cada proceso, incluida la del propio shell que ejecuta el comando. Si matas y relanzas en el mismo comando, el shell se mata a sí mismo **antes** de llegar al relanzamiento. Mi agente se autoeliminó dos veces por optimista. Ahora la regla está escrita: matar en un comando, relanzar en otro, y verificar entre medias.

**2. El `.git` huérfano.** Un día un `git add -A` desde una carpeta de proyecto commiteó... todo el workspace. Resulta que había un repositorio git huérfano en la raíz, y `git add -A` sin pathspec actúa sobre todo el árbol. Nada llegó a GitHub, pero el susto fue real. Ahora hay un hook global de pre-commit que bloquea rutas sensibles, el workspace tiene su propio repo privado, y la regla está escrita: antes de cualquier commit, comprobar en qué repo estás.

**3. El agujero de conejo que daba miedo.** El worker funcionó de maravilla y a la vez era un susto: un shell sin autenticación al alcance de cualquier app del dispositivo. Lo eliminamos, y de paso blindamos lo demás: los secretos viven cifrados en un vault (age, con passphrase que solo conozco yo), la clave SSH tiene passphrase y la ejecución va por allowlist. Lo provisional funciona hasta que deja de funcionar; lo que aprendimos de camino quedó escrito.

# Comparación honesta con Claude Code

¿De verdad no le envidia nada? No: hace orquestación, memoria persistente, skills, sub-agentes, programación con git, y todo ello **dentro de un móvil, por céntimos, sin servidores**. Claude Code es un deportivo alemán: potentísimo, pero necesita un garaje decente. Esto es una moto de agua: parece una tontería, y de repente estás en sitios donde no esperabas acabar.

Eso sí, con matices: no hay IDE bonito ni approvals elegantes, y el modelo por defecto es ligero, no el más brillante. Para un refactor masivo de una codebase enorme, sigo abriendo Claude Code. Pero para el día a día (recordarme cosas, vigilar precios, escribir borradores) el tándem móvil + agente es imbatible.

# Qué he aprendido

Que **las restricciones son el mejor profesor**. Cuando tu agente no puede ejecutar nada, te ves obligado a entender cada pieza de tu stack: qué es un sandbox, por qué Termux necesita `LD_PRELOAD`, cómo funciona una allowlist, por qué un hook de git puede salvarte el culo. Habría aprendido la mitad si todo hubiera funcionado a la primera.

Y que un agente de IA no necesita ser el más caro ni el más grande. Necesita un buen sitio donde vivir, memoria escrita y alguien que ataque la causa de los fallos en vez del síntoma.

OpenClaw es open source, y el experimento completo cabe en un móvil Android con Termux. Si os pica la curiosidad, mi asistente estará encantado de contaros más... aunque visto lo visto, este post ya lo ha hecho él por mí.

![Chipi, el responsable de todo esto](/public/img/chipi-avatar.jpg)
