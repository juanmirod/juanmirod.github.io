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

Como todo desarrollador, en más de una ocasión me he planteado cómo podría crearse un programa que generara gran parte o todo el código que escribo. Muchos dirán que hacer un programa con la capacidad de abstracción como para comprender un problema y crear una solución sería una Inteligencia Artificial General, pero si en lugar de decirlo así, planteas el problema como **traducir una serie de especificaciones a una serie de instrucciones en un lenguage de programación de alto nivel** El problema empieza a parecer mucho menos abstracto y etéreo y más metódico y concienzudo, que es donde los ordenadores nos ganan _de calle_.

En este sentido, hay varios caminos que se han intentado seguir hasta ahora para conseguir acercarse al _"programa que programe"_ o dicho de otra manera, para depender menos, o nada, de los desarrolladores.

**Cucumber y el desarrollo de tests de comportamiento** en general son una aproximación a una forma de escribir especificaciones que den más control a los gestores o jefes de producto. En realidad cucumber no automatiza el desarrollo, solo las especificaciones, de forma que son comprobables y reproducibles, pero no pueden generar el código de la aplicación por si mismas, al menos no hasta ahora.

Las DSLs o **lenguajes de dominio específico**, son algo parecido. Se crea un lenguaje de muy alto nivel y centrado en el dominio concreto del negocio, de forma que sea fácil para los expertos no desarrolladores escribir programas en este nuevo lenguaje específico. 

Es más claro y exitoso ejemplo de esto son las hojas de excell. En excell cada negocio, o incluso cada usuario, crea sus propias reglas, tablas y cálculos, de forma que se pueden conseguir cálculos complejos sin necesidad de un desarrollador profesional. Excell se usa en muchas profesiones que no consideramos cercanas al desarrollo, pero que utilizan la potencia de un lenguaje de alto nivel, declarativo y multidioma para programar algoritmos complejos casi sin saberlo.

Las redes neuronales, y en especial **las redes de aprendizaje profundo**, son otra aproximación a la generación de programas que suplanten sistemas desarrollados a mano. Las redes de aprendizaje profundo están demostrando mejorar los resultados de enormes sistemas expertos o de reglas desarrollados a mano durante años, reduciendo el tiempo de desarrollo enormemente. Hoy en día, clasifican imágenes, emails, posts en redes sociales, reconocen personas e incluso diseñan piezas de ingeniería que usan menos material y son más resistentes.

Otro gran avance que ha conseguido escalar los sistemas a nivel mundial es **"la nube"**. Los contenedores y los servicios de servidores que nos abstraen del problema de tener un servidor físico en un lugar concreto hacen que no necesitemos una armada de desarrolladores para poder escalar nuestro sistema a nivel mundial.

Pero todos estos son aplicaciones específicas dentro de dominios específicos. Al final no son más que soluciones (mucho) más complejas, pero parecidas a _"automatizar el build"_. No le damos un problema abierto a la máquina y esta nos devuelve un programa que lo resuelve, sino que dentro de un dominio conocido y un rango de parámetros (enorme en algunos casos) la máquina nos devuelve una respuesta.

Y es que hasta ahora esa es la forma que entendemos que funciona una máquina: le damos un input y nos devuelve un output. Pregunta-respuesta. Pero, hasta ahora al menos, no hemos conseguido crear una máquina que _"razone"_ en el sentido amplio de la palabra.

Es de nuevo el problema de la IAG. El reto del coche autónomo es enorme ya que es el primer robot autoguiado que se mueve en un entorno real con seres humanos (autopilotar un barco o un avión _parece_ un juego de niños en comparación) 

La cantidad de trabajo necesario para conseguir que los diferentes sistemas funcionen juntos y de acuerdo a toda una serie de normas escritas y no escritas para que un coche autónomo ceda el paso al incorporarse a una rotonda es enorme. Necesitamos un modelo muy detallado que requiere mucho conocimiento tanto del mundo real (los otros coches, la carretera, el tiempo), como de las reglas que queremos que cumpla el robot, como del propio funcionamiento del robot (¿Cuando acelera el coche? ¿Cuánto peso está cargando? ¿Tengo tiempo de incorporarme al carril que quiero? lo que se llama _introspección_).

Pero aun así, una cosa es enseñar a un robot a conducir un coche, de acuerdo a una serie de lecturas de sus sensores y una serie de reglas y el conocimiento del _hardware_, y otra diferente, es tratar de hacer un programa que comprenda por qué necesitamos coches autónomos, cómo deben ser y que sea capaz de diseñarlos y/o codificarlos. El número de variables y decisiones en el segundo problema es enormemente mayor. O dicho de otra forma, mucha gente puede conducir un coche, pero solo un equipo (enorme) de expertos ingenieros, diseñadores y desarrolladores puede producir un conche autónomo.

El problema, no sólo de un coche autónomo se mueve por el mundo, sino de cualquier sistema complejo, es que debe tener en cuenta un millar de factores diferentes, del mundo real y del propio hardware y software sobre el que funciona y con el que se produce, que aun no hemos conseguido abstraer. 

Al final, cualquier especificación lo suficientemente detallada como para generar un programa ejecutable tiene que bajar al nivel del código y tiene que contener cientos, si no miles o decenas de miles de condiciones, instrucciones y casos específicos que responden a exigencias concretas del cliente, el entorno y las librerías y APIs con las que interacciona el sistema a especificar. Cuando trato de explicar esto a alguien siempre be acuerdo del [sketch de Tip y Col sobre cómo llenar un vaso de agua.](https://www.youtube.com/watch?v=qHqDpUpbpJI) y es que, hasta en el gesto más sencillo, hay mil presunciones y mil formas en las que podríamos hacerlo mal.

En resumen, hasta ahora podemos automatizar tareas concretas, cada vez más y más amplias o que abarcan más capacidades que hasta ahora considerábamos humanas, como identificar una voz o un rostro, etiquetar una fotografía con conceptos que aparecen en ella, conducir un coche o crear un diseño de acuerdo a unas normas. Pero aún nos queda mucho camino para automatizar totalmente el trabajo de los desarrolladores. Poco a poco vamos poniendo nuevas capas de abstracción sobre las anteriores, para conseguir cada vez abarcar más con menos. Pero resolver un problema complejo require de una capacidad de raciocinio que por ahora solo tenemos nosotros. **El camino hasta que un ordenador sea capaz de suplantar a un desarrollador es exactamente el mismo que hay hasta conseguir que una máquina piense por si misma** y pueda interactuar con seres humanos como un ser inteligente e independiente.
