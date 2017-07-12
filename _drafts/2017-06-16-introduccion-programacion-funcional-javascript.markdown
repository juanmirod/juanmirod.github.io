---
published: false
title: Introducción a programación funcional con JavaScript
layout: post
tags: [programación funcional, javascript] 
---

# Introducción

La programación funcional parece que por fin va ganando más y más adeptos gracias a nuevos lenguajes como Scala, Clojure o Elm y a nuevos frameworks y librerías como Lodash, Ramda, React o Redux, que aunque no son puramente declarativos, sí que utilizan patrones y herramientas de la programación funcional. 

Los lenguajes funcionales siempre han estado ahí. Desde el comienzo de la informática, cuando Alonzo Church (profesor de Alan Turing, que luego escribiría con él la [Tésis de Church-Turing](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis)) definiera el Cálculo Lambda. Su historia está plagada de grandes nombres y grandes éxitos. Pero a la industria nunca le ha terminado de convencer y fue optando siempre por opciones imperativas, como ADA, C, PASCAL, Java o C#.

Hoy en día todos los grandes lenguajes van introduciendo conceptos de la programación funcional, he incluso hemos visto aparecer alternativas híbridas de todo tipo: Scala y Clojure para Java, F# para C#, o las librerías de Reactive Programming para varias plataformas... Además, lenguajes como Erlang/Elixir o Elm están demostrando que la programación funcionar se puede aplicar con mucho éxito a ciertas aplicaciones y hacer el desarrollo más fiable y fácil de mantener.

JavaScript, desde su concepción es un lenguage funcional y las ideas principales que le dan forma, las clausuras, las funciones como valores, la delegación de prototipos y la declaración de objetos sintácticamente son ideas tomadas de los lenguages Scheme y Self. Por eso JavaScript se adapta bastante bien a la programación funcional. Además, ES6 añade algunas nuevas funcionalidades muy interesantes para el desarrollo funcional como la notación que expande elementos iterables con `...` o las funciones con la flecha gruesa `=>`

Si eres desarrollador de JavaScript y has visto algún ejemplo de código usando estas nuevas herramientas puede que te resultase totalmente extraterrestre, es casi como si fuera un lenguage diferente, pero el lenguage es el mismo, sólo cambian algunas palabras y lo que es más importante, la forma de escribirlo y leerlo.

Voy a explicar algunos patrones útiles y ejemplos prácticos de como utilizar la programación funcional para mejorar la legibilidad y la fiabilidad de nuestro código en JavaScript sin necesidad de aprender un nuevo lenguaje o cambiar nuestro flujo de trabajo. Puedes introducir este código desde ya en tus proyectos y no tendrás que cambiar nada. Bueno, salvo si aun no usas ES6, cosa que te recomiendo desde ya, uses o no un estilo funcional en tu código.

# ¿Qué es la programación funcional?

Antes de nada me gustaría aclarar este concepto. En este caso vamos a entender como programación funcional aquella que utiliza las funciones como piedra angular del desarrollo en lugar de los objetos o las clases. Además daremos prioridad a escribir funciones puras siempre que sea posible, aislando los efectos colaterales y utilizando librerías o módulos para separarlos del resto de la lógica.

|> ¿Funciones puras, efectos colaterales?

Se puede entender muy fácilmente lo que es una función pura si se sabe lo que son los efectos colaterales o secundarios (side-effects en inglés):

**Efectos colaterales** son todas aquellas modificaciones que haga una función que estén fuera de su ámbito. Como modificar o crear una variable global, escribir algo a stdout, mostrar un gráfico en pantalla, escribir un fichero en el disco duro, acceder a una base de datos... Cualquier cosa que no sea operar sobre sus parámetros y variables locales es un efecto colateral.

Ahora podemos definir muy fácilmente una *Función pura* como aquella que no produce ningún efecto colateral. Las funciones puras son fáciles de usar, de testar y de leer y tienen la ventaja de que siempre se van a comportar de la misma forma al darle los mismos parámetros. no dependen de ningun estado externo o configuración.

Claro está, solo con funciones puras no se puede construir un programa. Sería un programa sin ningún tipo de feedback, ni si quiera podríamos saber si se ha ejecutado correctamente o no. Por eso hablo de separar las funciones puras de las que no lo son.

Sobre el tema de crear un nucleo de funciones puras y una serie de plugins o módulos alrededor que conecten el núcleo con el mundo real hay mucho que hablar también, pero eso es un tema más de arquitectura y hoy vamos a centrarnos en cómo desarrollar estas funciones y combinarlas para crear sistemas fáciles de testar, mantener y expandir.

## Herramientas de desarrollo funcional en JavaScript

