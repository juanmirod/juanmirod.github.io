---
published: true
title: Función slice en JavaScript
layout: post
tags: [javascript, snippets] 
---

Siguiendo con las funciones que suelo tener que consultar y que espero que estos artículos me ayuden a superar, está slice.

Este es el segundo de una serie de artículos sobre funciones en javascript y ejemplos de uso. Puedes ver el primero [aquí](http://juanmirod.github.io/2017/07/19/javascript-split.html)

## Slice

Slice, como su nombre indica, toma un __"trozo"__ de un array, indicado por un índice de inicio y un índice final (no incluido) Slice no modifica el array original y hace una copia __"superficial"__ con lo que si el array contiene referencias a objetos, slice no copiará clonará esos objetos, sino solo la referencia.

Si el índice inicial es negativo, se considerará que se comienza en el elemento -N comenzando por el final, si se omite se tomará como 0.
Si el segundo índice se omite, se tomará como `array.length`

Veamos algunos ejemplos para dejar claro su uso:

```javascript

const _ = undefined
const computerScientists = ['John Hughes', 'Ada Lovelace', 'Barbara Liskov', 'Grace Hopper', 'Alan Key', 'John McCarthy']

computerScientists.slice(1, 4)
// [ "Ada Lovelace", "Barbara Liskov", "Grace Hopper" ]

// Tomar los n primeros elementos
computerScientists.slice(_, 3)
// [ "John Hughes", "Ada Lovelace", "Barbara Liskov" ]

// Tomar elementos del final
computerScientists.slice(-2)
// [ "Alan Key", "John McCarthy" ]

// Clonar un array de valores con slice
computerScientists.slice()
// ['John Hughes', 'Ada Lovelace', 'Barbara Liskov', 'Grace Hopper', 'Alan Key', 'John McCarthy']

```