---
title: "Augmented coding, review of 2025"
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

Entonces, ¿Cómo veo 2026? Para mi este será el año de integrar los agentes a gran escala en muchas verticales. Querremos integrarlos por fin en la revisión de código (o pasar completamente de ellas como he leído ya por ahí a [Simon Willinson]()) Querremos usarlos para hacer exploratory testing, mutation testing, para simular usuarios reales, para preguntarles por nuestros logs y generar gráficas y dashboards a partir de ellos... Rápidamente empezarán también a integrarse en otras profesiones. Los veremos en toda la suite ofimática y también en otras aplicaciones propietarias más nicho. No me atrevo a aventurar más, pero creo que los agentes alcanzarán el mainstream como hasta ahora han hecho en el desarrollo software y a principios de 2027, todo el mundo estará acostumbrado y verá totalmente normal pedir tareas complejas a agentes en diferentes aplicaciones y verticales.

¿Qué significará esto? ¿Más trabajo para nosotros? ¿Más despidos? ¿Explotará la burbuja? Son preguntas sin respuesta, la situación es totalmente impredecible. Y o me estoy haciendo mayor o el mundo en general es mucho más loco e impredecible.

En cuanto al desarrollo, por un lado mucha más gente va a poder hacer sus propios scripts y aplicaciones a medida para su trabajo o su empresa. Por el otro, eso podría significar una explosión de demanda de expertos cuando toda esa gente quiera ir más allá. O tal vez tengan suficiente y los programadores tengamos que evolucionar a product owners y a gestionar agentes para producir con una persona lo que antes hacía un equipo entero. Hay muchas incógnitas, y quería soltar un poco mis impresiones a primeros de año.

![2026 es una incertidumbre](/public/img/2026plus.png)

Seguramente actualice este post con más pensamientos como de costumbre, como siempre, puedes dejar tus comentarios en github o escribirme en [bluesky](https://bsky.app/profile/juanmirod.bsky.social).
