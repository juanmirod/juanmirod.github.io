---
published: true
title: Generadores en JavaScript
description: Definición y usos de los generadores en JavaScript. Bucles infinitos, evaluación perezosa, async/await y corutinas.
layout: post
tags: [javascript]
---

Los generadores son una herramienta de programación muy poderosa, pero difícil de entender cuando la vemos por primera vez. En este artículo trataré de definir de forma lo más sencilla posible qué son y como se usan los generadores y pasar a varios ejemplos prácticos en los que los generadores nos permiten simplificar código o directamente hacer cosas que no pensábamos que se pudieran hacer en JavaScript como funciones de evaluación perezosa y corutinas.

### ¿Qué es un generador?

Un generador es una función especial en JavaScript que puede pausar su ejecución y retomarla en un punto arbitrario. Para definirlos utilizamos dos nuevas palabras reservadas del lenguaje: `function*` y `yield`. 

> Este es uno de los casos más claros en los que he encontrado que la barrera del idioma a veces dificulta la comprensión de ciertos conceptos. `yield` es una palabra poco habitual en inglés, y para un no-nativo como yo, me suena totalmente fuera de contexto. Se traduce como _producir_ o _ceder_ 

Trataré de explicar su funcionamiento con un ejemplo de código:

```javascript

function* counterGenerator() {
  let i = 0
  while (true) {
    yield i
    i++
  }
}

var counter = counterGenerator()

counter.next() // { value: 0, done: false }
counter.next() // { value: 1, done: false }
counter.next() // { value: 2, done: false }
... // hasta el infinito y más allá!

```

Este sencillo ejemplo muestra el funcionamiento de un generador. El uso más habitual de los generadores es [crear _Iteradores_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators). Un _Iterador_ es un objeto que devuelve un elemento de una colección cada vez que llamamos a su método `.next`. `counterGenerator` devuelve un iterador que asignamos a la variable counter.

Los generadores siempre devuelven un iterador y en el momento en el que llamamos al método `.next` del iterador, éste ejecuta la función del generador hasta llegar al primer `yield` que encuentra, que detiene la ejecución de la función y _produce_ un resultado, o dicho de otra forma, produce un elemento de la colección. 

El resultado es siempre un objeto con dos propiedades, `value` y `done`, en la primera está el valor producido por `yield` y la segunda es para indicar si el iterador ha terminado, es decir, si ese era el último elemento de la colección. 

En la siguiente llamada a `.next` la función continúa desde el `yield` y hasta el siguiente `yield`, y así hasta encontrar un `return` que devolverá `true` como valor de `done`.

El iterador devuelto por `counterGenerator` Puede usarse a su vez dentro de un bucle `for of`, ya que estos bucles utilizan el interface del iterador para obtener el valor de cada iteración:

```javascript

for(var c of counter) { 
  console.log(c)
  if(c > 10) break // break detiene el bucle for como si hubiera encontrado done === true
}

// 1
// 2
// 3
// ...
// 10

```

### Bucles infinitos y evaluación perezosa

En el ejemplo anterior hemos usado todo el tiempo un bucle `while (true)` sin bloquear o saturar la cpu y sin ninguna alerta por parte de node. Esto es así porque `yield` pausa la 
ejecución de la función, y por lo tanto, pausa el bucle infinito, cada vez que produce un valor.

Esto es lo que se llama _evaluación perezosa_ y es un concepto importante en lenguajes funcionales como Haskell. Básicamente nos permite tener listas o estructuras de datos _"infinitas"_ y operar sobre ellas, por ejemplo podemos tener un operador `take(n)` que toma los N primeros elementos de una lista infinita:

```javascript

function* oddsGenerator() {
  let n = 0
  while (true) {
    yield 2*n + 1
    n++
  }
}

function take(n, iter) {
  let counter = n
  for ( c of iter) {
    console.log(c)
    counter--
    if(counter <= 0) break
  }
}

var oddNumbers = oddsGenerator() // TODOS los números impares 

take(5, oddNumbers) // toma 5 números impares
// 1
// 3
// 5
// 7
// 9

```

La evaluación perezosa permite construir este tipo de estructuras _"infinitas"_ o completas sin producir errores de ejecución y también son más eficientes en algoritmos de búsqueda, recorrido de árboles y cosas así, al evaluar el mínimo número de nodos necesarios para encontrar la solución. Para ver más usos y ventajas de la evaluación perezosa puedes ver [este hilo de stackoverflow](https://stackoverflow.com/questions/265392/why-is-lazy-evaluation-useful)

Como añadido en JavaScript, los generadores nos permiten crear una sintaxis más legible en el uso de arrays. Podemos obtener los valores producidos por el generador en ES6 mediante el _spread operator_: 


```javascript

function* range (limit) {
  let c = 0
  while ( c < limit ) {
    yield c
    c++
  }
}

[...range(5)]
// [ 0, 1, 2, 3, 4 ] 

```

Pero cuidado con utilizar el _spread operator_ o los bucles for con listas infinitas como la de arriba:

```javascript

for(let c of oddNumbers) { // bucle infinito!!
  console.log(c) 
}

[...oddNumbers] // bucle infinito y 'out of memory', no podemos crear un array infinito en la memoria!!

```

### Async/await y corutinas

Además de la generación de iteradores, los generadores nos permiten controlar la ejecución de funciones asíncronas gracias al mecanismo de pausa de la función de `yield`. Para explicar por qué esto es importante, vamos a desviarnos un momento y hablar de `async/await`

Una de las funcionalidades más coreadas de ES7 son las nuevas construcciones `async` y `await`, que nos permiten ejecutar código asíncrono pero escribiéndolo de forma lineal, sin necesidad de pensar en callbacks o promesas. Veamos cómo funciona:

```javascript

function helloDelayed() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Hello'), 5000)
  })
}

async function hi() {
  const greeting = await helloDelayed()
  console.log(greeting)
}

hi()

// a los 5 segundos aparece 'Hello'

```

Lo genial de `async/await` es que el código de la función async es lineal, le hemos pasado una promesa a await y nos devuelde directamente el valor con el que se ha resuelto, esperando y deteniendo la ejecución de la función.

No me voy a detener más en explicar cómo funciona, eso lo dejo para otro post, pero `async/await` en realidad no es más que un uso concreto de los generadores, _azúcar sintáctico_ para usar un generador y evaluar una promesa, podríamos replicar esta funcionalidad, para una sola llamada (más adelante veremos la generalización) así:

```javascript

function helloDelayed() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Hello'), 5000)
  })
}

function hi(gen) {
  const iterator = gen()
  iterator.next()

  helloDelayed.then(res => iterator.next(res))
}

hi(function* () {
  const greeting = yield;
  console.log(greeting)
})

```

Esta solución es más difícil de leer y de escribir, sobre todo por el doble `.next` necesario para que funcione, y por la poca legibilidad del comando `yield` en si mismo. Pero muestra una parte importante del funcionamiento de los generadores. 

Lo que está pasando aquí es que `hi` recibe un generador como parámetro, lo ejecuta y llama una vez a `.next` para ejecutar el generador hasta el yield y luego lo vuelve a llamar cuando tiene el resultado de la promesa para revolver el resultado al yield. 

Hasta ahora no habíamos hablado de esto para no complicar más, pero podemos añadir a la llamada a `.next` un parámetro, que a su vez podemos capturar en una variable asignándola a `yield`. Esta, para mi, es la funcionalidad más confusa de los generadores, pero es la clave para usarlos para ejecutar llamadas asíncronas o corutinas como veremos en los siguientes ejemplos. Veamos un pequeño ejemplo de como funciona:

```javascript

function* counterGenerator() {
  let i = 0
  while (true) {
    const str = yield i
    console.log(str)
    i++
  }
}

var counter = counterGenerator()

counter.next('hi') 
// { value: 0, done: false }
// el primer 'next' no imprime nada porque el generador se ejecuta solo hasta el yield
counter.next('ho') 
// ho
// { value: 1, done: false }
counter.next('hu') 
// hu
// { value: 2, done: false }


```

Este mecanismo nos da una forma de comunicarnos con el generador, algo muy potente, aunque en mi opinión con una sintaxis difícil de leer y nada clara. Los generadores no son una herramienta que hay que usar con moderación, pero nos permiten hacer cosas que estarían fuera del alzance de JavaScript si no fuera con ellos, como el ejemplo que veremos a continuación.

Generalizando el código de helloDelayed, se puede construir una función que controle la ejecución de funciones asíncronas prácticamente igual a como hace `async/await`, veamos un ejemplo que lee dos ficheros (ejemplo tomado de [este post de TJ HoloWaychuck](https://medium.com/@tjholowaychuk/callbacks-vs-coroutines-174f1fe66127), que recomiendo leer, el código original usa callbacks, pero lo he modificado para usar promesas, dos ejemplos por el precio de uno _;)_):

```javascript

const fs = require('fs')

function thread(fn) {
  var gen = fn()

  function next(res) {
    var ret = gen.next(res)
    if (ret.done) return
    ret.value.then(next)
  }
  
  next()
}

thread(function *(){
  var a = yield read('README.md')
  var b = yield read('index.html')
  console.log(a)
  console.log(b)
})


function read(path) {
  return new Promise(resolve => fs.readFile(path, 'utf8', (err, res) => resolve(res)))
}

```

Este código, sí se parece mucho más al de `async/await`, es más, si cambiamos `thread` por `async` y imaginamos que `yield` es `await` es prácticamente igual:

```javascript

async(function *(){
  var a = yield read('README.md')
  var b = yield read('index.html')
  console.log(a)
  console.log(b)
})

```

Este ejemplo básico es una simplificación de la librería [Co](https://github.com/tj/co), que nos permite escribir este tipo de código asíncrono de forma lineal y con la seguridad de que captura todas las excepciones de forma parecida a como hacen las Promesas.

Técnicamente esto no son corutinas. En realidad, cuando hablamos de generadores, hablamos de [_'semicorutinas'_](https://en.wikipedia.org/wiki/Coroutine#Comparison_with_generators) porque los generadores no son tan flexibles como las corutinas de lenguajes como Go, pero diremos que son equivalentes a corutinas, aún sabiendo que estamos simplificando, porque es la herramienta que tenemos para esta función en JavaScript a nivel nativo. 

En cuando a otras librerías para corutinas, [fibjs](https://github.com/fibjs/fibjs) y [node-fibers](https://github.com/laverdet/node-fibers) son implementaciones de _'fibers'_ que podríamos traducir como _"fibras"_ o _"hilos ligeros"_ que es más flexible que los generadores y que algunos desarrolladores [quieren incluir en el núcleo de Node.js](https://github.com/nodejs/node/issues/9131).

Los generadores y las corutinas son herramientas avanzadas del lenguaje que seguramente no tengas que utilizar directamente a no ser que hagas desarrollo de sistemas o librerías, pero de las que podemos sacar provecho en nuestro código con librerías como `Co`, `node-fibers` o el nuevo `async/await` nativo. Espero que estos ejemplos hayan resuelto algunas dudas y generado aun más dudas e interés por el lenguaje y sirva como introducción a todo este tema.

Otra lectura recomendada para profundizar en los Generadores es el libro de Kyle Simpson ES6 and Beyond, y en concreto [el capítulo sobre Iteradores y Generadores](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch3.md#generators).
