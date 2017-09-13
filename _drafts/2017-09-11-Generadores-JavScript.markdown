---
published: false
title: Generadores en JavaScript
description: Definición y usos de los generadores en JavaScript. Bucles infinitos, evaluación perezosa, async/await y corutinas.
layout: post
tags: [javascript]
---

Los generadores son una herramienta de programación muy poderosa pero difícil de entender cuando la vemos por primera vez. En este artículo trataré de definir de forma lo más sencilla posible qué son y como se usan los generadores y pasar rápidamente a varios ejemplos prácticos en los que los generadores nos permiten simplificar código o directamente hacer cosas que no pensábamos que se pudieran hacer en JavaScript como funciones de evaluación perezosa.

> ¿Qué es un generador?

Un generador es una función especial en JavaScript que puede pausar su ejecución y retomarla en un punto arbitrario. Para definirlos utilizamos dos nuevas palabras reservadas del lenguaje: `function*` y `yield`. Este es uno de los casos más claros en los que he encontrado que la barrera del idioma a veces dificulta la comprensión de ciertos conceptos. `yield` es una palabra poco habitual en inglés y para un nativo como yo me suena totalmente fuera de contexto, se traduce como _producir_ o _ceder_ y trataré de explicar su funcionamiento con un ejemplo de código y usando esta traducción:

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

Este sencillo ejemplo muestra el funcionamiento de un generador. `counterGenerator` devuelve un iterador que asignamos a la variable counter, hasta ahora ese iterador no ha hecho nada. En el momento en el que llamamos al método `.next` del iterador, este ejecuta la función hasta llegar al primer `yield` que encuentra, que detiene la ejecución de la función y _produce_ un resultado, que se devuelve como `value` del objeto retornado. En la siguiente llamada a `.next` la función continúa desde el `yield` y hasta el siguiente `yield`, y así hasta encontrar un `return`.

El iterador devuelto por `counterGenerator` Puede usarse a su vez dentro de un bucle `for of`, ya que estos bucles utilizan el interface del iterador para obtener el valor de cada iteración:

```javascript

for(var c of counter) { 
  console.log(c)
  if(c > 100) break // comenta esta línea para tener un bucle infinito 
}

```

### Bucles infinitos y evaluación perezosa

En el ejemplo anterior hemos usado todo el tiempo un bucle `while (true)` sin bloquear o saturar la cpu y sin ninguna alerta por parte de node. Esto es así porque `yield` pausa la 
ejecución de la función, y por lo tanto, pausa el bucle infinito cada vez que produce un valor.

Nuestro generador de contadores podría usarse para generar identificadores por ejemplo, pero también podemos pensar en usos más complejos, como un generador del número PI que nos devuelve tantos decimales como le pidamos, pero nunca calcula más de los necesarios:

```javascript

```

De esta forma, PI devolverá siempre los decimales que le pasemos, potencialmente infinitos. Esto es lo que se llama _evaluación perezosa_ y es un concepto importante en muchas aplicaciones.

...

Además, tal y como funcionan los generadores, podemos usarlos con un bucle `for of` o incluso con el `spreat operator` de ES6 para obtener los resultados que queramos.

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

[...range(10)]
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

```

Este ejemplo consigue algo que no podemos hacer simplemente con un bucle y que es más legible que la forma normalmente recomendada de crear un rango en `javascript` sin usar librerías:

```javascript

Array(10).fill(null).map((elem, index) => index)
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// puedes mejorar esto partiendolo en funciones:

const arrayOf = (num, value) => Array(num).fill(value)
const toRange = (elem, index) => index 

arrayOf(10, null).map(toRange)
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// pero [...range(10)] sigue siendo mucho más fácil de leer

```

### Async / await

Una de las funcionalidades más coreadas de ES7 son las nuevas construcciones `async` y `await`, que nos permiten ejecutar código asíncrono pero escribiéndolo de forma lineal, sin necesidad de pensar en callbacks o promesas:

```javascript


```

Pero `async/await` en realidad no es más que un uso concreto de los generadores, _azucar sintáctico_ para usar un generador y evaluar una promesa:

```javascript

```

