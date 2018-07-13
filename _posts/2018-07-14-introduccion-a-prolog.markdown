---
published: true
title: Introducción a programación lógica con Prolog
description: Instalación y algunos ejemplos para comenzar a programar con Prolog.
layout: post
tags: [programación lógica, prolog] 
---

El lenguaje de programación Prolog es el lenguaje más conocido de programación lógica. La programación lógica es un tipo de programación declarativa que nos permite modelar nuestro problema en base a una serie de hechos y predicados que, aplicados a la entrada del usuario, permiten al intérprete inferir automáticamente la solución. Esta es la parte más importante: en prolog no decimos al programa cómo obtener la solución, solo definimos los hechos que sabemos que son ciertos y los predicados que definen las reglas del sistema. Es el motor lógico del intérprete el que, mediante la aplicación de los predicados, explorará el espacio de búsqueda que hemos creado en nuestro modelo para tratar de encontrar una solución.

En este post voy a tratar de presentar las herramientas principales del lenguaje y mostrar algunos ejemplos, además de añadir referencias y biliografía para poder profundizar en el tema.

Entorno de desarrollo y editor para Prolog: [Swi-prolog](http://www.swi-prolog.org/)
La instalación para Ubuntu es tan sencilla como añadir un PPA y usar apt-get para instalar el entorno (http://www.swi-prolog.org/build/PPA.txt):

```shell

    sudo apt-add-repository ppa:swi-prolog/stable
    sudo apt-get update
    sudo apt-get install swi-prolog

```

Para arrancar el intérprete de Prolog, bastará con escribir `prolog`:

```shell

$> prolog
Welcome to SWI-Prolog (threaded, 32 bits, version 7.6.4)
SWI-Prolog comes with ABSOLUTELY NO WARRANTY. This is free software.
Please run ?- license. for legal details.

For online help and background, visit http://www.swi-prolog.org
For built-in help, use ?- help(Topic). or ?- apropos(Word).

?-

```

Como indica el mensje de bienvenida, podemos escribir, por ejemplo `help(introduction).` y swi-prolog nos mostrará una ventana con el manual de ayuda.

En prolog tenemos dos piezas elementales para construir nuestros programas. Los _hechos_ y los _predicados_. Los hechos son axiomas o constantes que el sistema tomará como ciertos y usará, junto con los predicados, para encontrar soluciones a las peticiones que le planteemos.

Por ejemplo, si añadimos un hecho que diga que Juan es amigo de Patricia y el predicado que dice que los amigos de Juan son mis amigos:

```prolog
/* amigos.pl */
amigo(juan, patricia).
amigo(yo, X) :- amigo(juan, X).
```

Para cargar una serie de ficheros en el intérprete basta con escribir sus nombres, sin extensión, entre corchetes, separados con comas. 

Antes de cargar el código del ejemplo, veamos que está pasando:

X es una variable, las variables empiezan por mayúscula y prolog tratará de sustituirlas por alguna constanque que haya en un hecho para ver si se cumple el predicado.

Por ejemplo, podemos preguntar a Prolog si patricia es mi amiga `amigo(yo, patricia).`, prolog sustituirá la X por patricia y luego tratará de ver si hay algún predicado o algún hecho que permita confirmar que `amigo(juan,patricia).` como tenemos un hecho que es exactamente así, prolog responderá afirmativamente. 

```prolog
? - [amigos].
? - amigo(yo, patricia).
true.
```

Un ejemplo algo más interesante, traducido de [Guide to prolog programming](http://kti.mff.cuni.cz/~bartak/prolog/learning.html) que muestra cómo modelar algunas relaciones familiares. Una vez introducidos los hechos, el intérprete puede inferir respuestas a preguntas usando los predicados, por ejemplo para responder quién es la madre de `paul` o saber si `paul` y `adam` son hermanos.

```prolog
/*familia.pl*/

/* Hechos */
hombre(adam).
hombre(peter).
hombre(paul).
mujer(mary).
mujer(eve).

ascendiente(adam,peter).
ascendiente(eve,peter).
ascendiente(adam,paul).
ascendiente(mary,paul).

/* predicados */
padre(F,C) :- hombre(F), ascendiente(F,C).
madre(M,C) :- mujer(M), ascendiente(M,C).

es_padre(F) :- padre(F,_).
es_madre(M) :- madre(M,_).

hijo(S,X) :- hombre(S), ascendiente(X,S).
hija(D,X) :- mujer(D), ascendiente(X,D).

hermanos(A,B) :- ascendiente(P,A), ascendiente(P,B),A\=B.

tio(U,N) :- hombre(U), hermanos(U,P), ascendiente(P,N).
tia(A,N) :- mujer(A), hermanos(A,P), ascendiente(P,N).

descendiente(D,A) :- ascendiente(A,D).
descendiente(D,A) :- ascendiente(P,D), descendiente(P,A).

``` 

```prolog

? - [familia].
? - ?- madre(X,paul).
X = mary .

?- hermanos(paul,peter).
true .

?- padre(adam,paul).
true .

```

Una buena introducción al lenguaje es [este tutorial de la universidad de Granada](/public/prolog.pdf)

