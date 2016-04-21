---
published: false
title: Tests unitarios en JavaScript con Jasmine
layout: post
tags: [javascript, test]
---

Los tests unitarios son una herramienta excelente para prevenir bugs en ejecución y para describir el comportamiento que debe tener el código. Además, y sobre todo si se realizan antes que el código de la aplicación (lo que se conoce como TDD), los test unitarios ayudan a estructurar mejor el código, hacerlo más modular e independiente y además ayudan a dividir los problemas y hacerlos más sencillos de programar.

En JavaScript, Jasmine es un framework de test que permite crear tests fáciles de leer de forma que siven también de documentación para el código. Así, usando Jasmine, si queremos escribir una suit de tests para una función que suma dos números llamada 'add' la escribiríamos así:

```
  describe('add', function() {
    
    it('should add two numbers', function(){
      // código del test
    });

    it('should throw an error if you try to add strings', function(){
      // código del test
    });

    ...
  
  })
```

Vamos a ver algunos ejemplos de código y sus correspondientes tests. El projecto es una sencilla calculadora en JavaScript pero es diferente a los típicos ejemplos de calculadoras ya que en esta no se utiliza eval para calcular los resultados, sino que el input se valida y las operaciones están limitadas a las que están definidas. Para ello he creado dos pequeños módulos, uno para la lógica y otro para el interface. 

El proyecto es un ejemplo sencillo, según las especificaciones de cada proyecto serán pertinentes más o menos tests y habrá que controlar casos más concretos, espero que este proyecto sirva de ejemplo aunque no sea muy exhaustivo ni tenga muchos requisitos.

Empezaremos con los test de la clase que controla el funcionamiento de la calculadora por ser más sencillo. Cuando tienes una clase que no realiza operaciones de entrada salida, ni modifica el DOM o interacciones del usuario es mucho más sencillo escribir los tests. A eso me refería antes con que escribir los tests primero te ayuda a separar el código y a promueve mucho el principio de que cada función se encargue sólo de una cosa. 

En problemas fáciles como este de la calculadora es fácil verse tentado a poner todo el código junto, meter un par de funciones en el código que maneja el interface y listo. El problema viene a largo plazo, cuando el cliente dice que además de calcular tiene que dibujar gráficas de funciones y luego al mes te dicen que al meter un símbolo que no debería hacer nada la calculadora da un error muy feo y empezamos a poner más código en esas funcioncitas en medio del interface y esas funcioncitas van creciendo hasta tener cientos de líneas de código y... seguro que ya sabes por donde voy.

Por eso es por lo que en esta ocasión vamos a usar TDD y vamos a escribir primero unos tests de lo que queremos que nuestra calculadora haga:

XXXX

Bien, ya sabemos lo que queremos, una calculadora que sume, reste multiplique y divida, pero que no admita cualquier cosa por la entrada.