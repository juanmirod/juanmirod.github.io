---
published: true
title: Buenas prácticas en pruebas de software
description: ¿Es mejor escribir tests unitarios o de integración? ¿Importa la cobertura de mi suite de tests?
layout: post
tags: [tests]
---

Como en todas las cosas complejas, no hay una respuesta concreta a la pregunta de cuántas pruebas son suficientes. Tener pruebas automáticas que evalúen el código constantemente es importante para tener seguridad a la hora de desarrollar y para no introducir errores con cada cambio. Pero la cantidad y el tipo de pruebas/tests dependerá del tipo de proyecto, la experiencia de los desarrolladores o el tipo de aplicación. 

No es lo mismo desarrollar el software de un marcapasos o del control de vuelo de un avión, que un software para gestionar una empresa pequeña que un juego de móvil. El dominio de la aplicación y el tiempo de respuesta que tenemos nos marcan cómo de crítico es un bug y cómo de importante es que no llegue a producción.

Dicho esto, como siempre, es una cuestión de grises más que de blanco o negro. Pero como guía un poco de _perogrullo_, dejo este listado de tipos de pruebas de software, ordenados de mejor a peor. Si no puedes conseguir el primero, intenta el segundo, y si no, el tercero y así... 

**100% de cobertura, un sistema de integración continua y un sistema de logs y monitorización completos** nos darán la seguridad de que ningún bug se nos escapa y además podemos reaccionar rápidamente ante cualquier incidencia

Si no tenemos los sistemas de monitorización, pero tenemos integración continua, podremos reaccionar rápidamente ante cualquier incidencia de un cliente.

**100% de cobertura con tests automáticos es mejor que no tener 100% de cobertura**, si no tenemos 100%, una recomendación a _ojo de buen cubero_ es mantenerse por encima del 75% 

**Escribir los test antes que el código es mejor que escribirlos después** Escribir los tests antes asegura que nos ceñimos a los requisitos, que planteamos el problema en función que lo que queremos y no de lo que ya hemos programado y que en los tests no se introducen detalles de la implementación.

**Escribir los tests después que el código es mejor que no escribirlos nunca**

**Muchos tests unitarios y algunos de integración** es mejor que muchos tests de integración sin tests unitarios. Tener sólo tests de integración hace que sea muy difícil cubrir todas las posibilidades y son más costosos de escribir y más lentos, con lo que la tarea de manterlos se hace cada vez más difícil conforme el proyecto crece.

**Algunos tests automáticos es mejor que ningún test automático** Tener al menos algunos tests para cada parte del código nos ayudará a mantener los diferentes módulos desacoplados y pueden servir para comprobar al menos las funcionalidades más comunes.

Tener un equipo de QA que revise el código antes de publicarlo es **mucho mejor que probarlo tú mismo.** Por mucho que quieras, tú no eres un observador objetivo. Siempre tendrás tendencia a probar el _camino feliz_

**Una tabla de pruebas de regresión para probar tú mismo es mejor que NADA** Entre el abismo y una chuleta el día del examen, al menos está bien tener la chuleta.

Si no tienes una tabla de pruebas funcionales, no tienes tests automáticos y no tienes un equipo de QA, básicamente estás _con el culo al aire_. 

Seguramente tú has probado tu producto mientras lo desarrollabas, pero cuando el cliente lo use fallará de mil formas que no habías pensado y cada vez que tengas que hacer algún cambio lo harás con miedo a no romper nada. Habrá partes del código que no querrás ni tocar porque _"si funciona no lo toques"_ y poco a poco te preguntarás cómo has creado ese monstruo.

Las herramientas de test, de cobertura y análisis de código **no te dicen si tu software funciona como debería**, no entienden de qué va tu aplicación y no pueden avisarte de un fallo en el contenido o en los requisitos. Pero te ayudan a saber cómo funciona el código y por qué, qué casos no has tenido en cuenta en los tests o qué partes del código son más problemáticas.

Las pruebas de software, son parte del proceso de diseño y desarrollo, porque aseguran que cumplimos las especificaciones y que nuestro diseño es correcto. Y es que...

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">“Without requirements or design , programming is the art of adding bugs to an empty text file.” - Louis Srygley</p>&mdash; Programming Wisdom (@CodeWisdom) <a href="https://twitter.com/CodeWisdom/status/912738902376632321?ref_src=twsrc%5Etfw">September 26, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

