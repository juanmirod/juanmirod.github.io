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

Vamos a hacer un repaso por las herramientas del lenguaje que podemos usar para escribir utilizar funciones puras como base principal para nuestro código. Intentaré ir desde las funcionalidades más fáciles o conocidas a las más ajenas a la mayoría.

En el código de los ejemplos seguiré algunas convenciones de código y herramientas de ES6 para ser más conciso y conseguir una notación más parecida a lenguages como Haskell o Erlang. 

Este es el estilo del que comentaba que tal vez parezca un poco extraño, como guía inicial para aquellos que no estén familiarizados con ES6:

```javascript
// funciones con flecha 

(x, y) => { /* aquí el código */ } == function(x, y) { /* aquí el código */ }

// Si la función sólo tiene un argumento, se puede prescindir de los paréntesis:

x => { /* aquí el código */ } == function(x) { /* aquí el código */ }

// Si la función sólo contiene una expresión que se retorna se puede prescindir de las llaves:

x => 2*x == function(x) { return 2*x; }
```

Además, aunque no es muy común en según qué círculos, en JavaScript se puede no usar el ´;´ como delimitador de expresiones. Una de las funcionalidades del lenguaje, llamada ASI (Automatic Semicolon Insertion) hace que sean innecesarios, básicamente al ponerlos estamos haciendo el trabajo del compilador. Si queréis leer más sobre el tema os recomiendo [este artículo de Isaac Z. Schlueter, el creador de npm](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)

Todo esto era para decir que no habrá puntos y coma en el código :)

La descomposición de objectos y arrays, una nueva sintáxis de es6, nos permite hacer cosas como estas:

```javascript

var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]

({a, b} = {a: 10, b: 20});
console.log(a); // 10
console.log(b); // 20
```

Estas mismas transformaciones se pueden usar como parámetros en las funciones. Más sobre este tema [aquí](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### Bucles

Un primer paso bastante común es deshacerse de los bucles y utilizar las funciones .map/.filter/.reduce/.splice en su lugar. Estas funciones son parte de la librería estándar de JavaScript para Iterables y tienen una serie de propiedades muy interesantes. Usándolas no necesitaremos escribir contadores, con lo que reducimos una posible fuente de erratas (¿quién no se ha equivocado al anidar dos bucles for y ha usado el contador que no debía?), son funciones que se pueden componer y ganamos en brevedad y simplicidad al ofrecer comportamientos más variados que los de un bucle normal.

Además, estas cuatro funciones se caracterizan porque no alteran el array de entrada, sino que devuelven un nuevo array siempre, lo cual nos asegura que estamos trabajando de forma funcional, sin crear efectos colaterales.

**.map**

Map es la más básica de todas, además `.map` es una función omnipresente en la programación funcional que se utiliza no solo en iterables, sino también en promesas, streams y otros muchos tipos de datos.

La función de map es tomar un array y una función y aplicar la función a cada uno de los elementos del array:

```javascript

[1,2,3].map(f) == [f(1), f(2), f(3)]

```

Por ejemplo:

```javascript

[1,2,3].map(x => 2*x)

// [2,4,6]

```

Otra notación que es muy concisa es la __programación tácita__ o __pointfree notation__ que quiere decir que, cuando una función toma un parámetro de entrada y se usa como argumento a otra función, podemos omitir el parámetro y la llamada de esta forma:

```javascript

const double = x => 2*x

[1,2,3].map(double) 

// [2,4,6]


```

Espera un momento, ¿qué está pasando ahí? Lo que ocurre es que la función map espera una función y la llamará una vez por cada elemento del array, pasándole el elemento, como veíamos arriba. Así que es lo mismo pasarle la referencia `double` que la función anónima, map tomará la función y la invocará de la misma forma. Aquí empezamos a ver la potencia de JavaScript como lenguaje funcional, no todos los lenguajes permiten usar las funciones como argumentos de otras funciones de forma tan sencilla.

