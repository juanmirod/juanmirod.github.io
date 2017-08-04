---
published: true
title: Ingeniería del software
layout: post
tags: [programación,ingeniería] 
---

![foto del ENIAC uno de los primeros ordenadores, 1946, fuente: wikipedia](/public/img/ENIAC.jpg "Foto del ENIAC, 1946, fuente: wikipedia")

Este año ha coincidido que en el nuevo trabajo estoy haciendo más desarrollo de infraestructura y de arquitectura en general, lo que me obliga a pensar más en desarrollos escalables y a la vez he cursado la asignatura de Introducción a la Ingeniería del Software por la UNED.

Cuando hice la ITIS en Málaga la Ingeniería del Software era una asignatura optativa y daba la casualidad de que el profesor era el peor de toda la facultad, así que, pese a que me interesaba mucho preferí ahorrármela por mi salud mental y emocional.

Desde entonces he trabajado en empresas de diferentes tamaños y en proyectos de todo tipo, pero las metodologías de la IdS siempre han estado ausentes. Incluso en empresas medianas o con bases de código de varios años y equipos de 20 o 30 personas, no solías ver Diagramas UML ni documentos de diseño o de especificaciones ni pruebas automatizadas ni nada de eso.

Lo más cercano fue cuando trabajé para el Ministerio de Educación, que teníamos una reunión mensual con acta y aprobación del acta y peticiones de permiso y notificaciones para cada cambio. Pero todo esto era más para la facturación y para cubrirse las espaldas que de cara a la arquitectura o al desarrollo.

Al final siempre pasa algo así, lo importante son las fechas de entrega, y por el camino se caen las especificaciones, el diseño y por supuesto las pruebas automáticas.

Todo esto es lo que las metodologías ágiles vinieron a arreglar hace ya como 15 años, pero en la mayoría de las empresas siguen hablando de ellas como algo _"nuevo"_ de lo que no se fian mucho y que si se implementa se hace [mal y a medias](https://www.martinfowler.com/bliki/FlaccidScrum.html) al menos en España.

En la asignatura de IdS de la UNED, para mi decepción, no se habla de la revolución de las metodologías ágiles sino que siguen anclados en el ciclo de vida en cascada o en V y demás metodologías del siglo pasado. Salvo una breve pero loable mención a Ken Beck y a XP, todo el libro de referencia está lleno de citas a libros y artículos de mediados de los 80, como si en una asignatura de arquitectura de computadores nos enseñaran a montar un ordenador con válvulas de vacío y cables.

![foto del Colossus, el primer ordenador electrónico programable, 1943, fuente: wikipedia](/public/img/Colossus.jpg "Foto del Colossus, 1943, fuente: wikipedia")

Sin embargo, y pese a toda esa caspa, leer sobre arquitectura, diagramas, normalización de bases de datos, análisis de requisitos, etc. me ha ayudado a pensar mejor en cómo estructurar mi código y me ha enseñado algunos diagramas útiles para ayudarme a pensar en la arquitectura de mi aplicación o en cómo interactuan los diferentes componentes.

Un diagrama en ocasiones es la mejor chuleta de apoyo a la documentación, es una forma de tener un esquema básico que te recuerda dónde estás en el desarrollo y qué otros módulos o aplicaciones interactúan con la tuya.

Todo tiene su lugar. No se me ocurriría tratar de crear un documento de especificacion para la aplicación que estoy desarrollando, ¡Si ni quiera me han dado unos requisitos concretos! Estoy trabajando sobre unas cuantas frases de "quiero algo que haga esto y se parezca a aquello" lo que suele ser habitual en los trabajos que he tenido, de ahí a unas especificaciones va un mundo ya no digamos a tratar de modelar todo en UML.

En mi experiencia, los clientes, la gente de márketing o los propios CEOs o jefes de proyecto no tienen unas especificaciones concretas. Quieren algo que les solucione un problema o que mejore una forma de trabajar, pero no saben cómo hacerlo. 

Hoy en día, si la solución es algo concreto a lo que pueden poner nombre (un blog, un gestor de contabilidad, un ERM, un CSM, una tienda online, etc...) Ya existirá una solución paquetizada o un servicio que cubra esa necesidad. Cuando vamos al detalle, a donde hay que desarrollar algo a medida o nuevo, el cliente no sabe la funcionalidad que ese algo tendrá que tener, no sabe como alcanzarlo y normalmente no sabe ni la forma que debería tener. 

De ahí las metodologías ágiles: Hay que reducir el ciclo de retroalimentación lo más posible. Enseñar una funcionalidad al cliente, escuchar su opinión e iterar. Iterar rápido y corregir el rumbo en cada iteración para ir acercándonos mediante gradientes a la solución que busca el cliente, en lugar de salirnos por la tangente de un diseño que ideamos tras las primera semana de reuniones y que meses después no se parece en nada a lo que el cliente espera.

Y para iterar es fundamental poder refactorizar, poder publicar cambios con un comando y dar marcha atrás con otro, tener tests de regresión automatizados que nos aseguren que en cada iteración no perdemos funcionalidad anterior.

El análisis y el diseño no es una parte previa al desarrollo, es necesariamente parte del desarrollo y sin conocimiento del problema y del contexto en el que se encuentra [serás un desarrollador menos valorado](https://www.linkedin.com/pulse/hard-thing-software-development-jesse-watson?__s=fotpfppvyfawf44bmqhj) y no podrás hacer un buen trabajo. El desarrollo de software no es simplemente apilar líneas de código como el que apila ladrillos, requiere un esfuerzo creativo y tomar muchas decisiones sobre como afrontar cada problema y cómo afectará cada decisión a largo plazo.

Desarrollar software tampoco es como construir edificios o coches en el sentido de que o hay una cadena de montaje que cueste millones parar ni un enorme bloque de hormigón que no se pueda mover. No existe una forma concreta de hacer las cosas, no porque no exista, sino porque **en eso es en lo que somos mejores: cada vez que encontramos una buena metodología o una un buen algoritmo convertimos esas partes en librerías, frameworks, automatismos, etc para poder reutilizarlo y no tener que preocuparnos más por eso**. 

El software es flexible, es reutilizable, es portable y es caduco. No podemos poner de ejemplo los planos de un edificio porque en nuestro caso los usuarios vendrán y querrán mover la puerta de entrada, conectar la segunda planta con la sexta mediante un pasillo (no, un ascensor no, un pasillo), cambiar el tamaño del ascensor mientras está en uso y usar la piscina como pista de padel porque resulta que las piscinas ya no se llevan. Todo eso en el primer mes de uso. 

**El software cambia muy rápido**, cambia constantemente y toda la teoría detrás del ciclo de vida en cascada está bien para desarrollar standards, para desarrollar hardware o para otro tipo de producto no moldeable, pero no para la mayoría del software.

Dicho todo esto, sigo pensando que **el diseño y el análisis tienen su lugar en el desarrollo de software, pero no como una disciplina separada de la implementación, sino como una forma de mantener, mejorar y evaluar el código**, de decidir dónde merece la pena gastar algo de tiempo en refactorizar, dónde hay que dividir un módulo o cómo organizar una arquitectura grande de forma que el trabajo se pueda dividir fácilmente. **El eterno elefante en la habitación que no quieren ver los que defienden esa separación es que el único nivel lo suficientemente detallado para especificar qué debe hacer la máquina es el código**. Las herramientas de diseño, los gráficos, las especificaciones pueden darnos una falsa sansación de que estamos especificando el problema, pero aún no es posible especificarlo lo suficiente como para que la implementación sea trivial (¡Entonces no haría falta implementar!) y al final el diseño inicial no es más que un corsé de otra talla que tenemos que desmontar por completo y volver a montar para que se adapte a nuestro producto, nuestro cliente y nuestro equipo.

Esto no es algo que diga solo yo aquí, es algo que han dicho otros ingenieros y divulgadores mucho más sabios y experimentados que yo, solo repito sus palabras a modo de resumen personal. Y por si alguien ahí sigue pensando que la arquitectura en cascada es una buena idea y no cree que yo tenga ninguna autoridad en el tema (tiene razón en esa última parte), termino con algunos enlaces mucho más interesantes e instructivos que mi opinión personal:

[Martin Fowler: Who needs architects](https://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf)

[Martin Fowler: Is Design Dead?](https://www.martinfowler.com/articles/designDead.html)

[Neal Ford: Investigating Architecture and design](https://www.ibm.com/developerworks/java/library/j-eaed1/index.html)*

[Michael Feathers: Emergent Optimization in Test Driven Design](https://drive.google.com/file/d/0B8ZX1RoWHuiJandXOHRSSG1BV1U/view)

