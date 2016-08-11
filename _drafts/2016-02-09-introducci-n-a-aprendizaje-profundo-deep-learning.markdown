---
published: false
title: Introducción a Aprendizaje profundo (Deep Learning)
layout: post
tags: [Inteligencia Artifical]
---
El Aprendizaje Profundo (AP) está demostrando ser de utilidad en múltiples campos, e incluso ha conseguido hitos de la inteligencia artificial (IA) que se pensaba que aún estaban lejos en el futuro de la computación. 

El más reciente ejemplo fue la victoria de AlphaGo sobre un jugador profesional de Go. El Go era, hasta ahora un juego donde los humanos no podían ser vencidos por las máquinas. Un tablero de gran tamaño y reglas sencillas hacen que la cantidad de movimientos posibles en cada turno de un jugador de Go sea altísima. La combinatoria explota y los árboles de búsqueda se vuelven totalmente ineficientes en este juego. Pero, tras décadas tratando de encontrar la solución a este juego, AlphaGo ha aprendido a jugar semi autónomamente, básicamente jugando partidas contra si mismo y aprendiendo de los jugadores profesionales. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/g-dKXOlsf98" frameborder="0" allowfullscreen></iframe>

Para saber más sobre este avance puedes ver algunos videos y enlaces en la página oficial de (AlphaGo)[http://www.deepmind.com/alpha-go.html]. 

Otros campos en los que destaca el AP es en el reconocimiento y etiquetado de imágenes, reconocimiento del lenguaje y la clasificación de datos, como motores de búsquedas y recomendaciones. La charla de Jeremy Howard en TED es un buen repaso del estado del arte de la IA en la actualidad y de lo que eso puede suponer para la humanidad:

<iframe src="https://embed-ssl.ted.com/talks/jeremy_howard_the_wonderful_and_terrifying_implications_of_computers_that_can_learn.html" width="560" height="315" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

El AP es una rama del aprendizaje automático que supone un gran avance cualitativo en estas áreas y se perfila prometedor para otras muchas en las que se cuente con una gran cantidad de datos a clasificar y optimizar.

En la actualidad me parece un área de la ingeniería informática muy interesante y me gustaría contribuir a este campo como buenamente pueda, comenzando por esta introducción en español para todo el que pueda estar interesado en comenzar a entender qué es y cómo funcionan estas técnicas de inteligencia artificial.  

En esta introducción utilizaré Tensorflow, la librería de computación de código abierto creada por Google. Para poder seguir los ejemplos y comprender el código presente en el texto es necesario tener conocimientos de programación, álgebra y métodos numéricos y estar familiarizado con el lenguaje de programación Python.

Tal y como se hace en la mayoría del material didáctico sobre aprendizaje automático, utilizaré la librería de imágenes MNIST como base de datos sobre la que trabajar en los ejemplos. MNIST es una base de datos de imágenes de cifras escritas a mano, centratas y normalizadas para facilitar su uso como entrada de algoritmos de aprendizaje. Esta librería es ampliamente conocida y hay una gran cantidad de datos sobre qué porcentaje de error se puede obtener utilizando gran variedad de algoritmos de aprendizaje. Esto hace que sea un perfecto margen de referencia y de estudio. Para más información y para descargar la bbdd: (MNIST)[http://yann.lecun.com/exdb/mnist/].


