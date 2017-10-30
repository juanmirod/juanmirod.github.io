---
published: true
title: Generadores de código, desarrollo automático y por qué es difícil una IA que programe.
description: Artículo de opinión sobre por qué es difícil crear programas que desarrollen aplicaciones y cómo esto enlaza con los problemas de la Inteligencia Artificial General.
layout: post
tags: [opinion]
---

Es evidente, que gran parte de lo que hacemos los desarrolladores es suplantarnos a nosotros mismos. O dicho de otra forma, automatizar procesos que podríamos hacer a mano, pero que podemos automatizar, mejorando en velocidad, eficiencia, tolerancia a errores, reproducibilidad, portabilidad, independencia... 

En todos los proyectos hay partes del desarrollo tediosas o repetitivas que solemos automatizar: tests runners, compilación, generadores de clases o componentes, procesos de empaquetado, implantación, etc, etc.

La pregunta inevitable entonces es: 

> **¿Hasta donde podemos automatizar?** **¿Podemos crear un programa que desarrolle programas?**

![Fotograma mostrando el Arquitecto de Matrix Revolution](/public/img/architect.png)

Como todo desarrollador, en más de una ocasión me he planteado cómo podría crearse un programa que generara gran parte o todo el código que escribo. Muchos dirán que hacer un programa con la capacidad de abstracción como para comprender un problema y crear una solución sería una Inteligencia Artificial General, pero si en lugar de decirlo así, planteas el problema como **traducir una serie de especificaciones a una serie de instrucciones en un lenguage de programación de alto nivel** El problema empieza a parecer mucho menos abstracto y etéreo y más metódico y concienzudo, que es donde los ordenadores nos ganan _de calle_.

En este sentido, hay varios caminos que se han intentado seguir hasta ahora para conseguir acercarse al _"programa que programe"_ o dicho de otra manera, para depender menos, o nada, de los desarrolladores.

El extremo son los CMS como Wordpress, Prestashop o Magento. Sistemas completamente funcionales, con los que podemos tener una web funcionando con poco más que apretar un botón, mientras siguen pudiendose extender y modificar mediante código. 

Antes, para crear una web o un blog necesitábamos contratar un servicio de hosting, programar cada una de las páginas y sus interacciones, diseñar y crear la base de datos, etc. Ahora pulsamos un botón y tenemos una nueva instancia de Wordpress y podemos cambiar su apariencia y funcionalidad con unos cuantos clicks de ratón.

Este blog, por poner otro ejemplo, está alojado en github utilizando Jekyll y Github Pages. Ahora mismo estoy editando un fichero de texto en mi ordenador, pero cuando ejecuto `git push` el texto se sube a github, dispara un proceso que compila el HTML de la página y lo sube a los CDN de github. Solo con un comando, no tengo que preocuparme de servidores, ni bases de datos, ni de programar nada.

Pero claro, estos sistemas tienen una función concreta, si quieres _"otra cosa"_, un producto o servicio software nuevo, tienes que desarrollarlo, y para eso necesitarás un programador. Aunque tampoco empezamos sobre un lienzo vacío:

**Lo más habitual son los frameworks de desarrollo**. Angular, React, Vue, Laravel, Symfony, Sprint, Play, etc. Son conjuntos de librerías construidas sobre el lenguaje de turno que nos permiten acelerar y dar estructura al desarrollo sin tener que detenernos en muchos detalles de diseño. Estos frameworks establecen patrones y organizan el código de forma que nos ahorran un montón de tiempo y decisiones, permitiéndonos desarrollar aplicaciones más grandes y fiables. 

**Cucumber y el desarrollo de tests de comportamiento** en general son una aproximación a una forma de escribir especificaciones que den más control a los gestores o jefes de producto. En realidad cucumber no automatiza el desarrollo, solo las especificaciones, de forma que son comprobables y reproducibles. Pero no pueden generar el código de la aplicación por si mismas, al menos no hasta ahora.

Las DSLs o **lenguajes de dominio específico**, son algo parecido. Se crea un lenguaje de muy alto nivel y centrado en el dominio concreto del negocio, de forma que sea fácil para los expertos no desarrolladores escribir programas en este nuevo lenguaje específico. 

Es más claro y exitoso ejemplo de esto son las hojas de excel. En excel, cada negocio, o incluso cada usuario, crea sus propias reglas, tablas y cálculos, que hacen la función de una DSL. De esta forma se pueden conseguir cálculos complejos sin necesidad de un desarrollador profesional. Excel se usa en muchas profesiones que no consideramos cercanas al desarrollo, pero que utilizan la potencia de un lenguaje de alto nivel, declarativo y multidioma para programar algoritmos casi sin saberlo.

Las redes neuronales, y en especial **las redes de aprendizaje profundo**, son otra aproximación a la generación de programas que suplanten sistemas desarrollados a mano. Las redes de aprendizaje profundo están demostrando mejorar los resultados de enormes sistemas expertos o de reglas desarrollados a mano durante años, reduciendo el tiempo de desarrollo enormemente. Hoy en día, clasifican imágenes, emails, posts en redes sociales, reconocen personas e incluso diseñan piezas de ingeniería que usan menos material y son más resistentes. Personalmente tengo mucha confianza en que las redes neuronales solucionarán muchos de los problemas actuales, actualmente hay muchos equipos con mucho talento investigando arquitecturas de redes neuronales que resuelven problemas impensables hace unos años, merecen mención especial en este campo DeepMind y [Demis Hassabis, del que hablo un poco en este otro artículo](http://juanmirod.github.io/2016/03/13/Demis-Hassabis-el-hombre-que-nos-dejara-obsoletos.html).

Otro gran avance que ha conseguido escalar los sistemas a nivel mundial es **"la nube"**. Los contenedores y los servidores virtuales que nos abstraen del problema de tener un servidor físico en un lugar concreto hacen que no necesitemos una armada de desarrolladores para poder escalar nuestro sistema a nivel mundial.

Pero todos estos son aplicaciones específicas dentro de dominios específicos. Al final no son más que soluciones (mucho) más complejas, pero parecidas a _"automatizar el build"_. No le damos un problema abierto a la máquina y esta nos devuelve un programa que lo resuelve, sino que dentro de un dominio conocido y un rango de parámetros (enorme en algunos casos) la máquina nos devuelve una respuesta, una plantilla, o una estimación.

Y es que hasta ahora esa es la forma que entendemos que funciona una máquina: le damos un input y nos devuelve un output. Pregunta-respuesta. Pero, hasta ahora al menos, no hemos conseguido crear una máquina que _"razone"_ en el sentido amplio de la palabra.

Es de nuevo el problema de la IAG. 

Por ejemplo, El reto del coche autónomo es enorme ya que es el primer robot autoguiado que se mueve en un entorno real con seres humanos (autopilotar un barco o un avión _parece_ un juego de niños en comparación) La cantidad de trabajo necesario para conseguir que los diferentes sistemas funcionen juntos y de acuerdo a toda una serie de normas escritas y no escritas para que un coche autónomo ceda el paso al incorporarse a una rotonda es enorme. Necesitamos un modelo muy detallado que requiere mucho conocimiento tanto del mundo real (los otros coches, la carretera, el tiempo), como de las reglas que queremos que cumpla el robot, como del propio funcionamiento del robot (¿Cuando acelera el coche? ¿Cuánto peso está cargando? ¿Tengo tiempo de incorporarme al carril que quiero? lo que se llama _introspección_).

Pero aun así, una cosa es enseñar a un robot a conducir un coche, de acuerdo a una serie de lecturas de sus sensores y una serie de reglas y el conocimiento del _hardware_, y otra diferente, es tratar de hacer un programa que comprenda por qué necesitamos coches autónomos, cómo deben ser y que sea capaz de diseñarlos y/o codificarlos. El número de variables y decisiones en el segundo problema es muchísimo mayor. O dicho de otra forma, mucha gente puede conducir un coche, pero solo un equipo de expertos ingenieros, diseñadores y desarrolladores puede producir un conche autónomo.

El problema, no sólo de un coche autónomo se mueve por el mundo, sino de cualquier sistema complejo, es que debe tener en cuenta un millar de factores diferentes. El mundo real, el propio hardware y software sobre el que funciona y con el que se produce... hay cientos de detalles que aun no hemos conseguido abstraer, el trabajo de desarrollador tiene mucho de tener puentes para que unas librerías funcionen con otras. 

Al final, cualquier especificación lo suficientemente detallada como para generar un programa ejecutable, tiene que bajar al nivel del código. Y esto es así porque tiene que contener cientos, si no miles o decenas de miles, de condiciones, instrucciones y casos específicos que responden a exigencias concretas del cliente, el entorno y las librerías y APIs con las que interacciona el sistema a especificar. 

Cuando trato de explicar esto a alguien siempre be acuerdo del [sketch de Tip y Col sobre cómo llenar un vaso de agua.](https://www.youtube.com/watch?v=qHqDpUpbpJI) y es que, hasta en el gesto más sencillo, hay mil presunciones y mil formas en las que podríamos hacerlo mal.

En resumen, podemos automatizar tareas concretas, cada vez más y más amplias o que abarcan más capacidades que hasta ahora considerábamos humanas, como identificar una voz o un rostro, etiquetar una fotografía con conceptos que aparecen en ella, conducir un coche o crear un diseño de acuerdo a unas normas. Pero aún nos queda mucho camino para automatizar totalmente el trabajo de los desarrolladores. Poco a poco vamos poniendo nuevas capas de abstracción sobre las anteriores, para conseguir cada vez abarcar más con menos. Pero la clave está en que **siempre, sobre la última capa, puedes poner desarrolladores a ampliar y conectar funcionalidades de formas nuevas y resolver problemas que antes no estaban a tu alcance. Y eso, por ahora, solo lo puede hacer un ser humano.** 

**Resolver un problema complejo extrapolando a partir de tus conocimientos require de una capacidad de raciocinio que, solo tenemos nosotros.**

En la actualidad, las distintas formas de generación de código nos sirven para llegar cada vez más lejos. Cuantas más herramientas y más capas ponemos sobre nuestros lenguajes, mayores son los retos que podemos afrontar. Creamos programas que crean programas, que a su vez son los nuevos bloques que usaremos para construir más grande y mejor. Pero todos sabemos que el crecimiento infinito es imposible y nuestro intelecto limitado. 

¿Llegará el día en el que no podamos abstraer por encima de lo que ya tenemos? ¿Llegará el día en el que un programa sea capaz de encontrar una solución a un problema al mismo nivel o mejor que un ser humano? Personalmente estoy bastante convencido de que ese día llegará, lo que no sé es lo que pasará después.
