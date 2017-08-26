---
published: true
title: Introducción a Node.js
description: Tutorial de instalación y primeros pasos con NodeJS
layout: post
tags: [javascript] 
---

[Node.js](https://nodejs.org/) es un entorno de ejecución de JavaScript que utiliza el motor V8 de Google. La historia de JavaScript y de Node.js es curiosa porque casi parece que todo surgió por accidente. JavaScript es conocido por haber sido [diseñado en 10 días por Bredan Eich](/public/javascript10days.pdf) y por sus [inconsistencias](https://www.destroyallsoftware.com/talks/wat), pero aun así se convirtió en el el lenguaje de facto de la web. Esto lo hizo cada vez más y más popular a medida que todas las páginas necesitaban más funcionalidad para cubrir las espectativas de los usuarios. JS es en la actualidad uno de los lenguajes más utilizados y de mayor crecimiento. Con lo que era inevitable que los desarrolladores de JavaScript quisieran usar el lenguaje fuera de los navegadores. Como dice la Ley de Atwood:

> Any application that can be written in JavaScript, will eventually be written in JavaScript [ver más](https://blog.codinghorror.com/the-principle-of-least-power/)

Antes de Node.js hubo varios intentos de establecer un entorno de ejecución para JavaScript fuera de los navegadores, una historia muy entretenida sobre los inicios de Node.js y npm la cuenta el propio Issac Z. Schlueter (creador de npm) [en su blog](http://blog.izs.me/post/157295170418/my-first-npm-publish)

**TLDR:** Node.JS y npm se convirtieron en el entorno de ejecución de JavaScript en el servidor y ahora podemos utilizar el mismo lenguaje para desarrollar en el servidor y en el cliente.

## Instalación y el REPL

Para instalar Node.js en Windows o en Mac basta con ir a la página principal y descargar el instalador. Si usas Ubuntu solo necesitamos un par de comandos:

```

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

```

Si usas otra distribución de Linux, [mira aquí](https://nodejs.org/en/download/package-manager/#installing-node-js-via-package-manager).

Una vez instalado podemos comprobar que la versión es la correcta (actualmente la versión LTS es la 6.x) haciendo 

```

node -v


```

Para ejecutar el intérprete de Node, el REPL, simplemente escribimos el comando `node` y el terminal pasará a ser una consola de JavaScript en la que podremos ejecutar nuestro código.

El REPL (siglas del inglés Read Eval Print Loop) es una consola que ejecuta cada expresión en JavaScript que le demos y devuelve el resultado de la expresión inmediatamente. Por ejemplo si escribimos:


```

> 2 + 2
4

```

`4` es el resultado de la expresión `2 + 2`, otro ejemplo

```

> console.log('Hola Mundo')
'Hola Mundo'
undefined

```

'Hola mundo' es la salida que produce `console.log('Hola Mundo')` y `undefined` es lo que devuelve la función. También podemos definir funciones y variables `globales` que podremos usar a continuación:

```

> var factorial  = function(x) {
...   if ( x <= 1 ) return x
...   return x * factorial(x-1)
... } 
undefined
> factorial(4)
24

```

En las versiones actuales de Node.js tenemos soporte de prácticamente la totalidad de la especificación de ES2015, con lo que podríamos escribir la función de arriba de otra forma:

```

> const factorial  = x => ( x <= 1 ) ? x : x * factorial(x-1) 
undefined
> factorial(4)
24

```


El REPL es muy útil para probar pequeñas funciones y expresiones, yo cada vez lo utilizo más a menudo y los ejemplos de este blog suelen estar escritos de forma que sean fáciles de probar en el REPL. La ventaja de tener una respuesta inmediata a una duda de código es invaluable y normalmente no nos damos cuenta de eso hasta que lo probamos.

## Módulos y npm

Node no es solo el REPL, también podemos ejecutar ficheros. Solo tenemos que crear un fichero con el código javascript que queramos ejecutar y pasárselo al comando `node`

```

echo 'console.log("Hello Node")' > hello.js
node hello.js
// Hello Node

```

Cada fichero JavaScript es un módulo para Node.js y si queremos usar alguna función definida dentro del fichero primero tendremos que exportarla. Por ejemplo creemos el fichero `factorial.js` con el siguiente contenido:

```

const factorial = x => ( x <= 1 ) ? x : x * factorial(x-1)

module.exports = factorial


```

Si ejecutamos ese fichero veremos que no pasa nada. 

```

node factorial.js 


```

Nuestro módulo no hace nada a parte de definir una función y exportarla, pero desde el propio REPL o desde otro fichero Node.js podremos importar esta función y utilizarla:


```

> const factorial = require('./factorial.js')
> factorial(5)
120

```

¿Mola eh? Ya tenemos un mecanismo para escribir código, encapsularlo en módulos y ejecutarlo. Esta es la base del desarrollo en Node, tan sencillo como eso. 

Node trae una serie de módulos básicos que podemos utilizar a modo de [librería estandard](https://nodejs.org/dist/latest-v6.x/docs/api/) Pero uno de los puntos fuertes de Node.js es el haberse mantenido flexible gracias a tener una librería estandar muy pequeña.

Ese es también el punto fuerte de npm. [npm](https://www.npmjs.com/) es un repositorio centraliazdo de módulos para Node.js En la comunidad de Node.js y npm la filosofía también es la de módulos pequeños que hagan una sola cosa, parecido a lo que ocurre con los comandos de Unix. Esto hace el lenguaje más fácil de componer, reordenar y modificar y tiene un gran potencial. Ahora mismo npm es el repositorio con mayor número de módulos de código abierto de todos los lenguajes y su número sigue creciendo a mayor velocidad que todos los demás.

npm se instala en nuestro sistema junto con Node.js y podemos usarlo para instalar cualquier paquete de forma global o local a nuestro proyecto. Un proyecto es simplemente una carpeta donde hemos ejecutado `npm init`:


```

mkdir hello
cd hello
npm init

``` 

Al ejecutar este comando el programa nos hará algunas preguntas sobre el proyecto y creará un fichero `package.json` con la configuración mínima. Si solo queremos probar a instalar algunos paquetes podemos ejecutar `npm init -y` para crear este fichero y npm usará la configuración mínima por defecto y el nombre de la carpeta como nombre del proyecto.

Ahora podemos instalar cualquier paquete del registro ejecutando `npm install` Por ejemplo podemos instalar [expressjs](http://expressjs.com), una serie de librerías para crear un servidor web:


```

npm install --save express

```

El modificador `--save` indica a npm que queremos que guarde esta dependencia en el fichero del proyecto. Con express instalado localmente, podemos crear nuestro fichero `index.js` con este contenido:

```

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hola desde Node!')
})

app.listen(3000, function () {
  console.log('Servidor creado y escuchando en el puerto 3000!')
})


```

Y ejecutarlo en la consola: 


```

node index.js

Servidor creado y escuchando en el puerto 3000!

```

Si abres un navegador y vas a 'localhost:3000' verás el mensaje 'Hola desde Node!'

Esas son las herramientas básicas de desarrollo en Node.js. Módulos, un entorno de ejecución, el repositorio central de npm y JavaScript. Con lo que sabes ya puedes ir a explorar un poco el registro de npm o la documentación de express y comenzar a desarrollar tu propio servidor web :D
