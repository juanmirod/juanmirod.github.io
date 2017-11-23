---
published: true
title: Ámbito léxico y de bloque en JavaScript
description: Explicación de cómo funcionan el ámbito de las variables en JavaScript y las diferencias entre el ámbito léxico y el de bloque.
layout: post
tags: [javascript]
---

El ámbito de las variables en JavaScript puede ser un poco confuso a veces, pero en realidad sólo hay que seguir un par de reglas para saber a qué ámbito pertenece una variable.

+ En JavaScript **las funciones tienen su propio ámbito léxico**, lo que quiere decir que depende de cómo son declaradas en el código y no de cuando se ejecutan.

+ **Sólo las funciones** pueden crear un nuevo ámbito y como excepción, los bloques **catch** también crean su propio ámbito. Con la introducción de las variables `let` y `const` en ES6, también tenemos a nuestra disposición ámbito de bloque, ver más abajo para ver qué significa esto.

> ¿Cómo funciona este ámbito léxico de las funciones? 

+ A la hora de decidir a qué ámbito pertenece una variable, el compilador de JavaScript comprueba si la variable está declarada dentro de la función donde se invoca (ámbito local de la función) si no es así, busca en el ámbito de la función que la contenga y así hasta llegar al ámbito global. **Si la variable no fue declarada en ningún momento, el compilador la declara como variable global**.

+ En 'Strict mode' el compilador no creará la nueva variable en ámbito global sino que devolverá un error por variable no declarada.

La mejor forma de ver cómo funcionan estas reglas es probándolas en directo:

```javascript

//'use strict'; // descomentar para ver el error al usar la variable bye

var hi = 'Global: I am global. '
var ObjectWithPrivateVariables = function ObjectDefinition() {

  // Esta variable está definida dentro del ámbito de la functión ObjectDefinition
  var hi = 'Object: Hello. '
  //var bye; // descomentar para arreglar la fuga de la variable bye al ámbito global

  return {
    sayHi: function returnsAGreeting() {
      // El ámbito de esta función está dentro del ámbito de OnjectDefinition
      return hi
    },
    
    sayBye: function byes() {
      bye = "Good bye!"
      return bye
    }
  }
}

var newObject = new ObjectWithPrivateVariables()
var content = document.getElementById('content')
content.innerHTML += newObject.sayHi()
content.innerHTML += hi // Accede a la variable Global
content.innerHTML += newObject.sayBye()
content.innerHTML += bye // Esta variable se ha declarado como global y podemos acceder a ella, cuidado!!
content.innerHTML += sayHi // sayHi es undefined

```

[Editar en jsfiddle](https://jsfiddle.net/juanmirod/zgsgqz2j/)

Es interesante jugar un poco con el script, mover las declaraciones de sitio y ver que pasa. 

> Ok, lo he pillado y ahora ¿Qué es eso del ámbito de bloque?

En ES6 se introdujeron los tipos de variable `let` y `const` que no funcionan como las variables `var` sino que tienen ámbito de bloque (block scope). Esto significa que estas variables existen dentro del bloque donde son declaradas, independientemente de si ese bloque es una función, una condición o un bucle. Además, las variables declaradas con let y const no se pueden utilizar antes de ser declaradas. 

Esto es muy útil para declarar variables dentro de bucles o condiciones y que estas variables no se _"filtren"_ al ámbito de la función. Siempre es más fácil explicarlo con un poco de código:

```javascript 

function countTo(n) {
  
  // console.log(i) // descomentar dará un error, i no está definida
  console.log(x) // undefined

  for(let i = 0; i < n ; i++) {
    console.log(i)
  }

  // console.log(i) // descomentar dará un error, i no está definida
  var x = 10
  console.log(x) // 10
}

countTo(5)

```
[Editar en jsfiddle](https://jsfiddle.net/juanmirod/r2wLyvg3/)


Algo muy curioso de este pequeño código es el diferente resultado de los dos primeros `console.log` Las variables `let` y `const` no permiten ser usadas antes de ser declaradas, pero las variables declaradas con `var` sí. Esto es debido a una propiedad que se llama `hoisting`, que quiere decir que el compilador de JavaScript hace una primera pasada por todo el código para ver qué variables y funciones hemos definido y asignarles su ámbito. Hasta que la ejecución no llegue al punto de la asignación la variable tendrá el valor `undefined`. Esto no ocurre con `let` y `const`, que no son creadas hasta que la ejecución no llega al punto donde son declaradas. Así, si creamos una variable de bloque dentro de una condición que no se cumple, nunca se creará, y estaremos ahorrando ese tiempo y esa memoria.

Estas propiedades hacen que las variables `let` y `const` sean consideradas más fáciles de entender, que es lo importante, y actualmente las guías de estilo de código recomienden su uso sobre var. Si usas un linter, lo más seguro es que, si usas var, te lo marque como un warning o un error.

La diferencia entre let y const es que las variables `const` no se pueden reasignar, con lo que en el caso de valores escalares (cadenas, números y booleanos) son efectivamente constantes. 

```javascript

let x = 10
const y = 15
const pt = { x: 0, y: 10 }

x = 8 // ningún problema
// y = 8 // Error, 'y' no puede volver a asignarse por ser una constante

// pt = 'otracosa' // Error, pt no puede volver a asignarse

pt.x = 15 // sin problema, ahora pt.x vale 15 en lugar de 0

```

En el ejemplo de código puede verse que no ocurre así con los objetos, porque lo que no se puede modificar es la referencia que contiene esa variable, pero sí podremos modificar las propiedades internas del objeto, (a no ser que estén congeladas, pero de eso hablaremos otro día).
