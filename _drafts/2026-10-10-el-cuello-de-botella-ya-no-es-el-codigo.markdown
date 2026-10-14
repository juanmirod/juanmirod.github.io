---
title: "El cuello de botella ya no es el código"
layout: post
published: false
description: "Si los agentes han hecho que escribir código sea barato, el límite de lo que un equipo puede construir se ha movido a otro sitio. Repaso los candidatos: review de PR, validación de producto y, el que de verdad me preocupa, la adopción y el feedback de los usuarios."
tags: [ai, Inteligencia Artificial, desarrollo de software, producto, opinión]
---

Llevo unos cuantos posts contando trucos para exprimir agentes y hacer que escriban código por mí ([Claude Code](/2026/06/23/usos-avanzados-de-claude-code.html), [Pi](/2026/06/30/pi-harness-de-agentes-minimalista.html)). En todos ellos late la misma conclusión: **escribir código se ha vuelto barato**. Una funcionalidad que antes era una semana de trabajo hoy es una tarde de prompts, un plan y unas cuantas iteraciones. Los tests pasan, el build está en verde y la PR queda lista para revisar.

El problema es que si el código era el cuello de botella del desarrollo, toca preguntarse dónde está el siguiente. Yo no lo tengo claro, pero llevo un tiempo dándole vueltas y tengo la sensación de que hay una jerarquía: cada nivel tapa al siguiente hasta que lo eliminas.

## La review de PR

Para cualquier equipo que mantenga un repo compartido, el cuello de botella es la review. Da igual que generes diez cambios al día si solo hay dos personas revisando: la cola crece igual, y crece más rápido que antes precisamente porque el código es más fácil de producir. La review necesita contexto, criterio y tiempo, y ninguna de esas cosas se paraleliza bien. Un agente puede hacer una primera pasada, señalar lo obvio y resumir el diff, pero la decisión de si ese cambio debería existir y cómo encaja en el sistema sigue siendo de una persona.

Esto no es nuevo. Lo nuevo es la proporción: antes la mayor parte del esfuerzo se iba en escribir y una parte menor en revisar. Ahora se ha dado la vuelta. Escribir es el paso rápido; revisar, el lento.

## La validación de producto

Si tu equipo no tiene review, o eres tú solo, el siguiente filtro es la review de producto: alguien decide qué se construye y si lo construido resuelve el problema. En empresas grandes esa fase tiene sus propias colas (discovery, refinamiento, priorización, comité) y es tan humana como la anterior.

Pero también puedes no tenerla. Muchos proyectos personales van directos del prompt al deploy sin que nadie valide nada. Ahí el desarrollo es rapidísimo. Y es justo ahí donde aparece el cuello de botella de verdad.

## Adopción y feedback

Puedes tener un producto impecable, con tests, con CI y con un deploy cada hora. Si no lo usa nadie, da igual. La velocidad por sí sola no vale nada: multiplica lo que ya tienes. Si tienes usuarios, multiplica el aprendizaje; si no los tienes, multiplica el tiempo perdido.

Todo lo que hay entre la idea y los usuarios es difícil de automatizar. Hablar con gente, entender qué le duele, averiguar si eso que le duele lo pagaría, encontrar el hueco por el que entrar. Los modelos ayudan con partes del proceso: redactan una encuesta, resumen entrevistas, clasifican feedback, proponen hipótesis. Lo que no hacen es conseguirte el primer usuario ni decirte si lo que estás construyendo le importa a alguien. Eso sigue necesitando tiempo, conversaciones y unos cuantos intentos fallidos.

Aquí llega la parte incómoda. Con tráfico y un producto maduro se puede hacer lo que hace Facebook: probar variantes hasta la saciedad y dejar que los datos decidan. Con un producto nuevo no tienes ni tráfico ni tiempo. Cada experimento cuesta usuarios, y los usuarios son precisamente lo que no tienes. Encontrar un nicho que merezca la pena, y que no esté a un par de funcionalidades de una plataforma que ya existe, es un trabajo lento y con pocas garantías.

Con los modelos, además, la idea protege menos que antes. Si publicas algo que funciona, cualquiera con una suscripción puede apuntar a Opus o al siguiente modelo a que lo construya. Las barreras para entrar han bajado para todos: para ti y para quien te copia. Lo que queda como ventaja es la distribución, la confianza y conocer el nicho de verdad, y nada de eso se genera con un prompt.

## Y ahora qué

No tengo la solución. Lo que tengo es la sensación de que estamos optimizando el paso que ya no importa. Se habla de harnesses, de sub-agentes, de reviews automáticas, y todo eso está bien, pero son mejoras en la parte del proceso que ya es rápida. El tiempo que se gana ahí se pierde luego esperando a que alguien revise, a que producto decida o, lo más probable, a que aparezca el primer usuario.

Puede que este cuello de botella no tenga solución técnica, y que sea esa la razón por la que nos cuesta tanto mirarlo. No se arregla con otro modelo, sino con tiempo, conversaciones y acertar en una necesidad que ya existía antes de que llegáramos.
