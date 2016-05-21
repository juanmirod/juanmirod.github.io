---
published: false
title: Programación Funcional en Javascript
layout: post
tags: [JavaScript, programación funcional]
---

La programación funcional parece que por fin va ganando más y más adeptos gracias a nuevos lenguajes como Scala o Clojure y a nuevos frameworks y librerías como lodash, React o Redux, que aunque no son puramente declarativos, sí que utilizan herramientas de la programación funcional y aprovechan la característica de JavaScript de tener las funciones con un tratamiento de "primera clase" o de primitiva. Además ES6 añade algunas nuevas funcionalidades muy interesantes para el desarrollo funcional como la notación que expande elementos iterables con `...` o las funciones con la flecha `=>`

Si eres desarrollador de JavaScript y has visto algún ejemplo de código usando estas nuevas herramientas puede que te resultase totalmente extraterrestre, voy a tratar de plasmarlo en un ejemplo de código, primero escrito para ES5 y de forma imperativa y luego de forma funcional y utilizando las herramientas de ES6.

Este ejemplo muy (MUY) sencillo podría ser una función "típica" en JS:

```javascript
var books = [
  { 
    title: "Fuzzy Nation",
    content: "At the time ZaraCorp started mining Mount Isabel, Holloway had idly wondered how an area could be restored to a pristine state once ZaraCorp had mined everything of value out of it, but this was not the same thing as him exhibiting actual concern.",
    price: "10.99"
  },
  { 
    title: "The time machine",
    content: "Overhead it was simply black, except where a gap of remote blue sky shone down upon us here and there. I struck none of my matches because I had no hand free.",
    price: "8.99"
  },
  { 
    title: "Brave new world",
    content: "He felt the hot tears welling up behind his eyelids as he recalled the words and Linda’s voice as she repeated them. And then the reading lessons: The tot is in the pot, the cat is on the mat; and the Elementary Instructions for Beta Workers in the Embryo Store. And long evenings by the fire or, in summertime, on the roof of the little house, when she told him those stories about the Other Place, outside the Reservation: that beautiful, beautiful Other Place, whose memory, as of a heaven, a paradise of goodness and loveliness, he still kept whole and intact, undefiled by contact with the reality of this real London, these actual civilized men and women.",
    price: "15.99"
  },
  { 
    title: "Time Salvager",
    content: "Levin let the bouncer go. The fewer ripples the better, though he didn’t worry much about that here. The odds of a time chronostream self-healing in this cesspool of an inn were high. Still, best not to take chances. That boy had already made enough ripples for both of them, running away from the present. The poor fool knew better. No one ever escaped the auditors.",
    price: "12"
  }
];

function addTaxes(price) {
  return parseFloat(price) + price*8/100;
}

function showBooks(books, id) {
  
  var elem = document.getElementById(id);
  for(var i = 0; i < books.length; i++) {
    elem.appendChild("<h2>" + books[i].title + "</h2>");
    elem.appendChild("<p>" + books[i].content + "</p>");
    elem.appendChild("<p>Price: " + addTaxes(books[i].price) + "</p>"); 
  }

}

showBooks(books, "imperative");
```

El código escribe una lista de elementos que podemos haber tomado de una petición al servidor.

Reorganizando ún poco el código, podemos eliminar el bucle `for` utilizando la función map en su lugar haciendo uso de un poco de la nueva sintaxis introducida por ES2015 podría quedar así:

```javascript
//TODO
```

Para más claridad, en lugar de utilizar una función anónima, sacaremos la función fuera y la nombraremos, así ahora tendremos un componente más independiente que simplemente añade un libro al elemento que le digamos. 

```javascript
//TODO
```

También podemos simplificar esta función a su vez sacando la sintaxis html de la función, para ello creamos una pequeña función auxiliar que crea el html para un elemento.

```javascript
//TODO
```

Por último, también podemos eliminar la función anónima que muestra todos los libros:

```javascript
//TODO
```


El código final quedaría así:

```javascript
const addTaxes = (price) => parseFloat(price) + (price*10)/100;

const appendBook = (id, book) => {

  var elem = document.getElementById(id);

  elem.innerHTML += 
  '<h2>${ book.title }</h2>
   <p>${ book.content }</p>
   <p>Price: ${ addTaxes(book.price) }</p>';

}

const showBooks = (list, id) => {
  
  let appendBookInId = (book) => { return appendBook(id, book); } 
  
  list.map(appendBookInId);

}

showBooks(books, "functional");
```

Hemos tomado nuestra primera aproximación y la hemos depurado de forma que ahora las funciones están mejor definidas, es más fácil de modificar y testar y más sencilla de leer. Esta es una forma de utilizar la programación funcional dentro de JavaScript. Lo bueno de esto es que no necesitas cambiar de lenguage ni saber todo sobre programación funcional. Puedes empezar a usar estos conceptos en tus proyectos e ir familiarizándote con ellos y seguir usando el estilo imperativo en las partes donde lo necesites. Nuevas librerías como React y Redux promueven la utilización de estas técnicas para hacer el código más modular y manejable, así como otras muchos paradigmas de la programación funcional como la inmutabilidad de los datos o la composición de funciones. 

Una buena introducción a la programación funcional que sigue también esta filosofía es [Mostly adecuate guide to functional programming](https://drboolean.gitbooks.io/mostly-adequate-guide/content/index.html) Está escrito en JavaScript y te permite ir introducciendo conceptos cada vez más complejos poco a poco. 

Si quieres más *pureza* Puedes echar un ojo a ClojureScript, Elm, ElixirScript o a cualquier lenguage funcional que te guste básicamente, porque [hay compiladores para todos](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS).