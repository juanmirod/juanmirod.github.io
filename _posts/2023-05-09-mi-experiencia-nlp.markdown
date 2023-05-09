---
published: false
title: Mi experiencia en NLP
layout: post
tags: [opinión, Inteligencia Artificial, NLP] 
---

Hace tiempo que quiero contar esta historia bien contada y creo que es ahora o nunca. Mi experiencia personal con el NLP tiene varios años y creo que explica por qué me ha interesado tanto ChatGPT y por qué creo que esta tecnología tiene tanto potencial. Pero empecemos por el principio:

> Warning! tengo muy mala memoria, cualquier parecido con la realidad será casi accidental, voy a tratar de resumir varios años de trabajo a grosomodo en un post por dejar constancia de mi viaje y por ordenar un poco mis pensamientos, pero como todo este blog, es público por si a alguien más le puede servir.

Alrededor de 2017 empecé a trabajar en una empresa en un proyecto de NLP casi por casualidad. Yo había trabajado hasta ese momento fundamentalmente con la web, haciendo aplicaciones, juegos, pequeñas webs corporativas, campañas de publicidad... nada demasiado sofisticado y eso si casi siempre trabajando como único desarrollador, lo que llaman ahora un "full stack" yo hacía el backend, la base de datos, las migraciones, la administración de sistemas y el frontend. Sólo me faltaba hacer los diseños. A esta empresa y su forma de trabajar le encajó bastante, porque aunque había varios desarrolladores, cada uno trabajábamos de forma independiente en nuestro proyecto, en nuestra oficina personal. En este caso la infra no había que gestionarla (oh yeah) pero todo lo demás sí. Incluso, en mi caso, la planificación del proyecto y la gran mayoría de las decisiones caían de mi parte. Digamos que era una especie de investigación y desarrollo muy aplicado, sin ser yo investigador y sin publicar nada, pero sí que un royo bastante libre de "tienes que hacer esto y tú te apañas el cómo lo consigues"

La tarea por aquel entonces ya empezaba a estar de moda pero aun todo lo que había era muy tosco: programar un asistente virtual. Google tenía Home, Amazon Alexa, iPhone a Siri, no se que fueran super útiles, pero ahí estaban. Y muchas empresas se embarcaron en la tarea de tener su propio chatbot, aunque no tenían muy claro cómo se hacía eso.

En mi caso, al tener mucha libertad y tiempo para desarrollar (no había prácticamente reuniones ni necesidad de coordinación) me empecé a meter en el mundo NLP y en cómo programar un Chatbot.

Empecé por atacarlo por donde sabía. En aquel entonces ya se empezaba a hablar de los modelos de lenguaje, pero yo no tenía ni idea de ML ni recursos para aprender o contratar a nadie, así que por el momento descarté ese camino y fui investigando sobre lenguajes, sistemas expertos, NLP clásico...

Así llegué a ChatScript, que es un lenguaje a medida diseñado y creado por Bruce Wilcox, para programar chatbots. La verdad es que me pareció lo mejor que había en la época. En ese momento la mayoría de la gente usaba o bien un lenguaje anterior parecido pero basado en XML que era un horror (pero con el que estaba programado el chatbot más famoso y exitoso hasta el momento), chatscript, con el que Bruce Wilcox había ganado varias veces el premio Loebner, o python+NLTLK+spacy, que en el momento permitía tokenizar el texto de entrada y luego crear un montón de reglas por palabras, por frases, por entity detection etc, que al final se parecían bastante a chatscript, pero eran bastante más feas de escribir y de entender y probar. Así que me decidí por chatscript.

Encima de chatscript pude hacer bastantes cositas, llegué a hacer un interface gráfico que permitía crear chatbots sin tener ni idea de programar, que leugo compilaba a charscript, generalizando los ejemplos del usuario y que permitía probar y debugear tus conversaciones. Me lo pasé bomba. Pero si has programado algún sistema parecido ya sabrás cómo acaba la cosa.

Tratar de programar un chatbot o un asistente genérico, que responda airosamente a texto libre, escribiendo reglas a mano es una tarea imposible. Por mucho que generalicen tus reglas, mucho entity detection y demás que tengas, siempre llegará el usuario, intentará hablar con tu programa y tu programa fracasará estrepitosamente en entenderlo si no a la primera, a la segunda frase.

Pero entonces en la empresa me hicieron un regalo: Un compañero!! Había otro programador, esta vez alguien especializado en ML, que estaba intentando el mismo problema usando todo ese royo de Python y Spacy, con el mismo o menos éxito que yo, así que nos pusimos los dos a intentar aunar fuerzas....