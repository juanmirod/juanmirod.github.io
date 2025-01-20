---
published: true
title: Ley de Goodhart
layout: post
tags: [opinión, economía]
---

La medición del progreso y el rendimiento es fundamental en prácticamente cualquier actividad humana organizada. Sin embargo, **existe una paradoja interesante que surge cuando intentamos usar estas mediciones para mejorar: en el momento en que establecemos una métrica como objetivo, esta tiende a perder su utilidad como indicador**. Este fenómeno, conocido como la ley de Goodhart es un proverbio económico que dice algo así:

> Cuando una medida se convierte en objetivo, deja de ser una buena medida. [1](https://en.wikipedia.org/wiki/Goodhart%27s_law)

Se hizo popular durante el gobierno de Margaret Thatcher gracias a la contribución de Charles Goodhart a una crítica sobre la política monetaria de la época, en su enunciación original:

> Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes. [2](https://link.springer.com/chapter/10.1007/978-1-349-17295-5_4)

Aunque no se le pueda dar el estatus de ley natural, ha sido referenciada y re-enunciada en numerosas ocasiones y en varios campos, como la sociología, la educación, el análisis de riesgo... y una vez entendida parece de sentido común, aunque a menudo es ignorada a la hora de crear objetivos y mediciones en muchos ámbitos.

## ¿Qué quiere decir?

La ley de Goodhart no es una ley natural porque no se da espontáneamente. No es parte de la física ni la matemática, es un fenómeno que solo aparece en presencia de cierto grado de inteligencia. Es decir, si a un termostato le damos como objetivo una temperatura concreta es lógico que el termostato mida la temperatura cada X segundos y modifique la potencia en función de la diferencia entre la temperatura actual y la temperatura objetivo...

Pero ¿qué pasa si en lugar de un termostato tenemos una persona encargada de regular la temperatura y le pagamos en función del tiempo que está regulando? Si a esa persona le decimos que el objetivo es alcanzar X temperatura, a lo mejor decide tardar más en alcanzarla para que le paguemos más... Entonces podemos cambiar el objetivo, le pagamos lo mismo independientemente de lo que tarde, siempre que llegue a la temperatura indicada. Cualquiera en lugar de esa persona le daría al máximo a la calefacción, pero claro seguramente eso sea demasiado si no paramos antes de alcanzar la temperatura objetivo...

Es decir, la persona, como individuo inteligente con sus propios objetivos, no va a tratar de optimizar solo el objetivo que le hemos dado. En la mayoría de los casos, el objetivo que estamos midiendo será un objetivo intermedio o un subobjetivo para un fin mayor (cobrar) y, por tanto, si hay formas de alcanzarlo que optimicen el objetivo final a costa del intermedio, así lo hará.

Este ejemplo parece muy tonto, la tarea es demasiado simple y podríamos especificarla mejor. Pero es lo que pasa siempre que ponemos un objetivo y una forma de medir el progreso a un sistema inteligente. Pasa en educación con los trabajos y los exámenes, que los alumnos estudian para obtener mejor nota en el examen y no para aprender más. Pasa en política, donde los candidatos optimizan el permanecer en el puesto en lugar de servir a la ciudadanía o pensar a largo plazo. En la web, donde el click bait y los bulos solo buscan aumentar el número de impresiones, en lugar de informar o entretener. Pasa en los KPIs de las empresas, o las medidas de calidad del código, donde si pedimos por ejemplo 100% de cobertura de tests podemos encontrarnos tests que no prueban realmente que el código hace lo que debe, sino que persiguen hacer que se ejecute todo el código.

La [historia está llena de casos documentados](https://en.wikipedia.org/wiki/Perverse_incentive) donde las métricas producen efectos inesperados y contraproducentes. Uno de los más famosos ocurrió en la India colonial, cuando el gobierno británico, preocupado por el número de cobras, ofreció una recompensa por cada cobra muerta. El resultado fue que la gente empezó a criar cobras para cobrar la recompensa. Cuando el gobierno se dio cuenta y canceló el programa, los criadores liberaron todas las cobras, empeorando significativamente el problema inicial.

En el mundo empresarial moderno, tenemos el caso de [Wells Fargo en 2016](https://en.wikipedia.org/wiki/Wells_Fargo_cross-selling_scandal). El banco estableció objetivos agresivos para el número de cuentas abiertas por empleado. El resultado fue que los empleados abrieron millones de cuentas falsas sin el conocimiento de los clientes, lo que llevó a multas millonarias y un daño severo a la reputación del banco.

En educación, la ley [No Child Left Behind](https://en.wikipedia.org/wiki/No_Child_Left_Behind_Act) en Estados Unidos estableció pruebas estandarizadas como la principal métrica para evaluar escuelas y determinar su financiación. El resultado fue que muchas escuelas comenzaron a "enseñar para el examen", reduciendo el tiempo dedicado a materias no evaluadas como arte o música, y en algunos casos incluso se documentaron casos de manipulación de resultados.

No es necesaria mucha inteligencia o sistemas complejos para que la ley de Goodhart empiece a aplicar. También pasa con los niños, con animales... Hay cientos de historias y anécdotas en la misma línea, seguramente puedas pensar en alguna. Por ejemplo, hay una historia en la que los monitores de los delfines de un acuario decidieron enseñar a los delfines a recoger la basura que caía al acuario. A cambio de traer un vaso, una bolsa o una botella que se hubiera caído, le daban un pez al delfín. Los delfines, para conseguir más peces, empezaron a romper la basura en pedazos más pequeños y así llevarla en más viajes.

También es uno de los principales argumentos que dificultan la alineación de inteligencias artificiales. En este campo tiene otros nombres: [specification gaming](https://ui.stampy.ai/questions/92J8/) o [_reward hacking_](https://ui.stampy.ai/questions/8SIU/What-is-reward-hacking) y también hay cientos de ejemplos. Cualquiera que haya entrenado un sistema de ML te dirá que si no tienes cuidado con limpiar los datos y diseñar bien el entrenamiento, el modelo aprenderá "heurísticas" o "atajos" para obtener los resultados esperados.

El problema subyacente siempre es el mismo: la métrica se puede optimizar de muchas formas y además esa métrica normalmente es un proxy, un objetivo cercano al final, pero no es el objetivo final:

![El agente en su estado actual intenta acercarse a un proxy](/public/img/proxy1.png)

En la mayoría de los casos no conocemos el objetivo final o no sabemos cómo llegar a él o es muy difícil de medir.

En el ejemplo de los alumnos y los exámenes, sería mejor hacer una entrevista personal a cada alumno para entender hasta dónde ha aprendido el material y lo ha interiorizado, pero eso es muy costoso y puede llevar a problemas de sesgos, y por tanto necesitar otro tipo de auditorías... Así que la mayoría de los profesores recurren a los trabajos y exámenes, pero todos sabemos que no es lo mismo estudiar para un examen que para comprender la asignatura.

Otro ejemplo típico es en atención al cliente: si premiamos al operador que más clientes atiende, los trabajadores tendrán interés en llamadas rápidas, no en solventar el problema del cliente. Si premiamos al que más tiempo está hablando, puede que se pongan a darle conversación al cliente en lugar de resolver su problema. ¿Cómo medimos que las llamadas son profesionales, resuelven el problema y no se van por las ramas? Muchas empresas recurren a la puntuación del cliente, y muchos trabajadores pedirán al cliente por favor que les ponga buena nota...

Es decir, siempre que tomamos una métrica y la establecemos como objetivo para un agente, ese agente tenderá a alcanzar la meta, independientemente de nuestras intenciones iniciales. Es la historia del rey Midas y el genio. El genio siempre te dará lo que has pedido, no lo que querías decir.

Pero las métricas son útiles, **¿cómo si no sabemos dónde estamos? Si queremos saber nuestro progreso hacia un objetivo tenemos que medirlo de alguna forma.** El problema no está en medir: está en establecer la métrica como objetivo, en recompensar de alguna forma al agente por mejorar esa métrica. En el caso de los humanos la recompensa puede ser incluso simplemente ver que esa métrica mejora, la mayoría de la gente siente satisfacción al saber que está haciendo un buen trabajo. Entonces, ¿cómo podemos hacer para combatir la ley de Goodhart?

## Cómo evitar la ley de Goodhart

Hay varias estrategias que nos pueden ayudar a evitar que la ley de Goodhart hackee nuestras métricas. Voy a explicarlas de menos a más útil según mi experiencia:

### Dejar claro que el objetivo no es optimizar la métrica

![La métrica no es alentada como objetivo](/public/img/metric_not_encouraged.png)

Para mí esta es la estrategia menos efectiva con personas en un ambiente de trabajo. Desde el momento en el que creas una métrica, las personas afectadas van a tratar de mejorarla, ya sea porque piensan que es lo correcto, porque piensan que serán recompensados o simplemente por sentirse bien consigo mismos. Aunque expliquemos que la métrica es solo una forma de tener una medida, pero que no es el objetivo final, todo el mundo lo interpretará como: _"Si hago que mejore la métrica, estaré trabajando en la dirección correcta"_, aunque esto a veces no sea cierto.

Volviendo al ejemplo de la cobertura de código, si tenemos en nuestro repositorio la cobertura actual actualizada, subirla se interpretará como estar mejorando la calidad de la suite de tests, mientras bajarla se verá como empeorarla, aunque todos sabemos que la relación no es directa y que se puede perfectamente mejorar la cobertura con tests que en realidad no estén probando lo que queremos y que por tanto no mejoren la calidad del código.

### Mantener la métrica en secreto

![Mantener la métrica en secreto](/public/img/secret_metric.png)

Si los agentes no saben que la métrica existe, no pueden optimizarla. Esto puede ser más difícil de lo que parece con humanos adultos ya que somos muy buenos detectando este tipo de cosas e incluso si no decimos nada pero recompensamos a aquellas personas que mejoran la métrica elegida, el resto del equipo se fijará en los comportamientos e intereses de esa persona para tratar de obtener también la misma recompensa.

Esto puede ser incluso más perjudicial que el primer caso, porque en este caso tendríamos un proxy de un proxy. Imaginemos que en una clase un profesor pide hacer un trabajo de desarrollo escrito y no especifica el método de evaluación. El profesor pretende que los alumnos no se centren en detalles de presentación o de formato, sino en el desarrollo de la materia. Supongamos ahora que el alumno que mejor trabajo presenta en cuanto a contenido, legibilidad, comprensión de la materia... resulta que también entrega su trabajo encuadernado y con una portada ilustrada. Cuando ven las notas, todos los alumnos ven que el que entregó el libro con portada obtiene la mejor nota, con lo que suponen que la encuadernación y la portada son importantes para el trabajo. En el siguiente trabajo muchos más harán una portada ilustrada y encuadernarán su trabajo aunque se esfuercen lo mismo o menos en el contenido.

### Cambiar/revisar la métrica a menudo

![El agente en su estado actual intenta acercarse a un proxy](/public/img/proxy1.png)

![Revisión de la métrica por otro proxy](/public/img/step2.png)

Cambiar la métrica hace que las mecánicas que se habían construido alrededor de esa métrica tengan que cambiar. Además revisar la métrica nos permite obtener aquella que más nos acerca al objetivo en cada momento. Este es el escenario en el que se encuentran ahora las empresas de IA que intentan alcanzar lo que llaman Inteligencia Artificial General (IAG). Los proxies en este caso son los benchmarks que utilizan estas empresas. Como los LLMs son capaces de mantener conversaciones a nivel humano, el test de Turing parece superado, encima de este ya hace años aparecieron otros benchmarks como [Winograd](/public/papers/winograd_2201.02387v3.pdf), [MMLU](/public/papers/mmlu_2009.03300v3.pdf), o GSM8k. Cuando, a su vez, esos benchmarks se consideraron "saturados" (los modelos puntúan al nivel humano) se siguió buscando y construyendo otros benchmarks, como el [ARC AGI Challenge](/public/papers/arc-AGI_.pdf) o el [SWE-bench](/public/papers/swe-bench_2310.06770v3.pdf)

Ninguno de estos benchmarks o los muchos otros que se han utilizado hasta ahora mide realmente todos los aspectos de la inteligencia humana, pero ir añadiendo nuevos benchmarks permite seguir midiendo y no quedarse atascado en un límite local o no saber si realmente los modelos están mejorando.

### Tener varias métricas para un mismo objetivo

![Intentar acercarse a varias métricas a la vez](/public/img/multiple_metrics.png)

Esta estrategia es parecida a la anterior, de hecho también es la que utilizan las empresas de IA para medir sus nuevos modelos. No utilizan solo un benchmark, sino muchos. Y normalmente un modelo nuevo será el mejor en algunos de ellos, pero no en todos. O tal vez sea muy bueno en uno o dos, pero esté por debajo de los últimos modelos en todos los demás.

En el caso en el que las métricas no se saturen, es decir, podamos seguir mejorándolas, podemos tener varias simultáneamente. Esto nos permite no caer en heurísticas o mecánicas que optimicen solo una métrica y seguramente nos haga generalizar más la solución y acercarnos más a trabajar hacia el objetivo final.

Esto también es lo que hacen algunos profesores al medir a los alumnos no sólo por un examen final, si no por varios exámenes y trabajos de diferentes características, que permitan tener una imagen más completa del aprendizaje del alumno.

## Conclusión

La ley de Goodhart nos recuerda algo fundamental sobre la naturaleza de la medición y los objetivos: la realidad es siempre más compleja que nuestras métricas. Ya sea en educación, gestión empresarial, desarrollo de software o incluso en inteligencia artificial, necesitamos ser conscientes de que cualquier sistema de medición puede ser "hackeado" si se convierte en el objetivo principal.

La solución no está en dejar de medir - las métricas son herramientas valiosas que nos ayudan a entender y mejorar nuestros sistemas. La clave está en utilizarlas de manera inteligente: combinando múltiples métricas, revisándolas periódicamente y, sobre todo, recordando que son indicadores aproximados de lo que realmente queremos lograr, no el objetivo en sí mismo.
