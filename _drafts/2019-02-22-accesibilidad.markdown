---
published: false
title: HTML semántico y accesibilidad
description: Introducción a los conceptos de HTML semántico y accesibilidad como elementos de mejora de la experiencia de usuario
layout: post
tags: [html5,accesibilidad]
---

Esta introducción está enfocada a desarrolladores que estén familiarizados con HTML y quieran ampliar sus conocimientos y mejorar la robustez, accesibilidad, organización y legibilidad de sus desarrollos.

## ¿Por qué accesibilidad?

Es importante clarificar que la accesibilidad, además de una cuestión básica de equidad en el acceso a la información, es un algo que beneficia a todos y cada uno de los usuarios de una aplicación o de una página web. Al diseñar una aplicación teniendo en cuenta la accesibilidad desde el comienzo, conseguiremos que sea más fácil de leer y de comprender por todos los usuarios. Además, cualquiera de nosotros podemos, por circunstancias de la vida, vernos en un estado temporal de incapacidad. Tal vez por una lesión puede que tengamos que usar solo una de nuestras manos durante un tiempo. Bajo ciertas condiciones lumínicas nuestra visión puede ser menor de la habitual (sol, destellos) puede que estemos en un lugar muy ruidoso o donde se deba guardar silencio y no podamos usar el audio del ordenador, tal como si fuésemos sordos... Las páginas accesibles tienen estas y otras muchas situaciones en cuenta de forma que siempre sean usables por todos y en todas las circunstancias posibles.

## ¿Por donde empiezo?

Hay muchos recursos online, guías y listas de requisitos que nos ayudan a mejorar la accesibilidad de nuestra web, vamos a hacer un repaso de los conceptos básicos y en la bibliografía se incluyen enlaces a todos estos recursos para poder seguir aprendiendo.

Un aspecto a tener en cuenta es que las etiquetas semánticas de HTML5 y construir nuestra página en el orden natural de lectura nos ayudará a aumentar la accesibilidad de la web. Si usamos las etiquedas semánticas correctamente y la página está bién estructurada, los lectores de texto y los atajos de teclado funcionarán sin tener que hacer ajustes adicionales. Una ventaja añadida es que el código también será más legible para el desarrollo y para los robots de los buscadores.

Las principales etiquetas semánticas son:

+ header - Cabecera de la página

+ footer - El pie de página

+ nav - Indica que este elemento contiene el menú de navigación de la página

+ aside - Es un elemento añadido al contenido principal, se puede usar para widgets, notas sobre un artículo, etc

+ main - El contenido principal de la página

+ section - Delimita una sección dentro de una página o un artículo

+ article - Delimita el contenido de un artículo dentro de la página

Además de estas etiquetas, debemos añadir atributos a nuestros elementos que permitan a las herramientas que leen en voz alta la página describir las imágenes y leer correctamente los formularios:

Todas las imágenes deben tener un texto alternativo que explique el contenido de la imagen.
Los elementos label deben apuntar al elemento al que se refieren.
Todos los enlaces deben tener un href y no comportarse como botones.
Los botones deben ser elementos button y no enlaces.

Si cumplimos estas recomendaciones en el HTML ya tendremos una web mucho más accesible y fácil de leer, pero hay que tener en cuenta otros factores como los colores elegidos para la web, su organización y que el contenido sea accesible por todo el mundo. Esto último quiere decir que si tenemos elementos de audio o video, la página deberá proveer una transcripción o substítulos completos en el video que permitan verlo a una persona sorda.

