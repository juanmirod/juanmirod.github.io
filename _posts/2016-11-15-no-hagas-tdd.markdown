---
published: true
title: No hagas TDD (todavía)
layout: post
tags: [desarrollo]
---

Llevo un tiempo tratando activamente de aprender a desarrollar usando TDD y la verdad, debo decir que, con muy poco éxito. No ha sido hasta hace poco que he comenzado a escribir tests más fácilmente y a entender el valor de escribir primero un test que falla para tener que escribir el código después.

Creo que no seré el único con este problema y por eso quería compartirlo. Personalmente, después de mucho leer y ver videos de código en directo, tutoriales y conferencias sobre TDD, creo que el problema para muchos como yo es que quedemos correr antes de aprender a andar y claro, la experiencia es frustrante, nos damos contra un muro, y por eso la mayoría reniegan del TDD. 

Admitámoslo, primero queremos hacerlo porque los (chicos guays)[] lo hacen. Bob Martin (Uncle bob), Martin Fowler, Ken Beck, Gary Bernhardt, Toran Billups, DHH, etc. Ellos son los que dan las conferencias, los que escriben los libros, y a todos nos gustaría estar en su lugar. Algunos tal vez penséis que hacen esas cosas por que ellos son más listos y por eso pueden hacer TDD, yo creo que es al revés, por que hacen TDD, por que hacen XP, porque conocen su profesión es por lo que tienen mejores resultados y parecen más listos.

Pero el problema está en querer de la noche a la mañana escribir una aplicación como si fuera un live-streaming de uno de ellos. 

Eso no va a funcionar nunca.

+ Primero esos live streaming están preparados con atelación, repetidos varias veces, con toda la configuración a punto y con los problemas justos para que todo salga bien a la primera.

+ Segundo y más importante, ¿Alguna vez has escrito un test para tu código? Si no sabes ni siquiera escribir un test ¿Cómo vas a hacerlo antes de empezar a programar?

Esta gente lleva escribiendo tests años. Cuando comenzaron con TDD ya llevaban años escribiendo tests y conocían cómo poner todo en su lugar. 

TDD es una extensión de eso. 

Cuando tienes una batería de tests y sabes cómo escribirlos, añadir un test que establezca lo que quieres que el código haga antes de escribir el código no parece tan difícil.

Por eso mi propuesta de hoy es que si aun no escribes tests *NO HAGAS TDD*. Al menos no todavía. Empieza por añadir tests a tu proyecto actual. Configúralo para que sea fácil correr y escribir los tests, añade algunos tests para las cosas que sueles probar manualmente cuando haces un cambio y verás que mejoras el conocimiento de tu código y tu proyecto. Que descubres errores o simplemente hacks en el código que estabas dejando pasar pero que para que los tests funcionen tienes que arreglar. 

Comienza por lo que sea más fácil testear, algún módulo independiente o un servicio o librería que no tenga dependencias. Te garantizo que sólo con poder escribir dos o tres tests y poder ejecutarlos habrás aprendido muchísimo.

Luego sigue desde ahí. Añade más tests para el resto de clases, añade un test cada vez que te encuentres probando algo manualmente. Añade un test cuando te reporten un bug, de forma que puedas reproducir el bug sin ir tener que seguir una serie de pasos manualmente hasta que salte.

Cuando hagas eso todo eso en un par de proyectos, cuando te encuentres cómodo escribiendo tests y corriéndolos cada vez que modificas tu código para comprobar que no has roto nada, ya habrás ganado MUCHO en confianza sobre tus habilidades y tu código y el TDD no te parecerá tan lejano.

Para mi es como un viaje, como un camino hacia una meta que es ser capaz de desarrollar con confianza de que lo que desarrollo funciona, se puede modificar y es legible y sensato para otros desarrolladores.

Todo el mundo puede copiar y pegar, remendar y debuggear código hasta que tiene una maraña inexplicable que funciona pero es un suplicio para cualquiera que intenta modificarla o entederla. Pero solo algunos pueden llegar a dominar este arte. TDD es una de las técnicas que nos ayudan, para mi Extreme Programming es siempre el ejemplo y contiene muchas más prácticas y recomendaciones que trataré de explorar en otros artículos.
