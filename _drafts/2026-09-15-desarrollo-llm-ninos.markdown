---
title: "Del balbuceo a la colmena: las edades de los LLM"
layout: post
published: false
tags: [Inteligencia Artificial, LLMs, opinión]
image: /public/img/desarrollo-llm-portada.png
---

<!-- PORTADA PENDIENTE
Prompt sugerido para ChatGPT Image o Gemini:
"Ilustración editorial en tonos cálidos: una escalera de bloques de letras infantiles de madera. En los primeros peldaños hay letras sueltas y garabatos; a mitad de la escalera, líneas de código impresas; en el peldaño más alto, una colmena de panal con muchos robots idénticos diminutos asomando. Un muñeco de madera con forma de robot mira la escalera desde abajo. Estilo limpio, sin texto, sin logotipos."
Guardar como /public/img/desarrollo-llm-portada.png y borrar este comentario.
-->

En 2017 pasé meses intentando que un chatbot entendiera una pregunta escrita de cualquier manera. Tokenizaba la entrada, detectaba entidades con diccionarios, clasificaba la intención con cientos de patrones y respondía con una plantilla. Funcionaba mientras el usuario preguntara lo previsto. Hoy le pido a Opus 5 que me revise un post sobre modelos de lenguaje y me discute dos párrafos.

Entre esas dos escenas hay ocho años y una sensación difícil de sacudir, la de haber visto crecer a alguien. Bebé, niño, adolescente, universitario. La comparación aparece cada vez que un modelo nuevo hace algo que el anterior no sabía hacer.

Este post cuenta esa historia sin darla por buena. Los modelos no crecen como niños. Lo que cambia con cada generación es la tarea que tienen delante, y la tarea es la que moldea lo que aprenden por dentro. La metáfora educativa sirve para mirar. El mecanismo que hay debajo es el de un sistema predictivo respondiendo a su entorno. Primero la historia por tareas, después la tapa abierta, y al final dónde se acaba el parecido.

## Los materiales

Antes de la primera edad hay un taller. En 2017 el estado del arte para hacer un asistente conversacional era un montón de reglas. Lo conté en [Mi experiencia en NLP](/2023/07/07/mi-experiencia-nlp.html): tokenizar, detectar entidades, clasificar la intención, responder. El chatbot aguantaba mientras preguntaras lo previsto y se rompía a la segunda frase libre.

El taller tardó una década en llenarse de piezas. word2vec, en 2013, convirtió las palabras en vectores y el significado en geometría. Cada palabra tenía un solo vector, así que "banco" era lo mismo en la plaza y en el banco central. Las listas de palabras, de decenas de miles de entradas, dejaban fuera los typos y los neologismos. La tokenización por subpalabras convirtió esos huecos en piezas que el modelo ya conocía. En 2017 llegó la atención y en 2018 BERT, que rellenaba huecos mirando el contexto a los dos lados. BERT entendía y no escribía. El camino que escribía era el decoder autorregresivo: predecir el siguiente token y usarlo como entrada del paso siguiente.

Nada de esto es infancia. Es el taller, la química antes de la biología, como el capítulo con el que Agüera abre su libro. Cada pieza que funcionó se quedó debajo y la siguiente se apoyó en ella.

## El balbuceo

GPT-2, en 2019, fue el primer modelo que sostuvo un párrafo entero. Su tarea era una sola: continuar texto. Los ejemplos que se hicieron famosos, como el del científico que descubre un rebaño de unicornios en los Andes, tenían coherencia local y se desviaban en cuanto la historia se alargaba. El modelo no respondía preguntas, continuaba textos. Para sacarle algo había que construirle un prompt que empezara de la forma adecuada, y aun así era cuestión de suerte.

Un bebé que balbucea tampoco tiene tarea. Practica piezas de idioma sin interlocutor. GPT-2 practicaba la forma local de la lengua porque era lo único que necesitaba para seguir el hilo de un texto. Sintaxis, asociaciones frecuentes, algo de estilo. Nada más.

## El niño que fabula

GPT-3, en 2020, cambió la tarea. Con 175.000 millones de parámetros y unos pocos ejemplos en el prompt respondía preguntas, resumía, traducía y escribía código, que es lo que contaba el paper [Large Language Models are Few-Shot Learners](/public/papers/2005.14165v4.gpt3.pdf). También insultaba si le dabas pie y explicaba cómo fabricar dinamita si dejabas la frase a medias. Cualquiera que lo probara en 2020 recuerda las dos caras.

La cara que más me interesa es la de la fabulación. El modelo no distinguía entre recordar un dato e inventarlo. Si le preguntabas por un libro que no existía, se lo inventaba con editorial, año y reseña. La tarea ya no era continuar un texto, era responder, y para responder aprendió a producir la respuesta que sonaba bien. Ahí estaba el límite: sonar bien no es lo mismo que acertar. La comparación con un niño que cuenta una historia con total convicción es inevitable, aunque el mecanismo sea otro. Un niño confabula con lo que tiene a mano y no siempre distingue lo que recuerda de lo que imagina. El modelo recombina texto y aprende a sonar seguro.

InstructGPT, en 2022, metió al evaluador dentro del entorno. Un grupo de personas comparaba respuestas y ordenaba cuál era mejor; con esas preferencias se entrenaba un modelo de recompensa que después ajustaba al modelo principal. ChatGPT llegó en noviembre de ese año con esa receta y por primera vez el modelo tenía turno. Respondía y pedía aclaraciones. La tarea ya no era solo responder: era responder y gustar. Millones de personas empezaron a corregirlo cada día sin saberlo.

Las alucinaciones no desaparecieron. El modelo se volvió más hábil produciendo respuestas plausibles, que es exactamente lo que le pedía la recompensa.

## El adolescente que razona

Con o1, en 2024, la tarea volvió a cambiar. OpenAI entrenó al modelo con refuerzo para que generara cadenas de pensamiento antes de responder, y el modelo aprendió a gastar más cómputo en los problemas difíciles. En matemáticas y en código los resultados subieron de golpe. DeepSeek llevó la idea más lejos con R1 en 2025: demostró que se puede inducir razonamiento con refuerzo puro y recompensas verificables, sin depender de ejemplos humanos de razonamiento. Las pruebas pasan o no pasan, y esa señal es la que entrena.

La tarea ahora es resolver problemas con una respuesta comprobable. Para eso el modelo tiene que modelar la estructura del problema y su propio proceso de solución, y esa exigencia se materializa en una cadena de pensamiento más larga y en una política que dedica más tiempo a pensar. Es un estudiante haciendo ejercicios con solucionario: practica hasta que le salen. El paralelismo con la adolescencia es el de alguien que ya encadena pasos abstractos y a la vez se confía y defiende una respuesta equivocada con seguridad.

Conviene no confundir la cadena de pensamiento con un diario íntimo. Es texto generado, y en ocasiones justifica una respuesta calculada por otro camino. Varios trabajos de interpretabilidad han encontrado que lo que el modelo dice que piensa no siempre coincide con lo que hizo por dentro.

## La colmena

Los modelos que uso ahora tienen delante una tarea distinta: ejecutar cadenas largas de acciones. Opus 5 me resuelve cualquier tarea de programación que le planteo. GPT-5.6 Sol me discute decisiones de arquitectura y me encuentra errores en un borrador. Los abiertos, DeepSeek y GLM entre otros, hacen lo mismo con unos meses de retraso y una décima parte del coste. Manejan herramientas, leen repositorios enteros y mantienen conversaciones de horas sin perder el hilo.

Lo interesante es cómo se organizan cuando se les junta. No forman una conversación entre mentes. Forman una colmena: muchas instancias del mismo predictor trabajando en paralelo, coordinadas desde fuera por un harness o por una persona. No se modelan entre sí ni negocian un reparto del trabajo. Cada una modela su parte de la tarea. Cuando digo que son como abejas no me refiero a que sean tontas, sino a que la inteligencia del conjunto está en la organización externa, no en lo que cada agente piensa de los demás.

La especialización llega al extremo. Dentro del modelo, los expertos del MoE se reparten tipos de problema. Fuera, los prompts de sistema crean personajes: el revisor, el programador. Cada herramienta cubre lo que los pesos no saben hacer. Con tanta especialización aparece el perfil que Karpathy llamó *jagged*: picos altísimos en código o en Derecho y valles profundos en cosas que un niño de tres años hace bien. Su capacidad se parece más a una forma que se llena de picos que a un nivel general que sube.

## Bajo el capó

Agüera describe la inteligencia como la capacidad de modelar, predecir e influir en el propio futuro, y a los seres vivos como sistemas predictivos que modelan el entorno para sobrevivir en él. Un modelo de lenguaje es otro sistema predictivo, solo que su entorno es el entrenamiento y la tarea. Cuanto más compleja o más larga es la predicción que se le exige, más tiene que modelar por dentro. La eficiencia hace el resto: reparte el trabajo entre partes especializadas, que son las capas, los expertos del MoE, las posiciones de los embeddings o los personajes que adopta según el prompt.

La idea que sostiene todo el post es esta: el problema condiciona la solución, igual que el entorno condiciona al organismo que se desarrolla dentro de él. No hay un reloj de maduración dentro del modelo. Hay una tarea cada vez más ambiciosa que exige un modelado cada vez más profundo, y nosotros leemos ese resultado con las edades que conocemos.

La historia real tampoco fue una marcha lineal. Hubo inviernos de la IA y décadas de sistemas expertos que prometían más de lo que daban. En 2017 yo intentaba que mi chatbot entendiera "¿qué tiempo hace en Córdoba?" a base de reglas, y no era un problema de esfuerzo: no existían las piezas. Lo que parece una evolución inevitable se ve así solo en retrospectiva. Internet como corpus, las GPU como cómputo, los transformers como arquitectura y una década de inversión hicieron posible cada salto. Nada de eso estaba garantizado.

Queda un sesgo del que conviene ser consciente: medimos con exámenes humanos y describimos con metáforas humanas. Parte del parecido lo pone el observador. El caso de Sally-Anne es el mejor ejemplo. Kosinski publicó en 2023 que GPT-4 resolvía las tareas clásicas de falsa creencia, y la noticia corrió como la prueba de que los modelos tenían teoría de la mente. Ullman y sus colegas demostraron el mismo año que bastaba cambiar los nombres o el objeto de la historia para que el rendimiento se derrumbara. El test mide lo que mide, que es lo que queríamos medir en un niño de cuatro años.

## La metáfora a medias

La comparación aguanta en un punto y falla en el resto. Aguanta en que el desarrollo no es un reloj: es una respuesta al entorno. Falla en que los entornos son distintos. Un niño aprende primero el mundo y después el lenguaje. Antes de hablar ya sabe que los objetos no desaparecen cuando se tapan. Un modelo aprende al revés: primero el lenguaje, y con él [la cultura acumulada](/public/papers/llm-as-culture-tech.pdf) de millones de personas, y solo después, si acaso, algo parecido a un modelo del mundo. En lugar de dibujar el mapa caminando, hereda los mapas que escribimos los demás.

También falla en lo demás: el niño tiene cuerpo y curiosidad, y no deja de aprender; el modelo tiene los pesos congelados y ninguna motivación propia. Un niño de cuatro años no vuelve a tener cuatro años. Un modelo de 2024 sigue siendo el mismo de 2024 por mucho que hables con él.

Y hay un detalle que da la vuelta a la metáfora. Agüera critica el entrenamiento actual con una imagen que no tiene desperdicio: cogemos toda la web que podemos, la trituramos en una pasta y se la metemos al modelo por la garganta, en orden aleatorio, sin atender al currículo, la relevancia, la redundancia, el contexto ni a la agencia del propio modelo. Gran parte del pretraining es redundante, y cuanto más grande es el modelo, más desperdicia ese orden aleatorio. Su propuesta es curricular y constructivista: empezar por libros infantiles, que como demostró TinyStories no necesitan una cantidad enorme de texto, seguir por lecturas juveniles y especializarse después según el contexto de cada agente.

En el post-entrenamiento algo de eso ya está pasando. Se curan problemas por dificultad y se refuerzan solo las soluciones que se pueden verificar, así que el modelo aprende de sus propios intentos con GRPO. No es un currículo escolar, pero se le parece más que tragarse internet en orden aleatorio. La metáfora educativa deja de ser una metáfora el día en que alguien diseña el currículo a propósito.

## El techo

Agüera tiene una sección titulada *Limits to Growth*. Su argumento es que ningún parámetro de un sistema vivo crece sin límite. Los exponenciales se aceleran, se topan con el entorno y acaban saturando, primero volviéndose lineales y después desacelerando. Cualquier crecimiento que corresponda a algo real choca antes o después con límites físicos, ecológicos y económicos.

Los modelos no son una excepción. El entrenamiento se enfrenta ya al techo de los datos disponibles, al coste de la energía y al dinero que las empresas necesitan para justificar sus inversiones. OpenAI dice que Astra, su GPT-6, abre la era de la AGI. No tengo forma de saber si eso es cierto, igual que no la tenía cuando Altman hablaba de miles de días. Lo que sí puedo comprobar es lo que estos sistemas hacen cuando los uso.

Puede que la quinta edad no sea una edad. Puede que sea una meseta. Los niños dejan de crecer cuando llegan a la altura que les toca. Con estos sistemas sabremos cuál es su altura cuando el entorno deje de darles de comer, y ese momento está más cerca de lo que sugiere el anuncio de cada nuevo modelo.

Continuará.

## Fuentes y para seguir leyendo

- [What is Intelligence?](https://whatisintelligence.antikythera.org/), de Blaise Agüera y Arcas. Los sistemas predictivos, el modelado del entorno, los límites del crecimiento y la crítica al currículo aleatorio del pretraining. De aquí sale la mitad del marco de este post.
- [TinyStories: How Small Can Language Models Be and Still Speak Coherent English?](https://arxiv.org/abs/2305.07759), Eldan y Li (2023). Lo que se puede aprender con un currículo de libros infantiles.
- [DeepSeekMath](https://arxiv.org/abs/2402.03300), Shao et al. (2024) y [DeepSeek-R1](https://arxiv.org/abs/2501.12948) (2025). GRPO, refuerzo con recompensas verificables y el razonamiento como práctica.
- [Evaluating Large Language Models in Theory of Mind Tasks](https://arxiv.org/abs/2302.02083), Kosinski (2023) y [Large Language Models Fail on Trivial Alterations to Theory-of-Mind Tasks](https://arxiv.org/abs/2302.08399), Ullman et al. (2023). El test de Sally-Anne aplicado a los modelos, y por qué el resultado depende del enunciado.
- [Emergent Abilities of Large Language Models](https://arxiv.org/abs/2206.07682), Wei et al. (2022) y [Are Emergent Abilities of Large Language Models a Mirage?](https://arxiv.org/abs/2304.15004), Schaeffer et al. (2023). Los dos lados de la discusión sobre si las capacidades aparecen por saltos o por cómo las medimos.
- [Language Models Don't Always Say What They Think](https://arxiv.org/abs/2305.04388), Turpin et al. (2023). Sobre cadenas de pensamiento que no cuentan lo que el modelo hizo por dentro.
- [The Gardener and the Carpenter](https://alisongopnik.com/), de Alison Gopnik. Niños como exploradores y adultos como explotadores de lo aprendido, útil como contraste frente a un sistema que no juega.
- [The Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html), Rich Sutton (2019). Por qué los métodos generales con cómputo ganan a las reglas escritas a mano.
- [Jagged intelligence](https://x.com/karpathy/status/1816531576228053133?lang=en), Andrej Karpathy. El perfil con picos y valles.

Los hitos técnicos, por orden: [word2vec](https://arxiv.org/abs/1301.3781) (2013), [Attention Is All You Need](https://arxiv.org/abs/1706.03762) (2017), [BERT](https://arxiv.org/abs/1810.04805) (2018), [GPT-2](/public/papers/gpt2.pdf) (2019), [GPT-3](/public/papers/2005.14165v4.gpt3.pdf) (2020), [InstructGPT](https://arxiv.org/abs/2203.02155) (2022), [o1](https://openai.com/index/introducing-openai-o1-preview/) (2024) y [DeepSeek-R1](https://arxiv.org/abs/2501.12948) (2025).

Los modelos de la frontera actual: [Claude Opus 5](https://www.anthropic.com/news/claude-opus-5), [GPT-5.6 Sol](https://openai.com/index/previewing-gpt-5-6-sol/) y [GPT-6 Astra](https://openai.com/index/gpt-6-astra/).

Y lo que escribí antes en este blog sobre el tema: [¿Por qué los LLMs no son loros estocásticos?](/2026/01/30/por-que-los-llms-no-son-loros-estocasticos.html), [Sobre inteligencia](/2024/10/02/sobre-inteligencia.html) y [Mi experiencia en NLP](/2023/07/07/mi-experiencia-nlp.html).
