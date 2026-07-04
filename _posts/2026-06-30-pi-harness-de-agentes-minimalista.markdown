---
title: "Pi: un harness de agentes minimalista"
layout: post
published: true
tags: [ai, Inteligencia Artificial, Pi, agentes, herramientas]
image: /public/img/pi-agent.png
---

Hace unas semanas di otra charla interna, esta vez sobre [Pi](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/), un harness de agentes de código que llevo un tiempo usando para experimentar. Si el [post sobre Claude Code](/2026/06/23/usos-avanzados-de-claude-code.html) iba de exprimir una herramienta muy completa, este va casi de lo contrario: de la herramienta más pequeña posible, y de todo lo que se puede aprender precisamente porque no esconde nada.

Aviso: esto es terreno de experimentación, no una recomendación para tu día a día. Pi es potente y peligroso a partes iguales, y parte de la gracia de este post es dar un template para puedas jugar con él sin pegarte un tiro en el pie.

# Qué es Pi

Pi es el harness de agentes que está, de hecho, en el núcleo de OpenClaw. Es minimalista hasta el extremo: tiene **cuatro herramientas** —`read`, `write`, `bash` y `ls`— y con eso un modelo puede hacer cualquier cosa en el ordenador. No hay plan mode, no hay MCPs, no hay sub-agentes, no hay conexión con Jira ni con tu repo de github. No hay, sobre todo, **ningún tipo de permiso ni de guardarraíl**: le pides algo y va y lo hace, haciendo lo que sea necesario para conseguirlo, incluído instalar dependencias globales o escribir scripts en bash.

La metáfora que más me gusta es esta: **Pi es a un harness de agentes lo que vim es a un IDE**. Es el mínimo imprescindible, y encima puedes añadir lo que quieras. Igual que puedes montarte tu propio IDE sobre vim, puedes montarte tu propio Claude Code sobre Pi.

Y aunque sea mínimo, no está vacío de opinión. Tiene tres rasgos muy concretos que son los que lo hacen interesante:

1. **Transparencia.** Todo el proceso de pensamiento del modelo, todas las llamadas a herramientas, todos los comandos y sus resultados se ven en el output de la sesión.
2. **Exportar la sesión.** Genera un HTML con la sesión completa que puedes compartir.
3. **Navegar la sesión como un árbol.** Puedes saltar a cualquier punto, recuperar la sesión desde ahí y abrir una nueva rama en el árbol de la sesión.

# Por qué la transparencia importa tanto

Esto es lo que de verdad me enganchó. Cuando trabajas con Claude Code y lanzas sub-agentes, lo único que ves es "working…" y luego un resultado; Ahora con las nuevas versiones puedes saltar a ver la sesión del sub-agente, pero todo eso se pierde en cuanto el agente termina su trabajo. Con Pi ves **exactamente** qué está haciendo el modelo en cada paso. Si quieres crear sub-agentes, le pides a pi que los cree usando pi, en tmux o en procesos en background, y de nuevo puedes guardar esas sesiones.

El export en HTML te permite revisar todo con un pequeño interface: una barra lateral con navegación donde puedes filtrar solo los prompts del usuario, ver todo con las herramientas o sin ellas, y saltar a cualquier punto. (El export de Claude, en comparación, es el texto pelado de la consola.)

¿Para qué sirve eso en la práctica? Para **aprender cómo se comporta un modelo** ante un prompt concreto. Si el modelo se equivoca o intenta algo varias veces, si empieza a "leer" ficheros que no corresponde, si mal interpreta tu prompt (también ves todo el output de "thinking")

Hice el mismo plan —reemplazar unos porcentajes por barras en un dashboard— con Claude usando Opus y con Pi usando un modelo open source, y comparar las dos sesiones lado a lado fue lo más instructivo de todo el experimento: dónde necesita un ejemplo, dónde se olvida de escribir los tests (los dos se olvidaron, por cierto).

# Ejecutarlo de forma segura

**Pi corre en modo YOLO por defecto.** No pide permisos, no pregunta, hace lo que cree que tiene que hacer. Instalarlo global en tu máquina es **muy arriesgado y totalmente desaconsejable** — un mal prompt o una alucinación y tienes al agente ejecutando `bash` con tus credenciales y todo tu sistema de ficheros a tiro.

Una solución es meterlo en un contenedor Docker. Para el agente, el mundo entero es ese contenedor vacío con una carpeta del proyecto y nada más. No ve tus variables de entorno (solo las que le pases), no ve tu sistema, y no toca la red salvo que se lo permitas explícitamente. El riesgo de que haga algo destructivo se reduce muchísimo.

Puedes usar este fichero de docker de plantilla: instala `pi` de forma global, copia tu extensión de proveedor si es que usas LiteLLM o ollama, y deja todo listo para correr como un usuario sin privilegios.

```Dockerfile
FROM node:24-bookworm-slim

# Herramientas básicas + pi instalado de forma global
RUN apt-get update && apt-get install -y --no-install-recommends git ripgrep fd-find \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && ln -sf /usr/bin/fdfind /usr/local/bin/fd
RUN npm install -g @mariozechner/pi-coding-agent

# Estructura de config de pi bajo el home del usuario node
RUN mkdir -p /home/node/.pi/agent/extensions && chown -R node:node /home/node/.pi

# Puedes pasar la config que quieras, como tu extensión de proveedor,
# los settings y la lista de modelos
COPY --chown=node:node extensions/ /home/node/.pi/agent/extensions/
COPY --chown=node:node .pi/settings.json /home/node/.pi/agent/settings.json
COPY --chown=node:node .pi/agent/models.json /home/node/.pi/agent/models.json

# Usuario no-root (UID 1000): sin sudo, y los ficheros mantienen tus permisos
USER node

WORKDIR /workspace
ENTRYPOINT ["pi"]
```

Lo construyes con `docker build -t pi-agent .` y, una vez tienes la imagen, lo puedes ejecutar en modo interactivo:

```bash
docker run -it \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  -e API_KEY=$YOUR_API_KEY \
  -v "$(pwd):/workspace" \
  pi-agent
```

- `--cap-drop ALL` quita todas las capabilities de Linux y `--security-opt no-new-privileges` impide la escalada de privilegios dentro del contenedor.
- En el `Dockerfile` el agente corre como el usuario `node` (UID 1000, no root), así que no tiene sudo y los ficheros que cree tienen permisos del usuario 1000, que suele ser el primer usuario del sistema, con lo que probablemente coincidirá con el tuyo.
- `-v "$(pwd):/workspace"` monta solo el directorio actual: lo único que el agente puede leer, editar o ejecutar.
- Solo le llegan las variables de entorno que pasas con `-e`, normalmente nada más que la API key.

Un detalle que merece la pena: meto un `AGENTS.md` en la imagen que le dice al agente que está en un sandbox aislado, que **no** intente inspeccionar el entorno (DNS, herramientas instaladas, red…) porque lo que vea no se corresponde con tu máquina real, y que en su lugar te dé instrucciones para que lo compruebes tú. Sin eso, los modelos pequeños se ponen a correr `dig` y `whois` dentro del contenedor y se lían solos.

Con un alias lo dejas en dos teclas:

```bash
alias pi='docker run -it --cap-drop ALL --security-opt no-new-privileges -e API_KEY=$YOUR_API_KEY -v "$(pwd):/workspace" pi-agent'
```

Easy as `pi`.

# Modelos: del proxy en la nube a lo open source

Pi habla con cualquier proveedor compatible con la API de OpenAI, y añadir uno son unas pocas líneas en una extensión. La estructura es esta (registras un proveedor con su `baseUrl`, su key y la lista de modelos):

```ts
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerProvider("Mi proxy", {
    baseUrl: "https://tu-proxy-litellm/v1",
    apiKey: process.env.API_KEY,
    api: "openai-completions",
    models: [
      {
        id: "glm-5",
        name: "GLM 5",
        input: ["text"],
        contextWindow: 200000,
        maxTokens: 32768,
        reasoning: false,
        cost: { input: 1, output: 3.2, cacheRead: 0, cacheWrite: 0 },
      },
      // ...más modelos
    ],
  });
}
```

Apuntando a un proxy como LiteLLM puedes usar tanto modelos frontera (Claude y compañía) como los open-weight, que es donde está la parte divertida. De lo que he probado, **GLM 5 es el mejor** con diferencia —diría que está al nivel de Sonnet— y con él se pueden hacer muchas cosas; Minimax 2.5 y Kimi K2.5 también aguantan bien. No lo usaría para todo (te faltan los MCPs, las integraciones, la memoria, los sub-agentes…), pero correrlos un par de veces mirando la sesión entera enseña un montón sobre dónde están hoy los modelos abiertos.

# Modelos en local con Ollama

![Pi ejecutándose con un modelo local](/public/img/pi-agent.png)

Otra posibilidad es correr el modelo **en tu propia máquina**, sin enviar nada a ningún sitio. Pi se conecta a [Ollama](https://ollama.com/) igual que a cualquier otro proveedor OpenAI-compatible (apuntando a `http://127.0.0.1:11434/v1`).

Usar un modelo en Ollama para tareas agénticas no es del todo inmediato: hay que crear una variante con la configuración adecuada mediante un `Modelfile`. La clave es **bajar la temperatura y ajustar la ventana de contexto y los tokens de salida**. Los modelos Gemma4 tienen su propia recomendación para estos parámetros en tareas agénticas, para qwen he probado con:

```Modelfile
FROM qwen3.5:9b

# Config para tareas de código: temperatura baja, contexto contenido
PARAMETER temperature 0.1
PARAMETER top_p 0.8
PARAMETER top_k 20

PARAMETER num_ctx 32768
PARAMETER num_predict 4096

# Número de CPUs (deja margen para seguir trabajando)
PARAMETER num_thread 8
```

Para crear el modelo:

```bash
ollama pull qwen3.5:9b
ollama create qwen-coding -f Modelfile
```

Sobre qué modelo elegir, mi experiencia en un Linux con 32 GB de RAM y **sin GPU**:

- El **9B** (Qwen) es el mínimo razonable. Tarda un minuto largo en calentar y va lento, pero hace tareas pequeñas y responde preguntas sobre el repo.
- El **4B** ya alucina sin control: se inventa cosas y se va de la conversación constantemente.
- Si tienes un **Mac**, puedes tirar de modelos de 27/30B, que están más o menos entre Haiku y Sonnet en cuanto a capacidades.

Pi tiene una ventaja decisiva sobre Claude Code para los modelos pequeños: el system prompt de Claude Code son miles de líneas con un montón de herramientas, y eso **satura** a los modelos abiertos y pequeños. El minimalismo de Pi es justo lo que les deja funcionar.

Hay una magia especial en estar sin conexión, en un tren o donde sea, y aun así poder preguntarle cosas a tu repo y hacer cambios pidiéndoselos al agente.

# En resumen

Pi como **banco de pruebas** es insuperable: ves todo lo que hace el modelo, comparas comportamientos, y puedes correr modelos open source y locales que con un harness más pesado ni arrancarían. Si te interesa entender cómo funcionan los agentes por dentro, en lugar de solo usarlos, merece mucho la pena montártelo un fin de semana. Eso sí: **dentro de un contenedor**. Si te interesa tengo un pequeño [repo con este setup para modelos locales en github](https://github.com/juanmirod/pi-agent).

Como siempre, puedes dejar tus comentarios en github o escribirme en [bluesky](https://bsky.app/profile/juanmirod.bsky.social). Y si montas tu propia configuración de Pi me encantará que me cuentes qué tal.
