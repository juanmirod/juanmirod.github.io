---
published: true
title: Desarrollando con ChatGPT
layout: post
tags: [programación, Inteligencia Artificial, LLM, ChatGPT] 
---

Llevo un tiempo siguiendo la pista a los avances de la IA, IAs generativas, modelos de lenguaje, etc. pero ChatGPT me pareció un cambio de paradigma que tenía que atacar desde el principio. Fue una señal de que me estaba perdiendo algo importante y debía empezar a aprender más seriamente sobre el tema. 

Una de las cosas que hago es seguir leyendo y haciendo cursos sobre Python, ML, LLMs. Pero los cursos siempre me parecen demasiado dirigidos, para mi es importante también tener un proyecto libre que me permita experimentar y aprender a mi ritmo y ver el por qué y el cómo.

Para eso empecé un [proyecto personal](https://github.com/juanmirod/chatgpt_cli) en el que la propuesta es crear mi propio asistente personal. Idealmente uno que sepa cosas sobre mi y tenga memoria sobre nuestras conversaciones anteriores y aún más idealmente que se ejecute en mi ordenador personal. Todavía estoy lejos de expectativas y puede que nunca llegue a conseguirlas pero es una forma de forzarme a aprender sobre el tema.

El segundo punto importante de este proyecto es que **estoy haciéndolo en python, que no es mi lenguaje principal, y que además estoy haciéndolo usando siempre que puedo ChatGPT antes que google o documentaciones externas.**

Todo esto lo convierte en algo bastante meta, que es algo que me encanta, uso ChatGPT para desarrollar herramientas que usen ChatGPT y en última instancia reemplazarlo con mi propio ChatGPT...

**Por ahora la experiencia es genial. Desarrollo nuevas funcionalidades muy rápido, ChatGPT me desbloquea muchísimo y me mantiene mucho más en el flow** que tener que estar leyendo documentación o buscando en Google y en general la sensación de velocidad y de satisfacción es muy buena. También creo que esto es así porque estoy usando ChatGPT en el escenario ideal:

- Un proyecto nuevo y pequeño.
- Una app de línea de comandos, con lo que añadir funcionalidad es muy fácil, no necesitas frameworks ni componentes ni grandes arquitecturas.
- En un lenguaje que no domino, con lo que ChatGPT es muy útil para solventar dudas.
- El propio dominio es la especialidad de ChatGPT.
- Python es un lenguaje especialmente adecuado para LLMs, porque no tiene tanta sintaxis y es dinámico. Propiedades que lo hacen ideal para humanos y para LLMs porque ahora mismo es lo más parecido a que teníamos a programar en lenguaje natural.

Sin todos estos factores la utilidad ahora mismo de ChatGPT pierde puntos. De hecho en el trabajo lo uso mucho menos, simplemente es más difícil explicar lo que quiero que hacerlo yo. Pero por eso creo que todos acabaremos con nuestro propio asistente personal o de empresa que conozca los entresijos de nuestros proyectos y pueda ayudarnos con más contexto...

Pero vayamos un poco al grano, voy a listar algunos ejemplos de cómo he usado ChatGPT en este proyecto y cuando pueda enlazaré a conversaciones concretas sobre ese tema que tuve con ChatGPT. Estas son algunas cosas que he hecho con ChatGPT para trabajar, y no sólo para explorar lo que sabe, aprender o tratar de jugar o entretenerme:

  - **Readme:** La primera versión del Readme la escribió ChatGPT, yo la edité y he ido ampliándolo y mejorándolo desde entonces.[Lee la conversación aquí](https://gist.github.com/juanmirod/fce0104af6714c7527fce54639706407)
  - **Dockerfile:** Le pedí a ChatGPT un dockerfile porque la verdad es que no me sé la sintaxis que hay que seguir y al final siempre acabo copiando y pegando. De primeras me dió un dockerfile totalmente funcional y el comando para ejecutar el asistente desde el dockerfile. Luego lo edité un poco para quitar alguna cosa que no necesitaba y cambiar un poco el orden de los comandos para aprovechar mejor la cache de docker.[Conversación](https://gist.github.com/juanmirod/7be1a16f017ea8798754870d1bcd7ffa)
  - **TTS:** El asistente tiene una opción de text-to-speech para que puedas escucha sus respuestas, aunque por defecto lo tengo desactivado (es más rádpido leer y el código no tiene sentido escucharlo) La primera versión de nuevo fue suya, luego estuve probando varias voces y librerías, al final me quedé con una que no era la que me había sugerido ChatGPT.
  - **Subir conversación a un gist.** El fichero upload también se lo pedí a ChatGPT, luego yo metí el código en una función para usarlo desde la app en lugar de como un script.[Conversación](https://gist.github.com/juanmirod/8b6044b0071bdcc5cb0bbcf933b7a576)
  - **Recuperar una conversación** desde el fichero markdown. Esto aún no lo tengo integrado, pero ya he peloteado con ChatGPT y tengo el código inicial que debería hacerlo posible. [Conversación](https://gist.github.com/juanmirod/4f0e8687b4620831afb1446aed027b0c)
  - **Hablando de embeddings y cómo usarlos** Para poder guardar información de texto y hacer búsquedas semánticas. [Conversación](https://gist.github.com/juanmirod/6429d962b6ffb71f2bc9a3cdb27cbd71)
  - **Refactors.** He hecho varios refactors donde le he dado una función grande y le he pedido que me parta en funciones más pequeñas.
  - **Tests.** Los primeros tests de la clase ChatGPT los hizo ChatGPT, los del módulo de actions los he hecho con ayuda de copilot.

En general ChatGPT me ha ayudado durante todo el proceso. Tanto a esbozar soluciones, consultar cómo funcionan librerías, escribir tests... el patrón es parecido siempre, y por eos creo que especialmente útil si no dominas el lenguaje, porque si lo dominas vas a tardar lo mismo o menos en escribirlo tú. Pero si no conoces las librerías y módulos disponibles, pedirle a ChatGPT cómo lo haría ahorra mucho tiempo de prueba y error e investigación y leer documentación. Además para mi este proceso suele ser un agujero de conejo: me pongo a buscar una librería para hacer X y hay 100, y ahora tengo que ver cuales son más populares y por qué y quiero ver un poco cómo funcionan... y cuando me he dado cuenta han pasado 2 horas y no he hecho nada. Con ChatGPT todo ese proceso es mucho más inmediato y fluido, incluso aunque acabe usando otra librería o editando fuertemente o descartando su primera solución. Me mantiene más en el flow y más centrado en el problema que todas esas webs llenas de anuncios y popups de cookies, y videos y demás distracciones.

Estoy seguro de que sólo estoy rascando la superficie aquí. los LLMs parecen tener muchísimo potencial a varios niveles, y poco a poco iremos integrándolos en IDEs e interfaces de usuarios, pero incluso en esta forma rudimentaria y sin saber muy bien lo que hago creo que gano mucha productividad y el proceso de desarrollo es mucho menos frustrante.   