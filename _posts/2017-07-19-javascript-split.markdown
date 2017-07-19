---
published: true
title: Función split en JavaScript
layout: post
tags: [javascript, snippets] 
---

Todos los lenguajes tienen las tipicas funciones que tenemos que consultar cada vez que las usamos, bien porque no las usamos todos los días, bien porque se parecen a otras de la librería estándar o nos recuerdan a una función parecida en otro lenguaje.

Este es el primero de una serie de artículos cortitos con ejemplos de algunas de esas funciones en JavaScript. La mejor forma de recordar una función es usarla y verla en muchos ejemplos, así que espero que depués de escribir estos aŕtículos no tenga que consultar más MDN para estas funciones y espero que de camino sean de utilidad a alguien.

## Split

Esta función sirve para dividir una cadena en partes utilizando un carácter delimitador, devolviéndonos un array con los "trozos". También admite un segundo parámetro opcional que indica cuántos elementos queremos que nos devuelva.

Pero lo mejor es ver algunos ejemplos. Los ejemplos se pueden comprobar pegándolos en el REPL de node o en la consola del navegador (F12).

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

// inviertiendo una cadena con split y reverse
'javascript'.split('').reverse().join('')

// split se puede usar con expresiones regulares
'Ada Lovelace   ,  English ,   1815'.split(/\s*,\s*/)

// y si usamos () nos devuelve los delimitadores
'Ada Lovelace   ,  English ,   1815'.split(/(\s*,\s*)/)

// podemos encontrar todas las palabras diferentes de un texto con split, Set y Array.from
Array.from(new Set('texto texto largo con con con muchas palabras'.split(' ')))

```

Hasta aquí con los ejemplos con split. Si tienes algún otro ejemplo interesante o tienes alguna duda, puedes colaborar en [este artículo en github]()

