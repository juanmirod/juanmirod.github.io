# Por amor al código

*Por amor al código* es un blog de código abierto escrito utilizando Jenkins y Github. Aquí puedes encontrar tanto los posts publicados como los borradores, el código que compila el blog y los estilos css.

El blog está dedicado a explicaciones de fragmentos de código, técnicas y patrones de programación y artículos de opinión sobre informática en general.

El objetivo del blog es servir como wiki personal de cosas que voy aprendiendo, quiero practicar o recordar y de camino servir como contenido sobre desarrollo en español. Veo muy poco contenido en español, especialmente de nivel intermedio/avanzado, este también es mi granito de arena al contenido hispano.

Puedes ver el blog online [aquí](http://juanmirod.github.io/).

Fuentes de inspiración para este blog, a las que les debo mucho por todo lo que he aprendido y cuánto me han inspirado a mejorar:

- El bliki de Martin Fowler y en especial [este post sobre Evolving writing](https://www.martinfowler.com/bliki/EvolvingPublication.html) Este blog sigue esa idea de crear un artículo e ir revisándolo y completándolo con el tiempo.

- [Coding horror](https://blog.codinghorror.com/) de Jeff Atwood Su blog fue de los primeros que descubrí y me animó a escribir sobre desarrollo.

- [Wiki](http://wiki.c2.com/) Más de una vez me he tropezado con "el wiki" siguiendo enlaces sobre Xtreme Programing o Lisp por ejemplo.

- [Joel on Software](https://www.joelonsoftware.com/) Junto con Coding Horror uno de los blogs más conocidos y nombrados de desarrolladores.

- [Brain Pickings](https://www.brainpickings.org/) Maria Popova ha creado un proyecto de vida que es a la vez su sustento, su hobbie y su legado. Cuando alguien pone tanto tiempo y esfuerzo en algo puedes notarlo desde el primer momento. 

- [Neil Gaiman así en general](http://journal.neilgaiman.com/) Porque su consejo para todos aquellos que le preguntan como ser escritor o cómo escribir un libro siempre es: Escribe, ya. Termínalo, publícalo y escribe otro. Escribe y lee todo lo que puedas:

> Assume that you have a million words inside you that are actually rubbish, and you need to get them out before you get to the good ones, and if you get there early, that's great. (https://youtu.be/1Z4mwSdcLoc?t=36m25s)


> Contar todas las palabras del blog :smile:: 
> `find . \( -wholename './_posts/*' -o -wholename './books/*' -o -wholename './_microblog/*' \) -exec cat {} \; | wc -w` 


## Colabora

Cualquier aportación, corrección o sugerencia es bien recibida, puedes crear un nuevo *issue* para cualquier comentario sobre un artículo.

## Ejecutar el blog en local con docker

El blog se puede compilar y ejecutar en local usando docker con un par de comandos. Para crear el docker ejecuta:

```
docker build -t juanmirodblog .
```

Una vez creada la imagen puedes ejecutarla con:

```
docker run -p 4000:4000 -v $(pwd):/site juanmirodblog
```

Y podrás ver el blog en `localhost:4000`