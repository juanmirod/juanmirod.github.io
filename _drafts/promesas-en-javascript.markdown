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

El ejemplo básico de utilización de una promesa es una llamada AJAX. 

 
