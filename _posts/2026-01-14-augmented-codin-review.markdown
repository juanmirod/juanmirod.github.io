---
title: "Review de 2025 en desarrollo 'asistido'"
layout: post
published: true
tags: [ai, Inteligencia Artificial, opinión]
image: /public/img/2025-2026.png
---

Escribo esto a principios de año para intentar tener un punto de referencia.

![Imagen de cabecera](/public/img/2025-2026.png)

# 2025

2025 comenzó con las compañías de IA creando hype alrededor de los agentes y un montón de ai-haters y ai-deniers diciendo que era todo un bluff, que los llms nunca funcionarían como agentes y que la burbuja explotaría pronto. En Febrero del año pasado, [Andrej Karpathy acuñó el término "Vibe coding" en un tuit](https://x.com/karpathy/status/1886192184808149383?lang=en) tratando de expresar cómo veía esta nueva forma de programar que estaba experimentando y un montón de gente se rió de él. También éramos muchos los que estábamos probando estas herramientas como él, pero incluso dentro del mundillo, o diría que incluso más dentro de la industria, su afirmación de que no hacía falta mirar el código, sólo pedirle cosas al agente e iterar parecía totalmente ridícula.

Menos de un año después, estas navidades las redes sociales, los subtacks, blogs y demás medios se han llenado de programadores diciendo que han hecho proyectos enteros con Claude Code en días en lugar de en meses, bien porque en vacaciones han podido probar Claude Code o se han atrevido a escribir sobre ello. **Ahora de repente parece que todo el mundo usa agentes y nadie se averguenza de ello**, salvo el pequeño grupo de AI-haters que sigue diciendo que los llms son el mal y además no sirven para nada porque hace dos años le preguntaron a ChatGPT una cosa y lo hizo mal. ["Vibe coding" es la palabra del año](https://www.bbc.com/news/articles/cpd2y053nleo)

Estamos de nuevo en ese extraño momento como a inicios de 2023, cuando salió ChatGPT y a millones de early adopters nos voló la cabeza, pero el resto del mundo parecía no haberse enterado de lo que había pasado. Este año ese ciclo se vivió con los agentes de código y creo que en 2026 veremos los agentes integrados en más y más verticales, pero no me adelanto, luego hablaré de eso.

Para mi lo importante es que parece que hemos llegado a un punto crítico en la industria donde la utilidad, la versatilidad y la inteligencia de estos agentes es innegable. Todos sentimos que la forma de trabajar no será nunca la misma, Salvatore Sanfilippo ha escrito un post bastante incendiario en su blog que a acarreado miles de comentarios en [HK](https://news.ycombinator.com/item?id=46574276), [Lobsters](https://lobste.rs/s/cmsfbu/don_t_fall_into_anti_ai_hype) y a saber en cuántos discords. Quienes lo hayan leído antes o sepan quien es sabrán que es un programador nada mediocre, con opiniones fuertes, que otras veces ha removido las redes y muy conocido porque creó y mantuvo durante años Redis, y ahora está diciendo esto:

> The degree of success you'll get is related to the kind of programming you do (the more isolated, and the more textually representable, the better: system programming is particularly apt), and to your ability to create a mental representation of the problem to communicate to the LLM. But, in general, it is now clear that for most projects, writing the code yourself is no longer sensible, if not to have fun.
> Fuente: https://antirez.com/news/158

No sólo es él. [Ken Beck](https://kentbeck.com/) lleva meses hablando de su "Genie", Dan Abramov descubrió hace poco Claude Code y no para de publicar sobre [sus proyectos en bluesky](https://bsky.app/profile/danabra.mov), [Armin Ronacher](https://bsky.app/profile/mitsuhiko.at), [Addy Osmany](https://addyosmani.com/blog/), y en general un largo etc de desarrolladores que llevan décadas en la industria, con proyectos open source muy populares y casos de éxito y que están abrazando esta tecnología y compartiendo su experiencia. Por el otro lado sigue habiendo AI-haters que dicen que todos esos son unos grifters y que los llms en realidad son el mal, pero cada vez suenan más como fanáticos religiosos negando la evidencia.

Para mi ha sido un viaje parecido. Empecé hablando de los agentes [en primavera](https://medium.com/clarityai-engineering/ai-assisted-coding-in-2025-6e800e4e61b5) usándolos poco a poco más en Cursor y probando Claude code, Codex, gemini-cli... En enero una de las propuestas que me he hecho para este mes es escribir la mínima cantidad de código posible directamente. Para cada tarea, la defino en el ticket de Jira o en un prompt y o bien itero en un plan con el agente o se lo pido directamente e itero sobre la conversación. La experiencia es cada día mejor, acabo de probar GPT 5.2 Codex y me ha vuelto a volar la cabeza lo rápido y capaz que es.

# 2026

Entonces, ¿Cómo veo 2026? Para mi este será el año de integrar los agentes a gran escala en muchas verticales. Querremos integrarlos por fin en la revisión de código (o pasar completamente de ellas como he leído ya por ahí a [Simon Willinson](https://lobste.rs/s/cmsfbu/don_t_fall_into_anti_ai_hype#c_kgtuhs)) Querremos usarlos para hacer exploratory testing, mutation testing, para simular usuarios reales, para preguntarles por nuestros logs y generar gráficas y dashboards a partir de ellos... Rápidamente empezarán también a integrarse en otras profesiones. Los veremos en toda la suite ofimática y también en otras aplicaciones propietarias más nicho. No me atrevo a aventurar más, pero creo que los agentes alcanzarán el mainstream como hasta ahora han hecho en el desarrollo software y a principios de 2027, todo el mundo estará acostumbrado y verá totalmente normal pedir tareas complejas a agentes en diferentes aplicaciones y verticales.

¿Qué significará esto? ¿Más trabajo para nosotros? ¿Más despidos? ¿Explotará la burbuja? Son preguntas sin respuesta, la situación es totalmente impredecible. Y o me estoy haciendo mayor o el mundo en general es mucho más loco e impredecible.

En cuanto al desarrollo, por un lado mucha más gente va a poder hacer sus propios scripts y aplicaciones a medida para su trabajo o su empresa. Por el otro, eso podría significar una explosión de demanda de expertos cuando toda esa gente quiera ir más allá. O tal vez tengan suficiente y los programadores tengamos que evolucionar a product owners y a gestionar agentes para producir con una persona lo que antes hacía un equipo entero. Hay muchas incógnitas, y quería soltar un poco mis impresiones a primeros de año.

![2026 es una incertidumbre](/public/img/2026plus.png)

Seguramente actualice este post con más pensamientos como de costumbre, como siempre, puedes dejar tus comentarios en github o escribirme en [bluesky](https://bsky.app/profile/juanmirod.bsky.social).

---

### _[Actualización: 15/02/2026]_

Una predicción a medio-largo plazo, tal vez no este año:
[https://bsky.app/profile/juanmirod.bsky.social/post/3me7rg37os22g)]

Cuando los modelos de código abierto lleguen al nivel de Opus 4.5, la gente los preferirá para muchas tareas agénticas y los proveedores de modelos iniciarán una carrera de optimización para hacer los modelos más baratos y rápidos, incluso cuando no sean más capaces, para tratar de recuperar a esos usuarios.

Quizás veremos una división más drástica entre modelos baratos vs modelos de frontera. La mayoría de la gente no necesita un modelo capaz de demostrar problemas matemáticos imposibles. Pero algunas personas estarán dispuestas a pagar mucho por ese tipo de inteligencia, modelos que resuelvan grandes problemas de optimización o logística.

Para el resto, cuando los modelos OSS sean suficientes, los grandes proveedores necesitarán competir en velocidad, conveniencia, coste, personalización...

Y relacionado con lo de arriba:
[https://bsky.app/profile/juanmirod.bsky.social/post/3meqmxehsv22f]

No es seguro que podamos conseguir modelos abiertos al nivel de Opus 4.5. Anthropic no ha abierto que yo sepa ninguno de sus modelos, y los laboratorios se han vuelto cada vez más recelosos de desvelar sus procesos y sus invetigaciones.

**Claude Code es la verdadera "bicicleta para la mente".** Creo que ha habido en la comunidad de desarrolladores un antes y un después estas navidades, Claude Code, Open Code, OpenClaw... Los smartphones nos permitieron llevar internet con nosotros todo el tiempo, pero estas nuevas herramientas nos permiten construir cualquier cosa y aprender cualquier cosa. La diferencia clave es que cuando pides algo, lo hace frente a ti y tú conservas todos los artefactos.

**Esto es tan transformador que creo que no durará para siempre.**Necesitamos poner los modelos de código abierto al nivel de Opus 4.5 al menos, o perderemos la oportunidad de mantener esta experiencia. Pronto las empresas intentarán capitalizar los artefactos también y mantener el código en la nube detrás de puertas cerradas.

Si sumamos las dos reflexiones, y creo que no será el único que estará pensando en esto, habrá mucha gente intentando conseguir una versión abierta de un modelo equivalente a Claude Code, que puedan usar en OpenCode con su propia nube o en local. Y cuando eso ocurra, tendremos una carrera por optimizar los modelos agénticos y hacerlos cada vez más pequeños y rápidos, incluso a coste de que pierdan cierto conocimiento del mundo (no necesito que un modelo de código se sepa la historia de todos los paises o todas las novelas que se han escrito...)

Creo que es posible tener modelos agénticos muy capaces y pequeños como para que los podamos ejecutar en local en un ordenador medio o un móvil. Tal vez en un par de años todo el mundo tendrá un asistente personal que maneje su correo, whatsapp, telegram, fotos, ficheros, etc. en su bolsillo. Algo muy parecido a JARVIS, pero no tan inteligente, que para preguntas difíciles o problemas de código más complicado delegue en un modelo frontera, pero que el resto del tiempo funcione en local y sobre el que tengas total control de su configuración...
