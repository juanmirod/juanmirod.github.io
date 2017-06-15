---
published: false
title: Ingeniería del software
layout: post
tags: [programación,ingeniería] 
---
Este año ha coincidido que en el nuevo trabajo estoy haciendo más desarrollo de infraestructura y de arquitectura en general y pensando más en desarrollos escalables y a la vez he cursado la asignatura de Introducción a la Ingeniería del Software por la UNED.

Cuando hice la ITIS en Málaga la Ingeniería del Software era una asignatura optativa y daba la casualidad de que el profesor era el peor de toda la facultad, así que, pese a que me interesaba mucho preferí ahorrármela por mi salud emocional.

Desde entonces he trabajado en empresas de diferentes tamaños y en proyectos de todo tipo, pero las metodologías de la IdS siempre han estado ausentes, incluso en empresas grandes o con bases de código de varios años y equipos de 20 o 30 personas, no solías ver Diagramas UML ni documentos de diseño o de especificaciones ni pruebas automatizadas ni nada de eso.

Lo más cercano fue cuando trabajé para el Ministerio de Educación, que teníamos una reunión mensual con acta y aprovación del acta y peticiones de permiso y notificaciones para cada cambio. Pero todo esto era más para la facturación y para cubrirse las espaldas que de cara a la arquitectura o al desarrollo.

Al final siempre pasa algo así, lo importante son las fechas de entrega, y por el camino se caen las especificaciones, el diseño y por supuesto las pruebas automáticas.

Todo esto es lo que las metodologías ágiles vinieron a arreglar hace ya como 15 años, pero en la mayoría de las empresas siguen hablando de ellas como algo "nuevo" de lo que no se fian mucho y que si se implementa se hace [mal y a medias](https://www.martinfowler.com/bliki/FlaccidScrum.html).

En la asignatura de IdS de la UNED, para mi decepción, no se habla de la revolución de las metodologías ágiles sino que siguen anclados en el ciclo de vida en cascada o en V y demás metodologías del siglo pasado. Salvo una breve pero loable mención a Ken Beck y a XP, todo el libro de referencia está lleno de citas a libros y artículos de mediados de los 80, como si en una asignatura de arquitectura de computadores nos enseñaran a montar un ordenador con válvulas de vacío y cables.

[foto del colosus]

Sin embargo, y pese a toda esa caspa, leer sobre arquitectura, diagramas, normalización de bases de datos, análisis de requisitos, etc me ha ayudado a pensar mejor en cómo estructurar mi código y me ha enseñado algunos diagramas útiles para ayudarme a pensar en la arquitectura de mi aplicación o en cómo interactuan los diferentes componentes.

Un diagrama en ocasiones es la mejor chuleta de apoyo a la documentación, es una forma de tener un esquema básico que te recuerda dónde estás en el desarrollo y qué otros módulos o aplicaciones interactúan con la tuya.

Todo tiene su lugar. No se me ocurriría tratar de crear un documento de especificacion para la aplicación que estoy desarrollando, ¡Si ni quiera me han dado unos requisitos concretos! Estoy trabajando sobre unas cuantas frases de "quiero algo que haga esto y se parezca a aquello" lo que suele ser habitual en los trabajos que he tenido, de ahí a unas especificaciones va un mundo ya no digamos a tratar de modelar todo en UML.

En mi experiencia, los clientes, la gente de márketing o los propios CEOs o jefes de proyecto no tienen unas especificaciones concretas. Quieren algo que les solucione un problema o que mejore una forma de trabajar, pero no saben cómo hacerlo. 

Hoy en día, si la solución es algo concreto a lo que pueden poner nombre (un blog, un gestor de contabilidad, un ERM, un CSM, una tienda online, etc...) Ya existirá una solución paquetizada o un servicio que cubra esa necesidad. Cuando vamos al detalle, a donde hay que desarrollar algo a medida o nuevo, no saben la funcionalidad que ese algo tendrá que tener, no saben como alcanzarlo y normalmente no saben ni la forma que debería tener. 

De ahí las metodologías ágiles. Hay que reducir el ciclo de retroalimentación lo más posible. Enseñar una funcionalidad al cliente, escuchar su opinión e iterar. Iterar rápido y corregir el rumbo en cada iteración para ir acercándonos mediante gradientes a la solución que busca el cliente, en lugar de salirnos por la tangente de un diseño que ideamos tras las primera semana de reuniones y que meses después no se parece en nada a lo que el cliente espera.

I para iterar es fundamental poder refactorizar, poder publicar cambios con un comando y dar marcha atrás con otro, tener tests de regresión automatizados que nos aseguren que en cada iteración no perdemos funcionalidad anterior.

Desarrollar software no es construir edificios o coches. No hay una cadena de montaje que cueste millones parar ni un enorme bloque de hormigón que no se pueda mover. El software es flexible, es portable y es caduco. No podemos poner de ejemplo los planos de un edificio porque en nuestro caso los usuarios vendrán y querrán mover la puerta de entrada, conectar la segunda planta con la sexta mediante un pasillo porque el ascensor es demasiado lento, cambiar el tamaño del ascensor ya que estamos y usar la piscina como pista de padel porque resulta que las piscinas ya no se llevan. Todo eso en el primer mes de uso. El software cambia muy rápido, cambia constantemente y toda la teoría detrás del ciclo de vida en cascada está bien para desarrollar standards, para desarrollar hardware o para otro tipo de producto no moldeable, pero no para la mayoría del software.

 

