---
published: true
title: Promesas en Javascript
description: ¿Qué es una promesa? Ejemplos de código, buenas prácticas y antipatrones.
layout: post
tags: [javascript]
---

El objeto Promise es ya un [standard de ES2015](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects) y puede utilizarse en la mayoría de los navegadores. Para poder utilizarlo y seguir soportando IE (esa carga que todos los desarrolladores web llevamos a cuestas) existe un [polyfill](https://github.com/taylorhakes/promise-polyfill) que apenas ocupa 1kb.

En esos enlaces puedes encontrar lo que es una Promesa y cómo funciona, pero las especificaciones no son precisamente fáciles de leer. Personalmente encuentro mucho más útil aprender con metáforas y ejemplos que muestren cómo se utiliza un concepto concreto. 

## ¿Qué es una promesa y cómo se utiliza? 

Decimos que una promesa es como un recibo que nos dan de un pedido. Sabemos que va a tardar X, y que no lo tenemos justo al pagar, pero el recibo y su localizador nos aseguran que tendremos el producto en el futuro. 

Poniéndonos algo más técnicos, una promesa es un objeto que encapsula una operación asíncrona. La operación asíncrona (una llamada AJAX, un evento, una llamada a una functión programada para el futuro) tiene una duración indeterminada, pero al crear una promesa obtenemos inmediatamente un objeto con el que podemos trabajar. Es decir:

```javascript

var promise = new Promise(function(resolve, reject) {
  
  function sayHello() {
    resolve('Hello World!')
  }

  setTimeout(sayHello, 10000)

})

console.log(promise)
// Promise { ... }
// promise es un objeto, no tenemos que esperar para poder usarlo!

```

En este punto la variable promise es un objeto y podemos operar con él. Hasta dentro de 10 segundos no se establecerá su valor y no contendrá la cadena 'Hello world!' pero podemos seguir trabajando con ella como si si que fuera así.

`.then` es un método de la promesa que acepta una función, cuando la promesa se resuelve, llama a la función que le pasamos a `.then` pasándole como parámetro lo que le pasáramos a `resolve`. En realidad, le estamos pasando a _.then_ la función  _resolve_. Veamos como se haría en el ejemplo anterior:

```javascript

promise.then(function(message) {
  console.log(message) 
})

// 'Hello World!'

```

Así dicho parece que lo que estamos haciendo es complicar las cosas, pero las promesas tienen dos ventajas principales: 

1. **Nos devuelven el control.** Gracias a las promesas, mantenemos control sobre la ejecución de nuestro programa, que antes delegábamos en una llamada asíncrona que podía o no terminar. Ahora con las promesas podemos operar independientemente de lo que pase con la llamada asíncrona. Además, las promesas tienen la gran ventaja de que si el código lanza una excepción dentro de la Promesa, ésta la capturará y la devolverá convenientemente con la función 'catch'.

2. **Las promesas se pueden encadenar.** Podemos hacer que la ejecución de una promesa dependa de otra, o esperar a que todo un grupo de promesas se resuelvan. Esto hace que el código sea mucho menos engorroso y mucho más fácil de leer y mantener. 

## Vamos a ver varios ejemplos prácticos y su implementación para aclarar conceptos.

El ejemplo típico de utilización de una promesa es una llamada AJAX. Si has usado jQuery, la sintaxis es muy similar, y de hecho en jQuery 3.0 han modificado el código para que se comporte como una Promesa, ya que antes [había algunas diferencias](https://blog.domenic.me/youre-missing-the-point-of-promises/).

```javascript

$.get('http://...')
  .done(function(data) {
    // operaciones con data
  })
  .fail(function(error) {
    // muestra el error
  })

```

Pero si no necesitamos jQuery para nada más, a lo mejor no queremos incluirl en nuestro proyecto sólo para esto. Por suerte, los navegadores ya comienzan a soportar la función ['fetch'](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), que devuelve una promesa y funciona de forma parecida a la función ajax de jQuery, pero usando la terminología estandard:

```javascript

fetch('http://...')
  .then(function(response) {
    // operaciones con response
  })
  .catch(function(error) {
    // muestra el error
  })

```

Estas funciones sólo son válidas para peticiones AJAX, pero las promesas no se restringen solo a esto. Podemos usarlas para cualquier operación no síncrona. Podemos usarlas para funciones que queremos ejecutar en el futuro como en el primer ejemplo, o para encapsular la ejecución de eventos, controlar procesos que tardan cierto tiempo en ejecutarse, peticiones a la cache, etc.

Un ejemplo diferente de cómo utilizar una promesa es utilizarlas para ejecutar nuestra aplicación cuando el DOM se ha cargado y está listo.

```javascript

function ready() {
  
  return new Promise(function(resolve, reject) {
    
    // Resuelve la promesa cuando el DOM está listo
    document.addEventListener('readystatechange', function() {
      if(document.readyState !== 'loading') {
        resolve()
      }
    })

  })

}

ready().then(function() {
  // Aquí podemos hacer cosas con el DOM
})

```

Ese es un ejemplo de un evento que sabemos que ocurrirá solo una vez y que podemos capturar en una promesa. Y lo de solo una vez es importante porque **una vez la promesa toma un valor, no se modificará. Se dice que la promesa se ha cumplido, resuelto o establecido**.

Además de _'resolverse'_ las promesas pueden _'denegarse'_. Para denegarlas, llamaremos a la segunda función que recibimos como parámetro que normalmente recibe el nombre de 'reject':

```javascript

var promise = new Promise(function(resolve, reject) {
  
  function sayHello() {
    resolve('Hello World!')
  }

  reject('Something went wrong!!')

  setTimeout(sayHello, 10000)

})

promise
  .then(function(message) {
    console.log(message)
  })
  .catch(function(err) {
    console.error('ERROR: ' + err)
  })

// 'ERROR: Something went wrong!'

```

Cuando una promesa es rechazada, la ejecución saltará directamente al primer `.catch` que encuentre, saltándose el/los then (luego veremos que puede hacer varios) que haya delante.

Pero como una promesa una vez tome un valor no se modificará, si se resuelve y algo más tarde tratamos de denegarla, la promesa ignorará la llamada a _'reject'_ y mantendrá el valor con el que se resolvió. Esto hace que podamos añadir un tiempo de expiración a nuestras promesas. Por ejemplo, para una petición o un evento que esperamos que se ejecute antes de un tiempo determinado, podríamos añadir un tiempo máximo por el que esperar a que se descargue una imagen o un script y si se supera ese tiempo, tomarlo como un error:

```javascript

function ready(element) {
  
  return new Promise(function(resolve, reject) {
    
    element.addEventListener('onload', function() {
      resolve()
    })

    element.addEventListener('onerror', function(err) {
      reject('There was an error')
    })

    // timeout en 1s
    setTimeout(function(){
      reject('Something must be wrong, try again or fallback to something else')
    }, 1000)

  })
}

ready(image)
  .then(function() {
    // Imagen cargada correctamente
  })
  .catch(function() {
    // Hubo un error, mostrar mensaje o cargar imagen por defecto...
  })

```

Lo importante en este ejemplo es que **hemos encapsulado todo el manejo de los eventos del elemento dentro de la promesa**, y de cara al exterior ahora solo tenemos una función que devuelve una promesa, lo que simplifica enormente el código y mejora su reusabilidad y legibilidad.

En el ejemplo anterior estamos denegando la promesa ante errores o expiración del tiempo de espera. Pero en lugar de denegar la promesa podríamos lanzar una excepción y el resultado sería el mismo: la promesa capturaría la excepción y se denegaría. Esto puede usarse con funciones que puedan causar excepciones, como lectura de ficheros o de base de datos. Hay un buen ejemplo de esto en [la documentación de Bluebird](http://bluebirdjs.com/docs/why-promises.html):

```javascript

fs.readFileAsync("file.json")
  .then(JSON.parse)
  .then(function (val) {
    console.log(val.success)
  })
  .catch(SyntaxError, function (e) {
    console.error("invalid json in file")
  })
  .catch(function (e) {
    console.error("unable to read file")
  })

```

Otra de las grandes ventajas de las promesas que aún no hemos probado, es la de encadenarlas. **Decimos que las promesas son 'thenables', es decir que se les puede poner un 'then' detrás y pasarán el resultado con el que se han resuelto a la función que le pasemos al then.** De esta forma podemos hacer que la ejecución de una promesa dependa del resultado de otra, sin necesidad de anidarlas:

```javascript

fetch('http://search')
  .then(function getFirstVideo(result1) {
    // Hacer cosas con results
    return fetch('http://...')
  })
  .then(function showVideoData(result2) {
    // result2 depende de result1 pero la estructura del código es lineal :)
  })

```

Esto también ayuda a simplificar el código y sobre todo a librarnos de la terrible pirámide de callbacks que se genera al tener que anidar las llamadas asíncronas en javascript para poder acceder al valor de la llamada anterior.

También podemos hacer que una promesa dependa de que se terminen varias promesas que se ejecutaron paralelamente:

```javascript

Promise.all([promise1, promise2, promise3])
  .then(function(arrayOfResults) {

  })

```

La función all, **además de devolver todos los resultados en orden independientemente de cuándo se resuelvan las promesas, fallará si alguna de ellas falla**, con lo que nuestro código sólo se ejecutará si tenemos los resultados de todas las promesas.

`.all` ejecuta todas las promesas de forma paralela, no en secuencia, es decir, es para ejecutar un montón de promesas que no dependen de las demás para ejecutarse, como por ejemplo descargar información meteorológica de varias ciudades a la vez para compararlas.

Además de `.all`, las promesas de ES6 incluyen la función `.race`. **Race ejecuta un array de promesas como .all pero el then se ejecutará en el momento en el que la primera promesa se resuelva, sin esperar a las demás**. Como su nombre indica, `.race` es un una carrera para quedarnos con la promesa que resuelva más rápido. Esto nos puede servir para consultar varios servicios a la vez y quedarnos con el primer resultado que llegue. En el ejemplo del tiempo, podríamos consultar el tiempo para la misma cuidad en diferentes APIs y devolver al usuario el primer resultado, obteniendo así el resultado más rápido posible.

```javascript

var p1 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 500, "one")
})

var p2 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 100, "two")
})

Promise.race([p1, p2]).then(function(value) {
  console.log(value) 
})

// "two"
// Los dos se resuelven, pero p2 es más rápida

```

Estas funciones pueden crearse gracias a que, como comentaba antes, las Promesas encapsulan operaciones asíncronas devolviéndonos siempre el mismo interface, dándonos una forma fácil de manipularlas y agruparlas. 

Tanto es así, que las promesas cumplen una serie de [propiedades matemáticas](https://medium.com/@jamiedixon/promises-and-arrays-are-the-same-5ea68a4d769b#.ogdbn4l4s) que hacen que podamos usarlas con operaciones como map/filter/reduce, esto es lo que hace [Bluebird](http://bluebirdjs.com/docs/api-reference.html), dándonos todo el repertorio de operaciones que podemos hacer con promesas, lo que resulta muy útil cuando todas nuestras librerías devuelven promesas y podemos manejarlas a alto nivel. Además, si nuestra librería no está escrita con promesas, sino con el estilo de callbacks de node, pero queremos aprovechar las ventajas de las promesas, Bluebird nos da una función para convertir las funciones que usan callbacks a promesas: [promisify](http://bluebirdjs.com/docs/api/promise.promisify.html)

> ACTUALIZACIÓN: Node también incluye una función `promisify` [desde la versión 8](https://nodejs.org/api/util.html#util_util_promisify_original), con lo que ya no es necesario usar Bluebird para esto.

## Patrones útiles

Cuando llevas un tiempo usando promesas de forma regular, te das cuenta de que hay ciertos patrones de código que se repiten. El problema más común con las promesas es el mismo que con los callbacks: en lugar de un "árbol de navidad" de callbacks podemos acabar creando un árbol de navidad de promesas.

```javascript

promiseA()
  .then(resultA => {
      return functionB(resultA)
        .then(resultB => {
          return doSomethingFancy(resultA, resultB)
        })
    })

``` 

Esto ocurre porque la función 'doSomethingFancy' necesita los valores devueltos por las dos promesas y functionB también necesita el valor de la primera promesa. Si estamos usando Bluebird, 'join' puede ayudarnos con esto, pero si no queremos aprender otro API más o añadir otra dependencia a nuestro proyecto, hay varias formas de solucionar el problema con las promesas nativas de **es6**:

**Utilizando variables en el ámbito superior.** 

```javascript

function sample() {
  var resultA
  return promiseA()
    .then(res => resultA = res)
    .then(() => functionB(resultA))
    .then(resultB => doSomethingFancy(resultA, resultB))
}

```

Simplemente copiamos los resultados de las promesas en variables accesibles por todas las funciones por estar en un ámbito superior. El código vuelve a ser lineal y solo hemos tenido que añadir una variable, bastante limpio y fácil de leer, suele ser mi primera opción para este problema.

**Otra solución utilizando '.all':**

```javascript

promiseA()
  .then(resultA => Promise.all([resultA, functionB(resultA)]))
  .then(([resultA, resultB]) => {
    return doSomethingFancy(resultA, resultB)
  })

```

De esta forma no necesitamos crear una variable externa, la funcion '.all' acepta valores y promesas y nos devuelve un array con todos los resultados. La sintaxis gracias a **es6** es bastante legible aunque algo menos que la anterior.

**Utilizando una función auxiliar:**

```javascript

function joinPromises(functionA, functionAB) {
  return (resultA) => {
    return functionB(resultA).then(resultB => functionAB(resultA, resultB))
  }
}

promiseA()
  .then(resultA => {
    return joinPromises(functionB, doSomethingFancy)(resultA)
  })

```

En este caso hemos creado una pequeña función que nos ayuda a pasar los parámetros, se podría generalizar para N argumentos, pero así queda más fácil de leer y se entiende mejor el ejemplo (ver el final del artículo para una generalización parecida). De hecho, utilizando la notación 'pointFree' podemos dejar el ejemplo incluso más conciso:

```javascript

function joinPromises(functionA, functionAB) {
  return (resultA) => {
    return functionB(resultA).then(resultB => functionAB(resultA, resultB))
  }
}

promiseA().then(joinPromises(functionB, doSomethingFancy))

```

Aunque este último ejemplo puede despistar si no estás acostumbrado a este tipo de sintaxis.

## Anti-patrones al utilizar promesas

A la hora de usar promesas también hay que tener cuidado de no caer en algunas malas prácticas que harán que perdamos las ventajas de las promesas por el camino. Un ejemplo (fuente: taoofcode,ver algo más abajo) de un código que puede parecer correcto e incluso más legible según al tipo de código que estemos acostumbrado sería:

```javascript

function anAsyncCall() {
  var promise = doSomethingAsync()
  promise.then(function() {
    somethingComplicated()
  })
  
  return promise
}

```

Parece que lo estamos haciendo bien, pero en realidad estamos devolviendo la primera promesa en lugar del resultado del then, con lo que las excepciones que puedan provocarse y el propio resultado del then se perderán, esto puede comprobarse con el siguiente ejemplo ([jsfiddle](https://jsfiddle.net/juanmirod/gscxwmcn/)):

```javascript

doSomethingAsync = function() {
  return Promise.resolve(5)
}

somethingComplicated = function(num) {
  throw 'Error, too much complexity'
  return num * 2
}

function anAsyncCall() {
  var promise = doSomethingAsync()
  promise.then(function(res) {
    somethingComplicated(res)
  })
  
  return promise
}

anAsyncCall()
  .then(function(res) {
    console.log(res)
  })
  .catch(function(err) {
    console.error(err)
  })

```

El catch no captura la excepción, además, si no se produjera la excepción, el resultado de 'somethingComplicated' se pierde porque no lo estamos devolviendo en el then.

Veamos el ejemplo corregido ([jsfiddle](https://jsfiddle.net/juanmirod/wp5981sz/)):

```javascript

doSomethingAsync = function() {
  return Promise.resolve(5)
}

somethingComplicated = function(num) {
  throw 'Error, too much complexity'
  return num * 2
}

function anAsyncCall() {
  var promise = doSomethingAsync()
  return promise.then(function(res) {
    return somethingComplicated(res)
  });
}

anAsyncCall()
  .then(function(res) {
    console.log(res)
  })
  .catch(function(err) {
    console.error(err)
  })

```

Con el nuevo código sí se captura la excepción. Además, si comentamos la línea del throw, el resultado por consola es 10 en lugar de 5, porque estamos obteniendo el resultado de ejecutar 'somethingComplicated' lo que, seguramente, era la intención de escribir el código de esta manera.

Seguiré editando el artículo y añadiéndo ejemplos en cuanto pueda, pero mientras dejo un par de artículos sobre el tema: [Bluebird - Anti-patterns](http://bluebirdjs.com/docs/anti-patterns.html) y [Promises anti-patterns en taoofcode](http://taoofcode.net/promise-anti-patterns/)

## Encadenando promesas de forma dinámica

Como último apunte y curiosidad sobre uso de las promesas quiero proponer un pequeño ejercicio. Imaginemos que queremos realizar una secuencia de promesas de forma dinámica (por ejemplo si queremos hacer un gráfico con mis amigos de facebook y los amigos de mis amigos y así sucesivamente...) es decir, no sabemos a priori, cuántos pasos o qué camino implicará el cálculo, con lo que no podemos escribir la secuencia. Esto puede hacerse de forma más fácil y legible con las funciones de Bluebir, pero como ejercicio probemos a hacerlo sólo con ES6. Podemos hacerlo encadenándolas de forma dinámica:

```javascript

var results = [1,2,3,4,5]

var getResultDoubled = function(num){
  return new Promise(function(resolve){
    console.log('Called with '+num)
    setTimeout(function(){
      resolve(num*2)
    }, 2000)
  });
};

var chainedPromise = Promise.resolve()
results.forEach(function(result){
  chainedPromise = chainedPromise.then(function(){
    return getResultDoubled(result)
  }).then(console.log)
})

```
 
Este es un script pequeño pero muy interesante. getResultDoubled devuelve una promesa que se resolverá pasados 2 segundos. Utilizando una promesa y la función forEach lo que hacemos es crear una cadena de promesas que dependen de que la anterior se resuelva para continuar. Si ejecutas este código verás que los resultados se muestran en orden en la consola y cada promesa espera a que la anterior termine para ejecutarse. A diferencia de .all y .race, que ejecuta todas las promesas en paralelo, nuestro código las ejecuta en serie. Este código no es nada habitual ya que implica una gran dependencia muy directa entre las llamadas, sin ningún tipo de tratamiento intermedio, normalmente aunque tengas que crear promesas de forma dinámica el código no será tan conciso como este. Pero es un ejercicio interesante para ver cómo se pueden encadenar las promesas de forma dinámica.

## Conclusiones

La conclusión a todo esto: utiliza promesas para mejorar la legibilidad y fiabilidad de tu código y recuperar el control de la ejecución del código asíncrono. Este es un artículo largo, pero solo he dado un repaso superficial a las propiedades y usos de las promesas. Es importante aprender a usarlas correctamente, pero son una herramienta muy poderosa para mejorar tu código en JavaScript.

## Material para ampliar

Hay mucha documentación de calidad en Inglés y online sobre promesas, algunos enlaces de referencia son:

[Curso sobre promesas en Udacity](https://www.udacity.com/course/javascript-promises--ud898) Muy buen material y ejercicios para fijar los conocimientos, los cursos de Udacity son de los mejores cursos online que he probado.

[Javascript's Promises: An Introduction](https://developers.google.com/web/fundamentals/getting-started/primers/promises#events_arent_always_the_best_way) Fantástica y extensa introducción a las promesas por Jake Archibald.

[Capítulo You don't know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md) [@getify](https://twitter.com/getify) tiene todo un capítulo de uno de sus libros dedicado a las promesas. Como siempre contenido en profundidad e impecable, estos libros son de obligada referencia para cualquier desarrollador de JavaScript.

[Articulo en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) La documentación de MDN sobre promesas, también en español.

(Este artículo todavía está en desarrollo, seguiré añadiendo ejemplos de uso, así como anti-patrones y libros y artículos de referencia muy pronto.)