---
published: false
title: Técnicas para desarrollo de tests automáticos en JS
description: Cómo crear tests asíncronos, restringir la ejecución de tests y crear mocks
layout: post
tags: [javascript] 
---

Durante el tiempo que llevo escribiendo tests automáticos para mis aplicaciones he aprendido muchas cosas. Me he acostumbrado a escribir tests y he ganado en seguridad a la hora de desarrollar. Gasto menos tiempo debugueando y más tiempo desarrollando y sobre todo tengo confianza como para refactorizar trozos de los proyectos sin miedo a romper la funcionalidad. Tanto es así que ahora no me planteo escribir nada que vaya más allá de 10 líneas sin tener una suit de tests y no termino de entender por qué la mayoría de los desarrolladores no escriben tests y por qué no se enseña a programar usando TDD desde el principio. Mi yo de hace un par de años tampoco escribía tests, pero porque nadie me había enseñado a hacerlo y siempre que alguien hablaba de las ventajas de los tests había otros tantos citando a Dijsktra y su famosa dita:

> "Testing can show the presence, not the absence of bugs" EW Dijsktra

Pero esa cita le hizo un flaco favor al mundo del desarrollo. Los tests no prueban que tu programa sea infalible, pero te ayudan a diseñarlo y a construirlo de forma ordenada, te ayudan a descubrir los errores pronto y a tener confianza al refactorizar. Al pensar en todo esto, siempre me pongo nervioso y me da por escribir en twitter y todo.

<blockquote class="twitter-tweet" data-lang="en"><p lang="es" dir="ltr">Pregunta seria que me llevo haciendo un tiempo: ¿Por qué nadie enseña a programar desde cero usando TDD? Imagina ahorrarte todas esas horas frustrado delante del ordenador escribiendo printf para ver que estaba pasando porque no sabías debugear ni escribir un test...</p>&mdash; Juanmi Rodriguez (@juanmirod) <a href="https://twitter.com/juanmirod/status/923646197109329921?ref_src=twsrc%5Etfw">October 26, 2017</a></blockquote>

Creo firmemente que si nos enseñaran a escribir tests desde el principio en lugar de enseñarnos con esas ridículas metáforas sobre recetas de cocina y pseudocódigo, el desarrollo de software sería algo muy diferente a lo que conocemos muchos ahora.

Pero nunca es fácil encontrar información sobre cómo escribir tests, cómo ejecutarlos y cómo usarlos. Tengo que admitir que para enseñar a programar empezando por los tests, alguien tendría que escribir los tests por ti. Los tests son tan difíciles o más de escribir que el código que están testeando, y básicamente empezar por los tests para alguien sin experiencia es como tratar de correr antes que andar. 

Así que quiero aportar mi granito de arena contando lo que he aprendido hasta ahora con dos objetivos principales: el primero es archivarlo en mi blog para ver si sigo pensando lo mismo dentro de 5 años, y el segundo es predicar con el ejemplo y ayudar a que más desarrolladores españoles se pasen al lado de los tests y dejen de lado la frustración de los console.log, los printf y demás ténicas de debugueo chusqueras que no son más que parches.

## Setup del proyecto 

Lo primero que necesitamos y no suele venir dado para desarrollar una suit de tests es un test runner, y preferiblemente una librería de test que nos facilite la labor de escribir los casos de prueba y las comprobaciones. Personalmente mi preferida es Jasmine, [En un post anterior][1] explico como crear un proyecto que use JasmineJS y Karma para crear y ejecutar tu suit de tests. Hay otras muchas librerías y test runners, dependiendo del tamaño del proyecto y de la experiencia personal o del equipo podemos preferir una u otra. Yo me centraré en este artículo en el uso de JasmineJS, pero todas son parecidas, lo importante es la forma de organizar el código para que sea fácil de testear. Para mostrar mejor todos los ejemplos que vienen he creado un proyecto en github y he ido añadiendo el código mientras escribía este texto. Puedes ver la configuración inicial en [el primer commit][2].

## Primeros tests

Escribir los primeros tests siempre parece un poco tonto. Hay tan poco código que probar: total son solo unas decenas de líneas de código exploratorio, o es una api trivial que solo hace operaciones CRUD sobre un listado sin ninguna lógica extra...

> En mi humilde experiencia el mejor momento para escribir los primeros tests es **DESDE EL PRINCIPIO**

No me entiendas mal, el código exploratorio está bien y hacer un par de pruebas en dos días o tres te ayuda a pensar en el problema, y tal vez al principio seas como yo de los que prefieres esbozar la GUI en HTML para tener algo visual que modificar y probar. Todo eso está bien. Pero, seguramente, cuando quieras añadirle tests te darás cuenta de que, tal y como está, es una maraña y es imposible de testear. O bien empiezas de nuevo y añades los tests desde el principio, o bien has dejado pasar demasiado tiempo y tu prototipo de espagueti ha crecido hasta ser usable, te están pidiendo más funcionalidad y ya no quieres tirarlo todo por la ventana. Y entonces ya has perdido la oportunidad de escribir tests para ese proyecto.

Y este creo que es el mayor escoyo que se encuentra el desarrollo de tests. Si no los escribes es muy fácil caer en la tentación (o hacerlo sin darte cuenta) de escribir funciones que hacen muchas cosas o que están interrelacionadas, funciones o clases acopladas a 3 o 4 funciones o clases diferentes, etc. Todo esto hace muy difícil, por no decir imposible, crear tests unitarios, y de ahí que, cuando intentamos añadir un test a nuestro proyecto y tenemos que crear 3 mocks diferentes para un solo test nos parece que es una pérdida de tiempo y lo dejamos como está.

Por eso pienso que es mejor escribir los tests desde el principio. No tienen que ser muchos, ni muy exhaustivos, pero sí los suficientes como para no poder escribir el código todo en una enorme maraña. 

> ¿Cuántos son suficientes tests?

En ese tema no me considero ningún experto, al revés, pienso que aun me queda mucho que aprender. Pero mi tendencia ahora mismo es a tratar de tener al menos un test por cada unidad funcional del código. Eso puede ser un componente si estoy en Angular o una función o un módulo si estoy en JS puro, pero la idea es que no haya funcionalidad sin su test. Con eso consigo que desde el momento en el que pienso en añadir un componente, una función o un 'if' que define un nuevo camino o funcionalidad, primero pienso en qué función va a cumplir y cómo podría testarla. Y además me hace asegurarme de que no añado esa funcionalidad de forma que no pueda testarla. Voy a tratar de explicarlo con un ejemplo.

Imaginemos que tenemos la típica aplicación de listado de TODOs. Tenemos un array que guarda las tareas, que son objetos de JS, para añadir una tarea tenemos una función addTodo que recibe el listado de tareas y la nueva tarea y devuelve un nuevo listado con las tareas:


```javascript

const addTodo = (todos = [], newTodo = {}) => [...todos, newTodo]

describe('addTodo', () => {
  const sampleTodo = { text: 'Do something!' }
  const _ = undefined

  it('adds a todo to an empty list', () => {
    expect(addTodo([], sampleTodo)).toEqual([sampleTodo])
  })

  it('creates an empty list if not provided', () => {
    expect(addTodo(_, sampleTodo)).toEqual([sampleTodo])
  })

  ...
  
})

``` 

Nos piden que añadamos un _timestamp_ a addTodo, de primeras se me ocurre que no es problema, puedo hacer algo así:

```javascript

const addTodo = (todos = [], newTodo = {}) => {
  newTodo.timestamp = Date.now()
  return [...todos, newTodo]
}

```

Pero así rompería todos los tests, porque ahora no puedo comprobar que el valor de timestamp coincide con un valor concreto (en realidad sí podría haciendo una comparación parcial con jasmine.objectContaining, ver más abajo para eso, pero supongamos que no) ¿Cómo puedo arreglarlo?

```javascript

const addTodo = (todos = [], newTodo = {}, timestamp = Date.now()) => {
  newTodo.timestamp = timestamp
  return [...todos, newTodo]
}

// o mejor aún
const addTodo = (todos = [], newTodo = {}, timestamp = Date.now()) =>
  [...todos, Object.assign({}, newTodo, { timestamp: timestamp })]


```

Ahora podemos seguir testeando esta función sin problema:

```javascript

describe('addTodo', () => {
  const now = Date.now()
  const sampleTodo = { text: 'Do something!' }
  const expectedTodo = { text: 'Do something!', timestamp: now}
  const _ = undefined

  it('adds a todo to an empty list', () => {
    expect(addTodo([], sampleTodo, now)).toEqual([expectedTodo])
  })

  it('creates an empty list if not provided', () => {
    expect(addTodo(_, sampleTodo, now)).toEqual([expectedTodo])
  })

  ...
  
})

```

Esta forma de desarrollar hace que el código sea más fácil de leer, más desacoplado y más fácil de mantener. Así podremos seguir añadiendo tests conforme el proyecto crezca y más pronto que tarde nos daremos cuenta de que tenemos una suit de tests que nos permite refactorizar sin miedo, que documenta la funcionalidad y a la que podemos añadir un test cada vez que encontramos un bug o queremos añadir nuevo código.

Además de estas ventajas que son las que típicamente se destacan, yo he encontrado otra de la que no se suele hablar tanto. No sé si era un fallo característico mio o simplemente a los demás no les gusta hablar de este tema, pero para mi los tests me ayudan a no perder de vista lo que hace cada parte del código por separado y a mantener la funcionaliad en compartimentos pequeños en lugar de tratar de tener TODO en la cabeza para saber qué está pasando. Puede que sea un defecto personal, pero si no hay tests tengo tendencia a crear "god objects" o funciones gigantes que controlan el flujo de gran parte la aplicación. Esto es terrible para el mantenimiento, cada vez que quieres cambiar algo o tratar de encontrar un bug tienes que recorrer toda esa enorme función paso a paso, da igual si en tu cabeza o con un debugger, tendrás que reconstruir todo lo que pasa hasta llegar al punto que quieres cambiar.

Yo antes solía pensar que así era como funcionaba, eso era programar. Escribes un _"algoritmo"_ y por mucho que te digan que las funciones deben ser pequeñas, tu no le ves sentido. 

> ¿Para qué voy a partirla en trozos si al final hace lo mismo?

Los tests automáticos han ido cambiando la forma en la que programo poco a poco. Buscando, cada vez más, sacar todo el código que puedo en funciones pequeñas y fáciles de testar que luego se combinan para crear la solución. 

Esta forma de programar además te permite no tener todo en la cabeza al mismo tiempo. Divides el problema en pequeñas funciones, cada función tiene su cometido y cuando la desarrollas puedes pensar sólo en lo que debe hacer esa función. Añades tests, la programas, ves que cumple todos los tests, pasas a la siguiente y vuelta a empezar. Al final la solución consiste en jugar las piezas que has programado y que como has ido testando conforme programabas, ves que al juntarlo todo funciona y es una sensación genial.

Pero ya es suficiente de hablar de las bondades del testing. Escribir tests no es siempre fácil, especialmente cuando nadie te ha enseñado y no sabes por donde empezar. Así que hagamos un repaso a varios patrones que he ido aprendiendo con en este tiempo para testear distintos tipos de código.

## Mi primer test

El ejemplo mínimo, el 'hello world' de las pruebas automáticas con JasmineJS sería algo así:

```javascript
// fichero media.js
function media(a,b) {
  return (a + b)/2
}

describe('función media', () => { // descripción de este grupo de tests
  it('calcula la media de dos números', () => { // descrición del test
    const resultado = media(4, 8) // creamos una prueba
    expect(resultado).toBe(6) // comprobamos que el resultado es el esperado
  })
})
```

Si copias este ejemplo en el fichero `media.js` y ejecutas ´npx jasmine media.js` deberías ver algo así en la consola:

```
Randomized with seed 57391
Started
.


1 spec, 0 failures
Finished in 0.006 seconds
Randomized with seed 57391 (jasmine --random=true --seed=57391)
```

Enhorabuena! has escrito y comprobado tu primer test. Puedes cambiar la función y ver como falla. Por ejemplo, si quitamos la división por 2:


```
Started
F

Failures:
1) función media calcula la media de dos números
  Message:
    Expected 12 to be 6.
  Stack:
    Error: Expected 12 to be 6.
        at <Jasmine>
        at UserContext.it (/home/juanmi/projects/pruebas/media.js:8:23)
        at <Jasmine>

1 spec, 1 failure
Finished in 0.008 seconds
```

Genial, ahora sabemos que si alguien (ese alguien puedes ser tú dentro de un par de meses) viene y cambia nuestra función de forma que ya no es una media, el test dará un error, avisándonos del cambio de funcionalidad.
Un buen test debe definir lo que queremos que haga la función, y no cómo lo hace, si por ejemplo cambiamos la función media para ser más general:

```javascript
function media() {
  const values = Array.from(arguments)
  return values.reduce((x, total) => x + total) / values.length
}

```

Nuestro test seguirá pasando sin fallos, ya que, aunque hemos cambiado la implementación, la prueba de ese test sigue siendo válida.

Esta es la base del desarrollo con tests automáticos: definimos la funcionalidad mediante una prueba, comprobamos que la implementación cumple la prueba (si no es así repasamos la implementación para ver por qué no la cumple y corregimos el error) y pasamos a definit la siguiente funcionalidad.

De esta forma vamos definiendo nuestro programa y creando las pruebas que comprueban nuestras expectativas sobre el código conforme el programa crece.
Para un repaso más detallado y algunos ejemplos más de cómo escribir pruebas automáticas con JasmineJS puedes ver [mi post de introducción a las pruebas automáticas][]

## Aislando tests para iterar más rápido

Antes de seguir quería introducir una funcionalidad de jasmine que es muy útil para centrarnos en un fichero o un test en concreto. En jasmine tenemos varias funciones para excluir tests de la suit o para hacer que sólo se ejecuten algunos de los tests de la suit. Esto es útil especialmente cuando tenemos una suite grande y estamos desarrollando un nuevo módulo o funcionalidad y no queremos que se ejecute la suite completa cada vez que guardamos el fichero porque tarda mucho o nos distrae:

+ xit - los tests definidos con xit en lugar de it se excluyen de la suit y apareceran como pendientes cuando la ejecutemos.
+ fit - Si definimos algún test con fit en lugar de it sólo se ejecutarán los tests que estén así definidos, ignorando todos los demás.
+ fdescribe - Igual que fit pero para todos los tests que quedan dentro de este fdescribe.

## Funciones puras

Las funciones puras son aquellas que solo actúan sobre sus variables locales y devuelven un resultado, pero no actúan sobre ninguna variable externa ni producen ningún otro efecto, como imprimir en pantalla, leer un fichero o hacer una petición http. Para más información sobre lo que es una función pura puedes ver mi artículo sobre programación funcional, donde explico lo que son más detalladamente.

Estas son las funciones más fáciles de testear y pronto intentaremos tener el mayor número de estas functiones, y esto es algo bueno, porque las funciones puras son predecibles y son fiables. Es decir, son funciones que nos darán pocos problemas y por tanto es una buena práctica tratar de tener la mayor parte posible de nuestra base de código de esta forma.

Para testar una función pura solo necesitaremos escribir la llamada a la función con los parámetros que queramos y indicar cual es la salida esperada. Por ejemplo, nuestra función que calcula la media:

```javascript
function avg(list){
  return list.reduce((item, acc) => item + acc, 0) / list.length
}
```

## Inyección de dependencias y espías

No todo pueden ser ser funciones puras, para que nuestro programa se comunique y podamos ver algún resultado, es necesario que tenga algún efecto externo. 

## Objetos que emiten eventos

## Mocks y stubs

## Proxyquire



[1]:http://juanmirod.github.io/2016/04/29/configurando-karma-en-un-projecto-javascript.html
[2]:https://jasmine.github.io/api/2.6/global.html#fdescribe