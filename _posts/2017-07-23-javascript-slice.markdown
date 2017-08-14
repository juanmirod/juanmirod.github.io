---
published: true
title: Función slice en JavaScript
layout: post
tags: [javascript] 
---

Siguiendo con las funciones que suelo tener que consultar y que espero que estos artículos me ayuden a superar, está slice.

Este es el segundo de una serie de artículos sobre funciones en javascript y ejemplos de uso. Puedes ver el primero [aquí](http://juanmirod.github.io/2017/07/19/javascript-split.html)

## Slice

Slice, como su nombre indica, toma un _"trozo"_ de un array, indicado por un índice de inicio y un índice final (no incluido) Slice no modifica el array original y hace una copia _"superficial"_ con lo que si el array contiene referencias a objetos, slice no clonará esos objetos, sino solo la referencia.

Si el índice inicial es negativo, se considerará que se comienza en el elemento -N comenzando por el final, si se omite se tomará como 0.
Si el segundo índice se omite, se tomará como `array.length`

Veamos algunos ejemplos para dejar claro su uso:

```javascript
// constante para mejor legibilidad de los ejemplos
const _ = undefined

// Ejemplos con números
// Tomar los n primeros elementos
[0,1,2,3,4,5,6,7,8].slice(_,5)
// [0,1,2,3,4]

// comienzo y final del slice
[0,1,2,3,4,5,6,7,8].slice(3,5)
// [3,4]

// Tomar elementos del final
[0,1,2,3,4,5,6,7,8].slice(-2)
// [7,8]

// Puedes usar slice con arrays con valores de cualquier tipo de datos escalar
const computerScientists = ['John Hughes', 'Ada Lovelace', 'Barbara Liskov', 'Grace Hopper', 'Alan Key', 'John McCarthy']

computerScientists.slice(1, 4)
// [ "Ada Lovelace", "Barbara Liskov", "Grace Hopper" ]

computerScientists.slice(_, 3)
// [ "John Hughes", "Ada Lovelace", "Barbara Liskov" ]

computerScientists.slice(-2)
// [ "Alan Key", "John McCarthy" ]

// Clonar un array de valores con slice
computerScientists.slice()
// ['John Hughes', 'Ada Lovelace', 'Barbara Liskov', 'Grace Hopper', 'Alan Key', 'John McCarthy']

// ¡¡ Pero ojo con los objetos !!
const punto1 = {x: 5, y: 10};
const punto2 = {x: 8, y: 8};
[punto1, punto2].slice()
// [ Object, Object ]
[punto1, punto2].slice()[0].x = 7;
punto1
// { x: 7, y: 10 } ¡¡Hemos modificado 'punto1'!!
```
