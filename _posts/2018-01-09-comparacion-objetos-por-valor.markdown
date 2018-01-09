---
published: true
title: Comparando objetos por valor
description: Comparar objetos por valor en javascript es fácil y nos permite trabajar con objetos de forma más funcional 
layout: post
tags: [javascript] 
---

Una de las típicas quejas de los programadores sobre javascript es que, aunque permite crear objetos de forma literal:

```javascript

const foo = { bar: 'a property' }

```

La comparación de objetos no es por valor, si no que es referencial, es decir, dos objetos no son iguales desde el punto de vista del comparador de igualdad a no ser que sean el mismo objeto:

```javascript

const a = { bar: 'a property' }
const b = { bar: 'a property' }
const c = a

c.foo = 'another property'

a === b // false
c === a // true c apunta al mismo objeto, la asignación no ha clonado el objeto

```

Es decir, aunque en la sintaxis pueda parecer que los objetos son valores como en otros lenguajes funcionales (LISP o Haskell por ejemplo) en realidad solo son punteros a los objetos, al estilo de lenguajes imperativos como C. Esta disonancia empeora si además usamos el operador `==` que hace casting de forma automática de los argumentos para realizar la comparación, con lo que obtenemos cosas como:

```javascript

!!0 // false
!![] // true
!!{} // true
0 == [] // true wtf?

0 == {} // false 
{} == {} // false 


```

Es difícil razonar con el lenguaje haciendo transformaciones implícitas y no obvias a simple vista, pero hay una solución muy sencilla para comprarar objetos literales en javascript por valor:

```javascript

const a = { bar: 'a property' }
const b = { bar: 'a property' }
JSON.stringify(a) === JSON.stringify(b) // true

```

`JSON.stringify` convertir´a el objeto a una cadena, podemos usarlo con objetos anidados sin problemas mientras no haya funciones dentro de las propiedades o propiedades cíclicas. Si usamos objetos literales nos permiten estructurar nuestros datos y acceder fácilmente a ellos, siempre han sigo muy utilizados en JavaScript y más desde el auge de las APIs JSON, pero aún más desde que llegaron React y Redux a revolucionar la comunidad y promover el uso de funciones puras, inmutabilidad y objetos literales para manejar nuestras aplicaciones.

Algunos dirán ¿pero y las funciones de Lodash o Underscore para comparar objetos? Desde luego, si usas alguna de estas o otra librería funcional que te provea este método: úsalo, la implementación está más que testeada y optimizada, es una apuesta segura. Pero si no tienes esta dependencia en tu proyecto a lo mejor no quieres añadirla y crear una función isEqual JSON.stringify es trivial:

```javascript

function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

isEqual({}, {}) // true
isEqual([], []) // true

const a = { bar: 'a property' }
const b = { bar: 'a property' }

isEqual(a, b) // true

```

> Pero ¿y eso no será muy lento?

Es más lento que la implementación de Underscore, pero debemos recordar que:

> Premature optimization is the root of all evil -- [DonaldKnuth](http://wiki.c2.com/?PrematureOptimization)

Y a no ser que realmente vayamos a usar esta operación decenas de miles de veces por segundo de forma continuada, seguramente no nos merezca la pena el peso extra y la dependencia que añadimos a la aplicación. De todas formas, para poder comparar, enlazo a jsperf con un benchmark que aparece nada más buscar el tema en google: [https://jsperf.com/lo-dash-vs-underscore-vs-json-stringify-isequal](https://jsperf.com/lo-dash-vs-underscore-vs-json-stringify-isequal)
