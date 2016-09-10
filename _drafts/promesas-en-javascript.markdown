---
published: false
title: Promesas en Javascript
layout: post
tags: [Inteligencia Artifical]
---

El objecto Promise es ya un (standard de ES2015)[http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects] y puede utilizarse en la mayoría de los navegadores. Para poder utilizarlo y seguir soportando IE (esa carga que todos los desarrolladores web llevamos a cuestas) existe un (polyfill)[] que apenas ocupa 2kb.

En esos enlaces puedes encontrar todo lo que es una Promesa y cómo funciona, pero las especificaciones no son precisamente fáciles de leer, están bien para las personas que sufren de insomnio, peropersonalmente encuentro mucho más útil aprender con metáforas y ejemplos que muestren cómo se utiliza un concepto concreto. 

##¿Qué es una promesa y cómo se utiliza? 

Una promesa es un objeto que encapsula una operación asíncrona. La operación asíncrona (una llamada AJAX, un evento, una llamada a una functión programada para el futuro) tiene una duración indeterminada, pero al crear una promesa obtenemos inmediatamente un objeto con el que podemos trabajar. Es decir:

    var promise = new Promise(function(resolve, reject) {
      
      function sayHello() {
        resolve('Hello World!');
      }

      setTimeout(sayHello, 10000);

    });

    console.log(promise); // promise is an object, we don't have to wait for 10000ms yeah!

En este punto la variable promise es un objecto y podemos operar con él. Hasta dentro de 10 segundos no se establecerá su valor y no contendrá la cadena 'Hello world!' pero podemos seguir trabajando con ella como si si que fuera así.

    promise.then(function(message){
      console.log(message); // outputs 'Hello World!'
    });

Así dicho parece que lo que estamos haciendo es complicar las cosas, pero las promesas tienen dos ventajas principales: 

1. Control de errores.  Con las Promesas tenemos una sintaxis clara y standarizada de tratar los errores.
2. Las promesas se pueden encadenar. Podemos hacer que la ejecución de una promesa dependa de otra, o esperar a que todo un grupo de promesas se resuelvan. Esto hace que el código sea mucho menos engorroso y mucho más fácil de leer y mantener. 

Vamos a ver varios ejemplos prácticos y su implementación para aclarar conceptos.

El ejemplo típico de utilización de una promesa es una llamada AJAX, si has usado jQuery la sintaxis es muy similar, y de hecho en jQuery 3.0 han modificado el código para que se comporte como una Promesa, ya que antes había algunas diferencias.

    $.get('http://...')
      .done(function(data) {
        // do something with the data
      })
      .fail(function(error) {
        // do something with the error
      });

Pero si no necesitamos jQuery para nada más a lo mejor no queremos incluirlo sólo para esto. Eso sí, la API de XMLHttp no utiliza promesas, sino eventos, y es bastante más engorrosa de usar. Por suerte los navegadores ya comienzan a soportar la función 'fetch', que devuelve una promesa y funciona de forma parecida a la función ajax de jQuery:

    fetch('http://...')
      .then(function(response) {
        // do something with the response
      })
      .catch(function(error) {
        // do something with the error
      })

Pero estas funciones sólo són válidas para peticiones AJAX, las promesas no se restringen solo a esto, podemos usarlas para cualquier operación no síncrona, como vimos en el primer ejemplo de la función que se ejecuta tras 10 segundos, para encapsular la ejecución de eventos, controlar procesos que tardan cierto tiempo en ejecutarse, peticiones a la cache, etc.

Un ejemplo diferente de cómo utilizar una promesa es utilizarlas para ejecutar nuestra aplicación cuando el DOM se ha cargado y está listo.

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

Otra de las grandes ventajas de las promesas que aún no hemos probado es la de encadenarlas. Decimos que las promesas son 'thenables', es decir que se les puede poner un 'then' detrás y pasarán el resultado con el que se han resuelto a la función que le pasemos al then. De esta forma podemos hacer que la ejecución de una promesa dependa del resultado de otra, sin necesidad de anidarlas:


    fetch('http://search')
      .then(function getFirstVideo(results) {
        // Do something with the results
        return fetch('http://...')
      })
      .then(function showVideoData(result) {      
        //This results depend on the first search and the code structure is flat!!
      })

También podemos hacer que una promesa dependa de que se terminen varias promesas que se ejecutaron paralelamente:

    Promise.all([promise1, promise2, promise3]).then(function(arrayOfResults) {

    })

La función all, además de devolver todos los resultados en orden independientemente de cuándo se resuelvan las promesas, fallará si alguna de ellas falla, con lo que nuestro código sólo se ejecutará si tenemos los resultados de todas las promesas.

La función all ejecuta todas las promesas de forma paralela, no en secuencia, es decir, es para ejecutar un montón de promesas que no dependen de las demás para ejecutarse, como por ejemplo descargar información meteorológica de varias ciudades a la vez para compararlas.

Pero si queremos realizar una secuencia de promesas (por ejemplo si queremos hacer un gráfico con mis amigos de facebook y los amigos de mis amigos y así sucesivamente...) podemos hacerlo encadenándolas de forma dinámica:

    ...
 
