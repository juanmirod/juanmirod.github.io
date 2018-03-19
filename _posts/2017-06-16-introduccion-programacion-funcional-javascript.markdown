---
published: true
title: Introducción a programación funcional con JavaScript
description: Introducción a conceptos de programación funcional en JavaScript. Cambia de paradigma sin cambiar de lenguaje.
layout: post
tags: [programación funcional, javascript] 
---

# Introducción

La programación funcional parece que por fin va ganando más y más adeptos gracias a nuevos lenguajes como Scala, Clojure o Elm y a nuevos frameworks y librerías como Lodash, Ramda, React o Redux, que aunque no son puramente declarativos, sí que utilizan patrones y herramientas de la programación funcional. 

Los lenguajes funcionales siempre han estado ahí. Desde el comienzo de la informática, cuando Alonzo Church (profesor de Alan Turing, que luego escribiría con él la [Tésis de Church-Turing](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis)) definiera el Cálculo Lambda. Su historia está plagada de grandes nombres y grandes éxitos. Pero a la industria nunca le ha terminado de convencer y fue optando siempre por opciones imperativas, como ADA, C, PASCAL, Java o C#.

Hoy en día todos los grandes lenguajes van introduciendo conceptos de la programación funcional, he incluso hemos visto aparecer alternativas híbridas de todo tipo: Scala y Clojure para Java, F# para C#, o las librerías de Reactive Programming para varias plataformas... Además, lenguajes como Erlang/Elixir o Elm están demostrando que la programación funcionar se puede aplicar con mucho éxito a ciertas aplicaciones y hacer el desarrollo más fiable y fácil de mantener.

JavaScript, desde su concepción es un lenguaje funcional y las ideas principales que le dan forma, las clausuras, las funciones como valores, la delegación de prototipos y la declaración de objetos sintácticamente son ideas tomadas de los lenguajes Scheme y Self. Por eso JavaScript se adapta bastante bien a la programación funcional. Además, ES6 añade algunas nuevas funcionalidades muy interesantes para el desarrollo funcional como la notación que expande elementos iterables con `...` o las funciones con la flecha gruesa `=>`

Si eres desarrollador de JavaScript puede que hayas visto algunos ejemplos usando estas herramientas que te hayan resultado extraños. El código es más corto y conciso. Casi puedes leerlo como si fuera un fichero de configuración más que código porque es más declarativo, pero para entenderlo de verdad y utilizarlo es necesario conocer algunas funciones y patrones que hacen que todo encaje. Y lo que es más importante, la forma de escribir y leer el código cambia.

Voy a explicar algunos patrones útiles y ejemplos prácticos de como utilizar la programación funcional para mejorar la legibilidad y la fiabilidad de nuestro código en JavaScript sin necesidad de aprender un nuevo lenguaje o cambiar nuestro flujo de trabajo.

Puedes introducir este código desde YA en tus proyectos y no tendrás que cambiar nada. (Bueno, salvo si aun no usas ES6, cosa que te recomiendo desde ya, uses o no un estilo funcional en tu código.)

# ¿Qué es la programación funcional?

Antes de nada me gustaría aclarar este concepto. En este caso vamos a entender como programación funcional aquella que utiliza las funciones como piedra angular del desarrollo en lugar de los objetos o las clases. Además daremos prioridad a escribir funciones puras siempre que sea posible, aislando los efectos colaterales y utilizando librerías o módulos para separarlos del resto de la lógica.

|> ¿Funciones puras, efectos colaterales?

Son dos términos directamente relacionados. Se puede entender muy fácilmente lo que es una función pura si se sabe lo que son los efectos colaterales o secundarios (side-effects en inglés):

**Efectos colaterales** son todas aquellas modificaciones que haga una función que estén fuera de su ámbito. Como modificar o crear una variable global, escribir algo a stdout, mostrar un gráfico en pantalla, escribir un fichero en el disco duro, acceder a una base de datos... Cualquier cosa que no sea operar sobre sus parámetros y variables locales es un efecto colateral.

Ahora podemos definir muy fácilmente una *Función pura* como aquella que no produce ningún efecto colateral. Las funciones puras son fáciles de usar, de testar y de leer y tienen la ventaja de que siempre van a producir la misma salida al darle los mismos parámetros. No dependen de ningun estado externo o configuración.

Claro está, solo con funciones puras no se puede construir un programa. Sería un programa sin ningún tipo de feedback, ni si quiera podríamos saber si se ha ejecutado correctamente o no. Por eso hablo de separar las funciones puras de las que no lo son.

Sobre el tema de crear un nucleo de funciones puras y una serie de plugins o módulos alrededor que conecten el núcleo con el mundo real hay mucho que hablar también, sobre todo recomiendo el video de Bernhardt [Boundaries](https://www.destroyallsoftware.com/talks/boundaries) pero eso es un tema más de arquitectura y hoy vamos a centrarnos en cómo desarrollar estas funciones y combinarlas para crear sistemas fáciles de testar, mantener y expandir.

## Herramientas de desarrollo funcional en JavaScript

Vamos a hacer un repaso por las herramientas del lenguaje que podemos usar para utilizar funciones puras como base principal para nuestro código. Intentaré ir desde las funcionalidades más fáciles o conocidas a las más ajenas a la mayoría.

No pretendo que esta sea una guía exhaustiva o prescriptiva de cómo programar. Simplemente son una serie de funciones y patrones que pueden ayudar a hacer el código más conciso, legible o testable. Como todas las técnicas, patrones y librerías, no hay balas de plata. No pretendo decir que solo debas programar así o que la POO no sirva para nada. Cada cosa tiene su lugar, hay ámbitos donde la POO encaja mejor y otros donde lo hace la programación funcional, lugares donde es mejor usar Observables o aplicaciones que puedes resolver con jQuery. Al final yo veo escribir código como escribir un texto: cuando más vocabulario y más conocimiento tengas, mejor serás capaz de adaptarte y de describir el problema.

En el código de los ejemplos seguiré algunas convenciones de código y herramientas de ES6 para ser más conciso y conseguir una notación más funcional y limpia. Además el código de los ejemplos pretende ser lo más simple e ilustrativo posible para que hacer llegar lo mejor posible cada idea, no pretende ser un código correcto o general que pueda usarse directamente en una aplicación.

Este estilo al principio puede resultar un poco extraño o más familiar, según tu bagaje como desarrollador. Si te resulta raro te pido que le des una oportunidad y verás como rápidamente ves que al ser más breve y más declarativo, es más fácil de leer y de escribir y puede mejorar mucho tu código JavaScript. 

Como guía inicial, para aquellos que no estén familiarizados con ES6, utilizaré las funciones con flecha en la mayoría de los ejemplos. Esta es la sintaxis, junto a la equivalencia en ES5 (no hablo de `this` porque en todos estos ejemplos usaremos funciones independientes que no dependen del objeto de contexto):

```javascript

// funciones con flecha 

(x, y) => { /* aquí el código */ } == function(x, y) { /* aquí el código */ }

// Si la función sólo tiene un argumento, se puede prescindir de los paréntesis:

x => { /* aquí el código */ } == function(x) { /* aquí el código */ }

// Si la función sólo contiene una expresión que se retorna se puede prescindir de las llaves:

x => 2*x == function(x) { return 2*x; }

```

Además, aunque no es muy común en según qué círculos, en JavaScript se puede no usar el ´;´ como delimitador de expresiones. Una de las funcionalidades del lenguaje, llamada ASI (Automatic Semicolon Insertion) hace que sean innecesarios, básicamente al ponerlos estamos haciendo el trabajo del compilador. Si queréis leer más sobre el tema os recomiendo [este artículo de Isaac Z. Schlueter, el creador de npm](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)

Todo esto era para decir que no habrá puntos y coma (`;`) en el código :)

La descomposición de objectos y arrays, una nueva sintáxis de **ES6**, nos permite hacer cosas como estas:

```javascript

var a, b, rest;
[a, b] = [10, 20];
a 
// 10
b 
// 20

[a, b, ...rest] = [10, 20, 30, 40, 50];
a
// 10
b
// 20
rest
// [30, 40, 50]

({a, b} = {a: 10, b: 20});
a
// 10
b
// 20

```

Estas mismas transformaciones se pueden usar como parámetros en las funciones. Más sobre este tema [aquí](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## Cómo probar los ejemplos. 

La forma más fácil de probar los ejemplos, modificarlos y crear alternativas es mediante el REPL de node. Hoy en día tanto Chrome como Firefox soportan ES6 [casi por completo](https://kangax.github.io/compat-table/es6/) Con lo que podemos probar también los ejemplos en la consola, pero presonalmente la consola de los navegadores siempre se me antoja pequeña e incómoda. Node soporta ES6 y todos los ejemplos se podrán correr en el REPL de node 6.x o superior. Para poder usarlo instalamos node y luego en el terminal escribimos:

```shell

$> node
> // a partir de aquí código :)

```

Más sobre cómo instalar Node.js y el REPL [aquí](http://juanmirod.github.io/2017/08/09/introduccion_nodejs.html)

### Bucles

Un primer paso para hacer nuestro código más funcional bastante común, es deshacerse de los bucles y utilizar las funciones .map/.filter/.reduce en su lugar. Estas funciones son parte de la librería estándar de JavaScript para Iterables y tienen una serie de propiedades muy interesantes. Usándolas **no necesitaremos escribir contadores, con lo que reducimos una posible fuente de erratas** (¿quién no se ha equivocado al anidar dos bucles for y ha usado el contador que no debía?), son funciones que se pueden componer y ganamos en brevedad y simplicidad al ofrecer comportamientos más variados que los de un bucle normal.

Además, estas tres funciones se caracterizan porque no alteran el array de entrada, sino que devuelven un nuevo array siempre, lo cual nos asegura que estamos trabajando de forma pura, sin crear efectos colaterales.

**.map**

Map es la más básica de todas, además `.map` es una función omnipresente en la programación funcional que se utiliza no solo en iterables, sino también en promesas, streams y otros muchos tipos de datos.

La función de map es tomar un array y una función y aplicar la función a cada uno de los elementos del array:

```javascript

[1,2,3].map(f) == [f(1), f(2), f(3)]

```

Por ejemplo:

```javascript

[1,2,3].map(x => 2*x)

// [2,4,6]

```

Otra notación que es muy concisa es la __programación tácita__ o __pointfree notation__ que quiere decir que, cuando una función toma un parámetro de entrada y se usa como argumento a otra función, podemos omitir el parámetro y la llamada queda de esta forma:

```javascript

const double = x => 2*x

[1,2,3].map(double) 

// [2,4,6]


```

> Espera un momento, ¿qué está pasando ahí? 

Lo que ocurre es que la función map espera una función y la llamará una vez por cada elemento del array, pasándole el elemento, como veíamos arriba. Así que es lo mismo pasarle la referencia `double` que la función anónima, map tomará la función y la invocará de la misma forma. Aquí empezamos a ver la potencia de JavaScript como lenguaje funcional, no todos los lenguajes permiten usar las funciones como argumentos de otras funciones de forma tan sencilla y fácil de leer.

Sigamos con las funciones de Iteradores.

**filter**

Filter nos permite eliminar o seleccionar elementos de un array mediante un __predicado__ o filtro. Para ello le pasamos a `.filter` nuestro predicado, que no es más que una función que se ejecuta por cada elemento y devuelve un booleano. Si el valor develto es `true` el elemento se devolverá en el nuevo array, si es `false` el elemento no estará en el nuevo array. 

```javascript

const isEven = x => x % 2 === 0
[1,2,3,4,5,6].filter(isEven)

// [2,4,6]

[1,2,3,4,5,6].filter(x => x !== 4)

// [1,2,3,5,6]


```

Una buena ayuda para ayudar a recordar como usar filter es recordar el concepto de _predicado_. Una función predicado es una función que nos devuelve un booleano, que devuelve `true` o `false` para cualquier entrada que le pasemos. algunos ejemplos de predicados útiles:

```javascript

// predicados

const isEven = x => x%2 === 0
const greaterThan = min => x => x > min 
const notEqual = y => x => x !== y
const where = (property, value) => x => x[property] === value
const whereNot = (property, value) => x => x[property] !== value

// ejemplos de uso

[1,2,3,4,5,6].filter(isEven)
// [2,4,6]

[1,2,3,4,5,6].filter(greaterThan(3))
// [4,5,6]

[1,2,3,4,5,6].filter(notEqual(3))
// [1,2,4,5,6]

[{x:1, y: 20}, {x: 35, y: 23}].filter(where('x', 35))
// [{x: 35, y: 23}]

[{x:1, y: 20}, {x: 35, y: 23}].filter(whereNot('x', 35))
// [{x:1, y: 20}]

```

En los predicados de arriba también podemos ver algo que no he comentado hasta ahora: funciones que devuelven funciones. De igual forma que podemos pasar una función como argumento, podemos devolverlas como resultado. Así:

```javascript

const notEqual = x => y => x !== y

// es lo mismo que

const notEqual = function(x) {
  return function(y) {
    return x !=== y
  }
}


```

Esto es habitual en JavaScript y el truco está en que utilizamos el ámbito de la función para acceder al primer parámetro desde la función interior. Como Javascript tiene ámbito léxico (closure) podemos acceder a la variable sin importar donde o cuando hagamos la llamada:

```javascript

const notThree = notEqual(3)

[1,2,3,4,5].filter(notThree)
// [1,2,4,5]

notThree(8)
// true

```

Puedes ver más sobre el ámbito léxico de JavaScript [aquí](http://juanmirod.github.io/2016/02/19/ambito-en-javascript.html)

**reduce**

Sin duda reduce es la función más difícil de entender de las tres y la que más miedo da cuando no la conoces. Pero también es muy potente y nos permite simplificar mucho el código cuando la usamos correctamente.

Supongamos que queremos calcular la media aritmética de un array. Para eso normalmente haríamos un bucle para sumar los elementos y luego dividiríamos por el número de elementos:

```javascript

const avg = values => {
  let sum = 0
  for(let i = 0; i < values.length; i++) {
    sum += values[i] 
  }
  return sum/values.length
}

const califications = [5,7,8,5,5,6,8,9,10]
avg(califications)

// 7

```

Este código se puede simplificar mucho usando reduce. Reduce toma el array y aplica la función que le demos, elemento a elemento, pasando en cada paso una copia del resultado, veamos el código y luego veremos cómo lo hace:

```javascript

const avg = values => values.reduce((total, current) => total + current, 0)/values.length 
const califications = [5,7,8,5,5,6,8,9,10]
avg(califications)

// 7

```

> ¿Qué?? ¿Cómo?? 

A todos nos pasa cuando vemos reduce por primera vez, veamos qué ha pasado. La función que le pasamos a reduce es bastante sencilla:

```javascript

(total, current) => total + current

```

Simplemente toma el valor actual y lo suma al total que tiene acumulado. Es decir, podríamos escribirlo así:

```javascript

const sum = (a, b) => a + b
const avg = values => values.reduce(sum, 0)/values.length 
const califications = [5,7,8,5,5,6,8,9,10]
avg(califications)

// 7

```

El segundo argumento que le pasamos a reduce es el valor inicial `0`. Es decir que lo que estamos haciendo es decir: 

> Empezando con 0, toma todos los valores del array y súmalos uno a uno.

La función que se le pasa a reduce recibe 4 argumentos y el segundo parámetro de reduce es opcional y es el valor inicial que se pasará como primer parámetro cuando se llame a la función por primera vez. Es importante saber que este también será el valor por defecto si el array sobre el que operamos está vacío:

```javascript

[].reduce((total, current, index, originalArray) => { /* ... */ }, default) === default

```

Y por tanto si tratamos de ejecutar `reduce` sobre un array vacío sin pasarle un valor inicial, dos devolverá una excepción:

```javascript

[].reduce((total, current, index, originalArray) => { /* ... */ })
TypeError: Reduce of empty array with no initial value
    at Array.reduce (native)
    at repl:1:4
    ...

```

**Ojo con la aridad de las funciones**

Algo a tener en cuenta cuando empezamos a utilizar estas funciones y la notación _point-free_ es la aridad de las funciones. Todas estas funciones reciben varios argumentos del array que las llama y debemos tener cuidado en utilizarlas correctamente para no caer en errores que nos puedan despistar, JavaScript es un lenguaje dinámico y aceptará casi cualquier cosa que le pasemos sin protestar:

```javascript

[0,1,2,3,4,5,6].filter(notEqual)
// [0,1,2,3,4,5,6]

[0,1,2,3,4,5,6].filter((x) => isEven)
// [0,1,2,3,4,5,6]


```

En los dos casos anteriores lo que está pasando es que estamos devolviendo la referencia a la función en lugar de llamarla, y por extraño que parezca, en JavaScript `!!((x) => {}) === true` y por tanto, el predicado siempre está devolviendo `true` y mantenemos todos los valores del array.

Esto puede volverse especialmente problemático si usamos `currying`, pero por supuesto tiene fácil solución. Volveremos sobre este punto un poco más adelante.

Con estas tres funciones podemos librarnos de la práctica totalidad de los bucles de nuestro código y olvidarnos de tener que mantener contadores y de esa complicada sintaxis que los acompaña, lo cual hará el código más fácil de leer y nos dejará centrarnos en lo que queremos hacer con los elementos del array.

### Funciones de orden superior

Otra herramienta funcional que hemos visto por encima en el apartado sobre bucles son las funciones de orden superior, es decir, las funciones que reciben otras funciones como parámetros o devuelven una función como salida.

Un par de ejemplos que veíamos arriba son los generadores notEqual o where:

```javascript

const notEqual = y => x => x !== y
const where = (property, value) => x => x[property] === value

```

Estos funciones devuelven un predicado en función a los parámetros que reciben:

```javascript


notEqual(3)
// [Function]

const notThree = notEqual(3)
notThree(5)
// true

notEqual(3)(5)
// true

notEqual(2)(2)
// false


```

Esta forma de escribir y generar funciones nos permite crear fácilmente código más expresivo y que se puede componer. Cuando, como en estos casos, lo que hacemos es tomar una función que tomaría varios parámetros y tomarlos uno a uno, devolviendo cada vez una función que espera el siguiente parámetro estamos _currificando_ (del inglés currying) la función.

> f(x,y,z) => f(x) => g(y) => h(z)

En el caso de `where`, podríamos escribirlo así:

```javascript

const where = property => value => x => x[property] === value


```

Suponiendo que tenemos un array con objetos que hemos sacado de una base de datos y queremos buscar uno por id podríamos hacerlo así:

```javascript

const whereIdIs = where('id')

users.filter(whereIdIs(42))
// [{ id: 42, name: 'Ramón' ... }]

```

Sin usar filter ni currificar, suponiendo que queramos devolver siempre un array como hace filter, seguramente hubieramos acabado con un código tal que así:

```javascript

function findById(users, id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id ) {
      return [users[i]]
    }
  }
  return []
}

findById(users, 42)
// [{ id: 42, name: 'Ramón' ... }]

```

La ventaja de where es que podemos usarlo para construir el predicado que necesitemos en cada momento. Si en otra función queremos buscar un usuario por nombre en lugar de por id, bastará con hacer:

```javascript

const whereNameIs = where('name')

// o simplemente usarlo sin crear un alias

users.filter(where('name')('Ramón'))

```

_currificar_ funciones es muy útil en general a hora de trabajar con funciones y componerlas y es una herramienta que combiene dominar para mejorar nuestro código en JavaScript. Hay librerías que ofrecen una función `curry` que toma una función y nos la devuelve _currificada_ Vamos a probar a escribir nuestra propia función `curry` para 2 parámetros:

```javascript

const curry2 = f => x => y => f(x,y)

// ejemplo
const add = (x,y) => x + y

const curriedAdd = curry2(add)
curriedAdd(2)(3)
// 5

const add2 = curriedAdd(2)

add2(3)
// 5

```

Por supuesto, la implementación se complica para n parámetros, pero para eso están las librerías funcionales que veremos al final del artículo, por ahora este simple ejercicio espero que sirva para mostrar lo que es _currificar_ una función.

### Reduce para todo

Cuando digo que `reduce` es muy potente me refiero a que en realidad, es la única función que necesitamos para operaciones iterativas. Tanto `map` como `filter` pueden definirse con reduce. Poríamos tener estas tres operaciones como funciones independientes así:

```javascript

const reduce = (f, def) => arr => arr.reduce(f, def)

const map = f =>
  reduce((total, next) => [...total, f(next)], [])

const filter = pred =>
  reduce((total, next) => pred(next) ? [...total, next] : total, [])

const doubles = map(double)

doubles([1, 2, 3, 4, 5])
// [ 2, 4, 6, 8, 10 ]

const evens = filter(x => x%2 === 0)

evens([1, 2, 3, 4, 5])
// [ 2, 4 ]

const acc = reduce((a,b) => a+b, 0)

acc([1, 2, 3, 4, 5])
// 15

const avg = arr => acc(arr) / arr.length

avg([1,2,3,4,5])
// 3

```


### Funciones asíncronas

Hasta ahora, las funciones de orden superior que hemos usado son funciones síncronas, es decir, que se ejecutan en el orden en el que están escritas. Incluso los bucles de `.map`, `.filter` y `.reduce` se ejecutan de forma síncrona:

```javascript

[1,2,3].map(x => console.log(x)); console.log('After map')
// 1
// 2
// 3
// After map
// undefined

```

Pero JavaScript está lleno de funciones asíncronas. Las funciones asíncronas son las que se ejecutan en otro momento, como resultado de un evento o de una respuesta a una petición. Usando el ejemplo anterior, pero ejecutando la función de forma asíncrona:


```javascript

const asyncLog = x => setImmediate(() => console.log(x))
[1,2,3].map(asyncLog); console.log('After map')
// After map
// undefined
// 1
// 2
// 3

```

No voy a extenderme en cómo funcionan las llamadas asíncronas en JavaScript, eso lo dejo para otro artículo sobre el Event Loop, pero dejémoslo en que las llamadas asíncronas se ejecutan fuera del orden en el que está escrito el programa. En JavaScript son muy comunes, pero el código de arriba no es muy limpio. Si realmente queremos escribir 'After map' después de transformar el array, ¿cómo lo hacemos?

Para mejorarlo podemos usar las Promesas. Las promesas son un tipo de objeto que nos permite encapsular las llamadas asíncronas con un interface con el que podemos trabajar como si tuviéramos el resultado antes de ejecutarse la función. Siguiendo con el ejemplo anterior:

```javascript

const asyncLog = x => new Promise((resolve, reject) => {
  setImmediate(() => {
    console.log(x)
    resolve()
  })
})

Promise.all([1,2,3].map(asyncLog)).then(() => console.log('After map'))
// 1
// 2
// 3
// After map

```

En este ejemplo le hemos dado la vuelta a la tortilla. asyncLog sigue siendo asíncrona, pero hemos encapsulado cada llamada en una promesa que se resuelve cuando la función se ejecuta y luego hemos usado `Promise.all` para ejecutar el _After map_ cuando todas las promesas se han resuelto. El código se vuelve a leer en el mismo orden en el que obtenemos los resultados, aunque las llamadas sean asíncronas. 

Este ejemplo es muy básico porque estas funciones no hacen más que loguear sus parámetros, para ver ejemplos reales y aprender más sobre las Promesas y cómo utilizarlas puedes ver [mi artículo dedicado sólo a ellas](http://juanmirod.github.io/2016/11/25/promesas-en-javascript.html).

### Composición

Componer funciones es, simplemente, aplicarlas sucesivamente:

```

(f·g)(x) = f(g(x)) 

``` 

Lo hacemos muchas veces sin darnos cuenta:

```javascript

Math.round(average([1,2,3]))

```

Cuando aplicamos una función, y el resultado se lo pasamos a otra función, estamos componiendo funciones. Pero, cuando empiezas a usar más funciones puras, ocurre que tu código se va convirtiendo en una serie de composiciones. Los datos pasan por varias funciones hasta que tienes el resultado que quieres mostrar al usuario. **La programación funcional hace que pasemos del paradigma de _"objetos que se pasan mensajes"_ al de "flujo de datos y transformaciones"_** y claro, todos esos paréntesis hacen el código poco legible y difícil de modificar. 

Por suerte no tenemos que hacerlo así, gracias a la expresión de arriba sabemos que podemos hacer esto:

```javascript

const compose = (...functions) => x => functions.reduceRight((last, f) => f(last), x)

compose(
  Math.round,
  average
)([1,2,3])

```

Escribir el código de esta manera tiene varias ventajas: es más fácil de leer y es más fácil modificarlo al no tener que estar contando paréntesis. En cuanto a la legibilidad, a lo mejor el orden de las funciones puede despistar si no estás acostumbrado, pero para eso está `pipe`, que hace lo mismo que compose, pero aplica las funciones de izquierda a derecha, o de arriba a abajo en nuestro ejemplo, lo que sí que encaja con la metáfora del flujo de datos y mantiene el orden de lectura habitual:

```javascript

const pipe = (...functions) => x => functions.reduce((last, f) => f(last), x)

pipe(
  average,
  Math.round
)([1,2,3])

```

### Condicionales con Maybe y Either

Con las herramientas que hemos visto hasta ahora y algunas funciones auxiliares podemos escribir un código casi libre de paréntesis y de construcciones sintácticas. Conforme nos acostumbramos a encadenar promesas, usar funciones para transformar los datos y usar map/filter/reduce nos vamos dando cuenta de que podemos escribir muchas funciones como una serie de operaciones sobre la entrada, por ejemplo supongamos una hipotética app que pide los datos de unos clientes y quiere calcular la edad media:

```javascript

// Dado un nombre de una propiedad y un objeto, devuelve el valor de esa propiedad en el objeto
const pluck = prop => obj => obj[prop]

// función para poder usar map con aplicación parcial
const map = f => arr => arr.map(f)

// calcula la media de un array de números
const avg = arr => arr.reduce((total, next) => total + next, 0) / arr.length

const avgAge = () =>
  getUsers()
    .then(map(pluck('birthDate'))
    .then(avg)

```

Salvo cuando tenemos que usar un condicional. Si en el ejemplo anterior tuvieramos que contemplar la opción de que algunos usuarios tengan la edad `undefined` se nos rompe nuestra bonita cadena de funciones y tenemos que volver a escribir sintaxis para el `if`:

```javascript

// calcula la media de un array de números
const avg = arr => arr.reduce((total, next) => {
  if (next === undefined || next === null) {
    return total
  }
  return total + next
}, 0) / arr.length

```

No está mal, pero rompe un poco el estilo y sobre todo, no es DRY, cada vez que queremos comprobar esa condición en nuestra aplicación, tenemos que escribir ese mismo código. ¡A no ser que escribamos unas funciones que sustituyan las comprobaciones de nulidad!

```javascript

const isNull = x === undefined || x === null

const either = (pred, trueValue, falseValue) => x => pred(x) ? trueValue : falseValue

```

Con ellas la función que calcula la media quedaría así:

```javascript

// calcula la media de un array de números
const avg = arr => arr.reduce((total, next) => 
  either(isNull(next), total, total+next)
, 0) / arr.length

```

Pero hay una diferencia entre este código y el anterior. Este código siempre ejecuta las dos expresiones, mientras el condicional solo ejecutaba una de ellas, para tener la misma funcionalidad necesitamos envolver las expresiones en una función, de forma que solo se llame a una de las funciones después de comprobar el valos del predicado:

```javascript

const k = x => () => x 

const sum = x => y => x + y

const either = (pred, onTrue, onFalse) => x => pred(x) ? onTrue(x) : onFalse(x)

// calcula la media de un array de números
const avg = arr => arr.reduce((total, next) => 
  either(isNull, k(total), sum(total))(next)
, 0) / arr.length

```

Ahora sí que tenemos la misma funcionalidad que arriba, y la suma sólo se ejecutará si `next` no es `null` ni `undefined`. Este ejemplo puede parecer un poco extremo, estamos sustituyendo una de las piezas básicas de la sintaxis, una de las primeras cosas que aprendemos normalmente cuando nos enseñan a programar. Pero esa es la premisa de la programación funcional, utilizar funciones y tipos de datos para representar nuestro programa. Poco a poco estamos consiguiendo expresar cualquier expresión como una sucesión de funciones y eso es algo muy potente de cara a reusabilidad y testabilidad.

En este último ejemplo a aparecido una función algo curiosa: `k`. La función constante, o `k` es una función que siempre devuelve el mismo valor, y que nos sirve en este caso para poder pasarle a `either` una función en lugar de una expresión. Tal vez más adelante me aventure a mostrar otros combinators, pero si te ha llamado la atención esta función y quieres saber su origen puedes ver la [entrada en la wikipedia sobre lógica combinatoria](https://es.wikipedia.org/wiki/L%C3%B3gica_combinatoria#Ejemplos_de_combinadores).


Este artículo está en pleno desarrollo, si te gusta este estilo de programación en Javascript vuelve pronto y seguramente encuentres nuevo contenido. 