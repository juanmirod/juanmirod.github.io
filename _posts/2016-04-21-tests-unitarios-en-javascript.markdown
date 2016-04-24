---
published: true
title: Tests unitarios en JavaScript con Jasmine
layout: post
tags: [javascript, test]
---

Los tests unitarios son una herramienta excelente para prevenir bugs en ejecución y para describir el comportamiento que debe tener el código. Además, y [sobre todo si se realizan antes que el código](http://research.microsoft.com/en-us/groups/ese/nagappan_tdd.pdf) de la aplicación (lo que se conoce como TDD), los test unitarios ayudan a estructurar mejor el código, hacerlo más modular e independiente y además ayudan a dividir los problemas y hacerlos más sencillos de programar.

En JavaScript, [Jasmine](https://jasmine.github.io/2.4/introduction.html) es un framework de test que permite crear tests fáciles de leer de forma que sirven también de documentación para el código. Así, usando Jasmine, si queremos escribir una suit de tests para una función que suma dos números llamada 'add' la escribiríamos así:

```
  describe('add function', function() {
    
    it('should add two numbers', function(){
      // código del test
    });

    it('should throw an error if you try to add strings', function(){
      // código del test
    });

    ...
  
  })
```

Vamos a ver algunos ejemplos de código y sus correspondientes tests. El projecto es una sencilla calculadora en JavaScript pero es diferente a los típicos ejemplos de calculadoras en javascript, ya que en esta no se utiliza eval para calcular los resultados, sino que el input se valida y las operaciones están limitadas a las que están definidas. Para ello he creado dos pequeños módulos, uno para la lógica y otro para el interface. 

El proyecto es un ejemplo sencillo, según las especificaciones de cada proyecto serán pertinentes más o menos tests y habrá que controlar casos más concretos, espero que este proyecto sirva de ejemplo aunque no sea muy exhaustivo ni tenga muchos requisitos.

Empezaremos con los test de la clase que controla el funcionamiento de la calculadora por ser más sencillo. Cuando tienes una clase que no realiza operaciones de entrada salida, ni modifica el DOM o interacciones del usuario es mucho más sencillo escribir los tests. A eso me refería antes con que escribir los tests primero te ayuda a separar el código y a promueve mucho el principio de que cada función se encargue sólo de una cosa. 

En problemas fáciles como este de la calculadora, es fácil verse tentado a poner todo el código junto, meter un par de funciones en el código que maneja el interface y listo. El problema viene a largo plazo, cuando el cliente dice que además de calcular tiene que mostrar el resultado intermedio y luego al mes te dicen que al meter un símbolo que no debería hacer nada la calculadora da un error muy feo y empezamos a poner más código en esas funcioncitas en medio del interface y esas funcioncitas van creciendo hasta tener cientos de líneas de código y... seguro que ya sabes por donde voy.

Por eso es por lo que en esta ocasión vamos a usar TDD y vamos a escribir primero unos tests de lo que queremos que nuestra calculadora haga:

```javascript
// Calculator.spec.js
describe('Calculator', function() {

  it('should have a storeAction function', function() {
    expect(Calculator.storeAction).toBeDefined();
  });
  
  describe('storeAction', function() {
    
    beforeEach(function() {
      Calculator.storeAction('RESET');
    });

    it('should return the last result for unkown actions', function() {
      expect(Calculator.storeAction('HI')).toEqual(0);
      Calculator.storeAction('1');
      expect(Calculator.storeAction('HI')).toEqual(1);
    });

    it('should add numbers', function(){
      Calculator.storeAction('1');
      Calculator.storeAction('ADD');
      Calculator.storeAction('1');
      expect(Calculator.storeAction('RESULT')).toEqual(2);
    });
    
    it('should multiply numbers', function() {
      Calculator.storeAction('2');
      Calculator.storeAction('MULTIPLY');
      Calculator.storeAction('4');
      expect(Calculator.storeAction('RESULT')).toEqual(8);
    });
  
  }); 

});
```

Bien, ya sabemos lo que queremos, una calculadora que sume y multiplique, y que no admita cualquier cosa por la entrada. Para implementar esto nuestro Módulo calculadora debe tener una función `storeAction` que será la que utilicimos para introducir la siguiente operación o número sobre el que la calculadora debe operar, imitando el funcionamiento normal de una calculadora clásica. La functión **beforeEach** es una función de jasmine que se ejecutará antes de cada función **it** y que nos sirve para asegurarnos de que antes de cada test partimos del mismo estado inicial.

Estos tests están bien para comenzar, pero si nos fijamos veremos que hay muchos más casos que controlar, como ¿qué pasa si añado dos números seguidos? ¿y si añado dos operaciones? ¿Donde está el test para la función de *RESET*? Todos estos test deberán ir añadiendose y satisfaciéndose en el código.

Si solo tenemos los tests y los ejecutamos en la línea de comandos o en el navegador, veremos que fallan. Para ejecutarlos lo más sencillo es crear un fichero *html* en el que añadiremos los scripts de jasmine que están alojados en el CDN de jsdeliver. A continuación añadimos los ficheros js de nuestra aplicación y los ficheros que contienen los tests para los diferentes módulos:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sample Unit tests runner</title>
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/jasmine/2.4.1/jasmine.css">

  <script src="https://cdn.jsdelivr.net/jasmine/2.4.1/jasmine.js"></script>
  <script src="https://cdn.jsdelivr.net/jasmine/2.4.1/jasmine-html.js"></script>
  <script src="https://cdn.jsdelivr.net/jasmine/2.4.1/boot.js"></script>
  
  <script src="calculator.js"></script>
  <script src="calculator.spec.js"></script>
  
</head>
<body>

  
</body>
</html>
```

Al abrir este fichero en el navegador, Jasmine creará un pequeño interface y listará los tests junto con los resultados y los errores que hayan ocurrido. En este caso, si sólo tenemos el fichero de especificaciones, todos los tests fallarán.

Para satisfacerlos, deberemos crear el módulo **Calculator** y añadir la función **storeAction** con la funcionalidad suficiente para que satisfaga los tests:

```javascript
// Calculator.js
var Calculator = (function(){
  'strict mode';
  
  var store = '',
    
  lastResult = 0,
  
  setLastResult = function(num) {
    
    lastResult = parseFloat(num);
    
  },
  
  exports = { 
    
    isNumeric: function(n) {

      return !isNaN(parseFloat(n)) && isFinite(n);

    },
    
    storeAction: function(action) {

      if(exports.isNumeric(action) && !exports.isNumeric(store)) {
        
        var num = parseFloat(action);
        switch(store) {
          case 'ADD':
            setLastResult(lastResult + num);
            break;
            
          case 'MULTIPLY':
            setLastResult(lastResult * num);
            break;
                        
          default:
            store = action;
            setLastResult(action);
            break;
        }
        
        store = '';

      } else { // new operation
        
        store = action;
        
        if(exports.isNumeric(action)) {
        
          setLastResult(action);
        
        } else if(action == 'RESET') {
        
          setLastResult(0);
        
        }
        
      } 

      return lastResult;
    }
    
  };
  
  return exports;
  
})();
```

Este código satisface los tests de arriba y algunos más. Aún nos quedaría añadir la funcionalidad para restar, dividir, limpiar el input, etc. Puedes ver el ejemplo algo más completo en [este thimble](https://thimbleprojects.org/juanmirod/56250/). Para ver el resulado de los tests haz click en el fichero 'test.html'.

Si te fijas, en ese projecto no hay tests para la parte del interface. Hay funciones del interface que no tiene mucho sentido testar, el markup puede cambiar sin alterar la funcionalidad y no tiene mucho sentido escribir tests para algo así. Pero sí que podemos escribir tests que verifiquen que cuando hago click en un botón o pulso una tecla, se llama a la función adecuada. Estos tests son algo más complicados porque necesitamos una herramienta que cree un DOM sobre el que podamos operar en nuestros tests. En el siguiente artículo me centraré en cómo añadir [Karma](https://karma-runner.github.io/0.13/index.html) a nuestro proyecto y utilizarlo para escribir tests de interface. 
