---
published: false
title: Técnicas para desarrollo de tests automáticos en JS
description: Cómo crear tests asíncronos, restringir la ejecución de tests y crear mocks
layout: post
tags: [javascript] 
---

Durante el tiempo que llevo escribiendo tests automáticos para mis aplicaciones he aprendido muchas cosas. Me he acostumbrado tanto a escribir tests y he ganado en seguridad a la hora de desarrollar. Gasto menos tiempo debugueando y más tiempo desarrollando y sobre todo tengo confianza como para refactorizar trozos de los proyectos sin miedo a romper la funcionalidad. Tanto es así que ahora no me planteo escribir nada que vaya más allá de 10 líneas sin tener una suit de tests y no termino de entender por qué la mayoría de los desarrolladores no escriben tests y por qué no se enseña a programar usando TDD desde el principio. Es más, al pensar en esto siempre me pongo nervioso y me da por escribir en twitter y todo.

<blockquote class="twitter-tweet" data-lang="en"><p lang="es" dir="ltr">Pregunta seria que me llevo haciendo un tiempo: ¿Por qué nadie enseña a programar desde cero usando TDD? Imagina ahorrarte todas esas horas frustrado delante del ordenador escribiendo printf para ver que estaba pasando porque no sabías debugear ni escribir un test...</p>&mdash; Juanmi Rodriguez (@juanmirod) <a href="https://twitter.com/juanmirod/status/923646197109329921?ref_src=twsrc%5Etfw">October 26, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Creo firmemente que si nos enseñaran a escribir tests desde el principio en lugar de enseñarnos con esas ridículas metáforas sobre recetas de cocina y pseudocódigo, el desarrollo de software sería algo muy diferente a lo que conocemos muchos ahora.

Pero nunca es fácil encontrar información sobre cómo escribir tests, cómo ejecutarlos y cómo usarlos, así que quiero aportar mi granito de arena contando lo que he aprendido hasta ahora con dos objetivos principales: el primero es archivarlo en mi blog para ver si sigo pensando lo mismo dentro de 5 años, y el segundo es predicar con el ejemplo y ayudar a que más desarrolladores españoles se pasen al lado de los tests y dejen de lado la frustración de los console.log, los printf y demás ténicas de debugueo chusqueras que no son más que parches.

## Setup del proyecto 

Lo primero que necesitamos y no suele venir dado para desarrollar una suit de tests es un test runner, y preferiblemente una librería de test que nos facilite la labor de escribir los casos de prueba y las comprobaciones. Personalmente mi preferida es Jasmine, [En un post anterior][1] explico como crear un proyecto que use JasmineJS y Karma para crear y ejecutar tu suit de tests. Hay otras muchas librerías y test runners, dependiendo del tamaño del proyecto y de la experiencia personal o del equipo podemos preferir una u otra. Yo me centraré en este artículo en el uso de JasmineJS. Para mostrar mejor todos los ejemplos que vienen he creado un proyecto en github y he ido añadiendo el código mientras escribía este texto. Puedes ver la configuración inicial en [el primer commit][2].

## Primeros tests

Escribir los primeros tests siempre parece un poco tonto. Hay tan poco código que probar: total son solo unas decenas de líneas de código exploratorio, o es una api trivial que solo hace operaciones CRUD sobre un listado sin ninguna lógica extra...

> En mi humilde experiencia el mejor momento para escribir los primeros tests es **DESDE EL PRINCIPIO**

No me entiendas mal, el código exploratorio está bien y hacer un par de pruebas en dos días o tres te ayuda a pensar en el problema, y tal vez al principio seas como yo de los que prefieres esbozar la GUI en HTML para tener algo visual que modificar y probar. Todo eso está bien. Pero, seguramente, cuando quieras añadirle tests te darás cuenta de que, tal y como está, es una maraña y es imposible de testear. O bien empiezas de nuevo y añades los tests desde el principio, o bien has dejado pasar demasiado tiempo, tu prototipo de espagueti ha crecido hasta ser usable. Te están pidiendo más funcionalidad y ya no quieres tirarlo todo por la ventana. Y entonces ya has perdido la oportunidad de escribir tests para ese proyecto.

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

Nos piden que añadamos un _timestamp_ a addTodo, la API ya está en producción y addTodo se utiliza en varios puntos de nuestra aplicación. De primeras se me ocurre que no es problema, puedo hacer algo así:

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


[1]:http://juanmirod.github.io/2016/04/29/configurando-karma-en-un-projecto-javascript.html
[2]:
https://jasmine.github.io/api/2.6/global.html#fdescribe