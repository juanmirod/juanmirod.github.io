---
published: true
title: IA y trabajo
layout: post
tags: [opinión, Inteligencia Artificial]
---

Últimamente veo una tendencia en las charlas y podcasts que escucho. Se puede resumir muy rápido y es una
de esas cosas que una vez la has visto no puedes dejar de verla: todo el mundo dice "La IA no nos va a quitar
el trabajo, va a crear nuevos trabajos, pero eso que están haciendo con IA en MI trabajo me parece muy mal."

!["A writer looking skeptically at a robot that is writing a book" DALL-E 3](/public/img/writer_and_robot.jpeg)

Es algo muy humano, cuando alguien nos viene diciendo "tengo miedo de que la IA me quite el trabajo" le quitamos
importancia y decimos "no, que vá, ahora vas a ser más productivo, o podrás estar más tiempo con tu familia" (como si las empresas fueran a cedernos ese tiempo de buena gana porque ahora somos más productivos...) Pero sin embargo, cuando vemos que un avance de IA de repente puede hacer parte de nuestro trabajo tan bien como nosotros, pero además más rápido y por una fracción del coste, nos empezamos a poner nerviosos y defensivos y decimos que eso no es ético.

No quiero señalar a nadie pero recientemente en un podcast de IA en español esto fue muy evidente para mi. Entrevistaban a alguien que daba cursos sobre IA y que es evangelista sobre el tema, con lo que por supuesto
todo era positivo, _"tenemos que abrazar la IA y aprovechar todas las bondades que tiene"_. Pero en cuanto los entrevistadores llegaron al ejemplo de los deep fakes de audio y video donde un modelo puede generar una versión
totalmente convincente de audio o incluso un avatar que pueda dar las lecciones con tu imagen y tu voz, eso ya
no le pareció tan maravilloso y justo en ese punto abogaba por regulación y respeto de la PI y del Copyright (mira por donde).

Me parece increíblemente ingenuo o hipócrita este juego y lo veo repetido una y otra vez: Periodistas que dicen
que la IA es el futuro, pero que no puede usarse en los periódicos porque no contrasta la verdad o no entiende lo que es real de lo que no (como si ellos lo hicieran). Músicos que dicen que la IA les permite usar las redes sociales y gestionar sus campañas como nunca antes, pero que lo de hacer música hay que regularlo. Diseñadores
que la usan para hacer juegos y ayudarles con el código, pero lo de generar imágenes es una tontería porque las
imágenes no tienen alma o un crimen porque está copiando. Devs que creen que copilot no es para tanto pero que generan imágenes y videos y música con IA...

La lista no acaba nunca y creo que el patrón va quedando claro: todos pensamos que lo que hacemos nosotros es especial, es difícil y nunca podrá hacerlo un ordenador, pero cuando es el trabajo de otra persona que no conocemos tanto, entonces sí lo vemos claro.

Creo que es una trampa mental que dice más de nuestros sesgos que de la IA y que es lo que hace ese mensaje de "la IA no va a quitar empleo, los transformará y creará empleos nuevos" tan popular y fácil de aceptar.

Es fácil ver todas las complicaciones y detalles y toda la profundidad y aprendizaje que tiene nuestro propio trabajo. Yo mismo pienso todos los años que llevo programando y aprendiendo, cómo cada tarea implica comprender el problema, modificar varios ficheros, crear tests, documentación, hablar con personas, clarificar las especificaciones: no es fácil. Es lo que ve un diseñador o lo que ve un músico o un médico o un abogado: no es fácil reemplazarnos.

Pero si lo ponemos todo junto. Si nos separamos un momento de nuestro ego y nuestro orgullo por todo lo que sabemos y hemos conseguido. Si vemos el avance que se está produciendo en todos los campos, en la palabra escrita, en el diseño, en robótica, en planificación, en música, en empatía, en comprensión, traducción, el acceso a los datos y al conocimiento...

Si somos sinceros con todo lo que está pasando ¿Qué nos queda? Voy a intentar hacer el ejercicio mental con el
trabajo que conozco, el de desarrollador. Recientemente se hizo bastante eco la [publicación de un programa agente llamado Devin](https://www.cognition-labs.com/introducing-devin) que según Cognition, la empresa que lo ha creado, fue capaz de completar el 13.86% de las tareas de un benchmark de "tareas que realiza un ingeniero de software" (en realidad el 13.86% de un 25% de esas tareas seleccionadas aleatoriamente, me viene a la cabeza la pregunta de cuántas veces seleccionaron "aleatoriamente" tareas y ejecutaron el modelo sobre ellas)

![Gráfica sobre la comparación de los resultados de Devin en relación a varios LLMs en el benchmark SWE](/public/img/devin.png)

Por su puesto, estas tareas son un subset escogido de gitlab con unos requisitos bastante altos de que estén bien definidas, se hayan cerrado exitosamente con una sola MR, etc. Así que vamos a profundizar un poco más:

Podemos dividir el trabajo de desarroador en varias tareas de alto nivel:

- Entender las especificaciones. Esto es más complicado de lo que parece porque normalmente las especificaciones
  son incompletas y no es suficiente con "entenderlas" también hay que rellenar los huecos. Esta es una de las cosas que más resaltan los programadores cuando dicen que una IA nunca los sustituirá, pero para mi es como lo de la creatividad y las imágenes sin alma: los llms actuales ya muestran una capacidad bastante buena de entender especificaciones e incluso rellenar los huecos con comportamientos esperados. Es el tipico ejemplo de "hazme una web que muestre un cubo en 3D dando vueltas en medio de la pantalla" y ChatGPT sabrá que tiene que usar Threejs, seguramente elija también React si no le dedimos lo contrario e incluso puede que añada el sólo los controles para mover el cubo con el ratón.

- Plantear una solución válida para el problema. Como es lógico, cuanto más grande y complicado es el problema, mas compleja es la solución. Esto es especialmente cierto en productos y servicios que llevan años funcionando y para los que hay que tener encuenta un millar de situaciones que ya manejan, condiciones de proveedores, de la infraestructura, espectativas de los usuarios, etc. Para mi este es el problema más difícil de resolver con una IA general, más bien necesitaríamos una IA fine tuneada para nuestro producto y nuestra empresa, que pudiera acceder a las mismas bases de datos y herramientas que usan los desarrolladores y seguramente también a Jira y a otras herramientas de gestión de proyecto. Estamos muy lejos de esto, ahora mismo hay que dar el problema muy mascado y acotado para que los LLMs actuales puedan hacer algo útil.

- Programar la solución y los tests automáticos que comprueban que realmente la aplicación cumple con las especificaciones. Al final es la parte más fácil de la tarea: una vez están claras las especificaciones, el contexto, el alcance y cómo debe implementarse, solo queda picar código. Aquí es donde más ayudan los llms actuales como copilot o chatgpt, por ahora dirigidos por el desarrollador, aunque poco a poco vamos viendo soluciones de agentes más capaces.

- Desplegar la solución. Esto también puede variar enormemente dependiendo de la infraestructura que tenga nuestra empresa y nuestro proyecto, puede que tengamos un pipeline de integración continua, puede que tengamos que ejecutar algunos pasos o comandos manuales, puede que incluso tengamos que modificar la base de datos o usar algún tipo de gestor de hosting. Dependiendo de cómo de automatizado esté el proceso la IA podrá hacerlo o no, pero es un problema resoluble.

- Debugging and Bugfixing. Por muy buen programador que seas y aunque uses las mejores prácticas disponibles, al final siempre habrá algún defect o bug que resolver: cambios en las especificaciones, casos no contemplados, errores no esperados, comportamientos del usuario que provocan inconsistencias, siempre hay algo que arreglar. Y para eso hay que ser capaz de reproducir el error, entender lo que está pasando y cómo arreglarlo en el código e idealmente escribir un test automático que lo reproduzca para luego arreglarlo en el código. Una vez hecho todo lo anterior el último paso seguramente sea el más sencillo y el que tal vez pueda hacer la IA pronto, aunque hasta ahora tampoco ha demostrado mucha habilidad en este punto.

Hay muchas más tareas, más técnicas, de refactoring, de arquitectura, etc. Pero estas serían las tareas básicas de desarrollo de una nueva funcionalidad. En resumen, creo que es complicado y que tardaremos aún unos años en poder "enchufar" una IA como Devin a nuestro proyecto y que empiece a consumir tickets de Jira o issues de Github y producir MRs/PRs. Será algo progresivo, donde cada vez tendremos más IAs y haciendo más tareas que hasta ahora requerían cierto grado de "entendimiento" o "creatividad" sea como sea que queremos definir esos términos.

!["robot in an office in front of a scrum board looking at the board and deciding what task to take next pixel art" DALL-E 3](/public/img/scrum_robot.jpeg)

Aun así, no veo ningún motivo por el que las máquinas no podrían hacer todas estas tareas con el suficiente trabajo previo de conectarlas a las fuentes y herramientas adecuadas y de automatizar procesos. Supongamos que en 5 años tenemos sistemas capaces de hacer esto, siempre que se les prepare lo suficiente el terreno, y que tal vez sean capaces de resolver el 10% o el 20% de las tareas del backlog, o que nuestro trabajo irá pivotando más a crear esas especificaciones para la IA. Incluso podríamos llegar al punto prometido por BDD donde tenemos una serie de tests funcionales o de aceptación lo suficientemente legibles como para servir de documentación del proyecto a todos los miembros del equipo, incluso a los no técnicos.

Todos esos serían avances increíbles y necesarios, porque la demanda de software de la sociedad actual es enorme. En el caso del software, así como en el de la medicina o la justicia, creo que hay una enorme demanda por destapar que dará trabajo aun por algunas décadas a IAs y humanos sin problema.

Pero me parece terriblemente ingenuo pensar que toda esa productividad extra la vamos a poder aprovechar en estar con nuestra familia o en "pensar en problemas de más alto nivel" en lugar de simplemente acelerar la rueda de hamster del capitalismo donde todos estamos corriendo para no acabar dando vueltas sin control. Creo que es algo que todos los trabajadores debemos empezar a pensar, en cómo vamos a adaptarnos a este cambio y cómo vamos a pedir que ese cambio sea justo y reduzca en lugar de seguir aumentando la desigualdad. Que se reduzca la jornada laboral, que aumenten los salarios o que las IAs y los datacenters paguen impuestos especiales. Hay muchas ideas ahí fuera, pero la idea central es que esa productividad y esos beneficios no sean sólo para unos cuantos. Que todos nos beneficiemos de los avances de la IA, no sólo como consumidores, sino como parte del cambio y del progreso en calidad de vida, que es una tendencia que se ha visto frenada desde los 90 con la congelación de los salarios y el aumento de las ganancias del capital que ha llevado a un aumento de la desigualdad y que si no hacemos algo seguirá aumentando incluso a mayor velocidad gracias a todos estos avances.
