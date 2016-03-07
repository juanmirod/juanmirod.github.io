---
published: true
title: Directivas con varias plantillas en AngularJS
layout: post
tags: [scripts, javascript, Angular]
---

En varias ocasiones me he encontrado con el problema de tener que utilizar varias plantillas o "vistas" en una misma directiva en Angular. Algo que a primera vista podría resultar bastante común y que debería estar resuelto en el framework, no lo está (no sé si han introducido algo al respecto en Angular2.0). Cada cual debe usar su imaginación y el "método Angular" para encontrar la solución que mejor se adapte a sus necesidades.

Yo finalmente me decanté por esta:

```javascript
app.factory('templates', function() {
  return {
    compact:   'compact',
    detailed:  'detailed'
  };
 });

app.directive('contact', function(templates) {
  return {
    restrict: 'E',
    templateUrl: function($elem, $attr){
      return templates[$attr.mode];       
    },
    scope: {
      contact: '=ngModel'
    }
  };
});
```
[Plunker con el ejemplo funcionando](http://codepen.io/anon/pen/wawOyz?editors=101)

En este ejemplo se utiliza una factoría para especificar las plantillas disponibles y luego en la directiva, mediante una expresión funcional en la plantilla y tomando de los atributos el "modo" podemos seleccionar la plantilla para la directiva sin necesidad de duplicarla y sin ensuciar el nombre de la directiva con detalles sobre la plantilla.

Para más detalles sobre por qué elegí esta solución y de donde sale podéis ver [esta respuesta en stackoverflow](http://stackoverflow.com/questions/19015239/angular-directive-with-multiple-templates/29758828#29758828)
