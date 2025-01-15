---
published: false
title: Ley de Goodhart
layout: post
tags: [opinión, economía]
---

La ley de Goodhart es el nombre de un probervio económico que dice algo así:

> Cuando una medida se convierte en objetivo, deja de ser una buena medida. [1](https://en.wikipedia.org/wiki/Goodhart%27s_law)

Se hizo popular durante el gobierno de Margaret Thatcher gracias a la contribución de Charles Goodhart a una crítica sobre la política monetaria de la época, en su enunciación original:

> Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes. [2](https://link.springer.com/chapter/10.1007/978-1-349-17295-5_4)

Aunque no se le pueda dar el status de ley natural, ha sido referenciada y re-enunciada en numerosas ocasiones y en varios campos, como la sociología, la educación, el análisis de riesgo... y una vez entendida parece de sentido común, aunque a menudo es ignorada a la hora de crear objetivos y mediciones en muchos ámbitos.

## ¿Qué quiere decir?

La ley de Goodhart no es una ley natural porque no se da espontáneamente, no es parte de la física ni la matemática, es un fenómeno que sólo aparece en presencia de cierto grado de inteligencia. Es decir, si a un termostato le damos como objetivo una temparatura concreta es lógico que el termostato mida la temperatura cada X segundos y modifique la potencia en función de la diferencia entre la temperatura actual y la temperatura objetivo...

Pero ¿qué pasa si en lugar de un termostato tenemos una persona encargada de regular la temperatura y le pagamos en función del tiempo que está regulando? Si a esa persona le decimos que el objetivo es alcanzar X temperatura, a lo mejor decide tardar más en alcanzarla para que le paguemos más... Entonces podemos cambiar el objetivo, le pagamos lo mismo independientemente de lo que tarde, siempre que llegue a la temperatura indicada. Cualquiera en lugar de esa persona le daría al máximo a la calefacción, pero claro seguramente eso sea demasiado si no paramos antes de alcanzar la temperatura objetivo...

Es decir la persona, como individuo inteligente con sus propios objetivos, no va a tratar de optimizar sólo el objetivo que le hemos dado, en la mayoría de los casos el objetivo que estamos midiendo será un objetivo intermedio o un sub-objetivo para un fin mayor (cobrar) y por tanto si hay formas de alcanzarlo que optimicen el objetivo final a costa del intermedio, así lo hará.

Este ejemplo parece muy tonto, la tarea es demasiado simple y podríamos especificarla mejor. Pero es lo que pasa siempre que ponemos un objetivo y una forma de medir el progreso a un sistema inteligente. Pasa en educación con los trabajos y los exámenes, que los alumnos estudian para obtener mejor nota en el examen y no para aprender más. Pasa en política, donde los candidatos optimizan el permanecer en el puesto en lugar de servir a la ciudadanía o pensar en largo plazo. En la web, donde el click bait y los bulos sólo buscan aumentar el número de impresiones, en lugar de informar o entretener. Pasa en los KPIs de las empresas, o las medidas de calidad del código, donde si pedimos por ejemplo 100% de cobertura de tests podemos encontrarnos tests que no prueban realmente que el código hace lo que debe, si no que persiguen hacer que se ejecute todo el código.

También pasa con los niños, con animales... Hay cientos de historias y anécdotas en la misma línea, seguramente puedas pensar en alguna. Por ejemplo hay una historia en la que los monitores de los delfines de un acuario decidieron enseñar a los delfines a recoger la basura que caía al acuario. A cambio de traer un vaso, una bolsa o una botella que se hubiera caído, le daban un pez al delfín. Los delfines, para conseguir más peces, empezaron a romper la basura en pedazos más pequeños y así llevarla en más viajes.

No es necesaria mucha inteligencia para que la ley de Goodhart empiece a aplicar. Estoy seguro de que hay ejemplos con insectos y este es uno de los principales argumentos que dificultan la alineación de inteligencias artificiales. En este campo tiene otro nombre: [_reward hacking_](https://ui.stampy.ai/questions/8SIU/What-is-reward-hacking) y también hay cientos de ejemplos. Cualquiera que haya entrenado un sistema de ML te dirá que si no tienes cuidado con limpiar los datos y diseñar bien el entrenamiento, el modelo aprenderá "heurísticas" o "atajos" para obtener los resultados esperados.

El problema subyacente siempre es el mismo: la métrica se puede optimizar de muchas formas y además esa métrica normalmente es un proxy un objetivo cercano al final, pero no es el objetivo final:

![alt text](image-2.png)

En la mayoría de los casos no conocemos el objetivo final o no sabemos cómo llegar a él o es muy difícil de medir.

En el ejemplo de los alumnos y los exámenes. Sería mejor hacer una entrevista personal a cada alumno para entener hasta donde ha aprendido el material y lo ha interiorizado, pero eso es muy costoso y puede llevar a problemas de sesgos, y por tanto necesitar otro tipo de auditorías... Así que la mayoría de los profesores recurren a los trabajos y exámenes, pero todos sabemos que no es lo mismo estudiar para un examen que para comprender la asignatura.

Otro ejemplo típico es en atención al cliente: si premiamos al operador que más clientes atienen, los trabajadores tendrán interés en llamadas rápidas, no en solventar el problema del cliente. Si premiamos al que más tiempo está hablando, puede que se pongan a darle conversación al cliente en lugar de resolver su problema. ¿Cómo medimos que las llamadas son profesionales, resuelven el problema y no se van por las ramas? Muchas empresas recurren a la puntuación del cliente, y muchos trabajadores pedirán al cliente por favor que les ponga buena nota...

Es decir, siempre que tomamos una métrica y la establecemos como objetivo para un agente, ese agente tenderá a alcanzar la meta, independientemente de nuestras intenciones iniciales. Es la historia del rey midas y el genio. El genio siempre te dará lo que has pedido, no lo que querías decir.

Pero las métricas son útiles, ¿cómo si no sabemos dónde estamos? Si queremos saber nuestro progreso hacia un objetivo tenemos que medirlo de alguna forma. El problema no está en medir: está en establecer la métrica como objetivo, en recompensar de alguna forma al agente por mejorar esa métrica. En el caso de los humanos la recompensa puede ser incluso simplemente ver que esa métrica mejora, la mayoría de la gente siente satisfación al saber que está haciendo un buen trabajo. Entonces, ¿cómo podemos hacer para que combatir la ley de Goodhart?

## Cómo evitar la ley de Goodhart

Hay varias estrategias que nos pueden ayudar a evitar que la ley de Goodhart hackee nuestras métricas. Voy a explicarlas de menos a más útil según mi experiencia:

### Mantener la métrica en secreto

Si los agentes no saben que la métrica existe, no pueden optimizarla. Esto puede ser más difícil de lo que parece con humanos adultos ya que somos muy buenos detectanto este tipo de cosas e incluso si no decimos nada pero recompensamos a aquellas personas que mejoran la métrica elegida, el resto del equipo se fijará en los comportamientos e intereses de esa persona para tratar de obtener también la misma recompensa.

### Dejar claro que el objetivo no es optimizar la métrica

### Cambiar/revisar la métrica a menudo

### Tener varias métricas para un mismo objetivo

tldraw: https://www.tldraw.com/r/qtHaS1irG47k0c6cZGWE_?d=v480.-138.1537.844.page
