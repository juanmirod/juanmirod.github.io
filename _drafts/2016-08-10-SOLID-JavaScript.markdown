---
published: false
title: SOLID JavaScript: Introducción
layout: post
tags: [javascript] 
---
# SOLID JavaScript: Introducción

Este es el primero de una serie de artículos en los que analizaré los principios SOLID y cómo pueden aplicarse al desarrollo de aplicaciones en JavaScript. Los principios SOLID son muy conocidos en las comunidades de desarrolladores de lenguages como Java y C#, esto es, lenguages fuertemente tipados y orientados a objetos. JavaScript es un lenguage de tipado dinámico y basado en delegación en prototipos en lugar de en herencia de clases e interfaces, pero los principios SOLID son lo bastante genéricos y beneficiosos como para poder aplicarlos también en JavaScript, aunque en algunos casos no se ve tan afectado por los problemas de la POO. Los principios SOLID buscan mejorar dos principios básicos del diseño de software: aumentar la coherencia de las unidades de código y minimizar su acoplamiento.

La **coherencia** se refiere a que cada unidad de código (un módulo, una clase, una función) tenga una funcionalidad concreta y limitada. Es decir, que haga una sola cosa de la forma más completa posible.

El **acoplamiento** es la forma de medir las dependencias que hay entre las unidades de código. Decimos que dos unidades tienen un acoplamiento fuerte cuando están entrelazadas, por ejemplo en un módulo que llama directamente a funciones de otro módulo y viceversa. Diremos que hay acoplamiento débil o nulo cuanto un módulo no tiene dependencias o cuando se comunica con otros módulos a través de mensajes o abstracciones externas.

## 1. Single responsibility

El principio de responsabilidad única es uno de los pilares más importantes para el desarrollo. De hecho, dentro de los principio SOLID toma este nombre, pero también hay otros principios o conceptos que se refieren a este como el principio KISS (Keep it short and simple). Básicamente lo que dice este principio es que **una clase o módulo solo debe tener una funcionalidad concreta y que todos los servicios relacionados con esa funcionalidad deben estar encapsulados dentro de la clase o módulo.**

Este principio puede aplicarse también a funciones sin que pierda sentido. La importancia de este principio es que subraya la necesidad de reducir el acoplamiento en el código. Una función pura es el caso ideal de una unidad de código independiente y sin acoplamiento. 

Veamos algunos ejemplos de acoplamiento con código en JavaScript:



## 2. Open Closed 

Este principio establece que una clase o función debe estar abierta para extensiones pero cerrada a modificaciones. Esto quiere decir que la clase o función debe poder ampliarse añadiendo funcionalidad o propiedades, pero sin modificar el comportamiento inicial de la clase. ¿Cómo se hace eso? en POO normalmente el ejemplo es la herencia: una clase puede heredar de otra y ampliar su funcionalidad, sin modificar la clase original o el código que hace uso de ella.

En el caso de JavaScript el ejemplo perfecto son los decoradores y combinadores. 

## 3. Liskov sustitution 

El principio de sustitución de Liskov dice que los subtipos deben poder sustituir a su tipo padre sin romper su funcionalidad. Esto quiere decir que una clase o tipo que herede o de otra debe ser coherente con el funcionamiento de su padre. El ejemplo típido es el de la clase rectángulo y la clase cuadrado.

## 4. Interface segregation

El principio de segregación de la interface quiere decir que los los clientes de un programa sólo deben conocer el interface mínimo necesario para su comunicación. O dicho de otra forma, es mejor tener muchos interfaces pequeños que uno grande. Este principio trambién trata de reducir el acoplamiento, esta vez entre los diferentes clientes de un programa. Si solo tenemos un interface para todos los clientes, cualquier cambio los afecta a todos, mientras que si tenemos interfaces separados o fachadas para cada uno de ellos, podemos hacer cambios para cada cliente sin que los demás se vean afectados.

## 5. Dependency Inversion

La inversión de dependencia es otra forma de tratar de reducir el acoplamiento, esta vez entre módulos, haciendo que tanto los módulos de alto nivel como los de bajo nivel dependan de una abstracción o interface.

