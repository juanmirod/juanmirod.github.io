---
published: false
title: Introducción a programación lógica con Prolog
description: Instalación y algunos ejemplos de uso de Prolog.
layout: post
tags: [programación funcional, programación lógica, prolog] 
---

El lenguaje de programación Prolog es el lenguaje más conocido de programación lógica. La programación lógica es un tipo de programación declarativa que nos permite modelar nuestro problema en base a una serie de hechos y predicados que, aplicados a la entrada del usuario, permiten al intérprete inferir automáticamente la solución. Esta es la parte más importante: en prolog no decimos al programa cómo obtener la solución, solo definimos los hechos que sabemos que son ciertos y los predicados que definen las reglas del sistema. Es el motor lógico del intérprete el que, mediante la aplicación de los predicados, explorará el espacio de búsqueda que hemos creado en nuestro modelo para tratar de encontrar una solución.

En este post voy a tratar de presentar las herramientas principales del lenguaje y mostrar algunos ejemplos, además de añadir referencias y biliografía para poder profundizar en el tema.

Entorno de desarrollo y editor para Prolog: [Swi-prolog](http://www.swi-prolog.org/)
La instalación para Ubuntu es tan sencilla como añadir un PPA y usar apt-get para instalar el entorno (http://www.swi-prolog.org/build/PPA.txt):

```

    sudo apt-add-repository ppa:swi-prolog/stable
    sudo apt-get update
    sudo apt-get install swi-prolog

```

Un ejemplo básico de prolog, traducido de [Guide to prolog programming](http://kti.mff.cuni.cz/~bartak/prolog/learning.html) que muestra cómo modelar algunas relaciones familiares. Una vez introducidos los hechos, el intérprete puede inferir respuestas a preguntas usando los predicados, por ejemplo para responder quién es la madre de `paul` o saver si `paul` y `adam` som hermanos.

```prolog

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

