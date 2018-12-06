---
published: true
title: Refactorizando switch y if-else encadenados
description: Técnicas de refactorización para cadenas de cláusulas ifs y switch
layout: post
image: /public/img/diomari-madulara-110583-unsplash.jpg
tags: [javascript]
---

![Photo of a row of switches](/public/img/diomari-madulara-110583-unsplash.jpg)
(Photo by Diomari Madulara on Unsplash)

Una de las construcciones sintácticas más discutidas desde la sentencia `GOTO` es `switch`. A menudo es criticada y es que la sentencia switch tiene el problema de que es una fuente de acoplamiento. Seguro que si lleva un tiempo programando te ha ocurrido algo parecido a esto:

> En la base de código en la que trabajas hay una clase/módulo/función especialmente grande. En principio no parece que haya nada raro, esta función controla una parte importante del flujo del programa, puede que sea una máquina de estados, un clasificador que selecciona la acción adecuada en función del evento o acción recibidos... Y esa selección la hace mediante un switch. Ok, esta es la función para la que se ideó: le das una variable y ejecuta el case que coincide con el valor de esa variable. El problema del switch es que no te permite separar los casos y testarlos o modificarlos. Tienen que estar todos juntos y de forma secuencial en el código. Además tiene la peculiaridad de que, si quieres, puedes no incluir un break y dejar que se ejecuten dos casos seguidos y si esto no fuera poco, los programadores tenemos la costumbre de añadir código allí donde está el problema, con lo que esos `case`s han ido creciendo con el tiempo y ahora para cualquier cosa que hace ese programa, tenemos que revisar todo el enorme switch manualmente. La pesadilla de cualquier desarrollador.

El acoplamiento se produce por la propia construcción, porque no te obliga a separar los diferentes casos y a mantener límites en tu código, Introducir límites y recudir el acoplamiento son dos labores importantes del desarrollador si no quieres verte hasta las rodillas en un lodazal de código espagueti.

Vamos a ver cómo podemos refactorizar esas sentencias `switch` para hacerlas más fácil de leer o para hacerlas desaparecer por completo. Voy a usar un ejemplo de switch muy sencillo para que el resto del programa no sea una distracción. Podría hacer el mismo ejercicio usando Redux y varios reducers, estos cambios se pueden aplicar igualmente y en la documentación de Redux hay muy buenos ejemplos de como eliminar los switchs de los reducers. Pero yo prefiero utilizar el ejemplo más simple posible, para poder centrarme en la refactorización del `switch` y no en lo que hace.

Este es nuestro código inicial, supongamos que tenemos una calculadora, y la función que decide que operación utilizar en función a la acción que le pasamos:

```javascript
// esta es la acción que queremos ejecutar
const multiply24 = {
  type: 'multiply',
  x: 2,
  y: 4
}

// esta es nuestra función que controla que hacer según la acción que le pasemos
function execAction(action) {
  let result
  switch(action.type) {
    case 'add': 
      result = action.x + action.y
      break
    case 'multiply': 
      result = action.x * action.y
      break
    default:
      result = 0
  }
  return result
}

execAction(multiply24)
// 8
```

Ok, sencillo, fácil de entender. No creo que nadie tuviera un problema con este código.

El problema viene luego, cuando vamos añadiendo operaciones a nuestra calculadora, añadimos cosas como la raiz cuadrada y de repente tenemos que tratar a parte los números negativos o en la división tenemos que tener cuidado con el cero... **Vamos añadiendo `case`s y vamos añadiendo lógica dentro de cada uno de esos cases. La función va creciendo y se va convirtiendo en ese _"God object"_ que controla todo el programa.** ¿Por qué ocurre esto? pues porque la sentencia `switch` tiene una sintaxis concreta que no nos permite partirla y separarla, no podemos modularizarla, tenemos que escribirla como un único bloque sintácticamente válido, y eso nos oblida a poner todo ahí.

Una forma de aliviar este problema es meter el cuerpo de cada `case` en una función, así al menos hemos separado la lógica de ese caso a una función a parte que podemos testear por separado. De camino vamos a eliminar los breaks y la variable de resultado, que no hacen más que obligarnos a recorrer mentalmente el switch:


```javascript

const add = (action) => action.x + action.y
const multiply = (action) => action.x * action.y

function execAction(action) {
  switch(action.type) {
    case 'add': 
      return add(action)
    case 'multiply': 
      return multiply(action)
    default:
      return 0
  }
}

```

Así, sacamos toda la lógica perteneciente a las acciones fuera del switch. El switch es solo una forma de seleccionar la acción correcta, lo que lo simplifica mucho. Además con los return vemos claramente que en cada acción termina la función y no sentimos la necesidad de revisar la función siguiente o de ver si hay más código después del switch.

Pero aún estamos usando la sintaxis del `switch`, la cual es bastante poco DRY y además no permite al compilador ayudarnos si cometemos algún error. ¿Como podríamos eliminar esta construcción manteniendo la funcionalidad? Vamos a usar un objeto donde la clave será el valor del `case` y el valor de esa clave será la función que queremos ejecutar para ese `case`. Para ejecutarlo comprobamos si la clave que queremos ejecutar existe y si es así, ejecutamos la función correspondiente, si no, ejecutamos el default:

```javascript

function execAction(action) {
  const actions = {
    add: (action) => action.x + action.y,
    multiply: (action) => action.x * action.y,
    default: () => 0
  }
  return actions[action.type] 
    ? actions[action.type](action) 
    : actions.default(action)
}

```

Simplificándolo un poco más gracias a ES6:

```javascript

const add = (action) => action.x + action.y
const multiply = (action) => action.x * action.y
const zero = () => 0

function execAction(action) {
  const actions = {
    add,
    multiply,
    default: zero
  }
  return actions[action.type] 
    ? actions[action.type](action) 
    : actions.default(action)
}

```

> **PUFF** ¡¡Desapareció el Switch!!

Todo lo que tenemos ahora es una serie de funciones y una lógica de selección que solo es necesario leer la primera vez. No tenemos que que recorrer todas las funciones cada vez y podemos testear todo por separado. La función `execAction` parece un poco más exotérica, si especialmente no te gusta el operador ternario puedes cambiarlo por un `if`. Pero la ventaja es que `execAction` solo la leerás las dos primeras veces. Luego ya sabrás que tu código son las funciones de arriba y que cada nombre corresponde a una acción y que no pueden concatenarse ni hay nada más que se ejecute antes o después, puedes pensar solo en la función de esa acción, y eso simplifica mucho el modelo mental.

Si queremos olvidarnos aún más de la lógica de la selección, o vamos a usar este patrón varias veces porque nuestro programa tiene muchos reducers o muchas máquinas de estado, podemos crear una clase que encapsule la selección. Esto es algo parecido a lo que hace express para el enrutamiento, solo que en este caso en lugar de usar patrones más complejos, usaremos una cadena para la selección de la acción:

```javascript

class Matcher {
  constructor() {
    this.actions = {}
  }
  
  addMatch(pattern, f) {
    this.actions[pattern] = f
    return this
  }
  
  execAction(action) {
    return this.actions[action.type] 
      ? this.actions[action.type](action) 
      : this.actions.default(action)
  }
}

const app = new Matcher()
app
  .addMatch('add', add)
  .addMatch('multiply', multiply)

app.execAction(multiply24)
// 8

```

Hemos creado una forma de reutilizar nuestra lógica y reducir al mínimo la síntaxis, usamos solo llamadas a funciones para crear los casos y ejecutar la selección y tanto la clase `Matcher` como cada actión, se puede testear y modificar por separado. Misión cumplida. Pero esta no es la única construcción de este estilo que podemos tener, hay otra estructura de código usada comúnmente que puede tener el mismo problema. ¿Qué hacemos si lo que tenemos es un montón de if-else-if encadenados? (Este artículo está en construcción, vuelve en unos días para ver como sigue)