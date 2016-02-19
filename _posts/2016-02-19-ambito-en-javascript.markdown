---
published: true
title: Ámbito en JavaScript
layout: post
---
# Ámbito en JavaScript

El ámbito de las variables en JavaScript puede ser un poco confuso a veces, pero en realidad sólo hay que seguir un par de reglas para saber a qué ámbito pertenece una variable.

+ En JavaScript **las funciones tienen su propio ámbito léxico**, lo que quiere decir que depende de cómo son declaradas en el código y no de cuando se ejecutan.
+ **Sólo las funciones** pueden crear un nuevo ámbito y como excepción, los bloques **catch** también crean su propio ámbito, pero no existen ámbitos de bloque (codicionales, bucles y demás bloques no crean su propio ámbito, al menos en ES5, en ES6 con la palabra clave 'let' creamos ámbitos de bloque, pero eso lo dejo para otro post).

¿Cómo funcion este ámbito léxico de las funciones? 

+ A la hora de decidir a qué ámbito pertenece una variable, el compilador de JavaScript comprueba si la variable está declarada dentro de la función donde se invoca (ámbito local de la función) si no es así, busca en el ámbito de la función que la contenga y así hasta llegar al ámbito global. **Si la variable no fue declarada en ningún momento, el compilador la declara como variable global**.

+ En 'Strict mode' el compilador no creará la nueva variable en ámbito global sino que devolverá un error por variable no declarada.

La mejor forma de ver cómo funcionan estas reglas es probándolas en directo:

<iframe width="100%" height="600" src="//jsfiddle.net/juanmirod/zgsgqz2j/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Es interesante jugar un poco con el script, mover las declaraciones de sitio y ver que pasa. Espero que sirva a alguien de ayuda, para cualquier duda o aportación, este post está alojado en (github)[https://github.com/juanmirod/juanmirod.github.io/master/_posts/2016-02-19-ambito-en-javascript.markdown]
