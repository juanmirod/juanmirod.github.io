---
published: true
title: Función split en JavaScript
description: Explicación y ejemplos de código.
layout: post
tags: [javascript] 
---

Todos los lenguajes tienen las típicas funciones que tenemos que consultar cada vez que las usamos. Bien porque no las usamos todos los días, bien porque se parecen a otras de la librería estándar o nos recuerdan a una función parecida en otro lenguaje. Lo cierto es que es un engorro y nos hace sentir tontos y olvidadizos y sentimos el _síndrome del impostor_ colgándose de nuestra espalda.

Este es el primero de una serie de artículos cortitos con ejemplos de algunas de esas funciones en JavaScript. La mejor forma de recordar una función es usarla y verla en muchos ejemplos, así que espero que depués de escribir estos aŕtículos no tenga que consultar más MDN para estas funciones y espero que de camino sean de utilidad a alguien.

## Split

Esta función sirve para dividir una cadena en partes utilizando un carácter delimitador, devolviéndonos un array con los _"trozos"_. También admite un segundo parámetro opcional que indica cuántos elementos queremos que nos devuelva.

Pero lo mejor es ver algunos ejemplos. Los ejemplos están escritos de forma que se pueden comprobar pegándolos en el REPL de node o en la consola del navegador (F12). Por eso no he creado funciones que los contengan o permitan generalizarlos. Copialos, úsalos, trastéalos es la mejor forma de tener **split** grabada en tu memoria.

```javascript

'Podemos usar split para obtener las palabras de una oración'.split(' ')
// [ "Podemos", "usar", "split", "para", "obtener", "las", "palabras", "de", "una", "oración" ]

'javascript,split,snippet,samples'.split(',')
// [ "javascript", "split", "snippet", "samples" ]

'javascript,split,snippet,samples'.split(',', 2)
// [ "javascript", "split" ]

'Podemos usar split para obtener las palabras de una oración'.split(' ', 3)
// [ "Podemos", "usar", "split" ]

// convirtiendo un fichero csv con split y map
`Ada Lovelace,English,1815
Grace Hopper,American,1906
Alan Turin,English,1954`.split('\n').map(line => line.split(','))
// Array [ Array[3], Array[3], Array[3] ]

// inviertiendo una cadena con split y reverse
'javascript'.split('').reverse().join('')
// "tpircsavaj"

// split se puede usar con expresiones regulares
'Ada Lovelace   ,  English ,   1815'.split(/\s*,\s*/)
// [ "Ada Lovelace", "English", "1815" ]

// usando expresiones regulares también podemos usar varios delimitadores diferenciados
'Hello, how are you?'.split(/,|\s+/g)
// [ 'Hello', '', 'how', 'are', 'you?' ] 

// y si usamos () nos devuelve los delimitadores
'Ada Lovelace   ,  English ,   1815'.split(/(\s*,\s*)/)
// [ "Ada Lovelace", "   ,  ", "English", " ,   ", "1815" ]

// podemos encontrar todas las palabras diferentes de un texto con split, Set y Array.from
Array.from(new Set('texto texto largo con con con muchas palabras'.split(' ')))
// [ "texto", "largo", "con", "muchas", "palabras" ]

```

Hasta aquí con los ejemplos con split. Si tienes algún otro ejemplo interesante o tienes alguna duda, puedes colaborar en [este artículo en github](https://github.com/juanmirod/juanmirod.github.io/blob/master/_posts/2017-07-19-javascript-split.markdown)

