---
published: false
title: Generadores en JavaScript
description: Definición y usos de los generadores en JavaScript. Evaluación perezosa, bucles infinitos, async/await y corutinas.
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

Este sencillo ejemplo muestra el funcionamiento de un generador. `counterFactory` devuelve un iterador que asignamos a la variable counter, hasta ahora ese iterador no ha hecho nada. En el momento en el que llamamos al método `.next` del iterador, este ejecuta la función hasta llegar al primer `yield` que encuentra, que detiene la ejecución de la función y _produce_ un resultado, que se devuelve como `value` del objeto retornado. En la siguiente llamada a `.next` la función continúa desde el `yield` y hasta el siguiente `yield`, y así hasta encontrar un `return`.

El iterador devuelto por `counterGenerator` Puede usarse a su vez dentro de un bucle `for of`, ya que estos bucles utilizan el interface del iterador para obtener el valor de cada iteración:

```javascript

for(var c of counter) { 
  console.log(c)
  if(c > 100) break // comenta esta línea para tener un bucle infinito 
}

```

