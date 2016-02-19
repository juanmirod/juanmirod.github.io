---
published: true
title: Ámbito en JavaScript
layout: post
---
# Ámbito en JavaScript

El ámbito de las variables en JavaScript puede ser un poco confuso a veces, pero en realidad sólo hay que seguir un par de reglas para saber a qué ámbito pertenece una variable.

+ En JavaScript las funciones tienen su propio ámbito y es un ámbito léxico, lo que quiere decir que depende de cómo son declaradas en el código y no de cuando se ejecutan.
+ Sólo las funciones pueden crear un nuevo ámbito y como excepción, los bloques **catch** también crean su propio ámbito, pero no existen ámbitos de bloque (codicionales, bucles y demás bloques no crean su propio ámbito).
+ A la hora de decidir a qué ámbito pertenece una variable, el compilador de JavaScript comprueba si la variable está declarada dentro de la función donde se invoca (ámbito local de la función) si no es así, busca en el ámbito de la función que la contenga y así hasta llegar al ámbito global. **Si la variable no fue declarada en ningún momento, el compilador la declara como variable global**.

La mejor forma de ver cómo funcionan estas reglas es probándolas en directo:

<iframe width="100%" height="300" src="//jsfiddle.net/juanmirod/zgsgqz2j/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

