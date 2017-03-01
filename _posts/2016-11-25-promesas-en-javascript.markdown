---
published: true
title: Promesas en Javascript
layout: post
tags: [Inteligencia Artifical]
---

El objecto Promise es ya un [standard de ES2015](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects) y puede utilizarse en la mayoría de los navegadores. Para poder utilizarlo y seguir soportando IE (esa carga que todos los desarrolladores web llevamos a cuestas) existe un [polyfill](https://github.com/taylorhakes/promise-polyfill) que apenas ocupa 1kb.

En esos enlaces puedes encontrar todo lo que es una Promesa y cómo funciona, pero las especificaciones no son precisamente fáciles de leer. Están bien para las personas que sufren de insomnio, pero personalmente, encuentro mucho más útil aprender con metáforas y ejemplos que muestren cómo se utiliza un concepto concreto. 

##¿Qué es una promesa y cómo se utiliza? 

Hablando de metáforas, una promesa es un futurible. Como un recibo que nos dan de un pedido que hemos hecho a una tienda online. Sabemos que va a tardar y que no lo tendremos justo al pagar, pero el recibo y su localizador nos aseguran que tendremos el producto en el futuro. 

Poniéndonos algo más técnicos, una promesa es un objeto que encapsula una operación asíncrona. La operación asíncrona (una llamada AJAX, un evento, una llamada a una functión programada para el futuro) tiene una duración indeterminada, pero al crear una promesa obtenemos inmediatamente un objeto con el que podemos trabajar. Es decir:

```javascript
    var promise = new Promise(function(resolve, reject) {
      
      function sayHello() {
        resolve('Hello World!');
      }

      setTimeout(sayHello, 10000);

    });

    console.log(promise); // promise is an object, we don't have to wait for 10000ms yeah!
```

En este punto la variable promise es un objecto y podemos operar con él. Hasta dentro de 10 segundos no se establecerá su valor y no contendrá la cadena 'Hello world!' pero podemos seguir trabajando con ella como si si que fuera así.

```javascript
    promise.then(function(message){
      console.log(message); // outputs 'Hello World!'
    });
```

Así dicho parece que lo que estamos haciendo es complicar las cosas, pero las promesas tienen dos ventajas principales: 

1. Nos devuelven el control. Gracias a las promesas, mantenemos control sobre la ejecución de nuestro programa, que antes delegábamos en una llamada asíncrona que podía o no terminar. Ahora con las promesas podemos operar independientemente de lo que pase con la llamada asíncrona.

2. Las promesas se pueden encadenar. Podemos hacer que la ejecución de una promesa dependa de otra, o esperar a que todo un grupo de promesas se resuelvan. Esto hace que el código sea mucho menos engorroso y mucho más fácil de leer y mantener. 

Vamos a ver varios ejemplos prácticos y su implementación para aclarar conceptos.

El ejemplo típico de utilización de una promesa es una llamada AJAX, si has usado jQuery la sintaxis es muy similar, y de hecho en jQuery 3.0 han modificado el código para que se comporte como una Promesa, ya que antes había algunas diferencias.

```javascript
    $.get('http://...')
      .done(function(data) {
        // do something with the data
      })
      .fail(function(error) {
        // do something with the error
      });
```

Pero si no necesitamos jQuery para nada más a lo mejor no queremos incluirlo sólo para esto. Eso sí, la API de XMLHttp no utiliza promesas, sino eventos, y es bastante más complicada de usar. Por suerte los navegadores ya comienzan a soportar la función 'fetch', que devuelve una promesa y funciona de forma parecida a la función ajax de jQuery:

```javascript
    fetch('http://...')
      .then(function(response) {
        // do something with the response
      })
      .catch(function(error) {
        // do something with the error
      })
```

Estas funciones sólo són válidas para peticiones AJAX, las promesas no se restringen solo a esto, podemos usarlas para cualquier operación no síncrona, como vimos en el primer ejemplo de la función que se ejecuta tras 10 segundos, para encapsular la ejecución de eventos, controlar procesos que tardan cierto tiempo en ejecutarse, peticiones a la cache, etc.

Un ejemplo diferente de cómo utilizar una promesa es utilizarlas para ejecutar nuestra aplicación cuando el DOM se ha cargado y está listo.

```javascript
    function ready() {
      
      return new Promise(function(resolve, reject) {
        
        // resolve the promise when the document is ready
        document.addEventListener('readystatechange', function() {
          if(document.readyState !== 'loading') {
            resolve();
          }
        });

      });

    };

    ready().then(function() {
      // Do stuff with the DOM
    });
```

Otra de las grandes ventajas de las promesas que aún no hemos probado es la de encadenarlas. Decimos que las promesas son 'thenables', es decir que se les puede poner un 'then' detrás y pasarán el resultado con el que se han resuelto a la función que le pasemos al then. De esta forma podemos hacer que la ejecución de una promesa dependa del resultado de otra, sin necesidad de anidarlas:

```javascript
    fetch('http://search')
      .then(function getFirstVideo(results) {
        // Do something with the results
        return fetch('http://...')
      })
      .then(function showVideoData(result) {
        //This results depend on the first search and the code structure is flat!!
      })
```

También podemos hacer que una promesa dependa de que se terminen varias promesas que se ejecutaron paralelamente:

```javascript
    Promise.all([promise1, promise2, promise3]).then(function(arrayOfResults) {

    })
```

La función all, además de devolver todos los resultados en orden independientemente de cuándo se resuelvan las promesas, fallará si alguna de ellas falla, con lo que nuestro código sólo se ejecutará si tenemos los resultados de todas las promesas.

.all ejecuta todas las promesas de forma paralela, no en secuencia, es decir, es para ejecutar un montón de promesas que no dependen de las demás para ejecutarse, como por ejemplo descargar información meteorológica de varias ciudades a la vez para compararlas.

Además de .all, las promesas de ES6 incluyen la función .race. Race ejecuta un array de promesas como .all pero el then se ejecutará en el momento en el que la primera promesa se resuelva, sin esperar a las demás. Como su nombre indica, .race es un una carrera para quedarnos con la promesa que resuelva más rápido. Esto nos puede servir para consultar varios servicios a la vez y quedarnos con el primer resultado que llegue. En el ejemplo del tiempo, podríamos consultar el tiempo para la misma cuidad en diferentes APIs y devolver al usuario el primer resultado, obteniendo así el resultado más rápido posible.

```javascript
    var p1 = new Promise(function(resolve, reject) { 
        setTimeout(resolve, 500, "one"); 
    });
    var p2 = new Promise(function(resolve, reject) { 
        setTimeout(resolve, 100, "two"); 
    });

    Promise.race([p1, p2]).then(function(value) {
      console.log(value); // "two"
      // Both resolve, but p2 is faster
    });
```

Pero si queremos realizar una secuencia de promesas (por ejemplo si queremos hacer un gráfico con mis amigos de facebook y los amigos de mis amigos y así sucesivamente...) podemos hacerlo encadenándolas de forma dinámica:

```javascript
    var results = [1,2,3,4,5];

    var getResultDoubled = function(num){
      return new Promise(function(resolve){
        console.log('Called with '+num);
        setTimeout(function(){
          resolve(num*2);
        }, 2000);
      });
    };

    var chainedPromise = Promise.resolve();
    results.forEach(function(result){
      chainedPromise = chainedPromise.then(function(){
        return getResultDoubled(result);
      }).then(console.log);
    });
```
 
Este es un script pequeño pero muy interesante. getResultDoubled devuelve una promesa que se resolverá pasados 2 segundos. Utilizando una promesa y la función forEach lo que hacemos es crear una cadena de promesas que dependen de que la anterior se resuelva para continuar. Si ejecutas este código verás que los resultados se muestran en orden en la consola y cada promesa espera a que la anterior termine para ejecutarse. A diferencia de .all y .race, que ejecuta todas las promesas en paralelo, nuestro código las ejecuta en serie. Este código no es tan habitual ya que implica una gran dependencia entre las llamadas, pero es un buen ejercicio para entender como encadenar las promesas y además no hay una función en ES6 que nos de esta funcionalidad como sucede con .all.

# Anti-patrones al utilizar promesas

http://bluebirdjs.com/docs/anti-patterns.html
http://taoofcode.net/promise-anti-patterns/

(Este artículo todavía está en desarrollo, seguiré añadiendo ejemplos de uso, así como anti-patrones y libros y artículos de referencia muy pronto.)