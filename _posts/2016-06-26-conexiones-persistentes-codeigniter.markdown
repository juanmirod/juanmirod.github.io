---
published: true
title: Conexiones persistentes en CodeIgniter
layout: post
tags: [php, codeigniter, mysql] 
---

Hace poco tuve un problema recurrente con el servidor que no terminaba de arreglar: en determinados picos de visitas a uno de los servidores que administro, uno de los cron jobs y alguna de las webs me devolvían el error de MySql +"Too many connections."+ Este error es fácil de resolver si sabes donde mirar, pero sino puede ser muy engañoso. Con una rápida búsqueda en google puedes ver que todo el mundo te dice cómo aumentar el número de conexiones simultáneas, esto es, la variable global de mysql: `max_connections`.

Ok, te conectas con tu usuario administrador a mysql (tuve que buscarlo, pero lo encontré) Utilizas los nuevos palabros que has aprendido, a saber:

```
mysql> show processlist;  # muestra la lista de connexiones abiertas
mysql> set global variable max_connections=100;  # setea una variable global
mysql> select global variable max_connections # muestra el valor de la variable
mysql> show variables; # muestra todas las variables de mysql
```

Actualizas la variable (max_connections=100 o lo que quieras, cuidado con poner números grandes, que esto consume RAM...) La cambias en el fichero /etc/my.cnf por si reinicias el servicio que no te vuelva al valor anterior y listo!

Bueno no...

En esa búsqueda rápida todo el mundo también te decía que lo importante no es aumentar este número, este es el típico +"Pan para hoy y hambre para mañana"+ Lo que deberías hacer de verdad es tener cuidado con no dejar abiertas las conexiones en a mysql y no utilizar conexiones persistentes en PHP. Esto me quedó también bastante claro, pero como en estos proyectos usaba CodeIgniter, no pensé que eso fuera algo que se les hubiera escapado a los creadores del Framework.

¡Pues resulta que sí! Si miráis en la documentación de Codeigniter, o en el fichero database.php, veréis que el modo persistente está activado por defecto, haciendo que todas las conexiones que realiza Codeigniter sean persistentes. No voy a entrar en por qué esto es así, pero la mayoría de las opiniones que leí decían que era una MALA IDEA tener conexiones persistentes si no estabas seguro de lo que estabas haciendo y lo hacías bien. Efectivamente, en mi caso, no eran necesarias, sino que al final acababa con un montón de connexiones "zombies" (en modo sleep y consulta a NULL) por culpa de CodeIgniter. La solución final fue sencilla: desactivar esta opción en los projectos que me estaban dando problemas y ¡listo! Como por arte de magia mi show processlist estaba limpio y no tenía más conexiones zombies.
