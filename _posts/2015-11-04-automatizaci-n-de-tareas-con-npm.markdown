---
published: false
title: Automatización de tareas con npm
layout: post
tags: [automatización]
---

Hoy en día existen un montón de formas de automatizar tareas, compilaciones, tests y builds. Los desarrolladores de front en particular suelen utilizar Bower y npm para la gestión de paquetes, Grunt y Gulp para automatizaciones, Karma, Jasmine, Selenium y otras para test automáticos...

Pero claro, eso son un montón de herramientas y aunque cada una de ellas sea relativamente sencilla de utilizar a nivel básico, cuando nos incorporamos a un proyecto maduro puede que nos encontremos con que solo conseguir compilar y correr la web en local puede ser un rompecabezas.

Una forma de simplificar el número de herramientas que usará el proyecto, es re-utilizar alguna de las que ya usamos en lugar de incorporar nuevas. De esta forma, Grunt y/o Gulp (sí, hay proyectos por ahí que usan ambos, porque a veces se complementan) por scripts ejecutados desde npm. Si me apuráis, también podríamos prescindir de Bower ya prácticamente todos los paquetes que están en Bower están en npm, pero Bower sí hace una cosa muy interesante y es que sirve los ficheros de distribución y resuelve problemas de compatibilidad de front que a npm se le pasan por alto.

##¿Cómo utilizo npm para sustituir a Grunt/Gulp?

Pues es muy sencillo en realidad si se conoce la estructura de un fichero de paquete de npm. Un fichero de npm básico sirve para describir el proyecto y especificar sus dependencias. Si queremos que nuestro proyecto siga siendo privado sólo tenemos que añadir la propiedad `private` a `true` y listo. Lo mínimo que deberemos especificar será algo así:

```json
{
  "name": "Nombre del proyecto",
  "version": "0.0.1",
  "description": "Descripción del proyecto",
  "main": "index.html",
  "scripts": {
    "comando": "script"
  },
  "keywords": [],
  "author": "juanmirod",
  "license": "GPL-3.0",
  "private": true,
  "devDependencies": { }
}
```

Solo con eso ya tenemos un paquete de npm y lo mejor viene en la propiedad `scripts`. Ahí podemos especificar tantos scripts queramos y además podemos utilizar tanto bash como otros paquetes de npm que hayamos incluido en devDependencies.

De este modo, mediante pequeños scripts y herramientas de npm podemos compilar o testear cada vez que se modifique un fichero, compilar y enpaquetar el proyecto mediante un comando, generar documentación... realmente todo lo que queramos ya que en estos scripts cabe cualquier cosa. La ventaja es que si ya te manejas con algún lenguage shell no necesitas nada más. No necesitas aprender las convenciones de grunt y gulp, las opciones de configuración y cómo construir los comandos. No dependes de que una funcionalidad concreta o una peculiaridad que necesitas para tu proyecto se implemente en estos gestores para que tú puedas usarla, simplemente construyes los scripts que necesites, los añades a tu fichero de paquete y te olvidas de aprender y mantener más herramientas, al fin y al cabo somos desarrolladores, escribir los scripts seguramente te lleve menos tiempo y te cueste menos mantenerlos.

La desventaja por supuesto es que grunt/gulp son más sencillos suponinedo que no tienes ni idea de nada. Estos gestores tienen buena documentación y son sencillos de utilizar a nivel básico, se basan sobre todo en convenciones y opciones sobre comandos testados y utilizados por miles de usuarios.

Pero si la idea de tener tus propios scripts en tu proyecto aprovechando los paquetes de npm te llama la atención, veamos cómo podemos hacer algunas cosas:

