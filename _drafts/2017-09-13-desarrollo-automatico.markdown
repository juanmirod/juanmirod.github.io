---
published: false
title: Generadores de código, desarrollo automático y por qué es difícil una IA que programe.
description: Artículo de opinión sobre por qué es difícil crear programas que desarrollen aplicaciones y cómo esto enlaza con los problemas de la Inteligencia Artificial General.
layout: post
tags: [opinion]
---

En todos los proyectos hay partes del desarrollo tediosas o repetitivas. Habitualmente automatizamos procesos: tests, compilación, generadores de clases o componentes, procesos de empaquetado, implantación, etc, etc.

Es evidente, que gran parte de lo que hacemos es suplantarnos a nosotros mismos. O dicho de otra forma, automatizar procesos que podríamos hacer a mano, pero que podemos automatizar, mejorando en velocidad, eficiencia, tolerancia a errores, reproducibilidad, portabilidad, independencia... 

La pregunta inevitable entonces es: 

> **¿Hasta donde podemos automatizar?** **¿Podemos crear un programa que desarrolle programas?**

Como desarrollador, en más de una ocasión me he planteado cómo podría crearse un programa que generara gran parte o todo el código que escribo. Muchos dirán que hacer un programa con la capacidad de abstracción como para comprender un problema y crear una solución sería una Inteligencia Artificial General, pero si en lugar de decirlo así, planteas el problema como **traducir una serie de especificaciones a una serie de instrucciones en un lenguage de programación de alto nivel** El problema empieza a parecer mucho menos abstracto y etéreo y más metódico y concienzudo, que es donde los ordenadores nos ganan de calle.

En este sentido, hay varios caminos que se han intentado seguir hasta ahora para conseguir acercarse al _"programa que programe"_ o dicho de otra manera, para depender menos o nada de los desarrolladores.

Cucumber y el desarrollo de tests de comportamiento en general son una aproximación a una forma de escribir especificaciones que den más control a los gestores o jefes de producto.

Las DSLs o Lenguajes de dominio específico, son algo parecido. Se crea un lenguaje de muy alto nivel y centrado en el dominio concreto del negocio, de forma que sea fácil para los expertos no desarrolladores escribir programas en este nuevo lenguaje específico. Es más claro y exitoso ejemplo de esto son las hojas de excell. En excell cada negocio o incluso cada usuario crea sus propias reglas, tablas y cáculos, de forma que se pueden conseguir cálculos complejos sin necesidad de un desarrollador profesional. 

La computación evolutiva es una aproximación diferente donde ...

Las redes neuronales, y en especial las redes de aprendizaje profundo son otra aproximación a la generación de programas que suplanten sistemas desarrollados a mano. Las redes de aprendizaje profundo están demostrando mejorar los resultados de enormes sistemas expertos o de reglas desarrollados a mano durante años, reduciendo el tiempo de desarrollo enormemente.

Pero todos estos son aplicaciones específicas dentro de dominios específicos. Al final no son más que soluciones más complejas pero parecidas a _"automatizar el build"_ o cosas así. No le damos un problema abierto a la máquina y ésta nos devuelve un programa que lo resuelve, sino que dentro de un dominio conocido y un rango de parámetros (enorme en algunos casos) la máquina nos devuelve una respuesta.

Y es que hasta ahora esa es la forma que entendemos que funciona una máquina: le damos un input y nos devuelve un output. Pregunta-respuesta. Pero hasta ahora al menos, no hemos conseguido crear una máquina que "razone" en el sentido amplio de la palabra.

Es de nuevo el problema de la IAG. Una cosa es enseñar a un robot a conducir un coche y otra diferente es tratar de hacer un programa que comprenda por qué necesitamos coches autónomos y que los cree de acuerdo a nuestras normas e idiosincrasias específicas de cada país. 

La cantidad de trabajo necesario para conseguir que los diferentes sistemas trabajen juntos y de acuerdo a toda una serie de normas escritas y no escritas para que un coche autónomo ceda el paso al incorporarse a una autovía es enorme, muy detallado y requiere mucho conocimiento tanto del mundo real, como de las reglas que queremos que cumpla el robot, como del propio funcionamiento del robot.

Hasta ahora podemos automatizar tareas concretas, cada vez más y más amplias o que abarcan más capacidades que hasta ahora considerábamos humanas, como identificar una voz o un rostro, etiquetar una fotografía con conceptos que aparecen en ella o crear un diseño de acuerdo a unas normas. Pero aun nos queda mucho camino para automatizar totalmente el trabajo de los desarrolladores. Exactamente el mismo que nos queda hasta conseguir que una máquina piense por si misma y pueda interactuar con seres humanos como un ser inteligente e independiente.
