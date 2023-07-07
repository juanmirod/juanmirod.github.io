---
published: true
title: Mi experiencia en NLP
layout: post
tags: [opinión, Inteligencia Artificial, NLP] 
---

Hace tiempo que quiero contar esta historia bien contada y creo que es ahora o nunca. Mi experiencia personal con el NLP tiene varios años y creo que explica por qué me ha interesado tanto ChatGPT y por qué creo que esta tecnología tiene tanto potencial. Pero empecemos por el principio:

> Warning! tengo muy mala memoria, cualquier parecido con la realidad será casi accidental, voy a tratar de resumir varios años de trabajo a grosomodo en un post por dejar constancia de mi viaje y por ordenar un poco mis pensamientos, pero como todo este blog, es público por si a alguien más le puede servir.

Alrededor de 2017 empecé a trabajar en una empresa en un proyecto de NLP casi por casualidad. Yo había trabajado hasta ese momento fundamentalmente con la web, haciendo aplicaciones, juegos, pequeñas webs corporativas, campañas de publicidad... nada demasiado sofisticado y eso si casi siempre trabajando como único desarrollador, lo que llaman ahora un "full stack": yo hacía el backend, la base de datos, las migraciones, la administración de sistemas y el frontend. Sólo me faltaba hacer los diseños. A esta empresa y su forma de trabajar le encajó bastante, porque aunque había varios desarrolladores, cada uno trabajábamos de forma independiente en nuestro proyecto, en nuestra oficina personal. En este caso la infra no había que gestionarla (oh yeah) pero todo lo demás sí. Incluso, en mi caso, la planificación del proyecto y la gran mayoría de las decisiones caían de mi parte. Digamos que era una especie de investigación y desarrollo muy aplicado, sin ser yo investigador y sin publicar nada, pero sí que un royo bastante libre de "tienes que hacer esto y tú te apañas el cómo lo consigues"

La tarea por aquel entonces ya empezaba a estar de moda pero aun todo lo que había era muy tosco: programar un asistente virtual. Google tenía Home, Amazon Alexa, iPhone a Siri, no es que fueran super útiles, pero ahí estaban. Y muchas empresas se embarcaron en la tarea de tener su propio chatbot, aunque no tenían muy claro cómo se hacía eso.

En mi caso, al tener mucha libertad y tiempo para desarrollar (no había prácticamente reuniones ni necesidad de coordinación) me empecé a meter en el mundo NLP y en cómo programar un Chatbot.

Empecé por atacarlo por donde sabía. En aquel entonces ya se empezaba a hablar de los modelos de lenguaje, pero yo no tenía ni idea de ML ni recursos para aprender o contratar a nadie, así que por el momento descarté ese camino y fui investigando sobre lenguajes, sistemas expertos, NLP clásico...

Así llegué a ChatScript, que es un lenguaje a medida diseñado y creado por Bruce Wilcox, para programar chatbots. La verdad es que me pareció lo mejor que había en la época. En ese momento la mayoría de la gente usaba o bien AIML un lenguaje anterior parecido pero basado en XML que era un horror (pero con el que estaba programado el chatbot más famoso y exitoso hasta el momento y que sigue en activo: [Mitsuku](https://en.wikipedia.org/wiki/Kuki_AI)), chatscript, con el que Bruce Wilcox había ganado varias veces el premio Loebner, o python+NLTLK+spacy, que en el momento permitía tokenizar el texto de entrada y luego crear un montón de reglas por palabras, por frases, por entity detection etc, que al final se parecían bastante a ChatScript, pero eran bastante más feas de escribir y de entender y probar. Así que me decidí por ChatScript.

Encima de ChatScript pude hacer bastantes cositas, llegué a hacer un interface gráfico que permitía crear chatbots sin que el usuario tuviera ni idea de programar, que luego compilaba a ChatScript, generalizando los ejemplos del usuario y que permitía probar y debugar tus conversaciones. Me lo pasé bomba. Pero si has programado algún sistema parecido ya sabrás cómo acaba la cosa.

Yo había estado leyendo mucho, sobre Watson, sobre Yedalog, Datalog, sobre modelos de lenguaje, ML, NLP... Había leído un poco a Norvig... De leer todo esto había sacado muchas ideas y había añadido muchas heurísticas a mi chatbot, había añadido cientos de tests automáticos para saber que al añadir nueva funcionalidad el chatbot no dejaba de responder bien a las acciones que ya conocía... Añadí un pequeño motor lógico que permitía "enseñarle cosas", es decir guardar hechos y relaciones mediante lenguaje más o menos natural... Todo con la intención de construir un sistema lo bastante flexible como para poder seguir añadiéndole "servicios" o piezas que lo hicieran más inteligente, como en Watson. Desde el principio el chatbot podía recibir de input y responder en cualquier idioma gracias a la API de traducción de Google, que hacía la conversión y de algunas reglas para detectar, almacenar el idioma y hacer la conversión de la salida desde ese momento para ese usuario.

Yo estaba bastante contento con mi pequeño sistema experto multirepo que era capaz de responder a un puñado de preguntas, hacer bromas y tener pequeñas conversaciones, siempre que preguntaras la pregunta adecuada...

Tratar de programar un chatbot o un asistente genérico, que responda airosamente a texto libre, escribiendo reglas a mano, es una tarea imposible. Por mucho que generalicen tus reglas, mucho entity detection, bases de datos con ciudades, nombres, animales y demás que tengas, por más que tokenices la frase y que elimines las palabras suplérfluas como los artículos, por más que uses regex en tus reglas, siempre llegará el usuario, intentará hablar con tu programa y tu programa fracasará estrepitosamente en entenderlo si no a la primera, a la segunda frase.

Pero entonces en la empresa me hicieron un regalo: Un compañero!! Había otro programador, esta vez alguien especializado en ML, que estaba intentando el mismo problema usando todo ese royo de Python y Spacy, con el mismo o menos éxito que yo, así que nos pusimos los dos a intentar aunar fuerzas.

Yo ya tenía el servidor funcionando y además como había añadido todos esos módulos independientes y había ido desacoplando todo, podía incorporar otro servidor, en este caso de ML que respondiera a todo aquello que a mi chatbot se le escapaba. Al principio fue solo eso, luego fuimos añadiendo pesos, y si el ML estaba muy seguro de la respuesta, respondía el ML, si no, el chatbot, si el chatbot no tenía respuesta, respondíamos algo genérico.

Para poder encajar todo esto, ayudé un poco con el servidor de Python del sistema de ML, y esto me permitió acercarme un poco más a ese mundo. En el lado de Python usamos flask para el servidor y RASA para el chatbot. RASA tenía apenas unos meses y estaba muy verde, usábamos spacy para tokenización y otras tareas clásicas de NLP pero por debajo de RASA lo customizamos un poco y el otro programador tenía tus propios modelos para detección de entidades y generación de lenguaje.

Todo esto fue antes de GPT2, y tratábamos de seguir los últimos papers que iban saliendo sobre el tema. Yo me había familiarizado con los papers académicos porque sobre todo este tema apenas encontrabas información y cursos más asequibles en la web, y aunque pasaba de largo de las matemáticas, podía leer más o menos los papers que íbamos viendo que podían ser interesantes.

Ni que decir tiene que nuestro chatbot sequía siendo bastante patata, pero tenia un montón de funcionalidades si sabías usarlo. Este era el problema todo el rato antes de GPT3.5, simplemente no existía nada que entendiera la pregunta y diera una respuesta coherente. Ahora mismo nos quejamos de que la IA se inventa cosas, pero el salto es abismal, en 2019 el estado del arte era:

1. Tokenizar y limpiar la entrada
2. Detección de entidades con diccionarios en el lado clásico o con un NER en ML.
3. Clasificación de la intención de la frase: 
    - En el lado clásico esto eran cientos o miles de reglas y regex para tratar de hacer matchear la frase con un patrón conocido.
    - En ML podías entrenar un clasificador con las intenciones que tuvieras y el clsaificador te daba una intención o varias con un margen de confianza.
4. Con la intención, si tienes algo con confianza alta, y tienes las entidades (variables como Paris, Juan o concierto) puedes intentar responder. Si no, tienes un backup tipo ELISA que da respuestas genéricas, intenta ser gracioso o te pide disculpas por que no te ha entendido. 
5. Responder en sí es muy complicado, pongamos que el usuario te pregunta si está lloviendo en Paris. Paris es enorme, tu API del tiempo de pide un código postal o unas coordenadas, tienes que ser capaz de decidir cuáles darles, con una base de datos o otro servicio que te de coordenadas dada una ciudad... y Paris es fácil, pero ¿y si te dicen "Córdoba"? ¿La de España? ¿La de Argentína? ¿La de USA? ¿Desde dónde pregunta el usuario? tal vez eso pueda servir para saber lo que está pidiendo... ¿Y si te pide un dato genérico cómo la temperatura máxima registrada en el Sahara, o una conversión de unidades, o que le des un resumen de un libro o una persona?... es un agujero de conejo que nunca termina. Damos por supuesto un motón de funcionalidad que Google lleva 25 años construyendo con cientos de ingenieros y expertos y miles de millones de webs a las que enlazar.

A los pocos meses llegó GPT2 y nos voló la cabeza, intentamos añadir algo con bERT que diera respuestas libres, se empezó a hablar del prompt engineering... En algún momento, creo que poco antes de irme de ese trabajo llegó GPT3. Y entonces llegó la mudanza, mi cambio de trabajo, la pandemia... y desconecté durante 2 años de todo ese mundo bastante de golpe. 

Nunca había sido capaz de estudiar ML y no entendía cómo se entrenaban los modelos o cómo funcionaban. Además el proceso de entrenamiento siempre me ha parecido algo terriblemente aburrido, tienes que esperar días para ver el resultado y lo más seguro es que lo tires a la basura. El ciclo del feedback es demasiado lento. Me gustaba trabajar con TDD en JavaScript, así que abandoné todo ese mundo pensando que aun no estaba maduro y no merecía la pena.

Imagina mi sorpresa cuando OpenAI anunció ChatGPT y empecé a ver de lo que era capaz. 🤯 (Continuará...)