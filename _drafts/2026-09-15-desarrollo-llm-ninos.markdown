---
title: "Del balbuceo al razonamiento: las edades de los LLM"
layout: post
published: false
tags: [Inteligencia Artificial, LLMs, opinión]
image: /public/img/desarrollo-llm-portada.png
---

<!-- PORTADA PENDIENTE
Prompt sugerido para ChatGPT Image o Gemini:
"Ilustración editorial en tonos cálidos: una escalera de bloques de letras infantiles de madera. En los primeros peldaños hay letras sueltas y garabatos; a mitad de la escalera, líneas de código impresas; en el peldaño más alto, un pequeño rack de servidores. Un muñeco de madera con forma de robot mira la escalera desde abajo. Estilo limpio, sin texto, sin logotipos."
Guardar como /public/img/desarrollo-llm-portada.png y borrar este comentario.
-->

Cuando GPT-3 se inventaba una cita con una seguridad que daba miedo, compararlo con un niño pequeño salía solo. Con los modelos de razonamiento la comparación cambió: parecían adolescentes resolviendo un problema de matemáticas en voz alta. Y con los que uso estos meses la frase que más se me escapa es que esto ya es un universitario. Te discute un paper y te escribe la migración de una base de datos sin quejarse.

La comparación es cómoda, y por eso conviene desconfiar de ella. No creo que un modelo sea un niño ni que esté creciendo como uno. Me interesa otra pregunta: por qué se le parece tanto. Llevo meses apuntando ideas y he releído *What is Intelligence?*, el libro de Blaise Agüera y Arcas, para ordenarlas. La respuesta a la que he llegado es que el parecido está en los bucles de reciprocidad en los que están metidos, no en la maquinaria que llevan dentro. Un niño crece rodeado de mentes que lo modelan y a las que modela. Un modelo de lenguaje se entrena sobre el rastro de millones de mentes humanas y después alguien lo corrige. Lo que llamo edades aquí son grados de acoplamiento.

## De dónde venimos: diccionarios, geometría y rellenahuecos

Antes de que existiera nada de esto, la frontera era escribir reglas. En 2017 trabajé en un proyecto de NLP y el estado del arte, en la práctica, era tokenizar la entrada, detectar entidades con diccionarios o con un NER, clasificar la intención con cientos de patrones y responder con una plantilla. Lo conté en [Mi experiencia en NLP](/2023/07/07/mi-experiencia-nlp.html). El chatbot aguantaba una conversación mientras el usuario preguntara lo que estaba previsto y se rompía a la segunda frase libre. No había ningún modelo del lenguaje por medio, había reglas.

El primer cambio de verdad llegó con **word2vec** en 2013. Por primera vez el significado de una palabra era un punto en un espacio de cientos de dimensiones, y las operaciones aritméticas funcionaban: rey menos hombre más mujer daba reina. El problema es que el vector de "banco" era el mismo en "banco de la plaza" y en "banco central". El diccionario era geometría, pero seguía siendo un diccionario: estático y ciego al contexto.

Ahí estaba también el problema del vocabulario. Los primeros sistemas trabajaban con listas de palabras, cincuenta mil si te ibas a lo grande, y todo lo que quedaba fuera se convertía en un token de "no lo sé". Un typo o un neologismo era un agujero negro. La tokenización por subpalabras cambió eso: una palabra rara se parte en piezas que el modelo ya conoce, y los vocabularios actuales, de cien mil tokens o más, cubren prácticamente cualquier cosa que se te ocurra escribir. Por eso un modelo de hoy adivina qué quisiste decir con un typo y uno de 2015 no tenía de dónde sacarlo. Un aviso para no simplificar: un token no es una palabra ni un concepto. Los embeddings no guardan la idea de "perro" en una casilla; reparten el significado por miles de dimensiones y lo reconstruyen en cada capa.

En 2017 Google publicó *[Attention is all you need](https://arxiv.org/abs/1706.03762)*, y en 2018 llegó **BERT**, que usaba esa arquitectura para rellenar huecos: se tapan palabras de una frase y el modelo aprende a reconstruirlas mirando el contexto a los dos lados. BERT entendía mucho mejor, pero no escribía. Servía para clasificar, extraer información y hacer *fine-tuning* en cada tarea.

El otro camino era el decoder autorregresivo: en vez de rellenar huecos, predecir el siguiente token y usarlo como entrada del paso siguiente. GPT-1 y GPT-2 eligieron ese camino. La idea era más simple y, a la larga, más potente.

Pienso en esta fase como química antes de biología, como el capítulo con el que Agüera abre su libro, el de la abiogénesis. Los embeddings, la atención y la escala no se sustituyen entre sí: se apilan. Cada capa que funciona se queda debajo y hace posible la siguiente. La historia de los modelos se parece más a una acumulación de cimientos que a una sucesión de borradores.

## El balbuceo

Antes de GPT-2 lo que había era poco más que balbuceo: cadenas de Markov, modelos de n-gramas, redes recurrentes que se perdían a la tercera frase. Generaban texto con la forma del idioma y sin nada dentro.

GPT-2, en 2019, fue el primer modelo que sostuvo un párrafo entero. Los ejemplos que se hicieron famosos, como el del científico que descubre un rebaño de unicornios en los Andes, tenían coherencia local y se desviaban en cuanto la historia se alargaba. El modelo no respondía preguntas: continuaba textos. Para sacarle algo había que construirle un prompt que empezara de la forma adecuada, y aun así era cuestión de suerte.

Ahí no hay conversación posible. El modelo lee millones de predicciones humanas, pero no tiene turno: continúa lo que otro escribió. El paralelismo con el balbuceo está en la ausencia de interlocutor. El bebé que balbucea practica piezas de idioma sin comunicar todavía. GPT-2 practicaba la forma del idioma sin tener con quién hablar.

## El niño que fabula

GPT-3, en 2020, fue el salto. 175.000 millones de parámetros y la capacidad de resolver tareas nuevas con unos pocos ejemplos en el prompt, que es lo que contaba el paper [Large Language Models are Few-Shot Learners](/public/papers/2005.14165v4.gpt3.pdf). Escribía código, resumía, traducía y respondía preguntas de cultura general sin entrenamiento específico. También insultaba si le dabas pie, repetía discursos de odio y explicaba cómo fabricar dinamita si dejabas la frase a medias. Cualquiera que lo probara en 2020 recuerda las dos caras.

La cara que más me interesa es la de la fabulación. El modelo no distinguía entre recordar un dato e inventarlo. Si le preguntabas por un libro que no existía, se lo inventaba con editorial, año y reseña. Es lo que hoy llamamos alucinación y lo que entonces me recordaba a un niño contando una historia con total convicción. La comparación es funcional, no psicológica: un niño confabula con lo que tiene a mano y no siempre distingue lo que recuerda de lo que imagina, mientras que el modelo recombina texto. Lo que comparten es la fluidez sin verificación.

InstructGPT, en 2022, cambió el entrenamiento. Un grupo de personas comparaba respuestas del modelo y ordenaba cuál era mejor; con esas preferencias se entrenaba un modelo de recompensa que después ajustaba al modelo principal. La explicación de andar por casa sirve: alguien corrige al aprendiz y el aprendiz ajusta su comportamiento. ChatGPT llegó en noviembre de 2022 con esa receta y por primera vez el modelo tenía turno. Respondía y pedía aclaraciones. Millones de personas empezaron a corregirlo cada día sin saberlo.

Ahí aparece la reciprocidad. El modelo ya no solo lee lo que escribimos: reacciona a lo que le decimos. El niño deja de fabular cuando los adultos le corrigen la fabulación, y RLHF hace eso mismo a escala industrial. Las alucinaciones no desaparecieron, se volvieron más raras y más difíciles de detectar.

## El adolescente que razona

Con o1, en 2024, cambió otra pieza. OpenAI entrenó al modelo con refuerzo para que generara cadenas de pensamiento antes de responder, y el modelo aprendió a gastar más cómputo en los problemas difíciles. En matemáticas y en código los resultados subieron de golpe. DeepSeek llevó la idea más lejos con R1 en 2025: demostró que se puede inducir razonamiento con refuerzo puro y recompensas verificables, sin depender de ejemplos humanos de razonamiento. Las pruebas pasan o no pasan, y esa señal es la que entrena.

El adolescente de la comparación encadena pasos abstractos, discute una solución y detecta un error a mitad de un desarrollo. También se confía, se pierde en un detalle y defiende una respuesta equivocada con seguridad. En los modelos pasa igual. El razonamiento que muestran no es un diario íntimo: es texto generado, y en ocasiones justifica una respuesta calculada por otro camino. Varios trabajos de interpretabilidad han encontrado que la cadena de pensamiento no siempre cuenta lo que el modelo hizo por dentro.

Lo que cambia en esta fase es con quién se corrige. Antes la señal venía de preferencias humanas; ahora viene de un corrector automático. Un test que pasa o una integral que da el resultado esperado. El modelo hace ejercicios con solucionario, como un estudiante que practica hasta que le salen.

## El universitario multijugador

Los modelos que uso ahora hacen cosas que en 2019 eran ciencia ficción. Opus 5 me resuelve cualquier tarea de programación que le planteo. GPT-5.6 Sol me discute decisiones de arquitectura y me encuentra errores en un borrador. Los abiertos, DeepSeek y GLM entre otros, hacen lo mismo con unos meses de retraso y una décima parte del coste. Manejan herramientas, leen repositorios enteros y mantienen conversaciones de horas sin perder el hilo.

La comparación con un universitario se queda corta en conocimientos y larga en juicio. Un estudiante de último curso sabe menos Derecho que estos sistemas, pero sabe ordenar un proyecto de tres meses y decidir qué es urgente. Los agentes actuales no tienen ese criterio. Les pides una tarea concreta y la hacen; les pides que ordenen un proyecto entero y se pierden. Lo apunté hace unas semanas en una nota: el cuello de botella se ha movido de escribir código a decidir en qué orden hacer las cosas.

Después está la *jaggedness* de Karpathy, la inteligencia en picos. El mismo sistema que te escribe una migración de SQL impecable se inventa una cita de un autor que no existe. El mismo que aprueba un examen de Derecho no sabe cuántos dedos tienes en la mano si le preguntas de la forma adecuada. La inteligencia de estos sistemas se parece más a un perfil con picos y valles que a una nota media.

En esta fase la reciprocidad se vuelve multijugador. El modelo usa herramientas, habla con otros modelos, recibe correcciones del compilador y de los tests, y actúa sobre repositorios y servicios. El mundo ya no es solo el texto que leyó: es un entorno que responde. Agüera describe la vida social como multijugador, y en ella el trabajo principal de una mente es modelar otras mentes.

## Por qué se parecen (si no son lo mismo)

He ido descartando explicaciones hasta quedarme con cuatro, ordenadas por peso. La última es la que menos me gusta y probablemente la más honesta.

### La reciprocidad

Es la principal. La inteligencia, dice Agüera, es la capacidad de modelar, predecir e influir en el propio futuro, y esa capacidad se desarrolla siempre en relación con otros. Su frase es que el entorno es el otro. Un niño no aprende a hablar contra un diccionario: aprende en la protoconversación con quien le cuida, que interpreta sus balbuceos como turnos y le responde. El test de Sally-Anne, que mide si un niño puede atribuir una creencia falsa a otra persona, no se resuelve hasta los dos años y medio o los cuatro. Es el hito de la teoría de la mente, y es un hito social: modelar a otro.

Los modelos recorren el mismo tipo de bucle desde el otro lado. El pretraining es una sola dirección: aprenden del rastro que dejan millones de predicciones humanas. El RLHF añade la vuelta: nosotros los modelamos al corregirlos y ellos nos modelan para agradarnos. Los agentes añaden una tercera pata, porque el entorno responde con errores, tests y consecuencias. La maquinaria de dentro es distinta. Lo que se parece son los grados de acoplamiento.

### La compresión predictiva

Para predecir bien el siguiente token hay que construir estructura. La superficie del idioma, qué palabra suele ir detrás de cuál, se aprende con estadística. Sostener un párrafo coherente exige sintaxis, y responder una pregunta exige algo parecido a un modelo del mundo. Esa jerarquía es una propiedad del problema: cualquier sistema con capacidad suficiente y presión predictiva acaba subiendo esos escalones, sea un cerebro o una GPU.

Conviene poner un asterisco. Las "habilidades emergentes" que Wei y sus colegas describieron en 2022 se han cuestionado. Schaeffer y compañía mostraron en 2023 que muchos de esos saltos aparecen y desaparecen según cómo se mida. Hablemos de curvas de competencia en lugar de saltos mágicos. La escalera existe; los peldaños exactos dependen del examen.

### La contingencia

La historia real no fue una marcha lineal hacia estos modelos. Hubo inviernos de la IA y décadas de sistemas expertos que prometían más de lo que daban. En 2017 yo intentaba que un chatbot entendiera "¿qué tiempo hace en Córdoba?" a base de reglas y diccionarios, y no era un problema de esfuerzo: no existían las piezas. Lo que parece una evolución inevitable se ve así solo en retrospectiva.

Cada capa se apiló cuando aparecieron los factores que la hacían posible: internet como corpus, las GPU como cómputo, los transformers como arquitectura y una década de inversión. Nada de eso estaba garantizado. Que hoy un modelo parezca crecer como un niño es el resultado de una acumulación de decisiones y de aciertos parciales, no de un plan.

### La regla con la que medimos

La última causa está en nosotros, en cómo miramos. Los evaluamos con exámenes y criterios humanos, y además los describimos con metáforas humanas. Parte del parecido lo pone el observador.

El caso de Sally-Anne es el mejor ejemplo. Kosinski publicó en 2023 que GPT-4 resolvía las tareas clásicas de falsa creencia, y la noticia corrió como la prueba de que los modelos tenían teoría de la mente. Ullman y sus colegas demostraron el mismo año que bastaba cambiar los nombres o el objeto de la historia para que el rendimiento se derrumbara. Que un modelo pase el test no demuestra que modele mentes; que lo falle no demuestra que no entienda nada. El test mide lo que mide, que es lo que queríamos medir en un niño de cuatro años.

### El orden de adquisición

Si tuviera que quedarme con una diferencia, sería esta. Un niño aprende primero el mundo y después el lenguaje. Antes de hablar ya sabe que los objetos no desaparecen cuando se tapan y que las caras son caras. El lenguaje llega encima de ese sustrato sensorial.

Un modelo aprende al revés. Primero el lenguaje, y con él [la cultura acumulada](/public/papers/llm-as-culture-tech.pdf) de millones de personas, y solo después, si acaso, algo parecido a un modelo del mundo. En lugar de dibujar el mapa caminando, hereda los mapas que escribimos los demás. Esa es la diferencia que explica por qué se parecen sin ser lo mismo: lo que coincide son los niveles de acoplamiento con otros predictores, no la secuencia de competencias.

## Dónde se rompe la escalera

El desarrollo necesita continuidad y los modelos no la tienen. Sus pesos están congelados desde el entrenamiento. La memoria y el contexto le permiten recordar lo que hablamos, pero no cambia con ello. Un niño de cuatro años no vuelve a tener cuatro años, y esa continuidad es la que hace posible crecer.

Tampoco tienen cuerpo ni motivación propia. Aprenden porque una función de pérdida se lo pide, no porque tengan curiosidad. Alison Gopnik describe a los niños como exploradores que prueban cosas sin un objetivo claro, y a los adultos como explotadores de lo que ya saben. Un modelo no juega ni se aburre: entrena. Puede imitar el juego en su salida, pero no hay nadie jugando.

Y luego está la forma. No hay un nivel general que suba con cada generación, hay un perfil que se llena de picos y valles. En los valles aparecen cosas que un niño de tres años hace bien. La teoría de la mente, que era el hito de la reciprocidad, es el ejemplo: aprobada en el examen y suspendida en cuanto el examen cambia un poco.

Agüera insiste en que la inteligencia no es una cosa. Es relacional, distribuida, una propiedad de las redes y de las redes de redes. Visto así, comparar si un modelo es más o menos inteligente que una persona es la pregunta equivocada. La pregunta es qué bucles puede sostener y cuáles no.

OpenAI dice que Astra, su GPT-6, abre la era de la AGI. No tengo forma de saber si eso es cierto, igual que no la tenía cuando Altman hablaba de miles de días. Lo que sí puedo comprobar es lo que estos sistemas hacen cuando los uso. Y lo que hacen, y lo que no, es de lo que va este post.

Continuará.

## Fuentes y para seguir leyendo

- [What is Intelligence?](https://whatisintelligence.antikythera.org/), de Blaise Agüera y Arcas. La predicción como principio, el modelado mutuo y la inteligencia como algo relacional. De aquí salen las citas y la mitad del marco de este post.
- [Evaluating Large Language Models in Theory of Mind Tasks](https://arxiv.org/abs/2302.02083), Kosinski (2023). El artículo que dijo que GPT-4 resolvía el test de Sally-Anne.
- [Large Language Models Fail on Trivial Alterations to Theory-of-Mind Tasks](https://arxiv.org/abs/2302.08399), Ullman et al. (2023). El que demostró que bastaba cambiar un nombre para que el rendimiento se derrumbara.
- [Emergent Abilities of Large Language Models](https://arxiv.org/abs/2206.07682), Wei et al. (2022) y [Are Emergent Abilities of Large Language Models a Mirage?](https://arxiv.org/abs/2304.15004), Schaeffer et al. (2023). Los dos lados de la discusión sobre si las capacidades aparecen por saltos o por cómo las medimos.
- [Language Models Don't Always Say What They Think](https://arxiv.org/abs/2305.04388), Turpin et al. (2023). Sobre cadenas de pensamiento que no cuentan lo que el modelo hizo por dentro.
- [The BabyLM Challenge](https://arxiv.org/abs/2301.11796), Warstadt et al. (2023). Qué pasa cuando se entrena un modelo con la cantidad de texto que ve un niño.
- [The Gardener and the Carpenter](https://alisongopnik.com/), de Alison Gopnik. Niños como exploradores y adultos como explotadores de lo aprendido. En su web hay charlas y artículos si no quieres comprar el libro.
- [The Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html), Rich Sutton (2019). Por qué los métodos generales con cómputo ganan a las reglas escritas a mano, que es la historia de los últimos setenta años.
- [Jagged intelligence](https://x.com/karpathy/status/1816531576228053133?lang=en), Andrej Karpathy. El perfil con picos y valles, en un tuit.

Los hitos técnicos, por orden: [word2vec](https://arxiv.org/abs/1301.3781) (2013), [Attention Is All You Need](https://arxiv.org/abs/1706.03762) (2017), [BERT](https://arxiv.org/abs/1810.04805) (2018), [GPT-2](/public/papers/gpt2.pdf) (2019), [GPT-3](/public/papers/2005.14165v4.gpt3.pdf) (2020), [InstructGPT](https://arxiv.org/abs/2203.02155) (2022), [o1](https://openai.com/index/introducing-openai-o1-preview/) (2024) y [DeepSeek-R1](https://arxiv.org/abs/2501.12948) (2025).

Los modelos de la frontera actual: [Claude Opus 5](https://www.anthropic.com/news/claude-opus-5), [GPT-5.6 Sol](https://openai.com/index/previewing-gpt-5-6-sol/) y [GPT-6 Astra](https://openai.com/index/gpt-6-astra/).

Y lo que escribí antes en este blog sobre el tema: [¿Por qué los LLMs no son loros estocásticos?](/2026/01/30/por-que-los-llms-no-son-loros-estocasticos.html), [Sobre inteligencia](/2024/10/02/sobre-inteligencia.html) y [Mi experiencia en NLP](/2023/07/07/mi-experiencia-nlp.html).
