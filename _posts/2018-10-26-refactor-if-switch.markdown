---
published: false
title: Refactorizando switch y if-else encadenados
description: Técnicas de refactorización para cadenas de cláusulas ifs y switch
layout: post
image: 
tags: [javascript]
---

Una de las construcciones sintácticas más discutidas desde la sentencia `GOTO` es `switch`. A menudo es criticada y seguro que si llevas un tiempo programando te has encontrado algún `switch` enorme de cientos de líneas, que controla una parte importante del flujo de un programa y que hace que cada vez que queremos entender que pasa en ese programa, tengamos que pasar por ese switch y recorrerlo manualmente.

Vamos a ver cómo podemos refactorizar esas sentencias `switch` para hacerlas más fácil de leer o diréctamente, para hacerlas desaparecer. Voy a usar un ejemplo de switch muy sencillo para que el resto del programa no sea una distracción. Podría hacer el mismo ejercicio usando Redux y varios reducers, estos cambios se pueden aplicar igualmente y en la documentación de Redux hay muy buenos ejemplos de como eliminar los switchs de los reducers. Pero yo prefiero utilizar el ejemplo más simple posible, para poder centrarme en la refactorización del `switch` y no en lo que hace.

Este es nuestro código inicial, supongamos que tenemos una calculadora, y la función que decide que operación utilizar en función a la acción que le pasamos:

```javascript
const multiply24 = {
  type: 'multiply',
  x: 2,
  y: 4
}

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

Ok, sencillo, fácil de entender. No creo que nadie tuviera un problema con este código. El problema viene luego, cuando vamos añadiendo operaciones a nuestra calculadora, añadimos cosas como la raiz cuadrada y de repente tenemos que tratar a parte los números negativos o en la división tenemos que tener cuidado con el cero... Vamos añadiendo `case`s y vamos añadiendo lógica dentro de cada uno de esos cases. La función va creciendo y se va convirtiendo en ese _"God object"_ que controla todo el programa. ¿Por qué ocurre esto? pues porque la sentencia `switch` tiene una sintaxis concreta que no nos permite partirla y separarla, no podemos modularizarla, tenemos que escribirla como un único bloque sintácticamente válido, y eso nos oblida a poner todo ahí.

Una forma de aliviar este problema es meter el cuerpo de cada `case` en una función, así al menos hemos separado la lógica de ese caso a una función a parte que podemos testear por separado. De camino vamos a eliminar los breaks y la variable de resultado, que no hacen más que obligarnos a recorrer mensalmente el switch:


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

Así, sacamos toda la lógica perteneciente a las acciones fuera del switch. El switch es solo una forma de seleccionar la acción correcta, lo que lo simplifica mucho.

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

*PUFF* Desapareció el Switch y todo lo que tenemos es una serie de funciones y una lógica de selección que se puede leer una ver y olvidar, no tenemos que que recorrer todas las funciones cada vez y podemos testear todo por separado.

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

