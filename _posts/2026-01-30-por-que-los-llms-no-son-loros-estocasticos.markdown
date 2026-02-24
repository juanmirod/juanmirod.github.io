---
title: "¿Por qué los LLMs no son loros estocásticos?"
layout: post
published: false
tags: [LLMs, inteligencia artificial]
---

Algo que me sigo encontrando, sobre todo en opiniones de personas más de humanidades o de círculos artísticos, pero también de algunos ingenieros, es que los LLMs son "loros estocásticos" que no piensan ni razonan, que sólo repiten lo que han visto en el entrenamiento, en función a la estadística. Esto suele llevar a estas personas a usar este "argumento" para decir que no pueden sustituir a las personas o que no son creativos porque sólo reproducen lo que han visto, o que no entienden lo que dicen porque en realidad no piensan. Todos estos argumentos no se basan más que en la propia intuición de la persona que los esgrime y un (paper
de Emili Bender y Timnit Grebu de 2021)[/public/papers/2021-bender-parrots.pdf].

El paper en sí tiene su importancia y valor histórico, en el momento en el que salió modelos com BERT y más tarde GPT3 o LaMDA estaban dando bastante que hablar y las autoras se cuestionan ciertas preguntas éticas sobre el uso de esos modelos, su utilidad, su consumo y la (falta de) planificación y rigor en su entrenamiento.

Pero hace 5 años de ese paper. La tesis de que los LLMs lo único que hacen es predecir la siguiente palabra porque para eso se les ha entrenado empieza a no ser tan real... Para empezar ahora sí que se pone mucho más cuidado en limpiar y enriquecer los datos de entrenamiento, los modelos han evolucionado mucho e incluyen centenares de optimizaciones, a nivel más grueso el MoE (mixture of experts) o que un modelo en realidad está compuesto por varios modelos especializados en varios ámbitos en la fase de post entrenamiento, además de mejoras en las capas de atención, las cachés KQ, mejoras en la paralelización, en el destilamiento de modelos pequeños y rápido, etc.

Pero sobre todo la gran diferencia es que los modelos de hoy no sólo hacne pre entreno con millones de ejemplos para predecir el siguiente token (que no palabra) sino que después hacen un post entrenamiento sobre el que se evalúa al modelo en cadenas de pensamiento para completar respuestas, uso de herramientas y resolución de problemas.

> Es decir, los modelos ya no predicen "la siguiente palabra", más bien predicen la cadena de pensamiento y acciones necesarias para responder una pregunta o resolver un problema.

Este paradigma es fundamentalmente diferente. No pensaríamos que es lo mismo una IA de ajedrez que trata de predecir el mejor siguiente movimiento a una que trata de predecir todos los movimientos desde un tablero dado a conseguir el jaque mate. La primera tal vez pueda evaluar cuál es el movimiento más seguro o que más puntos asegura en función a alguna valoración del tablero y el valor de las piezas. El segundo tiene que de alguna construir un árbol de jugadas que le permita encontrar la forma de ganar.

Si comparamos a grandes rasgos el entrenamiento de un modelo como GPT3 y otro como Opus4.6 veremos que hay grandes diferencias:

### GPT3

![diagrama de las fases de entrenamiento de GPT3, consistente sobre todo en el preentrenamiento](/public/img/gpt3-training.png)

Una cosa que no recordamos de GPT3 es que ni siquiera era un modelo que produjera respuestas si no se tenía mucho cuidado en construir el prompt adecuado. Era un modelo puro de autocompletar, que aun así sorprendía por las capacidades que tenía de completar por ejemplo un problema con la respuesta correcta o una noticia que sonaba convincente o una respuesta con few shot prompting... Pero también era totalmente abierto a responder locuras, a reproducir insultos, discursos de odio, hacks y a inventarse lo primero que sonaba bien... Lo que hoy se conoce como "jail breaks" era tan simple como dejar un prompt sin terminar del estilo de "la mejor forma de fabricar dinamita casera es " y el modelo continuaba sin problema. Por supuesto los modelos actuales siguen aluciando y cometiendo errores, pero ni mucho menos con la misma frecuencia.

### SOTA 2026

![diagrama de entrenamiento 2026 con MoE, varias fases de post entrenamiento y red teaming](/public/img/2026-training.png)
