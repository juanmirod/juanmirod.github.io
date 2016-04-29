---
published: false
title: Configurando Karma en un projecto JavaScript
layout: post
tags: [javascript, test]
---

Este es el segundo de una serie de artículos sobre tests automáticos. Puedes encontrar el artículo anterior, que habla sobre Jasmine y TDD [aquí](http://juanmirod.github.io/2016/04/21/tests-unitarios-en-javascript.html).

Como decía en el artículo anterior, una de las herramientas imprescindibles para trabajar con TDD es tener una visión que se actualice automáticamente con el resultado de los tests al guardar tus cambios. De esta forma puedes trabajar más cómodamente sin tener que estar cambiando de ventana y ejecutando los tests a mano. 

Lo ideal sería tener dos monitores para poder tener uno sólo con el editor y el otro para la ventana de los tests, la de la aplicación o la documentación que estemos consultando en ese momento. Si no tenemos dos monitores pues tendremos que hacer el mejor uso que podamos del que tenemos y ponerlo a pantalla partida, utilizar varios escritorios virtuales o lo que más nos guste.

Una vez dicho esto, ¿Cómo hago para que la ventana del navegador o la consola estén comprobando si guardo cambios en el código y se actualicen? Hoy voy a mostrar como hacer esto con Karma, que me parece una de las opciones más rápidas y sencillas. Aunque hay muchas otras opciones para esto.

[Karma](https://karma-runner.github.io/0.13/index.html) es un entorno que monitoriza los archivos del código y cuando comprueba que ha habido cambios ejecuta nuestra suite de tests, es justo lo que necesitamos ahora mismo, ni más ni menos. Lo creo el equipo de AngularJS y es una herramienta fiable y que goza de buena salud en cuanto a mantenimiento.

Para usarlo debemos tener instalado node y npm en nuestro ordenador. Si no lo tienes aún y te quieres dedicar a trabajar con JavaScript de forma seria te recomiendo que lo instales aunque no te interese Karma. Para más info sobre cómo instalar node, puedes ver [la página oficial](https://nodejs.org/en/).

Siguiendo con el ejemplo de la calculadora, para instalar Karma, primero creamos el paquete npm para el proyecto. Esto en realidad no es más que un fichero `package.json` que contiene información sobre las dependencias de nuestro proyecto y una pequeña descripción, la licencia y demás. Para crearlo, desde línea de comandos podemos hacer:

```shell
$> npm init
```

Y npm nos hará una serie de preguntas sobre el proyecto para rellenar el fichero. Una vez creado sólo tenemos que escribir:

```shell
$> npm install karma --save-dev

$> npm install karma-jasmine karma-chrome-launcher --save-dev
```

Este comando instalará Karma en nuestro proyecto dentro de la carpeta `node_modules`. La segunda línea instala los plugins para utilizar Jasmine como framework de tests y para poder ejecutar el navegador de forma automática. Como karma está instalado dentro de la carpeta node_modules, para ejecutarlo tendríamos que hacer `./node_modules/karma/bin/karma start` Como eso es un poco royo, podemos instalar el comando karma-cli que busca nuestra instalación local aunque lo invoquemos sin la ruta:

```shell
$> sudo npm install -g karma-cli

# Ahora podemos ejecutar karma simplemente diciento
$> karma start
```

Pero si hacemos `karma start` veremos que no pasa nada. Una vez instalado, tendremos que crear el fichero de configuración de Karma, que es parecido al de npm y que se puede crear con el mismo comando:

```shell
$> karma init
```  

Del mismo modo que con npm se nos preguntarán ciertas cosas sobre el proyecto. Decimos que navegador queremos ejecutar, el framework de tests, que en este caso es Jasmine y luego indicamos, por orden o mediante comodines, los scripts que queremos que karma monitorize y cargue en el entorno de test. Es importante aquí que si necesitamos que los archivos se carguen en un orden concreto porque no utilizamos un gestor de módulos, los pongamos en ese orden en el fichero de configuración de karma. En nuestro projecto de ejemplo estos serían los ficheros:

