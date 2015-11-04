---
published: false
title: Automatización de tareas con npm
layout: post
---
Hoy en día existen un montón de formas de automatizar tareas, compilaciones, tests y builds. Los desarrolladores de front en particular suelen utilizar Bower y npm para la gestión de paquetes, Grunt y Gulp para automatizaciones, Karma, Jasmine, Selenium y otras para test automáticos...

Pero claro, eso son un montón de herramientas y aunque cada una de ellas sea relativamente sencilla de utilizar a nivel básico, cuando nos incorporamos a un proyecto maduro puede que nos encontremos con que solo conseguir compilar y correr la web en local puede ser un rompecabezas.

Una forma de simplificar el número de herramientas que usará el proyecto, es re-utilizar alguna de las que ya usamos en lugar de incorporar nuevas. De esta forma, Grunt y/o Gulp (sí, hay proyectos por ahí que usan ambos, porque a veces se complementan) por scripts ejecutados desde npm. Si me apuráis, también podríamos prescindir de Bower ya prácticamente todos los paquetes que están en Bower están en npm, pero Bower sí hace una cosa muy interesante y es que sirve los ficheros de distribución y resuelve problemas de compatibilidad de front que a npm se le pasan por alto.

##¿Cómo utilizo npm para sustituir a Grunt/Gulp?

Pues ...